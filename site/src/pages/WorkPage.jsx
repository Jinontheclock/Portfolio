import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
import useScrollFade from "../lib/scroll-fade.js";

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
 * An index and the things it indexes. The five titles stand in a column
 * on the left and stay put while the page scrolls; the projects go by on
 * the right, one block each, and whichever block has reached the top of
 * the index is the one whose title is set large and black. The case-study
 * pages' chapter list works the same way, and this is built from the same
 * parts: a sticky column, a reading line, and a scroll spy.
 *
 * The reading line is the index's own top edge, read off its sticky
 * offset rather than written down twice, so a block that has scrolled up
 * to sit level with the index is by definition the current one — its
 * description opens on the line its title stands on.
 */

/* a block is one thing: the summary, the roles line and the picture
   arrive together */
const SCROLL_FADE = [".wk-section"];

/* a fraction of a pixel either side of the comparison decides whether a
   block counts as reached; see the case-study page for the measurement */
const READING_SLACK = 1;

/* Where a block sits in the document, with the scroll fade's own offset
   taken back out: a faded block is parked 40px from where the layout puts
   it. */
const documentTopOf = (el) => {
  const shift = new DOMMatrixReadOnly(getComputedStyle(el).transform).m42;
  return el.getBoundingClientRect().top + window.scrollY - shift;
};

const hoverCapable = () => window.matchMedia?.("(hover: hover)").matches ?? true;
const reducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/* How the picture arrives: uncovered from its bottom edge, on the page
   crossing's own clock and curve (see lib/page-transition.js), so a block
   coming into view and a page coming into view are one move. */
const UNCOVER = { from: "inset(100% 0% 0% 0%)", to: "inset(0% 0% 0% 0%)", duration: 0.7 };

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
  /* the block that has reached the index */
  const [current, setCurrent] = useState(projects[0]?.id ?? null);
  useEffect(() => {
    document.title = PAGE_TITLE.work[lang] || PAGE_TITLE.work.en;
  }, [lang]);
  const gridRef = useRef(null);
  const indexRef = useRef(null);
  const lenis = useRef(null);
  useScrollFade(gridRef, SCROLL_FADE, [lang]);

  /* the index's top edge, in viewport pixels: the sticky offset the
     stylesheet gives it, which is also where it stands before any scroll */
  const readingLine = () => {
    const el = indexRef.current;
    return el ? parseFloat(getComputedStyle(el).top) || 0 : 0;
  };

  /* ── Scroll spy ──
     The current block is the last one whose top has passed the reading
     line. Fully scrolled, it is the last block whether or not its top ever
     gets there — only once actually scrolled, so a short window does not
     open on the last project. */
  useEffect(() => {
    const ids = projects.map((p) => p.id);
    const onScroll = () => {
      const line = readingLine() + READING_SLACK;
      let next = ids[0];
      for (const id of ids) {
        const el = document.getElementById(`wk-${id}`);
        if (el && documentTopOf(el) - window.scrollY <= line) next = id;
        else break;
      }
      const doc = document.documentElement;
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        next = ids[ids.length - 1];
      }
      setCurrent(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [projects]);

  /* ── The pictures arrive ──
     Each thumbnail is uncovered once, the first time its block comes into
     the band the scroll fade uses, and stays. Set before the first paint,
     or a picture already on screen when the page lands shows whole for a
     frame and then hides to be uncovered. */
  useLayoutEffect(() => {
    const root = gridRef.current;
    if (!root || reducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      root.querySelectorAll(".wk-image").forEach((img) => {
        gsap.set(img, { clipPath: UNCOVER.from });
        let shown = false;
        const show = () => {
          if (shown) return;
          shown = true;
          gsap.to(img, {
            clipPath: UNCOVER.to,
            duration: UNCOVER.duration,
            ease: "pageTransition",
            onComplete: () => gsap.set(img, { clearProps: "clipPath" }),
          });
        };
        ScrollTrigger.create({
          trigger: img,
          start: "top 88%",
          once: true,
          onEnter: show,
          /* already in the band when measured: on arrival, and on a
             back-button return to the middle of the list */
          onRefresh: (self) => self.isActive && show(),
        });
      });
    }, root);
    return () => ctx.revert();
  }, [projects]);

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

  /* Go to a block: its top on the reading line. Through the smoother when
     there is one, so the move has the same inertia as the wheel. */
  const jumpTo = (id) => {
    const el = document.getElementById(`wk-${id}`);
    if (!el) return;
    const top = Math.max(0, documentTopOf(el) - readingLine());
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
        <div className="ab-grid wk-grid" ref={gridRef}>
          <nav className="wk-index" ref={indexRef} aria-label="Projects">
            {projects.map((p) => (
              <button
                key={p.id}
                type="button"
                className={"wk-index-item" + (current === p.id ? " is-current" : "")}
                aria-current={current === p.id ? "true" : undefined}
                onClick={() => jumpTo(p.id)}
              >
                {p.title}
                {p.locked && <LockMark />}
              </button>
            ))}
          </nav>

          <div className="wk-sections">
            {projects.map((p) => (
              <Link
                key={p.id}
                id={`wk-${p.id}`}
                to={langPath(`/work/${p.id}`)}
                className="wk-section"
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
                  hovered={hovered === p.id}
                />
              </Link>
            ))}
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
