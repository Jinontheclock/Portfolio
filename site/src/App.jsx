import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import useLang from "./hooks/useLang.js";
import LandingPage from "./pages/LandingPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import CaseStudyPage from "./pages/CaseStudyPage.jsx";

const FADE_MS = 350; // keep in sync with .lang-fade-* in components.css

export default function App() {
  const { lang, setLang } = useLang();
  // language switches fade out with the old text, then fade in with the new:
  // pages render displayLang, which only advances once the fade-out ends
  const [displayLang, setDisplayLang] = useState(lang);
  const [fadingOut, setFadingOut] = useState(false);
  // scroll spot pinned across the text swap (null = nothing to restore).
  // Measured from the page BOTTOM: language changes come from the footer
  // dropdown, so what must hold still on screen is the footer — when the
  // swapped text reflows to a different total height, a top-anchored scroll
  // would slide the footer (and the whole view) up or down.
  const scrollKeep = useRef(null);

  useEffect(() => {
    if (lang === displayLang) return;
    setFadingOut(true);
    const t = setTimeout(() => {
      scrollKeep.current = document.documentElement.scrollHeight - window.scrollY;
      setDisplayLang(lang);
      setFadingOut(false);
    }, FADE_MS);
    return () => clearTimeout(t);
  }, [lang, displayLang]);

  // <html lang> follows the DISPLAYED language: flipping it earlier would
  // re-resolve the still-visible old text's fallback font mid-fade. Layout
  // effect so the lang flip, its reflow, and the scroll restore all settle
  // before the swapped text ever paints — the language changes in place.
  useLayoutEffect(() => {
    document.documentElement.lang = displayLang;
    if (scrollKeep.current == null) return;
    const keep = scrollKeep.current;
    scrollKeep.current = null;
    const pin = () =>
      window.scrollTo(0, document.documentElement.scrollHeight - keep);
    pin();
    // late reflows — the new language's font subset resolving a beat after
    // the swap — change the page height again after that first restore.
    // Hold the bottom distance through the fade-in (body is height:100%, so
    // no resize event exists to hook; an interval survives frame throttling
    // where a rAF loop can stall), letting go early if the user scrolls.
    const iv = setInterval(pin, 60);
    const end = setTimeout(() => clearInterval(iv), 1500);
    const stop = () => {
      clearInterval(iv);
      clearTimeout(end);
    };
    window.addEventListener("wheel", stop, { once: true, passive: true });
    window.addEventListener("touchstart", stop, { once: true, passive: true });
    return () => {
      stop();
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
  }, [displayLang]);

  // pages put this on their localized content only, so fixed chrome like
  // the landing language switcher doesn't blink with every switch
  const fadeClass = fadingOut ? "lang-fade-out" : "lang-fade-in";
  const shared = { lang: displayLang, setLang, fadeClass };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage {...shared} />} />
        <Route path="/about" element={<AboutPage {...shared} />} />
        <Route path="/work" element={<WorkPage {...shared} />} />
        <Route path="/work/:id" element={<CaseStudyPage {...shared} />} />
      </Routes>
    </HashRouter>
  );
}
