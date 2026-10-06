"use client";

import React, { useState } from "react";
import styles from "./SurfaceLab.module.css";

export function SurfaceLab() {
  const [activeTab, setActiveTab] = useState<"compositions" | "accessibility">("compositions");

  return (
    <section id="color-surface-lab" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.sectionTag}>SPECIMEN 04 // COLOR &amp; SURFACE LAB</div>
        <h2 className={styles.title}>Surface Architecture &amp; Contrast Resolution</h2>
        <p className={styles.description}>
          Testing real multi-layer industrial surfaces, controlled ME Red application, and establishing strict WCAG AA contrast compliance without altering the official brand mark.
        </p>
      </div>

      {/* Tabs */}
      <div className={styles.tabBar}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "compositions" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("compositions")}
        >
          04.1 FOUR SURFACE COMPOSITIONS
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "accessibility" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("accessibility")}
        >
          04.2 ACCESSIBILITY &amp; RED CONTRAST MATRIX
        </button>
      </div>

      {activeTab === "compositions" && (
        <div className={styles.compositionsGrid}>
          
          {/* Surface 1: Light Editorial */}
          <div className={`${styles.surfaceCard} ${styles.surfaceLight}`}>
            <div className={styles.surfaceHeader}>
              <span className={styles.surfaceBadge}>SURFACE 01 // LIGHT EDITORIAL</span>
              <span className={styles.tokenLabel}>--bg-page (#ffffff)</span>
            </div>
            <div className={styles.surfaceBody}>
              <span className={styles.sysTag}>SYS / 01 — DOCK &amp; BERTH SUPPORT</span>
              <h3 className={styles.compHeading}>TURBOCHARGER OVERHAUL &amp; DYNAMIC BALANCING</h3>
              <p className={styles.compText}>
                Precision rotor balancing to ISO 1940 G2.5 standards. Immediate on-site cartridge replacement and nozzle ring reconditioning for major commercial engine models.
              </p>
              <div className={styles.compFooter}>
                <div className={styles.statusIndicator}>
                  <span className={styles.statusDot} />
                  <span>CLASS APPROVAL: DNV / BV / LLOYDS</span>
                </div>
                <button type="button" className={styles.lightActionBtn}>
                  VIEW TECHNICAL REPORT →
                </button>
              </div>
            </div>
          </div>

          {/* Surface 2: Dark Technical */}
          <div className={`${styles.surfaceCard} ${styles.surfaceDark}`}>
            <div className={styles.surfaceHeader}>
              <span className={styles.surfaceBadge}>SURFACE 02 // DARK TECHNICAL</span>
              <span className={styles.tokenLabel}>--bg-inverse (#121212)</span>
            </div>
            <div className={styles.surfaceBody}>
              <span className={styles.sysTagDark}>ELEC / 02 — SWITCHBOARD SYNCHRONIZATION</span>
              <h3 className={styles.compHeadingDark}>MAIN 440V SWITCHBOARD AUTOMATION &amp; PMS</h3>
              <p className={styles.compTextDark}>
                Direct PLC troubleshooting, automatic load sharing configuration, reverse power trip calibration, and emergency bus interlock restoration.
              </p>
              <div className={styles.compFooter}>
                <div className={styles.darkMetrics}>
                  <div className={styles.metric}>
                    <span className={styles.metricVal}>&lt; 2.5 HR</span>
                    <span className={styles.metricLbl}>MOBILIZATION</span>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.metricVal}>440V / 60Hz</span>
                    <span className={styles.metricLbl}>VOLTAGE CLASS</span>
                  </div>
                </div>
                <button type="button" className={styles.darkActionBtn}>
                  REQUEST ELECTRICAL SQUAD
                </button>
              </div>
            </div>
          </div>

          {/* Surface 3: High-Contrast Machinery */}
          <div className={`${styles.surfaceCard} ${styles.surfaceMachinery}`}>
            <div className={styles.surfaceHeader}>
              <span className={styles.surfaceBadge}>SURFACE 03 // HIGH-CONTRAST MACHINERY</span>
              <span className={styles.tokenLabel}>--color-ink-800 (#1e1e1e)</span>
            </div>
            <div className={styles.surfaceBody}>
              <div className={styles.machineryGrid}>
                <div className={styles.machineryMeta}>
                  <div className={styles.specRow}><span>COMPONENT:</span> <strong>CYLINDER LINER 700MM</strong></div>
                  <div className={styles.specRow}><span>MEASUREMENT:</span> <strong>HONING PATTERN VERIFIED</strong></div>
                  <div className={styles.specRow}><span>TOLERANCE:</span> <strong>± 0.02 MM</strong></div>
                  <div className={styles.specRow}><span>LOCATION:</span> <strong>PORT SAID BERTH 04</strong></div>
                </div>
                <div className={styles.machineryDiagram}>
                  <div className={styles.machineryCrosshair}>
                    <span className={styles.crosshairCoord}>X: 48.21 // Y: 12.04</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Surface 4: Controlled Red Brand Moment */}
          <div className={`${styles.surfaceCard} ${styles.surfaceRed}`}>
            <div className={styles.surfaceHeader}>
              <span className={styles.surfaceBadgeRed}>SURFACE 04 // CONTROLLED RED BRAND MOMENT</span>
              <span className={styles.tokenLabelRed}>--accent-action (#d9141b)</span>
            </div>
            <div className={styles.surfaceBody}>
              <span className={styles.urgentKicker}>CRITICAL DOWNTIME ALERT // 24/7 RAPID DISPATCH</span>
              <h3 className={styles.compHeadingRed}>IMMEDIATE VESSEL OFF-HIRE MITIGATION</h3>
              <p className={styles.compTextRed}>
                Vessel immobilized or class condition issued? Our emergency flying squads deploy with class-certified tools and calibration rigs directly to anchorage.
              </p>
              <div className={styles.compFooter}>
                <button type="button" className={styles.redUrgentBtn}>
                  CALL RAPID RESPONSE DESK
                </button>
                <span className={styles.phoneTag}>SUEZ CANAL &amp; GULF HOTLINE</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeTab === "accessibility" && (
        <div className={styles.accessibilityContainer}>
          <div className={styles.contrastAlert}>
            <div className={styles.alertIcon}>⚖</div>
            <div className={styles.alertContent}>
              <h4 className={styles.alertTitle}>COLOR ACCESSIBILITY (WCAG 2.1 AA) RESOLUTION</h4>
              <p className={styles.alertText}>
                The official ME Group logo uses <code>#ED1C24</code>. On pure white (<code>#FFFFFF</code>), <code>#ED1C24</code> achieves a contrast ratio of <strong>4.38:1</strong>.
                While 4.38:1 passes WCAG AA for large text (&gt;18.66px bold or &gt;24px regular), it narrowly misses the <strong>4.5:1</strong> requirement for small UI text and interactive buttons.
              </p>
            </div>
          </div>

          <div className={styles.contrastComparisonGrid}>
            
            {/* Logo Red Specimen */}
            <div className={styles.contrastCard}>
              <div className={styles.contrastCardHeader}>
                <span className={styles.monoLabel}>BRAND IDENTITY TOKEN</span>
                <span className={styles.failBadge}>4.38:1 (LARGE TEXT ONLY)</span>
              </div>
              <div className={styles.contrastBox} style={{ backgroundColor: "#ffffff" }}>
                <div style={{ color: "#ed1c24", fontWeight: 700, fontSize: "1.5rem" }}>
                  KEEPING VESSELS MOVING.
                </div>
                <div style={{ color: "#ed1c24", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  Small UI text with #ED1C24 (Fails AA for &lt;18px)
                </div>
              </div>
              <div className={styles.tokenSpec}>
                <code>--color-brand-red: #ed1c24;</code>
                <p>Preserved exclusively for the official logo, large display headings, thin 1px accent borders, and status graphics.</p>
              </div>
            </div>

            {/* Accessible Action Red Specimen */}
            <div className={styles.contrastCard}>
              <div className={styles.contrastCardHeader}>
                <span className={styles.monoLabel}>SEMANTIC ACTION TOKEN</span>
                <span className={styles.passBadge}>4.85:1 (WCAG AA PASS)</span>
              </div>
              <div className={styles.contrastBox} style={{ backgroundColor: "#ffffff" }}>
                <button
                  type="button"
                  style={{
                    backgroundColor: "#d9141b",
                    color: "#ffffff",
                    border: "none",
                    padding: "0.6rem 1.2rem",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.05em",
                  }}
                >
                  REQUEST TECHNICAL SUPPORT
                </button>
                <div style={{ color: "#d9141b", fontSize: "0.85rem", marginTop: "0.5rem", fontWeight: 600 }}>
                  High-contrast small label (#d9141b gives 4.85:1)
                </div>
              </div>
              <div className={styles.tokenSpec}>
                <code>--color-brand-red-action: #d9141b;</code>
                <p>Used for all primary buttons, interactive links, small text tags, and urgent notifications to guarantee 100% accessibility.</p>
              </div>
            </div>

          </div>

          <div className={styles.ruleSummary}>
            <strong>Phase 2 Design System Recommendation:</strong> Decouple <code>--color-brand-red</code> (official brand asset mark) from <code>--color-brand-red-action</code> (accessible interactive UI color). This maintains brand fidelity while achieving AA compliance across all viewports and devices.
          </div>
        </div>
      )}
    </section>
  );
}
