import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PillButton from "./PillButton.jsx";

const PAGES = [
  { key: "work", label: "Work", path: "/work" },
  { key: "about", label: "About", path: "/about" },
];

/** Inner-page header: Work and About as two side-by-side pills (the current
 *  page reads active), and the HAJIN wordmark centered, linking home. On
 *  mobile the whole header (nav + wordmark) shows only at the very top of
 *  the page — CSS fades it out once scrolled so nothing rides over content. */
export default function SiteHeader({ current, children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
            if (pathname !== p.path) navigate(p.path);
          }}
        />
      ))}
      {children}
      <Link to="/" className="site-wordmark">
        HAJIN
      </Link>
    </header>
  );
}
