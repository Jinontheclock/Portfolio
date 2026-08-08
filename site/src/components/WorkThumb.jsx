import { useEffect, useRef, useState } from "react";

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

   Nothing moves for a reader who has asked for less motion, or on a device
   with no pointer to hover with: both rest on the first frame. */

const INTERVAL = 1100;
/* how long the frames take to cross-fade back; the clip is rewound after
   it, once the resting frame has covered it — see work.css */
const SETTLE = 300;

export default function WorkThumb({ thumbs, video, alt, hovered }) {
  const [frame, setFrame] = useState(0);
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

  /* the clip: plays under the pointer, stops where it is when the pointer
     goes, and goes back to the top once the poster has faded over it */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return undefined;
    clearTimeout(rewind.current);

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
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
  }, [hovered]);

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
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          style={{ opacity: hovered ? 1 : 0 }}
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
