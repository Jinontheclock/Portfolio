import cardPoster from "../../assets/tinypaws/tinypaws-card-poster.webp";

export default {
  id: "tinypaws",
  title: "TinyPaws",
  kind: "Academic Project · Web Design & Dev",
  /* Work-card thumbnail: the case study's own hero clip, cropped to the
     card's proportions and without the logo the hero floats over it. The
     card rests on the poster and plays under the pointer.
     scripts/build-card-videos.py makes all three files. */
  video: {
    /* VP9 first so a Chromium without the proprietary codecs still plays
       it; H.264 is what everything else takes */
    sources: [
      {
        src: `${import.meta.env.BASE_URL}media/tinypaws/tinypaws-card.webm`,
        type: "video/webm",
      },
      {
        src: `${import.meta.env.BASE_URL}media/tinypaws/tinypaws-card.mp4`,
        type: "video/mp4",
      },
    ],
    poster: cardPoster,
  },
  thumbAlt: "The TinyPaws site on a desktop monitor, open at the home page",
  description:
    "A clear adoption pathway for a rescue website—co-designing the UI, building the brand identity, and hand-coding the responsive site with Astro.",
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
        {
          label: "Live Site",
          href: "https://jinontheclock.github.io/TinyPaws/",
        },
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
        {
          type: "cta",
          label: "Visit the live site",
          demo: true,
          href: "https://jinontheclock.github.io/TinyPaws/",
        },
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
          caption:
            "One map, three goals — the structure the whole site hangs on.",
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
        {
          type: "h",
          text: "The first test broke the structure, not the visuals",
        },
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
          caption:
            "The style tile: palette, type scale, and interactive elements in one sheet.",
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
          media: [
            "tinypaws-shot-process",
            "tinypaws-shot-quiz",
            "tinypaws-shot-form",
          ],
          caption: "Process, match quiz, application — one guided path.",
        },
        {
          type: "solution",
          wide: true,
          title: "Cat profiles that earn trust",
          paras: [
            "Every profile leads with the facts adopters asked for: vaccination and spay-neuter status, medical notes, temperament, and the cat's own story. Trust is built by disclosure, not decoration.",
          ],
          media: [
            "tinypaws-shot-adopt",
            "tinypaws-shot-profile",
            "tinypaws-shot-profile-medical",
          ],
          caption: "The gallery and profile: records first, cuteness second.",
        },
        {
          type: "solution",
          wide: true,
          title: "Support that doesn't end at adoption",
          paras: [
            "Foster, volunteer, donate, and events live under one Get Involved roof, and adopters leave with resources — cost guides, behaviour help, and what to expect in the first weeks. The relationship outlives the transaction.",
          ],
          media: [
            "tinypaws-shot-involve",
            "tinypaws-shot-events",
            "tinypaws-shot-home",
          ],
          caption:
            "Get involved, events, and the home page that ties the journey together.",
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
          caption:
            "One sheet, one file — the style tile and the tokens.css it became.",
        },
        { type: "h", text: "Content as data, matching as logic" },
        {
          type: "p",
          text: "Each cat is a content entry — story, temperament, medical record, adoption status — rendered into cards, profiles, and the match quiz from a single source. Add a cat, and the whole site already knows.",
        },
        {
          type: "figure",
          graphic: "tinypaws-fig-content-model",
          caption:
            "One cat entry, three surfaces — the same record becomes a card, a full profile, and a quiz match.",
        },
        { type: "h", text: "Honest by construction" },
        {
          type: "p",
          text: "Nothing on the site pretends to do more than it does. Forms validate and confirm success without sending anything, and say so. The match quiz is plain additive scoring over the cats' own records — a match quiz, never \"AI\". Donations and the gift shop run their full flows but stay labelled a demo — no card details are asked for and nothing is charged. And the pieces left out of scope — a forum, member logins — simply don't exist, so there are no dead ends. A demo can still be honest about what it is.",
        },
        {
          type: "stats",
          items: [
            {
              value: "Lighthouse 100",
              label:
                "across performance, accessibility, best practices, and SEO",
            },
            {
              value: "WCAG AA",
              label:
                "contrast throughout — fully responsive and keyboard-navigable",
            },
            {
              value: "Two rounds",
              label: "of usability testing — structure first, then detail",
            },
          ],
        },
        {
          type: "p",
          text: "Scoped to one Vancouver rescue, but built to template for any volunteer-run shelter.",
        },
        {
          type: "cta",
          buttons: [
            {
              label: "Visit the live site",
              demo: true,
              href: "https://jinontheclock.github.io/TinyPaws/",
            },
            {
              label: "Read the code on GitHub",
              href: "https://github.com/Jinontheclock/TinyPaws",
            },
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
};
