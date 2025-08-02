import { Card } from './Card'
import { Image } from './Image'
import { getLanguageColor } from '../../utils/languageColors'

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
    <Card className="project-card">
      <Image 
        src={image} 
        alt={title}
        placeholder="[Project Image]"
        className="project-image"
      />
      <div className="project-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
            {language && (
              <div className="language-label">
                <span 
                  className="language-dot" 
                  style={{ backgroundColor: getLanguageColor(language) }}
                />
                <span className="language-name">{language}</span>
              </div>
            )}
            {date && <small style={{ color: 'var(--text-tertiary)' }}>{date}</small>}
          </div>
        </div>
        <p>{description}</p>
        <div className="project-tags">
          {tags.map((tag, index) => (
            <span key={index} className="project-tag">{tag}</span>
          ))}
        </div>
        {(demoUrl || gitUrl) && (
          <div className="project-links">
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                Live Demo →
              </a>
            )}
            {gitUrl && (
              <a href={gitUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                View Code →
              </a>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}