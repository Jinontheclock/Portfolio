import "img-comparison-slider";
import crowdAfter from "../assets/welab/welab-awt-crowd-after.webp";
import crowdBefore from "../assets/welab/welab-awt-crowd-before.webp";
import figOldShowcase from "../assets/welab/welab-fig-old-showcase.webp";

/* ── 03 Designing and Building: the live site's before/after slider,
   embedded with the same web component + hand-written chrome (divider,
   handle, labels, responsive sizes) that runs on weloveabattle.com.
   first = AFTER (left of the divider), second = BEFORE (right), matching
   the arrangement on the live project pages. ── */
export function WLVfxSliderFigure() {
  return (
    <div className="wl-vfx-compare">
      {/* the old page's answer, beside the new one: separate stills stacked
          on the left, one draggable frame on the right. Both captures share
          the same aspect ratio, so the halves render at the same height. */}
      <img
        className="wl-vfx-old"
        src={figOldShowcase}
        alt="The old site's project page — The Challenge and The Solution sections each stacking a before frame above an after frame as separate stills, with no way to compare them directly"
        loading="lazy"
      />
      <div className="wl-slider">
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
