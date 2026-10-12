import logo from "../../assets/hmart/hmart-logo.png";

// Crop only the transparent sides in the layout, keeping the source intact.
const sourceWidth = 792;
const leftInset = 51;
const croppedWidth = sourceWidth - leftInset - 46;

export default {
  id: "hmart",
  screen: true,
  layout: "split",
  title: "H Mart",
  card: "#c92026",
  logo: {
    color: logo,
    gray: logo,
    grayFilter: "grayscale(1) opacity(0.45)",
    ratio: [croppedWidth, 205],
    imageStyle: {
      maxWidth: "none",
      width: `${(sourceWidth / croppedWidth) * 100}%`,
      left: `${(-leftInset / croppedWidth) * 100}%`,
    },
    scale: 1,
  },
  // Match MUJI's portfolio password; each project unlocks independently.
  locked: true,
  passwordHash:
    "9caa7c2feef38ddfb33aebdc7988e72d88f5b4c5caa43e67a8fd880fbaf56421",
  description:
    "Graphic design for H Mart across BC: in-store graphics and weekly flyers,\nwith promotion designs shared through the website and social media.",
  roles: "Graphic Design, Retail Communication, Digital Content",
  intro: [
    "At H Mart's BC headquarters, I design and produce in-store graphics for about ten stores across the province. The work includes point-of-purchase materials, new-product and promotion posters, event signage, notices, and the weekly flyer.",
    "I also manage H Mart's social media accounts and website, publishing the weekly promotion designs across both channels.",
  ],
  metaLeft: [
    { label: "category", values: ["Retail Graphic Design"] },
    { label: "timeline", values: ["Sep 2026 – Present"] },
    { label: "role", values: ["Graphic Designer"] },
  ],
  metaRight: [
    { label: "company", values: ["H Mart (BC HQ)"] },
    { label: "location", values: ["Port Coquitlam, Canada"] },
  ],
};
