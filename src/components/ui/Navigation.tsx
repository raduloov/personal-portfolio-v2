import { useState, useEffect } from 'react'
import styles from './Navigation.module.css'

interface NavItem {
  id: string
  label: string
}

interface NavigationProps {
  activeSection: string
  onItemClick: (sectionId: string) => void
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
]

export function Navigation({ activeSection, onItemClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, itemId: string) => {
    e.preventDefault()
    onItemClick(itemId)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <a href="#" className={styles.navLogo}>Portfolio</a>
          
          <button 
            className={styles.navToggle}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className={`${styles.navToggleBar} ${isMenuOpen ? styles.open : ''}`}></span>
            <span className={`${styles.navToggleBar} ${isMenuOpen ? styles.open : ''}`}></span>
            <span className={`${styles.navToggleBar} ${isMenuOpen ? styles.open : ''}`}></span>
          </button>

          <ul className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`}
                  className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
                  onClick={(e) => handleClick(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {isMenuOpen && (
        <div 
          className={styles.navOverlay}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}