import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { FeaturedInsights } from "@/components/sections/FeaturedInsights";
import { HeroSection } from "@/components/sections/HeroSection";
import { IndustrySection } from "@/components/sections/IndustrySection";
import { WhyWorkWithMe } from "@/components/sections/WhyWorkWithMe";
import { getHomeContent } from "@/lib/cms";

export default async function HomePage() {
  const { home, industries, insights } = await getHomeContent();

  return (
    <>
      <HeroSection content={home.hero} trustItems={home.trust} />
      <IndustrySection industries={industries} />
      <WhyWorkWithMe items={home.whyWork} />
      <FeaturedInsights insights={insights} />
      <ConsultationCTA content={home.consultation} />
    </>
  );
}
