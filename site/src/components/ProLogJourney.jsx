import { useRef } from "react";
import logoUrl from "../assets/prolog/prolog-logo.svg";
import mockupUrl from "../assets/prolog/prolog-mockup.webp";
import usePlayThroughOnce from "../hooks/usePlayThroughOnce.js";

/* ProLog case-study hero: the logo, the journey animation, and the phone
   mockup side by side, sitting above the headline.

   The animation is an exported video ("ProLog Journey Animation") — a
   14s play-through that settles on its
   final frame: the start node glows, the captions type on, the trail
   draws stage by stage, and the finish node ripples. The video's own
   background matches the page background (#FAFAFA), so it reads as
   drawn-on-the-page rather than a cropped media box. Playback is the
   heroes' shared play-through-once choreography (usePlayThroughOnce). */

const VIDEO_SRC = `${import.meta.env.BASE_URL}media/prolog/prolog-journey-animation.mp4`;

export default function ProLogJourney() {
  const videoRef = useRef(null);
  usePlayThroughOnce(videoRef);

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
