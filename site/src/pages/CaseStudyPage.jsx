import { useEffect } from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";

/* Placeholder case-study content, transcribed from the Figma "Case Studies"
   frame (ProLog). This is a reusable template — every Work card points here
   for now; real per-project data can replace these constants later. */

const TITLE = "ProLog";

const TOC = [
  "00 INTRO",
  "01 WHY was ProLog developed?",
  "02 WHY was ProLog developed?",
  "03 WHY was ProLog developed?",
  "04 WHY was ProLog developed?",
  "05 WHY was ProLog developed?",
  "06 WHY was ProLog developed?",
  "07 WHY was ProLog developed?",
];

const INTRO = [
  "ProLog is a progress-tracking mobile app designed to support neurodivergent apprentices in the skilled trades. The project was developed as part of the D3 & FSWD × ConnectHER Technology Showcase, where students design digital solutions to address challenges faced by underrepresented people in the trades.",
  "ProLog centralizes fragmented training information into a clear, structured roadmap that helps apprentices track their progress, stay organized, and confidently navigate their journey toward Red Seal certification.",
];

const META_LEFT = [
  { label: "category", values: ["App"] },
  { label: "timeline", values: ["4 months"] },
  { label: "role", values: ["UI Developer"] },
  { label: "link", values: ["Website", "Instagram", "Blog", "GitHub"] },
];

const META_RIGHT = [
  {
    label: "tool",
    values: [
      "Figma",
      "HTML5",
      "CSS3",
      "JavaScript",
      "React Native Suite",
      "Adobe Creative Suite",
      "Framer",
      "Trello",
    ],
  },
];

const SECTIONS = [
  {
    heading: "Low Completion Rate",
    body: "Only 40% of apprentices in British Columbia complete their program within six years, showing how unclear and demanding the pathway can be.",
  },
  {
    heading: "Risk of Delay",
    body: "Work hours must be submitted through sponsor reporting processes, meaning missing or inconsistent information can delay apprenticeship progression.",
  },
  {
    heading: "Disconnected Progress Systems",
    body: "Apprenticeship progress depends on multiple separate systems, making it difficult for individuals to understand where they stand.",
  },
];

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

export default function CaseStudyPage({ lang, setLang }) {
  useEffect(() => {
    document.title = `${TITLE} — HAJIN`;
  }, []);

  return (
    <div className="ab-root">
      <SiteHeader current="work" />

      <main className="cs-main">
        <div className="ab-grid cs-grid">
          <h1 className="cs-title">{TITLE}</h1>

          <nav className="cs-toc">
            {TOC.map((t) => (
              <span key={t} className="cs-toc-item">
                {t}
              </span>
            ))}
          </nav>

          <div className="cs-content">
            <div className="cs-intro">
              {INTRO.map((p, i) => (
                <p key={i} className="cs-paragraph">
                  {p}
                </p>
              ))}
            </div>

            <div className="cs-meta">
              <MetaGroup rows={META_LEFT} />
              <MetaGroup rows={META_RIGHT} />
            </div>

            <div className="cs-image" aria-hidden="true"></div>

            <div className="cs-sections">
              {SECTIONS.map((s) => (
                <div key={s.heading} className="cs-section">
                  <h3 className="cs-section-title">{s.heading}</h3>
                  <p className="cs-paragraph">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} setLang={setLang} />
    </div>
  );
}
