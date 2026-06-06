# DESIGN.md — Sistema de diseño de Trickdex

> Este documento es la **fuente de verdad del diseño** de la app. Cualquier
> persona o IA que trabaje en el repositorio debe leerlo antes de modificar
> estilos, componentes, copy o patrones visuales. Si hay un conflicto entre
> este archivo y el código, gana este archivo. Si encuentras una desviación,
> corrige el código, no este documento.

## 1. Filosofía

Trickdex es una guía de **tricking** (arte marcial acrobático) que mezcla
precisión técnica con energía visual. El diseño debe transmitir tres cosas:

1. **Claridad**: el camino de aprendizaje se ve de un vistazo.
2. **Energía**: la práctica del tricking es atlética y expresiva.
3. **Respeto por la dificultad**: los trucos avanzados deben sentirse
   desafiantes, nunca "fáciles" o infantilizados.

Voz y tono en pantalla:

- Cercano, en segunda persona. Nunca aleccionador.
- Frases cortas,动词 directo. Tuteo en español, "tú" en lugar de "usted".
- Sin marketing vacío ("revolucionario", "el mejor"). Solo hechos útiles.
- Humildad ante el cuerpo: el progreso se gana, no se compra.

## 2. Principios visuales

- **Mobile-first**. Toda pantalla se prueba primero a 360 px.
- **Tipografía fuerte**. Display para títulos, sans para UI.
- **Color con propósito**. Cada nivel tiene su acento; los acentos neón
  señalan progreso, no decoración.
- **Aire y ritmo**. Mínimo 16 px de padding en tarjetas. Mínimo 1.5 en
  line-height de párrafo.
- **Animación breve** (150–250 ms). Nada se mueve por moverse.
- **Accesibilidad por defecto**: foco visible, contraste AA, soporte de
  `prefers-reduced-motion`.

## 3. Tokens de diseño

Los tokens viven como variables CSS en `src/app/globals.css` y se exponen a
Tailwind a través de `tailwind.config.ts`.

### 3.1 Paleta — Tema claro

| Token | HSL | Uso |
|---|---|---|
| `--background` | `40 20% 98%` | Fondo general, blanco hueso cálido |
| `--foreground` | `240 10% 8%` | Texto principal, casi negro |
| `--card` | `0 0% 100%` | Tarjetas y superficies elevadas |
| `--muted` | `240 5% 94%` | Fondos secundarios deshabilitados |
| `--primary` | `188 95% 38%` | CTA principal, cian profesional |
| `--accent` | `188 95% 92%` | Acentos suaves (chips, badges) |
| `--border` | `240 6% 88%` | Bordes 1 px en superficies |
| `--neon-cyan` | `188 95% 42%` | Estado "learning", acentos activos |
| `--neon-magenta` | `320 90% 60%` | Acento decorativo, hover |
| `--neon-lime` | `90 90% 50%` | Estado "mastered", celebración |

### 3.2 Paleta — Tema oscuro

| Token | HSL | Uso |
|---|---|---|
| `--background` | `240 12% 6%` | Fondo casi negro azulado |
| `--foreground` | `0 0% 96%` | Texto principal |
| `--card` | `240 10% 9%` | Tarjetas elevadas, mismo matiz |
| `--muted` | `240 8% 14%` | Superficies secundarias |
| `--primary` | `188 95% 55%` | Cian eléctrico para CTA |
| `--accent` | `188 90% 18%` | Fondo de acentos activos |
| `--border` | `240 8% 18%` | Bordes sutiles |
| `--neon-cyan` | `188 100% 60%` | Estado "learning" |
| `--neon-magenta` | `320 100% 70%` | Acentos decorativos |
| `--neon-lime` | `90 100% 60%` | Estado "mastered" |

### 3.3 Colores por nivel

Cada nivel tiene su propio acento (`--level-1` … `--level-8`). El gradiente
sigue una curva de temperatura: azul frío en los niveles bajos, magenta y
violeta en los altos. Esto refuerza intuitivamente la idea de "calentando"
hasta "experto".

```
L1  hsl(200, 80%, 60%)  azul cielo
L2  hsl(188, 90%, 55%)  cian
L3  hsl(160, 80%, 50%)  verde-azulado
L4  hsl(90, 80%, 55%)   verde lima
L5  hsl(50, 95%, 55%)   amarillo
L6  hsl(28, 95%, 58%)   naranja
L7  hsl(340, 90%, 60%)  rosa fuerte
L8  hsl(280, 85%, 60%)  violeta
```

### 3.4 Tipografía

- **Sans (UI)**: `Inter`, fallback `system-ui`. Pesos 400, 500, 600, 700.
- **Display (títulos)**: `Space Grotesk`, fallback `system-ui`. Pesos 500, 700.
- Escala sugerida (rem, en `font-display`):

  | Uso | Tamaño | Peso |
  |---|---|---|
  | H1 (página) | 3 rem | 700 |
  | H2 (sección) | 1.75 rem | 700 |
  | H3 (tarjeta) | 1.125 rem | 600 |
  | Body | 0.875 rem | 400 |
  | Caption | 0.6875 rem | 600 (uppercase tracking) |

- Letter spacing `-0.02em` en H1, `0.08em` en captions uppercase.

### 3.5 Radios, sombras, duraciones

- `--radius`: `0.75rem` (base). Tarjetas: `lg`, chips: `sm`, botones: `md`.
- Sombras: 3 niveles, `shadow-sm` (hover ligero), `shadow` (tarjetas en
  hover), `shadow-lg` (modales y el `MediaPreview` del detalle de truco).
- Glow neón reservado a CTAs primarias y al logo. Nunca en texto corrido.
- Duración: `200 ms` para hover, `300 ms` para entrada de páginas y
  modales, `150 ms` para focus ring.

## 4. Componentes

### 4.1 Inventario

| Componente | Variantes | Notas |
|---|---|---|
| `Button` | default, destructive, outline, secondary, ghost, link, neon | Tamaños sm, default, lg, icon |
| `Card` | — | Header, Content, Footer opcionales |
| `Badge` | default, secondary, destructive, outline, muted | Texto uppercase 10 px |
| `Dialog` | — | Radix, con overlay blur |
| `Tabs` | — | Reservado para vistas comparativas futuras |
| `Input` / `Textarea` | — | Focus ring primary, altura 40 px |
| `Select` | — | Radix, búsqueda nativa del navegador |
| `Separator` | horizontal / vertical | 1 px con color `--border` |
| `DropdownMenu` | — | Usado en ThemeToggle y LocaleSwitcher |
| `StatusBadge` | locked / available / learning / mastered | Icono + texto |
| `LevelBadge` | L1–L8 | Color por nivel, título traducido |
| `TrickCard` | — | Hover: borde primary, sombra media |
| `TrickGrid` | 1, 2, 3 columnas | Responsive sm/lg |
| `LevelGrid` | — | Usado en Home, muestra progreso por nivel |
| `MediaPreview` | webm / mp4 / gif / poster | Loop silencioso, `playsinline` |
| `ProgressToggle` | segmented | 4 opciones, radio group accesible |
| `ProgressStats` | 4 contadores | Tarjetas individuales |
| `ProgressByLevel` | barras | Indican ratio dominados/total |
| `ProgressActions` | export / import / reset | Confirm dialog en reset |

### 4.2 Reglas de uso

- **`TrickCard`** se usa en catálogos y grids. Nunca en cabecera de página.
- **`TrickDetail`** es la única página que muestra la barra de relaciones
  (prereq, variations, entries, exits). No se replica en cards.
- **`LevelBadge`** debe aparecer siempre que se muestre un truco, junto al
  título. No al lado de la familia.
- **`MediaPreview`** debe tener siempre `alt` descriptivo en el idioma
  actual. En el MVP, si no hay video, muestra el poster (placeholder SVG).
- **`StatusBadge`** vive en cards y detalles. No se duplica; el
  `ProgressToggle` es la versión interactiva.
- **`ProgressToggle`** solo aparece en `TrickDetail`. No en cards.
- **Confirmaciones destructivas** (reset) siempre van dentro de un `Dialog`.

### 4.3 Estados

- `loading`: skeletons solo en rutas con fetch futuro. En el MVP, los
  datos son estáticos, no se necesitan.
- `empty`: copy en una sola línea, centrado, con un enlace a "Limpiar
  filtros" cuando aplique.
- `error`: solo se muestra si falla `importJSON`. Toast rojo, copy breve.

## 5. Iconografía

`lucide-react` es la fuente única. Tamaños:

- 12 px: chips, captions.
- 14 px: navegación.
- 16 px: UI general.
- 20–24 px: CTA y cards.

Nunca mezclar familias. El glifo `↻ ↺ ⚡ ↗ ◯ ↔` se usa como fallback
tipográfico de `TrickCard` cuando no hay icono de familia asignado.

## 6. Voz y tono (UI en pantalla)

| ES | EN |
|---|---|
| Truco / truco destacado | Trick / featured trick |
| Nivel / hoja de ruta | Level / roadmap |
| Prerequisito / Variación | Prerequisite / Variation |
| Entrada / Salida | Entry / Exit |
| Aprendiendo / Dominado / Bloqueado / Disponible | Learning / Mastered / Locked / Available |
| Restablecer | Reset |
| Exportar / Importar | Export / Import |

Evitar:

- "Fácil", "sencillo", "para todos". Un backflip no es fácil.
- "Click aquí". Usar verbos: "Empezar", "Ver catálogo".
- Emoji decorativo en UI. Solo en copy, con moderación.

## 7. i18n (ES / EN)

- Locales soportados: `es` (default), `en`. Configurados en
  `src/i18n/routing.ts`.
- Rutas con prefijo obligatorio: `/es/...`, `/en/...`. El middleware
  redirige `/` → `/es`.
- Mensajes en `messages/es.json` y `messages/en.json`. Mismas claves, mismo
  orden de claves.
- Textos visibles siempre vía `useTranslations` (cliente) o
  `getTranslations` (servidor). Nunca hardcoded en JSX.
- `LocaleSwitcher` preserva la ruta actual y consulta el locale activo.

## 8. Tema dark / light

- `next-themes` con estrategia `class`. La clase `dark` se aplica a
  `<html>`.
- Default: `system`. Si el sistema cambia, la app reacciona en tiempo
  real.
- `disableTransitionOnChange` para evitar parpadeos en el toggle.
- Persistencia en `localStorage` con clave gestionada por `next-themes`.

## 9. Accesibilidad

- Foco visible en todo interactivo: `ring-2 ring-ring ring-offset-2`.
- Contraste mínimo AA. Los acentos neón se usan sobre fondos oscuros o
  con texto blanco.
- `prefers-reduced-motion`: media query global en `globals.css` que
  desactiva animaciones y video autoplay se mantiene (los videos
  requieren acción para reproducirse con `reduced-motion`).
- `aria-label` en botones icono y en `MediaPreview`.
- Roles semánticos: `<header>`, `<main>`, `<footer>`, `<nav>`,
  `<aside>`.

## 10. Do / Don't

### Do

- Mostrar el progreso del usuario visible y en menos de 2 taps desde
  cualquier página.
- Usar `LevelBadge` + nombre del truco como mínimo al presentar un
  truco.
- Mostrar el `StatusBadge` aunque no haya progreso; el estado inicial
  siempre es "available" (o "locked" si tiene prereqs sin cumplir).
- Mantener copy breve y directo.

### Don't

- Glassmorphism ni blur decorativo. La estética es sólida y deportiva.
- Gradientes chillones sobre texto. Solo en fondos de tarjetas vacías o
  level grid.
- Animaciones de más de 300 ms.
- Botones con icono + texto + icono.
- Más de 2 CTAs primarias por pantalla.

## 11. Anti-patterns a evitar

- Inventar nuevos tokens de color. Si necesitas un acento, usa uno de
  los tres neón existentes o extiende el set documentándolo aquí.
- Componentes con más de 3 niveles de prop drilling sin contexto.
- Dependencias de UI nuevas sin discutirlo en `ROADMAP.md`.
- Texto visible hardcodeado en JSX sin pasar por `useTranslations`.

## 12. Cómo extender el sistema

1. **Nuevo color**: añadir variable CSS en `globals.css`, exponerla en
   `tailwind.config.ts` y documentarla aquí (sección 3).
2. **Nuevo componente**: si es reutilizable, vive en `src/components/ui/`.
   Si es de dominio, en `src/components/<dominio>/`. Documentar en
   sección 4.1.
3. **Nuevo idioma**: añadir locale en `routing.ts`, crear
   `messages/<locale>.json` con las mismas claves que `es.json` y
   actualizar `LABELS` en `LocaleSwitcher`.
4. **Nuevo nivel**: añadir entrada en `levels.ts`, en `globals.css` con
   `--level-N`, en `tailwind.config.ts`, y documentar en sección 3.3.
