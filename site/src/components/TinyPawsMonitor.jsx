import { useEffect, useRef } from "react";
import monitorUrl from "../assets/tinypaws/tinypaws-monitor-mockup.webp";

/* TinyPaws case-study hero: the live-site screen recording playing inside
   a desktop monitor mockup, above the headline. The video sits in the
   mockup's screen cutout — measured from the frame image (left 2.075%,
   top 2.634%, 95.85% × 70.03%) — and loops silently like a GIF, with the
   monitor frame drawn on top. */

const VIDEO_SRC = `${import.meta.env.BASE_URL}media/tinypaws/tinypaws-hero-journey.mp4`;

export default function TinyPawsMonitor() {
  const videoRef = useRef(null);

  // reduced motion: hold the first frame instead of looping
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <div className="cs-monitor">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
      <img src={monitorUrl} alt="The TinyPaws site playing on a desktop monitor" />
    </div>
  );
}
