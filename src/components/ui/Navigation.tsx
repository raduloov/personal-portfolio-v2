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
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
]

export function Navigation({ activeSection, onItemClick }: NavigationProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, itemId: string) => {
    e.preventDefault()
    onItemClick(itemId)
  }

  return (
    <nav className="nav">
      <div className="nav-container">
        <a href="#" className="nav-logo">Portfolio</a>
        <ul className="nav-menu">
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
  )
}