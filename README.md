## Cambios

- 🐛 Fix: renombrar `.btn--gost` → `.btn--ghost` (los botones ghost no tenían estilos)
- 🐛 Fix: duplicado `border-bottom-width` en `.btn--danger:active`
- ♻️ Refactor `main.js`: destructuring de dataset y classList, Set para validación,
  spread para NodeList, extracción de `cerrarMenuMovil`, referencias al DOM cacheadas
- ♻️ Refactor `terminal.js`: destructuring del CustomEvent, spread en NodeList
- 📝 README actualizado

## Por qué

- Preparación para React: inmutabilidad, destructuring, spread
- Menos consultas al DOM, código más legible
- Bug visible en producción corregido

## Testing manual

- [x] Botones GITHUB / LINKEDIN / EMAIL ahora tienen estilo ghost
- [x] Botón LIMPIAR del formulario tiene estilo ghost
- [x] Navegación por secciones sigue funcionando
- [x] CLI (escribir "about" y Enter) sigue funcionando
- [x] Menú hamburguesa abre/cierra correctamente
