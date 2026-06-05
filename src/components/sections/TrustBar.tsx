"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";

type TrustBarProps = {
  items: string[];
  variant?: "default" | "hero";
};

export function TrustBar({ items, variant = "default" }: TrustBarProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const grid = (
    <div
      ref={ref}
      className={
        variant === "hero"
          ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4"
          : "grid gap-3 border-b border-slate-200 py-6 sm:grid-cols-2 lg:grid-cols-6"
      }
    >
      {items.map((item) => (
        <div
          key={item}
          className={
            variant === "hero"
              ? "group flex items-center gap-3 rounded-lg border border-white/[0.16] bg-white/[0.105] px-4 py-3.5 text-white shadow-[0_18px_48px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-gold/70 hover:bg-white/[0.17] hover:shadow-[0_22px_58px_rgba(0,0,0,0.24)]"
              : "group flex items-center gap-3 rounded-lg border border-slate-200 bg-porcelain px-4 py-3 transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:bg-white hover:shadow-card"
          }
        >
          <Icon name="CheckCircle2" className="h-4 w-4 shrink-0 text-gold" />
          <TrustLabel item={item} visible={visible} variant={variant} />
        </div>
      ))}
    </div>
  );

  if (variant === "hero") {
    return <div className="animate-fadeUp" style={{ animationDelay: "260ms" }}>{grid}</div>;
  }

  return (
    <section className="bg-white">
      <div className="container-shell">{grid}</div>
    </section>
  );
}

function TrustLabel({
  item,
  visible,
  variant
}: {
  item: string;
  visible: boolean;
  variant: "default" | "hero";
}) {
  const textClass =
    variant === "hero"
      ? "text-[15px] font-extrabold leading-5 text-white"
      : "text-[15px] font-extrabold leading-5 text-navy";

  if (!item.startsWith("25+")) {
    return <span className={textClass}>{item}</span>;
  }

  return (
    <span className={textClass} aria-label={item}>
      <AnimatedNumber value={25} active={visible} />
      <span>+ Years Experience</span>
    </span>
  );
}

function AnimatedNumber({ value, active }: { value: number; active: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    let frame = 0;
    const totalFrames = 92;
    let animationFrame = 0;

    const tick = () => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCurrent(Math.min(value, Math.round(value * progress)));

      if (frame < totalFrames) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [active, value]);

  return <span>{current}</span>;
}
