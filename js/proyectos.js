const grid = document.getElementById('projects-grid');
const filterBar = document.getElementById('projects-filters');
if (!grid || !filterBar)
  throw new Error('Faltan #projects-grid o #projects-filter en el DOM');

const CAMPOS_REQUERIDOS = ['id', 'titulo', 'descripcion', 'tags', 'accion'];

const filtros = (() => {
  let tagActivo = null;
  return {
    get: () => tagActivo,
    toggle: (tag) => {
      tagActivo = tagActivo === tag ? null : tag;
      return tagActivo;
    },
  };
})();

let todosLosProyectos = [];

const dialog = document.getElementById('project-dialog');
const dialogTitle = document.getElementById('project-dialog-title');
const dialogDesc = document.getElementById('project-dialog-desc');
const dialogTags = document.getElementById('project-dialog-tags');
const dialogClose = document.getElementById('project-dialog-close');

function abrirDetalleProyecto(proyecto) {
  if (!dialog) return;
  dialogTitle.textContent = proyecto.titulo;
  dialogDesc.textContent = proyecto.descripcion;
  dialogTags.replaceChildren(
    ...(proyecto.tags ?? []).map((tag) => {
      const span = document.createElement('span');
      span.className = 'card__tag';
      span.textContent = tag;
      return span;
    }),
  );
  dialog.showModal();
}

dialogClose?.addEventListener('click', () => dialog.close());

dialog?.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close();
});

function validarProyecto(proyecto) {
  return CAMPOS_REQUERIDOS.every((campo) => campo in proyecto);
}

function crearCard({ id, titulo, descripcion, tags = [], url, accion }) {
  const article = document.createElement('article');
  article.className = 'card';

  const thumb = document.createElement('div');
  thumb.className = 'card__thumbnail';

  const h3 = document.createElement('h3');
  h3.className = 'card__title';
  const titleBtn = document.createElement('button');
  titleBtn.type = 'button';
  titleBtn.className = 'card__title-btn';
  titleBtn.textContent = titulo;
  titleBtn.dataset.projectId = id;
  h3.appendChild(titleBtn);

  const p = document.createElement('p');
  p.className = 'card__description';
  p.textContent = descripcion;

  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'card__tags';
  tagsContainer.append(
    ...tags.map((tag) => {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'card__tag';
      boton.dataset.tag = tag;
      boton.setAttribute('aria-pressed', 'false');
      boton.setAttribute('aria-label', `Filtrar por ${tag}`);
      boton.textContent = tag;
      return boton;
    }),
  );

  let accionEl;
  if (url) {
    accionEl = document.createElement('a');
    accionEl.href = url.startsWith('https') ? url : `/${url}`;
    accionEl.target = '_blank';
    accionEl.rel = 'noopener noreferrer';
    accionEl.className = 'btn btn--primary btn--sm card__action';

    accionEl.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  } else {
    accionEl = document.createElement('span');
    accionEl.className = 'btn btn--ghost btn--sm card__action';
  }
  accionEl.textContent = accion;

  article.append(thumb, h3, p, tagsContainer, accionEl);
  return article;
}

function renderizarFiltros() {
  const tags = [
    ...new Set(todosLosProyectos.flatMap((p) => p.tags ?? [])),
  ].sort();
  const tagActivo = filtros.get();

  filterBar.replaceChildren(
    ...tags.map((tag) => {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'filter-tag';
      boton.dataset.tag = tag;
      boton.classList.toggle('filter-tag--active', tag === tagActivo);
      boton.setAttribute('aria-pressed', String(tag === tagActivo));
      boton.setAttribute('aria-label', `Filtrar por ${tag}`);
      boton.textContent = tag;
      return boton;
    }),
  );
}

function renderizarProyectos() {
  const status = document.getElementById('projects-status');
  const tagActivo = filtros.get();
  const visibles = tagActivo
    ? todosLosProyectos.filter((p) => (p.tags ?? []).includes(tagActivo))
    : todosLosProyectos;

  if (status) {
    status.textContent = tagActivo
      ? `Mostrando ${visibles.length} proyecto(s) con la tecnología ${tagActivo}`
      : `Mostrando ${visibles.length} proyecto(s) en total`;
  }

  if (visibles.length === 0) {
    grid.innerHTML =
      '<p class="section__desc">No hay proyectos con ese filtro</p>';
    return;
  }

  grid.replaceChildren(...visibles.map(crearCard));
}

function aplicarFiltroDesdeBoton(boton) {
  const { tag } = boton.dataset;
  if (!tag) return;
  filtros.toggle(tag);
  renderizarFiltros();
  renderizarProyectos();
}

async function cargarProyectos() {
  try {
    const respuesta = await fetch('data/proyectos.json');
    if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status} — ${respuesta.statusText}`);
    }

    todosLosProyectos = await respuesta.json();

    const invalidos = todosLosProyectos.filter((p) => !validarProyecto(p));
    if (invalidos.length > 0) {
      console.warn('Proyectos con campos faltantes:', invalidos);
    }

    renderizarFiltros();
    renderizarProyectos();
  } catch (error) {
    console.error('Error cargando proyectos:', error);
    grid.innerHTML =
      '<p class="section__desc">No se pudieron cargar los proyectos. Intenta recargar la página.</p>';
    const status = document.getElementById('projects-status');
    if (status) status.textContent = 'Error al cargar los proyectos';
  }
}

filterBar.addEventListener('click', (e) => {
  const botonTag = e.target.closest('[data-tag]');
  if (!botonTag) return;
  aplicarFiltroDesdeBoton(botonTag);
});

grid.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    return;
  }
  const botonTag = e.target.closest('[data-tag]');
  if (botonTag) {
    aplicarFiltroDesdeBoton(botonTag);
    return;
  }

  const botonTitulo = e.target.closest('[data-project-id]');
  if (botonTitulo) {
    const { projectId } = botonTitulo.dataset;
    const proyecto = todosLosProyectos.find((p) => p.id === projectId);
    if (proyecto) abrirDetalleProyecto(proyecto);
  }
});

cargarProyectos();
