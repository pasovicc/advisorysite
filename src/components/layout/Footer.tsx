import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { NavItem, siteConfig } from "@/content/site";

type FooterProps = {
  navigation: NavItem[];
  site: typeof siteConfig;
};

export function Footer({ navigation, site }: FooterProps) {
  const primaryGroups = navigation.filter((item) => item.children).slice(0, 4);

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-shell grid gap-10 py-14 lg:grid-cols-[1.2fr_2fr]">
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
                AI · Governance · PM
              </span>
            </span>
          </Link>
          <p className="mt-6 max-w-md text-sm leading-7 text-graphite">{site.description}</p>
          <div className="mt-6 grid gap-3 text-sm text-graphite">
            <a className="inline-flex items-center gap-2 hover:text-navy" href={`mailto:${site.email}`}>
              <Icon name="Mail" className="h-4 w-4 text-gold" />
              {site.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <Icon name="MapPin" className="h-4 w-4 text-gold" />
              {site.location}
            </span>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {primaryGroups.map((group) => (
            <div key={group.href}>
              <Link href={group.href} className="text-sm font-extrabold uppercase tracking-[0.16em] text-navy">
                {group.label}
              </Link>
              <div className="mt-4 grid gap-2">
                {group.children?.slice(0, 5).map((child) => (
                  <Link
                    href={child.href}
                    key={child.href}
                    className="text-sm leading-6 text-graphite transition hover:text-navy"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-200 py-5">
        <div className="container-shell flex flex-col gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Built for CMS, booking and AI advisor integration</span>
        </div>
      </div>
    </footer>
  );
}
