import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { Service } from "@/content/site";

type ServiceCardProps = {
  service: Service;
  index?: number;
};

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-lg border border-white/[0.12] bg-white/[0.075] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-gold/55 hover:bg-white/[0.115]"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-gold/20 bg-gold/[0.06]" />
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
        <span className="text-sm font-extrabold text-gold">{number}</span>
        <span className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-white/[0.08] text-gold transition group-hover:border-gold/50 group-hover:bg-gold group-hover:text-navy">
          <Icon name={service.icon} className="h-5 w-5" />
        </span>
      </div>
      <h3 className="relative font-display text-[1.85rem] leading-[1.05] text-white">
        {service.title}
      </h3>
      <p className="relative mt-5 flex-1 text-[15px] font-medium leading-7 text-slate-300">
        {service.description}
      </p>
      <Link
        href="/services"
        className="relative mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-white transition group-hover:text-gold"
      >
        Learn More
        <Icon name="ArrowRight" className="h-4 w-4" />
      </Link>
    </article>
  );
}
