# macOS Window Project Cards Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign project cards to look like macOS application windows with traffic-light title bars and a 3D tilt hover effect that follows the cursor.

**Architecture:** Replace the `Card` wrapper in `ProjectCard` with a two-div structure: `.macWindow` (perspective container) > `.projectCard` (transforming inner). Add mouse event handlers for 3D tilt, a `toFilename` utility for title bar text, and CSS for the macOS chrome.

**Tech Stack:** React, TypeScript, CSS Modules, Vite

**Spec:** `docs/superpowers/specs/2026-03-27-macos-window-project-cards-design.md`

**Note:** No test framework is configured in this project. Verification is done by visual inspection via `npm run dev` and `npm run build` for type/lint checks.

---

## Chunk 1: CSS Foundation + macOS Chrome

### Task 1: Write the new CSS for `.macWindow` and title bar

**Files:**
- Modify: `src/components/ui/ProjectCard.module.css`

- [ ] **Step 1: Replace `.projectCard` styles and add new macOS classes**

Replace the top of `ProjectCard.module.css` with the new structure. Keep all existing content/tag/link styles intact.

```css
/* macOS Window wrapper — perspective container, holds visual chrome */
.macWindow {
  perspective: 1000px;
  transform-style: preserve-3d;
  height: 100%;
  background: var(--tertiary-bg);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: box-shadow 0.3s ease-out, border-color 0.3s ease-out;
}

.macWindow:hover {
  border-color: rgba(255, 159, 67, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 159, 67, 0.1);
}

/* Inner card — receives 3D transform only */
.projectCard {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  transform-origin: center center;
  transition: transform 0.5s ease-out;
}

.projectCard.tilting {
  transition: transform 0.15s ease-out;
}

/* Title bar */
.titleBar {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.trafficLights {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  width: 56px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dotRed {
  background-color: #ff5f57;
}

.dotYellow {
  background-color: #febc2e;
}

.dotGreen {
  background-color: #28c840;
}

.windowTitle {
  flex: 1;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Spacer to balance traffic lights for centering */
.titleBarSpacer {
  width: 56px;
  flex-shrink: 0;
}
```

- [ ] **Step 2: Update responsive styles**

Replace the responsive section at the bottom of the file:

```css
/* Responsive */
@media (max-width: 768px) {
  .macWindow {
    max-width: 100%;
  }

  .projectCard :global(.project-image) {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .projectCard :global(.project-image) {
    height: 180px;
  }
}

/* Only enable tilt transitions on hover-capable devices */
@media (hover: hover) {
  .projectCard {
    transition: transform 0.5s ease-out;
  }

  .projectCard.tilting {
    transition: transform 0.15s ease-out;
  }
}

/* Touch devices: simple lift on active */
@media (hover: none) {
  .projectCard:active {
    transform: translateY(-4px);
    transition: transform 0.3s ease-out;
  }
}
```

- [ ] **Step 3: Verify build passes**

Run: `npm run build`
Expected: No TypeScript or CSS errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ProjectCard.module.css
git commit -m "style: add macOS window CSS for project cards"
```

---

### Task 2: Rewrite ProjectCard component with macOS structure

**Files:**
- Modify: `src/components/ui/ProjectCard.tsx`

- [ ] **Step 1: Rewrite the full file with macOS window structure**

Note: This removes the `Card` import — `ProjectCard` no longer depends on the `Card` component.

Replace the entire contents of `ProjectCard.tsx` with:

```typescript
import { useRef, useState } from 'react'
import { Image } from './Image'
import { getLanguageColor } from '../../utils/languageColors'
import styles from './ProjectCard.module.css'

const languageExtensions: Record<string, string> = {
  TypeScript: '.tsx',
  JavaScript: '.js',
  Swift: '.swift',
  Kotlin: '.kt',
  'C++': '.cpp',
}

function toFilename(title: string, language?: string): string {
  const kebab = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  const ext = language ? (languageExtensions[language] ?? '') : ''
  return `${kebab}${ext}`
}

interface ProjectCardProps {
  title: string
  description: string
  image?: string
  tags: string[]
  demoUrl?: string | null
  gitUrl?: string | null
  date?: string
  language?: string
}

const MAX_TILT = 8

export function ProjectCard({ title, description, image, tags, demoUrl, gitUrl, date, language }: ProjectCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateY = ((x - centerX) / centerX) * MAX_TILT
    const rotateX = -((y - centerY) / centerY) * MAX_TILT
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTransform('rotateX(0deg) rotateY(0deg)')
  }

  const cardClasses = `${styles.projectCard}${isHovering ? ` ${styles.tilting}` : ''}`

  return (
    <div
      ref={wrapperRef}
      className={styles.macWindow}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={cardClasses} style={{ transform }}>
        <div className={styles.titleBar}>
          <div className={styles.trafficLights}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
          </div>
          <span className={styles.windowTitle}>{toFilename(title, language)}</span>
          <div className={styles.titleBarSpacer} />
        </div>
        <Image
          src={image}
          alt={title}
          placeholder="[Project Image]"
          className="project-image"
        />
        <div className={styles.projectContent}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <h3 style={{ margin: 0 }}>{title}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
              {language && (
                <div className={styles.languageLabel}>
                  <span
                    className={styles.languageDot}
                    style={{ backgroundColor: getLanguageColor(language) }}
                  />
                  <span className={styles.languageName}>{language}</span>
                </div>
              )}
              {date && <small style={{ color: 'var(--text-tertiary)' }}>{date}</small>}
            </div>
          </div>
          <p>{description}</p>
          <div className={styles.projectTags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.projectTag}>{tag}</span>
            ))}
          </div>
          {(demoUrl || gitUrl) && (
            <div className={styles.projectLinks}>
              {demoUrl && (
                <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                  Live Demo →
                </a>
              )}
              {gitUrl && (
                <a href={gitUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                  View Code →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`
Expected: No TypeScript errors. No lint errors.

- [ ] **Step 3: Visual verification**

Run: `npm run dev`
Check in browser:
1. Cards display with macOS title bar (red/yellow/green dots, centered filename)
2. Project image, title, description, tags, links all render correctly
3. Hovering a card tilts it toward cursor with smooth motion
4. Moving mouse away returns card to flat with slower transition
5. Border glows orange on hover
6. Title bar filename shows correct extension per language

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ProjectCard.tsx
git commit -m "feat: redesign project cards as macOS windows with 3D tilt hover"
```
