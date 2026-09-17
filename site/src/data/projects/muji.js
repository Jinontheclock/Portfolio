import logoColor from "../../assets/muji/muji-logo-color.webp";
import logoGray from "../../assets/muji/muji-logo-gray.webp";

export default {
  id: "muji",
  screen: true, // one screen, the column on the wheel: see CaseStudyPage.jsx
  /* the chapters across the top and the column as two, the pictures on
     the left and the words on the right: see splitRows in
     CaseStudyPage.jsx and .cs-split in casestudy.css */
  layout: "split",
  title: "MUJI",
  /* the Work card's ground: the project's own colour, the copy in the
     page's white on it (see .wk-section in work.css) */
  card: "#822433",
  /* the Work index's entry: the wordmark, in colour when the project is
     on the stage and in grey when it waits; `ratio` is the wordmark's, and
     `scale` its share of the index's common height — the marks differ in
     shape, a wide one-liner reading larger than a compact two-liner at
     one height, so each is scaled to balance with the others. Cut
     from originals/public/media/muji_color.png and _gray.png. */
  logo: { color: logoColor, gray: logoGray, ratio: [370, 240], scale: 1.3 },
  // company confidentiality: gate the case study behind a password
  locked: true,
  passwordHash:
    "9caa7c2feef38ddfb33aebdc7988e72d88f5b4c5caa43e67a8fd880fbaf56421",
  /* Work-card thumbnail. The first is what the card rests on; hovering
     walks the rest in order and returns to the first on the way out. */
  thumbAlt: {
    en: "MUJI storefront, floor plan and shop-floor illustrations",
    ja: "無印良品の店頭、売場の平面図、売場のイラスト",
    ko: "무인양품 매장 외관, 매장 평면도, 매장 일러스트",
  },
  /* the \\n is where the line turns on a laptop or wider — see .wk-desc in work.css */
  description:
    "Driving in-store visual communication strategies and spatial layout optimization to\nenhance journeys and duty-free shopping experiences for travelers.",
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
};
