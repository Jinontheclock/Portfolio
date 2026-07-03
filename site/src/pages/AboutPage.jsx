import { useEffect } from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import MetaList from "../components/MetaList.jsx";

const INTRO_1 =
  "Originally from Seoul, I moved to Vancouver in 2024 to transition my career into UX/UI design.\n" +
  "With professional experience in the Japanese retail industry, I developed a strong foundation in an experience-focused mindset and purposeful visual storytelling through visual merchandising. Shaped by diverse cultural experiences, I bring a flexible way of thinking into digital design.";

const INTRO_2 =
  "I approach design with a focus on clarity and real-world feasibility, identify challenges within user flows and refine interfaces through clear structure and iterative improvement.\n" +
  "With a combined understanding of graphic design and development, I value delivering seamless, frustration-free digital experiences that go beyond aesthetics.";

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hajin-lee-ca" },
  { label: "Resume", href: "#" },
  { label: "Contact", href: "#" },
  { label: "GitHub", href: "https://github.com/Jinontheclock" },
  { label: "Instagram", href: "https://www.instagram.com/hj.archiv/" },
];

// Placeholder per the Figma frame (repeats the education entries) —
// swap in real experience entries when ready
const EXPERIENCES = [
  "2026",
  "Digital Design and Development",
  "British Columbia Institute of Technology",
  "",
  "2022",
  "Fashion Design and Textiles",
  "Inha University",
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

const STACKS = [
  { label: "Design Stack", items: ["Figma", "After Effects", "Photoshop", "Illustrator", "InDesign"] },
  { label: "Tech Stack", items: ["HTML", "CSS", "JavaScript", "React"] },
  { label: "Productivity", items: ["Notion", "Slack", "Jira"] },
];

export default function AboutPage({ theme, setTheme, lang, setLang }) {
  useEffect(() => {
    document.title = "About — HAJIN";
  }, []);

  return (
    <div className="ab-root">
      <SiteHeader current="about" />

      <main className="ab-main">
        <div className="ab-grid ab-layout">
          <h1 className="ab-title">Hajin Lee</h1>

          <nav className="ab-rail">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="ab-rail-link"
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ab-content">
            <p className="ab-paragraph">{INTRO_1}</p>
            <p className="ab-paragraph">{INTRO_2}</p>

            <MetaList label="Experiences" items={EXPERIENCES} />
            <MetaList label="Education" items={EDUCATION} />

            <div className="ab-stacks">
              {STACKS.map((s) => (
                <div key={s.label} className="ab-stack-row">
                  <span className="ab-stack-label">{s.label}</span>
                  <div className="ab-stack-items">
                    {s.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />
    </div>
  );
}
