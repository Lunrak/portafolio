## Cambios

- Nuevo `data/proyectos.json` con los 7 proyectos.
- Nuevo `js/proyectos.js` que carga el JSON con `fetch` + `async/await`
  y renderiza las cards con `createElement` + `DocumentFragment`.
- `index.html` ya no tiene las cards hardcodeadas.

## Por qué

- Un solo sitio donde añadir/quitar proyectos.
- Preparación para React (ahí harás `.map()` sobre el mismo array).
- Uso seguro de `textContent` en lugar de `innerHTML` (previene XSS).
- `DocumentFragment` = 1 solo reflow en lugar de 7.

## Testing manual

- [x] Sección PROJECTS muestra las 7 cards
- [x] Consola: "Renderizados 7 proyectos"
- [x] Si renombro `data/proyectos.json` → aparece mensaje de error amigable
- [x] Los links "JUGAR" funcionan
- [x] Los tags se renderizan correctamente
