import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPage } from "@/components/sections/AboutPage";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { ContactPage } from "@/components/sections/ContactPage";
import { ContentPage } from "@/components/sections/ContentPage";
import { InsightsPage } from "@/components/sections/InsightsPage";
import { ServicesPage } from "@/components/sections/ServicesPage";
import { insights, services } from "@/content/site";
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
      ) : (
        <ContentPage page={page} />
      )}
      {page.cta ? <ConsultationCTA content={page.cta} compact /> : null}
    </>
  );
}
