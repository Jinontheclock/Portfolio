import cardPoster from "../../assets/tinypaws/tinypaws-card-poster.webp";

export default {
  id: "tinypaws",
  title: "TinyPaws",
  kind: "Academic Project · Web Design & Dev",
  /* Work-card thumbnail: the case study's own hero clip, cropped to the
     card's proportions and without the logo the hero floats over it. The
     card rests on the poster and plays under the pointer.
     scripts/build-card-videos.py makes all three files. */
  video: {
    /* VP9 first so a Chromium without the proprietary codecs still plays
       it; H.264 is what everything else takes */
    sources: [
      {
        src: `${import.meta.env.BASE_URL}media/tinypaws/tinypaws-card.webm`,
        type: "video/webm",
      },
      {
        src: `${import.meta.env.BASE_URL}media/tinypaws/tinypaws-card.mp4`,
        type: "video/mp4",
      },
    ],
    poster: cardPoster,
  },
  thumbAlt: {
    en: "The TinyPaws site on a desktop monitor, open at the home page",
    ja: "デスクトップモニターに映るTinyPawsのサイト。ホームが開いている",
    ko: "데스크톱 모니터에 띄운 TinyPaws 사이트. 홈 화면이 열려 있다",
  },
  description: {
    en: "A clear adoption pathway for a rescue website: co-designing the UX, building the brand identity, and hand-coding the responsive site with Astro.",
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
        "TinyPaws is a concept website for a volunteer-run kitten rescue in Vancouver. It is the rescue's front door, where adopters decide whether to trust, apply, or leave. On a five-person team, I co-designed the UX, built the visual identity, and hand-coded the site itself. Created at ",
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
  sections: [
    {
      id: "brief",
      label: {
        en: "01 The Brief",
        ja: "01 与件",
        ko: "01 브리프",
      },
      blocks: [
        {
          type: "p",
          text: {
            en: "A rescue's website does one job: turn goodwill into homes. TinyPaws needed a site that could explain adoption to first-timers, prove its cats' histories to careful adopters, and make giving (time, foster space, money) feel as easy as browsing.",
            ja: "保護団体のサイトの仕事はひとつです。善意を、猫が暮らす家に変えること。TinyPawsに必要だったのは、初めての人に譲渡の流れを説明でき、慎重な里親希望者に猫のこれまでを示せて、時間や一時預かりの部屋や寄付を差し出すことが、ページを見て回るのと同じくらい気軽に感じられるサイトでした。",
            ko: "구조 단체 웹사이트가 하는 일은 하나입니다. 선의를 고양이가 지낼 집으로 바꾸는 것. TinyPaws에 필요했던 것은 처음인 사람에게 입양 절차를 설명하고, 신중한 입양 희망자에게 고양이가 지나온 기록을 보여 주며, 시간이나 임시보호 공간이나 후원을 내놓는 일이 페이지를 둘러보는 것만큼 가볍게 느껴지는 사이트였습니다.",
          },
        },
        {
          type: "cta",
          label: {
            en: "Visit the live site",
            ja: "公開サイトを見る",
            ko: "라이브 사이트 보기",
          },
          demo: true,
          href: "https://jinontheclock.github.io/TinyPaws/",
        },
      ],
    },
    {
      id: "adopters",
      label: {
        en: "02 Understanding Adopters",
        ja: "02 里親を理解する",
        ko: "02 입양 희망자 이해하기",
      },
      blocks: [
        {
          type: "p",
          text: {
            en: "We surveyed and interviewed 14 cat owners across BC, then read that against BC SPCA statistics, adoption studies, and community forums.",
            ja: "BC州の猫の飼い主14人にアンケートとインタビューを行い、その内容をBC SPCAの統計、譲渡に関する研究、コミュニティのフォーラムと突き合わせて読みました。",
            ko: "BC주의 고양이 보호자 14명을 설문하고 인터뷰한 뒤, 그 내용을 BC SPCA 통계와 입양 관련 연구, 커뮤니티 포럼과 맞춰 읽었습니다.",
          },
        },
        { type: "h", text: {
            en: "Three key findings",
            ja: "わかったこと三つ",
            ko: "확인된 세 가지",
          } },
        {
          type: "list",
          items: [
            {
              en: "Unclear and lengthy adoption flows cause even highly motivated adopters to give up midway.",
              ja: "譲渡までの流れが分かりにくく長いと、意欲の高い里親希望者でも途中でやめてしまいます。",
              ko: "입양 절차가 불분명하고 길면, 의지가 강한 입양 희망자도 중간에 포기합니다.",
            },
            {
              en: "Upfront access to medical, behavioral, and vaccination records is the single biggest trust factor.",
              ja: "医療記録、性格の記録、ワクチン接種歴が最初から見られること。これが信頼を左右する最大の要因でした。",
              ko: "의료 기록과 성향 기록, 예방접종 이력을 처음부터 볼 수 있는지. 이것이 신뢰를 가르는 가장 큰 요인이었습니다.",
            },
            {
              en: "Ongoing support after adoption day is missing almost everywhere, which leaves first-time owners anxious.",
              ja: "譲渡された後の支援は、ほとんどの団体で用意されていません。初めて猫を迎える人はそこで不安を抱えます。",
              ko: "입양 이후의 지원은 거의 어디에도 없습니다. 처음 고양이를 맞는 사람은 그 지점에서 불안해집니다.",
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "We distilled these findings into two personas: Emily (an experienced multi-cat owner) and Alex (a first-time adopter who needs guidance).",
            ja: "この結果を二つのペルソナにまとめました。多頭飼いの経験があるEmilyと、初めてで案内を必要とするAlexです。",
            ko: "이 결과를 두 개의 페르소나로 정리했습니다. 여러 마리를 키워 본 Emily, 그리고 처음이라 안내가 필요한 Alex입니다.",
          },
        },
        {
          type: "figure",
          graphics: ["tinypaws-persona-emily", "tinypaws-persona-alex"],
          caption: {
            en: "Emily (experienced, multi-cat) and Alex (first-time): the two depths of need the site serves.",
            ja: "経験者で多頭飼いのEmilyと、初めてのAlex。このサイトが応える必要の、二つの深さです。",
            ko: "경험자이자 다묘 가정인 Emily, 그리고 처음인 Alex. 이 사이트가 감당해야 할 필요의 두 층위입니다.",
          },
        },
      ],
    },
    {
      id: "structure",
      label: {
        en: "03 Structuring the Site",
        ja: "03 サイトの構造をつくる",
        ko: "03 사이트 구조 잡기",
      },
      blocks: [
        {
          type: "p",
          text: {
            en: "The sitemap was built around the three things visitors actually come to do: adopt, get involved, give. Every page had to earn its place under one of those goals; content that served none of them was cut or folded in.",
            ja: "サイトマップは、訪問者が実際にしに来る三つのこと、つまり迎える、関わる、贈るを軸に組みました。どのページもこの三つのどれかの下で存在理由を示す必要があり、どれにも当てはまらない内容は削るか、別のページにまとめました。",
            ko: "사이트맵은 방문자가 실제로 하러 오는 세 가지, 즉 입양하고, 참여하고, 후원하는 일을 축으로 짰습니다. 모든 페이지는 이 셋 중 하나 아래에서 존재 이유를 증명해야 했고, 어디에도 해당하지 않는 내용은 덜어내거나 다른 페이지로 합쳤습니다.",
          },
        },
        {
          type: "figure",
          graphic: "tinypaws-fig-sitemap",
          caption: {
            en: "One map, three goals: the structure the whole site hangs on.",
            ja: "一枚の地図に、三つの目的。サイト全体がここに掛かっています。",
            ko: "지도 한 장에 목적 셋. 사이트 전체가 여기에 걸려 있습니다.",
          },
        },
        {
          type: "p",
          text: {
            en: "Low-fidelity wireframes tested that structure before any visual identity existed: hierarchy, navigation, and flows in gray boxes.",
            ja: "ビジュアルアイデンティティができる前に、ローファイのワイヤーフレームでこの構造を検証しました。階層、ナビゲーション、導線を、グレーの箱だけで確かめています。",
            ko: "비주얼 아이덴티티가 나오기 전에 로파이 와이어프레임으로 이 구조를 검증했습니다. 위계와 내비게이션, 흐름을 회색 상자만으로 확인했습니다.",
          },
        },
        {
          type: "figure",
          graphic: "tinypaws-fig-lofi-grid",
          title: {
            en: "Lo-fi wireframes",
            ja: "ローファイ・ワイヤーフレーム",
            ko: "로파이 와이어프레임",
          },
          caption: {
            en: "Structure first, personality later.",
            ja: "まず構造、性格はそのあとで。",
            ko: "구조가 먼저, 성격은 그다음.",
          },
        },
        {
          type: "h",
          text: {
            en: "The first test broke the structure, not the visuals",
            ja: "最初のテストで壊れたのは、見た目ではなく構造でした",
            ko: "첫 테스트에서 무너진 것은 비주얼이 아니라 구조였습니다",
          },
        },
        {
          type: "p",
          text: {
            en: "Task-based sessions with 14 participants surfaced structural failures no amount of styling would have fixed. All three fixes shipped into the next fidelity.",
            ja: "14人と行ったタスクベースのセッションで、どれだけ見た目を整えても直らない構造上の失敗が三つ見つかりました。三つとも次のフィデリティに反映しています。",
            ko: "14명과 진행한 과업 기반 세션에서, 아무리 스타일을 다듬어도 해결되지 않을 구조적 실패 세 가지가 드러났습니다. 세 건 모두 다음 단계에 반영했습니다.",
          },
        },
        {
          type: "figure",
          graphic: "tinypaws-ba-nav",
          caption: {
            en: "Menu labels read as interchangeable, so visitors landed on the wrong pages. Navigation was relabeled around the three goals.",
            ja: "メニューのラベルがどれも同じ意味に読めてしまい、訪問者は違うページにたどり着いていました。ナビゲーションを三つの目的に沿って付け直しました。",
            ko: "메뉴 라벨이 서로 구분되지 않아 방문자가 엉뚱한 페이지에 도착했습니다. 내비게이션을 세 가지 목적에 맞춰 다시 이름 붙였습니다.",
          },
        },
        {
          type: "p",
          text: {
            en: "Content-heavy pages overwhelmed at a glance. Sections were condensed into a consistent hierarchy visitors could scan in seconds.",
            ja: "情報量の多いページは、ひと目で圧倒されてしまいました。セクションをまとめ直し、数秒で見渡せる一貫した階層にしています。",
            ko: "정보량이 많은 페이지는 한눈에 부담을 줬습니다. 섹션을 정리해 몇 초 만에 훑을 수 있는 일관된 위계로 바꿨습니다.",
          },
        },
        {
          type: "figure",
          graphic: "tinypaws-ba-structure",
        },
        {
          type: "p",
          text: {
            en: "Buttons behaved inconsistently: some looked clickable but weren't, others hid where visitors couldn't find them. Every action became one clear, consistent orange control.",
            ja: "ボタンの挙動もそろっていませんでした。押せそうに見えて押せないものがあり、見つからない場所に隠れているものもありました。すべての操作を、はっきりした同じオレンジのコントロールに統一しました。",
            ko: "버튼 동작도 제각각이었습니다. 눌릴 것처럼 보이지만 눌리지 않는 것이 있었고, 찾을 수 없는 자리에 숨어 있는 것도 있었습니다. 모든 동작을 분명한 하나의 오렌지 컨트롤로 통일했습니다.",
          },
        },
        {
          type: "figure",
          graphic: "tinypaws-ba-cta",
        },
      ],
    },
    {
      id: "brand",
      label: {
        en: "04 Building the Brand",
        ja: "04 ブランドをつくる",
        ko: "04 브랜드 만들기",
      },
      blocks: [
        {
          type: "p",
          text: {
            en: "The brand had to balance emotional warmth with legibility and accessibility.",
            ja: "ブランドには、あたたかさと、読みやすさやアクセシビリティの両立が求められました。",
            ko: "브랜드는 따뜻한 인상과 가독성·접근성을 동시에 만족해야 했습니다.",
          },
        },
        { type: "h", text: {
            en: "Typography",
            ja: "タイポグラフィ",
            ko: "타이포그래피",
          } },
        {
          type: "list",
          items: [
            {
              en: "Fredoka (headings): rounded letterforms that keep the tone friendly.",
              ja: "Fredoka（見出し）。丸みのある字形で、やわらかい印象を保ちます。",
              ko: "Fredoka(제목). 둥근 자형으로 부드러운 인상을 유지합니다.",
            },
            {
              en: "Lexend (body): built for reading speed, which matters most in the long care guides.",
              ja: "Lexend（本文）。読む速さのために設計された書体で、長いケアガイドでいちばん効きます。",
              ko: "Lexend(본문). 읽는 속도를 위해 만들어진 서체로, 긴 케어 가이드에서 가장 크게 작동합니다.",
            },
          ],
        },
        { type: "h", text: {
            en: "Color & Contrast (WCAG 2.1 AA)",
            ja: "色とコントラスト（WCAG 2.1 AA）",
            ko: "색과 명도 대비 (WCAG 2.1 AA)",
          } },
        {
          type: "list",
          items: [
            {
              en: "The calico palette keeps the tone inviting without flattening the hierarchy.",
              ja: "三毛猫から取ったパレットは、親しみやすさを保ちながら階層をつぶしません。",
              ko: "삼색 고양이에서 가져온 팔레트는 친근한 인상을 유지하면서도 위계를 뭉개지 않습니다.",
            },
            {
              en: "Body text (#301800 on cream) reads at 15.7:1, well past AA. Primary CTAs use the brand orange (#DC6E00) for immediate recognition.",
              ja: "本文はクリーム地に#301800で、コントラスト比15.7:1。AAの基準を大きく上回ります。主要なCTAにはブランドカラーのオレンジ（#DC6E00）を使いました。",
              ko: "본문은 크림 배경에 #301800으로 대비 15.7:1이며, AA 기준을 크게 넘습니다. 주요 CTA에는 브랜드 오렌지(#DC6E00)를 썼습니다.",
            },
          ],
        },
        { type: "h", text: {
            en: "Iconography",
            ja: "アイコン",
            ko: "아이코노그래피",
          } },
        {
          type: "p",
          text: {
            en: "Custom micro-icons act as quick visual signposts for scanning.",
            ja: "自作のマイクロアイコンが、ページを見渡すときの目印になります。",
            ko: "직접 만든 마이크로 아이콘이 페이지를 훑을 때 이정표가 됩니다.",
          },
        },
        {
          type: "figure",
          graphic: "tinypaws-fig-styletile",
        },
        { type: "h", text: {
            en: "Beyond the screen",
            ja: "画面の外へ",
            ko: "화면 밖으로",
          } },
        {
          type: "p",
          text: {
            en: "A promotional video introduces the rescue in the same voice as the site: bright, warm, and honest about what adoption takes.",
            ja: "プロモーション映像も、サイトと同じ声で団体を紹介します。明るく、あたたかく、そして猫を迎えるのに何が要るかについては正直に。",
            ko: "홍보 영상도 사이트와 같은 목소리로 단체를 소개합니다. 밝고 따뜻하게, 그리고 입양에 무엇이 필요한지에 대해서는 정직하게.",
          },
        },
        {
          type: "figure",
          graphic: "tinypaws-campaign-video",
          title: {
            en: "The promotional film",
            ja: "プロモーション映像",
            ko: "홍보 영상",
          },
        },
      ],
    },
    {
      id: "experience",
      label: {
        en: "05 Designing the Experience",
        ja: "05 体験を設計する",
        ko: "05 경험 설계",
      },
      blocks: [
        {
          type: "solution",
          wide: true,
          title: {
            en: "A guided adoption journey",
            ja: "案内のある譲渡の道のり",
            ko: "안내가 있는 입양 여정",
          },
          paras: [
            {
              en: "A step-by-step process page shows exactly what happens between applying and bringing a cat home. A short match quiz narrows the gallery to cats that fit an adopter's home and habits. Browsing becomes matching, and the application form already knows which cat it's for.",
              ja: "手順を追ったプロセスページが、申し込みから猫を家に迎えるまでに何が起きるのかをそのまま示します。短いマッチングクイズは、その人の住まいや暮らし方に合う猫だけに一覧を絞り込みます。眺めるだけだった行為がマッチングになり、申込フォームはどの猫のためのものかを最初から知っています。",
              ko: "단계별 프로세스 페이지가 신청부터 고양이를 집에 데려오기까지 무슨 일이 일어나는지 그대로 보여 줍니다. 짧은 매칭 퀴즈는 그 사람의 집과 생활 방식에 맞는 고양이만 남기고 목록을 좁힙니다. 둘러보기만 하던 행위가 매칭이 되고, 신청서는 어떤 고양이를 위한 것인지 처음부터 알고 있습니다.",
            },
          ],
          media: [
            "tinypaws-shot-process",
            "tinypaws-shot-quiz",
            "tinypaws-shot-form",
          ],
          caption: {
            en: "Process, match quiz, application: one guided path.",
            ja: "プロセス、マッチングクイズ、申し込み。案内のある一本の道です。",
            ko: "프로세스, 매칭 퀴즈, 신청. 안내가 이어지는 하나의 길입니다.",
          },
        },
        {
          type: "solution",
          wide: true,
          title: {
            en: "Cat profiles that earn trust",
            ja: "信頼を得る猫のプロフィール",
            ko: "신뢰를 얻는 고양이 프로필",
          },
          paras: [
            {
              en: "Every profile leads with the facts adopters asked for: vaccination and spay-neuter status, medical notes, temperament, and the cat's own story. Adopters trust what they can check, so the records come first.",
              ja: "どのプロフィールも、里親希望者が知りたいと答えた事実から始まります。ワクチンと避妊去勢の状況、医療上の記録、性格、そしてその猫がたどってきた話です。人は自分で確かめられるものを信じるので、記録を先に置きました。",
              ko: "모든 프로필은 입양 희망자가 알고 싶다고 답한 사실부터 시작합니다. 예방접종과 중성화 여부, 의료 기록, 성향, 그리고 그 고양이가 지나온 이야기입니다. 사람은 스스로 확인할 수 있는 것을 믿기에 기록을 앞에 두었습니다.",
            },
          ],
          media: [
            "tinypaws-shot-adopt",
            "tinypaws-shot-profile",
            "tinypaws-shot-profile-medical",
          ],
          caption: {
            en: "The gallery and profile, with the records above the photos.",
            ja: "一覧とプロフィール。写真より上に記録があります。",
            ko: "목록과 프로필. 사진보다 위에 기록이 옵니다.",
          },
        },
        {
          type: "solution",
          wide: true,
          title: {
            en: "Support that doesn't end at adoption",
            ja: "譲渡で終わらない支え",
            ko: "입양으로 끝나지 않는 지원",
          },
          paras: [
            {
              en: "Foster, volunteer, donate, and events live under one Get Involved roof, and adopters leave with resources: cost guides, behavior help, and what to expect in the first weeks. Support does not stop on adoption day.",
              ja: "一時預かり、ボランティア、寄付、イベントは、Get Involvedというひとつの屋根の下にまとめました。猫を迎えた人は、費用の目安、行動の相談先、最初の数週間に起きることをまとめた資料を持って帰ります。支えは譲渡の日で止まりません。",
              ko: "임시보호와 자원봉사, 후원, 행사를 Get Involved라는 하나의 지붕 아래 모았습니다. 고양이를 데려간 사람은 비용 안내와 행동 문제 도움말, 첫 몇 주에 겪을 일을 정리한 자료를 함께 가져갑니다. 지원은 입양하는 날에 멈추지 않습니다.",
            },
          ],
          media: [
            "tinypaws-shot-involve",
            "tinypaws-shot-events",
            "tinypaws-shot-home",
          ],
          caption: {
            en: "Get involved, events, and the home page that ties the journey together.",
            ja: "Get Involved、イベント、そして全体をつなぐホーム。",
            ko: "Get Involved, 행사, 그리고 전체를 잇는 홈 화면.",
          },
        },
        { type: "h", text: {
            en: "The second test caught what the polish hid",
            ja: "二回目のテストは、仕上げが隠していたものを見つけました",
            ko: "두 번째 테스트는 마감이 가리고 있던 것을 잡아냈습니다",
          } },
        {
          type: "p",
          text: {
            en: "With the visual system in place, a second round of testing, again with 14 participants, caught the failures of detail: uneven image sizes and hard-to-read text on pages like Events and Resources. Images were scaled to one consistent size, copy was cleaned up for readability, and a few confusing page labels were reworded.",
            ja: "ビジュアルの仕組みが入った状態で、もう一度14人とテストを行いました。今度出てきたのは細部の失敗です。EventsやResourcesのようなページで画像のサイズがそろっておらず、文字も読みにくいままでした。画像は同じサイズにそろえ、文章は読みやすさを見て整え、分かりにくかったページ名をいくつか付け直しました。",
            ko: "비주얼 시스템이 들어간 상태에서 14명과 다시 테스트했습니다. 이번에 드러난 것은 디테일의 실패였습니다. Events나 Resources 같은 페이지에서 이미지 크기가 제각각이었고 글자도 읽기 어려웠습니다. 이미지는 같은 크기로 맞추고, 문장은 가독성을 기준으로 다듬고, 헷갈리던 페이지 이름 몇 개를 다시 붙였습니다.",
          },
        },
      ],
    },
    {
      id: "shipping",
      label: {
        en: "06 Shipping It Myself",
        ja: "06 自分の手でリリースする",
        ko: "06 직접 만들어 배포하기",
      },
      blocks: [
        {
          type: "p",
          text: {
            en: "I built the site in code myself with Astro: semantic HTML, design-token CSS, and just enough JavaScript, with no CMS behind it. A rescue site is mostly content: cats, events and care guides. That made a static build the honest choice, fast and cheap to run, with a design system as the site's single source of truth.",
            ja: "サイトはAstroを使って自分でコードを書きました。セマンティックなHTML、デザイントークンで組んだCSS、必要なぶんだけのJavaScript。CMSは置いていません。保護団体のサイトの中身は、ほとんどがコンテンツです。猫、イベント、ケアガイド。だとすれば静的なビルドが正直な選び方でした。速く、運用費が安く、そしてサイトの単一の情報源となるデザインシステムから組み上がります。",
            ko: "사이트는 Astro로 직접 코드를 썼습니다. 시맨틱 HTML, 디자인 토큰으로 짠 CSS, 딱 필요한 만큼의 JavaScript. CMS는 두지 않았습니다. 구조 단체 사이트의 내용은 대부분 콘텐츠입니다. 고양이, 행사, 케어 가이드. 그렇다면 정적 빌드가 정직한 선택이었습니다. 빠르고, 운영비가 적게 들고, 사이트의 단일 기준이 되는 디자인 시스템에서 만들어집니다.",
          },
        },
        { type: "h", text: {
            en: "The style tile became a stylesheet",
            ja: "スタイルタイルが、そのままスタイルシートになった",
            ko: "스타일 타일이 그대로 스타일시트가 되었습니다",
          } },
        {
          type: "p",
          text: {
            en: "Every color, type size, and radius from the style tile lives in one tokens file the whole site reads from, so the styling comes out of the brand definition instead of being layered on afterwards. That's also where the design got tested: orange on cream measured 2.85:1, under the AA line, so body-size orange became a darkened #A65300 (4.6:1) and orange buttons carry dark-brown labels instead of white. The palette only proved itself once it was measured in code.",
            ja: "スタイルタイルにあった色、文字サイズ、角丸は、サイト全体が参照する一つのトークンファイルに入っています。見た目はブランドの定義から出てくるので、あとから重ねる作業になりません。設計が検証されたのもここでした。クリーム地のオレンジは2.85:1で、AAの線を下回っていました。そこで本文サイズのオレンジは暗くした#A65300（4.6:1）に変え、オレンジのボタンの文字は白ではなく濃い茶色にしています。パレットが確かだと分かったのは、コードの上で測ってからでした。",
            ko: "스타일 타일에 있던 색과 글자 크기, 라운드 값은 사이트 전체가 참조하는 하나의 토큰 파일에 들어 있습니다. 스타일이 브랜드 정의에서 나오기 때문에, 나중에 덧입히는 작업이 되지 않습니다. 설계가 검증된 것도 여기였습니다. 크림 배경 위의 오렌지는 2.85:1로 AA 기준에 못 미쳤습니다. 그래서 본문 크기의 오렌지는 어둡게 조정한 #A65300(4.6:1)으로 바꿨고, 오렌지 버튼의 글자는 흰색 대신 짙은 갈색을 씁니다. 팔레트가 괜찮다는 것은 코드 위에서 재 보고 나서야 확인됐습니다.",
          },
        },
        {
          type: "figure",
          graphic: "tinypaws-fig-tokens",
          caption: {
            en: "One sheet, one file: the style tile and the tokens.css it became.",
            ja: "一枚のシートと、一つのファイル。スタイルタイルと、そこから生まれたtokens.cssです。",
            ko: "시트 한 장과 파일 하나. 스타일 타일과 거기서 나온 tokens.css입니다.",
          },
        },
        { type: "h", text: {
            en: "Content as data, matching as logic",
            ja: "コンテンツはデータ、マッチングはロジック",
            ko: "콘텐츠는 데이터로, 매칭은 로직으로",
          } },
        {
          type: "p",
          text: {
            en: "Each cat is a content entry (story, temperament, medical record, adoption status) rendered into cards, profiles, and the match quiz from a single source. Add a cat, and the whole site already knows.",
            ja: "猫一匹ぶんが、一つのコンテンツのまとまりです（話、性格、医療記録、譲渡の状況）。同じ一つの元データから、カードにも、プロフィールにも、マッチングクイズにも展開されます。猫を一匹足せば、サイト全体がもう知っています。",
            ko: "고양이 한 마리가 하나의 콘텐츠 항목입니다(이야기, 성향, 의료 기록, 입양 상태). 같은 원본 하나에서 카드로도, 프로필로도, 매칭 퀴즈로도 펼쳐집니다. 고양이를 한 마리 추가하면 사이트 전체가 이미 알고 있습니다.",
          },
        },
        {
          type: "figure",
          graphic: "tinypaws-fig-content-model",
          caption: {
            en: "One cat entry, three surfaces: the same record becomes a card, a full profile, and a quiz match.",
            ja: "一匹ぶんの記録が、三つの面になります。カード、詳しいプロフィール、そしてクイズの結果です。",
            ko: "한 마리의 기록이 세 개의 면이 됩니다. 카드, 상세 프로필, 그리고 퀴즈 결과입니다.",
          },
        },
        { type: "h", text: {
            en: "Honest by construction",
            ja: "つくりからして正直に",
            ko: "만들어진 방식부터 정직하게",
          } },
        {
          type: "p",
          text: {
            en: "Nothing on the site pretends to do more than it does. Forms validate and confirm success without sending anything, and say so. The match quiz is plain additive scoring over the cats' own records, and it is labeled a quiz rather than \"AI\". Donations and the gift shop run their full flows but stay labeled a demo, so no card details are asked for and nothing is charged. The pieces left out of scope, a forum and member logins, simply do not exist, so there are no dead ends.",
            ja: "このサイトには、実際にできること以上に見せかけている部分がありません。フォームは入力チェックと完了表示までしますが、送信は行わず、その旨も画面に書いてあります。マッチングクイズは猫自身の記録に点数を足していくだけの仕組みで、「AI」ではなくクイズとして表示しています。寄付とギフトショップは最後まで流れを通せますが、デモと明記してあるのでカード情報は聞かず、請求も発生しません。スコープから外したフォーラムと会員ログインは、そもそも置いていません。だから行き止まりもありません。",
            ko: "이 사이트에는 실제로 할 수 있는 것 이상으로 보이려는 부분이 없습니다. 폼은 입력 검증과 완료 표시까지 하지만 실제로 전송하지 않고, 그 사실을 화면에 적어 두었습니다. 매칭 퀴즈는 고양이 자신의 기록에 점수를 더해 가는 방식일 뿐이고, 'AI'가 아니라 퀴즈라고 표시했습니다. 후원과 기프트숍은 흐름을 끝까지 통과할 수 있지만 데모라고 명시했기 때문에 카드 정보를 묻지 않고 결제도 일어나지 않습니다. 범위에서 뺀 포럼과 회원 로그인은 아예 두지 않았습니다. 그래서 막다른 길도 없습니다.",
          },
        },
        {
          type: "stats",
          items: [
            {
              value: "Lighthouse 100",
              label: {
                en: "across performance, accessibility, best practices, and SEO",
                ja: "パフォーマンス、アクセシビリティ、ベストプラクティス、SEOの全項目で",
                ko: "성능, 접근성, 권장사항, SEO 전 항목에서",
              },
            },
            {
              value: "WCAG AA",
              label: {
                en: "contrast throughout, fully responsive and keyboard-navigable",
                ja: "全体でコントラストを確保。レスポンシブ対応で、キーボードだけでも操作できます",
                ko: "전체에서 명도 대비 확보. 반응형이며 키보드만으로도 조작할 수 있습니다",
              },
            },
            {
              value: {
                en: "Two rounds",
                ja: "2ラウンド",
                ko: "2회",
              },
              label: {
                en: "of usability testing: structure first, then detail",
                ja: "のユーザビリティテスト。まず構造、次に細部",
                ko: "의 사용성 테스트. 먼저 구조, 다음에 디테일",
              },
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "Scoped to one Vancouver rescue, but the structure would carry to any volunteer-run shelter.",
            ja: "範囲はバンクーバーの一団体に絞りましたが、この構造はボランティア運営のシェルターであれば持っていけます。",
            ko: "범위는 밴쿠버의 한 단체로 한정했지만, 이 구조는 자원봉사로 운영되는 보호소라면 그대로 가져갈 수 있습니다.",
          },
        },
        {
          type: "cta",
          label: {
            en: "Visit the live site",
            ja: "公開サイトを見る",
            ko: "라이브 사이트 보기",
          },
          demo: true,
          href: "https://jinontheclock.github.io/TinyPaws/",
        },
      ],
    },
    {
      id: "reflection",
      label: {
        en: "07 Reflection",
        ja: "07 振り返り",
        ko: "07 회고",
      },
      blocks: [
        { type: "h", text: {
            en: "Two tests, two different failures",
            ja: "二度のテストで、違う種類の失敗が出た",
            ko: "두 번의 테스트, 서로 다른 종류의 실패",
          } },
        {
          type: "p",
          text: {
            en: "Low fidelity broke where the structure was wrong; high fidelity broke where the details lied. Neither round would have caught the other's problems, so the order mattered as much as the testing.",
            ja: "ローファイでは構造が間違っているところが壊れ、ハイファイでは細部が嘘をついているところが壊れました。どちらのラウンドも、もう片方の問題は見つけられません。テストしたこと自体と同じくらい、順番が効いていました。",
            ko: "로파이에서는 구조가 잘못된 지점이 무너졌고, 하이파이에서는 디테일이 거짓말하는 지점이 무너졌습니다. 어느 라운드도 다른 쪽의 문제는 잡아내지 못합니다. 테스트했다는 사실만큼이나 순서가 중요했습니다.",
          },
        },
        { type: "h", text: {
            en: "With more time",
            ja: "時間がもっとあれば",
            ko: "시간이 더 있었다면",
          } },
        {
          type: "p",
          text: {
            en: "I would run the site against a real rescue's live data (real cats, changing statuses, volunteer editors) and test whether the structure holds when the content isn't curated.",
            ja: "実際の団体の運用データでこのサイトを動かしてみたいです。本物の猫、変わり続ける譲渡状況、複数のボランティアによる更新。整えられていないコンテンツが入ってきたときに、この構造がもつのかを確かめたいです。",
            ko: "실제 단체의 운영 데이터로 이 사이트를 돌려 보고 싶습니다. 진짜 고양이, 계속 바뀌는 입양 상태, 여러 자원봉사자의 업데이트. 정돈되지 않은 콘텐츠가 들어왔을 때 이 구조가 버티는지 확인하고 싶습니다.",
          },
        },
      ],
    },
  ],
};
