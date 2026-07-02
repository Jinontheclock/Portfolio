import { useEffect } from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import PillButton from "../components/PillButton.jsx";

// Placeholder entries from the design system's WorkScreen — real case
// studies replace these when the project pages are ready.
const PROJECTS = [
  {
    id: "prolog",
    title: "ProLog",
    description: "skilled trades apprenticeship app for progress tracking",
    roles: ["product design", "Front-end development"],
  },
  {
    id: "prolog-2",
    title: "ProLog",
    description: "skilled trades apprenticeship app for progress tracking",
    roles: ["product design", "Front-end development"],
  },
];

export default function WorkPage({ theme, toggleTheme, lang, cycleLang }) {
  useEffect(() => {
    document.title = "Work — HAJIN";
  }, []);

  return (
    <div className="ab-root">
      <SiteHeader current="work" />

      <main className="wk-main">
        <div className="wk-filter-row">
          <PillButton label="All" active />
        </div>

        <div className="wk-list">
          {PROJECTS.map((p) => (
            <div key={p.id} className="ab-grid wk-card">
              <div className="wk-text">
                <span className="wk-title">{p.title}</span>
                <span className="wk-desc">{p.description}</span>
                <span className="wk-roles">{p.roles.join("\n")}</span>
              </div>
              <div className="wk-image" aria-hidden="true"></div>
            </div>
          ))}
        </div>
      </main>

      <SiteFooter theme={theme} toggleTheme={toggleTheme} lang={lang} cycleLang={cycleLang} />
    </div>
  );
}
