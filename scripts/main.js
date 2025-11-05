import {
  apiKey,
  language,
  tournamentSlugs,
  leagueIds,
  fallbackSchedulePath
} from './config.js';

const API_BASE = 'https://esports-api.lolesports.com/persisted/gw';
const STATUS_LABEL = {
  live: 'LIVE',
  completed: '종료',
  upcoming: '예정'
};

const state = {
  tournaments: [],
  rosterMap: new Map()
};

const boardElement = document.querySelector('[data-schedule-board]');
const navElement = document.querySelector('[data-tournament-nav]');
const placeholderElement = document.querySelector('[data-placeholder]');
const bannerElement = document.querySelector('[data-date-banner]');

const templates = {
  tournament: document.getElementById('tournament-template'),
  match: document.getElementById('match-template'),
  roster: document.getElementById('roster-template')
};

const formatters = {
  time: new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }),
  date: new Intl.DateTimeFormat('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short'
  })
};

const normaliseStatus = (value) => {
  const lower = (value || '').toLowerCase();
  if (['inprogress', 'in_progress', 'live'].includes(lower)) return 'live';
  if (['completed', 'finished', 'final'].includes(lower)) return 'completed';
  return 'upcoming';
};

const fetchRiot = async (endpoint, params = {}) => {
  if (!apiKey) {
    throw new Error('API 키가 설정되지 않았습니다. scripts/config.js를 확인하세요.');
  }

  const url = new URL(`${API_BASE}/${endpoint}`);
  url.searchParams.set('hl', language || 'ko-KR');
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: {
      'x-api-key': apiKey
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Riot Esports API 요청 실패: ${response.status} ${response.statusText} · ${text}`);
  }

  return response.json();
};

const fetchScheduleFromApi = async () => {
  const events = [];
  const seen = new Set();
  const queries = leagueIds && leagueIds.length ? leagueIds : [null];

  for (const leagueId of queries) {
    const payload = await fetchRiot('getSchedule', leagueId ? { leagueId } : {});
    const segment = payload?.data?.schedule?.events ?? [];
    segment.forEach((event) => {
      if (!event?.match || !event?.tournament) return;
      const slug = event.tournament.slug;
      if (tournamentSlugs.length && slug && !tournamentSlugs.includes(slug)) return;
      const id = event.match.id || event.id;
      if (!id || seen.has(id)) return;
      seen.add(id);
      events.push(event);
    });
  }

  const rosterMap = await fetchRostersFromApi();
  const tournaments = buildTournamentData(events, rosterMap);

  return {
    generatedAt: new Date().toISOString(),
    tournaments,
    rosterMap
  };
};

const fetchRostersFromApi = async () => {
  const map = new Map();
  const queries = leagueIds && leagueIds.length ? leagueIds : [null];

  for (const leagueId of queries) {
    const payload = await fetchRiot('getTeams', leagueId ? { leagueId } : {});
    const teams = payload?.data?.teams ?? [];
    teams.forEach((team) => {
      const slug = (team.slug || team.id || '').toLowerCase();
      if (!slug || map.has(slug)) return;
      map.set(slug, normaliseTeamProfile(team));
    });
  }

  return map;
};

const normaliseTeamProfile = (team) => {
  const players = Array.isArray(team.players)
    ? team.players
        .filter((player) => player?.status?.toLowerCase?.() !== 'inactive')
        .map((player) => ({
          name: player?.gameName || player?.summonerName || player?.handle || player?.name || '',
          role: (player?.role || player?.position || '').toUpperCase(),
          isStarter: player?.isStarter ?? player?.active ?? false
        }))
    : [];

  return {
    slug: team.slug,
    code: team.code,
    name: team.name,
    region: team.homeLeague?.name || team.league?.name || '',
    image: team.image || team.logo || '',
    players
  };
};

const fetchScheduleFromFile = async () => {
  try {
    const response = await fetch(fallbackSchedulePath, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`로컬 일정 파일을 불러오지 못했습니다: ${response.status}`);
    const data = await response.json();
    return {
      generatedAt: data.generatedAt || null,
      tournaments: Array.isArray(data.tournaments) ? data.tournaments : [],
      rosterMap: buildRosterMapFromFile(data.rosters)
    };
  } catch (error) {
    console.warn('[lck-archive] 로컬 일정 데이터를 불러오지 못했습니다.', error);
    return { generatedAt: null, tournaments: [], rosterMap: new Map() };
  }
};

const buildRosterMapFromFile = (raw) => {
  if (!raw || typeof raw !== 'object') return new Map();
  const map = new Map();
  Object.entries(raw).forEach(([slug, value]) => {
    map.set(slug.toLowerCase(), value);
  });
  return map;
};

const buildTournamentData = (events, rosterMap) => {
  const groups = new Map();

  events.forEach((event) => {
    const slug = event.tournament?.slug;
    if (!slug) return;
    const key = slug.toLowerCase();

    if (!groups.has(key)) {
      groups.set(key, {
        id: key,
        slug,
        tag:
          event.tournament?.shortName ||
          event.tournament?.abbreviation ||
          event.league?.abbreviation ||
          'EVENT',
        title: event.tournament?.name || event.tournament?.title || event.league?.name || slug,
        stage: event.blockName || event.bracket?.name || '',
        matches: []
      });
    }

    const collection = groups.get(key);
    collection.matches.push(normaliseMatch(event, rosterMap));
  });

  return Array.from(groups.values()).map((group) => ({
    ...group,
    matches: group.matches.sort(
      (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    )
  }));
};

const normaliseMatch = (event, rosterMap) => {
  const teams = Array.isArray(event.match?.teams) ? event.match.teams : [];

  return {
    id: event.match?.id || event.id,
    datetime: event.startTime || event.startTimeUTC,
    status: normaliseStatus(event.state || event.match?.state),
    stage: event.blockName || event.bracket?.name || '',
    venue: event.venue?.name || event.venue || '',
    broadcast: event.streams?.[0]?.parameter || event.streams?.[0]?.title || '',
    bestOf: event.match?.strategy?.count || null,
    teams: teams.map((team) => normaliseMatchTeam(team, rosterMap))
  };
};

const normaliseMatchTeam = (team, rosterMap) => {
  const slug = (team.team?.slug || team.slug || team.code || team.id || '').toLowerCase();
  const profile = (slug && rosterMap.get(slug)) || null;
  const wins = typeof team?.result?.gameWins === 'number' ? team.result.gameWins : null;
  const losses = typeof team?.result?.gameLosses === 'number' ? team.result.gameLosses : null;
  const outcome = (team?.result?.outcome || '').toLowerCase();

  const roster = profile?.players?.length
    ? profile.players.map((player) =>
        `${player.name}${player.role ? ` · ${player.role}` : ''}${player.isStarter ? '' : ' (Sub)'}`
      )
    : [];

  return {
    slug,
    name: profile?.name || team.name || team.code || slug.toUpperCase(),
    code: profile?.code || team.code || '',
    region: profile?.region || '',
    logo: profile?.image || team.image || team.logo || '',
    wins,
    losses,
    outcome,
    roster
  };
};

const formatClock = (iso) => {
  if (!iso) return '';
  const date = new Date(iso);
  return formatters.time.format(date);
};

const formatDate = (iso) => {
  if (!iso) return '';
  const date = new Date(iso);
  return formatters.date.format(date);
};

const buildScoreline = (teams) => {
  if (!Array.isArray(teams) || teams.length < 2) return '';
  const [home, away] = teams;
  if (typeof home.wins === 'number' && typeof away.wins === 'number') {
    return `${home.wins} – ${away.wins}`;
  }
  if (home.outcome === 'win' && away.outcome === 'loss') return '승';
  if (away.outcome === 'win' && home.outcome === 'loss') return '패';
  return '';
};

const buildDetails = (match) => {
  const segments = [];
  if (match.stage) segments.push(match.stage);
  if (match.venue) segments.push(match.venue);
  if (match.broadcast) segments.push(match.broadcast);
  if (match.bestOf) segments.push(`Bo${match.bestOf}`);
  return segments.join(' · ');
};

const clearBoard = () => {
  Array.from(boardElement.children).forEach((child) => {
    if (child !== placeholderElement) {
      child.remove();
    }
  });
};

const renderSchedule = (tournaments) => {
  clearBoard();

  if (!tournaments.length) {
    placeholderElement.hidden = false;
    return;
  }

  placeholderElement.hidden = true;

  const fragment = document.createDocumentFragment();

  tournaments.forEach((tournament) => {
    const node = templates.tournament.content.cloneNode(true);
    const section = node.querySelector('[data-tournament]');
    const anchor = tournament.slug || tournament.id;
    if (anchor) {
      section.id = anchor;
      section.dataset.tournament = anchor;
    }

    section.querySelector('.tournament__tag').textContent = tournament.tag;
    section.querySelector('.tournament__title').textContent = tournament.title;
    section.querySelector('.tournament__stage').textContent = tournament.stage;

    const list = section.querySelector('[data-match-list]');
    tournament.matches.forEach((match) => {
      list.appendChild(renderMatch(match));
    });

    fragment.appendChild(node);
  });

  boardElement.appendChild(fragment);
  setupMatchToggles();
};

const renderMatch = (match) => {
  const node = templates.match.content.cloneNode(true);
  const trigger = node.querySelector('.matchcard__trigger');

  trigger.dataset.matchId = match.id;
  trigger.dataset.status = match.status;

  const clock = trigger.querySelector('.matchcard__clock');
  clock.textContent = formatClock(match.datetime);

  const date = trigger.querySelector('.matchcard__date');
  date.textContent = formatDate(match.datetime);

  const teamsWrap = trigger.querySelectorAll('.matchcard__team');
  match.teams.forEach((team, index) => {
    const wrap = teamsWrap[index];
    const crest = wrap.querySelector('.matchcard__crest');
    crest.innerHTML = '';
    if (team.logo) {
      const img = document.createElement('img');
      img.src = team.logo;
      img.alt = `${team.name} 로고`;
      img.loading = 'lazy';
      crest.appendChild(img);
    } else {
      crest.textContent = team.code || team.name?.slice(0, 2) || '?';
    }
    wrap.querySelector('.matchcard__name').textContent = team.name;
  });

  const score = trigger.querySelector('.matchcard__score');
  score.textContent = buildScoreline(match.teams);

  const status = trigger.querySelector('.matchcard__status');
  status.textContent = STATUS_LABEL[match.status] || '예정';
  status.dataset.variant = match.status;

  const details = trigger.querySelector('.matchcard__details');
  details.textContent = buildDetails(match);

  const rosterContainer = node.querySelector('[data-roster]');
  match.teams.forEach((team) => {
    rosterContainer.appendChild(renderRoster(team));
  });

  return node;
};

const renderRoster = (team) => {
  const node = templates.roster.content.cloneNode(true);
  node.querySelector('.roster__name').textContent = team.name;
  node.querySelector('.roster__note').textContent = team.region || team.code || '';

  const list = node.querySelector('.roster__list');
  if (!team.roster?.length) {
    const item = document.createElement('li');
    item.textContent = 'API에서 로스터 정보를 찾지 못했습니다.';
    list.appendChild(item);
  } else {
    team.roster.forEach((entry) => {
      const item = document.createElement('li');
      item.textContent = entry;
      list.appendChild(item);
    });
  }

  return node;
};

const setupMatchToggles = () => {
  const triggers = boardElement.querySelectorAll('.matchcard__trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      closeAllRosters();
      if (!expanded) {
        openRoster(trigger);
      }
    });
  });
};

const closeAllRosters = () => {
  boardElement.querySelectorAll('.matchcard__trigger').forEach((trigger) => {
    trigger.setAttribute('aria-expanded', 'false');
  });
  boardElement.querySelectorAll('.matchcard__roster').forEach((panel) => {
    panel.hidden = true;
  });
};

const openRoster = (trigger) => {
  trigger.setAttribute('aria-expanded', 'true');
  const panel = trigger.closest('.matchcard').querySelector('.matchcard__roster');
  panel.hidden = false;
};

const buildNav = (tournaments) => {
  navElement.innerHTML = '';
  const fragment = document.createDocumentFragment();

  tournaments.forEach((tournament, index) => {
    const item = document.createElement('li');
    item.className = 'rail__item';

    const button = document.createElement('button');
    const anchor = tournament.slug || tournament.id;
    button.type = 'button';
    button.textContent = tournament.title;
    if (anchor) {
      button.setAttribute('aria-controls', anchor);
    }
    if (index === 0) button.setAttribute('aria-current', 'true');

    button.addEventListener('click', () => {
      if (!anchor) return;
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    item.appendChild(button);
    fragment.appendChild(item);
  });

  navElement.appendChild(fragment);
  observeSections();
};

const observeSections = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navElement.querySelectorAll('button').forEach((button) => {
          button.setAttribute('aria-current', button.getAttribute('aria-controls') === id ? 'true' : 'false');
        });
      });
    },
    {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: [0, 0.5, 1]
    }
  );

  document.querySelectorAll('[data-tournament]').forEach((section) => observer.observe(section));
};

const updateBanner = (tournaments, generatedAt) => {
  if (!bannerElement) return;

  const allMatches = tournaments.flatMap((tournament) => tournament.matches || []);
  if (!allMatches.length) {
    bannerElement.querySelector('.masthead__day').textContent = '데이터 동기화 필요';
    bannerElement.querySelector('.masthead__focus').textContent = '실시간 일정 로딩 대기';
    return;
  }

  const now = Date.now();
  let focusMatch = allMatches.find((match) => match.status === 'live');
  if (!focusMatch) {
    focusMatch = allMatches.find((match) => new Date(match.datetime).getTime() >= now);
  }
  if (!focusMatch) {
    focusMatch = allMatches[allMatches.length - 1];
  }

  const day = bannerElement.querySelector('.masthead__day');
  day.textContent = generatedAt
    ? new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(
        new Date(generatedAt)
      )
    : formatDate(focusMatch.datetime);

  const focus = bannerElement.querySelector('.masthead__focus');
  focus.textContent = [STATUS_LABEL[focusMatch.status] || '경기', focusMatch.stage]
    .filter(Boolean)
    .join(' · ');
};

const bindMastheadActions = () => {
  document.querySelectorAll('[data-scroll]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetStatus = button.dataset.scroll;
      const match = boardElement.querySelector(`.matchcard__trigger[data-status="${targetStatus}"]`);
      if (match) {
        match.scrollIntoView({ behavior: 'smooth', block: 'center' });
        match.focus({ preventScroll: true });
      }
    });
  });
};

const bootstrap = async () => {
  bindMastheadActions();

  try {
    let schedule;
    if (apiKey) {
      schedule = await fetchScheduleFromApi();
    } else {
      schedule = await fetchScheduleFromFile();
    }

    state.tournaments = schedule.tournaments || [];
    state.rosterMap = schedule.rosterMap || new Map();

    renderSchedule(state.tournaments);
    if (state.tournaments.length) {
      buildNav(state.tournaments);
    }
    updateBanner(state.tournaments, schedule.generatedAt);
  } catch (error) {
    console.error('[lck-archive] 일정 로드 실패', error);
    placeholderElement.hidden = false;
    placeholderElement.innerHTML = `<p>일정을 불러오는 중 오류가 발생했습니다.<br />${error.message}</p>`;
  }
};

bootstrap();
