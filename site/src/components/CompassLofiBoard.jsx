import { useRef } from "react";
import walletPass from "../assets/compass/lofi/compass-lofi-wallet-pass.webp";
import tapConfirmed from "../assets/compass/lofi/compass-lofi-tap-confirmed.webp";
import ferryTap from "../assets/compass/lofi/compass-lofi-ferry-tap.webp";
import watchBalance from "../assets/compass/lofi/compass-lofi-watch-balance.webp";
import watchQuickCharge from "../assets/compass/lofi/compass-lofi-watch-quick-charge.webp";
import home from "../assets/compass/lofi/compass-lofi-home.webp";
import reload from "../assets/compass/lofi/compass-lofi-reload.webp";
import passes from "../assets/compass/lofi/compass-lofi-passes.webp";
import upass from "../assets/compass/lofi/compass-lofi-upass.webp";
import lostCard from "../assets/compass/lofi/compass-lofi-lost-card.webp";
import sailingStatus from "../assets/compass/lofi/compass-lofi-sailing-status.webp";
import assistant from "../assets/compass/lofi/compass-lofi-assistant.webp";

/* 04 Scope & Bets — the lo-fi board: twelve frames, laid out in the two
   layers the IA figure above just established. The frames come in one file
   each, so the board is composed here rather than exported flat: the labels
   stay real text (readable, selectable, translatable) and the frames can be
   swapped one at a time as they become hi-fi in chapters 05 to 07. */

/* the two rows, named once under the title rather than over each row:
   the wrist is the tap layer too, another device closing its row */
const LEGEND =
  "Top row, Layer 1: what you tap, on the phone and on the wrist. Bottom row, Layer 2: what you manage, check and ask.";

const FRAMES_1 = [
  {
    src: walletPass,
    label: "Wallet pass",
    note: "no unlock, the pass itself",
    alt: "Lo-fi phone frame: a Compass card face reading $15.00 with Express Mode ready, and the line hold near reader",
  },
  {
    src: tapConfirmed,
    label: "Tap confirmed",
    note: "the reader's own words, kept",
    alt: "Lo-fi phone frame: a confirmation tick over $2.50 Deducted and $12.50 Remaining",
  },
  {
    src: ferryTap,
    label: "Ferry tap",
    note: "same gesture, different authority",
    alt: "Lo-fi phone frame: a BC Ferries walk-on tag, a confirmation tick, and $19.10 for an adult foot passenger",
  },
];

const FRAMES_WRIST = [
  {
    src: watchBalance,
    label: "Watch: balance",
    watch: true,
    note: "the number, nothing else",
    alt: "Lo-fi watch frame: Compass, $15.00, ready to tap",
  },
  {
    src: watchQuickCharge,
    label: "Watch: quick charge",
    watch: true,
    note: "reload without the phone",
    alt: "Lo-fi watch frame: Quick charge, with three amounts to add",
  },
];

const FRAMES_2 = [
  {
    src: home,
    label: "Home",
    note: "balance first; the rest, one tap",
    alt: "Lo-fi phone frame: Balance $15.00, autoload off, and a Reload button",
  },
  {
    src: reload,
    label: "Reload",
    note: "the 2-hour wait becomes none",
    alt: "Lo-fi phone frame: Reload amounts with $50 selected, the line lands on the account — no two-hour wait, and an Add $50 button",
  },
  {
    src: passes,
    label: "Passes",
    note: "what you have, when it ends",
    alt: "Lo-fi phone frame: Passes, a Monthly two-zone pass expiring Jul 31 with a progress bar",
  },
  {
    src: upass,
    label: "U-Pass",
    note: "one switch replaces the loop",
    alt: "Lo-fi phone frame: U-Pass BC with auto-renew switched on, August renewed, and the note no 20-digit number, no monthly window",
  },
  {
    src: lostCard,
    label: "Lost card",
    note: "the balance survives the card",
    alt: "Lo-fi phone frame: Lost card, with Freeze card and Move balance, and the note the money lives on the account, not the card",
  },
  {
    src: sailingStatus,
    label: "Sailing status",
    note: "the info, not the booking",
    alt: "Lo-fi phone frame: BC Ferries sailings, Tsawwassen to Swartz Bay at 3:00 PM, on time, next 5:00 PM, tagged read-only, no booking",
  },
  {
    src: assistant,
    label: "Assistant",
    note: "simple ones first, then a person",
    alt: "Lo-fi phone frame: Help — balance, passes, refunds, ask here; a question asking where's my refund, answered processing, three to five days, above a Talk to a person button",
  },
];

function Frame({ src, label, note, alt, watch }) {
  /* the note rides with the pointer: written straight to the element on
     every move, which is nothing for React to render */
  const shotRef = useRef(null);
  const noteRef = useRef(null);
  const follow = (e) => {
    const shot = shotRef.current;
    const el = noteRef.current;
    if (!shot || !el) return;
    const r = shot.getBoundingClientRect();
    el.style.left = `${e.clientX - r.left}px`;
    el.style.top = `${e.clientY - r.top}px`;
  };
  return (
    <figure
      className={"cmp-lofi-cell" + (watch ? " cmp-lofi-cell--watch" : "")}
      onMouseMove={follow}
    >
      <span className="cmp-lofi-shot" ref={shotRef}>
        {/* twelve frames at eight kilobytes each: waiting for them to be
            scrolled to would leave the right of the strip blank on the way
            in, which reads as the row having run out rather than loading */}
        <img src={src} alt={alt} decoding="async" />
        {/* the note, under the pointer while it is on the frame — a line of
            text on a blur, no box. The caption below carries the same words
            for a reader with no pointer to hover, and for the outline. */}
        <span className="cmp-lofi-note" aria-hidden="true" ref={noteRef}>
          {note}
        </span>
      </span>
      <figcaption>
        <b>{label}</b>
        <span>{note}</span>
      </figcaption>
    </figure>
  );
}

export default function CompassLofiBoard() {
  /* two rows, one a layer: what you tap — the three phones, then the two
     watches, another device but the same layer, read after the phones —
     over what you manage, check and ask */
  const rows = [[...FRAMES_1, ...FRAMES_WRIST], FRAMES_2];

  return (
    <div className="cmp-lofi">
      <p className="cmp-lofi-title">Lo-fi: the first pass</p>
      <p className="cmp-lofi-sub">
        <span>
          Twelve frames, one board. These decide structure, not style. Most become hi-fi screens
          in chapters 05 to 07.
        </span>
        <span>{LEGEND}</span>
      </p>

      <div className="cmp-lofi-layers">
        {rows.map((row, r) => (
          <div key={r} className="cmp-lofi-row">
            {row.map((f) => (
              <Frame key={f.label} {...f} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
