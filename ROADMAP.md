# ROADMAP.md — Roadmap de implementación de Trickdex

> Este documento lista los entregables de las dos fases del proyecto. Los
> ítems se van tachando (`[x]`) conforme se completan. Si añades trabajo
> nuevo, añádelo al final de la fase correspondiente. Si cambias el
> alcance, actualiza también `README.md` y `DESIGN.md` cuando aplique.

## Fase 1 — MVP base

- [x] Inicializar Next.js 14 con App Router, TypeScript y Tailwind v3
- [x] Configurar `tailwind.config.ts`, `postcss.config.mjs` y `globals.css` con tokens light/dark
- [x] Configurar `next-themes` con estrategia `class` y `disableTransitionOnChange`
- [x] Configurar `next-intl` con routing `[locale]`, locales `es` y `en`
- [x] Crear `src/middleware.ts` y `src/i18n/{routing,request}.ts`
- [x] Definir tipos en `src/types/index.ts` (`Trick`, `Level`, `TrickStatus`, etc.)
- [x] Crear `src/data/levels.ts` con 8 niveles y sus tokens
- [x] Crear `src/data/tricks.ts` con seed de catálogo (28 trucos)
- [x] Crear `src/data/relations.ts` con `computeAvailability`
- [x] Crear `messages/es.json` y `messages/en.json` con namespaces
- [x] Implementar store Zustand con `persist` en `localStorage` (`trickdex-progress`)
- [x] Crear componentes UI base: `Button`, `Card`, `Badge`, `Dialog`, `Tabs`, `Input`, `Textarea`, `Select`, `DropdownMenu`, `Separator`, `Label`
- [x] Crear `ThemeProvider` con `next-themes` y `Toaster` de `sonner`
- [x] Crear `Header` con logo, nav, `LocaleSwitcher` y `ThemeToggle`
- [x] Crear `Footer` bilingüe
- [x] Crear `LocaleSwitcher` que preserva ruta
- [x] Crear `ThemeToggle` con tres opciones (claro, oscuro, sistema)
- [x] Crear `LevelBadge` y `StatusBadge` con tokens de color por nivel/estado
- [x] Crear `MediaPreview` con webm/mp4/poster, autoplay loop muted
- [x] Crear `TrickCard` y `TrickGrid` con estado derivado
- [x] Crear `LevelGrid` con conteo de progreso por nivel
- [x] Crear `ProgressToggle` (radio group de 4 estados)
- [x] Crear `ProgressStats`, `ProgressByLevel` y `ProgressActions` (export/import/reset con confirm)
- [x] Crear `CatalogFilters` y `CatalogView` con filtros en search params
- [x] Crear página `/[locale]` (Home / Roadmap) con LevelGrid, features y trucos destacados
- [x] Crear página `/[locale]/tricks` (Catálogo) con filtros
- [x] Crear página `/[locale]/tricks/[slug]` (Ficha) con `generateStaticParams`
- [x] Crear página `/[locale]/progress` con resumen, barras y acciones
- [x] Crear página `/[locale]/about` con secciones de filosofía, datos y créditos
- [x] Crear `not-found.tsx` global
- [x] Crear `public/media/thumbs/placeholder.svg` para previews vacíos
- [x] Escribir `DESIGN.md` con tokens, componentes, voz y reglas
- [x] Escribir `ROADMAP.md` (este archivo)
- [x] Escribir `README.md` en español con quickstart, estructura y guía para contributors
- [x] `git init`, primer commit y configuración de `.gitignore`
- [x] Ampliar L1 con rolls, handstand, cartwheel, round-off, bounce y tuck-jump (+7 trucos, L1 pasa de 4 a 11)
- [x] Crear 11 thumbnails SVG propios para L1 en `public/media/thumbs/` y enlazarlos desde el catálogo
- [x] Bloquear los botones de progreso cuando el truco está en `locked` y deshabilitar la opción `locked` del radiogroup
- [x] Indicador de opción activa en el selector de tema (`Check` + `aria-checked`)

### Pendiente de validar

- [x] `npm run lint` sin errores
- [x] `npm run typecheck` sin errores
- [x] `npm run build` sin errores
- [x] Servidor de dev arranca en `localhost:3000` y redirige a `/es`

## Fase 2 — Engagement (opciones bajo evaluación, NO iniciada)

> Fase 2 todavía **no está definida**: son ideas y opciones que se
> están sopesando. Mientras Fase 1 siga activa, **no se escribe código
> de Fase 2** sin instrucción explícita del usuario. Cualquier avance
> aquí debe documentarse en `ROADMAP.md` y, si afecta al diseño, en
> `DESIGN.md`.
>
> En el momento en que se abra Fase 2, las skills de backend
> (`nodejs-backend-patterns`, `nodejs-best-practices`) — que ya viven
> en `.agents/skills/` — pasarán de «carga futura» a obligatorias.

### Opciones de arquitectura (a decidir al abrir Fase 2)

| # | Arquitectura | Pros | Contras |
|---|--------------|------|---------|
| **A** | **Next.js + Supabase en este mismo repo** (recomendada) | Un solo repo, un solo deploy (Vercel), DB+Auth+Storage+Realtime ya gestionados, free tier generoso, ideal para un dev solo y datos pequeños. Migrable luego. | Acoplado al proveedor; lógica servidor compleja se delega a Edge Functions o se reescribe después. |
| B | Next.js (este repo) + backend Node.js aparte (otro repo) | Máximo control, lógica servidor propia, sin dependencia de BaaS. | Dos repos, dos deploys, más boilerplate, sobredimensionado para el MVP. |
| C | Monorepo (turborepo / npm workspaces) con `apps/web` (Next.js) + `apps/api` (Node.js) | Todo en un repo, type-sharing entre front y back, CI unificado. | Complejidad de tooling sin beneficio claro para un dev solo; suma fricción al MVP. |

> **Default recomendado: opción A.** Se revisa si en el futuro surge
> necesidad real de lógica servidor que Supabase no cubra bien
> (jobs pesados, integraciones con terceros, ML, etc.). En ese
> momento se valora migrar a B o C.

### Features (ideas, no comprometidas)

- [ ] Sincronización opcional del progreso con backend (sustituye el
      import/export JSON actual)
- [ ] Auth (Supabase Auth, NextAuth u otro, según arquitectura)
- [ ] Base de datos para cuentas, progreso y, eventualmente, comunidad
- [ ] Subida de clips por el usuario (Cloudinary / R2 / Supabase
      Storage según arquitectura)
- [ ] Árbol visual de skills (graph) con React Flow o d3
- [ ] Constructor de combos y rutinas con drag & drop
- [ ] Búsqueda fuzzy con Fuse.js o similar
- [ ] Soporte real de clips en `.webm`/`.mp4` (reemplazar placeholders)
- [ ] Animaciones de desbloqueo de trucos (confeti, glow, etc.)
- [ ] Vista comparativa de dos trucos lado a lado
- [ ] Reseñas y comentarios por truco
- [ ] Comunidad y feed social
- [ ] Compartir rutinas como enlace público
- [ ] PWA + soporte offline

## Cambios recientes

- **v0.4 — UX y assets**: 11 thumbnails SVG propios para L1
  (uno por truco, en `public/media/thumbs/`), enlazados desde el
  catálogo. El selector de tema ahora marca la opción activa con
  `Check` + `aria-checked`. En la ficha de truco, los botones de
  progreso se deshabilitan cuando el truco está en `locked` y la
  opción `locked` del radiogroup se deshabilita siempre (es un
  estado derivado, no fijable). Sin cambios en L2+ ni en tipos.
- **v0.3 — L1 ampliado**: se añaden 7 trucos nuevos a Fundamentos
  (forward-roll, backward-roll, handstand, cartwheel, round-off, bounce,
  tuck-jump) más sus 9 variaciones. L1 pasa de 4 a 11 trucos; el catálogo
  total pasa de 28 a 35. Se actualiza `levels.1.description` en ES y EN
  para reflejar el alcance del nivel. Sin cambios en L2+, sin cambios
  en tipos, componentes, ni páginas.
- **v0.2 — Fase 2 replanteada**: se quita el tono «confirmada» y
  vuelve a «opciones bajo evaluación». Se documentan tres
  arquitecturas posibles (A: Next.js + Supabase en este repo,
  recomendada; B: backend Node.js aparte; C: monorepo) para que la
  decisión se tome al abrir Fase 2.
- **v0.1 — MVP base**: scaffold completo, store de progreso, i18n, dark/light,
  8 niveles, 28 trucos seed, páginas de roadmap, catálogo, ficha, progreso y
  about, con DESIGN.md y ROADMAP.md en español.
