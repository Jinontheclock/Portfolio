# Session handoff — Portfolio + ProLog

작업 방식·환경·남은 일을 새 세션이 그대로 이어받기 위한 노트.
소통은 한국어. 케이스 스터디의 영어 카피는 요청 없이는 **한 글자도** 바꾸지 않는다.

## 레포 & 라이브
- **사이트**: `Jinontheclock/Portfolio` (public) — React 18 + Vite 6, HashRouter.
  라이브: https://jinontheclock.github.io/Portfolio/ · 작업 디렉터리: `/home/claude/repo`
- **데모 소스**: `Jinontheclock/ProLog` (public) — Expo / React Native web export.
  작업 디렉터리: `/home/claude/ProLog` (새 세션엔 자동으로 안 옴 → 아래 복원)

## 새 세션에서 ProLog 복원
컨테이너의 fine-grained PAT는 **Portfolio 전용**이라 ProLog로 git push가 403난다.
그래서 이 세션의 마지막 데모 커밋(`1ac6a53`)은 GitHub에 못 올라갔고, 대신 이 폴더에
패치로 실어 보낸다. 공개 레포라 clone은 자유롭다.

```bash
git clone https://github.com/Jinontheclock/ProLog.git /home/claude/ProLog
cd /home/claude/ProLog
git am /home/claude/repo/handoff/prolog-session.patch   # 세션 데모 작업 재적용
```

제대로 된 write 토큰이 생기면 그때 ProLog에 직접 push하면 된다.

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
과거에 cwd가 섞여 사이트 빌드가 public/prolog로 잘못 복사된 적 있음 → 단계마다 명시적 cd.

## 커밋 규칙
모든 커밋은 Hajin Lee 명의:
```bash
git -c user.name="Hajin Lee" -c user.email="hajinlee.ca@gmail.com" commit -m "…"
```
트레일러(세션 URL은 새 세션 것으로 교체):
```
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_…
```
유저가 세션 중 GitHub 웹 UI로 파일을 올리므로 push 전 rebase 폴백 준비. 모델 식별자는 커밋/PR/코드에 넣지 않는다.

## 검증 (Playwright)
`executablePath: '/opt/pw-browsers/chromium'`, 스크립트는 `/home/claude/repo/site`에서 실행.
오프스크린 요소는 `scrollIntoView({block:'center'})` 후 실제 `page.mouse.click`. 레이지 이미지 때문에 scrollIntoView 3회 반복.
헤드리스 크로미움은 H.264 없음 → mp4 첫 프레임 검정은 정상(버그 아님).
프리뷰 데모 경로는 트레일링 슬래시: `/Portfolio/prolog/` (index.html 아님).

## 남은 일 / 다음
- **03 Approach 참가자 그래픽**(WHO WE HEARD FROM)이 아직 11명 기준 숫자 → stats 스트립은 12명. Figma 재수출본 오면 교체.
- **⑨ 컴포넌트 상태 보드**(05 Visual Language) — 유저 업로드 대기.
- About의 **Resume 링크**는 아직 `href:"#"` 플레이스홀더.
- Approach의 **pull-quote 블록**은 설문 인용 검증 전까지 보류(지금 추가 X).

## 하지 말 것 (유저가 거절한 것)
- 모바일 가로모드 **회전 잠금 안내 오버레이** — 추가하지 않는다.
- 데모 소스를 이 컨테이너 토큰으로 ProLog에 push 시도 — 403, 위 패치 방식 사용.

## 현재 상태 (이 핸드오프 시점)
- Portfolio: `582bd3a` (P4 stats 스트립까지) 배포 완료.
- ProLog: 로컬 `1ac6a53` = 이 폴더의 패치. GitHub은 `08f70ba`까지.
