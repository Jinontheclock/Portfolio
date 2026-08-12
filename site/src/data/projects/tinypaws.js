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
    "A clear adoption pathway for a rescue website: co-designing the UX, building the brand identity, and hand-coding the responsive site with Astro.",
  roles: "UI/UX Design, Web Development",
  heroScene: "monitor",
  headline: "A clear path from stray to safe home.",
  demo: { src: "tinypaws/", variant: "web" },
  intro: [
    [
      "TinyPaws is a concept website for a volunteer-run kitten rescue in Vancouver. It is the rescue's front door, where adopters decide whether to trust, apply, or leave. On a five-person team, I co-designed the UX, built the visual identity, and hand-coded the site itself. Created at ",
      { text: "BCIT", href: "https://www.bcit.ca/outlines/20241079749/" },
      ".",
    ],
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
          text: "A rescue's website does one job: turn goodwill into homes. TinyPaws needed a site that could explain adoption to first-timers, prove its cats' histories to careful adopters, and make giving (time, foster space, money) feel as easy as browsing.",
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
          text: "We surveyed and interviewed 14 cat owners across BC, then read that against BC SPCA statistics, adoption studies, and community forums.",
        },
        { type: "h", text: "Three key findings" },
        {
          type: "list",
          items: [
            "Unclear and lengthy adoption flows cause even highly motivated adopters to give up midway.",
            "Upfront access to medical, behavioral, and vaccination records is the single biggest trust factor.",
            "Ongoing support after adoption day is missing almost everywhere, which leaves first-time owners anxious.",
          ],
        },
        {
          type: "p",
          text: "We distilled these findings into two personas: Emily (an experienced multi-cat owner) and Alex (a first-time adopter who needs guidance).",
        },
        {
          type: "figure",
          graphics: ["tinypaws-persona-emily", "tinypaws-persona-alex"],
          caption:
            "Emily (experienced, multi-cat) and Alex (first-time): the two depths of need the site serves.",
        },
      ],
    },
    {
      id: "structure",
      label: "03 Structuring the Site",
      blocks: [
        {
          type: "p",
          text: "The sitemap was built around the three things visitors actually come to do: adopt, get involved, give. Every page had to earn its place under one of those goals; content that served none of them was cut or folded in.",
        },
        {
          type: "figure",
          graphic: "tinypaws-fig-sitemap",
          caption:
            "One map, three goals: the structure the whole site hangs on.",
        },
        {
          type: "p",
          text: "Low-fidelity wireframes tested that structure before any visual identity existed: hierarchy, navigation, and flows in gray boxes.",
        },
        {
          type: "figure",
          graphic: "tinypaws-fig-lofi-grid",
          title: "Lo-fi wireframes",
          caption: "Structure first, personality later.",
        },
        {
          type: "h",
          text: "The first test broke the structure, not the visuals",
        },
        {
          type: "p",
          text: "Task-based sessions with 14 participants surfaced structural failures no amount of styling would have fixed. All three fixes shipped into the next fidelity.",
        },
        {
          type: "figure",
          graphic: "tinypaws-ba-nav",
          caption:
            "Menu labels read as interchangeable, so visitors landed on the wrong pages. Navigation was relabeled around the three goals.",
        },
        {
          type: "p",
          text: "Content-heavy pages overwhelmed at a glance. Sections were condensed into a consistent hierarchy visitors could scan in seconds.",
        },
        {
          type: "figure",
          graphic: "tinypaws-ba-structure",
        },
        {
          type: "p",
          text: "Buttons behaved inconsistently: some looked clickable but weren't, others hid where visitors couldn't find them. Every action became one clear, consistent orange control.",
        },
        {
          type: "figure",
          graphic: "tinypaws-ba-cta",
        },
      ],
    },
    {
      id: "brand",
      label: "04 Building the Brand",
      blocks: [
        {
          type: "p",
          text: "The brand had to balance emotional warmth with legibility and accessibility.",
        },
        { type: "h", text: "Typography" },
        {
          type: "list",
          items: [
            "Fredoka (headings): rounded letterforms that keep the tone friendly.",
            "Lexend (body): built for reading speed, which matters most in the long care guides.",
          ],
        },
        { type: "h", text: "Color & Contrast (WCAG 2.1 AA)" },
        {
          type: "list",
          items: [
            "The calico palette keeps the tone inviting without flattening the hierarchy.",
            "Body text (#301800 on cream) reads at 15.7:1, well past AA. Primary CTAs use the brand orange (#DC6E00) for immediate recognition.",
          ],
        },
        { type: "h", text: "Iconography" },
        {
          type: "p",
          text: "Custom micro-icons act as quick visual signposts for scanning.",
        },
        {
          type: "figure",
          graphic: "tinypaws-fig-styletile",
        },
        { type: "h", text: "Beyond the screen" },
        {
          type: "p",
          text: "A promotional video introduces the rescue in the same voice as the site: bright, warm, and honest about what adoption takes.",
        },
        {
          type: "figure",
          graphic: "tinypaws-campaign-video",
          title: "The promotional film",
        },
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
            "A step-by-step process page shows exactly what happens between applying and bringing a cat home. A short match quiz narrows the gallery to cats that fit an adopter's home and habits. Browsing becomes matching, and the application form already knows which cat it's for.",
          ],
          media: [
            "tinypaws-shot-process",
            "tinypaws-shot-quiz",
            "tinypaws-shot-form",
          ],
          caption: "Process, match quiz, application: one guided path.",
        },
        {
          type: "solution",
          wide: true,
          title: "Cat profiles that earn trust",
          paras: [
            "Every profile leads with the facts adopters asked for: vaccination and spay-neuter status, medical notes, temperament, and the cat's own story. Adopters trust what they can check, so the records come first.",
          ],
          media: [
            "tinypaws-shot-adopt",
            "tinypaws-shot-profile",
            "tinypaws-shot-profile-medical",
          ],
          caption: "The gallery and profile, with the records above the photos.",
        },
        {
          type: "solution",
          wide: true,
          title: "Support that doesn't end at adoption",
          paras: [
            "Foster, volunteer, donate, and events live under one Get Involved roof, and adopters leave with resources: cost guides, behavior help, and what to expect in the first weeks. Support does not stop on adoption day.",
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
          text: "With the visual system in place, a second round of testing, again with 14 participants, caught the failures of detail: uneven image sizes and hard-to-read text on pages like Events and Resources. Images were scaled to one consistent size, copy was cleaned up for readability, and a few confusing page labels were reworded.",
        },
      ],
    },
    {
      id: "shipping",
      label: "06 Shipping It Myself",
      blocks: [
        {
          type: "p",
          text: "I built the site in code myself with Astro: semantic HTML, design-token CSS, and just enough JavaScript, with no CMS behind it. A rescue site is mostly content: cats, events and care guides. That made a static build the honest choice, fast and cheap to run, with a design system as the site's single source of truth.",
        },
        { type: "h", text: "The style tile became a stylesheet" },
        {
          type: "p",
          text: "Every color, type size, and radius from the style tile lives in one tokens file the whole site reads from, so the styling comes out of the brand definition instead of being layered on afterwards. That's also where the design got tested: orange on cream measured 2.85:1, under the AA line, so body-size orange became a darkened #A65300 (4.6:1) and orange buttons carry dark-brown labels instead of white. The palette only proved itself once it was measured in code.",
        },
        {
          type: "figure",
          graphic: "tinypaws-fig-tokens",
          caption:
            "One sheet, one file: the style tile and the tokens.css it became.",
        },
        { type: "h", text: "Content as data, matching as logic" },
        {
          type: "p",
          text: "Each cat is a content entry (story, temperament, medical record, adoption status) rendered into cards, profiles, and the match quiz from a single source. Add a cat, and the whole site already knows.",
        },
        {
          type: "figure",
          graphic: "tinypaws-fig-content-model",
          caption:
            "One cat entry, three surfaces: the same record becomes a card, a full profile, and a quiz match.",
        },
        { type: "h", text: "Honest by construction" },
        {
          type: "p",
          text: "Nothing on the site pretends to do more than it does. Forms validate and confirm success without sending anything, and say so. The match quiz is plain additive scoring over the cats' own records, a match quiz and never \"AI\". Donations and the gift shop run their full flows but stay labeled a demo: no card details are asked for and nothing is charged. The pieces left out of scope (a forum, member logins) simply don't exist, so there are no dead ends.",
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
                "contrast throughout, fully responsive and keyboard-navigable",
            },
            {
              value: "Two rounds",
              label: "of usability testing: structure first, then detail",
            },
          ],
        },
        {
          type: "p",
          text: "Scoped to one Vancouver rescue, but the structure would carry to any volunteer-run shelter.",
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
      id: "reflection",
      label: "07 Reflection",
      blocks: [
        { type: "h", text: "Two tests, two different failures" },
        {
          type: "p",
          text: "Low fidelity broke where the structure was wrong; high fidelity broke where the details lied. Neither round would have caught the other's problems, so the order mattered as much as the testing.",
        },
        { type: "h", text: "With more time" },
        {
          type: "p",
          text: "I would run the site against a real rescue's live data (real cats, changing statuses, volunteer editors) and test whether the structure holds when the content isn't curated.",
        },
      ],
    },
  ],
};
