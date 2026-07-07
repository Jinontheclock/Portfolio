import { useLayoutEffect, useRef } from "react";

/** Scales a single nowrap line's font down so it fits its container width,
 *  never larger than maxPx (or mobileMax on ≤600px screens when given).
 *  Used for the Adobe tool row, which is wider than the narrow Skills column
 *  at body size. Refits on resize and font load. */
export default function useFitToWidth(maxPx, { skipMobile = false, mobileMax = null } = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !maxPx) return;

    const fit = () => {
      const mobile = window.innerWidth <= 600;
      // some rows wrap at the stylesheet size on mobile instead of shrinking
      if (skipMobile && mobile) {
        el.style.fontSize = "";
        return;
      }
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
  }, [maxPx, skipMobile, mobileMax]);

  return ref;
}
