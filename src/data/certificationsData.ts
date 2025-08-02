export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
  skills: string[];
}

// Import certification images
import udemySolidityEthereum from '../assets/certifications/udemy_solidity_ethereum.jpg'
import softuniApplicationsCrop from '../assets/certifications/softuni_applications_crop.jpeg'
import udemyReactNative from '../assets/certifications/udemy_react_native.jpg'
import udemyReact from '../assets/certifications/udemy_react.jpg'
import softuniAdvancedCrop from '../assets/certifications/softuni_advanced_crop.jpeg'
import fcc1 from '../assets/certifications/fcc1.png'
import fcc2 from '../assets/certifications/fcc2.png'
import udemyJS from '../assets/certifications/udemy_js.jpg'
import softuniFundCrop from '../assets/certifications/softuni_fundamentals_crop.jpeg'
import udemyHTMLCSS from '../assets/certifications/udemy_html_css.jpg'
import softuniBasicsCrop from '../assets/certifications/softuni_basics_crop.jpeg'

export const certificationsData: Certification[] = [
  {
    id: 1,
    title: "Ethereum and Solidity: The Complete Developer's Guide",
    issuer: "Udemy",
    date: "21.07.2024",
    skills: ["Ethereum", "Solidity", "Blockchain", "Smart Contracts", "Web3"],
    image: udemySolidityEthereum
  },
  {
    id: 2,
    title: "SoftUni JS Applications",
    issuer: "SoftUni",
    date: "02.04.2022",
    skills: ["JavaScript", "REST APIs", "Single Page Applications", "Asynchronous Programming"],
    image: softuniApplicationsCrop
  },
  {
    id: 3,
    title: "React Native - The Practical Guide",
    issuer: "Udemy",
    date: "24.02.2022",
    skills: ["React Native", "Mobile Development", "JavaScript", "Cross-Platform"],
    image: udemyReactNative
  },
  {
    id: 4,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    issuer: "Udemy",
    date: "24.02.2022",
    skills: ["React", "Redux", "React Router", "Hooks", "JavaScript"],
    image: udemyReact
  },
  {
    id: 5,
    title: "SoftUni JS Advanced",
    issuer: "SoftUni",
    date: "19.02.2022",
    skills: ["JavaScript", "DOM", "Unit Testing", "Classes", "Prototypes"],
    image: softuniAdvancedCrop
  },
  {
    id: 6,
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "05.01.2022",
    skills: ["HTML", "CSS", "Responsive Design", "Flexbox", "CSS Grid"],
    image: fcc1
  },
  {
    id: 7,
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "03.01.2022",
    skills: ["JavaScript", "Algorithms", "Data Structures", "Problem Solving"],
    image: fcc2
  },
  {
    id: 8,
    title: "The Complete JavaScript Course 2022: From Zero to Expert!",
    issuer: "Udemy",
    date: "08.12.2021",
    skills: ["JavaScript", "ES6+", "Object-Oriented Programming", "Asynchronous JavaScript"],
    image: udemyJS
  },
  {
    id: 9,
    title: "SoftUni Programming Fundamentals",
    issuer: "SoftUni",
    date: "07.12.2021",
    skills: ["JavaScript", "Programming Fundamentals", "Basic Algorithms", "Data Types"],
    image: softuniFundCrop
  },
  {
    id: 10,
    title: "Modern HTML & CSS From The Beginning (Including Sass)",
    issuer: "Udemy",
    date: "17.05.2021",
    skills: ["HTML", "CSS", "Sass", "Web Design", "CSS Animations"],
    image: udemyHTMLCSS
  },
  {
    id: 11,
    title: "SoftUni Programming Basics",
    issuer: "SoftUni",
    date: "23.03.2021",
    skills: ["JavaScript", "Programming Basics", "Conditional Statements", "Loops"],
    image: softuniBasicsCrop
  }
];