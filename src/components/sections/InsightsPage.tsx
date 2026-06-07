import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import type { Insight, RoutePage } from "@/content/site";

type InsightsPageProps = {
  page: RoutePage;
  insights: Insight[];
};

const themes = [
  {
    title: "Articles",
    text: "Practical writing for leaders managing technology, governance and delivery."
  },
  {
    title: "AI Governance",
    text: "Responsible AI needs ownership, controls and learning before tools scale."
  },
  {
    title: "Project Management",
    text: "Delivery discipline, PMO thinking and executive communication for complex work."
  },
  {
    title: "Digital Transformation",
    text: "Modernization works when ambition is connected to operating reality."
  },
  {
    title: "Conference Talks",
    text: "Executive talks on AI, governance, transformation and project leadership."
  }
];

export function InsightsPage({ page, insights }: InsightsPageProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white pb-16 pt-28 lg:pb-20 lg:pt-32">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_30%_0%,rgba(200,169,107,0.2),transparent_30%),linear-gradient(180deg,rgba(248,250,252,1),rgba(255,255,255,0))]" />
        <div className="container-shell relative">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.78fr_0.22fr] lg:items-end">
              <div>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                  {page.hero.eyebrow}
                </p>
                <h1 className="max-w-5xl font-display text-5xl leading-[0.98] text-navy md:text-6xl lg:text-7xl">
                  {page.hero.title}
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-graphite">{page.hero.text}</p>
              </div>
              <div className="hidden border-l border-gold/40 pl-5 text-sm font-bold leading-7 text-slate-600 lg:block">
                Executive framing, practical language and decision-oriented reading.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container-shell">
          <Reveal>
            <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                  Reading Themes
                </p>
                <h2 className="font-display text-4xl leading-[1.02] text-navy md:text-5xl">
                  Five ways into the same leadership conversation.
                </h2>
              </div>
              <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-500">
                {themes.length} topics
              </span>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-0 border-y border-slate-200">
            {themes.map((theme, index) => (
              <Reveal key={theme.title} delay={index * 60}>
                <article className="grid gap-5 border-b border-slate-200 py-7 last:border-b-0 md:grid-cols-[0.18fr_0.32fr_0.5fr] md:items-center">
                  <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-3xl leading-[1.04] text-navy">{theme.title}</h3>
                  <p className="text-base leading-7 text-graphite">{theme.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-porcelain py-16 lg:py-20">
        <div className="container-shell">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                  Featured Articles
                </p>
                <h2 className="font-display text-4xl leading-[1.02] text-navy">
                  Selected thinking for current leadership questions.
                </h2>
              </div>
              <div className="grid gap-0 border-t border-slate-300">
                {insights.map((insight, index) => (
                  <Link
                    href={`/insights/${insight.slug}`}
                    key={insight.slug}
                    className="group grid gap-4 border-b border-slate-300 py-7 transition hover:pl-3 md:grid-cols-[0.2fr_0.8fr]"
                  >
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                        {insight.category}
                      </span>
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
                        {insight.readTime}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display text-3xl leading-[1.05] text-navy group-hover:text-gold">
                        {insight.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-base leading-7 text-graphite">
                        {insight.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-navy">
                        Read Insight
                        <Icon name="ArrowRight" className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
