import { useEffect, useLayoutEffect, useState } from "react";
import frameOrange from "../assets/iphone17-frame.webp";
import frameBlue from "../assets/iphone17-frame-blue.webp";

// The phone is a real iPhone 17 mockup: a 1720×3516 render whose screen
// window — measured from its alpha channel — is 1534×3336 at (93, 90), which
// is exactly a 402×874 viewport drawn at 3.816×. The iframe renders the app
// at that logical size behind the window, and the whole device is scaled to
// fit the available space. Both colourways share the same geometry, so each
// project just picks its finish.
const FRAMES = { orange: frameOrange, blue: frameBlue };
const SCREEN_W = 402;
const SCREEN_H = 874;
const MOCK = { w: 1720, h: 3516, x: 93, y: 90, scale: 1534 / SCREEN_W };
const FRAME_W = MOCK.w / MOCK.scale; // ≈450.7
const FRAME_H = MOCK.h / MOCK.scale; // ≈921.3
const SCREEN_X = MOCK.x / MOCK.scale; // ≈24.4
const SCREEN_Y = MOCK.y / MOCK.scale; // ≈23.6
// The app is drawn a whisker larger than the glass and clipped, purely to
// absorb sub-pixel rounding of the scaled iframe — under a logical pixel
// per side, so the app still fits the glass exactly to the eye.
const OVERSCAN = 1.004;
const OVER_X = (SCREEN_W * (OVERSCAN - 1)) / 2; // ≈2.4
const OVER_Y = (SCREEN_H * (OVERSCAN - 1)) / 2; // ≈5.2

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

// web variant: on desktop/laptop the site is a desktop site first, so the
// iframe always renders at a fixed desktop width and is scaled down to fit —
// a narrow browser window never demotes the demo to its tablet/mobile layout.
// On phones the iframe stays natural-size and the responsive site takes over.
const WEB_W = 1280;

function computeWebLayout() {
  if (typeof window === "undefined") return { mobile: false, w: WEB_W, h: 800, scale: 1, logicalH: 800 };
  const vv = window.visualViewport;
  const vw = vv ? vv.width : window.innerWidth;
  const vh = vv ? vv.height : window.innerHeight;
  if (vw <= 600) return { mobile: true };
  const headSpace = 46;
  const availW = vw - 28 * 2;
  const availH = vh - 28 * 2 - headSpace;
  const w = Math.min(availW, 1200);
  const h = Math.min(availH, 820);
  const scale = w / WEB_W;
  return { mobile: false, w, h, scale, logicalH: Math.round(h / scale) };
}

/** Full-screen modal that shows a hosted app via iframe — a phone frame by
 *  default, or a browser-like window for responsive sites (variant="web",
 *  where the site simply adapts to the frame instead of being scaled).
 *  Closes on backdrop click, the × button, or Escape; locks page scroll while
 *  open. The iframe is only mounted while open, so each open is a fresh load. */
export default function TryAppModal({ open, onClose, src, title = "ProLog", variant = "phone", frame = "orange" }) {
  const [scale, setScale] = useState(1);
  const [webLayout, setWebLayout] = useState(computeWebLayout);

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
    const update = () => {
      setScale(computeScale());
      setWebLayout(computeWebLayout());
    };
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, [open]);

  if (!open) return null;

  if (variant === "web") {
    const wl = webLayout;
    return (
      <div className="tryapp-backdrop" onClick={onClose}>
        <div
          className="tryapp-dialog tryapp-dialog--web"
          style={wl.mobile ? undefined : { width: wl.w }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="tryapp-head">
            <span className="tryapp-caption" aria-hidden="true"></span>
            <button type="button" className="tryapp-close" onClick={onClose} aria-label="Close demo">
              ×
            </button>
          </div>
          {wl.mobile ? (
            /* phones: natural size — the responsive site shows its mobile layout */
            <div className="tryapp-web-frame tryapp-web-frame--fluid">
              <iframe className="tryapp-frame" src={src} title={`${title} interactive demo`} />
            </div>
          ) : (
            /* desktop/laptop: fixed desktop width, scaled to fit the window */
            <div className="tryapp-web-frame" style={{ width: wl.w, height: wl.h }}>
              <iframe
                className="tryapp-frame"
                src={src}
                title={`${title} interactive demo`}
                style={{
                  width: WEB_W,
                  height: wl.logicalH,
                  transform: `scale(${wl.scale})`,
                  transformOrigin: "top left",
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  const dialogWidth = Math.round(FRAME_W * scale);

  return (
    <div className="tryapp-backdrop" onClick={onClose}>
      <div
        className="tryapp-dialog"
        style={{ width: dialogWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tryapp-head">
          <span className="tryapp-caption" aria-hidden="true"></span>
          <button type="button" className="tryapp-close" onClick={onClose} aria-label="Close demo">
            ×
          </button>
        </div>
        {/* The phone box sits at its final display size and nothing above the
            iframe carries a transform. The window is a transparent clipping
            box laid exactly over the mockup's glass — it draws nothing of
            its own, so the only frame on screen is the mockup's. Whatever
            iOS Safari does with the scaled iframe inside, the app can never
            paint outside the glass, and the overscan keeps the app covering
            the window to its very rim. */}
        <div
          className="tryapp-phone"
          style={{ width: FRAME_W * scale, height: FRAME_H * scale }}
        >
          <div
            className="tryapp-window"
            style={{
              left: SCREEN_X * scale,
              top: SCREEN_Y * scale,
              width: SCREEN_W * scale,
              height: SCREEN_H * scale,
              borderRadius: 26 * scale,
            }}
          >
            <iframe
              className="tryapp-frame"
              src={src}
              title={`${title} interactive demo`}
              style={{
                left: -OVER_X * scale,
                top: -OVER_Y * scale,
                transform: `scale(${scale * OVERSCAN})`,
                transformOrigin: "top left",
              }}
            />
          </div>
          {/* the device overlays its own screen, so the bezel, corners and
              island sit above the app the way glass sits above pixels */}
          <img className="tryapp-phone-img" src={FRAMES[frame] ?? frameOrange} alt="" />
        </div>
      </div>
    </div>
  );
}
