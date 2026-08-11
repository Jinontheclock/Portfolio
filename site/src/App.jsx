import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HashRouter, Routes, Route, useLocation, useParams } from "react-router-dom";
import useLang from "./hooks/useLang.js";
import Preloader from "./components/Preloader.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import CaseStudyPage from "./pages/CaseStudyPage.jsx";

const FADE_MS = 350; // keep in sync with .lang-fade-* in components.css

// every route change starts at the top of the new page — without this the
// browser keeps the old page's scroll offset, so opening a case study from
// a scrolled Work page lands mid-chapter (worst on mobile, where the Work
// page is long)
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// media-heavy case studies re-run the count-up cover on in-app entry, so
// their hero video and figures never appear mid-load (first loads on any
// route are already covered by the boot Preloader below)
const COVERED_ROUTES = ["/work/tinypaws", "/work/welab"];
function CaseStudyLoader() {
  const { pathname } = useLocation();
  const [covering, setCovering] = useState(false);
  const prev = useRef(pathname);
  // layout effect: the cover must be up BEFORE the new page's first paint,
  // or the half-assembled hero flashes for a frame — the exact thing the
  // cover exists to hide
  useLayoutEffect(() => {
    if (pathname !== prev.current) {
      prev.current = pathname;
      if (COVERED_ROUTES.includes(pathname)) setCovering(true);
    }
  }, [pathname]);
  if (!covering) return null;
  return <Preloader onDone={() => setCovering(false)} />;
}

// remount the case-study page whenever :id changes, so per-project state
// (the password gate, the demo modal, the scroll spy) never carries over
// from one project to the next
function CaseStudyRoute(props) {
  const { id } = useParams();
  return <CaseStudyPage key={id} {...props} />;
}

// the boot loader (0→100 count) covers the app's first load on ANY route so
// no page is ever seen mid-assembly (font refits, hero SVG/image pop-in);
// in-app navigation never re-triggers it
let booted = false;

export default function App() {
  const { lang, setLang } = useLang();
  const [booting, setBooting] = useState(!booted);
  useEffect(() => {
    booted = true;
  }, []);
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
    if (lang === displayLang) {
      // a switch reverted mid-fade cancels the pending swap (cleanup below
      // cleared the timeout) — without this the fade-out class would stay
      // applied and the content would hold at opacity 0
      setFadingOut(false);
      return;
    }
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
      <ScrollToTop />
      <CaseStudyLoader />
      <Routes>
        <Route path="/" element={<LandingPage {...shared} />} />
        <Route path="/about" element={<AboutPage {...shared} />} />
        <Route path="/work" element={<WorkPage {...shared} />} />
        <Route path="/work/:id" element={<CaseStudyRoute {...shared} />} />
      </Routes>
      {booting && <Preloader onDone={() => setBooting(false)} />}
    </HashRouter>
  );
}
