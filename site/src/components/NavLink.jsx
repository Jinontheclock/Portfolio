/** Ported from the design system's NavLink (components/core/NavLink.jsx):
 *  plain 16px text link, dims to 50% on hover. */
export default function NavLink({ children, label, href = "#", muted = false, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={"nav-link" + (muted ? " is-muted" : "")}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {children ?? label}
    </a>
  );
}
