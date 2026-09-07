import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import CaseGateModal, { isUnlocked } from "../components/CaseGateModal.jsx";
import WorkThumb from "../components/WorkThumb.jsx";
import { PROJECTS } from "../data/projects/index.js";
import { resolve } from "../data/projects/resolve.js";
import { PAGE_TITLE } from "../i18n.js";
import useLangPath from "../hooks/useLangPath.js";
import withPageTransition, { crossing } from "../lib/page-transition.js";

/* Everything a card renders, plus what the gate needs to challenge one.
   The case-study bodies behind these five projects come to a quarter of a
   megabyte of section blocks, and resolve() rebuilds every node it walks —
   so handing it whole projects meant reconstructing all of that, on every
   language switch, to fill in ten fields. The slice is taken once at module
   load; only the language fold repeats. */
const CARD_FIELDS = [
  "id",
  "locked",
  "passwordHash",
  "title",
  "description",
  "roles",
  "thumbs",
  "thumbAlt",
  "video",
];
const PROJECT_CARDS = PROJECTS.map((p) =>
  Object.fromEntries(CARD_FIELDS.filter((k) => k in p).map((k) => [k, p[k]])),
);

/* ── The page ──
 *
 * One screen, and nothing on it moves with the page: the header at the
 * top, the copyright at the foot, and between them an index and a stage.
 * The five titles stand in a column on the left; beside them one project
 * at a time, its summary, its roles line and its thumbnail. The page has
 * no scroll of its own and shows no scrollbar. What the wheel turns is
 * the stage: every half a screen of wheel is the next project, and the
 * one on the stage is the one whose title is set large and in ink.
 *
 * The wheel is read through a scroll box that is never seen — a box the
 * size of the screen with a track inside it as long as the steps between
 * the projects, which Lenis scrolls from the wheel, a touch, or a key
 * anywhere on the page, with its inertia. The stage follows the box's
 * offset. Which project is on the stage is written down per history
 * entry, so the back button returns to the project that was left, the
 * way the other pages return to their scroll.
 *
 * The stage is a grid with every block in the same cell, so the blocks
 * lie on top of one another and the current one is the one shown. The
 * block on the stage is treated as if the pointer were on it: its copy in
 * ink, its picture in colour, its clip playing or its stills walking.
 *
 * A phone keeps the plain stack — every block in the flow, each headed by
 * its title, the page scrolling as pages do — since it has no column for
 * an index and no wheel to turn the stage with; see work.css.
 */

/* how far the track scrolls from one project to the next: half a screen,
   the same number the stylesheet gives the track (--wk-step) */
const STEP = 0.5;

/* how far the stage is turned by a key */
const KEYS = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1, Home: -Infinity, End: Infinity };

const reducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
/* the phone layout's breakpoint, the same one work.css uses */
const stacked = () => window.matchMedia?.("(max-width: 600px)").matches ?? false;

/* How a block takes the stage. The copy comes up 40px through a fade, and
   the picture is uncovered from its bottom edge on the page crossing's
   curve (see lib/page-transition.js), so a page arriving and a project
   arriving are one move — at half the crossing's length, since a project
   is a smaller thing than a page. Going back up the list, both come from
   the other side. */
const SWAP = { shift: 40, duration: 0.3 };
const UNCOVER = { duration: 0.35 };
const uncoverFrom = (dir) => (dir < 0 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)");

/* Which project each history entry was left on. The same store, the same
   key and the same reasons as lib/scroll-memory.js, for a page whose
   position is a project rather than a scroll. */
const STAGE_KEY = "stage:";
const rememberStage = (key, i) => {
  try {
    sessionStorage.setItem(STAGE_KEY + key, String(i));
  } catch {
    /* private mode, or a full quota: the page opens on the first project */
  }
};
const recallStage = (key) => {
  try {
    const v = sessionStorage.getItem(STAGE_KEY + key);
    return v === null ? null : Number(v);
  } catch {
    return null;
  }
};

export default function WorkPage({ lang, setLang, fadeClass = "" }) {
  const navigate = useNavigate();
  const { pathname, key } = useLocation();
  const langPath = useLangPath();
  const projects = useMemo(() => resolve(PROJECT_CARDS, lang), [lang]);
  // a locked project asks for its password right here, before navigating
  const [gateProject, setGateProject] = useState(null);
  /* which block the pointer is over — the thumbnails cycle off this, and a
     block is one link, so the block is where the hover has to be read */
  const [hovered, setHovered] = useState(null);
  /* the history entry this page was opened as. Read once: while this page
     is leaving in a crossing the router already names the next entry, and
     nothing here should be filed under it. */
  const entry = useRef(key);
  /* which project is on the stage, as an index into the list: the one the
     entry was left on, or the first. Null on a phone, where there is no
     stage and every block is in the flow. */
  const [current, setCurrent] = useState(() => {
    if (stacked()) return null;
    const i = recallStage(entry.current) ?? 0;
    return Math.max(0, Math.min(PROJECT_CARDS.length - 1, i));
  });
  useEffect(() => {
    document.title = PAGE_TITLE.work[lang] || PAGE_TITLE.work.en;
  }, [lang]);
  const stageRef = useRef(null);
  const scrollRef = useRef(null);
  const trackRef = useRef(null);
  const lenis = useRef(null);
  /* what the stage showed last, and whether it has shown anything yet */
  const shown = useRef(null);
  /* the project a clicked title is taking the stage to, while the box is
     still on its way there: the stage shows it at once and holds it, so a
     jump of two titles does not put the one between on the stage in
     passing. Cleared on arrival, or the moment the reader takes the
     wheel. */
  const travel = useRef(null);
  const gateOpen = useRef(false);
  gateOpen.current = !!gateProject;

  const blocks = () => [...(stageRef.current?.querySelectorAll(".wk-section") ?? [])];
  const step = () => window.innerHeight * STEP;
  const indexAt = (y) =>
    Math.max(0, Math.min(projects.length - 1, Math.round(y / step())));

  /* ── The wheel turns the stage ──
     Lenis scrolls the unseen box from input anywhere on the page: the
     wheel, a touch drag on a tablet, and its inertia is the stage's — the
     box follows the input a tenth of the way each frame, so a flick
     coasts and settles, and the nearest step is the project shown. A
     reader who asked for less motion gets the box following the input
     exactly. Keys turn it a step at a time. Torn down the moment a
     crossing starts, so a flick still settling cannot turn a stage that
     is on its way out. */
  useEffect(() => {
    if (current === null) return undefined;
    const box = scrollRef.current;
    const track = trackRef.current;
    if (!box || !track) return undefined;
    /* the box opens on the project the entry was left on, before Lenis
       reads where it is */
    box.scrollTop = current * step();
    const smooth = new Lenis({
      wrapper: box,
      content: track,
      eventsTarget: window,
      lerp: reducedMotion() ? 1 : 0.1,
      smoothWheel: true,
      syncTouch: true,
      autoRaf: false,
    });
    lenis.current = smooth;
    const tick = (time) => smooth.raf(time * 1000);
    gsap.ticker.add(tick);
    const unhook = smooth.on("scroll", (l) => {
      const at = indexAt(l.scroll);
      if (travel.current !== null) {
        if (at !== travel.current) return;
        travel.current = null;
      }
      setCurrent(at);
    });
    /* the reader has the wheel: the stage follows the box again */
    const free = () => {
      travel.current = null;
    };
    window.addEventListener("wheel", free, { passive: true });
    window.addEventListener("touchstart", free, { passive: true });

    const onKey = (e) => {
      if (gateOpen.current || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) return;
      let by = KEYS[e.key];
      if (e.key === " ") by = e.shiftKey ? -1 : 1;
      if (by === undefined) return;
      e.preventDefault();
      travel.current = null;
      const at = indexAt(smooth.scroll);
      const to = Math.max(0, Math.min(projects.length - 1, at + by));
      smooth.scrollTo(to * step(), { duration: 1 });
    };
    window.addEventListener("keydown", onKey);

    const root = document.documentElement;
    const crossing = new MutationObserver(() => {
      if ("crossing" in root.dataset) teardown();
    });
    crossing.observe(root, { attributes: true, attributeFilter: ["data-crossing"] });
    let down = false;
    const teardown = () => {
      if (down) return;
      down = true;
      crossing.disconnect();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", free);
      window.removeEventListener("touchstart", free);
      unhook();
      gsap.ticker.remove(tick);
      smooth.destroy();
      lenis.current = null;
    };
    return teardown;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current === null, projects]);

  /* whether there is a stage at all is decided on the phone breakpoint,
     and re-decided when the window crosses it */
  useEffect(() => {
    const onResize = () => {
      if (stacked()) setCurrent(null);
      else setCurrent((c) => (c === null ? 0 : c));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* the project on the stage is where this entry will be returned to */
  useEffect(() => {
    if (current !== null) rememberStage(entry.current, current);
  }, [current]);

  /* the gate holds the stage still, the wheel included */
  useEffect(() => {
    const smooth = lenis.current;
    if (!smooth) return;
    if (gateProject) smooth.stop();
    else smooth.start();
  }, [gateProject]);

  /* ── The blocks take the stage ──
     Only the current block is on it; the rest are hidden, and not merely
     transparent, so nothing hidden can be clicked or tabbed to. The first
     time this runs there is nothing to swap from, so the block for the
     project the page opened on is simply shown. After that a change of
     block is a swap: the one leaving fades and moves off the way the
     wheel is going, the one arriving comes up from the other side and has
     its picture uncovered. A reader who asked for less motion gets the
     cut. */
  useEffect(() => {
    const all = blocks();
    if (!all.length) return;
    if (current === null) {
      /* the phone's stack: every block in the flow, none of this applies */
      gsap.set(all, { clearProps: "all" });
      shown.current = null;
      return;
    }
    const next = all[current];
    const prev = shown.current === null ? null : all[shown.current];
    const dir = shown.current === null ? 1 : Math.sign(current - shown.current) || 1;
    shown.current = current;
    if (prev === next) return;
    gsap.killTweensOf(all);
    gsap.killTweensOf(all.map((b) => b.querySelector(".wk-image")));
    const others = all.filter((b) => b !== next && b !== prev);
    gsap.set(others, { autoAlpha: 0, y: 0 });
    if (reducedMotion() || !prev) {
      if (prev) gsap.set(prev, { autoAlpha: 0 });
      gsap.set(next, { autoAlpha: 1, y: 0, clearProps: "clipPath" });
      return;
    }
    gsap.to(prev, {
      autoAlpha: 0,
      y: -SWAP.shift * dir,
      duration: SWAP.duration,
      ease: "power2.out",
    });
    gsap.fromTo(
      next,
      { autoAlpha: 0, y: SWAP.shift * dir },
      { autoAlpha: 1, y: 0, duration: SWAP.duration, ease: "power2.out" },
    );
    gsap.fromTo(
      next.querySelector(".wk-image"),
      { clipPath: uncoverFrom(dir) },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: UNCOVER.duration,
        ease: "pageTransition",
        clearProps: "clipPath",
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, projects]);

  /* Turn the stage to a project: it takes the stage at once, and the box
     goes to its step behind it with the same inertia as the wheel. */
  const jumpTo = (i) => {
    travel.current = i;
    setCurrent(i);
    lenis.current?.scrollTo(i * step(), {
      duration: 1.2,
      onComplete: () => {
        travel.current = null;
      },
    });
  };

  return (
    <div className="ab-root wk-screen">
      <SiteHeader current="work" />

      {/* the localized content cross-fades on language switches, matching
          Landing and About — without this the switch reads as a dead delay
          followed by a text snap */}
      <main className={"wk-main " + fadeClass}>
        <div className="ab-grid wk-grid">
          <nav className="wk-index" aria-label="Projects">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={"wk-index-item" + (current === i ? " is-current" : "")}
                aria-current={current === i ? "true" : undefined}
                onClick={() => jumpTo(i)}
              >
                {p.title}
                {p.locked && <LockMark />}
              </button>
            ))}
          </nav>

          <div className="wk-stage" ref={stageRef}>
            {projects.map((p, i) => (
              <Link
                key={p.id}
                id={`wk-${p.id}`}
                to={langPath(`/work/${p.id}`)}
                className={"wk-section" + (current === i ? " is-current" : "")}
                onClick={(e) => {
                  if (p.locked && !isUnlocked(p.id)) {
                    e.preventDefault();
                    setGateProject(p);
                    return;
                  }
                  /* a modified or middle click is "open this somewhere
                     else", not a crossing — those stay the Link's */
                  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                  if (!crossing(pathname, `/work/${p.id}`)) return;
                  e.preventDefault();
                  withPageTransition(() => navigate(langPath(`/work/${p.id}`)));
                }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered((id) => (id === p.id ? null : id))}
                /* a block reached by keyboard behaves like one under the
                   pointer — same colour, same walk through the frames */
                onFocus={() => setHovered(p.id)}
                onBlur={() => setHovered((id) => (id === p.id ? null : id))}
              >
                <div className="wk-text">
                  {/* the title belongs to the index on a wide screen; on a
                      phone there is no index, and it heads the block */}
                  <span className="wk-title">
                    {p.title}
                    {p.locked && <LockMark />}
                  </span>
                  <span className="wk-desc">{p.description}</span>
                  <span className="wk-specs">{p.roles}</span>
                </div>
                <WorkThumb
                  thumbs={p.thumbs}
                  video={p.video}
                  alt={p.thumbAlt}
                  /* the block on the stage is held the way a pointer would
                     hold it: its clip plays, its stills walk */
                  hovered={hovered === p.id || current === i}
                />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} setLang={setLang} />

      {/* the scroll, never seen: the box Lenis scrolls, and the track in it
          that gives the wheel its length — one step per project after the
          first. Not on a phone, where the page itself scrolls. */}
      {current !== null && (
        <div className="wk-scroll" ref={scrollRef} aria-hidden="true">
          <div
            className="wk-track"
            ref={trackRef}
            style={{ "--wk-steps": projects.length - 1 }}
          />
        </div>
      )}

      {gateProject && (
        <CaseGateModal
          project={gateProject}
          lang={lang}
          onDismiss={() => setGateProject(null)}
          onUnlocked={() => {
            const id = gateProject.id;
            setGateProject(null);
            /* the password opens the same door the block does, so it
               opens it the same way */
            const go = () => navigate(langPath(`/work/${id}`));
            if (crossing(pathname, `/work/${id}`)) withPageTransition(go);
            else go();
          }}
        />
      )}
    </div>
  );
}

function LockMark() {
  return (
    <svg
      className="wk-lock"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-label="Password protected"
      role="img"
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
