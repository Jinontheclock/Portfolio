import cardThumb from "../../assets/welab/welab-card-thumb.webp";
import logoColor from "../../assets/welab/welab-logo-color.webp";
import logoGray from "../../assets/welab/welab-logo-gray.webp";

export default {
  id: "welab",
  screen: true, // one screen, the column on the wheel: see CaseStudyPage.jsx
  /* the chapters across the top and the column as two, the pictures on
     the left and the words on the right: see splitRows in
     CaseStudyPage.jsx and .cs-split in casestudy.css */
  layout: "split",
  title: "WeLAB Entertainment",
  /* the Work card's ground: the project's own colour, the copy in the
     page's white on it (see .wk-section in work.css) */
  card: "#9470FF",
  /* the Work index's entry: the wordmark, in colour when the project is
     on the stage and in grey when it waits; `ratio` is the wordmark's, and
     `scale` its share of the index's common height — the marks differ in
     shape, a wide one-liner reading larger than a compact two-liner at
     one height, so each is scaled to balance with the others. Cut
     from originals/public/media/welab_color.png and _gray.png. */
  logo: { color: logoColor, gray: logoGray, ratio: [579, 240], scale: 1.05 },
  /* The Work card's devices: the render of the studio's site on a MacBook
     and on an iPhone, the screens in it already; `ratio` is the picture's.
     Cut from originals/public/Untitled-2.png to 1000 tall. */
  mockups: [{ image: cardThumb, ratio: [1247, 1000] }],
  thumbAlt: {
    en: "The WeLAB Entertainment site on a MacBook and an iPhone: the studio's hero on the laptop, a project page on the phone",
    ja: "デスクトップモニターに映る、作り直したWeLABのサイトのホーム",
    ko: "데스크톱 모니터에 띄운, 다시 만든 WeLAB 사이트의 홈",
  },
  /* the \\n is where the line turns on a laptop or wider — see .wk-desc in work.css */
  description: {
    en: "An end-to-end website audit, redesign, and WordPress development for a VFX studio:\nrebuilding layouts and interactions with Bricks Builder and custom code.",
    ja: "VFXスタジオのサイトを、監査からリデザイン、WordPressでの実装まで一貫して担当。レイアウトとインタラクションをBricks Builderと自前のコードで作り直しました。",
    ko: "VFX 스튜디오 사이트를 감사부터 리디자인, WordPress 구현까지 처음부터 끝까지 맡았습니다. 레이아웃과 인터랙션을 Bricks Builder와 직접 쓴 코드로 다시 만들었습니다.",
  },
  roles: {
    en: "UI/UX Design, Web Development",
    ja: "UI/UXデザイン、ウェブ開発（インターンシップ）",
    ko: "UI/UX 디자인, 웹 개발(인턴십)",
  },
  heroScene: "welab",
  headline: {
    en: "Bringing a VFX studio's website up to its own standard.",
    ja: "VFXスタジオのウェブサイトを、そのスタジオ自身の基準まで。",
    ko: "VFX 스튜디오의 웹사이트를, 그 스튜디오 자신의 기준까지.",
  },
  intro: [
    {
      en: "WeLAB (We Love A Battle Entertainment) is a VFX and animation studio working in film and TV from Vancouver, Calgary, and Guadalajara. Over a three-month practicum internship, I was ==the designer on its public site end to end==: auditing the old weloveabattle.com, then redesigning and rebuilding it in WordPress with Bricks Builder, working in Figma where a mission called for it and in custom code where the builder ran out.",
      ja: "WeLAB(We Love A Battle Entertainment)は、バンクーバー、カルガリー、グアダラハラを拠点に映画とテレビの仕事をしているVFX・アニメーションスタジオです。私は3か月の実習インターンシップの間、このスタジオの公式サイトのデザイナーを最初から最後まで担当しました。既存のweloveabattle.comを監査し、WordPressのBricksビルダー上で設計し直し、作り直しました。ミッションが求めるところではFigmaで、ビルダーで届かないところは自前のコードで。",
      ko: "WeLAB(We Love A Battle Entertainment)은 밴쿠버, 캘거리, 과달라하라를 거점으로 영화와 TV 작업을 하는 VFX·애니메이션 스튜디오입니다. 저는 3개월 현장실습 인턴십 동안 이 스튜디오 공식 사이트의 디자이너를 처음부터 끝까지 맡았습니다. 기존 weloveabattle.com을 감사하고, WordPress의 Bricks 빌더 위에서 다시 설계하고 다시 만들었습니다. 미션이 요구하는 곳에서는 Figma로, 빌더가 한계에 다다른 곳에서는 직접 코드로.",
    },
  ],
  metaLeft: [
    {
      label: { en: "category", ja: "カテゴリ", ko: "카테고리" },
      values: [{ en: "Website", ja: "ウェブサイト", ko: "웹사이트" }],
    },
    {
      label: { en: "timeline", ja: "期間", ko: "기간" },
      values: [
        {
          en: "Mar 2026 – May 2026",
          ja: "2026年3月〜5月",
          ko: "2026년 3월~5월",
        },
      ],
    },
    {
      label: { en: "role", ja: "役割", ko: "역할" },
      values: [
        { en: "UI/UX Design", ja: "UI/UXデザイン", ko: "UI/UX 디자인" },
        { en: "Web Development", ja: "ウェブ開発", ko: "웹 개발" },
      ],
    },
    {
      label: { en: "team", ja: "チーム", ko: "팀" },
      values: [
        { en: "Internship", ja: "インターンシップ", ko: "인턴십" },
        {
          en: "solo on the site, with the WeLAB team",
          ja: "サイト担当は1名、WeLABチームと協働",
          ko: "사이트 담당 1인, WeLAB 팀과 협업",
        },
      ],
    },
  ],
  metaRight: [
    {
      label: { en: "tool", ja: "ツール", ko: "도구" },
      values: ["Figma", "WordPress", "Bricks Builder"],
    },
    {
      label: { en: "link", ja: "リンク", ko: "링크" },
      values: [
        { label: "weloveabattle.com", href: "https://weloveabattle.com/" },
      ],
    },
  ],
};
