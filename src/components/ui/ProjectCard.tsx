import { Card } from './Card'

interface ProjectCardProps {
  title: string
  description: string
  image?: string
  tags: string[]
}

export function ProjectCard({ title, description, image, tags }: ProjectCardProps) {
  return (
    <Card className="project-card">
      <div style={{ 
        height: '250px', 
        background: image ? `url(${image})` : 'var(--gradient-subtle)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-tertiary)'
      }}>
        {!image && '[Project Image]'}
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="project-tags">
          {tags.map((tag, index) => (
            <span key={index} className="project-tag">{tag}</span>
          ))}
        </div>
      </div>
    </Card>
  )
}