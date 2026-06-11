"use client";

import { useRef, useState, type MouseEvent, type TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { TrustBar } from "@/components/sections/TrustBar";

type HeroSectionProps = {
  content: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    image: string;
    imageAlt: string;
  };
  trustItems: string[];
};

export function HeroSection({ content, trustItems }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-svh overflow-hidden border-b border-slate-900 bg-navy text-white">
      <Image
        src={content.image}
        alt={content.imageAlt}
        fill
        priority
        sizes="100vw"
        className="hero-background-image object-cover opacity-95"
      />
      <div className="hero-boardroom-motion absolute inset-0" />
      <div className="hero-cinematic-depth absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(15,23,42,0.95)_0%,rgba(15,23,42,0.84)_39%,rgba(15,23,42,0.54)_66%,rgba(15,23,42,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_40%,rgba(248,250,252,0.12),transparent_29%),radial-gradient(circle_at_72%_45%,rgba(200,169,107,0.18),transparent_31%),linear-gradient(180deg,rgba(15,23,42,0.05),rgba(15,23,42,0.9))]" />
      <HeroNetworkOverlay />
      <div className="hero-grain absolute inset-0" />

      <div
        className="relative z-10 mx-auto flex min-h-svh flex-col justify-between gap-7 pb-6 pt-28 md:gap-9 md:pb-8 md:pt-32 lg:pb-7"
        style={{ width: "min(calc(100% - 32px), 1340px)" }}
      >
        <div className="grid flex-1 items-center gap-9 lg:grid-cols-[minmax(0,0.88fr)_minmax(420px,0.72fr)] lg:gap-12 xl:gap-16">
          <div className="max-w-[680px] animate-fadeUp">
            <div className="premium-rule pl-6">
              <p className="mb-5 max-w-lg text-xs font-bold uppercase tracking-[0.24em] text-gold">
                {content.eyebrow}
              </p>
              <h1 className="max-w-[680px] font-display text-5xl leading-[0.96] text-white sm:text-6xl lg:text-[5rem] xl:text-[5.25rem] 2xl:text-[5.7rem]">
                {content.title}
              </h1>
              <p className="mt-6 max-w-[600px] text-lg leading-8 text-slate-200 md:text-xl">
                {content.subtitle}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={content.primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gold/40 bg-white px-5 py-3 text-sm font-extrabold text-navy shadow-sm transition hover:-translate-y-0.5 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-gold/60"
                >
                  <Icon name="Calendar" className="h-4 w-4" />
                  {content.primaryCta.label}
                </Link>
                <Link
                  href={content.secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-extrabold text-white shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-gold/70 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  {content.secondaryCta.label}
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <ExecutiveFrameworkPages />
        </div>

        <div className="mx-auto w-full max-w-[1180px]">
          <TrustBar items={trustItems} variant="hero" />
        </div>
      </div>
    </section>
  );
}

const frameworkPages = [
  {
    number: "01",
    title: "AI Governance Framework",
    text: "Responsible AI systems, controls, governance and risk alignment.",
    items: ["Policy model", "Human oversight", "Risk controls"],
    visual: "governance"
  },
  {
    number: "02",
    title: "Transformation Roadmap",
    text: "Strategic path from assessment to adoption and operational change.",
    items: ["Assess", "Align", "Adopt"],
    visual: "roadmap"
  },
  {
    number: "03",
    title: "DORA Readiness Model",
    text: "Resilience, risk management and compliance excellence.",
    items: ["Resilience", "ICT risk", "Evidence"],
    visual: "dora"
  }
];

function ExecutiveFrameworkPages() {
  const [activePage, setActivePage] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const swipeLocked = useRef(false);
  const leftPage = (activePage + frameworkPages.length - 1) % frameworkPages.length;
  const rightPage = (activePage + 1) % frameworkPages.length;

  const showPrevious = () => {
    setActivePage((current) => (current + frameworkPages.length - 1) % frameworkPages.length);
  };

  const showNext = () => {
    setActivePage((current) => (current + 1) % frameworkPages.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const touch = event.changedTouches[0];
    const distanceX = touch.clientX - touchStartX.current;
    const distanceY = touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(distanceX) < 48 || Math.abs(distanceX) < Math.abs(distanceY) * 1.25) {
      return;
    }

    swipeLocked.current = true;

    if (distanceX < 0) {
      showNext();
    } else {
      showPrevious();
    }

    window.setTimeout(() => {
      swipeLocked.current = false;
    }, 250);
  };

  const stopClickAfterSwipe = (event: MouseEvent<HTMLDivElement>) => {
    if (!swipeLocked.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className="framework-stage relative mx-auto h-[250px] w-full max-w-[380px] justify-self-center sm:h-[350px] sm:max-w-[600px] lg:h-[560px] lg:max-w-[620px] lg:justify-self-end"
      onClickCapture={stopClickAfterSwipe}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="framework-aura absolute -inset-8 rounded-full" />
      <div className="framework-lightline absolute bottom-5 left-8 right-6 h-px" />
      <div className="framework-particle framework-particle-one" />
      <div className="framework-particle framework-particle-two" />
      <div className="framework-particle framework-particle-three" />

      {frameworkPages.map((page, index) => (
        <FrameworkPage
          key={page.title}
          page={page}
          active={activePage === index}
          className={`framework-page-${getFrameworkPosition(index, activePage)}`}
          onActivate={() => setActivePage(index)}
        />
      ))}

      <button
        type="button"
        aria-label={`Show ${frameworkPages[leftPage].title}`}
        className="framework-hit-zone framework-hit-zone-left"
        onClick={showPrevious}
      />
      <button
        type="button"
        aria-label={`Show ${frameworkPages[rightPage].title}`}
        className="framework-hit-zone framework-hit-zone-right"
        onClick={showNext}
      />
    </div>
  );
}

function getFrameworkPosition(index: number, activeIndex: number) {
  if (index === activeIndex) {
    return "active";
  }

  return (index - activeIndex + frameworkPages.length) % frameworkPages.length === 1
    ? "right"
    : "left";
}

function FrameworkPage({
  page,
  active,
  className,
  onActivate
}: {
  page: (typeof frameworkPages)[number];
  active: boolean;
  className: string;
  onActivate: () => void;
}) {
  return (
    <article
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onClick={onActivate}
      onFocus={onActivate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onActivate();
        }
      }}
      className={`framework-page absolute cursor-pointer overflow-hidden rounded-lg border bg-slate-950/[0.58] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl transition duration-500 hover:border-gold/55 hover:bg-slate-950/[0.68] focus:outline-none focus:ring-2 focus:ring-gold/70 sm:p-5 lg:p-6 ${
        active
          ? "is-active border-gold/65 bg-slate-950/[0.72] shadow-[0_34px_92px_rgba(0,0,0,0.52)]"
          : "border-white/[0.16]"
      } ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gold/12 blur-2xl" />
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-gold">
            Framework {page.number}
          </span>
          <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_16px_rgba(200,169,107,0.78)]" />
        </div>
        <h2 className="mt-3 font-display text-[1.05rem] leading-[1.04] text-white sm:mt-4 sm:text-[1.5rem] lg:text-[1.85rem]">
          {page.title}
        </h2>
        <p className="framework-page-copy mt-3 hidden text-xs font-semibold leading-5 text-slate-100 sm:block lg:text-[0.82rem] lg:leading-6">
          {page.text}
        </p>
        <FrameworkVisual type={page.visual} />
        <div className="mt-4 hidden gap-2 sm:grid">
          {page.items.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold/80" />
              <span className="text-[11px] font-extrabold text-slate-100 lg:text-xs">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function FrameworkVisual({ type }: { type: string }) {
  if (type === "roadmap") {
    return (
      <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.055] p-3">
        <div className="grid grid-cols-3 gap-2">
          {["Assess", "Align", "Adopt"].map((step, index) => (
            <div key={step} className="relative">
              <div className="h-1.5 rounded-full bg-gold/70" />
              <p className="mt-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-300">
                {step}
              </p>
              {index < 2 ? (
                <span className="absolute left-[58%] top-[3px] h-px w-[82%] bg-white/20" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "dora") {
    return (
      <div className="mt-5 grid grid-cols-[0.72fr_1fr] gap-3 rounded-lg border border-white/10 bg-white/[0.055] p-3">
        <svg aria-hidden="true" viewBox="0 0 72 72" className="h-16 w-16">
          <circle cx="36" cy="36" r="26" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
          <circle className="framework-ring" cx="36" cy="36" r="26" fill="none" stroke="#C8A96B" strokeLinecap="round" strokeWidth="6" pathLength="100" />
          <circle cx="36" cy="36" r="4" fill="#C8A96B" />
        </svg>
        <div className="grid content-center gap-2">
          <div className="h-1.5 rounded-full bg-gold/70" />
          <div className="h-1.5 w-4/5 rounded-full bg-white/24" />
          <div className="h-1.5 w-3/5 rounded-full bg-white/16" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.055] p-3">
      <svg aria-hidden="true" viewBox="0 0 180 72" className="h-16 w-full">
        <path d="M8 54 C38 44 44 26 72 32 C104 39 112 12 142 19 C158 22 166 17 174 10" fill="none" stroke="rgba(200,169,107,0.82)" strokeWidth="2" />
        <path d="M8 58 L174 58" stroke="rgba(255,255,255,0.18)" />
        {[20, 72, 112, 142, 174].map((point) => (
          <circle key={point} cx={point} cy={point === 174 ? 10 : point === 142 ? 19 : point === 112 ? 19 : point === 72 ? 32 : 50} r="3" fill="#C8A96B" />
        ))}
      </svg>
    </div>
  );
}

function HeroNetworkOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="heroLine" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#C8A96B" stopOpacity="0" />
          <stop offset="0.5" stopColor="#C8A96B" stopOpacity="0.64" />
          <stop offset="1" stopColor="#F8FAFC" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#heroLine)" strokeWidth="1.1">
        <path className="ai-network-line" d="M650 190 C820 255 910 290 1110 230 C1230 195 1320 140 1450 120" />
        <path className="ai-network-line" d="M540 430 C720 350 820 475 970 390 C1120 305 1280 330 1460 250" />
        <path className="ai-network-line" d="M620 620 C780 492 960 610 1080 520 C1210 420 1320 470 1460 410" />
      </g>
      <g fill="#C8A96B" fillOpacity="0.78">
        <circle className="ai-node" cx="790" cy="245" r="3.8" />
        <circle className="ai-node" cx="990" cy="266" r="3.5" />
        <circle className="ai-node" cx="1198" cy="202" r="4" />
        <circle className="ai-node" cx="850" cy="438" r="3.8" />
        <circle className="ai-node" cx="1080" cy="520" r="4.2" />
        <circle className="ai-node" cx="1270" cy="438" r="3.6" />
      </g>
    </svg>
  );
}
