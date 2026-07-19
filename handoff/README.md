# Session handoff — Portfolio + ProLog

작업 방식·환경·남은 일을 새 세션이 그대로 이어받기 위한 노트.
소통은 한국어. 케이스 스터디의 영어 카피는 요청 없이는 **한 글자도** 바꾸지 않는다.

## 레포 & 라이브
- **사이트**: `Jinontheclock/Portfolio` (public) — React 18 + Vite 6, HashRouter.
  라이브: https://jinontheclock.github.io/Portfolio/ · 작업 디렉터리: `/home/claude/repo`
- **데모 소스**: `Jinontheclock/ProLog` (public) — Expo / React Native web export.
  작업 디렉터리: `/home/claude/ProLog` (새 세션엔 자동으로 안 옴 → 아래 복원)

## 새 세션에서 ProLog 복원
데모 소스는 GitHub에 전부 올라가 있다 — clone 한 줄이면 끝:

```bash
git clone https://github.com/Jinontheclock/ProLog.git /home/claude/ProLog
```

주의: 컨테이너의 fine-grained PAT는 **Portfolio 전용**이라 ProLog로 git push는 403난다.
푸시가 필요하면 오너가 ProLog 스코프의 임시 토큰을 제공해야 한다.

## 빌드 / 프리뷰 / 배포 (사이트)
```bash
cd /home/claude/repo/site
npx vite build --base=/Portfolio/
npx vite preview --base=/Portfolio/ --port 4173 --strictPort   # run_in_background; 컨테이너 재시작 시 죽음 → 재생성
```
배포: `main`에 push → GitHub Actions → Pages. 확인은 runs API를 head_sha==HEAD && conclusion==success 될 때까지 폴링.
```bash
TOKEN=$(git config --get remote.origin.url | sed -E 's#https://([^@]+)@.*#\1#')
curl -s -H "Authorization: token $TOKEN" \
  "https://api.github.com/repos/Jinontheclock/Portfolio/actions/runs?per_page=1"
```

## 데모 재수출 파이프라인 (각 단계 절대경로 cd 필수)
```bash
cd /home/claude/ProLog && npx expo export --platform web
rm -rf /home/claude/repo/site/public/prolog
cp -r /home/claude/ProLog/dist /home/claude/repo/site/public/prolog
cd /home/claude/repo/site && npx vite build --base=/Portfolio/
```
TinyPaws 데모(케이스 스터디 "Visit the live site" 모달, TryAppModal variant="web"):
```bash
cd /home/claude/TinyPaws-web && TINYPAWS_BASE=/Portfolio/tinypaws npx astro build
rm -rf /home/claude/repo/site/public/tinypaws
cp -r /home/claude/TinyPaws-web/dist /home/claude/repo/site/public/tinypaws
cd /home/claude/repo/site && npx vite build --base=/Portfolio/
```
과거에 cwd가 섞여 사이트 빌드가 public/prolog로 잘못 복사된 적 있음 → 단계마다 명시적 cd.

## 커밋 규칙
모든 커밋은 Hajin Lee 명의:
```bash
git -c user.name="Hajin Lee" -c user.email="hajinlee.ca@gmail.com" commit -m "…"
```
트레일러는 붙이지 않는다 — 오너 요청으로 커밋 참여자는 Hajin Lee 단독이어야 한다
(Co-Authored-By/Claude-Session 금지). 유저가 세션 중 GitHub 웹 UI로 파일을 올리므로
push 전 rebase 폴백 준비. 모델 식별자는 커밋/PR/코드에 넣지 않는다.

## 검증 (Playwright)
`executablePath: '/opt/pw-browsers/chromium'`, 스크립트는 `/home/claude/repo/site`에서 실행.
오프스크린 요소는 `scrollIntoView({block:'center'})` 후 실제 `page.mouse.click`. 레이지 이미지 때문에 scrollIntoView 3회 반복.
헤드리스 크로미움은 H.264 없음 → mp4 첫 프레임 검정은 정상(버그 아님).
프리뷰 데모 경로는 트레일링 슬래시: `/Portfolio/prolog/` (index.html 아님).

## 남은 일 / 다음
- **TinyPaws 케이스 스터디 v2(제작 서사)** 배포됨(`94b9b2d`): 7챕터 = The Brief/Understanding Adopters/Structuring the Site/Building the Brand/Designing the Experience/Shipping It Myself/Reflection. Problem 삼단·↔ 태그·stats 없음. cta 2곳(01·06)은 지시서상 disabled 외부 링크지만 오너의 이전 요청대로 **임베드 모달 유지**(href «TBD» 토큰은 데이터에 보존 — 배포 URL 확정 시 외부 링크 전환 가능). journey 다이어그램 삭제됨.
  - 미등록 figure 7종(블록은 있음, 파일 오면 `TinyPawsFigures.jsx` 등록): sitemap(FigJam) / lofi-grid / brand-explore / styletile / **tokens(신규: 스타일 타일 크롭+tokens.css 코드 투샷 — 스타일 타일 export 필요)** / devspecs / BA 2쌍(옛 레포 user1~4 ↔ nav/structure 매핑 오너 확인. 추정: user3→user4=structure)
  - «TBD» 8개: 프로그램/수업 명칭 · 배포 URL×3(메타+cta 2) · lo-fi 참가자 수 · hi-fi 참가자 수 · hi-fi 수정사항 2~3개 · Lighthouse 4항목 점수(재구축 데모 실측은 99~100 — 오너가 쓸지 결정)
  - 데모웹 사진 반영 완료(`f66e336`): 피그마 hi-fi에서 추출(노드별 스크린샷→트랜스크립트 base64, 원본 해상도=캔버스 크기 한계). biscuit/mochi/nori 2장, pepper 1장; **clementine(칼리코 없음)·tofu(흰 고양이 후보가 워터마크 인스타 사진뿐)는 일러스트 폴백 유지**. 배너 히어로 3페이지(adopt/adoption/get-involved), 홈 히어로 사진 페어+포스터 가족 사진. hi-fi 그리드 자산(tinypaws-fig-hifi-grid.webp)은 케이스 스터디 캡션 확정 대기.
  - (구) 사진 파이프라인 구현(`3175de2`): cats 스키마 photos/photoAlt(optional, image() 헬퍼), CatPhoto.astro(astro:assets Image, card 1:1/profile 4:3, 사진 없으면 CatPortrait 일러스트 폴백). 오너가 Unsplash/Pexels 사진을 `src/assets/cats/<slug>-1.jpg`(긴 변 1600px)로 넣고 JSON에 `"photos": ["../../assets/cats/<slug>-1.jpg"]` 추가 + README Credits 기록 → `content: cat photos and credits` 커밋. 사진 반영 시 임베드 재수출 + 케이스 스터디 솔루션 샷 재캡처 고려.
  - 데모웹 IA를 hi-fi와 동기화(`9c617bf`): 헤더 = Adopt·Resources·Get Involved·Events·Gift Shop·About us + 검색 아이콘 + Donate Now. 신규 페이지: /resources/(+caring-for-a-cat 아티클), /shop/(일러스트 상품+데모 백), /about/. 홈 구성 = 히어로→피처드 캣→3스텝→Personalities 오렌지 밴드→Why we do→You've helped(500+ 스탯). 푸터 = Info/Action/Subscribe(데모) + 연락처. 퀴즈는 내비에서 빠졌지만 홈 히어로·푸터·검색으로 접근 가능.
  - 대형 배치 2건 반영(TinyPaws `29a5819`→`56d7527`, Portfolio `3eb88ff`): 실제 로고 자산(wordmark 헤더/mark-orange 푸터, src/assets/ui/), **검색은 /search/ 페이지 삭제 → 헤더 인라인 드롭다운**(#search-panel, 빌드타임 인덱스, ESC/× 닫기), 샵 상단 백 바(JS로 헤더 높이에 밀착), 카트(썸네일·수량 스테퍼·서머리), 체크아웃(프로세스 바 Bag✓→Details→Confirmation + 결제수단 라디오 Apple Pay/Credit card/PayPal — 카드번호 미수집·데모 명시), About = Our Story 피그마 verbatim 3문단 + **Our Mission 5카드**(Rescue & Rehabilitate/Foster-based support/Forever Home/Community Education/Lifelong Advocacy, 브랜드 SVG 아이콘), Get involved에 **Our Wishlist 5카테고리**. Lighthouse: about 100/100/100, checkout a11y 100, shop perf 91. 케이스 스터디 샷 9장 재캡처(새 워드마크 헤더 반영) + 임베드 재수출 완료.
  - hi-fi 구조 패스(TinyPaws `408895b`, Portfolio `ab86742`): 푸터 legal © 줄 먼저·줄별 한 줄, 홈 3스텝 = 아이콘 트리오+점선 연결+오렌지 타이틀+브라운 필(hi-fi식), 홈 Why/You've-helped 한 섹션 통합(교차 행, 커플 사진 family-couple.jpg — 유저 스크린샷에서 추출·업스케일 638px), /adoption/ 5스텝 = 지그재그 원형 고양이 사진+오렌지 링+점선 스파인+Ready-to-adopt 브라운 밴드, About Our Mission = 타우프 밴드(--paw-taupe #86715E) 3+2 크림 서클(악수/핸드하트/하우스하트/전구/발자국), Get involved 볼런티어 = 다크 "What you can expect" 밴드(원형 사진 3), 위시리스트 = 타우프 밴드 아이콘 서클+불릿 행. [data-reveal] 스크롤 리빌(IntersectionObserver, Base.astro). Lighthouse 4페이지 99~100/100/100. 피그마 보드 원본은 scratchpad/hifi-grid.png(1999px) 참고.
  - 고양이 24마리로 확장(`002f6b7`): 오너가 `site/public/media/tinypaws/`에 올린 사진 16장 반영 — 신규 13(miso·clover·ginger·peanut·waffles·poppy·marmalade(사진2장)·truffle·sunny·willow·hazel·ash·pebble), clementine·tofu 일러스트 폴백 → 실사진 전환(tofu breed는 White & Grey로 수정), Miso는 nori.json 서사에 맞춰 sister·bonded pending. adopt 나이 필터가 weeks/years 파싱하도록 수정(기존 parseInt는 "3 years"를 kitten으로 오분류). 원본 업로드 파일은 그대로 site/public/media/tinypaws/에 남아 있음.
  - 사람+고양이 사진 8장(2차 업로드 `44142d3`) 반영(`2c31102`): Get involved의 "What you can expect" 원형 사진을 실제 볼런티어 사진으로 교체 + hi-fi의 **Volunteer experiences** 후기 3인 섹션 신설(Maya/Priya/Dan — 데모 가상 이름·후기, ui/people-*.jpg).
  - 데모웹 소스는 `Jinontheclock/TinyPaws`에 push 완료(base=/TinyPaws). 라이브 배포는 레포 Settings → Pages → Source=GitHub Actions 설정만 남음 → 그 후 «TBD: 배포 URL»에 https://jinontheclock.github.io/TinyPaws/ 반영
- **⑨ 컴포넌트 상태 보드**(ProLog 05 Visual Language) — 유저 업로드 대기.
- About의 **Resume 링크**는 아직 `href:"#"` 플레이스홀더.
- Approach의 **pull-quote 블록**은 설문 인용 검증 전까지 보류(지금 추가 X).

## 하지 말 것 (유저가 거절한 것)
- 모바일 가로모드 **회전 잠금 안내 오버레이** — 추가하지 않는다.
- 데모 소스를 이 컨테이너 토큰으로 ProLog에 push 시도 — 403, 위 패치 방식 사용.

## 현재 상태 (이 핸드오프 시점)
- Portfolio: TinyPaws 케이스 스터디 + 임베드 데모 모달(데스크톱 우선) 배포 완료.
- TinyPaws 데모웹: GitHub `Jinontheclock/TinyPaws` main = `2c31102` (로컬 /home/claude/TinyPaws-web).
- ProLog: GitHub `main` = `93f79c9` (세션 작업 전부 푸시됨, 패치 불필요).
