import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** Everything is disallowed unless NEXT_PUBLIC_SITE_ENV=production. */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/lab"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

