import { portfolioData, links } from "./portfolio";
import { fastInfer, selectedProjects } from "./projects";
import { engineeringToolkit } from "./skills";
import { technicalActivities } from "./activities";

// Edit content here. Reorder, hide, or add sections in homeSections below.
// Presentation lives in components/HomeSections.tsx.
export const homeContent = {
  hero: {
    id: "home",
    name: "AKARSH MALIK",
    role: "/ SOFTWARE ENGINEER · ML SYSTEMS & AGENTIC AI",
    availability: "Open to opportunities",
    headline: "ML Systems, GPU Kernels & LLM Inference",
    direction: ["GPU Kernels", "LLM Inference", "Systems"],
    description:
      "I’m Akarsh, a software engineer focused on GPU kernels, LLM inference, and performance-oriented ML systems, with experience building agentic AI systems and production software.",
    education: "MS Computer Science @ NYU",
    location: "New York",
    cta: { label: "Explore my work", href: "#work" },
    performance: {
      title: "FastInfer",
      subtitle: "Triton / PyTorch / GPU Kernels",
      benchmark: fastInfer.benchmark,
    },
    metrics: [
      {
        value: "2",
        suffix: "years",
        label: "Professional experience",
        href: "#experience",
      },
      {
        value: "1963",
        suffix: "",
        label: "LeetCode peak · Knight",
        href: "#algorithms",
      },
      {
        value: "NYU",
        suffix: "",
        label: "MS Computer Science",
        href: "#about",
      },
      {
        value: "GPU / ML systems",
        suffix: "",
        label: "Triton · PyTorch · Performance",
        href: "#fastinfer",
      },
    ],
  },
  featured: {
    id: "work",
    number: "01",
    label: "GPU KERNELS & INFERENCE",
    title: "Featured Project",
    kicker: "GPU KERNELS / INFERENCE RUNTIME",
    project: fastInfer,
    principles: [
      {
        title: "Kernel optimization.",
        description:
          "Implemented and benchmarked a Triton GEMV kernel for single-token inference, alongside RMSNorm, softmax, and SwiGLU kernels.",
      },
      {
        title: "Correctness.",
        description:
          "Validated GPU outputs against PyTorch and higher-precision references before performance measurement.",
      },
      {
        title: "Model integration.",
        description:
          "Integrated opt-in kernel replacements into cached Qwen decoding and measured whether isolated kernel improvements translated into lower end-to-end latency.",
      },
    ],
    cta: "Explore the repository",
  },
  experience: {
    id: "experience",
    number: "03",
    label: "ENGINEERING BACKGROUND",
    title: "Experience",
    description: "Professional experience and selected technical leadership.",
    professionalTitle: "Professional Experience",
    glance: {
      title: "At a glance",
      items: [
        { value: "2 years", label: "Professional experience" },
        { value: "1 full-time · 2 internships", label: "Industry roles" },
        { value: "ML Systems · Agentic AI · Backend", label: "Primary areas" },
      ],
    },
    entries: portfolioData.experience.map((job, index) => ({
      ...job,
      type: index === 0 ? "Full-time" : "Internship",
      location: null as string | null,
      companyUrl: null as string | null,
      description: "",
      bullets: [] as string[],
      technologies: [] as string[],
      // TODO: add verified professional accomplishments from source material.
    })),
    studentOrganizations: technicalActivities,
  },
  projects: {
    id: "projects",
    number: "02",
    label: "PROJECTS",
    title: "Selected Projects",
    description:
      "Inference optimization, interactive data visualization, and real-time auctions.",
    entries: selectedProjects,
    cta: { label: "More projects on GitHub", href: links.github },
  },
  algorithms: {
    id: "algorithms",
    number: "04",
    label: "ALGORITHMS & PROBLEM SOLVING",
    title: "Algorithms and Problem Solving",
    description:
      "LeetCode Knight with a peak contest rating of 1963. My algorithm practice includes graphs, dynamic programming, trees, and binary search.",
    topics: ["Graphs", "Dynamic programming", "Trees", "Binary search"],
    rank: "LeetCode Knight",
    rating: "1963",
    ratingLabel: "PEAK CONTEST RATING",
    ranking: "Top 3.22% worldwide",
    footnote: "Peak rating from my LeetCode profile.",
    badge: "/knight.png",
    cta: { label: "View LeetCode profile", href: links.leetcode },
  },
  notes: {
    id: "notes",
    number: "05",
    label: "WRITING",
    title: "Technical Notes",
    description: "Technical findings and benchmark methodology from FastInfer.",
    entries: [
      {
        title: "FastInfer implementation notes",
        description:
          "Kernel implementation notes and benchmark analyses are available in the FastInfer repository.",
        tags: ["Kernels", "Measurement", "Correctness"],
        cta: {
          label: "Read repository notes",
          href: `${fastInfer.link}/tree/main/notes`,
        },
      },
    ],
  },
  about: {
    id: "about",
    number: "05",
    label: "BACKGROUND",
    title: "About",
    photo: {
      src: "/profile-current.png",
      alt: "Akarsh Malik",
      caption: "AKARSH MALIK / NEW YORK",
    },
    paragraphs: [
      "I’m pursuing my master’s in Computer Science at NYU after two years as a Data Scientist at AB InBev. My work includes agentic AI projects using LangGraph and LangChain, alongside interests in distributed systems and LLM orchestration.",
      "I’m currently working on Triton kernels and studying how kernel performance translates to LLM inference latency.",
    ],
    offClock: {
      label: "OFF THE CLOCK",
      lines: ["Regular runner. 4:50 min/km.", "Summit chaser on weekends."],
    },
    cta: { label: "Let’s talk", href: links.email },
  },
  education: {
    id: "education",
    number: "06",
    label: "EDUCATION",
    title: "Education",
    education: portfolioData.education,
    skillsLabel: "TECHNICAL SKILLS",
    skills: engineeringToolkit,
  },
} as const;

export type HomeSectionKey = keyof typeof homeContent;
export const homeSections: { type: HomeSectionKey; enabled: boolean }[] = [
  { type: "hero", enabled: true },
  { type: "featured", enabled: true },
  { type: "projects", enabled: true },
  { type: "experience", enabled: true },
  { type: "algorithms", enabled: true },
  { type: "notes", enabled: false },
  { type: "about", enabled: true },
  { type: "education", enabled: true },
];
export const siteChrome = {
  navigation: [
    { href: "#work", label: "Work" },
    { href: "#experience", label: "Experience" },
    { href: "#algorithms", label: "Algorithms" },
    { href: "#about", label: "About" },
    { href: "#education", label: "Education" },
  ],
  socialLinks: [
    { label: "GitHub", href: links.github },
    { label: "LinkedIn", href: links.linkedin },
  ],
  footer: {
    tagline: "Software engineer · New York",
    name: "Akarsh Malik",
    links: [
      { label: "Email", href: links.email },
      { label: "GitHub", href: links.github },
      { label: "LinkedIn", href: links.linkedin },
    ],
  },
  terminal: {
    enabled: false,
    prompt: "akarsh@malik:~$",
    hint: "Optional terminal",
  },
};
