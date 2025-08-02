import { workExperienceData } from '../../data/workExperienceData'
import styles from './WorkExperience.module.css'

export function WorkExperience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>Work Experience</h2>
        <div className={styles.experienceTimeline}>
          {workExperienceData.map((job, index) => (
            <div key={index} className={styles.experienceItem}>
              <div className={styles.experienceDate}>
                <span>{job.startDate} - {job.endDate}</span>
              </div>
              <div className={styles.experienceContent}>
                <h3>{job.position}</h3>
                <h4>{job.company}</h4>
                {job.location && <p className={styles.experienceLocation}>{job.location}</p>}
                <ul className={styles.experienceDescription}>
                  {job.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                {job.technologies && (
                  <div className={styles.experienceTech}>
                    {job.technologies.map((tech, techIdx) => (
                      <span key={techIdx} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}