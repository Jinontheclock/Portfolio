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

/* the old site captured page by page — individual images laid out in rows
   (home on mobile / the Tax Credits page across three widths / the desktop
   pages), each cell sized to its device class */
const AUDIT_ROWS = [
  /* widths ∝ each capture's aspect ratio (1.229 : 0.734 : 0.325, of the
     row minus its two 20px gaps) so all three render at the same height */
  [
    { src: auditTaxTablet, w: "calc((100% - 40px) * 0.5372)", label: "Tax Credits — tablet, 1280px", alt: "The old Tax Credits page at tablet width — Vancouver, Calgary, and Guadalajara incentive cards in three uneven columns" },
    { src: auditTax1200, w: "calc((100% - 40px) * 0.3207)", label: "Tax Credits — 1200px, the layout hole", alt: "The old Tax Credits page at 1200px — the incentive cards collapse into a two-plus-one arrangement leaving a stray gap" },
    { src: auditTaxMobile, w: "calc((100% - 40px) * 0.1421)", label: "Tax Credits — mobile", alt: "The old Tax Credits page on a phone — the incentive cards stacked in a single column" },
  ],
  /* same treatment — 1.332 : 0.849 : 0.460 */
  [
    { src: auditWhoWeAre, w: "calc((100% - 40px) * 0.5043)", label: "Who We Are", alt: "The old Who We Are page on desktop — the studio's collective statement beside oversized stat lines" },
    { src: auditClients, w: "calc((100% - 40px) * 0.3215)", label: "Clients & Awards", alt: "The old Clients and Awards page on desktop — a logo wall under the Amazing Battles, Amazed Clients headline" },
    { src: auditHomeFooter, w: "calc((100% - 40px) * 0.1742)", label: "Home footer — mobile", alt: "The old home page footer on a phone — Light the Fire Within headline, contact button, social icons, and the WeLAB wordmark" },
  ],
];

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

export function WLAuditFigure() {
  return (
    <div className="wl-audit">
      {AUDIT_ROWS.map((row, i) => (
        <div key={i} className="wl-audit-row">
          {row.map((cell) => (
            <figure
              key={cell.label}
              className="wl-audit-cell"
              style={{ width: typeof cell.w === "number" ? `${cell.w}%` : cell.w }}
            >
              <img src={cell.src} alt={cell.alt} loading="lazy" />
              <figcaption>{cell.label}</figcaption>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}
