# Tech Pool — Floating SVG Logos

## Overview

A full-width ambient section placed directly after Work Experience, containing randomly positioned SVG tech logos that gently float in place.

## Container

- New section after Work Experience, no heading
- Background: `var(--primary-bg)` (same as Work Experience) or a subtle variation
- Padding: generous vertical (~80-120px) so logos have breathing room
- `position: relative; overflow: hidden` to contain floating logos
- Min-height: ~300px to ensure the pool has presence

## Logos

### Source
- Extract unique technologies from `workExperienceData[].technologies` automatically
- Deduplicate across all jobs
- Current unique set: React, React Native, Node.js, TypeScript, JavaScript, AWS, PostgreSQL, Docker, Microservices, Mobile Development, HTML/CSS, Git

### SVG Icons
- Use inline SVG components for each technology
- Map tech name -> SVG icon in a `techIcons` record
- For techs without a recognizable logo (Microservices, Mobile Development), either use a generic icon or skip them

### Visual Treatment
- Opacity: 0.15-0.35 range (ambient, not attention-grabbing)
- Size: varying between 32-56px per logo for depth
- Color: monochrome white or subtle orange tint to match theme

## Positioning

- Each logo gets a random position within the container (percentage-based `top` and `left`)
- Positions derived deterministically from tech name (simple hash function) so they don't shuffle on re-render
- No two logos should heavily overlap — spread across the full container area

### Hash Function
```typescript
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}
```

Use modular arithmetic on the hash to derive: x position (0-90%), y position (0-80%), size (32-56px), animation duration (3-6s), animation delay (0-5s).

## Float Animation

- CSS `@keyframes float` with small translateX/translateY movement (5-10px range)
- Multiple keyframe variants (2-3) for variety so logos don't all move the same direction
- `animation: float <duration>s infinite ease-in-out alternate`
- Duration: 3-6s per logo (derived from hash)
- Delay: 0-5s per logo (derived from hash) so they start out of phase

### Keyframes
```css
@keyframes float1 {
  from { transform: translate(0, 0); }
  to { transform: translate(8px, -6px); }
}

@keyframes float2 {
  from { transform: translate(0, 0); }
  to { transform: translate(-6px, 8px); }
}

@keyframes float3 {
  from { transform: translate(0, 0); }
  to { transform: translate(5px, 10px); }
}
```

Each logo assigned a variant based on `hash % 3`.

## File Changes

### New: `src/components/sections/TechPool.tsx`
- Import `workExperienceData`
- Extract unique techs
- `hashString` utility function
- `techIcons` map: tech name -> inline SVG JSX
- Render container with absolutely positioned logos
- Each logo gets computed position, size, animation from hash

### New: `src/components/sections/TechPool.module.css`
- `.pool` — container with relative positioning, overflow hidden, padding, min-height
- `.logo` — absolute positioning, opacity, pointer-events none
- `@keyframes float1/float2/float3`
- Responsive: reduce min-height and logo sizes on mobile

### Modify: `src/App.tsx`
- Import and render `<TechPool />` directly after `<WorkExperience />`

### No changes to:
- `WorkExperience.tsx`
- `workExperienceData.ts`

## Responsive

- Desktop: full pool with all logos visible
- Mobile (<=768px): reduce min-height to ~200px, scale down logo sizes slightly
