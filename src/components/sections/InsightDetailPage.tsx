import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import type { Insight, RoutePage } from "@/content/site";

type InsightDetailPageProps = {
  page: RoutePage;
  insight: Insight;
};

const articleProfiles: Record<
  string,
  {
    eyebrow: string;
    lead: string;
    visual: "constellation" | "resilience" | "future";
    sections: { title: string; body: string }[];
    signals: string[];
  }
> = {
  "ai-governance-for-leaders": {
    eyebrow: "Leadership Note",
    lead:
      "AI governance is not a policy document that sits beside the work. It is the operating model for deciding where AI can be used, who accepts the risk and what evidence proves the organization remains in control.",
    visual: "constellation",
    sections: [
      {
        title: "Start With Ownership",
        body:
          "Leaders need to define who owns AI decisions before tools spread across teams. Ownership includes approving use cases, setting acceptable risk, reviewing data conditions and deciding when human oversight is required."
      },
      {
        title: "Make Controls Practical",
        body:
          "Useful AI controls are visible in daily work. They show up in intake questions, approval checkpoints, model and vendor records, data restrictions, monitoring routines and escalation paths when outcomes are uncertain."
      },
      {
        title: "Treat Literacy As Governance",
        body:
          "AI literacy is part of risk management. Teams need enough understanding to recognize weak outputs, protect sensitive information and explain when a decision should stay with a person."
      }
    ],
    signals: ["Ownership", "Controls", "Human oversight", "Evidence"]
  },
  "dora-it-governance-readiness": {
    eyebrow: "Regulatory Brief",
    lead:
      "DORA readiness is not only a compliance exercise. It is a way to connect operational resilience, ICT risk, third-party dependencies and executive decision-making into one evidence-based governance rhythm.",
    visual: "resilience",
    sections: [
      {
        title: "Map Critical Services",
        body:
          "Organizations need a clear view of critical or important functions, the systems that support them and the vendors involved. Without that map, resilience conversations stay abstract."
      },
      {
        title: "Connect Incidents To Decisions",
        body:
          "Incident handling should produce management insight, not only technical closure. Escalation, classification, communication and post-incident learning all need defined ownership."
      },
      {
        title: "Keep Evidence Current",
        body:
          "Readiness depends on evidence that can be maintained. Registers, test records, third-party reviews, risk acceptance and remediation tracking should be part of normal governance cadence."
      }
    ],
    signals: ["ICT risk", "Resilience", "Third parties", "Testing"]
  },
  "future-of-project-management": {
    eyebrow: "Delivery Perspective",
    lead:
      "The future of project management is less about perfect plans and more about decision quality. Project leaders increasingly need governance fluency, AI literacy and the ability to translate complexity for executives.",
    visual: "future",
    sections: [
      {
        title: "Governance Becomes A Core Skill",
        body:
          "Project leaders are expected to explain trade-offs, risk, dependencies and benefits in a way executives can act on. Governance is no longer separate from delivery; it is how delivery stays credible."
      },
      {
        title: "AI Changes The Work, Not The Accountability",
        body:
          "AI can help with analysis, reporting, planning and knowledge retrieval, but it does not replace accountability. Teams still need judgment, context and clear ownership of final decisions."
      },
      {
        title: "Communication Becomes More Strategic",
        body:
          "The strongest project professionals will be able to simplify uncertainty without hiding it. They will connect delivery data to business choices, stakeholder expectations and organizational learning."
      }
    ],
    signals: ["Decision quality", "AI literacy", "Executive clarity", "Adaptive delivery"]
  }
};

export function InsightDetailPage({ page, insight }: InsightDetailPageProps) {
  const profile = articleProfiles[insight.slug] || articleProfiles["ai-governance-for-leaders"];

  return (
    <>
      <section className="relative overflow-hidden bg-[#f7f5ef] pb-16 pt-28 lg:pb-20 lg:pt-32">
        <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[#080b12] lg:block" />
        <div className="absolute right-0 top-0 hidden h-full w-[42%] lg:block">
          <ArticleVisual variant={profile.visual} />
        </div>
        <div className="container-shell relative">
          <Reveal>
            <Link
              href="/insights"
              className="mb-10 inline-flex items-center gap-2 text-sm font-extrabold text-graphite transition hover:text-gold"
            >
              <Icon name="ArrowRight" className="h-4 w-4 rotate-180" />
              Insights
            </Link>
            <div className="grid gap-10 lg:grid-cols-[0.64fr_0.36fr] lg:items-end">
              <div>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                  {insight.category}
                </p>
                <h1 className="max-w-4xl font-display text-5xl leading-[0.98] text-navy md:text-6xl lg:text-7xl">
                  {page.hero.title}
                </h1>
                <p className="mt-8 max-w-3xl text-xl leading-9 text-graphite">{profile.lead}</p>
              </div>
              <div className="border-l border-gold/40 pl-6 lg:text-white">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
                  {profile.eyebrow}
                </p>
                <p className="mt-4 text-sm font-extrabold uppercase tracking-[0.18em] text-slate-600 lg:text-slate-300">
                  {insight.readTime}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[0.28fr_0.72fr]">
            <Reveal>
              <aside className="lg:sticky lg:top-28">
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                  Signals
                </p>
                <div className="grid gap-0 border-y border-slate-200">
                  {profile.signals.map((signal) => (
                    <p
                      key={signal}
                      className="border-b border-slate-200 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-navy last:border-b-0"
                    >
                      {signal}
                    </p>
                  ))}
                </div>
              </aside>
            </Reveal>

            <article className="grid gap-12">
              {profile.sections.map((section, index) => (
                <Reveal key={section.title} delay={index * 80}>
                  <section className="grid gap-5 border-b border-slate-200 pb-10 md:grid-cols-[0.22fr_0.78fr]">
                    <span className="font-display text-4xl text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="font-display text-4xl leading-[1.02] text-navy">
                        {section.title}
                      </h2>
                      <p className="mt-5 text-lg leading-9 text-graphite">{section.body}</p>
                    </div>
                  </section>
                </Reveal>
              ))}
            </article>
          </div>
        </div>
      </section>

    </>
  );
}

function ArticleVisual({ variant }: { variant: "constellation" | "resilience" | "future" }) {
  if (variant === "resilience") {
    return (
      <svg viewBox="0 0 520 520" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <rect width="520" height="520" fill="#080b12" />
        <path d="M80 380C160 270 215 420 300 290S405 170 470 250" fill="none" stroke="#C8A96B" strokeWidth="2" />
        <path d="M105 130H425M145 195H385M185 260H345M225 325H305" stroke="rgba(255,255,255,0.22)" />
        <circle cx="260" cy="260" r="142" fill="none" stroke="rgba(200,169,107,0.22)" />
        <circle cx="260" cy="260" r="82" fill="none" stroke="rgba(255,255,255,0.16)" />
      </svg>
    );
  }

  if (variant === "future") {
    return (
      <svg viewBox="0 0 520 520" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <rect width="520" height="520" fill="#080b12" />
        <path d="M70 380L180 260L275 312L450 120" fill="none" stroke="#C8A96B" strokeWidth="2" />
        <path d="M80 150H210V280H350V410" fill="none" stroke="rgba(255,255,255,0.18)" />
        {[70, 180, 275, 450].map((x, index) => (
          <circle key={x} cx={x} cy={[380, 260, 312, 120][index]} r="7" fill="#C8A96B" />
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 520 520" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <rect width="520" height="520" fill="#080b12" />
      <path d="M90 150L210 230L315 120L430 260L300 395L170 340Z" fill="none" stroke="#C8A96B" strokeWidth="2" />
      <path d="M210 230L300 395M315 120L170 340M90 150L430 260" stroke="rgba(255,255,255,0.18)" />
      {[90, 210, 315, 430, 300, 170].map((x, index) => (
        <circle key={x} cx={x} cy={[150, 230, 120, 260, 395, 340][index]} r="7" fill={index % 2 ? "white" : "#C8A96B"} />
      ))}
    </svg>
  );
}
