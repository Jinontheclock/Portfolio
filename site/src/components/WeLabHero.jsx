import { useRef } from "react";
import logoUrl from "../assets/welab/welab-logo.webp";
import usePlayThroughOnce from "../hooks/usePlayThroughOnce.js";

/* WeLAB case-study hero: the rebuilt live site playing inside a Studio
   Display mockup, above the headline. The mockup (and the WeLAB wordmark
   in its browser chrome) is baked into the video, and the video's own
   background is the page background (#FAFAFA), so it reads as sitting on
   the page, not in a box — no separate logo overlay needed. Playback is
   the heroes' shared play-through-once choreography (usePlayThroughOnce).

   Raw HTML markup keeps muted/playsinline visible so the script-initiated
   play() is allowed (React drops the muted attribute); preload="auto"
   lets the first frame decode behind the cover without playing. */

const VIDEO_SRC = `${import.meta.env.BASE_URL}media/welab/welab-hero-mockup-real.mp4`;
const VIDEO_HTML = `<video src="${VIDEO_SRC}" muted playsinline preload="auto" aria-hidden="true" tabindex="-1"></video>`;

export default function WeLabHero() {
  const hostRef = useRef(null);
  usePlayThroughOnce(hostRef);

  return (
    <div ref={hostRef} className="cs-monitor">
      {/* the wordmark floats over the video's blank top-left corner, like
          the TinyPaws and ProLog heroes */}
      <img className="cs-hero-logo" src={logoUrl} alt="WeLAB" />
      <div
        className="cs-monitor-video"
        dangerouslySetInnerHTML={{ __html: VIDEO_HTML }}
      />
    </div>
  );
}
