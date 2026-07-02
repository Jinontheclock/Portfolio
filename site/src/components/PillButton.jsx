/** Ported from the design system's PillButton (components/core/PillButton.jsx):
 *  35px pill, 17px radius, translucent fill, 13.2px label. */
export default function PillButton({ children, label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={"pill-button" + (active ? " is-active" : "")}
    >
      {children ?? label}
    </button>
  );
}
