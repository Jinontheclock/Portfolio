import { useEffect, useRef } from "react";

/* TinyPaws case-study hero: the live-site screen recording playing inside
   a desktop monitor, above the headline. The monitor frame is baked into
   the video itself; its white ground melts into the page background via
   multiply, so the mockup reads as sitting on the page, not in a box.
   Loops silently like a GIF.

   The video markup is set as a raw HTML string: React omits the `muted`
   attribute from the DOM it renders, and without it browsers' autoplay
   policies refuse to start the video. Native markup keeps
   muted/autoplay/playsinline visible to the policy check. */

const VIDEO_SRC = `${import.meta.env.BASE_URL}media/tinypaws/tinypaws-hero-monitor.mp4`;
const VIDEO_HTML = `<video src="${VIDEO_SRC}" autoplay muted loop playsinline preload="metadata" aria-hidden="true" tabindex="-1"></video>`;

export default function TinyPawsMonitor() {
  const hostRef = useRef(null);

  useEffect(() => {
    const video = hostRef.current?.querySelector("video");
    if (!video) return;

    // reduced motion: hold the first frame instead of looping
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    // belt and braces: if the autoplay attribute didn't start it, start it
    video.muted = true;
    const kick = () => video.play().catch(() => {});
    if (video.paused) {
      kick();
      video.addEventListener("canplay", kick, { once: true });
    }
    return () => video.removeEventListener("canplay", kick);
  }, []);

  return (
    <div
      ref={hostRef}
      className="cs-monitor"
      dangerouslySetInnerHTML={{ __html: VIDEO_HTML }}
    />
  );
}
