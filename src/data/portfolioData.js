export const personalInfo = {
  name: "Harshith",
  fullName: "Harshith Punna",
  role: "Full Stack Developer, Web Developer & AI Engineer",
  status: "Open to Internships & Opportunities",
  location: "Hyderabad, India",
  phone: "+91 7993811799",
  bio: "Computer Science undergraduate at MGIT crafting responsive web applications, intelligent computer vision systems, and robust full-stack platforms.",
  about: [
    "I am a Computer Science and Engineering undergraduate at Mahatma Gandhi Institute of Technology (MGIT), Hyderabad, passionate about building reliable, scalable, and user-focused applications. I enjoy turning ideas into practical software solutions that solve real-world problems.",
    "My technical experience spans modern web development and AI-powered applications, including Next.js 15, React 19, Python, FastAPI, Flask, OpenCV, and YOLOv8. I focus on developing responsive interfaces, robust backend systems, and intelligent applications that combine performance with usability.",
    "I have earned Oracle certifications in AI Foundations and Agentic AI, strengthening my understanding of artificial intelligence and autonomous AI systems. I am continuously expanding my skills, exploring emerging technologies, and building projects that bridge software engineering and AI."
  ],
  stats: [
    { value: "7.71", label: "CGPA @ MGIT" },
    { value: "5+", label: "Full-Stack & AI Projects" },
    { value: "5+", label: "Certifications Earned" },
    { value: "100%", label: "Code Quality & Security" }
  ],
  socials: {
    github: "https://github.com/punnaharshith7-dev",
    linkedin: "https://www.linkedin.com/in/harshith-punna-18vk",
    leetcode: "https://leetcode.com/u/punnaharshith23",
    email: "punnaharshith7@gmail.com",
    phone: "+91 7993811799",
    resume: "/Harshith_Punna_Resume.pdf?v=2"
  }
};

export const projects = [
  {
    id: "japan-field-guide",
    title: "JAPAN — A Field Guide",
    subtitle: "Interactive 3D Japan travel guide across 52 destinations",
    description: "A visually rich atlas for exploring 52 destinations across 10 regions of Japan. Visitors can browse by region and open individual place guides with seasonal notes, highlights, nearby destinations, and credited photography. The experience uses scroll-driven Three.js scenes and motion.",
    category: "Creative Coding & 3D",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
    tags: ["React", "TypeScript", "Vite", "Three.js", "ThreeUI"],
    metrics: "52 destinations • 10 regions • Scroll-driven Three.js",
    github: "https://github.com/punnaharshith7-dev/Japan.Visits",
    demo: "https://japan-visits.vercel.app"
  },
  {
    id: "proctorx-ai-proctoring",
    title: "ProctorX — AI Exam Proctoring",
    subtitle: "Real-time automated exam integrity platform with computer vision",
    description: "An end-to-end automated proctoring platform that monitors exam takers and detects suspicious activity in real time. Incorporates YOLOv8 object detection, OpenCV face verification, multiple/missing face detection, background tab/fullscreen monitoring, and a 25+ rule severity risk-scoring engine with threshold-based auto-submit and screenshot evidence capture. Features dedicated portals for Students, Faculty, Admins, and College Admins with Google OAuth and reporting.",
    category: "AI & Computer Vision",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
    tags: ["Python", "Flask", "YOLOv8", "OpenCV", "Socket.IO", "SQLite", "OAuth"],
    metrics: "25+ risk detection rules • Real-time frame analysis",
    github: "https://github.com/punnaharshith7-dev/proctoringproject",
    demo: "https://proctoring-project.onrender.com/"
  },
  {
    id: "codeguard-ai-platform",
    title: "CodeGuard AI",
    subtitle: "AI-assisted code security scanner & guarded coding workspace",
    description: "An enterprise-grade code vulnerability detection and remediation suite. Performs multi-file repository review, Python AST and local taint analysis, Terraform/Docker/Kubernetes IaC configuration checks, and OSV dependency vulnerability advisory matching. Features an LLM patch-proposal engine, team workspaces, and GitHub App webhook integration for automated PR checks and inline changed-line annotations.",
    category: "DevSecOps & AI",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
    tags: ["Next.js 15", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "Python AST"],
    metrics: "Multi-file AST taint checks • GitHub PR webhook integration",
    github: "https://github.com/punnaharshith7-dev/codeguard-ai",
    demo: "https://codeguard-ai-delta.vercel.app/"
  },
  {
    id: "resona-infrastethoscope",
    title: "Resona — InfraStethoscope",
    subtitle: "Vibro-acoustic screening & digital twin asset diagnostics",
    description: "Industrial prototype exploring acoustic and vibration telemetry for screening industrial assets and infrastructure. Features microphone sample ingestion, synthetic signal benchmarks via an interactive Acoustic Lab, frequency spectrum & waveform analytics, digital twin schematics, and blueprint spatial damage mapping overlays.",
    category: "Acoustics & IoT",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
    tags: ["Python", "Streamlit", "Audio Analytics", "Digital Twin", "SciPy"],
    metrics: "Sub-40ms frequency analysis • Spatial damage mapping",
    github: "https://github.com/punnaharshith7-dev/pixel-perfect-harmony-52",
    demo: "https://github.com/punnaharshith7-dev/pixel-perfect-harmony-52"
  }
];

export const skillsCategories = [
  {
    category: "Frontend & Modern Web",
    skills: [
      { name: "React 19 / Next.js 15", level: "Expert", desc: "App Router, SSR, Server Actions, modern component architecture" },
      { name: "TypeScript & JavaScript", level: "Advanced", desc: "Type-safe interfaces, ESNext standards, clean async workflows" },
      { name: "Tailwind CSS & UI/UX", level: "Expert", desc: "Custom themes, modern glassmorphism, responsive mobile-first layouts" },
      { name: "Socket.IO / WebSockets", level: "Advanced", desc: "Real-time state sync, bi-directional live video/audio streaming" }
    ]
  },
  {
    category: "Backend & Systems",
    skills: [
      { name: "Python (FastAPI / Flask)", level: "Expert", desc: "High-performance async REST APIs, AST parsing, background workers" },
      { name: "Node.js & Express", level: "Advanced", desc: "Microservices, secure middleware, REST & GraphQL endpoints" },
      { name: "Databases (SQL & NoSQL)", level: "Advanced", desc: "MySQL, PostgreSQL, MongoDB, SQLite, and Oracle indexing & queries" },
      { name: "Docker & Containerization", level: "Advanced", desc: "Containerized environments, multi-stage builds, docker-compose" }
    ]
  },
  {
    category: "AI, Vision & Cloud",
    skills: [
      { name: "Computer Vision (OpenCV & YOLOv8)", level: "Expert", desc: "Real-time object detection, face verification, motion analysis" },
      { name: "Agentic & Generative AI", level: "Advanced", desc: "Oracle certified Agentic AI, LLM orchestration, patch synthesis" },
      { name: "Cloud & DevSecOps", level: "Advanced", desc: "Oracle Cloud Infrastructure (OCI), GCP, Render, GitHub CI/CD" },
      { name: "Security & Authentication", level: "Advanced", desc: "JWT tokens, OAuth 2.0, HttpOnly cookie sessions, role-based access" }
    ]
  }
];

export const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Mahatma Gandhi Institute of Technology (MGIT), Hyderabad",
    period: "2024 — 2028",
    details: "3rd Year • CGPA: 7.71 / 10 • Core focus on algorithms, systems design, and AI"
  },
  {
    degree: "Intermediate (MPC) — TS Board",
    institution: "Sri Chaitanya Junior College",
    period: "2022 — 2024",
    details: "Grade: 90% • Mathematics, Physics, Chemistry"
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Genius High School",
    period: "2022",
    details: "Grade: 95% • Distinction"
  }
];

export const certifications = [
  {
    title: "Oracle Cloud Infrastructure Certified AI Foundations Associate",
    issuer: "Oracle",
    type: "AI & Cloud Infrastructure"
  },
  {
    title: "Oracle Certified Foundations Associate, Agentic AI",
    issuer: "Oracle",
    type: "Autonomous Agents & LLMs"
  },
  {
    title: "Python Developer Associate",
    issuer: "DataCamp",
    type: "Python Programming & Software Engineering"
  },
  {
    title: "SQL and Relational Databases 101",
    issuer: "IBM Skills Network",
    type: "Database Architecture & Optimization"
  },
  {
    title: "CRUD Operations",
    issuer: "MongoDB University",
    type: "NoSQL Data Modeling & Document Stores"
  }
];

export const languages = [
  { name: "English", proficiency: "Professional Working Proficiency" },
  { name: "Telugu", proficiency: "Native" },
  { name: "Hindi", proficiency: "Fluent" },
  { name: "Japanese", proficiency: "Elementary / Conversational Learner" }
];

export const coursework = [
  "Python",
  "Data Structures & Algorithms",
  "Database Management Systems (DBMS)",
  "Operating Systems",
  "Computer Networks",
  "Object-Oriented Programming (OOP)",
  "Software Engineering"
];
