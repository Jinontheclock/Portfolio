import { useEffect } from "react";

/** Full-screen modal that shows a hosted app inside a phone frame via iframe.
 *  Closes on backdrop click, the × button, or Escape; locks page scroll while
 *  open. The iframe is only mounted while open, so each open is a fresh load. */
export default function TryAppModal({ open, onClose, src, title = "ProLog" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="tryapp-backdrop" onClick={onClose}>
      <div className="tryapp-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="tryapp-head">
          <span className="tryapp-caption">{title} — live interactive demo</span>
          <button type="button" className="tryapp-close" onClick={onClose} aria-label="Close demo">
            ×
          </button>
        </div>
        <div className="tryapp-phone">
          <iframe className="tryapp-frame" src={src} title={`${title} interactive demo`} />
        </div>
      </div>
    </div>
  );
}
