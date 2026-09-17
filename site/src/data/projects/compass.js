import cardThumb from "../../assets/compass/compass-card-thumb.webp";
import logoColor from "../../assets/compass/compass-logo-color.webp";
import logoGray from "../../assets/compass/compass-logo-gray.webp";

/* Compass Card — 8 chapters, 90 blocks. Structure and copy are final;
   every figure and solution screen is a labelled placeholder until the
   artwork lands (see CompassPlaceholders.jsx). */

export default {
  id: "compass-card",
  screen: true, // one screen, the column on the wheel: see CaseStudyPage.jsx
  /* the chapters across the top and the column as two, the pictures on
     the left and the words on the right: see splitRows in
     CaseStudyPage.jsx and .cs-split in casestudy.css */
  layout: "split",
  title: "Compass Card",
  /* the Work card's ground: the project's own colour, the copy in the
     page's white on it (see .wk-section in work.css) */
  card: "#68B8E7",
  /* the Work index's entry: the wordmark, in colour when the project is
     on the stage and in grey when it waits; `ratio` is the wordmark's, and
     `scale` its share of the index's common height — the marks differ in
     shape, a wide one-liner reading larger than a compact two-liner at
     one height, so each is scaled to balance with the others. Cut
     from originals/public/media/Compass_color.png and _gray.png. */
  logo: { color: logoColor, gray: logoGray, ratio: [1183, 240], scale: 0.8 },
  /* Work-card thumbnail: the concept running in both its devices — the
     Apple Wallet link-up on the iPhone, a reload and a reader tap on the
     watch. scripts/record-compass-hero.mjs records the screens (the watch
     side drives the playable demo at public/compass/watch/), and
     scripts/build-compass-hero.py composites and cuts the card. */
  /* The Work card's devices: the render of the iPhone and the Apple
     Watch, the landing screen on the phone and the card in the watch's
     wallet, the screens in it already; `ratio` is the picture's. Cut from
     originals/public/media/compasscard_thumnail.png to 1200 tall. */
  mockups: [{ image: cardThumb, ratio: [1287, 1200] }],
  thumbAlt: {
    en: "The Compass app on an iPhone and an Apple Watch: the landing screen on the phone, the card in the watch's wallet",
    ja: "iPhoneとApple Watchで見せるCompassのコンセプト。片方はApple Walletにパスが加わるところ、もう片方はチャージとリーダーへのタッチ",
    ko: "iPhone과 Apple Watch로 보여주는 Compass 콘셉트. 한쪽은 Apple Wallet에 패스가 들어가는 장면, 다른 쪽은 충전과 리더기 태그",
  },
  /* the \\n is where the line turns on a laptop or wider — see .wk-desc in work.css */
  description: {
    en: "A concept app for Metro Vancouver's transit fare card,\nbuilt for iOS and watchOS on TransLink's upcoming account-based system.",
    ja: "TransLinkがすでに入札にかけたアカウントベースのシステムの上に設計した、メトロバンクーバーの交通運賃カードのiOS・watchOSコンセプトアプリです。",
    ko: "TransLink가 이미 입찰에 부친 계정 기반 시스템 위에 설계한, 메트로밴쿠버 교통 요금 카드의 iOS·watchOS 콘셉트 앱입니다.",
  },
  roles: {
    en: "Product Design, Systems UX",
    ja: "プロダクトデザイン、システムUX",
    ko: "프로덕트 디자인, 시스템 UX",
  },
  heroScene: "compass",
  headline: {
    en: "Every ride, one tap. Everything else, one app.",
    ja: "すべての移動は、ワンタッチで。それ以外のすべては、ひとつのアプリで。",
    ko: "모든 이동은 한 번의 태그로. 나머지 전부는 앱 하나로.",
  },
  intro: [
    {
      /* one paragraph in English; the Japanese and Korean keep their two,
         so the second node carries an empty English string that the page
         leaves out (see the intro in CaseStudyPage.jsx) */
      en: "Compass is Metro Vancouver's fare card: every bus, SkyTrain, SeaBus and West Coast Express journey runs through it. You can already tap a phone at a TransLink gate, but what you tap is a bank card, not your Compass Card, which is still plastic, with its balance, reloads, passes and U-Pass living on a website and in station vending machines. This self-initiated concept ==brings the card to the phone==, as an iOS app, a watchOS app and an Apple Wallet pass, on the account-based system TransLink has already put out to tender, with the case built from what the agency publishes about itself rather than from interviews.",
      ja: "Compassはメトロバンクーバーの交通運賃カードです。この地域のバス、SkyTrain、SeaBus、West Coast Expressの乗車は、すべてこのカードを通じて行われます。TransLinkの改札でスマートフォンをかざすこと自体は、すでにできます。ただし、そこで読み取られるのはクレジットカードのタッチ決済であって、本人のCompassカードではありません。カード自体はいまも一枚のプラスチックで、残高・チャージ・定期券・U-Passといったカードにまつわるすべては、ウェブサイトと駅の券売機の中にあります。",
      ko: "Compass는 메트로밴쿠버의 교통 요금 카드입니다. 이 지역의 버스, SkyTrain, SeaBus, West Coast Express 이용은 모두 이 카드를 거칩니다. TransLink 개찰구에서 폰을 대는 것은 이미 됩니다. 다만 그때 태그되는 것은 비접촉 신용·체크카드이지, 본인의 Compass 카드가 아닙니다. 카드 자체는 여전히 플라스틱 한 장이고, 잔액·충전·정기권·U-Pass처럼 그 카드에 관한 모든 것은 웹사이트와 역 안의 무인 발매기에 들어 있습니다.",
    },
    {
      en: "",
      ja: "個人で立ち上げたコンセプトプロジェクトです。iOSアプリ、watchOSアプリ、そしてApple Wallet内のCompassパスを、TransLinkがすでに入札にかけたアカウントベースのシステムの上に設計しました。インタビューできる利用者がいなかったため、根拠は交通事業者が自ら公開している資料に求めました。輸送実績レポート、運賃表、システム刷新のRFP、そして事業者自身の顧客体験計画です。",
      ko: "개인적으로 시작한 콘셉트 프로젝트입니다. iOS 앱, watchOS 앱, 그리고 Apple Wallet 안의 Compass 패스를, TransLink가 이미 입찰에 부친 계정 기반 시스템 위에 설계했습니다. 인터뷰할 사용자가 없었기 때문에, 근거는 운영 기관이 스스로 공개한 자료에서 가져왔습니다. 수송 실적 보고서, 요금표, 시스템 현대화 RFP, 그리고 기관이 발표한 고객 경험 계획입니다.",
    },
  ],
  metaLeft: [
    {
      label: { en: "category", ja: "カテゴリ", ko: "카테고리" },
      values: [
        {
          en: "Product Design",
          ja: "プロダクトデザイン",
          ko: "프로덕트 디자인",
        },
        {
          en: "Self-initiated concept",
          ja: "自主制作コンセプト",
          ko: "개인 콘셉트 프로젝트",
        },
      ],
    },
    {
      label: { en: "timeline", ja: "期間", ko: "기간" },
      values: [
        {
          en: "Jun 2026 – Aug 2026",
          ja: "2026年6月〜8月",
          ko: "2026년 6월~8월",
        },
      ],
    },
    {
      label: { en: "role", ja: "役割", ko: "역할" },
      values: [
        {
          en: "Product Designer",
          ja: "プロダクトデザイナー",
          ko: "프로덕트 디자이너",
        },
        { en: "Solo project", ja: "個人プロジェクト", ko: "1인 프로젝트" },
      ],
    },
  ],
  metaRight: [
    {
      label: { en: "scope", ja: "範囲", ko: "범위" },
      values: [
        { en: "iOS app", ja: "iOSアプリ", ko: "iOS 앱" },
        { en: "watchOS app", ja: "watchOSアプリ", ko: "watchOS 앱" },
        {
          en: "Apple Wallet pass",
          ja: "Apple Walletパス",
          ko: "Apple Wallet 패스",
        },
      ],
    },
    {
      label: { en: "tool", ja: "ツール", ko: "도구" },
      values: ["Figma", "React", "Vite", "Playwright", "Adobe Creative Suite"],
    },
  ],
  demo: { src: "compass/", frame: "blue" },
};
