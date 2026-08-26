import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

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

export default function withViewTransition(update, from = "right") {
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
  };
  t.finished.then(clear, clear);
}

/** Mounted once inside the router: tells a waiting transition that the new
 *  page is in the DOM. A layout effect rather than an effect, because the
 *  difference between the two is a paint — and a paint here is the old page
 *  flashing back before the transition starts. */
export function useRouteCommitted() {
  const { pathname } = useLocation();
  useLayoutEffect(settle, [pathname]);
}
