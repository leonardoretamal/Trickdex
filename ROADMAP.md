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
- [x] Crear `src/data/tricks.ts` con seed de catálogo (~30 trucos)
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

### Pendiente de validar

- [x] `npm run lint` sin errores
- [x] `npm run typecheck` sin errores
- [x] `npm run build` sin errores
- [x] Servidor de dev arranca en `localhost:3000` y redirige a `/es`

## Fase 2 — Engagement (NO incluida en el MVP)

> Estas ideas están en la lista de espera. No se implementan en esta fase.
> Cualquier avance aquí debe documentarse en `ROADMAP.md` y, si afecta al
> diseño, en `DESIGN.md`.

- [ ] Árbol visual de skills (graph) con React Flow o d3
- [ ] Constructor de combos y rutinas con drag & drop
- [ ] PWA + soporte offline
- [ ] Sincronización opcional del progreso con backend (Supabase, PocketBase, etc.)
- [ ] Búsqueda fuzzy con Fuse.js o similar
- [ ] Soporte real de clips en `.webm`/`.mp4` (reemplazar placeholders)
- [ ] Animaciones de desbloqueo de trucos (confeti, glow, etc.)
- [ ] Vista comparativa de dos trucos lado a lado
- [ ] Reseñas y comentarios por truco
- [ ] Autenticación (NextAuth o similar)
- [ ] Comunidad y feed social
- [ ] Subida de clips por el usuario (Cloudinary / R2)
- [ ] Compartir rutinas como enlace público

## Cambios recientes

- **v0.1 — MVP base**: scaffold completo, store de progreso, i18n, dark/light,
  8 niveles, 28 trucos seed, páginas de roadmap, catálogo, ficha, progreso y
  about, con DESIGN.md y ROADMAP.md en español.
