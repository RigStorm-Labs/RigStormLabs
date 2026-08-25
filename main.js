const buildGrid = document.querySelector('[data-build-grid]');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const header = document.querySelector('[data-header]');
const buildForm = document.querySelector('[data-build-form]');
const formSuccess = document.querySelector('[data-form-success]');

const themeClass = {
  lime: '',
  orange: 'build-image--orange',
  blue: 'build-image--blue',
};

function buildCard(build) {
  const imageClass = themeClass[build.theme] || '';
  const rigClass = build.theme === 'lime' ? '' : ` mini-rig--${build.theme}`;
  return `
    <article class="build-card" data-build-type="${build.filter}">
      <div class="build-image ${imageClass}">
        <span class="card-tag">${build.type}</span>
        <span class="card-price">${build.price}</span>
        <div class="mini-rig${rigClass}" aria-hidden="true"></div>
      </div>
      <div class="build-details">
        <div><h3>${build.name}</h3><p>${build.spec}</p></div>
        <span class="build-arrow" aria-hidden="true">↗</span>
      </div>
    </article>`;
}

async function renderBuilds() {
  try {
    const response = await fetch('/data/builds.json');
    if (!response.ok) throw new Error('Build content unavailable');
    const builds = await response.json();
    buildGrid.innerHTML = builds.map(buildCard).join('');
    setupFilters();
  } catch (error) {
    buildGrid.innerHTML = '<p class="loading-card">The lab is recalibrating. Try again in a moment.</p>';
  }
}

function setupFilters() {
  const cards = [...document.querySelectorAll('[data-build-type]')];
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      cards.forEach((card) => {
        card.hidden = selected !== 'all' && card.dataset.buildType !== selected;
      });
    });
  });
}

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileMenu.classList.toggle('is-open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('menu-open', open);
}

menuToggle?.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 15);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

buildForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!buildForm.checkValidity()) {
    buildForm.reportValidity();
    return;
  }
  const submitButton = buildForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.innerHTML = 'Brief sent <span aria-hidden="true">✓</span>';
  formSuccess.hidden = false;
  buildForm.reset();
});

renderBuilds();
