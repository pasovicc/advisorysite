import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { Insight } from "@/content/site";

type InsightCardProps = {
  insight: Insight;
};

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <article className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-card">
      <div className="mb-8 flex items-center justify-between gap-4 text-xs font-extrabold uppercase tracking-[0.18em] text-slate-600">
        <span>{insight.category}</span>
        <span>{insight.readTime}</span>
      </div>
      <h3 className="font-display text-[1.7rem] leading-[1.08] text-navy">{insight.title}</h3>
      <p className="mt-5 text-[15px] font-medium leading-7 text-slate-700">
        {insight.description}
      </p>
      <Link
        href={`/insights/${insight.slug}`}
        className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-navy transition group-hover:text-gold"
      >
        Read Insight
        <Icon name="ArrowRight" className="h-4 w-4" />
      </Link>
    </article>
  );
}
