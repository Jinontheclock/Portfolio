import { useEffect, useRef, useState } from "react";
import { isCovered, onCover, onReveal } from "../lib/preloaderBus.js";

/* The devices on a Work card. Each one is either a picture with the
   screens already in it (`image`), or its frame — the mockup as an image
   with the screen open — over a clip of the screen itself, cropped to the
   hole. The frame's own alpha is what lets the phone stand on the card's
   colour; the clip stays plain opaque video, which every browser plays,
   where a clip with alpha in it would be Chrome's alone. `screen` says
   where the hole is as fractions of the frame, so the clip lands in it by
   the same numbers at every size, and `mask` is the hole's own shape, laid
   over the clip: the clip is a rectangle, the screen's corners are not,
   and on a rounded body the rectangle's corners would show past it.

   The clips rest on their first frame and play while the pointer is over
   the card, or while the card is on the stage — a card is one link, so the
   hover is handed down rather than read here. Leaving pauses them where
   they are, and they go back to the top once the posters have faded over
   them, so the rewind is never seen.

   A device with no pointer has no hover to start any of this with, so the
   clips play themselves instead: once, from when the mockups are half on
   screen, and they stay on their last frame. Nothing moves for a reader
   who has asked for less motion. */

/* how long the posters take to fade back over the clips; the clips are
   rewound after it — see work.css */
const SETTLE = 300;
/* how much of the mockups has to be on screen before the self-playing
   clips start: half, so they begin when the card is being looked at rather
   than when its top edge first clips into the viewport */
const IN_VIEW = 0.5;

/* Read once per mount rather than watched: a device does not grow a
   pointer mid-session, and the two paths below are different enough that
   swapping between them mid-play would be worse than not swapping. */
const hoverCapable = () => window.matchMedia?.("(hover: hover)").matches ?? true;
const reducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

const pct = (f) => `${(f * 100).toFixed(2)}%`;

export default function WorkMockups({ mockups, alt, hovered }) {
  /* the self-playing clips have started, so they are the picture now —
     this never goes back to false, which is what leaves the last frame
     standing */
  const [selfPlayed, setSelfPlayed] = useState(false);
  const [canHover] = useState(hoverCapable);
  const rootRef = useRef(null);
  const rewind = useRef(null);
  const videos = () => [...(rootRef.current?.querySelectorAll("video") ?? [])];

  /* with a pointer: the clips play under it, stop where they are when it
     goes, and go back to the top once the posters have faded over them */
  useEffect(() => {
    if (!canHover) return undefined;
    clearTimeout(rewind.current);
    const els = videos();
    if (hovered && !reducedMotion()) {
      els.forEach((el) => {
        /* React drops the muted attribute from the rendered DOM, and an
           unmuted play() is refused — so it is set here, on the element */
        el.muted = true;
        el.play().catch(() => {});
      });
      return undefined;
    }
    els.forEach((el) => el.pause());
    rewind.current = setTimeout(() => {
      els.forEach((el) => {
        try {
          el.currentTime = 0;
        } catch {
          /* not seekable yet — it is already at 0 */
        }
      });
    }, SETTLE);
    return () => clearTimeout(rewind.current);
  }, [hovered, canHover]);

  /* without one: one play-through, started by the mockups coming into view.

     The playheads only advance while the mockups are actually on screen,
     so a reader who scrolls straight past does not burn the play unseen —
     they get the rest of it when they come back. `ended` is what makes it
     a play-through rather than a loop: a clip that has finished is not
     started again, and its last frame is what the phone shows.

     The count-up cover is checked too. On a cold load of Work the cards
     are laid out behind it, so without this the clips would run to the
     end under an opaque sheet and the reader would arrive at cards
     already over. */
  useEffect(() => {
    if (canHover || reducedMotion()) return undefined;
    const root = rootRef.current;
    const els = videos();
    if (!root || !els.length) return undefined;

    let onScreen = false;
    const ended = new Set();
    const play = () => {
      if (!onScreen || isCovered()) return;
      els.forEach((el) => {
        if (ended.has(el)) return;
        el.muted = true;
        el.play().catch(() => {});
      });
      setSelfPlayed(true);
    };
    const onEnded = (e) => ended.add(e.target);
    els.forEach((el) => el.addEventListener("ended", onEnded));
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen) play();
        else els.forEach((el) => el.pause());
      },
      { threshold: IN_VIEW },
    );
    io.observe(root);
    /* no rewind on cover, unlike the case-study heroes: these are not
       replayed, so winding them back would only lose whatever the reader
       had already watched */
    const offCover = onCover(() => els.forEach((el) => el.pause()));
    const offReveal = onReveal(play);
    return () => {
      io.disconnect();
      els.forEach((el) => el.removeEventListener("ended", onEnded));
      offCover();
      offReveal();
    };
  }, [canHover]);

  const playing = hovered || selfPlayed;
  return (
    /* one picture for a reader: the devices are the same subject twice
       over, and the frames and clips inside carry no text of their own */
    <div className="wk-mockups" ref={rootRef} role="img" aria-label={alt}>
      {/* the row is its own box inside the cell so that it can be sized
          from the cell's width — see .wk-mockup-row in work.css */}
      <div className="wk-mockup-row">
      {mockups.map((m) => {
        if (m.image) {
          return (
            <div
              key={m.image}
              className="wk-mockup"
              style={{ aspectRatio: `${m.ratio[0]} / ${m.ratio[1]}` }}
            >
              <img className="wk-mockup-frame" src={m.image} alt="" loading="lazy" />
            </div>
          );
        }
        const [x, y, w, h] = m.screen;
        return (
          <div
            key={m.frame}
            className="wk-mockup"
            style={{ aspectRatio: `${m.ratio[0]} / ${m.ratio[1]}` }}
          >
            {/* the poster underneath is the resting picture; the clip
                fades over it */}
            <div
              className="wk-mockup-screen"
              style={{
                left: pct(x),
                top: pct(y),
                width: pct(w),
                height: pct(h),
                maskImage: `url(${m.mask})`,
                WebkitMaskImage: `url(${m.mask})`,
              }}
            >
              <img src={m.poster} alt="" loading="lazy" />
              <video
                muted
                /* a pointer can hold the card as long as it likes, so that
                   path keeps looping; the self-playing one runs once */
                loop={canHover}
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex={-1}
                style={{ opacity: playing ? 1 : 0 }}
              >
                {m.sources.map((s) => (
                  <source key={s.src} src={s.src} type={s.type} />
                ))}
              </video>
            </div>
            <img className="wk-mockup-frame" src={m.frame} alt="" loading="lazy" />
          </div>
        );
      })}
      </div>
    </div>
  );
}
