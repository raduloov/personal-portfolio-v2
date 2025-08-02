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
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
