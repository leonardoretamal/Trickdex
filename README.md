# Trickdex

> **Trickdex** es una web app de **roadmap de tricking**: un catálogo
> abierto, ordenado por niveles, que te guía desde tus primeros saltos
> hasta las combinaciones más complejas. Marca tu progreso localmente,
> descubre prerequisitos, entradas y salidas, y vuelve cuando quieras.

> 🇪🇸 La app está traducida al **español** y al **inglés** desde el primer
> día. Este README y el resto de la documentación del repositorio están
> escritos **en español** por decisión del proyecto. La interfaz puede
> alternar entre ambos idiomas con el selector del header.

---

## Tabla de contenidos

1. [Stack](#stack)
2. [Quickstart](#quickstart)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Sistema de diseño](#sistema-de-diseño)
5. [Modelo de datos](#modelo-de-datos)
6. [i18n y tema](#i18n-y-tema)
7. [Añadir un truco nuevo](#añadir-un-truco-nuevo)
8. [Variables de entorno](#variables-de-entorno)
9. [Scripts disponibles](#scripts-disponibles)
10. [Roadmap](#roadmap)
11. [Créditos y licencia](#créditos-y-licencia)

---

## Stack

| Capa | Herramienta |
|---|---|
| Framework | [Next.js 14](https://nextjs.org) con App Router |
| Lenguaje | [TypeScript](https://www.typescriptlang.org/) |
| Estilos | [Tailwind CSS v3](https://tailwindcss.com) con tokens CSS |
| UI | Patrones shadcn/ui (Radix + `class-variance-authority`) |
| Tema | [next-themes](https://github.com/pacocoursey/next-themes) (claro / oscuro / sistema) |
| i18n | [next-intl](https://next-intl-docs.vercel.app) con routing `[locale]` |
| Estado local | [Zustand](https://zustand-demo.pmnd.rs) con `persist` en `localStorage` |
| Iconos | [lucide-react](https://lucide.dev) |
| Toasts | [sonner](https://sonner.emilkowal.ski) |
| Deploy objetivo | [Vercel](https://vercel.com) (free tier) |

No hay backend, no hay base de datos, no hay auth. Todo el progreso vive
en el navegador del usuario y se puede exportar/importar como JSON.

---

## Quickstart

Requisitos: **Node.js 20 o superior** (`nvm use` si tienes `.nvmrc`).

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo
npm run dev
# → http://localhost:3000
# → redirige a /es automáticamente

# 3. Build de producción
npm run build

# 4. Lint y typecheck
npm run lint
npm run typecheck
```

> La primera vez que abras la app, el middleware de `next-intl` te
> redirigirá a `/es`. Cambia al inglés con el selector 🌐 del header.

---

## Estructura del proyecto

```
tricking-roadmap/
├── DESIGN.md                 # sistema de diseño (tokens, componentes, voz)
├── ROADMAP.md                # fases y entregables, con checkboxes
├── README.md                 # este archivo
├── messages/
│   ├── es.json               # strings ES
│   └── en.json               # strings EN
├── public/
│   └── media/
│       ├── tricks/           # clips .webm/.mp4 por truco (vacío por ahora)
│       └── thumbs/           # posters/placeholders
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                  # Home / Roadmap
│   │   │   ├── tricks/
│   │   │   │   ├── page.tsx              # Catálogo
│   │   │   │   └── [slug]/page.tsx       # Ficha
│   │   │   ├── progress/page.tsx
│   │   │   └── about/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx                    # root (passthrough)
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/                       # Header, Footer, Providers, switches
│   │   ├── tricks/                       # Card, Grid, Detail, Filters, etc.
│   │   ├── progress/                     # Toggle, Stats, Actions
│   │   └── ui/                           # primitivas estilo shadcn
│   ├── data/
│   │   ├── levels.ts
│   │   ├── tricks.ts
│   │   └── relations.ts
│   ├── i18n/
│   │   ├── routing.ts
│   │   └── request.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── slug.ts
│   ├── stores/
│   │   └── progressStore.ts              # Zustand + persist
│   ├── styles/
│   │   └── tokens.css
│   ├── types/
│   │   └── index.ts
│   └── middleware.ts
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── components.json
```

---

## Sistema de diseño

El sistema vive en [`DESIGN.md`](./DESIGN.md). Léelo antes de tocar
estilos, copy o componentes. Cubre:

- Filosofía visual y principios de diseño.
- Tokens de color para los temas **claro** y **oscuro** (con paleta neón).
- Escala tipográfica y reglas de uso de fuentes (`Inter` + `Space Grotesk`).
- Inventario de componentes y cuándo usar cada uno.
- Voz y tono del copy (ES y EN).
- Reglas de i18n, accesibilidad, dark/light.
- **Do / Don't** y anti-patterns a evitar.

---

## Modelo de datos

Todo está en `src/data/` y en `src/types/`. El dato crudo de cada truco
vive en `tricks.ts` (id, slug, nivel, familia, prereq, variaciones,
entradas, salidas, media, dificultad). Los **nombres y descripciones
visibles** se cargan vía `messages/{es,en}.json` con la clave
`tricks.<id>`. Esto evita duplicar el catálogo por idioma.

Reglas de disponibilidad (en `src/data/relations.ts`):

- Sin prerequisitos → siempre `available` (o `mastered` si así lo marca
  el usuario).
- Con prerequisitos → `available` solo si **todos** los prereqs están en
  `learning` o `mastered`. Si falta alguno, queda `locked`.
- Los estados `learning` y `mastered` los fija el usuario; `locked` y
  `available` se derivan.

---

## i18n y tema

- **Idiomas**: `es` (default) y `en`. Activados en `src/i18n/routing.ts`.
- **Rutas**: siempre con prefijo de locale. El middleware redirige `/` a
  `/es` y preserva la ruta al cambiar idioma.
- **Strings**: en `messages/{es,en}.json`. Mismas claves, mismo orden.
- **Tema**: `next-themes` con estrategia `class` en `<html>`. Tres
  opciones (claro, oscuro, sistema). La preferencia se guarda en
  `localStorage` y respeta `prefers-color-scheme` en la primera visita.

Para añadir un nuevo idioma, sigue los pasos documentados en
`DESIGN.md` § 12.

---

## Añadir un truco nuevo

1. Edita `src/data/tricks.ts` y añade un objeto `Trick` al array `tricks`.
   Mantén `id`, `slug`, `level`, `family`, `prereq`, `variations`,
   `entries`, `exits`, `media`, `difficulty`. El `i18nKey` debe ser
   `tricks.<id>`.
2. Edita `messages/es.json` y `messages/en.json` para añadir las entradas
   bajo `tricks.<id>` con `name`, `short`, `description` y, si quieres,
   `tips` y `variations`. Mantén la misma estructura de claves en ambos
   idiomas.
3. Si quieres un thumbnail propio, añade `public/media/thumbs/<id>.svg`
   (o `.jpg`). Si no, el `MediaPreview` mostrará
   `public/media/thumbs/placeholder.svg`.
4. Si tienes un clip en `.webm` o `.mp4`, colócalo en
   `public/media/tricks/<id>.webm` y actualiza `trick.media` para
   referenciarlo (el componente prefiere webm y cae a mp4).

> No hace falta tocar la ficha ni la grilla: ambos derivan del array
> `tricks`.

---

## Variables de entorno

No hay variables de entorno obligatorias. La app es 100% estática y no
realiza llamadas externas. Si en el futuro necesitas claves para
analítica o un CMS, documenta aquí los nombres exactos.

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción (requiere `build` previo) |
| `npm run lint` | ESLint con la config de Next |
| `npm run typecheck` | TypeScript sin emitir (`tsc --noEmit`) |

---

## Roadmap

El plan completo, con checkboxes que se actualizan a medida que se
completa trabajo, está en [`ROADMAP.md`](./ROADMAP.md). Incluye dos
fases:

- **Fase 1 — MVP base**: scaffold, i18n, tema, catálogo, ficha, progreso
  local, dark/light, DESIGN.md, ROADMAP.md y este README. **En curso**.
- **Fase 2 — Engagement**: skill tree visual, combos, PWA, sync en la
  nube, comunidad. **No se implementa en el MVP**.

---

## Créditos y licencia

- Diseño y código: construido con cariño por la comunidad de tricking.
- Iconos: [lucide](https://lucide.dev), ISC.
- UI patterns: [shadcn/ui](https://ui.shadcn.com), MIT.
- License: MIT (a confirmar antes del primer release público).
