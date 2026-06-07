import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

type AIAssistantPreviewProps = {
  content: {
    title: string;
    subtitle: string;
    examples: string[];
    cta: { label: string; href: string };
  };
};

export function AIAssistantPreview({ content }: AIAssistantPreviewProps) {
  return (
    <section className="bg-navy py-20 text-white lg:py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-gold">
              AI Advisor
            </p>
            <h2 className="font-display text-4xl leading-[1.05] md:text-5xl">{content.title}</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
              {content.subtitle}
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="rounded-lg border border-white/15 bg-white/[0.06] p-5 shadow-premium backdrop-blur md:p-7">
            <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-5">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gold text-navy">
                <Icon name="Sparkles" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold">Advisory AI</p>
                <p className="text-xs text-slate-400">Project / Governance / Transformation</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {content.examples.map((example) => (
                <span
                  key={example}
                  className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-2 text-xs font-bold text-slate-100"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
