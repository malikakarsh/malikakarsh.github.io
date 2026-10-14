// Content preserved from the original portfolio. Role accomplishments need resume verification.
export const portfolioData = {
  profile: {
    initials: "AM",
    name: "Akarsh Malik",
    title: "MS CS @ NYU",
    availability: "Open to work",
    location: "New York",
  },
  status: {
    status: "Available",
    roles: "Open to SWE • ML • AI roles",
  },
  fitness: {
    pace: "4:50 min/km",
    runnerType: "regular runner",
    weekendActivity: "Summit chaser on weekends",
  },
  about: {
    paragraphs: [
      "I specialize in the intersection of distributed systems and Agentic AI. My work usually involves bridging the gap between low-latency backend architecture and scalable LLM orchestration. Whether I’m optimizing data pipelines or solving algorithmic challenges, I focus on building systems that are as resilient as they are intelligent.",
    ],
    tags: ["Agentic AI", "LLM Orchestration", "Distributed Systems", "MLOps"],
  },
  experience: [
    {
      role: "Data Scientist",
      company: "AB InBev",
      duration: "Aug 2023 - Aug 2025",
      active: true,
    },
    {
      role: "Data Analyst Intern",
      company: "AB InBev",
      duration: "Jun - Jul 2022",
      active: false,
    },
    {
      role: "Software Developer Intern",
      company: "Quantale",
      duration: "Sep - Nov 2021",
      active: false,
    },
  ],
  leetcode: {
    currentRating: "1,963",
    peakRating: "1,963",
    level: "Knight",
    globalRanking: "27,015",
    topPercentage: "Top 3.12% World Wide",
    badgeImage: "/knight.png",
    totalUsers: "878,193",
    attended: 70,
    link: "https://leetcode.com/u/malikakarsh/",
  },
  education: [
    {
      university: "New York University",
      degree: "M.S. Computer Science",
      duration: "Sep 2025 – May 2027",
      gpa: "3.88/4",
      coursework: [
        "Deep Learning",
        "Machine Learning",
        "Operating Systems",
        "Design and Analysis of Algorithms",
      ],
    },
    {
      university: "National Institute of Technology, Tiruchirappalli",
      degree: "B.Tech in Instrumentation and Control Engineering",
      duration: "Jul 2019 - May 2023",
      gpa: "8.27/10",
      coursework: [
        "Distributed Systems",
        "Machine Learning",
        "Big Data Analytics",
      ],
    },
  ],
  languages: [
    { name: "Python", level: "Advanced", progress: 90 },
    { name: "C/C++", level: "Advanced", progress: 85 },
    { name: "SQL", level: "Advanced", progress: 80 },
    { name: "JavaScript / TypeScript", level: "Intermediate", progress: 75 },
    { name: "Java", level: "Intermediate", progress: 70 },
  ],
  techStacks: [
    {
      category: "Frameworks & Backend",
      items: ["Spring Boot", "Node.js", "Express.js", "React.js"],
    },
    {
      category: "AI & Machine Learning",
      items: ["LangChain", "LangGraph", "Ollama", "PyMC", "FAISS"],
    },
    {
      category: "Cloud & Database",
      items: ["PostgreSQL", "Elasticsearch", "Docker", "Azure"],
    },
    { category: "Data Visualization", items: ["D3.js"] },
  ],
  projects: [
    {
      title: "Weave",
      desc: "Turn a CSV file and a plain-English prompt into an interactive D3.js chart - no code required. Supports 16 chart types with interactive sliders and filters.",
      tech: ["Python", "D3.js", "Next"],
      link: "https://github.com/malikakarsh/weave",
    },
    {
      title: "UrbanIntel",
      desc: "An agentic AI system for NYC property analysis. Uses LangGraph workflows and LangChain to coordinate agents that synthesize geocoding, safety, and regulatory data into property investigations.",
      tech: ["Agentic AI", "LangGraph", "LangChain", "Ollama", "Python"],
      link: "https://github.com/malikakarsh/UrbanIntel",
    },
    {
      title: "Snatch",
      desc: "A real-time, multi-phase auction platform supporting descending Dutch auctions, ascending English auctions, and round-based elimination.",
      tech: ["TypeScript", "Real-time auctions"],
      link: "https://github.com/malikakarsh/Snatch",
    },
    {
      title: "Pragyan Premiere League",
      desc: "A real-time fantasy cricket platform for NIT Trichy. Users draft 11-player squads for simulated matches and friendly challenges on a live leaderboard.",
      tech: ["Golang", "Websockets", "React.js"],
      link: "https://delta.nitt.edu/projects/pragyan-premiere-league",
    },
    {
      title: "Paddy Seed Classification",
      desc: "Seed classification and feature extraction (CST, dimensions). It employs CNNs and transfer learning for real-time classification of seed varieties.",
      tech: ["CNN", "Transfer Learning", "Tensorflow", "Computer Vision"],
      link: "https://github.com/malikakarsh/paddy-seed-classification",
    },
    {
      title: "Pragyan Capture The Flag",
      desc: "An ethical hacking contest where participants exploit software vulnerabilities to retrieve hidden `flags` testing real-world penetration testing and security skills.",
      tech: ["Docker", "Kubernetes", "CTFd", "C++"],
      link: "https://delta.nitt.edu/projects/pctf",
    },
  ],
};

export const links = {
  github: "https://github.com/malikakarsh",
  linkedin: "https://linkedin.com/in/malikakarsh",
  email: "mailto:malikakarsh@gmail.com",
  leetcode: portfolioData.leetcode.link,
};
