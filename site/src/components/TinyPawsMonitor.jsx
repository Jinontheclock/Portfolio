import MonitorHero from "./MonitorHero.jsx";

/* TinyPaws case-study hero: the live-site screen recording playing inside
   a desktop monitor, above the headline. */
const VIDEO_SRC = `${import.meta.env.BASE_URL}media/tinypaws/tinypaws-hero-monitor.mp4`;

export default function TinyPawsMonitor() {
  return <MonitorHero src={VIDEO_SRC} />;
}
