import { useEffect, useRef, useState } from "react";
import { TextShimmer } from "../ui/TextShimmer";
import { Spark } from "../ui/Spark";
import styles from "./Hero.module.css";

const TOTAL_FRAMES = 61;

function preloadFrames(): Promise<HTMLImageElement[]> {
  return Promise.all(
    Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      return new Promise<HTMLImageElement>(resolve => {
        const img = new Image();
        img.src = `/frames/frame-${String(i + 1).padStart(3, "0")}.webp`;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
      });
    })
  );
}

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

/** Workstation footage scrubbed by scroll; the copy fades out and About slides over it. */
export function Hero({ onScrollToSection }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLButtonElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const rafRef = useRef(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let disposed = false;
    preloadFrames().then(frames => {
      if (disposed) return;
      framesRef.current = frames;
      const canvas = canvasRef.current;
      if (canvas && frames[0]) {
        canvas.width = frames[0].naturalWidth;
        canvas.height = frames[0].naturalHeight;
        canvas.getContext("2d")?.drawImage(frames[0], 0, 0);
        currentFrameRef.current = 0;
      }
      setLoaded(true);
    });
    return () => {
      disposed = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const track = section.offsetHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, -rect.top / track));
        const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          const frame = framesRef.current[frameIndex];
          if (frame) ctx.drawImage(frame, 0, 0);
        }

        // Fade the copy out over the first 60% of the scroll
        if (contentRef.current) {
          const fade = Math.min(1, progress / 0.6);
          contentRef.current.style.opacity = String(1 - fade);
          contentRef.current.style.transform = `translateY(${fade * -40}px)`;
        }

        // Fade the About section in over the last 30%
        const aboutEl = document.getElementById("about");
        if (aboutEl) {
          aboutEl.style.opacity = String(progress > 0.7 ? (progress - 0.7) / 0.3 : 0);
        }

        if (cueRef.current) {
          cueRef.current.style.display = progress > 0.05 ? "none" : "";
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [loaded]);

  return (
    <section id="home" className={styles.hero} ref={sectionRef}>
      {!loaded && (
        <div className={`${styles.loader} paper--ink`}>
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
          <TextShimmer className={styles.loaderText} duration={1.5}>
            Cooking...
          </TextShimmer>
        </div>
      )}

      <div className={styles.videoContainer}>
        <canvas ref={canvasRef} className={styles.heroCanvas} />
      </div>
      <div className={styles.vignette} aria-hidden="true" />

      <div className={styles.content} ref={contentRef}>
        <div className={`container ${styles.layout}`}>
          <div className={styles.intro}>
            <p className={`eyebrow ${styles.eyebrow}`}>Full-stack engineer</p>
            <h1 className={`display ${styles.title}`}>
              <span className={styles.titleLine}>Yavor</span>
              <span className={`${styles.titleLine} ${styles.titleAccent}`}>Radulov</span>
            </h1>
          </div>

          <div className={styles.actions}>
            <div className={styles.socials}>
              <a
                href="https://github.com/raduloov"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/yavorradulov"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/raduloov"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.5 5.2a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6z" />
                </svg>
              </a>
            </div>
            <a
              href="#projects"
              className={`link-arrow ${styles.workLink}`}
              onClick={e => {
                e.preventDefault();
                onScrollToSection("about");
              }}
            >
              <span>See more</span>
              <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <p className={styles.credits}>
            <span className={styles.creditsRole}>Focus</span> Web, mobile and cloud
            <Spark />
            <span className={styles.creditsRole}>Currently</span> AMPECO, Sofia
            <Spark />
            <span className={styles.creditsRole}>Since</span> 2022
          </p>
        </div>
      </div>

      <button
        ref={cueRef}
        className={styles.cue}
        onClick={() => onScrollToSection("about")}
        aria-label="Scroll to about section"
        type="button"
      >
        <span className={styles.cueText}>Scroll</span>
        <svg className={styles.cueArrow} viewBox="0 0 20 12" aria-hidden="true">
          <path d="M1 1l9 9 9-9" />
        </svg>
      </button>
    </section>
  );
}
