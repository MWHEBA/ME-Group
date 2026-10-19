"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ctas, support } from "@/content/site";
import { ctasAr } from "@/content/ar/site";
import styles from "./MobileSupportBar.module.css";

/**
 * Sticky support entry for mobile/tablet with confirmed WhatsApp quick dispatch
 * and technical support request link.
 */
export function MobileSupportBar() {
  const pathname = usePathname() || "/";
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const cta = isArabic ? ctasAr.technicalSupport : ctas.technicalSupport;

  return (
    <nav className={styles.bar} aria-label={isArabic ? "الدعم الفني السريع" : "Support"}>
      {support.whatsapp && (
        <a
          href={support.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.rapid}
          aria-label={isArabic ? "إرسال بلاغ فني عبر واتساب" : "Direct WhatsApp Dispatch"}
        >
          <span>{isArabic ? "واتساب ↗" : "WhatsApp ↗"}</span>
        </a>
      )}
      <Link href={cta.href} className={styles.request}>
        <span>{cta.label}</span>
      </Link>
    </nav>
  );
}
