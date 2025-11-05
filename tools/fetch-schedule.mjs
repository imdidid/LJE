#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);

const getArg = (name, fallback = '') => {
  const flag = args.find((item) => item.startsWith(`--${name}`));
  if (!flag) return fallback;
  const [, raw] = flag.split('=');
  return raw !== undefined ? raw : fallback;
};

const API_BASE = 'https://esports-api.lolesports.com/persisted/gw';

const defaultTournaments = [
  'lck_2025_spring',
  'lck_2025_summer',
  'worlds_2025',
  'msi_2025',
  'lck_first_stand_2026'
];

const defaultLeagueIds = [
  '98767991302996019',
  '98767991310872058',
  '98767991314006698',
  '98767991343597634'
];

const apiKey = getArg('api-key', process.env.LOL_ESPORTS_API_KEY || '').trim();
const hl = getArg('hl', 'ko-KR');
const slugFilter = getArg('tournaments', defaultTournaments.join(','))
  .split(',')
  .map((entry) => entry.trim())
  .filter(Boolean);
const leagueFilter = getArg('leagues', defaultLeagueIds.join(','))
  .split(',')
  .map((entry) => entry.trim())
  .filter(Boolean);
const outputPath = getArg('out', path.resolve(fileURLToPath(new URL('../data/schedule.json', import.meta.url))));

if (!apiKey) {
  console.error('[fetch-schedule] Riot Esports API 키가 필요합니다. --api-key 또는 LOL_ESPORTS_API_KEY 환경변수를 설정하세요.');
  process.exit(1);
}

const fetchRiot = async (endpoint, params = {}) => {
  const url = new URL(`${API_BASE}/${endpoint}`);
  url.searchParams.set('hl', hl);
  Object.entries(params).forEach(([key, value]) => {
    if (!value) return;
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

const normaliseStatus = (value) => {
  const lower = (value || '').toLowerCase();
  if (['inprogress', 'in_progress', 'live'].includes(lower)) return 'live';
  if (['completed', 'finished', 'final'].includes(lower)) return 'completed';
  return 'upcoming';
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

const normaliseMatchTeam = (team, rosterMap) => {
  const slug = (team.team?.slug || team.slug || team.code || team.id || '').toLowerCase();
  const profile = slug ? rosterMap.get(slug) : undefined;
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

const normaliseMatch = (event, rosterMap) => ({
  id: event.match?.id || event.id,
  datetime: event.startTime || event.startTimeUTC,
  status: normaliseStatus(event.state || event.match?.state),
  stage: event.blockName || event.bracket?.name || '',
  venue: event.venue?.name || event.venue || '',
  broadcast: event.streams?.[0]?.parameter || event.streams?.[0]?.title || '',
  bestOf: event.match?.strategy?.count || null,
  teams: Array.isArray(event.match?.teams)
    ? event.match.teams.map((team) => normaliseMatchTeam(team, rosterMap))
    : []
});

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

    groups.get(key).matches.push(normaliseMatch(event, rosterMap));
  });

  return Array.from(groups.values()).map((group) => ({
    ...group,
    matches: group.matches.sort(
      (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    )
  }));
};

const fetchRosters = async () => {
  const map = new Map();
  const targets = leagueFilter.length ? leagueFilter : [null];

  for (const leagueId of targets) {
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

const fetchSchedule = async () => {
  const rosterMap = await fetchRosters();
  const events = [];
  const seen = new Set();
  const targets = leagueFilter.length ? leagueFilter : [null];

  for (const leagueId of targets) {
    const payload = await fetchRiot('getSchedule', leagueId ? { leagueId } : {});
    const segment = payload?.data?.schedule?.events ?? [];
    segment.forEach((event) => {
      if (!event?.match || !event?.tournament) return;
      const slug = event.tournament.slug;
      if (slugFilter.length && slug && !slugFilter.includes(slug)) return;
      const id = event.match?.id || event.id;
      if (!id || seen.has(id)) return;
      seen.add(id);
      events.push(event);
    });
  }

  return {
    rosterMap,
    tournaments: buildTournamentData(events, rosterMap)
  };
};

const main = async () => {
  const { rosterMap, tournaments } = await fetchSchedule();

  if (!tournaments.length) {
    console.warn('[fetch-schedule] 선택한 조건에 맞는 경기를 찾지 못했습니다. 필터를 확인하세요.');
  }

  const output = {
    generatedAt: new Date().toISOString(),
    tournaments,
    rosters: Object.fromEntries(Array.from(rosterMap.entries()))
  };

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(output, null, 2), 'utf8');

  console.log(`[@lck-archive] ${tournaments.length}개 대회, ${tournaments.reduce((acc, cur) => acc + cur.matches.length, 0)}경기를 ${outputPath}에 저장했습니다.`);
};

main().catch((error) => {
  console.error('[fetch-schedule] 일정 동기화 중 오류가 발생했습니다.');
  console.error(error);
  process.exit(1);
});
