import { useEffect } from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import NavLink from "../components/NavLink.jsx";
import MetaList from "../components/MetaList.jsx";

const INTRO_1 =
  "Originally from Seoul, I moved to Vancouver in 2024 to transition my career into UX/UI design.\n" +
  "With professional experience in the Japanese retail industry, I developed a strong foundation in an experience-focused mindset and purposeful visual storytelling through visual merchandising. Shaped by diverse cultural experiences, I bring a flexible way of thinking into digital design.";

const INTRO_2 =
  "I approach design with a focus on clarity and real-world feasibility, identify challenges within user flows and refine interfaces through clear structure and iterative improvement. With a combined understanding of graphic design and development, I value delivering seamless, frustration-free digital experiences that go beyond aesthetics.";

const LINKS = [
  { label: "LinkedIn", href: "#" },
  { label: "Resume", href: "#" },
  { label: "Contact", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Instagram", href: "#" },
];

const EDUCATION = [
  "2026",
  "Digital Design and Development",
  "British Columbia Institute of Technology",
  "",
  "2022",
  "Fashion Design and Textiles",
  "Inha University",
];

const DESIGN_STACK = ["Figma", "After Effects", "Photoshop", "Illustrator", "InDesign"];
const TECH_STACK = ["HTML", "CSS", "JavaScript", "React"];
const PRODUCTIVITY = ["Notion", "Slack", "Jira"];

export default function AboutPage({ theme, toggleTheme, lang, cycleLang }) {
  useEffect(() => {
    document.title = "About — HAJIN";
  }, []);

  return (
    <div className="ab-root">
      <SiteHeader current="about" />

      <main className="ab-main">
        <div className="ab-grid">
          <span className="ab-title">Hajin Lee</span>
        </div>

        <div className="ab-grid">
          <div className="ab-intro">
            <p className="ab-paragraph">{INTRO_1}</p>
            <p className="ab-paragraph">{INTRO_2}</p>
            <div className="ab-links">
              {LINKS.map((l) => (
                <NavLink key={l.label} label={l.label} href={l.href} />
              ))}
            </div>
          </div>
          <div className="ab-photo" aria-hidden="true"></div>
        </div>

        <div className="ab-grid ab-meta-grid">
          <div className="ab-meta-a">
            <MetaList label="Education" items={EDUCATION} />
          </div>
          <div className="ab-meta-b">
            <MetaList label="Design Stack" items={DESIGN_STACK} />
          </div>
          <div className="ab-meta-a">
            <MetaList label="Tech Stack" items={TECH_STACK} />
          </div>
          <div className="ab-meta-b">
            <MetaList label="Productivity" items={PRODUCTIVITY} />
          </div>
        </div>
      </main>

      <SiteFooter theme={theme} toggleTheme={toggleTheme} lang={lang} cycleLang={cycleLang} />
    </div>
  );
}
