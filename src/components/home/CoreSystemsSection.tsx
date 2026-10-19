"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import { CORE_SYSTEMS, SystemCategory } from "@/content/home";
import { CORE_SYSTEMS_AR } from "@/content/ar/home";
import styles from "./CoreSystemsSection.module.css";

interface CoreSystemsSectionProps {
  locale?: "en" | "ar";
}

export function CoreSystemsSection({ locale = "en" }: CoreSystemsSectionProps) {
  const isArabic = locale === "ar";
  const systems = isArabic ? CORE_SYSTEMS_AR : CORE_SYSTEMS;

  const [activeSystemId, setActiveSystemId] = useState<string>(systems[0].id);

  const activeSystem =
    systems.find((sys) => sys.id === activeSystemId) || systems[0];

  return (
    <section
      className={styles.systemsSection}
      id="core-systems"
      aria-label={isArabic ? "الأنظمة الهندسية الأساسية" : "Core Engineering Systems"}
    >
      <Container>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.kicker}>
              {isArabic ? "SYS / القدرات والأنظمة" : "SYS / CAPABILITIES"}
            </span>
            <h2 className={styles.sectionTitle}>
              {isArabic ? "الأنظمة الهندسية الأساسية" : "CORE ENGINEERING SYSTEMS"}
            </h2>
          </div>
          <p className={styles.headerDescription}>
            {isArabic
              ? "فرق فنية هندسية متخصصة ومجهزة لأعمال الفحص والعمرة الشاملة والاختبار والتكليف عبر الأنظمة الرئيسية المشغلة للسفينة."
              : "Dedicated technical teams equipped for troubleshooting, overhaul, and commissioning across primary vessel operating systems."}
          </p>
        </div>

        {/* Interactive Desktop / Responsive Layout */}
        <div className={styles.splitLayout}>
          {/* Left: System Navigation List */}
          <div
            className={styles.systemsNav}
            role="tablist"
            aria-label={isArabic ? "محدد الأنظمة" : "System selector"}
          >
            {systems.map((system: SystemCategory) => {
              const isActive = system.id === activeSystemId;
              return (
                <button
                  key={system.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${system.id}`}
                  id={`tab-${system.id}`}
                  className={`${styles.systemTab} ${isActive ? styles.tabActive : ""}`}
                  onClick={() => setActiveSystemId(system.id)}
                >
                  <div className={styles.tabHeader}>
                    <span className={styles.tabCode}>{system.code}</span>
                    <span className={styles.tabStatus} aria-hidden="true">
                      {isActive
                        ? isArabic ? "اختيار حالي" : "ACTIVE SELECTION"
                        : isArabic ? "استعراض" : "EXPLORE"}
                    </span>
                  </div>
                  <h3 className={styles.tabTitle}>{system.title}</h3>
                  <p className={styles.tabTagline}>{system.tagline}</p>
                </button>
              );
            })}
          </div>

          {/* Right: Active System Detail Panel */}
          <div
            className={styles.detailPanel}
            id={`panel-${activeSystem.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeSystem.id}`}
          >
            {/* Visual Media Header */}
            <div className={styles.mediaContainer}>
              <div className={styles.imageWrapper}>
                <Image
                  src={activeSystem.imageSrc}
                  alt={activeSystem.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={styles.systemImage}
                />
              </div>
              <div className={styles.mediaFrameOverlay} aria-hidden="true">
                <span className={styles.cornerTL} />
                <span className={styles.cornerTR} />
                <span className={styles.mediaTag}>{activeSystem.code}</span>
              </div>
            </div>

            {/* System Details */}
            <div className={styles.panelContent}>
              <div className={styles.panelMeta}>
                <span className={styles.panelKicker}>{activeSystem.tagline}</span>
                <h3 className={styles.panelHeading}>{activeSystem.title}</h3>
              </div>

              <p className={styles.panelDescription}>{activeSystem.description}</p>

              <div className={styles.capabilitiesList}>
                <span className={styles.listLabel}>
                  {isArabic ? "النطاق الفني المعتمد:" : "CONFIRMED TECHNICAL SCOPE:"}
                </span>
                <ul className={styles.itemsGrid}>
                  {activeSystem.items.map((item, idx) => (
                    <li key={idx} className={styles.scopeItem}>
                      <span className={styles.itemBullet} aria-hidden="true">■</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.panelActions}>
                <Link href={activeSystem.href} className={styles.primaryLink}>
                  <span>{isArabic ? "استعراض التفاصيل" : "EXPLORE"}</span>
                  <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
                </Link>
                <Link
                  href={
                    isArabic
                      ? `/ar/contact/technical-support?system=${activeSystem.id}`
                      : `/contact/technical-support?system=${activeSystem.id}`
                  }
                  className={styles.secondaryLink}
                >
                  {isArabic ? "طلب دعم فني للنظام" : "REQUEST SYSTEM SUPPORT"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
