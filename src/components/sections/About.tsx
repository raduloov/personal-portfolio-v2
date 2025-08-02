import profileImage from '../../assets/profile.jpg'
import styles from './About.module.css'

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
              building solutions for electric vehicle charging infrastructure.
            </p>
            <p>
              I've worked on diverse projects ranging from developing and maintaining web, hybrid, and 
              native applications to building micro-services, infrastructure, and AWS workflows. 
              My professional experience includes working with enterprise pharmaceutical clients at Mentormate, 
              the media giant The Sun at News UK, and the EV industry at AMPECO.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}