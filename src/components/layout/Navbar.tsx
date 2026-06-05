"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { MobileMenu } from "@/components/layout/MobileMenu";
import type { NavItem } from "@/content/site";

type NavbarProps = {
  navigation: NavItem[];
  siteName: string;
  bookingHref: string;
};

export function Navbar({ navigation, siteName, bookingHref }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const previousBodyOverflow = useRef("");
  const previousHtmlOverflow = useRef("");
  const pathname = usePathname();
  const glass = pathname === "/" && !scrolled && !open;

  function clearDropdownTimer() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openDropdown(itemHref: string) {
    clearDropdownTimer();
    setActiveDropdown(itemHref);
  }

  function closeDropdownSoon() {
    clearDropdownTimer();
    closeTimer.current = window.setTimeout(() => setActiveDropdown(null), 220);
  }

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    return () => clearDropdownTimer();
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.classList.remove("mobile-menu-open");
      document.documentElement.style.overflow = previousHtmlOverflow.current;
      return;
    }

    previousBodyOverflow.current = document.body.style.overflow;
    previousHtmlOverflow.current = document.documentElement.style.overflow;
    document.body.classList.add("mobile-menu-open");
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = previousBodyOverflow.current;
      document.documentElement.style.overflow = previousHtmlOverflow.current;
    };
  }, [open]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) {
        setOpen(false);
      }
    };

    closeOnDesktop();
    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition duration-300 ${
          glass
            ? "border-white/[0.08] bg-navy/[0.10] shadow-none"
            : "border-slate-200/80 bg-porcelain/[0.92] shadow-sm"
        }`}
      >
        <div className="container-shell flex h-[72px] items-center justify-between">
          <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-gold/[0.35] bg-white/[0.95] font-display text-2xl text-navy shadow-sm">
              J
            </span>
            <span className="leading-tight">
              <span
                className={`block text-sm font-extrabold tracking-[0.14em] transition ${
                  glass ? "text-white" : "text-navy"
                }`}
              >
                {siteName}
              </span>
              <span
                className={`block text-[11px] font-semibold uppercase tracking-[0.2em] transition ${
                  glass ? "text-slate-200" : "text-graphite"
                }`}
              >
                Executive Consulting
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const dropdownOpen = activeDropdown === item.href;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && openDropdown(item.href)}
                  onMouseLeave={() => item.children && closeDropdownSoon()}
                  onFocus={() => item.children && openDropdown(item.href)}
                  onBlur={() => item.children && closeDropdownSoon()}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-bold transition ${
                      glass
                        ? active
                          ? "text-white"
                          : "text-slate-200 hover:text-white"
                        : active
                          ? "text-navy"
                          : "text-graphite hover:text-navy"
                    }`}
                  >
                    {item.label}
                    {item.children ? <Icon name="ChevronDown" className="h-3.5 w-3.5" /> : null}
                  </Link>
                  {item.children ? (
                    <div
                      className={`absolute left-0 top-full w-72 rounded-lg border border-slate-200 bg-white p-2 shadow-premium transition duration-200 ${
                        dropdownOpen
                          ? "visible translate-y-1 opacity-100"
                          : "invisible pointer-events-none translate-y-3 opacity-0"
                      }`}
                    >
                      {item.children.map((child) => (
                        <Link
                          href={child.href}
                          key={child.href}
                          className="block rounded-md px-3 py-2 text-sm font-semibold text-graphite transition hover:bg-porcelain hover:text-navy"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href={bookingHref}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold/60 ${
                glass
                  ? "border-white/40 bg-white text-navy hover:bg-gold"
                  : "border-gold/55 bg-navy text-white hover:bg-slate-800"
              }`}
            >
              <Icon name="Calendar" className="h-4 w-4" />
              Book
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/50 bg-white/[0.95] text-navy shadow-sm transition hover:border-gold/50 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <Icon name={open ? "X" : "Menu"} className="h-5 w-5" />
          </button>
        </div>
      </header>
      <MobileMenu
        open={open}
        navigation={navigation}
        siteName={siteName}
        bookingHref={bookingHref}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
