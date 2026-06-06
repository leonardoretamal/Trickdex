# AGENTS.md — Trickdex

> Instrucciones del repositorio para sesiones de OpenCode / agentes IA.
> Lee este archivo **junto con** `README.md` (quickstart y estructura),
> `DESIGN.md` (tokens, voz, reglas visuales) y `ROADMAP.md` (alcance y
> fases). La documentación `.md` está en español por decisión del
> proyecto (ver regla 9); la app es bilingüe ES/EN con la sección
> `i18n` de este archivo como contrato de paridad.

## Skills (`.agents/skills/`) — uso obligatorio

El repositorio incluye skills especializados en `.agents/skills/`. **Toda
tarea — implementación, refactor, revisión, investigación — debe empezar
cargando con la herramienta `skill` la skill o skills que apliquen al
trabajo.** No escribas código sin haber revisado las reglas que
correspondan.

### Skills de Fase 1 (carga según el área que toques)

- `next-best-practices`: convenciones de Next.js 14 App Router.
- `next-cache-components`: caching, ISR y `revalidate` en Next 14.
- `next-upgrade`: solo si la tarea es subir de versión de Next.
- `react-best-practices`: patrones de React 19 (memo, suspense, etc.).
- `composition-patterns`: composición de componentes, state lifting.
- `tailwind-css-patterns`: patrones de Tailwind v3 (no v4).
- `tailwind-v4-shadcn`: solo si se migra a Tailwind v4.
- `shadcn`: primitivos UI estilo shadcn, variantes, formularios, iconos.
- `frontend-design`: diseño visual, layouts, jerarquía.
- `accessibility`: WCAG y patrones a11y.
- `seo`: metadata, sitemap, robots, OpenGraph.
- `typescript-advanced-types`: tipos avanzados de TS (genéricos,
  conditional types, etc.).

### Skills de Fase 2 (no cargar todavía)

Estas viven ya en `.agents/skills/` para que la transición a backend
sea fluida, pero **no se usan** mientras la Fase 1 siga activa:

- `nodejs-backend-patterns`
- `nodejs-best-practices`

Se cargarán en cuanto se abra la Fase 2 (ver `ROADMAP.md`).

## i18n (bilingüe ES/EN)

La app soporta dos locales: `es` (default) y `en`, configurados en
`src/i18n/routing.ts`. Toda cadena visible al usuario vive en
`messages/es.json` y `messages/en.json`.

- **Cualquier string nuevo** (componente nuevo, mensaje de error,
  tooltip, label, copy de la página `/about`, etc.) se añade **a los
  dos archivos** con la misma clave, mismo orden y misma estructura.
- Los nombres y descripciones del catálogo de trucos siguen la clave
  `tricks.<id>.{name,short,description,tips}` y se replican
  literalmente entre ES y EN.
- Si necesitas plurales, usa la sintaxis ICU de `next-intl`
  (`{count, plural, =0 {...} one {...} other {# ...}}`).
- `tips` es opcional; la consulta usa `t.has(...)` + fallback
  configurado en `src/i18n/request.ts` para no romper el build si
  falta.
- Si una nueva feature introduce strings, la regla 3 obliga a
  actualizar `README.md`; esta sección sirve de contrato de
  paridad ES ↔ EN.

## Reglas obligatorias (lee esto antes de cualquier cambio)

1. **Antes de implementar**, lee en este orden: `AGENTS.md` y `README.md`.
2. **Carga las skills relevantes de `.agents/skills/`** listadas en la
   sección anterior. Si la tarea toca varias áreas (p. ej. UI + a11y,
   o routing + i18n), carga todas las que apliquen. Sin esto, no
   empieces a escribir código.
3. **Después de cualquier implementación relevante**, actualiza
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
4. **Si vas a tocar diseño, UI, estilos, temas dark/light, colores,
   tipografías, espaciados, componentes visuales, animaciones o UX**,
   lee `DESIGN.md` **antes** de tocar código.
5. **Si el cambio altera diseño, tokens, componentes visuales, reglas
   de UI o estilo general**, actualiza `DESIGN.md` en la misma sesión.
6. **Para cualquier fase nueva, feature nueva, cambio de scope,
   pendiente, postergación o tarea completada**, lee y actualiza
   `ROADMAP.md`.
7. **`ROADMAP.md` debe mantenerse con checkboxes claros** y tachar /
   completar lo que realmente se implemente. Lo no terminado se queda
   marcado.
8. **No implementes nada de Fase 2** sin instrucción **explícita**
   del usuario. Fase 2 todavía no está definida: hay opciones
   sobre la mesa (Next.js + Supabase, backend Node.js aparte,
   monorepo) y la decisión se toma al abrirla. Hasta entonces, su
   código no se escribe. Aplica a: backend, auth, base de datos,
   Supabase / PocketBase / etc., comunidad, uploads, skill tree
   visual, combo builder, PWA, cloud sync.
9. **Toda la documentación `.md` del repo queda en español.** La app
   mantiene su interfaz bilingüe ES/EN; los archivos markdown no se
   traducen.
10. **No agregues dependencias nuevas** sin justificar por qué son
    necesarias. Si las añades, actualiza `README.md` (sección Stack y
    Scripts) y `ROADMAP.md` si corresponde.
11. **No uses emojis como iconos visuales** en la UI (navegación,
    botones, cards, badges, estados, empty states, alerts, filtros,
    progreso, fichas de truco, etc.). Usa siempre iconos de
    **`lucide-react`**. Mapeos orientativos:
    - candado → `Lock`
    - check → `Check` / `CheckCircle2`
    - búsqueda → `Search`
    - sol / luna → `Sun` / `Moon`
    - idioma → `Languages`
    - progreso → `TrendingUp` / `BarChart3`
    - alerta → `AlertTriangle`
    - info → `Info`
    - destacado → `Star`
    - video / play → `Play`
    - settings → `Settings`
    - niveles / ranking → `Trophy` / `Medal`
    Glifos Unicode tipo `↻ ↺ ⚡ ↗ ◯ ↔` tampoco son válidos como iconos
    de UI: usa el componente de lucide-react correspondiente. Si falta
    una equivalencia, consúltalo antes de añadir glifo a mano.
12. **Toda acción del usuario que implique espera debe mostrar estado
    de carga.** Si una interacción puede tardar (request a la red,
    lectura/escritura de archivo, cálculo pesado, import/export, etc.),
    la UI no puede quedarse muda. Patrones a usar:
    - **Botón que dispara la acción**: `disabled` + `aria-busy="true"`
      y, si aporta, un `Loader2` de `lucide-react` con `aria-hidden`.
      Mantener el label visible para que la transición sea legible.
    - **Operación global o puntual**: toast de `sonner` con
      `toast.promise()` o `toast.loading()`.
    - **Sección o página**: skeleton o spinner inline reservado en
      layout.
    - **Operación larga**: barra de progreso o porcentaje.
    NUNCA dejar un botón visualmente clickable mientras la acción
    corre: los usuarios lo pulsan varias veces y rompen el flujo.
    Respeta `prefers-reduced-motion` (los spinners con `animate-spin`
    ya quedan deshabilitados por la regla global de `globals.css`).
13. **Tras cualquier cambio no trivial**, ejecuta las validaciones en
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

El orden de validación obligatorio tras cualquier cambio no trivial
está en la regla 13 y detallado en § Verificación.

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

El árbol completo del proyecto está en `README.md` § Estructura. Lo
que sigue son los puntos que más mira un agente:

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
  seguir `README.md` § "Añadir un truco nuevo" (4 pasos).
- **Disponibilidad de trucos** se calcula en
  `src/data/relations.ts:computeAvailability` a partir de los
  prerequisitos y el estado persistido. Reglas detalladas en
  `README.md` § Modelo de datos.
  Estados: `locked`, `available`, `learning`, `mastered`.
- **`generateStaticParams` en `/tricks/[slug]`** enumera los 28
  trucos. Tras editar el catálogo, vuelve a correr `npm run build`
  para refrescar las páginas estáticas.
- **Sin backend, sin auth, sin DB.** El progreso se exporta/importa
  como JSON (blob + `<input type="file">`).

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
- Para botones con estado de carga, usar `Loader2` de `lucide-react`
  con `className="animate-spin"` (queda anulada bajo
  `prefers-reduced-motion`). Mantener siempre `aria-busy` en el botón
  para accesibilidad. La regla operativa completa vive en § Reglas
  obligatorias.

## Lo que NO hacer (según el plan actual)

- No decidir por tu cuenta la arquitectura de Fase 2 (Supabase vs
  backend Node.js vs monorepo). Las opciones viven en `ROADMAP.md` y
  la decisión se toma con el usuario.
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
- [ ] Cargué las skills relevantes de `.agents/skills/` con la
      herramienta `skill` antes de empezar.
- [ ] Si añadí o cambié strings visibles al usuario, están en
      `messages/es.json` **y** `messages/en.json` con misma clave,
      mismo orden y misma estructura.
- [ ] Actualicé `README.md` si cambió algo estructural, técnico o de
  uso.
- [ ] Actualicé `DESIGN.md` si cambié diseño.
- [ ] Actualicé `ROADMAP.md` si cambié fases / features / estado.
- [ ] Ejecuté `typecheck`, `lint` y `build` si existen, en ese orden.
- [ ] No implementé nada fuera de fase sin aprobación explícita.
