import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPage } from "@/components/sections/AboutPage";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { ContactPage } from "@/components/sections/ContactPage";
import { ContentPage } from "@/components/sections/ContentPage";
import { IndustryDetailPage } from "@/components/sections/IndustryDetailPage";
import { InsightDetailPage } from "@/components/sections/InsightDetailPage";
import { InsightsPage } from "@/components/sections/InsightsPage";
import { IndustriesPage } from "@/components/sections/IndustriesPage";
import { ServicesPage } from "@/components/sections/ServicesPage";
import { industries, insights, services } from "@/content/site";
import { getAllRoutePages, getRoutePage, getSiteConfig } from "@/lib/cms";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  const pages = await getAllRoutePages();

  return pages.map((page) => ({
    slug: page.slug.split("/")
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getRoutePage(slug.join("/"));
  const site = await getSiteConfig();

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    keywords: [...page.keywords, ...site.seoKeywords],
    openGraph: {
      title: `${page.title} | ${site.name}`,
      description: page.description
    }
  };
}

export default async function RoutePage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getRoutePage(slug.join("/"));
  const site = await getSiteConfig();

  if (!page) {
    notFound();
  }

  const industry = page.slug.startsWith("industries/")
    ? industries.find((item) => `industries/${item.slug}` === page.slug)
    : undefined;
  const insight = page.slug.startsWith("insights/")
    ? insights.find((item) => `insights/${item.slug}` === page.slug)
    : undefined;

  return (
    <>
      {page.slug === "about" ? (
        <AboutPage page={page} />
      ) : page.slug === "services" ? (
        <ServicesPage services={services} />
      ) : page.slug === "contact" ? (
        <ContactPage page={page} site={site} />
      ) : page.slug === "insights" ? (
        <InsightsPage page={page} insights={insights} />
      ) : page.slug === "industries" ? (
        <IndustriesPage page={page} industries={industries} />
      ) : industry ? (
        <IndustryDetailPage page={page} industry={industry} services={services} />
      ) : insight ? (
        <InsightDetailPage page={page} insight={insight} />
      ) : (
        <ContentPage page={page} />
      )}
      {page.cta ? <ConsultationCTA content={page.cta} compact /> : null}
    </>
  );
}
