/* Per-route <head> copy, read by vite.config.js at build time.

   Why this exists as its own plain file: the build writes one static HTML
   page per route and language, so that a crawler — and, more to the point,
   the link unfurlers behind LinkedIn, Slack and iMessage, which do not run
   JavaScript — gets that page's own title, description and locale instead of
   the site-wide default. The project data those strings come from imports
   .webp assets, which Node cannot load, so the copy is mirrored here in
   plain strings. A build-time check keeps the id list in step with
   src/data/projects/index.js.

   Titles stay English in all three languages on purpose, matching
   PAGE_TITLE in src/i18n.js: the wordmark, the header pills and every other
   fixed label on this site are English, and a browser tab that alone
   switched script would read as a different site. */

export const SITE_NAME = "HAJIN";
export const DEFAULT_TITLE = "HAJIN, Product Designer";
export const DEFAULT_DESCRIPTION =
  "Product Designer in Vancouver, BC. Case studies in product design, design systems, and front-end development.";

/* path → what that page says it is. Paths are base- and language-relative,
   no leading slash, so the build can put each one under its own prefix. */
export const ROUTES = [
  {
    path: "",
    title: DEFAULT_TITLE,
    description: {
      en: DEFAULT_DESCRIPTION,
      ja: "カナダ・バンクーバー在住のプロダクトデザイナー。プロダクトデザイン、デザインシステム、フロントエンド開発のケーススタディ。",
      ko: "캐나다 밴쿠버의 프로덕트 디자이너. 프로덕트 디자인, 디자인 시스템, 프런트엔드 개발 케이스 스터디.",
    },
  },
  {
    path: "about",
    title: "About — HAJIN",
    description: {
      en: "Hajin Lee: a product designer in Vancouver who designs and then builds, from research and design systems through to the shipped front end.",
      ja: "Hajin Lee。自分で設計したものを自分で実装するバンクーバーのプロダクトデザイナー。リサーチとデザインシステムから、リリースされるフロントエンドまで。",
      ko: "Hajin Lee. 자기가 설계한 것을 직접 만드는 밴쿠버의 프로덕트 디자이너. 리서치와 디자인 시스템부터 실제 배포되는 프런트엔드까지.",
    },
  },
  {
    path: "work",
    title: "Work — HAJIN",
    description: {
      en: "Five projects: a transit fare card concept for iOS and watchOS, a VFX studio's live site, an apprenticeship tracker, a rescue site, and retail work at MUJI.",
      ja: "5つのプロジェクト。iOSとwatchOSの交通運賃カードのコンセプト、VFXスタジオの本番サイト、見習い課程の進捗管理、保護団体のサイト、そして無印良品でのリテール業務。",
      ko: "다섯 개의 프로젝트. iOS·watchOS 교통 요금 카드 콘셉트, VFX 스튜디오 운영 사이트, 견습 과정 추적 앱, 구조 단체 사이트, 그리고 무인양품 리테일 업무.",
    },
  },
  {
    path: "work/compass-card",
    title: "Compass Card — HAJIN",
    description: {
      en: "A concept app for Metro Vancouver's transit fare card, built for iOS and watchOS on TransLink's upcoming account-based system.",
      ja: "TransLinkがすでに入札にかけたアカウントベースのシステムの上に設計した、メトロバンクーバーの交通運賃カードのiOS・watchOSコンセプトアプリです。",
      ko: "TransLink가 이미 입찰에 부친 계정 기반 시스템 위에 설계한, 메트로밴쿠버 교통 요금 카드의 iOS·watchOS 콘셉트 앱입니다.",
    },
  },
  {
    path: "work/welab",
    title: "WeLAB Entertainment — HAJIN",
    description: {
      en: "An end-to-end website audit, redesign, and WordPress development for a VFX studio: rebuilding layouts and interactions with Bricks Builder and custom code.",
      ja: "VFXスタジオのサイトを、監査からリデザイン、WordPressでの実装まで一貫して担当。レイアウトとインタラクションをBricks Builderと自前のコードで作り直しました。",
      ko: "VFX 스튜디오 사이트를 감사부터 리디자인, WordPress 구현까지 처음부터 끝까지 맡았습니다. 레이아웃과 인터랙션을 Bricks Builder와 직접 쓴 코드로 다시 만들었습니다.",
    },
  },
  {
    path: "work/prolog",
    title: "ProLog — HAJIN",
    description: {
      en: "A 0-to-1 mobile app that turns a fragmented 6,000-hour apprenticeship into one clear, accessible roadmap for neurodivergent apprentices.",
      ja: "バラバラだった6,000時間の見習い課程を、一つの明快で見通しのきくロードマップに変える0→1のモバイルアプリ。ニューロダイバージェントな見習いのために設計しました。",
      ko: "흩어져 있던 6,000시간의 견습 과정을 하나의 분명하고 접근하기 쉬운 로드맵으로 바꾸는 0→1 모바일 앱. 신경다양인 견습생을 위해 설계했습니다.",
    },
  },
  {
    path: "work/tinypaws",
    title: "TinyPaws — HAJIN",
    description: {
      en: "An academic project that gave a rescue website a clear adoption pathway: co-designing the UX, building the brand identity, and hand-coding the responsive site with Astro.",
      ja: "学術プロジェクトとして、保護団体のサイトに迷いのない譲渡までの道すじをつくりました。UXの共同設計、ブランドアイデンティティの構築、そしてAstroによるレスポンシブサイトの実装まで担当しました。",
      ko: "학술 프로젝트로 구조 단체 웹사이트에 헤매지 않는 입양 경로를 만들었습니다. UX 공동 설계, 브랜드 아이덴티티 구축, 그리고 Astro로 반응형 사이트를 직접 코딩했습니다.",
    },
  },
  {
    /* Locked behind a password, so it stays out of the sitemap — but a
       shared link should still say which project it is. Its card copy is
       English in every language, so the description is too. */
    path: "work/muji",
    title: "MUJI — HAJIN",
    description: {
      en: "Driving in-store visual communication strategies and spatial layout optimization to enhance customer journeys and duty-free shopping experiences for international travelers.",
    },
    noindex: true,
  },
];

/* Every project needs a route entry; this is the list to check against. */
export const PROJECT_IDS = ["compass-card", "welab", "prolog", "tinypaws", "muji"];
