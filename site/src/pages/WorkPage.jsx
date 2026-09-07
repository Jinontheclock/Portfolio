import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

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
 * An index and a stage. The five titles stand in a column on the left,
 * and beside them one project at a time: its summary, its roles line and
 * its thumbnail. Neither moves with the page. What the scroll does is
 * turn the pages of the stage: every half a screen of scroll is the next
 * project, and the one on the stage is the one whose title is set large
 * and in ink. The stage is a grid with every block in the same cell, so
 * the blocks lie on top of one another and the current one is the one
 * shown; the page's height is a track behind them, as long as the steps
 * between the projects.
 *
 * The block on the stage is treated as if the pointer were on it: its
 * copy in ink, its picture in colour, its clip playing or its stills
 * walking. Nothing is asked of the reader but the scroll.
 *
 * A phone keeps the plain stack — every block in the flow, each headed by
 * its title — since it has no column for an index and no wheel to turn
 * the stage with; see work.css.
 */

/* how far the page scrolls from one project to the next: half a screen,
   the same number the stylesheet gives the track (--wk-step) */
const STEP = 0.5;

const hoverCapable = () => window.matchMedia?.("(hover: hover)").matches ?? true;
const reducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
/* the phone layout's breakpoint, the same one work.css uses */
const stacked = () => window.matchMedia?.("(max-width: 600px)").matches ?? false;

/* How a block takes the stage. The copy comes up 40px through a fade, the
   way the scroll fade brings a block in on the other pages, and the
   picture is uncovered from its bottom edge on the page crossing's own
   clock and curve (see lib/page-transition.js), so a page arriving and a
   project arriving are one move. Going back up the list, both come from
   the other side. */
const SWAP = { shift: 40, duration: 0.45 };
const UNCOVER = { duration: 0.7 };
const uncoverFrom = (dir) => (dir < 0 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)");

export default function WorkPage({ lang, setLang, fadeClass = "" }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const langPath = useLangPath();
  const projects = useMemo(() => resolve(PROJECT_CARDS, lang), [lang]);
  // a locked project asks for its password right here, before navigating
  const [gateProject, setGateProject] = useState(null);
  /* which block the pointer is over — the thumbnails cycle off this, and a
     block is one link, so the block is where the hover has to be read */
  const [hovered, setHovered] = useState(null);
  /* which project is on the stage, as an index into the list; null on a
     phone, where there is no stage and every block is in the flow */
  const [current, setCurrent] = useState(() => (stacked() ? null : 0));
  useEffect(() => {
    document.title = PAGE_TITLE.work[lang] || PAGE_TITLE.work.en;
  }, [lang]);
  const stageRef = useRef(null);
  const lenis = useRef(null);
  /* what the stage showed last, and whether it has shown anything yet */
  const shown = useRef(null);

  const blocks = () => [...(stageRef.current?.querySelectorAll(".wk-section") ?? [])];
  const step = () => window.innerHeight * STEP;
  const indexAt = (y) =>
    Math.max(0, Math.min(projects.length - 1, Math.round(y / step())));

  /* ── The scroll turns the stage ──
     Half a screen per project, the nearest one winning, so a reader who
     stops between two sees the closer of the two. Whether there is a
     stage at all is decided on the phone breakpoint, and re-decided when
     the window crosses it. */
  useEffect(() => {
    const onScroll = () => setCurrent(stacked() ? null : indexAt(window.scrollY));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  /* ── The blocks take the stage ──
     Only the current block is on it; the rest are hidden, and not merely
     transparent, so nothing hidden can be clicked or tabbed to. The first
     time this runs the scroll has already been placed (a page arriving in
     a crossing, or by the back button, is landed before its effects run),
     so what it shows is the block for where the reader is, with no swap.
     After that a change of block is a swap: the one leaving fades and
     moves off the way the scroll is going, the one arriving comes up from
     the other side and has its picture uncovered. A reader who asked for
     less motion gets the cut. */
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
    const first = shown.current === null;
    shown.current = current;
    if (prev === next) return;
    gsap.killTweensOf(all);
    gsap.killTweensOf(all.map((b) => b.querySelector(".wk-image")));
    const others = all.filter((b) => b !== next && b !== prev);
    gsap.set(others, { autoAlpha: 0, y: 0 });
    if (reducedMotion()) {
      if (prev) gsap.set(prev, { autoAlpha: 0 });
      gsap.set(next, { autoAlpha: 1, y: 0, clearProps: "clipPath" });
      return;
    }
    if (prev) {
      gsap.to(prev, {
        autoAlpha: 0,
        y: -SWAP.shift * dir,
        duration: SWAP.duration,
        ease: "power2.out",
      });
    }
    gsap.fromTo(
      next,
      { autoAlpha: 0, y: first ? 0 : SWAP.shift * dir },
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

  /* ── The scroll itself ──
     Inertia on the wheel: the page follows the input a tenth of the way
     each frame, so a flick coasts and settles instead of stopping dead.
     Lenis moves the real scroll position, which is what keeps the sticky
     index, the scrollbar and window.scrollY honest; a transform-based
     smoother would have unstuck the index. This page only, for now.

     Not on a touch screen, where the platform's own inertia is the one the
     reader knows, and not for a reader who asked for less motion. Torn
     down the moment a crossing starts: a wheel flick still settling would
     otherwise keep steering the window after it has been handed to the
     page arriving. */
  useEffect(() => {
    if (!hoverCapable() || reducedMotion()) return undefined;
    const smooth = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false, autoRaf: false });
    lenis.current = smooth;
    const tick = (time) => smooth.raf(time * 1000);
    gsap.ticker.add(tick);
    const unhook = smooth.on("scroll", ScrollTrigger.update);
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
      unhook();
      gsap.ticker.remove(tick);
      smooth.destroy();
      lenis.current = null;
    };
    return teardown;
  }, []);

  /* the gate holds the page still, the wheel included */
  useEffect(() => {
    const smooth = lenis.current;
    if (!smooth) return;
    if (gateProject) smooth.stop();
    else smooth.start();
  }, [gateProject]);

  /* Turn the stage to a project: the scroll goes to that project's step.
     Through the smoother when there is one, so the move has the same
     inertia as the wheel. */
  const jumpTo = (i) => {
    const top = i * step();
    if (lenis.current) lenis.current.scrollTo(top, { duration: 1.2 });
    else window.scrollTo({ top, behavior: reducedMotion() ? "auto" : "smooth" });
  };

  return (
    <div className="ab-root">
      <SiteHeader current="work" />

      {/* the localized content cross-fades on language switches, matching
          Landing and About — without this the switch reads as a dead delay
          followed by a text snap */}
      <main className={"wk-main " + fadeClass}>
        {/* the track is the scroll: as many steps as there are projects
            after the first, on top of a screen for the stage itself */}
        <div className="wk-track" style={{ "--wk-steps": projects.length - 1 }}>
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
        </div>
      </main>

      <SiteFooter lang={lang} setLang={setLang} />

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
