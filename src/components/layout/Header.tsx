"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/primitives/Button";
import { ctas } from "@/content/site";
import { getPrimaryNav } from "@/lib/site";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import styles from "./Header.module.css";

export function Header() {
  const items = getPrimaryNav();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

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
          <Button href={ctas.technicalSupport.href}>
            {ctas.technicalSupport.label}
          </Button>
        </div>
        <MobileNav items={items} />
      </div>
    </header>
  );
}
