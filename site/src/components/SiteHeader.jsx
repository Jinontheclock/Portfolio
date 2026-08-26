import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PillButton from "./PillButton.jsx";
import useLangPath from "../hooks/useLangPath.js";
import withViewTransition from "../lib/viewTransition.js";
import { splitLang } from "../lib/lang-routes.js";

const PAGES = [
  { key: "work", label: "Work", path: "/work" },
  { key: "about", label: "About", path: "/about" },
];

/* The pages that cross with a page transition, and which side the one
   arriving comes in from.

   A case study is deliberately not on this list yet, in either direction.
   The two heavy ones already come in behind the count-up cover, and a
   crossing plus a cover on the same move is a decision nobody has made.
   Until then a case study opens and closes the way it always did.

   The landing page is the one a reader comes back to, so it arrives from
   the left; Work and About are further in and arrive from the right. */
const CROSSING = ["/", "/work", "/about"];
const crosses = (from, to) => CROSSING.includes(from) && CROSSING.includes(to);
const arrivesFrom = (to) => (to === "/" ? "left" : "right");

/* Where the reader is, as one of the paths above. A page reached by URL
   keeps its trailing slash — the prerendered pages are served at /work/ —
   while the same page reached in-app has none, so without this the two
   are different places and half the crossings quietly do nothing. */
const routeOf = (pathname) => splitLang(pathname).rest.replace(/\/+$/, "") || "/";

/** Inner-page header: Work and About as two side-by-side pills (the current
 *  page reads active), and the HAJIN wordmark centered, linking home. On
 *  mobile the whole header (nav + wordmark) shows only at the very top of
 *  the page — CSS fades it out once scrolled so nothing rides over content. */
export default function SiteHeader({ current, children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const langPath = useLangPath();
  // the pills compare where the reader is without the language prefix
  const here = routeOf(pathname);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"site-header" + (atTop ? "" : " is-scrolled")}>
      {PAGES.map((p) => (
        <PillButton
          key={p.key}
          label={p.label}
          active={p.key === current}
          onClick={() => {
            // compare routes, not the highlighted section — a case-study page
            // highlights Work but still needs the button to reach /work
            if (here === p.path) return;
            const go = () => navigate(langPath(p.path));
            if (crosses(here, p.path)) withViewTransition(go, arrivesFrom(p.path));
            else go();
          }}
        />
      ))}
      {children}
      <Link
        to={langPath("/")}
        className="site-wordmark"
        onClick={(e) => {
          /* a modified or middle click is "open this somewhere else", not
             a crossing — the browser and the Link keep those */
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          if (!crosses(here, "/")) return;
          e.preventDefault();
          withViewTransition(() => navigate(langPath("/")), arrivesFrom("/"));
        }}
      >
        HAJIN
      </Link>
    </header>
  );
}
