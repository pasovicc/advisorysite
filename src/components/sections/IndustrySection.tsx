import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import type { Industry } from "@/content/site";

type IndustrySectionProps = {
  industries: Industry[];
};

export function IndustrySection({ industries }: IndustrySectionProps) {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Industries"
            title="Advisory shaped by regulation, public trust and operational complexity."
            text="The work adapts to sector context, from banking and public institutions to software, infrastructure and education."
          />
        </Reveal>
        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-6">
          {industries.map((industry, index) => (
            <Reveal
              key={industry.slug}
              delay={index * 70}
              className={`h-full ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
            >
              <Link
                href={`/industries/${industry.slug}`}
                className="group flex h-full min-h-[320px] flex-col rounded-lg border border-slate-200 bg-porcelain p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-white hover:shadow-card md:p-7"
              >
                <div className="mb-7 grid h-11 w-11 place-items-center rounded-lg border border-gold/30 bg-white text-navy shadow-sm transition group-hover:border-gold/60 group-hover:text-gold">
                  <Icon name={industry.icon} className="h-5 w-5" />
                </div>
                <h3 className="max-w-sm font-display text-[1.72rem] leading-[1.07] text-navy">
                  {industry.title}
                </h3>
                <p className="mt-5 max-w-md text-[15px] font-medium leading-7 text-slate-700">
                  {industry.description}
                </p>
                <span className="mt-auto inline-flex pt-8 text-sm font-extrabold text-navy transition group-hover:text-gold">
                  Learn More
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
