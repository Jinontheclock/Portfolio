import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import CaseGateModal, { isUnlocked } from "../components/CaseGateModal.jsx";
import WorkThumb from "../components/WorkThumb.jsx";
import { PROJECTS } from "../data/projects/index.js";
import { resolve } from "../data/projects/resolve.js";
import { PAGE_TITLE } from "../i18n.js";
import useLangPath from "../hooks/useLangPath.js";
import withViewTransition, { crossing } from "../lib/viewTransition.js";
import useScrollFade from "../lib/scroll-fade.js";

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

/* One card at a time. A card is already a single thing — a title, what it
   was, and the thumbnail that answers them, all inside one link — so there
   is nothing finer to break it into and nothing coarser worth grouping it
   with. */
const SCROLL_FADE = [".wk-card"];

export default function WorkPage({ lang, setLang, fadeClass = "" }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const langPath = useLangPath();
  const projects = useMemo(() => resolve(PROJECT_CARDS, lang), [lang]);
  // a locked project asks for its password right here, before navigating
  const [gateProject, setGateProject] = useState(null);
  /* which card the pointer is over — the thumbnails cycle off this, and a
     card is one link, so the card is where the hover has to be read */
  const [hovered, setHovered] = useState(null);
  useEffect(() => {
    document.title = PAGE_TITLE.work[lang] || PAGE_TITLE.work.en;
  }, [lang]);
  const listRef = useRef(null);
  useScrollFade(listRef, SCROLL_FADE, [lang]);

  return (
    <div className="ab-root">
      <SiteHeader current="work" />

      {/* the localized content cross-fades on language switches, matching
          Landing and About — without this the switch reads as a dead delay
          followed by a text snap */}
      <main className={"wk-main " + fadeClass}>
        <div className="wk-list" ref={listRef}>
          {projects.map((p) => (
            <Link
              key={p.id}
              to={langPath(`/work/${p.id}`)}
              className="ab-grid wk-card wk-card-link"
              onClick={(e) => {
                if (p.locked && !isUnlocked(p.id)) {
                  e.preventDefault();
                  setGateProject(p);
                  return;
                }
                /* a modified or middle click is "open this somewhere
                   else", not a crossing — those stay the Link's */
                if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                const move = crossing(pathname, `/work/${p.id}`);
                if (!move) return;
                e.preventDefault();
                withViewTransition(() => navigate(langPath(`/work/${p.id}`)), move);
              }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered((id) => (id === p.id ? null : id))}
              /* a card reached by keyboard behaves like one under the
                 pointer — same colour, same walk through the frames */
              onFocus={() => setHovered(p.id)}
              onBlur={() => setHovered((id) => (id === p.id ? null : id))}
            >
              <div className="wk-text">
                <span className="wk-title">
                  {p.title}
                  {p.locked && (
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
                  )}
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
            /* the password opens the same door the card does, so it opens
               it the same way */
            const go = () => navigate(langPath(`/work/${id}`));
            const move = crossing(pathname, `/work/${id}`);
            if (move) withViewTransition(go, move);
            else go();
          }}
        />
      )}
    </div>
  );
}
