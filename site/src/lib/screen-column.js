import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/* ── One screen ──
 *
 * A page set as one screen is set the way the Work page is: the header at
 * the top, the copyright at the foot, and the page's column scrolling
 * between them in a box of its own, so the window never scrolls and shows
 * no scrollbar. Lenis scrolls the box from the wheel, a touch or a key
 * anywhere on the page, with its inertia. A list stands still beside the
 * column and names what is being read.
 *
 * The case studies and About are both set this way, and this is the part
 * of it they share: the scroll (useScreenScroll), the column as a stage
 * (useColumnStage), and a jump that stays jumped (settleAt). What each
 * page keeps for itself is the list, and the spy that reads which of its
 * sections has reached the line. A phone keeps every page a page.
 */

/* Where an element sits, as a distance from the top of the window, with
   the scroll fade's own offset taken back out. A faded block is parked
   40px from where the layout puts it, and a scroll aimed at the box you
   can see lands 40px wrong the moment the fade settles it back. From the
   window's top rather than the document's, so it reads the same whichever
   box the page is scrolling in. */
export const viewTopOf = (el) => {
  const shift = new DOMMatrixReadOnly(getComputedStyle(el).transform).m42;
  return el.getBoundingClientRect().top - shift;
};

export const reducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/* Where the box's own offset is, per history entry, written down the way
   lib/scroll-memory.js writes the window's, so the back button returns to
   the place that was left. */
const OFFSET_KEY = "cs-offset:";
const rememberOffset = (key, y) => {
  try {
    sessionStorage.setItem(OFFSET_KEY + key, String(Math.round(y)));
  } catch {
    /* private mode, or a full quota: the page opens at the top */
  }
};
const recallOffset = (key) => {
  try {
    const v = sessionStorage.getItem(OFFSET_KEY + key);
    return v === null ? null : Number(v);
  } catch {
    return null;
  }
};

/* what a key moves the box by: a line, a screen, or to an end */
const LINE = 120;
const KEYS = { ArrowDown: LINE, ArrowUp: -LINE, Home: -Infinity, End: Infinity };

/** The screen's scroll.
 *
 *  Lenis scrolls the box from input anywhere on the page, with the same
 *  inertia the Work page has, and the box opens where this entry was left.
 *  A long page is not its full height when it arrives, so the offset is put
 *  back while the page grows, and let go the moment the reader touches the
 *  wheel. Keys move the box a line or a screen. Torn down the moment a
 *  crossing starts. The comparison sliders are dragged rather than
 *  scrolled, so a touch on one is left to it.
 *
 *  Everything that reads or moves the scroll goes through the one pair of
 *  hands returned here (scrollY, scrollMax, goTo), which know which box it
 *  is: the screen's own while `on`, the window otherwise.
 *
 *  @param on        the page is one screen (false on a phone)
 *  @param boxRef    the box the column scrolls in
 *  @param contentRef what Lenis scrolls inside it
 *  @param blocked   () => true while something of the page's own has the
 *                   keys — a modal up over it
 *  @param onTake    called when the reader takes the wheel by a key, so a
 *                   jump in progress can let go
 *  @param deps      set up again when these change
 */
export function useScreenScroll(on, boxRef, contentRef, { blocked, onTake } = {}, deps = []) {
  const lenis = useRef(null);
  /* the history entry this page was opened as, read once: while this page
     is leaving in a crossing the router already names the next entry */
  const entry = useRef(useLocation().key);
  const hooks = useRef({ blocked, onTake });
  hooks.current = { blocked, onTake };

  useEffect(() => {
    if (!on) return undefined;
    const box = boxRef.current;
    const content = contentRef.current;
    if (!box || !content) return undefined;
    const target = recallOffset(entry.current) ?? 0;
    box.scrollTop = target;
    const smooth = new Lenis({
      wrapper: box,
      content,
      eventsTarget: window,
      lerp: reducedMotion() ? 1 : 0.1,
      smoothWheel: true,
      syncTouch: true,
      autoRaf: false,
      prevent: (node) => !!node.closest?.("img-comparison-slider"),
    });
    lenis.current = smooth;
    const tick = (time) => smooth.raf(time * 1000);
    gsap.ticker.add(tick);
    const unhook = smooth.on("scroll", ScrollTrigger.update);

    /* the hold: see holdScroll in lib/scroll-memory.js */
    let frame = 0;
    const until = performance.now() + 2000;
    const stopHold = () => cancelAnimationFrame(frame);
    const reapply = () => {
      if (Math.abs(box.scrollTop - target) < 2 || performance.now() > until) return;
      smooth.scrollTo(target, { immediate: true });
      frame = requestAnimationFrame(reapply);
    };
    if (target) frame = requestAnimationFrame(reapply);
    window.addEventListener("wheel", stopHold, { passive: true, once: true });
    window.addEventListener("touchstart", stopHold, { passive: true, once: true });

    /* where the reader is, written down once it has held still */
    let timer = 0;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => rememberOffset(entry.current, box.scrollTop), 200);
    };
    box.addEventListener("scroll", onScroll, { passive: true });
    const flush = () => rememberOffset(entry.current, box.scrollTop);
    window.addEventListener("pagehide", flush);

    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) return;
      /* a modal is up: its own keys, not the page's */
      if (hooks.current.blocked?.()) return;
      let by = KEYS[e.key];
      if (e.key === "PageDown" || (e.key === " " && !e.shiftKey)) by = box.clientHeight * 0.85;
      if (e.key === "PageUp" || (e.key === " " && e.shiftKey)) by = -box.clientHeight * 0.85;
      if (by === undefined) return;
      e.preventDefault();
      /* the reader has the wheel now */
      hooks.current.onTake?.();
      const max = box.scrollHeight - box.clientHeight;
      const to = Math.max(0, Math.min(max, smooth.scroll + by));
      smooth.scrollTo(to, { duration: 0.8 });
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
      stopHold();
      clearTimeout(timer);
      flush();
      window.removeEventListener("wheel", stopHold);
      window.removeEventListener("touchstart", stopHold);
      window.removeEventListener("pagehide", flush);
      window.removeEventListener("keydown", onKey);
      box.removeEventListener("scroll", onScroll);
      unhook();
      gsap.ticker.remove(tick);
      smooth.destroy();
      lenis.current = null;
    };
    return teardown;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on, ...deps]);

  const scrollY = () => (on ? (boxRef.current?.scrollTop ?? 0) : window.scrollY);
  const scrollMax = () => {
    if (on) {
      const r = boxRef.current;
      return r ? r.scrollHeight - r.clientHeight : 0;
    }
    return document.documentElement.scrollHeight - window.innerHeight;
  };
  const goTo = (top, smooth = true) => {
    if (on) {
      const s = lenis.current;
      if (s) s.scrollTo(top, smooth ? { duration: 1 } : { immediate: true });
      else if (boxRef.current) boxRef.current.scrollTop = top;
      return;
    }
    window.scrollTo({ top, behavior: smooth && !reducedMotion() ? "smooth" : "auto" });
  };
  return { lenis, scrollY, scrollMax, goTo };
}

/** The column is a stage.
 *
 *  On a screen, only the section being read is on it, the way only one
 *  project is on the Work page's stage: the sections before and after are
 *  hidden outright, and the opening — everything in the column before the
 *  sections start — is what shows until the first section is reached. A
 *  section takes the stage the moment its heading reaches the reading
 *  line, coming up through a fade the way the scroll fade brings a block
 *  in, and the one leaving fades off the way the scroll is going. Nothing
 *  loses its place in the column, so the scroll is the scroll it was; only
 *  what is painted changes. A reader who asked for less motion gets the
 *  cut.
 *
 *  @param on          the page is one screen
 *  @param contentRef  the column
 *  @param sectionSel  what a section is, inside it
 *  @param at          the index of the section being read, or -1 for the
 *                     opening
 *  @param deps        what else the column is rebuilt on
 */
export function useColumnStage(on, contentRef, sectionSel, at, deps = []) {
  const staged = useRef(undefined);
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const sections = [...content.querySelectorAll(sectionSel)];
    /* the opening: whatever the column holds that is not a section, and
       holds none — a section may sit in a wrapper of its own */
    const opening = [...content.children].filter(
      (el) => !el.matches(sectionSel) && !el.querySelector(sectionSel),
    );
    if (!on) {
      /* a page again: everything in the flow, the scroll fade's to run */
      if (staged.current !== undefined) gsap.set([...sections, ...opening], { clearProps: "all" });
      staged.current = undefined;
      return;
    }
    const was = staged.current;
    const first = was === undefined;
    staged.current = at;
    if (!first && was === at) return;
    const show = at < 0 ? opening : [sections[at]];
    const hide = [...sections.filter((s, i) => i !== at), ...(at < 0 ? [] : opening)];
    gsap.killTweensOf([...sections, ...opening]);
    if (first || reducedMotion()) {
      gsap.set(hide, { autoAlpha: 0 });
      gsap.set(show, { autoAlpha: 1, y: 0 });
      return;
    }
    const dir = Math.sign(at - was) || 1;
    gsap.to(hide, { autoAlpha: 0, y: -40 * dir, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(
      show,
      { autoAlpha: 0, y: 40 * dir },
      { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on, at, ...deps]);
}

/** A jump that stays jumped.
 *
 *  Landed is not the same as arrived. The scroll reaches the target and a
 *  figure above it finishes loading a beat later, and the target has moved
 *  on by the figure's height; measured on TinyPaws, a subheading aimed at
 *  the list's top edge was standing 388px below it a second after the
 *  scroll had come to rest there. So the target is watched until it has
 *  held still for a third of a second, and re-aimed each time it moves, for
 *  up to four seconds — and abandoned the moment the reader touches the
 *  wheel, because from then on the position is theirs, not ours.
 *
 *  @param targetOf  () => where the target is now, as a scroll offset
 *  @param scrollY   where the box is
 *  @param goTo      moves it
 *  @param onStop    called once, when the jump is over either way
 */
export function settleAt({ targetOf, scrollY, goTo, onStop }) {
  goTo(targetOf());
  let frame = 0;
  let calm = 0;
  let lastY = -1;
  const until = performance.now() + 4000;
  const stop = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    onStop?.();
  };
  const settle = () => {
    const want = targetOf();
    if (performance.now() > until) return stop();
    if (Math.abs(scrollY() - want) < 2) {
      if (++calm >= 20) return stop();
    } else {
      calm = 0;
      /* only re-aim once the scroll has come to rest, or every frame
         would restart it and nothing would ever move */
      if (scrollY() === lastY) goTo(want);
    }
    lastY = scrollY();
    frame = requestAnimationFrame(settle);
  };
  window.addEventListener("wheel", stop, { passive: true, once: true });
  window.addEventListener("touchstart", stop, { passive: true, once: true });
  frame = requestAnimationFrame(settle);
  return stop;
}
