"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import { CORE_SYSTEMS, SystemCategory } from "@/content/home";
import styles from "./CoreSystemsSection.module.css";

export function CoreSystemsSection() {
  const [activeSystemId, setActiveSystemId] = useState<string>(CORE_SYSTEMS[0].id);

  const activeSystem =
    CORE_SYSTEMS.find((sys) => sys.id === activeSystemId) || CORE_SYSTEMS[0];

  return (
    <section
      className={styles.systemsSection}
      id="core-systems"
      aria-label="Core Engineering Systems"
    >
      <Container>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.kicker}>SYS / CAPABILITIES</span>
            <h2 className={styles.sectionTitle}>CORE ENGINEERING SYSTEMS</h2>
          </div>
          <p className={styles.headerDescription}>
            Dedicated technical teams equipped for troubleshooting, overhaul, and commissioning across primary vessel operating systems.
          </p>
        </div>

        {/* Interactive Desktop / Responsive Layout */}
        <div className={styles.splitLayout}>
          {/* Left: System Navigation List */}
          <div className={styles.systemsNav} role="tablist" aria-label="System selector">
            {CORE_SYSTEMS.map((system: SystemCategory) => {
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
                      {isActive ? "ACTIVE SELECTION" : "EXPLORE"}
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
                <span className={styles.listLabel}>CONFIRMED TECHNICAL SCOPE:</span>
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
                  <span>EXPLORE</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href={`/contact/technical-support?system=${activeSystem.id}`}
                  className={styles.secondaryLink}
                >
                  REQUEST SYSTEM SUPPORT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
