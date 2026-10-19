"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { type NavItem } from "@/content/navigation";
import { serviceTaxonomyGroups } from "@/content/services";
import { serviceTaxonomyGroupsAR } from "@/content/ar/services";
import styles from "./DesktopNav.module.css";

interface DesktopNavProps {
  items: NavItem[];
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function DesktopNav({ items }: DesktopNavProps) {
  const pathname = usePathname() || "/";
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const panelId = useId();
  const wrapRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpenOn(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Separate Group A (Core Engineering Systems) and Group B, C, D (Support, Supplies & Bridge)
  const currentTaxonomy = isArabic ? serviceTaxonomyGroupsAR : serviceTaxonomyGroups;
  const coreEngineeringGroup = currentTaxonomy[0];
  const supportGroups = currentTaxonomy.slice(1);
  const allSupportServices = supportGroups.flatMap((g) => g.services);

  return (
    <nav
      ref={wrapRef}
      className={styles.nav}
      aria-label={isArabic ? "القائمة الرئيسية" : "Primary"}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpenOn(null);
          buttonRef.current?.focus();
        }
      }}
    >
      <ul className={styles.list}>
        {items.map((item) => (
          <li
            key={item.id}
            onBlur={
              item.mega
                ? (e) => {
                    if (
                      open &&
                      !e.currentTarget.contains(e.relatedTarget as Node | null)
                    ) {
                      setOpenOn(null);
                    }
                  }
                : undefined
            }
          >
            {item.mega ? (
              <>
                <button
                  ref={buttonRef}
                  type="button"
                  className={styles.link}
                  aria-expanded={open}
                  aria-controls={panelId}
                  aria-current={
                    isActive(pathname, item.href) ? "true" : undefined
                  }
                  onClick={() => setOpenOn(open ? null : pathname)}
                >
                  {item.label}
                  <span className={styles.chevron} aria-hidden="true" />
                </button>

                {/* High-End Structured Mega Menu Cockpit */}
                <div id={panelId} className={styles.panel} hidden={!open}>
                  <div className={styles.panelInner}>
                    <div className={styles.cockpitGrid}>
                      {/* Column 1: Core Shipboard Engineering Disciplines */}
                      <div className={styles.sectionCol}>
                        <div className={styles.columnHeader}>
                          <span className={styles.columnTitle}>
                            {isArabic ? "منظومات الهندسة البحرية" : "ENGINEERING DISCIPLINES"}
                          </span>
                          <span className={styles.columnCode}>
                            {isArabic ? "المجموعة أ" : "GROUP A"}
                          </span>
                        </div>
                        <div className={styles.cardsList}>
                          {coreEngineeringGroup.services.map((service) => (
                            <Link
                              key={service.slug}
                              href={service.href}
                              className={styles.serviceCard}
                            >
                              <span className={styles.numberBadge}>
                                {service.number}
                              </span>
                              <div className={styles.cardContent}>
                                <span className={styles.serviceTitle}>
                                  {service.title}
                                </span>
                                <p className={styles.serviceSummary}>
                                  {service.summary}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Vessel Support, Maintenance & Communications */}
                      <div className={styles.sectionCol}>
                        <div className={styles.columnHeader}>
                          <span className={styles.columnTitle}>
                            {isArabic ? "الصيانة والتجهيز والملاحة" : "MAINTENANCE, SUPPLIES & BRIDGE"}
                          </span>
                          <span className={styles.columnCode}>
                            {isArabic ? "المجموعات ب، ج، د" : "GROUP B, C & D"}
                          </span>
                        </div>
                        <div className={styles.cardsList}>
                          {allSupportServices.map((service) => (
                            <Link
                              key={service.slug}
                              href={service.href}
                              className={styles.serviceCard}
                            >
                              <span className={styles.numberBadge}>
                                {service.number}
                              </span>
                              <div className={styles.cardContent}>
                                <span className={styles.serviceTitle}>
                                  {service.title}
                                </span>
                                <p className={styles.serviceSummary}>
                                  {service.summary}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 3: Featured Technical Support Intake Card */}
                      <div className={styles.featuredCard}>
                        <div className={styles.featuredTop}>
                          <span className={styles.featuredKicker}>
                            {isArabic ? "الفرز والاستقبال الهندسي" : "TECHNICAL INTAKE"}
                          </span>
                          <h3 className={styles.featuredTitle}>
                            {isArabic ? "تحرك هندسي بحري مباشر" : "DIRECT ENGINEERING MOBILIZATION"}
                          </h3>
                          <p className={styles.featuredDesc}>
                            {isArabic
                              ? "أدخل بيانات آلات السفينة، والأعراض المرصودة، ومواعيد التراكي للفرز الفني والتشخيص الفوري."
                              : "Submit vessel machinery parameters, fault symptoms, and port schedule for immediate engineering triage."}
                          </p>
                        </div>

                        <Link
                          href={isArabic ? "/ar/contact/technical-support" : "/contact/technical-support"}
                          className={styles.featuredBtn}
                        >
                          <span>{isArabic ? "طلب دعم فني فوري" : "REQUEST TECHNICAL SUPPORT"}</span>
                          <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
                        </Link>
                      </div>
                    </div>

                    {/* Bottom Utility Bar */}
                    <div className={styles.panelFooter}>
                      <Link
                        href={isArabic ? "/ar/services" : "/services"}
                        className={styles.allServicesLink}
                      >
                        <span>
                          {isArabic
                            ? "استعراض دليل الخدمات والحلول بالكامل"
                            : "Browse Full Services Catalog & Scopes"}
                        </span>
                        <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
                      </Link>

                      <div className={styles.panelStatus}>
                        <span className={styles.statusDot} aria-hidden="true" />
                        <span>
                          {isArabic
                            ? "استقبال وفرز تشغيلي 24/7 في كافة الموانئ المصرية"
                            : "24/7 ACTIVE DISPATCH ACROSS ALL PORTS"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Link
                href={item.href}
                className={styles.link}
                aria-current={
                  isActive(pathname, item.href) ? "page" : undefined
                }
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
