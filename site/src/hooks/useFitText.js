import { useLayoutEffect, useRef } from "react";

/** Sizes the element's font so its single line fills the element's width —
 *  as large as possible without wrapping. The element must be single-line
 *  (white-space: nowrap); until this runs, the stylesheet's font-size acts
 *  as the fallback. Refits on resize and once webfonts finish loading,
 *  since fallback-font metrics differ.
 *
 *  `refText` locks the line-box height to what that reference text would
 *  produce, so switching content (language) never shifts the layout below —
 *  the current text just centers inside the reference-height line box. */
export default function useFitText(dep, { mobileRatio = 1, refText = null, ratio: baseRatio = 1 } = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const PROBE = 100; // measure at a fixed size; text width scales linearly

    // width the reference text would occupy at PROBE size, in this element's
    // font (measured on a hidden sibling so the element itself never flashes)
    const measureRef = () => {
      const cs = getComputedStyle(el);
      const probe = document.createElement("span");
      probe.style.cssText =
        "position:absolute;visibility:hidden;white-space:nowrap;" +
        `font-family:${cs.fontFamily};font-weight:${cs.fontWeight};` +
        `font-size:${PROBE}px;letter-spacing:-0.01em;`;
      probe.textContent = refText;
      el.parentNode.appendChild(probe);
      const w = probe.getBoundingClientRect().width;
      probe.remove();
      return w;
    };

    const fit = () => {
      el.style.fontSize = PROBE + "px";
      const range = document.createRange();
      range.selectNodeContents(el);
      const textWidth = range.getBoundingClientRect().width;
      const available = el.clientWidth;
      if (!textWidth || !available) return;
      // on mobile the line can sit a bit smaller than full width; baseRatio
      // lets dense scripts (e.g. Korean) sit slightly smaller everywhere
      const ratio = (window.innerWidth <= 600 ? mobileRatio : 1) * baseRatio;
      // 0.995 leaves a hair of slack so rounding never causes a wrap
      const scale = (available / textWidth) * 0.995 * ratio;
      el.style.fontSize = PROBE * scale + "px";

      if (refText) {
        const refWidth = measureRef();
        if (refWidth) {
          // the reference height ignores baseRatio so the locked line box —
          // and everything below it — is identical in every language
          const refRatio = window.innerWidth <= 600 ? mobileRatio : 1;
          const refSize = PROBE * (available / refWidth) * 0.995 * refRatio;
          // same line box in every language = the reference text's height
          el.style.lineHeight = refSize * 1.2 + "px";
        }
      }
    };

    fit();
    if (document.fonts?.ready) document.fonts.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
    // refit when the text content changes (e.g. language switch)
  }, [dep, mobileRatio, refText, baseRatio]);

  return ref;
}
