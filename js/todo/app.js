import './todo.css';
import { validarTarea } from './validar.js';
import { cargarTareas, guardarTareas } from './storage.js';

const form = document.getElementById('formulario-tarea');
const input = document.getElementById('input-tarea');
const inputError = document.getElementById('input-tarea-error');
const lista = document.getElementById('lista-tareas');
const contador = document.getElementById('contador-tareas');
const mensajeVacio = document.getElementById('mensaje-vacio');
if (!form || !input || !lista || !contador || !mensajeVacio) {
  throw new Error('Faltan elementos del DOM en todo-app.html');
}
let tareas = cargarTareas();

function mostrarError(mensaje) {
  inputError.textContent = mensaje;
  inputError.hidden = false;
  input.setAttribute('aria-invalid', 'true');
}

function limpiarError() {
  inputError.textContent = '';
  inputError.hidden = true;
  input.setAttribute('aria-invalid', 'false');
}

function renderizarTareas() {
  const pendientes = tareas.filter((t) => !t.completada).length;
  const total = tareas.length;

  contador.textContent =
    pendientes === 1 ? `1 tarea pendiente` : `${pendientes} tareas pendientes`;

  mensajeVacio.hidden = total > 0;

  if (total === 0) {
    lista.replaceChildren();
    return;
  }

  lista.replaceChildren(
    ...tareas.map(({ id, texto, completada }) => {
      const li = document.createElement('li');
      li.dataset.id = id;
      li.className = completada ? 'tarea-completada' : '';

      const span = document.createElement('span');
      span.className = 'texto-tarea';
      span.textContent = texto;

      const btnToggle = document.createElement('button');
      btnToggle.type = 'button';
      btnToggle.className = 'boton-completar';
      btnToggle.dataset.action = 'toggle';
      btnToggle.setAttribute(
        'aria-label',
        completada
          ? `Marcar "${texto}" como pendiente`
          : `Marcar "${texto}" como completada`,
      );
      btnToggle.setAttribute('aria-pressed', String(completada));
      btnToggle.textContent = completada ? '↺' : '✓';

      const btnEliminar = document.createElement('button');
      btnEliminar.type = 'button';
      btnEliminar.className = 'boton-eliminar';
      btnEliminar.dataset.action = 'delete';
      btnEliminar.setAttribute('aria-label', `Eliminar "${texto}"`);
      btnEliminar.textContent = '✕';

      li.append(span, btnToggle, btnEliminar);
      return li;
    }),
  );
}

function renderizarYGuardar() {
  guardarTareas(tareas);
  renderizarTareas();
}

function agregarTarea(texto) {
  const resultado = validarTarea(texto);

  if (!resultado.esValida) {
    mostrarError(resultado.mensaje);
    input.focus();
    return;
  }

  limpiarError();
  const nueva = {
    id: crypto.randomUUID(),
    texto: texto.trim(),
    completada: false,
  };
  tareas = [...tareas, nueva]; // inmutable
  renderizarYGuardar();
  input.value = '';
  input.focus();
}

function toggleTarea(id) {
  tareas = tareas.map((t) =>
    t.id === id ? { ...t, completada: !t.completada } : t,
  );
  renderizarYGuardar();
}

function eliminarTarea(id) {
  tareas = tareas.filter((t) => t.id !== id);
  renderizarYGuardar();
}

// ===== Eventos =====
form.addEventListener('submit', (e) => {
  e.preventDefault();
  agregarTarea(input.value);
});

input.addEventListener('input', () => {
  if (input.getAttribute('aria-invalid') === 'true') {
    limpiarError();
  }
});

lista.addEventListener('click', (e) => {
  const boton = e.target.closest('[data-action]');
  if (!boton) return;
  const li = boton.closest('[data-id]');
  if (!li) return;
  const { id } = li.dataset;
  const { action } = boton.dataset;

  if (action === 'toggle') toggleTarea(id);
  if (action === 'delete') eliminarTarea(id);
});

renderizarTareas();
