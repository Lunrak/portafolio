## Día 8 — Performance

### Cambios

- Fuentes: `@import` de Google Fonts movidos al `<head>` con `preconnect` (una sola
  petición en lugar de 3 bloqueantes).
- Avatar del hero: WebP con `srcset` (3 tamaños), `sizes`, `fetchpriority="high"`,
  `loading="eager"` y `decoding="async"`.
- `.card`: `content-visibility: auto` para diferir layout.
- Nuevo `img/favicon.svg` y `<meta name="theme-color">`.

### Métricas

- Lighthouse antes: ** / 100 (LCP **s, CLS \_\_)
- Lighthouse después: ** / 100 (LCP **s, CLS \_\_)

### Conceptos aplicados

- Core Web Vitals: LCP, CLS, INP.
- `srcset` + `sizes` para imágenes responsive.
- `loading="lazy"` vs `eager` + `fetchpriority`.
- `font-display: swap` y `preconnect`.
- `content-visibility` y `contain-intrinsic-size`.
- Formatos modernos: WebP, AVIF.
