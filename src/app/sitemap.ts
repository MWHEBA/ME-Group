import type { MetadataRoute } from "next";
import { serviceGroups, serviceHref } from "@/content/services";
import { getPrimaryNav, isVisible, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** Built from confirmed content and enabled feature flags with bilingual hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const englishPaths = new Set<string>(["/"]);
  getPrimaryNav("en").forEach((item) => englishPaths.add(item.href));
  [
    "/contact/technical-support",
    "/contact/rapid-support",
    "/contact/spare-parts",
    "/company/about",
    "/company/approach",
    "/company/quality-safety",
  ].forEach((p) => englishPaths.add(p));

  serviceGroups
    .filter(isVisible)
    .forEach((g) =>
      g.services.filter(isVisible).forEach((s) => englishPaths.add(serviceHref(g, s))),
    );

  const sitemapEntries: MetadataRoute.Sitemap = [];

  englishPaths.forEach((path) => {
    const enUrl = `${siteUrl}${path}`;
    const arPath = path === "/" ? "/ar" : `/ar${path}`;
    const arUrl = `${siteUrl}${arPath}`;

    // English entry with Arabic alternate
    sitemapEntries.push({
      url: enUrl,
      lastModified: new Date(),
      changeFrequency: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 1.0 : 0.8,
      alternates: {
        languages: {
          en: enUrl,
          ar: arUrl,
        },
      },
    });

    // Arabic entry with English alternate
    sitemapEntries.push({
      url: arUrl,
      lastModified: new Date(),
      changeFrequency: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 1.0 : 0.8,
      alternates: {
        languages: {
          en: enUrl,
          ar: arUrl,
        },
      },
    });
  });

  return sitemapEntries;
}
