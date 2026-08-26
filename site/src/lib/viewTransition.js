import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { splitLang } from "./lang-routes.js";

/** Run a route change as a page transition, where the browser will do it.
 *
 *  document.startViewTransition photographs the page as it stands, runs the
 *  callback, photographs the result, and animates one into the other. Two
 *  things follow that a hand-rolled version does not get for free: nothing
 *  has to hold two copies of a page in the DOM at once, and the picture it
 *  takes is the reader's own view rather than the top of a document they
 *  had scrolled away from.
 *
 *  The whole trick is the callback: the second photograph is taken when it
 *  settles, so the new page has to be in the DOM by then. React Router puts
 *  its route change inside a React transition, which is deferred on purpose
 *  and which flushSync does NOT force — calling navigate() in here changes
 *  the URL at once and leaves the old page on screen for another frame or
 *  two. Photographed then, the "new" picture is the old page, and the swap
 *  that lands afterwards tears the transition down.
 *
 *  So the callback hands back a promise instead, and the promise is settled
 *  by useRouteCommitted below, from a layout effect — after React has put
 *  the new page in the DOM and before anything is painted. That is exactly
 *  the moment the photograph should be taken.
 */
let pending = null;
let capTimer = 0;

const settle = () => {
  if (!pending) return;
  const resolve = pending;
  pending = null;
  clearTimeout(capTimer);
  resolve();
};

export default function withViewTransition(update, { from = "right", hold } = {}) {
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduced || typeof document.startViewTransition !== "function") {
    update();
    return;
  }
  /* a transition already waiting is one that never got its commit; let it
     go rather than stacking a second one behind it */
  settle();
  /* Which side the arriving page comes in from, read by the stylesheet off
     the root element. It has to be set before the transition starts, since
     that is when the pseudo-elements resolve their animations, and taken
     off afterwards so it never describes a crossing that is over. */
  const root = document.documentElement;
  root.dataset.pageFrom = from;
  /* What holds still across this particular crossing, for the stylesheet
     to name and lift out of the moving picture. It has to be on before the
     transition starts so the FIRST photograph is taken with it, and stay on
     through the second — an element named in only one of the two is not a
     thing that held still, it is a thing that arrived. */
  if (hold) root.dataset.pageHold = hold;
  const t = document.startViewTransition(() => {
    update();
    return new Promise((resolve) => {
      pending = resolve;
      /* A navigation that turns out to be a no-op never commits, and an
         unresolved callback holds the cover over the page indefinitely.
         The ceiling is the escape hatch, not the normal path. */
      capTimer = setTimeout(settle, 500);
    });
  });
  const clear = () => {
    if (root.dataset.pageFrom === from) delete root.dataset.pageFrom;
    if (hold && root.dataset.pageHold === hold) delete root.dataset.pageHold;
  };
  t.finished.then(clear, clear);
}

/** Mounted once inside the router: tells a waiting transition that the new
 *  page is in the DOM. A layout effect rather than an effect, because the
 *  difference between the two is a paint — and a paint here is the old page
 *  flashing back before the transition starts. */
export function useRouteCommitted() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    lastPath = pathname;
    settle();
  }, [pathname]);
}

/* ── Which crossings transition, and how ──

   Three depths: the landing page, the two pages off it, and a case study
   inside Work. A page deeper than the one being left arrives from the
   right and a shallower one from the left, so the direction is the move
   itself rather than a list of pairs — the reader is always going further
   in or coming back out, and the page says which. Work and About are the
   same depth as each other; neither is "back" from the other, so those
   two keep the forward direction.

   The wordmark holds still wherever both pages have one, which is
   everywhere except a crossing with the landing page: that one hides it,
   and a name on one side only is not a thing that held still but a thing
   that arrived. */
const depthOf = (route) => {
  if (route === "/") return 0;
  return route.split("/").filter(Boolean).length;
};

/* Where the site is mounted, without its trailing slash: "" on the domain
   and "/Portfolio" on the project page. */
const BASE = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

/** A pathname as one of the site's routes: no deploy base, no language
 *  prefix, no trailing slash.
 *
 *  All three have to come off or two names for the same page compare as
 *  different places. The base is the one that bites hardest, because the
 *  two sources disagree: useLocation() has already taken it off, while
 *  window.location.pathname — what a popstate has to work from — has not.
 *  Left in, /Portfolio/work counts as two segments deep and every crossing
 *  the back button made came out going forwards. */
export const routeOf = (pathname) => {
  let p = pathname || "/";
  if (BASE && (p === BASE || p.startsWith(`${BASE}/`))) p = p.slice(BASE.length) || "/";
  return splitLang(p).rest.replace(/\/+$/, "") || "/";
};

/** What this move should look like, or null if it is not a crossing.
 *  Both arguments may be raw pathnames. */
export function crossing(fromPath, toPath) {
  const from = routeOf(fromPath);
  const to = routeOf(toPath);
  if (from === to) return null;
  return {
    from: depthOf(to) < depthOf(from) ? "left" : "right",
    hold: from !== "/" && to !== "/" ? "wordmark" : undefined,
  };
}

/* ── The browser's own back and forward ──

   A click is something this code can be handed; the back button is not. The
   browser rewinds its own history and React Router simply re-renders, so
   without this the site slides one way and snaps the other.

   The listener is registered here, at module scope, which is the whole
   reason it works: this file is imported before the Router is built, and
   popstate listeners run in the order they were added. So this one goes
   first, starts the crossing while the old page is still what is on
   screen, and hands back a promise. React Router's listener runs next and
   sets its state; useRouteCommitted settles the promise when the new page
   lands. Nothing here causes the navigation — it only wraps the one the
   browser is already doing.

   Direction comes from the same depth rule a click uses, so going back out
   of a case study arrives from the left exactly as pressing Work does, and
   going forward into it again arrives from the right. lastPath is what
   makes that possible: history says where the reader is going, not where
   they were.

   Pointer devices only. A phone's back is an edge swipe, and Safari draws
   its own slide for it — ours would be a second one underneath.

   The scroll position the browser restores is left alone. It arrives after
   the crossing has photographed the old page, so the picture holds the
   view the reader actually had, and the real page is put back at the
   restored offset underneath. */
let lastPath = typeof location !== "undefined" ? location.pathname : "/";

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    const from = lastPath;
    const to = location.pathname;
    lastPath = to;
    if (!window.matchMedia?.("(hover: hover)").matches) return;
    const move = crossing(from, to);
    if (!move) return;
    /* no update of its own: the browser has already changed the URL and the
       Router is about to catch up */
    withViewTransition(() => {}, move);
  });
}
