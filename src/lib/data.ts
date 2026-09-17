export const profile = {
  name: "Dishant Kaushal",
  first: "Dishant",
  last: "Kaushal",
  role: "Full Stack MERN Developer",
  tagline: "I build scalable, production-ready web applications.",
  intro:
    "Full-stack developer working across the MERN stack — from database schema and API architecture to the last pixel of the interface. I care about clean code, modular components, and shipping things people actually use.",
  email: "Dishantkaushal456@gmail.com",
  github: "https://github.com/Dishant1-git",
  githubHandle: "Dishant1-git",
  avatar: "https://avatars.githubusercontent.com/u/198889290?v=4",
  available: true,
  location: "India",
  /** Set to null to fall back to the built-in vector mascot. Artwork is 584x1653. */
  cartoonImage: "/dishant.png" as string | null,
};

export const stats = [
  { value: "20+", label: "Repositories shipped" },
  { value: "8", label: "Live deployments" },
  { value: "MERN", label: "Core stack" },
  { value: "2025", label: "Building since" },
];

export type CaseStudy = {
  id: string;
  index: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  features: string[];
  stack: string[];
  repo?: string;
  live?: string;
  accent: "mint" | "amber";
};

export const caseStudies: CaseStudy[] = [
  {
    id: "ecommerce",
    index: "01",
    title: "E-Commerce Platform",
    kind: "Full Stack · Commerce",
    year: "2025—26",
    summary:
      "A complete storefront and operations layer: product catalog, cart, checkout, order tracking, authentication, and a separate admin dashboard for inventory and fulfilment.",
    features: [
      "Product catalog with search & filtering",
      "Cart, checkout and order tracking",
      "JWT auth with role-based access",
      "Admin dashboard for inventory & orders",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    repo: "https://github.com/Dishant1-git/Ecom-new",
    live: "https://ecom-new-rosy.vercel.app",
    accent: "mint",
  },
  {
    id: "alumni",
    index: "02",
    title: "Alumni Management System",
    kind: "Full Stack · Community",
    year: "2026",
    summary:
      "A networking platform connecting alumni with their institution — directories, messaging, event management, and an analytics view for administrators.",
    features: [
      "Alumni directory with profile networking",
      "Event creation and RSVP management",
      "In-app communication tools",
      "Engagement analytics for admins",
    ],
    stack: ["React", "Express", "MongoDB", "Mongoose"],
    repo: "https://github.com/Dishant1-git/Alumini-system",
    accent: "amber",
  },
  {
    id: "job-portal",
    index: "03",
    title: "Job Portal",
    kind: "Full Stack · Marketplace",
    year: "2026",
    summary:
      "A two-sided job marketplace. Candidates search and apply with managed resumes; recruiters post roles and track applications through the pipeline.",
    features: [
      "Advanced job search & filtering",
      "Resume upload and management",
      "Application tracking pipeline",
      "Separate recruiter & candidate flows",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB"],
    repo: "https://github.com/Dishant1-git/Job-Portal",
    accent: "mint",
  },
  {
    id: "crm",
    index: "04",
    title: "CRM Dashboard",
    kind: "Full Stack · Internal Tool",
    year: "2026",
    summary:
      "A customer relationship tool for tracking leads through stages, logging interactions, and surfacing pipeline health at a glance.",
    features: [
      "Lead pipeline with stage tracking",
      "Contact & interaction history",
      "Dashboard metrics and reporting",
      "Deployed and running in production",
    ],
    stack: ["JavaScript", "React", "Node.js", "MongoDB"],
    repo: "https://github.com/Dishant1-git/crm",
    live: "https://crm-lyart-nu-25.vercel.app",
    accent: "amber",
  },
  {
    id: "techcadd",
    index: "05",
    title: "TechCADD Web Network",
    kind: "Frontend · Multi-site",
    year: "2025—26",
    summary:
      "A family of production marketing sites built in Next.js and TypeScript for multiple TechCADD branches — shared design language, independent deployments.",
    features: [
      "Five deployed branch sites",
      "Next.js App Router + TypeScript",
      "Shared component design language",
      "Course, enquiry and franchise flows",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    repo: "https://github.com/Dishant1-git/techcaddAmritsar",
    live: "https://techcadd-amritsar.vercel.app",
    accent: "mint",
  },
  {
    id: "unique-glazing",
    index: "06",
    title: "Unique Glazing",
    kind: "Frontend · Client Site",
    year: "2026",
    summary:
      "A production site for a Slough-based uPVC and aluminium window and door installer — service pages, a project gallery and an enquiry flow built to turn visitors into quote requests.",
    features: [
      "Service pages for windows, doors and glazing",
      "Featured projects and gallery sections",
      "Enquiry form with phone, email and embedded map",
      "FAQ, warranty and energy-rating detail",
    ],
    stack: ["JavaScript", "CSS", "Responsive UI", "Vercel"],
    repo: "https://github.com/Dishant1-git/amarweb",
    live: "https://amarweb-eight.vercel.app",
    accent: "amber",
  },
];

export const stack = [
  {
    group: "Frontend",
    items: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "Bootstrap", "Vite"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Middleware"],
  },
  {
    group: "Realtime",
    items: ["WebSockets", "Socket.IO", "Live Presence", "Event Streams"],
  },
  {
    group: "AI Integration",
    items: ["RAG Pipelines", "LLM APIs", "Embeddings", "Vector Search", "Prompt Design"],
  },
  {
    group: "Database",
    items: ["MongoDB", "Mongoose", "Schema Design", "Aggregation"],
  },
  {
    group: "Tooling",
    items: ["Git", "GitHub", "Postman", "VS Code", "Vercel"],
  },
];

export const approach = [
  {
    n: "01",
    title: "Architecture first",
    body: "Schema, routes and data flow get designed before a component is written. It keeps features cheap to add later instead of expensive to untangle.",
  },
  {
    n: "02",
    title: "Modular components",
    body: "Small, composable pieces with a single responsibility. The same button, card and form primitives carry across every screen in the product.",
  },
  {
    n: "03",
    title: "Production ready",
    body: "Auth, validation, error states and empty states are part of the build — not a follow-up ticket. Everything ships to a live URL.",
  },
  {
    n: "04",
    title: "Always shipping",
    body: "Twenty-plus repositories in under two years. Learning happens by building the whole thing end to end, then building the next one better.",
  },
];

export const marqueeWords = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "REST APIs",
  "JWT",
  "Mongoose",
  "WebSockets",
  "RAG",
  "Vite",
  "Git",
];

/* Repos that already appear as case studies — hidden from the archive grid.
   "amarweb" (Unique Glazing) is deliberately absent: it is featured AND listed. */
export const featuredRepoNames = [
  "Ecom-new",
  "Alumini-system",
  "Job-Portal",
  "crm",
  "techcaddAmritsar",
  "Dishant1-git",
];

/* Repos kept off the site entirely */
export const hiddenRepoNames = ["project"];
