import styles from './SectionHead.module.css'

interface SectionHeadProps {
  /** Position in the page, 1-based */
  index: number
  total: number
  title: string
  /** Short plain-language note shown under the title */
  note: string
}

const pad = (n: number) => String(n).padStart(2, '0')

export function SectionHead({ index, total, title, note }: SectionHeadProps) {
  return (
    <header className={`${styles.head} paper--ink`}>
      <p className={`eyebrow ${styles.eyebrow}`}>
        {pad(index)} / {pad(total)}
      </p>
      <h2 className={`display ${styles.title}`}>{title}</h2>
      <p className={`mono-label ${styles.foot}`}>{note}</p>
    </header>
  )
}
