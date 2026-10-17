## Día 3 — Async/Await, Promesas y Fetch

### Cambios

- Los proyectos ahora se cargan desde `data/proyectos.json` con `fetch` + `async/await`.
- `js/proyectos.js` crea las cards dinámicamente con `document.createElement` +
  `textContent` (seguro contra XSS).
- Uso de `DocumentFragment` para un solo reflow.

### Conceptos aplicados

- `async/await` y `try/catch` para manejo de errores.
- `fetch` + validación `respuesta.ok`.
- `Promise` en su forma moderna.
- `DocumentFragment` para performance.
