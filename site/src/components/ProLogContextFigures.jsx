/* Context figures for the ProLog case study — hand-drawn SVGs in the site's
   design language (greys on the page background, ProLog orange accents,
   type inherited from the page). Each scales to the content column via its
   viewBox. */

const GREY_TRACK = "#A5A5A5";
const GREY_CARD = "#F2F2F2";
const GREY_EDGE = "#DDDDDD";
const INK = "#0F0F0F";
const BODY = "#2E2E2E";
const MUTED = "#8F8F8F";
const ORANGE = "#E54E03";

/* ① The 6,000-hour certification timeline: four levels of technical
   training along a dashed track, hours accumulating to the Red Seal. */
export function TimelineFigure() {
  const levels = [
    { x: 135, hours: "1,500 hrs", label: "Level 1" },
    { x: 262, hours: "3,000 hrs", label: "Level 2" },
    { x: 389, hours: "4,500 hrs", label: "Level 3" },
    { x: 516, hours: "6,000 hrs", label: "Level 4" },
  ];
  return (
    <svg viewBox="0 0 660 190" role="img" aria-label="Timeline of a four-year BC apprenticeship reaching 6,000 hours and the Red Seal">
      {/* track */}
      <line x1="30" y1="100" x2="596" y2="100" stroke={GREY_TRACK} strokeWidth="2" strokeDasharray="7 7" />
      {/* start node */}
      <circle cx="30" cy="100" r="7" fill={GREY_TRACK} />
      <text x="30" y="130" textAnchor="start" fontSize="12" fill={MUTED}>
        Year 1
      </text>
      {/* level nodes */}
      {levels.map((l) => (
        <g key={l.label}>
          <circle cx={l.x} cy="100" r="7" fill="#FAFAFA" stroke={GREY_TRACK} strokeWidth="2" />
          <text x={l.x} y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill={BODY}>
            {l.hours}
          </text>
          <text x={l.x} y="130" textAnchor="middle" fontSize="13" fill={BODY}>
            {l.label}
          </text>
          <text x={l.x} y="148" textAnchor="middle" fontSize="11" fill={MUTED}>
            ~100 competencies
          </text>
        </g>
      ))}
      {/* Red Seal terminus */}
      <circle cx="622" cy="100" r="16" fill="none" stroke={ORANGE} strokeWidth="1.5" opacity="0.35" />
      <circle cx="622" cy="100" r="9" fill={ORANGE} />
      <text x="622" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill={ORANGE}>
        Red Seal
      </text>
      <text x="638" y="130" textAnchor="end" fontSize="12" fill={MUTED}>
        ≈ 4 years
      </text>
    </svg>
  );
}

/* ② Fragmented → unified: the four scattered systems an apprentice juggles,
   converging into one view. */
export function FragmentsFigure() {
  const cards = [
    { y: 22, r: -2.5, label: "SkilledTradesBC portal" },
    { y: 78, r: 2, label: "PDF competency guides" },
    { y: 134, r: -1.5, label: "Finance resources" },
    { y: 190, r: 2.5, label: "Union forums" },
  ];
  return (
    <svg viewBox="0 0 660 244" role="img" aria-label="Four disconnected systems converging into ProLog">
      {/* scattered sources */}
      {cards.map((c) => (
        <g key={c.label} transform={`rotate(${c.r} 120 ${c.y + 16})`}>
          <rect x="20" y={c.y} width="200" height="34" rx="9" fill={GREY_CARD} stroke={GREY_EDGE} />
          <text x="120" y={c.y + 21} textAnchor="middle" fontSize="12" fill={BODY}>
            {c.label}
          </text>
        </g>
      ))}
      {/* converging connectors */}
      <path d="M228 39 C 330 39, 350 110, 420 118" stroke={GREY_TRACK} strokeWidth="1.5" strokeDasharray="5 6" fill="none" />
      <path d="M228 95 C 320 95, 350 115, 420 120" stroke={GREY_TRACK} strokeWidth="1.5" strokeDasharray="5 6" fill="none" />
      <path d="M228 151 C 320 151, 350 129, 420 124" stroke={GREY_TRACK} strokeWidth="1.5" strokeDasharray="5 6" fill="none" />
      <path d="M228 207 C 330 207, 350 134, 420 126" stroke={GREY_TRACK} strokeWidth="1.5" strokeDasharray="5 6" fill="none" />
      {/* the unified view */}
      <rect x="428" y="58" width="204" height="128" rx="22" fill="#FFFFFF" stroke={ORANGE} strokeWidth="2" />
      <text x="530" y="106" textAnchor="middle" fontSize="20" fontWeight="700" fill={ORANGE}>
        ProLog
      </text>
      <text x="530" y="128" textAnchor="middle" fontSize="12" fill={MUTED}>
        one clear view
      </text>
      <rect x="466" y="146" width="128" height="6" rx="3" fill={GREY_CARD} />
      <rect x="466" y="146" width="92" height="6" rx="3" fill={ORANGE} />
    </svg>
  );
}

/* ③ Who we designed for: prevalence stat and our own survey, with the
   header and sources built in (no external caption). */
export function AudienceFigure() {
  // five person glyphs, one orange
  const person = (x, fill) => (
    <g key={x} transform={`translate(${x} 140)`}>
      <circle cx="0" cy="0" r="9" fill={fill} />
      <path d="M -14 34 C -14 18, 14 18, 14 34 L 14 40 L -14 40 Z" fill={fill} />
    </g>
  );
  return (
    <svg viewBox="0 0 660 258" role="img" aria-label="One in five Canadians is neurodivergent; a majority of the BCIT apprentices we surveyed identified as such">
      {/* built-in header */}
      <text x="20" y="34" fontSize="12" letterSpacing="2.5" fontWeight="700" fill={MUTED}>
        WHO WE DESIGNED FOR
      </text>
      <line x1="20" y1="48" x2="640" y2="48" stroke={GREY_EDGE} strokeWidth="1" />

      {/* left stat: 1 in 5 */}
      <text x="20" y="112" fontSize="46" fontWeight="700" fill={INK}>
        1 in 5
      </text>
      {[0, 1, 2, 3, 4].map((i) => person(38 + i * 44, i === 0 ? ORANGE : GREY_TRACK))}
      <text x="20" y="208" fontSize="13" fill={BODY}>
        Canadians is neurodivergent
      </text>

      {/* divider */}
      <line x1="330" y1="72" x2="330" y2="210" stroke={GREY_EDGE} strokeWidth="1" />

      {/* right stat: our survey */}
      <text x="362" y="112" fontSize="46" fontWeight="700" fill={ORANGE}>
        Majority
      </text>
      <text x="362" y="140" fontSize="13" fill={BODY}>
        of the trades apprentices we surveyed
      </text>
      <text x="362" y="158" fontSize="13" fill={BODY}>
        at BCIT identified as neurodivergent
      </text>
      <rect x="362" y="176" width="240" height="6" rx="3" fill={GREY_CARD} />
      <rect x="362" y="176" width="152" height="6" rx="3" fill={ORANGE} />

      {/* built-in sources */}
      <text x="20" y="240" fontSize="11" fill={MUTED}>
        Sources: commonly cited prevalence estimates for neurodivergence · ProLog team survey, BCIT (2025)
      </text>
    </svg>
  );
}
