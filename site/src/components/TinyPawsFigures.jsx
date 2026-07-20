import personaEmily from "../assets/tinypaws/tinypaws-persona-emily.webp";
import personaAlex from "../assets/tinypaws/tinypaws-persona-alex.webp";
import logoImg from "../assets/tinypaws/tinypaws-logo.webp";
import videoPoster from "../assets/tinypaws/tinypaws-video-poster.webp";
import shotProcess from "../assets/tinypaws/tinypaws-shot-process.webp";
import shotQuiz from "../assets/tinypaws/tinypaws-shot-quiz.webp";
import shotForm from "../assets/tinypaws/tinypaws-shot-form.webp";
import shotAdopt from "../assets/tinypaws/tinypaws-shot-adopt.webp";
import shotProfile from "../assets/tinypaws/tinypaws-shot-profile.webp";
import shotProfileMedical from "../assets/tinypaws/tinypaws-shot-profile-medical.webp";
import shotInvolve from "../assets/tinypaws/tinypaws-shot-involve.webp";
import shotEvents from "../assets/tinypaws/tinypaws-shot-events.webp";
import shotHome from "../assets/tinypaws/tinypaws-shot-home.webp";
import BeforeAfter from "./BeforeAfter.jsx";
import figSitemap from "../assets/tinypaws/tinypaws-fig-sitemap.webp";
import figLofiGrid from "../assets/tinypaws/tinypaws-fig-lofi-grid.webp";
import baNavBefore from "../assets/tinypaws/tinypaws-ba-nav-before.webp";
import baNavAfter from "../assets/tinypaws/tinypaws-ba-nav-after.webp";
import baStructureBefore from "../assets/tinypaws/tinypaws-ba-structure-before.webp";
import baStructureAfter from "../assets/tinypaws/tinypaws-ba-structure-after.webp";
import baCtaBefore from "../assets/tinypaws/tinypaws-ba-cta-before.webp";
import baCtaAfter from "../assets/tinypaws/tinypaws-ba-cta-after.webp";
import figStyleTile from "../assets/tinypaws/tinypaws-fig-styletile.webp";
import figTokens from "../assets/tinypaws/tinypaws-fig-tokens.webp";
import figContentModel from "../assets/tinypaws/tinypaws-fig-content-model.webp";

/* Context figures for the TinyPaws case study. Figures whose source images
   the owner hasn't exported yet (brand exploration) are not registered —
   their blocks render nothing until the assets land. */

/* ── 06 Shipping It Myself: the style tile beside the tokens.css it
   compiled into, and one cat entry branching into its three surfaces. ── */
export function TPTokensFigure() {
  return (
    <img
      src={figTokens}
      alt="The TinyPaws style tile beside the tokens.css file it became — the same colours, type sizes, and radii as CSS custom properties"
      loading="lazy"
    />
  );
}

export function TPContentModelFigure() {
  return (
    <img
      src={figContentModel}
      alt="One cat's data entry branching into three rendered surfaces — a gallery card, a full profile, and a match-quiz result"
      loading="lazy"
    />
  );
}

/* ── 04 Building the Brand: the style tile / brand board. ── */
export function TPStyleTileFigure() {
  return (
    <img
      src={figStyleTile}
      alt="The TinyPaws brand board — logo variants, the Fredoka and Lexend type scale, the calico-drawn colour palette with hex values, and the five brand-mission icons"
      loading="lazy"
    />
  );
}

/* ── 03 Structuring the Site: sitemap, lo-fi grid, and three before/after
   pairs (nav / structure / CTA). BeforeAfter is shared with ProLog; the
   caption is owned by the surrounding <figure> block, so no caption prop. ── */
export function TPSitemapFigure() {
  return (
    <img
      src={figSitemap}
      alt="TinyPaws sitemap — the home page branching into cats, events, donations, information, volunteering, and fostering"
      loading="lazy"
    />
  );
}

export function TPLofiGridFigure() {
  return (
    <img
      src={figLofiGrid}
      alt="A grid of low-fidelity wireframes covering the full site — home, adoption, cat profiles, forms, volunteer and events pages in grey boxes"
      loading="lazy"
    />
  );
}

export function TPBANavFigure() {
  return (
    <BeforeAfter
      before={baNavBefore}
      after={baNavAfter}
      name="Navigation"
      beforeAlt='Before — a cluttered navigation bar with seven overlapping labels including both "Cats" and "Adopt"'
      afterAlt="After — a streamlined navigation bar reorganized around adopt, get involved, and give"
    />
  );
}

export function TPBAStructureFigure() {
  return (
    <BeforeAfter
      before={baStructureBefore}
      after={baStructureAfter}
      name="Information page"
      beforeAlt="Before — an information page that is a dense wall of text with no visual grouping"
      afterAlt="After — the same content condensed into scannable sections and cards"
    />
  );
}

export function TPBACtaFigure() {
  return (
    <BeforeAfter
      before={baCtaBefore}
      after={baCtaAfter}
      name="Call to action"
      beforeAlt="Before — flat, ambiguous buttons that don't read as clickable"
      afterAlt="After — consistent orange call-to-action buttons across the site"
    />
  );
}

export function TPPersonaEmilyFigure() {
  return (
    <img
      src={personaEmily}
      alt="Persona: Emily Green, 33 — a psychiatrist with a multi-cat household who provides premium care, researches cat behaviour, and wants a second cat that will get along with her current one"
      loading="lazy"
    />
  );
}

export function TPPersonaAlexFigure() {
  return (
    <img
      src={personaAlex}
      alt="Persona: Alex Kim, 27 — a junior developer and first-time owner in a small apartment who needs beginner-friendly guides, budgeting tools, and easy navigation"
      loading="lazy"
    />
  );
}

export function TPLogoFigure() {
  return (
    <img
      src={logoImg}
      alt="The TinyPaws wordmark: rounded orange bubble letterforms with a paw print over the y and a cat silhouette curled into the P"
      loading="lazy"
    />
  );
}

/* the promotional film lives in public/media (too big to inline) */
const TP_VIDEO = `${import.meta.env.BASE_URL}media/tinypaws/TinypawsPromotionalVideo.mp4`;

export function TPVideoFigure() {
  return (
    <video
      className="cs-campaign-video"
      src={TP_VIDEO}
      poster={videoPoster}
      controls
      playsInline
      preload="metadata"
      aria-label="The TinyPaws promotional film"
    />
  );
}

/* site screens used by the Solution section's split rows — real captures
   of the rebuilt site at desktop width (the site is desktop-first; the
   solution rows stack these full-width via the block's wide flag) */
export const TINYPAWS_SHOTS = {
  "tinypaws-shot-process": {
    src: shotProcess,
    alt: "The adoption process page: numbered steps from browse and meet through apply, chat with a volunteer and trial stay to making it official",
  },
  "tinypaws-shot-quiz": {
    src: shotQuiz,
    alt: "The match quiz — five questions, thirty seconds, a simple scoring quiz matched against the cats in care right now",
  },
  "tinypaws-shot-form": {
    src: shotForm,
    alt: "The adoption application: full name, email, which cat you're applying for, and a tell-us-about-your-home field",
  },
  "tinypaws-shot-adopt": {
    src: shotAdopt,
    alt: "The adoption gallery: age and status filters, a live result count, and cat cards mixing real photos with illustrated stand-ins",
  },
  "tinypaws-shot-profile": {
    src: shotProfile,
    alt: "Mochi's profile: portrait, availability badge, and the facts — sex, age, breed, foster location, days in foster",
  },
  "tinypaws-shot-profile-medical": {
    src: shotProfileMedical,
    alt: "Mochi's medical record: vaccinated and spayed-neutered checkmarks with vet notes, right above the adoption call-to-action",
  },
  "tinypaws-shot-involve": {
    src: shotInvolve,
    alt: "The Get Involved page: fostering explained, with supplies and vet costs covered and a mentor foster on call",
  },
  "tinypaws-shot-events": {
    src: shotEvents,
    alt: "Upcoming events: a kitten adoption day card with its date, time, and community-centre location",
  },
  "tinypaws-shot-home": {
    src: shotHome,
    alt: "The home page: Saving kittens, one paw at a time — with calls to action to meet the cats or take the match quiz",
  },
};
