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
 *  filter) render inline after the nav pill via `children`. */
export default function SiteHeader({ current, children }) {
  const navigate = useNavigate();
  const currentPage = PAGES.find((p) => p.key === current);

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
      <Link to="/" className="site-wordmark">
        HAJIN
      </Link>
    </header>
  );
}
