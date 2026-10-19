"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/primitives/Button";
import { ctas } from "@/content/site";
import { ctasAr } from "@/content/ar/site";
import { intentEntry, type NavItem } from "@/content/navigation";
import { serviceGroups, serviceHref } from "@/content/services";
import { serviceTaxonomyGroupsAR } from "@/content/ar/services";
import { isVisible } from "@/lib/site";
import styles from "./MobileNav.module.css";

interface MobileNavProps {
  items: NavItem[];
}

/**
 * Mobile/tablet navigation in a native modal <dialog>: the browser provides
 * the focus trap, Escape-to-close, inert background and focus return to the
 * menu button.
 */
export function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname() || "/";
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const cta = isArabic ? ctasAr.technicalSupport : ctas.technicalSupport;

  const currentServiceGroups = isArabic ? serviceTaxonomyGroupsAR : serviceGroups;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [expanded, setExpanded] = useState(false);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setExpanded(true);
  };
  const closeMenu = () => dialogRef.current?.close();

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.menuButton}
        aria-haspopup="dialog"
        aria-expanded={expanded}
        onClick={openMenu}
      >
        {isArabic ? "القائمة" : "Menu"}
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={isArabic ? "القائمة الرئيسية" : "Main menu"}
        onClose={() => setExpanded(false)}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) closeMenu();
        }}
      >
        <div className={styles.top}>
          <Logo variant="horizontal" />
          <button
            type="button"
            className={styles.menuButton}
            onClick={closeMenu}
            autoFocus
          >
            {isArabic ? "إغلاق" : "Close"}
          </button>
        </div>

        <nav aria-label={isArabic ? "القائمة الرئيسية للجوال" : "Primary mobile"} className={styles.nav}>
          <ul>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                {item.mega ? (
                  <details className={styles.details}>
                    <summary className={styles.summary}>{item.label}</summary>
                    <div className={styles.groups}>
                      {currentServiceGroups.filter(isVisible).map((group) => (
                        <div key={group.slug}>
                          <p className={styles.groupTitle}>{group.title}</p>
                          <ul>
                            {group.services.filter(isVisible).map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={isArabic ? service.href : serviceHref(group, service)}
                                  className={styles.subLink}
                                >
                                  {service.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <Link href={isArabic ? "/ar/services" : "/services"} className={styles.subLink}>
                        {isArabic ? "جميع الخدمات والحلول الهندسية" : "All services"}
                      </Link>
                      <Link
                        href={isArabic ? "/ar/contact/technical-support" : intentEntry.href}
                        className={styles.subLink}
                      >
                        {isArabic ? "ما الذي تحتاجه سفينتك الآن؟" : intentEntry.label}
                      </Link>
                    </div>
                  </details>
                ) : (
                  <Link href={item.href} className={styles.summary}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href={cta.href} size="lg">
            {cta.label}
          </Button>
        </div>
      </dialog>
    </div>
  );
}
