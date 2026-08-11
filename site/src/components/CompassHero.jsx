import { useEffect, useMemo, useRef, useState } from "react";
import frameBlue from "../assets/iphone-17-pro-blue.webp";
import cardUrl from "../assets/compass/compass-hero-card.webp";
import watchUrl from "../assets/compass/compass-hero-watch.webp";
import walletRestUrl from "../assets/compass/compass-hero-wallet-rest.webp";
import walletPassUrl from "../assets/compass/compass-hero-wallet-pass.webp";
import { isCovered, onCover, onReveal } from "../lib/preloaderBus.js";

/* Compass Card case-study hero: the physical card appears as a pass in the
   phone's Wallet, the watch joins from the wing, then the tap confirmation
   plays on the screen — the scene that opens chapter 05's "the card you
   already have, on the device you already carry". The card is never
   absorbed or taken away: it flies to the screen and cross-fades into the
   pass appearing in the stack (ch04's bet is "adds a phone; does not take
   away a card"). Once the pass is home the phone makes room, sliding left
   as the watch rides in from off-stage right — the card now lives on every
   wrist and screen. The sequence plays once and settles there: the tap
   clip hands the screen back to the wallet and the two-device still holds,
   the same play-through-once ending as the other heroes.

   Built as a live in-page animation (like ProLogJourney), not a video:
   two wallet stills layered in the phone's screen window plus the existing
   tap-motion clip, everything animated with transform/opacity only. The
   scene is laid out at a fixed logical size and the whole thing scales to
   the space it's given, so every distance holds at any width. */

/* ── timing: the ~7.6s play-through, one entry per storyboard beat ── */
const PHASES = [
  ["rest", 900], //   the still: card on the left, Wallet waiting on the right
  ["fly", 800], //    the card moves onto the screen's pass slot (decelerate)
  ["land", 400], //   cross-fade: physical card -> the pass, appearing in place
  ["hold", 700], //   breath — the pass has its home
  ["slide", 900], //  the phone makes room; the watch rides in from the right
  ["duo", 800], //    both devices hold, the pass on each
  ["tap", 2500], //   the screen plays the tap: zone, fare charged, balance
  ["settle", 600], // the tap clip hands the screen back to the wallet
  ["end", 0], //      terminal: phone and watch hold, side by side
];
const FADE_TAP_MS = 300; // wallet -> tap clip screen change inside "tap"
const DUR = Object.fromEntries(PHASES); // the CSS reads its durations from here

/* ── geometry ──
   The phone mockup is TryAppModal's: a 1720x3516 render whose screen window
   is 1534x3336 at (93,90) — a 402x874 viewport. The pass slot is where the
   Compass pass sits in the wallet still, measured in those screen coords. */
const MOCK = { w: 1720, h: 3516, x: 93, y: 90, sw: 1534 };
const SCREEN = { w: 402, h: 874, r: 26 };
const PASS_SLOT = { x: 10, y: 268, w: 382, h: 248 };
const CARD_AR = 1280 / 805; // the card art's own proportion
const WATCH_AR = 1572 / 2412; // the watch still's proportion
const PHONE_CAP = 350; // the phone never renders wider than this

/* the desktop band and the tighter phone-width composition: same scene,
   the card just starts closer so the flight stays in frame. The watch
   keeps the thumbnail's watch-to-phone proportion (1300:1700). */
const SCENES = {
  desktop: { w: 1200, h: 525, phoneX: 720, phoneTop: 12, phoneH: 500, cardX: 100, cardW: 340, watchH: 380, duoGap: 90 },
  mobile: { w: 620, h: 540, phoneX: 350, phoneTop: 10, phoneH: 520, cardX: 12, cardW: 280, watchH: 398, duoGap: 40 },
};

function layout(g) {
  const phoneW = (g.phoneH * MOCK.w) / MOCK.h;
  const s = ((phoneW * MOCK.sw) / MOCK.w) / SCREEN.w; // screen px per app px
  const screen = {
    x: (phoneW * MOCK.x) / MOCK.w,
    y: (g.phoneH * MOCK.y) / MOCK.h,
    w: SCREEN.w * s,
    h: SCREEN.h * s,
    r: SCREEN.r * s,
  };
  const cardH = g.cardW / CARD_AR;
  const cardY = (g.h - cardH) / 2;
  // the flight: translate the card's centre onto the slot's centre, scaled
  // down to the slot's width
  const k = (PASS_SLOT.w * s) / g.cardW;
  const dx = g.phoneX + screen.x + (PASS_SLOT.x + PASS_SLOT.w / 2) * s - (g.cardX + g.cardW / 2);
  const dy = g.phoneTop + screen.y + (PASS_SLOT.y + PASS_SLOT.h / 2) * s - (cardY + cardH / 2);
  // the duo: phone and watch centred as a pair; the phone slides left to its
  // duo seat and the watch starts one band-width past its own, off-stage
  const watchW = g.watchH * WATCH_AR;
  const duoPhoneX = (g.w - (phoneW + g.duoGap + watchW)) / 2;
  const watchX = duoPhoneX + phoneW + g.duoGap;
  const watchY = g.phoneTop + (g.phoneH - g.watchH) / 2;
  return {
    ...g,
    phoneW,
    screen,
    cardY,
    cardH,
    watchW,
    watchX,
    watchY,
    fly: `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${k.toFixed(3)})`,
    phoneSlide: `${(duoPhoneX - g.phoneX).toFixed(1)}px`,
    watchEnter: `${(g.w + 40 - watchX).toFixed(1)}px`,
  };
}

const VIDEO_SRC = `${import.meta.env.BASE_URL}media/compass-card/compass-tap-motion.mp4`;
const POSTER_SRC = `${import.meta.env.BASE_URL}media/compass-card/compass-tap-motion-poster.jpg`;
const ARIA =
  "A physical Compass Card appears as a pass in Apple Wallet, an Apple Watch slides in beside the phone, then a tap confirmation plays — zone, fare charged, balance remaining";

const useMedia = (query) => {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatch(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return match;
};

export default function CompassHero() {
  const mobile = useMedia("(max-width: 768px)");
  /* reduced motion holds the settled composition instead: the physical card
     beside the phone with the pass on screen — card in hand AND on the
     phone, the adds-not-replaces read with no animation at all */
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const L = useMemo(() => layout(SCENES[mobile ? "mobile" : "desktop"]), [mobile]);

  const bandRef = useRef(null);
  const sceneRef = useRef(null);
  const videoRef = useRef(null);
  const [phase, setPhase] = useState("rest");

  /* fit: scale the fixed-size scene to the band's width (phone capped) —
     resize is the only thing that ever touches layout */
  useEffect(() => {
    const band = bandRef.current;
    const scene = sceneRef.current;
    const fit = () => {
      const scale = Math.min(band.clientWidth / L.w, PHONE_CAP / L.phoneW);
      band.style.height = `${Math.round(L.h * scale)}px`;
      scene.style.transform = `translateX(${Math.round((band.clientWidth - L.w * scale) / 2)}px) scale(${scale})`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(band);
    return () => ro.disconnect();
  }, [L]);

  /* the play-through: a phase timer that only advances while the hero is on
     screen and the page is uncovered (usePlayThroughOnce's contract). The
     sequence runs once and holds its final two-device still; scrolling away
     mid-play restarts the story, but a finished play stays finished. A
     cover going up rewinds it for a fresh play on the reveal. */
  useEffect(() => {
    if (still) return;
    let timer = null;
    let running = false;
    let ended = false;
    let onScreen = false;
    const video = () => videoRef.current;
    const stop = () => {
      clearTimeout(timer);
      running = false;
      video()?.pause();
      if (!ended) setPhase("rest");
    };
    const run = (idx) => {
      const [name, ms] = PHASES[idx];
      setPhase(name);
      const v = video();
      if (v) {
        if (name === "tap") {
          v.muted = true; // React drops the attribute; autoplay needs it back
          try {
            v.currentTime = 0;
          } catch {
            /* not seekable yet — it starts at 0 anyway */
          }
          v.play().catch(() => {});
        } else if (name === "end") {
          v.pause();
        }
      }
      if (idx + 1 < PHASES.length) {
        timer = setTimeout(() => run(idx + 1), ms);
      } else {
        running = false;
        ended = true;
      }
    };
    const start = () => {
      if (running || ended || !onScreen || isCovered()) return;
      running = true;
      run(0);
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(bandRef.current);
    const offCover = onCover(() => {
      ended = false;
      stop();
    });
    const offReveal = onReveal(start);
    return () => {
      io.disconnect();
      offCover();
      offReveal();
      clearTimeout(timer);
    };
  }, [still]);

  return (
    <figure className="cs-figure cmp-hero" role="img" aria-label={ARIA}>
      <div
        ref={bandRef}
        className="cmp-hero-band"
        data-phase={still ? "still" : phase}
        style={{
          aspectRatio: `${L.w} / ${L.h}`,
          "--cmp-fly": L.fly,
          "--cmp-phone-slide": L.phoneSlide,
          "--cmp-watch-enter": L.watchEnter,
          "--cmp-t-fly": `${DUR.fly}ms`,
          "--cmp-t-land": `${DUR.land}ms`,
          "--cmp-t-slide": `${DUR.slide}ms`,
          "--cmp-t-settle": `${DUR.settle}ms`,
          "--cmp-t-tap": `${FADE_TAP_MS}ms`,
        }}
      >
        <div ref={sceneRef} className="cmp-hero-scene" style={{ width: L.w, height: L.h }}>
          <div
            className="cmp-hero-phone"
            style={{ left: L.phoneX, top: L.phoneTop, width: L.phoneW, height: L.phoneH }}
          >
            {/* the screen window sits under the frame image, like the glass
                under the bezel; three stacked layers, faded by phase */}
            <div
              className="cmp-hero-screen"
              style={{ left: L.screen.x, top: L.screen.y, width: L.screen.w, height: L.screen.h, borderRadius: L.screen.r }}
            >
              <img className="cmp-hero-wallet" src={walletRestUrl} alt="" />
              <img className="cmp-hero-wallet cmp-hero-wallet--pass" src={walletPassUrl} alt="" />
              {!still && (
                <video
                  ref={videoRef}
                  className="cmp-hero-tap"
                  src={VIDEO_SRC}
                  poster={POSTER_SRC}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  tabIndex={-1}
                />
              )}
            </div>
            <img className="cmp-hero-frame" src={frameBlue} alt="" />
          </div>
          <img
            className="cmp-hero-watch"
            src={watchUrl}
            alt=""
            style={{ left: L.watchX, top: L.watchY, width: L.watchW }}
          />
          <img
            className="cmp-hero-card"
            src={cardUrl}
            alt=""
            style={{ left: L.cardX, top: L.cardY, width: L.cardW }}
          />
        </div>
      </div>
    </figure>
  );
}
