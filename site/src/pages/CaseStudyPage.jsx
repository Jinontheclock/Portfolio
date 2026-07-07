import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import TryAppModal from "../components/TryAppModal.jsx";
import { getProject } from "../data/projects.js";

// ProLog is exported to the Portfolio under /prolog/ (see site/public/prolog)
const PROLOG_SRC = `${import.meta.env.BASE_URL}prolog/`;

function MetaGroup({ rows }) {
  return (
    <div className="cs-meta-group">
      {rows.map((r) => (
        <div key={r.label} className="cs-meta-row">
          <span className="cs-meta-label">{r.label}</span>
          <span className="cs-meta-values">
            {r.values.map((v) => (
              <span key={v}>{v}</span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

/** One shared case-study layout for every project: title + TOC on the left,
 *  intro / meta / image / sections on the right (the ProLog layout). */
export default function CaseStudyPage({ lang, setLang }) {
  const { id } = useParams();
  const project = getProject(id);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    if (project) document.title = `${project.title} — HAJIN`;
  }, [project]);

  if (!project) return <Navigate to="/work" replace />;

  return (
    <div className="ab-root">
      <SiteHeader current="work" />

      <main className="cs-main">
        <div className="ab-grid cs-grid">
          <h1 className="cs-title">{project.title}</h1>

          <nav className="cs-toc">
            {project.toc.map((t) => (
              <span key={t} className="cs-toc-item">
                {t}
              </span>
            ))}
          </nav>

          <div className="cs-content">
            <div className="cs-intro">
              {project.intro.map((p, i) => (
                <p key={i} className="cs-paragraph">
                  {p}
                </p>
              ))}
            </div>

            <div className="cs-meta">
              <MetaGroup rows={project.metaLeft} />
              <MetaGroup rows={project.metaRight} />
            </div>

            <div className="cs-image" aria-hidden="true"></div>

            <div className="cs-sections">
              {project.sections.map((s, i) => (
                <div key={i} className="cs-section">
                  <h3 className="cs-section-title">{s.heading}</h3>
                  <p className="cs-paragraph">{s.body}</p>
                </div>
              ))}
            </div>

            {project.demo && (
              <div className="cs-tryapp">
                <button type="button" className="cs-tryapp-btn" onClick={() => setDemoOpen(true)}>
                  Try app! <span className="cs-tryapp-arrow" aria-hidden="true">↗</span>
                </button>
                <span className="cs-tryapp-note">
                  Runs the real app right here — no install needed.
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} setLang={setLang} />

      {project.demo && (
        <TryAppModal
          open={demoOpen}
          onClose={() => setDemoOpen(false)}
          src={PROLOG_SRC}
          title={project.title}
        />
      )}
    </div>
  );
}
