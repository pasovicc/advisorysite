import {
  homeContent,
  industries,
  insights,
  navigation,
  routePages,
  services,
  siteConfig
} from "@/content/site";

export async function getSiteConfig() {
  return siteConfig;
}

export async function getNavigation() {
  return navigation;
}

export async function getHomeContent() {
  return {
    home: homeContent,
    services,
    industries,
    insights
  };
}

export async function getRoutePage(slug: string) {
  return routePages.find((page) => page.slug === slug) || null;
}

export async function getAllRoutePages() {
  return routePages;
}

export const cmsReadinessNotes = {
  provider: "local-content-first",
  sanityReady:
    "Replace these functions with Sanity queries while keeping the component props unchanged."
};
