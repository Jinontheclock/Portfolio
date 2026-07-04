import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import Dropdown from "../components/Dropdown.jsx";
import PillButton from "../components/PillButton.jsx";

const CATEGORIES = ["All", "Product", "UI/UX", "Graphic"];

// Five placeholder cards until the real case studies land
const PROJECTS = Array.from({ length: 5 }, (_, i) => ({ id: `placeholder-${i + 1}` }));

const SUMMARY = "Project Summary".repeat(6);

export default function WorkPage({ lang, setLang }) {
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    document.title = "Work — HAJIN";
  }, []);

  return (
    <div className="ab-root">
      <SiteHeader current="work">
        <Dropdown
          renderTrigger={(toggle) => <PillButton label={filter} active onClick={toggle} />}
          items={CATEGORIES.map((c) => ({
            label: c,
            current: c === filter,
            onSelect: () => setFilter(c),
          }))}
        />
      </SiteHeader>

      <main className="wk-main">
        <div className="wk-list">
          {PROJECTS.map((p) => (
            <div key={p.id} className="ab-grid wk-card">
              <div className="wk-text">
                <span className="wk-title">Project Title</span>
                <span className="wk-desc">{SUMMARY}</span>
                <span className="wk-specs">Project specs</span>
              </div>
              <div className="wk-image" aria-hidden="true"></div>
            </div>
          ))}
        </div>
      </main>

      <SiteFooter lang={lang} setLang={setLang} />
    </div>
  );
}
