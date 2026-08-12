import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import { noOrphan, noOrphanSegments } from "../lib/no-orphan.js";
import SiteFooter from "../components/SiteFooter.jsx";
import useFitToWidth from "../hooks/useFitToWidth.js";
import useCanHover from "../hooks/useCanHover.js";
import { PAGE_TITLE } from "../i18n.js";
import portrait from "../assets/about-portrait.webp";

/* Name and its H/이/イ left-side-bearing compensation, per language */
const NAME = { en: "Hajin L.", ko: "이 하진", ja: "イ　ハジン" };
const NAME_INDENT = { en: "-0.1em", ko: "-0.085em", ja: "-0.08em" };

/* The photograph under the name. Described rather than labelled: the three
   prints behind it are the point — Bauhaus Dessau, Fallingwater, Habitat 67 */
const PORTRAIT_ALT = {
  en: "Hajin leaning against the rail of a gallery wall, in front of three black-and-white architectural prints: the Bauhaus building at Dessau with its name running down the facade, Frank Lloyd Wright's Fallingwater cantilevered over its waterfall, and Moshe Safdie's Habitat 67 stacked in concrete.",
  ko: "갤러리 벽의 난간에 기대선 하진. 뒤로는 흑백 건축 사진 세 점이 걸려 있다 — 파사드에 이름이 세로로 적힌 데사우 바우하우스, 폭포 위로 캔틸레버가 뻗은 프랭크 로이드 라이트의 낙수장, 콘크리트가 층층이 쌓인 모셰 사프디의 해비타트 67.",
  ja: "ギャラリーの壁の手すりに寄りかかるハジン。背後には白黒の建築写真が三点 — ファサードに名前が縦に入ったデッサウのバウハウス、滝の上に張り出したフランク・ロイド・ライトの落水荘、コンクリートが積み上がったモシェ・サフディのハビタット67。",
};

/* The one address on the page. The closing paragraph and the rail both link
   to it, so it is written once. */
const MAILTO = "mailto:hajinlee.ca@gmail.com";

/* Hero sentence + body paragraphs per language. A paragraph is a string, or
   an array of segments when it carries an inline link — the word that opens
   a mail window is part of the sentence in each language's own grammar. */
const ABOUT = {
  en: {
    hero: "A Product Designer who\nfinds where users get stuck, and turns that into clear structure and a visual language that holds up.",
    body: [
      "I started in retail visual merchandising, where I designed physical customer journeys and visual hierarchies. Moving that work onto screens did not change the questions I ask: where does someone look first, and what do they do next.",
      "Good design, to me, is mostly a matter of finding the problem underneath the one you were handed, then getting out of the user's way. I have worked at both ends of a product's life: launching from nothing, and going back into something that already shipped to rebuild its layout system and its responsive components.",
      "What I care about most is working at the same pace as the people around me. Designers, developers and marketers describe the same problem in different vocabularies, and the solution gets sturdier when you can follow all of them.",
      [
        "If you are working on something like this, I would like to hear about it. Write me an ",
        { text: "email", href: MAILTO },
        ".",
      ],
    ],
  },
  ko: {
    hero: "복합적인 상황 속에서 사용자의 불편함을 발견하고, 이를 명료한 구조와 시각적 언어로 해결하는 프로덕트 디자이너.",
    body: [
      "제가 정의하는 좋은 디자인이란 과제의 본질을 파악하여 목표에 직관적으로 도달하도록 돕는 것입니다. 저는 사용자의 페인 포인트를 비판적인 시각으로 분석하고, 파편화된 정보를 명료한 구조와 정교하게 시각적으로 구현할 때 큰 가치를 만들어냅니다.",
      "최근 프로젝트에서는 레이아웃 시스템 재구축을 통한 웹 사용성 개선이나 커스텀 코드와 라이브러리를 활용한 CTA 추가 등 기존 프로덕트를 고도화하는 작업에 집중하였습니다. 또 다른 프로젝트에서는 서비스 기획부터 디자인, 개발, 마케팅까지 신규 서비스를 출시하는 프로덕트의 주기 전반에 참여하였습니다.\n양쪽 경험을 통해, 프로덕트의 어떤 사이클에서도 팀의 방향성에 맞춰 유연하게 필요한 솔루션을 찾아낼 것입니다.",
      "공유된 목표를 위해 팀원들과 같은 시선과 호흡으로 나아가는 과정을 가장 가치 있게 여깁니다. 이 과정에서 서로 다른 직군의 언어를 이해하고 유연하게 소통할 때 솔루션을 더 견고해진다고 믿습니다.",
      [
        "저와 함께 솔루션을 만들어가고 싶으시거나, 좋은 기회 제안이 있다면 언제든 ",
        { text: "이메일", href: MAILTO },
        "로 편하게 연락해 주세요!",
      ],
    ],
  },
  ja: {
    hero: "複雑な状況の中からユーザーの本質的な課題を発見し、明快な構造と洗練された視覚的言語で解決するプロダクトデザイナーです。",
    body: [
      "私が定義する優れたデザインとは、課題の本質を捉え、ユーザーが直感的に目的に到達できるよう手助けすることです。私はユーザーのペインポイントを批判的な視点で分析し、断片化された情報を明快な構造と精緻なビジュアルへと落とし込むことに大きな価値を生み出します。",
      "最近のプロジェクトでは、レイアウトシステムの再構築によるウェブのユーザビリティ改善や、カスタムコードとライブラリを活用した新たなCTAの追加など、既存プロダクトの高度化（改善）に注力しました。また、別のプロジェクトでは、サービスの企画からデザイン、開発、マーケティングに至るまで、新規サービスをリリースするプロダクトライフサイクル全般を主導しました。両方のフェーズを経験したからこそ、プロダクトのいかなるサイクルにおいてもチームの方向性に合わせ、柔軟に必要なソリューションを導き出すことができます。",
      "共通の目標に向かって、チームメンバーと同じ目線と歩調で進んでいくプロセスを最も大切にしています。この過程において、異なる職種の言語を理解し柔軟にコミュニケーションを取ることで、ソリューションはより堅牢なものになると信じています。",
      [
        "私と一緒にユーザーのための明快なソリューションを作りたい方や、魅力的な機会のご提案がございましたら、いつでもお気軽に",
        { text: "メール", href: MAILTO },
        "にてご連絡ください。お話しできるのを楽しみにしています！",
      ],
    ],
  },
};

/* The rail. E-mail closes it because the copy above ends by asking for one;
   a mailto: opens the reader's own mail client, so it is the one entry that
   must not carry target="_blank" — the tab it opened would be left blank. */
const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hajin-lee-ca" },
  // no href yet: renders inert until the PDF exists — a placeholder "#"
  // would hash-navigate the visitor back to the landing page
  { label: "Resume", href: null },
  { label: "GitHub", href: "https://github.com/Jinontheclock" },
  { label: "Instagram", href: "https://www.instagram.com/hj.archiv/" },
  { label: "E-mail", href: MAILTO },
];

/* "What I did" descriptions per entry, per language. Each sentence opens a
   line of its own — .xp-desc is `white-space: pre-line`, so the newlines
   below are the break. Keep one when adding a sentence. */
const DESCRIPTIONS = {
  welab: {
    en: "Redesigned and rebuilt the studio's public site in WordPress with Bricks Builder, writing custom code where the builder ran out.\nAdded multi-language support and new CTA components, and worked on the site's SEO.",
    ko: "에이전시의 포트폴리오 웹사이트 리뉴얼 프로젝트에서 UI/UX 디자인과 WordPress을 통해 직접 구현하였습니다.\nBricksbuilder와 커스텀 코드를 활용해 웹의 레이아웃 시스템을 개선하고 다개국어 및 CTA 관련 기능을 추가했습니다. 템플릿 리디자인과 SEO 매니지먼트에 참여하며 웹사이트의 전반적인 성능 최적화에 집중했습니다.",
    ja: "エイジェンシーのポートフォリオWebサイトのリニューアルプロジェクトにおいて、UI/UXデザインからWordPressによる直接実装までを一貫して担当しました。\nBricks Builderとカスタムコードを活用してWebサイトのレイアウトシステムを改善し、多言語対応およびCTA関連機能を追加しました。テンプレートのリデザインやSEOマネジメントにも携わり、Webサイト全体のパフォーマンス最適化に注力しました。",
  },
  muji: {
    en: "Planned in-store visual communication and floor layouts, which set how customers moved through the space.\nWorked on the duty-free shopping experience for inbound international travelers.",
    ko: "브랜딩 강화를 위해 비주얼 커뮤니케이션과 오프라인 매장 경험을 증진하는 프로젝트를 수행했습니다.\n특히 인바운드 고객층을 타겟으로 한 마케팅 및 면세 쇼핑 관련 고객 여정(UX) 개선을 위한 전략 수립에 집중했습니다. 이와 더불어 매장 레이아웃 및 디스플레이 최적화를 위한 프로젝트들을 주도했습니다.",
    ja: "ブランディング強化のため、ビジュアルコミュニケーションの最適化とオフライン店舗における顧客体験（UX）の向上を目的としたプロジェクトを遂行しました。\n特にインバウンド（訪日外国人）顧客層をターゲットとしたマーケティングや、免税ショッピングに伴うカスタマージャーニーの改善に向けた戦略立案に注力しました。これに加え、店舗レイアウトおよびディスプレイ最適化のためのプロジェクトを主導しました。",
  },
  bcit: {
    en: "Studied UI/UX design alongside front-end development and marketing, and built web and mobile products end to end.\nMost of my time went to prototyping and layout systems.",
    ko: "디지털 디자인, 프론트엔드 프로그래밍, 마케팅을 융합적으로 학습하며 프로젝트 수행 역량을 다지는 데 집중하였습니다.\n주로 앱과 웹 중심의 프로덕트를 위한 UIUX 디자인을 깊게 연구하였으며, 프로토타입 구현과 개발 프로세스를 주도적으로 경험했습니다.",
    ja: "デジタルデザイン、フロントエンドプログラミング、マーケティングを融合的に学びながら、プロジェクト遂行能力を高めることに注力しました。\n主にアプリやWebを中心としたプロダクトのUI/UXデザインを深く研究し、インタラクティブなプロトタイプ実装や開発プロセスの推進を主体的に経験しました。",
  },
  inha: {
    en: "Studied fashion design, merchandising and market analysis.\nThe merchandising side is where I first learned to read what people buy and why, which is closer to UX research than it sounds.",
    ko: "디자인, 패턴, 섬유, 마케팅, 비즈니스 등 의류 산업 전반의 프로세스를 아우르는 각 분야를 학습을 진행했습니다.\n제품 기획과 시장 흐름을 분석하는 머천다이징을 중심으로, 비즈니스 관점과 시각적 커뮤니케이션 능력을 결합하는 데 집중했습니다.",
    ja: "デザイン、パターン、繊維、マーケティング、ビジネスなど、アパレル産業全般のプロセスを網羅する各分野の学習を行いました。\n製品企画や市場トレンドを分析するマーチャンダイジング（MD）を中心に、ビジネス的な視点とビジュアルコミュニケーション能力を結合させることに注力しました。",
  },
};

const EXPERIENCES = [
  {
    id: "welab",
    title: "UI/UX Designer",
    org: "WeLAB Entertainment",
    period: {
      en: "Mar 2026 – May 2026",
      ko: "2026.03 – 2026.05",
      ja: "2026.03 – 2026.05",
    },
    type: "Internship",
    location: "Vancouver, Canada",
  },
  {
    id: "muji",
    title: "Visual Merchandiser",
    org: "MUJI Japan",
    period: {
      en: "Apr 2022 – Sep 2024",
      ko: "2022.04 – 2024.09",
      ja: "2022.04 – 2024.09",
    },
    type: "Full-time",
    location: "Tokyo, Japan",
  },
];

const EDUCATION = [
  {
    id: "bcit",
    title: "Digital Design and Development",
    org: "British Columbia Institute of Technology",
    period: { en: "Jun 2026", ko: "2026.06", ja: "2026.06" },
    type: "Diploma",
    location: "Burnaby, Canada",
  },
  {
    id: "inha",
    title: "Fashion Design and Textiles",
    org: "Inha University",
    period: { en: "Feb 2022", ko: "2022.02", ja: "2022.02" },
    type: "Bachelor's Degree",
    location: "Incheon, Korea",
  },
];

/* Skills per language — five groups in every language. Each row is one
   line: `main` plus an optional annotation after a colon. `sub` trails
   the main text and `lead` precedes it. Program/tech names stay in English
   in every language.

   English leads with the label and trails the detail throughout, so every
   row there is `main: sub`; Korean and Japanese still carry the earlier
   copy, where the two technical groups put the sublabel in `lead`. The row
   counts no longer match 1:1 across the three — English's technical group
   is three rows against the other two languages' four. */
const SKILLS = {
  en: [
    {
      label: "Design",
      rows: [
        {
          main: "Product Design",
          sub: "end-to-end UX/UI, web & mobile platforms",
        },
        {
          main: "Design Systems",
          sub: "semantic tokens, component libraries, documentation",
        },
        {
          main: "Interaction Design & Prototyping",
          sub: "micro-interactions, high-fidelity prototypes",
        },
        {
          main: "Visual & Graphic Design",
          sub: "layout systems, typography, motion design",
        },
        { main: "Accessibility (a11y)", sub: "WCAG 2.1/2.2 AA compliance" },
      ],
    },
    {
      label: "Research & Strategy",
      rows: [
        {
          main: "User Research",
          sub: "user interviews, surveys, contextual inquiry",
        },
        {
          main: "Usability Testing",
          sub: "moderated & unmoderated UT, feedback analysis",
        },
        {
          main: "Journey Mapping",
          sub: "user touchpoints, pain points, opportunity mapping",
        },
        {
          main: "Information Architecture",
          sub: "sitemaps, content hierarchy, user flows",
        },
      ],
    },
    {
      label: "Technical Literacy",
      rows: [
        {
          main: "Front-end Languages",
          sub: "HTML5, CSS3, JavaScript, TypeScript",
        },
        {
          main: "Frameworks & Libraries",
          sub: "React, Next.js, Tailwind CSS, GSAP",
        },
        {
          main: "Development Workflow",
          sub: "Git/GitHub, Vercel, WordPress (CMS)",
        },
      ],
    },
    {
      label: "Tools & AI Workflows",
      rows: [
        { main: "Design & Prototyping", sub: "Figma, Framer" },
        {
          main: "Creative Suite",
          sub: "Adobe Illustrator, Photoshop, After Effects, InDesign",
        },
        { main: "Analytics", sub: "Google Analytics (GA4)" },
        {
          main: "AI-Assisted Workflow",
          sub: "Figma AI, Cursor, ChatGPT, Claude",
        },
      ],
    },
    {
      label: "Languages",
      // the page's own language leads the list in every locale
      rows: [{ main: "English" }, { main: "Korean" }, { main: "Japanese" }],
    },
  ],
  ko: [
    {
      label: "디자인",
      rows: [
        { main: "프로덕트 디자인" },
        { main: "디자인 시스템", sub: "시맨틱 토큰, 컴포넌트 라이브러리" },
        { main: "인터랙션 디자인 & 프로토타이핑" },
        {
          main: "비주얼 & 그래픽 디자인",
          sub: "타이포그래피, 브랜드 아이덴티티, 모션",
        },
        { main: "접근성", sub: "WCAG 2.1/2.2 AA" },
      ],
    },
    {
      label: "리서치 & 전략",
      rows: [
        { main: "사용자 리서치", sub: "인터뷰, 설문조사, 컨텍스추얼 인쿼리" },
        { main: "사용성 테스트", sub: "진행자 유/무 방식" },
        { main: "저니 매핑", sub: "터치포인트, 페인포인트, 개선 기회" },
        { main: "정보 구조 설계(IA)", sub: "와이어프레임, 유저 플로우" },
      ],
    },
    {
      label: "개발",
      rows: [
        { lead: "언어", main: "HTML5, CSS3, JavaScript, TypeScript" },
        { lead: "프레임워크", main: "React, Next.js" },
        {
          lead: "스타일링 & 애니메이션",
          main: "Tailwind CSS, CSS Modules, GSAP",
        },
        { lead: "워크플로우", main: "Git/GitHub, Vercel" },
      ],
    },
    {
      label: "툴",
      rows: [
        { main: "Figma, Framer, WordPress", sub: "디자인 & 프로토타이핑" },
        {
          main: "Adobe Creative Suite",
          sub: "Adobe Illustrator, Photoshop, After Effects, InDesign",
        },
        { main: "Google Analytics (GA4)", sub: "애널리틱스" },
        { main: "Figma AI, Cursor, ChatGPT, Claude", sub: "AI" },
      ],
    },
    {
      label: "구사 언어",
      rows: [{ main: "한국어" }, { main: "영어" }, { main: "일본어" }],
    },
  ],
  ja: [
    {
      label: "デザイン",
      rows: [
        { main: "プロダクトデザイン" },
        {
          main: "デザインシステム",
          sub: "セマンティックトークン、コンポーネントライブラリ",
        },
        { main: "インタラクションデザイン & プロトタイピング" },
        {
          main: "ビジュアル & グラフィックデザイン",
          sub: "タイポグラフィ、ブランドアイデンティティ、モーション",
        },
        { main: "アクセシビリティ", sub: "WCAG 2.1/2.2 AA" },
      ],
    },
    {
      label: "リサーチ & ストラテジー",
      rows: [
        {
          main: "ユーザーリサーチ",
          sub: "インタビュー、アンケート調査、コンテクスチュアルインクワイアリー",
        },
        { main: "ユーザビリティテスト", sub: "モデレーターあり/なし" },
        {
          main: "ジャーニーマッピング",
          sub: "タッチポイント、ペインポイント、改善機会",
        },
        {
          main: "情報アーキテクチャ(IA)",
          sub: "ワイヤーフレーム、ユーザーフロー",
        },
      ],
    },
    {
      label: "開発",
      rows: [
        { lead: "言語", main: "HTML5, CSS3, JavaScript, TypeScript" },
        { lead: "フレームワーク", main: "React, Next.js" },
        {
          lead: "スタイリング & アニメーション",
          main: "Tailwind CSS, CSS Modules, GSAP",
        },
        { lead: "ワークフロー", main: "Git/GitHub, Vercel" },
      ],
    },
    {
      label: "ツール",
      rows: [
        {
          main: "Figma, Framer, WordPress",
          sub: "デザイン & プロトタイピング",
        },
        {
          main: "Adobe Creative Suite",
          sub: "Adobe Illustrator, Photoshop, After Effects, InDesign",
        },
        { main: "Google Analytics (GA4)", sub: "アナリティクス" },
        { main: "Figma AI, Cursor, ChatGPT, Claude", sub: "AI" },
      ],
    },
    {
      label: "語学",
      rows: [{ main: "日本語" }, { main: "韓国語" }, { main: "英語" }],
    },
  ],
};

/** Head (title with the period right-aligned, then org) matches the Figma
 *  list format; hovering unfolds type + location and the description, and a
 *  click pins it open so it stays after the mouse leaves. */
function Entry({ entry }) {
  const canHover = useCanHover();
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  // on touch, a tapped mouseenter sticks, so ignore hover and let taps toggle
  const open = pinned || (canHover && hovered);

  return (
    <div
      className="xp-entry"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        className="xp-head"
        onClick={() => setPinned((p) => !p)}
      >
        <span className="xp-row">
          <span>{entry.title}</span>
          <span className="xp-right">{entry.period}</span>
        </span>
        <span>{entry.org}</span>
      </button>
      <div className={"xp-detail" + (open ? " is-open" : "")}>
        <div className="xp-detail-inner">
          <div className="xp-row xp-type-row">
            <span>{entry.type}</span>
            <span className="xp-right">{entry.location}</span>
          </div>
          <p className="xp-desc">{entry.description}</p>
        </div>
      </div>
    </div>
  );
}

/** One skill line at body size: the main text plus an optional annotated
 *  part after a colon. `lead` precedes it (Development's sublabels),
 *  `sub` trails it (detail notes, Tools' category labels). Inline flow, so
 *  long lines wrap like prose. The note spans share the section's uniform
 *  primary color; the class just keeps the structure restylable. */
function SkillRow({ row }) {
  return (
    <div className="ab-skill-row">
      {row.lead && <span className="ab-skill-note">{`${row.lead}: `}</span>}
      {row.main}
      {row.sub && <span className="ab-skill-note">{`: ${row.sub}`}</span>}
    </div>
  );
}

export default function AboutPage({ lang, setLang, fadeClass = "" }) {
  useEffect(() => {
    document.title = PAGE_TITLE.about[lang] || PAGE_TITLE.about.en;
  }, [lang]);

  // on mobile the rail is a single row above the name; shrink to fit one line
  const railRef = useFitToWidth(12);
  const about = ABOUT[lang] || ABOUT.en;
  const withDesc = (list) =>
    list.map((e) => ({
      ...e,
      period: e.period[lang] || e.period.en,
      description: DESCRIPTIONS[e.id][lang] || DESCRIPTIONS[e.id].en,
    }));

  return (
    <div className="ab-root">
      <SiteHeader current="about" />

      <main className={"ab-main " + fadeClass}>
        <div className="ab-grid ab-layout">
          <nav className="ab-rail" ref={railRef}>
            {LINKS.map((l) =>
              l.href ? (
                <a
                  key={l.label}
                  href={l.href}
                  className="ab-rail-link"
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {l.label}
                </a>
              ) : (
                <span key={l.label} className="ab-rail-link is-pending" aria-disabled="true">
                  {l.label}
                </span>
              )
            )}
          </nav>

          <div className="ab-content">
            {/* opens the column, and the first thing on the page worth
                loading — no lazy attribute, or it arrives late */}
            <img
              className="ab-portrait"
              src={portrait}
              alt={PORTRAIT_ALT[lang] || PORTRAIT_ALT.en}
              width="2000"
              height="1083"
              decoding="async"
            />
            {/* the name and the sentence that answers it share a line, sitting
                on the same bottom edge — one opening statement rather than
                two stacked ones */}
            <div className="ab-lede">
              <h1
                className="ab-title"
                style={{ textIndent: NAME_INDENT[lang] || NAME_INDENT.en }}
              >
                {NAME[lang] || NAME.en}
              </h1>
              <p className="ab-paragraph ab-hero">{noOrphan(about.hero)}</p>
            </div>
            {about.body.map((para, i) => (
              <p key={i} className="ab-paragraph">
                {typeof para === "string"
                  ? noOrphan(para)
                  : noOrphanSegments(para).map((seg, j) =>
                      typeof seg === "string" ? (
                        seg
                      ) : (
                        /* mailto: hands off to the reader's own mail client,
                           so it must stay in place — a new tab would be left
                           blank behind the compose window */
                        <a
                          key={j}
                          href={seg.href}
                          target={
                            seg.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            seg.href.startsWith("http")
                              ? "noreferrer"
                              : undefined
                          }
                        >
                          {seg.text}
                        </a>
                      ),
                    )}
              </p>
            ))}

            <section className="ab-section">
              <h2 className="ab-section-label">Experience</h2>
              <div className="xp-list">
                {withDesc(EXPERIENCES).map((e) => (
                  <Entry key={e.title + e.period} entry={e} />
                ))}
              </div>
            </section>

            <section className="ab-section">
              <h2 className="ab-section-label">Education</h2>
              <div className="xp-list">
                {withDesc(EDUCATION).map((e) => (
                  <Entry key={e.title + e.period} entry={e} />
                ))}
              </div>
            </section>

            <section className="ab-section">
              <h2 className="ab-section-label">Skills</h2>
              <div className="ab-skills">
                {(SKILLS[lang] || SKILLS.en).map((group) => (
                  <div key={group.label} className="ab-skill-group">
                    <h3 className="ab-skill-label">{group.label}</h3>
                    <div className="ab-skill-rows">
                      {group.rows.map((row, i) => (
                        <SkillRow key={i} row={row} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} setLang={setLang} />
    </div>
  );
}
