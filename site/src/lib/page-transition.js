import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitLang } from "./lang-routes.js";
import { captureScroll, landed } from "./scroll-memory.js";

gsap.registerPlugin(CustomEase, ScrollTrigger);

/* ── The crossing between pages ──
 *
 * Built the way Codrops builds one in "Building Async Page Transitions in
 * Vanilla JavaScript" (tympanus.net/codrops, February 2026). The page being
 * left and the page arriving are both in the DOM at once, one container
 * each, and a single GSAP timeline moves the two together: the page being
 * left shrinks toward its centre, rises a third of a screen and dims to
 * almost nothing against black, and the page arriving is uncovered from
 * the bottom edge up. The landing's hero, the one drawing on the site,
 * comes up from under the bottom edge once the page is there; every other
 * page's title stays exactly where it is. The demo brings its title up
 * letter by letter, and that was tried on the About and case-study titles
 * and taken off again: a name in the middle of righting itself, cut at
 * the box it rises into, read as broken type, not as an entrance.
 *
 * The numbers are the demo's, not the article's. The article prints a
 * plainer version of its own demo: a page that rises and dims to 60% over
 * a second on power2.inOut. The demo the article links to
 * (github.com/blenkcode/codrops-demo) is what the reader actually sees,
 * and it scales the page to 0.8, takes it to 40%, and runs 0.7s on a curve
 * of its own. What is wanted is what the demo shows, so every number below
 * is the demo's, verbatim, from src/transitions/animations/default.js,
 * src/lib/index.js, src/animations/Enter.js and src/pages/home/home.js.
 *
 * What the demo has that this file does not need: a router of its own, a
 * page loader, pages that are strings of HTML, and a wait for every image
 * on the next page before anything moves (its pages hold a few small
 * ones; a case study here holds forty-five, most of them lazy). React
 * Router does the routing and React renders the pages;
 * components/PageStage.jsx keeps the two containers and hands them here.
 *
 * Where this file departs from the demo, and why. The demo's pages are a
 * screen tall and never scroll, so it can fix the ARRIVING page over the
 * document and uncover it with a clip. These pages scroll, and two things
 * break when the arriving one is the fixed one. Its scroll has to be
 * carried on the fixed box and moved to the window at the end, with
 * everything that reads the scroll on arrival taught to look in two
 * places. And ScrollTrigger, which fades the blocks on every inner page,
 * measures a page by scrolling the window to zero and back: a fixed page
 * does not move with that, so any refresh during the crossing put every
 * card on the arriving Work page a screen away and faded it out, which is
 * what was measured.
 *
 * So the roles are swapped. The page being LEFT is the one lifted out of
 * the flow, into a black box the size of the screen, positioned inside it
 * to exactly where the reader had it, so the picture does not change. The
 * page arriving takes the document, the window is put where it belongs at
 * once, and it is measured as any page is. The picture is the demo's: the
 * one shrinks, rises and fades against black, the other shows from the
 * bottom edge up. The demo does the second by uncovering the arriving
 * page; here the black box is cut away from its bottom edge instead, on
 * the same clock and the same curve, so the edge is the same line at every
 * instant (see UNCOVER). The black is the demo's body, which it keeps
 * black under white pages; here it is the box, under the page it holds.
 */

/* The demo's own curve, customEases.pageTransition in its lib/index.js. */
const EASE = CustomEase.create(
  "pageTransition",
  "M0,0 C0.38,0.05 0.48,0.58 0.65,0.82 0.82,1 1,1 1,1",
);
/* defaultTransition's tween on the current container. */
const LEAVE = { y: "-30vh", opacity: 0.4, scale: 0.8, duration: 0.7, ease: EASE };
/* The demo uncovers the arriving page from inset(100% 0 0 0) to inset(0),
   which is a line rising from the bottom of the screen at 100vh·p. The box
   the leaving page is held in is cut from below by exactly that, so its
   bottom edge is the demo's reveal line at every instant. The box does not
   move: the page inside it does, so the cut and the motion stay separate
   and the line stays straight. */
const UNCOVER = {
  from: "inset(0% 0% 0% 0%)",
  to: "inset(0% 0% 100% 0%)",
  duration: 0.7,
  ease: EASE,
};
/* ENTER's run, on the hero in one piece: it starts its own height below
   itself and rises. The delay is what home.js passes. */
const TITLE = { y: "100%", duration: 2.1, ease: "expo.out", delay: 0.32 };

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

/** The demo's ENTER, for the landing's hero alone: the drawing is put
 *  under the bottom edge of the screen and brought up, on the demo's
 *  clock. The first visit gets it too, once the boot cover has lifted,
 *  which is what `paused` is for. Any other page has nothing to raise.
 *
 *  The one thing the demo does not do is the last line: its tween leaves
 *  a 3D transform on the title for good, which keeps it on a compositor
 *  layer of its own. Taken off once it has landed. */
export function raiseTitle(container, { delay = TITLE.delay, paused = false } = {}) {
  const t = container?.querySelector(".lp-heading");
  if (!t) return null;
  gsap.set(t, { y: TITLE.y });
  const tl = gsap.timeline({ delay, paused }).to(
    t,
    {
      y: 0,
      force3D: true,
      duration: TITLE.duration,
      ease: TITLE.ease,
      onComplete: () => gsap.set(t, { clearProps: "transform" }),
    },
    0,
  );
  return {
    play: () => tl.play(),
    /* to the end now */
    finish: () => tl.progress(1),
    /* dropped, and the drawing left where it stands */
    kill: () => {
      tl.kill();
      gsap.set(t, { clearProps: "transform" });
    },
  };
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

  /* The leaving page, lifted out of the flow and held still: a black box
     the size of the screen, with the page positioned inside it so that
     what shows is exactly what the reader had on screen. Positioned, not
     scrolled: the page is about to shrink, and a scroll box whose content
     shrinks under it clamps its offset and jumps. The width is what the box
     had in the flow, or a fixed box would shrink to fit. The box goes with
     the page, so nothing needs clearing. Neither page takes the pointer
     while they are moving.

     The page shrinks toward the middle of what was on screen, which is
     the demo's centre: its container is one screen tall, this page is not.
     The transform makes the page the containing block for anything fixed
     inside it, a modal say, so that moves with the page, as it does in the
     demo.

     The box sits above everything the arriving page can raise on its own:
     its header at 10, and a modal it opens on arrival at 1000 or 1100,
     which is part of the page's picture and is uncovered with it. The
     demo's 10 was measured with the arriving header drawn over the leaving
     page. Below the boot cover at 2000 and the cursor at 9999. */
  const y = window.scrollY;
  const width = current.offsetWidth;
  /* the page is the container's one child: every page renders one root
     element, the landing wrapping its hero and its band to keep to that */
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
    willChange: "clip-path",
    pointerEvents: "none",
  });
  current.style.backgroundColor = "var(--grey-950)";
  gsap.set(page, {
    position: "absolute",
    top: -y,
    left: 0,
    width: "100%",
    transformOrigin: `50% ${y + window.innerHeight / 2}px`,
    willChange: "transform, opacity",
    force3D: true,
    z: 0.01,
  });
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
    page,
    {
      y: LEAVE.y,
      opacity: LEAVE.opacity,
      scale: LEAVE.scale,
      force3D: true,
      duration: LEAVE.duration,
      ease: LEAVE.ease,
    },
    0,
  ).fromTo(
    current,
    { clipPath: UNCOVER.from },
    { clipPath: UNCOVER.to, force3D: true, duration: UNCOVER.duration, ease: UNCOVER.ease },
    0,
  );
  const title = raiseTitle(next);

  return {
    /* the arriving page's entrance, if it has one, which outlives the
       crossing: 2.4s of hero against 0.7s of page. PageStage keeps it, so
       that a page left again before its hero has finished rising leaves
       with the hero in place rather than halfway up inside its clip. */
    title,
    /* end it now, as if the second had passed: the back button pressed
       mid-crossing, or another page arriving. onComplete fires from
       progress(1) synchronously. */
    finish: () => {
      title?.finish();
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
