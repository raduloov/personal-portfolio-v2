import { useEffect, useRef, useState } from 'react'
import { Particles } from '../ui/Particles'
import { TextShimmer } from '../ui/TextShimmer'
import styles from './Hero.module.css'

const TOTAL_FRAMES = 61

function preloadFrames(): Promise<HTMLImageElement[]> {
  return Promise.all(
    Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image()
        img.src = `/frames/frame-${String(i + 1).padStart(3, '0')}.webp`
        img.onload = () => resolve(img)
        img.onerror = () => resolve(img)
      })
    })
  )
}

interface HeroProps {
  onScrollToSection: (sectionId: string) => void
}

export function Hero({ onScrollToSection }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number>(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    preloadFrames().then((frames) => {
      framesRef.current = frames
      setLoaded(true)

      // Draw first frame
      const canvas = canvasRef.current
      if (canvas && frames[0]) {
        canvas.width = frames[0].naturalWidth
        canvas.height = frames[0].naturalHeight
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(frames[0], 0, 0)
      }
    })
  }, [])

  useEffect(() => {
    if (!loaded) return

    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const sectionHeight = section.offsetHeight - window.innerHeight
        const scrolled = -rect.top
        const progress = Math.max(0, Math.min(1, scrolled / sectionHeight))
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * TOTAL_FRAMES)
        )

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex
          const frame = framesRef.current[frameIndex]
          if (frame) {
            ctx.drawImage(frame, 0, 0)
          }
        }

        // Fade out content over the first 60% of scroll
        if (contentRef.current) {
          const fadeProgress = Math.min(1, progress / 0.6)
          contentRef.current.style.opacity = String(1 - fadeProgress)
          contentRef.current.style.transform = `translateY(${fadeProgress * -40}px)`
        }

        // Fade in About section over the last 30%
        const aboutEl = document.getElementById('about')
        if (aboutEl) {
          const aboutFade = progress > 0.7 ? (progress - 0.7) / 0.3 : 0
          aboutEl.style.opacity = String(aboutFade)
        }

        // Hide scroll indicator as we scroll
        const scrollBtn = section.querySelector('button') as HTMLElement
        if (scrollBtn) {
          const hidden = progress > 0.05
          scrollBtn.style.display = hidden ? 'none' : ''
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [loaded])

  return (
    <section id="home" className={styles.hero} ref={sectionRef}>
      {!loaded && (
        <div className={styles.loader}>
          <div className={styles.cookingScene}>
            <div className={styles.egg}>
              <div className={styles.eggWhite}>
                <div className={styles.eggYolk} />
              </div>
            </div>
            <div className={styles.eggShadow} />
            <div className={styles.pan}>
              <div className={styles.panBase}>
                <div className={styles.panInner} />
                <div className={styles.panHandle} />
              </div>
            </div>
          </div>
          <TextShimmer className={styles.loaderText} duration={1.5}>Cooking...</TextShimmer>
        </div>
      )}
      <div className={styles.videoContainer}>
        <canvas ref={canvasRef} className={styles.heroCanvas} />
      </div>
      <div className={styles.heroOverlay}></div>
      <Particles
        className={styles.particles}
        quantity={80}
        size={0.5}
        color="#ffffff"
        staticity={40}
        ease={60}
      />
      <div className={styles.heroContent} ref={contentRef}>
        <p className={styles.heroSubtitle}>Developer Portfolio</p>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleGradient}>Yavor Radulov</span>
        </h1>
        <div className={styles.heroCta}>
          <div className={styles.socialIcons}>
            <a href="https://instagram.com/raduloov" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}>
              <svg className={styles.socialIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://github.com/raduloov" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}>
              <svg className={styles.socialIcon} width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/yavorradulov" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}>
              <svg className={styles.socialIcon} width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        className={styles.scrollIndicator}
        onClick={() => onScrollToSection('about')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onScrollToSection('about');
          }
        }}
        aria-label="Scroll to about section"
        type="button"
      >
        <div className={styles.scrollIndicatorContent}>
          <span className={styles.scrollText}>Scroll Down</span>
          <div className={styles.scrollArrows}>
            <svg className={styles.scrollArrow} width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M1 1L10 10L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg className={`${styles.scrollArrow} ${styles.scrollArrowDelayed}`} width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M1 1L10 10L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </button>
    </section>
  )
}
