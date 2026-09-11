import { useEffect } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import Snap from "lenis/snap";
import "lenis/dist/lenis.css";
import SiteHeader from "../components/SiteHeader.jsx";
import LangSwitcher from "../components/LangSwitcher.jsx";
import { LINKS, MAILTO } from "../components/SiteLinks.jsx";
import LocalTime from "../components/LocalTime.jsx";
import { LANG_LABELS } from "../i18n.js";
import { ALL_LANGS, LANGS } from "../lib/lang-routes.js";
import useIsPhone from "../hooks/useIsPhone.js";
import { reducedMotion } from "../lib/stage.js";
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
     is a place. Off the phone the move between them is Lenis's: the wheel
     scrolls the window with the same inertia the stages have, so a flick
     coasts, and when it comes to rest the band is drawn the rest of the
     way to whichever place is nearer, over a second, on Lenis's own curve
     — the band unfolding from the bottom edge, or folding back, rather
     than the browser's cut to it. Torn down the moment a crossing starts,
     so a flick still settling cannot move a page that is on its way out.
     A phone, and a reader who asked for less motion, keep the browser's
     own snap (the rule is on the root element, which no markup of this
     page can reach, so it is put on for as long as the page is); every
     tier hides the scrollbar the same way. */
  const isPhone = useIsPhone();
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("lp-landing");
    if (isPhone || reducedMotion()) {
      root.classList.add("lp-snap");
      return () => root.classList.remove("lp-landing", "lp-snap");
    }
    const smooth = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });
    const tick = (time) => smooth.raf(time * 1000);
    gsap.ticker.add(tick);
    const snap = new Snap(smooth, { type: "mandatory", duration: 1, debounce: 120 });
    snap.add(0);
    const slot = document.querySelector(".lp-footer-slot");
    if (slot) snap.addElement(slot, { align: "end" });
    const crossing = new MutationObserver(() => {
      if ("crossing" in root.dataset) teardown();
    });
    crossing.observe(root, { attributes: true, attributeFilter: ["data-crossing"] });
    let down = false;
    const teardown = () => {
      if (down) return;
      down = true;
      crossing.disconnect();
      snap.destroy();
      gsap.ticker.remove(tick);
      smooth.destroy();
      root.classList.remove("lp-landing");
    };
    return teardown;
  }, [isPhone]);

  return (
    /* One element for the whole page, the hero screen and the band under
       it. A crossing lifts the page being left out of the flow as one
       thing (see lib/page-transition.js), and it takes the page to be its
       container's only child; with the two boxes side by side in the
       container, it lifted the hero and left the band behind, which then
       sat at the top of the box and painted its black over everything. */
    <div className="lp-page">
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

        It is not below the page so much as behind it: a band pinned to
        the bottom of the screen, which the hero covers until the reader
        scrolls, and then uncovers by exactly its own height. That is the
        whole of what this page scrolls — the hero is still one screen, and
        the band is the one thing under it.

        Three boxes make the trick, all in landing.css. The slot is the
        band's place in the flow and clips everything to it; the track is a
        screen taller than the slot and hoisted a screen up, so the sticky
        band inside it can hold at the bottom of the viewport while the slot
        scrolls up over it. No fixed positioning anywhere, so nothing here
        has to be reconciled with iOS's toolbar. */}
    <div className="lp-footer-slot">
      <div className="lp-footer-track">
        <footer className="lp-footer">
          {/* The band as the Figma frame "Landing page_footer opened" sets
              it: where the author is and the time there, then the ways to
              reach them, and along the foot the languages and the
              copyright. */}
          <div className="lp-footer-top">
            <div className="lp-footer-where">
              <span>Based in Vancouver, BC, Canada</span>
              <LocalTime />
            </div>
            <nav className="lp-footer-links" aria-label="Contact">
              {/* the address in full, and two of About's links by name —
                  the same addresses, from the same list */}
              <a className="lp-footer-link" href={MAILTO}>
                hajinlee.ca@gmail.com
              </a>
              {LINKS.filter((l) => l.label === "LinkedIn" || l.label === "Resume").map((l) => (
                <a
                  key={l.label}
                  className="lp-footer-link"
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {l.label.toLowerCase()}
                </a>
              ))}
            </nav>
          </div>
          <div className="lp-footer-bottom">
            {/* the three languages the site has copy for, the one being
                read in bold. Only the ones offered are buttons: Japanese
                and Korean are held back for now (see lib/lang-routes.js),
                so they stand as labels until they are opened again. */}
            <div className="lp-footer-langs">
              {ALL_LANGS.map((code) =>
                LANGS.includes(code) ? (
                  <button
                    key={code}
                    type="button"
                    lang={code}
                    className={"lp-footer-lang" + (lang === code ? " is-current" : "")}
                    aria-pressed={lang === code}
                    onClick={() => setLang?.(code)}
                  >
                    {LANG_LABELS[code]}
                  </button>
                ) : (
                  <span key={code} lang={code} className="lp-footer-lang" aria-disabled="true">
                    {LANG_LABELS[code]}
                  </span>
                ),
              )}
            </div>
            <span className="lp-footer-copy">
              © HAJIN LEE 2026 All rights reserved | Designed &amp; built by Hajin Lee
            </span>
          </div>
        </footer>
      </div>
    </div>
    </div>
  );
}
