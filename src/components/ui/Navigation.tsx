import { useState, useEffect } from 'react'

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
      <nav className="nav">
        <div className="nav-container">
          <a href="#" className="nav-logo">Portfolio</a>
          
          <button 
            className="nav-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className={`nav-toggle-bar ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`nav-toggle-bar ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`nav-toggle-bar ${isMenuOpen ? 'open' : ''}`}></span>
          </button>

          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
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
          className="nav-overlay"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}