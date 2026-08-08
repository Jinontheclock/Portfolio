import { useEffect, useRef, useState } from "react";

/* The grey block at the right of a Work card, and — for a project that has
   supplied artwork — the pictures that fill it.

   A project with several thumbnails rests on the first and walks the rest
   in order while the pointer is over the card, returning to the first on
   the way out. The frames are stacked and cross-faded rather than swapped,
   so the change reads as one picture turning into the next rather than a
   flicker; they are all in the markup from the start, which is also what
   makes the first hover as quick as the tenth.

   The card, not this box, is what the pointer is over — a card is one link
   — so the hover state is handed down rather than read here.

   Nothing moves for a reader who has asked for less motion, or on a device
   with no pointer to hover with: both rest on the first frame. */

const INTERVAL = 1100;

export default function WorkThumb({ thumbs, alt, hovered }) {
  const [frame, setFrame] = useState(0);
  const timer = useRef(null);

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

  if (!thumbs?.length) return <div className="wk-image" aria-hidden="true" />;

  return (
    /* `is-walking` is the quick cross-fade the walk uses; without it the
       frames take the slower one, which is the colour's own — so when the
       pointer leaves, the last frame dissolving back to the first and the
       colour draining out of it finish together, as one settling rather
       than a snap inside a fade */
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
