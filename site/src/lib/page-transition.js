import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitLang } from "./lang-routes.js";
import { captureScroll, landed } from "./scroll-memory.js";

gsap.registerPlugin(ScrollTrigger);

/* ── The crossing between pages ──
 *
 * Built the way Codrops builds one in "Building Async Page Transitions in
 * Vanilla JavaScript" (tympanus.net/codrops, February 2026). The page being
 * left and the page arriving are both in the DOM at once, one container
 * each, and a single GSAP timeline moves the two together: the page being
 * left rises a third of a screen and dims, the page arriving is uncovered
 * from the bottom edge up, and once it is there its title comes up from
 * under its own baseline. Every number below is the article's, verbatim.
 *
 * What the article has that this file does not need: a router of its own,
 * a page loader, and pages that are strings of HTML. React Router does the
 * routing and React renders the pages; components/PageStage.jsx keeps the
 * two containers and hands them here.
 *
 * Where this file departs from the article, and why. The article's pages
 * are a screen tall and never scroll, so it can fix the ARRIVING page over
 * the document and uncover it with a clip. These pages scroll, and two
 * things break when the arriving one is the fixed one. Its scroll has to
 * be carried on the fixed box and moved to the window at the end, with
 * everything that reads the scroll on arrival taught to look in two
 * places. And ScrollTrigger, which fades the blocks on every inner page,
 * measures a page by scrolling the window to zero and back: a fixed page
 * does not move with that, so any refresh during the crossing put every
 * card on the arriving Work page a screen away and faded it out, which is
 * what was measured.
 *
 * So the roles are swapped. The page being LEFT is the one lifted out of
 * the flow: fixed, the size of the screen, scrolled inside its own box to
 * exactly where the reader had it, so the picture does not change. The
 * page arriving takes the document, the window is put where it belongs at
 * once, and it is measured as any page is. The picture is the article's:
 * the one is translated up by 30vh, the other shows from the bottom edge
 * up. The article does the second by uncovering the arriving page; here
 * the leaving one is cut away from its bottom edge instead, on the same
 * clock and the same curve, so the edge is the same line at every instant
 * (see UNCOVER). The 60% is a page over black in both: the article keeps
 * its body black under white pages, and the leaving box here is painted
 * black under the page it holds.
 */

/* defaultTransition and ENTER, as printed. */
const LEAVE = { y: "-30vh", opacity: 0.6, duration: 1, ease: "power2.inOut" };
/* The article uncovers the arriving page from inset(100% 0 0 0) to inset(0).
   The leaving page is cut from below by the same amount less the 30vh it
   has risen, so its bottom edge and the article's reveal line coincide:
   (100vh - 30vh·p) - 70vh·p = 100vh·(1 - p). */
const UNCOVER = {
  from: "inset(0% 0% 0% 0%)",
  to: "inset(0% 0% 70% 0%)",
  duration: 1,
  ease: "power2.inOut",
};
const TITLE = { from: "100%", duration: 1.2, ease: "expo.out", delay: 0.45 };

/* Where the site is mounted, without its trailing slash: "" on the domain
   and "/Portfolio" on the project page. */
const BASE = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

/** A pathname as one of the site's routes: no deploy base, no language
 *  prefix, no trailing slash.
 *
 *  All three have to come off or two names for the same page compare as
 *  different places. The base is the one that bites hardest, because the
 *  two sources disagree: useLocation() has already taken it off, while
 *  window.location.pathname has not. */
export const routeOf = (pathname) => {
  let p = pathname || "/";
  if (BASE && (p === BASE || p.startsWith(`${BASE}/`))) p = p.slice(BASE.length) || "/";
  return splitLang(p).rest.replace(/\/+$/, "") || "/";
};

/** Whether a move between two pathnames is a crossing at all. A language
 *  switch lands on the same page and is not one. Both may be raw. */
export const crossing = (fromPath, toPath) => routeOf(fromPath) !== routeOf(toPath);

export const reduced = () =>
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* The article's isTransitioning: a click while a crossing is running does
   nothing at all. The browser's own back button cannot be refused the same
   way, and PageStage ends the running crossing on the spot instead. */
let locked = false;

/** Start a crossing the reader chose. `update` is the navigation itself. */
export default function withPageTransition(update) {
  if (locked) return;
  /* the last instant at which the scroll position still belongs to the
     page being left. See lib/scroll-memory.js. */
  captureScroll();
  update();
}

/* The container of the page being left, for the length of a crossing. The
   window's scroll stops being that page's the moment the crossing starts,
   and anything on it that follows the scroll, the header deciding whether
   it is at the top and the chapter list deciding which chapter is being
   read, has to stop following. */
let left = null;

export const leaving = (el) => !!left && left.contains(el);

/** The article's ENTER: the page's title, put under its own baseline and
 *  brought up. The first page of a visit gets it too, once the boot cover
 *  has lifted, which is what `paused` is for.
 *
 *  The one line the article does not have is the last: the tween leaves a
 *  3D transform on the title for good, which keeps it on a compositor layer
 *  of its own and, on a Windows browser, off the subpixel text rendering
 *  the rest of the page gets. Taken off once it has landed. */
export function raiseTitle(container, { delay = TITLE.delay, paused = false } = {}) {
  const t = container?.querySelector("h1");
  if (!t) return null;
  gsap.set(t, { y: TITLE.from });
  return gsap.timeline({ delay, paused }).to(
    t,
    {
      y: 0,
      duration: TITLE.duration,
      force3D: true,
      ease: TITLE.ease,
      onComplete: () => gsap.set(t, { clearProps: "transform" }),
    },
    0,
  );
}

/** A page is in the flow and on screen: put the window where the page
 *  belongs, and tell everything that measured the page to measure it
 *  again.
 *
 *  The second half is ScrollTrigger. A page's triggers are created in its
 *  own layout effect, against whatever the window's scroll was at that
 *  instant, which for a page arriving in a crossing is the leaving page's.
 *  Refreshing recomputes every trigger against the page as it stands. */
export function landPage(y) {
  window.scrollTo(0, y);
  ScrollTrigger.refresh();
  landed(y);
}

/**
 * The crossing itself. `current` is the container in the flow with the
 * page being left in it; `next` the one just mounted after it, with the
 * page arriving.
 *
 * @param scroll  where the arriving page opens: the top, or the place the
 *   back button is returning to.
 * @param onDone  called once, the moment the crossing is over. The caller
 *   takes the leaving container down.
 */
export function beginCrossing(current, next, { scroll, onDone }) {
  const root = document.documentElement;
  locked = true;
  left = current;
  /* for the cursor, which lets go of whatever it was holding and looks again
     when this comes off */
  root.dataset.crossing = "";

  /* The leaving page's triggers stop here. The window is about to become
     the arriving page's, and read as that page's scroll they would fade
     the leaving page's blocks out from under it as it rose. Nothing is
     reverted: the page is to look exactly as it did. */
  ScrollTrigger.getAll().forEach((t) => {
    if (current.contains(t.trigger)) t.kill(false);
  });

  /* The leaving page, lifted out of the flow and held still: a box the
     size of the screen, scrolled inside to where the reader had it. The
     width is what the box had in the flow, or a fixed box would shrink to
     fit. The transform makes it the containing block for anything fixed
     inside, a modal say, which the article has in its stylesheet on every
     container and this site cannot keep after a crossing: fixed inside a
     transformed page, a modal scrolls away with the page. The box goes with
     the page, so nothing needs clearing. The black is what the page dims
     against. Neither page takes the pointer while they are moving.

     The box sits above everything the arriving page can raise on its own:
     its header at 10, and a modal it opens on arrival at 1000 or 1100,
     which is part of the page's picture and is uncovered with it. The
     article's 10 was measured with the arriving header drawn over the
     leaving page. Below the boot cover at 2000 and the cursor at 9999. */
  const y = window.scrollY;
  const width = current.offsetWidth;
  const page = current.firstElementChild;
  gsap.set(current, {
    position: "fixed",
    top: 0,
    left: 0,
    width,
    height: "100vh",
    zIndex: 1500,
    overflow: "hidden",
    clipPath: UNCOVER.from,
    willChange: "transform, clip-path",
    pointerEvents: "none",
    force3D: true,
    z: 0.01,
  });
  current.style.backgroundColor = "var(--grey-950)";
  current.scrollTop = y;
  gsap.set(next, { pointerEvents: "none" });

  /* the arriving page has the document now, and opens where it belongs */
  landPage(scroll);

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    left = null;
    locked = false;
    delete root.dataset.crossing;
    gsap.set(next, { clearProps: "pointerEvents" });
    onDone();
  };

  const tl = gsap.timeline({ onComplete: finish });
  tl.to(
    current,
    { y: LEAVE.y, force3D: true, duration: LEAVE.duration, ease: LEAVE.ease },
    0,
  )
    .to(page, { opacity: LEAVE.opacity, duration: LEAVE.duration, ease: LEAVE.ease }, 0)
    .fromTo(
      current,
      { clipPath: UNCOVER.from },
      { clipPath: UNCOVER.to, duration: UNCOVER.duration, ease: UNCOVER.ease },
      0,
    );
  const title = raiseTitle(next);

  return {
    /* end it now, as if the second had passed: the back button pressed
       mid-crossing, or another page arriving. onComplete fires from
       progress(1) synchronously. */
    finish: () => {
      title?.progress(1);
      tl.progress(1);
    },
    /* drop it without finishing: React tearing the containers down */
    kill: () => {
      title?.kill();
      tl.kill();
      if (done) return;
      done = true;
      left = null;
      locked = false;
      delete root.dataset.crossing;
    },
  };
}
