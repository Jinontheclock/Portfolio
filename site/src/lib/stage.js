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
 * page: the wheel turns the stage. What the wheel turns is a scroll box
 * that is never seen, the size of the screen with a track inside it as
 * long as the steps between the blocks, which Lenis scrolls from the
 * wheel, a touch or a key anywhere on the page, with its inertia. The
 * block on the stage is the one whose step the box is nearest, and it
 * takes the stage through a swap: the one leaving fades and moves off the
 * way the wheel is going, the one arriving comes up from the other side.
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
        const over = Math.max(0, hooks.current.overflowOf(b));
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

  /* ── The wheel turns the stage ──
     Lenis scrolls the unseen box from input anywhere on the page: the
     wheel, a touch drag on a tablet, and its inertia is the stage's — the
     box follows the input a tenth of the way each frame, so a flick
     coasts and settles, and the nearest step is the block shown. A reader
     who asked for less motion gets the box following the input exactly.
     Keys turn it a step at a time. Torn down the moment a crossing
     starts, so a flick still settling cannot turn a stage that is on its
     way out. */
  useEffect(() => {
    if (current === null) return undefined;
    const box = boxRef.current;
    const track = trackRef.current;
    if (!box || !track) return undefined;
    /* the box opens on the block the entry was left on, before Lenis
       reads where it is */
    box.scrollTop = (layout.current.starts[current] ?? current) * step();
    const smooth = new Lenis({
      wrapper: box,
      content: track,
      eventsTarget: window,
      lerp: reducedMotion() ? 1 : 0.1,
      smoothWheel: true,
      syncTouch: true,
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
    /* the reader has the wheel: the stage follows the box again */
    const free = () => {
      travel.current = null;
    };
    window.addEventListener("wheel", free, { passive: true });
    window.addEventListener("touchstart", free, { passive: true });

    const onKey = (e) => {
      if (hooks.current.blocked() || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) return;
      let by = KEYS[e.key];
      if (e.key === " ") by = e.shiftKey ? -1 : 1;
      if (by === undefined) return;
      e.preventDefault();
      travel.current = null;
      const k = Math.round(smooth.scroll / step());
      const to = clamp(k + by, 0, layout.current.total);
      smooth.scrollTo(to * step(), { duration: 1 });
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
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", free);
      window.removeEventListener("touchstart", free);
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
    lenis.current?.scrollTo((layout.current.starts[i] ?? i) * step(), {
      duration: 1.2,
      onComplete: () => {
        travel.current = null;
      },
    });
  };

  return { current, jumpTo, lenis, steps };
}
