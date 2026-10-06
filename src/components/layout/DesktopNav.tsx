"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { type NavItem } from "@/content/navigation";
import { serviceTaxonomyGroups } from "@/content/services";
import styles from "./DesktopNav.module.css";

interface DesktopNavProps {
  items: NavItem[];
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function DesktopNav({ items }: DesktopNavProps) {
  const pathname = usePathname();
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

  // Separate Group A (Core Engineering Systems) and Group B + C (Support & Supplies)
  const coreEngineeringGroup = serviceTaxonomyGroups[0];
  const supportGroups = serviceTaxonomyGroups.slice(1);
  const allSupportServices = supportGroups.flatMap((g) => g.services);

  return (
    <nav
      ref={wrapRef}
      className={styles.nav}
      aria-label="Primary"
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
                          <span className={styles.columnTitle}>ENGINEERING DISCIPLINES</span>
                          <span className={styles.columnCode}>GROUP A</span>
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

                      {/* Column 2: Vessel Support, Maintenance & Supplies */}
                      <div className={styles.sectionCol}>
                        <div className={styles.columnHeader}>
                          <span className={styles.columnTitle}>MAINTENANCE &amp; VESSEL SUPPORT</span>
                          <span className={styles.columnCode}>GROUP B &amp; C</span>
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
                          <span className={styles.featuredKicker}>TECHNICAL INTAKE</span>
                          <h3 className={styles.featuredTitle}>
                            DIRECT ENGINEERING MOBILIZATION
                          </h3>
                          <p className={styles.featuredDesc}>
                            Submit vessel machinery parameters, fault symptoms, and port schedule for immediate engineering triage.
                          </p>
                        </div>

                        <Link
                          href="/contact/technical-support"
                          className={styles.featuredBtn}
                        >
                          <span>REQUEST TECHNICAL SUPPORT</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>

                    {/* Bottom Utility Bar */}
                    <div className={styles.panelFooter}>
                      <Link href="/services" className={styles.allServicesLink}>
                        <span>Browse Full Services Catalog &amp; Scopes</span>
                        <span aria-hidden="true">→</span>
                      </Link>

                      <div className={styles.panelStatus}>
                        <span className={styles.statusDot} aria-hidden="true" />
                        <span>24/7 ACTIVE DISPATCH ACROSS ALL PORTS</span>
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
