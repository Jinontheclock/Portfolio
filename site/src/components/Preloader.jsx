import { useEffect, useRef, useState } from "react";

/** Boot overlay for the landing page: an opaque cover with a centered 0→100
 *  count while the page underneath finishes assembling (webfonts load, the
 *  hero font-fit settles). The pace is time-eased, but the final tick to 100
 *  waits for actual readiness — so the landing is only ever revealed complete,
 *  never mid-fit. */
const PACE_MS = 1400; // the 0→99 run: quick start, easing out
const MAX_WAIT_MS = 3500; // never hold the page hostage to a slow font
const HOLD_MS = 150; // beat at 100 before the fade starts
const FADE_MS = 450; // keep in sync with .lp-loader's opacity transition

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let ready = false;
    let raf = 0;
    const timers = [];

    // readiness = webfonts in (or the cap expired), plus two frames so the
    // fonts-ready refit (useFitText) has painted before the reveal
    const cap = new Promise((res) => timers.push(setTimeout(res, MAX_WAIT_MS)));
    Promise.race([document.fonts?.ready ?? Promise.resolve(), cap]).then(() => {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          ready = true;
        }),
      );
    });

    const start = performance.now();
    const tick = (now) => {
      const x = Math.min((now - start) / PACE_MS, 1);
      const eased = 1 - Math.pow(1 - x, 3);
      if (x >= 1 && ready) {
        setCount(100);
        timers.push(setTimeout(() => setLeaving(true), HOLD_MS));
        timers.push(setTimeout(() => doneRef.current?.(), HOLD_MS + FADE_MS));
        return;
      }
      // hold at 99 until the page behind is actually ready
      setCount(Math.min(99, Math.round(eased * 99)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={"lp-loader" + (leaving ? " is-leaving" : "")} aria-hidden="true">
      <span className="lp-loader-count">{count}</span>
    </div>
  );
}
