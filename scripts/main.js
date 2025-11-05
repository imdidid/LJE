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
    stage: 'Regular Season Week 4',
    status: 'completed',
    teams: [
      { id: 't1', score: 2 },
      { id: 'dk', score: 1 },
    ],
    badges: [
      { tone: 'accent', label: 'Match of the Day' },
      { tone: '', label: 'Final' },
    ],
  },
  {
    id: '2024-spring-week4-gen-hle',
    kickoff: '2024-03-13T20:30',
    dateLabel: '2024.03.13',
    timeLabel: '20:30 KST',
    venue: '롤파크',
    stage: 'Regular Season Week 4',
    status: 'upcoming',
    teams: [
      { id: 'geng' },
      { id: 'hle' },
    ],
    badges: [{ tone: 'warning', label: 'Live Soon' }],
  },
  {
    id: '2024-spring-week5-kt-ns',
    kickoff: '2024-03-15T17:00',
    dateLabel: '2024.03.15',
    timeLabel: '17:00 KST',
    venue: '롤파크',
    stage: 'Regular Season Week 5',
    status: 'upcoming',
    teams: [
      { id: 'kt' },
      { id: 'ns' },
    ],
    badges: [{ tone: '', label: 'Upcoming' }],
  },
  {
    id: '2024-spring-week5-drx-bro',
    kickoff: '2024-03-16T19:30',
    dateLabel: '2024.03.16',
    timeLabel: '19:30 KST',
    venue: '롤파크',
    stage: 'Regular Season Week 5',
    status: 'upcoming',
    teams: [
      { id: 'drx' },
      { id: 'bro' },
    ],
    badges: [{ tone: '', label: 'Upcoming' }],
  },
];

const rosterData = [
  {
    role: 'Top',
    name: 'Zeus · 최우제',
    badge: 'MVP Candidate',
    birth: '2004.01.31',
    stats: [
      { label: 'KDA', value: '5.6' },
      { label: 'DPM', value: '621' },
      { label: 'KP%', value: '62%' },
    ],
    note: '솔로 라인 주도권과 한타 포지셔닝 모두에서 상위권 지표를 유지하고 있습니다.',
  },
  {
    role: 'Jungle',
    name: 'Oner · 문현준',
    badge: 'Playmaker',
    birth: '2002.12.24',
    stats: [
      { label: 'KDA', value: '4.8' },
      { label: 'CS/M', value: '5.6' },
      { label: 'KP%', value: '71%' },
    ],
    note: '초반 주도권 설계와 오브젝트 타이밍 조율이 돋보이는 정글러입니다.',
  },
  {
    role: 'Mid',
    name: 'Faker · 이상혁',
    badge: 'Legend',
    birth: '1996.05.07',
    stats: [
      { label: 'KDA', value: '6.3' },
      { label: 'DMG%', value: '29%' },
      { label: 'KP%', value: '68%' },
    ],
    note: '중반 교전과 시야 장악에서 흐름을 전환하는 플레이로 여전히 팀의 중심을 맡고 있습니다.',
  },
  {
    role: 'ADC',
    name: 'Gumayusi · 이민형',
    badge: 'Clutch',
    birth: '2002.02.06',
    stats: [
      { label: 'KDA', value: '5.9' },
      { label: 'CS/M', value: '10.2' },
      { label: 'KP%', value: '64%' },
    ],
    note: '한타에서의 포지셔닝과 클러치 딜링으로 승부처를 만들어내는 주력 딜러입니다.',
  },
  {
    role: 'Support',
    name: 'Keria · 류민석',
    badge: 'Shotcaller',
    birth: '2002.10.14',
    stats: [
      { label: 'KDA', value: '7.1' },
      { label: 'VS/M', value: '3.8' },
      { label: 'KP%', value: '74%' },
    ],
    note: '라인전 주도권과 팀 콜을 동시에 책임지며 한타의 밑그림을 그립니다.',
  },
];

const initNavigation = () => {
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('main section');

  if (sections.length > 0) {
    const firstSection = sections[0];
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${firstSection.id}`;
      link.classList.toggle('active', isActive);
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              const isActive = link.getAttribute('href') === `#${id}`;
              link.classList.toggle('active', isActive);
            });
          }
        });
      },
      {
        threshold: 0.45,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        event.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks.forEach((navLink) => {
          const isActive = navLink === link;
          navLink.classList.toggle('active', isActive);
        });
      }
    });
  });
};

const parseKickoff = (kickoff) => new Date(`${kickoff}:00+09:00`);

const buildMatchLabel = (match) => {
  const [home, away] = match.teams.map((team) => teamCatalog[team.id]?.name ?? team.id.toUpperCase());

  if (match.status === 'completed' && match.teams[0].score != null && match.teams[1].score != null) {
    return `${home} ${match.teams[0].score}대${match.teams[1].score} ${away}`;
  }

  const statusLabel = match.status === 'upcoming' ? '예정 경기' : '진행 중 경기';
  return `${home} 대 ${away} ${statusLabel}`;
};

const renderSchedule = () => {
  const container = document.querySelector('[data-schedule]');
  if (!container) return;

  const sortedMatches = [...matchFeed].sort((a, b) => parseKickoff(b.kickoff) - parseKickoff(a.kickoff));
  container.innerHTML = '';

  sortedMatches.forEach((match) => {
    const item = document.createElement('li');
    item.className = 'match-feed-item';
    item.dataset.status = match.status;

    const timeBlock = document.createElement('div');
    timeBlock.className = 'match-feed-time';

    const dateSpan = document.createElement('span');
    dateSpan.className = 'date';
    dateSpan.textContent = match.dateLabel;

    const timeSpan = document.createElement('span');
    timeSpan.className = 'time';
    timeSpan.textContent = match.timeLabel;

    timeBlock.appendChild(dateSpan);
    timeBlock.appendChild(timeSpan);

    const body = document.createElement('div');
    body.className = 'match-feed-body';
    body.setAttribute('aria-label', buildMatchLabel(match));

    match.teams.forEach((team, index) => {
      const teamInfo = teamCatalog[team.id];
      const teamElement = document.createElement('div');
      teamElement.className = 'team';

      if (teamInfo?.logo) {
        const logo = document.createElement('img');
        logo.src = teamInfo.logo;
        logo.alt = `${teamInfo.name} 로고`;
        teamElement.appendChild(logo);
      }

      const nameSpan = document.createElement('span');
      nameSpan.className = 'team-name';
      nameSpan.textContent = teamInfo?.name ?? team.id.toUpperCase();
      teamElement.appendChild(nameSpan);

      body.appendChild(teamElement);

      if (index === 0) {
        const scoreline = document.createElement('div');
        scoreline.className = 'scoreline';

        if (match.status === 'completed' && match.teams[0].score != null && match.teams[1].score != null) {
          const homeScore = document.createElement('span');
          homeScore.className = 'score';
          homeScore.textContent = String(match.teams[0].score);

          const divider = document.createElement('span');
          divider.className = 'divider';
          divider.textContent = '-';

          const awayScore = document.createElement('span');
          awayScore.className = 'score';
          awayScore.textContent = String(match.teams[1].score);

          scoreline.appendChild(homeScore);
          scoreline.appendChild(divider);
          scoreline.appendChild(awayScore);
        } else {
          scoreline.classList.add(match.status === 'upcoming' ? 'upcoming' : 'live');
          scoreline.setAttribute('aria-hidden', 'true');

          const versus = document.createElement('span');
          versus.className = 'versus';
          versus.textContent = match.status === 'upcoming' ? 'VS' : 'LIVE';
          scoreline.appendChild(versus);
        }

        body.appendChild(scoreline);
      }
    });

    const meta = document.createElement('div');
    meta.className = 'match-feed-meta';

    const venue = document.createElement('span');
    venue.className = 'venue';
    venue.textContent = match.venue;
    meta.appendChild(venue);

    (match.badges ?? []).forEach((badge) => {
      const badgeSpan = document.createElement('span');
      badgeSpan.className = 'status-badge';
      if (badge.tone) {
        badgeSpan.classList.add(badge.tone);
      }
      badgeSpan.textContent = badge.label;
      meta.appendChild(badgeSpan);
    });

    const stage = document.createElement('span');
    stage.className = 'stage';
    stage.textContent = match.stage;
    meta.appendChild(stage);

    item.appendChild(timeBlock);
    item.appendChild(body);
    item.appendChild(meta);

    container.appendChild(item);
  });
};

const renderRoster = () => {
  const container = document.querySelector('[data-roster]');
  if (!container) return;

  container.innerHTML = '';

  const cards = rosterData.map((player) => {
    const card = document.createElement('article');
    card.className = 'player-card';
    card.dataset.player = player.role.toLowerCase();
    card.dataset.open = 'false';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'player-trigger';
    trigger.setAttribute('aria-expanded', 'false');

    const triggerContent = document.createElement('div');
    triggerContent.className = 'trigger-content';

    const roleSpan = document.createElement('span');
    roleSpan.className = 'player-role';
    roleSpan.textContent = player.role;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'player-name';
    nameSpan.textContent = player.name;

    triggerContent.appendChild(roleSpan);
    triggerContent.appendChild(nameSpan);

    const triggerMeta = document.createElement('div');
    triggerMeta.className = 'trigger-meta';

    const playerMeta = document.createElement('div');
    playerMeta.className = 'player-meta';

    if (player.badge) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = player.badge;
      playerMeta.appendChild(badge);
    }

    if (player.birth) {
      const birth = document.createElement('span');
      birth.textContent = player.birth;
      playerMeta.appendChild(birth);
    }

    triggerMeta.appendChild(playerMeta);

    const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chevron.setAttribute('class', 'chevron');
    chevron.setAttribute('viewBox', '0 0 12 8');
    chevron.setAttribute('aria-hidden', 'true');
    chevron.setAttribute('focusable', 'false');

    const chevronPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    chevronPath.setAttribute('d', 'M1 1.5 6 6.5 11 1.5');
    chevronPath.setAttribute('stroke', 'currentColor');
    chevronPath.setAttribute('stroke-width', '1.6');
    chevronPath.setAttribute('stroke-linecap', 'round');
    chevronPath.setAttribute('stroke-linejoin', 'round');

    chevron.appendChild(chevronPath);
    triggerMeta.appendChild(chevron);

    trigger.appendChild(triggerContent);
    trigger.appendChild(triggerMeta);

    const details = document.createElement('div');
    details.className = 'player-details';
    details.setAttribute('hidden', '');

    const statsWrapper = document.createElement('div');
    statsWrapper.className = 'player-stats';

    player.stats.forEach((stat) => {
      const statBlock = document.createElement('div');
      statBlock.className = 'stat';

      const label = document.createElement('span');
      label.textContent = stat.label;

      const value = document.createElement('span');
      value.textContent = stat.value;

      statBlock.appendChild(label);
      statBlock.appendChild(value);
      statsWrapper.appendChild(statBlock);
    });

    details.appendChild(statsWrapper);

    if (player.note) {
      const note = document.createElement('p');
      note.className = 'player-note';
      note.textContent = player.note;
      details.appendChild(note);
    }

    card.appendChild(trigger);
    card.appendChild(details);
    container.appendChild(card);

    return { card, trigger, details };
  });

  const setActiveCard = (activeIndex) => {
    cards.forEach((entry, entryIndex) => {
      const shouldOpen = typeof activeIndex === 'number' && entryIndex === activeIndex;
      entry.trigger.setAttribute('aria-expanded', String(shouldOpen));
      if (shouldOpen) {
        entry.details.removeAttribute('hidden');
      } else {
        entry.details.setAttribute('hidden', '');
      }
      entry.card.dataset.open = String(shouldOpen);
    });
  };

  cards.forEach(({ trigger }, index) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      setActiveCard(isExpanded ? null : index);
    });
  });

  if (cards.length > 0) {
    setActiveCard(0);
  }
};

initNavigation();
renderSchedule();
renderRoster();
