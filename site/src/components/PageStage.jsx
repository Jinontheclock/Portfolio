import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Routes, useLocation, useNavigationType } from "react-router-dom";
import { beginCrossing, crossing, landPage, raiseTitle, reduced } from "../lib/page-transition.js";
import { holdScroll, recall } from "../lib/scroll-memory.js";
import { onReveal } from "../lib/preloaderBus.js";

/* The two containers a crossing needs, and the one it has the rest of the
 * time.
 *
 * The article this follows (see lib/page-transition.js) clones its page
 * container, fills the clone with the next page's HTML and appends it after
 * the current one, so both pages are in the document while the timeline
 * runs. React Router cannot be asked to do that: it renders the page for
 * the URL and drops the one before in the same commit. But <Routes> takes a
 * location of its own, so this component keeps a location per container
 * and renders the routes twice, once for the page being left and once for
 * the page arriving, and the router's own location only decides which of
 * the two is new. When the crossing is over the first container goes and
 * the second is what is left.
 *
 * Nothing here is skipped for a touch screen except the browser's own back:
 * a phone's back is an edge swipe that Safari draws its own slide for, and
 * ours would be a second one underneath. A reader who asked for less motion
 * gets the page simply changing, the bargain every animation here keeps.
 */
const hover = () => !!window.matchMedia?.("(hover: hover)").matches;

let ids = 0;

export default function PageStage({ booting, children }) {
  const location = useLocation();
  const navigationType = useNavigationType();
  /* the page in the flow, and the page mounted after it while one is
     arriving; the second takes the flow the moment the crossing starts,
     and the first is lifted out of it (see beginCrossing) */
  const [shown, setShown] = useState(() => ({ id: ids, location }));
  const [staged, setStaged] = useState(null);
  const shownEl = useRef(null);
  const stagedEl = useRef(null);
  const stagedNow = useRef(null);
  stagedNow.current = staged;
  /* the crossing in flight, the scroll hold in flight, and the offset a
     page put straight in the flow is to open at */
  const run = useRef(null);
  const hold = useRef(null);
  /* the shown page's entrance, while its hero is still rising */
  const title = useRef(null);
  const landing = useRef(navigationType === "POP" ? (recall(location.key) ?? 0) : 0);
  /* whether the crossing is being ended from inside a React effect, where
     flushSync is not allowed and not needed: React flushes an update made
     in a layout effect before it paints */
  const inEffect = useRef(false);

  /* The crossing is over: the container that was lifted out goes, and the
     one that took the flow is the page. */
  const settle = () => {
    const page = stagedNow.current;
    const swap = () => {
      setShown(page);
      setStaged(null);
    };
    if (inEffect.current) swap();
    else flushSync(swap);
  };

  /* A new location. Either stage the page for a crossing, or, when there is
     nothing to cross, simply show it. */
  useLayoutEffect(() => {
    const latest = (stagedNow.current ?? shown).location;
    if (location.key === latest.key) return;
    /* POP is the back and forward buttons and the gestures that mean them,
       which return to a remembered place. PUSH and REPLACE are the reader
       choosing something new, which opens at the top. */
    const target = navigationType === "POP" ? (recall(location.key) ?? 0) : 0;
    hold.current?.();
    hold.current = null;
    /* a crossing still running ends now, and the page it was bringing in
       is the page this one leaves */
    if (run.current) {
      inEffect.current = true;
      run.current.finish();
      inEffect.current = false;
    }
    /* a hero still rising is put where it was going before the page it
       is on is lifted out, or the page leaves with no hero on it */
    title.current?.finish();
    title.current = null;
    const animate =
      crossing(latest.pathname, location.pathname) &&
      !reduced() &&
      !(navigationType === "POP" && !hover());
    if (animate) {
      setStaged({ id: ++ids, location, target });
    } else {
      landing.current = target;
      setShown({ id: ++ids, location });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  /* A page has just been put straight in the flow, on first load or on a
     plain swap: the window goes where it belongs before anything is
     painted, and is held there while the page grows. A page arriving in a
     crossing is landed by the crossing itself. */
  useLayoutEffect(() => {
    const y = landing.current;
    if (y == null) return;
    landing.current = null;
    landPage(y);
    hold.current?.();
    hold.current = holdScroll(y);
  }, [shown.id]);

  /* The second container is in the DOM: start the crossing. */
  useLayoutEffect(() => {
    if (!staged) return undefined;
    run.current = beginCrossing(shownEl.current, stagedEl.current, {
      scroll: staged.target,
      onDone: () => {
        run.current = null;
        settle();
      },
    });
    title.current = run.current.title;
    hold.current?.();
    hold.current = holdScroll(staged.target);
    return () => {
      run.current?.kill();
      run.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staged?.id]);

  /* The first page of a visit gets the entrance too, if it is the landing:
     the hero waits under the bottom edge while the boot cover is up, and
     rises as the cover lifts. */
  useLayoutEffect(() => {
    if (reduced()) return undefined;
    const first = raiseTitle(shownEl.current, { paused: true });
    if (!first) return undefined;
    title.current = first;
    if (!booting) {
      first.play();
      return () => first.kill();
    }
    const off = onReveal(() => first.play());
    return () => {
      off();
      first.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="page" key={shown.id} ref={shownEl}>
        <Routes location={shown.location}>{children}</Routes>
      </div>
      {staged && (
        <div className="page" key={staged.id} ref={stagedEl}>
          <Routes location={staged.location}>{children}</Routes>
        </div>
      )}
    </>
  );
}
