import { useEffect, useState } from "react";
import useTheme from "../hooks/useTheme.js";
import LangSwitcher from "../components/LangSwitcher.jsx";
import arrowDown from "../assets/arrow-down.png";

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const themeLabel = theme === "dark" ? "(Dark)" : "(Light)";

  return (
    <div className="lp-root">
      <div className="lp-hero">
        <h1 className="lp-heading">HAJIN, Product Designer</h1>
        <nav className="lp-nav">
          <a href="#work" className="lp-navlink">
            <span className="lp-navlink-text">Work</span>
            <img className="lp-arrow" src={arrowDown} alt="" />
          </a>
          <a href="#about" className="lp-navlink">
            <span className="lp-navlink-text">About</span>
            <img className="lp-arrow" src={arrowDown} alt="" />
          </a>
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
