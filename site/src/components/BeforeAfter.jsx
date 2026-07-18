import { noOrphan } from "../lib/no-orphan.js";

/* Usability-testing fix: a labelled before/after screen pair with its own
   caption, so several fixes can share one figure row. Shared across case
   studies (ProLog, TinyPaws). */
export default function BeforeAfter({ before, after, name, caption }) {
  return (
    <div className="cs-ba-col">
      <div className="cs-ba-row">
        <div className="cs-ba-cell">
          <span className="cs-ba-label">Before</span>
          <img src={before} alt={`${name} — before the usability fixes`} loading="lazy" />
        </div>
        <div className="cs-ba-cell">
          <span className="cs-ba-label">After</span>
          <img src={after} alt={`${name} — after the usability fixes`} loading="lazy" />
        </div>
      </div>
      <p className="cs-figure-caption">{noOrphan(caption)}</p>
    </div>
  );
}
