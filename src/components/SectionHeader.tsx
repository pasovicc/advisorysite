type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, text, align = "left" }: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-4xl leading-[1.05] text-navy md:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-base leading-8 text-graphite md:text-lg">{text}</p> : null}
    </div>
  );
}
