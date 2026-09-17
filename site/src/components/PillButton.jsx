/** Ported from the design system's PillButton (components/core/PillButton.jsx):
 *  35px pill, 17px radius, translucent fill, 13.2px label.
 *
 *  With an `href` it is a link rather than a button, which is what the
 *  site's nav wants: a crawler reaching the landing page finds the way to
 *  the other pages, and a reader can open one in a new tab. The click
 *  handler still runs the page crossing — `onClick` is given the event so
 *  it can let a modified click through to the browser. `active` marks the
 *  page being read for a screen reader, not only in the paint. */
export default function PillButton({ children, label, active = false, onClick, href }) {
  const className = "pill-button" + (active ? " is-active" : "");
  if (href) {
    return (
      <a href={href} className={className} onClick={onClick} aria-current={active ? "page" : undefined}>
        {children ?? label}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      aria-current={active ? "page" : undefined}
    >
      {children ?? label}
    </button>
  );
}
