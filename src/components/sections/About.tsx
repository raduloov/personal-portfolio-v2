import { SkillCard } from '../ui/SkillCard'
import profileImage from '../../assets/profile.jpg'
import styles from './About.module.css'

const skills = [
  {
    icon: <span style={{ fontSize: '32px', color: 'var(--accent-primary)' }}>⚡</span>,
    title: 'Web Development',
    description: 'Building responsive and interactive web applications with React, TypeScript, and modern frontend technologies.'
  },
  {
    icon: <span style={{ fontSize: '32px', color: 'var(--accent-primary)' }}>📱</span>,
    title: 'Mobile Development',
    description: 'Creating native mobile experiences with React Native for iOS and Android platforms.'
  },
  {
    icon: <span style={{ fontSize: '32px', color: 'var(--accent-primary)' }}>🔌</span>,
    title: 'EV Industry',
    description: 'Full-stack engineering for electric vehicle charging infrastructure and AWS workflows.'
  }
]

export function About() {
  return (
    <section id="about" className={`${styles.section} ${styles.about}`}>
      <div className={styles.container}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutImage}>
            <img 
              src={profileImage} 
              alt="Yavor Radulov"
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'cover',
                borderRadius: 'inherit'
              }}
            />
          </div>
          <div className={styles.aboutContent}>
            <h2>About Me</h2>
            <p>
              I am a Mobile / Web Developer with a strong proficiency in Front-End Development. 
              Currently working professionally in the EV industry as a full-stack engineer at AMPECO, 
              where I'm helping to power the electric vehicle charging infrastructure of tomorrow.
            </p>
            <p>
              With over 2 years of professional experience, I've worked on diverse projects ranging from 
              developing and maintaining web, hybrid, and native applications to building micro-services, 
              infrastructure, and AWS workflows. My journey has included working with enterprise pharmaceutical 
              clients at News UK and contributing to innovative solutions in the sustainable transportation sector.
            </p>
          </div>
        </div>

        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <SkillCard 
              key={index}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}