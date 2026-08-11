import oldShowcaseChallenge from "../assets/welab/welab-old-showcase-challenge.webp";
import oldShowcaseSolution from "../assets/welab/welab-old-showcase-solution.webp";
import auditHomeFooter from "../assets/welab/welab-audit-home-footer.webp";
import auditTaxTablet from "../assets/welab/welab-audit-tax-tablet.webp";
import auditTax1200 from "../assets/welab/welab-audit-tax-1200.webp";
import auditTaxMobile from "../assets/welab/welab-audit-tax-mobile.webp";
import auditWhoWeAre from "../assets/welab/welab-audit-whoweare.webp";
import auditClients from "../assets/welab/welab-audit-clients.webp";
import oldLandingDesktop from "../assets/welab/welab-old-landing-desktop.webp";
import oldLandingCards from "../assets/welab/welab-old-landing-cards.webp";
import oldLandingMobile from "../assets/welab/welab-old-landing-mobile.webp";
import oldStudios from "../assets/welab/welab-old-studios.webp";
import afterWhoWeAre from "../assets/welab/welab-after-whoweare.webp";
import footerBaBefore from "../assets/welab/welab-ba-footer-before.webp";
import footerBaAfter from "../assets/welab/welab-ba-footer-after.webp";
import langEn from "../assets/welab/welab-lang-en.webp";
import langEs from "../assets/welab/welab-lang-es.webp";
import clientsBaBefore from "../assets/welab/welab-ba-clients-before.webp";
import clientsBaAfter from "../assets/welab/welab-ba-clients-after.webp";
import figWorkflow from "../assets/welab/welab-fig-workflow.webp";
import taxNewDesktop from "../assets/welab/welab-tax-new-desktop.webp";
import taxNewMobile from "../assets/welab/welab-tax-new-mobile.webp";
import afterFeatured from "../assets/welab/welab-after-featured.webp";
import figma2Col from "../assets/welab/welab-figma-featured-2col.webp";
import figma3Col from "../assets/welab/welab-figma-featured-3col.webp";
import figmaCarousel from "../assets/welab/welab-figma-featured-carousel.webp";
import figma3ColHover from "../assets/welab/welab-figma-featured-3col-hover.webp";
import figmaRows from "../assets/welab/welab-figma-featured-rows.webp";

/* Context figures for the WeLAB case study. Figures whose source images
   the owner hasn't provided yet are not registered — their blocks render
   nothing until the assets land. */

/* ── 02 Auditing the Live Site ── */

/* the old project page's two showcase sections, as the two captures they
   are — each stacking a before frame above its after, no way to compare.
   No cell labels: the figure's own caption below already names both
   sections, and the shots carry the headings in the frame. */
export function WLOldShowcaseFigure() {
  return (
    <AuditRows
      rows={[
        [
          {
            src: oldShowcaseChallenge, ar: 0.874,
            alt: "The Challenge section of the old project page — the crowd plate and the finished shot as separate stills, stacked",
          },
          {
            src: oldShowcaseSolution, ar: 0.874,
            alt: "The Solution section of the old project page — the sportscast plate and the finished broadcast graphics as separate stills, stacked",
          },
        ],
      ]}
    />
  );
}

/* The audit and before/after figures all share ONE image height so the
   case study reads evenly, row to row. Each cell's width is its aspect
   ratio over a shared reference (2.852 — as much as the widest row on this
   scale can spend), so every image resolves to the same height —
   (columnWidth − 40px) / 2.852 — at any screen width, and no row overflows
   or wraps. Rows just stop short of the full column width, which is fine.
   The 40px is the widest gap a row on this scale needs (the three-up's two
   20px row gaps — the arrow's crossover allowance is gone, handed back to
   the images), so budgeting it everywhere keeps one height for all. */
const UNIF = (ar) => `calc((100% - 40px) * ${(ar / 2.852).toFixed(4)})`;

/* the old site captured page by page — individual images laid out in rows,
   each cell sized to its device class, unlabelled: the figure's own caption
   below reads them off left to right. */
const AUDIT_TAX_ROW = [
  { src: auditTaxTablet, ar: 1.229, alt: "The old Tax Credits section at tablet width — Vancouver, Calgary, and Guadalajara incentive cards in three uneven columns" },
  { src: auditTax1200, ar: 0.734, alt: "The old Tax Credits section at 1200px — the incentive cards collapse into a two-plus-one arrangement leaving a stray gap" },
  { src: auditTaxMobile, ar: 0.325, alt: "The old Tax Credits section on a phone — the incentive cards stacked in a single column" },
];

const AUDIT_SECTIONS_ROW = [
  { src: auditWhoWeAre, ar: 1.537, alt: "The Who We Are section of the old About Us page — the studio's collective statement beside oversized stat lines" },
  { src: auditClients, ar: 0.849, alt: "The Our Clients section of the old About Us page — a logo wall under the Amazing Battles, Amazed Clients headline" },
  { src: auditHomeFooter, ar: 0.46, alt: "The old home page footer on a phone — Light the Fire Within headline, contact button, social icons, and the WeLAB wordmark" },
];

/* A cell may carry `ba: "before" | "after"`. Every pair is announced the
   way the shared BeforeAfter pairs are — Before and After labels above
   the captures; the labels alone separate the two states, so the
   crossover keeps the plain row gap.
   A cell states its shape once, as `ar`; its width follows from that on the
   shared scale. Only rows that can't fit on that scale — the four-up, the
   Who We Are pair, the Figma five-across, the EN/ES pair — carry their own
   `w`, sized against their row's own total. */
function AuditRows({ rows }) {
  return (
    <div className="wl-audit">
      {rows.map((row, i) => (
        <div key={i} className="wl-audit-row">
          {row.map((cell) => {
            return (
              <figure
                key={cell.label || cell.src}
                className={
                  "wl-audit-cell" +
                  /* a before/after caption sits above its capture, top left,
                     like the shared BeforeAfter pairs — variant labels
                     (“2 columns”, “English”) stay below */
                  (cell.ba ? " wl-cell--ba" : "")
                }
                /* --ar lets the phone layout share the row out in proportion
                   to each capture's shape (see casestudy.css) */
                style={{ width: cell.w || UNIF(cell.ar), "--ar": cell.ar }}
              >
                <span className="wl-cell-shot">
                  <img src={cell.src} alt={cell.alt} loading="lazy" />
                </span>
                {cell.label && <figcaption>{cell.label}</figcaption>}
              </figure>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function WLAuditResponsiveFigure() {
  return <AuditRows rows={[AUDIT_TAX_ROW]} />;
}

export function WLAuditSectionsFigure() {
  return <AuditRows rows={[AUDIT_SECTIONS_ROW]} />;
}

/* ── 03 Designing and Building: the mission loop ── */
export function WLWorkflowFigure() {
  return (
    <img
      src={figWorkflow}
      alt="The iteration loop used for every mission — mission, ideation, draft, feedback, implementation, feedback, completion, with both feedback stages looping back to the step before them"
      loading="lazy"
    />
  );
}

/* ── 03 Designing and Building ── */

/* P02: the audit finds the rebuild is proven on — Tax Credits, Who We Are,
   the home footer, and Clients & Awards, each before/after in one row
   (widths ∝ aspect ratios).
   Labels lead with the state, then the screen or the section, so the eye
   picks up before/after first. A non-breaking space glues the dash to the
   state: a narrow cell then wraps as "before —" / "mobile" instead of
   dropping the dash onto a line of its own. */
const LAYOUT_ROWS = [
  /* the only four-up row: the old captures sit left of the rebuilt pair, so
     the fix reads across in one line. Four cells can't fit at the shared
     height, so this row is scaled to its own total (3.719) and renders
     shorter than the rest. One label per side, on the desktop capture that
     opens each pair — four would only repeat before/after twice. */
  [
    { src: auditTaxTablet, ar: 1.229, w: "calc((100% - 60px) * 0.3305)", ba: "before", label: "Before", alt: "The old Tax Credits section at tablet width — Vancouver, Calgary, and Guadalajara incentive cards in three uneven columns" },
    { src: auditTaxMobile, ar: 0.325, w: "calc((100% - 60px) * 0.0874)", ba: "before", alt: "The old Tax Credits section on a phone — the incentive cards stacked in a single column" },
    { src: taxNewDesktop, ar: 1.794, w: "calc((100% - 60px) * 0.4824)", ba: "after", label: "After", alt: "The rebuilt Tax Credits section on desktop — Vancouver, Calgary, and Guadalajara incentive cards holding three even columns" },
    { src: taxNewMobile, ar: 0.371, w: "calc((100% - 60px) * 0.0998)", ba: "after", alt: "The rebuilt Tax Credits section on a phone — the incentive cards stacked in one clean column" },
  ],
  /* both captures are cropped tight to the section, so this pair's shapes
     add up past the shared reference: like the tax row it takes its own
     total (3.329) and renders a shorter box. The sections inside still come
     out the size they were before the crop — only the empty band above and
     below each one is gone. */
  [
    { src: auditWhoWeAre, ar: 1.537, w: "calc((100% - 20px) * 0.4617)", label: "Before", ba: "before", alt: "The Who We Are section of the old About Us page — the studio's collective statement beside oversized stat lines" },
    { src: afterWhoWeAre, ar: 1.792, w: "calc((100% - 20px) * 0.5383)", ba: "after", label: "After", alt: "The rebuilt Who We Are section — the statement, supporting copy, and stat lines aligned on one grid" },
  ],
  [
    { src: footerBaBefore, ar: 0.59, ba: "before", label: "Before", alt: "The old home page footer on a phone — social icons spilling onto a second row under the Contact Us button" },
    { src: footerBaAfter, ar: 0.59, ba: "after", label: "After", alt: "The rebuilt home footer on a phone — the same components aligned, the social icons on one row" },
  ],
  [
    { src: clientsBaBefore, ar: 0.97, ba: "before", label: "Before", alt: "The Our Clients section of the old About Us page — a logo wall under the Amazing Battles, Amazed Clients headline" },
    { src: clientsBaAfter, ar: 0.977, ba: "after", label: "After", alt: "The rebuilt Our Clients section — the logo wall realigned on the shared grid" },
  ],
];

export function WLLayoutSystemFigure() {
  return <AuditRows rows={LAYOUT_ROWS} />;
}

/* O01: the featured case-studies section explored in Figma — five layout
   variants, one row, in the order they were presented */
const FIGMA_FEATURED_ROW = [
  { src: figma2Col, ar: 0.96, w: "calc((100% - 80px) / 5)", label: "2 columns", alt: "Figma exploration of the featured case-studies section — two cards side by side" },
  { src: figma3Col, ar: 0.96, w: "calc((100% - 80px) / 5)", label: "3 columns", alt: "Figma exploration of the featured case-studies section — three cards side by side" },
  { src: figmaCarousel, ar: 0.96, w: "calc((100% - 80px) / 5)", label: "carousel", alt: "Figma exploration of the featured case-studies section — one large card with the next peeking in from the edge" },
  { src: figma3ColHover, ar: 0.96, w: "calc((100% - 80px) / 5)", label: "3 columns — hover", alt: "Figma exploration of the featured case-studies section — the hovered card enlarged between two dimmed neighbours" },
  { src: figmaRows, ar: 0.96, w: "calc((100% - 80px) / 5)", label: "rows", alt: "Figma exploration of the featured case-studies section — three full-width rows stacked" },
];

export function WLFigmaFeaturedFigure() {
  return <AuditRows rows={[FIGMA_FEATURED_ROW]} />;
}

/* O01: the shipped featured case-studies UI, as it runs on the live site
   (the old landing already appears under ch02's Opportunity 01) */
const LANDING_ROWS = [
  [
    /* cropped to the project cards alone, so the pair compares like with
       like: the old front page's two cards against the new section */
    { src: oldLandingCards, ar: 0.859, ba: "before", label: "Before", alt: "The old landing page's project cards — Torch of Rock and Roll and A Winning Team, each card taking a full screen of its own" },
    { src: afterFeatured, ar: 1.69, ba: "after", label: "After", alt: "The featured case-studies section on the live site — the studio's three newest case studies on one grid, each with a clear way in" },
  ],
];

export function WLLandingBAFigure() {
  return <AuditRows rows={LANDING_ROWS} />;
}

/* O02: the same project page on the live site, in both languages */
const LANG_ROW = [
  { src: langEn, ar: 1.49, w: "calc((100% - 20px) * 0.5)", label: "English", alt: "The Game, Set, Love project page on the live site in English — credits, then The Challenge, Our Take, and The Solution" },
  { src: langEs, ar: 1.488, w: "calc((100% - 20px) * 0.5)", label: "Spanish", alt: "The same page switched to Spanish — El Reto, Nuestra Perspectiva, and La Solución" },
];

export function WLLangToggleFigure() {
  return <AuditRows rows={[LANG_ROW]} />;
}

/* Opportunity 01: the old landing page leading with the same two project
   cards, on desktop and on a phone — like the audit rows and, like them,
   unlabelled: the figure's caption below says what they are. Full-page
   captures are far taller than the shared height, so this pair takes its own
   widths, in its own aspect-ratio proportion (0.479 : 0.177). */
const OLD_LANDING_ROW = [
  { src: oldLandingDesktop, ar: 0.479, w: "40%", alt: "The old landing page on desktop — the hero followed by the same two project cards, Torch of Rock and Roll and A Winning Team" },
  { src: oldLandingMobile, ar: 0.177, w: "14.78%", alt: "The old landing page on a phone — the hero and the same two project cards stacked in one column" },
];

export function WLOldLandingFigure() {
  return <AuditRows rows={[OLD_LANDING_ROW]} />;
}

/* Opportunity 02: the studios section — three cities, three time zones,
   one English-only site */
export function WLOldStudiosFigure() {
  return (
    <AuditRows
      rows={[
        [
          {
            src: oldStudios, ar: 1.316,
            alt: "The site's Our Studios section — We Are Citizens of the World over local clocks for Guadalajara, Calgary, and Vancouver",
          },
        ],
      ]}
    />
  );
}

