import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/* Where each history entry was left, so the back button returns a reader to
   the card they were reading rather than to the top of the list.
 *
 * The browser does this by itself for an ordinary site. A single-page one has
 * to do it by hand: every route change here swaps the DOM under the same
 * document, and the scroll position that belonged to the old page is simply
 * the scroll position now — which is why the page had to be pinned to the top
 * on arrival in the first place.
 *
 * The store is keyed by history entry, not by path. Two visits to /work are
 * two entries and two positions, and going back through both returns to each
 * of them in turn. sessionStorage rather than a module variable, so the
 * positions survive a reload and die with the tab. */
const KEY = "scroll:";

const remember = (key, y) => {
  try {
    sessionStorage.setItem(KEY + key, String(y));
  } catch {
    /* private mode, or a full quota. A forgotten position is a page that
       opens at the top, which is where it used to open anyway. */
  }
};

const recall = (key) => {
  try {
    const v = sessionStorage.getItem(KEY + key);
    return v === null ? null : Number(v);
  } catch {
    return null;
  }
};

/* React Router keeps the history entry's key here, which is the same key the
   hook below reads from useLocation — so a caller outside the router can name
   the entry it is leaving. The first entry of a session has no key of its own
   and the router calls it "default". */
const currentKey = () => {
  try {
    return history.state?.key ?? "default";
  } catch {
    return "default";
  }
};

/* What is taking the reader off this page, until the next one arrives:
   "away" for a link they chose, "back" for the browser's own back or forward
   button. Null the rest of the time, which is when the scroll is theirs.

   Between a crossing being asked for and the new page arriving, the page is
   being taken apart and the browser is putting the scroll where the entry
   being opened wants it. None of that is the reader, and none of it should be
   written down. */
let leaving = null;

/* Back and forward have to raise the flag here rather than in the transition,
   because half of them never reach one: a phone plays no crossing of its own
   (the browser draws its own), and a move between two pages at the same depth
   is not a crossing at all. Measured on a phone: the browser restores the
   arriving entry's scroll while the leaving page is still mounted, and with
   nothing set, that lands as a reader scrolling to the top of the page they
   were four thousand pixels into — over the position the button was about to
   restore. It failed on one run and passed on the next, which is what the
   race looks like from outside. */
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    leaving = "back";
  });
}

/**
 * Called at the start of a crossing the reader chose, before the route
 * changes.
 *
 * This exists because the crossing and the commit are not the same moment.
 * A phone measured seconds between the two handing a case study over to
 * About, and for every one of them the old page was still mounted, still
 * being measured, and still having its scroll moved by things that were not
 * the reader. So the position is taken while it still means something, and
 * nothing more is recorded until the reader is somewhere new.
 *
 * A crossing the browser started needs none of that. By the time popstate
 * fires, history.state already names the entry being returned to, so the key
 * here would file the outgoing scroll over the saved position rather than
 * beside it — the one thing the back button is about to read.
 */
export function captureScroll() {
  if (leaving === "back") return;
  remember(currentKey(), Math.round(window.scrollY));
  leaving = "away";
}

/* how long the scroll has to hold still before it counts as a position */
const SETTLE_MS = 200;

/**
 * Mounted once inside the router. Pins a new page to the top, and returns a
 * revisited one to where it was left.
 */
export default function useScrollMemory() {
  const { key, pathname } = useLocation();
  const navigationType = useNavigationType();
  // the last position that was the reader's own doing
  const seen = useRef(0);

  /* Watch the reader, and write only what the reader did.
   *
   * Two things move the scroll that are not the reader. Both are the page
   * coming apart on the way out: ScrollTrigger sends the scroll to zero as
   * its context is reverted, and the document then shrinks from a case
   * study's fourteen thousand pixels to About's three and a half, which the
   * browser answers by pulling the scroll back to somewhere that still
   * exists. Either one arrives here as an ordinary scroll event, and either
   * one, written down, is the reader's place replaced by zero.
   *
   * Both happen after the crossing has been asked for, which is what the
   * leaving flag is: raised at the click or the back button, lowered when the
   * next page arrives. Nothing in between is recorded.
   *
   * The settle is the second half. A burst of scrolls on the way out is
   * cancelled by the cleanup below before the last of them can be written, so
   * what stands is the last thing the reader actually did. A reader who
   * scrolls and leaves inside that fifth of a second loses it, which is a
   * fifth of a second of reading against the whole position.
   *
   * Nothing here looks at the document height. An earlier version threw away
   * any scroll that came with one, on the grounds that a page changing size
   * is a page settling — and on a case study, where the figures are lazy and
   * the height moves the whole way down, that threw away the reader as well.
   * Measured: a phone scrolled four thousand pixels into a case study
   * recorded nothing at all, so the forward button opened it at the top. */
  useLayoutEffect(() => {
    seen.current = Math.round(window.scrollY);
    let timer = 0;
    const onScroll = () => {
      if (leaving) return;
      seen.current = Math.round(window.scrollY);
      clearTimeout(timer);
      timer = setTimeout(() => remember(key, seen.current), SETTLE_MS);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    /* a reload or a closed tab never runs the cleanup below, and there is no
       teardown scroll to guard against either */
    const flush = () => remember(key, seen.current);
    window.addEventListener("pagehide", flush);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", flush);
    };
  }, [key]);

  useLayoutEffect(() => {
    /* POP is the back and forward buttons, and a gesture that means them.
       PUSH and REPLACE are the reader choosing something new, which starts
       at the top. */
    const saved = navigationType === "POP" ? recall(key) : null;
    const target = saved ?? 0;

    /* In a layout effect, so it lands before the browser paints and before a
       page crossing photographs the arriving page — the transition would
       otherwise carry a picture of the page at the top and drop the reader
       somewhere else once it finished. */
    leaving = null;
    window.scrollTo(0, target);
    seen.current = target;

    if (!target) return undefined;

    /* A long page is not its full height yet at this instant: the figures
       below the fold are lazy, and the page grows as they arrive. A position
       deep in a case study is unreachable until it does, and scrollTo clamps
       silently to whatever the height is now.
       So the position is re-applied while the page settles, and the attempt
       stops as soon as it sticks or the reader takes over. */
    let frame = 0;
    const until = performance.now() + 2000;
    const stop = () => cancelAnimationFrame(frame);
    const reapply = () => {
      if (Math.abs(window.scrollY - target) < 2 || performance.now() > until) return;
      window.scrollTo(0, target);
      seen.current = target;
      frame = requestAnimationFrame(reapply);
    };
    /* wheel and touch, not scroll: scrollTo above fires scroll itself, and
       listening for that would cancel the repair on its own first move */
    window.addEventListener("wheel", stop, { passive: true, once: true });
    window.addEventListener("touchstart", stop, { passive: true, once: true });
    frame = requestAnimationFrame(reapply);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, pathname]);
}
