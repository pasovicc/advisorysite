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

      <ServiceIndex services={services} />
      <ServiceIntelligence services={services} />
    </>
  );
}

function ServiceIndex({ services }: { services: Service[] }) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-shell">
        <Reveal>
          <div className="grid gap-8 border-b border-slate-200 pb-10 lg:grid-cols-[0.36fr_0.64fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                Operating Model
              </p>
              <h2 className="font-display text-4xl leading-[1.02] text-navy md:text-5xl">
                One advisory system, six ways to enter.
              </h2>
            </div>
            <div aria-hidden="true" />
          </div>
        </Reveal>

        <div className="mt-4 divide-y divide-slate-200">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 55}>
              <article className="grid gap-6 py-9 transition hover:pl-2 md:grid-cols-[0.12fr_0.28fr_0.38fr_0.22fr] md:items-start">
                <div className="flex items-center gap-3 text-gold">
                  <Icon name={service.icon} className="h-5 w-5" />
                  <span className="h-px w-10 bg-gold/70" />
                </div>
                <h3 className="font-display text-3xl leading-[1.04] text-navy md:text-4xl">
                  {service.title}
                </h3>
                <p className="text-base leading-8 text-graphite">{service.longDescription}</p>
                <div className="grid gap-2">
                  {service.engagements.map((item) => (
                    <p key={item} className="text-sm font-extrabold leading-6 text-navy">
                      <span className="mr-2 text-gold">/</span>
                      {item}
                    </p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceIntelligence({ services }: { services: Service[] }) {
  const focusAreas = [
    { label: "Governance", value: 34, color: "#C8A96B" },
    { label: "Delivery", value: 28, color: "#F8FAFC" },
    { label: "AI adoption", value: 22, color: "#64748B" },
    { label: "Education", value: 16, color: "#94A3B8" }
  ];

  return (
    <section className="bg-[#080b12] py-16 text-white lg:py-24">
      <div className="container-shell">
        <Reveal>
          <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[0.45fr_0.55fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                Service Intelligence
              </p>
              <h2 className="font-display text-4xl leading-[1.02] text-white md:text-5xl">
                Focus, coverage and practical outputs.
              </h2>
            </div>
            <div aria-hidden="true" />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.44fr_0.56fr] lg:items-center">
          <Reveal delay={80}>
            <div className="grid gap-7 sm:grid-cols-[220px_1fr] sm:items-center">
              <PieChart areas={focusAreas} />
              <div className="grid gap-4">
                {focusAreas.map((area) => (
                  <div key={area.label}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="text-sm font-extrabold text-slate-200">{area.label}</span>
                      <span className="text-xs font-bold text-gold">{area.value}%</span>
                    </div>
                    <div className="h-px bg-white/12">
                      <div
                        className="h-px bg-gold"
                        style={{ width: `${area.value * 2.2}%`, maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <RadarChart />
          </Reveal>
        </div>

        <Reveal delay={180}>
          <div className="mt-12 grid gap-0 border-y border-white/12">
            {services.map((service) => (
              <div
                key={service.slug}
                className="grid gap-4 border-b border-white/12 py-6 last:border-b-0 md:grid-cols-[0.28fr_0.72fr]"
              >
                <h3 className="font-display text-2xl leading-[1.05] text-white md:text-3xl">
                  {service.title}
                </h3>
                <p className="text-base font-medium leading-8 text-slate-300">
                  {service.deliverables.join(" / ")}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PieChart({
  areas
}: {
  areas: { label: string; value: number; color: string }[];
}) {
  let offset = 25;

  return (
    <svg aria-hidden="true" viewBox="0 0 220 220" className="h-[220px] w-[220px]">
      <circle cx="110" cy="110" r="74" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="28" />
      {areas.map((area) => {
        const dash = `${area.value} ${100 - area.value}`;
        const circle = (
          <circle
            key={area.label}
            cx="110"
            cy="110"
            r="74"
            fill="none"
            stroke={area.color}
            strokeDasharray={dash}
            strokeDashoffset={offset}
            strokeLinecap="butt"
            strokeWidth="28"
            pathLength="100"
            transform="rotate(-90 110 110)"
          />
        );
        offset -= area.value;
        return circle;
      })}
      <circle cx="110" cy="110" r="43" fill="#080b12" />
      <text x="110" y="104" fill="#FFFFFF" fontSize="25" fontFamily="Georgia, serif" textAnchor="middle">
        100
      </text>
      <text x="110" y="126" fill="#C8A96B" fontSize="10" fontWeight="800" letterSpacing="2" textAnchor="middle">
        COVERAGE
      </text>
    </svg>
  );
}

function RadarChart() {
  const points = "150,28 244,82 220,196 150,248 70,196 54,84";
  const inner = "150,76 204,106 190,176 150,206 102,178 92,108";

  return (
    <svg aria-hidden="true" viewBox="0 0 300 276" className="mx-auto h-auto w-full max-w-[520px]">
      {[0, 1, 2].map((level) => (
        <polygon
          key={level}
          points={level === 0 ? "150,52 226,96 206,186 150,228 88,188 76,98" : level === 1 ? inner : "150,112 174,126 170,158 150,174 128,158 124,128"}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
        />
      ))}
      <polygon points={points} fill="rgba(200,169,107,0.18)" stroke="#C8A96B" strokeWidth="2" />
      {[
        ["Strategy", 150, 16],
        ["Risk", 265, 78],
        ["Delivery", 246, 218],
        ["Capability", 150, 270],
        ["AI", 44, 220],
        ["Controls", 28, 78]
      ].map(([label, x, y]) => (
        <text
          key={label}
          x={Number(x)}
          y={Number(y)}
          fill="#CBD5E1"
          fontSize="11"
          fontWeight="800"
          letterSpacing="1.5"
          textAnchor="middle"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
