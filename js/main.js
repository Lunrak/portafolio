document.addEventListener('DOMContentLoaded', () => {
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

	function cerrarMenuMovil() {
		navList?.classList.remove('nav__list--open');
		navToggle?.classList.remove('nav__toggle--open');
		navToggle?.setAttribute('aria-expanded', 'false');
	}

	// ===== Cambiar sección activa =====
	function goToSection(name) {
		const sectionName = String(name).toLowerCase().trim();
		if (!VALID_SECTIONS.has(sectionName)) {
			return false;
		}

		[...document.querySelectorAll('.section, .hero, #home')].forEach((sec) =>
			sec.classList.remove('active'),
		);
		document.getElementById(sectionName)?.classList.add('active');

		[...document.querySelectorAll('.nav__link')].forEach(
			({ dataset, classList }) => {
				classList.toggle('nav__link--active', dataset.section === sectionName);
			},
		);

		// Disparar evento para terminal.js (animación About)
		window.dispatchEvent(
			new CustomEvent('sectionchange', { detail: { section: sectionName } }),
		);

		// Scroll al top
		window.scrollTo({ top: 0, behavior: 'instant' });

		return true;
	}

	// Exponer globalmente por si otros scripts lo necesitan
	window.goToSection = goToSection;

	// ===== CLI del logo =====

	function updateCliCursor() {
		if (!cliInput || !cliCursor || !cliMirror) return;

		const hasText = cliInput.value.length > 0;
		cliCursor.style.display = hasText ? 'none' : 'block';

		if (!hasText) {
			cliCursor.style.left = '0px';
		}
		cliMirror.textContent = cliInput.value;
	}

	if (cliForm && cliInput) {
		// Auto-foco al cargar
		cliInput.focus();

		// Actualizar visibilidad del cursor al escribir / borrar
		['input', 'keydown', 'keyup'].forEach((evt) => {
			cliInput.addEventListener(evt, updateCliCursor);
		});
		updateCliCursor();

		cliForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const cmd = cliInput.value.trim().toLowerCase();

			if (cmd !== '') {
				goToSection(cmd);
			}

			cliInput.value = '';
			updateCliCursor();
			cliInput.focus();
		});
	}

	// ===== Clicks en nav y botones con data-section =====
	document.querySelectorAll('[data-section]').forEach((el) => {
		el.addEventListener('click', (e) => {
			const section = el.dataset;
			if (!section || !VALID_SECTIONS.has(section)) return;

			e.preventDefault();
			goToSection(section);
			cerrarMenuMovil();
		});
	});

	// ===== Menú hamburguesa =====
	navToggle?.addEventListener('click', () => {
		const isOpen = navList.classList.toggle('nav__list--open');
		navToggle.classList.toggle('nav__toggle--open', isOpen);
		navToggle.setAttribute('aria-expanded', String(isOpen));
	});

	// ===== Hash inicial =====
	const hash = window.location.hash.replace('#', '').toLowerCase();
	goToSection(VALID_SECTIONS.has(hash) ? hash : 'home');
});
