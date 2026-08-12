import wallet from "../assets/compass/watch/compass-watch-1-wallet.webp";
import reload from "../assets/compass/watch/compass-watch-2-reload.webp";
import reader from "../assets/compass/watch/compass-watch-3-reader.webp";
import deducted from "../assets/compass/watch/compass-watch-4-deducted.webp";
import added from "../assets/compass/watch/compass-watch-5-added.webp";

/* 07 On the Wrist — the watch, cut by cut. Five shots of the running demo
   rather than one exported board: the labels stay real text, and a screen
   can be reshot on its own when the app moves under it.

   The order is the run itself — the card and its number, the three amounts
   a wrist can be reloaded with, the same card held at a reader, the fare
   coming off, and the top-up going on. Read left to right it is one
   session rather than five screenshots. */

const CUTS = [
  {
    src: wallet,
    label: "Wallet",
    note: "the card and the number",
    alt: "Apple Watch, Wallet: the Compass card face over the balance $15.00 and the line Express Mode — the whole screen is the card and its number, with nothing to unlock or open first",
  },
  {
    src: reload,
    label: "Reload",
    note: "three amounts, no keypad",
    alt: "Apple Watch, Reload: Balance $15.00 above three full-width buttons reading +$10, +$20 and +$50 — three presets and no keypad, because an amount cannot be typed on a wrist",
  },
  {
    src: reader,
    label: "At the reader",
    note: "the phone's own words",
    alt: "Apple Watch held at a reader: the same card face and the same $15.00, under the line Hold Near Reader — the wording Apple's own Wallet uses at a reader, kept rather than reworded",
  },
  {
    src: deducted,
    label: "Fare taken",
    note: "what left, what is left",
    alt: "Apple Watch after a tap: a green tick above $2.85 Deducted, and beneath it $12.15 Remaining — what left the card and what is still on it, in that order",
  },
  {
    src: added,
    label: "Topped up",
    note: "confirmed on the wrist",
    alt: "Apple Watch after a top-up: a green tick above +$20.00 Added, and beneath it Balance $35.00 — the reload confirmed where it was started",
  },
];

export default function CompassWatchRow() {
  return (
    <div className="cmp-watch-row">
      {CUTS.map(({ src, label, note, alt }) => (
        <figure className="cmp-watch-cell" key={label}>
          {/* the cut's name above the screen, in the shared label voice;
              the note below keeps only what it shows */}
          <span className="cs-figure-title">{label}</span>
          <img src={src} alt={alt} loading="lazy" />
          <figcaption>{note}</figcaption>
        </figure>
      ))}
    </div>
  );
}
