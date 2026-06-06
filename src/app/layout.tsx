import type { Metadata } from "next";
import { AIAssistantWidget } from "@/components/ai/AIAssistantWidget";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { currentUser } from "@/lib/auth/session";
import { getNavigation, getSiteConfig } from "@/lib/cms";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://advisory-site.example"),
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
  const [navigation, site, user] = await Promise.all([
    getNavigation(),
    getSiteConfig(),
    currentUser()
  ]);

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar
          bookingHref="/#schedule-consultation"
          navigation={navigation}
          siteName={site.shortName}
          user={user}
        />
        <main>{children}</main>
        <AIAssistantWidget fixed />
        <Footer navigation={navigation} site={site} />
      </body>
    </html>
  );
}
