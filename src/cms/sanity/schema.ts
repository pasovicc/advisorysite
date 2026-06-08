export const sanitySchemaDefinitions = [
  {
    name: "homePage",
    title: "Home Page",
    fields: ["hero", "trustIndicators", "servicesIntro", "aiSection", "whyWork", "assistant", "consultation"]
  },
  {
    name: "service",
    title: "Service",
    fields: ["title", "slug", "description", "longDescription", "icon", "deliverables", "engagements"]
  },
  {
    name: "industry",
    title: "Industry",
    fields: ["title", "slug", "description", "icon", "priorities"]
  },
  {
    name: "insight",
    title: "Insight",
    fields: ["title", "slug", "category", "description", "readTime", "body", "seo"]
  },
  {
    name: "aiKnowledgeBaseItem",
    title: "AI Knowledge Base Item",
    fields: ["question", "answer", "topic", "sourceUrl", "reviewedAt"]
  },
  {
    name: "contactDetails",
    title: "Contact Details",
    fields: ["email", "phone", "location", "bookingUrl", "socialLinks"]
  }
];

export const sanityMigrationNote =
  "Install Sanity, convert these definitions to defineType calls, then replace src/lib/cms.ts with GROQ-backed fetch functions.";
