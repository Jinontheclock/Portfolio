import { useEffect } from "react";
import { Link } from "react-router-dom";
import LangSwitcher from "../components/LangSwitcher.jsx";
import { THEME_LABELS } from "../i18n.js";
import useFitText from "../hooks/useFitText.js";

/* Long-tail arrow traced from the Figma asset: thick tail, head peaking
   at its left and tapering to the right tip. currentColor follows the theme. */
const ArrowIcon = () => (
  <svg className="lp-arrow" viewBox="0 0 418 66" aria-hidden="true">
    <rect x="0" y="47" width="212" height="19" fill="currentColor" />
    <path d="M209 0 L418 66 L209 66 Z" fill="currentColor" />
  </svg>
);

export default function LandingPage({ theme, toggleTheme, lang, setLang }) {
  const heroRef = useFitText();

  useEffect(() => {
    document.title = "HAJIN, Product Designer";
  }, []);

  const themeLabel = `(${THEME_LABELS[lang][theme === "dark" ? "dark" : "light"]})`;

  return (
    <div className="lp-root">
      <div className="lp-hero">
        <h1 className="lp-heading" ref={heroRef}>HAJIN, Product Designer</h1>
        <nav className="lp-nav">
          <Link to="/work" className="lp-navlink">
            <span className="lp-navlink-text">Work</span>
            <ArrowIcon />
          </Link>
          <Link to="/about" className="lp-navlink">
            <span className="lp-navlink-text">About</span>
            <ArrowIcon />
          </Link>
        </nav>
      </div>
      <div className="lp-foot">
        <span className="lp-theme-toggle" onClick={toggleTheme}>
          {themeLabel}
        </span>
        <LangSwitcher value={lang} onChange={setLang} />
      </div>
    </div>
  );
}
