import { useEffect, useRef } from "react";

/* TinyPaws case-study hero: the live-site screen recording playing inside
   a desktop monitor, above the headline. The monitor frame is baked into
   the video itself; its white ground melts into the page background via
   multiply, so the mockup reads as sitting on the page, not in a box.
   Loops silently like a GIF. */

const VIDEO_SRC = `${import.meta.env.BASE_URL}media/tinypaws/tinypaws-hero-monitor.mp4`;

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
    </div>
  );
}
