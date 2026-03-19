# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React, TypeScript, and Vite. It showcases work experience, projects, and certifications with a premium dark theme design featuring vibrant orange accents.

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
- **UI Components** (`src/components/ui/`): Reusable components (Button, Card, Modal, Navigation, ProjectCard, etc.)
- **Data Layer** (`src/data/`): Centralized data files with TypeScript interfaces for projects, certifications, and work experience

### Key Patterns
- **CSS Modules**: All components use `.module.css` files for scoped styling
- **TypeScript Interfaces**: Strongly typed data structures for all content
- **Component Composition**: UI components build on base components (e.g., ProjectCard uses Card and Image)
- **Single Page Application**: Smooth scrolling navigation with active section tracking

### Styling Approach
- Premium dark theme defined in `style-guide.md`
- CSS custom properties for design tokens
- Responsive breakpoints: 640px, 768px, 1024px, 1280px, 1536px
- Glass morphism effects and subtle animations
- Orange accent color (#FF9F43) throughout

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