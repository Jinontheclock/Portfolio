import { useEffect } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";

// Real project list; descriptions are placeholders until each case study
// gets its own copy.
const PROJECTS = [
  {
    id: "prolog",
    title: "ProLog",
    description:
      "A mobile app that turns fragmented apprenticeship records into one clear roadmap for neurodivergent tradespeople",
    roles: "Product Design, Research, Branding",
  },
  {
    id: "tinypaws",
    title: "TinyPaws",
    description: "A short one- or two-line summary of the project and the problem it set out to solve.",
    roles: "Product Design, Development",
  },
  {
    id: "compass-card",
    title: "Compass Card",
    description: "A short one- or two-line summary of the project and the problem it set out to solve.",
    roles: "Product Design, Development",
  },
  {
    id: "welab",
    title: "WeLAB Entertainment",
    description: "A short one- or two-line summary of the project and the problem it set out to solve.",
    roles: "Product Design, Development",
  },
];

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
