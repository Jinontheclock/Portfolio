import "img-comparison-slider";
import crowdAfter from "../assets/welab/welab-awt-crowd-after.webp";
import crowdBefore from "../assets/welab/welab-awt-crowd-before.webp";
import figOldChallenge from "../assets/welab/welab-old-showcase-challenge.webp";

/* ── 03 Designing and Building: the live site's before/after slider,
   embedded with the same web component + hand-written chrome (divider,
   handle, labels, responsive sizes) that runs on weloveabattle.com.
   first = AFTER (left of the divider), second = BEFORE (right), matching
   the arrangement on the live project pages. ── */
export function WLVfxSliderFigure() {
  return (
    <div className="wl-vfx-compare">
      {/* the old page's answer beside the new one, on the same shot: the
          crowd plate and its finished frame as separate stacked stills on
          the left, one draggable frame on the right. Widths follow each
          capture's aspect ratio over the shared reference (2.852), so both
          render at the same height as every other figure in the study. */}
      <img
        className="wl-vfx-old"
        style={{ width: "calc((100% - 20px) * 0.3066)" }}
        src={figOldChallenge}
        alt="The Challenge section of the old project page — the crowd plate and the finished shot as separate stills, stacked with no way to compare them directly"
        loading="lazy"
      />
      <div className="wl-slider" style={{ width: "calc((100% - 20px) * 0.6234)" }}>
      <span className="wl-slider-label wl-slider-label--left" aria-hidden="true">
        AFTER
      </span>
      <span className="wl-slider-label wl-slider-label--right" aria-hidden="true">
        BEFORE
      </span>
      <img-comparison-slider>
        <img
          slot="first"
          src={crowdAfter}
          alt="After — the finished shot: the stadium crowd digitally extended to a full house"
        />
        <img
          slot="second"
          src={crowdBefore}
          alt="Before — the original plate: one row of extras in front of a bluescreen"
        />
        <div slot="handle" className="wl-slider-handle">
          <svg viewBox="-8 -3 16 6" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M -5 -2 L -7 0 L -5 2 M 5 -2 L 7 0 L 5 2"
              fill="none"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </img-comparison-slider>
      </div>
    </div>
  );
}
