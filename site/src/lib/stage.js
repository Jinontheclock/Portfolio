import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import useIsPhone from "../hooks/useIsPhone.js";

/* ── The stage ──
 *
 * A page set as a stage — Work, and About — shows one block at a time
 * where the index beside it stands, and nothing on it moves with the
 * page: the wheel turns the stage, a step at a time. What the wheel
 * turns is a scroll box that is never seen, the size of the screen with
 * a track inside it as long as the steps between the blocks. One gesture
 * — a swipe on a trackpad with the coast that follows it, a spin of a
 * wheel, a swipe of a finger, a key — moves the box one step, which
 * Lenis eases it through. The block on the stage is the one whose step
 * the box is nearest, and it takes the stage through a swap: the one
 * leaving fades and moves off the way the wheel is going, the one
 * arriving comes up from the other side.
 *
 * A block taller than the stage — About's skills, on a short window —
 * gets more than one step: the box's way through its extra steps pushes
 * the block up by as much as it overflows, so its foot can be read, and
 * only past the last of them does the next block take the stage. A block
 * that fits has one step and holds still on it, which is the point.
 *
 * Which block is on the stage is written down per history entry, so the
 * back button returns to the block that was left, the way the other
 * pages return to their scroll. A phone has no stage: every block is in
 * the flow, and the page scrolls as pages do.
 */

/* how far the track scrolls from one step to the next: half a screen,
   the same number the stylesheet gives the track (--stage-step) */
const STEP = 0.5;

/* how far the stage is turned by a key */
const KEYS = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1, Home: -Infinity, End: Infinity };

/* how long the box takes from one step to the next, in seconds — Lenis's
   own ease-out, so most of the way is covered early and the swap comes
   soon after the gesture */
const TURN = 1;

/* what a gesture is (see the wheel, below): how many px of wheel before
   it counts, the longest gap between two wheel events that are still
   the one gesture, how many falling deltas make a coast that a new push
   can be told from, and how far a finger goes before a touch is a swipe */
const GESTURE = { threshold: 20, gap: 200, falling: 3, swipe: 30 };

export const reducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/* How a block takes the stage: up 40px through a fade, at half the
   length of a page crossing, since a block is a smaller thing than a
   page. Going back up the list it comes from the other side. */
export const SWAP = { shift: 40, duration: 0.3 };

/* Which block each history entry was left on. The same store, the same
   key and the same reasons as lib/scroll-memory.js, for a page whose
   position is a block rather than a scroll. */
const STAGE_KEY = "stage:";
const rememberStage = (key, i) => {
  try {
    sessionStorage.setItem(STAGE_KEY + key, String(i));
  } catch {
    /* private mode, or a full quota: the page opens on the first block */
  }
};
const recallStage = (key) => {
  try {
    const v = sessionStorage.getItem(STAGE_KEY + key);
    return v === null ? null : Number(v);
  } catch {
    return null;
  }
};

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/**
 * @param count       how many blocks there are
 * @param boxRef      the scroll box that is never seen
 * @param trackRef    the track inside it
 * @param blocks      () => the block elements, in order
 * @param overflowOf  (block) => how far the block stands past the stage's
 *                    foot, in px — 0 for one that fits, which is the
 *                    default, and every block on the Work page
 * @param blocked     () => true while something of the page's own has the
 *                    keys: a modal up over it
 * @param onSwap      (next, dir) => anything more a block does as it takes
 *                    the stage — the Work page uncovers its picture
 * @param deps        rebuild when these change
 * @returns { current, jumpTo, lenis, steps }
 *   current  the index of the block on the stage, or null on a phone
 *   jumpTo   turns the stage to a block: it takes the stage at once, and
 *            the box goes to its step behind it with the wheel's inertia
 *   lenis    the box's Lenis, for a page that has to hold it still
 *   steps    how many steps the track is long, past the first — what the
 *            track's --stage-steps is set to
 */
export default function useStage({
  count,
  boxRef,
  trackRef,
  blocks,
  overflowOf = () => 0,
  blocked = () => false,
  onSwap,
  deps = [],
}) {
  const isPhone = useIsPhone();
  /* the history entry this page was opened as. Read once: while this page
     is leaving in a crossing the router already names the next entry, and
     nothing here should be filed under it. */
  const entry = useRef(useLocation().key);
  const [current, setCurrent] = useState(() => {
    if (isPhone) return null;
    const i = recallStage(entry.current) ?? 0;
    return clamp(i, 0, count - 1);
  });
  const lenis = useRef(null);
  /* what the stage showed last, and whether it has shown anything yet */
  const shown = useRef(null);
  /* the block a clicked entry is taking the stage to, while the box is
     still on its way there: the stage shows it at once and holds it, so a
     jump of two entries does not put the one between on the stage in
     passing. Cleared on arrival, or the moment the reader takes the
     wheel. */
  const travel = useRef(null);
  /* the step the box is on, or on its way to */
  const head = useRef(null);
  /* the blocks' steps: where each one's first step starts, in steps, how
     far each overflows the stage, and how many steps the track is long */
  const layout = useRef({ starts: [], overflows: [], total: 0 });
  const [steps, setSteps] = useState(Math.max(0, count - 1));
  const hooks = useRef({ blocks, overflowOf, blocked, onSwap });
  hooks.current = { blocks, overflowOf, blocked, onSwap };

  const step = () => window.innerHeight * STEP;
  /* the block whose steps the box is in, from the box's offset */
  const blockAt = (y) => {
    const { starts } = layout.current;
    const k = y / step();
    let i = 0;
    while (i + 1 < starts.length && k >= starts[i + 1] - 0.5) i += 1;
    return clamp(i, 0, count - 1);
  };
  /* a tall block is pushed up by the box's way through its extra steps */
  const settleOffset = (y, i) => {
    const { starts, overflows } = layout.current;
    const stage = hooks.current.blocks()[0]?.parentElement;
    if (!stage || !overflows[i]) {
      if (stage && stage.scrollTop) stage.scrollTop = 0;
      return;
    }
    stage.scrollTop = clamp(y - starts[i] * step(), 0, overflows[i]);
  };

  /* whether there is a stage at all is decided on the phone breakpoint,
     and re-decided when the window crosses it */
  useEffect(() => {
    if (isPhone) setCurrent(null);
    else setCurrent((c) => (c === null ? 0 : c));
  }, [isPhone]);

  /* ── The steps ──
     Measured off the blocks, and again whenever they or the window change
     size: a block that overflows the stage gets a step for every half a
     screen it overflows by, so the track is as long as the reading. */
  useLayoutEffect(() => {
    if (current === null) return undefined;
    const all = hooks.current.blocks();
    const stage = all[0]?.parentElement;
    if (!stage) return undefined;
    const measure = () => {
      const starts = [];
      const overflows = [];
      let at = 0;
      all.forEach((b) => {
        /* to the pixel: a block whose foot lands a third of a pixel past
           the stage's — a box sized by a calc() against one sized by
           another — fits, and gets no step for it */
        const over = Math.max(0, Math.round(hooks.current.overflowOf(b)));
        starts.push(at);
        overflows.push(over);
        at += 1 + Math.ceil(over / step());
      });
      layout.current = { starts, overflows, total: at - 1 };
      setSteps(at - 1);
      const smooth = lenis.current;
      if (smooth) settleOffset(smooth.scroll, blockAt(smooth.scroll));
    };
    measure();
    let queued = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(queued);
      queued = requestAnimationFrame(measure);
    });
    all.forEach((b) => ro.observe(b));
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(queued);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current === null, ...deps]);

  /* ── The wheel turns the stage, a step at a time ──
     One gesture, one step. A gesture is a run of wheel events with no
     gap of more than GESTURE.gap between them: a swipe on a trackpad and
     the momentum it coasts on afterwards are one run, and so is a wheel
     spun through several notches. The stage turns once, the moment the
     run has gone GESTURE.threshold px, and not again until the run ends
     — which is what keeps a long swipe from turning it twice. A second
     swipe while the first is still coasting is told by its deltas:
     momentum only ever falls off, so a delta that doubles after a few
     falling ones is a new push, and gets its step. A touch is a step
     per swipe, the same way. Lenis is kept for the way it moves the box
     from step to step, and hears none of the input itself. Keys turn
     it a step at a time too. Torn down the moment a crossing starts, so
     a step still under way cannot turn a stage that is on its way out. */
  useEffect(() => {
    if (current === null) return undefined;
    const box = boxRef.current;
    const track = trackRef.current;
    if (!box || !track) return undefined;
    /* the box opens on the block the entry was left on, before Lenis
       reads where it is */
    const opening = layout.current.starts[current] ?? current;
    box.scrollTop = opening * step();
    const smooth = new Lenis({
      wrapper: box,
      content: track,
      /* the input is read here, below; Lenis only moves the box */
      virtualScroll: () => false,
      autoRaf: false,
    });
    lenis.current = smooth;
    const tick = (time) => smooth.raf(time * 1000);
    gsap.ticker.add(tick);
    const unhook = smooth.on("scroll", (l) => {
      const at = blockAt(l.scroll);
      if (travel.current !== null) {
        if (at !== travel.current) return;
        travel.current = null;
      }
      setCurrent(at);
      settleOffset(l.scroll, at);
    });

    /* the step the box is on, or on its way to: a gesture that lands
       while the box is still moving counts from where it is going */
    head.current = opening;
    const turn = (by) => {
      travel.current = null;
      const k = head.current ?? Math.round(smooth.scroll / step());
      const to = clamp(k + by, 0, layout.current.total);
      head.current = to;
      smooth.scrollTo(to * step(), { duration: TURN });
    };

    const run = { acc: 0, stepped: false, last: 0, falling: 0, timer: 0 };
    const endRun = () => {
      run.acc = 0;
      run.stepped = false;
      run.last = 0;
      run.falling = 0;
    };
    const onWheel = (e) => {
      if (e.ctrlKey || e.deltaY === 0) return;
      e.preventDefault();
      if (hooks.current.blocked()) return;
      const dy =
        e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
      const mag = Math.abs(dy);
      clearTimeout(run.timer);
      run.timer = setTimeout(endRun, GESTURE.gap);
      if (mag < run.last) run.falling += 1;
      else if (
        run.stepped &&
        run.falling >= GESTURE.falling &&
        mag >= GESTURE.threshold &&
        mag > run.last * 2
      )
        endRun();
      else if (mag > run.last) run.falling = 0;
      run.last = mag;
      if (run.stepped) return;
      run.acc += dy;
      if (Math.abs(run.acc) < GESTURE.threshold) return;
      run.stepped = true;
      turn(Math.sign(run.acc));
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    const touch = { y: null, stepped: false };
    const onTouchStart = (e) => {
      touch.y = e.touches[0]?.clientY ?? null;
      touch.stepped = false;
    };
    const onTouchMove = (e) => {
      if (touch.y === null || touch.stepped || hooks.current.blocked()) return;
      const dy = touch.y - (e.touches[0]?.clientY ?? touch.y);
      if (Math.abs(dy) < GESTURE.swipe) return;
      touch.stepped = true;
      turn(Math.sign(dy));
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const onKey = (e) => {
      if (hooks.current.blocked() || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) return;
      let by = KEYS[e.key];
      if (e.key === " ") by = e.shiftKey ? -1 : 1;
      if (by === undefined) return;
      e.preventDefault();
      turn(by);
    };
    window.addEventListener("keydown", onKey);

    const root = document.documentElement;
    const crossing = new MutationObserver(() => {
      if ("crossing" in root.dataset) teardown();
    });
    crossing.observe(root, { attributes: true, attributeFilter: ["data-crossing"] });
    let down = false;
    const teardown = () => {
      if (down) return;
      down = true;
      crossing.disconnect();
      clearTimeout(run.timer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      unhook();
      gsap.ticker.remove(tick);
      smooth.destroy();
      lenis.current = null;
    };
    return teardown;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current === null, ...deps]);

  /* the block on the stage is where this entry will be returned to */
  useEffect(() => {
    if (current !== null) rememberStage(entry.current, current);
  }, [current]);

  /* ── The blocks take the stage ──
     Only the current block is on it; the rest are hidden, and not merely
     transparent, so nothing hidden can be clicked or tabbed to. The first
     time this runs there is nothing to swap from, so the block for the
     entry the page opened on is simply shown. After that a change of
     block is a swap: the one leaving fades and moves off the way the
     wheel is going, the one arriving comes up from the other side. A
     reader who asked for less motion gets the cut. */
  useEffect(() => {
    const all = hooks.current.blocks();
    if (!all.length) return;
    if (current === null) {
      /* the phone's stack: every block in the flow, none of this applies */
      gsap.set(all, { clearProps: "all" });
      shown.current = null;
      return;
    }
    const next = all[current];
    const prev = shown.current === null ? null : all[shown.current];
    const dir = shown.current === null ? 1 : Math.sign(current - shown.current) || 1;
    shown.current = current;
    if (prev === next) return;
    gsap.killTweensOf(all);
    const others = all.filter((b) => b !== next && b !== prev);
    gsap.set(others, { autoAlpha: 0, y: 0 });
    if (reducedMotion() || !prev) {
      if (prev) gsap.set(prev, { autoAlpha: 0 });
      gsap.set(next, { autoAlpha: 1, y: 0 });
      hooks.current.onSwap?.(next, dir, true);
      return;
    }
    gsap.to(prev, {
      autoAlpha: 0,
      y: -SWAP.shift * dir,
      duration: SWAP.duration,
      ease: "power2.out",
    });
    gsap.fromTo(
      next,
      { autoAlpha: 0, y: SWAP.shift * dir },
      { autoAlpha: 1, y: 0, duration: SWAP.duration, ease: "power2.out" },
    );
    hooks.current.onSwap?.(next, dir, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, ...deps]);

  /* Turn the stage to a block: it takes the stage at once, and the box
     goes to its step behind it with the same inertia as the wheel. */
  const jumpTo = (i) => {
    travel.current = i;
    setCurrent(i);
    head.current = layout.current.starts[i] ?? i;
    lenis.current?.scrollTo(head.current * step(), {
      duration: 1.2,
      onComplete: () => {
        travel.current = null;
      },
    });
  };

  return { current, jumpTo, lenis, steps };
}
