
export interface JobListing {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  highlights: string[];
}

export const jobListings: JobListing[] = [
  {
    id: 1,
    title: "AI/ML Engineer / LLM Engineer (Senior/Lead)",
    slug: "ai-ml-engineer",
    shortDescription: "Build cutting-edge AI solutions with our team",
    highlights: [
      "Work with cutting-edge LLM technologies",
      "3+ years in AI/ML or NLP required",
      "Strong Python and ML framework experience",
      "Opportunity to lead AI-focused projects"
    ]
  },
  {
    id: 2,
    title: "Cybersecurity Expert / InfoSec Officer",
    slug: "cybersecurity-expert",
    shortDescription: "Ensure the security of our platform and client applications",
    highlights: [
      "3+ years in cybersecurity required",
      "Experience with penetration testing & incident response",
      "Knowledge of OWASP, NIST, and ISO security frameworks",
      "Advise on secure design practices"
    ]
  },
  {
    id: 3,
    title: "Cloud / DevOps / Platform Architect",
    slug: "cloud-devops-architect",
    shortDescription: "Design and implement scalable cloud infrastructure",
    highlights: [
      "4+ years in DevOps or Cloud Architecture",
      "Expertise in major cloud platforms & IaC",
      "CI/CD pipeline implementation expertise",
      "Microservices deployment experience"
    ]
  },
  {
    id: 4,
    title: "Product Manager (AI, Data, Scraping Tools)",
    slug: "product-manager-ai",
    shortDescription: "Lead the development of data-driven products",
    highlights: [
      "3+ years of product management experience",
      "Technical understanding of data workflows",
      "Strong documentation skills",
      "Client-facing communication"
    ]
  },
  {
    id: 5,
    title: "Product Manager (General Tech / SaaS)",
    slug: "product-manager-saas",
    shortDescription: "Oversee the development of SaaS products",
    highlights: [
      "3+ years in product leadership roles",
      "Experience with wireframes and user stories",
      "Full project lifecycle management",
      "Stakeholder communication skills"
    ]
  },
  {
    id: 6,
    title: "Full Stack Developer (Senior)",
    slug: "full-stack-developer",
    shortDescription: "Build end-to-end applications for our clients",
    highlights: [
      "4+ years full stack experience",
      "React + Node or Django + Vue expertise",
      "Technical leadership skills",
      "API and database integration experience"
    ]
  },
  {
    id: 7,
    title: "Front End Developer (React/Vue/Next.js)",
    slug: "front-end-developer",
    shortDescription: "Create beautiful, responsive user interfaces",
    highlights: [
      "Proficiency in React, Vue, or Next.js",
      "Strong UI/UX sensibilities",
      "Responsive design experience",
      "Component-based architecture knowledge"
    ]
  },
  {
    id: 8,
    title: "Backend Developer (Node/Python/Go)",
    slug: "backend-developer",
    shortDescription: "Build robust backend services and APIs",
    highlights: [
      "Strong skills in Node.js, Python, or Go",
      "REST API design experience",
      "Database design expertise",
      "Security-conscious development practices"
    ]
  },
  {
    id: 9,
    title: "Solutions Architect (Client-Facing / SaaS)",
    slug: "solutions-architect",
    shortDescription: "Design technical solutions for client needs",
    highlights: [
      "5+ years in client delivery or technical architecture",
      "Strong communication skills",
      "Software planning experience",
      "Implementation guidance expertise"
    ]
  },
  {
    id: 10,
    title: "UI/UX Designer (Product-focused)",
    slug: "ui-ux-designer",
    shortDescription: "Create intuitive and attractive user experiences",
    highlights: [
      "2+ years designing for SaaS/web apps",
      "Figma/Adobe XD proficiency",
      "Prototyping experience",
      "Responsive design knowledge"
    ]
  },
  {
    id: 11,
    title: "Graphic Designer (Branding/UI-heavy)",
    slug: "graphic-designer",
    shortDescription: "Create visual identities and UI assets",
    highlights: [
      "Branding and UI asset creation experience",
      "Adobe Suite/Figma proficiency",
      "Visual storytelling capabilities",
      "Collaboration with product teams"
    ]
  },
  {
    id: 12,
    title: "Video Editor (Tech Ads, Content Creators)",
    slug: "video-editor",
    shortDescription: "Create engaging tech-focused videos",
    highlights: [
      "2+ years editing experience",
      "Adobe Premiere/After Effects skills",
      "Tech ad creation experience",
      "Conversion-driven content creation"
    ]
  }
];
