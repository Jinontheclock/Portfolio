import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import useLang from "./hooks/useLang.js";
import { LANGS, RETIRED, splitLang, stripRetired, swapLang, withLang } from "./lib/lang-routes.js";
import Preloader from "./components/Preloader.jsx";
import { useRouteCommitted } from "./lib/viewTransition.js";
import useScrollMemory from "./lib/scroll-memory.js";
import LandingPage from "./pages/LandingPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import CaseStudyPage from "./pages/CaseStudyPage.jsx";

const FADE_MS = 350; // keep in sync with .lang-fade-* in components.css

// A page the reader chose starts at the top; a page they came back to opens
// where they left it. Without the first, the browser keeps the old page's
// offset and a case study opened from a scrolled Work page lands mid-chapter.
// Without the second, the back button costs them their place in the list —
// worst on mobile, where the Work page is long. See lib/scroll-memory.js.
function ScrollMemory() {
  /* a page transition, if one is waiting, is released the moment the new
     page is in the DOM — see lib/viewTransition.js */
  useRouteCommitted();
  useScrollMemory();
  return null;
}

// TinyPaws and WeLAB used to raise the count-up cover again when they were
// opened from inside the app, to hide their hero video assembling. The page
// crossing does that job now: it carries the reader across on its own clock
// and lands them at the top of the new page, and a second cover on top of
// it only replaced the page with a blank field for the length of the move.
// A case study opened from inside now behaves like the other three always
// did — the top of it is what arrives, and the rest streams in below.
//
// The boot cover is untouched. A case study reached by URL, a reload, or a
// pasted link still comes up behind it, because there is no crossing there
// to carry the wait.

// remount the case-study page whenever :id changes, so per-project state
// (the password gate, the demo modal, the scroll spy) never carries over
// from one project to the next
function CaseStudyRoute(props) {
  const { id } = useParams();
  return <CaseStudyPage key={id} {...props} />;
}

/* Japanese and Korean are held back for now (see lib/lang-routes.js), so
   nothing generates a /ja or /ko route any more. Those URLs are still out
   in the world — they were in the sitemap, and one may be bookmarked or
   linked — so instead of resolving to nothing they hand the reader the
   same page in English. When the two come back, RETIRED is empty and
   these routes go with it. */
function RetiredLangRedirect() {
  const { pathname } = useLocation();
  return <Navigate to={stripRetired(pathname)} replace />;
}

// the boot loader (0→100 count) covers the app's first load on ANY route so
// no page is ever seen mid-assembly (font refits, hero SVG/image pop-in);
// in-app navigation never re-triggers it
let booted = false;

/* The four pages, rendered once per language. */
const PAGES = [
  { path: "", element: LandingPage },
  { path: "about", element: AboutPage },
  { path: "work", element: WorkPage },
  { path: "work/:id", element: CaseStudyRoute },
];

export default function App() {
  return (
    /* Real paths, not #fragments. A crawler is handed the same document for
       every #route, so the case studies did not exist as far as search was
       concerned and every shared link previewed as the same card. The build
       writes a static page per route and language to match (see
       vite.config.js), and 404.html catches anything else so a deep link
       survives a cold load. basename carries the deploy's base, which is
       /Portfolio/ on the project page and / on a domain. */
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Site />
    </BrowserRouter>
  );
}

function Site() {
  /* The URL says which language this is; nothing else does. That is what
     makes /ko/work/prolog a link someone can send, and what hreflang needs
     to point at. The stored preference only decides where a bare visit to
     the root goes (see useLang), and never overrides a language already in
     the path. */
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const urlLang = splitLang(pathname).lang;
  const { remember } = useLang();
  const setLang = (code) => {
    remember(code);
    navigate(swapLang(pathname, code));
  };
  const lang = urlLang;
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

    /* Late reflows — the new language's font subset resolving a beat after
       the swap — change the page height again after that first restore, so
       the bottom distance has to be held a moment longer.

       Watching the document's own height says exactly that, and only fires
       when it actually changes. Polling on a timer said it 16 times a
       second whether or not anything moved, and could only be called off by
       wheel and touchstart: scrolling by keyboard, dragging the scrollbar,
       or clicking a chapter in the table of contents all got yanked back
       for a second and a half. */
    const doc = document.documentElement;
    const ro = new ResizeObserver(() => pin());
    ro.observe(doc);

    const stop = () => ro.disconnect();
    const end = setTimeout(stop, 1500);
    /* any deliberate scroll hands control back immediately */
    const events = ["wheel", "touchstart", "keydown", "pointerdown"];
    events.forEach((e) => window.addEventListener(e, stop, { once: true, passive: true }));

    return () => {
      stop();
      clearTimeout(end);
      events.forEach((e) => window.removeEventListener(e, stop));
    };
  }, [displayLang]);

  // pages put this on their localized content only, so fixed chrome like
  // the landing language switcher doesn't blink with every switch
  const fadeClass = fadingOut ? "lang-fade-out" : "lang-fade-in";
  const shared = { lang: displayLang, setLang, fadeClass };

  return (
    <>
      <ScrollMemory />
      <Routes>
        {LANGS.flatMap((l) =>
          PAGES.map((p) => {
            const Page = p.element;
            return (
              <Route
                key={l + "/" + p.path}
                path={withLang(l, p.path ? `/${p.path}` : "/")}
                element={<Page {...shared} />}
              />
            );
          }),
        )}
        {RETIRED.map((l) => (
          <Route key={"retired-" + l} path={`/${l}/*`} element={<RetiredLangRedirect />} />
        ))}
      </Routes>
      {booting && <Preloader onDone={() => setBooting(false)} />}
    </>
  );
}
