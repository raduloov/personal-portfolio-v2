import { useEffect, useState } from "react";
import "./App.css";
import { Navigation } from "./components/ui/Navigation";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Tape } from "./components/ui/Tape";
import { STACK } from "./data/stack";
import { Projects } from "./components/sections/Projects";
import { Certifications } from "./components/sections/Certifications";
import { Contact } from "./components/sections/Contact";
import { WorkExperience } from "./components/sections/WorkExperience";

const SECTION_IDS = ["home", "about", "experience", "projects", "certifications", "contact"];

function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      // Later sections win when they overlap an earlier one (About slides over the hero)
      for (const section of [...SECTION_IDS].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    // If scrolling from hero to about, scroll through the full hero animation
    const hero = document.getElementById("home");
    const navHeight = document.querySelector("header")?.offsetHeight ?? 0;
    if (sectionId === "home") {
      smoothScrollTo(0, 800);
    } else if (sectionId === "about" && hero && window.scrollY < hero.offsetHeight) {
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
        <Tape items={STACK} />
        <WorkExperience />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <div className="grain" aria-hidden="true" />
    </>
  );
}

export default App;
