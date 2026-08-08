import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import CaseGateModal, { isUnlocked } from "../components/CaseGateModal.jsx";
import WorkThumb from "../components/WorkThumb.jsx";
import { PROJECTS } from "../data/projects/index.js";
import { resolve } from "../data/projects/resolve.js";
import { PAGE_TITLE } from "../i18n.js";

export default function WorkPage({ lang, setLang }) {
  const navigate = useNavigate();
  const projects = useMemo(() => resolve(PROJECTS, lang), [lang]);
  // a locked project asks for its password right here, before navigating
  const [gateProject, setGateProject] = useState(null);
  /* which card the pointer is over — the thumbnails cycle off this, and a
     card is one link, so the card is where the hover has to be read */
  const [hovered, setHovered] = useState(null);
  useEffect(() => {
    document.title = PAGE_TITLE.work[lang] || PAGE_TITLE.work.en;
  }, [lang]);

  return (
    <div className="ab-root">
      <SiteHeader current="work" />

      <main className="wk-main">
        <div className="wk-list">
          {projects.map((p) => (
            <Link
              key={p.id}
              to={`/work/${p.id}`}
              className="ab-grid wk-card wk-card-link"
              onClick={(e) => {
                if (p.locked && !isUnlocked(p.id)) {
                  e.preventDefault();
                  setGateProject(p);
                }
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
                <span className="wk-kind">{p.kind}</span>
                <span className="wk-desc">{p.description}</span>
                <span className="wk-specs">{p.roles}</span>
              </div>
              <WorkThumb
                thumbs={p.thumbs}
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
            navigate(`/work/${id}`);
          }}
        />
      )}
    </div>
  );
}
