"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./LanguageSwitcher.module.css";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const pathname = usePathname() || "/";
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");

  // Determine target URL
  let targetUrl: string;
  if (isArabic) {
    targetUrl = pathname.replace(/^\/ar(\/|$)/, "/") || "/";
    if (!targetUrl.startsWith("/")) targetUrl = `/${targetUrl}`;
  } else {
    targetUrl = pathname === "/" ? "/ar" : `/ar${pathname}`;
  }

  return (
    <Link
      href={targetUrl}
      className={`${styles.switcher} ${className || ""}`}
      aria-label={isArabic ? "Switch to English version" : "التبديل إلى النسخة العربية"}
      lang={isArabic ? "en" : "ar"}
      dir={isArabic ? "ltr" : "rtl"}
    >
      <span className={styles.globeIcon} aria-hidden="true">
        🌐
      </span>
      <span className={styles.label}>{isArabic ? "English" : "عربي"}</span>
    </Link>
  );
}
