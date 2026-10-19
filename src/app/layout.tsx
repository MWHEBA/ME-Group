import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileSupportBar } from "@/components/layout/MobileSupportBar";
import { company } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { isIndexable, siteUrl } from "@/lib/site";
import { LocaleSync } from "@/components/layout/LocaleSync";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — ${company.fullName}`,
    template: `%s | ${company.name}`,
  },
  description: `${company.descriptor} ${company.description}`,
  alternates: {
    canonical: "./",
    languages: {
      en: "/",
      ar: "/ar",
    },
  },
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    title: `${company.name} — ${company.fullName}`,
    description: `${company.descriptor} ${company.description}`,
    url: siteUrl,
    siteName: company.fullName,
    images: [
      {
        url: "/brand/me-group-logo-horizontal.png",
        width: 1200,
        height: 630,
        alt: `${company.name} — ${company.fullName}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — ${company.fullName}`,
    description: `${company.descriptor} ${company.description}`,
    images: ["/brand/me-group-logo-horizontal.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Verified Organization JSON-LD (strictly confirmed facts only)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    legalName: company.fullName,
    url: siteUrl,
    logo: `${siteUrl}/brand/me-group-logo-horizontal.png`,
    description: company.description,
  };

  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if(typeof window!=='undefined'&&(window.location.pathname==='/ar'||window.location.pathname.startsWith('/ar/'))){document.documentElement.lang='ar';document.documentElement.dir='rtl';}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LocaleSync />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <MobileSupportBar />
      </body>
    </html>
  );
}
