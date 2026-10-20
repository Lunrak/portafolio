## Día 9 — Tooling: Vite + ESLint + Prettier + Husky

### Cambios

- `package.json` real con Vite 6, ESLint 9, Prettier 3, Husky 9 y lint-staged.
- `vite.config.js` con `base: './'` para GitHub Pages.
- `js/app.js` centraliza los 12 `import` de CSS y los 4 JS. Vite los bundlea.
- `index.html`: eliminadas las 12 `<link>` de CSS y los 4 `<script>`.
  Ahora solo `<script type="module" src="/js/app.js">`.
- `base.css`: eliminados los `@font-face` que apuntaban a `assets/fonts/`
  (carpeta inexistente). Las fuentes vienen de Google Fonts.
- `.gitignore` cubre `dist/`, `.vite/`, `node_modules/`.
- Husky pre-commit con lint-staged.

### Comandos

- `npm run dev` — servidor de desarrollo con HMR.
- `npm run build` — genera `dist/` para producción.
- `npm run preview` — sirve `dist/` para verificar.
- `npm run lint` — ESLint.
- `npm run format` — Prettier.

### Conceptos aplicados

- Vite como bundler + dev server.
- ESM (`type="module"`, `import`).
- ESLint flat config (v9).
- Prettier para formato.
- Husky + lint-staged para pre-commit hooks.
