import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

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
 * positions survive a reload and die with the tab.
 *
 * Two halves. Writing down where the reader is happens here, in the hook at
 * the foot of the file. Putting a page where it belongs when it arrives is
 * components/PageStage.jsx's and the crossing's, because between them they
 * are what knows when a page has the document: straight away on a plain
 * swap, and at the first frame of a crossing, when the page being left is
 * lifted out of the flow (see lib/page-transition.js). What they need from
 * here is recall, holdScroll and landed. */
const KEY = "scroll:";

const remember = (key, y) => {
  try {
    sessionStorage.setItem(KEY + key, String(y));
  } catch {
    /* private mode, or a full quota. A forgotten position is a page that
       opens at the top, which is where it used to open anyway. */
  }
};

export const recall = (key) => {
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

/* the last position that was the reader's own doing */
let seen = 0;

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
  /* The browser's own restoration is switched off: this file is the one
     doing it. Left on, the browser puts the scroll where the arriving entry
     wants it the moment the back button is pressed, while the page being
     left is still on screen and about to rise out of the crossing, which it
     then does from the wrong place. Measured: a case study read three
     thousand pixels down jumped to the list's one thousand before it moved.
     A reload is the one thing the browser did for free, and PageStage does
     it now from the same store, which outlives a reload. */
  history.scrollRestoration = "manual";
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

/** The arriving page is on screen at `y`, and the scroll is the reader's
 *  again. */
export function landed(y) {
  leaving = null;
  seen = y;
}

/* how long the scroll has to hold still before it counts as a position */
const SETTLE_MS = 200;

/* how long a position is re-applied to a page still growing under it */
const HOLD_MS = 2000;

/**
 * Keep the page at `target` while it settles. Returns the stop.
 *
 * A long page is not its full height yet when it arrives: the figures below
 * the fold are lazy, and the page grows as they come in. A position deep in
 * a case study is unreachable until it does, and a scroll set now clamps
 * silently to whatever the height is at the moment. So the position is put
 * back while the page settles, and the attempt stops as soon as it sticks
 * or the reader takes over.
 */
export function holdScroll(target) {
  if (!target) return () => {};
  let frame = 0;
  const until = performance.now() + HOLD_MS;
  const stop = () => cancelAnimationFrame(frame);
  const reapply = () => {
    if (Math.abs(window.scrollY - target) < 2 || performance.now() > until) return;
    window.scrollTo(0, target);
    seen = target;
    frame = requestAnimationFrame(reapply);
  };
  /* wheel and touch, not scroll: scrollTo above fires scroll itself, and
     listening for that would cancel the repair on its own first move */
  window.addEventListener("wheel", stop, { passive: true, once: true });
  window.addEventListener("touchstart", stop, { passive: true, once: true });
  frame = requestAnimationFrame(reapply);
  return () => {
    stop();
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
  };
}

/**
 * Mounted once inside the router. Watches the reader, and writes down only
 * what the reader did.
 *
 * Two things move the scroll that are not the reader. Both are the page
 * coming apart on the way out: ScrollTrigger sends the scroll to zero as its
 * context is reverted, and the document then shrinks from a case study's
 * fourteen thousand pixels to About's three and a half, which the browser
 * answers by pulling the scroll back to somewhere that still exists. Either
 * one arrives here as an ordinary scroll event, and either one, written
 * down, is the reader's place replaced by zero.
 *
 * Both happen after the crossing has been asked for, which is what the
 * leaving flag is: raised at the click or the back button, lowered when the
 * next page lands. Nothing in between is recorded.
 *
 * The settle is the second half. A burst of scrolls on the way out is
 * cancelled by the cleanup below before the last of them can be written, so
 * what stands is the last thing the reader actually did. A reader who
 * scrolls and leaves inside that fifth of a second loses it, which is a
 * fifth of a second of reading against the whole position.
 *
 * Nothing here looks at the document height. An earlier version threw away
 * any scroll that came with one, on the grounds that a page changing size is
 * a page settling — and on a case study, where the figures are lazy and the
 * height moves the whole way down, that threw away the reader as well.
 * Measured: a phone scrolled four thousand pixels into a case study recorded
 * nothing at all, so the forward button opened it at the top.
 */
export default function useScrollMemory() {
  const { key } = useLocation();

  useLayoutEffect(() => {
    let timer = 0;
    const onScroll = () => {
      if (leaving) return;
      seen = Math.round(window.scrollY);
      clearTimeout(timer);
      timer = setTimeout(() => remember(key, seen), SETTLE_MS);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    /* a reload or a closed tab never runs the cleanup below, and there is no
       teardown scroll to guard against either */
    const flush = () => remember(key, seen);
    window.addEventListener("pagehide", flush);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", flush);
    };
  }, [key]);
}
