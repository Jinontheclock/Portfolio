import { useEffect } from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import LangSwitcher from "../components/LangSwitcher.jsx";
import { LANDING } from "../i18n.js";
/* The heading as drawn artwork rather than set type, exactly as exported.
   Inlined rather than linked so its paths can inherit the page's colour —
   the ink is #0F0F0F and flips to #FAFAFA under the dark theme, and an
   <img> could follow neither. */
import heroMark from "../assets/site/hero-wordmark.svg?raw";

export default function LandingPage({ lang, setLang }) {
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

          The copyright stands on end in the opposite corner, reading
          downwards from a © on the labels' own line. The heading below now
          owns the bottom of the screen, and the corner the copyright used
          to sit in is inside it. */}
      <SiteHeader>
        <span className="lp-copy">
          © HAJIN LEE 2026 All rights reserved | Designed &amp; built by Hajin Lee
        </span>
      </SiteHeader>

      {/* The heading is artwork now, and its box runs the full width of the
          screen — past the page margins on both sides and down onto the
          bottom edge. The space the artwork holds inside its own viewBox is
          the drawing's, and is left alone.

          The h1 keeps the heading's meaning: the label is what a screen
          reader and an outline tool read, and the drawing itself is marked
          decorative so neither announces it twice. */}
      <div className="lp-hero">
        <h1 className="lp-heading" aria-label={LANDING.en.hero}>
          <span
            className="lp-heading-mark"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: heroMark }}
          />
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
