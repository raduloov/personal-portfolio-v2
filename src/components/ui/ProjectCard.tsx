import { useRef, useState } from 'react'
import googlePlayBadge from '../../assets/google-play-badge.png'
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
                <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className={styles.storeBadge}>
                  <img src={googlePlayBadge} alt="Get it on Google Play" />
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
