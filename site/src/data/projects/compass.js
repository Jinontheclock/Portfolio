/* Compass Card — 8 chapters, 90 blocks. Structure and copy are final;
   every figure and solution screen is a labelled placeholder until the
   artwork lands (see CompassPlaceholders.jsx). */
const COMPASS_SECTIONS = [
  {
    id: "context",
    label: "01 Context",
    blocks: [
      {
        type: "p",
        text: "TransLink runs the transit system for Metro Vancouver — buses, SkyTrain, SeaBus and the West Coast Express. In 2025 it carried 237.6 million passenger journeys across 396.3 million boardings. That was 1.5% down on the year before: the first annual decline TransLink has reported.",
      },
      {
        type: "figure",
        graphic: "compass-fig-timeline",
        caption:
          "Eight years of contactless payment, and a system replacement that lands in 2031.",
      },
      {
        type: "p",
        text: "Contactless payment is not new here. TransLink switched it on across the whole system on 22 May 2018, the first agency in Canada to accept Interac Debit systemwide. Tap-to-pay has grown every year since — from over 10 million taps in 2019 to more than 25 million in 2025.",
      },
      {
        type: "p",
        text: "And the system underneath is being replaced. Compass Modernization went to tender with a preliminary budget of $507 million, bids closed on 20 March 2026, and delivery is scheduled for late 2030 into early 2031. The RFP asks for something specific: an account-based system handling both closed-loop and open-loop fares.",
      },
      {
        type: "quote",
        text: "From customer feedback, we're exploring options such as digital Compass Cards, a TransLink mobile payment app, and incentives and rewards for using transit.",
        cite: "TransLink, Customer Experience Action Plan 2026–2030",
      },
      {
        type: "p",
        text: "So Apple Pay already works, and the system it runs on has already been put out to tender. Which leaves the question this project is about: what is actually missing, and why is now the moment to design it?",
      },
    ],
  },
  {
    id: "surfaces",
    label: "02 Three Products, No Phone",
    blocks: [
      {
        type: "p",
        text: "Compass today is three products: a card in your pocket, a website you sign in to, and a machine in the station. Every rider moves between all three, and each one holds a different part of the job — while the phone in that same pocket holds none of it.",
      },
      {
        type: "p",
        text: "Who is this for? Everyone the three surfaces already serve: commuters on stored value, the students who renew a U-Pass by hand each month, the concession riders who cannot buy their card from a machine, and visitors who arrive with a phone and no card. No interviews sit behind this project, and I found no published breakdown of riders by segment — so there is no segment chart here. Where a number exists this case study uses it; where it does not, nothing is invented.",
      },
      { type: "h", text: "The card", tag: "Surface 01" },
      {
        type: "p",
        text: "The card costs a $6 refundable deposit and never expires. It is also the only way to pay a discounted fare: from 1 July 2026 a one-zone trip is $2.85 on stored value against $3.50 in cash or on a contactless bank card — a gap of $0.65, rising to $0.90 across two zones and $1.30 across three. TransLink's own fare page puts it plainly: for a discounted fare, use a Compass Card. And if you tap a wallet that also holds a bank card, the reader may take the wrong one, so the standing guidance is to tap only your Compass Card.",
      },
      {
        type: "figure",
        graphic: "compass-fig-card",
        caption:
          "The card, front and back: the fare gap that keeps it in every pocket, and the two numbers that link it to your account.",
      },
      { type: "h", text: "The website", tag: "Surface 02" },
      {
        type: "p",
        text: "Everything you might want to know or change about that card lives at compasscard.ca — balance, reload, passes, autoload, card transfer, lost-card replacement. None of it happens where the card is: every change means a browser and a sign-in, and a reload made online or over the phone still takes up to two hours to reach the card. Replacing a Program pass card costs $25.",
      },
      {
        type: "figure",
        graphic: "compass-fig-website",
        caption:
          "compasscard.ca, annotated. Every task the card cannot do by itself sits behind this sign-in.",
      },
      { type: "h", text: "The vending machine", tag: "Surface 03" },
      {
        type: "p",
        text: "The machines in stations sell cards and take reloads instantly. But they cannot sell a concession card — the discounted card for seniors, youth and HandyCard holders is not available from a vending machine at all. The riders who most need the lower fare are the ones who cannot buy the card where everyone else buys it.",
      },
      {
        type: "figure",
        graphic: "compass-fig-cvm",
        caption: "A Compass Vending Machine. Instant reloads, and no concession card.",
      },
      { type: "h", text: "Five ways to check one number" },
      {
        type: "p",
        text: "There are five ways to find out how much is on a Compass Card: tap it on a reader, sign in to compasscard.ca, use a vending machine, call the service line, or visit a service centre. There is no sixth. And for the roughly 140,000 students a month on a U-Pass BC, the routine is heavier still: request the pass by hand from the 16th of each month, type a 20-digit card number and a 3-digit verification number, then wait up to 24 hours for it to activate. There is no autoload, and no refund if you forget.",
      },
      {
        type: "figure",
        graphic: "compass-fig-balance-paths",
        caption:
          "Five paths to one number — and the one that doesn't exist.",
      },
    ],
  },
  {
    id: "architecture",
    label: "03 Card-Based by Design",
    blocks: [
      {
        type: "p",
        text: "The absence of an app is not an oversight. It is what the architecture allows.",
      },
      {
        type: "figure",
        graphic: "compass-fig-system",
        caption:
          "Where the money sits. On a card-based system the balance lives in the chip; on an account-based one it lives on a server.",
      },
      {
        type: "p",
        text: "On a card-based system the balance lives in the chip in your hand. The card is the record. That makes the tap fast and tolerant of a dead network — a reader on a bus does not need to reach a server to charge you — but it also means nothing can change the balance until the card physically meets a reader. It is why a reload takes two hours to land. It is also why there is no app: an app could only ever show a copy of a number it cannot reach.",
      },
      {
        type: "quote",
        text: "We're not going to have a Compass app anytime soon.",
        cite: "Kevin Desmond, then CEO of TransLink, 30 December 2019",
      },
      { type: "h", text: "The agency's own admission" },
      {
        type: "p",
        text: "That was 2019. The Compass Modernization RFP that closed in March 2026 asks for exactly the architecture this chapter has been describing: account-based, closed-loop and open-loop alike. Read plainly, that is the agency writing down that the current architecture is the constraint — and buying its way out of it.",
      },
      {
        type: "p",
        text: "So this project does not design around the limitation. It designs the thing that becomes possible once the limitation is gone.",
      },
    ],
  },
  {
    id: "scope",
    label: "04 Scope & Bets",
    blocks: [
      {
        type: "p",
        text: "This app is one place to ride both systems: pay, manage, check, ask. v1 designs every TransLink mode — bus, SkyTrain, SeaBus, West Coast Express — plus BC Ferries foot passenger fares, read-only sailing status, and in-app support. Vehicle booking is in the product but last in the roadmap, because it needs the deepest partnership. BC Transit's Umo network waits for a phase of its own. And the plastic card stays. Four decisions shape the rest of this project, and each one is a bet.",
      },
      { type: "h", text: "One tap, two fare authorities", tag: "Bet 01" },
      {
        type: "p",
        text: "A walk-on trip from Vancouver to Victoria crosses three fare systems, and BC Ferries says so itself: fares for each transit provider must be purchased separately. An adult foot passenger fare is $19.10 against $2.85 for a one-zone tap — nothing alike as amounts, but the same gesture. The two organisations already share retail: TransLink vending machines stand at both Tsawwassen and Horseshoe Bay, pre-loaded Compass Cards are sold in the shops onboard, and BC Ferries names the 620 and the 257 as its TransLink connections. Vehicle fares are a different gesture — a reservation, a vehicle class, deck capacity. That is a booking, not a tap, so it enters the app as a booking flow, and it enters last: selling another operator's vehicle fares is the deepest integration on this roadmap. In v1 the app shows a sailing's status, read-only. The booking flow is sequenced, not cut.",
      },
      { type: "h", text: "What you tap, and everything else", tag: "Bet 02" },
      {
        type: "p",
        text: "The three surfaces collapse into two layers, not three. One layer is the thing you tap at a gate: it has to work in three seconds, in the rain, with a bag in the other hand. The other is everything that can take as long as it needs: what the website was holding, plus what today means a phone call — checking a sailing, asking a question. An in-app assistant answers the simple ones first and hands the rest to a person; the phone line and the counter both stay. Splitting the product this way is the single structural decision the rest of the design rests on.",
      },
      {
        type: "figure",
        graphic: "compass-fig-ia",
        caption: "Two layers: what you tap — and everything else. Manage, check, ask.",
      },
      { type: "h", text: "Ordered by permission, not difficulty", tag: "Bet 03" },
      {
        type: "p",
        text: "TransLink first, because it sets its own fares and nothing has to be negotiated. BC Ferries second — a separate fare authority, but one that already shares retail touchpoints. BC Transit third, a separate system and a separate fare authority. The phases are not ordered by engineering difficulty. They are ordered by how much permission each one needs.",
      },
      {
        type: "figure",
        graphic: "compass-fig-coverage-roadmap",
        caption:
          "What v1 covers, what comes later, and the phases — ordered by how much permission each one needs.",
      },
      { type: "h", text: "The card stays", tag: "Bet 04" },
      {
        type: "p",
        text: "Not everyone carries a smartphone. Concession riders cannot buy their card from a machine today, which means the counter they already have to visit is the one place this design cannot replace. And the card holds a $6 deposit and never expires. This design adds a phone; it does not take away a card.",
      },
      {
        type: "figure",
        graphic: "compass-fig-wireframes",
        caption: "The first pass, before any of it looked like anything.",
      },
    ],
  },
  {
    id: "tap",
    label: "05 One Tap, Every Ride",
    blocks: [
      {
        type: "p",
        text: "This is the layer you tap. Everything in it has to survive three seconds at a gate, and nothing in it should ask you to read.",
      },
      {
        type: "figure",
        graphic: "compass-fig-tap-moment",
        caption: "The card, on the phone that was already in your hand.",
      },
      { type: "h", text: "Legible at arm's length, in motion" },
      {
        type: "figure",
        graphic: "compass-fig-type",
        caption: "One type scale, sized for a moving bus rather than a desk.",
      },
      { type: "h", text: "One colour does the work of a status word" },
      {
        type: "figure",
        graphic: "compass-fig-colour",
        caption:
          "Every pairing checked against WCAG contrast minimums, so a colour never carries a meaning on its own.",
      },
      { type: "h", text: "One card component, every state" },
      {
        type: "figure",
        graphic: "compass-fig-component",
        caption:
          "One component, the five states it owns: default, low balance, pass expiring, pass expired, reported lost. Ready, reading and paid at the reader are Apple's Express Mode UI, not redesigned here.",
      },
      {
        type: "p",
        text: "Those three decisions — the scale, the colour set and the card component — make every screen that follows. What changes from screen to screen is only which case the rider is in.",
      },
      {
        type: "solution",
        title: "The pass in the wallet",
        paras: [
          "Compass becomes a pass in Apple Wallet, next to the cards already there. It is the rider's own card, carrying their own balance and their own passes — not a bank card standing in for one.",
          "Express Mode means the phone does not have to be woken or unlocked to pay. The rider holds it to the reader and keeps walking.",
        ],
        media: ["compass-shot-wallet-01", "compass-shot-wallet-02"],
      },
      {
        type: "solution",
        title: "Three seconds at the gate",
        paras: [
          "The confirmation has to be readable in the time it takes to keep moving. Zone, fare charged, balance remaining — in that order, because that is the order the rider cares about.",
          "Card clash disappears. Today the guidance is to tap only your Compass Card, because a reader may pick a bank card out of the same wallet. When the Compass pass is the express transit card, the reader has already been told which one to take.",
        ],
        media: ["compass-shot-tap-01", "compass-shot-tap-02"],
      },
      {
        type: "solution",
        title: "The same gesture at the ferry",
        paras: [
          "A foot passenger fare is $19.10 against $2.85 for a one-zone bus trip. The amounts are nothing alike, and they do not need to be — what carries across is the gesture, not the price.",
          "Because the app knows which leg the rider is on, the confirmation names the sailing and the terminal instead of a zone.",
        ],
        media: ["compass-shot-ferry-01", "compass-shot-ferry-02"],
      },
      { type: "h", text: "What the gate sees" },
      {
        type: "p",
        text: "The pass presents the same MIFARE DESFire EV1 profile the plastic card presents today, so from the reader's side nothing has to change. That is the point: the rider is not being asked to adopt a new payment method, and the agency is not being asked to replace a reader.",
      },
      {
        type: "figure",
        graphic: "compass-fig-tap-motion",
        caption: "The confirmation, in the time it actually takes.",
      },
      {
        type: "p",
        text: "None of this is a new payment method. It is the card that already exists, on the device the rider already carries.",
      },
    ],
  },
  {
    id: "manage",
    label: "06 Everything the Website Held",
    blocks: [
      {
        type: "p",
        text: "This is the layer that can take as long as it needs. Every task in it is one that compasscard.ca, a vending machine or a phone call holds today. The lo-fi board's first pass spread it across four tabs; working the structure against a card-first model folded it into two — Compass Card and Tickets — with the account behind a single button.",
      },
      {
        type: "solution",
        title: "Balance and history",
        tag: "↔ Surface 02",
        paras: [
          "Five ways to check one number becomes one. The balance is on the first screen, and the history under it answers the question the balance raises — where did it go.",
          "Each trip shows the zone charged and the fare paid, so a rider can see the discounted fare they got rather than take it on trust.",
        ],
        media: ["compass-shot-balance-01", "compass-shot-balance-02"],
      },
      {
        type: "solution",
        title: "Reload, without the two-hour wait",
        tag: "↔ Surface 02",
        paras: [
          "On an account-based system the balance lives on the server, so a reload is finished when the confirmation appears. The two-hour lag was never a policy — it was the card waiting to meet a reader.",
          "Autoload is set once, with a threshold and an amount, and the app says what it is about to do before it does it.",
        ],
        media: ["compass-shot-reload-01", "compass-shot-reload-02"],
      },
      {
        type: "solution",
        title: "Passes",
        paras: [
          "Monthly passes, DayPasses and stored value sit in one place, and the app shows which one a tap will use before the rider reaches the gate.",
          "A pass that is about to expire says so on the card face, not in an email.",
        ],
        media: ["compass-shot-passes-01", "compass-shot-passes-02"],
      },
      {
        type: "solution",
        title: "U-Pass, once instead of monthly",
        tag: "↔ Surface 02",
        paras: [
          "Roughly 140,000 students request a U-Pass by hand every month from the 16th, typing a 20-digit card number and a 3-digit verification number, then waiting up to 24 hours for it to activate. Miss the window and there is no refund.",
          "The app holds the institution link and renews on the date, as a notice rather than a task. The 20-digit number is typed once at setup, or not at all if the card is already on the account.",
        ],
        media: ["compass-shot-upass-01", "compass-shot-upass-02"],
      },
      {
        type: "solution",
        title: "Losing it, moving it",
        paras: [
          "A lost card is reported in the app and the balance moves to the new one. Replacing a Program pass card costs $25 today, and this design does not change that fee — it changes how long a rider spends finding out about it.",
          "The plastic card and the pass share one balance, because they are one card. Tapping either draws from the same account.",
        ],
        media: ["compass-shot-card-01", "compass-shot-card-02"],
      },
      { type: "h", text: "Checking and asking" },
      {
        type: "p",
        text: "Two more things live in this layer without a screen of their own in this case study. A sailing's status is checkable in the app — read-only in v1, with the vehicle booking flow it will one day sit beside sequenced for a later phase. And the simple questions that today mean a phone queue go to an in-app assistant first; anything it cannot answer is handed to a person. The service line and the counter both stay — this design adds front doors, it does not close the old ones.",
      },
      {
        type: "p",
        text: "None of these tasks is new. All of them already exist — just not anywhere a rider can reach while standing at a gate.",
      },
    ],
  },
  {
    id: "wrist",
    label: "07 On the Wrist",
    blocks: [
      {
        type: "p",
        text: "The wrist gets three things: tap, balance, and a quick top-up. Anything that needs reading, typing or a decision belongs on the phone.",
      },
      {
        type: "figure",
        graphic: "compass-fig-watch",
        caption:
          "The same type, colour and card component at a third of the width — and nothing that asks the rider to stop walking.",
      },
      { type: "h", text: "Same tokens, one-third the width" },
      {
        type: "p",
        text: "The watch is not an extra deliverable here — it is the test of whether the foundations are a system or a style. The same type scale, the same colour set and the same card component have to survive at a third of the width, on a screen that is glanced at rather than read. If they had to be redrawn to fit, they were never a system.",
      },
      { type: "h", text: "What the watch deliberately cannot do" },
      {
        type: "list",
        items: [
          "Buy or change a pass. A purchase is a decision, and a decision needs a screen you can read.",
          "Enter a U-Pass card number. Twenty digits do not belong on a wrist.",
          "Show trip history beyond the last fare. History is for reviewing, and reviewing is a sitting-down task.",
          "Replace or transfer a card. Anything irreversible stays where it can be confirmed properly.",
        ],
      },
      {
        type: "p",
        text: "The list is short on purpose. Every item on it is something a rider would only ever do standing still, and a watch is what you use when you are not.",
      },
    ],
  },
  {
    id: "review",
    label: "08 What Held Up, What Didn't",
    blocks: [
      {
        type: "p",
        text: "I had no users to interview, so I used what the agency publishes about itself instead. That means there is no usability testing in this chapter, no participant quotes and no adoption numbers — and it means being specific about what the three things I could do actually showed.",
      },
      { type: "h", text: "Today's fastest path is today's most expensive path" },
      {
        type: "p",
        text: "I timed the current tasks against the designed ones by hand, counting steps rather than seconds so the comparison does not depend on how fast I type. The result that mattered was not inside the app at all: the quickest way to pay for a trip today is to tap a contactless bank card, and that is also the way that costs $0.65 to $1.30 more every trip. The convenient option and the affordable option are different options, and a rider has to already know that to choose correctly.",
      },
      {
        type: "figure",
        graphic: "compass-fig-task-table",
        caption:
          "Steps to complete each task today, and in the design. Counted by hand; no user testing was carried out.",
      },
      { type: "h", text: "What a heuristic review caught" },
      {
        type: "p",
        text: "I ran the screens against Nielsen's heuristics and against a contrast and target-size audit — one person reviewing their own work, which catches the obvious failures and misses the ones you are blind to. The findings are listed with what changed and what I decided to leave.",
      },
      {
        type: "figure",
        graphic: "compass-fig-audit",
        caption: "Heuristic findings and the accessibility audit, with what changed and what I left.",
      },
      { type: "h", text: "A premise that broke" },
      {
        type: "p",
        text: "I started this project believing BC Ferries required foot passengers to reserve in advance, which would have made a single tap impossible without a booking system behind it. That was wrong: BC Ferries' own release says customers can arrive at the terminal and buy a foot passenger fare without booking ahead. Losing the premise made the case stronger, because the real friction was the sentence next to it — fares for each transit provider must be purchased separately. Three fare systems on one journey is a better problem than a booking requirement, and it is the one that actually exists.",
      },
      { type: "h", text: "What I'd instrument if this shipped" },
      {
        type: "list",
        items: [
          "U-Pass renewal completion in the first 72 hours of each month, against the manual request rate today.",
          "The share of trips paid with the Compass pass rather than a contactless bank card. The fare gap says riders are choosing wrong, and this is where that would show.",
          "Reload abandonment, and where in the flow it happens.",
          "Time from opening the app to a visible balance, on the oldest supported device.",
          "Ferry taps as a share of foot passenger boardings at Tsawwassen and Horseshoe Bay.",
        ],
      },
      {
        type: "p",
        text: "The strongest evidence in this project came from things that were already published and things I could go and touch — a fare table, an RFP, a vending machine that will not sell a concession card. The weakest part is the part I could not do. I do not know how someone who has never used a transit wallet behaves on the first tap, and no amount of heuristic review substitutes for watching one person do it once. If this went further, that is the first thing I would buy.",
      },
      {
        type: "demo",
        label: "Open the prototype",
        note: "The full flow, running right here — no install needed.",
      },
    ],
  },
];

export default {
  id: "compass-card",
  title: "Compass Card",
  description:
    "A concept iOS and watchOS app for BC's transit fare card — designed on the account-based system TransLink has already put out to tender",
  roles: "Product Design",
  heroScene: "compass",
  headline: "Every ride, one tap. Everything else, one app.",
  intro: [
    "Compass is the fare card for Metro Vancouver — every bus, SkyTrain, SeaBus and West Coast Express journey in the region runs through it. You can already tap a phone at a TransLink gate, but what you tap is a bank card, not your Compass Card. The card itself is still a piece of plastic, and everything about that card — balance, reload, passes, U-Pass — lives on a website and in station vending machines.",
    "This is a self-initiated concept project: an iOS app, a watchOS app and a Compass pass in Apple Wallet, designed on top of the account-based system TransLink has already put out to tender. I had no users to interview, so I built the case on what the agency publishes about itself — ridership reports, fare tables, the modernization RFP, and its own customer experience plan.",
  ],
  metaLeft: [
    { label: "category", values: ["Product Design", "Self-initiated concept"] },
    { label: "timeline", values: ["«TBD: timeline»"] },
    { label: "role", values: ["Product Designer", "Solo project"] },
    { label: "scope", values: ["iOS app", "watchOS app", "Apple Wallet pass"] },
  ],
  metaRight: [
    {
      label: "tool",
      values: ["Figma", "React", "Vite", "Playwright", "Adobe Creative Suite"],
    },
  ],
  sections: COMPASS_SECTIONS,
  demo: { src: "compass/", frame: "blue" },
};
