import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LangSwitcher from "../components/LangSwitcher.jsx";
import useFitText from "../hooks/useFitText.js";
import { LANDING } from "../i18n.js";

/* Long-tail arrow traced from the Figma asset: thick tail, head peaking
   at its left and tapering to the right tip. currentColor follows the theme. */
const ArrowIcon = () => (
  <svg className="lp-arrow" viewBox="0 0 418 66" aria-hidden="true">
    <rect x="0" y="47" width="212" height="19" fill="currentColor" />
    <path d="M209 0 L418 66 L209 66 Z" fill="currentColor" />
  </svg>
);

export default function LandingPage({ lang, setLang }) {
  const t = LANDING[lang] || LANDING.en;
  // refit the hero when the language (and so the text) changes; on mobile
  // sit at 85% of the width instead of edge-to-edge. The line box is locked
  // to the English hero's height so switching language never shifts the nav.
  const heroRef = useFitText(lang, { mobileRatio: 0.85, refText: LANDING.en.hero });
  const navRef = useRef(null);

  // lock the nav text column to the English labels' width so the arrows sit
  // at the English position in every language (CJK labels are narrower)
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const texts = nav.querySelectorAll(".lp-navlink-text");
    const refs = [LANDING.en.work, LANDING.en.about];
    const apply = () => {
      texts.forEach((el, i) => {
        const cs = getComputedStyle(el);
        const probe = document.createElement("span");
        probe.style.cssText =
          "position:absolute;visibility:hidden;white-space:nowrap;" +
          `font-family:${cs.fontFamily};font-weight:${cs.fontWeight};` +
          `font-size:${cs.fontSize};letter-spacing:${cs.letterSpacing};`;
        probe.textContent = refs[i];
        document.body.appendChild(probe);
        el.style.minWidth = probe.getBoundingClientRect().width + "px";
        probe.remove();
      });
    };
    apply();
    if (document.fonts?.ready) document.fonts.ready.then(apply);
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  useEffect(() => {
    document.title = "HAJIN, Product Designer";
  }, []);

  // Lock scroll/overscroll while on the landing page so it can't rubber-band
  useEffect(() => {
    document.documentElement.classList.add("lp-locked");
    return () => document.documentElement.classList.remove("lp-locked");
  }, []);

  return (
    <div className="lp-root">
      <div className="lp-hero">
        <h1 className="lp-heading" ref={heroRef} style={{ textIndent: t.heroIndent }}>
          {t.hero}
        </h1>
        <nav className="lp-nav" ref={navRef}>
          <Link to="/work" className="lp-navlink">
            <span className="lp-navlink-text" style={{ textIndent: t.workIndent }}>
              {t.work}
            </span>
            <ArrowIcon />
          </Link>
          <Link to="/about" className="lp-navlink">
            <span className="lp-navlink-text" style={{ textIndent: t.aboutIndent }}>
              {t.about}
            </span>
            <ArrowIcon />
          </Link>
        </nav>
      </div>
      <div className="lp-foot">
        <LangSwitcher value={lang} onChange={setLang} />
      </div>
    </div>
  );
}
