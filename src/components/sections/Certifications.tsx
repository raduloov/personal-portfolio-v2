import { useState } from 'react'
import { certificationsData } from '../../data/certificationsData'
import type { Certification } from '../../data/certificationsData'
import { Card } from '../ui/Card'
import { Modal } from '../ui/Modal'

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
        <h2 className="section-title">Certifications</h2>
        <div className="certifications-grid">
          {certificationsData.map((cert) => (
            <Card 
              key={cert.id} 
              className="certification-card clickable" 
              onClick={() => handleCardClick(cert)}
            >
              <div className="certification-icon">
                <span style={{ fontSize: '48px' }}>🏆</span>
              </div>
              <h3 className="certification-title">{cert.title}</h3>
              <p className="certification-issuer">{cert.issuer}</p>
              <p className="certification-date">{cert.date}</p>
              <div className="certification-skills">
                {cert.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
              {cert.credentialUrl && (
                <a 
                  href={cert.credentialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="certification-link"
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
            className="certification-image-only"
          />
        )}
      </Modal>
    </section>
  )
}