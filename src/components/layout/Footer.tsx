import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { NavItem, siteConfig } from "@/content/site";

type FooterProps = {
  navigation: NavItem[];
  site: typeof siteConfig;
};

export function Footer({ site }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-shell py-14">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg border border-gold/35 bg-porcelain font-display text-2xl text-navy">
              J
            </span>
            <span>
              <span className="block text-sm font-extrabold tracking-[0.14em] text-navy">
                {site.shortName}
              </span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-graphite">
                AI - Governance - PM
              </span>
            </span>
          </Link>
        </div>

        <div className="mt-8 grid gap-8 rounded-lg border border-slate-200 bg-porcelain p-6 md:grid-cols-[1fr_0.9fr] md:items-center">
          <p className="max-w-2xl text-sm leading-7 text-graphite">{site.description}</p>
          <div className="grid gap-3 text-sm text-graphite md:justify-end">
            <span className="inline-flex items-center gap-2">
              <Icon name="MapPin" className="h-4 w-4 text-gold" />
              {site.location}
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5">
        <div className="container-shell flex flex-col gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright {new Date().getFullYear()} {site.name}</span>
          <span>Executive advisory for AI, governance and project leadership</span>
        </div>
      </div>
    </footer>
  );
}
