import cardThumb from "../../assets/tinypaws/tinypaws-card-thumb.webp";
import logoColor from "../../assets/tinypaws/tinypaws-logo-color.webp";
import logoGray from "../../assets/tinypaws/tinypaws-logo-gray.webp";

export default {
  id: "tinypaws",
  title: "TinyPaws",
  /* the Work card's ground: the project's own colour, the copy in the
     page's white on it (see .wk-section in work.css) */
  card: "#FFAA54",
  /* the Work index's entry: the wordmark, in colour when the project is
     on the stage and in grey when it waits; `ratio` is the wordmark's, and
     `scale` its share of the index's common height — the marks differ in
     shape, a wide one-liner reading larger than a compact two-liner at
     one height, so each is scaled to balance with the others. Cut
     from originals/public/media/tinypaws_color.png and _gray.png. */
  logo: { color: logoColor, gray: logoGray, ratio: [532, 240], scale: 1.15 },
  screen: true, // one screen, the column on the wheel: see CaseStudyPage.jsx
  /* the chapters across the top and the column as two, the pictures on
     the left and the words on the right: see splitRows in
     CaseStudyPage.jsx and .cs-split in casestudy.css */
  layout: "split",
  /* The Work card's device: the render of the rescue's site on an iMac,
     with its keyboard and mouse, the screen in it already; `ratio` is the
     picture's. Cut from originals/tinypawsthum.png to 1000 tall. */
  mockups: [{ image: cardThumb, ratio: [1177, 1000] }],
  thumbAlt: {
    en: "The TinyPaws site on an iMac: the kitten rescue's landing page",
    ja: "デスクトップモニターに映るTinyPawsのサイト。ホームが開いている",
    ko: "데스크톱 모니터에 띄운 TinyPaws 사이트. 홈 화면이 열려 있다",
  },
  /* the \\n is where the line turns on a laptop or wider — see .wk-desc in work.css */
  description: {
    en: "An academic project that gave a rescue website a clear adoption pathway:\nco-designing the UX, building identity, and hand-coding the responsive site with Astro.",
    ja: "保護団体のサイトに、迷いのない譲渡までの道すじを。UXの共同設計、ブランドアイデンティティの構築、そしてAstroによるレスポンシブサイトの実装まで担当しました。",
    ko: "구조 단체 웹사이트에 헤매지 않는 입양 경로를 만들었습니다. UX 공동 설계, 브랜드 아이덴티티 구축, 그리고 Astro로 반응형 사이트를 직접 코딩했습니다.",
  },
  roles: {
    en: "UI/UX Design, Web Development",
    ja: "UI/UXデザイン、ウェブ開発",
    ko: "UI/UX 디자인, 웹 개발",
  },
  heroScene: "monitor",
  headline: {
    en: "A clear path from stray to safe home.",
    ja: "野良から、安心できる家までの一本の道。",
    ko: "길 위에서 안전한 집까지, 하나의 분명한 길.",
  },
  demo: { src: "tinypaws/", variant: "web" },
  intro: [
    {
      en: [
        "TinyPaws is a concept website for a volunteer-run kitten rescue in Vancouver. It is the rescue's front door, where adopters decide whether to ==trust, apply, or leave==. On a five-person team, I co-designed the UX, built the visual identity, and hand-coded the site itself. Created at ",
        { text: "BCIT", href: "https://www.bcit.ca/outlines/20241079749/" },
        ".",
      ],
      ja: [
        "TinyPawsは、バンクーバーでボランティアが運営する子猫の保護団体のために制作したコンセプトサイトです。団体にとっては入口にあたる場所で、里親希望者はここで、信頼するか、申し込むか、離れるかを決めます。5人チームの中で、私はUXの共同設計とビジュアルアイデンティティの構築を担当し、サイト自体も自分の手でコーディングしました。制作は",
        { text: "BCIT", href: "https://www.bcit.ca/outlines/20241079749/" },
        "の課題として行いました。",
      ],
      ko: [
        "TinyPaws는 밴쿠버에서 자원봉사자들이 운영하는 새끼 고양이 구조 단체를 위해 만든 콘셉트 웹사이트입니다. 단체의 현관에 해당하는 자리이고, 입양 희망자는 여기서 믿을지, 신청할지, 그냥 나갈지를 정합니다. 5인 팀에서 저는 UX 공동 설계와 비주얼 아이덴티티 구축을 맡았고, 사이트도 직접 코딩했습니다. ",
        { text: "BCIT", href: "https://www.bcit.ca/outlines/20241079749/" },
        " 과제로 제작했습니다.",
      ],
    },
  ],
  metaLeft: [
    {
      label: {
        en: "category",
        ja: "カテゴリ",
        ko: "카테고리",
      },
      values: [{
          en: "Website",
          ja: "ウェブサイト",
          ko: "웹사이트",
        }],
    },
    {
      label: {
        en: "timeline",
        ja: "期間",
        ko: "기간",
      },
      values: [{
          en: "Jan 2025 – May 2025",
          ja: "2025年1月〜5月",
          ko: "2025년 1월~5월",
        }],
    },
    {
      label: {
        en: "role",
        ja: "役割",
        ko: "역할",
      },
      values: [
        {
          en: "UI/UX Design",
          ja: "UI/UXデザイン",
          ko: "UI/UX 디자인",
        },
        {
          en: "Web Development",
          ja: "ウェブ開発",
          ko: "웹 개발",
        },
      ],
    },
    {
      label: {
        en: "team",
        ja: "チーム",
        ko: "팀",
      },
      values: [
        {
          en: "5 people",
          ja: "5名",
          ko: "5명",
        },
        {
          en: "design · research · development",
          ja: "デザイン・リサーチ・開発",
          ko: "디자인 · 리서치 · 개발",
        },
      ],
    },
  ],
  metaRight: [
    {
      label: {
        en: "tool",
        ja: "ツール",
        ko: "도구",
      },
      values: ["Figma", "Astro", "Adobe Creative Suite"],
    },
    {
      label: {
        en: "link",
        ja: "リンク",
        ko: "링크",
      },
      values: [
        {
          label: {
            en: "Live Site",
            ja: "公開サイト",
            ko: "라이브 사이트",
          },
          href: "https://jinontheclock.github.io/TinyPaws/",
        },
        { label: "GitHub", href: "https://github.com/Jinontheclock/TinyPaws" },
      ],
    },
  ],
};
