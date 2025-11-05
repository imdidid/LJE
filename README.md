# LCK Archive · November 2025 Match Board

11월 국제 대회 일정만 압축해 보여주는 전문가용 경기 보드입니다. 모바일에서는 상단 대회 탭, 데스크톱에서는 좌측 레일을 통해 월즈 · MSI · First Stand 섹션을 바로 전환하며, 경기 카드를 클릭하면 각 팀 로스터가 확장됩니다.

## 구성 미리보기
- **Pure Black + Blue 팔레트**: 방송형 대시보드에 맞춰 고대비 레이아웃으로 정리했습니다.
- **카테고리 레일**: 모바일 상단 스와이프, 데스크톱 좌측 스티키 레일 구성.
- **경기 카드**: 시간 / 팀 로고 / 스코어 / 상태 배지 노출, 클릭 시 로스터 트레이가 펼쳐짐.
- **접근성 가이드**: `aria-live`, 키보드 포커스 스크롤, 토글 시 `aria-expanded` 갱신.

## 개발 환경 준비
- Node.js 18 이상
- 정적 서버 (`npx serve`, `python -m http.server` 등)
- `npm` 사용 시 [Pupix/lol-esports-api](https://github.com/Pupix/lol-esports-api) 연동을 위해 Git 접근 권한 필요

## 로컬 실행
```bash
npx serve .
# 또는
python -m http.server
```
브라우저에서 `http://localhost:<port>` 접속 후 실시간 UI를 확인합니다.

## 디렉터리 구조
```
LJE/
├── assets/logos/      # 팀 로고 SVG
├── scripts/main.js    # 일정 렌더링 및 인터랙션
├── styles/main.css    # Pure black & blue 테마
├── tools/             # 외부 API 동기화 스크립트 (선택)
└── README.md
```

## 데이터 구조 핵심
`scripts/main.js`의 `tournaments` 배열이 단일 데이터 소스입니다.

| 필드 | 설명 |
| --- | --- |
| `id`, `tag`, `title`, `stage` | 대회 식별자 및 메타 정보 |
| `matches` | 경기 배열. ISO8601(KST) `datetime`, `venue`, `stage`, `broadcast`, `status(live/completed/upcoming)` 포함 |
| `teams` | 두 팀 정보 (`teamCatalog` 키, 선택적 `score`, 로스터 문자열 배열) |

### 상태 규칙
- `status: 'live'` → 헤더의 **LIVE** 버튼과 연결되어 즉시 스크롤.
- `status: 'completed'` → `종료` 배지, 스코어가 있을 경우 `score` 필드에 병기.
- `status: 'upcoming'` → 향후 경기. `broadcast`/`venue` 정보는 `·` 구분자로 병합해 표기.

## Pupix lol-esports-api로 일정 자동 갱신하기
[Pupix/lol-esports-api](https://github.com/Pupix/lol-esports-api)는 라이엇 e스포츠 퍼시스턴트 API를 래핑해 주는 Node.js 라이브러리입니다. Git 소스를 직접 설치한 뒤 스케줄을 JSON으로 변환하면 본 프로젝트 데이터에 쉽게 주입할 수 있습니다.

### 1. 의존성 설치
```bash
npm install git+https://github.com/Pupix/lol-esports-api.git
```
라이브러리는 Riot API 토큰을 요구하지 않지만, 요청 헤더에 `x-api-key`를 추가하고 싶은 경우 `.env` 등을 통해 주입할 수 있습니다.

### 2. 동기화 스크립트 실행
`tools/sync-schedule.mjs`는 월즈/국제 이벤트 일정을 불러와 `data/schedule.json`을 생성하는 예시입니다.

```bash
node tools/sync-schedule.mjs --hl=ko-KR --tournaments worlds,msi,first-stand
```
생성된 JSON을 검수한 뒤 `scripts/main.js`의 `tournaments` 배열을 덮어쓰거나, 별도 fetch 로직으로 교체하면 됩니다.

### 3. 스케줄 형식
`sync-schedule.mjs`는 아래 구조로 JSON을 출력합니다.

```json
{
  "tournaments": [
    {
      "id": "worlds-2025",
      "tag": "Worlds",
      "title": "World Championship 2025",
      "stage": "Knockout Stage · Seoul",
      "matches": [
        {
          "id": "worlds25-sf2",
          "datetime": "2025-11-10T19:30:00+09:00",
          "venue": "고척 스카이돔",
          "status": "live",
          "stage": "Semifinal · Lower Bracket",
          "broadcast": "Best of 5",
          "teams": [
            {
              "id": "dk",
              "score": null,
              "roster": ["Canna · TOP", "Lucid · JGL", "ShowMaker · MID", "Deft · BOT", "BeryL · SUP"]
            },
            {
              "id": "fnc",
              "score": null,
              "roster": ["Oscarinin · TOP", "Razork · JGL", "Humanoid · MID", "Noah · BOT", "Jun · SUP"]
            }
          ]
        }
      ]
    }
  ]
}
```

## 외부 참고 소스
| 소스 | 설명 |
| --- | --- |
| [Pupix/lol-esports-api](https://github.com/Pupix/lol-esports-api) | 일정/대회/로스터 데이터 수집용 Node 라이브러리 |
| Riot Esports API | `getSchedule`, `getTournamentDetails` 퍼시스턴트 쿼리. 헤더에 `X-Riot-Token` 사용 시 속도 향상 |
| Liquipedia MediaWiki | `action=parse&page=World_Championship_2025` 등으로 대체 로스터 검증 가능 (레이트리밋 유의) |
| gol.gg | 경기 통계 보완용 HTML 소스 |

## 배포 체크리스트
- 데스크톱(≥1080px)에서 레일이 좌측에 고정되고 경기 카드 그리드가 균형 있게 보이는지 확인.
- 모바일에서 대회 레일이 수평 스와이프 가능한지, 경기 카드가 단일 컬럼으로 정렬되는지 확인.
- 라이브 경기 클릭 시 로스터 트레이가 확장되고 다른 트레이가 자동으로 닫히는지 검증.

## Git 충돌 마커 점검
병합 후 `<<<<<<<`, `=======`, `>>>>>>>` 마커가 남아 있으면 렌더링이 깨집니다. `rg "<<<<<<<" -n`으로 확인하고 모든 마커를 삭제하세요.
