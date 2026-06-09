import { ServiceCard } from "@/components/cards/ServiceCard";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import type { Service } from "@/content/site";

type ServicesGridProps = {
  intro: string;
  services: Service[];
};

export function ServicesGrid({ intro, services }: ServicesGridProps) {
  return (
    <section className="relative overflow-hidden bg-[#080b12] py-20 text-white lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(200,169,107,0.18),transparent_28%),radial-gradient(circle_at_82%_70%,rgba(248,250,252,0.08),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(248,250,252,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-45" />

      <div className="container-shell relative">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.68fr_0.32fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                Services
              </p>
              <h2 className="max-w-4xl font-display text-5xl leading-[0.98] text-white md:text-6xl">
                Executive support for governance, delivery and responsible AI adoption.
              </h2>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold">
                  Advisory Scope
                </span>
                <span className="font-display text-4xl leading-none text-white">
                  {String(services.length).padStart(2, "0")}
                </span>
              </div>
              <p className="text-sm font-medium leading-7 text-slate-300">{intro}</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 70} className="h-full">
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={420}>
          <div className="mt-8 flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm font-bold leading-7 text-slate-300">
              Each engagement can stand alone or combine into a focused advisory roadmap.
            </p>
            <a
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-white transition hover:text-gold"
            >
              View all services
              <Icon name="ArrowRight" className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
