import personaEmily from "../assets/tinypaws/tinypaws-persona-emily.webp";
import personaAlex from "../assets/tinypaws/tinypaws-persona-alex.webp";
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
      alt="The TinyPaws style tile beside the tokens.css file it became. On the left the palette as swatches with their hex values — Orange #DC6E00, Orange-ink #A65300, Deep brown #301800, Cream #F5ECD8, Off-white #FFFDF6, Background #FFF7E6, Taupe #6F5B4A — then the typography, Fredoka SemiBold for display over its size scale with Lexend for body, and the three corner radii drawn as shapes: pill, card and input. On the right the same values as CSS custom properties — the color group from --paw-orange to --paw-taupe with --paw-cream-deep among them, --font-display and --font-body, and --radius-pill, --radius-card and --radius-input — with a line drawn from the orange swatch to the --paw-orange line it became"
      loading="lazy"
    />
  );
}

export function TPContentModelFigure() {
  return (
    <img
      src={figContentModel}
      alt="One cat's entry branching into the three surfaces it renders. On the left, cats/ash.json — name Ash, age 1 year, breed Grey Tabby, a temperament array, a medical object of vaccinated and spayed_neutered, status available, and the quiz answers the match runs on. On the right, the three surfaces the same record becomes, each listed by the fields it draws from and shown as the screen itself: the gallery card, the full profile with its temperament tags and medical box, and the quiz result with Ash as the best of three matches"
      loading="lazy"
    />
  );
}

/* ── 04 Building the Brand: the style tile / brand board. ── */
export function TPStyleTileFigure() {
  return (
    <img
      src={figStyleTile}
      alt="The TinyPaws brand board. The logo in its two forms, wordmark and paw monogram. The palette with each color's job and hex — Orange #DC6E00 for action, Orange ink #A65300 for action, Deep brown #301800 for structure and text, Cream #F5ECD8 for surfaces, Off-white #FFFDF6 for raised surfaces, Background #FFF7E6 as the base, Taupe #6F5B4A for bands — under a note that small text on cream takes the darkened orange while the brighter one is for buttons and large type. The type scale, one line of the same sentence at each step: H1 64px, H2 40, H3 32 in Fredoka SemiBold at 115% line height, H4 24 and buttons 20 in Fredoka Medium, body 16 and small 14 in Lexend Regular at 165%. And the five mission icons: rescue and rehabilitate, foster-based support, forever home, community education, lifelong advocacy"
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
      alt="A grid of low-fidelity wireframes covering the full site — home, adoption, cat profiles, forms, volunteer and events pages in gray boxes"
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
      alt="Persona: Emily Green, 33, a psychiatrist in private practice, single, owns a small townhouse outside the city. «Seeking expert, reliable guidance for multi-cat integration.» An experienced owner working from home, looking to adopt a second cat to keep the first company and wanting science-backed guidance for the transition. Her pain points: conflicting, ungrounded advice about multi-cat behavior, and how hard it is to find ongoing care resources and transparent medical history on rescue sites. What she needs from the site: a topic-based, expert-backed care hub built for quick scanning, and medical and vaccination status visible on the profile cards themselves"
      loading="lazy"
    />
  );
}

export function TPPersonaAlexFigure() {
  return (
    <img
      src={personaAlex}
      alt="Persona: Alex Kim, 27, a junior back-end developer, in a relationship, living in a city apartment. «Looking for a transparent, stress-free path to first-time adoption.» Eager to adopt his first cat but overwhelmed by complex application forms, vague costs, and conflicting care information. His pain points: unclear adoption steps and unexpected fees that lead to dropped applications, and confusing navigation and inconsistent care advice that create decision fatigue. What he needs from the site: an adoption roadmap with the fees broken out up front, step-by-step progress and clear calls to action, and filters for apartment suitability, budget-friendly care and beginner fit"
      loading="lazy"
    />
  );
}

/* the promotional film lives in public/media (too big to inline) */
const TP_VIDEO = `${import.meta.env.BASE_URL}media/tinypaws/tinypaws-campaign-video.mp4`;

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
    alt: "Upcoming events: a kitten adoption day card with its date, time, and community-center location",
  },
  "tinypaws-shot-home": {
    src: shotHome,
    alt: "The home page: Saving kittens, one paw at a time — with calls to action to meet the cats or take the match quiz",
  },
};
