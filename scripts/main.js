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

const seasonLabel = 'Spring 2024';

const getTemplate = (templateId) => {
  const template = document.getElementById(templateId);
  return template instanceof HTMLTemplateElement ? template : null;
};

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

const updateSeasonLabel = () => {
  const seasonNode = document.querySelector('[data-season-label]');
  if (seasonNode) {
    seasonNode.textContent = seasonLabel;
  }
};

const renderSchedule = () => {
  const container = document.querySelector('[data-schedule]');
  if (!container) return;

  const sortedMatches = [...matchFeed].sort((a, b) => parseKickoff(b.kickoff) - parseKickoff(a.kickoff));
  container.innerHTML = '';

  const template = getTemplate('schedule-item-template');

  sortedMatches.forEach((match) => {
    const status = match.status ?? 'scheduled';

    const item = template
      ? template.content.firstElementChild.cloneNode(true)
      : Object.assign(document.createElement('li'), { className: 'match-feed-item' });
    item.dataset.status = status;
    item.dataset.matchId = match.id;

    const timeBlock = item.querySelector('.match-feed-time') ?? document.createElement('div');
    const body = item.querySelector('.match-feed-body') ?? document.createElement('div');
    const meta = item.querySelector('.match-feed-meta') ?? document.createElement('div');

    const baseTeams = Array.from(body.querySelectorAll('.team'));
    const baseScoreline = body.querySelector('.scoreline');

    item.innerHTML = '';
    item.appendChild(timeBlock);
    item.appendChild(body);
    item.appendChild(meta);

    timeBlock.className = 'match-feed-time';
    timeBlock.dataset.kickoff = match.kickoff;
    timeBlock.title = `${match.dateLabel} ${match.timeLabel} · ${match.stage}`;

    const dateSpan = timeBlock.querySelector('.date') ?? timeBlock.appendChild(document.createElement('span'));
    dateSpan.className = 'date';
    dateSpan.textContent = match.dateLabel;

    const timeSpan = timeBlock.querySelector('.time') ?? timeBlock.appendChild(document.createElement('span'));
    timeSpan.className = 'time';
    timeSpan.textContent = match.timeLabel;

    body.className = 'match-feed-body';
    body.setAttribute('aria-label', buildMatchLabel(match));

    body.innerHTML = '';

    const teamElements = match.teams.map((team, index) => {
      const teamInfo = teamCatalog[team.id];
      const teamElement = baseTeams[index] ?? document.createElement('div');
      teamElement.className = 'team';
      teamElement.innerHTML = '';
      teamElement.dataset.team = team.id;

      if (teamInfo?.logo) {
        const logo = document.createElement('img');
        logo.src = teamInfo.logo;
        logo.alt = `${teamInfo.name} 로고`;
        logo.loading = 'lazy';
        teamElement.appendChild(logo);
      }

      const nameSpan = document.createElement('span');
      nameSpan.className = 'team-name';
      nameSpan.textContent = teamInfo?.name ?? team.id.toUpperCase();
      teamElement.appendChild(nameSpan);

      return teamElement;
    });

    const scoreline = baseScoreline ?? document.createElement('div');
    scoreline.className = 'scoreline';
    scoreline.innerHTML = '';
    scoreline.removeAttribute('aria-hidden');

    scoreline.dataset.state = status;

    if (status === 'completed' && match.teams[0].score != null && match.teams[1].score != null) {
      ['score', 'divider', 'score'].forEach((klass, klassIndex) => {
        const span = document.createElement('span');
        span.className = klass;
        if (klass === 'divider') {
          span.textContent = '-';
        } else {
          span.textContent = String(match.teams[klassIndex === 0 ? 0 : 1].score);
        }
        scoreline.appendChild(span);
      });
    } else {
      const visualStatus = status === 'scheduled' ? 'upcoming' : status;
      scoreline.classList.add(visualStatus === 'upcoming' ? 'upcoming' : 'live');
      scoreline.setAttribute('aria-hidden', 'true');

      const versus = document.createElement('span');
      versus.className = 'versus';
      versus.textContent = visualStatus === 'upcoming' ? 'VS' : 'LIVE';
      scoreline.appendChild(versus);
    }

    if (teamElements[0]) {
      body.appendChild(teamElements[0]);
    }
    body.appendChild(scoreline);
    if (teamElements[1]) {
      body.appendChild(teamElements[1]);
    }

    meta.className = 'match-feed-meta';
    meta.innerHTML = '';

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

    container.appendChild(item);
  });
};

const renderRoster = () => {
  const container = document.querySelector('[data-roster]');
  if (!container) return;

  container.innerHTML = '';

  const template = getTemplate('player-card-template');

  const cards = rosterData.map((player, index) => {
    const card = template
      ? template.content.firstElementChild.cloneNode(true)
      : Object.assign(document.createElement('article'), { className: 'player-card' });

    card.dataset.player = player.role.toLowerCase();
    card.dataset.open = 'false';
    card.setAttribute('role', 'listitem');

    const trigger = card.querySelector('.player-trigger') ?? card.appendChild(document.createElement('button'));
    trigger.type = 'button';
    trigger.className = 'player-trigger';
    trigger.setAttribute('aria-expanded', 'false');

    const triggerContent = trigger.querySelector('.trigger-content') ?? trigger.appendChild(document.createElement('div'));
    triggerContent.className = 'trigger-content';

    const roleSpan = triggerContent.querySelector('.player-role') ?? triggerContent.appendChild(document.createElement('span'));
    roleSpan.className = 'player-role';
    roleSpan.textContent = player.role;

    const nameSpan = triggerContent.querySelector('.player-name') ?? triggerContent.appendChild(document.createElement('span'));
    nameSpan.className = 'player-name';
    nameSpan.textContent = player.name;

    const triggerMeta = trigger.querySelector('.trigger-meta') ?? trigger.appendChild(document.createElement('div'));
    triggerMeta.className = 'trigger-meta';

    const playerMeta = triggerMeta.querySelector('.player-meta') ?? triggerMeta.appendChild(document.createElement('div'));
    playerMeta.className = 'player-meta';
    playerMeta.innerHTML = '';

    if (player.badge) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = player.badge;
      playerMeta.appendChild(badge);
    }

    if (player.birth) {
      const birth = document.createElement('span');
      birth.className = 'player-birth';
      birth.textContent = player.birth;
      playerMeta.appendChild(birth);
    }

    const existingChevron = triggerMeta.querySelector('.chevron');
    if (!existingChevron) {
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
    }

    const details = card.querySelector('.player-details') ?? card.appendChild(document.createElement('div'));
    details.className = 'player-details';
    details.setAttribute('hidden', '');
    const detailsId = details.id || `player-details-${index}`;
    details.id = detailsId;
    trigger.setAttribute('aria-controls', detailsId);

    const statsWrapper = details.querySelector('.player-stats') ?? details.appendChild(document.createElement('div'));
    statsWrapper.className = 'player-stats';
    statsWrapper.innerHTML = '';

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

    let note = details.querySelector('.player-note');
    if (player.note) {
      if (!note) {
        note = document.createElement('p');
        note.className = 'player-note';
        details.appendChild(note);
      }
      note.textContent = player.note;
    } else if (note) {
      note.remove();
    }

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
updateSeasonLabel();
renderSchedule();
renderRoster();
