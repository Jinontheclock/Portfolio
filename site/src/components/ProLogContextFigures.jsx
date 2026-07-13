import timelineImg from "../assets/prolog/prolog-fig-timeline.webp";
import fragmentsImg from "../assets/prolog/prolog-fig-fragments.webp";
import audienceImg from "../assets/prolog/prolog-fig-audience.webp";
import certStatsImg from "../assets/prolog/prolog-fig-certstats.webp";
import discrepancyImg from "../assets/prolog/prolog-fig-discrepancy.webp";
import participantsImg from "../assets/prolog/prolog-fig-participants.webp";

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
