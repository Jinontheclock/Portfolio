import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ArrowIcon from "../components/ArrowIcon.jsx";
import LangSwitcher from "../components/LangSwitcher.jsx";
import useFitText from "../hooks/useFitText.js";
import useFitToWidth from "../hooks/useFitToWidth.js";
import { LANDING } from "../i18n.js";


export default function LandingPage({ lang, setLang, fadeClass = "" }) {
  const t = LANDING[lang] || LANDING.en;
  // the hero heading is pinned to English in every language, so it fits
  // once and never refits or fades on a language switch; on mobile it sits
  // at 85% of the width instead of edge-to-edge
  const heroRef = useFitText("en", {
    mobileRatio: 0.85,
    refText: LANDING.en.hero,
    ratio: 1,
  });
  const navRef = useRef(null);
  // bottom-right copyright, one line (smaller cap on mobile)
  const copyRef = useFitToWidth(12, { mobileMax: 9 });

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
      {/* only the localized nav text fades on language switch — the hero
          heading stays English in every language, and the arrows and the
          language switcher below stay put */}
      <div className="lp-hero">
        <h1
          className="lp-heading"
          ref={heroRef}
          style={{ textIndent: LANDING.en.heroIndent }}
        >
          {LANDING.en.hero}
        </h1>
        <nav className="lp-nav" ref={navRef}>
          <Link to="/work" className="lp-navlink">
            <span
              className={"lp-navlink-text " + fadeClass}
              style={{ textIndent: t.workIndent }}
            >
              {t.work}
            </span>
            <ArrowIcon className="lp-arrow" />
          </Link>
          <Link to="/about" className="lp-navlink">
            <span
              className={"lp-navlink-text " + fadeClass}
              style={{ textIndent: t.aboutIndent }}
            >
              {t.about}
            </span>
            <ArrowIcon className="lp-arrow" />
          </Link>
        </nav>
      </div>
      <div className="lp-foot">
        <LangSwitcher value={lang} onChange={setLang} />
      </div>
      <span className="lp-copy" ref={copyRef}>
        © HAJIN LEE 2026 All rights reserved | Designed &amp; built by Hajin Lee
      </span>
    </div>
  );
}
