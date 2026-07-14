import { useEffect, useLayoutEffect, useState } from "react";

// iPhone 17 logical viewport (pt) + a bezel around it. The iframe always
// renders the app at this fixed size so its fixed-width layouts never clip;
// the whole frame is then visually scaled to fit the available space.
const SCREEN_W = 402;
const SCREEN_H = 874;
const BEZEL = 6;
const FRAME_W = SCREEN_W + BEZEL * 2; // 414
const FRAME_H = SCREEN_H + BEZEL * 2; // 886

function computeScale() {
  if (typeof window === "undefined") return 1;
  const vv = window.visualViewport;
  const vw = vv ? vv.width : window.innerWidth;
  const vh = vv ? vv.height : window.innerHeight;
  const mobile = vw <= 600;
  const padX = mobile ? 16 : 28;
  const padY = mobile ? 16 : 28;
  const headSpace = 46; // caption row + gap above the phone
  // a little extra breathing room so it never hugs the screen edges on mobile
  const room = mobile ? 0.96 : 1;
  const availW = (vw - padX * 2) * room;
  const availH = (vh - padY * 2 - headSpace) * room;
  return Math.min(availW / FRAME_W, availH / FRAME_H, 1);
}

/** Full-screen modal that shows a hosted app inside a phone frame via iframe.
 *  Closes on backdrop click, the × button, or Escape; locks page scroll while
 *  open. The iframe is only mounted while open, so each open is a fresh load. */
export default function TryAppModal({ open, onClose, src, title = "ProLog" }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // iOS Safari ignores overflow:hidden on html for touch scrolling, and a
    // scrolling page drags fixed overlays out of place (bare bands above and
    // below the backdrop) — pinning the body freezes the page for real
    const scrollY = window.scrollY;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const body = document.body.style;
    const prevBody = { position: body.position, top: body.top, width: body.width };
    body.position = "fixed";
    body.top = `-${scrollY}px`;
    body.width = "100%";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
      body.position = prevBody.position;
      body.top = prevBody.top;
      body.width = prevBody.width;
      window.scrollTo(0, scrollY);
    };
  }, [open, onClose]);

  useLayoutEffect(() => {
    if (!open) return;
    const update = () => setScale(computeScale());
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, [open]);

  if (!open) return null;

  const dialogWidth = Math.round(FRAME_W * scale);

  return (
    <div className="tryapp-backdrop" onClick={onClose}>
      <div
        className="tryapp-dialog"
        style={{ width: dialogWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tryapp-head">
          <span className="tryapp-caption">{title} — live interactive demo</span>
          <button type="button" className="tryapp-close" onClick={onClose} aria-label="Close demo">
            ×
          </button>
        </div>
        {/* scaler carries the on-screen (scaled) size so layout stays correct */}
        <div
          className="tryapp-phone-scaler"
          style={{ width: FRAME_W * scale, height: FRAME_H * scale }}
        >
          <div
            className="tryapp-phone"
            style={{ width: FRAME_W, height: FRAME_H, transform: `scale(${scale})` }}
          >
            <iframe className="tryapp-frame" src={src} title={`${title} interactive demo`} />
          </div>
        </div>
      </div>
    </div>
  );
}
