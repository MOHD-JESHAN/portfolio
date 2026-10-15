// Data source for Mohd Jeshan's Portfolio
// Formatted for direct loading without CORS issues when viewed via file://

window.PORTFOLIO_DATA = {
  profile: {
    name: "Mohd Jeshan",
    handle: "@mohdjeshan",
    title: "Computer Science Engineering Student & Full-Stack Developer",
    tagline: "Transforming creative ideas into practical digital solutions by combining modern UI/UX design with AI and scalable web technologies.",
    bio: "I am a Computer Science Engineering student and technology enthusiast passionate about UI/UX design, full-stack web development, artificial intelligence, and cloud computing. I enjoy transforming creative ideas into practical digital solutions by combining modern design principles with innovative technologies. My goal is to build impactful digital experiences, solve real-world problems, and collaborate with innovative engineering teams.",
    location: "India • Open to Global Remote & Internships",
    status: "Actively seeking Internship & Junior SDE Opportunities",
    avatar: "./assets/images/profile.jpg",
    stats: [
      { label: "Core Projects", value: "8+", prefix: "", suffix: "" },
      { label: "Tech Stack Skills", value: "15+", prefix: "", suffix: "" },
      { label: "Certifications", value: "6+", prefix: "", suffix: "" },
      { label: "Commitment", value: "100", prefix: "", suffix: "%" }
    ],
    socials: {
      github: "https://github.com/mohdjeshan",
      linkedin: "https://linkedin.com/in/mohd-jeshan-94a609399",
      email: "mohd.jeshan.dev@gmail.com",
      resume: "#"
    }
  },

  skills: [
    {
      category: "UI/UX & Frontend Development",
      icon: "layout",
      items: [
        { name: "UI/UX Design & Prototyping", level: 90, tag: "Wireframing" },
        { name: "React.js & Next.js", level: 88, tag: "Framework" },
        { name: "HTML5, CSS3 & Responsive Web", level: 95, tag: "Core Web" },
        { name: "Tailwind CSS", level: 92, tag: "Styling" },
        { name: "JavaScript (ES6+)", level: 90, tag: "Language" }
      ]
    },
    {
      category: "Programming & Backend Engineering",
      icon: "server",
      items: [
        { name: "C & C++", level: 85, tag: "DSA & Systems" },
        { name: "Python", level: 88, tag: "AI & Scripts" },
        { name: "Node.js & Express.js", level: 85, tag: "Backend APIs" },
        { name: "MongoDB & Mongoose", level: 82, tag: "Database" },
        { name: "RESTful API Architecture", level: 88, tag: "Networking" }
      ]
    },
    {
      category: "AI, Cloud & DevOps Tools",
      icon: "cloud",
      items: [
        { name: "Generative AI & LLM APIs", level: 85, tag: "AI Integration" },
        { name: "OCR & Document Extraction", level: 84, tag: "Vision/Text" },
        { name: "Cloud Computing & AWS Basics", level: 78, tag: "Cloud" },
        { name: "DevOps & CI/CD Principles", level: 75, tag: "Pipeline" },
        { name: "Git & GitHub Version Control", level: 90, tag: "Workflow" }
      ]
    }
  ],

  projects: [
    {
      id: "medivision",
      title: "Medivision — Patient Case-Taking Software Concept",
      description: "An innovative healthcare solution designed to simplify patient intake through multilingual voice input, intelligent OCR document extraction, AI clinical summaries, doctor dashboards, and offline synchronization.",
      category: "ai",
      tags: ["Generative AI", "LLM APIs", "OCR", "React", "Node.js", "Express", "MongoDB", "Voice Input"],
      metrics: "🩺 Flagship Project • Multilingual & Offline Ready",
      featured: true,
      githubUrl: "https://github.com/mohdjeshan",
      liveUrl: "https://linkedin.com/in/mohd-jeshan-94a609399",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      overview: "Medivision addresses critical healthcare bottlenecks during initial patient intake. By integrating voice recognition across regional languages with OCR text extraction from medical records and prescriptions, it synthesizes structured clinical briefs for doctors before patient consultations.",
      challenge: "Handling erratic medical handwriting, medical jargon in diverse regional dialects, and ensuring the application remains operable in low-connectivity rural clinic environments.",
      solution: "Designed a hybrid architecture combining on-device caching for offline case capture, pipeline-driven OCR image enhancement, and prompt-engineered LLM summarization for doctor-ready case summaries."
    },
    {
      id: "personal-portfolio",
      title: "Interactive Developer Portfolio & Digital Brand",
      description: "A fast, accessible personal digital identity showcasing technical skills, projects, and learning trajectory with an integrated terminal CLI, multi-theme engine, and dynamic canvas physics.",
      category: "frontend",
      tags: ["React", "JavaScript", "Tailwind CSS", "Canvas API", "UI/UX Design"],
      metrics: "⚡ 100/100 Performance • Multi-Theme Engine",
      featured: true,
      githubUrl: "https://github.com/mohdjeshan",
      liveUrl: "https://linkedin.com/in/mohd-jeshan-94a609399",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      overview: "Designed from wireframes to high-fidelity code to establish a standout professional identity for recruiters, hackathons, and collaborators.",
      challenge: "Creating an engaging developer experience with rich animations while keeping zero build dependencies and lightning-fast load times.",
      solution: "Engineered a modular Vanilla JS & Tailwind CSS component structure with zero heavy npm overhead and custom Web Audio synthesized feedback."
    },
    {
      id: "docu-extract-ai",
      title: "Smart Document Extraction & OCR Pipeline",
      description: "Automated document parser that ingests printed and handwritten notes, extracts structured key-value entities with OCR, and generates structured JSON summaries via LLM APIs.",
      category: "ai",
      tags: ["Python", "OCR", "Generative AI", "REST APIs", "FastAPI"],
      metrics: "📄 Intelligent OCR • Structured JSON Output",
      featured: true,
      githubUrl: "https://github.com/mohdjeshan",
      liveUrl: "https://linkedin.com/in/mohd-jeshan-94a609399",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      overview: "A research and utility tool designed to digitize paper forms, resumes, and invoices into searchable databases.",
      challenge: "Extracting accurate tabular and key-value pairs from low-resolution scanned documents.",
      solution: "Implemented bounding-box pre-processing algorithms coupled with LLM contextual validation to fix OCR hallucination."
    },
    {
      id: "hackathon-collaborator",
      title: "Full-Stack Collaborative Team Platform",
      description: "MERN stack collaborative portal built during a technical hackathon enabling real-time task boards, team communication, and cloud-backed file storage.",
      category: "fullstack",
      tags: ["MongoDB", "Express.js", "React", "Node.js", "AWS", "Git"],
      metrics: "🏆 Hackathon Prototype • Real-time Collaboration",
      featured: false,
      githubUrl: "https://github.com/mohdjeshan",
      liveUrl: "https://linkedin.com/in/mohd-jeshan-94a609399",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      overview: "Built under rapid 36-hour sprint constraints with team members to streamline remote project tracking.",
      challenge: "Maintaining state consistency and seamless user auth under fast deployment deadlines.",
      solution: "Leveraged MongoDB Atlas, JWT authentication, and structured RESTful endpoints with automated GitHub Actions."
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology in Computer Science & Engineering",
      institution: "Computer Science Engineering Program",
      period: "Pursuing",
      description: "Rigorous academic foundation in core computer science disciplines, software engineering methodologies, data structures, and algorithms.",
      coursework: [
        "Data Structures & Algorithms (DSA)",
        "Object-Oriented Programming (C++ / Java / Python)",
        "Database Management Systems (DBMS & SQL)",
        "Operating Systems & Computer Networks",
        "Web Technologies & Software Engineering"
      ]
    }
  ],

  certifications: [
    {
      title: "Full-Stack Web Development & Modern JavaScript",
      issuer: "Verified Technical Certification",
      year: "2024",
      highlight: "React, Node.js, Express, MongoDB & RESTful APIs"
    },
    {
      title: "UI/UX Design, Wireframing & Prototyping",
      issuer: "Design & Technology Academy",
      year: "2024",
      highlight: "User Research, Figma, Design Systems & Usability Testing"
    },
    {
      title: "Generative AI, Prompt Engineering & LLM APIs",
      issuer: "AI Learning Program",
      year: "2024",
      highlight: "LLM integration, OCR workflows & contextual AI agents"
    },
    {
      title: "Cloud Computing & AWS Fundamentals",
      issuer: "Cloud Certification Program",
      year: "2024",
      highlight: "Cloud infrastructure, serverless architecture & deployment"
    }
  ],

  experience: [
    {
      role: "Lead Innovator & Developer",
      company: "Medivision Project (Healthcare Innovation)",
      period: "2024 - Present",
      location: "Academic & Innovation Showcase",
      description: "Spearheading the concept, design, and technical prototyping of Medivision — an AI-powered patient case-taking and clinical summarization platform.",
      highlights: [
        "Architected voice-driven intake workflows supporting multilingual patient interaction.",
        "Integrated OCR document extraction pipeline to capture structured data from prescription notes.",
        "Designed high-fidelity Figma prototypes and intuitive doctor review dashboards."
      ]
    },
    {
      role: "Hackathon Participant & Web Developer",
      company: "Tech Innovation Hackathons & Workshops",
      period: "2023 - 2024",
      location: "Tech Communities & Competitions",
      description: "Collaborated in high-energy sprint environments to build practical web applications solving community and educational problems.",
      highlights: [
        "Demonstrated agility, team coordination, and rapid wireframe-to-code execution in 36-hour hackathons.",
        "Delivered responsive React frontends and integrated robust Express.js REST APIs under strict deadlines.",
        "Actively participated in developer workshops on AI, Cloud, and modern UI/UX design paradigms."
      ]
    }
  ]
};
