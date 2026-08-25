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

/* Which crossings are cross-faded, as pairs of "where the reader is" and
   "where the button goes". Only the landing page's Work button so far:
   that is the site's front door, and the two screens already share a
   header — Work and About sit at the same place and size on both, so the
   fade is the hero giving way to the cards while the labels hold still.

   Kept as a list rather than a boolean because the rest of the crossings
   are still to be decided, and adding one should be adding a line here
   rather than unpicking a condition. */
const CROSSFADE = [["/", "/work"]];
const isCrossFade = (from, to) => CROSSFADE.some(([a, b]) => a === from && b === to);

/** Inner-page header: Work and About as two side-by-side pills (the current
 *  page reads active), and the HAJIN wordmark centered, linking home. On
 *  mobile the whole header (nav + wordmark) shows only at the very top of
 *  the page — CSS fades it out once scrolled so nothing rides over content. */
export default function SiteHeader({ current, children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const langPath = useLangPath();
  // the pills compare where the reader is without the language prefix
  const here = splitLang(pathname).rest;
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
            if (isCrossFade(here, p.path)) withViewTransition(go);
            else go();
          }}
        />
      ))}
      {children}
      <Link to={langPath("/")} className="site-wordmark">
        HAJIN
      </Link>
    </header>
  );
}
