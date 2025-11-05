const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section');

const activateLink = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);
  });
};

if (sections.length > 0) {
  activateLink(sections[0].id);
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activateLink(entry.target.id);
        }
      });
    },
    {
      threshold: 0.45,
    }
  );

  sections.forEach((section) => observer.observe(section));
} else if (sections.length > 0) {
  activateLink(sections[0].id);
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      event.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      activateLink(targetId);
    }
  });
});

const playerCards = document.querySelectorAll('[data-player]');

playerCards.forEach((card) => {
  const trigger = card.querySelector('.player-trigger');
  const details = card.querySelector('.player-details');

  if (!trigger || !details) return;

  trigger.addEventListener('click', () => {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;

    playerCards.forEach((otherCard) => {
      const otherTrigger = otherCard.querySelector('.player-trigger');
      const otherDetails = otherCard.querySelector('.player-details');

      if (!otherTrigger || !otherDetails) {
        return;
      }

      if (otherCard === card) {
        otherTrigger.setAttribute('aria-expanded', String(nextState));
        otherCard.dataset.open = String(nextState);
        if (nextState) {
          otherDetails.removeAttribute('hidden');
        } else {
          otherDetails.setAttribute('hidden', '');
        }
      } else {
        otherTrigger.setAttribute('aria-expanded', 'false');
        otherCard.dataset.open = 'false';
        otherDetails.setAttribute('hidden', '');
      }
    });
  });
});
