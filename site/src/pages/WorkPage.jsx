import { useEffect } from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";

/** Placeholder until the Work design is handed off. */
export default function WorkPage({ theme, toggleTheme, lang, cycleLang }) {
  useEffect(() => {
    document.title = "Work — HAJIN";
  }, []);

  return (
    <div className="ab-root">
      <SiteHeader current="work" />

      <main className="ab-main">
        <div className="ab-grid">
          <span className="ab-title">Work</span>
        </div>
        <div className="ab-grid">
          <p className="ab-paragraph ab-placeholder-note">Case studies coming soon.</p>
        </div>
      </main>

      <SiteFooter theme={theme} toggleTheme={toggleTheme} lang={lang} cycleLang={cycleLang} />
    </div>
  );
}
