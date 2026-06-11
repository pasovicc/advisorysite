import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { getHomeContent } from "@/lib/cms";

const inquiryTypes = ["Consulting", "Workshops", "Speaking", "Advisory"];

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: "Book an executive consultation for transformation, AI governance or project leadership."
};

export default async function BookPage() {
  const { home } = await getHomeContent();

  return (
    <>
      <ConsultationCTA content={home.consultation} />
      <InquiryTypeSection />
    </>
  );
}

function InquiryTypeSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-shell">
        <Reveal>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-premium md:p-8">
            <div className="flex flex-col gap-6 border-b border-slate-200 pb-7 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                  Inquiry Type
                </p>
                <h2 className="font-display text-4xl leading-[1.04] text-navy">
                  What should the conversation cover?
                </h2>
              </div>
              <Link
                href="#schedule-consultation"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-navy bg-navy px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <Icon name="Calendar" className="h-4 w-4" />
                Book a Consultation
              </Link>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {inquiryTypes.map((type) => (
                <div key={type} className="rounded-lg border border-slate-200 bg-porcelain p-5">
                  <Icon name="CheckCircle2" className="mb-4 h-4 w-4 text-gold" />
                  <h3 className="font-display text-2xl leading-[1.08] text-navy">{type}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
                    Share the context, timeline and decision you need to support.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
