const VALID_SECTIONS = new Set([
  'home',
  'about',
  'projects',
  'skills',
  'contact',
]);

const navList = document.querySelector('.nav__list');
const navToggle = document.querySelector('.nav__toggle');
const cliForm = document.getElementById('logo-cli');
const cliInput = document.getElementById('cli-input');
const cliCursor = document.querySelector('.logo-cli__cursor');
const cliMirror = document.querySelector('.logo-cli__mirror');

function toggleMenu(forceOpen) {
  if (!navList || !navToggle) return;
  const isOpen =
    typeof forceOpen === 'boolean'
      ? forceOpen
      : !navList.classList.contains('nav__list--open');

  navList.classList.toggle('nav__list--open', isOpen);
  navToggle.classList.toggle('nav__toggle--open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
}

function cerrarMenuMovil() {
  toggleMenu(false);
}

function goToSection(name) {
  const sectionName = String(name).toLowerCase().trim();
  if (!VALID_SECTIONS.has(sectionName)) return false;

  [...document.querySelectorAll('.section, .hero, #home')].forEach((sec) =>
    sec.classList.remove('active'),
  );
  document.getElementById(sectionName)?.classList.add('active');

  [...document.querySelectorAll('.nav__link')].forEach(
    ({ dataset, classList }) => {
      classList.toggle('nav__link--active', dataset.section === sectionName);
    },
  );

  window.dispatchEvent(
    new CustomEvent('sectionchange', { detail: { section: sectionName } }),
  );

  window.scrollTo({ top: 0, behavior: 'instant' });
  return true;
}

window.goToSection = goToSection;

function updateCliCursor() {
  if (!cliInput || !cliCursor || !cliMirror) return;

  const hasText = cliInput.value.length > 0;
  cliCursor.style.display = hasText ? 'none' : 'block';
  if (!hasText) cliCursor.style.left = '0px';
  cliMirror.textContent = cliInput.value;
}

if (cliForm && cliInput) {
  cliInput.focus();

  ['input', 'keydown', 'keyup'].forEach((evt) => {
    cliInput.addEventListener(evt, updateCliCursor);
  });
  updateCliCursor();

  cliForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cmd = cliInput.value.trim().toLowerCase();
    if (cmd !== '') goToSection(cmd);
    cliInput.value = '';
    updateCliCursor();
    cliInput.focus();
  });
}

document.querySelectorAll('[data-section]').forEach((el) => {
  el.addEventListener('click', (e) => {
    const { section } = el.dataset;
    if (!section || !VALID_SECTIONS.has(section)) return;

    e.preventDefault();
    e.stopPropagation();
    const ok = goToSection(section);
    if (ok) cerrarMenuMovil();
  });
});

navToggle?.addEventListener('click', () => toggleMenu());

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navList?.classList.contains('nav__list--open')) {
    toggleMenu(false);
    navToggle?.focus();
  }
});

const hash = window.location.hash.replace('#', '').toLowerCase();
goToSection(VALID_SECTIONS.has(hash) ? hash : 'home');
