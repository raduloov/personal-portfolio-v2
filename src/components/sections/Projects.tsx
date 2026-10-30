import { ProjectCard } from '../ui/ProjectCard'
import { projectsData } from '../../data/projectsData'
import { SectionHead } from '../ui/SectionHead'
import styles from './Projects.module.css'

export function Projects() {
  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <SectionHead index={3} total={4} title="Projects" note="Some of what I&apos;ve built" />

      <div className={`paper--ink ${styles.body}`}>
        <div className="container">
          <div className={styles.grid}>
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.title}
                index={index}
                title={project.title}
                windowName={project.windowName}
                description={project.description}
                image={project.imageUrl}
                tags={project.tags}
                demoUrl={project.demoUrl}
                gitUrl={project.gitUrl}
                playStoreUrl={project.playStoreUrl}
                date={project.date}
                language={project.language}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
