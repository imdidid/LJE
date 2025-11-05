#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);

const getArg = (name, fallback) => {
  const match = args.find((arg) => arg.startsWith(`--${name}`));
  if (!match) return fallback;
  const [, raw] = match.split('=');
  return raw ?? fallback;
};

const normaliseStatus = (value = '') => {
  const status = value.toLowerCase();
  if (['completed', 'finished', 'final'].includes(status)) return 'completed';
  if (['inprogress', 'in_progress', 'live'].includes(status)) return 'live';
  return 'upcoming';
};

const language = getArg('hl', 'ko-KR');
const filter = getArg('tournaments', '')
  .split(',')
  .map((entry) => entry.trim())
  .filter(Boolean);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const resolveApi = async () => {
  try {
    const module = await import('lol-esports-api');
    const ApiCtor = module.LolEsportsApi || module.LolEsports || module.default;
    if (typeof ApiCtor === 'function') {
      return new ApiCtor();
    }
    if (module.createClient) {
      return module.createClient();
    }
    throw new Error('lol-esports-api: 지원되는 생성자를 찾을 수 없습니다.');
  } catch (error) {
    console.error('[sync-schedule] lol-esports-api 모듈을 찾거나 초기화하지 못했습니다. README의 설치 단계를 확인하세요.');
    throw error;
  }
};

const extractEvents = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload.events)) return payload.events;
  if (payload.data?.schedule?.events) return payload.data.schedule.events;
  if (payload.schedule?.events) return payload.schedule.events;
  return [];
};

const pickTournamentKey = (event) =>
  event?.tournament?.slug || event?.tournament?.id || event?.league?.slug || event?.league?.id || 'misc';

const pickTag = (event) =>
  event?.tournament?.shortName || event?.tournament?.abbreviation || event?.league?.abbreviation || 'EVENT';

const pickTitle = (event, key) =>
  event?.tournament?.name || event?.tournament?.title || event?.blockName || event?.league?.name || key.toUpperCase();

const pickStage = (event) => event?.bracket?.name || event?.blockName || '';

const buildMatch = (event) => {
  const teams = Array.isArray(event?.match?.teams) ? event.match.teams : [];
  return {
    id: event?.match?.id || event?.id,
    datetime: event?.startTime || event?.startTimeUTC,
    venue: event?.venue?.name || event?.venue || '',
    status: normaliseStatus(event?.state || event?.status),
    stage: pickStage(event),
    broadcast: event?.streams?.[0]?.title || event?.streams?.[0]?.parameter || '',
    teams: teams.map((team) => ({
      id:
        team?.code?.toLowerCase?.() ||
        team?.team?.code?.toLowerCase?.() ||
        team?.slug ||
        team?.id ||
        'unknown',
      score:
        typeof team?.result?.gameWins === 'number'
          ? team.result.gameWins
          : typeof team?.score === 'number'
          ? team.score
          : null,
      roster: []
    }))
  };
};

const main = async () => {
  const client = await resolveApi();

  const scheduleResponse =
    (await client.getSchedule?.({ hl: language })) ||
    (await client.schedule?.get?.({ hl: language })) ||
    (await client.getSchedule?.(language));

  const events = extractEvents(scheduleResponse);

  if (!events.length) {
    console.error('[sync-schedule] 이벤트를 찾지 못했습니다. lol-esports-api 버전을 확인하세요.');
    return;
  }

  const tournaments = new Map();

  events.forEach((event) => {
    if (!event?.match) return;
    const key = pickTournamentKey(event);
    if (filter.length && !filter.includes(key)) return;

    if (!tournaments.has(key)) {
      tournaments.set(key, {
        id: key,
        tag: pickTag(event),
        title: pickTitle(event, key),
        stage: pickStage(event),
        matches: []
      });
    }

    tournaments.get(key).matches.push(buildMatch(event));
  });

  const output = {
    tournaments: Array.from(tournaments.values()).map((tournament) => ({
      ...tournament,
      matches: tournament.matches.sort(
        (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
      )
    }))
  };

  const outputDir = path.resolve(__dirname, '../data');
  await fs.mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, 'schedule.json');
  await fs.writeFile(outputPath, JSON.stringify(output, null, 2), 'utf8');

  console.log(`[@lck-archive] ${output.tournaments.length}개 대회를 ${outputPath}에 저장했습니다.`);
};

main().catch((error) => {
  console.error('[sync-schedule] 오류가 발생했습니다.');
  console.error(error);
  process.exitCode = 1;
});
