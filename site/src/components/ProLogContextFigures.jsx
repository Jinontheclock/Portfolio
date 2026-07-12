import timelineImg from "../assets/prolog-fig-timeline.webp";
import fragmentsImg from "../assets/prolog-fig-fragments.webp";
import audienceImg from "../assets/prolog-fig-audience.webp";

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
