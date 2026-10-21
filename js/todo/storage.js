const CLAVE = 'todo-app:tareas';

export function cargarTareas() {
  try {
    const raw = localStorage.getItem(CLAVE);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn('Error leyendo localStorage, usando array vacío:', error);
    return [];
  }
}

export function guardarTareas(tareas) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(tareas));
  } catch (error) {
    console.error('Error guardando en localStorage:', error);
  }
}
