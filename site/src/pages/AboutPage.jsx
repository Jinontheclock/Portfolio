import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";

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

const PLACEHOLDER_DESC = "What I did ".repeat(16).trim();

const EXPERIENCES = [
  {
    title: "UI/UX Designer",
    org: "WeLAB Entertainment",
    period: "Mar 2026 – May 2026",
    type: "Internship",
    location: "Vancouver, Canada",
    description: PLACEHOLDER_DESC,
  },
  {
    title: "Visual Merchandiser",
    org: "MUJI Japan",
    period: "Apr 2022 – Sep 2024",
    type: "Full-time",
    location: "Tokyo, Japan",
    description: PLACEHOLDER_DESC,
  },
];

const EDUCATION = [
  {
    title: "Dip. Digital Design and Development",
    org: "British Columbia Institute of Technology",
    period: "Jun 2026",
    type: "Diploma",
    location: "Burnaby, Canada",
    description: PLACEHOLDER_DESC,
  },
  {
    title: "BA. Fashion Design and Textiles",
    org: "Inha University",
    period: "Feb 2022",
    type: "Bachelor's Degree",
    location: "Incheon, Korea",
    description: PLACEHOLDER_DESC,
  },
];

// Rows render left-to-right with wrapping, per the Figma Skills frame
const SKILLS = [
  {
    label: "Tools",
    rows: [
      ["Figma"],
      ["Adobe", "InDesign", "Illustrator", "Photoshop", "AfterEffect"],
      ["Microsoft Office"],
      ["Google Suite"],
      ["WordPress"],
    ],
  },
  {
    label: "Technical",
    rows: [
      ["HTML/CSS", "Tailwind CSS"],
      ["JavaScript", "TypeScript"],
      ["React", "Next.js"],
      ["Git/GitHub", "Next.js"],
      ["Vercel"],
    ],
  },
  {
    label: "Methods",
    rows: [
      ["User + Stakeholder Journey Mapping"],
      ["Semi-structured Interviews"],
      ["Experience Prototyping"],
      ["Storyboarding"],
      ["Wireframing"],
      ["User Stories"],
    ],
  },
  {
    label: "Languages",
    rows: [["Korean"], ["Japanese"], ["English"]],
  },
];

/** Head (title with the period right-aligned, then org) matches the Figma
 *  list format; clicking unfolds type + location and the description. */
function Entry({ entry }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="xp-entry">
      <button type="button" className="xp-head" onClick={() => setOpen((o) => !o)}>
        <span className="xp-row">
          <span>{entry.title}</span>
          <span className="xp-right">{entry.period}</span>
        </span>
        <span>{entry.org}</span>
      </button>
      <div className={"xp-detail" + (open ? " is-open" : "")}>
        <div className="xp-detail-inner">
          <div className="xp-row xp-type-row">
            <span>{entry.type}</span>
            <span className="xp-right">{entry.location}</span>
          </div>
          <p className="xp-desc">{entry.description}</p>
        </div>
      </div>
    </div>
  );
}

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

            <section className="ab-section">
              <h2 className="ab-section-label">Experience</h2>
              <div className="xp-list">
                {EXPERIENCES.map((e) => (
                  <Entry key={e.title + e.period} entry={e} />
                ))}
              </div>
            </section>

            <section className="ab-section">
              <h2 className="ab-section-label">Education</h2>
              <div className="xp-list">
                {EDUCATION.map((e) => (
                  <Entry key={e.title + e.period} entry={e} />
                ))}
              </div>
            </section>

            <section className="ab-section">
              <h2 className="ab-section-label">Skills</h2>
              <div className="ab-skills">
                {SKILLS.map((group) => (
                  <div key={group.label} className="ab-skill-group">
                    <h3 className="ab-skill-label">{group.label}</h3>
                    <div className="ab-skill-rows">
                      {group.rows.map((row, i) => (
                        <div key={i} className="ab-skill-row">
                          {row.map((item) => (
                            <span key={item}>{item}</span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />
    </div>
  );
}
