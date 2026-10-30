# macOS Window Project Cards with 3D Tilt Hover

## Overview

Redesign the portfolio's project cards to resemble macOS application windows, complete with a traffic-light title bar and a 3D tilt hover effect that follows the cursor.

## Title Bar

- Height: ~40px
- Background: slightly lighter than card body (`rgba(255,255,255,0.04)`)
- Border-bottom: `1px solid rgba(255,255,255,0.06)`
- Left side: three circles (12px diameter, 8px gap)
  - Red: `#ff5f57`
  - Yellow: `#febc2e`
  - Green: `#28c840`
- Dots are purely decorative (no click behavior)
- Filename centered in the title bar using a spacer technique: traffic lights on left, an equal-width invisible spacer on right, filename in a `flex: 1; text-align: center` middle element. Muted text (`rgba(255,255,255,0.5)`, ~13px)
  - Format: `project-name.ext` where ext maps from the project's `language` field
  - Language-to-extension mapping (exhaustive for current data):
    - TypeScript -> `.tsx`
    - JavaScript -> `.js`
    - Swift -> `.swift`
    - Kotlin -> `.kt`
    - C++ -> `.cpp`
  - Fallback for unmapped or missing language: kebab-cased name with no extension
  - Title derived by kebab-casing the project name + extension (e.g., "Uniswap Position Tracker" with language "TypeScript" -> `uniswap-position-tracker.tsx`)

## Window Body

- Project image fills content area (same `Image` component, same heights)
- Below image: existing content layout preserved
  - Title + language badge + date row
  - Description paragraph
  - Tags row (orange accent pills)
  - Links row (Live Demo / View Code)

## DOM Structure

```
div.macWindow          <- perspective: 1000px; overflow: hidden; border-radius: 12px
  div.projectCard      <- receives transform (rotateX/rotateY) via inline style; useRef target
    div.titleBar       <- traffic lights + centered filename
    div (Image)        <- project image
    div.projectContent <- title, description, tags, links
```

- `.macWindow` is the outer wrapper: holds `perspective`, `overflow: hidden`, border-radius, border, and background
- `.projectCard` is the inner transforming element: receives `transform` via inline style from mouse tracking
- `useRef` attaches to `.projectCard` (the element whose `getBoundingClientRect()` is measured for tilt calculation)

## Card Container (`.macWindow`)

- Background: `var(--tertiary-bg)` (matches current Card)
- Border-radius: 12px (macOS-like rounded corners)
- Border: `1px solid rgba(255,255,255,0.05)`, transitions to `rgba(255, 159, 67, 0.2)` on hover
- `overflow: hidden` (lives here, NOT on the transforming `.projectCard`, to avoid clipping box-shadow and interfering with `preserve-3d`)
- `perspective: 1000px`
- `transform-style: preserve-3d` (required for child's 3D transforms to render properly)
- `height: 100%` (fills grid cell, same as current `.projectCard`)
- No padding (title bar and image are edge-to-edge)

## 3D Tilt Hover Effect

### Mouse Tracking (JS)
- `onMouseMove` on `.macWindow`: calculate cursor position relative to `.macWindow`'s bounding rect (use `useRef` on `.macWindow` for `getBoundingClientRect()`, since it is untransformed and stable)
  - `rotateY = ((x - centerX) / halfWidth) * MAX_TILT` (max ~8 degrees)
  - `rotateX = -((y - centerY) / halfHeight) * MAX_TILT` (negative for natural tilt direction)
- `onMouseEnter`: set `isHovering = true` (state variable)
- `onMouseLeave`: set `isHovering = false`, reset transform to `rotateX(0) rotateY(0)`
- Transform applied as inline `style={{ transform }}` on `.projectCard`
- `transform-origin: center center` on `.projectCard` (explicit, matches default)

### Shadow
- Default: `var(--shadow-md)` on `.macWindow` (token defined in global CSS custom properties; fallback: `0 4px 6px rgba(0,0,0,0.3)`)
- On hover: static enhanced shadow (no dynamic tracking — keeps it simple):
  - `box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(255, 159, 67, 0.1)`

### Transition Switching
- `.projectCard` base CSS: `transition: transform 0.5s ease-out` (slow return for mouse leave)
- When `isHovering` is true, add a `.tilting` modifier class: `transition: transform 0.15s ease-out` (responsive tracking)
- Implementation: `className={isHovering ? styles.tilting : ''}` applied alongside `.projectCard`

### Mobile
- 3D tilt disabled via CSS media query `@media (hover: hover)` — only apply tilt styles/transitions on devices with hover capability. Mouse handlers in JS are always attached but produce no visual effect without the CSS transitions.
- Fallback: simple `translateY(-4px)` lift on active state via CSS

## File Changes

### `src/components/ui/ProjectCard.tsx`
- Remove `Card` wrapper, build the macOS window structure directly using `.macWindow` > `.projectCard`
- Add title bar with traffic light dots and centered filename
- Add `onMouseMove`, `onMouseEnter`, `onMouseLeave` handlers on `.macWindow` for tilt
- Use `useRef<HTMLDivElement>` for `.macWindow` (bounding rect measurement — untransformed, stable geometry)
- Use `useState` for `transform` string and `isHovering` boolean
- Add utility function `toFilename(title: string, language?: string): string` — kebab-cases the title, appends mapped extension or nothing

### `src/components/ui/ProjectCard.module.css`
- New: `.macWindow` — outer wrapper with perspective, overflow hidden, border-radius, border, background, shadow, hover border transition
- New: `.titleBar` — flex row, centered filename (`justify-content: center` with dots positioned via a spacer or absolute)
- New: `.trafficLights` — flex container for the three dots
- New: `.dot`, `.dotRed`, `.dotYellow`, `.dotGreen` — colored circles (12px, border-radius 50%)
- New: `.windowTitle` — centered muted filename text
- New: `.tilting` — `transition: transform 0.15s ease-out` (applied when hovering)
- Update: `.projectCard` — base transition `transform 0.5s ease-out`, no overflow hidden
- Keep: `.projectContent`, `.projectTags`, `.projectTag`, `.projectLinks`, `.projectLink`, `.languageLabel`, `.languageDot`, `.languageName`

### `src/components/ui/Card.module.css`
- Do NOT remove `.card:hover` globally (other components like Certifications use it)
- Instead, override in `ProjectCard.module.css` if needed — but since ProjectCard will no longer use `Card` component at all, no change needed here

### No changes to:
- `Projects.tsx` (grid layout stays the same)
- `Projects.module.css`
- `projectsData.ts` (data structure unchanged)
- `Image.tsx` / `Image.module.css`
- `Card.tsx` / `Card.module.css` (no longer used by ProjectCard, left intact for other components)

## Responsive Behavior

- Desktop (>768px): full 3D tilt effect
- Tablet/Mobile (<=768px): disable tilt, use simple translateY lift on active state
- Image heights: same breakpoints as current (250px -> 200px -> 180px)
