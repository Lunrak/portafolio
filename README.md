## Día 4 — Métodos avanzados de arrays

### Cambios

- `js/proyectos.js`: `forEach` → `map` + `replaceChildren`, validación con `filter` + `every`.
- `todo-app/app.js`: `validarTarea` refactorizada con `find` y reglas declarativas.
  Bug corregido: el caso válido devolvía `esValida: false`.

### Conceptos aplicados

- `map`: transformar un array de proyectos en un array de nodos DOM.
- `filter`: detectar proyectos con campos faltantes.
- `every`: validar que todos los proyectos tienen los campos requeridos.
- `find`: primera regla de validación que falla.
- `flatMap` + `Set`: extraer tags únicos de todos los proyectos.
- Encadenamiento: `filter().filter().map()`.
