import { Card } from './Card'
import { Image } from './Image'
import { getLanguageColor } from '../../utils/languageColors'
import styles from './ProjectCard.module.css'

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

export function ProjectCard({ title, description, image, tags, demoUrl, gitUrl, date, language }: ProjectCardProps) {
  return (
    <Card className={styles.projectCard}>
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
    </Card>
  )
}