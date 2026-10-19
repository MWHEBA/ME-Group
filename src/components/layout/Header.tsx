"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/primitives/Button";
import { ctas } from "@/content/site";
import { ctasAr } from "@/content/ar/site";
import { getPrimaryNav } from "@/lib/site";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname() || "/";
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const items = getPrimaryNav(isArabic ? "ar" : "en");
  const isHomePage = pathname === "/" || pathname === "/ar" || pathname === "/ar/";
  const [scrolled, setScrolled] = useState(false);

  const cta = isArabic ? ctasAr.technicalSupport : ctas.technicalSupport;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHomePage && !scrolled;

  return (
    <header
      className={`${styles.header} ${
        isTransparent ? styles.headerTransparent : styles.headerSolid
      } ${isHomePage ? styles.headerFixed : ""}`}
    >
      <div className={styles.inner}>
        <Logo scrolled={scrolled} isHomePage={isHomePage} />
        <DesktopNav items={items} />
        <div className={styles.actions}>
          <LanguageSwitcher />
          <Button href={cta.href}>
            {cta.label}
          </Button>
        </div>
        <div className={styles.mobileRight}>
          <LanguageSwitcher />
          <MobileNav items={items} />
        </div>
      </div>
    </header>
  );
}
