# AGENTS.md — Trickdex

> Instrucciones del repositorio para sesiones de OpenCode / agentes IA.
> Lee este archivo **junto con** `README.md` (quickstart y estructura),
> `DESIGN.md` (tokens, voz, reglas visuales) y `ROADMAP.md` (alcance y
> fases). La documentación `.md` del repo está en **español** por
> decisión del proyecto; la app es bilingüe (ES por defecto, EN con el
> selector del header).

## Reglas obligatorias (lee esto antes de cualquier cambio)

1. **Antes de implementar**, lee en este orden: `AGENTS.md` y `README.md`.
2. **Después de cualquier implementación relevante**, actualiza
   `README.md` si cambió alguno de estos puntos:
   - comandos de desarrollo o build,
   - estructura de carpetas,
   - dependencias (`package.json`),
   - rutas o páginas,
   - flujo de uso de la app,
   - datos, modelos o seeds,
   - media, placeholders o assets,
   - i18n (locales, claves, namespaces),
   - configuración del proyecto (Next, Tailwind, next-intl, etc.),
   - decisiones técnicas relevantes.
3. **Si vas a tocar diseño, UI, estilos, temas dark/light, colores,
   tipografías, espaciados, componentes visuales, animaciones o UX**,
   lee `DESIGN.md` **antes** de tocar código.
4. **Si el cambio altera diseño, tokens, componentes visuales, reglas
   de UI o estilo general**, actualiza `DESIGN.md` en la misma sesión.
5. **Para cualquier fase nueva, feature nueva, cambio de scope,
   pendiente, postergación o tarea completada**, lee y actualiza
   `ROADMAP.md`.
6. **`ROADMAP.md` debe mantenerse con checkboxes claros** y tachar /
   completar lo que realmente se implemente. Lo no terminado se queda
   marcado.
7. **No implementes nada de Fase 2** mientras siga clasificado como
   futuro: backend, auth, base de datos, Supabase, comunidad, uploads,
   skill tree visual, combo builder, PWA, cloud sync. Solo procede con
   instrucción **explícita** del usuario.
8. **Toda la documentación `.md` del repo queda en español.** La app
   mantiene su interfaz bilingüe ES/EN; los archivos markdown no se
   traducen.
9. **No agregues dependencias nuevas** sin justificar por qué son
   necesarias. Si las añades, actualiza `README.md` (sección Stack y
   Scripts) y `ROADMAP.md` si corresponde.
10. **Tras cualquier cambio no trivial**, ejecuta las validaciones en
    este orden: `npm run typecheck` → `npm run lint` → `npm run build`.
    El build es la prueba más cara y la que valida el SSG completo.

## Stack (verificado)

- **Next.js 14.2** App Router + **TypeScript** (strict).
- **Tailwind v3** con variables CSS. **No** v4 (no usar config solo en
  CSS).
- **UI estilo shadcn** en `src/components/ui/` (Radix +
  `class-variance-authority`). **No** se usa el shadcn CLI; los
  primitivos están copiados al repo.
- **next-intl 3** con routing `[locale]`. Locales: `es` (default) y
  `en`. El middleware en `src/middleware.ts` redirige `/` → `/es`.
- **next-themes** con estrategia `class` y
  `disableTransitionOnChange`.
- **Zustand 5** con `persist` en `localStorage` bajo la clave
  `trickdex-progress`. Seguro para SSR: cuando `window` no existe usa
  un fallback inerte.
- **sonner** para toasts, **lucide-react** para iconos, **framer-motion**
  instalado pero sin uso todavía.

## Comandos

```bash
npm run dev        # http://localhost:3000  →  redirige a /es
npm run build      # build de producción, prerenderiza 67/67 páginas
npm run start      # servidor de producción (usar tras `build`)
npm run lint       # next lint (ESLint)
npm run typecheck  # tsc --noEmit
```

Orden de validación recomendado: **typecheck → lint → build**.
Typecheck y lint son rápidos; `next build` es el más lento y es la
puerta de entrada al SSG.

## Gotchas aprendidos a fuerza de errores (lee antes de tocar i18n o datos)

1. **`i18nKey` en `src/data/tricks.ts` ya viene prefijado**
   (p. ej. `"tricks.stance"`, **no** `"stance"`). Los componentes
   arman la clave como `t(\`tricks.${trick.id}.name\`)`. Si cambias un
   lado, cambia el otro. El campo `i18nKey` hoy no se usa en runtime;
   se conserva por flexibilidad futura.

2. **`getTranslations` vive en `next-intl/server`**, no en `next-intl`.
   Lo contrario que `useTranslations`. Mezclar los dos es el error de
   build más común.

3. **El `Link` de `next-intl` recibe `href: string`**, no
   `{pathname, params}`. Usa plantillas: `` href={`/tricks/${slug}`} ``.

4. **`useSearchParams()` exige un `<Suspense>`** para que el SSG
   funcione. La página de catálogo ya envuelve `<CatalogView />` en
   `<Suspense fallback={null}>` — no lo quites.

5. **`tips` es opcional** en los mensajes. La consulta usa
   `t.has(\`tricks.${id}.tips\`)` más `getMessageFallback: ({ key }) => ""`
   en `src/i18n/request.ts`. Si quitas cualquiera de las dos, el build
   se llena de errores `MISSING_MESSAGE`.

6. **Las claves de `messages/es.json` y `messages/en.json` deben
   espejarse**: misma estructura, mismo orden, mismos nombres. En
   `catalog.resultsCount` se usa sintaxis ICU de plurales
   (`{count, plural, =0 {...} one {...} other {# ...}}`).

## Arquitectura

```
src/
├── app/[locale]/          # todas las rutas viven bajo [locale]; el layout fija <html lang>
├── components/
│   ├── ui/                # primitivos estilo shadcn — no importar desde "@/components" en general
│   ├── layout/            # Header, Footer, Providers, ThemeToggle, LocaleSwitcher
│   ├── tricks/            # dominio: TrickCard, TrickDetail, CatalogFilters, etc.
│   └── progress/          # dominio: ProgressToggle, ProgressStats, ProgressActions
├── data/                  # seed estático: levels.ts, tricks.ts, relations.ts
├── i18n/                  # routing.ts (defineRouting) + request.ts (getRequestConfig)
├── lib/                   # utils.ts (cn), slug.ts
├── stores/                # progressStore.ts (Zustand)
├── types/                 # tipos TypeScript compartidos
└── middleware.ts          # middleware de next-intl
```

- **Datos del catálogo** en `src/data/tricks.ts`. Añadir un truco =
  editar ese archivo y añadir un bloque `tricks.<id>` en
  `messages/es.json` **y** `messages/en.json`. La UI re-deriva sola, no
  hace falta tocar más.
- **Disponibilidad de trucos** se calcula en
  `src/data/relations.ts:computeAvailability` a partir de los
  prerequisitos y el estado persistido.
  Estados: `locked`, `available`, `learning`, `mastered`.
- **`generateStaticParams` en `/tricks/[slug]`** enumera los 28
  trucos. Tras editar el catálogo, vuelve a correr `npm run build`
  para refrescar las páginas estáticas.
- **Sin backend, sin auth, sin DB.** El progreso se exporta/importa
  como JSON (blob + `<input type="file">`). No añadir Supabase,
  NextAuth ni Prisma en esta fase.

## Media

- `/public/media/thumbs/placeholder.svg` es el único asset existente.
  Todos los `media` de los trucos apuntan ahí por ahora.
- `/public/media/tricks/.gitkeep` reserva la carpeta de clips. Los
  `.webm`/`.mp4` reales se añadirán más adelante. Mantener cada clip
  por debajo de ~1 MB.

## Convenciones

- Todo texto visible pasa por `useTranslations` (cliente) o
  `getTranslations` (servidor). Nada de strings hardcodeados en JSX.
- Los tokens viven en `src/app/globals.css` como variables CSS en HSL
  y se exponen desde `tailwind.config.ts`. No usar hex crudos en
  componentes.
- Primitivos de estilo: prefiere componer `Card` / `Badge` / `Button`
  sobre CSS a medida. Las únicas desviaciones intencionales de los
  defaults de shadcn son la variante `variant="neon"` del botón y la
  paleta de `LevelBadge` (L1–L8).
- Mobile-first; target táctil mínimo 44 px;
  `prefers-reduced-motion` ya se respeta globalmente desde
  `globals.css`.
- Esa misma media query acorta todas las transiciones a 0.01 ms, lo
  que en la práctica desactiva el autoplay de video. Si añades lógica
  de autoplay, condicionala a la media query.

## Lo que NO hacer (según el plan actual)

- Nada de skill tree, combo builder, PWA, cloud sync, comunidad ni
  auth. Todo está en "Fase 2" de `ROADMAP.md` — no construirlo
  preventivamente.
- No traducir los archivos `.md` al inglés. La documentación del repo
  es en español por decisión del proyecto.
- No añadir dependencias nuevas sin actualizar `ROADMAP.md`.

## Verificación tras cualquier cambio no trivial

1. `npm run typecheck` — debe quedar en silencio.
2. `npm run lint` — debe quedar en silencio.
3. `npm run build` — debe reportar
   `Generating static pages (67/67)` sin línea de
   `Export encountered errors`.
4. Verificar visualmente: `/es` y `/en` del home, una ficha de truco
   (p. ej. `/es/tricks/backflip`), `/es/tricks` con al menos un
   filtro aplicado, y `/es/progress` tras marcar un truco.
5. Confirmar escritura en `localStorage`: DevTools → Application →
   Local Storage → `trickdex-progress` debe actualizarse al cambiar
   el estado de un truco.

## Checklist obligatoria antes de terminar

Marca cada punto según corresponda; si cualquiera falla, no cierres la
sesión hasta corregirlo.

- [ ] Leí `AGENTS.md`.
- [ ] Leí `README.md`.
- [ ] Leí `DESIGN.md` si toqué diseño / UI / UX / estilos.
- [ ] Leí `ROADMAP.md` si toqué fases, features o alcance.
- [ ] Actualicé `README.md` si cambió algo estructural, técnico o de
  uso.
- [ ] Actualicé `DESIGN.md` si cambié diseño.
- [ ] Actualicé `ROADMAP.md` si cambié fases / features / estado.
- [ ] Ejecuté `typecheck`, `lint` y `build` si existen, en ese orden.
- [ ] No implementé nada fuera de fase sin aprobación explícita.
