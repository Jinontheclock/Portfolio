import figOldShowcase from "../assets/welab/welab-fig-old-showcase.webp";
import auditHomeFooter from "../assets/welab/welab-audit-home-footer.webp";
import auditTaxTablet from "../assets/welab/welab-audit-tax-tablet.webp";
import auditTax1200 from "../assets/welab/welab-audit-tax-1200.webp";
import auditTaxMobile from "../assets/welab/welab-audit-tax-mobile.webp";
import auditWhoWeAre from "../assets/welab/welab-audit-whoweare.webp";
import auditClients from "../assets/welab/welab-audit-clients.webp";
import oldLandingDesktop from "../assets/welab/welab-old-landing-desktop.webp";
import oldLandingMobile from "../assets/welab/welab-old-landing-mobile.webp";
import oldStudios from "../assets/welab/welab-old-studios.webp";
import afterWhoWeAre from "../assets/welab/welab-after-whoweare.webp";
import afterFooter from "../assets/welab/welab-after-footer.webp";
import langEn from "../assets/welab/welab-lang-en-challenge.webp";
import langEs from "../assets/welab/welab-lang-es-challenge.webp";
import afterClients from "../assets/welab/welab-after-clients.webp";
import afterTax1280 from "../assets/welab/welab-after-tax-1280.webp";
import afterTax1200 from "../assets/welab/welab-after-tax-1200.webp";
import afterTaxMobile from "../assets/welab/welab-after-tax-mobile.webp";
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

export function WLOldShowcaseFigure() {
  return (
    <img
      src={figOldShowcase}
      alt="The old site's project page — The Challenge and The Solution sections each stacking a before frame above an after frame as separate stills, with no way to compare them directly"
      loading="lazy"
    />
  );
}

/* the old site captured page by page — individual images laid out in rows,
   each cell sized to its device class. Row widths ∝ aspect ratios so all
   cells in a row render at the same height. */
const AUDIT_TAX_ROW = [
  { src: auditTaxTablet, w: "calc((100% - 40px) * 0.5372)", label: "Tax Credits — tablet, 1280px", alt: "The old Tax Credits section at tablet width — Vancouver, Calgary, and Guadalajara incentive cards in three uneven columns" },
  { src: auditTax1200, w: "calc((100% - 40px) * 0.3207)", label: "Tax Credits — 1200px, the layout hole", alt: "The old Tax Credits section at 1200px — the incentive cards collapse into a two-plus-one arrangement leaving a stray gap" },
  { src: auditTaxMobile, w: "calc((100% - 40px) * 0.1421)", label: "Tax Credits — mobile", alt: "The old Tax Credits section on a phone — the incentive cards stacked in a single column" },
];

const AUDIT_SECTIONS_ROW = [
  { src: auditWhoWeAre, w: "calc((100% - 40px) * 0.5043)", label: "Who We Are", alt: "The Who We Are section of the old About Us page — the studio's collective statement beside oversized stat lines" },
  { src: auditClients, w: "calc((100% - 40px) * 0.3215)", label: "Clients & Awards", alt: "The Our Clients section of the old About Us page — a logo wall under the Amazing Battles, Amazed Clients headline" },
  { src: auditHomeFooter, w: "calc((100% - 40px) * 0.1742)", label: "Home footer — mobile", alt: "The old home page footer on a phone — Light the Fire Within headline, contact button, social icons, and the WeLAB wordmark" },
];

function AuditRows({ rows }) {
  return (
    <div className="wl-audit">
      {rows.map((row, i) => (
        <div key={i} className="wl-audit-row">
          {row.map((cell) => (
            <figure key={cell.label} className="wl-audit-cell" style={{ width: cell.w }}>
              <img src={cell.src} alt={cell.alt} loading="lazy" />
              <figcaption>{cell.label}</figcaption>
            </figure>
          ))}
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

/* ── 03 Designing and Building ── */

/* P02: the two audit finds the rebuild is proven on — Who We Are and the
   home footer, each before/after in one row (widths ∝ aspect ratios) */
const LAYOUT_ROWS = [
  [
    { src: auditWhoWeAre, w: "calc((100% - 20px) * 0.4672)", label: "Who We Are — before", alt: "The Who We Are section of the old About Us page — the studio's collective statement beside oversized stat lines" },
    { src: afterWhoWeAre, w: "calc((100% - 20px) * 0.5328)", label: "Who We Are — after", alt: "The rebuilt Who We Are section — the statement, supporting copy, and stat lines aligned on one grid" },
  ],
  [
    { src: auditHomeFooter, w: "20%", label: "Home footer — before", alt: "The old home page footer on a phone — Light the Fire Within headline, contact button, social icons, and the WeLAB wordmark" },
    { src: afterFooter, w: "20.08%", label: "Home footer — after", alt: "The rebuilt home footer on a phone — the same components set on a consistent grid" },
  ],
  [
    { src: auditClients, w: "calc((100% - 20px) * 0.4977)", label: "Clients & Awards — before", alt: "The Our Clients section of the old About Us page — a logo wall under the Amazing Battles, Amazed Clients headline" },
    { src: afterClients, w: "calc((100% - 20px) * 0.5023)", label: "Clients & Awards — after", alt: "The rebuilt Our Clients section — the logo wall realigned on the shared grid" },
  ],
  [
    { src: afterTax1280, w: "calc((100% - 40px) * 0.4162)", label: "Tax Credits — after, 1280px", alt: "The rebuilt Tax Credits section at 1280px — the incentive cards holding their grid" },
    { src: afterTax1200, w: "calc((100% - 40px) * 0.4641)", label: "Tax Credits — after, 1200px", alt: "The rebuilt Tax Credits section at 1200px — the cards reflowing without a stray gap" },
    { src: afterTaxMobile, w: "calc((100% - 40px) * 0.1197)", label: "Tax Credits — after, mobile", alt: "The rebuilt Tax Credits section on a phone — the incentive cards stacked in one clean column" },
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
  { src: figma3ColHover, w: "calc((100% - 80px) / 5)", label: "3 columns_hovering", alt: "Figma exploration of the featured case-studies section — the hovered card enlarged between two dimmed neighbours" },
  { src: figmaRows, w: "calc((100% - 80px) / 5)", label: "rows", alt: "Figma exploration of the featured case-studies section — three full-width rows stacked" },
];

export function WLFigmaFeaturedFigure() {
  return <AuditRows rows={[FIGMA_FEATURED_ROW]} />;
}

/* O01: the shipped landing page — the new featured case-studies section
   (the old landing already appears under ch02's Opportunity 01) */
const LANDING_ROWS = [
  [
    { src: afterFeatured, w: "100%", label: "Landing — after, the featured case-studies section", alt: "The new landing page's featured section — the studio's three newest case studies on one grid, each with a clear way in" },
  ],
];

export function WLLandingBAFigure() {
  return <AuditRows rows={LANDING_ROWS} />;
}

/* O02: the same project brief on the live site, in both languages */
const LANG_ROW = [
  { src: langEn, w: "calc((100% - 20px) * 0.5)", label: "English", alt: "A Winning Team's Challenge, Solution, and Our Take sections on the live site, in English" },
  { src: langEs, w: "calc((100% - 20px) * 0.5)", label: "Spanish", alt: "The same sections in Spanish — El Reto, La Solución, and Nuestra Perspectiva" },
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
        <figure className="wl-audit-cell" style={{ width: "55%" }}>
          <img
            src={oldLandingDesktop}
            alt="The old landing page on desktop — the hero followed by the same two project cards, Torch of Rock and Roll and A Winning Team"
            loading="lazy"
          />
          <figcaption>Landing — desktop</figcaption>
        </figure>
        <figure className="wl-audit-cell" style={{ width: "20.34%" }}>
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
    <img
      src={oldStudios}
      alt="The site's Our Studios section — We Are Citizens of the World over local clocks for Guadalajara, Calgary, and Vancouver"
      loading="lazy"
    />
  );
}

