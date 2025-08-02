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
                <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Trophy cup with gradient */}
                  <defs>
                    <linearGradient id="trophyGold" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#FFE55C', stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: '#FFCC00', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#FFB300', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="trophyShine" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#FFFACD', stopOpacity: 0.8 }} />
                      <stop offset="100%" style={{ stopColor: '#FFD700', stopOpacity: 0.2 }} />
                    </linearGradient>
                    <linearGradient id="baseDark" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#8B7355', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#5C4033', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  
                  {/* Main cup body */}
                  <path d="M16 12C16 10.8954 16.8954 10 18 10H46C47.1046 10 48 10.8954 48 12V22C48 28 44 32 38 33.5V38H26V33.5C20 32 16 28 16 22V12Z" fill="url(#trophyGold)"/>
                  
                  {/* Cup highlight */}
                  <ellipse cx="32" cy="18" rx="12" ry="6" fill="url(#trophyShine)" opacity="0.6"/>
                  
                  {/* Left handle */}
                  <path d="M16 14C12 14 9 17 9 21C9 25 12 28 16 28V24C14 24 13 22 13 21C13 19 14 18 16 18V14Z" fill="url(#trophyGold)"/>
                  
                  {/* Right handle */}
                  <path d="M48 14C52 14 55 17 55 21C55 25 52 28 48 28V24C50 24 51 22 51 21C51 19 50 18 48 18V14Z" fill="url(#trophyGold)"/>
                  
                  {/* Base platform */}
                  <rect x="22" y="42" width="20" height="4" rx="1" fill="url(#baseDark)"/>
                  
                  {/* Base stand */}
                  <path d="M18 46H46L44 52H20L18 46Z" fill="url(#baseDark)"/>
                  
                  {/* Star decoration on cup */}
                  <path d="M32 20L33.5 24H37.5L34.5 26.5L35.5 30.5L32 28L28.5 30.5L29.5 26.5L26.5 24H30.5L32 20Z" fill="#FFF8DC" opacity="0.9"/>
                </svg>
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