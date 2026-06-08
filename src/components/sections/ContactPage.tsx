import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import type { RoutePage, siteConfig } from "@/content/site";

type ContactPageProps = {
  page: RoutePage;
  site: typeof siteConfig;
};

const inquiryTypes = ["Consulting", "Workshops", "Speaking", "Advisory"];

export function ContactPage({ page, site }: ContactPageProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-800 bg-[#070b12] pb-16 pt-28 text-white lg:pb-20 lg:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(200,169,107,0.3),transparent_24%),radial-gradient(circle_at_72%_16%,rgba(148,163,184,0.18),transparent_22%),linear-gradient(125deg,rgba(7,11,18,1)_0%,rgba(15,23,42,0.96)_48%,rgba(7,11,18,1)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(248,250,252,0.03)_1px,transparent_1px)] bg-[size:86px_86px] opacity-30" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,rgba(200,169,107,0.16),transparent)]" />
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 520"
          className="absolute inset-0 h-full w-full opacity-55"
          preserveAspectRatio="none"
        >
          <path
            d="M-60 420C130 310 220 380 370 265S640 110 810 180S1020 360 1260 150"
            fill="none"
            stroke="rgba(200,169,107,0.55)"
            strokeWidth="1.4"
          />
          <path
            d="M120 120L310 250L500 170L710 270L910 95L1130 220"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
          {[120, 310, 500, 710, 910, 1130].map((x, index) => (
            <circle
              key={x}
              cx={x}
              cy={[120, 250, 170, 270, 95, 220][index]}
              r="4"
              fill={index % 2 === 0 ? "#C8A96B" : "rgba(255,255,255,0.7)"}
            />
          ))}
        </svg>
        <div className="absolute -right-16 top-24 hidden h-[360px] w-[360px] rounded-full border border-gold/20 lg:block" />
        <div className="absolute right-24 top-44 hidden h-28 w-28 rounded-full border border-white/15 bg-white/[0.03] lg:block" />
        <div className="container-shell relative">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.66fr_0.34fr] lg:items-end">
              <div className="premium-rule max-w-5xl pl-6">
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                  {page.hero.eyebrow}
                </p>
                <h1 className="font-display text-5xl leading-[0.98] text-white md:text-6xl lg:text-7xl">
                  {page.hero.title}
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-200">{page.hero.text}</p>
              </div>
              <div className="hidden border-l border-white/15 pl-7 lg:block">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                  Inquiry Route
                </p>
                <div className="mt-6 grid gap-4">
                  {["Context", "Timeline", "Decision"].map((item) => (
                    <div key={item} className="flex items-center gap-4">
                      <span className="h-px w-12 bg-gold/70" />
                      <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <Reveal>
            <aside className="rounded-lg border border-slate-200 bg-porcelain p-6 shadow-sm md:p-8">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                Direct Contact
              </p>
              <h2 className="font-display text-4xl leading-[1.04] text-navy">
                Start with the simplest route.
              </h2>
              <div className="mt-8 grid gap-5">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-gold/60 hover:shadow-card"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-lg border border-gold/30 bg-gold/10 text-navy">
                    <Icon name="Mail" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                      Email
                    </span>
                    <span className="mt-1 block text-sm font-extrabold text-navy group-hover:text-gold">
                      {site.email}
                    </span>
                  </span>
                </a>
                <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4">
                  <span className="grid h-11 w-11 place-items-center rounded-lg border border-gold/30 bg-gold/10 text-navy">
                    <Icon name="MapPin" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                      Location
                    </span>
                    <span className="mt-1 block text-sm font-extrabold text-navy">{site.location}</span>
                  </span>
                </div>
              </div>
            </aside>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-premium md:p-8">
              <div className="flex flex-col gap-6 border-b border-slate-200 pb-7 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                    Inquiry Type
                  </p>
                  <h2 className="font-display text-4xl leading-[1.04] text-navy">
                    What should the conversation cover?
                  </h2>
                </div>
                <Link
                  href="/#schedule-consultation"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-navy bg-navy px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  <Icon name="Calendar" className="h-4 w-4" />
                  Book a Consultation
                </Link>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {inquiryTypes.map((type) => (
                  <div key={type} className="rounded-lg border border-slate-200 bg-porcelain p-5">
                    <Icon name="CheckCircle2" className="mb-4 h-4 w-4 text-gold" />
                    <h3 className="font-display text-2xl leading-[1.08] text-navy">{type}</h3>
                    <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
                      Share the context, timeline and decision you need to support.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
