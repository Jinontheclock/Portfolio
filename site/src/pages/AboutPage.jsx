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
  ko: "갤러리 벽의 난간에 기대선 하진. 뒤로는 흑백 건축 사진 세 점이 걸려 있다. 파사드에 이름이 세로로 적힌 데사우 바우하우스, 폭포 위로 캔틸레버가 뻗은 프랭크 로이드 라이트의 낙수장, 콘크리트가 층층이 쌓인 모셰 사프디의 해비타트 67.",
  ja: "ギャラリーの壁の手すりに寄りかかるハジン。背後には白黒の建築写真が三点。ファサードに名前が縦に入ったデッサウのバウハウス、滝の上に張り出したフランク・ロイド・ライトの落水荘、コンクリートが積み上がったモシェ・サフディのハビタット67。",
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
    hero: "사용자가 막히는 지점을 찾아, 명료한 구조와 단단한 시각 언어로 옮기는 프로덕트 디자이너.",
    body: [
      "저는 리테일 비주얼 머천다이징에서 시작했습니다. 매장에서 고객이 지나는 동선과 시선의 위계를 설계하는 일이었습니다. 그 일이 화면으로 옮겨왔다고 해서 제가 던지는 질문이 달라지지는 않았습니다. 사람은 어디를 먼저 보는가, 그리고 그다음에 무엇을 하는가.",
      "제가 생각하는 좋은 디자인은 대개 건네받은 과제 아래에 깔린 문제를 찾아내는 일, 그리고 그다음에는 사용자의 앞을 비켜 주는 일입니다. 저는 프로덕트 수명 주기의 양쪽 끝에서 모두 일해 봤습니다. 아무것도 없는 상태에서 출시까지 만들어 봤고, 이미 배포된 프로덕트로 돌아가 레이아웃 시스템과 반응형 컴포넌트를 다시 짜기도 했습니다.",
      "제가 가장 중요하게 여기는 것은 함께 일하는 사람들과 같은 호흡으로 움직이는 일입니다. 디자이너와 개발자, 마케터는 같은 문제를 서로 다른 언어로 말합니다. 그 언어를 모두 따라갈 수 있을 때 솔루션이 더 단단해진다고 믿습니다.",
      [
        "이런 일을 하고 계시다면 이야기를 들어 보고 싶습니다. ",
        { text: "이메일", href: MAILTO },
        "로 연락 주시면 좋겠습니다.",
      ],
    ],
  },
  ja: {
    hero: "ユーザーがつまずくポイントを見つけ、それを明快な構造と、揺るがないビジュアル言語に落とし込むプロダクトデザイナーです。",
    body: [
      "私はリテールのビジュアルマーチャンダイジングから始めました。店舗の中で顧客が通る動線と、視線の優先順位を設計する仕事です。それが画面上の仕事になっても、私が立てる問いは変わりませんでした。人はどこを最初に見るのか、そして次に何をするのか。",
      "私が考える良いデザインは、多くの場合、渡された課題の下にある問題を見つけ出すこと、そしてそのあとはユーザーの前から退くことです。プロダクトのライフサイクルの両端で仕事をしてきました。何もないところから立ち上げたこともあれば、すでにリリースされたプロダクトに戻ってレイアウトシステムとレスポンシブコンポーネントを組み直したこともあります。",
      "私が最も大切にしているのは、一緒に働く人たちと同じ歩幅で進むことです。デザイナーとエンジニア、マーケターは、同じ課題をそれぞれ違う言葉で説明します。その言葉をすべて追えるとき、解決策はより確かなものになると考えています。",
      [
        "こうした仕事に取り組んでいらっしゃる方は、ぜひお話を聞かせてください。",
        { text: "メール", href: MAILTO },
        "でご連絡いただけますと幸いです。",
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
  { label: "E-mail", href: MAILTO },
];

/* "What I did" descriptions per entry, per language. Each sentence opens a
   line of its own — .xp-desc is `white-space: pre-line`, so the newlines
   below are the break. Keep one when adding a sentence. */
const DESCRIPTIONS = {
  welab: {
    en: "Redesigned and rebuilt the studio's public site in WordPress with Bricks Builder, writing custom code where the builder ran out.\nAdded multi-language support and new CTA components, and worked on the site's SEO.",
    ko: "스튜디오 공식 사이트를 WordPress와 Bricks Builder로 다시 설계하고 다시 만들었습니다. 빌더로 해결되지 않는 부분은 직접 코드를 썼습니다.\n다국어 지원과 새 CTA 컴포넌트를 추가했고, 사이트 SEO 작업에도 참여했습니다.",
    ja: "スタジオの公式サイトをWordPressとBricks Builderで設計し直し、作り直しました。ビルダーだけでは手が届かないところは自分でコードを書きました。\n多言語対応と新しいCTAコンポーネントを追加し、サイトのSEOにも取り組みました。",
  },
  muji: {
    en: "Planned in-store visual communication and floor layouts, which set how customers moved through the space.\nTook on improving the duty-free shopping experience for inbound international travelers.",
    ko: "매장 내 비주얼 커뮤니케이션과 매장 레이아웃을 기획했습니다. 고객이 공간을 어떻게 지나는지가 여기서 정해졌습니다.\n인바운드 외국인 고객을 위한 면세 쇼핑 경험 개선을 맡았습니다.",
    ja: "店内のビジュアルコミュニケーションと売場レイアウトを企画しました。お客様が空間をどう歩くかは、ここで決まります。\nインバウンドのお客様に向けた免税ショッピング体験の改善に取り組みました。",
  },
  bcit: {
    en: "Studied UI/UX design alongside front-end development and marketing, and built web and mobile products end to end.\nMost of my time went to prototyping and layout systems.",
    ko: "UI/UX 디자인과 함께 프론트엔드 개발, 마케팅을 배우며 웹과 모바일 프로덕트를 처음부터 끝까지 만들었습니다.\n시간을 가장 많이 쓴 곳은 프로토타이핑과 레이아웃 시스템이었습니다.",
    ja: "UI/UXデザインと並行してフロントエンド開発とマーケティングを学び、ウェブとモバイルのプロダクトを一通り作りました。\n最も時間を使ったのはプロトタイピングとレイアウトシステムです。",
  },
  inha: {
    en: "Studied fashion design, merchandising and market analysis.\nThe merchandising side is where I first learned to read what people buy and why, which is closer to UX research than it sounds.",
    ko: "패션 디자인과 머천다이징, 시장 분석을 공부했습니다.\n사람들이 무엇을 왜 사는지 읽는 법은 머천다이징에서 처음 배웠습니다. 생각보다 UX 리서치와 가까운 일이었습니다.",
    ja: "ファッションデザインとマーチャンダイジング、市場分析を学びました。\n人が何を、なぜ買うのかを読み解く力は、マーチャンダイジングで最初に身につけました。思っていたよりUXリサーチに近い仕事でした。",
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
          main: "情報アーキテクチャ（IA）",
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
