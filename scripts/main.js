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
        broadcast: '월드 챔피언십 메인 중계',
        teams: [
          {
            id: 't1',
            score: 3,
            roster: ['Zeus · TOP', 'Oner · JGL', 'Faker · MID', 'Gumayusi · BOT', 'Keria · SUP']
          },
          {
            id: 'jdg',
            score: 1,
            roster: ['369 · TOP', 'Kanavi · JGL', 'Yagao · MID', 'Ruler · BOT', 'Missing · SUP']
          }
        ]
      },
      {
        id: 'worlds25-qf2',
        datetime: '2025-11-02T19:00:00+09:00',
        venue: '서울 월드 아레나',
        status: 'completed',
        stage: 'Quarterfinal · Match 2',
        broadcast: '월드 챔피언십 메인 중계',
        teams: [
          {
            id: 'geng',
            score: 2,
            roster: ['Doran · TOP', 'Peanut · JGL', 'Chovy · MID', 'Peyz · BOT', 'Delight · SUP']
          },
          {
            id: 'blg',
            score: 3,
            roster: ['Bin · TOP', 'Xun · JGL', 'Knight · MID', 'Elk · BOT', 'ON · SUP']
          }
        ]
      },
      {
        id: 'worlds25-sf1',
        datetime: '2025-11-09T18:30:00+09:00',
        venue: '고척 스카이돔',
        status: 'upcoming',
        stage: 'Semifinal · Upper Bracket',
        broadcast: 'Best of 5',
        teams: [
          {
            id: 't1',
            roster: ['Zeus · TOP', 'Oner · JGL', 'Faker · MID', 'Gumayusi · BOT', 'Keria · SUP']
          },
          {
            id: 'blg',
            roster: ['Bin · TOP', 'Xun · JGL', 'Knight · MID', 'Elk · BOT', 'ON · SUP']
          }
        ]
      },
      {
        id: 'worlds25-sf2',
        datetime: '2025-11-10T19:30:00+09:00',
        venue: '고척 스카이돔',
        status: 'live',
        stage: 'Semifinal · Lower Bracket',
        broadcast: 'Best of 5',
        teams: [
          {
            id: 'dk',
            roster: ['Canna · TOP', 'Lucid · JGL', 'ShowMaker · MID', 'Deft · BOT', 'BeryL · SUP']
          },
          {
            id: 'fnc',
            roster: ['Oscarinin · TOP', 'Razork · JGL', 'Humanoid · MID', 'Noah · BOT', 'Jun · SUP']
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
        broadcast: 'Best of 5 · 공식 중계',
        teams: [
          {
            id: 'geng',
            roster: ['Doran · TOP', 'Peanut · JGL', 'Chovy · MID', 'Peyz · BOT', 'Delight · SUP']
          },
          {
            id: 'fnc',
            roster: ['Oscarinin · TOP', 'Razork · JGL', 'Humanoid · MID', 'Noah · BOT', 'Jun · SUP']
          }
        ]
      },
      {
        id: 'msi25-showcase2',
        datetime: '2025-11-17T19:00:00+09:00',
        venue: '부산 e스포츠 경기장',
        status: 'upcoming',
        stage: 'Showcase Series · Match 2',
        broadcast: 'Best of 5 · 공식 중계',
        teams: [
          {
            id: 't1',
            roster: ['Zeus · TOP', 'Oner · JGL', 'Faker · MID', 'Gumayusi · BOT', 'Keria · SUP']
          },
          {
            id: 'nrg',
            roster: ['Dhokla · TOP', 'Contractz · JGL', 'Palafox · MID', 'FBI · BOT', 'IgNar · SUP']
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
        broadcast: '3전 2선승 · 현장 생중계',
        teams: [
          {
            id: 'hle',
            roster: ['Kiin · TOP', 'Clid · JGL', 'Zeka · MID', 'Viper · BOT', 'Life · SUP']
          },
          {
            id: 'kt',
            roster: ['DuDu · TOP', 'Pyosik · JGL', 'Bdd · MID', 'Aiming · BOT', 'Lehends · SUP']
          }
        ]
      },
      {
        id: 'firststand26-main',
        datetime: '2025-11-24T18:00:00+09:00',
        venue: '롤파크',
        status: 'upcoming',
        stage: 'Main Card',
        broadcast: '3전 2선승 · 현장 생중계',
        teams: [
          {
            id: 'dk',
            roster: ['Canna · TOP', 'Lucid · JGL', 'ShowMaker · MID', 'Deft · BOT', 'BeryL · SUP']
          },
          {
            id: 'ns',
            roster: ['DnDn · TOP', 'Sylvie · JGL', 'Juhl · MID', 'FIESTA · BOT', 'Peter · SUP']
          }
        ]
      }
    ]
  }
];

const boardElement = document.querySelector('[data-schedule-board]');
const navList = document.querySelector('[data-tournament-nav]');
const bannerElement = document.querySelector('[data-date-banner]');
const controlButtons = document.querySelectorAll('[data-scroll]');

const toDate = (value) => new Date(value);

const formatTime = (value) => {
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul'
  });
  return formatter.format(toDate(value)).replace(/\./g, ':').replace(/:\s?/g, ':');
};

const formatDate = (value) => {
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    timeZone: 'Asia/Seoul'
  });

  const output = formatter.format(toDate(value)).replace(/\.\s/g, '.');
  const [md, weekday] = output.split('(');
  return `${md} · ${weekday.replace(')', '')}`;
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

const scoreLabel = (teams) => {
  const [home, away] = teams;
  if (typeof home.score === 'number' && typeof away.score === 'number') {
    return `${home.score} - ${away.score}`;
  }
  return 'VS';
};

const resolveTeam = (id) => teamCatalog[id] ?? { name: id.toUpperCase(), logo: '', region: '' };

const setBannerDate = () => {
  if (!bannerElement) return;

  const now = new Date('2025-11-10T12:00:00+09:00');
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
    timeZone: 'Asia/Seoul'
  });

  const [datePart, weekday] = formatter
    .format(now)
    .replace(/\.\s/g, '.')
    .replace(/\s/g, '')
    .split('(');

  const dayNode = bannerElement.querySelector('.masthead__day');
  const focusNode = bannerElement.querySelector('.masthead__focus');

  if (dayNode) {
    dayNode.textContent = datePart ?? '2025.11.10';
  }

  if (focusNode) {
    focusNode.textContent = `${weekday?.replace(')', '') ?? '월요일'} 하이라이트`;
  }
};

const collapseAll = (exclude) => {
  document.querySelectorAll('.matchcard').forEach((card) => {
    if (exclude && card === exclude) return;

    const trigger = card.querySelector('.matchcard__trigger');
    const drawer = card.querySelector('.matchcard__roster');

    if (trigger && drawer && trigger.getAttribute('aria-expanded') === 'true') {
      trigger.setAttribute('aria-expanded', 'false');
      drawer.hidden = true;
      card.classList.remove('is-open');
    }
  });
};

const buildRoster = (teams, template) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'roster';

  teams.forEach((team) => {
    const rosterFragment = template.content.cloneNode(true);
    const article = rosterFragment.querySelector('.roster__team');
    if (!article) return;

    const info = resolveTeam(team.id);
    const name = article.querySelector('.roster__name');
    const note = article.querySelector('.roster__note');
    const list = article.querySelector('.roster__list');

    if (name) {
      name.textContent = info.name;
    }

    if (note) {
      const segments = [];
      if (info.region) segments.push(info.region);
      if (typeof team.score === 'number') segments.push(`${team.score}점`);
      note.textContent = segments.join(' · ');
    }

    if (list) {
      team.roster.forEach((player) => {
        const li = document.createElement('li');
        li.textContent = player;
        list.appendChild(li);
      });
    }

    wrapper.appendChild(rosterFragment);
  });

  return wrapper;
};

const attachToggle = (card) => {
  const trigger = card.querySelector('.matchcard__trigger');
  const drawer = card.querySelector('.matchcard__roster');

  if (!trigger || !drawer) return;

  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';

    if (expanded) {
      trigger.setAttribute('aria-expanded', 'false');
      drawer.hidden = true;
      card.classList.remove('is-open');
      return;
    }

    collapseAll(card);
    trigger.setAttribute('aria-expanded', 'true');
    drawer.hidden = false;
    card.classList.add('is-open');
    drawer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
};

const populateMatch = (match, template, rosterTemplate) => {
  const fragment = template.content.cloneNode(true);
  const entry = fragment.querySelector('.match');
  const card = fragment.querySelector('.matchcard');
  if (!entry || !card) return null;

  const trigger = card.querySelector('.matchcard__trigger');
  const timeEl = card.querySelector('.matchcard__clock');
  const dateEl = card.querySelector('.matchcard__date');
  const statusEl = card.querySelector('.matchcard__status');
  const detailsEl = card.querySelector('.matchcard__details');
  const scoreEl = card.querySelector('.matchcard__score');
  const drawer = card.querySelector('.matchcard__roster');

  if (trigger) {
    trigger.dataset.matchId = match.id;
  }

  if (timeEl) timeEl.textContent = formatTime(match.datetime);
  if (dateEl) dateEl.textContent = formatDate(match.datetime);

  if (statusEl) {
    statusEl.textContent = statusLabel(match.status);
    statusEl.dataset.status = match.status;
  }

  if (detailsEl) {
    const fragments = [match.stage, match.broadcast, match.venue].filter(Boolean);
    detailsEl.textContent = fragments.join(' · ');
  }

  if (scoreEl) scoreEl.textContent = scoreLabel(match.teams);

  const [homeTeam, awayTeam] = match.teams.map((team) => ({
    ...team,
    info: resolveTeam(team.id)
  }));

  const homeNode = card.querySelector('.matchcard__team[data-side="home"]');
  const awayNode = card.querySelector('.matchcard__team[data-side="away"]');

  if (homeNode) {
    const img = homeNode.querySelector('img');
    const label = homeNode.querySelector('.matchcard__name');
    if (img) {
      img.src = homeTeam.info.logo;
      img.alt = `${homeTeam.info.name} 로고`;
      img.width = 46;
      img.height = 46;
    }
    if (label) label.textContent = homeTeam.info.name;
  }

  if (awayNode) {
    const img = awayNode.querySelector('img');
    const label = awayNode.querySelector('.matchcard__name');
    if (img) {
      img.src = awayTeam.info.logo;
      img.alt = `${awayTeam.info.name} 로고`;
      img.width = 46;
      img.height = 46;
    }
    if (label) label.textContent = awayTeam.info.name;
  }

  if (drawer && rosterTemplate) {
    drawer.innerHTML = '';
    drawer.appendChild(buildRoster(match.teams, rosterTemplate));
  }

  attachToggle(card);
  return fragment;
};

const renderMatches = (target, matches, matchTemplate, rosterTemplate) => {
  target.innerHTML = '';
  matches
    .slice()
    .sort((a, b) => toDate(a.datetime) - toDate(b.datetime))
    .forEach((match) => {
      const node = populateMatch(match, matchTemplate, rosterTemplate);
      if (node) {
        target.appendChild(node);
      }
    });
};

const renderTournaments = () => {
  if (!boardElement) return;

  const tournamentTemplate = document.getElementById('tournament-template');
  const matchTemplate = document.getElementById('match-template');
  const rosterTemplate = document.getElementById('roster-template');

  if (
    !(tournamentTemplate instanceof HTMLTemplateElement) ||
    !(matchTemplate instanceof HTMLTemplateElement) ||
    !(rosterTemplate instanceof HTMLTemplateElement)
  ) {
    return;
  }

  boardElement.innerHTML = '';

  tournaments.forEach((tournament) => {
    const fragment = tournamentTemplate.content.cloneNode(true);
    const block = fragment.querySelector('.tournament');
    if (!block) return;

    block.id = tournament.id;

    const tag = block.querySelector('.tournament__tag');
    const title = block.querySelector('.tournament__title');
    const stage = block.querySelector('.tournament__stage');
    const list = block.querySelector('[data-match-list]');

    if (tag) tag.textContent = tournament.tag;
    if (title) title.textContent = tournament.title;
    if (stage) stage.textContent = tournament.stage;
    if (list) renderMatches(list, tournament.matches, matchTemplate, rosterTemplate);

    boardElement.appendChild(fragment);
  });
};

const renderNav = () => {
  if (!navList) return;

  navList.innerHTML = '';
  tournaments.forEach((tournament, index) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${tournament.id}`;
    link.textContent = tournament.tag;
    link.className = 'rail__link';
    if (index === 0) link.classList.add('is-active');

    link.addEventListener('click', () => {
      navList.querySelectorAll('.rail__link').forEach((anchor) => anchor.classList.remove('is-active'));
      link.classList.add('is-active');
    });

    item.appendChild(link);
    navList.appendChild(item);
  });
};

const initObserver = () => {
  if (!navList) return;

  const anchors = Array.from(navList.querySelectorAll('.rail__link'));
  const sections = document.querySelectorAll('.tournament');
  if (!anchors.length || !sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        anchors.forEach((anchor) => {
          if (anchor.hash === `#${entry.target.id}`) {
            anchor.classList.add('is-active');
          } else {
            anchor.classList.remove('is-active');
          }
        });
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
};

const bindControls = () => {
  const allCards = Array.from(document.querySelectorAll('.matchcard'));
  if (!allCards.length) return;

  const todayCard = allCards.find((card) => {
    const date = card.querySelector('.matchcard__date');
    return date?.textContent?.includes('11.10');
  });

  const liveCard = allCards.find((card) => card.querySelector('.matchcard__status[data-status="live"]'));
  const upcomingCard = allCards.find((card) => card.querySelector('.matchcard__status[data-status="upcoming"]'));

  controlButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.scroll;
      if (target === 'live' && liveCard) {
        liveCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        liveCard.querySelector('.matchcard__trigger')?.focus();
      } else if (target === 'today' && todayCard) {
        todayCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        todayCard.querySelector('.matchcard__trigger')?.focus();
      } else if (target === 'upcoming' && upcomingCard) {
        upcomingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        upcomingCard.querySelector('.matchcard__trigger')?.focus();
      }
    });
  });
};

const init = () => {
  setBannerDate();
  renderNav();
  renderTournaments();
  initObserver();
  bindControls();
};

document.addEventListener('DOMContentLoaded', init);
