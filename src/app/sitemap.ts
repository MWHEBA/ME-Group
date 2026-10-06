import type { MetadataRoute } from "next";
import { serviceGroups, serviceHref } from "@/content/services";
import { getPrimaryNav, isVisible, siteUrl } from "@/lib/site";

/** Built from confirmed content and enabled feature flags only. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/"]);
  getPrimaryNav().forEach((item) => paths.add(item.href));
  [
    "/contact/technical-support",
    "/company/about",
    "/company/approach",
    "/company/quality-safety",
  ].forEach((p) => paths.add(p));
  serviceGroups
    .filter(isVisible)
    .forEach((g) =>
      g.services.filter(isVisible).forEach((s) => paths.add(serviceHref(g, s))),
    );
  return [...paths].map((p) => ({ url: `${siteUrl}${p}` }));
}
