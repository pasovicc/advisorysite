import Link from "next/link";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

type ConsultationCTAProps = {
  content: {
    eyebrow?: string;
    title: string;
    text: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  compact?: boolean;
};

const benefits = [
  "Clarify the transformation or governance challenge",
  "Identify the right advisory, workshop or education format",
  "Define practical next steps for leadership and delivery teams"
];

const sessionDetails = [
  { label: "Duration", value: "30-minute introductory call" },
  { label: "Format", value: "Online consultation" },
  { label: "Focus", value: "AI, governance and project leadership" }
];

export function ConsultationCTA({ content, compact = false }: ConsultationCTAProps) {
  const primary = content.primaryCta || content.primary;
  const secondary = content.secondaryCta || content.secondary;
  const external = primary?.href.startsWith("http");

  return (
    <section
      id={compact ? undefined : "schedule-consultation"}
      className={`${compact ? "pb-20" : "scroll-mt-24 py-20 lg:py-24"} bg-porcelain`}
    >
      <Reveal className="container-shell">
        <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-premium">
          <div className="absolute inset-y-0 right-0 hidden w-2/5 bg-navy lg:block" />
          <div className="absolute right-0 top-0 hidden h-full w-2/5 opacity-70 lg:block">
            <div className="hero-boardroom-motion h-full w-full" />
          </div>
          <div className="relative grid gap-7 p-6 md:p-8 lg:grid-cols-[0.44fr_0.56fr] lg:items-start lg:p-10">
            <div className="max-w-xl lg:sticky lg:top-28">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                {content.eyebrow || "Schedule Consultation"}
              </p>
              <h2 className="font-display text-4xl leading-[1.05] text-navy md:text-5xl lg:text-[3.35rem]">
                {content.title}
              </h2>
              <p className="mt-5 text-base font-medium leading-8 text-slate-700">{content.text}</p>

              <div className="mt-7 grid gap-3 rounded-lg border border-slate-200 bg-porcelain p-5">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex gap-3">
                    <Icon name="CheckCircle2" className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <p className="text-sm font-bold leading-6 text-slate-700">{benefit}</p>
                  </div>
                ))}
              </div>

              {secondary ? (
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={secondary.href}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-navy transition hover:-translate-y-0.5 hover:border-gold/70"
                  >
                    {secondary.label}
                    <Icon name="ArrowRight" className="h-4 w-4" />
                  </Link>
                </div>
              ) : null}
            </div>

            {compact ? (
              <CompactConsultationCard primary={primary} external={external} />
            ) : (
              <CalendlyEmbed />
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function CompactConsultationCard({
  primary,
  external
}: {
  primary?: { label: string; href: string };
  external?: boolean;
}) {
  return (
    <div className="relative rounded-lg border border-slate-200 bg-porcelain p-5 shadow-card lg:border-white/[0.15] lg:bg-white/[0.95]">
      <div className="flex items-start gap-4 border-b border-slate-200 pb-5">
        <div className="grid h-12 w-12 place-items-center rounded-lg bg-navy text-gold">
          <Icon name="Calendar" className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Consultation</p>
          <h3 className="mt-1 font-display text-3xl leading-tight text-navy">
            30-minute introductory call
          </h3>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {sessionDetails.map((detail) => (
          <div
            key={detail.label}
            className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3"
          >
            <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-600">
              {detail.label}
            </span>
            <span className="text-right text-sm font-extrabold text-navy">{detail.value}</span>
          </div>
        ))}
      </div>

      {primary ? (
        <Link
          href={primary.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-navy bg-navy px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          <Icon name="Calendar" className="h-4 w-4" />
          {primary.label}
        </Link>
      ) : null}
    </div>
  );
}
