import cardPoster from "../../assets/compass/compass-card-poster.webp";

/* Compass Card — 8 chapters, 90 blocks. Structure and copy are final;
   every figure and solution screen is a labelled placeholder until the
   artwork lands (see CompassPlaceholders.jsx). */
const COMPASS_SECTIONS = [
  {
    id: "context",
    label: { en: "01 Context", ja: "01 背景", ko: "01 배경" },
    blocks: [
      {
        type: "p",
        text: {
          en: "TransLink runs the transit system for Metro Vancouver: buses, SkyTrain, SeaBus and the West Coast Express. In 2025 it carried 237.6 million passenger journeys across 396.3 million boardings. That was 1.4% down on the year before: the first annual decline since the post-pandemic recovery began.",
          ja: "TransLinkはメトロバンクーバーの公共交通を運営しています。バス、SkyTrain、SeaBus、West Coast Expressです。2025年の輸送人員は2億3,760万人、乗車回数は3億9,630万回でした。前年から1.4%の減少で、パンデミック後の回復が始まって以降では初めての年間減少です。",
          ko: "TransLink는 메트로밴쿠버의 대중교통을 운영합니다. 버스, SkyTrain, SeaBus, West Coast Express입니다. 2025년 수송 인원은 2억 3,760만 명, 승차 건수는 3억 9,630만 건이었습니다. 전년보다 1.4% 줄어든 수치이고, 팬데믹 이후 회복이 시작된 뒤로는 첫 연간 감소입니다.",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-timeline",
        caption: {
          en: "Eight years of contactless payment, and a system replacement that lands in 2031.",
          ja: "タッチ決済の8年と、2031年に到達するシステム刷新。",
          ko: "비접촉 결제 8년, 그리고 2031년에 도착하는 시스템 교체.",
        },
      },
      {
        type: "p",
        text: {
          en: "Contactless payment is not new here. TransLink switched it on across the whole system on 22 May 2018, the first agency in Canada to take contactless credit cards; Interac Debit followed systemwide in January 2023, another Canadian first. Tap-to-pay has grown every year since, from over 10 million taps in 2019 to more than 25 million in 2025.",
          ja: "タッチ決済そのものは、ここでは新しいものではありません。TransLinkは2018年5月22日に全システムでこれを開始し、タッチ決済のクレジットカードを受け入れたカナダ初の交通事業者になりました。Interac Debitの全線対応は2023年1月で、これもカナダで初めてでした。以来タッチ決済は毎年伸び、2019年に1,000万回を超えていたタッチは、2025年には2,500万回を超えました。",
          ko: "비접촉 결제 자체는 여기서 새로운 것이 아닙니다. TransLink는 2018년 5월 22일 전 시스템에 이 결제를 열었고, 비접촉 신용카드를 받은 캐나다 최초의 운영 기관이었습니다. Interac Debit의 전 구간 도입은 2023년 1월로, 이것도 캐나다 최초였습니다. 이후 비접촉 결제는 매년 늘어, 2019년 1,000만 건이 넘던 태그가 2025년에는 2,500만 건을 넘었습니다.",
        },
      },
      {
        type: "p",
        text: {
          en: "And the system underneath is being replaced. Compass Modernization went to tender with a preliminary budget of $507 million, bids closed on 20 March 2026, and delivery is scheduled for late 2030 into early 2031. The RFP asks for something specific: an account-based system handling both closed-loop and open-loop fares.",
          ja: "そして、その下にあるシステムは置き換えの最中です。Compass Modernizationは予備予算5億700万カナダドルで入札にかけられ、入札は2026年3月20日に締め切られ、納入は2030年末から2031年初めに予定されています。RFPが求めているものは具体的です。クローズドループとオープンループの運賃を両方さばく、アカウントベースのシステムです。",
          ko: "그리고 그 아래에 있는 시스템은 교체되는 중입니다. Compass Modernization은 예비 예산 5억 700만 캐나다달러로 입찰에 부쳐졌고, 입찰은 2026년 3월 20일에 마감됐으며, 납품은 2030년 말에서 2031년 초로 잡혀 있습니다. RFP가 요구하는 것은 구체적입니다. 폐쇄형 요금과 개방형 요금을 모두 처리하는 계정 기반 시스템입니다.",
        },
      },
      {
        type: "quote",
        text: {
          en: "From customer feedback, we're exploring options such as digital Compass Cards, a TransLink mobile payment app, and incentives and rewards for using transit.",
          ja: "お客様のご意見をふまえ、デジタルCompassカード、TransLinkのモバイル決済アプリ、公共交通の利用に対する特典やリワードといった選択肢を検討しています。",
          ko: "고객 의견을 바탕으로, 디지털 Compass 카드, TransLink 모바일 결제 앱, 그리고 대중교통 이용에 대한 혜택과 보상 같은 방안을 검토하고 있습니다.",
        },
        cite: "TransLink, Customer Experience Action Plan 2026–2030",
      },
      {
        type: "p",
        text: {
          en: "So Apple Pay already works, and the system it runs on has already been put out to tender. Which leaves the question this project is about: what is actually missing, and why is now the moment to design it?",
          ja: "つまりApple Payはすでに動いていて、その土台となるシステムもすでに入札にかけられています。残るのは、このプロジェクトが扱う問いだけです。実際に欠けているものは何か、そしてなぜ、いまがそれを設計する時なのか。",
          ko: "그러니까 Apple Pay는 이미 되고, 그것이 올라탈 시스템도 이미 입찰에 부쳐졌습니다. 그렇다면 이 프로젝트가 다루는 질문만 남습니다. 실제로 빠져 있는 것은 무엇이고, 왜 지금이 그것을 설계할 시점인가.",
        },
      },
    ],
  },
  {
    id: "surfaces",
    label: {
      en: "02 Three Products, No Phone",
      ja: "02 三つのプロダクト、不在のスマホ",
      ko: "02 세 개의 제품, 빠진 폰",
    },
    blocks: [
      {
        type: "p",
        text: {
          en: "Compass today is three products: a card in your pocket, a website you sign in to, and a machine in the station. Every rider moves between all three, and each one holds a different part of the job, while the phone in that same pocket holds none of it.",
          ja: "現在のCompassは三つのプロダクトです。ポケットの中のカード、サインインして使うウェブサイト、そして駅にある機械。利用者はこの三つの間を行き来し、それぞれが仕事の別々の部分を抱えています。同じポケットに入っているスマートフォンだけが、何も抱えていません。",
          ko: "오늘의 Compass는 세 개의 제품입니다. 주머니 속 카드, 로그인해서 쓰는 웹사이트, 그리고 역에 있는 기계. 승객은 이 셋 사이를 오가고, 각각은 일의 서로 다른 부분을 쥐고 있습니다. 같은 주머니 안에 있는 폰만 아무것도 쥐고 있지 않습니다.",
        },
      },
      {
        type: "p",
        text: {
          en: "Who is this for? Everyone the three surfaces already serve: commuters on stored value, the students who renew a U-Pass by hand each month, the concession riders who cannot buy their card from a machine, and visitors who arrive with a phone and no card. No interviews sit behind this project, and I found no published breakdown of riders by segment, so there is no segment chart here. Where a number exists this case study uses it; where it does not, nothing is invented.",
          ja: "誰のためのものか。三つの接点がすでに相手にしているすべての人です。チャージ残高で通う通勤者、毎月手作業でU-Passを更新する学生、券売機で自分のカードを買えない割引資格の利用者、そしてカードを持たずスマートフォンだけで到着する訪問者。このプロジェクトの背後にインタビューはなく、利用者をセグメント別に分けた公開資料も見つかりませんでした。だからここにセグメントのチャートはありません。数字があるところではその数字を使い、ないところでは何も作っていません。",
          ko: "누구를 위한 것인가. 이미 세 접점이 상대하고 있는 모든 사람입니다. 충전 잔액으로 다니는 통근자, 매달 손으로 U-Pass를 갱신하는 학생, 무인 발매기에서 자기 카드를 살 수 없는 할인 대상 승객, 그리고 카드 없이 폰만 들고 도착한 방문객. 이 프로젝트 뒤에 인터뷰는 없고, 승객을 세그먼트로 나눈 공개 자료도 찾지 못했습니다. 그래서 여기에 세그먼트 차트는 없습니다. 숫자가 있는 곳에서는 그 숫자를 쓰고, 없는 곳에서는 아무것도 지어내지 않았습니다.",
        },
      },
      {
        type: "h",
        text: { en: "The card", ja: "カード", ko: "카드" },
        tag: { en: "Surface 01", ja: "接点 01", ko: "접점 01" },
      },
      {
        type: "p",
        text: {
          en: "The card costs a $6 refundable deposit and never expires. It is also the only way to pay a discounted fare: from 1 July 2026 a one-zone trip is $2.85 on stored value against $3.50 in cash or on a contactless bank card: a gap of $0.65, rising to $0.90 across two zones and $1.30 across three. TransLink's own fare page puts it plainly: for a discounted fare, use a Compass Card. And if you tap a wallet that also holds a bank card, the reader may take the wrong one, so the standing guidance is to tap only your Compass Card.",
          ja: "カードには返金される6ドルのデポジットがかかり、有効期限はありません。割引運賃で乗れる唯一の手段でもあります。2026年7月1日から、1ゾーンの乗車はチャージ残高なら2.85ドル、現金またはクレジットカードのタッチ決済なら3.50ドルです。差は0.65ドル、2ゾーンで0.90ドル、3ゾーンでは1.30ドルまで広がります。TransLinkの運賃ページ自体がはっきり書いています。割引運賃で乗りたいならCompassカードを使うこと、と。そして、クレジットカードも一緒に入った財布ごとかざすと、リーダーが違うカードを読んでしまうことがあるため、案内は常にCompassカードだけをタッチすること、となっています。",
          ko: "카드는 환급되는 6달러 보증금이 들고, 유효기간이 없습니다. 할인 요금을 내는 유일한 방법이기도 합니다. 2026년 7월 1일부터 1존 구간은 충전 잔액으로 2.85달러, 현금이나 비접촉 신용·체크카드로는 3.50달러입니다. 0.65달러 차이이고, 2존에서는 0.90달러, 3존에서는 1.30달러까지 벌어집니다. TransLink의 요금 안내 페이지 자체가 분명하게 적어 두었습니다. 할인 요금을 원하면 Compass 카드를 쓰라고. 그리고 신용카드가 같이 든 지갑째로 태그하면 리더기가 엉뚱한 카드를 집을 수 있어서, 안내는 늘 Compass 카드만 태그하라는 쪽입니다.",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-card",
        caption: {
          en: "The card, front and back: the fare gap that keeps it in every pocket, and the two numbers that link it to your account.",
          ja: "カードの表と裏。このカードをすべてのポケットに残している運賃差と、カードをアカウントに結びつける二つの番号。",
          ko: "카드의 앞뒷면. 이 카드를 모두의 주머니에 남겨 두는 요금 차이, 그리고 카드를 계정에 연결하는 두 개의 번호.",
        },
      },
      {
        type: "h",
        text: { en: "The website", ja: "ウェブサイト", ko: "웹사이트" },
        tag: { en: "Surface 02", ja: "接点 02", ko: "접점 02" },
      },
      {
        type: "p",
        text: {
          en: "Everything you might want to know or change about that card lives at compasscard.ca: balance, reload, passes, autoload, card transfer, lost-card replacement. None of it happens where the card is: every change means a browser and a sign-in, and a reload made online or over the phone still takes up to two hours to reach the card. Replacing a Program pass card costs $25.",
          ja: "そのカードについて知りたいこと、変えたいことは、すべてcompasscard.caにあります。残高、チャージ、定期券、オートチャージ、カードの移行、紛失カードの再発行。そのどれも、カードがある場所では起きません。何かを変えるたびにブラウザとサインインが必要で、オンラインや電話でのチャージがカードに届くまでには、いまも最大2時間かかります。Programの定期券カードを再発行すると25ドルかかります。",
          ko: "그 카드에 대해 알고 싶거나 바꾸고 싶은 것은 전부 compasscard.ca에 있습니다. 잔액, 충전, 정기권, 자동 충전, 카드 이전, 분실 카드 재발급. 그중 어느 것도 카드가 있는 자리에서 일어나지 않습니다. 무언가를 바꾸려면 매번 브라우저와 로그인이 필요하고, 온라인이나 전화로 한 충전이 카드에 닿는 데는 여전히 최대 두 시간이 걸립니다. Program 정기권 카드를 재발급하면 25달러가 듭니다.",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-website",
        caption: {
          en: "compasscard.ca, annotated. Every task the card cannot do by itself sits behind this sign-in.",
          ja: "注釈をつけたcompasscard.ca。カード単体ではできないすべての作業が、このサインインの先にある。",
          ko: "주석을 단 compasscard.ca. 카드 혼자서는 못 하는 모든 작업이 이 로그인 뒤에 있다.",
        },
      },
      {
        type: "h",
        text: { en: "The vending machine", ja: "券売機", ko: "무인 발매기" },
        tag: { en: "Surface 03", ja: "接点 03", ko: "접점 03" },
      },
      {
        type: "p",
        text: {
          en: "The machines in stations sell cards and take reloads instantly. But they cannot sell a concession card. The discounted card for seniors, youth and HandyCard holders is not available from a vending machine at all. The riders who most need the lower fare are the ones who cannot buy the card where everyone else buys it.",
          ja: "駅にある機械はカードを売り、チャージを即座に反映します。ただし割引カードは売れません。高齢者、青少年、HandyCard所持者向けの割引カードは、券売機ではそもそも購入できません。低い運賃を最も必要としている利用者が、ほかの誰もが買う場所ではカードを買えない人たちなのです。",
          ko: "역에 있는 기계는 카드를 팔고, 충전을 즉시 반영합니다. 다만 할인 카드는 팔지 못합니다. 어르신, 청소년, HandyCard 소지자를 위한 할인 카드는 무인 발매기에서 아예 살 수 없습니다. 낮은 요금이 가장 필요한 승객이, 다른 사람들이 다 사는 그 자리에서는 카드를 살 수 없는 사람들입니다.",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-cvm",
        caption: {
          en: "A Compass Vending Machine. Instant reloads, and no concession card.",
          ja: "Compassの券売機。即時反映のチャージと、売られていない割引カード。",
          ko: "Compass 무인 발매기. 즉시 반영되는 충전, 그리고 팔지 않는 할인 카드.",
        },
      },
      {
        type: "h",
        text: {
          en: "Five ways to check one number",
          ja: "一つの数字を確かめる五つの方法",
          ko: "숫자 하나를 확인하는 다섯 가지 방법",
        },
      },
      {
        type: "p",
        text: {
          en: "There are five ways to find out how much is on a Compass Card: tap it on a reader, sign in to compasscard.ca, use a vending machine, call the service line, or visit a service center. There is no sixth. And for the roughly 140,000 students a month on a U-Pass BC, the routine is heavier still: request the pass by hand from the 16th of each month, type a 20-digit card number and a 3-digit verification number, then wait up to 24 hours for it to activate. There is no autoload, and no refund if you forget.",
          ja: "Compassカードにいくら残っているかを確かめる方法は五つあります。リーダーにタッチする、compasscard.caにサインインする、券売機を使う、サービスラインに電話する、サービスセンターの窓口に行く。六つ目はありません。そして、毎月U-Pass BCを使うおよそ14万人の学生には、手順がさらに重くなります。毎月16日から自分で定期券を申請し、20桁のカード番号と3桁の確認番号を入力し、有効になるまで最大24時間待ちます。オートチャージはなく、忘れた場合の払い戻しもありません。",
          ko: "Compass 카드에 얼마가 남았는지 확인하는 방법은 다섯 가지입니다. 리더기에 태그하기, compasscard.ca에 로그인하기, 무인 발매기 이용하기, 고객센터에 전화하기, 고객센터 창구를 찾아가기. 여섯 번째는 없습니다. 그리고 매달 U-Pass BC를 쓰는 약 14만 명의 학생에게는 절차가 더 무겁습니다. 매달 16일부터 직접 정기권을 신청하고, 20자리 카드 번호와 3자리 확인 번호를 입력한 뒤, 활성화까지 최대 24시간을 기다립니다. 자동 충전은 없고, 잊어버렸을 때의 환불도 없습니다.",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-balance-paths",
        caption: {
          en: "Five paths to one number, and the one that doesn't exist.",
          ja: "一つの数字に至る五つの経路と、存在しないもう一つ。",
          ko: "숫자 하나에 이르는 다섯 갈래 길, 그리고 존재하지 않는 하나.",
        },
      },
    ],
  },
  {
    id: "architecture",
    label: {
      en: "03 Card-Based by Design",
      ja: "03 カードベースという設計",
      ko: "03 카드 기반이라는 설계",
    },
    blocks: [
      {
        type: "p",
        text: {
          en: "The architecture is what rules an app out.",
          ja: "アプリを不可能にしているのは、アーキテクチャそのものです。",
          ko: "앱을 불가능하게 만드는 것은 아키텍처 자체입니다.",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-system",
        caption: {
          en: "Where the money sits. On a card-based system the balance lives in the chip; on an account-based one it lives on a server.",
          ja: "お金が置かれる場所。カードベースのシステムでは残高はチップの中にあり、アカウントベースではサーバーにある。",
          ko: "돈이 놓이는 자리. 카드 기반 시스템에서는 잔액이 칩 안에 있고, 계정 기반에서는 서버에 있다.",
        },
      },
      {
        type: "p",
        text: {
          en: "On a card-based system the balance lives in the chip in your hand. The card is the record. That makes the tap fast and tolerant of a dead network (a reader on a bus does not need to reach a server to charge you), but it also means nothing can change the balance until the card physically meets a reader. It is why a reload takes two hours to land. It is also why there is no app: an app could only ever show a copy of a number it cannot reach.",
          ja: "カードベースのシステムでは、残高は手の中のチップにあります。カードそのものが記録です。おかげでタッチは速く、ネットワークが落ちても耐えます。バスのリーダーは、運賃を引くためにサーバーまで届く必要がありません。その代わり、カードが物理的にリーダーと出会うまでは、何も残高を変えられないということでもあります。チャージが反映されるのに2時間かかる理由が、これです。アプリがない理由も、これです。アプリは、届かない数字の写しを見せること以上のことができません。",
          ko: "카드 기반 시스템에서 잔액은 손에 든 칩 안에 있습니다. 카드가 곧 기록입니다. 덕분에 태그는 빠르고 네트워크가 끊겨도 견딥니다. 버스 안의 리더기는 요금을 물리려고 서버까지 갈 필요가 없습니다. 대신 카드가 물리적으로 리더기를 만나기 전까지는 무엇도 잔액을 바꿀 수 없다는 뜻이기도 합니다. 충전이 반영되는 데 두 시간이 걸리는 이유가 이것입니다. 앱이 없는 이유도 이것입니다. 앱은 닿을 수 없는 숫자의 사본을 보여주는 것 이상을 할 수 없습니다.",
        },
      },
      {
        type: "quote",
        text: {
          en: "We're not going to have a Compass app anytime soon.",
          ja: "近いうちにCompassのアプリが出ることはありません。",
          ko: "가까운 시일 안에 Compass 앱이 나오는 일은 없습니다.",
        },
        cite: {
          en: "Kevin Desmond, then CEO of TransLink, 30 December 2019",
          ja: "Kevin Desmond、当時のTransLink CEO、2019年12月30日",
          ko: "Kevin Desmond, 당시 TransLink CEO, 2019년 12월 30일",
        },
      },
      {
        type: "h",
        text: {
          en: "The agency's own admission",
          ja: "交通事業者自身が認めたこと",
          ko: "운영 기관이 스스로 인정한 것",
        },
      },
      {
        type: "p",
        text: {
          en: "That was 2019. The Compass Modernization RFP that closed in March 2026 asks for exactly the architecture this chapter has been describing: account-based, closed-loop and open-loop alike. Read plainly, that is the agency writing down that the current architecture is the constraint, and buying its way out of it.",
          ja: "2019年の話です。2026年3月に締め切られたCompass ModernizationのRFPは、この章が説明してきたまさにそのアーキテクチャを求めています。アカウントベースで、クローズドループもオープンループも。素直に読めば、これは交通事業者が、いまのアーキテクチャこそが制約だと文書に書き、その外へ出るために予算を投じている、ということです。",
          ko: "2019년의 이야기입니다. 2026년 3월에 마감된 Compass Modernization RFP는 이 장이 설명해 온 바로 그 아키텍처를 요구합니다. 계정 기반, 폐쇄형과 개방형 모두. 그대로 읽으면, 운영 기관이 지금의 아키텍처가 제약이라는 것을 문서로 적어 두고, 돈을 들여 거기서 빠져나오는 중이라는 뜻입니다.",
        },
      },
      {
        type: "p",
        text: {
          en: "So this project designs for what becomes possible once that limitation is gone.",
          ja: "だからこのプロジェクトは、その制約がなくなった後に可能になるものを設計します。",
          ko: "그래서 이 프로젝트는 그 제약이 사라진 다음에 가능해지는 것을 설계합니다.",
        },
      },
    ],
  },
  {
    /* ids are internal keys (DOM anchors, TOC keys, the scroll spy) and
       must not vary by language — only labels localize */
    id: "scope",
    label: {
      en: "04 Scope & Bets",
      ja: "04 スコープと賭け",
      ko: "04 범위와 승부수",
    },
    blocks: [
      {
        type: "p",
        text: {
          en: "This app is one place to ride both systems: pay, manage, check, ask. v1 covers every TransLink mode (bus, SkyTrain, SeaBus, West Coast Express) plus BC Ferries foot passenger fares, read-only sailing status, and in-app support. Vehicle booking is in the product but last in the roadmap, because it needs the deepest partnership. BC Transit's Umo network waits for a phase of its own. And the plastic card stays. Four decisions shape the rest of this project, and each one is a bet.",
          ja: "このアプリは、二つのシステムを一つの場所で乗るためのものです。支払い、管理、確認、問い合わせ。v1ではTransLinkのすべてのモード（バス、SkyTrain、SeaBus、West Coast Express）に加えて、BC Ferriesの徒歩乗船運賃、参照専用の運航状況、アプリ内サポートを設計します。車両予約はプロダクトの中にはありますが、ロードマップでは最後です。最も深い連携が必要だからです。BC TransitのUmoネットワークは、独立したフェーズを待ちます。そしてプラスチックのカードは残ります。四つの決定がこのプロジェクトの残りを形づくり、そのどれもが賭けです。",
          ko: "이 앱은 두 시스템을 한 자리에서 타기 위한 것입니다. 결제하고, 관리하고, 확인하고, 물어봅니다. v1은 TransLink의 모든 수단(버스, SkyTrain, SeaBus, West Coast Express)에 더해 BC Ferries의 도보 승객 요금, 읽기 전용 운항 정보, 앱 안의 문의 창구를 설계합니다. 차량 예약은 제품 안에 있지만 로드맵에서는 가장 뒤입니다. 가장 깊은 협력이 필요하기 때문입니다. BC Transit의 Umo 네트워크는 별도의 단계를 기다립니다. 그리고 플라스틱 카드는 남습니다. 네 개의 결정이 이 프로젝트의 나머지를 만들고, 각각은 승부수입니다.",
        },
      },
      {
        type: "h",
        text: {
          en: "One tap, two fare authorities",
          ja: "ワンタッチ、二つの運賃事業者",
          ko: "한 번의 태그, 두 개의 요금 기관",
        },
        tag: { en: "Bet 01", ja: "賭け 01", ko: "승부수 01" },
      },
      {
        type: "p",
        text: {
          en: "A walk-on trip from Vancouver to Victoria crosses three fare systems, and BC Ferries says so itself: fares for each transit provider must be purchased separately. An adult foot passenger fare is $19.10 against $2.85 for a one-zone tap. The amounts are nothing alike, but the gesture is the same. The two organizations already share retail: TransLink vending machines stand at both Tsawwassen and Horseshoe Bay, pre-loaded Compass Cards are sold in the shops onboard, and BC Ferries names the 620 and the 257 as its TransLink connections.",
          ja: "バンクーバーからビクトリアまで徒歩で向かう移動は、三つの運賃体系をまたぎます。BC Ferries自身がこう書いています。各交通事業者の運賃は別々に購入する必要がある、と。大人の徒歩乗船運賃は19.10ドル、1ゾーンのタッチは2.85ドルです。金額としては似ても似つきませんが、動作は同じです。二つの組織はすでに販売の窓口を共有しています。TsawwassenとHorseshoe Bayの両方にTransLinkの券売機が置かれ、チャージ済みのCompassカードが船内の売店で売られ、BC Ferriesは620番と257番を自社のTransLink接続路線として案内しています。",
          ko: "밴쿠버에서 빅토리아까지 걸어서 가는 여정은 세 개의 요금 체계를 지납니다. BC Ferries 스스로도 그렇게 적어 두었습니다. 각 교통사업자의 요금은 따로 구매해야 한다고. 성인 도보 승객 요금은 19.10달러, 1존 태그는 2.85달러입니다. 금액으로는 닮은 구석이 없지만, 동작은 같습니다. 두 조직은 이미 판매 창구를 공유하고 있습니다. Tsawwassen과 Horseshoe Bay 양쪽에 TransLink 무인 발매기가 서 있고, 충전된 Compass 카드가 선내 매점에서 팔리며, BC Ferries는 620번과 257번을 자사의 TransLink 연계 노선으로 안내합니다.",
        },
      },
      {
        type: "p",
        text: {
          en: "Vehicle fares are a different gesture: a reservation, a vehicle class, deck capacity. That is a booking, not a tap, so it enters the app as a booking flow, and it enters last: selling another operator's vehicle fares is the deepest integration on this roadmap. In v1 the app shows a sailing's status, read-only. The booking flow is sequenced, not cut.",
          ja: "車両運賃は動作そのものが違います。予約があり、車両クラスがあり、デッキの容量がある。それはタッチではなく予約なので、アプリには予約フローとして入り、順番としては最後に入ります。他社の車両運賃を売ることが、このロードマップで最も深い連携だからです。v1では、アプリは運航状況を参照専用で表示します。予約フローは削ったのではなく、順番を後ろに置いたのです。",
          ko: "차량 요금은 동작 자체가 다릅니다. 예약, 차량 등급, 갑판 용량이 걸립니다. 그건 태그가 아니라 예약이라서, 앱에는 예약 흐름으로 들어오고, 순서로는 가장 마지막에 들어옵니다. 다른 사업자의 차량 요금을 파는 일이 이 로드맵에서 가장 깊은 연동이기 때문입니다. v1에서 앱은 운항 상태를 읽기 전용으로 보여줍니다. 예약 흐름은 잘라낸 것이 아니라, 순서를 뒤로 미룬 것입니다.",
        },
      },
      {
        type: "h",
        text: {
          en: "What you tap, and everything else",
          ja: "タッチするもの、それ以外のすべて",
          ko: "태그하는 것, 그리고 나머지 전부",
        },
        tag: { en: "Bet 02", ja: "賭け 02", ko: "승부수 02" },
      },
      {
        type: "p",
        text: {
          en: "The three surfaces collapse into two layers, not three. One layer is the thing you tap at a gate: it has to work in three seconds, in the rain, with a bag in the other hand. The other is everything that can take as long as it needs: what the website was holding, plus what today means a phone call, like checking a sailing or asking a question. An in-app assistant answers the simple ones first and hands the rest to a person; the phone line and the counter both stay. Splitting the product this way is the single structural decision the rest of the design rests on.",
          ja: "三つの接点は、三つではなく二つのレイヤーに畳まれます。一つは、改札でタッチするものです。3秒で、雨の中で、もう片方の手に荷物を持ったまま動かなければなりません。もう一つは、必要なだけ時間をかけていいものすべてです。ウェブサイトが抱えていたものに、いまは電話をかけなければならないこと、つまり運航の確認や問い合わせが加わります。アプリ内のアシスタントが簡単なものから答え、残りは人に渡します。電話回線もカウンターも、どちらも残ります。プロダクトをこう分けたことが、以降の設計すべてが乗っている唯一の構造的な決定です。",
          ko: "세 개의 접점은 세 개가 아니라 두 개의 레이어로 접힙니다. 하나는 개찰구에서 태그하는 것입니다. 3초 안에, 빗속에서, 다른 손에는 짐을 든 채로 동작해야 합니다. 다른 하나는 필요한 만큼 시간을 써도 되는 전부입니다. 웹사이트가 쥐고 있던 것들에, 오늘은 전화를 걸어야 하는 일, 그러니까 운항 확인이나 문의가 더해집니다. 앱 안의 어시스턴트가 간단한 것부터 답하고 나머지는 사람에게 넘깁니다. 전화선과 창구는 둘 다 남습니다. 제품을 이렇게 가른 것이, 나머지 설계 전체가 올라앉은 단 하나의 구조적 결정입니다.",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-ia",
        caption: {
          en: "Two layers: what you tap, and everything else. Manage, check, ask.",
          ja: "二つのレイヤー。タッチするもの、そしてそれ以外のすべて。管理、確認、問い合わせです。",
          ko: "두 개의 레이어. 태그하는 것, 그리고 나머지 전부. 관리, 확인, 문의입니다.",
        },
      },
      {
        type: "h",
        text: {
          en: "Ordered by permission, not difficulty",
          ja: "難易度ではなく、許可の順番",
          ko: "난이도가 아니라 허락의 순서",
        },
        tag: { en: "Bet 03", ja: "賭け 03", ko: "승부수 03" },
      },
      {
        type: "p",
        text: {
          en: "TransLink first, because it sets its own fares and nothing has to be negotiated. BC Ferries second, a separate fare authority, but one that already shares retail touchpoints. BC Transit third, a separate system and a separate fare authority. The phases are not ordered by engineering difficulty. They are ordered by how much permission each one needs.",
          ja: "TransLinkが最初です。自社の運賃を自社で決めており、交渉するものが何もないからです。BC Ferriesが二番目。別の運賃事業者ですが、すでに販売の接点を共有しています。BC Transitが三番目。別のシステムであり、別の運賃事業者です。フェーズの順番は、エンジニアリングの難易度で決まっていません。それぞれにどれだけの許可が要るかで決まっています。",
          ko: "TransLink가 먼저입니다. 자기 요금을 자기가 정하고, 협상할 것이 없기 때문입니다. BC Ferries가 두 번째입니다. 별개의 요금 기관이지만 이미 판매 접점을 공유하고 있습니다. BC Transit이 세 번째입니다. 별개의 시스템이자 별개의 요금 기관입니다. 단계의 순서는 엔지니어링 난이도로 정해지지 않았습니다. 각 단계에 필요한 허락의 크기로 정해졌습니다.",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-coverage-roadmap",
        caption: {
          en: "What v1 covers, what comes later, and the phases, ordered by how much permission each one needs.",
          ja: "v1がカバーする範囲、後から来るもの、そしてフェーズ。必要な許可の大きさ順に並べています。",
          ko: "v1이 덮는 범위, 나중에 오는 것, 그리고 각 단계. 필요한 허락의 크기 순으로 놓았습니다.",
        },
      },
      {
        type: "h",
        text: { en: "The card stays", ja: "カードは残る", ko: "카드는 남는다" },
        tag: { en: "Bet 04", ja: "賭け 04", ko: "승부수 04" },
      },
      {
        type: "p",
        text: {
          en: "Not everyone carries a smartphone. Concession riders cannot buy their card from a machine today, which means the counter they already have to visit is the one place this design cannot replace. And the card holds a $6 deposit and never expires. This design adds a phone; it does not take away a card.",
          ja: "全員がスマートフォンを持っているわけではありません。割引資格の利用者は、いまも券売機でカードを買えません。つまり、彼らがすでに足を運ばなければならない窓口は、この設計が置き換えられない唯一の場所です。そしてカードには6ドルのデポジットが入っていて、有効期限がありません。この設計はスマートフォンを足すものであって、カードを取り上げるものではありません。",
          ko: "모두가 스마트폰을 들고 다니지는 않습니다. 할인 대상 승객은 오늘 무인 발매기에서 카드를 살 수 없고, 그래서 그들이 이미 찾아가야 하는 창구는 이 설계가 대체할 수 없는 유일한 자리입니다. 그리고 카드에는 6달러 보증금이 들어 있고 유효기간이 없습니다. 이 설계는 폰을 더하는 것이지, 카드를 빼앗는 것이 아닙니다.",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-wireframes",
        caption: {
          en: "The first pass, before any of it looked like anything.",
          ja: "最初の試案。まだ何ひとつ、何かのように見えていなかった段階。",
          ko: "첫 시안. 아직 아무것도 무엇처럼 보이지 않던 단계.",
        },
      },
    ],
  },
  {
    id: "tap",
    label: {
      en: "05 One Tap, Every Ride",
      ja: "05 ワンタッチ、すべての移動",
      ko: "05 한 번의 태그, 모든 이동",
    },
    blocks: [
      {
        type: "p",
        text: {
          en: "This is the layer you tap. Everything in it has to survive three seconds at a gate, and nothing in it should ask you to read.",
          ja: "ここがタッチするレイヤーです。この中のすべては、改札での3秒を耐えなければならず、どれ一つとして読むことを求めてはいけません。",
          ko: "여기가 태그하는 레이어입니다. 이 안의 모든 것은 개찰구에서의 3초를 버텨야 하고, 어느 것도 읽기를 요구해서는 안 됩니다.",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-tap-moment",
        caption: {
          en: "The card, on the phone that was already in your hand.",
          ja: "すでに手の中にあったスマートフォンの上の、そのカード。",
          ko: "이미 손에 들려 있던 폰 위의, 그 카드.",
        },
      },
      {
        type: "h",
        text: {
          en: "Legible at arm's length, in motion",
          ja: "腕の長さの距離で、動きながらでも読める",
          ko: "팔 길이 거리에서, 움직이는 중에도 읽힌다",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-type",
        caption: {
          en: "One type scale, sized for a moving bus rather than a desk.",
          ja: "一つのタイプスケール。机ではなく、揺れるバスに合わせたサイズ。",
          ko: "하나의 타입 스케일. 책상이 아니라 흔들리는 버스에 맞춘 크기.",
        },
      },
      {
        type: "h",
        text: {
          en: "One color does the work of a status word",
          ja: "一つの色が、状態を告げる言葉の役割を担う",
          ko: "색 하나가 상태를 알리는 단어의 몫을 한다",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-colour",
        caption: {
          en: "Every pairing checked against WCAG contrast minimums, so a color never carries a meaning on its own.",
          ja: "すべての組み合わせをWCAGのコントラスト最小基準で確認。色だけが意味を背負うことがないように。",
          ko: "모든 조합을 WCAG 명도 대비 최소 기준으로 확인. 색 혼자서는 어떤 의미도 지지 않게.",
        },
      },
      {
        type: "h",
        text: {
          en: "One card component, every state",
          ja: "一つのカードコンポーネント、すべての状態",
          ko: "하나의 카드 컴포넌트, 모든 상태",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-component",
        caption: {
          en: "One component, the five states it owns: default, low balance, pass expiring, pass expired, reported lost. Ready, reading and paid at the reader are Apple's Express Mode UI, not redesigned here.",
          ja: "一つのコンポーネントが持つ五つの状態。デフォルト、残高不足、定期券の期限間近、定期券の期限切れ、紛失届済み。リーダー前の待機・読み取り中・決済完了はAppleのエクスプレスモードのUIであり、ここでは再設計していない。",
          ko: "하나의 컴포넌트가 가진 다섯 가지 상태. 기본, 잔액 부족, 정기권 만료 임박, 정기권 만료, 분실 신고. 리더기 앞의 준비·인식 중·결제 완료는 Apple의 익스프레스 모드 UI이며, 여기서 다시 디자인하지 않았다.",
        },
      },
      {
        type: "p",
        text: {
          en: "Those three decisions (the scale, the color set and the card component) make every screen that follows. What changes from screen to screen is only which case the rider is in.",
          ja: "この三つの決定（タイプスケール、カラーセット、カードコンポーネント）が、以降のすべての画面をつくります。画面ごとに変わるのは、利用者がどのケースにいるかだけです。",
          ko: "이 세 가지 결정(타입 스케일, 색 세트, 카드 컴포넌트)이 이후의 모든 화면을 만듭니다. 화면마다 달라지는 것은 승객이 어떤 경우에 놓여 있는지뿐입니다.",
        },
      },
      {
        type: "solution",
        title: {
          en: "The pass in the wallet",
          ja: "ウォレットの中のパス",
          ko: "지갑 속의 패스",
        },
        paras: [
          {
            en: "Compass becomes a pass in Apple Wallet, next to the cards already there. It is the rider's own card, carrying their own balance and their own passes, not a bank card standing in for one.",
            ja: "CompassはApple Wallet内のパスになり、すでにそこにあるカードの隣に並びます。利用者本人のカードであり、本人の残高と本人の定期券をそのまま持ちます。カードの代役を務めるクレジットカードではありません。",
            ko: "Compass는 Apple Wallet 안의 패스가 되어, 이미 거기 있는 카드들 옆에 놓입니다. 승객 본인의 카드이고, 본인의 잔액과 본인의 정기권을 그대로 담습니다. 카드를 대신 서는 신용카드가 아닙니다.",
          },
          {
            en: "Express Mode means the phone does not have to be woken or unlocked to pay. The rider holds it to the reader and keeps walking.",
            ja: "エクスプレスモードのおかげで、支払いのためにスマートフォンを起こしたりロックを解除したりする必要はありません。リーダーにかざして、そのまま歩き続けられます。",
            ko: "익스프레스 모드 덕분에 결제하려고 폰을 깨우거나 잠금을 풀 필요가 없습니다. 리더기에 대고 그대로 걸어가면 됩니다.",
          },
        ],
        media: ["compass-shot-wallet-01", "compass-shot-wallet-02"],
      },
      {
        type: "solution",
        title: {
          en: "Three seconds at the gate",
          ja: "改札での3秒",
          ko: "개찰구에서의 3초",
        },
        paras: [
          {
            en: "The confirmation has to be readable in the time it takes to keep moving. Zone, fare charged, balance remaining: in that order, because that is the order the rider cares about.",
            ja: "確認画面は、歩みを止めないあいだに読めなければなりません。ゾーン、引かれた運賃、残りの残高。この順にしたのは、利用者が気にする順がそうだからです。",
            ko: "확인 화면은 걸음을 멈추지 않는 동안에 읽혀야 합니다. 존, 차감된 요금, 남은 잔액 순서입니다. 승객이 궁금해하는 순서가 그렇기 때문입니다.",
          },
          {
            en: "Card clash disappears. Today the guidance is to tap only your Compass Card, because a reader may pick a bank card out of the same wallet. When the Compass pass is the express transit card, the reader has already been told which one to take.",
            ja: "カードのバッティングがなくなります。いまの案内は、Compassカードだけをタッチすること。リーダーが同じ財布の中のクレジットカードを読んでしまうことがあるからです。Compassのパスがエクスプレスカードに設定されていれば、リーダーはどれを読むかをすでに知らされています。",
            ko: "카드 충돌이 사라집니다. 지금의 안내는 Compass 카드만 태그하라는 것입니다. 리더기가 같은 지갑 속 신용카드를 집어 갈 수 있기 때문입니다. Compass 패스가 익스프레스 카드로 지정되어 있으면, 리더기는 어느 것을 집을지 이미 들은 상태입니다.",
          },
        ],
        media: ["compass-shot-tap-01", "compass-shot-tap-02"],
      },
      {
        type: "solution",
        title: {
          en: "The same gesture at the ferry",
          ja: "フェリーでも同じ動作",
          ko: "페리에서도 같은 동작",
        },
        paras: [
          {
            en: "A foot passenger fare is $19.10 against $2.85 for a one-zone bus trip. The amounts are nothing alike, and they do not need to be. What carries across is the gesture, not the price.",
            ja: "徒歩乗船の運賃は19.10ドル、1ゾーンのバスは2.85ドルです。金額はまったく似ておらず、似ている必要もありません。渡ってくるのは価格ではなく、動作です。",
            ko: "도보 승객 요금은 19.10달러, 1존 버스 요금은 2.85달러입니다. 금액은 전혀 닮지 않았고, 닮을 필요도 없습니다. 건너오는 것은 가격이 아니라 동작입니다.",
          },
          {
            en: "Because the app knows which leg the rider is on, the confirmation names the sailing and the terminal instead of a zone.",
            ja: "アプリは利用者がどの区間にいるかを把握しているため、確認画面はゾーンの代わりに便名とターミナル名を示します。",
            ko: "앱이 승객이 어느 구간에 있는지 알고 있기 때문에, 확인 화면은 존 대신 운항편과 터미널을 이름으로 보여줍니다.",
          },
        ],
        media: ["compass-shot-ferry-01", "compass-shot-ferry-02"],
      },
      {
        type: "h",
        text: {
          en: "What the gate sees",
          ja: "改札が見ているもの",
          ko: "개찰구가 보는 것",
        },
      },
      {
        type: "ba",
        graphic: "compass-fig-tap-motion",
        text: {
          en: "The pass presents the same MIFARE DESFire EV1 profile the plastic card presents today, so from the reader's side nothing has to change. That is the point: the rider is not being asked to adopt a new payment method, and the agency is not being asked to replace a reader.",
          ja: "パスは、いまプラスチックのカードが提示しているのと同じMIFARE DESFire EV1のプロファイルを提示します。リーダー側で変えるものは何もありません。そこが要点です。利用者に新しい決済手段を受け入れてくれと求めておらず、交通事業者にリーダーを取り替えてくれとも求めていません。",
          ko: "패스는 오늘 플라스틱 카드가 내보이는 것과 같은 MIFARE DESFire EV1 프로파일을 내보입니다. 리더기 쪽에서는 바뀔 것이 없습니다. 그게 핵심입니다. 승객에게 새 결제 수단을 받아들이라고 요구하지 않고, 운영 기관에 리더기를 교체하라고 요구하지도 않습니다.",
        },
        caption: {
          en: "The confirmation, in the time it actually takes.",
          ja: "実際にかかる時間の中での、確認画面。",
          ko: "실제로 걸리는 시간 안에서의 확인 화면.",
        },
      },
      {
        type: "p",
        text: {
          en: "This is the card that already exists, running on the device the rider already carries.",
          ja: "すでに存在しているカードが、利用者がすでに持ち歩いている端末の上で動くというだけのことです。",
          ko: "이미 존재하는 카드가 승객이 이미 들고 다니는 기기 위에서 동작하는 것뿐입니다.",
        },
      },
    ],
  },
  {
    id: "manage",
    label: {
      en: "06 Everything the Website Held",
      ja: "06 サイトが抱えていたすべて",
      ko: "06 웹사이트가 쥐고 있던 것들",
    },
    blocks: [
      {
        type: "p",
        text: {
          en: "This is the layer that can take as long as it needs. Every task in it is one that compasscard.ca, a vending machine or a phone call holds today. The lo-fi board's first pass spread it across four tabs; working the structure against a card-first model folded it into two (Compass Card and Tickets), with the account behind a single button.",
          ja: "ここが、必要なだけ時間をかけていいレイヤーです。この中のすべての作業は、いまcompasscard.caや券売機、あるいは電話が抱えているものです。ローファイのボードの最初の試案では、これを四つのタブに広げていました。カードを起点にしたモデルで構造を組み直すと、二つに畳まれました。Compass CardとTickets、そしてアカウントはボタン一つの奥へ。",
          ko: "여기가 필요한 만큼 시간을 써도 되는 레이어입니다. 이 안의 모든 작업은 오늘 compasscard.ca나 무인 발매기, 또는 전화가 쥐고 있는 것들입니다. 로파이 보드의 첫 시안은 이것을 네 개의 탭으로 펼쳐 놓았습니다. 카드를 기준으로 구조를 다시 밀어 보니 두 개로 접혔습니다. Compass Card와 Tickets, 그리고 계정은 버튼 하나 뒤로 들어갔습니다.",
        },
      },
      {
        type: "solution",
        title: {
          en: "Balance and history",
          ja: "残高と利用履歴",
          ko: "잔액과 이용 내역",
        },
        tag: { en: "↔ Surface 02", ja: "↔ 接点 02", ko: "↔ 접점 02" },
        paras: [
          {
            en: "Five ways to check one number becomes one. The balance is on the first screen, and the history under it answers the question the balance raises: where did it go.",
            ja: "一つの数字を確かめる五つの方法が、一つになります。残高は最初の画面にあり、その下の利用履歴が、残高が呼び起こす問いに答えます。どこへ行ったのか。",
            ko: "숫자 하나를 확인하는 다섯 가지 방법이 하나가 됩니다. 잔액은 첫 화면에 있고, 그 아래의 이용 내역이 잔액이 부르는 질문에 답합니다. 어디로 갔는가.",
          },
          {
            en: "Each trip shows the zone charged and the fare paid, so a rider can see the discounted fare they got rather than take it on trust.",
            ja: "一件ごとに、引かれたゾーンと支払った運賃が表示されるので、利用者は受けた割引運賃を信じて済ませるのではなく、目で確かめられます。",
            ko: "이용 하나하나에 차감된 존과 지불한 요금이 함께 표시되어, 승객은 자기가 받은 할인 요금을 믿고 넘기는 대신 눈으로 확인할 수 있습니다.",
          },
        ],
        media: ["compass-shot-balance-01", "compass-shot-balance-02"],
      },
      {
        type: "solution",
        title: {
          en: "Reload, without the two-hour wait",
          ja: "2時間待たないチャージ",
          ko: "두 시간을 기다리지 않는 충전",
        },
        tag: { en: "↔ Surface 02", ja: "↔ 接点 02", ko: "↔ 접점 02" },
        paras: [
          {
            en: "On an account-based system the balance lives on the server, so a reload is finished when the confirmation appears. The two-hour lag was never a policy: it was the card waiting to meet a reader.",
            ja: "アカウントベースのシステムでは残高がサーバーにあるため、チャージは確認画面が出た時点で完了します。2時間の遅れは、そもそも方針ではありませんでした。カードがリーダーと出会うのを待っていた時間でした。",
            ko: "계정 기반 시스템에서는 잔액이 서버에 있기 때문에, 충전은 확인 화면이 뜨는 순간 끝납니다. 두 시간의 지연은 애초에 정책이 아니었습니다. 카드가 리더기를 만날 때까지 기다리고 있던 시간이었습니다.",
          },
          {
            en: "Autoload is set once, with a threshold and an amount, and the app says what it is about to do before it does it.",
            ja: "オートチャージは、しきい値と金額を決めて一度設定するだけ。アプリは、これから何をするのかを実行の前に伝えます。",
            ko: "자동 충전은 기준 금액과 충전 금액을 정해 한 번만 설정하고, 앱은 무엇을 하려는지 실행 전에 먼저 말합니다.",
          },
        ],
        media: ["compass-shot-reload-01", "compass-shot-reload-02"],
      },
      {
        type: "solution",
        title: { en: "Passes", ja: "定期券", ko: "정기권" },
        paras: [
          {
            en: "Monthly passes, DayPasses and stored value sit in one place, and the app shows which one a tap will use before the rider reaches the gate.",
            ja: "月ぎめの定期券、デイパス、チャージ残高が一か所に集まり、アプリは改札に着く前に、今回のタッチがどれを使うかを示します。",
            ko: "월 정기권, 데이패스, 충전 잔액이 한 자리에 모이고, 앱은 개찰구에 닿기 전에 이번 태그가 어느 것을 쓸지 보여줍니다.",
          },
          {
            en: "A pass that is about to expire says so on the card face, not in an email.",
            ja: "まもなく期限が切れる定期券は、メールではなくカードの表面でそう伝えます。",
            ko: "곧 만료되는 정기권은 이메일이 아니라 카드 앞면에서 그렇게 말합니다.",
          },
        ],
        media: ["compass-shot-passes-01", "compass-shot-passes-02"],
      },
      {
        type: "solution",
        title: {
          en: "U-Pass, once instead of monthly",
          ja: "U-Pass、毎月ではなく一度だけ",
          ko: "U-Pass, 매달이 아니라 한 번",
        },
        tag: { en: "↔ Surface 02", ja: "↔ 接点 02", ko: "↔ 접점 02" },
        paras: [
          {
            en: "Today's routine is the one chapter 02 counted: requested by hand every month, 20 digits plus 3, up to 24 hours to activate, no refund for a missed window.",
            ja: "いまの手順は、02章で数えたとおりです。毎月自分で申請し、20桁と3桁を入力し、有効化まで最大24時間、期限を逃せば払い戻しはありません。",
            ko: "지금의 절차는 02장에서 센 그대로입니다. 매달 직접 신청하고, 20자리와 3자리를 입력하고, 활성화까지 최대 24시간, 기간을 놓치면 환불은 없습니다.",
          },
          {
            en: "The app holds the institution link and renews on the date, as a notice rather than a task. The 20-digit number is typed once at setup, or not at all if the card is already on the account.",
            ja: "アプリが学校との連携を保持し、日付に合わせて更新します。タスクではなく、お知らせとして通り過ぎます。20桁の番号は初期設定で一度だけ入力し、カードがすでにアカウントにあるなら入力そのものが不要です。",
            ko: "앱이 학교 연동을 쥐고 있다가 날짜에 맞춰 갱신합니다. 할 일이 아니라 알림으로 지나갑니다. 20자리 번호는 처음 설정할 때 한 번만 입력하고, 카드가 이미 계정에 있으면 아예 입력하지 않습니다.",
          },
        ],
        media: ["compass-shot-upass-01", "compass-shot-upass-02"],
      },
      {
        type: "solution",
        title: {
          en: "Losing it, moving it",
          ja: "なくしたとき、移すとき",
          ko: "잃어버렸을 때, 옮길 때",
        },
        paras: [
          {
            en: "A lost card is reported in the app and the balance moves to the new one. Replacing a Program pass card costs $25 today, and this design does not change that fee: it changes how long a rider spends finding out about it.",
            ja: "紛失したカードはアプリで届け出て、残高は新しいカードへ移ります。Programの定期券カードの再発行は現在25ドルで、この設計がその料金を変えるわけではありません。変えるのは、利用者がその事実を知るまでにかける時間です。",
            ko: "분실 카드는 앱에서 신고하고, 잔액은 새 카드로 옮겨집니다. Program 정기권 카드의 재발급 비용은 오늘 25달러이고, 이 설계가 그 비용을 바꾸지는 않습니다. 바꾸는 것은 승객이 그 사실을 알아내는 데 쓰는 시간입니다.",
          },
          {
            en: "The plastic card and the pass share one balance, because they are one card. Tapping either draws from the same account.",
            ja: "プラスチックのカードとパスは、残高を一つとして共有します。二つで一枚のカードだからです。どちらをタッチしても、同じアカウントから引かれます。",
            ko: "플라스틱 카드와 패스는 잔액을 하나로 씁니다. 둘이 한 장의 카드이기 때문입니다. 어느 쪽을 태그해도 같은 계정에서 빠져나갑니다.",
          },
        ],
        media: ["compass-shot-card-01", "compass-shot-card-02"],
      },
      {
        type: "h",
        text: {
          en: "Checking and asking",
          ja: "確認すること、たずねること",
          ko: "확인하기와 물어보기",
        },
      },
      {
        type: "p",
        text: {
          en: "Two more things live in this layer without a screen of their own in this case study. A sailing's status is checkable in the app, read-only in v1; the vehicle booking flow it will one day sit beside is sequenced for a later phase. And the simple questions that today mean a phone queue go to an in-app assistant first; anything it cannot answer is handed to a person. The service line and the counter both stay: this design adds front doors, it does not close the old ones.",
          ja: "このレイヤーには、このケーススタディで独立した画面を持たないものが、あと二つあります。一つは運航状況の確認です。v1では参照専用で、いつかその隣に並ぶ車両予約フローは後のフェーズに送っています。もう一つは、いまなら電話の待ち行列を意味する簡単な質問です。こうした質問はまずアプリ内のアシスタントへ渡り、答えられないものは人に引き継がれます。電話回線もカウンターも、どちらも残ります。この設計は入口を増やすものであって、もとからある入口を閉じるものではありません。",
          ko: "이 레이어에는 이 케이스스터디에 별도의 화면 없이 들어 있는 것이 두 가지 더 있습니다. 하나는 운항 상태 확인입니다. v1에서는 읽기 전용이고, 언젠가 그 옆에 놓일 차량 예약 흐름은 뒤 단계로 미뤄 두었습니다. 다른 하나는 오늘이라면 전화 대기열을 뜻하는 간단한 질문들입니다. 이런 질문은 먼저 앱 안의 어시스턴트로 가고, 답하지 못하는 것은 사람에게 넘어갑니다. 고객센터 전화선과 창구는 둘 다 남습니다. 이 설계는 들어오는 문을 늘리는 것이지, 원래 있던 문을 닫는 것이 아닙니다.",
        },
      },
      {
        type: "p",
        text: {
          en: "Every one of these tasks already exists somewhere. What changes is that a rider can reach them while standing at a gate.",
          ja: "ここに挙げた作業は、どれもすでにどこかに存在しています。変わるのは、利用者が改札の前に立ったままそこへ手を伸ばせるようになることです。",
          ko: "여기 적은 작업은 전부 이미 어딘가에 존재합니다. 달라지는 것은 승객이 개찰구 앞에 선 채로 거기에 닿을 수 있게 된다는 점입니다.",
        },
      },
    ],
  },
  {
    id: "wrist",
    label: { en: "07 On the Wrist", ja: "07 手首の上で", ko: "07 손목 위에서" },
    blocks: [
      {
        type: "p",
        text: {
          en: "The wrist gets three things: tap, balance, and a quick top-up. Anything that needs reading, typing or a decision belongs on the phone.",
          ja: "手首に載せるのは三つだけです。タッチ、残高、そしてすばやいチャージ。読む必要があるもの、入力が要るもの、判断が要るものは、すべてスマホの担当です。",
          ko: "손목에 올리는 것은 세 가지입니다. 태그, 잔액, 그리고 빠른 충전. 읽어야 하거나, 입력해야 하거나, 판단해야 하는 것은 전부 폰의 몫입니다.",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-watch",
        caption: {
          en: "The same type, color and card component at a third of the width, and nothing that asks the rider to stop walking.",
          ja: "同じタイポグラフィ、同じ配色、同じカードコンポーネントを3分の1の幅で。しかも、利用者の足を止めさせるものは一つもない。",
          ko: "같은 타이포, 같은 색, 같은 카드 컴포넌트를 1/3 폭에서. 그리고 승객을 멈춰 세우는 요소는 하나도 없이.",
        },
      },
      {
        type: "h",
        text: {
          en: "Same tokens, one-third the width",
          ja: "同じトークン、3分の1の幅",
          ko: "같은 토큰, 3분의 1 폭",
        },
      },
      {
        type: "p",
        text: {
          en: "The watch tests whether the foundations are a system or a style. The same type scale, the same color set and the same card component have to survive at a third of the width, on a screen that is glanced at rather than read. If they had to be redrawn to fit, they were never a system.",
          ja: "ウォッチは、基盤がシステムなのかスタイルなのかを見分けるテストです。同じタイプスケール、同じカラーセット、同じカードコンポーネントが、3分の1の幅で、しかも「読む」画面ではなく「ちらりと見る」画面で、そのまま通用しなければなりません。収めるために描き直す必要があったなら、それは最初からシステムではなかったということです。",
          ko: "워치는 기반이 시스템인지 스타일인지 가려내는 시험입니다. 같은 타입 스케일, 같은 컬러 세트, 같은 카드 컴포넌트가 1/3 폭에서, 그것도 읽는 화면이 아니라 흘긋 보는 화면에서 그대로 버텨야 합니다. 맞추기 위해 다시 그려야 했다면, 그것은 애초에 시스템이 아니었습니다.",
        },
      },
      {
        type: "h",
        text: {
          en: "What the watch deliberately cannot do",
          ja: "ウォッチにあえてやらせないこと",
          ko: "워치가 일부러 못 하게 둔 것",
        },
      },
      {
        type: "list",
        items: [
          {
            en: "Buy or change a pass. Spending money needs a screen you can actually read.",
            ja: "定期券の購入・変更。お金を使うには、きちんと読める画面が要ります。",
            ko: "정기권 구매·변경. 돈을 쓰는 일에는 제대로 읽히는 화면이 필요합니다.",
          },
          {
            en: "Enter a U-Pass card number. Twenty digits do not belong on a wrist.",
            ja: "U-Passのカード番号入力。20桁は手首で扱うものではありません。",
            ko: "U-Pass 카드 번호 입력. 스무 자리는 손목에서 다룰 것이 아닙니다.",
          },
          {
            en: "Show trip history beyond the last fare. Reviewing past trips is something you do sitting down.",
            ja: "直前の運賃より前の利用履歴の表示。過去の移動を見返すのは、腰を据えてやることです。",
            ko: "직전 요금을 넘어서는 이용 내역 표시. 지난 이동을 되짚어 보는 일은 앉아서 하는 일입니다.",
          },
          {
            en: "Replace or transfer a card. Anything irreversible stays where it can be confirmed properly.",
            ja: "カードの再発行・移行。取り消せない操作は、きちんと確認できる場所に置きます。",
            ko: "카드 재발급·이전. 되돌릴 수 없는 일은 제대로 확인할 수 있는 곳에 둡니다.",
          },
        ],
      },
      {
        type: "p",
        text: {
          en: "The list is short on purpose. Every item on it is something a rider would only ever do standing still, and the watch is for the times they are moving.",
          ja: "リストが短いのは意図した結果です。ここに並ぶ項目はどれも、利用者が立ち止まっているときにしかしないことで、ウォッチは立ち止まっていないときに使うものです。",
          ko: "목록이 짧은 것은 의도한 결과입니다. 여기 올라온 항목은 전부 승객이 멈춰 선 상태에서만 하는 일이고, 워치는 멈춰 서 있지 않을 때 쓰는 물건입니다.",
        },
      },
    ],
  },
  {
    id: "review",
    label: {
      en: "08 What Held Up, What Didn't",
      ja: "08 通用したもの、しなかったもの",
      ko: "08 버틴 것과 무너진 것",
    },
    blocks: [
      {
        type: "p",
        text: {
          en: "I had no users to interview, so I used what the agency publishes about itself instead. That means there is no usability testing in this chapter, no participant quotes and no adoption numbers. It also means being specific about what the three things I could do actually showed.",
          ja: "インタビューできる利用者がいなかったため、代わりに交通事業者自身が公開している資料を使いました。そのため、この章にはユーザビリティテストも、参加者の発言引用も、導入実績の数値もありません。その代わり、実際にできた三つのことが何を示したのかを、具体的に書いています。",
          ko: "인터뷰할 사용자가 없었기 때문에, 대신 운영 기관이 스스로 공개한 자료를 썼습니다. 그래서 이 챕터에는 사용성 테스트도, 참가자 인용도, 도입 지표도 없습니다. 대신 제가 할 수 있었던 세 가지가 실제로 무엇을 보여줬는지를 구체적으로 적었습니다.",
        },
      },
      {
        type: "h",
        text: {
          en: "Today's fastest path is today's most expensive path",
          ja: "いま最も速い経路が、いま最も高い経路",
          ko: "지금 가장 빠른 길이 지금 가장 비싼 길이다",
        },
      },
      {
        type: "p",
        text: {
          en: "I timed the current tasks against the designed ones by hand, counting steps rather than seconds so the comparison does not depend on how fast I type. The result that mattered was not inside the app at all: the quickest way to pay for a trip today is to tap a contactless bank card, and that is also the way that costs $0.65 to $1.30 more every trip. The convenient option and the affordable option are different options, and a rider has to already know that to choose correctly.",
          ja: "現行のタスクと設計したタスクを、手作業で計測しました。秒数ではなくステップ数で数えているため、比較結果が私の入力速度に左右されることはありません。しかし本当に重要だった結果は、アプリの中にはありませんでした。いま運賃を払う最も速い方法は非接触の銀行カードをタッチすることであり、それは同時に、1回の乗車ごとに0.65〜1.30ドル多く払う方法でもあります。便利な選択肢と安い選択肢が別々の選択肢になっていて、利用者はそれをあらかじめ知っていなければ正しく選べません。",
          ko: "현재 태스크와 설계한 태스크를 직접 손으로 재봤습니다. 초 단위가 아니라 스텝 수로 셌기 때문에, 비교 결과가 제 입력 속도에 좌우되지 않습니다. 정작 중요한 결과는 앱 안에 있지 않았습니다. 오늘 요금을 내는 가장 빠른 방법은 비접촉 은행 카드를 태그하는 것이고, 그 방법이 동시에 매 이용마다 0.65~1.30달러를 더 내는 방법입니다. 편한 선택지와 저렴한 선택지가 서로 다른 선택지이고, 승객은 그 사실을 미리 알고 있어야만 제대로 고를 수 있습니다.",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-task-table",
        caption: {
          en: "Steps to complete each task today, and in the design. Counted by hand; no user testing was carried out.",
          ja: "各タスクの完了に必要なステップ数。現行と設計案の比較です。手作業でカウントし、ユーザーテストは実施していません。",
          ko: "각 태스크를 끝내는 데 필요한 스텝 수. 현재와 설계안을 비교했습니다. 직접 손으로 셌고, 사용자 테스트는 진행하지 않았습니다.",
        },
      },
      {
        type: "h",
        text: {
          en: "What a heuristic review caught",
          ja: "ヒューリスティック評価で見つかったもの",
          ko: "휴리스틱 리뷰가 잡아낸 것",
        },
      },
      {
        type: "p",
        text: {
          en: "I ran the screens against Nielsen's heuristics and against a contrast and target-size audit. That is one person reviewing their own work, which catches the obvious failures and misses the ones you are blind to. The findings are listed with what changed and what I decided to leave.",
          ja: "画面をニールセンのヒューリスティックと照らし合わせ、コントラストとタップ領域のサイズを点検しました。一人が自分の成果物を自分で見直す方法なので、目につく問題は拾えても、自分では気づけないものは見落とします。見つかった項目は、何を直し、何をそのまま残すことにしたのかと合わせてまとめています。",
          ko: "화면들을 닐슨의 휴리스틱과 대조하고, 명도 대비와 터치 영역 크기를 점검했습니다. 한 사람이 자기 작업물을 스스로 검토하는 방식이라, 눈에 띄는 실패는 잡히지만 스스로 보지 못하는 것은 놓칩니다. 발견한 항목은 무엇을 고쳤고 무엇을 그대로 두기로 했는지와 함께 정리했습니다.",
        },
      },
      {
        type: "figure",
        graphic: "compass-fig-audit",
        caption: {
          en: "Heuristic findings and the accessibility audit, with what changed and what I left.",
          ja: "ヒューリスティック評価の結果とアクセシビリティ監査。直したものと、そのまま残したものを併記しています。",
          ko: "휴리스틱 점검 결과와 접근성 감사. 고친 것과 그대로 둔 것을 함께 적었습니다.",
        },
      },
      {
        type: "h",
        text: {
          en: "A premise that broke",
          ja: "崩れた前提が一つ",
          ko: "무너진 전제 하나",
        },
      },
      {
        type: "p",
        text: {
          en: "I started this project believing BC Ferries required foot passengers to reserve in advance, which would have made a single tap impossible without a booking system behind it. That was wrong: BC Ferries' own release says customers can arrive at the terminal and buy a foot passenger fare without booking ahead. Losing the premise made the case stronger, because the friction sat in the sentence next to it: fares for each transit provider must be purchased separately. Three fare systems on one journey is a better problem than a booking requirement, and it is the one that actually exists.",
          ja: "このプロジェクトを始めた時点で、私はBC Ferriesが徒歩乗船の利用者に事前予約を求めていると思い込んでいました。もしそうなら、背後に予約システムを用意しない限り、ワンタッチでの乗船は成り立ちません。しかし、それは誤りでした。BC Ferries自身のリリースによれば、利用者は予約なしでターミナルに着いてから徒歩乗船の運賃を購入できます。前提が崩れたことで、むしろケースは強くなりました。摩擦は、その隣の一文のほうにあったからです。各交通事業者の運賃は、それぞれ別に購入しなければならない。一つの移動に運賃体系が三つあるという問題は、予約義務よりも良い問題であり、何より実際に存在している問題です。",
          ko: "저는 이 프로젝트를 시작할 때 BC Ferries가 도보 승객에게 사전 예약을 요구한다고 알고 있었습니다. 그렇다면 뒤에 예약 시스템을 붙이지 않고서는 한 번의 태그가 불가능했을 겁니다. 그런데 그것이 틀렸습니다. BC Ferries가 직접 낸 보도자료에 따르면, 승객은 예약 없이 터미널에 도착해 도보 승객 요금을 구매할 수 있습니다. 전제가 무너지면서 오히려 케이스는 단단해졌습니다. 마찰은 그 옆 문장에 있었기 때문입니다. 각 교통 사업자의 요금은 따로 구매해야 한다는 것. 한 번의 여정에 요금 체계가 셋이라는 문제는 예약 의무보다 더 나은 문제이고, 무엇보다 실제로 존재하는 문제입니다.",
        },
      },
      {
        type: "h",
        text: {
          en: "What I'd instrument if this shipped",
          ja: "実際にリリースするなら、何を計測するか",
          ko: "실제로 출시된다면 무엇을 측정할까",
        },
      },
      {
        type: "list",
        items: [
          {
            en: "U-Pass renewal completion in the first 72 hours of each month, against the manual request rate today.",
            ja: "毎月最初の72時間におけるU-Pass更新の完了率。現在の手動申請の割合との比較で。",
            ko: "매월 첫 72시간 안의 U-Pass 갱신 완료율. 현재의 수동 신청 비율과 비교해서.",
          },
          {
            en: "The share of trips paid with the Compass pass rather than a contactless bank card. The fare gap says riders are choosing wrong, and this is where that would show.",
            ja: "非接触の銀行カードではなくCompassの定期券で支払われた乗車の割合。運賃の差は利用者が選び間違えていることを示しており、それが表に出るのがまさにこの数値です。",
            ko: "비접촉 은행 카드 대신 Compass 정기권으로 결제한 이용 비율. 요금 차이는 승객이 잘못 고르고 있다고 말하고 있고, 그 사실이 드러날 자리가 바로 여기입니다.",
          },
          {
            en: "Reload abandonment, and where in the flow it happens.",
            ja: "チャージの離脱率と、フローのどこで離脱しているか。",
            ko: "충전 이탈률, 그리고 흐름의 어느 지점에서 이탈하는지.",
          },
          {
            en: "Time from opening the app to a visible balance, on the oldest supported device.",
            ja: "サポート対象で最も古い端末で、アプリ起動から残高が見えるまでの時間。",
            ko: "지원 대상 중 가장 오래된 기기에서, 앱 실행부터 잔액이 보이기까지 걸리는 시간.",
          },
          {
            en: "Ferry taps as a share of foot passenger boardings at Tsawwassen and Horseshoe Bay.",
            ja: "TsawwassenとHorseshoe Bayにおける徒歩乗船者数に対する、フェリーでのタッチの割合。",
            ko: "Tsawwassen과 Horseshoe Bay의 도보 승객 승선 건수 대비 페리 태그 비율.",
          },
        ],
      },
      {
        type: "p",
        text: {
          en: "The strongest evidence in this project came from things that were already published and things I could go and touch: a fare table, an RFP, a vending machine that will not sell a concession card. The weakest part is the part I could not do. I do not know how someone who has never used a transit wallet behaves on the first tap, and no amount of heuristic review substitutes for watching one person do it once. If this went further, that is the first thing I would buy.",
          ja: "このプロジェクトで最も強い根拠は、すでに公開されていたものと、実際に足を運んで触れられたものから得られました。運賃表、入札公告、そして割引資格のカードを売ってくれない券売機。最も弱いのは、私にはできなかった部分です。交通ウォレットを一度も使ったことのない人が、最初のタッチでどう振る舞うのか、私は知りません。そしてヒューリスティック評価をどれだけ重ねても、一人が一度やるところを見ることの代わりにはなりません。この先へ進めるなら、まず買うのはそれです。",
          ko: "이 프로젝트에서 가장 강한 근거는 이미 공개돼 있던 것들과 제가 직접 가서 만져볼 수 있었던 것들에서 나왔습니다. 요금표, 입찰 공고, 그리고 할인 대상 카드는 팔지 않는 무인 발매기. 가장 약한 부분은 제가 하지 못한 부분입니다. 교통 지갑을 한 번도 써본 적 없는 사람이 첫 태그에서 어떻게 행동하는지 저는 모릅니다. 그리고 휴리스틱 리뷰를 아무리 돌려도, 한 사람이 한 번 하는 것을 지켜보는 일을 대신하지는 못합니다. 이 프로젝트를 더 끌고 간다면, 가장 먼저 사들일 것이 그것입니다.",
        },
      },
      {
        type: "demo",
        label: {
          en: "Open the prototype",
          ja: "プロトタイプを開く",
          ko: "프로토타입 열기",
        },
        note: {
          en: "The full flow, running right here, with nothing to install.",
          ja: "インストール不要。実際のフローをこの場で動かせます。",
          ko: "설치 없이, 전체 흐름을 여기서 그대로 실행합니다.",
        },
      },
    ],
  },
];

export default {
  id: "compass-card",
  title: "Compass Card",
  kind: "Concept Project · iOS & watchOS",
  /* Work-card thumbnail: the concept running in both its devices — the
     Apple Wallet link-up on the iPhone, a reload and a reader tap on the
     watch. scripts/record-compass-hero.mjs records the screens (the watch
     side drives the playable demo at public/compass/watch/), and
     scripts/build-compass-hero.py composites and cuts the card. */
  video: {
    sources: [
      {
        src: `${import.meta.env.BASE_URL}media/compass-card/compass-card.webm`,
        type: "video/webm",
      },
      {
        src: `${import.meta.env.BASE_URL}media/compass-card/compass-card.mp4`,
        type: "video/mp4",
      },
    ],
    poster: cardPoster,
  },
  thumbAlt: {
    en: "The Compass concept on an iPhone and an Apple Watch: the pass joining Apple Wallet on one, a reload and a reader tap on the other",
    ja: "iPhoneとApple Watchで見せるCompassのコンセプト。片方はApple Walletにパスが加わるところ、もう片方はチャージとリーダーへのタッチ",
    ko: "iPhone과 Apple Watch로 보여주는 Compass 콘셉트. 한쪽은 Apple Wallet에 패스가 들어가는 장면, 다른 쪽은 충전과 리더기 태그",
  },
  description: {
    en: "Redesigning Metro Vancouver's transit fare card system into an iOS and watchOS experience built on TransLink's upcoming account-based model.",
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
      en: "Compass is the fare card for Metro Vancouver. Every bus, SkyTrain, SeaBus and West Coast Express journey in the region runs through it. You can already tap a phone at a TransLink gate, but what you tap is a bank card, not your Compass Card. The card itself is still a piece of plastic, and everything about that card (balance, reload, passes, U-Pass) lives on a website and in station vending machines.",
      ja: "Compassはメトロバンクーバーの交通運賃カードです。この地域のバス、SkyTrain、SeaBus、West Coast Expressの乗車は、すべてこのカードを通じて行われます。TransLinkの改札でスマートフォンをかざすこと自体は、すでにできます。ただし、そこで読み取られるのはクレジットカードのタッチ決済であって、本人のCompassカードではありません。カード自体はいまも一枚のプラスチックで、残高・チャージ・定期券・U-Passといったカードにまつわるすべては、ウェブサイトと駅の券売機の中にあります。",
      ko: "Compass는 메트로밴쿠버의 교통 요금 카드입니다. 이 지역의 버스, SkyTrain, SeaBus, West Coast Express 이용은 모두 이 카드를 거칩니다. TransLink 개찰구에서 폰을 대는 것은 이미 됩니다. 다만 그때 태그되는 것은 비접촉 신용·체크카드이지, 본인의 Compass 카드가 아닙니다. 카드 자체는 여전히 플라스틱 한 장이고, 잔액·충전·정기권·U-Pass처럼 그 카드에 관한 모든 것은 웹사이트와 역 안의 무인 발매기에 들어 있습니다.",
    },
    {
      en: "This is a self-initiated concept project: an iOS app, a watchOS app and a Compass pass in Apple Wallet, designed on top of the account-based system TransLink has already put out to tender. I had no users to interview, so I built the case on what the agency publishes about itself: ridership reports, fare tables, the modernization RFP, and its own customer experience plan.",
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
  ],
  metaRight: [
    {
      label: { en: "tool", ja: "ツール", ko: "도구" },
      values: ["Figma", "React", "Vite", "Playwright", "Adobe Creative Suite"],
    },
  ],
  sections: COMPASS_SECTIONS,
  demo: { src: "compass/", frame: "blue" },
};
