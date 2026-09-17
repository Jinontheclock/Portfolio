import { useEffect, useRef, useState } from "react";
import { beginCover, endCover } from "../lib/preloaderBus.js";

/** Count-up cover: an opaque, page-bg-coloured cover held over the page
 *  while it finishes assembling — webfonts, eager images, and the hero
 *  videos (ProLog journey, TinyPaws monitor). The number is a courtesy for
 *  slow loads only: if everything is ready inside a short grace window the
 *  cover simply lifts and no digits are ever shown.
 *
 *  The app's first load only, now: a page reached by URL, a reload, or a
 *  pasted link. A page opened from inside the app is carried by the page
 *  crossing instead (see lib/page-transition.js), which lands the reader at
 *  the top of the new page and lets the rest stream in below. */
const GRACE_MS = 350; // ready within this → lift the cover, never show a number
const MIN_SHOWN_MS = 500; // once the number appears, keep it up long enough to read
const PACE_MS = 1400; // the 0→99 run, once the number is showing
const MAX_WAIT_MS = 4500; // never hold the page hostage to a slow asset
const HOLD_MS = 150; // beat at 100 before the fade starts
const FADE_MS = 450; // keep in sync with .lp-loader's opacity transition

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [showCount, setShowCount] = useState(false);
  const [leaving, setLeaving] = useState(false);
  /* the cover's own element, so it is not made inert along with the page
     it covers */
  const box = useRef(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let cancelled = false;
    let ready = false;
    let shownAt = 0; // performance.now() when the number appeared (0 = never shown)
    let covered = true;
    let raf = 0;
    const timers = [];

    // the hero videos hold their play-through while this cover is up
    beginCover();
    /* The cover is opaque, so nothing under it can be read — but without
       this, everything under it can still be reached: a screen reader is
       handed the half-assembled page, and Tab walks the header and the
       chapter list with the focus ring behind the cover. `inert` takes
       the page out of the tree and out of the tab order for as long as
       the cover holds. Its own element is skipped, and so is anything a
       browser without inert would lose — the attribute is simply ignored
       there, which is the old behaviour. */
    const covering = [...(document.getElementById("root")?.children ?? [])].filter(
      (el) => el !== box.current,
    );
    covering.forEach((el) => el.setAttribute("inert", ""));
    const uncover = () => covering.forEach((el) => el.removeAttribute("inert"));
    const lift = () => {
      if (covered) {
        covered = false;
        uncover();
        endCover();
      }
    };

    // readiness = webfonts in, every eager <img> settled, and any hero
    // video holding its first frame — or the cap expired
    const assetsSettled = async () => {
      await (document.fonts?.ready ?? Promise.resolve());
      for (;;) {
        if (cancelled) return;
        const heroVid = document.querySelector(".cs-journey video, .cs-monitor video");
        const vidIn = !heroVid || heroVid.readyState >= 2;
        // lazy images below the fold never load while the cover is up —
        // only eager (above-the-fold) images gate the reveal
        const imgsIn = [...document.querySelectorAll("img")]
          .filter((i) => i.loading !== "lazy")
          .every((i) => i.complete);
        if (vidIn && imgsIn) return;
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

    // only bring the number up if we're still waiting past the grace window
    timers.push(
      setTimeout(() => {
        if (!cancelled && !ready) {
          shownAt = performance.now();
          setShowCount(true);
        }
      }, GRACE_MS),
    );

    const finish = () => {
      setLeaving(true);
      lift(); // page is on screen now; hero videos may play
      timers.push(setTimeout(() => doneRef.current?.(), FADE_MS));
    };

    const tick = (now) => {
      if (cancelled) return;
      if (ready && shownAt === 0) {
        // ready before the grace window — lift the cover, no number shown
        finish();
        return;
      }
      if (ready && now - shownAt >= MIN_SHOWN_MS) {
        setCount(100);
        timers.push(setTimeout(finish, HOLD_MS));
        return;
      }
      if (shownAt !== 0) {
        // hold at 99 until the page behind is actually ready
        const x = Math.min((now - shownAt) / PACE_MS, 1);
        const eased = 1 - Math.pow(1 - x, 3);
        setCount(Math.min(99, Math.round(eased * 99)));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      uncover();
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      lift();
    };
  }, []);

  return (
    <div
      className={"lp-loader" + (leaving ? " is-leaving" : "")}
      ref={box}
      aria-hidden="true"
    >
      {/* the count rides out to the stylesheet as well as into the text: the
          number darkens as it climbs, and which two colours it runs between
          is the stylesheet's business, not this component's */}
      {showCount && (
        <span className="lp-loader-count" style={{ "--lp-count": String(count) }}>
          {count}
        </span>
      )}
    </div>
  );
}
