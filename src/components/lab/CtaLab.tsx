"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./CtaLab.module.css";

type CtaSurface = "light" | "dark" | "photo" | "machinery";

export function CtaLab() {
  const [activeSurface, setActiveSurface] = useState<CtaSurface>("light");

  return (
    <section id="cta-system" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.sectionTag}>SPECIMEN 05 // OPERATIONAL CTA SYSTEM</div>
        <h2 className={styles.title}>4-Tier Action Hierarchy Across Operational Surfaces</h2>
        <p className={styles.description}>
          The CTA system is strictly operational rather than marketing-heavy. It provides immediate clarity for technical superintendents, vessel masters, and fleet procurement managers under time pressure.
        </p>
      </div>

      {/* Surface Selector */}
      <div className={styles.surfaceSelector}>
        <span className={styles.selectorLabel}>TEST ENVIRONMENT SURFACE:</span>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={`${styles.surfaceBtn} ${activeSurface === "light" ? styles.active : ""}`}
            onClick={() => setActiveSurface("light")}
          >
            LIGHT EDITORIAL
          </button>
          <button
            type="button"
            className={`${styles.surfaceBtn} ${activeSurface === "dark" ? styles.active : ""}`}
            onClick={() => setActiveSurface("dark")}
          >
            DARK TECHNICAL
          </button>
          <button
            type="button"
            className={`${styles.surfaceBtn} ${activeSurface === "photo" ? styles.active : ""}`}
            onClick={() => setActiveSurface("photo")}
          >
            PHOTOGRAPHIC BACKDROP
          </button>
          <button
            type="button"
            className={`${styles.surfaceBtn} ${activeSurface === "machinery" ? styles.active : ""}`}
            onClick={() => setActiveSurface("machinery")}
          >
            HIGH-CONTRAST MACHINERY
          </button>
        </div>
      </div>

      {/* Action Stage */}
      <div className={`${styles.ctaStage} ${styles[activeSurface]}`}>
        {activeSurface === "photo" && (
          <div className={styles.photoBackground} aria-hidden="true">
            <Image
              src="/images/dev/vessel-exterior.svg"
              alt="Vessel background"
              fill
              className={styles.bgImg}
            />
            <div className={styles.photoScrim} />
          </div>
        )}

        <div className={styles.ctaGrid}>
          
          {/* 1. Primary CTA */}
          <div className={styles.ctaCard}>
            <div className={styles.ctaMeta}>
              <span className={styles.tierTag}>TIER 01 // PRIMARY OPERATIONAL</span>
              <span className={styles.intentTag}>ACTION RED (#D9141B) // 4.85:1 AA</span>
            </div>
            <div className={styles.ctaButtonWrapper}>
              <button type="button" className={styles.btnPrimary}>
                <span>REQUEST TECHNICAL SUPPORT</span>
                <span className={styles.btnArrow}>→</span>
              </button>
            </div>
            <p className={styles.ctaNotes}>
              For direct dispatch of marine engineering squads to vessels at berth, anchorage, or shipyard.
            </p>
          </div>

          {/* 2. Secondary CTA */}
          <div className={styles.ctaCard}>
            <div className={styles.ctaMeta}>
              <span className={styles.tierTag}>TIER 02 // SECONDARY EXPLORATION</span>
              <span className={styles.intentTag}>HAIRLINE BORDER // SUBTLE STATE</span>
            </div>
            <div className={styles.ctaButtonWrapper}>
              <button type="button" className={styles.btnSecondary}>
                <span>EXPLORE CAPABILITIES</span>
                <span className={styles.btnArrow}>↗</span>
              </button>
            </div>
            <p className={styles.ctaNotes}>
              For superintendents conducting technical due diligence on tooling, class compliance, and service scopes.
            </p>
          </div>

          {/* 3. Urgent 24/7 CTA */}
          <div className={styles.ctaCard}>
            <div className={styles.ctaMeta}>
              <span className={styles.tierTagUrgent}>TIER 03 // EMERGENCY DOWNTIME</span>
              <span className={styles.intentTag}>HIGH CONTRAST // BEACON PULSE</span>
            </div>
            <div className={styles.ctaButtonWrapper}>
              <button type="button" className={styles.btnUrgent}>
                <span className={styles.urgentDot} />
                <span>RAPID SUPPORT 24/7</span>
              </button>
            </div>
            <p className={styles.ctaNotes}>
              One-touch emergency bridge/engine room hotline for vessels with critical blackouts or class conditions.
            </p>
          </div>

          {/* 4. Utility Spare Parts CTA */}
          <div className={styles.ctaCard}>
            <div className={styles.ctaMeta}>
              <span className={styles.tierTag}>TIER 04 // UTILITY SPECIFICATION</span>
              <span className={styles.intentTag}>MONOSPACE TABULAR SPEC</span>
            </div>
            <div className={styles.ctaButtonWrapper}>
              <button type="button" className={styles.btnUtility}>
                <span className={styles.utilityIcon}>▣</span>
                <span>REQUEST SPARE PART</span>
              </button>
            </div>
            <p className={styles.ctaNotes}>
              Direct part number enquiry for OEM-equivalent components with rapid air-freight logistics.
            </p>
          </div>

        </div>
      </div>

      {/* Button State Specs */}
      <div className={styles.stateMatrixGrid}>
        <div className={styles.stateCard}>
          <span className={styles.stateTitle}>HOVER &amp; ACTIVE STATES</span>
          <p>Transitions are instant 120ms standard bezier. Primary red shifts to <code>#C4141B</code> with crisp 1px shift.</p>
        </div>
        <div className={styles.stateCard}>
          <span className={styles.stateTitle}>KEYBOARD ACCESSIBILITY</span>
          <p>Visible 2px solid <code>--color-brand-red</code> outline with 2px offset on <code>:focus-visible</code>.</p>
        </div>
        <div className={styles.stateCard}>
          <span className={styles.stateTitle}>MOBILE TOUCH TARGETS</span>
          <p>Minimum 44px (2.75rem) vertical height enforced across all viewports to ensure seamless thumb operation.</p>
        </div>
      </div>
    </section>
  );
}
