# LCK Archive · International November Feed

2025년 11월에 진행·예정된 국제 무대(LCK First Stand, MSI 쇼케이스, 월드 챔피언십) 경기 일정을 한 화면에서 확인할 수 있는 정적 프로토타입입니다. 경기 카드를 클릭하면 각 팀의 로스터가 확장되며, 모바일에서는 상단 탭, 데스크톱에서는 좌측 내비게이션으로 대회별 구분을 제공합니다.

## 개발 환경
- Node.js 18+ (정적 서버 실행용)
- 임의의 정적 서버(`npx serve`, `python -m http.server` 등)

## 실행
```bash
npx serve .
# 또는
python -m http.server
```

브라우저에서 `http://localhost:<port>`로 접속하면 최신 빌드 결과를 확인할 수 있습니다.

## 데이터 구조
`scripts/main.js`의 `tournaments` 배열이 단일 소스입니다.

- `id`, `tag`, `title`, `stage`: 대회 식별자 및 메타 정보
- `matches`: ISO8601(KST) `datetime`, `venue`, `stage`, `status`(`live`, `completed`, `upcoming`), 팀 정보
- 팀 정보는 `teamCatalog`에서 이름·로고·지역을 참조하며, 각 매치에 포함된 `roster` 배열이 클릭 시 펼쳐집니다.

경기를 추가하거나 수정할 때는 `datetime`을 KST 기준 ISO8601로 입력하면 렌더링 및 정렬이 자동으로 처리됩니다.

## 디렉터리 구조
```
LJE/
├── assets/logos/   # 팀 로고 SVG 에셋
├── index.html      # 단일 페이지 진입점
├── scripts/        # 렌더링 스크립트
└── styles/         # 스타일시트
```

## 데이터 소스 & 자동화 제안
- **Riot Esports API**: `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=ko-KR` (X-Riot-Token 필요)에서 공식 일정·매치 ID·팀 정보를 JSON으로 수집할 수 있습니다.
- **LoLEsports.com GraphQL**: `https://esports-api.lolesports.com/persisted/gw/getTournamentDetails` 등 퍼시스턴트 쿼리를 활용해 로스터, 스탠딩을 확보할 수 있습니다.
- **Liquipedia API**: `https://liquipedia.net/api.php?action=parse&page=` 형태의 MediaWiki API로 경기/선수 위키 데이터를 파싱할 수 있습니다.

위 소스를 CI에서 주기적으로 호출해 정규화한 뒤 `tournaments` 데이터를 갱신하면, 현재 프로토타입도 Open Beta 수준의 최신성을 유지할 수 있습니다.

## 배포 체크리스트
- 정적 서버에서 로고 및 스크립트 경로가 200 OK로 응답하는지 확인
- 모바일 브레이크포인트(960px 이하)에서 내비게이션이 상단 스와이프 탭으로 동작하는지 검증
- 라이브 경기(`status: 'live'`)의 강조 표시가 기대대로 노출되는지 모니터링

## Git 병합 충돌 마커 안내
- `<<<<<<<`, `=======`, `>>>>>>>`는 Git이 서로 다른 브랜치의 수정 내역을 동시에 적용하지 못했을 때 자동으로 삽입하는 *충돌 마커*입니다.
- 마커가 보인다면 해당 파일을 열어 두 버전 중 하나를 선택하거나 필요한 내용을 수동으로 조합한 뒤, 마커 줄 자체를 모두 삭제해야 병합이 완료됩니다.
- 충돌을 피하려면 작업 전 `git pull --rebase`로 최신 `main`을 받아오고, 병합 후에는 `rg "<<<<<<<"` 명령으로 잔여 마커가 없는지 항상 점검하세요.
