import { useEffect } from "react";
import gsap from "gsap";
import MouseFollower from "mouse-follower";
import useCanHover from "../hooks/useCanHover.js";

/* The pointer, replaced.
 *
 * Cuberto's mouse-follower does the transport: it puts one fixed element on
 * the page, drives it from a gsap.ticker with quickSetter (no per-frame tween
 * bookkeeping), and hides it when the pointer leaves the window or crosses
 * into an iframe. What it does not do is decide what the cursor should BE at
 * any moment, and that is the part being matched here.
 *
 * The shape being matched is Motion's Cursor component, read out of the
 * bundle its own examples ship (examples.motion.dev). Its numbers, verbatim:
 *
 *     const b = 17, j = 31, H = 4, oe = 20
 *     magneticOptions = { morph: true, padding: 5, snap: 0.8 }
 *     transition      = { duration: .15, ease: [.38, .12, .29, 1] }
 *     pressed         = { scale: .9 }
 *     exit            = { opacity: 0, scale: 0 }
 *
 * 17px at rest, 31px over a link or a button, a 4px bar as tall as the type
 * it is sitting on, and over a small control it takes the control's own
 * shape. Those are the four things the docs page demonstrates, and they are
 * what the four constants and the resolver below reproduce. The one rule
 * that is not Motion's is what counts as type — see textBlockOf.
 *
 * Two of them mouse-follower cannot do by itself, because both need to
 * measure the element under the pointer: a caret the height of the type, and
 * a shape the size of the button. So the library is left to carry the cursor
 * around and this file decides its size, which is one delegated listener and
 * two custom properties.
 */

MouseFollower.registerGSAP(gsap);

/* Motion's own selector, unchanged, so the same elements answer to the
   cursor here as there. */
const POINTER_SEL = 'a, button, input[type="button"]:not(:disabled)';

/* Fields take a caret too. They are the one kind of text the rule below
   cannot see, because what is typed into them is not a text node. The
   password field is this site's addition: Motion's list stops at text, which
   would leave the one field the site has with no caret and, the native
   pointer being gone, nothing at all. */
const FIELD_SEL =
  "textarea:not(:disabled), input[type='text']:not(:disabled), input[type='password']:not(:disabled)";

/* What this site makes clickable without making it a link or a button, which
   Motion's two selectors therefore walk straight past. Both say so in CSS
   already — cursor:pointer on the title, cursor:zoom-in on the figures — and
   that is exactly the signal the replaced cursor has taken away, so it has to
   carry the same meaning some other way.
   The comparison sliders are excluded for the same reason the figure handler
   excludes them: their halves are dragged over each other, not opened. */
const SITE_POINTER_SEL = ".cs-title, .cs-sections img";
const NOT_A_FIGURE = "img-comparison-slider";

const REST = 17; // Motion: b
const OVER = 31; // Motion: j
const CARET_W = 4; // Motion: H
const CARET_H = 20; // Motion: oe, the fallback when font-size is unreadable
const PAD = 5; // Motion: magneticOptions.padding

/* Motion snaps the cursor 80% of the way to the target's centre. mouse-follower
   states the same pull from the other end — stickDelta is the fraction of the
   pointer's own movement that survives — so 0.8 there is 0.2 here. */
const SNAP_DELTA = 0.2;

/* How near to pinned the cursor rides. Motion's replacement cursor has no
   spring at all and sits exactly on the pointer; its follow mode is where the
   lag lives. mouse-follower cannot do exactly zero — its render loop skips
   frames where the cursor has caught up completely, so a zero-length tween
   would leave it parked at the origin — and a tenth of a second under
   expo.out is within a frame or two of pinned. Raise this to about 0.5 for
   the trailing, follow-mode feel instead. */
const SPEED = 0.1;

/* Motion morphs the cursor to any link or button it is over. Measured at
   1440, this site's are:

     header pills      59-69 x 32     the wordmark      69 x 32
     case-study title    193 x 34     the demo button  212 x 47
     About links       42-69 x 21-32
     chapter buttons     439 x 31     work cards      1425 x 246
     figures         125-674 x -346

   A cursor that becomes a 1425px slab is not a cursor any more, it is a
   hover state, and the cards already have one. The chapter buttons are the
   less obvious case: they are only 31px tall but stretch the whole rail, so
   most of that 439px is the whitespace after a short label and taking their
   outline would draw a bar across nothing.
   So the morph is kept for controls the size of a control. Everything above
   the line gets the plain 31px circle and no magnetic pull. */
const MORPH_MAX_W = 340;
const MORPH_MAX_H = 130;

/** The nearest element with words of its own, or null.
 *
 *  Motion decides "text" by tag: p and the six headings. On this site that
 *  misses most of the words — captions, list items, the meta labels and
 *  their values, a quote's cite, the before/after labels, the footer line,
 *  a bold word inside a caption. Measured: eleven kinds on one case study.
 *  Text is not a list of tags, it is an element with a text node of its
 *  own, so that is the test — and it has to be the element's OWN text, not
 *  its children's, or every wrapper up to the body would count and the
 *  caret would be sized to the wrapper's type instead of the word's. */
function textBlockOf(node) {
  for (let el = node; el && el !== document.body; el = el.parentElement) {
    for (const n of el.childNodes) {
      if (n.nodeType === 3 && n.textContent.trim()) return el;
    }
  }
  return null;
}

/** What the cursor should be over this element: a link or a button, one of
 *  the site's own clickable things, a field, text, or nothing in particular. */
function resolve(node) {
  if (!node || node.nodeType !== 1) return { type: "default", el: null };
  const pointer = node.closest(POINTER_SEL);
  if (pointer) return { type: "pointer", el: pointer };
  const site = node.closest(SITE_POINTER_SEL);
  if (site && !site.closest(NOT_A_FIGURE)) return { type: "pointer", el: site };
  const field = node.closest(FIELD_SEL);
  if (field) return { type: "text", el: field };
  /* text that cannot be selected is not text to put a caret on — the same
     check Motion makes */
  if (window.getComputedStyle(node).userSelect === "none") return { type: "default", el: null };
  const text = textBlockOf(node);
  if (text) return { type: "text", el: text };
  return { type: "default", el: null };
}

export default function SiteCursor() {
  const canHover = useCanHover();

  useEffect(() => {
    /* A cursor is a thing for pointers. There is nothing to replace on a
       touch screen, and a reader who asked for less motion asked for the
       pointer they already have. Both are also the conditions under which
       Motion itself declines to hide the native cursor. */
    if (!canHover) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;

    const cursor = new MouseFollower({
      className: "hl-cursor",
      speed: SPEED,
      skewing: 0,
      activeState: "-pressed",
      hiddenState: "-hidden",
      hideTimeout: 150,
      stickDelta: SNAP_DELTA,
      /* Left empty on purpose. The library adds a rule of its own here for
         callers that pass nothing — it hides the cursor over any iframe,
         which was the right answer before this file learned to reach into
         one. Frames are handled below instead, and a rule that hid the
         cursor over every frame would undo it. */
      stateDetection: {},
      /* the library's data-attribute scanning is a second pass over every
         element the pointer touches, and everything it would read is decided
         below instead */
      dataAttr: null,
    });

    const el = cursor.el;
    const root = document.documentElement;

    const size = (w, h) => {
      el.style.setProperty("--cursor-w", `${w}px`);
      el.style.setProperty("--cursor-h", `${h}px`);
    };
    size(REST, REST);

    let held = { type: "default", el: null, stuck: false };

    const dress = ({ type, el: target }) => {
      el.classList.toggle("-over", type === "pointer");
      el.classList.toggle("-caret", type === "text");
      if (type === "pointer") {
        const r = target.getBoundingClientRect();
        const morph = r.width <= MORPH_MAX_W && r.height <= MORPH_MAX_H;
        /* the outline is painted differently from the circles — see cursor.css */
        el.classList.toggle("-morph", morph);
        if (morph) {
          size(r.width + PAD * 2, r.height + PAD * 2);
          cursor.setStick(target);
        } else {
          size(OVER, OVER);
          cursor.removeStick();
        }
        held = { type, el: target, stuck: morph };
        return;
      }
      el.classList.remove("-morph");
      cursor.removeStick();
      if (type === "text") {
        const fs = parseInt(window.getComputedStyle(target).fontSize, 10);
        size(CARET_W, fs || CARET_H);
      } else {
        size(REST, REST);
      }
      held = { type, el: target, stuck: false };
    };

    /* Frames.
     *
     * A frame is a document of its own: the stylesheet that takes the native
     * pointer away never reached it, and mousemove does not cross the
     * boundary, so over the embedded demo the replacement stopped dead at the
     * edge and the arrow came back inside it. Both halves are fixable from
     * out here for a frame this page is allowed to open — it gets the same
     * rule, and its moves are handed back out with the frame's offset and
     * scale applied, so one cursor keeps crossing the seam.
     *
     * The demo navigates inside itself, and every navigation is a new
     * document with none of this in it, hence the load listener.
     *
     * A frame from another origin cannot be touched at all. There the cursor
     * stands aside and the frame's own pointer does the work, which is the
     * only honest answer available. */
    const seen = new WeakSet();

    const reach = (frame) => {
      let doc = null;
      try {
        doc = frame.contentDocument;
      } catch {
        return false; // another origin
      }
      if (!doc?.documentElement) return false;
      if (doc.getElementById("hl-cursor-rule")) return true;

      const rule = doc.createElement("style");
      rule.id = "hl-cursor-rule";
      rule.textContent = "html, html * { cursor: none !important; }";
      (doc.head || doc.documentElement).appendChild(rule);

      doc.addEventListener(
        "mousemove",
        (e) => {
          /* the frame is drawn scaled to fit its phone mockup, so a point
             inside it is that many times further along outside */
          const r = frame.getBoundingClientRect();
          const k = frame.clientWidth ? r.width / frame.clientWidth : 1;
          root.dispatchEvent(
            new MouseEvent("mousemove", {
              clientX: r.left + e.clientX * k,
              clientY: r.top + e.clientY * k,
              bubbles: true,
            }),
          );
        },
        { passive: true },
      );
      return true;
    };

    /* One delegated listener, on the same element mouse-follower uses. Every
       move between elements raises a mouseover somewhere, including the move
       back out onto the page, so leaving is the default branch rather than a
       second listener. */
    const onOver = (e) => {
      if (e.target instanceof HTMLIFrameElement) {
        const frame = e.target;
        if (!seen.has(frame)) {
          seen.add(frame);
          frame.addEventListener("load", () => reach(frame));
        }
        const reached = reach(frame);
        el.classList.toggle("-blind", !reached);
        /* inside the frame there is nothing out here to measure, so the
           cursor goes back to being a cursor */
        if (reached) dress({ type: "default", el: null });
        return;
      }
      el.classList.remove("-blind");
      const hit = resolve(e.target);
      if (hit.type === held.type && hit.el === held.el) return;
      dress(hit);
    };

    /* setStick reads the target's box once, at the moment of hover, so a page
       that scrolls while a control is held leaves the cursor magnetised to
       where that control used to be. Re-reading it costs one rect per scroll
       event, and only while something is actually held. */
    const onScroll = () => {
      if (held.stuck && held.el) cursor.setStick(held.el);
    };

    /* Sit the page crossings out.
     *
     * A crossing photographs the whole viewport, this cursor included, and
     * then slides the picture. Left alone the cursor appears twice for half a
     * second: dimmed in the outgoing photograph, where it stands still, and
     * travelling across the screen with the incoming one.
     *
     * Naming the element so the browser lifts it out of the page's snapshot
     * is the documented answer and it was tried first — measured against the
     * pixels, its own snapshot never paints, with the group's animation left
     * alone or turned off, and with the blend and the containment removed.
     * So the cursor is gone for the crossing whichever way, and the choice is
     * only between gone and gone twice.
     *
     * It leaves the way it leaves the window, which is a thing it already
     * knows how to do, and comes back when the page has landed. data-page-from
     * is on the root element for exactly the length of the crossing — see
     * lib/viewTransition.js — so there is nothing to wire up between them. */
    const crossing = new MutationObserver(() => {
      /* A class of this file's own rather than the library's hidden state.
         Measured: hiding it through the library lasted 240ms and then came
         undone on its own — swapping the page fires the pointer-entered event
         the library listens to for un-hiding, so the cursor let itself back
         in halfway through the crossing. Nothing else writes this one. */
      el.classList.toggle("-crossing", !!root.dataset.pageFrom);
    });
    crossing.observe(root, { attributes: true, attributeFilter: ["data-page-from"] });

    root.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      crossing.disconnect();
      root.removeEventListener("mouseover", onOver);
      window.removeEventListener("scroll", onScroll);
      cursor.destroy();
    };
  }, [canHover]);

  return null;
}
