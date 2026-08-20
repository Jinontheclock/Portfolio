import thumb1 from "../../assets/muji/muji-thumb-1.webp";
import thumb2 from "../../assets/muji/muji-thumb-2.webp";
import thumb3 from "../../assets/muji/muji-thumb-3.webp";

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
  passwordHash:
    "9caa7c2feef38ddfb33aebdc7988e72d88f5b4c5caa43e67a8fd880fbaf56421",
  /* Work-card thumbnail. The first is what the card rests on; hovering
     walks the rest in order and returns to the first on the way out. */
  thumbs: [thumb1, thumb2, thumb3],
  thumbAlt: {
    en: "MUJI storefront, floor plan and shop-floor illustrations",
    ja: "無印良品の店頭、売場の平面図、売場のイラスト",
    ko: "무인양품 매장 외관, 매장 평면도, 매장 일러스트",
  },
  description:
    "Driving in-store visual communication strategies and spatial layout optimization to enhance customer journeys and duty-free shopping experiences for international travelers.",
  roles: "Visual Merchandising, Spatial UX, Brand Strategy",
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
