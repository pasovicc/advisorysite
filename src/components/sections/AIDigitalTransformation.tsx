import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

type AIDigitalTransformationProps = {
  content: {
    eyebrow: string;
    title: string;
    text: string;
    points: string[];
    link: { label: string; href: string };
  };
};

export function AIDigitalTransformation({ content }: AIDigitalTransformationProps) {
  return (
    <section className="border-y border-slate-200 bg-porcelain py-20 lg:py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <div className="premium-rule pl-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-gold">
              {content.eyebrow}
            </p>
            <h2 className="font-display text-4xl leading-[1.05] text-navy md:text-5xl">
              {content.title}
            </h2>
            <p className="mt-6 text-base leading-8 text-graphite md:text-lg">{content.text}</p>
            <Link
              href={content.link.href}
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-navy bg-navy px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              {content.link.label}
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-card md:p-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-lg border border-gold/35 bg-gold/10 text-navy">
                <Icon name="BrainCircuit" className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  Governance Lens
                </p>
                <h3 className="mt-1 font-display text-2xl text-navy">Adoption with control</h3>
              </div>
            </div>
            <div className="grid gap-4">
              {content.points.map((point) => (
                <div key={point} className="flex gap-3 rounded-lg border border-slate-200 bg-porcelain p-4">
                  <Icon name="CheckCircle2" className="mt-1 h-4 w-4 shrink-0 text-gold" />
                <p className="text-sm font-bold leading-6 text-slate-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
