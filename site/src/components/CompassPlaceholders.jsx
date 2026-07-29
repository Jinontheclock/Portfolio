/* Structure-first placeholders for the Compass Card case study.
   Every figure, every solution screen and the hero render as a labelled
   dashed box, so the chapter structure and block rhythm can be reviewed
   before a single asset exists.
   These are replaced one at a time as artwork lands — the production order
   is in compass-card-toc-v4.md §7. To replace one, delete its entry from
   COMPASS_FIGURES / COMPASS_SHOTS below and register the real component or
   image under the same key. Nothing else has to change. */

const W = 1600;

/* a labelled dashed box, sized by aspect ratio. currentColor keeps it
   legible in whatever the page's text colour is. */
function Box({ label, note, ar = 16 / 9 }) {
  const h = Math.round(W / ar);
  return (
    <svg viewBox={`0 0 ${W} ${h}`} role="img" aria-label={`Placeholder — ${label}`}>
      <rect
        x="1"
        y="1"
        width={W - 2}
        height={h - 2}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeDasharray="14 12"
      />
      <text
        x={W / 2}
        y={h / 2 + (note ? -10 : 12)}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="36"
        fill="currentColor"
        fillOpacity="0.6"
      >
        {label}
      </text>
      {note && (
        <text
          x={W / 2}
          y={h / 2 + 40}
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="26"
          fill="currentColor"
          fillOpacity="0.4"
        >
          {note}
        </text>
      )}
    </svg>
  );
}

const fig = (label, note, ar) => {
  const C = () => <Box label={label} note={note} ar={ar} />;
  C.displayName = `Placeholder(${label})`;
  return C;
};

/* ── figure blocks — 15 still to draw. Chapters 01 to 03 are fully drawn,
   and ch04's coverage-and-roadmap diagram has landed too; those keys are
   registered from CompassFigures.jsx instead. ── */
export const COMPASS_FIGURES = {
  /* 04 Scope & Bets */
  "compass-fig-ia": fig("04 · IA — the two layers", "what you tap / what you manage", 16 / 8),
  "compass-fig-wireframes": fig("04 · Lo-fi wireframe board", "6–10 frames, one board only", 16 / 9),
  /* 05 One Tap, Every Ride */
  "compass-fig-tap-moment": fig("05 · THE TAP MOMENT", "first hi-fi screen of the case study", 16 / 10),
  "compass-fig-type": fig("05 · Type scale board", "foundations", 16 / 8),
  "compass-fig-colour": fig("05 · Colour + contrast board", "WCAG figures live here", 16 / 8),
  "compass-fig-component": fig("05 · Tap card component, every state", "foundations", 16 / 8),
  "compass-fig-tap-motion": fig("05 · Tap confirmation — motion", "mp4, inline figure", 16 / 9),
  "compass-fig-power-reserve": fig("05 · Power reserve screen", "", 16 / 9),
  /* 06 Everything the Website Held */
  "compass-ba-task": fig("06 · Before / after — the same task", "website vs app", 16 / 8),
  "compass-fig-reload-motion": fig("06 · Reload flow — motion", "mp4, inline figure", 16 / 9),
  "compass-fig-upass": fig("06 · U-Pass renewal screen", "", 16 / 9),
  /* 07 On the Wrist */
  "compass-fig-watch": fig("07 · Watch screens", "3–5 screens", 16 / 7),
  "compass-fig-watch-mapping": fig("07 · Phone ↔ watch component mapping", "", 16 / 7),
  /* 08 What Held Up, What Didn't */
  "compass-fig-task-table": fig("08 · Task-step measurement table", "counted by hand", 16 / 8),
  "compass-fig-audit": fig("08 · Heuristic + accessibility findings", "", 16 / 8),
};

/* ── solution screens — 17 keys.
   SHOTS entries must be { src, alt } and are read as <img src>, so these
   are data-URI SVGs rather than components. An unregistered media key is
   the one lookup in this codebase that hard-crashes the page, so every key
   used in projects.js must exist here. ── */
const shot = (label, w = 402, h = 874) => {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">` +
    `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="rgb(250,250,250)" ` +
    `stroke="rgb(170,170,170)" stroke-width="2" stroke-dasharray="10 8"/>` +
    `<text x="${w / 2}" y="${h / 2}" text-anchor="middle" ` +
    `font-family="ui-sans-serif, system-ui, sans-serif" font-size="22" ` +
    `fill="rgb(130,130,130)">${label}</text></svg>`;
  return {
    src: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    alt: `Placeholder — ${label}`,
  };
};

export const COMPASS_SHOTS = {
  /* 05 */
  "compass-shot-wallet-01": shot("Wallet pass"),
  "compass-shot-wallet-02": shot("Wallet pass — detail"),
  "compass-shot-tap-01": shot("Tap — ready"),
  "compass-shot-tap-02": shot("Tap — confirmed"),
  "compass-shot-ferry-01": shot("Ferry tap"),
  "compass-shot-ferry-02": shot("Ferry — confirmed"),
  "compass-shot-boundary-01": shot("Out of coverage — Victoria"),
  /* 06 */
  "compass-shot-balance-01": shot("Balance"),
  "compass-shot-balance-02": shot("Trip history"),
  "compass-shot-reload-01": shot("Reload"),
  "compass-shot-reload-02": shot("Autoload"),
  "compass-shot-passes-01": shot("Passes"),
  "compass-shot-passes-02": shot("Pass expiring"),
  "compass-shot-upass-01": shot("U-Pass — linked"),
  "compass-shot-upass-02": shot("U-Pass — renewed"),
  "compass-shot-card-01": shot("Lost card"),
  "compass-shot-card-02": shot("Cards — one balance"),
};

/* ── hero ──
   heroScene renders straight into .cs-content with no wrapper, so this
   supplies its own .cs-figure to pick up the existing sizing rules. */
export function CompassHero() {
  return (
    <figure className="cs-figure">
      <Box label="HERO SCENE" note="placeholder — see v4 §9 decision 4" ar={16 / 7} />
    </figure>
  );
}
