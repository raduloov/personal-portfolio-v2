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
                    <path fill="#00D7FE" d="M1.2 1.4A2 2 0 0 0 .8 2.7v18.6a2 2 0 0 0 .4 1.3l.1.1 10.4-10.4v-.2L1.3 1.3l-.1.1z" />
                    <path fill="#FFCE00" d="m15.2 15.8-3.5-3.5v-.2l3.5-3.5.1.1 4.1 2.3c1.2.7 1.2 1.8 0 2.4l-4.1 2.3-.1.1z" />
                    <path fill="#FF3A44" d="M15.3 15.7 11.7 12 1.2 22.6c.4.4 1 .5 1.8.1l12.3-7z" />
                    <path fill="#00F076" d="M15.3 8.3 3 1.3c-.8-.4-1.4-.3-1.8.1L11.7 12l3.6-3.7z" />
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
