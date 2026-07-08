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

function Block({ block, onDemo }) {
  switch (block.type) {
    case "h":
      return (
        <h3 className="cs-block-h">
          {block.text}
          {block.tag && <span className="cs-block-tag">{block.tag}</span>}
        </h3>
      );
    case "p":
      return <p className="cs-paragraph">{block.text}</p>;
    case "list":
      return (
        <ul className="cs-list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "demo":
      return (
        <div className="cs-tryapp">
          <button type="button" className="cs-tryapp-btn" onClick={onDemo}>
            Try app! <span className="cs-tryapp-arrow" aria-hidden="true">↗</span>
          </button>
          <span className="cs-tryapp-note">
            Runs the real app right here — no install needed.
          </span>
        </div>
      );
    case "gallery":
      return (
        <div className="cs-gallery" aria-hidden="true">
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    case "tagline":
      return <p className="cs-tagline">{block.text}</p>;
    default:
      return null;
  }
}

/** One shared case-study layout for every project: title + table of contents
 *  on the left, the content (headline, intro, meta, image, sections) on the
 *  right, built from each section's block list. */
export default function CaseStudyPage({ lang, setLang }) {
  const { id } = useParams();
  const project = getProject(id);
  const [demoOpen, setDemoOpen] = useState(false);
  // section currently in view (null = the intro block above the sections)
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (project) document.title = `${project.title} — HAJIN`;
  }, [project]);

  // scroll-spy: the TOC highlights the chapter the reader is inside —
  // the last section whose top has passed the reading line
  useEffect(() => {
    if (!project) return;
    const ids = project.sections.map((s) => s.id);
    const onScroll = () => {
      let current = null;
      for (const sid of ids) {
        const el = document.getElementById(`cs-${sid}`);
        if (el && el.getBoundingClientRect().top <= 140) current = sid;
        else break;
      }
      // fully scrolled: the last chapter is what's being read even if its
      // top never crosses the reading line
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        current = ids[ids.length - 1];
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [project]);

  if (!project) return <Navigate to="/work" replace />;

  const scrollTo = (sectionId) => {
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(`cs-${sectionId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="ab-root">
      <SiteHeader current="work" />

      <main className="cs-main">
        <div className="ab-grid cs-grid">
          <h1 className="cs-title">{project.title}</h1>

          <nav className="cs-toc">
            <button
              type="button"
              className={"cs-toc-item" + (activeId === null ? " is-current" : "")}
              onClick={() => scrollTo(null)}
            >
              00 INTRO
            </button>
            {project.sections.map((s) => (
              <button
                key={s.id}
                type="button"
                className={"cs-toc-item" + (activeId === s.id ? " is-current" : "")}
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div className="cs-content">
            {project.headline && <p className="cs-headline">{project.headline}</p>}

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
              {project.sections.map((s) => (
                <section key={s.id} id={`cs-${s.id}`} className="cs-section">
                  <h2 className="cs-section-no">{s.label}</h2>
                  {s.blocks.map((b, i) => (
                    <Block key={i} block={b} onDemo={() => setDemoOpen(true)} />
                  ))}
                </section>
              ))}
            </div>
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
