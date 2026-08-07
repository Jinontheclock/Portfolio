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

export default {
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
};
