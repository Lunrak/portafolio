## 🐛 Bugs corregidos

- `main.js`: `const section = el.dataset` devolvía un objeto en lugar del string.
  La navegación por menú no funcionaba al hacer click. Fix con destructuring:
  `const { section } = el.dataset`.
- `terminal.js`: `section` no estaba definido en el listener de `sectionchange`
  (ReferenceError). Fix: `({ detail: { section } = {} }) => ...`.

## ♻️ Refactors

- `cursor.js`: spread para NodeList → Array y clase `.animate-blink` en lugar de
  manipular `style.animation`.

## ✅ Testing manual

- [x] Click en HOME/ABOUT/PROJECTS/SKILLS/CONTACT cambia de sección
- [x] La terminal de ABOUT escribe al entrar por primera vez
- [x] Salir y volver a ABOUT no re-escribe (hasTyped)
- [x] Consola sin errores
