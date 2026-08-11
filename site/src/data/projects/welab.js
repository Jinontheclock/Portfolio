import cardPoster from "../../assets/welab/welab-card-poster.webp";

export default {
  id: "welab",
  title: "WeLAB Entertainment",
  kind: "Client Project · Live Site",
  /* Work-card thumbnail: the case study's own hero clip, cropped to the
     card's proportions and without the wordmark the hero floats over it.
     The card rests on the poster and plays under the pointer.
     scripts/build-card-videos.py makes all three files. */
  video: {
    /* VP9 first so a Chromium without the proprietary codecs still plays
       it; H.264 is what everything else takes */
    sources: [
      {
        src: `${import.meta.env.BASE_URL}media/welab/welab-card.webm`,
        type: "video/webm",
      },
      {
        src: `${import.meta.env.BASE_URL}media/welab/welab-card.mp4`,
        type: "video/mp4",
      },
    ],
    poster: cardPoster,
  },
  thumbAlt: {
    en: "The rebuilt WeLAB site on a desktop monitor, open at the home page",
    ja: "デスクトップモニターに映る、作り直したWeLABのサイトのホーム",
    ko: "데스크톱 모니터에 띄운, 다시 만든 WeLAB 사이트의 홈",
  },
  description: {
    en: "An end-to-end website audit, redesign, and WordPress development for a VFX studio — rebuilding layouts and interactions with Bricks Builder and custom code.",
    ja: "VFX・アニメーションスタジオの本番サイトのリデザイン — 監査から再設計、Bricksでの再構築まで。ビルダーで届かないところは自前のコードで",
    ko: "VFX·애니메이션 스튜디오의 운영 사이트 리디자인 — 감사에서 재설계, Bricks 재구축까지. 빌더가 한계에 다다른 곳은 직접 코드로",
  },
  roles: {
    en: "UI/UX Design, Web Development (Internship)",
    ja: "UI/UXデザイン、ウェブ開発",
    ko: "UI/UX 디자인, 웹 개발",
  },
  heroScene: "welab",
  headline: {
    en: "Bringing a VFX studio's website up to its own standard.",
    ja: "VFXスタジオのウェブサイトを、そのスタジオ自身の基準まで。",
    ko: "VFX 스튜디오의 웹사이트를, 그 스튜디오 자신의 기준까지.",
  },
  intro: [
    {
      en: "WeLAB — We Love A Battle Entertainment — is a VFX and animation studio working in film and TV from Vancouver, Calgary, and Guadalajara. Over a three-month practicum internship, I was the designer on its public site end to end: auditing the old weloveabattle.com, then redesigning and rebuilding it in WordPress with Bricks Builder — in Figma where a mission called for it, in custom code where the builder ran out.",
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
  sections: [
    {
      id: "brief",
      label: { en: "01 The Brief", ja: "01 与件", ko: "01 브리프" },
      blocks: [
        {
          type: "p",
          text: {
            en: "A VFX studio's website is its showreel's front door: producers land on it deciding whether the studio is worth a call. WeLAB's site had fallen behind the work it was meant to sell. The brief: refine the UX/UI, update the content, improve the architecture, and make the site fast, responsive, and findable — up to the studio's own standard.",
            ja: "VFXスタジオのウェブサイトは、ショーリールへの玄関です。プロデューサーはここに降り立ち、このスタジオに連絡する価値があるかを判断します。WeLABのサイトは、そのサイトが売るべき作品に追いつけていませんでした。与件はこうです。UX/UIを磨き、コンテンツを更新し、構造を改善し、速く、レスポンシブで、検索から見つかるサイトにすること。スタジオ自身の基準に届くまで。",
            ko: "VFX 스튜디오의 웹사이트는 쇼릴로 들어가는 현관입니다. 프로듀서는 여기에 도착해 이 스튜디오에 연락할 가치가 있는지를 판단합니다. WeLAB의 사이트는 정작 그 사이트가 팔아야 할 작업물보다 뒤처져 있었습니다. 브리프는 이렇습니다. UX/UI를 다듬고, 콘텐츠를 갱신하고, 구조를 개선하고, 빠르고 반응형이며 검색에서 찾을 수 있는 사이트로 만들 것. 스튜디오 자신의 기준에 닿을 때까지.",
          },
        },
        {
          type: "p",
          text: {
            en: "This wasn't a greenfield build. The site stayed live in production throughout, the brand was set, and the stack — WordPress with Bricks Builder — was the studio's, not mine. The job was to raise the site inside those lines.",
            ja: "ゼロから作る案件ではありませんでした。サイトは作業の間ずっと本番で動いたままでしたし、ブランドはすでに決まっていて、スタックも私のものではなくスタジオのものでした — WordPressとBricksビルダー。私の仕事は、その線の内側でサイトを引き上げることでした。",
            ko: "백지에서 시작하는 프로젝트가 아니었습니다. 사이트는 작업 내내 운영 상태로 살아 있었고, 브랜드는 이미 정해져 있었으며, 스택도 제 것이 아니라 스튜디오의 것이었습니다 — WordPress와 Bricks 빌더. 제 일은 그 선 안에서 사이트를 끌어올리는 것이었습니다.",
          },
        },
      ],
    },
    {
      id: "audit",
      label: {
        en: "02 Auditing the Live Site",
        ja: "02 本番サイトの監査",
        ko: "02 운영 사이트 감사",
      },
      blocks: [
        {
          type: "p",
          text: {
            en: "The redesign started by reading the site the way a producer would: page by page, desktop and phone, against the sites of the VFX studios WeLAB competes with — studios that open with their newest work and let a producer scrub a shot from plate to final on the project page itself. Held to that bar, the audit surfaced two problems and two opportunities — and they became the spine of the whole internship.",
            ja: "リデザインは、サイトをプロデューサーと同じ読み方で見るところから始めました。ページを一枚ずつ、デスクトップとスマートフォンで、WeLABが競合するVFXスタジオのサイトと並べて見ました。それらのスタジオは最新作でサイトを開き、プロジェクトページの中でプロデューサーがプレートからファイナルまでショットをスクラブできるようにしています。その基準に照らすと、課題が二つと機会が二つ浮かび上がり、この四つがインターンシップ全体の背骨になりました。",
            ko: "리디자인은 사이트를 프로듀서처럼 읽는 것에서 시작했습니다. 페이지 하나씩, 데스크톱과 폰으로, WeLAB이 경쟁하는 VFX 스튜디오들의 사이트와 나란히 놓고 봤습니다. 그 스튜디오들은 가장 최근 작업으로 사이트를 열고, 프로젝트 페이지 안에서 프로듀서가 플레이트부터 파이널까지 샷을 직접 스크럽해 볼 수 있게 합니다. 그 기준에 맞춰 보니 문제 두 가지와 기회 두 가지가 드러났고, 이 넷이 인턴십 전체의 뼈대가 됐습니다.",
          },
        },
        {
          type: "h",
          text: {
            en: "Problem 01 — The work didn't show its magic",
            ja: "課題 01 — 作品の魔法が見えなかった",
            ko: "문제 01 — 작업의 마법이 보이지 않았다",
          },
        },
        {
          type: "p",
          text: {
            en: "WeLAB sells transformation: the same frame before the studio touched it, and after. The old project pages had the evidence — original plates and finished shots — but ran them as a one-way scroll of separate full-width stills. VFX frames have to be shown big, so each pair cost a screen of scrolling, and a before never sat beside its after. A producer skimming for what WeLAB could deliver had to hold the comparison in their head: the work was all there, but the magic never happened in front of them.",
            ja: "WeLABが売っているのは変化です。スタジオが手を入れる前のフレームと、入れたあとの同じフレーム。旧プロジェクトページにも、その証拠はありました。元のプレートと仕上がったショットが、どちらも載っていました。ただ、それぞれを全幅のスチルとして並べ、一方向にスクロールさせるだけでした。VFXのフレームは大きく見せる必要があるため、一組ごとに画面一つ分のスクロールがかかり、ビフォーがアフターの隣に並ぶことはありませんでした。WeLABに何ができるのかを流し読みしに来たプロデューサーは、その比較を頭の中でやらなければなりません。作品はすべてそこにありましたが、魔法がプロデューサーの目の前で起きることは一度もありませんでした。",
            ko: "WeLAB이 파는 것은 변화입니다. 스튜디오가 손대기 전의 프레임과, 손댄 뒤의 같은 프레임. 기존 프로젝트 페이지에도 그 증거는 있었습니다. 원본 플레이트와 완성된 샷이 모두 올라가 있었습니다. 다만 그것을 각각 전체 폭 스틸로 늘어놓고 한 방향으로 스크롤하게 만들어 두었습니다. VFX 프레임은 크게 보여줘야 하니 한 쌍마다 화면 하나만큼의 스크롤이 들었고, 비포가 애프터 옆에 놓이는 일은 없었습니다. WeLAB이 무엇을 만들 수 있는지 훑어보러 온 프로듀서는 그 비교를 머릿속에서 해야 했습니다. 작업물은 전부 거기 있었지만, 마법은 프로듀서 눈앞에서 일어나지 않았습니다.",
          },
        },
        {
          type: "figure",
          graphic: "welab-fig-old-showcase",
          caption: {
            en: "The Challenge and Solution sections of the A Winning Team project page on the old site.",
            ja: "旧サイトの『A Winning Team』プロジェクトページにあったChallenge・Solutionセクション。",
            ko: "기존 사이트의 〈A Winning Team〉 프로젝트 페이지에 있던 Challenge · Solution 섹션.",
          },
        },
        {
          type: "h",
          text: {
            en: "Problem 02 — Pages without a system",
            ja: "課題 02 — システムのないページ",
            ko: "문제 02 — 시스템 없는 페이지",
          },
        },
        {
          type: "p",
          text: {
            en: "The site was responsive from desktop down to mobile — that much worked. What it lacked was a shared set of rules: type scale, grid, alignment, and components shifted from page to page, and the audit caught the cost in the open. At in-between widths, the services page's incentive cards fell out of their grid — three uneven columns at 1280px, a two-plus-one arrangement with a stray hole at 1200px.",
            ja: "サイトはデスクトップからモバイルまでレスポンシブに動いていました。そこまでは問題ありませんでした。欠けていたのは共通のルールです。タイプスケール、グリッド、揃え、コンポーネントがページごとに変わり、監査の過程でその代償がそのまま表に出ました。中間の幅では、サービスページのインセンティブカードがグリッドから外れました。1280pxでは幅の揃わない3カラム、1200pxでは2+1の配置に空きが一つ残りました。",
            ko: "사이트는 데스크톱부터 모바일까지 반응형으로 동작했습니다. 거기까지는 문제가 없었습니다. 없는 것은 공통 규칙이었습니다. 타입 스케일, 그리드, 정렬, 컴포넌트가 페이지마다 달라졌고, 감사 과정에서 그 대가가 그대로 드러났습니다. 중간 너비에서는 서비스 페이지의 인센티브 카드가 그리드 밖으로 튀어나왔습니다. 1280px에서는 폭이 제각각인 3컬럼, 1200px에서는 2+1 배치에 빈자리 하나가 남았습니다.",
          },
        },
        {
          type: "figure",
          graphic: "welab-fig-audit-responsive",
          caption: {
            en: "The Tax Credits section of the old Services page at desktop, tablet and mobile widths.",
            ja: "旧ServicesページのTax Creditsセクションを、デスクトップ・タブレット・モバイルの幅で見たところ。",
            ko: "기존 Services 페이지의 Tax Credits 섹션을 데스크톱 · 태블릿 · 모바일 너비에서 본 모습.",
          },
        },
        {
          type: "p",
          text: {
            en: "The same looseness ran through the pages doing the most important talking: Who We Are sat on a grid that didn't quite hold, the client wall in Our Clients slipped out of alignment, and the home footer arranged its components by its own logic. Small things, one by one — but together they kept the site from reading as one designed system.",
            ja: "同じゆるさが、いちばん重要な話をしているページにもそのままありました。Who We Areは最後まで持ちこたえないグリッドの上に置かれ、Our Clientsのクライアントロゴの壁は揃えから外れ、ホームのフッターは独自の論理でコンポーネントを並べていました。一つずつ見れば小さなことです。ただ、それらが集まると、サイトが一つの設計されたシステムとして読まれるのを妨げます。",
            ko: "같은 헐거움이 가장 중요한 말을 하는 페이지들에도 그대로 있었습니다. Who We Are는 끝까지 버티지 못하는 그리드 위에 놓여 있었고, Our Clients의 클라이언트 로고 월은 정렬에서 어긋났으며, 홈 푸터는 자기만의 논리로 컴포넌트를 배치했습니다. 하나씩 보면 작은 것들입니다. 다만 이것들이 모이면 사이트가 하나의 설계된 시스템으로 읽히지 못하게 막습니다.",
          },
        },
        {
          type: "figure",
          graphic: "welab-fig-audit-sections",
          caption: {
            en: "The Who We Are and Our Clients sections of the old About Us page, and the old home footer on mobile.",
            ja: "旧About UsページのWho We Are・Our Clientsセクションと、モバイルで見た旧ホームフッター。",
            ko: "기존 About Us 페이지의 Who We Are · Our Clients 섹션, 그리고 모바일에서 본 기존 홈 푸터.",
          },
        },
        {
          type: "h",
          text: {
            en: "Opportunity 01 — A front page stuck in last year",
            ja: "機会 01 — 去年で止まったトップページ",
            ko: "기회 01 — 작년에 멈춰 있는 첫 화면",
          },
        },
        {
          type: "ba",
          graphic: "welab-fig-old-landing",
          text: {
            en: "The landing page still led with the same two project cards while the studio's slate moved on — its newest headline work wasn't on the front page at all. And even as calls to action, the cards underdelivered: each one swallowed a full screen, the pair followed different layouts, and the Explore link sank somewhere in all that surface. The studios WeLAB competes with lead with their strongest, freshest work. Out of that research I proposed a featured case-studies section, and the studio said yes.",
            ja: "スタジオのラインナップは動き続けているのに、ランディングページは相変わらず同じプロジェクトカード二枚で始まっていました。最新の代表作はトップページに一つもありませんでした。そしてCTAとしても、このカードは役目を果たしていませんでした。一枚が画面全体を飲み込み、二枚のレイアウトは互いに違い、Exploreリンクはその広い面積のどこかに沈んでいました。WeLABが競合するスタジオは、いちばん強く、いちばん新しい作品でサイトを開きます。この調査を根拠に注目ケーススタディのセクションを提案し、スタジオはこれを受け入れました。",
            ko: "스튜디오의 라인업은 계속 움직이는데, 랜딩 페이지는 여전히 같은 프로젝트 카드 두 장으로 시작하고 있었습니다. 가장 최근의 대표작은 첫 화면에 아예 없었습니다. 그리고 CTA로서도 이 카드들은 제 몫을 하지 못했습니다. 한 장이 화면 전체를 삼켰고, 두 장의 레이아웃이 서로 달랐으며, Explore 링크는 그 넓은 면적 어딘가에 가라앉아 있었습니다. WeLAB이 경쟁하는 스튜디오들은 가장 강하고 가장 최근인 작업으로 사이트를 엽니다. 이 조사를 근거로 대표 케이스 스터디 섹션을 제안했고, 스튜디오가 받아들였습니다.",
          },
          caption: {
            en: "The project cards on the old landing page, on desktop and on a phone.",
            ja: "旧ランディングページのプロジェクトカードを、デスクトップとスマートフォンで見たところ。",
            ko: "기존 랜딩 페이지의 프로젝트 카드를 데스크톱과 폰에서 본 모습.",
          },
        },
        {
          type: "h",
          text: {
            en: "Opportunity 02 — A studio in three countries, a site in one language",
            ja: "機会 02 — 三か国のスタジオ、一言語のサイト",
            ko: "기회 02 — 세 나라의 스튜디오, 한 언어의 사이트",
          },
        },
        {
          type: "ba",
          graphic: "welab-fig-old-studios",
          text: {
            en: "Through the first half of 2025, WeLAB's slate ran through its Canadian studios, and the site matched: English only, built for the US and Canadian clients it already had. Then the studio's map changed — starting with Shadow of God, a feature backed by Jalisco's film incentive program, the push into Mexico stopped being a plan and became a slate. The site's own services page was already selling those incentives — in English. Growth wasn't waiting on marketing; it was waiting on the website.",
            ja: "2025年前半まで、WeLABのラインナップはカナダのスタジオを通して回っていて、サイトもそれに合っていました。英語のみ、すでに抱えている米国とカナダのクライアントに向けたサイトです。そこでスタジオの地図が変わりました。ハリスコ州の映像インセンティブ制度の支援を受けた長編『Shadow of God』を皮切りに、メキシコ進出は計画ではなく実際のラインナップになりました。当のサイトのServicesページは、そのインセンティブをすでに売っていました — 英語で。成長が待っていたのはマーケティングではなく、ウェブサイトでした。",
            ko: "2025년 상반기까지 WeLAB의 라인업은 캐나다 스튜디오들을 통해 돌아갔고, 사이트도 거기에 맞춰져 있었습니다. 영어 단일 언어, 이미 확보한 미국과 캐나다 클라이언트를 위한 사이트였습니다. 그러다 스튜디오의 지도가 바뀌었습니다. 할리스코주 영상 인센티브 제도의 지원을 받은 장편 〈Shadow of God〉을 시작으로, 멕시코 진출은 계획이 아니라 실제 라인업이 됐습니다. 정작 사이트의 Services 페이지는 그 인센티브를 이미 팔고 있었습니다 — 영어로. 성장이 기다리고 있던 것은 마케팅이 아니라 웹사이트였습니다.",
          },
          title: {
            en: "The Our Studios section of the old landing page",
            ja: "旧ランディングページのOur Studiosセクション",
            ko: "기존 랜딩 페이지의 Our Studios 섹션",
          },
        },
      ],
    },
    {
      id: "build",
      label: {
        en: "03 Designing and Building",
        ja: "03 設計と実装",
        ko: "03 설계와 구현",
      },
      blocks: [
        {
          type: "p",
          text: {
            en: "Every mission ran the same loop — mission, ideation, draft, feedback, implementation, feedback, completion. Weekly meetings set the missions; Discord carried the feedback between them, specific enough that each iteration knew exactly what had landed and what hadn't. Where a mission needed design exploration, the draft started in Figma; where the builder was the faster canvas, it was designed directly in Bricks.",
            ja: "すべてのミッションが同じループを回りました。ミッション、アイデア出し、ドラフト、フィードバック、実装、フィードバック、完了。ミッションは週次ミーティングで決まり、その間のフィードバックはDiscordが運びました。毎回、何が通って何が通らなかったのかが正確にわかる程度に具体的なフィードバックです。デザインの探索が必要なミッションはFigmaでドラフトを始め、ビルダーのほうが速いキャンバスになる場合はBricksで直接設計しました。",
            ko: "모든 미션은 같은 루프를 돌았습니다. 미션, 아이데이션, 시안, 피드백, 구현, 피드백, 완료. 미션은 주간 미팅에서 정해졌고, 그 사이의 피드백은 Discord가 실어 날랐습니다. 매 회차가 무엇이 통했고 무엇이 통하지 않았는지 정확히 알 수 있을 만큼 구체적인 피드백이었습니다. 디자인 탐색이 필요한 미션은 Figma에서 시안을 시작했고, 빌더가 더 빠른 캔버스인 경우에는 Bricks에서 바로 설계했습니다.",
          },
        },
        {
          type: "figure",
          graphic: "welab-fig-workflow",
          caption: {
            en: "The iteration loop used for every mission.",
            ja: "すべてのミッションに適用したイテレーションのループ。",
            ko: "모든 미션에 적용한 반복 루프.",
          },
        },
        {
          type: "h",
          text: {
            en: "So I wired one in",
            ja: "だから、自分で組み込んだ",
            ko: "그래서 직접 짜 넣었다",
          },
          tag: { en: "Problem 01", ja: "課題 01", ko: "문제 01" },
        },
        {
          type: "p",
          text: {
            en: "The before/after showcase asked for something Bricks doesn't have: no native component supports an interactive overlay driven by the cursor. Rather than reinvent the interaction, I picked a proven web component — img-comparison-slider — wired it into a custom HTML block, and wrote the chrome around it by hand: the divider, the handle, the labels, and how each scales down on mobile. Hover or drag, and the original footage resolves into the final shot; knowing what to build and what to borrow was the real call. The audit's first finding closed where it opened: the before now sits in the same frame as its after, one drag apart.",
            ja: "このショーケースは、Bricksにないものを求めました。カーソルで動くインタラクティブなオーバーレイをサポートするネイティブコンポーネントがありません。インタラクションを一から作り直すのではなく、実績のあるWebコンポーネントであるimg-comparison-sliderを選び、カスタムHTMLブロックに組み込み、その周辺のUIを自分で書きました。仕切り線、ハンドル、ラベル、そしてそれぞれがモバイルでどう縮むかまで。ホバーするかドラッグすると、元のフッテージが最終ショットへとほどけていきます。何を作り、何を借りるかを見極めることが、本当の判断でした。監査の最初の発見は、それが開いた場所で閉じました。ビフォーはいま、アフターと同じフレームの中、ドラッグ一回の距離にあります。",
            ko: "이 쇼케이스는 Bricks에 없는 것을 요구했습니다. 커서로 움직이는 인터랙티브 오버레이를 지원하는 기본 컴포넌트가 없습니다. 인터랙션을 처음부터 다시 만드는 대신, 검증된 웹 컴포넌트인 img-comparison-slider를 골라 커스텀 HTML 블록에 짜 넣고, 그 주변 UI를 직접 작성했습니다. 구분선, 핸들, 라벨, 그리고 각각이 모바일에서 어떻게 줄어드는지까지. 호버하거나 드래그하면 원본 푸티지가 최종 샷으로 풀립니다. 무엇을 만들고 무엇을 빌려올지 판단하는 것이 진짜 결정이었습니다. 감사의 첫 번째 발견은 그것이 열린 자리에서 닫혔습니다. 비포는 이제 애프터와 같은 프레임 안에, 드래그 한 번 거리에 있습니다.",
          },
        },
        {
          type: "figure",
          graphic: "welab-ba-vfx",
          caption: {
            en: "Frames from A Winning Team's stadium crowd extension, in the same slider interaction that runs on the live site.",
            ja: "『A Winning Team』のスタジアム観客の群衆エクステンションのフレームを、本番サイトで実際に動いているものと同じスライダーインタラクションで。",
            ko: "〈A Winning Team〉의 스타디움 관중 확장 프레임을, 운영 사이트에서 실제로 돌아가는 것과 같은 슬라이더 인터랙션으로.",
          },
        },
        {
          type: "p",
          text: {
            en: "It now runs on the studio's project pages — on A Winning Team, it carries the stadium crowd extensions WeLAB delivered across 161 shots for a Hallmark feature.",
            ja: "このスライダーはいま、スタジオのプロジェクトページで動いています。『A Winning Team』では、WeLABがHallmarkの長編のために161ショットにわたって仕上げたスタジアムの群衆エクステンションを、このスライダーが載せています。",
            ko: "이 슬라이더는 지금 스튜디오의 프로젝트 페이지에서 돌아갑니다. 〈A Winning Team〉에서는 WeLAB이 Hallmark 장편을 위해 161개 샷에 걸쳐 작업한 스타디움 관중 확장을 이 슬라이더가 담고 있습니다.",
          },
        },
        {
          type: "h",
          text: {
            en: "One grid, section by section",
            ja: "一つのグリッドに、セクションごとに",
            ko: "하나의 그리드로, 섹션 하나씩",
          },
          tag: { en: "Problem 02", ja: "課題 02", ko: "문제 02" },
        },
        {
          type: "p",
          text: {
            en: "Rather than impose a top-down system, I reworked the flawed sections one at a time — directly in Bricks — realigning each to a consistent grid and tightening its spacing and hierarchy so the page read as one considered layout instead of a stack of one-offs. Every section the audit flagged went back onto that grid. Rebuilding was also the moment to right-size the media: logos and UI graphics as SVG, photography and film stills as JPGs tuned to the resolution they actually render at — every asset no heavier than the layout needs.",
            ja: "上からシステムを押しつけるのではなく、問題のあるセクションを一つずつ作り直しました。Bricksで直接作業しながら、それぞれのセクションを一貫したグリッドに合わせ直し、余白と階層を締めています。ページが単発の寄せ集めではなく、一つの考え抜かれたレイアウトとして読まれるようにするためです。監査で指摘したセクションは、すべてそのグリッドの上に戻りました。作り直すタイミングは、メディアのサイズを正すタイミングでもありました。ロゴとUIグラフィックはSVGで、写真と映画スチルは実際にレンダリングされる解像度に合わせたJPGで。レイアウトが必要とする以上に重いアセットは、一つも残していません。",
            ko: "위에서부터 시스템을 내리누르는 대신, 문제가 있는 섹션을 하나씩 다시 만들었습니다. Bricks에서 바로 작업하면서, 각 섹션을 일관된 그리드에 다시 맞추고 여백과 위계를 조였습니다. 페이지가 일회성 결과물의 더미가 아니라 하나의 고민된 레이아웃으로 읽히게 하기 위해서였습니다. 감사에서 지적한 섹션은 전부 그 그리드 위로 돌아왔습니다. 다시 만드는 시점은 미디어의 크기를 바로잡을 시점이기도 했습니다. 로고와 UI 그래픽은 SVG로, 사진과 영화 스틸은 실제로 렌더링되는 해상도에 맞춘 JPG로. 레이아웃이 필요로 하는 것보다 무거운 에셋은 하나도 남기지 않았습니다.",
          },
        },
        {
          type: "figure",
          graphic: "welab-fig-layout-system",
          caption: {
            en: "The rebuilt Tax Credits section, and the Who We Are, home footer, and Clients & Awards sections before and after the rebuild.",
            ja: "作り直したTax Creditsセクションと、Who We Are・ホームフッター・Clients & Awardsセクションの再構築前後。",
            ko: "다시 만든 Tax Credits 섹션, 그리고 Who We Are · 홈 푸터 · Clients & Awards 섹션의 재구축 전후.",
          },
        },
        {
          type: "h",
          text: {
            en: "The front page caught up",
            ja: "トップページが追いついた",
            ko: "첫 화면이 따라잡았다",
          },
          tag: { en: "Opportunity 01", ja: "機会 01", ko: "기회 01" },
        },
        {
          type: "p",
          text: {
            en: "The one mission that started in Figma. I designed the featured case-studies section as an argument for the studio's newest work — what a card owes a producer: the project, the scale, a reason to click. Five layouts went through the weekly loop — two columns, three, a carousel, a hover-focus variant, full-width rows. The direction from my supervisor was to keep three case studies in view at once — no scroll, no click — and three columns delivered it: room for each card to make its case, tight enough to compare at a glance, where the carousel hid two-thirds of the work and the rows dropped the third study below the fold. That was the layout built in Bricks.",
            ja: "Figmaで始めた唯一のミッションです。注目ケーススタディのセクションを、スタジオの最新作のための一つの主張として設計しました。カード一枚がプロデューサーに対して負っているもの、つまりプロジェクト、規模、そしてクリックする理由です。五つのレイアウトが週次のループを通りました。2カラム、3カラム、カルーセル、ホバーフォーカスの変種、全幅の横並び。指導担当からの方針は、ケーススタディ三つがスクロールもクリックもなしに一画面に収まること。それを実現したのが3カラムでした。カードごとに主張を展開する余白がありながら、一目で比べられるだけの密度がある。カルーセルは作品の三分の二を隠し、横並びは三つ目のケーススタディをファーストビューの外へ押し出しました。Bricksで作ったのは、このレイアウトです。",
            ko: "Figma에서 시작한 유일한 미션입니다. 대표 케이스 스터디 섹션을 스튜디오의 최신 작업을 위한 하나의 주장으로 설계했습니다. 카드 한 장이 프로듀서에게 빚지고 있는 것, 즉 프로젝트, 규모, 그리고 눌러야 할 이유입니다. 다섯 가지 레이아웃이 주간 루프를 거쳤습니다. 2컬럼, 3컬럼, 캐러셀, 호버 포커스 변형, 전체 폭 가로 행. 지도 담당자의 방향은 케이스 스터디 세 개가 스크롤도 클릭도 없이 한 화면에 들어와야 한다는 것이었고, 3컬럼이 그것을 해냈습니다. 카드마다 제 주장을 펼 여백이 있으면서, 한눈에 비교할 만큼 조밀했습니다. 캐러셀은 작업의 3분의 2를 감췄고, 가로 행은 세 번째 케이스 스터디를 첫 화면 밖으로 밀어냈습니다. Bricks에서 만든 것은 이 레이아웃입니다.",
          },
        },
        {
          type: "p",
          text: {
            en: "Where the old cards each swallowed a screen and buried their link, the new section puts the studio's three newest case studies in front of a producer at a glance, on one grid, each with a clear way in. The landing page now leads with its freshest work instead of last year's two cards.",
            ja: "旧カードが一枚ずつ画面を飲み込みリンクを埋めていたのに対し、新しいセクションはスタジオの最新ケーススタディ三件を一つのグリッドの上に一目で並べ、それぞれに入口をはっきり用意しています。ランディングページはいま、去年のカード二枚ではなく、いちばん新しい作品で始まります。",
            ko: "기존 카드가 한 장씩 화면을 삼키고 링크를 묻어버렸다면, 새 섹션은 스튜디오의 최신 케이스 스터디 세 건을 하나의 그리드 위에 한눈에 올려놓고, 각각에 들어갈 길을 분명하게 둡니다. 랜딩 페이지는 이제 작년의 카드 두 장이 아니라 가장 최근 작업으로 시작합니다.",
          },
        },
        {
          type: "figure",
          graphic: "welab-fig-figma-featured",
          caption: {
            en: "The featured case-studies section in Figma.",
            ja: "Figmaで作った注目ケーススタディのセクション。",
            ko: "Figma에서 만든 대표 케이스 스터디 섹션.",
          },
        },
        {
          type: "figure",
          graphic: "welab-ba-landing",
          caption: {
            en: "The featured case-studies section on the live site.",
            ja: "本番サイトに載った注目ケーススタディのセクション。",
            ko: "운영 사이트에 올라간 대표 케이스 스터디 섹션.",
          },
        },
        {
          type: "h",
          text: {
            en: "The work pages learned Spanish",
            ja: "作品ページがスペイン語を覚えた",
            ko: "작업 페이지가 스페인어를 배웠다",
          },
          tag: { en: "Opportunity 02", ja: "機会 02", ko: "기회 02" },
        },
        {
          type: "p",
          text: {
            en: "The language work turned out custom, like the slider. Thirteen of the studio's project case studies — including every recent VFX feature — now carry their copy in English and Spanish both, switched by an EN/ES toggle in the header: each brief lives on the page in two languages, and the toggle decides which one a producer reads. The rest of the site holds English for now — but the pages that actually sell the work already speak the market's language.",
            ja: "言語対応も、スライダーと同じく自前で作ることになりました。スタジオのプロジェクトケーススタディ13件が、いまは英語とスペイン語の二言語で本文を持っています。最近のVFX長編はすべて含まれます。切り替えはヘッダーのEN/ESトグルで行います。各プロジェクトの紹介文がページ上に二言語で同居し、プロデューサーがどちらを読むかはトグルが決めます。サイトの残りは当面は英語のままです。ただ、実際に作品を売っているページは、すでに市場の言語で話しています。",
            ko: "언어 작업도 슬라이더와 마찬가지로 직접 만드는 쪽이 됐습니다. 스튜디오의 프로젝트 케이스 스터디 13건이 이제 영어와 스페인어 두 언어로 본문을 갖고 있습니다. 최근 VFX 장편은 전부 포함됩니다. 전환은 헤더의 EN/ES 토글로 이뤄집니다. 각 프로젝트 소개글이 페이지 위에 두 언어로 함께 살아 있고, 프로듀서가 어느 쪽을 읽을지는 토글이 정합니다. 사이트의 나머지는 당분간 영어로 둡니다. 다만 실제로 작업을 파는 페이지는 이미 시장의 언어로 말하고 있습니다.",
          },
        },
        {
          type: "figure",
          graphic: "welab-fig-lang-toggle",
          caption: {
            en: "The same project page on the live site, in English and in Spanish.",
            ja: "本番サイトの同じプロジェクトページを、英語とスペイン語で見たところ。",
            ko: "운영 사이트의 같은 프로젝트 페이지를 영어와 스페인어로 본 모습.",
          },
        },
      ],
    },
    {
      id: "outcomes",
      label: { en: "04 Outcomes", ja: "04 成果", ko: "04 결과" },
      blocks: [
        {
          type: "p",
          text: {
            en: "The redesign shipped to production on the studio's live domain — everything this case study shows links to the real thing. A production site keeps moving after handover; this study shows the work as it shipped in May 2026.",
            ja: "リデザインはスタジオの実際のドメイン上、本番環境へリリースされました。このケーススタディが見せているものは、すべて実物につながっています。本番サイトは引き継ぎのあとも動き続けます。ここで見せているのは、2026年5月にリリースした時点の仕事です。",
            ko: "리디자인은 스튜디오의 실제 도메인 위, 운영 환경에 배포됐습니다. 이 케이스 스터디가 보여주는 것은 전부 실물로 연결됩니다. 운영 사이트는 인수인계 이후에도 계속 움직입니다. 이 글이 보여주는 것은 2026년 5월에 배포된 시점의 작업입니다.",
          },
        },
        {
          type: "stats",
          items: [
            {
              value: "100 / 96 / 90",
              label: {
                en: "Lighthouse SEO, best practices, and accessibility on the live site",
                ja: "本番サイトのLighthouse SEO・ベストプラクティス・アクセシビリティのスコア",
                ko: "운영 사이트의 Lighthouse SEO · 권장사항 · 접근성 점수",
              },
            },
            {
              value: {
                en: "13 case studies",
                ja: "ケーススタディ13件",
                ko: "케이스 스터디 13건",
              },
              label: {
                en: "now read in English and Spanish — the pages that sell the work to the Mexican market",
                ja: "いま英語とスペイン語で読める、メキシコ市場に作品を売るページ",
                ko: "이제 영어와 스페인어로 읽히는, 멕시코 시장에 작업을 파는 페이지들",
              },
            },
            {
              value: {
                en: "Shipped live",
                ja: "本番リリース",
                ko: "운영 배포",
              },
              label: {
                en: "to production, inside the studio's existing brand and stack",
                ja: "スタジオの既存のブランドとスタックの内側で",
                ko: "스튜디오의 기존 브랜드와 스택 안에서",
              },
            },
          ],
        },
        {
          type: "cta",
          label: {
            en: "Visit the live site",
            ja: "本番サイトを見る",
            ko: "운영 사이트 보기",
          },
          href: "https://weloveabattle.com/",
        },
        {
          type: "quote",
          text: {
            en: "Handing an intern full access to our live site isn't something we'd normally do, but the trust was there early and Hajin never gave us a reason to second-guess it — his workflow was quick, his reporting kept everyone aligned, and feedback went in cleanly each round. He brought strong ideas and did the research to back them, then knew how to put them to work.",
            ja: "インターンに本番サイトのフルアクセスを渡すのは、私たちが普段やることではありません。それでも信頼は早い段階でできていて、Hajinはその信頼を疑い直す理由を一度も作りませんでした。作業が速く、報告が全員の認識を揃え、フィードバックは毎回きれいに反映されました。強いアイデアを持ってきて、それを裏づける調査をして、そのうえで実際に動かす方法を知っていました。",
            ko: "인턴에게 운영 사이트 전체 권한을 넘기는 일은 저희가 보통 하지 않는 일입니다. 그런데 신뢰가 일찍 생겼고, Hajin은 그 신뢰를 다시 의심할 이유를 한 번도 만들지 않았습니다. 작업이 빨랐고, 보고가 모두를 같은 자리에 세워 놓았으며, 피드백은 회차마다 깔끔하게 반영됐습니다. 강한 아이디어를 가져왔고, 그것을 뒷받침할 조사를 했고, 그다음에는 그것을 실제로 굴릴 줄 알았습니다.",
          },
          cite: {
            en: "Kenji, Creative Producer, WeLAB Entertainment",
            ja: "Kenji、WeLAB Entertainment クリエイティブプロデューサー",
            ko: "Kenji, WeLAB Entertainment 크리에이티브 프로듀서",
          },
        },
      ],
    },
    {
      id: "reflection",
      label: { en: "05 Reflection", ja: "05 振り返り", ko: "05 회고" },
      blocks: [
        {
          type: "h",
          text: {
            en: "The mindset shift was the real deliverable",
            ja: "本当の成果物は、考え方の変化だった",
            ko: "진짜 산출물은 사고방식의 변화였다",
          },
        },
        {
          type: "p",
          text: {
            en: "School work ends at the rubric; client work doesn't. I learned to research competing studios without being asked, to bring my supervisor questions early instead of guesses late, and to keep iterating past the point where a grade would have called it done.",
            ja: "学校の課題は評価基準で終わりますが、クライアントの仕事はそこで終わりません。私は、言われなくても競合スタジオを調べること、遅れて推測を出す代わりに早い段階で指導担当に質問を持っていくこと、そして成績なら「終わり」と判定していた地点を越えてなお磨き続けることを学びました。",
            ko: "학교 과제는 평가 기준에서 끝나지만, 클라이언트 일은 거기서 끝나지 않습니다. 저는 시키지 않아도 경쟁 스튜디오를 조사하는 법, 늦게 추측을 내놓는 대신 일찍 지도 담당자에게 질문을 가져가는 법, 그리고 학점이라면 ‘끝’이라고 했을 지점을 지나서도 계속 다듬는 법을 배웠습니다.",
          },
        },
        {
          type: "p",
          text: {
            en: "WeLAB handed an intern full access to a production site — trust that changed how carefully I shipped. If I set up the next project, the asset pipeline comes first: knowing exactly which media exists, at what quality, before design starts. I'd also instrument the site from day one — the redesign shipped, but with no analytics baseline I can point to what I built, not yet to what it moved; next time I'd measure the before so the after has a number.",
            ja: "WeLABはインターンに本番サイトのフルアクセスを渡しました。その信頼が、私がどれだけ慎重にリリースするかを変えました。次のプロジェクトを自分で立ち上げるなら、まずアセットパイプラインです。デザインを始める前に、どのメディアがどの品質で存在するのかを正確に把握しておくこと。そして、サイトへの計測を初日から入れます。リデザインはリリースされましたが、アナリティクスのベースラインがないため、私は自分が何を作ったかは示せても、それが何を動かしたかはまだ示せません。次は「前」を測って、「後」に数字がつくようにします。",
            ko: "WeLAB은 인턴에게 운영 사이트의 전체 권한을 넘겼습니다. 그 신뢰가 제가 얼마나 조심스럽게 배포하는지를 바꿔 놓았습니다. 다음 프로젝트를 제가 세팅한다면 에셋 파이프라인이 먼저입니다. 디자인을 시작하기 전에 어떤 미디어가 어떤 품질로 존재하는지를 정확히 아는 일입니다. 그리고 사이트에 계측을 첫날부터 붙이겠습니다. 리디자인은 배포됐지만, 애널리틱스 기준선이 없기 때문에 저는 제가 무엇을 만들었는지는 가리킬 수 있어도 그것이 무엇을 움직였는지는 아직 가리킬 수 없습니다. 다음에는 ‘전’을 측정해서 ‘후’에 숫자가 붙게 하겠습니다.",
          },
        },
      ],
    },
  ],
};
