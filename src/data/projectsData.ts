import weather from "../assets/projects/weather.png";
import calc from "../assets/projects/calc.png";
import pseudo from "../assets/projects/pseudo.png";
import bulbup from "../assets/projects/bulbup.png";
import chatFirebase from "../assets/projects/chat-firebase.png";
import rnMovies from "../assets/projects/rn-movies.png";
import rnPseudo from "../assets/projects/rn-pseudo.png";
import fsBooks from "../assets/projects/fs-books.png";
import yummies from "../assets/projects/yummies.png";
import cathub from "../assets/projects/cathub.png";
import gymPals from "../assets/projects/gym-pals.png";
import teniskiVarna from "../assets/projects/teniski-varna.png";
import esp8266Pager from "../assets/projects/esp8266-pager.png";
import uniswapTracker from "../assets/projects/uniswap.png";

export interface Project {
  imageUrl: string;
  title: string;
  date: string;
  description: string;
  demoUrl: string | null;
  gitUrl: string | null;
  tags: string[];
  language?: string;
}

export const projectsData: Project[] = [
  {
    imageUrl: uniswapTracker,
    title: "Uniswap Position Tracker",
    date: "19.09.2025",
    description:
      "An automated tracking system for Uniswap V3 liquidity positions that logs historical data and generates web reports. Tracks positions using The Graph API, calculates USD values and uncollected fees, and generates daily HTML reports with optional Supabase cloud storage integration.",
    demoUrl: "https://raduloov.github.io/uniswap-position-tracker",
    gitUrl: "https://github.com/raduloov/uniswap-position-tracker",
    tags: ["TypeScript", "Uniswap V3", "GitHub Actions", "Supabase"],
    language: "TypeScript"
  },
  {
    imageUrl: esp8266Pager,
    title: "ESP8266 Pager",
    date: "26.03.2025",
    description:
      "My first embedded project - an LCD display (with I2C module), buzzer and a button connected to a ESP8266 module via a breadboard. A simple websocket server with Express that serves a simple HTML page where the user can send a message that will be printed on the LCD display.",
    demoUrl: "https://esp8266-pager.onrender.com/",
    gitUrl: "https://github.com/raduloov/esp8266-pager",
    tags: ["ESP8266", "WebSocket", "Express", "IoT"],
    language: "C++"
  },
  {
    imageUrl: teniskiVarna,
    title: "Teniski Varna",
    date: "10.03.2025",
    description: "A real world online custom T-shirt store. Private repo",
    demoUrl: "https://teniskivarna.com/",
    gitUrl: null,
    tags: ["E-commerce", "React", "TypeScript"],
    language: "TypeScript"
  },
  {
    imageUrl: gymPals,
    title: "Gym Pals",
    date: "15.07.2023",
    description:
      "Track your workouts and share them with your friends. Built using the T3 stack (Next.js, tRPC, Prisma, Tailwind). Written in TypeScript.",
    demoUrl: "https://gym-pals.vercel.app/",
    gitUrl: "https://github.com/raduloov/gym-pals",
    tags: ["Next.js", "tRPC", "Prisma", "TypeScript", "Tailwind"],
    language: "TypeScript"
  },
  {
    imageUrl: cathub,
    title: "CatHub - Android",
    date: "16.12.2022",
    description:
      "CatHub is a very simple native Android app for browsing cats. Built using Jetpack Compose and Kotlin.",
    demoUrl: null,
    gitUrl: "https://github.com/raduloov/cathub-android",
    tags: ["Android", "Kotlin", "Jetpack Compose"],
    language: "Kotlin"
  },
  {
    imageUrl: yummies,
    title: "Yummies - iOS",
    date: "18.08.2022",
    description:
      "Yummies is my first attempt at building a native iOS app using Swift and SwiftUI. A recipe browser where you can pin your favorites ones. Powered by Edamam Recipe Search API.",
    demoUrl: null,
    gitUrl: "https://github.com/raduloov/yummies-ios",
    tags: ["iOS", "Swift", "SwiftUI"],
    language: "Swift"
  },
  {
    imageUrl: fsBooks,
    title: "Fullstack Books",
    date: "06.06.2022",
    description:
      'Fullstack Books is my first attempt at building a fullstack MERN application. An online book library where you can browse books with the help of the Google Books API, create an account and save them to "Favorites" and "To Read" lists. The front-end is written in TypeScript and the server in JavaScript.',
    demoUrl: "http://fullstack-books.vercel.app/",
    gitUrl: "https://github.com/raduloov/fullstack-books",
    tags: ["MERN", "TypeScript", "MongoDB", "Express", "React", "Node.js"],
    language: "TypeScript"
  },
  {
    imageUrl: rnPseudo,
    title: "React Native Pseudo Shop",
    date: "11.04.2022",
    description: "Pseudo Shop (one of my earlier projects) reimagined as a native mobile application.",
    demoUrl: null,
    gitUrl: "https://github.com/raduloov/react-native-pseudo-shop",
    tags: ["React Native", "Mobile", "TypeScript"],
    language: "TypeScript"
  },
  {
    imageUrl: rnMovies,
    title: "React Native Movies App",
    date: "21.03.2022",
    description:
      "My first mobile application [iOS + Android]. Browse movies, watch trailers and add the best to your favorites. Built using React Native and Firebase, written in TypeScript.",
    demoUrl: null,
    gitUrl: "https://github.com/raduloov/react-native-movies-app",
    tags: ["React Native", "Firebase", "TypeScript", "iOS", "Android"],
    language: "TypeScript"
  },
  {
    imageUrl: chatFirebase,
    title: "Chat App with Firebase",
    date: "12.03.2022",
    description:
      "Real time messaging app, built with React and Chakra UI for the front-end and Firebase Firestore for the back-end. Written in TypeScript.",
    demoUrl: "https://chat-app--firebase.vercel.app/",
    gitUrl: "https://github.com/raduloov/chat-app-firebase",
    tags: ["React", "Firebase", "Chakra UI", "TypeScript", "Real-time"],
    language: "TypeScript"
  },
  {
    imageUrl: bulbup,
    title: "Bulb Up! Forum",
    date: "20.02.2022",
    description:
      "Log in to share your ideas or ask questions, give feedback or answer others, or give a post a bulb. Bulb-Up is built using React and Tailwind for the front-end and Firebase for the back-end database. Written in TypeScript.",
    demoUrl: "https://bulb-up.netlify.app/",
    gitUrl: "https://github.com/raduloov/bulb-up-forum",
    tags: ["React", "Firebase", "Tailwind", "TypeScript"],
    language: "TypeScript"
  },
  {
    imageUrl: pseudo,
    title: "Pseudo Shop",
    date: "24.01.2022",
    description:
      "Web store app with dummy products, built with React, Redux and Tailwind. Connected to a backend database using Firebase. Cart items saved to and loaded from Local Storage",
    demoUrl: "https://pseudo-shop.netlify.app/",
    gitUrl: "https://github.com/raduloov/pseudo-shop",
    tags: ["React", "Redux", "Tailwind", "Firebase"],
    language: "JavaScript"
  },
  {
    imageUrl: weather,
    title: "Weather App",
    date: "15.12.2021",
    description: "Get weather information in real time for your current location or a manually typed one",
    demoUrl: "https://weatherfy-app.netlify.app/",
    gitUrl: "https://github.com/raduloov/weather-app",
    tags: ["JavaScript", "Weather API", "Geolocation"],
    language: "JavaScript"
  },
  {
    imageUrl: calc,
    title: "Calculator",
    date: "08.12.2021",
    description: "Simple JavaScript calculator",
    demoUrl: "https://basic-calcc.netlify.app/",
    gitUrl: "https://github.com/raduloov/calculator",
    tags: ["JavaScript", "HTML", "CSS"],
    language: "JavaScript"
  }
];
