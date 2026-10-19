"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LocaleSync() {
  const pathname = usePathname();
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");

  useEffect(() => {
    if (isArabic) {
      document.documentElement.lang = "ar";
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    }
  }, [isArabic]);

  return null;
}
