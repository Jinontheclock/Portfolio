import { useRef } from "react";
import logoUrl from "../assets/tinypaws/tinypaws-logo.webp";
import usePlayThroughOnce from "../hooks/usePlayThroughOnce.js";

/* TinyPaws case-study hero: the live-site screen recording playing inside
   a desktop monitor, above the headline. The monitor frame is baked into
   the video, and the video's own background is the page background
   (#FAFAFA), so the mockup reads as sitting on the page, not in a box.
   Playback is the heroes' shared play-through-once choreography
   (usePlayThroughOnce).

   The video markup is set as a raw HTML string: React omits the `muted`
   attribute from the DOM it renders. Native markup keeps muted/playsinline
   visible so the script-initiated play() is allowed; preload="auto" lets
   the first frame decode behind the cover without playing. */

const VIDEO_SRC = `${import.meta.env.BASE_URL}media/tinypaws/tinypaws-hero-monitor.mp4`;
const VIDEO_HTML = `<video src="${VIDEO_SRC}" muted playsinline preload="auto" aria-hidden="true" tabindex="-1"></video>`;

export default function TinyPawsMonitor() {
  const hostRef = useRef(null);
  usePlayThroughOnce(hostRef);

  return (
    <div ref={hostRef} className="cs-monitor cs-monitor--offset">
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
