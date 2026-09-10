import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import CaseGateModal, { isUnlocked } from "../components/CaseGateModal.jsx";
import WorkThumb from "../components/WorkThumb.jsx";
import { PROJECTS } from "../data/projects/index.js";
import { resolve } from "../data/projects/resolve.js";
import { PAGE_TITLE } from "../i18n.js";
import useLangPath from "../hooks/useLangPath.js";
import withPageTransition, { crossing } from "../lib/page-transition.js";
import useStage from "../lib/stage.js";

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

/* How a block takes the stage — the turning of it, the swap, the steps
   and the memory are lib/stage.js, shared with About. What is this
   page's own is the picture: it is uncovered from its bottom edge on the
   page crossing's curve (see lib/page-transition.js), so a page arriving
   and a project arriving are one move — at half the crossing's length,
   since a project is a smaller thing than a page. Going back up the
   list it comes from the other side. */
const UNCOVER = { duration: 0.35 };
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
  useEffect(() => {
    document.title = PAGE_TITLE.work[lang] || PAGE_TITLE.work.en;
  }, [lang]);
  const stageRef = useRef(null);
  const scrollRef = useRef(null);
  const trackRef = useRef(null);
  const gateOpen = useRef(false);
  gateOpen.current = !!gateProject;

  /* the stage: which project is on it (null on a phone, where there is
     none and every block is in the flow), and the wheel that turns it —
     see lib/stage.js */
  const { current, jumpTo, lenis, steps } = useStage({
    count: projects.length,
    boxRef: scrollRef,
    trackRef,
    blocks: () => [...(stageRef.current?.querySelectorAll(".wk-section") ?? [])],
    /* the gate holds the keys */
    blocked: () => gateOpen.current,
    /* and the picture is uncovered as the block comes up — or simply
       shown, on a cut */
    onSwap: (next, dir, cut) => {
      const images = [...(stageRef.current?.querySelectorAll(".wk-image") ?? [])];
      gsap.killTweensOf(images);
      const image = next.querySelector(".wk-image");
      if (!image) return;
      if (cut) {
        gsap.set(image, { clearProps: "clipPath" });
        return;
      }
      gsap.fromTo(
        image,
        { clipPath: uncoverFrom(dir) },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: UNCOVER.duration,
          ease: "pageTransition",
          clearProps: "clipPath",
        },
      );
    },
    deps: [projects],
  });

  /* the gate holds the stage still, the wheel included */
  useEffect(() => {
    const smooth = lenis.current;
    if (!smooth) return;
    if (gateProject) smooth.stop();
    else smooth.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gateProject]);

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
        <div className="stage-scroll" ref={scrollRef} aria-hidden="true">
          <div className="stage-track" ref={trackRef} style={{ "--stage-steps": steps }} />
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
