import Link from "next/link";
import { Icon } from "@/components/Icon";
import { InsightCard } from "@/components/cards/InsightCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import type { Insight } from "@/content/site";

type FeaturedInsightsProps = {
  insights: Insight[];
};

export function FeaturedInsights({ insights }: FeaturedInsightsProps) {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container-shell">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Featured Insights"
              title="Thinking for AI governance, DORA and the future of project leadership."
            />
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-navy transition hover:text-gold"
            >
              View Insights
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {insights.map((insight, index) => (
            <Reveal key={insight.slug} delay={index * 90}>
              <InsightCard insight={insight} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
