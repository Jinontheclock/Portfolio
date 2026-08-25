import { flushSync } from "react-dom";

/** Run a route change as a cross-fade, where the browser will do it for us.
 *
 *  document.startViewTransition photographs the page as it stands, runs the
 *  callback, photographs the result, and cross-fades one into the other.
 *  Two things follow from that which a hand-rolled fade does not get for
 *  free: nothing has to hold two copies of a page in the DOM at once, and
 *  the picture it took is the reader's own view — their scroll position,
 *  their playing video's current frame — rather than the top of a document
 *  they had scrolled away from.
 *
 *  The callback has to leave the DOM already updated by the time it
 *  returns, and React's default is to batch a state change into a later
 *  frame. flushSync is what lands the router's swap inside the second
 *  photograph instead of after it.
 *
 *  Two readers get the plain swap instead, which is what the site did
 *  everywhere before this: anyone on a browser without the API, and anyone
 *  who has asked for less motion. Neither is a degraded case — an instant
 *  change is the honest fallback for a fade.
 */
export default function withViewTransition(update) {
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduced || typeof document.startViewTransition !== "function") {
    update();
    return;
  }
  document.startViewTransition(() => flushSync(update));
}
