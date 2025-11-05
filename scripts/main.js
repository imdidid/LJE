const teamCatalog = {
  t1: {
    name: 'T1',
    logo: 'assets/logos/t1.svg',
    region: 'LCK'
  },
  geng: {
    name: 'Gen.G',
    logo: 'assets/logos/gen.svg',
    region: 'LCK'
  },
  dk: {
    name: 'Dplus KIA',
    logo: 'assets/logos/dk.svg',
    region: 'LCK'
  },
  hle: {
    name: 'Hanwha Life',
    logo: 'assets/logos/hle.svg',
    region: 'LCK'
  },
  kt: {
    name: 'KT Rolster',
    logo: 'assets/logos/kt.svg',
    region: 'LCK'
  },
  ns: {
    name: 'Nongshim RedForce',
    logo: 'assets/logos/ns.svg',
    region: 'LCK'
  },
  drx: {
    name: 'DRX',
    logo: 'assets/logos/drx.svg',
    region: 'LCK'
  },
  bro: {
    name: 'OKSavingsBank BRION',
    logo: 'assets/logos/bro.svg',
    region: 'LCK'
  },
  jdg: {
    name: 'JD Gaming',
    logo: 'assets/logos/jdg.svg',
    region: 'LPL'
  },
  blg: {
    name: 'Bilibili Gaming',
    logo: 'assets/logos/blg.svg',
    region: 'LPL'
  },
  fnc: {
    name: 'Fnatic',
    logo: 'assets/logos/fnc.svg',
    region: 'LEC'
  },
  nrg: {
    name: 'NRG',
    logo: 'assets/logos/nrg.svg',
    region: 'LCS'
  }
};

const tournaments = [
  {
    id: 'worlds-2025',
    tag: 'Worlds',
    title: 'World Championship 2025',
    stage: 'Knockout Stage · Seoul',
    matches: [
      {
        id: 'worlds25-qf1',
        datetime: '2025-11-01T18:00:00+09:00',
        venue: '서울 월드 아레나',
        status: 'completed',
        stage: 'Quarterfinal · Match 1',
        teams: [
          {
            id: 't1',
            score: 3,
            roster: [
              'Zeus · TOP',
              'Oner · JGL',
              'Faker · MID',
              'Gumayusi · BOT',
              'Keria · SUP'
            ]
          },
          {
            id: 'jdg',
            score: 1,
            roster: [
              '369 · TOP',
              'Kanavi · JGL',
              'Yagao · MID',
              'Ruler · BOT',
              'Missing · SUP'
            ]
          }
        ]
      },
      {
        id: 'worlds25-qf2',
        datetime: '2025-11-02T19:00:00+09:00',
        venue: '서울 월드 아레나',
        status: 'completed',
        stage: 'Quarterfinal · Match 2',
        teams: [
          {
            id: 'geng',
            score: 2,
            roster: [
              'Doran · TOP',
              'Peanut · JGL',
              'Chovy · MID',
              'Peyz · BOT',
              'Delight · SUP'
            ]
          },
          {
            id: 'blg',
            score: 3,
            roster: [
              'Bin · TOP',
              'Xun · JGL',
              'Knight · MID',
              'Elk · BOT',
              'ON · SUP'
            ]
          }
        ]
      },
      {
        id: 'worlds25-sf1',
        datetime: '2025-11-09T18:30:00+09:00',
        venue: '고척 스카이돔',
        status: 'upcoming',
        stage: 'Semifinal · Upper Bracket',
        teams: [
          {
            id: 't1',
            roster: [
              'Zeus · TOP',
              'Oner · JGL',
              'Faker · MID',
              'Gumayusi · BOT',
              'Keria · SUP'
            ]
          },
          {
            id: 'blg',
            roster: [
              'Bin · TOP',
              'Xun · JGL',
              'Knight · MID',
              'Elk · BOT',
              'ON · SUP'
            ]
          }
        ]
      },
      {
        id: 'worlds25-sf2',
        datetime: '2025-11-10T19:30:00+09:00',
        venue: '고척 스카이돔',
        status: 'live',
        stage: 'Semifinal · Lower Bracket',
        teams: [
          {
            id: 'dk',
            roster: [
              'Canna · TOP',
              'Lucid · JGL',
              'ShowMaker · MID',
              'Deft · BOT',
              'BeryL · SUP'
            ]
          },
          {
            id: 'fnc',
            roster: [
              'Oscarinin · TOP',
              'Razork · JGL',
              'Humanoid · MID',
              'Noah · BOT',
              'Jun · SUP'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'msi-2025',
    tag: 'MSI',
    title: 'Mid-Season Invitational 2025',
    stage: 'Off-Season Showdown · Pusan eStadium',
    matches: [
      {
        id: 'msi25-showcase1',
        datetime: '2025-11-16T17:00:00+09:00',
        venue: '부산 e스포츠 경기장',
        status: 'upcoming',
        stage: 'Showcase Series · Match 1',
        teams: [
          {
            id: 'geng',
            roster: [
              'Doran · TOP',
              'Peanut · JGL',
              'Chovy · MID',
              'Peyz · BOT',
              'Delight · SUP'
            ]
          },
          {
            id: 'fnc',
            roster: [
              'Oscarinin · TOP',
              'Razork · JGL',
              'Humanoid · MID',
              'Noah · BOT',
              'Jun · SUP'
            ]
          }
        ]
      },
      {
        id: 'msi25-showcase2',
        datetime: '2025-11-17T19:00:00+09:00',
        venue: '부산 e스포츠 경기장',
        status: 'upcoming',
        stage: 'Showcase Series · Match 2',
        teams: [
          {
            id: 't1',
            roster: [
              'Zeus · TOP',
              'Oner · JGL',
              'Faker · MID',
              'Gumayusi · BOT',
              'Keria · SUP'
            ]
          },
          {
            id: 'nrg',
            roster: [
              'Dhokla · TOP',
              'Contractz · JGL',
              'Palafox · MID',
              'FBI · BOT',
              'IgNar · SUP'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'first-stand-2026',
    tag: 'First Stand',
    title: 'LCK First Stand 2026',
    stage: 'Preseason LAN · LoL PARK',
    matches: [
      {
        id: 'firststand26-opener',
        datetime: '2025-11-23T15:00:00+09:00',
        venue: '롤파크',
        status: 'upcoming',
        stage: 'Opening Night',
        teams: [
          {
            id: 'hle',
            roster: [
              'Kiin · TOP',
              'Clid · JGL',
              'Zeka · MID',
              'Viper · BOT',
              'Life · SUP'
            ]
          },
          {
            id: 'kt',
            roster: [
              'DuDu · TOP',
              'Pyosik · JGL',
              'Bdd · MID',
              'Aiming · BOT',
              'Lehends · SUP'
            ]
          }
        ]
      },
      {
        id: 'firststand26-main',
        datetime: '2025-11-24T18:00:00+09:00',
        venue: '롤파크',
        status: 'upcoming',
        stage: 'Main Card',
        teams: [
          {
            id: 'dk',
            roster: [
              'Canna · TOP',
              'Lucid · JGL',
              'ShowMaker · MID',
              'Deft · BOT',
              'BeryL · SUP'
            ]
          },
          {
            id: 'ns',
            roster: [
              'DnDn · TOP',
              'Sylvie · JGL',
              'Juhl · MID',
              'FIESTA · BOT',
              'Peter · SUP'
            ]
          }
        ]
      }
    ]
  }
];

const boardElement = document.querySelector('[data-schedule-board]');
const navList = document.querySelector('[data-tournament-nav]');

const formatDateLabel = (isoString) => {
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul'
  });

  return formatter
    .format(new Date(isoString))
    .replace(/\.\s/g, '.')
    .replace(/\s/g, '')
    .replace(/\.$/, '');
};

const formatTimeLabel = (isoString) => {
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul'
  });

  return formatter
    .format(new Date(isoString))
    .replace(/\./g, ':')
    .replace(/:\s?/g, ':');
};

const formatScoreline = (teams) => {
  const [home, away] = teams;

  if (typeof home.score === 'number' && typeof away.score === 'number') {
    return `${home.score} - ${away.score}`;
  }

  return 'VS';
};

const statusLabel = (status) => {
  switch (status) {
    case 'live':
      return 'LIVE';
    case 'completed':
      return '종료';
    default:
      return '예정';
  }
};

const resolveTeam = (id) => teamCatalog[id] ?? { name: id.toUpperCase(), logo: '', region: '' };

const buildRosterTeam = (matchTeam, score) => {
  const teamInfo = resolveTeam(matchTeam.id);
  const container = document.createElement('article');
  container.className = 'roster-team';

  const header = document.createElement('header');
  const name = document.createElement('strong');
  name.textContent = teamInfo.name;
  header.appendChild(name);

  const label = document.createElement('span');
  label.className = 'team-label';

  const details = [];
  if (teamInfo.region) {
    details.push(teamInfo.region);
  }
  if (typeof score === 'number') {
    details.push(`${score}점`);
  }
  label.textContent = details.join(' · ');
  header.appendChild(label);

  container.appendChild(header);

  const list = document.createElement('ul');
  list.className = 'player-list';

  matchTeam.roster.forEach((player) => {
    const item = document.createElement('li');
    item.textContent = player;
    list.appendChild(item);
  });

  container.appendChild(list);
  return container;
};

const collapseAll = (exclude) => {
  document.querySelectorAll('.match-item').forEach((item) => {
    if (exclude && item === exclude) {
      return;
    }

    const button = item.querySelector('.match-summary');
    const panel = item.querySelector('.roster-panel');

    if (button && panel && button.getAttribute('aria-expanded') === 'true') {
      button.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
    }
  });
};

const attachMatchToggle = (matchElement) => {
  const button = matchElement.querySelector('.match-summary');
  const panel = matchElement.querySelector('.roster-panel');

  if (!button || !panel) {
    return;
  }

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';

    if (expanded) {
      button.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
      return;
    }

    collapseAll(matchElement);
    button.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
};

const populateMatch = (match, template) => {
  const fragment = template.content.cloneNode(true);
  const item = fragment.querySelector('.match-item');

  if (!item) {
    return null;
  }

  const button = item.querySelector('.match-summary');
  const dateEl = item.querySelector('.match-date');
  const timeEl = item.querySelector('.match-time');
  const scoreEl = item.querySelector('.scoreline');
  const venueEl = item.querySelector('.venue');
  const statusPill = item.querySelector('.status-pill');
  const rosterPanel = item.querySelector('.roster-panel');
  const rosterGrid = item.querySelector('.roster-grid');

  if (button) {
    button.dataset.matchId = match.id;
  }

  if (dateEl) {
    dateEl.textContent = formatDateLabel(match.datetime);
  }

  if (timeEl) {
    timeEl.textContent = formatTimeLabel(match.datetime);
  }

  if (scoreEl) {
    scoreEl.textContent = formatScoreline(match.teams);
  }

  if (venueEl) {
    venueEl.textContent = `${match.stage} · ${match.venue}`;
  }

  if (statusPill) {
    statusPill.textContent = statusLabel(match.status);
    statusPill.dataset.status = match.status;
  }

  const [homeTeam, awayTeam] = match.teams.map((team) => ({
    ...team,
    info: resolveTeam(team.id)
  }));

  const homeNode = item.querySelector('.match-team[data-side="home"]');
  const awayNode = item.querySelector('.match-team[data-side="away"]');

  if (homeNode) {
    const img = homeNode.querySelector('img');
    const label = homeNode.querySelector('.team-name');

    if (img) {
      img.src = homeTeam.info.logo;
      img.alt = `${homeTeam.info.name} 로고`;
      img.width = 40;
      img.height = 40;
    }

    if (label) {
      label.textContent = homeTeam.info.name;
    }
  }

  if (awayNode) {
    const img = awayNode.querySelector('img');
    const label = awayNode.querySelector('.team-name');

    if (img) {
      img.src = awayTeam.info.logo;
      img.alt = `${awayTeam.info.name} 로고`;
      img.width = 40;
      img.height = 40;
    }

    if (label) {
      label.textContent = awayTeam.info.name;
    }
  }

  if (rosterPanel && rosterGrid) {
    rosterGrid.innerHTML = '';
    rosterGrid.appendChild(buildRosterTeam(homeTeam, homeTeam.score));
    rosterGrid.appendChild(buildRosterTeam(awayTeam, awayTeam.score));
  }

  attachMatchToggle(item);
  return fragment;
};

const renderMatches = (matchListElement, matches, matchTemplate) => {
  const sorted = [...matches].sort(
    (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
  );

  sorted.forEach((match) => {
    const node = populateMatch(match, matchTemplate);
    if (node) {
      matchListElement.appendChild(node);
    }
  });
};

const renderTournament = (tournament, template, matchTemplate) => {
  const fragment = template.content.cloneNode(true);
  const section = fragment.querySelector('.tournament-section');

  if (!section) {
    return null;
  }

  section.id = tournament.id;

  const tag = section.querySelector('.tournament-tag');
  const title = section.querySelector('.tournament-title');
  const stage = section.querySelector('.tournament-stage');
  const list = section.querySelector('[data-match-list]');

  if (tag) {
    tag.textContent = tournament.tag;
  }

  if (title) {
    title.textContent = tournament.title;
  }

  if (stage) {
    stage.textContent = tournament.stage;
  }

  if (list && matchTemplate) {
    list.innerHTML = '';
    renderMatches(list, tournament.matches, matchTemplate);
  }

  return fragment;
};

const renderBoard = () => {
  if (!boardElement) {
    return;
  }

  const tournamentTemplate = document.getElementById('tournament-template');
  const matchTemplate = document.getElementById('match-template');

  if (!(tournamentTemplate instanceof HTMLTemplateElement) || !(matchTemplate instanceof HTMLTemplateElement)) {
    return;
  }

  boardElement.innerHTML = '';

  tournaments.forEach((tournament) => {
    const node = renderTournament(tournament, tournamentTemplate, matchTemplate);
    if (node) {
      boardElement.appendChild(node);
    }
  });
};

const renderNav = () => {
  if (!navList) {
    return;
  }

  navList.innerHTML = '';
  tournaments.forEach((tournament, index) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${tournament.id}`;
    link.textContent = tournament.tag;
    link.className = 'nav-link';
    if (index === 0) {
      link.classList.add('is-active');
    }
    link.addEventListener('click', () => {
      navList.querySelectorAll('.nav-link').forEach((anchor) => anchor.classList.remove('is-active'));
      link.classList.add('is-active');
    });
    item.appendChild(link);
    navList.appendChild(item);
  });
};

const initObserver = () => {
  const sections = document.querySelectorAll('.tournament-section');
  if (!sections.length || !navList) {
    return;
  }

  const anchors = Array.from(navList.querySelectorAll('.nav-link'));
  if (!anchors.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anchors.forEach((anchor) => {
            if (anchor.hash === `#${entry.target.id}`) {
              anchor.classList.add('is-active');
            } else {
              anchor.classList.remove('is-active');
            }
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -40% 0px'
    }
  );

  sections.forEach((section) => observer.observe(section));
};

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderBoard();
  initObserver();
});
