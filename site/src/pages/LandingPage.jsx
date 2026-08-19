import { useEffect } from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import LangSwitcher from "../components/LangSwitcher.jsx";
import useFitText from "../hooks/useFitText.js";
import useFitToWidth from "../hooks/useFitToWidth.js";
import { LANDING } from "../i18n.js";

export default function LandingPage({ lang, setLang }) {
  // the hero heading is pinned to English in every language, so it fits
  // once and never refits or fades on a language switch; on mobile it sits
  // at 85% of the width instead of edge-to-edge
  const heroRef = useFitText("en", {
    mobileRatio: 0.85,
    refText: LANDING.en.hero,
    ratio: 1,
  });
  // the copyright, one line, now sharing the header row (smaller cap on mobile)
  const copyRef = useFitToWidth(12, { mobileMax: 9 });

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
      {/* Work and About come from the inner pages' own header rather than
          from a nav of this page's own, so crossing between here and there
          leaves them exactly where they were — same position, same size,
          same two words. Neither is marked current: on this page neither is
          where the reader is.

          The copyright rides in the same row. The heading below now owns
          the bottom of the screen, and the corner the copyright used to sit
          in is inside it. */}
      <SiteHeader>
        <span className="lp-copy" ref={copyRef}>
          © HAJIN LEE 2026 All rights reserved | Designed &amp; built by Hajin Lee
        </span>
      </SiteHeader>

      <div className="lp-hero">
        <h1
          className="lp-heading"
          ref={heroRef}
          style={{ textIndent: LANDING.en.heroIndent }}
        >
          {LANDING.en.hero}
        </h1>
      </div>

      {/* Empty while the site is English only — LangSwitcher renders nothing
          with one language offered. When the other two come back this corner
          is the heading's, so it will need somewhere else to sit. */}
      <div className="lp-foot">
        <LangSwitcher value={lang} onChange={setLang} />
      </div>
    </div>
  );
}
