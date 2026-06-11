"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/components/auth/AuthProvider";

const DEFAULT_CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/lucernacode/30min";

type CalendlyEmbedProps = {
  url?: string;
};

type CalendlyWindow = Window & {
  Calendly?: {
    initInlineWidget: (options: {
      url: string;
      parentElement: HTMLElement;
    }) => void;
  };
};

export function CalendlyEmbed({ url = DEFAULT_CALENDLY_URL }: CalendlyEmbedProps) {
  const { user, loading } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initializeWidget = useCallback(() => {
    const calendlyWindow = window as CalendlyWindow;

    if (!containerRef.current || !calendlyWindow.Calendly) {
      return;
    }

    containerRef.current.replaceChildren();
    calendlyWindow.Calendly.initInlineWidget({
      url,
      parentElement: containerRef.current
    });
  }, [url]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const stylesheetId = "calendly-widget-styles";

    if (!document.getElementById(stylesheetId)) {
      const stylesheet = document.createElement("link");
      stylesheet.id = stylesheetId;
      stylesheet.rel = "stylesheet";
      stylesheet.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(stylesheet);
    }

    initializeWidget();
  }, [initializeWidget, user]);

  useEffect(() => {
    if (!showLoginPrompt) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowLoginPrompt(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [showLoginPrompt]);

  if (loading) {
    return (
      <div className="grid min-h-[520px] place-items-center rounded-lg border border-slate-200 bg-white p-8 shadow-card lg:border-white/20">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-gold" />
          <p className="mt-4 text-sm font-bold text-slate-600">Preparing consultation access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="relative grid min-h-[590px] place-items-center overflow-hidden rounded-lg border border-slate-200 bg-navy p-7 shadow-card lg:border-white/20 md:p-10">
          <div className="hero-boardroom-motion absolute inset-0 opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/25 via-navy/70 to-navy" />
          <div className="relative max-w-md text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-lg border border-gold/45 bg-white/10 text-gold shadow-lg backdrop-blur-md">
              <Icon name="Calendar" className="h-7 w-7" />
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Consultation Access
            </p>
            <h3 className="mt-3 font-display text-4xl leading-tight text-white">
              Choose a time that works for you.
            </h3>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-200">
              Log in or register to view available consultation times.
            </p>
            <button
              type="button"
              onClick={() => setShowLoginPrompt(true)}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg border border-gold bg-gold px-6 py-3 text-sm font-extrabold text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              <Icon name="Calendar" className="h-4 w-4" />
              Book Consultation
            </button>
          </div>
        </div>

        {showLoginPrompt ? (
          <div
            className="fixed inset-0 z-[110] grid place-items-center bg-navy/75 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-login-title"
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) {
                setShowLoginPrompt(false);
              }
            }}
          >
            <div className="relative w-full max-w-md rounded-lg border border-white/15 bg-white p-6 shadow-premium md:p-8">
              <button
                type="button"
                onClick={() => setShowLoginPrompt(false)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-gold/60 hover:bg-porcelain hover:text-navy"
                aria-label="Close login prompt"
              >
                <Icon name="X" className="h-4 w-4" />
              </button>
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-navy text-gold">
                <Icon name="UserRound" className="h-5 w-5" />
              </div>
              <h3 id="booking-login-title" className="mt-5 font-display text-3xl leading-tight text-navy">
                You need to log in to book a consultation.
              </h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                Sign in to your account or create one.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-lg border border-navy bg-navy px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-lg border border-gold/70 bg-porcelain px-5 py-3 text-sm font-extrabold text-navy transition hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  return (
    <div className="relative min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-card md:p-2 lg:border-white/20">
      <div
        ref={containerRef}
        className="calendly-inline-widget w-full"
        data-url={url}
        style={{ minWidth: 0, height: 720 }}
      />
      <Script
        id="calendly-inline-widget-script"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={initializeWidget}
        onReady={initializeWidget}
      />
    </div>
  );
}
