import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PillButton from "./PillButton.jsx";

const PAGES = [
  { key: "work", label: "Work", path: "/work" },
  { key: "about", label: "About", path: "/about" },
];

/** Inner-page header: Work and About as two side-by-side pills (the current
 *  page reads active), and the HAJIN wordmark centered, linking home. On
 *  mobile the wordmark shows only at the very top of the page (CSS hides it
 *  once scrolled) so it doesn't ride over content in the sticky header. */
export default function SiteHeader({ current, children }) {
  const navigate = useNavigate();
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header">
      {PAGES.map((p) => (
        <PillButton
          key={p.key}
          label={p.label}
          active={p.key === current}
          onClick={() => {
            if (p.key !== current) navigate(p.path);
          }}
        />
      ))}
      {children}
      <Link to="/" className={"site-wordmark" + (atTop ? "" : " is-scrolled")}>
        HAJIN
      </Link>
    </header>
  );
}
