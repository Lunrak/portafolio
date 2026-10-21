const REGLAS = [
  {
    test: (t) => t === '',
    mensaje: 'La tarea no puede estar vacía',
  },
  {
    test: (t) => t.length < 3,
    mensaje: 'La tarea debe tener al menos 3 caracteres',
  },
  {
    test: (t) => t.length > 100,
    mensaje: 'La tarea no puede superar los 100 caracteres',
  },
];

export function validarTarea(texto) {
  const limpio = texto.trim();
  const error = REGLAS.find(({ test }) => test(limpio));
  return error
    ? { esValida: false, mensaje: error.mensaje }
    : { esValida: true, mensaje: '' };
}
