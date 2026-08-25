import { useEffect, useRef, useState } from "react";
import { isCovered, onCover, onReveal } from "../lib/preloaderBus.js";

/* The block at the right of a Work card, and — for a project that has
   supplied artwork — what fills it.

   Two kinds of artwork, one behaviour. A project with several stills rests
   on the first and walks the rest in order while the pointer is over the
   card; a project with a clip rests on its first frame and plays while the
   pointer is there. Either way what is underneath is always the resting
   picture, and what changes is which layer is opaque — so leaving is a
   cross-fade back rather than a cut, and the clip can be stopped and
   rewound behind a frame that is already covering it.

   The card, not this box, is what the pointer is over — a card is one link
   — so the hover state is handed down rather than read here.

   A device with no pointer has no hover to start any of this with, so a
   clip plays itself instead: it starts when the thumbnail is half on
   screen, runs once, and stays on its last frame. That is the whole
   difference — a phone gets one play-through of what a pointer would have
   asked for, not a loop running in the corner of the page while the
   reader is somewhere else.

   Nothing moves for a reader who has asked for less motion. */

const INTERVAL = 1100;
/* how long the frames take to cross-fade back; the clip is rewound after
   it, once the resting frame has covered it — see work.css */
const SETTLE = 300;
/* how much of the thumbnail has to be on screen before a self-playing clip
   starts: half of it, so it begins when the card is being looked at rather
   than when its top edge first clips into the viewport */
const IN_VIEW = 0.5;

/* Read once per mount rather than watched: a device does not grow a
   pointer mid-session, and the two paths below are different enough that
   swapping between them mid-play would be worse than not swapping. */
const hoverCapable = () => window.matchMedia?.("(hover: hover)").matches ?? true;
const reducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

export default function WorkThumb({ thumbs, video, alt, hovered }) {
  const [frame, setFrame] = useState(0);
  /* a self-playing clip has started, so it is the picture now — this never
     goes back to false, which is what leaves the last frame standing */
  const [selfPlayed, setSelfPlayed] = useState(false);
  const [canHover] = useState(hoverCapable);
  const timer = useRef(null);
  const videoRef = useRef(null);
  const rewind = useRef(null);

  /* the walk: only for a set of stills, and only while hovered */
  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    if (!hovered || !thumbs || thumbs.length < 2) {
      /* the walk stops where it is and the first frame comes back over it
         — the fade is the stop, so there is nothing to wind down */
      setFrame(0);
      return undefined;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    timer.current = setInterval(
      () => setFrame((f) => (f + 1) % thumbs.length),
      INTERVAL,
    );
    return () => clearInterval(timer.current);
  }, [hovered, thumbs]);

  /* the clip, where there is a pointer: plays under it, stops where it is
     when the pointer goes, and goes back to the top once the poster has
     faded over it */
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !canHover) return undefined;
    clearTimeout(rewind.current);

    const reduced = reducedMotion();
    if (hovered && !reduced) {
      /* React drops the muted attribute from the rendered DOM, and an
         unmuted play() is refused — so it is set here, on the element */
      el.muted = true;
      el.play().catch(() => {});
      return undefined;
    }
    el.pause();
    rewind.current = setTimeout(() => {
      try {
        el.currentTime = 0;
      } catch {
        /* not seekable yet — it is already at 0 */
      }
    }, SETTLE);
    return () => clearTimeout(rewind.current);
  }, [hovered, canHover]);

  /* the clip, where there is no pointer: one play-through, started by the
     thumbnail coming into view.

     The playhead only advances while the thumbnail is actually on screen,
     so a reader who scrolls straight past does not burn the play unseen —
     they get the rest of it when they come back. `ended` is what makes it
     a play-through rather than a loop: once the clip finishes, nothing
     starts it again and its last frame is what the card shows.

     The count-up cover is checked too. On a cold load of Work the cards
     are laid out behind it, so without this the clips would run to the
     end under an opaque sheet and the reader would arrive at four cards
     already over. */
  useEffect(() => {
    const el = videoRef.current;
    if (!el || canHover || reducedMotion()) return undefined;

    let onScreen = false;
    let ended = false;
    const play = () => {
      if (ended || !onScreen || isCovered()) return;
      /* React drops the muted attribute from the rendered DOM, and an
         unmuted play() is refused — so it is set here, on the element */
      el.muted = true;
      el.play().catch(() => {});
      setSelfPlayed(true);
    };
    const onEnded = () => {
      ended = true;
    };
    el.addEventListener("ended", onEnded);
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen) play();
        else el.pause();
      },
      { threshold: IN_VIEW },
    );
    io.observe(el);
    /* no rewind on cover, unlike the case-study heroes: this one is not
       replayed, so winding it back would only lose whatever the reader had
       already watched */
    const offCover = onCover(() => el.pause());
    const offReveal = onReveal(play);
    return () => {
      io.disconnect();
      el.removeEventListener("ended", onEnded);
      offCover();
      offReveal();
    };
  }, [canHover]);

  if (video) {
    /* the poster underneath is the resting picture; the clip fades over it
       at the same speed the colour arrives, so the two read as one */
    return (
      <div className="wk-image">
        <img className="wk-frame" src={video.poster} alt={alt} loading="lazy" />
        <video
          ref={videoRef}
          className="wk-frame"
          muted
          /* a pointer can hold the card as long as it likes, so that path
             keeps looping; the self-playing one runs once by definition */
          loop={canHover}
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          style={{ opacity: hovered || selfPlayed ? 1 : 0 }}
        >
          {video.sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      </div>
    );
  }

  if (!thumbs?.length) return <div className="wk-image" aria-hidden="true" />;

  /* `is-walking` is the quick cross-fade the walk uses; without it the
     frames take the slower one, which is the colour's own — so when the
     pointer leaves, the last frame dissolving back to the first and the
     colour draining out of it finish together, as one settling rather
     than a snap inside a fade */
  return (
    <div className={hovered ? "wk-image is-walking" : "wk-image"}>
      {thumbs.map((src, i) => (
        <img
          key={src}
          className="wk-frame"
          src={src}
          /* one description for the set: the frames are the same subject
             from three angles, and a reader stepping through three near
             identical alt texts learns nothing from the second and third */
          alt={i === 0 ? alt : ""}
          aria-hidden={i === 0 ? undefined : "true"}
          loading="lazy"
          style={{ opacity: i === frame ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
