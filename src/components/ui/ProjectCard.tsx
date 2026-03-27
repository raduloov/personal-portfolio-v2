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
          cover
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
