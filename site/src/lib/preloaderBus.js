/* A tiny bus between the count-up cover (Preloader) and the hero videos.
   While a cover is up the page isn't really on screen — geometrically the
   hero still intersects the viewport, so an IntersectionObserver alone
   would let the video play through behind the cover and be spent by the
   time the page is revealed. The Preloader marks the page covered while it
   holds, and the videos hold their play-through until it lifts. */

let covers = 0;
const coverListeners = new Set();
const revealListeners = new Set();

export function isCovered() {
  return covers > 0;
}

export function beginCover() {
  covers += 1;
  coverListeners.forEach((fn) => fn());
}

export function endCover() {
  if (covers > 0) covers -= 1;
  if (covers === 0) revealListeners.forEach((fn) => fn());
}

// fires whenever a cover goes up — videos reset to their first frame and wait
export function onCover(fn) {
  coverListeners.add(fn);
  return () => coverListeners.delete(fn);
}

// fires when the last cover lifts — the page is on screen, videos may play
export function onReveal(fn) {
  revealListeners.add(fn);
  return () => revealListeners.delete(fn);
}
