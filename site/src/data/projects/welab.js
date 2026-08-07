export default {
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
        { label: "weloveabattle.com", href: "https://weloveabattle.com/" },
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
          caption: "The Tax Credits section of the old Services page at desktop, tablet and mobile widths.",
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
        { type: "cta", label: "Visit the live site", href: "https://weloveabattle.com/" },
        {
          type: "quote",
          text: "Handing an intern full access to our live site isn't something we'd normally do, but the trust was there early and Hajin never gave us a reason to second-guess it — his workflow was quick, his reporting kept everyone aligned, and feedback went in cleanly each round. He brought strong ideas and did the research to back them, then knew how to put it to work.",
          cite: "Kenji, Creative Producer, WeLAB Entertainment",
        },
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
};
