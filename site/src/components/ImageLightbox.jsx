import { useEffect, useRef } from "react";
import { freezePage } from "../lib/freeze-page.js";

/* A figure taken out of the page: the same file, centred on a dimmed
   backdrop, at one size every figure shares.

   The artwork in these studies is drawn at up to 4800px and read in a
   718px column, so a board of twelve lo-fi frames arrives at a seventh of
   its width and most of what it says cannot be read. Opening it is the
   whole point of the thing — but the file's own size is not the size to
   open it at, and a bounded box is (see --zoom-max).

   Clicking off the image closes it, as does Escape. The image itself is
   the one place a click does nothing, so a reader can look at it without
   dismissing it by accident. */
export default function ImageLightbox({ src, alt, onClose }) {
  /* onClose arrives as a fresh closure on every render of the page behind
     this, and freezing and thawing are things to do once on the way in and
     once on the way out — not every time the page re-renders under us. The
     ref lets the effect hold still while the callback moves. */
  const closeCb = useRef(onClose);
  closeCb.current = onClose;

  useEffect(() => {
    const thaw = freezePage();
    const onKey = (e) => {
      if (e.key === "Escape") closeCb.current();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      thaw();
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="cs-zoom" onClick={onClose} role="dialog" aria-modal="true" aria-label={alt || "Figure"}>
      <img
        className="cs-zoom-img"
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
