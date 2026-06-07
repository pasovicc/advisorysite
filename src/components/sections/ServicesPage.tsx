import Image from "next/image";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import type { Service } from "@/content/site";

type ServicesPageProps = {
  services: Service[];
};

export function ServicesPage({ services }: ServicesPageProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-900 bg-[#080b12] pb-16 pt-28 text-white lg:pb-20 lg:pt-32">
        <Image
          src="/images/services-sarajevo-map-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-86"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,11,18,0.98)_0%,rgba(8,11,18,0.9)_34%,rgba(8,11,18,0.58)_69%,rgba(8,11,18,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(200,169,107,0.22),transparent_28%),radial-gradient(circle_at_72%_36%,rgba(248,250,252,0.13),transparent_24%),linear-gradient(180deg,rgba(8,11,18,0.08),rgba(8,11,18,0.74))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(248,250,252,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
        <div className="container-shell relative">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
              <div>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                  Services
                </p>
                <h1 className="max-w-5xl font-display text-5xl leading-[0.98] text-white md:text-6xl lg:text-7xl">
                  Advisory, governance and education services for complex transformation work.
                </h1>
              </div>
            <div aria-hidden="true" />
          </div>
        </Reveal>
        </div>
      </section>

      <section className="bg-white">
        {services.map((service, index) => (
          <ServiceDetailSection
            key={service.slug}
            service={service}
            index={index}
            variant={index % 3}
          />
        ))}
      </section>

      <ServiceSummary services={services} />
    </>
  );
}

function ServiceDetailSection({
  service,
  index,
  variant
}: {
  service: Service;
  index: number;
  variant: number;
}) {
  if (variant === 1) {
    return (
      <section className="bg-porcelain py-16 lg:py-20">
        <div className="container-shell">
          <Reveal>
            <article className="grid gap-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-stretch">
              <div className="flex flex-col justify-between rounded-lg bg-navy p-6 text-white md:p-8">
                <div>
                  <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                    Service
                  </p>
                  <h2 className="font-display text-4xl leading-[1.02] md:text-5xl">
                    {service.title}
                  </h2>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200">
                    {service.longDescription}
                  </p>
                </div>
                <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-lg border border-gold/35 bg-gold/15 text-gold">
                  <Icon name={service.icon} className="h-6 w-6" />
                </div>
              </div>
              <BulletStack title="Engagements" bullets={service.engagements} compact />
            </article>
          </Reveal>
        </div>
      </section>
    );
  }

  if (variant === 2) {
    return (
      <section className="bg-white py-16 lg:py-20">
        <div className="container-shell">
          <Reveal>
            <article className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
              <div className="rounded-lg border border-slate-200 bg-porcelain p-6">
                <div className="mb-8 border-b border-slate-200 pb-5">
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
                    Service
                  </span>
                </div>
                <h2 className="font-display text-4xl leading-[1.02] text-navy md:text-5xl">
                  {service.title}
                </h2>
              </div>
              <div>
                <p className="max-w-3xl text-lg leading-8 text-graphite">{service.longDescription}</p>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {[...service.deliverables, ...service.engagements].map((item) => (
                    <div key={item} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                      <Icon name="CheckCircle2" className="mb-4 h-4 w-4 text-gold" />
                      <p className="text-sm font-bold leading-6 text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-shell">
        <Reveal>
          <article className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                Service
              </p>
              <h2 className="font-display text-4xl leading-[1.02] text-navy md:text-5xl">
                {service.title}
              </h2>
            </div>
            <div>
              <p className="max-w-4xl text-lg leading-8 text-graphite">{service.longDescription}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <BulletStack title="Deliverables" bullets={service.deliverables} />
                <BulletStack title="Engagements" bullets={service.engagements} />
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function BulletStack({
  title,
  bullets,
  compact = false
}: {
  title: string;
  bullets: string[];
  compact?: boolean;
}) {
  return (
    <div className={`rounded-lg border border-slate-200 bg-porcelain p-5 ${compact ? "h-full" : ""}`}>
      <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-gold">{title}</p>
      <div className="grid gap-3">
        {bullets.map((bullet) => (
          <div key={bullet} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4">
            <Icon name="CheckCircle2" className="mt-1 h-4 w-4 shrink-0 text-gold" />
            <p className="text-sm font-bold leading-6 text-slate-700">{bullet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceSummary({ services }: { services: Service[] }) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-shell">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">
              Overview
            </p>
            <h2 className="font-display text-4xl leading-[1.02] text-navy md:text-5xl">
              Service Summary
            </h2>
          </div>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-5xl gap-x-16 gap-y-14 md:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 60} className="h-full">
              <article className="flex min-h-[150px] flex-col justify-between rounded-lg border-2 border-navy bg-white p-5 transition hover:-translate-y-1 hover:border-gold hover:shadow-card">
                <div className="flex items-center justify-between">
                  <Icon name={service.icon} className="h-5 w-5 text-navy" />
                </div>
                <h3 className="mt-8 font-display text-2xl leading-[1.05] text-navy">
                  {service.title}
                </h3>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
