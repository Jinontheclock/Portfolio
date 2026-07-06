import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import Dropdown from "../components/Dropdown.jsx";
import PillButton from "../components/PillButton.jsx";

const CATEGORIES = ["All", "Product", "UI/UX", "Graphic"];

// Top project is the real ProLog case study; the rest stay as placeholders
// until their case studies land.
const PROJECTS = [
  {
    id: "prolog",
    title: "ProLog",
    description:
      "A mobile app that turns fragmented apprenticeship records into one clear roadmap for neurodivergent tradespeople",
    roles: "Product Design, Research, Branding",
  },
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `placeholder-${i + 1}`,
    title: "Project Title",
    description: "A short one- or two-line summary of the project and the problem it set out to solve.",
    roles: "Product Design, Development",
  })),
];

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
