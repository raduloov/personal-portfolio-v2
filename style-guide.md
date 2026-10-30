# Style Guide

## Brand Identity
A printed-poster aesthetic: ink-dark bands split by cream paper sections, a hot
yellow accent, hard offset shadows, condensed all-caps display type and
monospace labels. Everything looks printed, pinned or taped rather than
rendered. Film grain sits over the whole page; paper sections carry a subtle
blotchy texture.

Copy stays plain. Section titles are literal (About, Experience, Projects,
Certifications, Contact), labels say what they are ("Built with", "Links",
"Tap to view") and numbering is just "№ 01" or "01 / 04". No detective, movie
or "wanted poster" wording; the look carries the character on its own.

## Color Palette

```css
--ink: #1a1a18;          /* page base, dark bands, text on paper */
--ink-raised: #24231f;   /* slightly lifted ink surface */
--cream: #f3e9d2;        /* paper sections, text on ink */
--paper-white: #fff8ec;  /* cards sitting on cream paper */
--yellow: #fabf0b;       /* accent: CTAs, active nav, stamps, contact */
--orange: #ce6632;       /* experience section */
--red: #c8311f;          /* hard button shadow, display accents, push pins */
```

Alpha variants: `--cream-90/70/40/15`, `--ink-86/70/55/15`.

Rules of thumb:
- Ink on cream for reading; cream on ink for section heads and the projects band.
- Yellow is for one thing per view: the primary action or the active state.
- Red never fills a surface; it is a shadow, a pin, or a second line of a heading.

## Typography

| Role | Font | Weight | Treatment |
|---|---|---|---|
| Display | Oswald | 700 | uppercase, letter-spacing -0.012em, line-height 0.86–0.9 |
| Heavy | Rubik | 900 | buttons, big numbers, dates |
| Labels | IBM Plex Mono | 500 | uppercase, letter-spacing 0.12–0.38em |
| Body | Golos Text | 400 / 600 | 1.0625rem, line-height 1.6 |

Display headings get a hard text shadow (`0.028em 0.018em 0 var(--red)` on
yellow, `var(--yellow)` on ink) for a misregistered-print feel.

## Textures
- `--film-grain`: opaque grey white-noise tile (128px, full black-to-white
  range, ~2px features so it reads on retina), fixed over the whole page at 8% opacity with a six-step jitter at
  0.9s (`.grain`), the same recipe as the reference site.
- `--grain`: fine alpha-only turbulence, multiplied into ink surfaces.
- `--paper-layers`: two half-offset SVG noise tiles with feathered edges,
  multiplied onto cream, white, yellow and orange surfaces (`.paper`,
  `.paper--white`, `.paper--yellow`, `.paper--orange`).

## Components

### Buttons (`.btn`)
Pill, Rubik 900 uppercase, yellow with a `3px 3px 0 var(--red)` hard shadow.
Hover lifts toward the light (`translate(-2px,-2px)`, shadow 5px); press sinks
into the shadow (`translate(3px,3px)`, shadow 0). Variants: `.btn--ink`,
`.btn--outline`, sizes `.btn--sm`, `.btn--lg`.

### Links (`.link-arrow`)
Mono uppercase with a 1.5px underline and an arrow that nudges right on hover.

### Chips, stamps, tape
- `.chip`: 1.5px outlined mono tag.
- `.stamp`: yellow block with ink double border, rotated a few degrees.
- `.tape-strip`: torn masking-tape strip pinned to the top of a card.

### Section head (`SectionHead`)
Ink band with a mono eyebrow "01 / 04", giant cream
Oswald title and a short mono note ("Who I am ✦ YR") underneath.

### Cards
- **Timeline** (experience): centered 2px ink line with yellow dot markers
  (ink border, red hard shadow); Rubik dates on the left, Oswald role, mono
  company/location, red bullet dots and chips on the right. Line moves to the
  left edge on mobile.
- **Paper windows** (projects): a cream macOS window with a 2px ink frame and a
  hard yellow offset shadow. Paper-white title bar with ink-outlined red /
  yellow / cream traffic lights, the site's host in mono and "№ 01" on the
  right; 16:10 screenshot with a yellow language tag; Oswald title with the
  date in Rubik, body copy, chips, dashed rule, then buttons. On hover the
  window tilts in 3D toward the pointer (max 8°) and eases back on leave.
- **Paper sheet** (`PaperSheet`): cream paper on an orange section with a
  perforated top edge (4.5px bites on a 16px pitch cut into the outline),
  gently wavy sides, faint creases, two tape strips and a hard ink shadow that
  follows the same outline. The `sheet` variant is the long Experience
  timeline sheet; the `card` variant is a single certificate card.
- **Certificate cards**: a `card` paper sheet with the number and date, a
  rotated issuer stamp, chips and "Tap to view"; random tilt per slot.
- **Polaroid** (about): white frame, hard ink offset shadow, tilted.

### Header
Fixed and always transparent. Centered mono pill nav that drops in on load
with staggered items; a yellow indicator slides between items with the
spring easing. Mobile: round
hamburger that turns yellow and rotates into an X, and a full-screen ink
drawer whose rows cascade in.

## Motion
- `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` for most transitions.
- `--ease-spring` for cards straightening and modal entry.
- `--dur-press: 0.14s`, `--dur-ui: 0.24s`, `--dur-spring: 0.6s`.
- Marquee tape scrolls continuously; everything respects
  `prefers-reduced-motion`.

## Layout
- `.container`: `min(100% - 2 * var(--gutter), 1320px)`, gutter
  `clamp(16px, 4vw, 56px)`.
- Section padding `clamp(64px, 9vw, 140px)`.
- Breakpoints used: 560px, 640px, 768px, 860px, 960px, 1000px, 1100px.
