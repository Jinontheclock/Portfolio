import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PillButton from "./PillButton.jsx";

const PAGES = [
  { key: "work", label: "Work", path: "/work" },
  { key: "about", label: "About", path: "/about" },
];

/** Inner-page header from the About design: a pill labeled with the current
 *  page that opens a glass dropdown (Work / About), and the HAJIN wordmark
 *  centered, linking home. */
export default function SiteHeader({ current }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const currentPage = PAGES.find((p) => p.key === current);

  // Design behavior: clicking anywhere outside closes the menu
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="site-menu-anchor">
        <PillButton
          label={currentPage.label}
          active
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((open) => !open);
          }}
        />
        {menuOpen && (
          <div className="site-menu">
            {PAGES.map((p) => (
              <button
                key={p.key}
                type="button"
                className={"site-menu-item" + (p.key === current ? " is-current" : "")}
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  if (p.key !== current) navigate(p.path);
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <Link to="/" className="site-wordmark">
        HAJIN
      </Link>
    </header>
  );
}
