import { workExperienceData } from '../../data/workExperienceData'
import { SectionHead } from '../ui/SectionHead'
import { PaperSheet } from '../ui/PaperSheet'
import styles from './WorkExperience.module.css'

export function WorkExperience() {
  return (
    <section id="experience" className={`section ${styles.experience}`}>
      <SectionHead index={2} total={4} title="Experience" note="Where I&apos;ve worked" />

      <div className={`paper--orange ${styles.body}`}>
        <div className="container">
          <PaperSheet>
            <ol className={styles.timeline}>
              {workExperienceData.map((job) => (
                <li key={`${job.company}-${job.startDate}`} className={styles.item}>
                  <span className={styles.dot} aria-hidden="true" />
                  <div className={styles.date}>
                    <span>{job.startDate}</span>
                    <span className={styles.dateSep}>–</span>
                    <span>{job.endDate}</span>
                  </div>
                  <div className={styles.content}>
                    <h3 className={`display ${styles.position}`}>{job.position}</h3>
                    <p className={styles.company}>{job.company}</p>
                    {job.location && <p className={styles.location}>{job.location}</p>}
                    <ul className={styles.desc}>
                      {job.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                    {job.technologies && (
                      <div className={styles.tech}>
                        {job.technologies.map((tech) => (
                          <span key={tech} className="chip">{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </PaperSheet>
        </div>
      </div>
    </section>
  )
}
