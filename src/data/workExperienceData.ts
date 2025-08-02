export interface WorkExperience {
  position: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies?: string[];
}

export const workExperienceData: WorkExperience[] = [
  {
    position: "Software Engineer",
    company: "AMPECO",
    location: "Sofia, Bulgaria · Remote",
    startDate: "Mar 2025",
    endDate: "Present",
    description: [
      "Full-stack software engineer developing EV charging management solutions",
      "Building scalable backend services and modern frontend applications",
      "Contributing to the company's mission of enabling eMobility globally"
    ],
    technologies: ["TypeScript", "React", "Node.js", "AWS", "PostgreSQL", "Docker"]
  },
  {
    position: "Software Engineer",
    company: "News UK",
    location: "London, United Kingdom · Remote",
    startDate: "Mar 2024",
    endDate: "Mar 2025",
    description: [
      "Progressed from associate to mid-level within the organization",
      "Worked as a full-stack engineer for The Sun",
      "Developed and maintained web, hybrid and native apps",
      "Built various micro-services, infrastructure and AWS workflows"
    ],
    technologies: ["React", "React Native", "Node.js", "AWS", "TypeScript", "Microservices"]
  },
  {
    position: "Associate Software Engineer",
    company: "News UK",
    location: "London, United Kingdom · Remote",
    startDate: "Nov 2022",
    endDate: "Mar 2024",
    description: [
      "Contributed to The Sun's digital platform development",
      "Worked on both frontend and backend systems"
    ],
    technologies: ["React", "React Native", "Node.js", "JavaScript", "AWS"]
  },
  {
    position: "Junior Software Developer",
    company: "MentorMate",
    location: "Varna, Bulgaria",
    startDate: "Jun 2022",
    endDate: "Oct 2022",
    description: [
      "Worked for a large enterprise pharmaceutical client as a mobile developer with React Native",
      "Developed and maintained mobile application features",
      "Collaborated with cross-functional teams to deliver client requirements"
    ],
    technologies: ["React Native", "JavaScript", "Mobile Development", "Git"]
  },
  {
    position: "Software Development Intern",
    company: "MentorMate",
    location: "Varna, Bulgaria",
    startDate: "Feb 2022",
    endDate: "May 2022",
    description: [
      "Went through a comprehensive internship program covering all aspects of computer science and software development",
      "Focused mainly on front-end development with React and React Native",
      "Gained hands-on experience with modern web and mobile development practices"
    ],
    technologies: ["React", "React Native", "JavaScript", "HTML/CSS", "Git"]
  }
];