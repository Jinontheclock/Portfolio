/* What every moving part of the site asks the browser before it moves.
 *
 * These three questions were each answered in two or three places —
 * prefers-reduced-motion in lib/stage.js, lib/screen-column.js and
 * lib/page-transition.js, hover in components/PageStage.jsx, and the
 * phone's width as a bare 600 in two fit hooks and a hook of its own.
 * Answering them in one place is what keeps "a phone" meaning the same
 * thing in the markup as it does in the stylesheets.
 *
 * The fallbacks are the older answer in each case: a browser with no
 * matchMedia gets the motion (nothing asked for less) and the pointer
 * (it is a desktop), and is not a phone.
 */

/** The width the site lays itself out as one column — the same 600px the
 *  stylesheets break at (see styles/breakpoints.css). */
export const PHONE_MAX = 600;
export const PHONE_QUERY = `(max-width: ${PHONE_MAX}px)`;

export const reducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

export const hoverCapable = () => window.matchMedia?.("(hover: hover)").matches ?? true;

export const isPhoneWidth = () => window.matchMedia?.(PHONE_QUERY).matches ?? false;
