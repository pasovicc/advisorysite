import type { Metadata } from "next";
import { AIAssistantWidget } from "@/components/ai/AIAssistantWidget";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getNavigation, getSiteConfig } from "@/lib/cms";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();

  return {
    metadataBase: new URL("https://jasna-advisory.example"),
    title: {
      default: `${site.name} | ${site.tagline}`,
      template: `%s | ${site.name}`
    },
    description: site.description,
    keywords: site.seoKeywords,
    openGraph: {
      title: `${site.name} | ${site.tagline}`,
      description: site.description,
      type: "website",
      images: [
        {
          url: "/images/hero-ai-boardroom.png",
          width: 1400,
          height: 1000,
          alt: "Abstract executive consulting visual for AI, governance and project leadership"
        }
      ]
    }
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navigation, site] = await Promise.all([getNavigation(), getSiteConfig()]);

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar navigation={navigation} siteName={site.shortName} bookingHref="/#schedule-consultation" />
        <main>{children}</main>
        <AIAssistantWidget fixed />
        <Footer navigation={navigation} site={site} />
      </body>
    </html>
  );
}
