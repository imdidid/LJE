# LCK Archive · November 2025 Match Board

국제 대회와 LCK 프리시즌 이벤트를 동시에 모니터링하기 위한 단일 페이지 일정 보드입니다. 월즈, MSI 오프시즌 쇼케이스, First Stand
카드를 최신 순서로 노출하며, 경기 카드를 클릭하면 즉시 양 팀 로스터를 확인할 수 있습니다. 모바일에서는 상단 스와이프 탭, 데스크톱에서는
좌측 레일 내비게이션으로 대회 범주를 이동합니다.

## 개발 환경 준비
- Node.js 18 이상 (정적 서버 실행용)
- 임의의 정적 서버 (`npx serve`, `python -m http.server` 등)
- SVG 편집이 필요한 경우 [Inkscape](https://inkscape.org) 또는 Figma 권장

## 로컬 실행
```bash
npx serve .
# 또는
python -m http.server
```

브라우저에서 `http://localhost:<port>`로 접속하면 현재 브랜치의 일정 보드가 그대로 표시됩니다.

## 데이터 구조 개요
`tournaments` 배열(`scripts/main.js`)이 전 섹션의 단일 소스입니다.

| 필드 | 설명 |
| --- | --- |
| `id`, `tag`, `title`, `stage` | 대회 식별자, 표기용 명칭, 스테이지/도시 메타 |
| `matches` | 경기 배열. ISO8601(KST) `datetime`, `venue`, `stage`, `broadcast`, `status(live/completed/upcoming)` 포함 |
| `teams` | 두 팀 정보. `teamCatalog` 키(`id`), 선택적 `score`, 로스터 문자열 배열 |

### 업데이트 규칙
1. **시간 정렬**: `datetime`만 변경하면 스크립트가 자동으로 정렬합니다.
2. **로고 관리**: 신규 팀은 `assets/logos/`에 SVG를 추가하고 `teamCatalog`에 경로/리전을 등록합니다.
3. **상태 배지**: `status: 'live'`가 있으면 헤더의 LIVE 버튼이 해당 카드로 스크롤됩니다.

## 디렉터리 구조
```
LJE/
├── assets/logos/   # 팀 로고 SVG
├── index.html      # 메인 문서
├── scripts/        # 렌더링 스크립트
└── styles/         # 스타일시트
```

## 외부 데이터 소스 & 자동화
| 소스 | 엔드포인트 | 비고 |
| --- | --- | --- |
| Riot Esports REST | `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=ko-KR` | `X-Riot-Token` 헤더 필요, 일정/매치 ID/팀 UUID 제공 |
| Riot Esports GraphQL | `https://esports-api.lolesports.com/persisted/gw/getTournamentDetails` | 퍼시스턴트 쿼리 파라미터(`id`, `hl`)로 로스터/스탯 조회 |
| Liquipedia MediaWiki | `https://liquipedia.net/api.php?action=parse&page=<Tournament_Page>&format=json` | 비공식 API. 파싱 시 rate limit(약 30req/min) 고려 |
| Gol.gg | `https://gol.gg/tournament/tournament-matchlist/<slug>` | HTML 스크래핑 필요. 선수·챔피언 통계 추출 가능 |

위 소스를 cron 또는 CI에서 수집 → JSON 정규화 → `tournaments` 덮어쓰기 후 정적 사이트를 재빌드하면 Open Beta 수준으로 유지·보수가 가능합니다.

## 배포 체크리스트
- 정적 서버에서 SVG/CSS/JS가 모두 200 응답인지 확인
- 960px 이하 환경에서 카테고리 레일이 상단 스와이프형 탭으로 노출되는지 검증
- 라이브 경기(`status: 'live'`)가 상단 컨트롤의 "LIVE" 버튼과 연동되는지 테스트

## Git 충돌 마커 주의
`<<<<<<<`, `=======`, `>>>>>>>`는 Git이 두 버전의 변경을 동시에 병합하지 못했을 때 생성하는 마커입니다. 수동으로 원하는 내용을 선택·통합한 뒤
마커 라인 자체를 삭제해야 커밋이 가능합니다. 병합 후에는 `rg "<<<<<<<" -n`으로 잔여 마커가 없는지 반드시 확인하세요.
