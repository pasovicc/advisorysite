import { aiKnowledgeBase } from "@/content/site";

const normalized = (value: string) => value.toLowerCase().trim();

const topicalResponses = [
  {
    terms: ["project management", "what is pm", "project"],
    answer:
      "Project management organizes scope, people, time, cost, risk and decisions so a defined result can be delivered with control. A good project setup clarifies the outcome, owner, constraints, governance rhythm and escalation path."
  },
  {
    terms: ["pmo", "project management office"],
    answer:
      "A PMO helps an organization standardize how projects are selected, governed, reported and improved. Its value comes from better visibility, clearer priorities and stronger delivery discipline."
  },
  {
    terms: ["ai governance", "responsible ai", "govern ai"],
    answer:
      "AI governance defines how an organization approves, monitors and controls AI use. It covers accountability, data, security, risk, human oversight, documentation and review."
  },
  {
    terms: ["dora", "digital operational resilience", "what is dora"],
    answer:
      "DORA readiness starts with clear ICT governance, critical service mapping, incident handling, third-party risk review, resilience testing and evidence. Regulated organizations should validate the details with legal, risk and compliance advisors."
  },
  {
    terms: ["digital transformation", "transformation", "modernize", "introduce ai", "adopt ai", "ai adoption"],
    answer:
      "Start by naming the business problem, choosing a small set of priority use cases, checking data readiness and defining governance. AI adoption works best when leaders connect value, risk, people and controls before tools are selected."
  },
  {
    terms: ["training", "education", "workshop", "recommendation", "learning path"],
    answer:
      "Training works best when it connects concepts to decisions your team makes every week. Useful formats include executive briefings, project governance workshops and practical AI readiness sessions."
  },
  {
    terms: ["consulting", "qualification", "ready for consulting", "consulting support"],
    answer:
      "A useful consulting conversation starts when the organization has a clear challenge, a sponsor, basic context on current constraints and willingness to discuss governance, risk and delivery decisions. If those pieces exist, a focused introductory call can define the right next step."
  }
];

export function getFallbackResponse(input: string) {
  const question = normalized(input);
  const knowledgeMatch = aiKnowledgeBase.find((item) =>
    question.includes(normalized(item.question).replace("?", ""))
  );

  if (knowledgeMatch) {
    return knowledgeMatch.answer;
  }

  const topicalMatch = topicalResponses.find((response) =>
    response.terms.some((term) => question.includes(term))
  );

  if (topicalMatch) {
    return topicalMatch.answer;
  }

  return "I can help with first-level questions about project management, PMO, AI governance, DORA readiness, digital transformation and executive education. For organization-specific decisions, book a consultation so the context, risks and stakeholders can be reviewed properly.";
}
