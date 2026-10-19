import type { Metadata } from "next";
import { companyAr } from "@/content/ar/site";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${companyAr.fullName} — ${companyAr.name}`,
    template: `%s | ${companyAr.name}`,
  },
  description: `${companyAr.descriptor} ${companyAr.description}`,
  alternates: {
    canonical: "/ar/",
    languages: {
      en: "/",
      ar: "/ar/",
    },
  },
  openGraph: {
    title: `${companyAr.fullName} — ${companyAr.name}`,
    description: `${companyAr.descriptor} ${companyAr.description}`,
    url: `${siteUrl}/ar/`,
    siteName: companyAr.fullName,
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${companyAr.fullName} — ${companyAr.name}`,
    description: `${companyAr.descriptor} ${companyAr.description}`,
  },
};

export default function ArabicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div dir="rtl" lang="ar" className="arabic-scope">
      {children}
    </div>
  );
}
