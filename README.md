# LCK Archive Prototype

경기 일정 데이터 뷰를 빠르게 검증하기 위한 정적 프로토타입입니다. 메인 화면에는 2024 스프링 스플릿 일정만 노출되며, 팀 로고와 경기 상태는 정적 데이터셋(`scripts/main.js`)에서 렌더링됩니다.

## 개발 환경
- Node.js 18+
- 임의의 정적 서버(`npx serve`, `python -m http.server` 등)

## 실행
```bash
npx serve .
# 또는
python -m http.server
```

브라우저에서 `http://localhost:<port>`에 접속하면 최신 빌드 결과를 확인할 수 있습니다.

## 데이터 편집
`scripts/main.js`의 `matchFeed` 배열을 수정해 경기 일정을 업데이트합니다. `kickoff` 값은 `YYYY-MM-DDTHH:MM` 형식(KST 기준)으로 유지해야 정렬이 올바르게 동작합니다.

## 디렉터리 구조
```
LJE/
├── assets/logos/   # 팀 로고 SVG
├── index.html      # 단일 페이지 진입점
├── scripts/        # 일정 렌더링 스크립트
└── styles/         # 스타일시트
```

## 배포 체크리스트
- 정적 서버에서 이미지와 스크립트 경로가 200 OK로 응답하는지 확인
- 모바일 뷰포트에서 그리드가 단일 컬럼으로 전환되는지 확인
- 시즌 레이블(`seasonLabel`) 값이 최신 스플릿과 일치하는지 검토
