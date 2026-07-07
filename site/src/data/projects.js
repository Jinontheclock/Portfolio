/* All projects: the Work-page card copy plus the case-study page content.
   Every case study shares the ProLog layout (title + TOC on the left; intro,
   meta, image, sections on the right). Non-ProLog copy is placeholder until
   each project's real content lands. `demo` adds the Try-app modal. */

const PLACEHOLDER_TOC = [
  "00 INTRO",
  "01 Placeholder section",
  "02 Placeholder section",
  "03 Placeholder section",
  "04 Placeholder section",
];

const PLACEHOLDER_SECTIONS = [
  {
    heading: "Section Heading",
    body: "Placeholder copy — a short paragraph describing this part of the project: the problem, the decision made, and what it changed.",
  },
  {
    heading: "Section Heading",
    body: "Placeholder copy — a short paragraph describing this part of the project: the problem, the decision made, and what it changed.",
  },
  {
    heading: "Section Heading",
    body: "Placeholder copy — a short paragraph describing this part of the project: the problem, the decision made, and what it changed.",
  },
];

export const PROJECTS = [
  {
    id: "prolog",
    title: "ProLog",
    description:
      "A mobile app that turns fragmented apprenticeship records into one clear roadmap for neurodivergent tradespeople",
    roles: "Product Design, Research, Branding",
    toc: [
      "00 INTRO",
      "01 WHY was ProLog developed?",
      "02 WHY was ProLog developed?",
      "03 WHY was ProLog developed?",
      "04 WHY was ProLog developed?",
      "05 WHY was ProLog developed?",
      "06 WHY was ProLog developed?",
      "07 WHY was ProLog developed?",
    ],
    intro: [
      "ProLog is a progress-tracking mobile app designed to support neurodivergent apprentices in the skilled trades. The project was developed as part of the D3 & FSWD × ConnectHER Technology Showcase, where students design digital solutions to address challenges faced by underrepresented people in the trades.",
      "ProLog centralizes fragmented training information into a clear, structured roadmap that helps apprentices track their progress, stay organized, and confidently navigate their journey toward Red Seal certification.",
    ],
    metaLeft: [
      { label: "category", values: ["App"] },
      { label: "timeline", values: ["4 months"] },
      { label: "role", values: ["UI Developer"] },
      { label: "link", values: ["Website", "Instagram", "Blog", "GitHub"] },
    ],
    metaRight: [
      {
        label: "tool",
        values: [
          "Figma",
          "HTML5",
          "CSS3",
          "JavaScript",
          "React Native Suite",
          "Adobe Creative Suite",
          "Framer",
          "Trello",
        ],
      },
    ],
    sections: [
      {
        heading: "Low Completion Rate",
        body: "Only 40% of apprentices in British Columbia complete their program within six years, showing how unclear and demanding the pathway can be.",
      },
      {
        heading: "Risk of Delay",
        body: "Work hours must be submitted through sponsor reporting processes, meaning missing or inconsistent information can delay apprenticeship progression.",
      },
      {
        heading: "Disconnected Progress Systems",
        body: "Apprenticeship progress depends on multiple separate systems, making it difficult for individuals to understand where they stand.",
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
    toc: PLACEHOLDER_TOC,
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
    toc: PLACEHOLDER_TOC,
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
    toc: PLACEHOLDER_TOC,
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
];

export const getProject = (id) => PROJECTS.find((p) => p.id === id);
