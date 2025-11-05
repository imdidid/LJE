# LCK Archive · 전문가용 일정 보드

라이엇 공식 Esports API를 사용해 LCK 분기별 스플릿과 국제 대회를 한 화면에 모아 보여주는 일정 보드입니다. Pure Black & Blue 팔레트의 와일드한 보드 스타일을 유지하면서 모바일·데스크톱 모두에서 경기만 집중적으로 탐색하도록 구성했습니다.

## 핵심 특징
- **API 기반 실데이터**: `getSchedule`, `getTeams` 퍼시스턴트 쿼리를 호출해 경기와 로스터를 동기화합니다. 수동으로 입력한 가짜 데이터는 사용하지 않습니다.
- **반응형 카테고리 레일**: 데스크톱에서는 좌측 스티키 레일, 모바일에서는 상단 스크롤 탭으로 대회 섹션을 전환합니다.
- **원클릭 로스터 토글**: 경기 카드를 클릭하면 해당 매치의 양 팀 로스터가 펼쳐집니다. API에서 제공하는 공식 팀 로고와 선수 정보를 그대로 노출합니다.
- **상태별 퀵 스크롤**: 헤더 버튼으로 LIVE/오늘/예정 매치까지 빠르게 스크롤할 수 있습니다.

## 2025 시즌 트래킹 범위
| 구분 | 토너먼트 슬러그 | 기본 리그 ID | 예상 운영 기간 (한국 표준시) |
| --- | --- | --- | --- |
| 1분기 | `lck_2025_spring` | `98767991302996019` | 1월 초 ~ 4월 중순 |
| 2분기 | `msi_2025` | `98767991343597634` | 5월 중순 ~ 6월 초 |
| 3분기 | `lck_2025_summer` | `98767991310872058` | 6월 말 ~ 9월 초 |
| 4분기 | `worlds_2025` | `98767991314006698` | 10월 초 ~ 11월 말 |
| 프리시즌 | `lck_first_stand_2026` | `98767991302996019` | 12월 말 ~ 1월 초 |

> 위 슬러그와 리그 ID는 2024~2025 시즌에 Riot이 사용한 명명 규칙을 기준으로 하며, 실제 값은 API 응답에서 확인됩니다. 필요 시 `tools/fetch-schedule.mjs --tournaments=<comma separated>`로 커스터마이즈하세요.

## 빠른 실행
```bash
npx serve .
# 또는
python -m http.server
```
브라우저에서 `http://localhost:<port>`로 접속하면 최신 일정이 로드됩니다.

## 데이터 동기화
### 1. API 키 준비
라이엇 Esports 공개 API 키를 확보한 뒤 환경 변수 또는 인자로 전달합니다.
```bash
export LOL_ESPORTS_API_KEY="<your-api-key>"
```

### 2. 스케줄 스냅샷 추출
```bash
node tools/fetch-schedule.mjs \
  --hl=ko-KR \
  --api-key="$LOL_ESPORTS_API_KEY" \
  --tournaments=lck_2025_spring,lck_2025_summer,msi_2025,worlds_2025,lck_first_stand_2026
```
위 명령은 `data/schedule.json`을 생성하며, 프런트엔드는 이 파일을 우선 읽습니다. `--out`으로 출력 경로를 바꿀 수 있고 `--leagues=<id1,id2>`로 리그를 제한할 수 있습니다.

### 3. 실시간 API 직접 사용 (선택)
`scripts/config.js`에 API 키를 넣으면 프런트엔드가 직접 Riot API를 호출합니다. 보안상 키를 커밋하지 않도록 주의하세요.
```js
// scripts/config.js
export const apiKey = '<your-api-key>';
export const language = 'ko-KR';
export const tournamentSlugs = ['lck_2025_spring', 'lck_2025_summer', 'worlds_2025', 'msi_2025', 'lck_first_stand_2026'];
export const leagueIds = ['98767991302996019', '98767991310872058', '98767991314006698', '98767991343597634'];
```
키가 비어 있으면 자동으로 `data/schedule.json`을 참조합니다.

## 디렉터리 구조
```
LJE/
├── assets/logos/          # 로컬 보유 SVG (필요 시 추가)
├── data/schedule.json     # API 스냅샷 (자동 생성)
├── scripts/
│   ├── config.js          # 프런트엔드용 API 설정
│   ├── config.example.js  # 참조용 템플릿
│   └── main.js            # 일정 렌더링 스크립트
├── styles/main.css        # Pure Black & Blue 보드 스타일
└── tools/fetch-schedule.mjs # Riot API 스케줄 동기화 스크립트
```

## 운영 체크리스트
- API 키를 노출하지 않도록 `.env`, CI 시크릿 등을 활용해 `fetch-schedule.mjs`를 실행하세요.
- `data/schedule.json`이 비어 있으면 보드에는 안내 문구만 표시됩니다.
- 새로운 팀이 등장하면 API에서 제공하는 로고를 그대로 사용합니다. 로고가 없을 경우 팀 코드가 대신 표기됩니다.
- LIVE 경기 진행 중에는 헤더 `LIVE` 버튼으로 즉시 해당 매치로 스크롤됩니다.

## 문제 해결
| 이슈 | 확인 사항 |
| --- | --- |
| 스케줄이 비어 있음 | API 키 설정 여부, 토너먼트 슬러그가 실제 응답에 존재하는지 확인하세요. |
| 로스터가 비어 있음 | Riot API의 `getTeams`가 아직 해당 팀을 노출하지 않을 수 있습니다. `fetch-schedule.mjs --leagues=...`로 관련 리그를 명시해 보세요. |
| 네트워크 오류 | 사내 프록시/방화벽 환경이라면 `curl`이나 `fetch`에 프록시 설정이 필요한지 점검하세요. |

## 라이선스 및 출처
- 데이터: [Riot Games Esports API](https://esports-api.lolesports.com/)
- 참고: [Pupix/lol-esports-api](https://github.com/Pupix/lol-esports-api) (API 구조 파악용)

> 공식 API는 레이트리밋이 있으므로 배치 실행 시 1~2초 간격을 두거나 캐싱을 병행하세요.
