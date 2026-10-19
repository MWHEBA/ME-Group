import { features } from "@/content/site";
import { primaryNav, type NavItem } from "@/content/navigation";
import { primaryNavAr } from "@/content/ar/navigation";

export const isProduction = process.env.NODE_ENV === "production";

/** Production shows only confirmed content; development also shows the rest. */
export function isVisible(item: {
  status: string;
  feature?: keyof typeof features;
}) {
  if (item.feature && !features[item.feature]) return false;
  return !isProduction || item.status === "confirmed";
}

export function getPrimaryNav(locale: "en" | "ar" = "en"): NavItem[] {
  const items = locale === "ar" ? primaryNavAr : primaryNav;
  return items.filter(isVisible);
}

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Indexing is only enabled when explicitly set for the live production host. */
export const isIndexable = process.env.NEXT_PUBLIC_SITE_ENV === "production";
