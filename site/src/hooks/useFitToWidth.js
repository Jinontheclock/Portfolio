import { useLayoutEffect, useRef } from "react";

/** Scales a single nowrap line's font down so it fits its container width,
 *  never larger than maxPx (or mobileMax on ≤600px screens when given).
 *  Used for the Adobe tool row, which is wider than the narrow Skills column
 *  at body size, and for the two copyright lines. Refits on resize and font
 *  load. The element has to be able to narrow below its own content (a flex
 *  item needs min-width: 0) or there is no shortfall to measure. */
export default function useFitToWidth(maxPx, { mobileMax = null } = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !maxPx) return;

    const fit = () => {
      const mobile = window.innerWidth <= 600;
      const cap = mobile && mobileMax != null ? mobileMax : maxPx;
      el.style.fontSize = cap + "px";
      const avail = el.clientWidth;
      const content = el.scrollWidth;
      if (content > avail && content > 0) {
        // 0.99 leaves a hair of slack so rounding never re-triggers a wrap
        el.style.fontSize = (cap * (avail / content) * 0.99).toFixed(2) + "px";
      }
    };

    fit();
    if (document.fonts?.ready) document.fonts.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [maxPx, mobileMax]);

  return ref;
}
