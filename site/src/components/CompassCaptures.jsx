/* The solution-row screens, shot from the app itself rather than exported
   from Figma — the demo at `site/public/compass` is the thing the case study
   is about, so the screens shown are the ones it actually draws.

   Every capture is 402 × 874 logical at deviceScaleFactor 3 (1206 × 2622),
   the status bar pinned to 9:41 and every transition stopped, so a row of
   them reads as one set. They live in `public/` rather than `src/assets/`
   because there are thirty-nine of them and only these seventeen are wired
   to the page; the rest are the record the set was chosen from.

   Registered under the same keys as the placeholders in
   CompassPlaceholders.jsx and spread after them, so a key with a real
   capture wins and a key still waiting keeps its dashed box. */

const AT = `${import.meta.env.BASE_URL}media/compass-card/`;

const shot = (file, alt) => ({ src: `${AT}${file}.png`, alt });

export const COMPASS_CAPTURES = {
  /* 05 — One Tap, Every Ride */
  "compass-shot-wallet-01": shot(
    "22-wallet",
    "Apple Wallet with the Compass card in the pass stack, sitting among the cards already there rather than standing apart from them.",
  ),
  "compass-shot-wallet-02": shot(
    "23-wallet-card",
    "The Compass pass opened in Wallet: the card face, the stored value $12.15, and the buttons to add money or open the app.",
  ),
  "compass-shot-tap-01": shot(
    "05-gate-bus",
    "The gate's own confirmation screen after a bus tap — a green check, Accepted, and $2.85 Deducted · $12.15 Remaining above 1-Zone · Stored value.",
  ),
  "compass-shot-tap-02": shot(
    "04-history-open",
    "The same trip in the app's history, opened: tap in at Main St–Science World, tap out at Waterfront, the fare against the second tap, Balance $12.15, and a link back to the gate screen.",
  ),
  "compass-shot-ferry-01": shot(
    "07-gate-ferry",
    "The gate screen for a BC Ferries walk-on: Accepted, $19.10 Deducted · $5.00 Remaining, under the eyebrow BC FERRIES · WALK-ON.",
  ),
  "compass-shot-ferry-02": shot(
    "06-history-ferry-open",
    "The ferry crossing in history, opened: a single tap in at Tsawwassen terminal at 04:45 PM charging −$19.10, and Balance $5.00 beneath it.",
  ),

  /* 06 — Everything Else the Card Does */
  "compass-shot-balance-01": shot(
    "02-card",
    "The card screen: stored value $12.15 in the largest type on the page, the plastic and Wallet pass named as one balance beneath it, then the two most recent transactions and the tiles that manage the card.",
  ),
  "compass-shot-balance-02": shot(
    "03-history",
    "Full trip history grouped by day, each line naming the zone travelled and the fare charged, so a discounted fare can be read rather than taken on trust.",
  ),
  "compass-shot-reload-01": shot(
    "08-reload",
    "The reload screen with $10, $20 and $50 presets, the payment method on file, and the amount the card will hold once it is done.",
  ),
  "compass-shot-reload-02": shot(
    "34-reload-paid",
    "Reload complete — $20.00 added, and a line stating the money is available at the gate right away rather than in two hours.",
  ),
  "compass-shot-passes-01": shot(
    "12-passes",
    "Buying a pass: Monthly and DayPass side by side with the zone picker, priced from TransLink's own table, all on one screen.",
  ),
  "compass-shot-passes-02": shot(
    "35-passes-paid",
    "The card after the purchase, now carrying Current pass · Monthly · 2-Zone · expires Aug 31 on the card face.",
  ),
  "compass-shot-upass-01": shot(
    "36-upass-typed",
    "Connecting U-Pass BC: the school picked from the participating institutions and the student number typed, over two lines saying there is no 20-digit number to enter and no monthly window to catch.",
  ),
  "compass-shot-upass-02": shot(
    "16-upass-done",
    "The U-Pass connected — the programme card in its gold, the month it covers marked Renewed, and auto-renew left on.",
  ),
  "compass-shot-card-01": shot(
    "18-lost-frozen",
    "A card reported lost and frozen: the button now offers to unfreeze it, and a line states the card stops at the gate right away.",
  ),
  "compass-shot-card-02": shot(
    "20-replace",
    "Ordering a replacement: what moves to the new card, and the note that $25.00 applies to Program pass cards.",
  ),
};
