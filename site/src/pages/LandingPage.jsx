import { useEffect } from "react";
import { Link } from "react-router-dom";
import LangSwitcher from "../components/LangSwitcher.jsx";
import arrowDown from "../assets/arrow-down.png";
import { THEME_LABELS } from "../i18n.js";
import useFitText from "../hooks/useFitText.js";

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
            <img className="lp-arrow" src={arrowDown} alt="" />
          </Link>
          <Link to="/about" className="lp-navlink">
            <span className="lp-navlink-text">About</span>
            <img className="lp-arrow" src={arrowDown} alt="" />
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
