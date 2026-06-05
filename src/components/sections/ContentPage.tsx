import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import type { RoutePage } from "@/content/site";

type ContentPageProps = {
  page: RoutePage;
};

export function ContentPage({ page }: ContentPageProps) {
  return (
    <>
      <section className="border-b border-slate-200 bg-porcelain pb-16 pt-28 lg:pb-24 lg:pt-32">
        <div className="container-shell">
          <Reveal>
            <div className="premium-rule max-w-4xl pl-6">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                {page.hero.eyebrow}
              </p>
              <h1 className="font-display text-5xl leading-[1] text-navy md:text-6xl">
                {page.hero.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-graphite">{page.hero.text}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container-shell grid gap-12">
          {page.sections.map((section, index) => (
            <Reveal key={`${section.title}-${index}`} delay={index * 70}>
              <article className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr]">
                <SectionHeader eyebrow={section.eyebrow} title={section.title} />
                <div className="grid gap-5">
                  {section.body?.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-graphite md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <div className="grid gap-3">
                      {section.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="flex gap-3 rounded-lg border border-slate-200 bg-porcelain p-4"
                        >
                          <Icon name="CheckCircle2" className="mt-1 h-4 w-4 shrink-0 text-gold" />
                          <p className="text-sm font-bold leading-6 text-slate-700">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {section.cards ? (
                    <div className="grid gap-5 md:grid-cols-2">
                      {section.cards.map((card) => {
                        const content = (
                          <article className="group h-full rounded-lg border border-slate-200 bg-porcelain p-5 transition hover:-translate-y-1 hover:border-gold/50 hover:bg-white hover:shadow-card">
                            <div className="mb-5 flex items-center gap-3">
                              {card.icon ? (
                                <span className="grid h-10 w-10 place-items-center rounded-lg border border-gold/30 bg-white text-navy">
                                  <Icon name={card.icon} className="h-5 w-5" />
                                </span>
                              ) : null}
                              {card.meta ? (
                                <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-600">
                                  {card.meta}
                                </span>
                              ) : null}
                            </div>
                            <h3 className="font-display text-[1.65rem] leading-[1.08] text-navy">
                              {card.title}
                            </h3>
                            <p className="mt-4 text-[15px] font-medium leading-7 text-slate-700">
                              {card.description}
                            </p>
                            {card.href ? (
                              <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-navy transition group-hover:text-gold">
                                Learn More
                                <Icon name="ArrowRight" className="h-4 w-4" />
                              </span>
                            ) : null}
                          </article>
                        );

                        return card.href ? (
                          <Link href={card.href} key={card.title}>
                            {content}
                          </Link>
                        ) : (
                          <div key={card.title}>{content}</div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
