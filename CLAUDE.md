# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React, TypeScript, and Vite. It showcases work experience, projects, and certifications in a print-poster look: ink-dark bands, cream paper sections, a hot yellow accent, hard offset shadows, condensed all-caps display type and film-grain/paper textures (see `docs/superpowers/specs/2026-10-30-case-file-redesign-design.md`). The copy is plain: section names, numbers and literal labels, no detective/movie theming.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Component Structure
- **Sections** (`src/components/sections/`): Main page sections (Hero, About, Projects, WorkExperience, Certifications)
- **UI Components** (`src/components/ui/`): Reusable components (Navigation, SectionHead, PaperSheet, Tape, ProjectCard, Modal, Spark)
- **Data Layer** (`src/data/`): Centralized data files with TypeScript interfaces for projects, certifications, and work experience

### Key Patterns
- **CSS Modules**: All components use `.module.css` files for scoped styling
- **TypeScript Interfaces**: Strongly typed data structures for all content
- **Component Composition**: sections compose the shared UI pieces (e.g., Experience and Certifications both render on PaperSheet)
- **Single Page Application**: Smooth scrolling navigation with active section tracking

### Styling Approach
- Visual theme defined in `style-guide.md`; tokens live in `src/index.css`
- Palette: ink `#1a1a18`, cream `#f3e9d2`, paper white `#fff8ec`, yellow `#fabf0b`, orange `#ce6632`, red `#c8311f`
- Type: Oswald 700 (display), Rubik 900 (buttons/big numbers), IBM Plex Mono 500 (eyebrows/labels), Golos Text (body), loaded from Google Fonts in `index.html`
- Global primitives in `src/index.css`: `.container`, `.paper*` surfaces, `.eyebrow`, `.display`, `.mono-label`, `.btn` (hard red offset shadow), `.link-arrow`, `.chip`, `.stamp`, `.tape-strip`, `.grain`
- Textures are inline SVG data URIs (`--grain`, `--paper-layers`); no image assets
- Sections open with the `SectionHead` ink band ("01 / 04", title, short note); `Tape` is the yellow marquee divider
- `PaperSheet` (`src/components/ui/`) is the cream sheet with perforated top, wavy sides, tape and hard ink shadow. The `sheet` variant holds the Experience timeline; the `card` variant is each certificate card. Both sit on orange sections
- Hard shadows and spring easing (`--ease-spring`) instead of glows and blur

### Asset Management
- Profile and project images in `src/assets/`
- Certification images in `src/assets/certifications/`
- Images are imported directly in TypeScript files for bundling

## Testing & Validation

Currently no test framework is configured. When adding tests, first check with the user for preferred testing setup.

## Important Considerations

- The site uses smooth scrolling and section tracking in `App.tsx`
- Navigation updates based on scroll position
- All sections have corresponding IDs for anchor linking
- Focus on maintaining the premium visual design when making changes
- Follow existing CSS module patterns when adding styles