import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import type { Industry, RoutePage } from "@/content/site";

type IndustriesPageProps = {
  page: RoutePage;
  industries: Industry[];
};

export function IndustriesPage({ page, industries }: IndustriesPageProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f7f8f9] pb-16 pt-28 lg:pb-20 lg:pt-32">
        <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(8,15,31,0.08),transparent)]" />
        <div className="absolute right-[8%] top-24 hidden h-72 w-72 rounded-full border border-gold/25 lg:block" />
        <div className="absolute right-[14%] top-40 hidden h-40 w-40 rounded-full border border-slate-300 lg:block" />
        <div className="container-shell relative">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.48fr_0.52fr] lg:items-end">
              <div className="premium-rule pl-6">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                  {page.hero.eyebrow}
                </p>
                <h1 className="font-display text-5xl leading-[0.98] text-navy md:text-6xl lg:text-7xl">
                  {page.hero.title}
                </h1>
              </div>
              <div className="max-w-2xl">
                <p className="text-lg leading-8 text-graphite">{page.hero.text}</p>
                <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-y border-slate-300 py-6 text-sm font-extrabold uppercase tracking-[0.16em] text-navy sm:grid-cols-3">
                  <span>Regulation</span>
                  <span>Trust</span>
                  <span>Delivery</span>
                  <span>Risk</span>
                  <span>Capability</span>
                  <span>Adoption</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-shell">
          <Reveal>
            <div className="grid gap-8 border-b border-slate-200 pb-9 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
              <div className="max-w-2xl">
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                  Sector Map
                </p>
                <h2 className="font-display text-4xl leading-[1.02] text-navy md:text-5xl">
                  Choose the environment closest to your work.
                </h2>
              </div>
              <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr] lg:items-end">
                <p className="text-lg leading-8 text-graphite">
                  Industry context changes how governance is explained, who needs evidence and how
                  transformation decisions are sequenced.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs font-extrabold uppercase tracking-[0.16em] text-navy sm:grid-cols-3 lg:grid-cols-2">
                  {["Regulated", "Public", "Software", "Utilities"].map((item) => (
                    <span key={item} className="border-t border-gold/50 pt-3">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
            {industries.map((industry, index) => (
              <Reveal
                key={industry.slug}
                delay={index * 60}
                className={`h-full ${
                  index === 0 ? "xl:col-span-3" : index === 1 ? "xl:col-span-3" : "xl:col-span-2"
                }`}
              >
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex h-full min-h-[250px] flex-col rounded-lg border border-slate-200 bg-[#f6f8fa] p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:bg-white hover:shadow-card"
                >
                  <div className="mb-7 flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-lg border border-gold/30 bg-white text-navy transition group-hover:border-gold/70 group-hover:text-gold">
                      <Icon name={industry.icon} className="h-5 w-5" />
                    </span>
                    <Icon
                      name="ArrowRight"
                      className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-gold"
                    />
                  </div>
                  <h3 className="max-w-md font-display text-3xl leading-[1.04] text-navy">
                    {industry.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-base font-medium leading-8 text-graphite">
                    {industry.description}
                  </p>
                  <span className="mt-auto pt-8 text-sm font-extrabold text-navy transition group-hover:text-gold">
                    Learn More
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#080b12] py-16 text-white lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(200,169,107,0.2),transparent_26%),radial-gradient(circle_at_82%_58%,rgba(148,163,184,0.14),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(248,250,252,0.03)_1px,transparent_1px)] bg-[size:82px_82px] opacity-25" />
        <div className="container-shell relative">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
              <div className="max-w-xl">
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                  Advisory Lens
                </p>
                <h2 className="font-display text-4xl leading-[1.02] md:text-5xl">
                  Different sectors, same need for control.
                </h2>
                <p className="mt-6 text-base leading-8 text-slate-300">
                  Sector context changes the language, cadence and proof points. The control
                  questions stay consistent.
                </p>
              </div>
              <div className="relative min-h-[430px]">
                <div className="absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25 lg:block" />
                <div className="absolute left-1/2 top-1/2 hidden h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-gold/10 lg:block" />
                <div className="absolute left-1/2 top-1/2 hidden h-px w-full -translate-x-1/2 bg-white/10 lg:block" />
                <div className="absolute left-1/2 top-0 hidden h-full w-px bg-white/10 lg:block" />
                {["Evidence expectations", "Stakeholder rhythm", "Delivery risk", "AI readiness"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className={`relative mb-5 rounded-lg border border-white/12 bg-white/[0.055] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:bg-white/[0.08] lg:absolute lg:mb-0 lg:w-[285px] ${
                        index === 0
                          ? "lg:left-0 lg:top-0"
                          : index === 1
                            ? "lg:right-0 lg:top-16"
                            : index === 2
                              ? "lg:left-12 lg:bottom-14"
                              : "lg:right-8 lg:bottom-0"
                      }`}
                    >
                      <span className="mb-7 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/45 font-display text-xl text-gold">
                        {index + 1}
                      </span>
                      <p className="font-display text-2xl leading-[1.05] text-white">{item}</p>
                      <div className="mt-5 h-px w-16 bg-gold/70" />
                    </div>
                  )
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
