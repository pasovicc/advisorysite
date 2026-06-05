import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { Service } from "@/content/site";

type ServiceCardProps = {
  service: Service;
  index?: number;
};

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  return (
    <article
      className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-card"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-navy">
        <Icon name={service.icon} className="h-5 w-5" />
      </div>
      <h3 className="font-display text-[1.7rem] leading-[1.08] text-navy">{service.title}</h3>
      <p className="mt-5 flex-1 text-[15px] font-medium leading-7 text-slate-700">
        {service.description}
      </p>
      <Link
        href={`/services/${service.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-navy transition group-hover:text-gold"
      >
        Learn More
        <Icon name="ArrowRight" className="h-4 w-4" />
      </Link>
    </article>
  );
}
