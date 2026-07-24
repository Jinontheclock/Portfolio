import { useEffect, useRef } from "react";
import logoUrl from "../assets/tinypaws/tinypaws-logo.webp";
import { isCovered, onCover, onReveal } from "../lib/preloaderBus.js";

/* TinyPaws case-study hero: the live-site screen recording playing inside
   a desktop monitor, above the headline. The monitor frame is baked into
   the video, and the video's own background is the page background
   (#FAFAFA), so the mockup reads as sitting on the page, not in a box.
   Like the ProLog hero, it plays through once and holds the final frame,
   and it doesn't start until the count-up cover has lifted — so the
   play-through isn't spent behind the loader.

   The video markup is set as a raw HTML string: React omits the `muted`
   attribute from the DOM it renders. Native markup keeps muted/playsinline
   visible so the script-initiated play() is allowed; preload="auto" lets
   the first frame decode behind the cover without playing. */

const VIDEO_SRC = `${import.meta.env.BASE_URL}media/tinypaws/tinypaws-hero-monitor.mp4`;
const VIDEO_HTML = `<video src="${VIDEO_SRC}" muted playsinline preload="auto" aria-hidden="true" tabindex="-1"></video>`;

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
    // advances while the hero is on screen AND the page is uncovered, so
    // neither scrolling away nor the loader burns through the play unseen
    let onScreen = false;
    let ended = false;
    const play = () => {
      if (ended || !onScreen || isCovered()) return;
      video.muted = true;
      video.play().catch(() => {});
    };
    const onEnded = () => (ended = true);
    video.addEventListener("ended", onEnded);
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) play();
      else video.pause();
    });
    io.observe(video);
    // a cover going up resets the play-through to the first frame; the
    // reveal starts it (from 0) once the page is actually on screen
    const offCover = onCover(() => {
      ended = false;
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* not seekable yet — starts at 0 anyway */
      }
    });
    const offReveal = onReveal(play);
    return () => {
      io.disconnect();
      video.removeEventListener("ended", onEnded);
      offCover();
      offReveal();
    };
  }, []);

  return (
    <div ref={hostRef} className="cs-monitor">
      {/* the logo floats over the video's blank top-left corner, matching
          the ProLog hero */}
      <img className="cs-hero-logo" src={logoUrl} alt="TinyPaws" />
      <div
        className="cs-monitor-video"
        dangerouslySetInnerHTML={{ __html: VIDEO_HTML }}
      />
    </div>
  );
}
