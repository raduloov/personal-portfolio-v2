import { useEffect, useState } from "react";
import "./App.css";
import { Navigation } from "./components/ui/Navigation";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Certifications } from "./components/sections/Certifications";
import { WorkExperience } from "./components/sections/WorkExperience";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "projects", "certifications"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Handle scroll indicator fade
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) {
        const heroHeight = window.innerHeight;
        const fadeThreshold = heroHeight * 0.8; // Start fading at 80% of hero height
        
        if (window.scrollY > fadeThreshold) {
          scrollIndicator.classList.add('fade-out');
        } else {
          scrollIndicator.classList.remove('fade-out');
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    // If scrolling from hero to about, scroll through the full hero animation
    const hero = document.getElementById('home');
    const navHeight = document.querySelector('nav')?.offsetHeight ?? 0;
    if (sectionId === 'about' && hero && window.scrollY < hero.offsetHeight) {
      const target = hero.offsetHeight - window.innerHeight;
      smoothScrollTo(target, 1500);
    } else {
      smoothScrollTo(element.offsetTop - navHeight, 800);
    }
  };

  const smoothScrollTo = (target: number, duration: number) => {
    const start = window.scrollY;
    const distance = target - start;
    if (distance === 0) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      window.scrollTo(0, start + distance * progress);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <>
      <Navigation activeSection={activeSection} onItemClick={scrollToSection} />

      <main>
        <Hero onScrollToSection={scrollToSection} />
        <About />
        <WorkExperience />
        <Projects />
        <Certifications />
      </main>
    </>
  );
}

export default App;
