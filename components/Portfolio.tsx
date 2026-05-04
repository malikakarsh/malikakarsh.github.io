'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import StatusCard from './StatusCard';
import FitnessCard from './FitnessCard';
import AboutCard from './AboutCard';
import ExperienceCard from './ExperienceCard';
import LeetCodeCard from './LeetCodeCard';
import RowEducationCard from './RowEducationCard';
import SkillGridCard from './SkillGridCard';
import LanguageSkillCard from './LanguageSkillCard';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ConstellationBackground from './ConstellationBackground';

const mockApiData = {
  profile: {
    initials: "AM",
    name: "Akarsh Malik",
    title: "MS CS @ NYU",
    availability: "Open to work",
    location: "New York"
  },
  status: {
    status: "Available",
    roles: "Open to SWE • ML • AI roles"
  },
  fitness: {
    pace: "4:50 min/km",
    runnerType: "regular runner",
    weekendActivity: "Summit chaser on weekends"
  },
  about: {
    paragraphs: [
      "I specialize in the intersection of distributed systems and Agentic AI. My work usually involves bridging the gap between low-latency backend architecture and scalable LLM orchestration. Whether I’m optimizing data pipelines or solving algorithmic challenges, I focus on building systems that are as resilient as they are intelligent."
    ],
    tags: ["Agentic AI", "LLM Orchestration", "Distributed Systems", "MLOps"]
  },
  experience: [
    { role: "Data Scientist", company: "AB InBev", duration: "Aug 2023 - Aug 2025", active: true },
    { role: "Data Analyst Intern", company: "AB InBev", duration: "Jun - Jul 2022", active: false },
    { role: "Full Stack Intern", company: "Quantale", duration: "Sep - Nov 2021", active: false }
  ],
  leetcode: {
    currentRating: "1,873",
    peakRating: "1,893",
    level: "Knight",
    globalRanking: "43,797",
    topPercentage: "Top 5% World Wide",
    badgeImage: "/knight.png",
    totalUsers: "871,853",
    attended: 63,
    link: "https://leetcode.com/u/malikakarsh/"
  },
  education: [
    {
      university: "New York University",
      degree: "Master of Science in Computer Science",
      duration: "Sep 2025 - May 2027",
      gpa: "4/4",
      coursework: ["Design and Analysis of Algorithms", "Information Visualization", "Foundations of Data Science"]
    },
    {
      university: "National Institute of Technology, Tiruchirappalli",
      degree: "B.Tech in Instrumentation and Control Engineering",
      duration: "Jul 2019 - May 2023",
      gpa: "8.27/10",
      coursework: ["Distributed Systems", "Machine Learning", "Big Data Analytics"]
    }
  ],
  languages: [
    { name: "Python", level: "Advanced", progress: 90 },
    { name: "C/C++", level: "Advanced", progress: 85 },
    { name: "SQL", level: "Advanced", progress: 80 },
    { name: "JavaScript / TypeScript", level: "Intermediate", progress: 75 },
    { name: "Java", level: "Intermediate", progress: 70 }
  ],
  techStacks: [
    { category: "Frameworks & Backend", items: ["Spring Boot", "Node.js", "Express.js", "React.js"] },
    { category: "AI & Machine Learning", items: ["LangChain", "LangGraph", "Ollama", "PyMC", "FAISS"] },
    { category: "Cloud & Database", items: ["PostgreSQL", "Elasticsearch", "Docker", "Azure"] },
    { category: "Data Visualization", items: ["D3.js"] }
  ],
  projects: [
    {
      title: "UrbanIntel",
      desc: "A graph-based AI for NYC property analysis. It orchestrates agents to synthesize geocoding, safety, and regulatory data into automated urban investigations.",
      tech: ["LangGraph", "LangChain", "Ollama", "Python"],
      link: "https://github.com/malikakarsh/UrbanIntel"
    },
    {
      title: "SnapIndex",
      desc: "A Python-based semantic search engine. It modernizes local file management, replacing traditional keywords with intelligent, context-aware indexing.",
      tech: ["Python", "LangGraph", "FAISS"],
      link: "https://github.com/SnapIndex/SnapIndex"
    },
    {
      title: "Pragyan Premiere League",
      desc: "A real-time fantasy cricket platform for NIT Trichy. Users draft 11-player squads for simulated matches and friendly challenges on a live leaderboard.",
      tech: ["Golang", "Websockets", "React.js"],
      link: "https://delta.nitt.edu/projects/pragyan-premiere-league"
    },
    {
      title: "Paddy Seed Classification",
      desc: "Seed classification and feature extraction (CST, dimensions). It employs CNNs and transfer learning for real-time classification of seed varieties.",
      tech: ["CNN", "Transfer Learning", "Tensorflow", "Computer Vision"],
      link: "https://github.com/malikakarsh/paddy-seed-classification"
    },
    {
      title: "Pragyan Capture The Flag",
      desc: "An ethical hacking contest where participants exploit software vulnerabilities to retrieve hidden `flags` testing real-world penetration testing and security skills.",
      tech: ["Docker", "Kubernetes", "CTFd", "C++"],
      link: "https://delta.nitt.edu/projects/pctf"
    },
    {
      title: "Extract",
      desc: "A simplified OCR engine modeled after Tesseract. It extracts uppercase text from images and converts it into plain text.",
      tech: ["Python", "OpenCV", "NumPy", "Tesseract"],
      link: "https://github.com/malikakarsh/extract"
    }
  ]
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('about');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 }
    },
  };

  return (
    <div className="dark bg-main-bg lg:h-screen lg:overflow-hidden text-zinc-300 p-4 lg:p-6 font-sans flex items-center justify-center relative">
      <ConstellationBackground />
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 relative z-10">

        <div className="lg:col-span-3 h-fit lg:sticky lg:top-8">
          <Sidebar data={mockApiData.profile} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="lg:col-span-9 flex flex-col gap-4 h-full">


          {activeTab === 'about' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-4 h-full"
            >
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatusCard data={mockApiData.status} />
                <FitnessCard data={mockApiData.fitness} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <AboutCard data={mockApiData.about} />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <motion.div variants={itemVariants}>
                  <ExperienceCard data={mockApiData.experience} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <LeetCodeCard data={mockApiData.leetcode} />
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'background' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-4 h-full"
            >
              <motion.div variants={itemVariants}>
                <RowEducationCard data={mockApiData.education[0]} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <RowEducationCard data={mockApiData.education[1]} />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <motion.div variants={itemVariants}>
                  <LanguageSkillCard title="Programming Languages" skills={mockApiData.languages} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <SkillGridCard title="Tech Stacks" skills={mockApiData.techStacks} />
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-4 h-full"
            >
              {/* The grid forces 2 columns on desktop automatically */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full content-center">

                {/* Dynamically map through all projects */}
                {mockApiData.projects.map((project, index) => (
                  <motion.div key={index} variants={itemVariants} className="h-full">
                    <ProjectCard data={project} />
                  </motion.div>
                ))}

              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}