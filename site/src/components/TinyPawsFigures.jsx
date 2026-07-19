import journeyImg from "../assets/tinypaws/tinypaws-fig-journey.webp";
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

/* Context figures for the TinyPaws case study. Figures whose source images
   the owner hasn't exported yet (sitemap, lo-fi grid, brand exploration,
   style tile, dev specs, the before/after pairs) are not registered — their
   blocks render nothing until the assets land. */

export function TPJourneyFigure() {
  return (
    <img
      src={journeyImg}
      alt="The five-step adoption journey from first visit to homecoming: browse and meet, apply, chat with a volunteer, a one-week trial stay, and making it official"
      loading="lazy"
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
    alt: "The adoption gallery: age and status filters, a live result count, and illustrated cat cards with temperament tags",
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
