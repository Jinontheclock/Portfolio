import { useEffect } from "react";
import { isCovered, onCover, onReveal } from "../lib/preloaderBus.js";

/** The case-study heroes' shared playback choreography: the video plays
 *  through once and holds its final frame. The playhead only advances while
 *  the hero is on screen AND the page is uncovered, so neither scrolling
 *  away nor the count-up loader burns through the play unseen; a cover
 *  going up rewinds to the first frame and the reveal starts it over.
 *  Under prefers-reduced-motion the video just holds its settled end state.
 *
 *  `ref` may point at the <video> itself or at any ancestor of one (the
 *  heroes that inject raw markup pass their host element). */
export default function usePlayThroughOnce(ref) {
  useEffect(() => {
    const host = ref.current;
    const video =
      host && (host.tagName === "VIDEO" ? host : host.querySelector("video"));
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

    let onScreen = false;
    let ended = false;
    const play = () => {
      if (ended || !onScreen || isCovered()) return;
      // React (and some browsers) drop the muted attribute — re-assert it
      // before playing or the autoplay policy rejects play()
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
  }, [ref]);
}
