import { useRef, useState } from 'react'
import styles from './ProjectCard.module.css'

const MAX_TILT = 8

interface ProjectCardProps {
  index: number
  title: string
  windowName: string
  description: string
  image?: string
  tags: string[]
  demoUrl?: string | null
  gitUrl?: string | null
  playStoreUrl?: string | null
  date?: string
  language?: string
}

/** A project rendered as a paper macOS window with a hard offset shadow. */
export function ProjectCard({
  index,
  title,
  windowName,
  description,
  image,
  tags,
  demoUrl,
  gitUrl,
  playStoreUrl,
  date,
  language,
}: ProjectCardProps) {
  const number = String(index + 1).padStart(2, '0')
  const hasLinks = Boolean(demoUrl || gitUrl || playStoreUrl)

  // 3D tilt that follows the pointer, as on the original cards
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [isTilting, setIsTilting] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    // the corner under the pointer comes toward the viewer
    setTransform(`rotateX(${(y * 2 * MAX_TILT).toFixed(2)}deg) rotateY(${(-x * 2 * MAX_TILT).toFixed(2)}deg) scale(1.03)`)
  }

  const handleMouseLeave = () => {
    setIsTilting(false)
    setTransform('rotateX(0deg) rotateY(0deg) scale(1)')
  }

  return (
    <div
      ref={wrapperRef}
      className={styles.tilt}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsTilting(true)}
      onMouseLeave={handleMouseLeave}
    >
      <article className={`${styles.window} ${isTilting ? styles.tilting : ''}`} style={{ transform }}>
        <div className={styles.titleBar}>
          <span className={styles.lights} aria-hidden="true">
            <span className={`${styles.light} ${styles.lightRed}`} />
            <span className={`${styles.light} ${styles.lightYellow}`} />
            <span className={`${styles.light} ${styles.lightCream}`} />
          </span>
          <span className={styles.windowName}>{windowName}</span>
          <span className={styles.number}>№ {number}</span>
        </div>

        <div className={styles.screen}>
          {image ? (
            <img src={image} alt={`${title} screenshot`} loading="lazy" />
          ) : (
            <div className={styles.placeholder}>No screenshot yet</div>
          )}
          {language && <span className={styles.tag}>{language}</span>}
        </div>

        <div className={styles.body}>
          <div className={styles.head}>
            <h3 className={`display ${styles.title}`}>{title}</h3>
            {date && <span className={styles.date}>{date}</span>}
          </div>

          <p className={styles.desc}>{description}</p>

          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>

          {hasLinks && (
            <div className={styles.links}>
              {demoUrl && (
                <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn--sm">
                  Check out
                </a>
              )}
              {gitUrl && (
                <a href={gitUrl} target="_blank" rel="noopener noreferrer" className={`link-arrow ${styles.sourceLink}`}>
                  <span>Source</span>
                </a>
              )}
              {playStoreUrl && (
                <a
                  href={playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.playBadge}
                  aria-label="Get it on Google Play"
                >
                  <svg className={styles.playLogo} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3.6 2.3 13.3 12l-9.7 9.7a1.6 1.6 0 0 1-.5-1.2V3.5c0-.5.2-.9.5-1.2z" />
                    <path d="m14.7 13.4 2.4 2.4-9.5 5.4c-.6.3-1.2.4-1.7.2l8.8-8z" />
                    <path d="M14.7 10.6 5.9 2.6c.5-.2 1.1-.1 1.7.2l9.5 5.4-2.4 2.4z" />
                    <path d="m18.3 12.6-3.3 1.9L12.6 12l2.4-2.5 3.3 1.9c1.2.7 1.2 1.6 0 2.2z" />
                  </svg>
                  <span className={styles.playText}>
                    <span className={styles.playSmall}>Get it on</span>
                    <span className={styles.playBig}>Google Play</span>
                  </span>
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
