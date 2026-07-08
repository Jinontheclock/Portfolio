import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import useFitToWidth from "../hooks/useFitToWidth.js";
import useCanHover from "../hooks/useCanHover.js";

/* Name and its H/이/イ left-side-bearing compensation, per language */
const NAME = { en: "Hajin L.", ko: "이 하진", ja: "イ　ハジン" };
const NAME_INDENT = { en: "-0.1em", ko: "-0.085em", ja: "-0.08em" };

/* Hero sentence + body paragraphs per language */
const ABOUT = {
  en: {
    hero: "A Product Designer who uncovers user friction within complex environments and resolves it through clear structure and refined visual language.",
    body: [
      "To me, great design means identifying the core friction of a challenge and guiding users intuitively to their goals. I analyze user pain points through a critical lens, creating the highest value when translating fragmented information into clear architecture and polished visuals.",
      "In my recent projects, I focused on enhancing existing products by rebuilding layout systems to improve web usability and implementing new CTAs using custom code and libraries. On another project, I participated in the entire product lifecycle—spanning initial ideation, design, development, and marketing—to successfully launch a new service. Having experienced both sides, I can seamlessly adapt to any product cycle and agilely deliver the exact solutions the team needs.",
      "I highly value the process of moving at the same pace and alignment with team members toward a shared vision. I believe our solutions become far more robust when we understand the languages of different functions and communicate with flexibility.",
      "If you'd like to build clear, meaningful solutions together, or if you have an exciting opportunity, please feel free to reach out via email. Let's chat!",
    ],
  },
  ko: {
    hero: "복합적인 상황 속에서 사용자의 불편함을 발견하고, 이를 명료한 구조와 시각적 언어로 해결하는 프로덕트 디자이너.",
    body: [
      "제가 정의하는 좋은 디자인이란 과제의 본질을 파악하여 목표에 직관적으로 도달하도록 돕는 것입니다. 저는 사용자의 페인 포인트를 비판적인 시각으로 분석하고, 파편화된 정보를 명료한 구조와 정교하게 시각적으로 구현할 때 큰 가치를 만들어냅니다.",
      "최근 프로젝트에서는 레이아웃 시스템 재구축을 통한 웹 사용성 개선이나 커스텀 코드와 라이브러리를 활용한 CTA 추가 등 기존 프로덕트를 고도화하는 작업에 집중하였습니다. 또 다른 프로젝트에서는 서비스 기획부터 디자인, 개발, 마케팅까지 신규 서비스를 출시하는 프로덕트의 주기 전반에 참여하였습니다.\n양쪽 경험을 통해, 프로덕트의 어떤 사이클에서도 팀의 방향성에 맞춰 유연하게 필요한 솔루션을 찾아낼 것입니다.",
      "공유된 목표를 위해 팀원들과 같은 시선과 호흡으로 나아가는 과정을 가장 가치 있게 여깁니다. 이 과정에서 서로 다른 직군의 언어를 이해하고 유연하게 소통할 때 솔루션을 더 견고해진다고 믿습니다.",
      "저와 함께 솔루션을 만들어가고 싶으시거나, 좋은 기회 제안이 있다면 언제든 이메일로 편하게 연락해 주세요!",
    ],
  },
  ja: {
    hero: "複雑な状況の中からユーザーの本質的な課題を発見し、明快な構造と洗練された視覚的言語で解決するプロダクトデザイナーです。",
    body: [
      "私が定義する優れたデザインとは、課題の本質を捉え、ユーザーが直感的に目的に到達できるよう手助けすることです。私はユーザーのペインポイントを批判的な視点で分析し、断片化された情報を明快な構造と精緻なビジュアルへと落とし込むことに大きな価値を生み出します。",
      "最近のプロジェクトでは、レイアウトシステムの再構築によるウェブのユーザビリティ改善や、カスタムコードとライブラリを活用した新たなCTAの追加など、既存プロダクトの高度化（改善）に注力しました。また、別のプロジェクトでは、サービスの企画からデザイン、開発、マーケティングに至るまで、新規サービスをリリースするプロダクトライフサイクル全般を主導しました。両方のフェーズを経験したからこそ、プロダクトのいかなるサイクルにおいてもチームの方向性に合わせ、柔軟に必要なソリューションを導き出すことができます。",
      "共通の目標に向かって、チームメンバーと同じ目線と歩調で進んでいくプロセスを最も大切にしています。この過程において、異なる職種の言語を理解し柔軟にコミュニケーションを取ることで、ソリューションはより堅牢なものになると信じています。",
      "私と一緒にユーザーのための明快なソリューションを作りたい方や、魅力的な機会のご提案がございましたら、いつでもお気軽にメールにてご連絡ください。お話しできるのを楽しみにしています！",
    ],
  },
};

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hajin-lee-ca" },
  { label: "Resume", href: "#" },
  { label: "Contact", href: "#" },
  { label: "GitHub", href: "https://github.com/Jinontheclock" },
  { label: "Instagram", href: "https://www.instagram.com/hj.archiv/" },
];

/* "What I did" descriptions per entry, per language */
const DESCRIPTIONS = {
  welab: {
    en: "Executed both the UI/UX design and hands-on WordPress development for the agency's portfolio website renewal project.\nEnhanced the web layout system using Bricks Builder and custom code, while integrating multi-language support and advanced CTA functionalities. Focused on optimizing overall site performance through template redesign and SEO management.",
    ko: "에이전시의 포트폴리오 웹사이트 리뉴얼 프로젝트에서 UI/UX 디자인과 WordPress을 통해 직접 구현하였습니다.\nBricksbuilder와 커스텀 코드를 활용해 웹의 레이아웃 시스템을 개선하고 다개국어 및 CTA 관련 기능을 추가했습니다. 템플릿 리디자인과 SEO 매니지먼트에 참여하며 웹사이트의 전반적인 성능 최적화에 집중했습니다.",
    ja: "エイジェンシーのポートフォリオWebサイトのリニューアルプロジェクトにおいて、UI/UXデザインからWordPressによる直接実装までを一貫して担当しました。\nBricks Builderとカスタムコードを活用してWebサイトのレイアウトシステムを改善し、多言語対応およびCTA関連機能を追加しました。テンプレートのリデザインやSEOマネジメントにも携わり、Webサイト全体のパフォーマンス最適化に注力しました。",
  },
  muji: {
    en: "Driven visual communication strategies and enhanced in-store customer experiences to strengthen core branding.\nFocused on formulating marketing frameworks and optimizing the duty-free shopping journey (UX) tailored for inbound international travelers. Led strategic projects specializing in store layout and display optimization.",
    ko: "브랜딩 강화를 위해 비주얼 커뮤니케이션과 오프라인 매장 경험을 증진하는 프로젝트를 수행했습니다.\n특히 인바운드 고객층을 타겟으로 한 마케팅 및 면세 쇼핑 관련 고객 여정(UX) 개선을 위한 전략 수립에 집중했습니다. 이와 더불어 매장 레이아웃 및 디스플레이 최적화를 위한 프로젝트들을 주도했습니다.",
    ja: "ブランディング強化のため、ビジュアルコミュニケーションの最適化とオフライン店舗における顧客体験（UX）の向上を目的としたプロジェクトを遂行しました。\n特にインバウンド（訪日外国人）顧客層をターゲットとしたマーケティングや、免税ショッピングに伴うカスタマージャーニーの改善に向けた戦略立案に注力しました。これに加え、店舗レイアウトおよびディスプレイ最適化のためのプロジェクトを主導しました。",
  },
  bcit: {
    en: "Focused on mastering cross-disciplinary project execution by blending digital design, frontend programming, and marketing.\nImmersed myself in UI/UX design primarily for web and app products, gaining hands-on experience driving interactive prototyping and the overall development process.",
    ko: "디지털 디자인, 프론트엔드 프로그래밍, 마케팅을 융합적으로 학습하며 프로젝트 수행 역량을 다지는 데 집중하였습니다.\n주로 앱과 웹 중심의 프로덕트를 위한 UIUX 디자인을 깊게 연구하였으며, 프로토타입 구현과 개발 프로세스를 주도적으로 경험했습니다.",
    ja: "デジタルデザイン、フロントエンドプログラミング、マーケティングを融合的に学びながら、プロジェクト遂行能力を高めることに注力しました。\n主にアプリやWebを中心としたプロダクトのUI/UXデザインを深く研究し、インタラクティブなプロトタイプ実装や開発プロセスの推進を主体的に経験しました。",
  },
  inha: {
    en: "Completed interdisciplinary studies across the end-to-end apparel industry, including design, textiles, marketing, and business.\nConcentrated on fashion merchandising and market analysis, focusing deeply on bridging strategic business insights with visual communication skills.",
    ko: "디자인, 패턴, 섬유, 마케팅, 비즈니스 등 의류 산업 전반의 프로세스를 아우르는 각 분야를 학습을 진행했습니다.\n제품 기획과 시장 흐름을 분석하는 머천다이징을 중심으로, 비즈니스 관점과 시각적 커뮤니케이션 능력을 결합하는 데 집중했습니다.",
    ja: "デザイン、パターン、繊維、マーケティング、ビジネスなど、アパレル産業全般のプロセスを網羅する各分野の学習を行いました。\n製品企画や市場トレンドを分析するマーチャンダイジング（MD）を中心に、ビジネス的な視点とビジュアルコミュニケーション能力を結合させることに注力しました。",
  },
};

const EXPERIENCES = [
  {
    id: "welab",
    title: "UI/UX Designer",
    org: "WeLAB Entertainment",
    period: { en: "Mar 2026 – May 2026", ko: "2026.03 – 2026.05", ja: "2026.03 – 2026.05" },
    type: "Internship",
    location: "Vancouver, Canada",
  },
  {
    id: "muji",
    title: "Visual Merchandiser",
    org: "MUJI Japan",
    period: { en: "Apr 2022 – Sep 2024", ko: "2022.04 – 2024.09", ja: "2022.04 – 2024.09" },
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

// Rows render left-to-right with wrapping, per the Figma Skills frame
const SKILLS = [
  {
    label: "Tools",
    rows: [
      ["Figma"],
      { items: ["Adobe", "InDesign", "Illustrator", "Photoshop", "AfterEffect"], fit: true },
      ["Microsoft Office"],
      ["Google Suite"],
      ["WordPress"],
    ],
  },
  {
    label: "Technical",
    rows: [
      ["HTML/CSS", "Tailwind CSS"],
      ["JavaScript", "TypeScript"],
      ["React", "Next.js"],
      ["Git/GitHub"],
      ["Vercel"],
    ],
  },
  {
    label: "Methods",
    rows: [
      ["User + Stakeholder Journey Mapping"],
      ["Semi-structured Interviews"],
      ["Experience Prototyping"],
      ["Storyboarding"],
      ["Wireframing"],
      ["User Stories"],
    ],
  },
  {
    label: "Languages",
    rows: [["Korean"], ["Japanese"], ["English"]],
  },
];

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
      <button type="button" className="xp-head" onClick={() => setPinned((p) => !p)}>
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

/** A skill row at body size. `fit` rows (Adobe tools) put the first item in
 *  the fixed lead column and flow the rest beside it — wrapped lines align
 *  under the first product (InDesign/Photoshop share a left edge), never
 *  shrinking the font. */
function SkillRow({ items, fit }) {
  if (fit) {
    const [lead, ...rest] = items;
    return (
      <div className="ab-skill-row is-lead">
        <span>{lead}</span>
        <span className="ab-skill-rest">
          {rest.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>
      </div>
    );
  }
  return (
    <div className="ab-skill-row">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export default function AboutPage({ lang, setLang, fadeClass = "" }) {
  useEffect(() => {
    document.title = "About — HAJIN";
  }, []);

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
          <h1 className="ab-title" style={{ textIndent: NAME_INDENT[lang] || NAME_INDENT.en }}>
            {NAME[lang] || NAME.en}
          </h1>

          <nav className="ab-rail" ref={railRef}>
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="ab-rail-link"
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ab-content">
            <p className="ab-paragraph">{about.hero}</p>
            {about.body.map((para, i) => (
              <p key={i} className="ab-paragraph">
                {para}
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
                {SKILLS.map((group) => (
                  <div key={group.label} className="ab-skill-group">
                    <h3 className="ab-skill-label">{group.label}</h3>
                    <div className="ab-skill-rows">
                      {group.rows.map((row, i) => {
                        const items = Array.isArray(row) ? row : row.items;
                        const fit = !Array.isArray(row) && row.fit;
                        return <SkillRow key={i} items={items} fit={fit} />;
                      })}
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
