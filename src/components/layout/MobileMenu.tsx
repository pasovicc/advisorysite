"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/components/auth/AuthProvider";
import type { NavItem } from "@/content/site";

type MobileMenuProps = {
  open: boolean;
  navigation: NavItem[];
  siteName: string;
  bookingHref: string;
  onClose: () => void;
};

export function MobileMenu({ open, navigation, siteName, bookingHref, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { user, profile, loading, logout } = useAuth();

  useEffect(() => {
    if (!open) {
      setExpanded(null);
    }
  }, [open]);

  function toggleSection(href: string) {
    setExpanded((current) => (current === href ? null : href));
  }

  return (
    <div
      aria-hidden={!open}
      aria-label="Mobile navigation"
      aria-modal="true"
      className={`mobile-menu-shell ${open ? "is-open" : ""}`}
      role="dialog"
      style={{
        color: "#ffffff",
        display: "block",
        inset: 0,
        opacity: open ? 1 : 0,
        overflow: "hidden",
        pointerEvents: open ? "auto" : "none",
        position: "fixed",
        transform: open ? "translate3d(0, 0, 0)" : "translate3d(0, -10px, 0)",
        transition: "opacity 240ms ease, transform 240ms ease, visibility 240ms ease",
        visibility: open ? "visible" : "hidden",
        zIndex: 90
      }}
    >
      <div className="mobile-menu-backdrop" />
      <div className="mobile-menu-panel">
        <div className="mobile-menu-topbar">
          <Link href="/" className="mobile-menu-brand" onClick={onClose}>
            <span className="mobile-menu-logo">J</span>
            <span className="mobile-menu-brand-text">
              <span>{siteName}</span>
              <span>Executive Consulting</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="mobile-menu-close"
            aria-label="Close menu"
          >
            <Icon name="X" className="h-5 w-5" />
          </button>
        </div>

        <nav className="mobile-menu-scroll" aria-label="Mobile primary navigation">
          <div className="mobile-menu-list">
            {navigation.map((item) =>
              item.children ? (
                <section className="mobile-menu-item" key={item.href}>
                  <button
                    type="button"
                    className="mobile-menu-trigger"
                    onClick={() => toggleSection(item.href)}
                    aria-expanded={expanded === item.href}
                    aria-controls={`mobile-menu-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <span>{item.label}</span>
                    <Icon
                      name="ChevronDown"
                      className={`h-4 w-4 transition ${expanded === item.href ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    id={`mobile-menu-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`mobile-menu-submenu ${expanded === item.href ? "is-expanded" : ""}`}
                  >
                    <Link href={item.href} onClick={onClose} className="mobile-menu-sublink">
                      {item.label} Overview
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        href={child.href}
                        key={child.href}
                        onClick={onClose}
                        className="mobile-menu-sublink"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </section>
              ) : (
                <Link
                  href={item.label === "Book" ? bookingHref : item.href}
                  key={item.href}
                  onClick={onClose}
                  className="mobile-menu-link"
                >
                  <span>{item.label}</span>
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
              )
            )}

            <div className="mobile-menu-auth">
              {!loading && user ? (
                <>
                  <div>
                    <p className="mobile-menu-auth-label">Signed in</p>
                    <p className="mobile-menu-auth-value">{profile?.full_name || user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      void logout();
                    }}
                    className="mobile-menu-logout-button"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={onClose} className="mobile-menu-auth-link">
                    Login
                  </Link>
                  <Link href="/register" onClick={onClose} className="mobile-menu-auth-button">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
