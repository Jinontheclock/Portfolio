import { useEffect, useRef } from "react";
import logoUrl from "../assets/prolog/prolog-logo.svg";
import mockupUrl from "../assets/prolog/prolog-mockup.webp";

/* ProLog case-study hero: the logo, the journey animation, and the phone
   mockup side by side, sitting above the headline.

   The animation is the exported video of the Claude Design scene
   ("ProLog Journey Animation") — a 14s play-through that settles on its
   final frame: the start node glows, the captions type on, the trail
   draws stage by stage, and the finish node ripples. The video's own
   background matches the page background (#FAFAFA), so it reads as
   drawn-on-the-page rather than a cropped media box. */

const VIDEO_SRC = `${import.meta.env.BASE_URL}media/prolog/prolog-journey-animation.mp4`;

export default function ProLogJourney() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // reduced motion: hold the settled end state instead of playing
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
    // burn through the play unseen. React drops the muted attribute from
    // its rendered DOM, so re-assert it before playing or the browser's
    // autoplay policy rejects the play() call.
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
    <div className="cs-hero">
      {/* the logo floats over the animation's top-left corner */}
      <img className="cs-hero-logo" src={logoUrl} alt="ProLog" />
      <div className="cs-journey" aria-hidden="true">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
        />
      </div>
      <img
        className="cs-hero-mockup"
        src={mockupUrl}
        alt="ProLog dashboard on a phone"
      />
    </div>
  );
}
