import { useLayoutEffect, useRef } from "react";

/** Scales a single nowrap line's font down so it fits its container width,
 *  never larger than maxPx. Used for the Adobe tool row, which is wider than
 *  the narrow Skills column at body size. Refits on resize and font load. */
export default function useFitToWidth(maxPx) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !maxPx) return;

    const fit = () => {
      el.style.fontSize = maxPx + "px";
      // On mobile the row is allowed to wrap (stacked layout), so don't shrink
      if (window.innerWidth <= 600) return;
      const avail = el.clientWidth;
      const content = el.scrollWidth;
      if (content > avail && content > 0) {
        // 0.99 leaves a hair of slack so rounding never re-triggers a wrap
        el.style.fontSize = (maxPx * (avail / content) * 0.99).toFixed(2) + "px";
      }
    };

    fit();
    if (document.fonts?.ready) document.fonts.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [maxPx]);

  return ref;
}
