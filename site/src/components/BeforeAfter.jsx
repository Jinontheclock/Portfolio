import { noOrphan } from "../lib/no-orphan.js";

/* Usability-testing fix: a labelled before/after screen pair. Shared across
   case studies (ProLog, TinyPaws). By default it carries its own caption and
   auto-writes the two alts from `name`; pass `beforeAlt`/`afterAlt` for
   descriptive alts, and omit `caption` to let the surrounding <figure> own it. */
export default function BeforeAfter({
  before,
  after,
  name,
  caption,
  beforeAlt,
  afterAlt,
}) {
  return (
    <div className="cs-ba-col">
      <div className="cs-ba-row">
        <div className="cs-ba-cell">
          <span className="cs-ba-label">Before</span>
          <img
            src={before}
            alt={beforeAlt ?? `${name}: before the usability fixes`}
            loading="lazy"
          />
        </div>
        <div className="cs-ba-cell">
          <span className="cs-ba-label">After</span>
          <img
            src={after}
            alt={afterAlt ?? `${name}: after the usability fixes`}
            loading="lazy"
          />
        </div>
      </div>
      {caption && <p className="cs-figure-caption">{noOrphan(caption)}</p>}
    </div>
  );
}
