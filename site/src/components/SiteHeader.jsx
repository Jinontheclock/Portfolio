import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PillButton from "./PillButton.jsx";
import useLangPath from "../hooks/useLangPath.js";
import withPageTransition, { crossing, leaving, routeOf } from "../lib/page-transition.js";

const PAGES = [
  { key: "work", label: "work", path: "/work" },
  { key: "about", label: "about", path: "/about" },
];

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
  const el = useRef(null);

  useEffect(() => {
    /* the window's scroll is the next page's from the moment this page
       starts to leave, and this header holds whatever it showed */
    const onScroll = () => {
      if (leaving(el.current)) return;
      setAtTop(window.scrollY < 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={el} className={"site-header" + (atTop ? "" : " is-scrolled")}>
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
            if (crossing(here, p.path)) withPageTransition(go);
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
          if (!crossing(here, "/")) return;
          e.preventDefault();
          withPageTransition(() => navigate(langPath("/")));
        }}
      >
        HAJIN
      </Link>
    </header>
  );
}
