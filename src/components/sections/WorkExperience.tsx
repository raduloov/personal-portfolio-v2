import { workExperienceData } from '../../data/workExperienceData'

export function WorkExperience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>Work Experience</h2>
        <div className="experience-timeline">
          {workExperienceData.map((job, index) => (
            <div key={index} className="experience-item">
              <div className="experience-date">
                <span>{job.startDate} - {job.endDate}</span>
              </div>
              <div className="experience-content">
                <h3>{job.position}</h3>
                <h4>{job.company}</h4>
                {job.location && <p className="experience-location">{job.location}</p>}
                <ul className="experience-description">
                  {job.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                {job.technologies && (
                  <div className="experience-tech">
                    {job.technologies.map((tech, techIdx) => (
                      <span key={techIdx} className="tech-tag">{tech}</span>
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