/** Ported from the design system's MetaList (components/site/MetaList.jsx):
 *  bold 40px label over a plain line-broken list. Empty strings in `items`
 *  render as blank rows, separating groups (as in the Education column). */
export default function MetaList({ label, items = [] }) {
  return (
    <div className="meta-list">
      <span className="meta-list-label">{label}</span>
      <div className="meta-list-items">
        {items.map((item, i) => (
          <span key={i}>{item === "" ? " " : item}</span>
        ))}
      </div>
    </div>
  );
}
