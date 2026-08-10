export default {
  id: "prolog",
  title: "ProLog",
  kind: "0-to-1 Product · Mobile App",
  description: {
    en: "A mobile platform that turns a fragmented 6,000-hour apprenticeship into one clear, accessible roadmap, designed for neurodivergent apprentices.",
    ja: "散らばっていた見習いの記録を一つの明確なロードマップに変える、ニューロダイバージェントな技能者のためのモバイルアプリ",
    ko: "흩어져 있던 견습 기록을 하나의 분명한 로드맵으로 바꾸는, 신경다양인 기능인을 위한 모바일 앱",
  },
  roles: {
    en: "Lead Development, UX/UI Design",
    ja: "プロダクトデザイン、リサーチ、ブランディング",
    ko: "프로덕트 디자인, 리서치, 브랜딩",
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
        "ProLog is a progress-tracking app that levels the playing field for neurodivergent apprentices in ",
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
  sections: [
    {
      id: "context",
      label: { en: "01 Context", ja: "01 背景", ko: "01 배경" },
      blocks: [
        {
          type: "p",
          text: {
            en: "Becoming a certified tradesperson in British Columbia takes about four years: roughly 6,000 logged work hours, four levels of technical training, and around a hundred competencies per level — all verified against SkilledTradesBC records.",
            ja: "ブリティッシュコロンビア州で資格を取得した技能者になるまでには、約4年かかります。記録された就業時間およそ6,000時間、技術訓練4レベル、レベルごとに約100の技能項目 — そのすべてがSkilledTradesBCの記録と照合して検証されます。",
            ko: "브리티시컬럼비아주에서 자격을 취득한 기능인이 되기까지는 약 4년이 걸립니다. 기록된 근무 시간 약 6,000시간, 기술 교육 4개 레벨, 레벨마다 약 100개의 역량 항목 — 이 전부를 SkilledTradesBC 기록과 대조해 검증받아야 합니다.",
          },
        },
        {
          type: "figure",
          graphic: "prolog-timeline",
          caption: {
            en: "The certification journey of a BC electrical apprentice.",
            ja: "BC州の電気工事の見習いが資格を取得するまでの道のり。",
            ko: "BC주 전기 분야 견습생이 자격을 취득하기까지의 여정.",
          },
        },
        {
          type: "p",
          text: {
            en: "That information lives in scattered places: official portals unfit for mobile, PDF competency documents, separate finance resources, and union forums.",
            ja: "その情報はあちこちに散らばっています。モバイルに向いていない公式ポータル、PDFの技能項目の資料、別々に置かれた資金関連の情報、そして労組のフォーラム。",
            ko: "그 정보는 여기저기 흩어져 있습니다. 모바일에 맞지 않는 공식 포털, PDF로 된 역량 항목 문서, 따로 떨어져 있는 재정 관련 자료, 그리고 노조 포럼.",
          },
        },
        {
          type: "figure",
          graphic: "prolog-fragments",
          caption: {
            en: "Four disconnected systems, one journey to manage.",
            ja: "つながっていないシステム4つ、管理する道のりは一つ。",
            ko: "서로 연결되지 않은 시스템 4개, 관리해야 할 여정은 하나.",
          },
        },
        {
          type: "p",
          text: {
            en: "One in five Canadians is neurodivergent, yet the system remains rigid and text-heavy. For them especially, an already demanding pathway becomes a navigation problem.",
            ja: "カナダ人の5人に1人はニューロダイバージェントです。それでも制度は硬直したままで、文字ばかりです。彼らにとっては特に、ただでさえ負担の大きい課程が、まず道を探すことから問題になります。",
            ko: "캐나다인 5명 중 1명은 신경다양인입니다. 그런데도 제도는 여전히 경직되어 있고 글자 위주입니다. 이들에게는 특히, 그러잖아도 만만찮은 과정이 길을 찾는 일부터 문제가 됩니다.",
          },
        },
        { type: "figure", graphic: "prolog-audience" },
      ],
    },
    {
      id: "problem",
      label: { en: "02 The Problem", ja: "02 課題", ko: "02 문제" },
      blocks: [
        {
          type: "h",
          text: {
            en: "Problem 01 — No map of the journey",
            ja: "課題 01 — 道のりの地図がない",
            ko: "문제 01 — 여정의 지도가 없다",
          },
        },
        {
          type: "p",
          text: {
            en: "Apprentices can see their past hours, but nothing shows where they stand or what comes next. Across Canada, only 16% of apprentices earn certification within their program's expected duration — and even given twice that time, roughly four in ten never certify at all. The requirements are clear on paper. The journey isn't.",
            ja: "見習いは過ぎた時間は見られますが、いま自分がどこにいるのかも、次に何が来るのかも、どこにも出てきません。カナダ全体で、課程が想定する期間内に資格を取得する見習いは16%だけです。その倍の時間をかけても、10人に4人ほどは最後まで資格を取得できません。要件は書類の上でははっきりしています。はっきりしないのは道のりのほうです。",
            ko: "견습생은 지나간 시간은 볼 수 있지만, 지금 어디에 서 있는지도 다음에 무엇이 오는지도 어디에도 나오지 않습니다. 캐나다 전체에서 과정이 예정한 기간 안에 자격을 취득하는 견습생은 16%뿐입니다. 그 두 배의 시간을 줘도 10명 중 4명 정도는 끝내 자격을 취득하지 못합니다. 요건은 문서상으로는 분명합니다. 분명하지 않은 것은 여정입니다.",
          },
        },
        { type: "figure", graphic: "prolog-certstats" },
        {
          type: "h",
          text: {
            en: "Problem 02 — Hours lost in the system",
            ja: "課題 02 — 制度の中で消える時間",
            ko: "문제 02 — 제도 안에서 사라지는 시간",
          },
        },
        {
          type: "p",
          text: {
            en: "The sharpest concern in our interviews: discrepancies between the hours apprentices actually worked and the hours officially recorded — and no clear way to fix them. What proof counts? Who do you escalate to? Hard-earned progress quietly goes missing, delaying progression and draining motivation.",
            ja: "インタビューで最も鋭く出てきた不安はこれでした。実際に働いた時間と公式に記録された時間が食い違うのに、それを直す道筋がはっきりしないこと。どの証拠が認められるのか。誰に申し立てればいいのか。苦労して積み上げた進捗が音もなく消え、次の段階が遅れ、意欲が削られます。",
            ko: "인터뷰에서 가장 날카롭게 나온 걱정은 이것이었습니다. 실제로 일한 시간과 공식적으로 기록된 시간이 어긋나는데, 그것을 바로잡을 방법이 분명하지 않다는 것. 어떤 증빙이 인정될까? 누구에게 이의를 제기해야 할까? 힘들게 쌓은 진행 상황이 소리 없이 사라지고, 다음 단계가 늦어지고, 의욕이 깎입니다.",
          },
        },
        { type: "figure", graphic: "prolog-discrepancy" },
        {
          type: "h",
          text: {
            en: "Problem 03 — Scattered support",
            ja: "課題 03 — 散らばった支援",
            ko: "문제 03 — 흩어진 지원",
          },
        },
        {
          type: "p",
          text: {
            en: "Apprentices work from their phones — nine of the twelve we surveyed named the phone as their primary device — but the study guides and funding pages they need are built for a desktop: dense, multi-column, unusable one-handed on a job site. The support exists. It just isn't built for where the work happens.",
            ja: "見習いはスマートフォンで働いています。私たちが調査した12人のうち9人が、スマートフォンを主な端末に挙げました。ところが、必要な学習資料や支援制度のページはデスクトップを前提に作られています。文字が詰まっていて、段組みが多く、現場で片手では使えません。支援はあります。ただ、仕事が起きる場所に合わせて作られていないだけです。",
            ko: "견습생은 스마트폰으로 일합니다. 저희가 설문한 12명 중 9명이 스마트폰을 주 사용 기기로 꼽았습니다. 그런데 정작 필요한 학습 자료와 지원 제도 안내 페이지는 데스크톱을 기준으로 만들어져 있습니다. 빽빽하고, 여러 단으로 나뉘어 있고, 현장에서 한 손으로는 쓸 수 없습니다. 지원은 있습니다. 다만 일이 벌어지는 자리에 맞게 만들어져 있지 않을 뿐입니다.",
          },
        },
      ],
    },
    {
      id: "approach",
      label: { en: "03 Approach", ja: "03 アプローチ", ko: "03 접근 방식" },
      blocks: [
        {
          type: "p",
          text: {
            en: "We surveyed and interviewed twelve apprentices across BC — electrical, plumbing, HVAC, welding, power engineering, ironworking, and landscaping — from first-year apprentices to journeypersons, union and non-union alike. Alongside, we reviewed the ecosystem they navigate: SkilledTradesBC portals and success-story profiles, competency documents, and the forum threads where apprentices ask each other what the official channels don't answer.",
            ja: "私たちはBC州全域の見習い12人に調査とインタビューを行いました。電気、配管、空調、溶接、動力設備、鉄骨、造園 — 1年目の見習いから資格を取得した熟練工まで、労組加入・非加入を問わず話を聞きました。あわせて、彼らがたどるエコシステムも調べました。SkilledTradesBCのポータルと資格取得者の紹介記事、技能項目の資料、そして公式の窓口が答えてくれないことを見習い同士が尋ね合うフォーラムのスレッドまで。",
            ko: "저희는 BC주 전역의 견습생 12명을 설문하고 인터뷰했습니다. 전기, 배관, 냉난방공조, 용접, 동력 설비, 철골, 조경 — 1년 차 견습생부터 자격을 취득한 숙련공까지, 노조 소속과 비소속을 가리지 않았습니다. 이와 함께 이들이 헤쳐 나가는 생태계도 살펴봤습니다. SkilledTradesBC 포털과 자격 취득 사례 소개, 역량 항목 문서, 그리고 공식 창구가 답해 주지 않는 것을 견습생끼리 서로 묻는 포럼 스레드까지.",
          },
        },
        { type: "figure", graphic: "prolog-participants" },
        {
          type: "stats",
          items: [
            {
              value: "11/12",
              label: {
                en: "knew their next-level requirements — the information just lived in four different places",
                ja: "次のレベルの要件を知っていた — 情報が4か所に分かれていただけ",
                ko: "다음 레벨의 요건을 알고 있었다 — 정보가 4곳에 나뉘어 있었을 뿐",
              },
            },
            {
              value: "10/12",
              label: {
                en: "had been asked to work above or below their level",
                ja: "自分のレベルより上または下の仕事を求められたことがある",
                ko: "자기 레벨보다 높거나 낮은 일을 요구받은 적이 있다",
              },
            },
            {
              value: "9/12",
              label: {
                en: "named the phone as their primary device",
                ja: "スマートフォンを主な端末に挙げた",
                ko: "스마트폰을 주 사용 기기로 꼽았다",
              },
            },
            {
              value: "9/12",
              label: {
                en: "had never contacted their assigned mentor",
                ja: "割り当てられたメンターに一度も連絡したことがない",
                ko: "배정된 멘토에게 한 번도 연락한 적이 없다",
              },
            },
          ],
        },
        {
          type: "h",
          text: {
            en: "What we heard",
            ja: "私たちが聞いたこと",
            ko: "우리가 들은 것",
          },
        },
        {
          type: "list",
          items: [
            {
              en: "Everyone tracks differently — the official portal, paper logbooks, employer or union records. ProLog has to sit on top of these systems and sync with them, not ask apprentices to abandon them.",
              ja: "記録の仕方は人によって違います。公式ポータル、紙の作業日誌、雇用主や労組の記録。ProLogはこれらのシステムを捨てさせるのではなく、その上に乗って同期する必要があります。",
              ko: "기록하는 방식이 사람마다 다릅니다. 공식 포털, 종이 작업일지, 고용주나 노조의 기록. ProLog는 이 시스템들을 버리게 하는 것이 아니라, 그 위에 얹혀 동기화되어야 합니다.",
            },
            {
              en: "Competency boundaries blur on real job sites — and sign-offs don't keep up.",
              ja: "実際の現場では技能項目の境界が曖昧になります。自分のレベルより上または下の仕事を求められ、承認がその速さに追いつきません。",
              ko: "실제 현장에서는 역량 항목의 경계가 흐려집니다. 자기 레벨보다 높거나 낮은 일을 요구받고, 승인은 그 속도를 따라가지 못합니다.",
            },
            {
              en: 'Support exists but goes unused — "not sure who to ask" came up again and again, alongside funding programs apprentices didn\'t know they qualified for.',
              ja: "支援はあるのに使われていません。「誰に聞けばいいのか分からない」という言葉が何度も出てきましたし、自分が対象だと知らなかった支援制度の話も同じように出てきました。",
              ko: "지원은 있지만 쓰이지 않습니다. ‘누구에게 물어야 할지 모르겠다’는 말이 몇 번이고 나왔고, 자기가 대상인 줄도 몰랐던 지원 제도 이야기도 함께 나왔습니다.",
            },
            {
              en: "Short, practical formats win: videos under two minutes, checklists, and links to official sources beat long documents every time.",
              ja: "短くて実用的な形式が勝ちます。2分以内の動画、チェックリスト、公式の情報源への直接のリンクが、長い資料に毎回勝ります。",
              ko: "짧고 실용적인 형식이 이깁니다. 2분 이하의 영상, 체크리스트, 공식 출처로 바로 가는 링크가 긴 문서를 언제나 앞섭니다.",
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "The friction we heard most — overwhelm from fragmented, text-heavy information — is exactly what neurodivergent apprentices feel most sharply. Designing for that edge sharpened ProLog for every apprentice.",
            ja: "最も多く聞いた不便は、散らばっていて文字ばかりの情報に圧倒される感覚でした。そしてそれは、ニューロダイバージェントな見習いが最も鋭く感じている、まさにその地点です。その端を基準に設計した結果、ProLogはすべての見習いにとってより明快なアプリになりました。",
            ko: "가장 많이 들은 불편은 흩어져 있고 글자만 많은 정보에 짓눌리는 느낌이었습니다. 그리고 이것은 신경다양인 견습생이 가장 날카롭게 느끼는 바로 그 지점입니다. 그 끝단을 기준으로 설계한 결과, ProLog는 모든 견습생에게 더 또렷한 앱이 되었습니다.",
          },
        },
        {
          type: "p",
          text: {
            en: "We distilled these into two contrasting personas: Izzy, a Level 2 apprentice finding her footing with sticky notes and handmade study guides, and Jordan, a Level 4 veteran closing out his ticket, overwhelmed by wordy PDFs and long resource lists. They kept every feature decision anchored to a real person's week.",
            ja: "これらを、対照的な二つのペルソナに絞り込みました。ようやく足場を固めつつある1年目の見習いと、資格取得を終えようとしているレベル4のベテランです。Izzyはふせんと自作の学習資料でどうにか進捗をつなぎとめていて、Jordanは言葉の多いPDFと長い資料リストに圧倒されています。この二人が、すべての機能の判断を実在する一人の一週間につなぎとめました。",
            ko: "이것들을 서로 대비되는 페르소나 둘로 압축했습니다. 이제 막 자리를 잡아 가는 1년 차 견습생, 그리고 자격 취득을 마무리하는 레벨 4 베테랑입니다. Izzy는 포스트잇과 직접 만든 학습 자료로 겨우 진행 상황을 붙들고 있고, Jordan은 말 많은 PDF와 긴 자료 목록에 짓눌려 있습니다. 이 둘이 모든 기능 결정을 실제 한 사람의 한 주에 붙들어 두었습니다.",
          },
        },
        {
          type: "figure",
          graphics: ["prolog-persona-izzy", "prolog-persona-jordan"],
          caption: {
            en: "Izzy (Level 2, entry) and Jordan (Level 4, veteran) — the two ends of the journey ProLog serves.",
            ja: "Izzy（レベル2、入り口）とJordan（レベル4、ベテラン） — ProLogが向き合う道のりの両端。",
            ko: "Izzy(레벨 2, 초입)와 Jordan(레벨 4, 베테랑) — ProLog가 상대하는 여정의 양 끝.",
          },
        },
        {
          type: "h",
          text: { en: "Design principles", ja: "設計原則", ko: "설계 원칙" },
        },
        {
          type: "list",
          items: [
            {
              en: "One source of truth — progress, hours, money, and study in a single app.",
              ja: "情報の出どころは一つに — 進捗、時間、お金、学習を一つのアプリの中に。",
              ko: "정보의 출처는 하나로 — 진행 상황, 시간, 돈, 학습을 앱 하나 안에.",
            },
            {
              en: "Nothing goes missing — no progress, no requirement, no deadline.",
              ja: "何も失われないように — 進捗も、要件も、期限も。",
              ko: "아무것도 사라지지 않게 — 진행 상황도, 요건도, 기한도.",
            },
            {
              en: "Complement the system, don't replace it — sync with SkilledTradesBC records and export back to them.",
              ja: "制度を置き換えず、補うこと — SkilledTradesBCの記録と同期し、そちらへ書き戻すこと。",
              ko: "제도를 대체하지 말고 보완할 것 — SkilledTradesBC 기록과 동기화하고, 다시 그쪽으로 내보낼 것.",
            },
            {
              en: "Built for neurodivergent users — information in small chunks, visual progress, reminders, and text-to-speech, on a phone, one-handed.",
              ja: "ニューロダイバージェントな利用者を基準に作ること — 小さく分けた情報、目に見える進捗、リマインダー、読み上げ。スマートフォンで、片手で。",
              ko: "신경다양인 사용자를 기준으로 만들 것 — 작게 나뉜 정보, 눈에 보이는 진행 상황, 알림, 텍스트 음성 변환. 스마트폰에서, 한 손으로.",
            },
          ],
        },
      ],
    },
    {
      id: "solution",
      label: {
        en: "04 The Solution",
        ja: "04 ソリューション",
        ko: "04 솔루션",
      },
      blocks: [
        {
          type: "h",
          text: {
            en: "From structure to shipped",
            ja: "構造から完成したビルドまで",
            ko: "구조에서 완성된 빌드까지",
          },
        },
        {
          type: "figure",
          graphic: "prolog-fig-midfi-grid",
          caption: {
            en: "Sixty mid-fi screens mapped every state — quiz right and wrong, filters, drawers — before a single hi-fi pixel.",
            ja: "ハイファイのピクセルを一つも描く前に、ミドルファイの画面60枚であらゆる状態を洗い出した — クイズの正解と不正解、フィルター、ドロワーまで。",
            ko: "하이파이 픽셀을 단 하나도 그리기 전에, 미드파이 화면 60개로 모든 상태를 그렸다 — 퀴즈 정답과 오답, 필터, 드로어까지.",
          },
        },
        {
          type: "solution",
          title: {
            en: "A 6,000-hour journey at a glance",
            ja: "6,000時間の道のりをひと目で",
            ko: "6,000시간의 여정을 한눈에",
          },
          tag: { en: "↔ Problem 01", ja: "↔ 課題 01", ko: "↔ 문제 01" },
          paras: [
            {
              en: "ProLog's dashboard turns certification into a single roadmap: hours tracked, hours left in the current level, and hours until Red Seal — with competency and finance status alongside. Whenever it gets overwhelming, the dashboard shows exactly where you are and what's ahead.",
              ja: "ProLogのダッシュボードは、資格取得を一つのロードマップに変えます。これまでに記録した時間、いまのレベルで残っている時間、Red Sealまでに残っている時間 — その隣に技能項目とお金の状況が並びます。手に負えないと感じるたびに、ダッシュボードはいまどこにいて、この先に何が残っているかを正確に見せます。",
              ko: "ProLog의 대시보드는 자격 취득을 하나의 로드맵으로 바꿉니다. 지금까지 기록한 시간, 현재 레벨에서 남은 시간, Red Seal까지 남은 시간 — 그 옆에 역량 항목과 재정 상황이 나란히 놓입니다. 벅차게 느껴질 때마다 대시보드는 지금 어디에 있고 앞에 무엇이 남았는지를 정확히 보여 줍니다.",
            },
            {
              en: "Every figure is tappable — hours break down by competency, so exploring your own progress is the default interaction, not a dead end.",
              ja: "数値はすべてタップできます。時間は技能項目ごとに分解されるので、自分の進捗を掘り下げていくことが、行き止まりではなくデフォルトの操作になります。",
              ko: "모든 수치는 탭할 수 있습니다. 시간은 역량 항목별로 쪼개져 나오고, 그래서 자기 진행 상황을 직접 파고드는 것이 막다른 화면이 아니라 기본 동작이 됩니다.",
            },
            {
              en: "For Izzy — who holds her progress together across sticky notes and a paper journal — one tappable total replaces the pile she used to reconstruct by hand.",
              ja: "ふせんと紙の手帳にまたがって進捗をどうにかつなぎとめていたIzzyにとっては、タップできる合計が一つあるだけで、手で組み直していたあの山の代わりになります。",
              ko: "포스트잇과 종이 수첩에 걸쳐 진행 상황을 겨우 붙들고 있던 Izzy에게는, 탭할 수 있는 합계 하나가 손으로 일일이 맞춰 보던 그 더미를 대신합니다.",
            },
          ],
          media: [
            "journey-dashboard-1",
            "journey-dashboard-2",
            "journey-dashboard-3",
          ],
          caption: {
            en: "The dashboard: journey path, hours, competencies, and what's next — one screen.",
            ja: "道のりの経路、時間、技能項目、次にやること — ダッシュボードの一画面。",
            ko: "여정 경로, 시간, 역량 항목, 다음에 할 일 — 대시보드 한 화면.",
          },
        },
        {
          type: "solution",
          title: {
            en: "No hour goes missing",
            ja: "一時間たりとも失われない",
            ko: "단 한 시간도 사라지지 않게",
          },
          tag: { en: "↔ Problem 02", ja: "↔ 課題 02", ko: "↔ 문제 02" },
          paras: [
            {
              en: "ProLog links to a user's SkilledTradesBC account and paystub records, and cross-checks the two in real time. When a discrepancy appears — say, 30 hours short of what the paystubs prove — ProLog flags it immediately, with a full report already generated and ready to send to the employer in one tap. What used to be a silent delay becomes an item you can resolve.",
              ja: "ProLogは利用者のSkilledTradesBCのアカウントと給与明細の記録をつなぎ、この二つをリアルタイムで突き合わせます。食い違いが出たとき — たとえば給与明細が証明する時間より30時間足りないとき — ProLogはすぐにそれを検知します。雇用主へ送る報告書はすでに作られていて、ワンタップで送れます。これまで静かに遅れていくだけだったものが、片づけられる項目になります。",
              ko: "ProLog는 사용자의 SkilledTradesBC 계정과 급여명세서 기록을 연결해, 둘을 실시간으로 대조합니다. 불일치가 생기면 — 이를테면 급여명세서가 증명하는 것보다 30시간이 모자라면 — ProLog가 곧바로 잡아냅니다. 고용주에게 보낼 보고서는 이미 만들어져 있어서, 탭 한 번이면 보낼 수 있습니다. 조용히 늦어지기만 하던 일이 처리할 수 있는 항목이 됩니다.",
            },
          ],
          media: ["manual-scanning", "work-paystub-records", "work-hours"],
          caption: {
            en: "Scan a paystub, keep the record, catch the gap — the discrepancy flag does the chasing.",
            ja: "給与明細をスキャンし、記録を残し、抜けを捕まえる — 追いかける仕事は不一致の検知が肩代わりする。",
            ko: "급여명세서를 스캔하고, 기록을 남기고, 빈틈을 잡아낸다 — 쫓아다니는 일은 불일치 감지가 대신한다.",
          },
        },
        {
          type: "solution",
          title: {
            en: "Everything else, in one place",
            ja: "残りのすべてを、一か所に",
            ko: "나머지 전부를, 한자리에",
          },
          tag: { en: "↔ Problem 03", ja: "↔ 課題 03", ko: "↔ 문제 03" },
          paras: [
            {
              en: "Beyond tracking, ProLog folds in the support apprentices otherwise hunt for. A finance view lays out expected expenses for the term — tuition, tools, books — next to the grants and support programs they can apply to. A study section covers every competency in the level, built around the short, practical formats apprentices told us they use — summaries, text-to-speech, and AI-generated quizzes that refresh on every attempt, through to full exam prep.",
              ja: "ProLogは進捗の管理にとどまらず、見習いが自分で探し回るしかなかった支援まで内側に取り込みます。お金の画面は、その学期にかかる費用を整理して見せます — 授業料、工具、教材。その隣には、申請できる助成金と支援制度が並びます。学習の画面はそのレベルの技能項目をすべて扱いますが、見習いたちが実際に使っていると話してくれた短く実用的な形式に合わせて作りました — 要約、読み上げ、そして試すたびに問題が入れ替わるAI生成のクイズから、試験対策一式まで。",
              ko: "ProLog는 진행 상황 추적을 넘어, 견습생이 아니면 직접 찾아다녀야 하는 지원까지 안으로 끌어들입니다. 재정 화면은 그 학기에 들어갈 비용을 정리해 보여 줍니다 — 수업료, 공구, 교재. 그 옆에는 신청할 수 있는 보조금과 지원 제도가 나란히 놓입니다. 학습 화면은 해당 레벨의 역량 항목을 전부 다루되, 견습생들이 실제로 쓴다고 말한 짧고 실용적인 형식에 맞춰 만들었습니다 — 요약, 텍스트 음성 변환, 그리고 시도할 때마다 새로 나오는 AI 생성 퀴즈부터 전체 시험 대비까지.",
            },
            {
              en: "Reminders are created automatically from the user's own records: tuition due Sunday, EI application by the 31st, certification expiring next Friday.",
              ja: "リマインダーは利用者自身の記録から自動で作られます。日曜が授業料の納付日、31日までに雇用保険(EI)の申請、来週金曜に切れる資格。",
              ko: "알림은 사용자 자신의 기록에서 자동으로 만들어집니다. 일요일이 수업료 납부일, 31일까지 고용보험(EI) 신청, 다음 주 금요일에 만료되는 자격증.",
            },
            {
              en: "For Jordan — a Level 4 who dreads the wordy PDFs and buried deadlines — the grant he qualifies for and his ticket-renewal date surface before he has to go hunting for them.",
              ja: "言葉の多いPDFと、どこかに埋もれた期限にうんざりしているレベル4のJordanにとっては、受け取る資格のある助成金と資格の更新日が、自分で探しに行く前に先に出てきます。",
              ko: "말 많은 PDF와 어딘가에 묻혀 있는 기한을 질색하는 레벨 4 Jordan에게는, 받을 자격이 되는 보조금과 자격증 갱신일이 찾아 나서기 전에 먼저 올라옵니다.",
            },
          ],
          media: ["work-finance", "competency-exam-prep", "dashboard-reminder"],
          caption: {
            en: "Finance, study, and reminders — the support apprentices used to hunt for.",
            ja: "お金、学習、リマインダー — 見習いが自分で探し回るしかなかった支援。",
            ko: "재정, 학습, 알림 — 견습생이 직접 찾아다녀야 했던 지원.",
          },
        },
        {
          type: "h",
          text: {
            en: "Tested with five apprentices. Three fixes shipped.",
            ja: "見習い5人とテストした。三件の修正を反映した。",
            ko: "견습생 5명과 테스트했다. 수정 세 건을 반영했다.",
          },
        },
        {
          type: "p",
          text: {
            en: "Task-based sessions with five apprentices surfaced three failures in the first build. All three fixes shipped before the showcase — each one visible below, before and after.",
            ja: "見習い5人と行ったタスクベースのセッションで、最初のビルドの失敗が三つ見つかりました。三件とも、ショーケースの前に修正を反映しています。下でそれぞれの修正前と修正後を見ることができます。",
            ko: "견습생 5명과 진행한 과업 기반 세션에서 첫 빌드의 실패 지점 세 곳이 드러났습니다. 세 건 모두 쇼케이스 전에 고쳐서 반영했고, 아래에서 수정 전과 후를 하나씩 볼 수 있습니다.",
          },
        },
        {
          type: "figure",
          graphics: [
            "prolog-ba-progress",
            "prolog-ba-navigation",
            "prolog-ba-visual-cues",
          ],
        },
      ],
    },
    {
      id: "visual",
      label: {
        en: "05 Visual Language",
        ja: "05 ビジュアル言語",
        ko: "05 비주얼 언어",
      },
      blocks: [
        {
          type: "p",
          text: {
            en: "The identity and system were built across the eight-person team — my part was co-designing the components and implementing the full system in React Native.",
            ja: "アイデンティティとシステムは8名のチーム全体で作りました。私が担当したのは、コンポーネントを共同でデザインすることと、システム全体をReact Nativeで実装することです。",
            ko: "아이덴티티와 시스템은 8명 팀이 함께 만들었습니다. 제가 맡은 부분은 컴포넌트를 함께 디자인한 것과, 시스템 전체를 React Native로 구현한 것입니다.",
          },
        },
        {
          type: "h",
          text: {
            en: "A mark that maps the journey",
            ja: "道のりをそのまま描いたマーク",
            ko: "여정을 그대로 그린 마크",
          },
        },
        {
          type: "p",
          text: {
            en: "The ProLog mark is the product in miniature: rounded nodes linked along a winding path — the same journey map the dashboard draws — with a single orange block marking where you are now. The rule that runs through the whole system starts here: if it's orange, it moves you forward.",
            ja: "ProLogのマークは、製品を縮めたものです。曲がりくねった道に沿って丸いノードが連なり — ダッシュボードが描くのと同じ道のりマップです — いまいる場所は一つのオレンジのブロックで示されます。システム全体を貫くルールはここから始まります。オレンジ色なら、前へ進むためのものです。",
            ko: "ProLog 마크는 제품을 축소해 놓은 것입니다. 굽은 길을 따라 둥근 노드들이 이어지고 — 대시보드가 그리는 바로 그 여정 맵입니다 — 지금 있는 자리는 주황 블록 하나로 표시됩니다. 시스템 전체를 관통하는 규칙이 여기서 시작합니다. 주황색이면 앞으로 나아가기 위한 것입니다.",
          },
        },
        { type: "figure", graphic: "prolog-logo" },
        {
          type: "h",
          text: {
            en: "A palette built for the job site",
            ja: "現場のために作ったパレット",
            ko: "현장을 위해 만든 팔레트",
          },
        },
        {
          type: "p",
          text: {
            en: "Industrial-inspired neutrals ground the interface, with a single bold orange reserved for progress and key actions. That rule carries through every interactive state: orange for actions you can take now, grey for information that waits, dimmed for steps not yet unlocked.",
            ja: "工業現場から取ったニュートラルカラーがインターフェースの土台をつくり、濃いオレンジ一色だけを進捗と主要な操作に残します。このルールはすべてのインタラクション状態にそのまま通ります。いま実行できる操作はオレンジ、待っている情報はグレー、まだ解放されていない段階は暗く。",
            ko: "산업 현장에서 가져온 뉴트럴 색이 인터페이스의 바닥을 잡아 주고, 진한 주황 하나만 진행 상황과 핵심 동작에 남겨 둡니다. 이 규칙은 모든 인터랙션 상태에 그대로 이어집니다. 지금 할 수 있는 동작은 주황, 기다리는 정보는 회색, 아직 열리지 않은 단계는 흐리게.",
          },
        },
        { type: "figure", graphic: "prolog-palette" },
        {
          type: "h",
          text: {
            en: "Type that works at arm's length",
            ja: "腕を伸ばした距離でも読めるタイポグラフィ",
            ko: "팔 뻗은 거리에서도 읽히는 타이포그래피",
          },
        },
        {
          type: "p",
          text: {
            en: "The type system prioritizes glanceability — clear weight contrast, generous sizing, and numerals treated as first-class content: “You've completed 1,240 hours, keep going.”",
            ja: "タイプシステムが最優先するのは、ひと目で読み取れることです。ウェイトのコントラストをはっきりさせ、サイズを大きめに取り、数字を本文と対等なコンテンツとして扱います — “You've completed 1,240 hours, keep going.”",
            ko: "타입 시스템은 한눈에 읽히는 것을 가장 앞에 둡니다. 굵기 대비를 분명히 하고, 크기를 넉넉하게 잡고, 숫자를 본문과 동등한 콘텐츠로 다룹니다 — “You've completed 1,240 hours, keep going.”",
          },
        },
        { type: "figure", graphic: "prolog-type" },
        {
          type: "h",
          text: {
            en: "Beyond the screen",
            ja: "画面の外へ",
            ko: "화면 밖으로",
          },
        },
        {
          type: "p",
          text: {
            en: "The identity extends to a promotional campaign — video, brochure, billboard, stickers, and social media — built on the same visual system.",
            ja: "アイデンティティは、プロモーションのキャンペーンにも広がります。映像、パンフレット、屋外広告、ステッカー、ソーシャルメディア — どれも同じビジュアルシステムの上で作りました。",
            ko: "아이덴티티는 홍보 캠페인까지 이어집니다. 영상, 브로슈어, 옥외 광고, 스티커, 소셜 미디어 — 전부 같은 비주얼 시스템 위에서 만들었습니다.",
          },
        },
        {
          type: "figure",
          graphic: "prolog-campaign-video",
          caption: {
            en: "The promotional film made for the showcase.",
            ja: "ショーケースのために作ったプロモーション映像。",
            ko: "쇼케이스를 위해 만든 홍보 영상.",
          },
        },
        {
          type: "figure",
          graphic: "prolog-campaign-billboards",
          caption: {
            en: "Brochure and billboard concepts.",
            ja: "パンフレットと屋外広告の案。",
            ko: "브로슈어와 옥외 광고 시안.",
          },
        },
        {
          type: "figure",
          graphic: "prolog-campaign-instagram",
          caption: {
            en: "Instagram carousel — the frames connect into one continuous scene as you swipe.",
            ja: "Instagramのカルーセル — スワイプすると、フレームがつながって一つの場面になる。",
            ko: "Instagram 캐러셀 — 넘길 때마다 프레임이 이어져 하나의 장면이 된다.",
          },
        },
      ],
    },
    {
      id: "outcome",
      label: { en: "06 Outcome", ja: "06 成果", ko: "06 결과" },
      blocks: [
        {
          type: "h",
          text: {
            en: "A working build, not just a prototype",
            ja: "プロトタイプではなく、実際に動くビルド。",
            ko: "프로토타입이 아니라, 실제로 동작하는 빌드다.",
          },
        },
        {
          type: "demo",
          /* CaseStudyPage falls back to a hardcoded English "Try app" when a
             demo block carries no label, so the label has to exist as data
             before the other two languages can reach it. The English is the
             same word the fallback was already putting on screen. */
          label: { en: "Try app", ja: "アプリを試す", ko: "앱 사용해 보기" },
          note: {
            en: "ProLog runs as a React Native Expo app. The embedded build is the actual product.",
            ja: "ProLogはReact Native Expoのアプリとして動きます。ここに埋め込まれているビルドが、実際の製品そのものです。",
            ko: "ProLog는 React Native Expo 앱으로 동작합니다. 여기 임베드된 빌드가 실제 제품 그대로입니다.",
          },
        },
        {
          type: "list",
          items: [
            {
              en: "Presented live at the ConnectHER Technology Showcase — where students design digital solutions for underrepresented people in the trades — to an audience that included BC's Minister of State for AI and New Technologies, two Members of Parliament, and the Mayor of Burnaby",
              ja: "技能職で十分に代表されていない人たちのためのデジタルソリューションを学生が設計する場である、ConnectHER Technology Showcaseで実際に発表した。聴衆には、BC州のAI・新技術担当大臣、連邦下院議員2名、バーナビー市長がいた",
              ko: "기능직에서 충분히 대표되지 못하는 사람들을 위한 디지털 솔루션을 학생들이 만드는 자리인 ConnectHER Technology Showcase에서 직접 발표했다. 청중에는 BC주 AI·신기술 정무장관, 연방 하원의원 2명, 버나비 시장이 있었다",
            },
            {
              en: "Presented at SSE Y2WD, a BCIT student design and technology showcase",
              ja: "SSE Y2WDで発表した",
              ko: "SSE Y2WD에서 발표했다",
            },
            {
              en: "Recognized with a certificate from MP Jake Sawatzky, presented to each participating team",
              ja: "Jake Sawatzky連邦下院議員から証書を受け取った。参加チーム全員に贈られた証書だ",
              ko: "Jake Sawatzky 연방 하원의원이 수여한 증서를 받았다. 참가 팀 전원에게 준 증서다",
            },
            {
              en: "Scoped to the electrical apprenticeship in BC, with an expansion path toward all skilled trades across Canada",
              ja: "BC州の電気工事の見習い課程に範囲を絞り、カナダ全域のすべての技能職へ広げていく道筋を残した",
              ko: "BC주 전기 분야 견습 과정으로 범위를 한정했고, 캐나다 전역의 모든 기능직으로 넓혀 갈 길을 열어 두었다",
            },
          ],
        },
        {
          type: "figure",
          graphics: [
            "prolog-showcase-stage",
            "prolog-showcase-crowd",
            "prolog-showcase-booth",
          ],
          caption: {
            en: [
              "The 6,000-hour story told live, a full house, and the Mayor of Burnaby at the ProLog booth. ",
              {
                text: "Photos: Carlos M Bonmatí / BCIT",
                href: "https://www.flickr.com/photos/bcitbusiness/albums/72177720330795756/with/54972788549",
              },
            ],
            ja: [
              "6,000時間の物語を舞台で、満席の会場、そしてProLogのブースに来たバーナビー市長。 ",
              {
                text: "写真: Carlos M Bonmatí / BCIT",
                href: "https://www.flickr.com/photos/bcitbusiness/albums/72177720330795756/with/54972788549",
              },
            ],
            ko: [
              "6,000시간의 이야기를 무대에서, 가득 찬 객석, 그리고 ProLog 부스에 온 버나비 시장. ",
              {
                text: "사진: Carlos M Bonmatí / BCIT",
                href: "https://www.flickr.com/photos/bcitbusiness/albums/72177720330795756/with/54972788549",
              },
            ],
          },
        },
      ],
    },
    {
      id: "reflection",
      label: { en: "07 Reflection", ja: "07 振り返り", ko: "07 회고" },
      blocks: [
        {
          type: "h",
          text: {
            en: "Research earned its keep in the details",
            ja: "リサーチが効いたのは、細部だった。",
            ko: "리서치는 디테일에서 제 몫을 했다.",
          },
        },
        {
          type: "p",
          text: {
            en: "The decisions that mattered most — the discrepancy detector, tappable hour breakdowns, auto-generated reminders — came directly from things apprentices told us, not from assumptions about what a tracking app should be.",
            ja: "いちばん重要だった判断は、見習いたちが私たちに話してくれたことから直接出てきました。不一致の検知、タップして開く時間の内訳、自動で作られるリマインダーがそうです。記録アプリとはこういうものだ、という思い込みから出たものではありません。",
            ko: "가장 중요했던 결정들은 견습생들이 저희에게 해 준 말에서 곧바로 나왔습니다. 불일치 감지, 탭해서 펼쳐 보는 시간 내역, 자동으로 만들어지는 알림이 그렇습니다. 추적 앱이라면 이래야 한다는 가정에서 나온 것이 아닙니다.",
          },
        },
        {
          type: "h",
          text: {
            en: "Building the design made me a better designer",
            ja: "デザインを自分で実装して、デザイナーとして伸びた。",
            ko: "디자인을 직접 구현해 보면서 더 나은 디자이너가 됐다.",
          },
        },
        {
          type: "p",
          text: {
            en: "Implementing the team's design system in React Native forced honesty about what the specs actually said — every vague token, every undefined state surfaced in code. Working between the lead designer and the build taught me to speak both languages.",
            ja: "チームのデザインシステムをReact Nativeで実装していると、仕様が実際に何を言っているのかを正直に見るしかありませんでした。曖昧なトークン一つ、定義されていない状態一つが、すべてコードの上に出てきました。リードデザイナーとビルドのあいだで動くうちに、両方の言葉を話せるようになりました。",
            ko: "팀의 디자인 시스템을 React Native로 구현하다 보니, 스펙이 실제로 무엇을 말하고 있는지 정직하게 마주할 수밖에 없었습니다. 모호한 토큰 하나, 정의되지 않은 상태 하나가 전부 코드에서 드러났습니다. 리드 디자이너와 빌드 사이에서 일하면서 양쪽 언어를 다 쓰는 법을 배웠습니다.",
          },
        },
        {
          type: "h",
          text: {
            en: "With more time",
            ja: "もっと時間があれば",
            ko: "시간이 더 있었다면",
          },
        },
        {
          type: "p",
          text: {
            en: "I would test the discrepancy flow with employers as well as apprentices; their side of the sign-off shapes the anxiety we set out to remove.",
            ja: "不一致のフローを、見習いだけでなく雇用主とも試してみたいです。承認のプロセスで雇用主の側がすることが、私たちが取り除こうとしたあの不安のかたちを決めているからです。",
            ko: "불일치 흐름을 견습생뿐 아니라 고용주와도 테스트해 보고 싶습니다. 승인 과정에서 고용주 쪽이 하는 일이 저희가 없애려 했던 그 불안의 모양을 결정하기 때문입니다.",
          },
        },
      ],
    },
  ],
  demo: true,
};
