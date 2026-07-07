import { useLayoutEffect, useRef } from "react";

/** Sizes the element's font so its single line fills the element's width —
 *  as large as possible without wrapping. The element must be single-line
 *  (white-space: nowrap); until this runs, the stylesheet's font-size acts
 *  as the fallback. Refits on resize and once webfonts finish loading,
 *  since fallback-font metrics differ. */
export default function useFitText(dep) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const PROBE = 100; // measure at a fixed size; text width scales linearly

    const fit = () => {
      el.style.fontSize = PROBE + "px";
      const range = document.createRange();
      range.selectNodeContents(el);
      const textWidth = range.getBoundingClientRect().width;
      const available = el.clientWidth;
      if (!textWidth || !available) return;
      // 0.995 leaves a hair of slack so rounding never causes a wrap
      el.style.fontSize = PROBE * (available / textWidth) * 0.995 + "px";
    };

    fit();
    if (document.fonts?.ready) document.fonts.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
    // refit when the text content changes (e.g. language switch)
  }, [dep]);

  return ref;
}
