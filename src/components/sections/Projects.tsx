import { useState } from 'react'
import { ProjectCard } from '../ui/ProjectCard'
import { projectsData } from '../../data/projectsData'
import { SectionHead } from '../ui/SectionHead'
import styles from './Projects.module.css'

/** How many projects show before the "See more" button */
const INITIAL_VISIBLE = 6

export function Projects() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? projectsData : projectsData.slice(0, INITIAL_VISIBLE)
  const hidden = projectsData.length - INITIAL_VISIBLE

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <SectionHead index={3} total={4} title="Projects" note="Some of what I&apos;ve built" />

      <div className={`paper--ink ${styles.body}`}>
        <div className="container">
          <div className={styles.grid}>
            {visible.map((project, index) => (
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

          {hidden > 0 && (
            <div className={styles.more}>
              <button
                type="button"
                className="btn btn--lg"
                onClick={() => setExpanded((e) => !e)}
                aria-expanded={expanded}
              >
                {expanded ? 'Hide older' : 'See older'}
                <svg className={`ico ${styles.moreIcon} ${expanded ? styles.moreIconUp : ''}`} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {!expanded && (
                <span className={`mono-label ${styles.moreCount}`}>{hidden} older projects</span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
