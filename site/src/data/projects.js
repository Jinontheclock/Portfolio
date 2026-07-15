/* All projects: the Work-page card copy plus the case-study page content.
   Case studies share one layout (title + TOC on the left; content on the
   right) rendered from a small block model per section:
     { type:"h", text, tag? }   bold sub-heading (tag = small muted note)
     { type:"p", text }         paragraph
     { type:"list", items }     bullet list
     { type:"demo" }            the live Try-app embed (ProLog)
     { type:"gallery" }         placeholder image row
     { type:"tagline", text }   closing line
   Non-ProLog copy is placeholder until each project's real content lands. */

const PLACEHOLDER_SECTIONS = [
  {
    id: "s1",
    label: "01 Placeholder section",
    blocks: [
      {
        type: "p",
        text: "Placeholder copy — a short paragraph describing this part of the project: the problem, the decision made, and what it changed.",
      },
    ],
  },
  {
    id: "s2",
    label: "02 Placeholder section",
    blocks: [
      {
        type: "p",
        text: "Placeholder copy — a short paragraph describing this part of the project: the problem, the decision made, and what it changed.",
      },
    ],
  },
  {
    id: "s3",
    label: "03 Placeholder section",
    blocks: [
      {
        type: "p",
        text: "Placeholder copy — a short paragraph describing this part of the project: the problem, the decision made, and what it changed.",
      },
    ],
  },
];

export const PROJECTS = [
  {
    id: "prolog",
    title: "ProLog",
    description:
      "A mobile app that turns fragmented apprenticeship records into one clear roadmap for neurodivergent tradespeople",
    roles: "Product Design, Research, Branding",
    heroScene: "journey",
    headline: "Bringing a 6,000-hour journey into one clear view.",
    intro: [
      [
        "ProLog is a progress-tracking app that levels the playing field for neurodivergent apprentices in ",
        { text: "BC skilled trades", href: "https://skilledtradesbc.ca/" },
        ". As lead developer on an eight-person team, I worked on the UX/UI design and turned the design system into a working React Native build. The project was created for the ",
        {
          text: "ConnectHER",
          href: "https://www.bcit.ca/construction-environment/welcome-to-the-connectherhub/",
        },
        " Technology Showcase and presented at ",
        { text: "SSE Y2WD", href: "https://www.d3-fswd.ca" },
        ".",
      ],
    ],
    metaLeft: [
      { label: "category", values: ["Mobile App"] },
      { label: "timeline", values: ["Sept 2025 – Dec 2025"] },
      { label: "role", values: ["Lead Developer", "UX/UI Design"] },
      {
        label: "team",
        values: ["8 people", "design · development · research · marketing"],
      },
    ],
    metaRight: [
      {
        label: "tool",
        values: ["Figma", "React Native Expo", "Framer", "Adobe Creative Suite"],
      },
      {
        label: "link",
        values: [
          { label: "Website", href: "https://prolog.framer.website/" },
          { label: "Instagram", href: "https://www.instagram.com/prolog.app/" },
          { label: "Blog", href: "https://prolog.framer.website/blog" },
          { label: "GitHub", href: "https://github.com/Jinontheclock/ProLog" },
        ],
      },
    ],
    sections: [
      {
        id: "context",
        label: "01 Context",
        blocks: [
          {
            type: "p",
            text: "Becoming a certified tradesperson in British Columbia takes about four years: roughly 6,000 logged work hours, four levels of technical training, and around a hundred competencies per level — all verified against SkilledTradesBC records.",
          },
          {
            type: "figure",
            graphic: "prolog-timeline",
            caption: "The certification journey of a BC electrical apprentice.",
          },
          {
            type: "p",
            text: "That information lives in scattered places: official portals unfit for mobile, PDF competency documents, separate finance resources, and union forums.",
          },
          {
            type: "figure",
            graphic: "prolog-fragments",
            caption: "Four disconnected systems, one journey to manage.",
          },
          {
            type: "p",
            text: "One in five Canadians is neurodivergent, yet the system remains rigid and text-heavy. For them especially, an already demanding pathway becomes a navigation problem.",
          },
          { type: "figure", graphic: "prolog-audience" },
        ],
      },
      {
        id: "problem",
        label: "02 The Problem",
        blocks: [
          { type: "h", text: "Problem 01 — No map of the journey" },
          {
            type: "p",
            text: "Apprentices can see their past hours, but nothing shows where they stand or what comes next. Across Canada, only 16% of apprentices earn certification within their program's expected duration — and even given twice that time, roughly four in ten never certify at all. The requirements are clear on paper. The journey isn't.",
          },
          { type: "figure", graphic: "prolog-certstats" },
          { type: "h", text: "Problem 02 — Hours lost in the system" },
          {
            type: "p",
            text: "The sharpest concern in our interviews: discrepancies between the hours apprentices actually worked and the hours officially recorded — and no clear way to fix them. What proof counts? Who do you escalate to? Hard-earned progress quietly goes missing, delaying progression and draining motivation.",
          },
          { type: "figure", graphic: "prolog-discrepancy" },
          { type: "h", text: "Problem 03 — Scattered support" },
          {
            type: "p",
            text: "Apprentices work from their phones — nine of the twelve we surveyed named the phone as their primary device — yet study materials, funding information, and deadlines live on dense, desktop-only websites. The support exists. It just isn't built for the way apprentices actually work.",
          },
        ],
      },
      {
        id: "approach",
        label: "03 Approach",
        blocks: [
          {
            type: "p",
            text: "We surveyed and interviewed twelve apprentices across BC — electrical, plumbing, HVAC, welding, power engineering, ironworking, and landscaping — from first-year apprentices to journeypersons, union and non-union alike. Alongside, we reviewed the ecosystem they navigate: SkilledTradesBC portals and success-story profiles, competency documents, and the forum threads where apprentices ask each other what the official channels don't answer.",
          },
          { type: "figure", graphic: "prolog-participants" },
          {
            type: "stats",
            items: [
              { value: "11/12", label: "knew their next-level requirements — the information just lived in four different places" },
              { value: "10/12", label: "had been asked to work above or below their level" },
              { value: "9/12", label: "named the phone as their primary device" },
              { value: "9/12", label: "had never contacted their assigned mentor" },
            ],
          },
          { type: "h", text: "What we heard" },
          {
            type: "list",
            items: [
              "Everyone tracks differently — the official portal, paper logbooks, employer or union records. ProLog has to sit on top of these systems and sync with them, not ask apprentices to abandon them.",
              "Ten of the twelve had been asked to work above or below their level — competency boundaries blur on real job sites, and sign-offs don't keep up.",
              "Support exists but goes unused: nine of twelve had never contacted their assigned mentor, and \"not sure who to ask\" came up again and again — alongside funding programs apprentices didn't know they qualified for.",
              "Short, practical formats win: videos under two minutes, checklists, and links to official sources beat long documents every time.",
            ],
          },
          {
            type: "p",
            text: "We distilled these into two contrasting personas — a first-year apprentice finding her footing, and a Level 4 veteran closing out his ticket — that kept every feature decision anchored to a real person's week.",
          },
          {
            type: "figure",
            graphics: ["prolog-persona-izzy", "prolog-persona-jordan"],
            caption:
              "Izzy (Level 2, entry) and Jordan (Level 4, veteran) — the two ends of the journey ProLog serves.",
          },
          { type: "h", text: "Design principles" },
          {
            type: "list",
            items: [
              "One source of truth — progress, hours, money, and study in a single app.",
              "Nothing goes missing — no progress, no requirement, no deadline.",
              "Complement the system, don't replace it — sync with SkilledTradesBC records and export back to them.",
              "Built for neurodivergent users — information in small chunks, visual progress, reminders, and text-to-speech, on a phone, one-handed.",
            ],
          },
        ],
      },
      {
        id: "solution",
        label: "04 The Solution",
        blocks: [
          {
            type: "solution",
            title: "A 6,000-hour journey at a glance",
            tag: "↔ Problem 01",
            paras: [
              "ProLog's dashboard turns certification into a single roadmap: hours tracked, hours left in the current level, and hours until Red Seal — with competency and finance status alongside. Whenever it gets overwhelming, the dashboard shows exactly where you are and what's ahead.",
              "In usability testing, hour totals initially read as static labels — participants couldn't tell what the numbers were made of. We made every figure tappable, breaking hours down by competency, so exploring your own progress became the default interaction rather than a dead end.",
            ],
            media: ["journey-dashboard-1", "journey-dashboard-2", "journey-dashboard-3"],
            caption:
              "The dashboard: journey path, hours, competencies, and what's next — one screen.",
          },
          {
            type: "solution",
            title: "No hour goes missing",
            tag: "↔ Problem 02",
            paras: [
              "ProLog links to a user's SkilledTradesBC account and paystub records, and cross-checks the two in real time. When a discrepancy appears — say, 30 hours short of what the paystubs prove — ProLog flags it immediately, with a full report already generated and ready to send to the employer in one tap. What used to be a silent delay becomes an item you can resolve.",
            ],
            media: ["manual-scanning", "work-paystub-records", "work-hours"],
            caption:
              "Scan a paystub, keep the record, catch the gap — the discrepancy flag does the chasing.",
          },
          {
            type: "solution",
            title: "Everything else, in one place",
            tag: "↔ Problem 03",
            paras: [
              "Beyond tracking, ProLog folds in the support apprentices otherwise hunt for. A finance view lays out expected expenses for the term — tuition, tools, books — next to the grants and support programs they can apply to. A study section covers every competency in the level, built around the short, practical formats apprentices told us they use — summaries, text-to-speech, and AI-generated quizzes that refresh on every attempt, up to a full exam prep. Reminders are created automatically from the user's own records: tuition due Sunday, EI application by the 31st, certification expiring next Friday.",
              "Testing exposed that several of these entry points were hard to find — finance tools and reminders in particular — so navigation was reorganized around primary actions and core features surfaced to the top level.",
            ],
            media: ["work-finance", "competency-exam-prep", "dashboard-reminder"],
            caption:
              "Finance, study, and reminders — the support apprentices used to hunt for.",
          },
          { type: "h", text: "Tested with five apprentices. Three fixes shipped." },
          {
            type: "p",
            text: "Task-based sessions with five apprentices surfaced three failures in the first build. All three fixes shipped before the showcase — each one visible below, before and after.",
          },
          {
            type: "figure",
            graphic: "prolog-ba-progress",
            caption:
              "Hour totals read as static labels — participants couldn't tell what the numbers were made of. Now the journey map leads, and every figure breaks down on tap.",
          },
          {
            type: "figure",
            graphic: "prolog-ba-navigation",
            caption:
              "A flat list buried a hundred competencies behind search. Navigation was rebuilt around how apprentices actually study — by Line, by level, one thumb.",
          },
          {
            type: "figure",
            graphic: "prolog-ba-visual-cues",
            caption:
              "Grey-on-grey states didn't read as tappable. Contrast, hierarchy, and interaction cues were strengthened across the system — if it's orange, it moves you forward.",
          },
        ],
      },
      {
        id: "visual",
        label: "05 Visual Language",
        blocks: [
          {
            type: "p",
            text: "Identity and system built across the 8-person team — my part: co-designing the components and implementing the full system in React Native.",
          },
          { type: "h", text: "A mark that maps the journey" },
          {
            type: "p",
            text: "The ProLog mark is the product in miniature: rounded nodes linked along a winding path — the same journey map the dashboard draws — with a single orange block marking where you are now. The rule that runs through the whole system starts here: if it's orange, it moves you forward.",
          },
          { type: "figure", graphic: "prolog-logo" },
          { type: "h", text: "A palette built for the job site" },
          {
            type: "p",
            text: "Industrial-inspired neutrals ground the interface, with a single bold orange reserved for progress and key actions. If it's orange, it moves you forward — and the rule carries through every interactive state: orange for actions you can take now, grey for information that waits, dimmed for steps not yet unlocked.",
          },
          { type: "figure", graphic: "prolog-palette" },
          { type: "h", text: "Type that works at arm's length" },
          {
            type: "p",
            text: "The type system prioritizes glanceability — clear weight contrast, generous sizing, and numerals treated as first-class content: “You've completed 1,240 hours, keep going.”",
          },
          { type: "figure", graphic: "prolog-type" },
          { type: "h", text: "Beyond the screen" },
          {
            type: "p",
            text: "The identity extends to a promotional campaign — video, brochure, billboard, stickers, and social media — built on the same visual system.",
          },
          {
            type: "figure",
            graphic: "prolog-campaign-video",
            caption: "The promotional film made for the showcase.",
          },
          {
            type: "figure",
            graphic: "prolog-campaign-brochure",
            caption: "Brochure handed to showcase guests.",
          },
          {
            type: "figure",
            graphic: "prolog-campaign-billboards",
            caption: "Billboard concepts.",
          },
          {
            type: "figure",
            graphic: "prolog-campaign-instagram",
            caption: "Instagram carousel — the frames connect into one continuous scene as you swipe.",
          },
        ],
      },
      {
        id: "outcome",
        label: "06 Outcome",
        blocks: [
          { type: "h", text: "A working build, not just a prototype." },
          {
            type: "demo",
            note: "ProLog runs as a React Native Expo app. The embedded build is the actual product.",
          },
          {
            type: "list",
            items: [
              "Created for and presented at the ConnectHER Technology Showcase, where students design digital solutions for underrepresented people in the trades",
              "Presented at SSE Y2WD",
              "Usability testing with five apprentices drove three shipped improvements: interactive progress breakdowns, reorganized navigation, and strengthened interaction feedback",
              "Scoped to the electrical apprenticeship in BC, with an expansion path toward all skilled trades across Canada",
            ],
          },
        ],
      },
      {
        id: "reflection",
        label: "07 Reflection",
        blocks: [
          { type: "h", text: "Research earned its keep in the details." },
          {
            type: "p",
            text: "The decisions that mattered most — the discrepancy detector, tappable hour breakdowns, auto-generated reminders — came directly from things apprentices told us, not from assumptions about what a tracking app should be.",
          },
          { type: "h", text: "Building the design made me a better designer." },
          {
            type: "p",
            text: "Implementing the team's design system in React Native forced honesty about what the specs actually said — every vague token, every undefined state surfaced in code. Working between the lead designer and the build taught me to speak both languages.",
          },
          { type: "h", text: "With more time" },
          {
            type: "p",
            text: "I would test the discrepancy flow with employers as well as apprentices; their side of the sign-off shapes the anxiety we set out to remove.",
          },
        ],
      },
    ],
    demo: true,
  },
  {
    id: "tinypaws",
    title: "TinyPaws",
    description:
      "A short one- or two-line summary of the project and the problem it set out to solve.",
    roles: "Product Design, Development",
    intro: [
      "TinyPaws — placeholder introduction. A couple of sentences describing what the product is, who it serves, and the context it was built in.",
      "A second placeholder paragraph summarizing the approach and the outcome.",
    ],
    metaLeft: [
      { label: "category", values: ["App"] },
      { label: "timeline", values: ["TBD"] },
      { label: "role", values: ["Product Designer"] },
      { label: "link", values: ["Website"] },
    ],
    metaRight: [{ label: "tool", values: ["Figma", "Adobe Creative Suite"] }],
    sections: PLACEHOLDER_SECTIONS,
  },
  {
    id: "compass-card",
    title: "Compass Card",
    description:
      "A short one- or two-line summary of the project and the problem it set out to solve.",
    roles: "Product Design, Development",
    intro: [
      "Compass Card — placeholder introduction. A couple of sentences describing what the product is, who it serves, and the context it was built in.",
      "A second placeholder paragraph summarizing the approach and the outcome.",
    ],
    metaLeft: [
      { label: "category", values: ["UX Case Study"] },
      { label: "timeline", values: ["TBD"] },
      { label: "role", values: ["Product Designer"] },
      { label: "link", values: ["Website"] },
    ],
    metaRight: [{ label: "tool", values: ["Figma", "Adobe Creative Suite"] }],
    sections: PLACEHOLDER_SECTIONS,
  },
  {
    id: "welab",
    title: "WeLAB Entertainment",
    description:
      "A short one- or two-line summary of the project and the problem it set out to solve.",
    roles: "Product Design, Development",
    intro: [
      "WeLAB Entertainment — placeholder introduction. A couple of sentences describing what the product is, who it serves, and the context it was built in.",
      "A second placeholder paragraph summarizing the approach and the outcome.",
    ],
    metaLeft: [
      { label: "category", values: ["Website"] },
      { label: "timeline", values: ["Mar 2026 – May 2026"] },
      { label: "role", values: ["UI/UX Designer"] },
      { label: "link", values: ["Website"] },
    ],
    metaRight: [{ label: "tool", values: ["WordPress", "Bricks Builder", "Figma"] }],
    sections: PLACEHOLDER_SECTIONS,
  },
  {
    id: "muji",
    title: "MUJI",
    // company confidentiality: gate the case study behind a password
    locked: true,
    passwordHash: "9caa7c2feef38ddfb33aebdc7988e72d88f5b4c5caa43e67a8fd880fbaf56421",
    description:
      "A short one- or two-line summary of the project and the problem it set out to solve.",
    roles: "Visual Merchandising, Branding",
    intro: [
      "MUJI — placeholder introduction. A couple of sentences describing what the project is, who it serves, and the context it was built in.",
      "A second placeholder paragraph summarizing the approach and the outcome.",
    ],
    metaLeft: [
      { label: "category", values: ["Visual Merchandising"] },
      { label: "timeline", values: ["Apr 2022 – Sep 2024"] },
      { label: "role", values: ["Visual Merchandiser"] },
    ],
    metaRight: [{ label: "tool", values: ["Adobe Creative Suite"] }],
    sections: PLACEHOLDER_SECTIONS,
  },
];

export const getProject = (id) => PROJECTS.find((p) => p.id === id);
