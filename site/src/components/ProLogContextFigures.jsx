import timelineImg from "../assets/prolog/prolog-fig-timeline.webp";
import fragmentsImg from "../assets/prolog/prolog-fig-fragments.webp";
import audienceImg from "../assets/prolog/prolog-fig-audience.webp";
import certStatsImg from "../assets/prolog/prolog-fig-certstats.webp";
import discrepancyImg from "../assets/prolog/prolog-fig-discrepancy.webp";
import participantsImg from "../assets/prolog/prolog-fig-participants.webp";
import logoLockup from "../assets/prolog/prolog-logo-lockup.webp";
import logoAppIcon from "../assets/prolog/prolog-logo-appicon.webp";
import paletteImg from "../assets/prolog/prolog-fig-palette.webp";
import typeImg from "../assets/prolog/prolog-fig-type.webp";
import midfiGridImg from "../assets/prolog/prolog-fig-midfi-grid.webp";
import campBrochure from "../assets/prolog/prolog-campaign-brochure.webp";
import campBillboard1 from "../assets/prolog/prolog-campaign-billboard-1.webp";
import campBillboard2 from "../assets/prolog/prolog-campaign-billboard-2.webp";
import baProgressBefore from "../assets/prolog/prolog-ba-progress-before.webp";
import baProgressAfter from "../assets/prolog/prolog-ba-progress-after.webp";
import baNavBefore from "../assets/prolog/prolog-ba-nav-before.webp";
import baNavAfter from "../assets/prolog/prolog-ba-nav-after.webp";
import baCuesBefore from "../assets/prolog/prolog-ba-cues-before.webp";
import baCuesAfter from "../assets/prolog/prolog-ba-cues-after.webp";
import campInsta3 from "../assets/prolog/prolog-campaign-insta-3.webp";
import personaIzzy from "../assets/prolog/prolog-persona-izzy.webp";
import personaJordan from "../assets/prolog/prolog-persona-jordan.webp";
import shotJourney1 from "../assets/prolog/prolog-shot-journey-dashboard-1.webp";
import shotJourneyMidfi from "../assets/prolog/prolog-shot-journey-midfi.webp";
import shotJourney2 from "../assets/prolog/prolog-shot-journey-dashboard-2.webp";
import shotJourney3 from "../assets/prolog/prolog-shot-journey-dashboard-3.webp";
import shotScanning from "../assets/prolog/prolog-shot-manual-scanning.webp";
import shotPaystubs from "../assets/prolog/prolog-shot-work-paystub-records.webp";
import shotHours from "../assets/prolog/prolog-shot-work-hours.webp";
import shotFinance from "../assets/prolog/prolog-shot-work-finance.webp";
import shotExamPrep from "../assets/prolog/prolog-shot-competency-exam-prep.webp";
import shotReminder from "../assets/prolog/prolog-shot-dashboard-reminder.webp";

/* Context figures for the ProLog case study — the designed graphics,
   optimized from the originals in public/media. */

export function TimelineFigure() {
  return (
    <img
      src={timelineImg}
      alt="Timeline of a BC electrical apprenticeship: four levels of technical training and exams from Day 1 to Red Seal certification — about 6,000 hours on the job and 40 weeks in school"
      loading="lazy"
    />
  );
}

export function FragmentsFigure() {
  return (
    <img
      src={fragmentsImg}
      alt="One journey, four disconnected systems: the SkilledTradesBC portal, competency PDFs, union resources and finance sites converging into the unified ProLog app"
      loading="lazy"
    />
  );
}

export function AudienceFigure() {
  return (
    <img
      src={audienceImg}
      alt="Who we designed for: one in five Canadians is neurodivergent, and a majority of the BCIT apprentices we surveyed identified as such"
      loading="lazy"
    />
  );
}

export function CertStatsFigure() {
  return (
    <img
      src={certStatsImg}
      alt="The journey, abandoned: only 16% of Canadian apprentices earn certification within the expected program duration, and 4 in 10 never certify even given twice the time"
      loading="lazy"
    />
  );
}

export function DiscrepancyFigure() {
  return (
    <img
      src={discrepancyImg}
      alt="Worked does not equal recorded: paystub records show 1,240 hours while the SkilledTradesBC record shows 1,210 — a 30-hour discrepancy with no clear way to prove or escalate"
      loading="lazy"
    />
  );
}

export function ParticipantsFigure() {
  return (
    <img
      src={participantsImg}
      alt="Who we heard from: 11 apprentices surveyed and interviewed across BC - electrical, plumbing, HVAC, ironworking and landscaping trades, first-year to journeyperson, union and non-union, 8 of 11 phone-first"
      loading="lazy"
    />
  );
}

/* app screens used by the Solution section's split rows */
export const PROLOG_SHOTS = {
  "journey-dashboard-1": { src: shotJourney1, alt: "ProLog dashboard: journey path with levels completed, overall progress, reminders and exam status" },
  "journey-dashboard-2": { src: shotJourney2, alt: "Level 3 unlocked: the dashboard celebrates completing every Level 2 requirement" },
  "journey-dashboard-3": { src: shotJourney3, alt: "The same dashboard earlier in the journey: Level 3 in progress, skills and school still ahead" },
  "manual-scanning": { src: shotScanning, alt: "Scanning a paystub document with the in-app camera" },
  "work-paystub-records": { src: shotPaystubs, alt: "Paystub records by month with work hours and income" },
  "work-hours": { src: shotHours, alt: "Working hours: 1,545 of 1,800 tracked, apprenticeship details and discrepancy tracking" },
  "work-finance": { src: shotFinance, alt: "Finance view: potential expenses for tools and certifications" },
  "competency-exam-prep": { src: shotExamPrep, alt: "Exam prep: new exam entry, progress update and exam log" },
  "dashboard-reminder": { src: shotReminder, alt: "Event calendar with automatically created reminders" },
};

/* Mid-fi coverage grid (03 Approach): ~60 screens in one wide board,
   showing how much of the app was mapped in mid-fi before hi-fi design. */
export function MidfiGridFigure() {
  return (
    <img
      src={midfiGridImg}
      alt="A wide board of about sixty mid-fidelity screens — login, dashboard, skills and quizzes with right and wrong states, reminders, finances and settings — mapping the whole app before hi-fi design"
      loading="lazy"
    />
  );
}

/* Journey-dashboard fidelity evolution (03 Approach): the mid-fi structure
   next to the shipped hi-fi build. The hi-fi frame reuses the Solution shot. */
export function JourneyMidfiFigure() {
  return (
    <img
      src={shotJourneyMidfi}
      alt="Mid-fidelity journey dashboard: the level progress ring, training hours, reminders and competencies laid out before the final visual system"
      loading="lazy"
    />
  );
}

export function JourneyDashboard1Figure() {
  return (
    <img
      src={shotJourney1}
      alt="ProLog dashboard: journey path with levels completed, overall progress, reminders and exam status"
      loading="lazy"
    />
  );
}

export function PersonaIzzyFigure() {
  return (
    <img
      src={personaIzzy}
      alt="Persona: Izzy Wilson, 22 - Level 2 electrical apprentice in Vancouver finding her footing; needs one organized view of hours, certifications and grants"
      loading="lazy"
    />
  );
}

export function PersonaJordanFigure() {
  return (
    <img
      src={personaJordan}
      alt="Persona: Jordan Richards, 27 - Level 4 electrician apprentice in Surrey closing out his ticket; needs expiry notifications, budgeting help and everything in one place"
      loading="lazy"
    />
  );
}

export function LogoLockupFigure() {
  return (
    <div className="cs-logo-suite">
      <img
        src={logoLockup}
        alt="The ProLog logo lockup: rounded nodes linked along a winding path with a single orange block, beside the Pro Log wordmark"
        loading="lazy"
      />
      <img
        src={logoAppIcon}
        alt="The ProLog app icon: the wordmark on a dark rounded square with a single orange dot"
        loading="lazy"
      />
    </div>
  );
}

export function TypeFigure() {
  return (
    <img
      src={typeImg}
      alt="The ProLog type specimen: a large 1,240 hrs figure beside the scale — Space Grotesk for screen titles, key figures and section headers, Roboto for body, buttons and timestamps"
      loading="lazy"
      style={{ width: "100%" }}
    />
  );
}

/* ── Usability-testing fixes: labelled before/after screen pairs ── */
function BeforeAfter({ before, after, name }) {
  return (
    <div className="cs-ba-row">
      <div className="cs-ba-cell">
        <span className="cs-ba-label">Before</span>
        <img src={before} alt={`${name} — before the usability fixes`} loading="lazy" />
      </div>
      <div className="cs-ba-cell">
        <span className="cs-ba-label">After</span>
        <img src={after} alt={`${name} — after the usability fixes`} loading="lazy" />
      </div>
    </div>
  );
}

export function BAProgressFigure() {
  return <BeforeAfter before={baProgressBefore} after={baProgressAfter} name="Progress dashboard" />;
}

export function BANavigationFigure() {
  return <BeforeAfter before={baNavBefore} after={baNavAfter} name="Competency navigation" />;
}

export function BAVisualCuesFigure() {
  return <BeforeAfter before={baCuesBefore} after={baCuesAfter} name="Hour tracking" />;
}

/* ── Beyond the screen: the promotional campaign set ── */
const CAMPAIGN_VIDEO = `${import.meta.env.BASE_URL}media/prolog/prolog_video.mp4`;

export function CampaignVideoFigure() {
  return (
    <video
      className="cs-campaign-video"
      src={CAMPAIGN_VIDEO}
      controls
      playsInline
      preload="metadata"
      aria-label="The ProLog promotional film"
    />
  );
}

export function CampaignBrochureFigure() {
  return (
    <img src={campBrochure} alt="The ProLog brochure mockup" loading="lazy" style={{ width: "100%" }} />
  );
}

export function CampaignBillboardsFigure() {
  return (
    <div className="cs-figure-row">
      <img src={campBillboard1} alt="ProLog billboard mockup" loading="lazy" />
      <img src={campBillboard2} alt="ProLog billboard mockup" loading="lazy" />
    </div>
  );
}

export function CampaignInstagramFigure() {
  return (
    <div className="cs-insta-stack">
      <img src={campInsta3} alt="ProLog Instagram carousel, team foundation strip" loading="lazy" />
    </div>
  );
}

export function PaletteFigure() {
  return (
    <img
      src={paletteImg}
      alt="The ProLog palette: a primary orange ramp, industrial neutrals, an alert red, a secondary steel blue, their gradients, and the background/white/border stack"
      loading="lazy"
      style={{ width: "100%" }}
    />
  );
}
