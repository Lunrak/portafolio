/**
 * proyectos.js — Carga y renderiza las cards de proyectos desde data/proyectos.json
 */

document.addEventListener('DOMContentLoaded', () => {
	const grid = document.getElementById('projects-grid');
	if (!grid) return;

	function crearCard({ titulo, descripcion, tags, url, accion }) {
		const article = document.createElement('article');
		article.className = 'card';

		const thumb = document.createElement('div');
		thumb.className = 'card__thumbnail';

		const h3 = document.createElement('h3');
		h3.className = 'card__title';
		h3.textContent = titulo;

		const p = document.createElement('p');
		p.className = 'card__description';
		p.textContent = descripcion;

		const tagsContainer = document.createElement('div');
		tagsContainer.className = 'card__tags';
		tags.forEach((tag) => {
			const span = document.createElement('span');
			span.className = 'card__tag';
			span.textContent = tag;
			tagsContainer.appendChild(span);
		});

		let accionEl;
		if (url) {
			accionEl = document.createElement('a');
			accionEl.href = url;
			accionEl.target = '_blank';
			accionEl.rel = 'noopener';
			accionEl.className = 'btn btn--primary btn--sm card__action';
		} else {
			accionEl = document.createElement('span');
			accionEl.className = 'btn btn--ghost btn--sm card__action';
		}
		accionEl.textContent = accion;

		article.append(thumb, h3, p, tagsContainer, accionEl);
		return article;
	}

	async function cargarProyectos() {
		try {
			const respuesta = await fetch('data/proyectos.json');

			if (!respuesta.ok) {
				throw new Error(`HTTP ${respuesta.status} — ${respuesta.statusText}`);
			}

			const proyectos = await respuesta.json();

			const fragment = document.createDocumentFragment();
			proyectos.forEach((proyecto) => {
				fragment.appendChild(crearCard(proyecto));
			});

			grid.innerHTML = '';
			grid.appendChild(fragment);

			console.log(`Renderizados ${proyectos.length} proyectos`);
		} catch (error) {
			console.error('Error cargando proyectos:', error);
			grid.innerHTML =
				'<p class="section__desc">No se pudieron cargar los proyectos. Intenta recargar la página.</p>';
		}
	}

	cargarProyectos();
});
