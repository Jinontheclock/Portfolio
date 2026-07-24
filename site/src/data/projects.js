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
      "A live-site redesign for a VFX & animation studio — audited, redesigned, and rebuilt in Bricks, with custom code where the builder ran out",
    roles: "UI/UX Design, Web Development",
    heroScene: "welab",
    headline: "Bringing a VFX studio's website up to its own standard.",
    intro: [
      "WeLAB — We Love A Battle Entertainment — is a VFX and animation studio working in film and TV from Vancouver, Calgary, and Guadalajara. Over a three-month practicum internship, I was the designer on its public site end to end: auditing the old weloveabattle.com, then redesigning and rebuilding it in WordPress' Bricks builder — in Figma where a mission called for it, in custom code where the builder ran out.",
    ],
    metaLeft: [
      { label: "category", values: ["Website"] },
      { label: "timeline", values: ["Mar 2026 – May 2026"] },
      { label: "role", values: ["UI/UX Design", "Web Development"] },
      {
        label: "team",
        values: ["Internship", "solo on the site, with the WeLAB team"],
      },
    ],
    metaRight: [
      { label: "tool", values: ["Figma", "WordPress", "Bricks Builder"] },
      {
        label: "link",
        values: [
          { label: "Live Site", href: "https://weloveabattle.com/" },
        ],
      },
    ],
    sections: [
      {
        id: "brief",
        label: "01 The Brief",
        blocks: [
          {
            type: "p",
            text: "A VFX studio's website is its showreel's front door: producers land on it deciding whether the studio is worth a call. WeLAB's site had fallen behind the work it was meant to sell. The brief: refine the UX/UI, update the content, improve the architecture, and make the site fast, responsive, and findable — up to the studio's own standard.",
          },
          {
            type: "p",
            text: "This wasn't a greenfield build. The site stayed live in production throughout, the brand was set, and the stack — WordPress with the Bricks builder — was the studio's, not mine. The job was to raise the site inside those lines.",
          },
        ],
      },
      {
        id: "audit",
        label: "02 Auditing the Live Site",
        blocks: [
          {
            type: "p",
            text: "The redesign started by reading the site the way a producer would: page by page, desktop and phone, against the sites of the VFX studios WeLAB competes with — studios that open with their newest work and let a producer scrub a shot from plate to final on the project page itself. Held to that bar, the audit surfaced two problems and two opportunities — and they became the spine of the whole internship.",
          },
          { type: "h", text: "Problem 01 — The work didn't show its magic" },
          {
            type: "p",
            text: "WeLAB sells transformation: the same frame before the studio touched it, and after. The old project pages had the evidence — original plates and finished shots — but ran them as a one-way scroll of separate full-width stills. VFX frames have to be shown big, so each pair cost a screen of scrolling, and a before never sat beside its after. A producer skimming for what WeLAB could deliver had to hold the comparison in their head: the work was all there, but the magic never happened in front of them.",
          },
          {
            type: "figure",
            graphic: "welab-fig-old-showcase",
            caption: "The Challenge and Solution sections of the A Winning Team project page on the old site.",
          },
          { type: "h", text: "Problem 02 — Pages without a system" },
          {
            type: "p",
            text: "The site was responsive from desktop down to mobile — that much worked. What it lacked was a shared set of rules: type scale, grid, alignment, and components shifted from page to page, and the audit caught the cost in the open. At in-between widths, the services page's incentive cards fell out of their grid — three uneven columns at 1280px, a two-plus-one arrangement with a stray hole at 1200px.",
          },
          {
            type: "figure",
            graphic: "welab-fig-audit-responsive",
            caption: "The Tax Credits section of the old Services page at 1280px, 1200px, and mobile widths.",
          },
          {
            type: "p",
            text: "The same looseness ran through the pages doing the most important talking: Who We Are sat on a grid that didn't quite hold, the client wall in Our Clients slipped out of alignment, and the home footer arranged its components by its own logic. Small things, one by one — but together they kept the site from reading as one designed system.",
          },
          {
            type: "figure",
            graphic: "welab-fig-audit-sections",
            caption: "The Who We Are and Our Clients sections of the old About Us page, and the old home footer on mobile.",
          },
          { type: "h", text: "Opportunity 01 — A front page stuck in last year" },
          {
            type: "p",
            text: "The landing page still led with the same two project cards while the studio's slate moved on — its newest headline work wasn't on the front page at all. And even as calls to action, the cards underdelivered: each one swallowed a full screen, the pair followed different layouts, and the Explore link sank somewhere in all that surface. The studios WeLAB competes with lead with their strongest, freshest work. Out of that research I proposed a featured case-studies section, and the studio said yes.",
          },
          {
            type: "figure",
            graphic: "welab-fig-old-landing",
            caption: "The project cards on the old landing page, on desktop and on a phone.",
          },
          { type: "h", text: "Opportunity 02 — A studio in three countries, a site in one language" },
          {
            type: "p",
            text: "Through the first half of 2025, WeLAB's slate ran through its Canadian studios, and the site matched: English only, built for the US and Canadian clients it already had. Then the studio's map changed — starting with Shadow of God, a feature backed by Jalisco's film incentive programme, the push into Mexico stopped being a plan and became a slate. The site's own services page was already selling those incentives — in English. Growth wasn't waiting on marketing; it was waiting on the website.",
          },
          {
            type: "figure",
            graphic: "welab-fig-old-studios",
            caption: "The Our Studios section of the old landing page — the studio clocks for Guadalajara, Calgary, and Vancouver.",
          },
        ],
      },
      {
        id: "build",
        label: "03 Designing and Building",
        blocks: [
          {
            type: "p",
            text: "Every mission ran the same loop — mission, ideation, draft, feedback, implementation, feedback, completion. Weekly meetings set the missions; Discord carried the feedback between them, specific enough that each iteration knew exactly what had landed and what hadn't. Where a mission needed design exploration, the draft started in Figma; where the builder was the faster canvas, it was designed directly in Bricks.",
          },
          {
            type: "figure",
            graphic: "welab-fig-workflow",
            caption: "The iteration loop used for every mission.",
          },
          { type: "h", text: "So I wired one in", tag: "Problem 01" },
          {
            type: "p",
            text: "The showcase asked for something Bricks doesn't have: no native component supports an interactive overlay driven by the cursor. Rather than reinvent the interaction, I picked a proven web component — img-comparison-slider — wired it into a custom HTML block, and wrote the chrome around it by hand: the divider, the handle, the labels, and how each scales down on mobile. Hover or drag, and the original footage resolves into the final shot; knowing what to build and what to borrow was the real call. The audit's first finding closed where it opened: the before now sits in the same frame as its after, one drag apart.",
          },
          {
            type: "figure",
            graphic: "welab-ba-vfx",
            caption: "Frames from A Winning Team's stadium crowd extension, in the same slider interaction that runs on the live site.",
          },
          {
            type: "p",
            text: "It now runs on the studio's project pages — on A Winning Team, it carries the stadium crowd extensions WeLAB delivered across 161 shots for a Hallmark feature.",
          },
          { type: "h", text: "One grid, section by section", tag: "Problem 02" },
          {
            type: "p",
            text: "Rather than impose a top-down system, I reworked the flawed sections one at a time — directly in Bricks — realigning each to a consistent grid and tightening its spacing and hierarchy so the page read as one considered layout instead of a stack of one-offs. Every section the audit flagged went back onto that grid. Rebuilding was also the moment to right-size the media: logos and UI graphics as SVG, photography and film stills as JPGs tuned to the resolution they actually render at — every asset no heavier than the layout needs.",
          },
          {
            type: "figure",
            graphic: "welab-fig-layout-system",
            caption: "The rebuilt Tax Credits section, and the Who We Are, home footer, and Clients & Awards sections before and after the rebuild.",
          },
          { type: "h", text: "The front page caught up", tag: "Opportunity 01" },
          {
            type: "p",
            text: "The one mission that started in Figma. I designed the featured case-studies section as an argument for the studio's newest work — what a card owes a producer: the project, the scale, a reason to click. Five layouts went through the weekly loop — two columns, three, a carousel, a hover-focus variant, full-width rows. The direction from my supervisor was to keep three case studies in view at once — no scroll, no click — and three columns delivered it: room for each card to make its case, tight enough to compare at a glance, where the carousel hid two-thirds of the work and the rows dropped the third study below the fold. That was the layout built in Bricks. Where the old cards each swallowed a screen and buried their link, the new section puts the studio's three newest case studies in front of a producer at a glance, on one grid, each with a clear way in. The landing page now leads with its freshest work instead of last year's two cards.",
          },
          {
            type: "figure",
            graphic: "welab-fig-figma-featured",
            caption: "The featured case-studies section in Figma.",
          },
          {
            type: "figure",
            graphic: "welab-ba-landing",
            caption: "The featured case-studies section on the live site.",
          },
          { type: "h", text: "The work pages learned Spanish", tag: "Opportunity 02" },
          {
            type: "p",
            text: "The language work turned out custom, like the slider. Thirteen of the studio's project case studies — including every recent VFX feature — now carry their copy in English and Spanish both, switched by an EN/ES toggle in the header: each brief lives on the page in two languages, and the toggle decides which one a producer reads. The rest of the site holds English for now — but the pages that actually sell the work already speak the market's language.",
          },
          {
            type: "figure",
            graphic: "welab-fig-lang-toggle",
            caption: "The same project page on the live site, in English and in Spanish.",
          },
        ],
      },
      {
        id: "outcomes",
        label: "04 Outcomes",
        blocks: [
          {
            type: "p",
            text: "The redesign shipped to production on the studio's live domain — everything this case study shows links to the real thing. A production site keeps moving after handover; this study shows the work as it shipped in May 2026.",
          },
          {
            type: "stats",
            items: [
              { value: "100 / 96 / 90", label: "Lighthouse SEO, best practices, and accessibility on the live site" },
              { value: "13 case studies", label: "now read in English and Spanish — the pages that sell the work to the Mexican market" },
              { value: "Shipped live", label: "to production, inside the studio's existing brand and stack" },
            ],
          },
          {
            type: "quote",
            text: "Handing an intern the keys to our live site isn't something we'd normally do — but the trust was there early, and Hajin never gave us a reason to second-guess it. His workflow was quick and his reporting kept everyone aligned; feedback went in cleanly and the work came back better each round. He brought strong ideas to the table and did the research to stand them up, then knew how to apply it. He left the site meaningfully better than he found it.",
            cite: "Kenji, Creative Producer, WeLAB Entertainment",
          },
          { type: "cta", label: "Visit the live site", href: "https://weloveabattle.com/" },
        ],
      },
      {
        id: "reflection",
        label: "05 Reflection",
        blocks: [
          { type: "h", text: "The mindset shift was the real deliverable" },
          {
            type: "p",
            text: "School work ends at the rubric; client work doesn't. I learned to research competing studios without being asked, to bring my supervisor questions early instead of guesses late, and to keep iterating past the point where a grade would have called it done.",
          },
          {
            type: "p",
            text: "WeLAB handed an intern full access to a production site — trust that changed how carefully I shipped. If I set up the next project, the asset pipeline comes first: knowing exactly which media exists, at what quality, before design starts. I'd also instrument the site from day one — the redesign shipped, but with no analytics baseline I can point to what I built, not yet to what it moved; next time I'd measure the before so the after has a number.",
          },
        ],
      },
    ],
  },
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
            text: "Apprentices work from their phones — nine of the twelve we surveyed named the phone as their primary device — but the study guides and funding pages they need are built for a desktop: dense, multi-column, unusable one-handed on a job site. The support exists. It just isn't built for where the work happens.",
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
              "Competency boundaries blur on real job sites — apprentices get asked to work above or below their level, and sign-offs don't keep up.",
              "Support exists but goes unused — \"not sure who to ask\" came up again and again, alongside funding programs apprentices didn't know they qualified for.",
              "Short, practical formats win: videos under two minutes, checklists, and links to official sources beat long documents every time.",
            ],
          },
          {
            type: "p",
            text: "The friction we heard most — overwhelm from fragmented, text-heavy information — is exactly what neurodivergent apprentices feel most sharply. Designing for that edge sharpened ProLog for every apprentice.",
          },
          {
            type: "p",
            text: "We distilled these into two contrasting personas — a first-year apprentice finding her footing, and a Level 4 veteran closing out his ticket — Izzy holding it together with sticky notes and handmade study guides, Jordan overwhelmed by wordy PDFs and long resource lists. They kept every feature decision anchored to a real person's week.",
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
          { type: "h", text: "From structure to shipped" },
          {
            type: "figure",
            graphic: "prolog-fig-midfi-grid",
            caption:
              "Sixty mid-fi screens mapped every state — quiz right and wrong, filters, drawers — before a single hi-fi pixel.",
          },
          {
            type: "solution",
            title: "A 6,000-hour journey at a glance",
            tag: "↔ Problem 01",
            paras: [
              "ProLog's dashboard turns certification into a single roadmap: hours tracked, hours left in the current level, and hours until Red Seal — with competency and finance status alongside. Whenever it gets overwhelming, the dashboard shows exactly where you are and what's ahead.",
              "Every figure is tappable — hours break down by competency, so exploring your own progress is the default interaction, not a dead end.",
              "For Izzy — who holds her progress together across sticky notes and a paper journal — one tappable total replaces the pile she used to reconstruct by hand.",
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
              "For Jordan — a Level 4 who dreads the wordy PDFs and buried deadlines — the grant he qualifies for and his ticket-renewal date surface before he has to go hunting for them.",
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
            graphics: ["prolog-ba-progress", "prolog-ba-navigation", "prolog-ba-visual-cues"],
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
            text: "Industrial-inspired neutrals ground the interface, with a single bold orange reserved for progress and key actions. That rule carries through every interactive state: orange for actions you can take now, grey for information that waits, dimmed for steps not yet unlocked.",
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
            graphic: "prolog-campaign-billboards",
            caption: "Brochure and billboard concepts.",
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
              "Presented live at the ConnectHER Technology Showcase — where students design digital solutions for underrepresented people in the trades — to an audience that included BC's Minister of State for AI and New Technologies, two Members of Parliament, and the Mayor of Burnaby",
              "Presented at SSE Y2WD",
              "Recognized with a certificate from MP Jake Sawatzky, presented to each participating team",
              "Task-based testing with five apprentices shipped three improvements before the showcase",
              "Scoped to the electrical apprenticeship in BC, with an expansion path toward all skilled trades across Canada",
            ],
          },
          {
            type: "figure",
            graphics: ["prolog-showcase-stage", "prolog-showcase-crowd", "prolog-showcase-booth"],
            caption: [
              "The 6,000-hour story told live, a full house, and the Mayor of Burnaby at the ProLog booth. ",
              {
                text: "Photos: Carlos M Bonmatí / BCIT",
                href: "https://www.flickr.com/photos/bcitbusiness/albums/72177720330795756/with/54972788549",
              },
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
      "A responsive website that turns a cluttered rescue-cat adoption process into one clear, welcoming journey",
    roles: "UI/UX Design, Web Development",
    heroScene: "monitor",
    headline: "A clear path from stray to safe home.",
    demo: { src: "tinypaws/", variant: "web" },
    intro: [
      "TinyPaws is the website of a volunteer-run kitten rescue in Vancouver — the rescue's front door, where adopters decide whether to trust, apply, or leave. On a five-person team, I co-designed the UX, built the visual identity, and hand-coded the site itself. Created for MDIA 2003 Project 1 at BCIT.",
    ],
    metaLeft: [
      { label: "category", values: ["Website"] },
      { label: "timeline", values: ["Jan 2025 – May 2025"] },
      { label: "role", values: ["UI/UX Design", "Web Development"] },
      {
        label: "team",
        values: ["5 people", "design · research · development"],
      },
    ],
    metaRight: [
      { label: "tool", values: ["Figma", "Astro", "Adobe Creative Suite"] },
      {
        label: "link",
        values: [
          { label: "Live Site", href: "https://jinontheclock.github.io/TinyPaws/" },
          { label: "GitHub", href: "https://github.com/Jinontheclock/TinyPaws" },
        ],
      },
    ],
    sections: [
      {
        id: "brief",
        label: "01 The Brief",
        blocks: [
          {
            type: "p",
            text: "A rescue's website does one job: turn goodwill into homes. TinyPaws needed a site that could explain adoption to first-timers, prove its cats' histories to careful adopters, and make giving — time, foster space, money — feel as easy as browsing.",
          },
          { type: "cta", label: "Visit the live site", demo: true, href: "https://jinontheclock.github.io/TinyPaws/" },
        ],
      },
      {
        id: "adopters",
        label: "02 Understanding Adopters",
        blocks: [
          {
            type: "p",
            text: "We surveyed and interviewed cat owners and adopters across BC, and read the wider evidence — BC SPCA statistics, pet-adoption studies, and the forums where adopters compare notes on what rescue sites never tell them.",
          },
          { type: "h", text: "Three things adopters kept saying" },
          {
            type: "list",
            items: [
              "Adoption sites feel long, unclear, and hard to navigate — motivated adopters give up mid-way.",
              "Transparent medical, behaviour, and vaccination records are the single biggest trust factor.",
              "Support after adoption day is missing almost everywhere — and it's what first-timers fear most.",
            ],
          },
          {
            type: "p",
            text: "Two personas kept the team honest about depth: Emily, a psychiatrist running a multi-cat household with high standards for care, and Alex, a first-time owner in a small apartment who needs guidance more than options. Both were built from the research above, not invented.",
          },
          {
            type: "figure",
            graphics: ["tinypaws-persona-emily", "tinypaws-persona-alex"],
            caption:
              "Emily (experienced, multi-cat) and Alex (first-time) — the two depths of need the site serves.",
          },
        ],
      },
      {
        id: "structure",
        label: "03 Structuring the Site",
        blocks: [
          {
            type: "p",
            text: "The sitemap was rebuilt around the three things visitors actually come to do — adopt, get involved, give. Every page had to earn its place under one of those goals; content that served none of them was cut or folded in.",
          },
          {
            type: "figure",
            graphic: "tinypaws-fig-sitemap",
            caption: "One map, three goals — the structure the whole site hangs on.",
          },
          {
            type: "p",
            text: "Low-fidelity wireframes tested that structure before any visual identity existed: hierarchy, navigation, and flows in grey boxes.",
          },
          {
            type: "figure",
            graphic: "tinypaws-fig-lofi-grid",
            caption: "Lo-fi wireframes — structure first, personality later.",
          },
          { type: "h", text: "The first test broke the structure, not the visuals" },
          {
            type: "p",
            text: "Task-based sessions with 14 participants surfaced structural failures no amount of styling would have fixed — and all three fixes shipped into the next fidelity.",
          },
          {
            type: "figure",
            graphic: "tinypaws-ba-nav",
            caption:
              "Menu labels read as interchangeable — visitors landed on the wrong pages. Navigation was relabelled around the three goals.",
          },
          {
            type: "figure",
            graphic: "tinypaws-ba-structure",
            caption:
              "Content-heavy pages overwhelmed at a glance. Sections were condensed into a consistent hierarchy visitors could scan in seconds.",
          },
          {
            type: "figure",
            graphic: "tinypaws-ba-cta",
            caption:
              "Buttons behaved inconsistently — some looked clickable but weren't, others hid where visitors couldn't find them. Every action became one clear, consistent orange control.",
          },
        ],
      },
      {
        id: "brand",
        label: "04 Building the Brand",
        blocks: [
          { type: "h", text: "Colours borrowed from a calico" },
          {
            type: "p",
            text: "The palette comes straight from calico fur — warm orange, deep brown, soft cream. Orange carries actions, brown carries structure, cream keeps the pages calm. Fredoka gives headings the brand's voice; Lexend — a typeface designed for reading proficiency — carries the long-form content adopters actually need to read.",
          },
          {
            type: "figure",
            graphic: "tinypaws-fig-styletile",
            caption: "The style tile: palette, type scale, and interactive elements in one sheet.",
          },
          { type: "h", text: "Beyond the screen" },
          {
            type: "p",
            text: "A promotional video introduces the rescue in the same voice as the site — bright, warm, and honest about what adoption takes.",
          },
          {
            type: "figure",
            graphic: "tinypaws-campaign-video",
            caption: "The promotional film.",
          },
          { type: "tagline", text: "Small paws, safe homes." },
        ],
      },
      {
        id: "experience",
        label: "05 Designing the Experience",
        blocks: [
          {
            type: "solution",
            wide: true,
            title: "A guided adoption journey",
            paras: [
              "A step-by-step process page shows exactly what happens between applying and bringing a cat home. A short match quiz narrows the gallery to cats that fit an adopter's home and habits — browsing becomes matching, and the application form arrives pre-contextualized.",
            ],
            media: ["tinypaws-shot-process", "tinypaws-shot-quiz", "tinypaws-shot-form"],
            caption: "Process, match quiz, application — one guided path.",
          },
          {
            type: "solution",
            wide: true,
            title: "Cat profiles that earn trust",
            paras: [
              "Every profile leads with the facts adopters asked for: vaccination and spay-neuter status, medical notes, temperament, and the cat's own story. Trust is built by disclosure, not decoration.",
            ],
            media: ["tinypaws-shot-adopt", "tinypaws-shot-profile", "tinypaws-shot-profile-medical"],
            caption: "The gallery and profile: records first, cuteness second.",
          },
          {
            type: "solution",
            wide: true,
            title: "Support that doesn't end at adoption",
            paras: [
              "Foster, volunteer, donate, and events live under one Get Involved roof, and adopters leave with resources — cost guides, behaviour help, and what to expect in the first weeks. The relationship outlives the transaction.",
            ],
            media: ["tinypaws-shot-involve", "tinypaws-shot-events", "tinypaws-shot-home"],
            caption: "Get involved, events, and the home page that ties the journey together.",
          },
          { type: "h", text: "The second test caught what the polish hid" },
          {
            type: "p",
            text: "With the visual system in place, a second round of testing, again with 14, caught the failures of detail — uneven image sizes and hard-to-read text on pages like Events and Resources. Images were scaled to one consistent size and the copy cleaned up for readability, and a few confusing page labels were reworded. Structure and polish fail differently; testing twice caught both.",
          },
        ],
      },
      {
        id: "shipping",
        label: "06 Shipping It Myself",
        blocks: [
          {
            type: "p",
            text: "I built the site in code myself — semantic HTML, design-token CSS, and just enough JavaScript, with no CMS behind it. A rescue's site is content, not software: cats, events, guides. That made a static build the honest choice — fast, cheap to run, and driven by a design system that is the site's source of truth rather than a theme's approximation of it.",
          },
          { type: "h", text: "The style tile became a stylesheet" },
          {
            type: "p",
            text: "Every colour, type size, and radius from the style tile lives in one tokens file the whole site reads from — the brand isn't applied to the site, the site is compiled from the brand. That's also where the design got tested: orange on cream measured 2.85:1, under the AA line, so body-size orange became a darkened #A65300 (4.6:1) and orange buttons carry dark-brown labels instead of white. A palette isn't real until it passes contrast in code.",
          },
          {
            type: "figure",
            graphic: "tinypaws-fig-tokens",
            caption: "One sheet, one file — the style tile and the tokens.css it became.",
          },
          { type: "h", text: "Content as data, matching as logic" },
          {
            type: "p",
            text: "Each cat is a content entry — story, temperament, medical record, adoption status — rendered into cards, profiles, and the match quiz from a single source. Add a cat, and the whole site already knows.",
          },
          {
            type: "figure",
            graphic: "tinypaws-fig-content-model",
            caption: "One cat entry, three surfaces — the same record becomes a card, a full profile, and a quiz match.",
          },
          { type: "h", text: "Honest by construction" },
          {
            type: "p",
            text: "Nothing on the site pretends to do more than it does. Forms validate and confirm success without sending anything, and say so. The match quiz is plain additive scoring over the cats' own records — a match quiz, never \"AI\". Donations and the gift shop run their full flows but stay labelled a demo — no card details are asked for and nothing is charged. And the pieces left out of scope — a forum, member logins — simply don't exist, so there are no dead ends. A demo can still be honest about what it is.",
          },
          {
            type: "stats",
            items: [
              { value: "Lighthouse 100", label: "across performance, accessibility, best practices, and SEO" },
              { value: "WCAG AA", label: "contrast throughout — fully responsive and keyboard-navigable" },
              { value: "Two rounds", label: "of usability testing — structure first, then detail" },
            ],
          },
          {
            type: "p",
            text: "Scoped to one Vancouver rescue, but built to template for any volunteer-run shelter.",
          },
          {
            type: "cta",
            buttons: [
              { label: "Visit the live site", demo: true, href: "https://jinontheclock.github.io/TinyPaws/" },
              { label: "Read the code on GitHub", href: "https://github.com/Jinontheclock/TinyPaws" },
            ],
          },
        ],
      },
      {
        id: "reflection",
        label: "07 Reflection",
        blocks: [
          { type: "h", text: "Two tests, two different failures." },
          {
            type: "p",
            text: "Low fidelity broke where the structure was wrong; high fidelity broke where the details lied. Neither round would have caught the other's problems — the order mattered as much as the testing.",
          },
          { type: "h", text: "With more time" },
          {
            type: "p",
            text: "I would run the site against a real rescue's live data — real cats, changing statuses, volunteer editors — and test whether the structure holds when the content isn't curated.",
          },
        ],
      },
    ],
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
