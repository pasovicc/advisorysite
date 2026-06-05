import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

type WhyWorkWithMeProps = {
  items: {
    title: string;
    description: string;
  }[];
};

export function WhyWorkWithMe({ items }: WhyWorkWithMeProps) {
  return (
    <section className="border-y border-slate-200 bg-porcelain py-20 lg:py-24">
      <div className="container-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Why Work With Me"
            title="A rare combination of AI, governance, PM, banking and education."
            text="The advisory approach connects executive strategy with the delivery details that determine whether transformation holds."
            align="center"
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <article className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <Icon name="Award" className="mb-6 h-6 w-6 text-gold" />
                <h3 className="font-display text-[1.65rem] leading-[1.08] text-navy">
                  {item.title}
                </h3>
                <p className="mt-5 text-[15px] font-medium leading-7 text-slate-700">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
