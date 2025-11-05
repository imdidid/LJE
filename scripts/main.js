const seasonLabel = '2024 Spring';

const teamCatalog = {
  t1: { name: 'T1', logo: 'assets/logos/t1.svg' },
  dk: { name: 'DK', logo: 'assets/logos/dk.svg' },
  geng: { name: 'Gen.G', logo: 'assets/logos/gen.svg' },
  hle: { name: 'HLE', logo: 'assets/logos/hle.svg' },
  kt: { name: 'KT', logo: 'assets/logos/kt.svg' },
  ns: { name: 'NS', logo: 'assets/logos/ns.svg' },
  drx: { name: 'DRX', logo: 'assets/logos/drx.svg' },
  bro: { name: 'BRO', logo: 'assets/logos/bro.svg' },
};

const matchFeed = [
  {
    id: '2024-spring-week4-t1-dk',
    kickoff: '2024-03-12T18:00',
    dateLabel: '2024.03.12',
    timeLabel: '18:00 KST',
    venue: '롤파크',
    stage: '정규시즌 4주차',
    status: 'completed',
    teams: [
      { id: 't1', score: 2 },
      { id: 'dk', score: 1 },
    ],
  },
  {
    id: '2024-spring-week4-gen-hle',
    kickoff: '2024-03-13T20:30',
    dateLabel: '2024.03.13',
    timeLabel: '20:30 KST',
    venue: '롤파크',
    stage: '정규시즌 4주차',
    status: 'upcoming',
    teams: [
      { id: 'geng' },
      { id: 'hle' },
    ],
  },
  {
    id: '2024-spring-week5-kt-ns',
    kickoff: '2024-03-15T17:00',
    dateLabel: '2024.03.15',
    timeLabel: '17:00 KST',
    venue: '롤파크',
    stage: '정규시즌 5주차',
    status: 'upcoming',
    teams: [
      { id: 'kt' },
      { id: 'ns' },
    ],
  },
  {
    id: '2024-spring-week5-drx-bro',
    kickoff: '2024-03-16T19:30',
    dateLabel: '2024.03.16',
    timeLabel: '19:30 KST',
    venue: '롤파크',
    stage: '정규시즌 5주차',
    status: 'upcoming',
    teams: [
      { id: 'drx' },
      { id: 'bro' },
    ],
  },
];

const parseKickoff = (kickoff) => new Date(`${kickoff}:00+09:00`);

const formatScore = (teams, status) => {
  const [home, away] = teams;

  if (status === 'completed' && home.score != null && away.score != null) {
    return `${home.score} : ${away.score}`;
  }

  return 'vs';
};

const resolveTeam = (team) => teamCatalog[team.id] ?? { name: team.id.toUpperCase(), logo: '' };

const populateMatch = (element, match) => {
  const [homeTeam, awayTeam] = match.teams.map(resolveTeam);

  element.querySelector('.date').textContent = match.dateLabel;
  element.querySelector('.time').textContent = match.timeLabel;

  const home = element.querySelector('.team-home');
  const away = element.querySelector('.team-away');

  const homeImg = home.querySelector('img');
  homeImg.src = homeTeam.logo;
  homeImg.width = 36;
  homeImg.height = 36;
  homeImg.alt = `${homeTeam.name} 로고`;
  home.querySelector('.team-name').textContent = homeTeam.name;

  const awayImg = away.querySelector('img');
  awayImg.src = awayTeam.logo;
  awayImg.width = 36;
  awayImg.height = 36;
  awayImg.alt = `${awayTeam.name} 로고`;
  away.querySelector('.team-name').textContent = awayTeam.name;

  element.querySelector('.score').textContent = formatScore(match.teams, match.status);

  const stage = element.querySelector('.stage');
  stage.textContent = match.stage;

  const venue = element.querySelector('.venue');
  venue.textContent = match.venue;

  const status = element.querySelector('.status');
  status.textContent = match.status === 'completed' ? '종료' : '예정';
  status.dataset.status = match.status;

  element.setAttribute('data-kickoff', match.kickoff);
};

const renderMatches = () => {
  const list = document.querySelector('[data-schedule]');
  const template = document.getElementById('schedule-item-template');

  if (!list || !(template instanceof HTMLTemplateElement)) {
    return;
  }

  list.innerHTML = '';

  const sorted = [...matchFeed].sort(
    (a, b) => parseKickoff(a.kickoff) - parseKickoff(b.kickoff)
  );

  sorted.forEach((match) => {
    const fragment = template.content.cloneNode(true);
    const item = fragment.querySelector('.match-item');

    if (item) {
      populateMatch(item, match);
      list.appendChild(fragment);
    }
  });
};

const setSeasonLabel = () => {
  const label = document.querySelector('[data-season-label]');
  if (label) {
    label.textContent = seasonLabel;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  setSeasonLabel();
  renderMatches();
});
