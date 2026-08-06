import timelineImg from "../assets/compass/compass-fig-timeline.webp";
import cardImg from "../assets/compass/compass-fig-card.webp";
import websiteImg from "../assets/compass/compass-fig-website.webp";
import cvmImg from "../assets/compass/compass-fig-cvm.webp";
import balancePathsImg from "../assets/compass/compass-fig-balance-paths.webp";
import systemImg from "../assets/compass/compass-fig-system.webp";
import iaImg from "../assets/compass/compass-fig-ia.webp";
import coverageRoadmapImg from "../assets/compass/compass-fig-coverage-roadmap.webp";
import typeImg from "../assets/compass/compass-fig-type.webp";
import colourImg from "../assets/compass/compass-fig-colour.webp";
import componentImg from "../assets/compass/compass-fig-component.webp";
import { useEffect, useRef } from "react";
import CompassLofiBoard from "./CompassLofiBoard.jsx";
import CompassWatchRow from "./CompassWatchRow.jsx";

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

/* The tap confirmation, moving. The clip is the phone's whole screen, so it
   is shown at the phone's proportions and capped narrow rather than run to
   the column width — a 2.82s loop whose first and last frames are the same
   pixels, so the seam cannot be seen.
   It plays only while it is on screen, and a reader who has asked for less
   motion gets the still the poster already holds: the confirmation, which
   is the part the figure is about. */
const TAP_MOTION = `${import.meta.env.BASE_URL}media/compass-card/compass-tap-motion.mp4`;
const TAP_MOTION_POSTER = `${import.meta.env.BASE_URL}media/compass-card/compass-tap-motion-poster.jpg`;

function TapMotionFigure() {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        video.muted = true;
        video.play().catch(() => {});
      } else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="cs-compass-motion"
      src={TAP_MOTION}
      poster={TAP_MOTION_POSTER}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="The tap confirmation opening and closing: the history row unfolds to show the two taps, what the card was left holding, and the way back to the gate screen, then folds away again"
    />
  );
}

export const COMPASS_ARTWORK = {
  /* 05 One Tap, Every Ride */
  "compass-fig-tap-motion": TapMotionFigure,

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
  "compass-fig-ia": art(
    iaImg,
    "Three products today, collapsing into two layers. On the left: the card — a $6 refundable deposit, never expires, the only route to a discounted fare; the website, compasscard.ca — balance, reload, passes, autoload, transfer, replacement, all behind a sign-in and two hours away; the vending machine — instant reload, sells cards but no concession card; and, dashed in, the phone call — questions, refunds, a sailing's status. On the right: Layer 1, what you tap, in three seconds, in the rain, with one hand — the Wallet pass with Express Mode, a tap from the watch, balance at a glance, power reserve when the battery dies, and nothing that asks you to read. Layer 2, manage, check, ask, which takes as long as it needs — manage covers reload and autoload, passes, U-Pass renewal, trip history, a lost card and moving the balance across all cards; check is a sailing's status, read-only; ask is an in-app assistant first, a person for the rest, with the phone line and the counter both staying. The card, the machine, the line and the counter all stay: this design adds, it does not remove, and vehicle booking is a later phase on the roadmap",
  ),
  "compass-fig-coverage-roadmap": art(
    coverageRoadmapImg,
    "Three phases, ordered by how much permission each needs. Phase 1, TransLink — bus, SkyTrain, SeaBus and West Coast Express, every mode from day one; permission needed: none, because TransLink sets its own fares, a one-zone trip being $2.85 on stored value. Phase 2, BC Ferries — foot passengers only, a $19.10 adult walk-on, the same gesture at nothing like the same amount; permission needed: a partner, though the two already share retail, with vending machines at Tsawwassen and Horseshoe Bay, pre-loaded Compass Cards sold onboard, and TransLink routes named as connections; in v1 the app also shows sailing status, read-only, with vehicle booking sequenced as this partnership's last step. Phase 3, BC Transit's Umo network in Victoria, Kelowna and Whistler — a separate system and a separate fare authority; permission needed: the most, a new agreement across systems, so it waits: roadmap only, with nothing in v1 designed for it. v1 designs the first two. Sequenced, not cut: vehicle booking — a reservation, a vehicle class, deck capacity — is a booking flow, not a tap, and needs the deepest partnership, so it comes last; and the plastic card is not replaced — it stays, deposit and all; this design adds, it does not remove",
  ),
  /* 05 The Visual System */
  "compass-fig-type": art(
    typeImg,
    "FF Meta — three weights, seven steps. A lettering diagram marks cap height, x-height, baseline and descender, with Book, Medium and Bold the only three weights in the product. The scale as the app speaks it: $15.00, My Compass Card, Current pass, Monthly · 2-Zone, Your tap uses this pass, Plastic + Wallet pass · one balance, Stored value · Jul 28 — labelled Display 34/40 −0.4 Bold, Title 28/34 −0.3 Bold, Heading 24/30 −0.2 Medium, Subhead 20/26 0 Medium, Body 17/24 0 Book, Callout 14/20 +0.1 Book, Caption 12/16 +0.2 Medium, each mapped to its Apple text style. A table shows every step at base size, ×1.4 and ×2.0 — body 17 becoming 23.8 and 34 — against the requirement that text enlarge to 200%, and tabular lining figures keep $15.00 and $23.15 the same width, so the balance does not shift when it changes",
  ),
  "compass-fig-colour": art(
    colourImg,
    "Nine blues, three states, every pair measured. The Compass blue ramp runs 100 #D9EEFC to 900 #03223D with three anchor blues sampled from public Compass materials and the remaining six derived — not an official TransLink palette. Beside it, the neutrals: background #FAFAFA, panel #FFFFFF, divider #E8E8E8, divider strong #D4D4D4, secondary text #6B6B6B, ink #1A1A1A; and the three states: Paid green #146B45, Low balance amber #7A4F00, Declined red #B3261E. A table computes every pairing against WCAG — ink on panel 17.40 AAA, blue 600 on panel 6.67 AA, blue 500 on background 4.32 fails for body text, divider strong 1.48 decorative only. The rules beneath: blue as text starts at 600, 400 and lighter are fills and icons never text, navy 800 is a surface not a foreground, hero amounts wear ink not brand, status ships as colour + icon + word and never colour alone",
  ),
  "compass-fig-component": art(
    componentImg,
    "One card component in its five owned states, labelled as drawn: DEFAULT — My Compass Card, Plastic + Wallet pass · one balance, stored value $15.00, Monthly · 2-Zone pass; LOW BALANCE — the same card with an olive warning band reading Low balance and $1.15 of stored value; PASS EXPIRING — the U-Pass BC card in program navy with a band reading Expires in 3 days, valid August, UBC; PASS EXPIRED — the same U-Pass with a red band reading Pass expired; and REPORTED LOST — the Compass card with a red band reading Reported lost. A note underneath: ready, reading and paid at the reader are Apple's Express Mode UI, not redesigned here — these five are the states the app owns",
  ),
  /* composed in code from twelve separate frames, not a flat export */
  "compass-fig-wireframes": CompassLofiBoard,
  /* 07 On the Wrist — five cuts of the running demo, composed here */
  "compass-fig-watch": CompassWatchRow,
};
