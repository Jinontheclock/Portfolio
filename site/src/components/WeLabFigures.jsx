import { Fragment } from "react";
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
import footerBaBefore from "../assets/welab/welab-footer-ba-before.webp";
import footerBaAfter from "../assets/welab/welab-footer-ba-after.webp";
import langEn from "../assets/welab/welab-lang-en.webp";
import langEs from "../assets/welab/welab-lang-es.webp";
import clientsBaBefore from "../assets/welab/welab-clients-ba-before.webp";
import clientsBaAfter from "../assets/welab/welab-clients-ba-after.webp";
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
   are — each stacking a before frame above its after, no way to compare */
export function WLOldShowcaseFigure() {
  return (
    <AuditRows
      rows={[
        [
          {
            src: oldShowcaseChallenge,
            w: UNIF(0.874),
            label: "The Challenge",
            alt: "The Challenge section of the old project page — the crowd plate and the finished shot as separate stills, stacked",
          },
          {
            src: oldShowcaseSolution,
            w: UNIF(0.874),
            label: "The Solution",
            alt: "The Solution section of the old project page — the sportscast plate and the finished broadcast graphics as separate stills, stacked",
          },
        ],
      ]}
    />
  );
}

/* The audit and before/after figures all share ONE image height so the
   case study reads evenly, row to row. Each cell's width is its aspect
   ratio over a shared reference (2.852 — the widest before/after row's
   total AR), so every image resolves to the same height — (columnWidth −
   20px) / 2.852 — at any screen width, and no row overflows or wraps.
   Rows just stop short of the full column width, which is fine.
   Full-page portrait pairs, the EN/ES pair, and the five-across Figma grid
   keep their own width-based sizing (their shapes don't fit the shared
   height). Helper: a cell's width as a fraction of the shared reference. */
const UNIF = (ar) => `calc((100% - 20px) * ${(ar / 2.852).toFixed(4)})`;

/* the old site captured page by page — individual images laid out in rows,
   each cell sized to its device class */
const AUDIT_TAX_ROW = [
  { src: auditTaxTablet, w: UNIF(1.229), label: "Tax Credits — tablet, 1280px", alt: "The old Tax Credits section at tablet width — Vancouver, Calgary, and Guadalajara incentive cards in three uneven columns" },
  { src: auditTax1200, w: UNIF(0.734), label: "Tax Credits — 1200px, the layout hole", alt: "The old Tax Credits section at 1200px — the incentive cards collapse into a two-plus-one arrangement leaving a stray gap" },
  { src: auditTaxMobile, w: UNIF(0.325), label: "Tax Credits — mobile", alt: "The old Tax Credits section on a phone — the incentive cards stacked in a single column" },
];

const AUDIT_SECTIONS_ROW = [
  { src: auditWhoWeAre, w: UNIF(1.332), label: "Who We Are", alt: "The Who We Are section of the old About Us page — the studio's collective statement beside oversized stat lines" },
  { src: auditClients, w: UNIF(0.849), label: "Clients & Awards", alt: "The Our Clients section of the old About Us page — a logo wall under the Amazing Battles, Amazed Clients headline" },
  { src: auditHomeFooter, w: UNIF(0.46), label: "Home footer — mobile", alt: "The old home page footer on a phone — Light the Fire Within headline, contact button, social icons, and the WeLAB wordmark" },
];

/* A cell may carry `ba: "before" | "after"`. The first cell of each side
   gets a small chip on the capture itself, and an arrow marks where the
   row crosses from the old state to the rebuilt one — so a comparison
   reads as one at a glance, not as a line of screenshots with captions.
   The chip sits bottom-left: measured across these captures, that corner
   is the one reliably clear of content. */
function AuditRows({ rows }) {
  return (
    <div className="wl-audit">
      {rows.map((row, i) => {
        const firstOf = { before: row.findIndex((c) => c.ba === "before"), after: row.findIndex((c) => c.ba === "after") };
        return (
          <div key={i} className="wl-audit-row">
            {row.map((cell, j) => (
              <Fragment key={cell.label || cell.src}>
                {j > 0 && cell.ba === "after" && row[j - 1].ba === "before" && (
                  <span className="wl-ba-arrow" aria-hidden="true">
                    →
                  </span>
                )}
                <figure className="wl-audit-cell" style={{ width: cell.w }}>
                  <span className="wl-cell-shot">
                    <img src={cell.src} alt={cell.alt} loading="lazy" />
                    {cell.ba && firstOf[cell.ba] === j && (
                      <span className="wl-ba-chip">{cell.ba}</span>
                    )}
                  </span>
                  {cell.label && <figcaption>{cell.label}</figcaption>}
                </figure>
              </Fragment>
            ))}
          </div>
        );
      })}
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

/* P02: the two audit finds the rebuild is proven on — Who We Are and the
   home footer, each before/after in one row (widths ∝ aspect ratios) */
const LAYOUT_ROWS = [
  /* the only four-up row: the old captures sit left of the rebuilt pair, so
     the fix reads across in one line. Four cells can't fit at the shared
     height, so this row is scaled to its own total (3.719) and renders
     shorter than the rest. */
  [
    { src: auditTaxTablet, w: "calc((100% - 60px) * 0.3305)", ba: "before", label: "Tax Credits — before, 1280px", alt: "The old Tax Credits section at tablet width — Vancouver, Calgary, and Guadalajara incentive cards in three uneven columns" },
    { src: auditTaxMobile, w: "calc((100% - 60px) * 0.0874)", ba: "before", label: "Tax Credits — before, mobile", alt: "The old Tax Credits section on a phone — the incentive cards stacked in a single column" },
    { src: taxNewDesktop, w: "calc((100% - 60px) * 0.4824)", ba: "after", label: "Tax Credits — after, desktop", alt: "The rebuilt Tax Credits section on desktop — Vancouver, Calgary, and Guadalajara incentive cards holding three even columns" },
    { src: taxNewMobile, w: "calc((100% - 60px) * 0.0998)", ba: "after", label: "Tax Credits — after, mobile", alt: "The rebuilt Tax Credits section on a phone — the incentive cards stacked in one clean column" },
  ],
  [
    { src: auditWhoWeAre, w: UNIF(1.332), label: "Who We Are — before", ba: "before", alt: "The Who We Are section of the old About Us page — the studio's collective statement beside oversized stat lines" },
    { src: afterWhoWeAre, w: UNIF(1.519), ba: "after", label: "Who We Are — after", alt: "The rebuilt Who We Are section — the statement, supporting copy, and stat lines aligned on one grid" },
  ],
  [
    { src: footerBaBefore, w: UNIF(0.59), ba: "before", label: "Home footer — before", alt: "The old home page footer on a phone — social icons spilling onto a second row under the Contact Us button" },
    { src: footerBaAfter, w: UNIF(0.59), ba: "after", label: "Home footer — after", alt: "The rebuilt home footer on a phone — the same components aligned, the social icons on one row" },
  ],
  [
    { src: clientsBaBefore, w: UNIF(0.97), ba: "before", label: "Clients & Awards — before", alt: "The Our Clients section of the old About Us page — a logo wall under the Amazing Battles, Amazed Clients headline" },
    { src: clientsBaAfter, w: UNIF(0.977), ba: "after", label: "Clients & Awards — after", alt: "The rebuilt Our Clients section — the logo wall realigned on the shared grid" },
  ],
];

export function WLLayoutSystemFigure() {
  return <AuditRows rows={LAYOUT_ROWS} />;
}

/* O01: the featured case-studies section explored in Figma — five layout
   variants, one row, in the order they were presented */
const FIGMA_FEATURED_ROW = [
  { src: figma2Col, w: "calc((100% - 80px) / 5)", label: "2 columns", alt: "Figma exploration of the featured case-studies section — two cards side by side" },
  { src: figma3Col, w: "calc((100% - 80px) / 5)", label: "3 columns", alt: "Figma exploration of the featured case-studies section — three cards side by side" },
  { src: figmaCarousel, w: "calc((100% - 80px) / 5)", label: "carousel", alt: "Figma exploration of the featured case-studies section — one large card with the next peeking in from the edge" },
  { src: figma3ColHover, w: "calc((100% - 80px) / 5)", label: "3 columns — hover", alt: "Figma exploration of the featured case-studies section — the hovered card enlarged between two dimmed neighbours" },
  { src: figmaRows, w: "calc((100% - 80px) / 5)", label: "rows", alt: "Figma exploration of the featured case-studies section — three full-width rows stacked" },
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
    { src: oldLandingCards, w: UNIF(0.859), ba: "before", label: "Landing — before", alt: "The old landing page's project cards — Torch of Rock and Roll and A Winning Team, each card taking a full screen of its own" },
    { src: afterFeatured, w: UNIF(1.69), ba: "after", label: "Featured case studies — shipped", alt: "The featured case-studies section on the live site — the studio's three newest case studies on one grid, each with a clear way in" },
  ],
];

export function WLLandingBAFigure() {
  return <AuditRows rows={LANDING_ROWS} />;
}

/* O02: the same project page on the live site, in both languages */
const LANG_ROW = [
  { src: langEn, w: "calc((100% - 20px) * 0.5)", label: "English", alt: "The Game, Set, Love project page on the live site in English — credits, then The Challenge, Our Take, and The Solution" },
  { src: langEs, w: "calc((100% - 20px) * 0.5)", label: "Spanish", alt: "The same page switched to Spanish — El Reto, Nuestra Perspectiva, and La Solución" },
];

export function WLLangToggleFigure() {
  return <AuditRows rows={[LANG_ROW]} />;
}

/* Opportunity 01: the old landing page leading with the same two project
   cards, on desktop and on a phone — same cell/label treatment as the
   audit rows */
export function WLOldLandingFigure() {
  return (
    <div className="wl-audit">
      <div className="wl-audit-row">
        {/* widths in the pair's aspect-ratio proportion (0.479 : 0.177) so
            both captures render at the same height */}
        <figure className="wl-audit-cell" style={{ width: "40%" }}>
          <img
            src={oldLandingDesktop}
            alt="The old landing page on desktop — the hero followed by the same two project cards, Torch of Rock and Roll and A Winning Team"
            loading="lazy"
          />
          <figcaption>Landing — desktop</figcaption>
        </figure>
        <figure className="wl-audit-cell" style={{ width: "14.78%" }}>
          <img
            src={oldLandingMobile}
            alt="The old landing page on a phone — the hero and the same two project cards stacked in one column"
            loading="lazy"
          />
          <figcaption>Landing — mobile</figcaption>
        </figure>
      </div>
    </div>
  );
}

/* Opportunity 02: the studios section — three cities, three time zones,
   one English-only site */
export function WLOldStudiosFigure() {
  return (
    <AuditRows
      rows={[
        [
          {
            src: oldStudios,
            w: UNIF(1.316),
            alt: "The site's Our Studios section — We Are Citizens of the World over local clocks for Guadalajara, Calgary, and Vancouver",
          },
        ],
      ]}
    />
  );
}

