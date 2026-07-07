import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown.jsx";
import PillButton from "./PillButton.jsx";

const PAGES = [
  { key: "work", label: "Work", path: "/work" },
  { key: "about", label: "About", path: "/about" },
];

/** Inner-page header from the About design: a pill labeled with the current
 *  page that opens a glass dropdown (Work / About), and the HAJIN wordmark
 *  centered, linking home. Extra pills (e.g. the Work page's category
 *  filter) render inline after the nav pill via `children`. On mobile the
 *  wordmark shows only at the very top of the page (CSS hides it once
 *  scrolled) so it doesn't ride over content in the sticky header. */
export default function SiteHeader({ current, children }) {
  const navigate = useNavigate();
  const currentPage = PAGES.find((p) => p.key === current);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header">
      <Dropdown
        renderTrigger={(toggle) => (
          <PillButton label={currentPage.label} active onClick={toggle} />
        )}
        items={PAGES.map((p) => ({
          label: p.label,
          current: p.key === current,
          onSelect: () => navigate(p.path),
        }))}
      />
      {children}
      <Link to="/" className={"site-wordmark" + (atTop ? "" : " is-scrolled")}>
        HAJIN
      </Link>
    </header>
  );
}
