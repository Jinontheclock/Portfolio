# Compass 앱 스크린 캡처 — 매핑표 (재촬영본)

## 촬영 조건 (MEASURED)

- 소스: **CompassCard 레포 `claude/new-session-qx93vo` @ `ec3c8d0`** — 15개 수정이 전부 반영된 빌드
  (번들 `index-CXUAahoc.js` / `index-C1tplvSe.css`)
- 디바이스: 402 × 874 논리 픽셀, `deviceScaleFactor: 3` → 출력 **1206 × 2622 px**
- 상태바 시각: 전부 **9:41** 고정
- 애니메이션/트랜지션 전부 정지 (`reducedMotion: "reduce"` + CSS kill)
- 폰트: **Fira Sans 대체**. 이 샌드박스에서 `use.typekit.net` 이 차단되어 FF Meta 를 받을 수 없습니다.
  하진님 로컬에서 `REAL_FONT=1 node capture.js` 로 돌리면 **동일 스크립트가 진짜 FF Meta 로** 재출력됩니다.
  → **예외: `26-payment` 한 장만 진짜 FF Meta** 입니다 (아래 재촬영 항목 참조).
- 스크립트: `capture.js` — **39 컷, 실패 0, 회귀 감지 0**
- 촬영 중 자동 검사(`assertFixed`): `.tap-dismiss` UA 크롬 없음 / `.tap-mark--declined` 가 빨강(#c0362c) /
  `.tile-gold` 가 잉크 토큰(#8f6700) — 세 항목 모두 해당 화면마다 통과

---

## projects.js 의 16 키 ↔ 캡처 파일

| 키 | 캡처 파일 | 상태 |
|---|---|---|
| `compass-shot-wallet-01` | `22-wallet` | ○ Wallet 스택 안의 Compass 패스 |
| `compass-shot-wallet-02` | `23-wallet-card` | ○ 패스 앞면 + 잔액 **$12.15** (CAD$ 표기 제거됨 — B-1 반영 완료) |
| `compass-shot-tap-01` | `05-gate-bus` | ○ Accepted / `$2.85 Deducted · $12.15 Remaining` / 1-Zone · Stored value |
| `compass-shot-tap-02` | `04-history-open` | ○ Tap in Main St–Science World → Tap out Waterfront → **Balance $12.15** → View gate screen |
| `compass-shot-ferry-01` | `07-gate-ferry` | △ `$19.10 Deducted · $5.00 Remaining` / BC Ferries · Adult foot passenger.<br>캡션이 "터미널 이름"을 말하는데 게이트 화면엔 터미널이 안 나옴 → 캡션을 ferry-02 쪽으로 옮기거나 문구 조정 필요 |
| `compass-shot-ferry-02` | `06-history-ferry-open` | ○ `04:45 PM Tap in at Tsawwassen terminal −$19.10` / Balance $5.00 (터미널 이름 여기 있음) |
| `compass-shot-balance-01` | `02-card` | ○ 잔액 `$12.15` 먼저, 히스토리 그 아래 |
| `compass-shot-balance-02` | `03-history` | ○ 트립별 zone + fare, 11개 날짜 그룹 19줄 |
| `compass-shot-reload-01` | `08-reload` | ○ $10 / $20 / $50 프리셋 |
| `compass-shot-reload-02` | `34-reload-paid` | ○ "Reload complete / $20.00 Added / Available at the gate right away" |
| (Autoload 보조) | `10-autoload`, `11-autoload-on` | ○ threshold $5.00 · add $10.00 · 알림 문장 1개 |
| `compass-shot-passes-01` | `12-passes` | ○ Monthly / DayPass / zone 선택 한 화면 |
| `compass-shot-passes-02` | **`35-passes-paid`** ← 변경 | ○ "Current pass · Monthly · 2-Zone · expires Aug 31".<br>**C-2 로 시드 카드에서 패스를 뺐기 때문에 더 이상 `02-card` 에 없습니다.** 구매를 끝낸 뒤 화면인 `35-passes-paid` 로 옮깁니다 |
| `compass-shot-upass-01` | `36-upass-typed` | ○ BCIT + 학번 `A01234567` 입력됨 + "No 20-digit number to enter" |
| `compass-shot-upass-02` | `16-upass-done` | ○ U-Pass BC / August — Renewed / Auto-renew on |
| `compass-shot-card-01` | `18-lost-frozen` | ○ Unfreeze Card 상태 + "This card is frozen" |
| `compass-shot-card-02` | `20-replace` | ○ "$25.00 applies to Program pass cards" |

**보너스 컷**: `33-gate-declined` — 얼린 카드로 게이트를 태그했을 때의 `Declined / Card frozen`.
`18-lost-frozen` 과 짝지어 "얼리면 진짜로 막힌다"는 증거로 쓰면 강합니다.

---

## 재촬영에서 달라진 것

1. **`16-upass-done` 촬영 경로가 바뀌었습니다.** C-1 로 Connect 버튼이 학번 입력 전까지 비활성이라,
   예전 경로(바로 Connect 클릭)는 죽은 버튼을 누르고 타임아웃 났습니다. 학번을 먼저 넣도록 고쳤습니다.
   → **이 실패 자체가 C-1 이 실제로 동작한다는 증거입니다.**
2. **`19-lost-move` 와 `20-replace` 가 이제 서로 다른 화면입니다.** B-5 로 뒤로가기 라벨이 갈렸습니다 —
   19번은 `‹ Lost Card`, 20번은 `‹ My Compass Card`. 39컷 전부 MD5 중복 0.
3. **`compass-shot-passes-02` 의 소스가 `02-card` → `35-passes-paid` 로 이동** (위 표 참조).
4. `25-account` 에서 하단 버튼 블록이 사라지고 환불이 `CARD` 섹션의 평범한 한 줄이 됐습니다 (A-5).
5. `26-payment` 이 `PRIMARY PAYMENT` → `AUTO PAYMENT` 순서로 바뀌고 `NOTIFICATION` 섹션이 없어졌습니다 (B-2).

---

## `26-payment` 재촬영 (CompassCard `22e280f` 기준)

결제수단이 Apple Pay 한 줄에서 **Apple Pay / Credit Card / PayPal / Gift Card 네 줄**로 늘고
각 줄이 자기 마크를 달게 되면서, 38장 중 이 한 장만 화면이 바뀌었습니다. 그래서 이 한 장만 다시 찍었습니다.

- 조건은 나머지와 동일: 402 × 874 @ `deviceScaleFactor: 3` → **1206 × 2622**, 상태바 **9:41** 고정,
  `reducedMotion: "reduce"` + CSS 로 트랜지션·애니메이션 정지.
- **폰트만 다릅니다 — 이 장은 진짜 FF Meta.** 이 컨테이너에는 Adobe Fonts 키트의 로컬 미러가 있어
  네트워크 없이도 FF Meta 가 로드됩니다. 반대로 나머지 38장이 쓴 Fira Sans 는 이 컨테이너에 없어
  대체 글꼴을 흉내 낼 수도 없었습니다. 둘 중 하나를 골라야 했고, **앱이 실제로 쓰는 글꼴**을 골랐습니다.
- 촬영 중 검사: 타이틀 `Payment Method` / 네 줄의 라벨과 순서 / 각 줄의 마크가 실제로 디코드됐는지
  (`naturalWidth > 0`) / 깨진 이미지 0 / 패널이 `row·rule·row·rule·row·rule·row` 순인지 /
  상태바가 **촬영 뒤에도** 9:41 인지 — 전부 통과.
- 이 컷은 `CompassCaptures.jsx` 에 등록돼 있지 않습니다. 페이지에 그려지는 17장이 아니라
  **기록용 39장** 쪽이라, 사이트 화면은 이 교체로 달라지지 않습니다.

**첫 촬영본에 있던 결함은 앱에서 고쳤습니다** (CompassCard `22e280f`). 패널이 줄마다 그 **뒤에**
구분선을 그렸는데, `Add payment method` 줄이 늘 뒤따르던 시절엔 그게 맞아 보였습니다. 네 수단이
전부 등록되면 그 줄이 사라지면서 구분선만 패널 바닥에 남았습니다. 이제 구분선은 **줄 사이**에만
들어가고 add 줄은 자기 것을 따로 가져옵니다. 패널이 1px 줄어 `tests/specs/payment.json` 의
`panel1.h` 198 → 197 과 그 아래 세 좌표를 다시 핀했고, 27개 스펙 전부 통과합니다.
`site/public/compass` 의 임베드 데모도 이 빌드로 갱신했습니다.

---

## 전체 39 컷

```
00-landing         00b-login          01-home            02-card
03-history         04-history-open    05-gate-bus        06-history-ferry-open
07-gate-ferry      08-reload          09-reload-done     10-autoload
11-autoload-on     12-passes          13-passes-daypass  14-passes-done
15-upass           16-upass-done      17-lost            18-lost-frozen
19-lost-move       20-replace         21-refund          22-wallet
23-wallet-card     24-new-card        25-account         26-payment
27-assistant       28-contact         29-tickets         30-ticket-open
31-ferry-reserve   32-ticket-buy      33-gate-declined   34-reload-paid
35-passes-paid     36-upass-typed     37-card-reloaded
```

---

## 모션 파일

| 파일 | 크기 | 길이 | 용도 |
|---|---|---|---|
| `compass-tap-motion.mp4` | 1206 × 2622 (H.264 High, level 5.1, 60fps, 무음) | 2.82s | **안(B)** — 세로 전체, 폭 350px 로 캡 |
| `compass-tap-motion-band.mp4` | 1206 × 678 (H.264 High, level 3.2, 60fps, 무음) | 2.82s | **안(C)** — 확인 밴드만 크롭, 16:9에 가까움 |
| `compass-tap-motion-poster.jpg` | 804 × 1748 | — | 세로용 포스터 (f017 = 확인 화면) |
| `compass-tap-motion-band-poster.jpg` | 804 × 452 | — | 밴드용 포스터 |

루프 구조 (MEASURED): `f000` 0.70s 정지 → 17프레임 푸시(0.283s) → `f017` 1.50s 정지 →
17프레임 팝(0.283s) → `f000` 으로 되돌아감. **`p017` 과 `f000`, `p000` 과 `f017` 이 픽셀 단위로 완전히
동일(차이 픽셀 0)** 이라 이음매가 보이지 않습니다.

프레임 0 이 History 를 "펼쳐진 채로" 보여주는지 촬영 스크립트가 매 실행마다 검사합니다
(`aria-expanded=["true","false","false","false","false"]`, 열린 패널 1개, fold 높이 108px, 게이트 버튼 1개 보임).
이게 깨지면 촬영이 중단됩니다 — 원인 없는 화면 전환은 케이스스터디에서 쓸모가 없기 때문입니다.
