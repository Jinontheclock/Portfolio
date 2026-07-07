import { useEffect } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import { PROJECTS } from "../data/projects.js";

export default function WorkPage({ lang, setLang }) {
  useEffect(() => {
    document.title = "Work — HAJIN";
  }, []);

  return (
    <div className="ab-root">
      <SiteHeader current="work" />

      <main className="wk-main">
        <div className="wk-list">
          {PROJECTS.map((p) => (
            <Link key={p.id} to={`/work/${p.id}`} className="ab-grid wk-card wk-card-link">
              <div className="wk-text">
                <span className="wk-title">{p.title}</span>
                <span className="wk-desc">{p.description}</span>
                <span className="wk-specs">{p.roles}</span>
              </div>
              <div className="wk-image" aria-hidden="true"></div>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter lang={lang} setLang={setLang} />
    </div>
  );
}
