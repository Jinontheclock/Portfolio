import cardThumb from "../../assets/prolog/prolog-card-thumb.webp";
import logoColor from "../../assets/prolog/prolog-logo-color.webp";
import logoGray from "../../assets/prolog/prolog-logo-gray.webp";

export default {
  id: "prolog",
  screen: true, // one screen, the column on the wheel: see CaseStudyPage.jsx
  /* the chapters across the top and the column as two, the pictures on
     the left and the words on the right: see splitRows in
     CaseStudyPage.jsx and .cs-split in casestudy.css */
  layout: "split",
  title: "ProLog",
  /* the Work card's ground: the project's own colour, the copy in the
     page's white on it (see .wk-section in work.css) */
  card: "#E58555",
  /* the Work index's entry: the wordmark, in colour when the project is
     on the stage and in grey when it waits; `ratio` is the wordmark's, and
     `scale` its share of the index's common height — the marks differ in
     shape, a wide one-liner reading larger than a compact two-liner at
     one height, so each is scaled to balance with the others. Cut
     from originals/public/media/prolog_color.png and _gray.png. */
  logo: { color: logoColor, gray: logoGray, ratio: [797, 240], scale: 1.0 },
  /* The Work card's devices: the render of the two iPhones, the
     dashboard's journey on one and the paystub records on the other, the
     screens in it already; `ratio` is the picture's. Cut from
     originals/public/media/ProLog_thumnail.png to 1200 tall. */
  mockups: [{ image: cardThumb, ratio: [826, 1200] }],
  thumbAlt: {
    en: "The ProLog app on two iPhones: the dashboard's journey on one, the paystub records on the other",
    ja: "iPhoneとGalaxyで動くProLogのアプリ。片方はダッシュボードの進捗が埋まっていき、もう片方はスキルのクイズを解いている",
    ko: "iPhone과 Galaxy에서 동작하는 ProLog 앱. 한쪽은 대시보드 진행률이 채워지고, 다른 쪽은 스킬 퀴즈를 푸는 화면",
  },
  /* the \\n is where the line turns on a laptop or wider — see .wk-desc in work.css */
  description: {
    en: "A 0-to-1 mobile app that turns a fragmented 6,000-hour apprenticeship\ninto one clear, accessible roadmap for neurodivergent apprentices.",
    ja: "バラバラだった6,000時間の見習い課程を、一つの明快で見通しのきくロードマップに変えるモバイルアプリ。ニューロダイバージェントな見習いのために設計しました。",
    ko: "흩어져 있던 6,000시간의 견습 과정을 하나의 분명하고 접근하기 쉬운 로드맵으로 바꾸는 모바일 앱. 신경다양인 견습생을 위해 설계했습니다.",
  },
  roles: {
    en: "Lead Development, UX/UI Design",
    ja: "リード開発、UX/UIデザイン",
    ko: "리드 개발, UX/UI 디자인",
  },
  heroScene: "journey",
  headline: {
    en: "Bringing a 6,000-hour journey into one clear view.",
    ja: "6,000時間の道のりを、ひと目で見渡せる一つの画面に。",
    ko: "6,000시간의 여정을, 한눈에 들어오는 하나의 화면으로.",
  },
  intro: [
    {
      en: [
        "ProLog is a progress-tracking app that ==levels the playing field for neurodivergent apprentices== in ",
        { text: "BC skilled trades", href: "https://skilledtradesbc.ca/" },
        ". As lead developer on an eight-person team, I worked on the UX/UI design and turned the design system into a working React Native build. The project was created for the ",
        {
          text: "ConnectHER",
          href: "https://www.bcit.ca/construction-environment/welcome-to-the-connectherhub/",
        },
        " Technology Showcase and presented at ",
        { text: "SSE Y2WD", href: "https://www.d3-fswd.ca" },
        ".",
      ],
      ja: [
        "ProLogは、",
        { text: "BC州の技能職", href: "https://skilledtradesbc.ca/" },
        "で働くニューロダイバージェントな見習いが同じスタートラインに立てるようにする進捗管理アプリです。8名チームのリード開発者として、UX/UIデザインに携わり、デザインシステムを実際に動作するReact Nativeのビルドに落とし込みました。このプロジェクトは",
        {
          text: "ConnectHER",
          href: "https://www.bcit.ca/construction-environment/welcome-to-the-connectherhub/",
        },
        " Technology Showcaseのために制作し、",
        { text: "SSE Y2WD", href: "https://www.d3-fswd.ca" },
        "でも発表しました。",
      ],
      ko: [
        "ProLog는 ",
        { text: "BC주 기능직", href: "https://skilledtradesbc.ca/" },
        "에서 일하는 신경다양인 견습생이 같은 출발선에 설 수 있게 하는 진행 상황 추적 앱입니다. 8명 팀의 리드 개발자로서 UX/UI 디자인에 참여했고, 디자인 시스템을 실제로 동작하는 React Native 빌드로 옮겼습니다. 이 프로젝트는 ",
        {
          text: "ConnectHER",
          href: "https://www.bcit.ca/construction-environment/welcome-to-the-connectherhub/",
        },
        " Technology Showcase를 위해 만들었고, ",
        { text: "SSE Y2WD", href: "https://www.d3-fswd.ca" },
        "에서도 발표했습니다.",
      ],
    },
  ],
  metaLeft: [
    {
      label: { en: "category", ja: "カテゴリ", ko: "카테고리" },
      values: [{ en: "Mobile App", ja: "モバイルアプリ", ko: "모바일 앱" }],
    },
    {
      label: { en: "timeline", ja: "期間", ko: "기간" },
      values: [
        {
          en: "Sept 2025 – Dec 2025",
          ja: "2025年9月〜12月",
          ko: "2025년 9월~12월",
        },
      ],
    },
    {
      label: { en: "role", ja: "役割", ko: "역할" },
      values: [
        { en: "Lead Developer", ja: "リード開発者", ko: "리드 개발자" },
        { en: "UX/UI Design", ja: "UX/UIデザイン", ko: "UX/UI 디자인" },
      ],
    },
    {
      label: { en: "team", ja: "チーム", ko: "팀" },
      values: [
        { en: "8 people", ja: "8名", ko: "8명" },
        {
          en: "design · development · research · marketing",
          ja: "デザイン・開発・リサーチ・マーケティング",
          ko: "디자인 · 개발 · 리서치 · 마케팅",
        },
      ],
    },
  ],
  metaRight: [
    {
      label: { en: "tool", ja: "ツール", ko: "도구" },
      values: ["Figma", "React Native Expo", "Framer", "Adobe Creative Suite"],
    },
    {
      label: { en: "link", ja: "リンク", ko: "링크" },
      values: [
        {
          label: { en: "Website", ja: "ウェブサイト", ko: "웹사이트" },
          href: "https://prolog.framer.website/",
        },
        { label: "Instagram", href: "https://www.instagram.com/prolog.app/" },
        {
          label: { en: "Blog", ja: "ブログ", ko: "블로그" },
          href: "https://prolog.framer.website/blog",
        },
        { label: "GitHub", href: "https://github.com/Jinontheclock/ProLog" },
      ],
    },
  ],
  demo: true,
};
