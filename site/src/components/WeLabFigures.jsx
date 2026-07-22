import figAudit from "../assets/welab/welab-fig-audit.webp";
import figOldShowcase from "../assets/welab/welab-fig-old-showcase.webp";

/* Context figures for the WeLAB case study. Figures whose source images
   the owner hasn't provided yet are not registered — their blocks render
   nothing until the assets land. */

/* ── 02 Auditing the Live Site: the old weloveabattle.com, captured page
   by page across breakpoints. ── */
export function WLOldShowcaseFigure() {
  return (
    <img
      src={figOldShowcase}
      alt="The old site's project page — The Challenge and The Solution sections each stacking a before frame above an after frame as separate stills, with no way to compare them directly"
      loading="lazy"
    />
  );
}

export function WLAuditFigure() {
  return (
    <img
      src={figAudit}
      alt="An audit board of the old WeLAB site — the home page and footer on mobile, the Tax Credits page at tablet, 1200px and mobile widths showing an asymmetric layout hole, and the Who We Are and Clients & Awards pages on desktop"
      loading="lazy"
    />
  );
}
