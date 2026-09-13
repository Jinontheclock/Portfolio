import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import CaseGateModal, { isUnlocked } from "../components/CaseGateModal.jsx";
import WorkMockups from "../components/WorkMockups.jsx";
import { PROJECTS } from "../data/projects/index.js";
import { resolve } from "../data/projects/resolve.js";
import { PAGE_TITLE } from "../i18n.js";
import useLangPath from "../hooks/useLangPath.js";
import withPageTransition, { crossing } from "../lib/page-transition.js";
import useStage from "../lib/stage.js";

/* Everything a card renders — the colour, the copy, and the mockups
   where a project has them — plus what the gate needs to challenge one.
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
  "card",
  "mockups",
  "thumbAlt",
];
const PROJECT_CARDS = PROJECTS.map((p) =>
  Object.fromEntries(CARD_FIELDS.filter((k) => k in p).map((k) => [k, p[k]])),
);

/* ── The page ──
 *
 * One screen, and nothing on it moves with the page: the header at the
 * top, the copyright at the foot, and between them an index and a stage.
 * The five titles stand in a column on the left; beside them one project
 * at a time, a card in the project's own colour with its title, its
 * summary and its roles line in the corner, and its devices standing on
 * the right where it has them. The page has
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
 * lie on top of one another and the current one is the one shown.
 *
 * A phone keeps the plain stack — every block in the flow, each headed by
 * its title, the page scrolling as pages do — since it has no column for
 * an index and no wheel to turn the stage with; see work.css.
 */

/* How a block takes the stage — the turning of it, the swap, the steps
   and the memory — is lib/stage.js, shared with About. */

export default function WorkPage({ lang, setLang, fadeClass = "" }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const langPath = useLangPath();
  const projects = useMemo(() => resolve(PROJECT_CARDS, lang), [lang]);
  // a locked project asks for its password right here, before navigating
  const [gateProject, setGateProject] = useState(null);
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
                /* for the width it reserves against the day it is current —
                   see .wk-index-item::after in work.css */
                data-title={p.title}
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
                style={{ "--wk-card": p.card, ...mockupVars(p.mockups) }}
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
              >
                {/* the copy, in the card's corner: the title, the summary
                    under it, and the roles line a breath below */}
                <div className="wk-text">
                  <span className="wk-title">
                    {p.title}
                    {p.locked && <LockMark />}
                  </span>
                  <span className="wk-desc">{p.description}</span>
                  <span className="wk-specs">{p.roles}</span>
                </div>
                {p.mockups && <WorkMockups mockups={p.mockups} alt={p.thumbAlt} />}
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

/* What the stylesheet needs to size a card's copy around its devices: how
   wide the row of them is per unit of height (the frames' ratios summed)
   and how many gaps it has — work.css turns those into the row's width. */
function mockupVars(mockups) {
  if (!mockups) return {};
  return {
    "--wk-mock-ratio": mockups
      .reduce((sum, m) => sum + m.ratio[0] / m.ratio[1], 0)
      .toFixed(4),
    "--wk-mock-gaps": mockups.length - 1,
  };
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
