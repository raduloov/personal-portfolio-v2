import { Button } from '../ui/Button'

interface HeroProps {
  onScrollToSection: (sectionId: string) => void
}

export function Hero({ onScrollToSection }: HeroProps) {
  return (
    <section id="home" className="hero">
      <div className="hero-background"></div>
      <div className="hero-content">
        <p className="hero-subtitle">Welcome to my portfolio</p>
        <h1 className="hero-title">
          I'm <span className="hero-title-gradient">Your Name</span>
        </h1>
        <p className="hero-description">
          A passionate developer creating beautiful and functional digital experiences. 
          Specializing in modern web technologies and innovative solutions.
        </p>
        <div className="hero-cta">
          <Button onClick={() => onScrollToSection('projects')}>
            View My Work
          </Button>
          <Button variant="secondary" onClick={() => onScrollToSection('contact')}>
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  )
}