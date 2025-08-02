import { ProjectCard } from '../ui/ProjectCard'
import { projectsData } from '../../data/projectsData'
import styles from './Projects.module.css'

export function Projects() {
  return (
    <section id="projects" className={`section ${styles.projectsSection}`}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>Featured Projects</h2>
        <div className={styles.projectsGrid}>
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              image={project.imageUrl}
              tags={project.tags}
              demoUrl={project.demoUrl}
              gitUrl={project.gitUrl}
              date={project.date}
              language={project.language}
            />
          ))}
        </div>
      </div>
    </section>
  )
}