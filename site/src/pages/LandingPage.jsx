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

  /* The page has two places to be, closed and open, and nothing in between
     is a place: the scroll snaps to whichever is nearer, and the browser
     draws the move. The rule lives on the root element, which no markup of
     this page can reach, so it is put on for as long as the page is. */
  useEffect(() => {
    document.documentElement.classList.add("lp-snap");
    return () => document.documentElement.classList.remove("lp-snap");
  }, []);

  return (
    <>
    <div className="lp-root">
      {/* Work and About come from the inner pages' own header rather than
          from a nav of this page's own, so crossing between here and there
          leaves them exactly where they were — same position, same size,
          same two words. Neither is marked current: on this page neither is
          where the reader is. The copyright is on the footer band below,
          not up here. */}
      <SiteHeader />

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

    {/* The footer, revealed.

        It is not below the page so much as behind it: a black band pinned
        to the bottom of the screen, which the hero covers until the reader
        scrolls, and then uncovers by exactly its own height. That is the
        whole of what this page scrolls — the hero is still one screen, and
        the band is the one thing under it.

        Three boxes make the trick, all in landing.css. The slot is the
        band's place in the flow and clips everything to it; the track is a
        screen taller than the slot and hoisted a screen up, so the sticky
        band inside it can hold at the bottom of the viewport while the slot
        scrolls up over it. No fixed positioning anywhere, so nothing here
        has to be reconciled with iOS's toolbar or with the crossings, which
        photograph fixed elements. */}
    <div className="lp-footer-slot">
      <div className="lp-footer-track">
        <footer className="lp-footer">
          <span className="lp-footer-copy">
            © HAJIN LEE 2026 All rights reserved | Designed &amp; built by Hajin Lee
          </span>
        </footer>
      </div>
    </div>
    </>
  );
}
