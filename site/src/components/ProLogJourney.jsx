import { useEffect, useRef } from "react";
import svgUrl from "../assets/prolog-journey.svg";
import logoUrl from "../assets/prolog-logo.svg";
import mockupUrl from "../assets/prolog-mockup.webp";

/* ProLog case-study hero: the logo, the journey animation, and the phone
   mockup side by side, sitting above the headline.

   The animation is ported from the Claude Design project ("ProLog Journey
   Animation.dc.html" → prolog-scene.jsx). A 15s scene that plays once and
   settles on its final frame: the start node glows, the captions type on,
   the trail draws with a pause at each stage while its card pops in, and
   the end node ripples. Everything is driven by per-frame attribute
   updates on the inlined SVG, so it renders on the page background at any
   size — no video, no crop. */

const DURATION = 15; // seconds, one play-through
const RIPPLE_COUNT = 3;

const Easing = {
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeOutBack: (t) => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
// eased ramp 0..1 over [s,e]
function ramp(t, s, e, ease) {
  if (e <= s) return t >= e ? 1 : 0;
  const x = clamp((t - s) / (e - s), 0, 1);
  return ease ? ease(x) : x;
}

// piecewise map t across time keyframes tk -> value keyframes fk, eased per seg
function piecewise(t, tk, fk, ease) {
  if (t <= tk[0]) return fk[0];
  const n = tk.length;
  if (t >= tk[n - 1]) return fk[n - 1];
  for (let i = 0; i < n - 1; i++) {
    if (t >= tk[i] && t <= tk[i + 1]) {
      const span = tk[i + 1] - tk[i];
      const local = span === 0 ? 0 : (t - tk[i]) / span;
      const e = fk[i + 1] === fk[i] ? local : ease ? ease(local) : local;
      return fk[i] + (fk[i + 1] - fk[i]) * e;
    }
  }
  return fk[n - 1];
}

// dot centres on the trail (user-space coords of the 4 stage nodes)
const DOTS = [
  { x: 602.988, y: 936.988 }, // stage1
  { x: 602.355, y: 696.987 }, // stage2
  { x: 602.988, y: 456.987 }, // stage3
  { x: 600.355, y: 216.988 }, // stage4
];

function setup(svg, S) {
  const q = (id) => svg.querySelector("#" + id);
  S.svg = svg;
  S.maskPath = q("trailMaskPath");
  S.startHalo = q("startHalo");
  S.startNode = q("startNode");
  S.endNode = q("endNode");
  S.ripples = Array.from(svg.querySelectorAll("#ripples .rip"));
  S.stages = [q("stage1"), q("stage2"), q("stage3"), q("stage4")];
  S.dots = [q("dot1"), q("dot2"), q("dot3"), q("dot4")];
  S.clips = { st1: q("rectST1"), st2: q("rectST2"), et1: q("rectET1"), et2: q("rectET2") };
  S.clipFull = { st1: 372, st2: 252, et1: 331, et2: 180 };

  // measure the trail + find each dot's fraction along it
  const L = S.maskPath.getTotalLength();
  S.len = L;
  S.maskPath.style.strokeDasharray = L + " " + L;
  const N = 900;
  const fracs = DOTS.map(() => ({ best: Infinity, f: 0 }));
  for (let i = 0; i <= N; i++) {
    const f = i / N;
    const p = S.maskPath.getPointAtLength(f * L);
    DOTS.forEach((d, k) => {
      const dist = (p.x - d.x) ** 2 + (p.y - d.y) ** 2;
      if (dist < fracs[k].best) {
        fracs[k].best = dist;
        fracs[k].f = f;
      }
    });
  }
  S.dotFrac = fracs.map((o) => o.f).sort((a, b) => a - b);

  S.dots.forEach((el) => {
    if (!el) return;
    el.style.transformBox = "fill-box";
    el.style.transformOrigin = "center";
  });
  S.stages.forEach((el) => {
    if (!el) return;
    el.style.transformBox = "fill-box";
    el.style.transformOrigin = "center bottom";
  });

  // start-node ripples: clone the halo so glow radiates from the centre, and
  // keep ripple layers on top of the node circles so they emanate outward
  if (S.startHalo && S.startNode) {
    const clone = S.startHalo.cloneNode();
    clone.removeAttribute("id");
    S.startNode.appendChild(clone);
    S.startNode.appendChild(S.startHalo);
    S.startRipples = [S.startHalo, clone];
    S.startRipples.forEach((el) => el.setAttribute("stroke-width", "2"));
  }
  const ripG = svg.querySelector("#ripples");
  if (ripG && S.endNode) S.endNode.appendChild(ripG);

  // soft glow discs (breathing) + layered rings (inner→outer stagger)
  S.startGlow = q("startGlow");
  S.endGlow = q("endGlow");
  [S.startGlow, S.endGlow].forEach((el) => {
    if (!el) return;
    el.style.transformBox = "fill-box";
    el.style.transformOrigin = "center";
  });
  S.startRings = Array.from(svg.querySelectorAll(".sRing"));
  S.endRings = Array.from(svg.querySelectorAll(".eRing"));
  [...S.startRings, ...S.endRings].forEach((el) => {
    el.style.transformBox = "fill-box";
    el.style.transformOrigin = "center";
  });
  S.ready = true;
}

function setClip(S, key, frac) {
  const el = S.clips && S.clips[key];
  if (!el) return;
  el.setAttribute("width", (S.clipFull[key] * clamp(frac, 0, 1)).toFixed(1));
}

function applyFrame(S, t, D, rippleCount) {
  const P = t / D; // 0..1 progress
  const EO = Easing.easeOutCubic,
    EIO = Easing.easeInOutCubic;

  // ── phase boundaries (fractions of duration) ──
  const TS1a = 0.04,
    TS1b = 0.15; // type start line 1
  const TS2a = 0.15,
    TS2b = 0.24; // type start line 2
  const TR0 = 0.28,
    TR1 = 0.72; // trail travel window
  const TEND = 0.73; // end node glow-in
  const TE1a = 0.77,
    TE1b = 0.88; // type end line 1
  const TE2a = 0.88,
    TE2b = 0.965; // type end line 2

  // start node glow: ripples radiating from the centre, fading before the trail
  if (S.startRipples) {
    const alive = P < 0.32 ? 1 : Math.max(0, 1 - (P - 0.32) / 0.08);
    const period = 1.7;
    S.startRipples.forEach((el, k) => {
      let ph = (t / period + k / S.startRipples.length) % 1;
      if (ph < 0) ph += 1;
      el.setAttribute("r", lerp(8, 96, ph).toFixed(2));
      el.style.opacity = ((1 - ph) * 0.5 * alive).toFixed(3);
    });
  }

  // start glow disc: gentle breathing (stronger during the intro glow phase)
  if (S.startGlow) {
    const pu = 0.5 + 0.5 * Math.sin((t / 1.7) * Math.PI * 2);
    const amp = P < 0.32 ? 0.1 : 0.04;
    S.startGlow.style.transform = "scale(" + (1 + amp * pu).toFixed(3) + ")";
    S.startGlow.style.opacity = (0.78 + 0.22 * pu).toFixed(3);
  }

  // layered rings settle in once the intro glow winds down (inner → outer)
  if (S.startRings) {
    S.startRings.forEach((el) => {
      const k = +el.dataset.k;
      const rp = ramp(P, 0.325 + k * 0.022, 0.375 + k * 0.022, EO);
      el.style.opacity = rp.toFixed(3);
      el.style.transform = "scale(" + lerp(0.55, 1, rp).toFixed(3) + ")";
    });
  }

  // typed start text
  setClip(S, "st1", ramp(P, TS1a, TS1b, EO));
  setClip(S, "st2", ramp(P, TS2a, TS2b, EO));

  // ── trail reveal with pauses at each dot ──
  const df = S.dotFrac || [0.25, 0.45, 0.65, 0.85];
  const pause = 0.045; // pause length (fraction of D) at each stage
  const drawTotal = TR1 - TR0 - pause * 4;
  const segs = [df[0], df[1] - df[0], df[2] - df[1], df[3] - df[2], 1 - df[3]];
  const segSum = segs.reduce((a, b) => a + b, 0) || 1;
  const tk = [TR0],
    fk = [0];
  let cur = TR0;
  for (let i = 0; i < 5; i++) {
    const dt = drawTotal * (segs[i] / segSum);
    cur += dt;
    tk.push(cur);
    fk.push(i < 4 ? df[i] : 1);
    if (i < 4) {
      cur += pause;
      tk.push(cur);
      fk.push(df[i]); // hold during pause
    }
  }
  const frac = piecewise(P, tk, fk, EIO);
  if (S.maskPath) S.maskPath.style.strokeDashoffset = S.len * (1 - frac);

  // stage cards + dots: appear when the trail reaches their dot
  const reach = [tk[1], tk[3], tk[5], tk[7]];
  for (let i = 0; i < 4; i++) {
    const dotEl = S.dots[i],
      stgEl = S.stages[i];
    const rt = reach[i];
    const dotP = ramp(P, rt - 0.005, rt + 0.02, Easing.easeOutBack);
    if (dotEl) {
      dotEl.style.transform = "scale(" + dotP.toFixed(3) + ")";
      dotEl.style.opacity = clamp(dotP, 0, 1);
    }
    const cardP = ramp(P, rt + 0.005, rt + pause + 0.02, EO);
    if (stgEl) {
      stgEl.style.opacity = cardP;
      stgEl.style.transform = "translateY(" + lerp(16, 0, cardP).toFixed(2) + "px)";
    }
  }

  // ── end node glow-in + radiating ripples ──
  if (S.endNode) S.endNode.style.opacity = ramp(P, TEND, TEND + 0.03, EO);
  const nRip = rippleCount || 3;
  const period = 1.55; // seconds per ripple cycle
  if (S.endGlow) {
    const pu2 = 0.5 + 0.5 * Math.sin(((t - TEND * D) / period) * Math.PI * 2);
    S.endGlow.style.transform = "scale(" + (1 + 0.08 * pu2).toFixed(3) + ")";
    S.endGlow.style.opacity = (0.78 + 0.22 * pu2).toFixed(3);
  }
  S.ripples &&
    S.ripples.forEach((el, k) => {
      if (!el) return;
      if (k >= nRip || P < TEND) {
        el.style.opacity = 0;
        return;
      }
      const since = t - TEND * D;
      let ph = (since / period + k / nRip) % 1;
      if (ph < 0) ph += 1;
      el.setAttribute("r", lerp(8, 104, ph).toFixed(2));
      el.style.opacity = (1 - ph) * 0.5;
    });

  // layered rings assemble around the end node after the glow arrives
  if (S.endRings) {
    S.endRings.forEach((el) => {
      const k = +el.dataset.k;
      const rp = ramp(P, TEND + 0.035 + k * 0.022, TEND + 0.085 + k * 0.022, EO);
      el.style.opacity = rp.toFixed(3);
      el.style.transform = "scale(" + lerp(0.55, 1, rp).toFixed(3) + ")";
    });
  }

  // typed end text
  setClip(S, "et1", ramp(P, TE1a, TE1b, EO));
  setClip(S, "et2", ramp(P, TE2a, TE2b, EO));
}

export default function ProLogJourney() {
  const hostRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let raf = 0;
    let io = null;
    const S = { ready: false };

    fetch(svgUrl)
      .then((r) => r.text())
      .then((txt) => {
        if (cancelled || !hostRef.current) return;
        hostRef.current.innerHTML = txt;
        const svg = hostRef.current.querySelector("svg");
        if (!svg) return;
        setup(svg, S);

        // the settled final frame: everything drawn, ambient ripples cleared
        const settle = () => {
          applyFrame(S, DURATION, DURATION, RIPPLE_COUNT);
          S.ripples && S.ripples.forEach((el) => el && (el.style.opacity = 0));
        };

        // reduced motion: jump straight to the settled end state
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
          settle();
          return;
        }

        // plays through once, then holds the final frame; the clock only
        // advances while the hero is on screen, so scrolling away doesn't
        // burn through the play unseen
        applyFrame(S, 0, DURATION, RIPPLE_COUNT);
        let running = true;
        let elapsed = 0;
        let last = performance.now();
        const loop = (now) => {
          const dt = (now - last) / 1000;
          last = now;
          if (running) {
            elapsed += dt;
            if (elapsed >= DURATION) {
              settle();
              return; // done — no more frames
            }
            applyFrame(S, elapsed, DURATION, RIPPLE_COUNT);
          }
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        // pause the clock while scrolled offscreen
        io = new IntersectionObserver(([e]) => {
          running = e.isIntersecting;
        });
        io.observe(hostRef.current);
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  return (
    <div className="cs-hero">
      {/* the logo floats over the animation's top-left corner */}
      <img className="cs-hero-logo" src={logoUrl} alt="ProLog" />
      <div ref={hostRef} className="cs-journey" aria-hidden="true" />
      <img
        className="cs-hero-mockup"
        src={mockupUrl}
        alt="ProLog dashboard on a phone"
      />
    </div>
  );
}
