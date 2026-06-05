export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type LinkItem = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  deliverables: string[];
  engagements: string[];
};

export type Industry = {
  title: string;
  slug: string;
  description: string;
  icon: string;
  priorities: string[];
};

export type Insight = {
  title: string;
  slug: string;
  category: string;
  description: string;
  readTime: string;
};

export type PageBlock = {
  eyebrow?: string;
  title: string;
  body?: string[];
  bullets?: string[];
  cards?: {
    title: string;
    description: string;
    href?: string;
    meta?: string;
    icon?: string;
  }[];
};

export type RoutePage = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  hero: {
    eyebrow: string;
    title: string;
    text: string;
  };
  sections: PageBlock[];
  cta?: {
    title: string;
    text: string;
    primary: LinkItem;
    secondary?: LinkItem;
  };
  showAssistant?: boolean;
};

export const siteConfig = {
  name: "Jasna Executive Advisory",
  shortName: "Jasna Advisory",
  tagline: "AI, Digital Transformation & Project Leadership",
  description:
    "Executive advisory, governance and education services for banks, institutions and modern organizations.",
  email: "contact@jasna-advisory.com",
  phone: "+387 00 000 000",
  location: "Sarajevo, Bosnia and Herzegovina",
  bookingUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/jasna/consultation",
  seoKeywords: [
    "AI governance Balkans",
    "DORA consulting",
    "PM consulting Bosnia",
    "AI for banks",
    "Digital transformation consulting",
    "Project management education",
    "AI workshops Balkans"
  ]
};

export const navigation: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Biography", href: "/about/biography" },
      { label: "Experience", href: "/about/experience" },
      { label: "Certifications & Education", href: "/about/certifications-education" },
      { label: "Speaking & Publications", href: "/about/speaking-publications" }
    ]
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Project Management", href: "/services/project-management" },
      { label: "Program & Portfolio Management", href: "/services/program-portfolio-management" },
      { label: "AI & Digital Transformation", href: "/services/ai-digital-transformation" },
      { label: "IT Governance & Security", href: "/services/it-governance-security" },
      { label: "Consulting Services", href: "/services/consulting-services" },
      { label: "Training & Education", href: "/services/training-education" }
    ]
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Banking & Financial Services", href: "/industries/banking-financial-services" },
      { label: "Government & Public Sector", href: "/industries/government-public-sector" },
      { label: "IT & Software", href: "/industries/it-software" },
      { label: "Infrastructure & Utilities", href: "/industries/infrastructure-utilities" },
      { label: "Education", href: "/industries/education" }
    ]
  },
  {
    label: "Insights",
    href: "/insights",
    children: [
      { label: "Articles", href: "/insights/articles" },
      { label: "AI Governance", href: "/insights/ai-governance" },
      { label: "Project Management", href: "/insights/project-management" },
      { label: "Digital Transformation", href: "/insights/digital-transformation" },
      { label: "Conference Talks", href: "/insights/conference-talks" }
    ]
  },
  { label: "Book", href: "/#schedule-consultation" },
  { label: "Contact", href: "/contact" }
];

export const homeContent = {
  hero: {
    eyebrow: "Executive consulting for regulated and knowledge-led organizations",
    title: "AI, Digital Transformation & Project Leadership",
    subtitle:
      "Strategic advisory, governance and education services for banks, institutions and modern organizations.",
    primaryCta: { label: "Book a Consultation", href: "/#schedule-consultation" },
    secondaryCta: { label: "Explore Services", href: "/services" },
    image: "/images/hero-ai-boardroom.png",
    imageAlt:
      "Abstract AI governance network in a premium consulting visual style"
  },
  trust: [
    "25+ Years Experience",
    "PMP Certified",
    "PhD in AI",
    "Banking IT Leadership",
    "International Speaker",
    "AI Governance Advisor"
  ],
  servicesIntro:
    "Services designed to support transformation, governance, delivery excellence and responsible AI adoption.",
  aiSection: {
    eyebrow: "AI & Digital Transformation",
    title: "Responsible AI starts with governance, not tools.",
    text:
      "AI is now a strategic organizational capability. Workshops, governance frameworks and practical implementation guidance help teams adopt AI with control, security and measurable value.",
    points: [
      "AI readiness and governance workshops",
      "Responsible adoption models for banking and public-sector contexts",
      "Transformation roadmaps that connect leadership, delivery and risk"
    ],
    link: { label: "Explore AI Advisory", href: "/services/ai-digital-transformation" }
  },
  whyWork: [
    {
      title: "Enterprise + Banking Experience",
      description:
        "Guidance grounded in complex IT environments, regulated operations and executive delivery realities."
    },
    {
      title: "Strategic + Operational Perspective",
      description:
        "Board-level framing paired with practical delivery structures, decision rights and implementation cadence."
    },
    {
      title: "AI + Governance Combination",
      description:
        "A rare mix of artificial intelligence expertise, governance discipline and project leadership."
    },
    {
      title: "Education & Mentoring Background",
      description:
        "Clear workshops, training and executive learning formats that help teams build lasting capability."
    }
  ],
  assistant: {
    title: "Ask Jasna AI",
    subtitle:
      "A premium AI advisor for clear first answers on project management, AI governance, DORA readiness and digital transformation.",
    examples: [
      "What is project management?",
      "What is PMO?",
      "What is AI governance?",
      "What is DORA?",
      "How can an organization introduce AI?",
      "Which education path should we choose?",
      "Is our organization ready for consulting support?"
    ],
    cta: { label: "Try AI Assistant", href: "/ai-advisor" }
  },
  consultation: {
    eyebrow: "Book a Consultation",
    title: "Let’s discuss your organization’s transformation journey.",
    text:
      "Use the consultation session to clarify goals, risks, readiness and the next practical decision.",
    primaryCta: { label: "Request Consultation", href: "/#schedule-consultation" },
    secondaryCta: { label: "Contact", href: "/contact" }
  }
};

export const services: Service[] = [
  {
    title: "Project Management",
    slug: "project-management",
    description:
      "Project governance, delivery discipline and practical support for initiatives that need control and momentum.",
    longDescription:
      "Project management advisory helps teams clarify scope, roles, risks, reporting and decision cadence. The work focuses on practical delivery control, not paperwork for its own sake.",
    icon: "Briefcase",
    deliverables: [
      "Project setup and governance model",
      "Delivery planning, risk review and stakeholder cadence",
      "Recovery support for delayed or unclear initiatives"
    ],
    engagements: [
      "Executive project review",
      "Project governance workshop",
      "Delivery health check"
    ]
  },
  {
    title: "Program & Portfolio Management",
    slug: "program-portfolio-management",
    description:
      "Portfolio visibility, program governance and prioritization models for complex transformation agendas.",
    longDescription:
      "Program and portfolio support brings structure to connected initiatives. Leaders get clearer priorities, better dependency management and a view of value, risk and capacity.",
    icon: "Layers",
    deliverables: [
      "Portfolio structure and prioritization criteria",
      "Program governance and dependency mapping",
      "Executive reporting rhythm"
    ],
    engagements: [
      "Portfolio operating model",
      "PMO advisory sprint",
      "Transformation steering support"
    ]
  },
  {
    title: "AI & Digital Transformation",
    slug: "ai-digital-transformation",
    description:
      "AI strategy, governance, adoption planning and transformation roadmaps for responsible modernization.",
    longDescription:
      "AI and digital transformation advisory connects technology choices with governance, people, process and risk. The aim is controlled adoption that improves real work.",
    icon: "BrainCircuit",
    deliverables: [
      "AI readiness assessment",
      "Digital transformation roadmap",
      "AI governance principles and adoption model"
    ],
    engagements: [
      "Executive AI workshop",
      "Transformation roadmap sprint",
      "AI governance design"
    ]
  },
  {
    title: "IT Governance & Security",
    slug: "it-governance-security",
    description:
      "Governance structures, risk alignment and security-aware operating models for regulated IT environments.",
    longDescription:
      "IT governance and security advisory helps organizations define decision rights, controls, accountability and reporting that support resilience and compliance.",
    icon: "ShieldCheck",
    deliverables: [
      "IT governance review",
      "DORA and resilience readiness framing",
      "Security-aware delivery controls"
    ],
    engagements: [
      "Governance maturity review",
      "DORA preparation workshop",
      "Risk and control alignment"
    ]
  },
  {
    title: "Consulting Services",
    slug: "consulting-services",
    description:
      "Executive advisory for transformation decisions, delivery structures, governance and organizational readiness.",
    longDescription:
      "Consulting engagements help leaders translate ambition into a focused operating plan. Work can include advisory sessions, diagnostics, roadmap design and governance support.",
    icon: "Handshake",
    deliverables: [
      "Executive advisory sessions",
      "Transformation diagnostics",
      "Operating model recommendations"
    ],
    engagements: [
      "Leadership advisory retainer",
      "Strategic assessment",
      "Governance reset"
    ]
  },
  {
    title: "Training & Education",
    slug: "training-education",
    description:
      "Executive workshops and professional education in project management, AI governance and transformation.",
    longDescription:
      "Training and education formats help teams build shared language and practical skills. Sessions can be adapted for executives, project teams and governance roles.",
    icon: "GraduationCap",
    deliverables: [
      "Project management education",
      "AI governance workshops",
      "Executive transformation briefings"
    ],
    engagements: [
      "Custom corporate training",
      "Conference session",
      "Mentoring program"
    ]
  }
];

export const industries: Industry[] = [
  {
    title: "Banking & Financial Services",
    slug: "banking-financial-services",
    description:
      "Transformation, governance and AI readiness for banks and financial institutions working under high trust and regulatory expectations.",
    icon: "Landmark",
    priorities: [
      "Banking IT leadership",
      "DORA and operational resilience",
      "AI governance for regulated environments"
    ]
  },
  {
    title: "Government & Public Sector",
    slug: "government-public-sector",
    description:
      "Practical transformation structures for institutions that need transparency, continuity and stakeholder alignment.",
    icon: "Building2",
    priorities: [
      "Governance and public accountability",
      "Digital service modernization",
      "Program delivery discipline"
    ]
  },
  {
    title: "IT & Software",
    slug: "it-software",
    description:
      "Delivery models, governance and portfolio alignment for technology teams scaling products, platforms and services.",
    icon: "Sparkles",
    priorities: [
      "Delivery operating models",
      "Portfolio prioritization",
      "AI adoption in product and engineering teams"
    ]
  },
  {
    title: "Infrastructure & Utilities",
    slug: "infrastructure-utilities",
    description:
      "Program governance and delivery support for long-cycle initiatives with dependencies, vendors and operational risk.",
    icon: "Factory",
    priorities: [
      "Complex program governance",
      "Risk and dependency control",
      "Vendor and stakeholder coordination"
    ]
  },
  {
    title: "Education",
    slug: "education",
    description:
      "Curriculum, workshops and professional learning for project management, AI governance and digital leadership.",
    icon: "BookOpen",
    priorities: [
      "Professional education",
      "AI and PM curriculum design",
      "Mentoring and executive learning"
    ]
  }
];

export const insights: Insight[] = [
  {
    title: "AI Governance for Leaders",
    slug: "ai-governance-for-leaders",
    category: "AI Governance",
    description:
      "A practical lens on ownership, controls and decision-making before AI moves into daily operations.",
    readTime: "6 min read"
  },
  {
    title: "DORA & IT Governance Readiness",
    slug: "dora-it-governance-readiness",
    category: "IT Governance",
    description:
      "How banks and regulated organizations can frame operational resilience without losing delivery focus.",
    readTime: "7 min read"
  },
  {
    title: "The Future of Project Management",
    slug: "future-of-project-management",
    category: "Project Management",
    description:
      "Why project leaders need governance fluency, AI literacy and stronger executive communication.",
    readTime: "5 min read"
  }
];

export const aiKnowledgeBase = [
  {
    question: "What is project management?",
    answer:
      "Project management is the discipline of organizing people, scope, time, cost, risk and decisions so a defined result can be delivered with control."
  },
  {
    question: "What is PMO?",
    answer:
      "A PMO, or Project Management Office, helps an organization standardize project governance, reporting, methods and portfolio visibility."
  },
  {
    question: "What is AI governance?",
    answer:
      "AI governance defines how an organization approves, monitors and controls AI use, including accountability, risk, data, security and human oversight."
  },
  {
    question: "How can an organization prepare for DORA?",
    answer:
      "DORA preparation starts with governance ownership, critical ICT service mapping, incident processes, third-party risk review, resilience testing and evidence discipline."
  },
  {
    question: "How to start digital transformation?",
    answer:
      "Start by defining the business problem, current-state constraints, governance model, priority processes and a short roadmap with measurable outcomes."
  }
];

const serviceCards = services.map((service) => ({
  title: service.title,
  description: service.description,
  href: `/services/${service.slug}`,
  icon: service.icon
}));

const industryCards = industries.map((industry) => ({
  title: industry.title,
  description: industry.description,
  href: `/industries/${industry.slug}`,
  icon: industry.icon
}));

const insightCards = insights.map((insight) => ({
  title: insight.title,
  description: insight.description,
  href: `/insights/${insight.slug}`,
  meta: `${insight.category} · ${insight.readTime}`
}));

const aboutPages: RoutePage[] = [
  {
    slug: "about",
    title: "About",
    description:
      "Biography, leadership background, education, certifications, speaking and publication focus.",
    keywords: ["AI governance advisor", "project management professional", "banking IT leadership"],
    hero: {
      eyebrow: "About Jasna",
      title: "A leadership profile across AI, governance, project delivery and education.",
      text:
        "Jasna is an experienced IT executive, project management professional and AI governance advisor with more than 25 years of experience in IT leadership, digital transformation and organizational development."
    },
    sections: [
      {
        title: "Biography",
        body: [
          "Her background combines enterprise IT, banking, project delivery, education and artificial intelligence.",
          "She helps organizations modernize operations, improve governance and prepare for the future of AI-enabled business."
        ]
      },
      {
        title: "Experience",
        bullets: [
          "Banking IT leadership and regulated transformation programs",
          "Project, program and portfolio governance",
          "Executive advisory for digital modernization and AI adoption"
        ]
      },
      {
        title: "Certifications & Education",
        bullets: [
          "PMP certified project management professional",
          "PhD focus in artificial intelligence",
          "Executive education, mentoring and professional training"
        ]
      },
      {
        title: "Speaking & Publications",
        body: [
          "Speaking topics include AI governance, digital transformation, project leadership, banking IT and the future of professional education."
        ]
      }
    ]
  },
  {
    slug: "about/biography",
    title: "Biography",
    description: "Professional biography for Jasna Executive Advisory.",
    keywords: ["Jasna biography", "AI governance advisor", "project leadership"],
    hero: {
      eyebrow: "Biography",
      title: "Executive experience with a rare cross-section of AI, banking IT and delivery leadership.",
      text:
        "Jasna works at the intersection of strategy, governance, technology and education."
    },
    sections: [
      {
        title: "Professional Profile",
        body: [
          "With more than 25 years in IT leadership and organizational development, Jasna supports leaders who need clarity before, during and after transformation.",
          "Her work links strategic intent with governance, people, delivery structures and education."
        ]
      }
    ]
  },
  {
    slug: "about/experience",
    title: "Experience",
    description: "Experience across banking IT, governance, transformation and project leadership.",
    keywords: ["banking IT leadership", "digital transformation consulting", "PM consulting Bosnia"],
    hero: {
      eyebrow: "Experience",
      title: "Practical leadership in complex, regulated and knowledge-led environments.",
      text:
        "The advisory approach comes from real delivery settings where governance, risk and executive alignment matter."
    },
    sections: [
      {
        title: "Core Experience",
        bullets: [
          "IT leadership in banking and enterprise environments",
          "Digital transformation and organizational development",
          "Project, program and portfolio management",
          "Governance, risk and security-aware delivery"
        ]
      }
    ]
  },
  {
    slug: "about/certifications-education",
    title: "Certifications & Education",
    description: "PMP certification, PhD in AI and education background.",
    keywords: ["PMP certified", "PhD in AI", "project management education"],
    hero: {
      eyebrow: "Certifications & Education",
      title: "A foundation in project discipline, artificial intelligence and executive learning.",
      text:
        "Credentials matter most when they help leaders make better decisions and help teams work with more confidence."
    },
    sections: [
      {
        title: "Credentials",
        bullets: [
          "PMP certified",
          "PhD in artificial intelligence",
          "Professional education and mentoring background"
        ]
      }
    ]
  },
  {
    slug: "about/speaking-publications",
    title: "Speaking & Publications",
    description: "Conference topics, articles and professional publications.",
    keywords: ["international speaker", "AI workshops Balkans", "conference talks"],
    hero: {
      eyebrow: "Speaking & Publications",
      title: "Clear executive education for conferences, workshops and institutional audiences.",
      text:
        "Speaking engagements focus on the leadership questions behind AI, governance, project delivery and transformation."
    },
    sections: [
      {
        title: "Topics",
        bullets: [
          "AI governance for executives",
          "DORA and IT governance readiness",
          "Digital transformation strategy",
          "Project leadership and the future of PM"
        ]
      }
    ]
  }
];

const servicePages: RoutePage[] = services.map((service) => ({
  slug: `services/${service.slug}`,
  title: service.title,
  description: service.description,
  keywords: [service.title, "executive consulting", "project management education"],
  hero: {
    eyebrow: "Service",
    title: service.title,
    text: service.longDescription
  },
  sections: [
    {
      title: "Advisory Focus",
      body: [service.longDescription],
      bullets: service.deliverables
    },
    {
      title: "Typical Engagements",
      bullets: service.engagements
    }
  ],
  cta: {
    title: "Discuss the right format for your organization.",
    text:
      "A short consultation can clarify scope, timing, stakeholders and the level of support needed.",
    primary: { label: "Book a Consultation", href: "/#schedule-consultation" },
    secondary: { label: "View All Services", href: "/services" }
  }
}));

const industryPages: RoutePage[] = industries.map((industry) => ({
  slug: `industries/${industry.slug}`,
  title: industry.title,
  description: industry.description,
  keywords: [industry.title, "digital transformation consulting", "AI governance Balkans"],
  hero: {
    eyebrow: "Industry",
    title: industry.title,
    text: industry.description
  },
  sections: [
    {
      title: "Advisory Priorities",
      bullets: industry.priorities
    },
    {
      title: "Relevant Services",
      cards: serviceCards.slice(0, 4)
    }
  ],
  cta: {
    title: "Build a governance and transformation approach that fits your context.",
    text:
      "Sector realities shape the operating model, risk profile and pace of change.",
    primary: { label: "Book a Consultation", href: "/#schedule-consultation" }
  }
}));

const insightCategoryPages: RoutePage[] = [
  {
    slug: "insights/articles",
    title: "Articles",
    description: "Articles on AI governance, project management and digital transformation.",
    keywords: ["AI governance articles", "project management articles", "digital transformation"],
    hero: {
      eyebrow: "Articles",
      title: "Practical writing for leaders managing technology, governance and delivery.",
      text:
        "Articles translate complex transformation topics into decisions, structures and next steps."
    },
    sections: [{ title: "Featured Articles", cards: insightCards }]
  },
  {
    slug: "insights/ai-governance",
    title: "AI Governance",
    description: "Insights on responsible AI governance and organizational readiness.",
    keywords: ["AI governance Balkans", "AI for banks", "AI workshops Balkans"],
    hero: {
      eyebrow: "AI Governance",
      title: "Responsible AI needs ownership, controls and learning.",
      text:
        "These insights focus on practical AI governance for regulated and knowledge-led organizations."
    },
    sections: [{ title: "Recommended Reading", cards: insightCards.filter((item) => item.title.includes("AI")) }]
  },
  {
    slug: "insights/project-management",
    title: "Project Management",
    description: "Insights on project leadership, PMO, programs and portfolios.",
    keywords: ["PM consulting Bosnia", "project management education", "PMO"],
    hero: {
      eyebrow: "Project Management",
      title: "Delivery discipline for leaders who need clarity and momentum.",
      text:
        "Project management insights cover governance, PMO, leadership, reporting and delivery health."
    },
    sections: [{ title: "Recommended Reading", cards: insightCards }]
  },
  {
    slug: "insights/digital-transformation",
    title: "Digital Transformation",
    description: "Insights on transformation strategy, operating models and AI adoption.",
    keywords: ["digital transformation consulting", "AI for banks", "transformation roadmap"],
    hero: {
      eyebrow: "Digital Transformation",
      title: "Modernization works when leaders align ambition with operating reality.",
      text:
        "Transformation insights focus on governance, prioritization, readiness and adoption."
    },
    sections: [{ title: "Recommended Reading", cards: insightCards }]
  },
  {
    slug: "insights/conference-talks",
    title: "Conference Talks",
    description: "Conference talks and speaking topics.",
    keywords: ["international speaker", "AI workshops Balkans", "conference talks"],
    hero: {
      eyebrow: "Conference Talks",
      title: "Executive talks on AI, governance, transformation and project leadership.",
      text:
        "Talks can be adapted for conferences, leadership forums, universities and professional associations."
    },
    sections: [
      {
        title: "Speaking Themes",
        bullets: [
          "AI governance for boards and executives",
          "DORA readiness and IT governance",
          "The future of project management",
          "Digital transformation in regulated organizations"
        ]
      }
    ]
  }
];

const aiAdvisorPages: RoutePage[] = [
  {
    slug: "ai-advisor",
    title: "AI Advisor",
    description: "Ask Jasna AI about project management, AI governance, DORA and transformation.",
    keywords: ["Ask Jasna AI", "AI governance advisor", "project management questions"],
    hero: {
      eyebrow: "Ask Jasna AI",
      title: "A premium AI advisor for practical first answers.",
      text:
        "Use Ask Jasna AI to explore project management, PMO, AI governance, DORA readiness and digital transformation basics."
    },
    showAssistant: true,
    sections: [
      {
        title: "Example Questions",
        bullets: homeContent.assistant.examples
      },
      {
        title: "Knowledge Base",
        cards: aiKnowledgeBase.map((item) => ({
          title: item.question,
          description: item.answer,
          icon: "MessageCircle"
        }))
      }
    ]
  },
  {
    slug: "ai-advisor/ask",
    title: "Ask the AI Assistant",
    description: "Ask simple questions about PM, AI governance and digital transformation.",
    keywords: ["AI assistant", "project management assistant", "AI governance questions"],
    hero: {
      eyebrow: "Ask the AI Assistant",
      title: "Ask a focused question and get a concise educational answer.",
      text:
        "The assistant handles first-level questions and points you toward a consultation when the topic needs context."
    },
    showAssistant: true,
    sections: [{ title: "Starter Questions", bullets: homeContent.assistant.examples }]
  },
  {
    slug: "ai-advisor/pm-knowledge-base",
    title: "PM Knowledge Base",
    description: "Project management and PMO knowledge base.",
    keywords: ["PMO", "project management education", "program management"],
    hero: {
      eyebrow: "PM Knowledge Base",
      title: "Simple answers to core project management questions.",
      text:
        "This section can later connect to articles, templates, course materials and a RAG knowledge base."
    },
    sections: [
      {
        title: "Questions",
        cards: aiKnowledgeBase.slice(0, 2).map((item) => ({
          title: item.question,
          description: item.answer,
          icon: "BookOpen"
        }))
      }
    ]
  },
  {
    slug: "ai-advisor/ai-readiness",
    title: "AI Readiness Questions",
    description: "AI readiness questions for governance and adoption planning.",
    keywords: ["AI readiness", "AI governance Balkans", "AI for banks"],
    hero: {
      eyebrow: "AI Readiness",
      title: "Questions that reveal whether AI adoption has the right conditions.",
      text:
        "A readiness discussion should cover ownership, data, controls, risk, skills and measurable use cases."
    },
    sections: [
      {
        title: "Readiness Prompts",
        bullets: [
          "Who owns AI decisions and risk acceptance?",
          "Which data sources can be used with confidence?",
          "Which controls exist for security, privacy and human oversight?",
          "Which use cases create value without creating unmanaged risk?"
        ]
      }
    ]
  },
  {
    slug: "ai-advisor/resources",
    title: "Resources & Recommendations",
    description: "Recommended resources for PM, AI governance and transformation.",
    keywords: ["AI governance resources", "project management resources", "AI workshops Balkans"],
    hero: {
      eyebrow: "Resources",
      title: "Curated resources for leaders and teams building capability.",
      text:
        "This section is prepared for articles, templates, workshop materials and recommended learning paths."
    },
    sections: [
      {
        title: "Planned Resource Types",
        bullets: [
          "PMO and project governance templates",
          "AI governance checklists",
          "DORA readiness discussion guides",
          "Executive workshop materials"
        ]
      }
    ]
  }
];

export const routePages: RoutePage[] = [
  ...aboutPages,
  {
    slug: "services",
    title: "Services",
    description:
      "Executive consulting services for project management, AI, transformation, IT governance and education.",
    keywords: ["DORA consulting", "digital transformation consulting", "PM consulting Bosnia"],
    hero: {
      eyebrow: "Services",
      title: "Advisory, governance and education services for complex transformation work.",
      text: homeContent.servicesIntro
    },
    sections: [
      {
        title: "Service Areas",
        cards: serviceCards
      }
    ]
  },
  ...servicePages,
  {
    slug: "industries",
    title: "Industries",
    description:
      "Consulting for banking, government, IT, infrastructure, utilities and education.",
    keywords: ["AI for banks", "digital transformation consulting", "AI governance Balkans"],
    hero: {
      eyebrow: "Industries",
      title: "Transformation guidance shaped by sector realities.",
      text:
        "Different industries need different governance models, risk language and adoption rhythms."
    },
    sections: [
      {
        title: "Industry Focus",
        cards: industryCards
      }
    ]
  },
  ...industryPages,
  ...aiAdvisorPages,
  {
    slug: "insights",
    title: "Insights",
    description:
      "Articles and talks on AI governance, project management and digital transformation.",
    keywords: ["AI governance articles", "DORA consulting", "digital transformation consulting"],
    hero: {
      eyebrow: "Insights",
      title: "Clear thinking for leaders navigating AI, governance and delivery.",
      text:
        "Insights are organized for executive readers who need practical framing, not trend commentary."
    },
    sections: [
      {
        title: "Featured Insights",
        cards: insightCards
      }
    ]
  },
  ...insightCategoryPages,
  ...insights.map((insight) => ({
    slug: `insights/${insight.slug}`,
    title: insight.title,
    description: insight.description,
    keywords: [insight.category, "executive consulting", "digital transformation"],
    hero: {
      eyebrow: insight.category,
      title: insight.title,
      text: insight.description
    },
    sections: [
      {
        title: "Article Placeholder",
        body: [
          "This article page is ready for CMS content. Add the full article body, author notes and related resources in the content layer or Sanity."
        ]
      }
    ]
  })),
  {
    slug: "book-consultation",
    title: "Book a Consultation",
    description: "Book an executive consultation for transformation, AI governance or project leadership.",
    keywords: ["book consultation", "AI governance advisor", "DORA consulting"],
    hero: {
      eyebrow: "Book a Consultation",
      title: "Start with a focused executive conversation.",
      text:
        "Use the session to discuss your goals, current risks, governance maturity and the practical next step."
    },
    sections: [
      {
        title: "Consultation Focus",
        bullets: [
          "AI governance and readiness",
          "Digital transformation roadmap",
          "Project, program or portfolio governance",
          "DORA and IT governance preparation",
          "Executive education and workshops"
        ]
      }
    ],
    cta: {
      title: "Ready to schedule?",
      text:
        "The booking link is prepared for Calendly and can be replaced with the client’s live scheduling URL.",
      primary: { label: "Open Calendly", href: siteConfig.bookingUrl },
      secondary: { label: "Contact First", href: "/contact" }
    }
  },
  {
    slug: "contact",
    title: "Contact",
    description: "Contact Jasna Executive Advisory.",
    keywords: ["contact Jasna", "executive advisory", "PM consulting Bosnia"],
    hero: {
      eyebrow: "Contact",
      title: "For consulting, workshops, speaking and advisory inquiries.",
      text:
        "Share the type of support you need, your organization context and the timeline you have in mind."
    },
    sections: [
      {
        title: "Contact Details",
        cards: [
          {
            title: "Email",
            description: siteConfig.email,
            href: `mailto:${siteConfig.email}`,
            icon: "Mail"
          },
          {
            title: "Location",
            description: siteConfig.location,
            icon: "Building2"
          },
          {
            title: "Consultation",
            description: "Schedule a focused advisory conversation.",
            href: "/#schedule-consultation",
            icon: "Calendar"
          }
        ]
      }
    ]
  }
];
