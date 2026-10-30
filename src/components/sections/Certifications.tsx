import { useState } from 'react'
import { certificationsData } from '../../data/certificationsData'
import type { Certification } from '../../data/certificationsData'
import { Modal } from '../ui/Modal'
import { SectionHead } from '../ui/SectionHead'
import { PaperSheet } from '../ui/PaperSheet'
import styles from './Certifications.module.css'

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  return (
    <section id="certifications" className={`section ${styles.certifications}`}>
      <SectionHead index={4} total={4} title="Certifications" note="Some of what I&apos;ve studied" />

      <div className={`paper--orange ${styles.body}`}>
        <div className="container">
          <ul className={styles.grid}>
            {certificationsData.map((cert, index) => (
              <li key={cert.id} className={styles.slot}>
                <article
                  className={styles.card}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedCert(cert)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedCert(cert)
                    }
                  }}
                  aria-label={`Open certificate: ${cert.title}`}
                >
                  <PaperSheet variant="card">
                    <header className={styles.head}>
                      <span className={styles.no}>№ {String(index + 1).padStart(2, '0')}</span>
                      <span className={styles.date}>{cert.date}</span>
                    </header>
                    <span className={`stamp ${styles.stamp}`}>{cert.issuer}</span>
                    <h3 className={`display ${styles.title}`}>{cert.title}</h3>
                    <div className={styles.skills}>
                      {cert.skills.map((skill) => (
                        <span key={skill} className="chip">{skill}</span>
                      ))}
                    </div>
                    <footer className={styles.foot}>
                      <span className={styles.src}>Tap to view</span>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`link-arrow ${styles.link}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Credential</span>
                          <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </a>
                      )}
                    </footer>
                  </PaperSheet>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Modal isOpen={!!selectedCert} onClose={() => setSelectedCert(null)}>
        {selectedCert && selectedCert.image && (
          <img
            src={selectedCert.image}
            alt={selectedCert.title}
            className={styles.certImage}
          />
        )}
      </Modal>
    </section>
  )
}
