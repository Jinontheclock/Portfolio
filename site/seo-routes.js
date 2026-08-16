/* Per-route <head> copy, read by vite.config.js at build time.

   Why this exists as its own plain file: the build writes one static HTML
   page per route so that a crawler — and, more to the point, the link
   unfurlers behind LinkedIn, Slack and iMessage, which do not run JavaScript
   — gets that page's own title, description and og:image instead of the
   site-wide default. The project data those strings come from imports .webp
   assets, which Node cannot load, so the copy is mirrored here in plain
   strings. A build-time check keeps the id list in step with
   src/data/projects/index.js.

   English only on purpose: these are the tags a crawler reads, and the
   crawlable copy of this site is English (see docs/deploy-runbook.md). */

export const SITE_NAME = "HAJIN";
export const DEFAULT_TITLE = "HAJIN, Product Designer";
export const DEFAULT_DESCRIPTION =
  "Product Designer in Vancouver, BC. Case studies in product design, design systems, and front-end development.";

/* path → what that page says it is. Paths are base-relative, no leading
   slash, so they work under /Portfolio/ and under a domain root alike. */
export const ROUTES = [
  {
    path: "",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  {
    path: "about",
    title: "About — HAJIN",
    description:
      "Hajin Lee: a product designer in Vancouver who builds what he designs, from research and design systems through to the shipped front end.",
  },
  {
    path: "work",
    title: "Work — HAJIN",
    description:
      "Five projects: a transit fare card concept for iOS and watchOS, a VFX studio's live site, an apprenticeship tracker, a rescue site, and retail work at MUJI.",
  },
  {
    path: "work/compass-card",
    title: "Compass Card — HAJIN",
    description:
      "Redesigning Metro Vancouver's transit fare card system into an iOS and watchOS experience built on TransLink's upcoming account-based model.",
  },
  {
    path: "work/welab",
    title: "WeLAB Entertainment — HAJIN",
    description:
      "An end-to-end website audit, redesign, and WordPress development for a VFX studio: rebuilding layouts and interactions with Bricks Builder and custom code.",
  },
  {
    path: "work/prolog",
    title: "ProLog — HAJIN",
    description:
      "A mobile platform that turns a fragmented 6,000-hour apprenticeship into one clear, accessible roadmap, designed for neurodivergent apprentices.",
  },
  {
    path: "work/tinypaws",
    title: "TinyPaws — HAJIN",
    description:
      "A clear adoption pathway for a rescue website: co-designing the UX, building the brand identity, and hand-coding the responsive site with Astro.",
  },
  {
    /* Locked behind a password, so it stays out of the sitemap — but a
       shared link should still say which project it is. */
    path: "work/muji",
    title: "MUJI — HAJIN",
    description:
      "Driving in-store visual communication strategies and spatial layout optimization to enhance customer journeys and duty-free shopping experiences for international travelers.",
    noindex: true,
  },
];

/* Every project needs a route entry; this is the list to check against. */
export const PROJECT_IDS = ["compass-card", "welab", "prolog", "tinypaws", "muji"];
