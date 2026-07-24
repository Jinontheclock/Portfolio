import { useEffect, useRef } from "react";
import logoUrl from "../assets/prolog/prolog-logo.svg";
import mockupUrl from "../assets/prolog/prolog-mockup.webp";
import { isCovered, onCover, onReveal } from "../lib/preloaderBus.js";

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
    // advances while the hero is on screen AND the page is uncovered, so
    // neither scrolling away nor the boot loader burns through the play
    // unseen. React drops the muted attribute from its rendered DOM, so
    // re-assert it before playing or the autoplay policy rejects play().
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
