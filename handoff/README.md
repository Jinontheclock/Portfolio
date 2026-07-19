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
- **TinyPaws 케이스 스터디** 골격·카피·자산 1차 배포됨. 오너 대기 항목:
  - Figma export 6종(figure 블록은 이미 있고 키만 미등록 → 파일 오면 `TinyPawsFigures.jsx`에 등록):
    sitemap(FigJam) / lofi-grid / brand-explore / styletile / devspecs / BA 2쌍
    (BA는 옛 레포 `tinypaws_user1~4.webp` ↔ nav/structure 매핑 확인 필요. 추정: user3(텍스트 벽)→user4(섹션형)=structure)
  - «TBD» 토큰 7개(코드 주석 1 포함): 프로그램/수업 명칭·배포 URL(메타 Live Site — cta는 임베드 모달로 대체됨)·lo-fi/hi-fi 참가자 수·영상 크레딧·발표/전시 사실·stats 수치 4개(수치 오기 전까지 stats 블록 자체 미삽입). 기간은 Jan 2025 – May 2025로 확정 반영.
  - 데모웹 소스는 `Jinontheclock/TinyPaws`에 push 완료(base=/TinyPaws). 라이브 배포는 레포 Settings → Pages → Source=GitHub Actions 설정만 남음 → 그 후 «TBD: 배포 URL»에 https://jinontheclock.github.io/TinyPaws/ 반영
- **⑨ 컴포넌트 상태 보드**(ProLog 05 Visual Language) — 유저 업로드 대기.
- About의 **Resume 링크**는 아직 `href:"#"` 플레이스홀더.
- Approach의 **pull-quote 블록**은 설문 인용 검증 전까지 보류(지금 추가 X).

## 하지 말 것 (유저가 거절한 것)
- 모바일 가로모드 **회전 잠금 안내 오버레이** — 추가하지 않는다.
- 데모 소스를 이 컨테이너 토큰으로 ProLog에 push 시도 — 403, 위 패치 방식 사용.

## 현재 상태 (이 핸드오프 시점)
- Portfolio: TinyPaws 케이스 스터디 + 임베드 데모 모달(데스크톱 우선) 배포 완료.
- TinyPaws 데모웹: GitHub `Jinontheclock/TinyPaws` main = `09235fc` (로컬 /home/claude/TinyPaws-web).
- ProLog: GitHub `main` = `93f79c9` (세션 작업 전부 푸시됨, 패치 불필요).
