import { useState, useEffect, useRef, useLayoutEffect } from 'react'
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
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certs' },
  { id: 'contact', label: 'Contact' },
]

export function Navigation({ activeSection, onItemClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pillRef = useRef<HTMLUListElement>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)

  // Slide the yellow pill under the active item; re-measure on resize/font load
  useLayoutEffect(() => {
    const pill = pillRef.current
    if (!pill) return
    const measure = () => {
      const el = pill.querySelector<HTMLElement>(`[data-id="${activeSection}"]`)
      if (!el) {
        setIndicator(null)
        return
      }
      const a = el.getBoundingClientRect()
      const b = pill.getBoundingClientRect()
      setIndicator({ left: a.left - b.left, width: a.width })
    }
    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure).catch(() => undefined)
    return () => window.removeEventListener('resize', measure)
  }, [activeSection])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Close the drawer if the viewport grows past the mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 961px)')
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMenuOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, itemId: string) => {
    e.preventDefault()
    onItemClick(itemId)
    setIsMenuOpen(false)
  }

  const headerClass = [
    styles.header,
    isMenuOpen ? styles.menuOpen : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <header className={headerClass}>
        <div className={styles.inner}>
          <nav className={styles.nav} aria-label="Sections">
            <ul className={styles.pill} ref={pillRef}>
              <span
                className={`${styles.indicator} ${indicator ? styles.indicatorOn : ''}`}
                style={indicator ? { left: indicator.left, width: indicator.width } : undefined}
                aria-hidden="true"
              />
              {navItems.map((item, i) => (
                <li key={item.id} className={styles.item} style={{ '--i': i } as React.CSSProperties}>
                  <a
                    href={`#${item.id}`}
                    data-id={item.id}
                    className={`${styles.link} ${activeSection === item.id ? styles.active : ''}`}
                    aria-current={activeSection === item.id ? 'true' : undefined}
                    onClick={(e) => handleClick(e, item.id)}
                  >
                    <span className={styles.linkText}>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <button
              className={styles.toggle}
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="site-drawer"
              type="button"
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-drawer"
        className={`${styles.drawer} paper--ink ${isMenuOpen ? styles.drawerOpen : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <p className={`eyebrow ${styles.drawerEyebrow}`}>Menu</p>
        <ul className={styles.drawerList}>
          {[{ id: 'home', label: 'Home' }, ...navItems].map((item, i) => (
            <li key={item.id} className={styles.drawerItem} style={{ '--i': i } as React.CSSProperties}>
              <a
                href={`#${item.id}`}
                className={`${styles.drawerLink} ${activeSection === item.id ? styles.drawerActive : ''}`}
                onClick={(e) => handleClick(e, item.id)}
                tabIndex={isMenuOpen ? 0 : -1}
              >
                <span className={styles.drawerNo}>{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
