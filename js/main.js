/**
 * main.js — Portafolio Pixel Game Boy
 * Navegación por secciones (active) + CLI interactiva + menú móvil
 */

document.addEventListener('DOMContentLoaded', () => {
	const VALID_SECTIONS = ['home', 'about', 'projects', 'skills', 'contact'];

	// ===== Cambiar sección activa =====
	function goToSection(name) {
		const sectionName = String(name).toLowerCase().trim();
		if (!VALID_SECTIONS.includes(sectionName)) {
			return false;
		}

		// Quitar active de TODAS las secciones (incluido el hero #home)
		document.querySelectorAll('.section, .hero, #home').forEach((sec) => {
			sec.classList.remove('active');
		});

		// Activar solo la sección elegida
		const target = document.getElementById(sectionName);
		if (target) {
			target.classList.add('active');
		}

		// Actualizar nav links
		document.querySelectorAll('.nav__link').forEach((link) => {
			const isActive = link.dataset.section === sectionName;
			link.classList.toggle('nav__link--active', isActive);
		});

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
	const cliForm = document.getElementById('logo-cli');
	const cliInput = document.getElementById('cli-input');

	if (cliForm && cliInput) {
		cliForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const cmd = cliInput.value.trim().toLowerCase();

			if (goToSection(cmd)) {
				cliInput.value = '';
				cliInput.placeholder = `→ ${cmd}`;
				setTimeout(() => {
					cliInput.placeholder = 'home | about | projects | skills | contact';
				}, 1500);
			} else if (cmd !== '') {
				cliInput.value = '';
				cliInput.placeholder = 'comando no reconocido';
				setTimeout(() => {
					cliInput.placeholder = 'home | about | projects | skills | contact';
				}, 1500);
			}
		});
	}

	// ===== Clicks en nav y botones con data-section =====
	document.querySelectorAll('[data-section]').forEach((el) => {
		el.addEventListener('click', (e) => {
			const section = el.dataset.section;
			if (section && VALID_SECTIONS.includes(section)) {
				e.preventDefault();
				goToSection(section);

				// Cerrar menú móvil si está abierto
				const navList = document.querySelector('.nav__list');
				const toggle = document.querySelector('.nav__toggle');
				if (navList) navList.classList.remove('nav__list--open');
				if (toggle) {
					toggle.classList.remove('nav__toggle--open');
					toggle.setAttribute('aria-expanded', 'false');
				}
			}
		});
	});

	// ===== Menú hamburguesa =====
	const toggle = document.querySelector('.nav__toggle');
	const navList = document.querySelector('.nav__list');

	if (toggle && navList) {
		toggle.addEventListener('click', () => {
			const isOpen = navList.classList.toggle('nav__list--open');
			toggle.classList.toggle('nav__toggle--open', isOpen);
			toggle.setAttribute('aria-expanded', String(isOpen));
		});
	}

	// ===== Hash inicial (si alguien entra con #about etc.) =====
	const hash = window.location.hash.replace('#', '').toLowerCase();
	if (VALID_SECTIONS.includes(hash)) {
		goToSection(hash);
	} else {
		goToSection('home');
	}
});
