import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Reveal } from "@/components/Reveal";
import type { Service } from "@/content/site";

type ServicesGridProps = {
  intro: string;
  services: Service[];
};

export function ServicesGrid({ intro, services }: ServicesGridProps) {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Services"
            title="Executive support for governance, delivery and responsible AI adoption."
            text={intro}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 80}>
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
