import timelineImg from "../assets/compass/compass-fig-timeline.webp";
import cardImg from "../assets/compass/compass-fig-card.webp";
import websiteImg from "../assets/compass/compass-fig-website.webp";
import cvmImg from "../assets/compass/compass-fig-cvm.webp";
import balancePathsImg from "../assets/compass/compass-fig-balance-paths.webp";
import systemImg from "../assets/compass/compass-fig-system.webp";
import coverageRoadmapImg from "../assets/compass/compass-fig-coverage-roadmap.webp";

/* Finished artwork for the Compass Card case study, optimized from the
   originals the owner supplied. Each key here replaces the labelled box of
   the same name in CompassPlaceholders.jsx — spread after it in
   CaseStudyPage's FIGURES, so a real figure always wins over its
   placeholder. Everything not listed here is still a placeholder. */
const art = (src, alt) => {
  const C = () => <img src={src} alt={alt} loading="lazy" />;
  C.displayName = `CompassFigure(${alt.slice(0, 24)})`;
  return C;
};

export const COMPASS_ARTWORK = {
  /* 01 Context */
  "compass-fig-timeline": art(
    timelineImg,
    "A timeline of Compass payment: contactless live systemwide on 22 May 2018, modernization bids closed on 20 March 2026, and the system replacement scheduled for late 2030 into early 2031 — eight years of contactless payment behind us, another four to five before the underlying system changes",
  ),
  /* 02 Three Products, No Phone */
  "compass-fig-card": art(
    cardImg,
    "Two reasons the plastic card stays: it is the only route to a discounted fare — $3.50 becomes $2.85 one-zone, $5.10 becomes $4.20 two-zone, $6.70 becomes $5.40 three-zone — and its printed card number and CVN are the only link between the card and an online account, retyped by hand to register, to transfer a card, and for every monthly U-Pass request",
  ),
  "compass-fig-website": art(
    websiteImg,
    "The card can do one thing: tap. Everything else runs through compasscard.ca — registering with the 20-digit card number and 3-digit code, then managing passes, stored value, AutoLoad, refunds and replacement, then adding value and waiting, because the site itself warns a new balance may take up to two hours to be ready for use",
  ),
  "compass-fig-cvm": art(
    cvmImg,
    "A Compass Vending Machine in a station and two of its screens: the first offers Load Compass Card, View Balance, Buy New Compass Card, Buy Single Ticket, Buy Multiple Tickets and Upgrade Your Ticket; the purchase screen notes that a $6.00 deposit is added to a new card and that only adult cards can be purchased at the vending machines. It sells adult cards only — no concession card for seniors, youth and HandyCard holders, so the riders who most need the lower fare cannot buy their card where everyone else buys it, and a concession card means a counter, in person, in counter hours",
  ),
  "compass-fig-balance-paths": art(
    balancePathsImg,
    "Five ways to reach a Compass balance — tapping a reader shows it only, compasscard.ca and the service line reload with up to a two-hour wait, a vending machine reloads instantly but sells no concession card, and a service centre serves you in person — and a sixth, greyed out: your phone, already in your pocket, with no path at all",
  ),
  /* 03 Card-Based by Design */
  "compass-fig-system": art(
    systemImg,
    "Where the balance lives, side by side. Card-based today: the balance sits on the Compass Card, which reaches a reader on a bus or at a gate, and only later a server — the card is the record, a tap works offline, nothing changes until the card meets a reader, so an online reload takes up to two hours to land and an app has nothing real to show, which is why there isn't one. Account-based, what the RFP buys: the balance lives in an account on the server, with the card, a phone app and wallet, and a watch all reading from it — the account is the record, every device shows the real number, a reload lands where the balance lives with no two-hour wait, and an app stops being a copy",
  ),
  /* 04 Scope & Bets */
  "compass-fig-coverage-roadmap": art(
    coverageRoadmapImg,
    "Three phases, ordered by how much permission each needs. Phase 1, TransLink — bus, SkyTrain, SeaBus and West Coast Express, every mode from day one; permission needed: none, because TransLink sets its own fares, a one-zone trip being $2.85 on stored value. Phase 2, BC Ferries — foot passengers only, a $19.10 adult walk-on, the same gesture at nothing like the same amount; permission needed: a partner, though the two already share retail, with vending machines at Tsawwassen and Horseshoe Bay, pre-loaded Compass Cards sold onboard, and TransLink routes named as connections; in v1 the app also shows sailing status, read-only, with vehicle booking sequenced as this partnership's last step. Phase 3, BC Transit's Umo network in Victoria, Kelowna and Whistler — a separate system and a separate fare authority; permission needed: the most, a new agreement across systems, so it waits: roadmap only, with nothing in v1 designed for it. v1 designs the first two. Sequenced, not cut: vehicle booking — a reservation, a vehicle class, deck capacity — is a booking flow, not a tap, and needs the deepest partnership, so it comes last; and the plastic card is not replaced — it stays, deposit and all; this design adds, it does not remove",
  ),
};
