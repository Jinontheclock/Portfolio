import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Scroll fade, the shape GreenSock settled on in the thread this came from
   (forum topic 35389): not one tween scrubbed by the scrollbar, but a plain
   ScrollTrigger whose four callbacks each fire their own tween. That is what
   lets the block leave the way the reader is going — up and out at the top,
   back down at the bottom — instead of simply rewinding the way it came.

     onEnter      scrolling down, the block arrives   → rises in
     onLeave      scrolling down, the block departs   → lifts out
     onEnterBack  scrolling up, it comes back         → settles in
     onLeaveBack  scrolling up, it departs downward   → sinks out

   The band is wider than the thread's. Theirs sat inside pinned panels, one
   idea to a screen, and finished at "bottom 40%" — on a page of running text
   that would take a paragraph off the screen while it was still being read.
   Here a block holds until its foot has almost cleared the top. */
const START = "top 88%";
const END = "bottom 22%";
const SHIFT = 40; // px travelled, in the direction of the scroll
const DURATION = 0.45;

const IN = { y: 0, opacity: 1, duration: DURATION, overwrite: "auto" };
const out = (y) => ({ y, opacity: 0, duration: DURATION, overwrite: "auto" });

/* A group is what fades as one thing.

     "sel"              every element that matches is its own group
     ["sel-a", "sel-b"] everything they match is one group, in document order

   The second form is how a run of siblings is held together without a
   wrapper element around them: the group's first member is what starts it
   and its last member is what ends it, and one tween moves them all. A
   wrapper would have done the same job, but these columns are flex with a
   gap, and a box put around some of their children changes the spacing of
   everything in them. */
const asGroups = (root, spec) =>
  typeof spec === "string"
    ? [...root.querySelectorAll(spec)].map((el) => [el])
    : [[...root.querySelectorAll(spec.join(", "))]].filter((g) => g.length);

/**
 * Fades the given groups in and out as the reader passes them.
 *
 * @param root   ref to the element the groups live in
 * @param specs  what to fade, relative to that element (see asGroups)
 * @param deps   re-measure when these change (a language switch reflows
 *               every block on the page, so the triggers have to be rebuilt
 *               against the new heights)
 */
export default function useScrollFade(root, specs, deps = []) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    /* Someone who has asked for less motion gets the page as written: no
       hiding, no tweening, nothing to wait for. Same bargain the page
       transitions and the modals keep. */
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;

    /* Measuring has to happen with the blocks where the layout puts them,
       not where this file has slid them to.

       The tweens here are fired from callbacks, so they are not attached to
       any ScrollTrigger and ScrollTrigger cannot know the 40px on a faded
       block is its own doing. Left alone it measures the slid position and
       banks a start line up to 40px off — which is what a first attempt at
       this produced: blocks lighting up a few pixels early, and the error
       moving around as more refreshes ran. Zeroing the offset before every
       measurement is what makes the numbers describe the page. The state
       each block should be left in is restored by its own onRefresh below,
       which runs after. */
    let members = [];
    const flatten = () => gsap.set(members, { y: 0 });
    ScrollTrigger.addEventListener("refreshInit", flatten);

    const ctx = gsap.context(() => {
      const groups = specs.flatMap((spec) => asGroups(el, spec));
      members = groups.flat();
      groups.forEach((group) => {
        ScrollTrigger.create({
          /* the group starts on its first member and ends on its last, so
             the band is drawn around the whole run rather than around
             whichever piece of it happened to be picked */
          trigger: group[0],
          endTrigger: group[group.length - 1],
          start: START,
          end: END,
          onEnter: () => gsap.to(group, IN),
          onEnterBack: () => gsap.to(group, IN),
          onLeave: () => gsap.to(group, out(-SHIFT)),
          onLeaveBack: () => gsap.to(group, out(SHIFT)),
          /* State, not animation. This runs on creation and on every
             re-measure, and it is what makes the page correct at the moment
             it is looked at rather than a beat later: whatever is in the
             band is simply already there.

             It matters most on arrival. A crossing from Work photographs
             this page the instant React commits it, and a page that spends
             even one frame at opacity 0 is photographed blank and slides in
             empty. Snapping here, inside a layout effect, means the picture
             is taken of the finished page. */
          onRefresh: (self) => {
            if (self.isActive) gsap.set(group, { y: 0, opacity: 1 });
            else gsap.set(group, { y: self.progress >= 1 ? -SHIFT : SHIFT, opacity: 0 });
          },
        });
      });
    }, el);

    /* ScrollTrigger reads every block's position once and turns it into a
       scroll number. Anything that moves the page afterwards leaves those
       numbers describing where things used to be.

       These pages do move afterwards. On About the link rail shrinks its own
       type to fit one line, and on a phone that rail is a row above the
       column rather than a column beside it, so the shrink drags everything
       below it up — measured 2 to 21px out on a phone against 0 on a
       desktop, which is exactly where the rail stops sharing the column. A
       case study has lazy figures settling into their boxes. Webfonts
       landing do the same thing on a slower connection.

       Watching the column's own height catches all of it, and the frame's
       grace stops a burst of reflows from refreshing once each. */
    let queued = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(queued);
      queued = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(queued);
      ro.disconnect();
      ScrollTrigger.removeEventListener("refreshInit", flatten);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root, specs, ...deps]);
}
