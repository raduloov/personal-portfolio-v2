import { useState } from 'react'
import { certificationsData } from '../../data/certificationsData'
import type { Certification } from '../../data/certificationsData'
import { Card } from '../ui/Card'
import { Modal } from '../ui/Modal'
import styles from './Certifications.module.css'

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  const handleCardClick = (cert: Certification) => {
    setSelectedCert(cert)
  }

  const handleCloseModal = () => {
    setSelectedCert(null)
  }

  return (
    <section id="certifications" className="section certifications">
      <div className="container">
        <h2 className={styles.sectionTitle}>Certifications</h2>
        <div className={styles.certificationsGrid}>
          {certificationsData.map((cert) => (
            <Card 
              key={cert.id} 
              className={`${styles.certificationCard} ${styles.clickable}`} 
              onClick={() => handleCardClick(cert)}
            >
              <div className={styles.certificationIcon}>
                <span style={{ fontSize: '48px' }}>🏆</span>
              </div>
              <h3 className={styles.certificationTitle}>{cert.title}</h3>
              <p className={styles.certificationIssuer}>{cert.issuer}</p>
              <p className={styles.certificationDate}>{cert.date}</p>
              <div className={styles.certificationSkills}>
                {cert.skills.map((skill, index) => (
                  <span key={index} className={styles.skillTag}>{skill}</span>
                ))}
              </div>
              {cert.credentialUrl && (
                <a 
                  href={cert.credentialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.certificationLink}
                  onClick={(e) => e.stopPropagation()}
                >
                  View Credential →
                </a>
              )}
            </Card>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selectedCert} onClose={handleCloseModal}>
        {selectedCert && selectedCert.image && (
          <img 
            src={selectedCert.image} 
            alt={selectedCert.title}
            className={styles.certificationImageOnly}
          />
        )}
      </Modal>
    </section>
  )
}