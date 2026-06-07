import Image from "next/image";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import type { RoutePage } from "@/content/site";

type AboutPageProps = {
  page: RoutePage;
};

const experienceCards = [
  {
    number: "01",
    image: "/images/about-person-01.png",
    imageAlt: "Faceless illustrated executive holding a laptop",
    title: "Enterprise IT Leadership",
    text: "Leadership experience across banking technology, regulated delivery and executive decision environments."
  },
  {
    number: "02",
    image: "/images/about-person-02.png",
    imageAlt: "Faceless illustrated advisor holding a tablet",
    title: "Governance & Transformation",
    text: "Operating models, project structures and risk-aware delivery for organizations moving through change."
  },
  {
    number: "03",
    image: "/images/about-person-03.png",
    imageAlt: "Faceless illustrated consultant holding a tablet",
    title: "AI Advisory & Education",
    text: "Responsible AI adoption, executive learning and practical capability building for modern teams."
  }
];

export function AboutPage({ page }: AboutPageProps) {
  const [experience, ...sections] = page.sections;

  return (
    <>
      <section className="border-b border-slate-200 bg-white pb-14 pt-28 lg:pb-20 lg:pt-32">
        <div className="container-shell">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                {page.hero.eyebrow}
              </p>
              <h1 className="font-display text-5xl leading-[0.98] text-navy md:text-6xl lg:text-7xl">
                {page.hero.title}
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-graphite md:text-lg">
                {page.hero.text}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container-shell">
          <Reveal>
            <div className="mx-auto max-w-5xl text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                {experience.eyebrow}
              </p>
              <h2 className="font-display text-4xl leading-[1.02] text-navy md:text-5xl">
                Practical leadership for complex, regulated and knowledge-led environments.
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-7 lg:grid-cols-3 lg:items-end">
            {experienceCards.map((card, index) => (
              <Reveal key={card.number} delay={80 + index * 70} className="h-full">
                <ExperiencePersonCard card={card} featured={index === 1} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={260}>
            <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
              {experience.bullets?.map((bullet) => (
                <div key={bullet} className="rounded-lg border border-slate-200 bg-porcelain p-4">
                  <Icon name="CheckCircle2" className="mb-3 h-4 w-4 text-gold" />
                  <p className="text-sm font-bold leading-6 text-slate-700">{bullet}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain py-16 lg:py-20">
        <div className="container-shell grid gap-6">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 80}>
              <article className="grid gap-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8 lg:grid-cols-[0.34fr_0.66fr]">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                    {section.eyebrow}
                  </p>
                  <h2 className="font-display text-3xl leading-[1.05] text-navy md:text-4xl">
                    {section.title}
                  </h2>
                </div>
                <div className="grid gap-5">
                  {section.body?.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-graphite md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <div className="grid gap-3 md:grid-cols-3">
                      {section.bullets.map((bullet) => (
                        <div key={bullet} className="rounded-lg border border-slate-200 bg-porcelain p-4">
                          <Icon name="CheckCircle2" className="mb-3 h-4 w-4 text-gold" />
                          <p className="text-sm font-bold leading-6 text-slate-700">{bullet}</p>
                        </div>
                      ))}
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

function ExperiencePersonCard({
  card,
  featured = false
}: {
  card: (typeof experienceCards)[number];
  featured?: boolean;
}) {
  return (
    <div className={`flex h-full flex-col ${featured ? "lg:-mt-8" : "lg:pt-16"}`}>
      <div className="relative z-10 mx-auto mb-[-28px] h-[360px] w-[86%] max-w-[360px] overflow-hidden rounded-lg bg-[#f4f1e9] shadow-[0_24px_70px_rgba(15,23,42,0.12)] md:h-[410px] lg:h-[440px]">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          sizes="(min-width: 1024px) 28vw, (min-width: 768px) 50vw, 86vw"
          className="object-contain object-bottom"
        />
      </div>
      <article className="flex flex-1 flex-col rounded-lg border border-slate-200 bg-white p-5 pt-10 shadow-sm">
        <div className="mb-5 border-b border-slate-200 bg-gold/20 px-4 py-3 text-sm font-extrabold text-navy">
          {card.number}
        </div>
        <h3 className="font-display text-2xl leading-[1.08] text-navy">{card.title}</h3>
        <p className="mt-4 text-sm font-medium leading-7 text-slate-700">{card.text}</p>
      </article>
    </div>
  );
}
