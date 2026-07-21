import { useEffect, useRef } from "react";

/* TinyPaws case-study hero: the live-site screen recording playing inside
   a desktop monitor, above the headline. The monitor frame is baked into
   the video, and the video's own background is the page background
   (#FAFAFA), so the mockup reads as sitting on the page, not in a box.
   Like the ProLog hero, it plays through once and holds the final frame.

   The video markup is set as a raw HTML string: React omits the `muted`
   attribute from the DOM it renders, and without it browsers' autoplay
   policies refuse to start the video. Native markup keeps
   muted/autoplay/playsinline visible to the policy check. */

const VIDEO_SRC = `${import.meta.env.BASE_URL}media/tinypaws/tinypaws-hero-monitor.mp4`;
const VIDEO_HTML = `<video src="${VIDEO_SRC}" autoplay muted playsinline preload="metadata" aria-hidden="true" tabindex="-1"></video>`;

export default function TinyPawsMonitor() {
  const hostRef = useRef(null);

  useEffect(() => {
    const video = hostRef.current?.querySelector("video");
    if (!video) return;

    // reduced motion: jump straight to the settled end state
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      const showEnd = () => {
        video.currentTime = Math.max(0, video.duration - 0.05);
      };
      if (video.readyState >= 1) showEnd();
      else video.addEventListener("loadedmetadata", showEnd, { once: true });
      return;
    }

    // plays through once, then holds the final frame; the playhead only
    // advances while the hero is on screen, so scrolling away doesn't
    // burn through the play unseen
    let ended = false;
    video.addEventListener("ended", () => (ended = true), { once: true });
    const io = new IntersectionObserver(([e]) => {
      if (ended) return;
      if (e.isIntersecting) {
        video.muted = true;
        video.play().catch(() => {});
      } else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className="cs-monitor"
      dangerouslySetInnerHTML={{ __html: VIDEO_HTML }}
    />
  );
}
