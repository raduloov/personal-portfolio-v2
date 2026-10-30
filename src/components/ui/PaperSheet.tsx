import type { ReactNode } from 'react'
import styles from './PaperSheet.module.css'

/**
 * Smooth, slightly irregular outline for the paper sheet. Built once as a
 * clip-path polygon so the edges stay crisp at any size (an SVG displacement
 * filter gets rasterised coarsely on an element this tall).
 */
const PERF_R = 4.5 // perforation radius, px
const PERF_PITCH = 16 // perforation spacing, px

const px = (n: number) => `${n.toFixed(2)}px`
const pct = (n: number) => `${(n * 100).toFixed(3)}%`

interface ClipOptions {
  maxWidth: number // widest the element can get; keep in sync with the CSS max-width
  edge: number // max wobble in px
  sideCycles: number // waves down each long edge
  bottomCycles: number // waves along the bottom edge
  down: number // points along each long edge
}

function buildClip({ maxWidth, edge, sideCycles, bottomCycles, down }: ClipOptions): string {
  const wobble = (t: number, cycles: number, seed: number) =>
    edge / 2 +
    Math.sin(t * Math.PI * 2 * cycles + seed) * (edge * 0.34) +
    Math.sin(t * Math.PI * 2 * cycles * 2.3 + seed * 1.7) * (edge * 0.12)
  const pts: string[] = []
  const across = 40 // points along the bottom edge
  // top edge: straight, with the ticket perforation (half-circle bites) cut into it.
  // Dot positions are in px so the pitch stays constant; min() keeps them inside
  // the box on narrow screens.
  pts.push('0% 0px')
  for (let cx = PERF_PITCH * 0.75; cx + PERF_R < maxWidth; cx += PERF_PITCH) {
    for (let k = 0; k <= 6; k++) {
      const th = Math.PI + (Math.PI * k) / 6 // 180° → 360°, left to right
      const x = cx + PERF_R * Math.cos(th)
      const y = -PERF_R * Math.sin(th)
      pts.push(`min(100%, ${px(x)}) ${px(y)}`)
    }
  }
  pts.push('100% 0px')
  for (let i = 1; i <= down; i++) {
    const t = i / down
    pts.push(`calc(100% - ${px(wobble(t, sideCycles, 1.3))}) ${pct(t)}`)
  }
  for (let i = across - 1; i >= 0; i--) {
    const t = i / across
    pts.push(`${pct(t)} calc(100% - ${px(wobble(t, bottomCycles, 2.2))})`)
  }
  for (let i = down - 1; i >= 1; i--) {
    const t = i / down
    pts.push(`${px(wobble(t, sideCycles, 3.1))} ${pct(t)}`)
  }
  return `polygon(${pts.join(', ')})`
}

const CLIPS = {
  // the long section sheet (max-width 1100px)
  sheet: buildClip({ maxWidth: 1100, edge: 9, sideCycles: 6, bottomCycles: 2, down: 160 }),
  // a single card (certificates), at most ~520px wide
  card: buildClip({ maxWidth: 520, edge: 6, sideCycles: 2, bottomCycles: 1, down: 60 }),
}

interface PaperSheetProps {
  children: ReactNode
  className?: string
  /** `sheet` is the long section-wide paper; `card` is a small single card */
  variant?: 'sheet' | 'card'
}

/**
 * A sheet of cream paper with a perforated top edge, gently wavy sides, faint
 * creases, two tape strips and a hard ink shadow. Lay it on a coloured section
 * (orange, ink, yellow) and put the content inside. The `card` variant is the
 * same thing scaled down for a single card.
 */
export function PaperSheet({ children, className, variant = 'sheet' }: PaperSheetProps) {
  return (
    <div
      className={`${styles.sheet} ${variant === 'card' ? styles.card : ''} ${className ?? ''}`}
      style={{ '--sheet-clip': CLIPS[variant] } as React.CSSProperties}
    >
      <span className={styles.creases} aria-hidden="true" />
      <span className={`tape-strip ${styles.tapeLeft}`} aria-hidden="true" />
      <span className={`tape-strip ${styles.tapeRight}`} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  )
}
