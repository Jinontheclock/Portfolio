# media — 프로젝트별 원본 에셋

포트폴리오에 쓰일 **원본 이미지·비디오를 프로젝트별 폴더에 업로드**하는 곳입니다.
여기 있는 파일이 사이트에 바로 노출되지는 않습니다 — 업로드하면 Claude가
웹용으로 최적화(크롭·리사이즈·WebP 변환)해서 `site/src/assets/<프로젝트>/`에
넣고 페이지에 연결합니다.

```
site/public/media/
├── prolog/         ← ProLog 관련 원본 (로고, 목업, 다이어그램, 영상 …)
├── tinypaws/
├── compass-card/
├── welab/
├── muji/
└── site/           ← 특정 프로젝트에 속하지 않는 사이트 공통 에셋
```

## 업로드 방법

1. GitHub에서 `site/public/media/<프로젝트>` 폴더 열기
2. **Add file → Upload files** → 파일 드래그 → **Commit changes**
3. Claude에게 어느 페이지 어디에 쓸지 알려주기

파일명은 자유롭게 — 내용을 알 수 있는 이름이면 됩니다.
같은 이름으로 다시 올리면 기존 파일이 교체됩니다.

## 참고

- 파일당 100MB 제한 (GitHub)
- 영상은 mp4(H.264) 권장, 그래픽은 PNG/SVG 권장
- `site/public/prolog/` 는 데모 앱 빌드 전용 폴더입니다 — 에셋을 올리지 마세요
