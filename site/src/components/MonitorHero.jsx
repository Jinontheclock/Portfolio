import { useRef } from "react";
import usePlayThroughOnce from "../hooks/usePlayThroughOnce.js";

/* A case-study hero that is a screen recording inside a monitor: the
   mockup is baked into the video, and the video's own background is the
   page background (#FAFAFA), so it reads as sitting on the page rather
   than in a box. Playback is the heroes' shared play-through-once
   choreography (usePlayThroughOnce).

   The video markup is set as a raw HTML string because React omits the
   `muted` attribute from the DOM it renders, and a video that is not
   muted in the markup is not allowed to be played by a script. Native
   markup keeps muted and playsinline where the browser can see them;
   preload="auto" lets the first frame decode behind the boot cover
   without playing.

   WeLAB and TinyPaws are this component with their own recording; they
   were the same file twice, down to the comment, which is two places for
   one fix to the play-through contract to be made. */
export default function MonitorHero({ src }) {
  const hostRef = useRef(null);
  usePlayThroughOnce(hostRef);

  return (
    <div ref={hostRef} className="cs-monitor">
      <div
        className="cs-monitor-video"
        dangerouslySetInnerHTML={{
          __html: `<video src="${src}" muted playsinline preload="auto" aria-hidden="true" tabindex="-1"></video>`,
        }}
      />
    </div>
  );
}
