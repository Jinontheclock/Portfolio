import { useCallback, useEffect, useRef, useState } from "react";
import { freezePage } from "../lib/freeze-page.js";

/* A figure taken out of the page: the same file, centred on a dimmed
   backdrop at the size it was saved at.

   The artwork in these studies is drawn at up to 4800px and read in a
   718px column, so a board of twelve lo-fi frames arrives at a seventh of
   its width and most of what it says cannot be read. Opening it is the
   whole point of the thing.

   It opens fitted to the viewport rather than at 1:1, because a 4800px
   board dropped in at full size arrives somewhere in its own middle with
   nothing to say where. Where the file is bigger than that fit, clicking
   it swaps to 1:1 and the backdrop scrolls; where it already fits, there
   is nothing to swap to and the click closes like the backdrop's. */
export default function ImageLightbox({ src, alt, onClose }) {
  const [full, setFull] = useState(false);
  /* whether 1:1 would show more than the fit does — measured against this
     viewport, not the file, so a small figure on a large screen correctly
     reports that there is nothing to open further */
  const [fits, setFits] = useState(true);
  const overlayRef = useRef(null);
  const imgRef = useRef(null);
  const closeRef = useRef(null);

  /* onClose arrives as a fresh closure on every render of the page behind
     this, and freezing, focusing and thawing are things to do once on the
     way in and once on the way out — not every time the page re-renders
     under us. The ref lets the effect hold still while the callback moves. */
  const closeCb = useRef(onClose);
  closeCb.current = onClose;

  useEffect(() => {
    const thaw = freezePage();
    const onKey = (e) => {
      if (e.key === "Escape") closeCb.current();
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      thaw();
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const measure = useCallback(() => {
    const img = imgRef.current;
    const box = overlayRef.current;
    if (!img || !box || !img.naturalWidth) return;
    const cs = getComputedStyle(box);
    const w = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const h = box.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    setFits(img.naturalWidth <= w && img.naturalHeight <= h);
  }, []);

  /* the file is already decoded — it is on the page behind this — so a
     cached image can be complete before the load event would fire */
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, src]);

  const zoomable = !fits;

  return (
    <div
      ref={overlayRef}
      className={"cs-zoom" + (full ? " is-full" : "")}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Figure"}
    >
      <button type="button" className="cs-zoom-close" onClick={onClose} aria-label="Close figure" ref={closeRef}>
        ×
      </button>
      <img
        ref={imgRef}
        className={"cs-zoom-img" + (zoomable ? (full ? " is-out" : " is-in") : "")}
        src={src}
        alt={alt}
        onLoad={measure}
        onClick={
          zoomable
            ? (e) => {
                e.stopPropagation();
                setFull((v) => !v);
              }
            : undefined
        }
      />
    </div>
  );
}
