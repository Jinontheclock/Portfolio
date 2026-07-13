import { useEffect, useRef, useState } from "react";

/** Boot overlay: an opaque cover with a centered 0→100 count while the page
 *  underneath finishes assembling — webfonts, images, and fetch-injected
 *  heroes (the ProLog journey SVG). The pace is time-eased, but the final
 *  tick to 100 waits for actual readiness, so pages are only ever revealed
 *  complete, never mid-assembly. Shown once, on the app's first load. */
const PACE_MS = 1400; // the 0→99 run: quick start, easing out
const MAX_WAIT_MS = 4500; // never hold the page hostage to a slow asset
const HOLD_MS = 150; // beat at 100 before the fade starts
const FADE_MS = 450; // keep in sync with .lp-loader's opacity transition

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let ready = false;
    let cancelled = false;
    let raf = 0;
    const timers = [];

    // readiness = webfonts in, every <img> settled, and any fetch-injected
    // hero (a .cs-journey host) holding its SVG — or the cap expired — plus
    // two frames so the fonts-ready refits have painted before the reveal
    const assetsSettled = async () => {
      await (document.fonts?.ready ?? Promise.resolve());
      for (;;) {
        if (cancelled) return;
        const host = document.querySelector(".cs-journey");
        const svgIn = !host || !!host.querySelector("svg");
        // lazy images below the fold never load while the cover is up —
        // only eager (above-the-fold) images gate the reveal
        const imgsIn = [...document.querySelectorAll("img")]
          .filter((i) => i.loading !== "lazy")
          .every((i) => i.complete);
        if (svgIn && imgsIn) return;
        await new Promise((r) => timers.push(setTimeout(r, 80)));
      }
    };
    const cap = new Promise((res) => timers.push(setTimeout(res, MAX_WAIT_MS)));
    Promise.race([assetsSettled(), cap]).then(() => {
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
      cancelled = true;
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
