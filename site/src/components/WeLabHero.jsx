import MonitorHero from "./MonitorHero.jsx";

/* WeLAB case-study hero: the rebuilt live site playing inside a Studio
   Display mockup, above the headline. The WeLAB wordmark in its browser
   chrome is part of the recording, so no logo sits over it. */
const VIDEO_SRC = `${import.meta.env.BASE_URL}media/welab/welab-hero-mockup.mp4`;

export default function WeLabHero() {
  return <MonitorHero src={VIDEO_SRC} />;
}
