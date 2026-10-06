"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./TypographyLab.module.css";

export function TypographyLab() {
  const [selectedHypothesis, setSelectedHypothesis] = useState<"hypo1" | "hypo2">("hypo1");

  return (
    <section id="typography-lab" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.sectionTag}>SPECIMEN 03 // TYPOGRAPHY EXPLORATION</div>
        <h2 className={styles.title}>Typography Hypothesis &amp; Specimen Evaluation</h2>
        <p className={styles.description}>
          Evaluating the primary typographic hypothesis against the alternative direction beside the official ME Group logo.
          Fonts are assessed for industrial authority, engineering precision, readability in high-density environments, and brand distinctiveness.
        </p>
      </div>

      {/* Control Switcher */}
      <div className={styles.switcherBar}>
        <div className={styles.switcherLabel}>ACTIVE TYPOGRAPHY STACK:</div>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={`${styles.switchBtn} ${selectedHypothesis === "hypo1" ? styles.active : ""}`}
            onClick={() => setSelectedHypothesis("hypo1")}
          >
            <span className={styles.btnTag}>HYPOTHESIS 1 (RECOMMENDED)</span>
            <span className={styles.btnFonts}>Barlow Condensed + Barlow + IBM Plex Mono</span>
          </button>
          <button
            type="button"
            className={`${styles.switchBtn} ${selectedHypothesis === "hypo2" ? styles.active : ""}`}
            onClick={() => setSelectedHypothesis("hypo2")}
          >
            <span className={styles.btnTag}>HYPOTHESIS 2 (ALTERNATIVE)</span>
            <span className={styles.btnFonts}>Chakra Petch + Space Grotesk + IBM Plex Mono</span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Logo & Identity Lockup */}
      <div className={styles.logoLockupCard}>
        <div className={styles.cardHeader}>
          <span className={styles.monoLabel}>TEST 3.1 // REAL LOGO &amp; HEADLINE RELATIONSHIP</span>
          <span className={styles.statusPill}>SCALE &amp; WEIGHT HARMONY</span>
        </div>
        <div className={styles.logoComparisonGrid}>
          <div className={styles.logoColumn}>
            <div className={styles.logoFrame}>
              <Image
                src="/brand/me-group-logo-horizontal.png"
                alt="ME Group Official Logo"
                width={260}
                height={60}
                className={styles.realLogo}
              />
            </div>
            <div className={styles.logoCaption}>
              OFFICIAL ME GROUP VECTOR LOGO // NEVER MODIFIED
            </div>
          </div>
          <div className={`${styles.specimenColumn} ${selectedHypothesis === "hypo2" ? styles.useHypo2 : styles.useHypo1}`}>
            <span className={styles.kicker}>PROPULSION &amp; AUXILIARY SPECIALISTS</span>
            <div className={styles.heroHeadline}>KEEPING VESSELS MOVING.</div>
            <div className={styles.subHeadline}>Marine Engineering, Maintenance &amp; Vessel Support</div>
          </div>
        </div>
      </div>

      {/* Hierarchy Matrix */}
      <div className={`${styles.specimensContainer} ${selectedHypothesis === "hypo2" ? styles.useHypo2 : styles.useHypo1}`}>
        <div className={styles.specimenGrid}>
          
          {/* 1. Giant Display Specimen */}
          <div className={styles.specimenCard}>
            <div className={styles.specimenHeader}>
              <span className={styles.specimenLevel}>LEVEL 01 // GIANT DISPLAY (72px - 96px)</span>
              <span className={styles.specimenFamily}>
                {selectedHypothesis === "hypo1" ? "Barlow Condensed 700 Italic" : "Chakra Petch 700 Italic"}
              </span>
            </div>
            <div className={styles.giantDisplay}>
              RAPID TECHNICAL RESPONSE
            </div>
            <div className={styles.specimenMeta}>
              Tracking: -0.02em | Leading: 0.95 | Use: Hero statements &amp; major section impacts
            </div>
          </div>

          {/* 2. Section Title & Category */}
          <div className={styles.specimenCard}>
            <div className={styles.specimenHeader}>
              <span className={styles.specimenLevel}>LEVEL 02 // SECTION TITLE &amp; SERVICE CATEGORY (36px - 48px)</span>
              <span className={styles.specimenFamily}>
                {selectedHypothesis === "hypo1" ? "Barlow Condensed 600" : "Chakra Petch 600"}
              </span>
            </div>
            <div className={styles.sectionTitle}>
              ELECTRICAL POWER &amp; DISTRIBUTION
            </div>
            <div className={styles.sectionTitleAlt}>
              AUTOMATION &amp; CONTROL SYSTEMS
            </div>
            <div className={styles.specimenMeta}>
              Tracking: 0.02em | Leading: 1.1 | Use: Service group titles &amp; case headings
            </div>
          </div>

          {/* 3. Body Copy Editorial */}
          <div className={styles.specimenCard}>
            <div className={styles.specimenHeader}>
              <span className={styles.specimenLevel}>LEVEL 03 // BODY COPY &amp; TECHNICAL EXPLANATION (16px - 18px)</span>
              <span className={styles.specimenFamily}>
                {selectedHypothesis === "hypo1" ? "Barlow 400/500" : "Space Grotesk 400/500"}
              </span>
            </div>
            <p className={styles.bodySpecimen}>
              ME Group provides emergency and scheduled attendance for marine switchboard failures, synchronizing breaker trips, and AVR instabilities. Our specialized electrical engineers deploy directly to berths and anchorages along the Suez Canal corridor and Arabian Gulf ports to restore critical power systems without off-hire delay.
            </p>
            <div className={styles.specimenMeta}>
              Line-Height: 1.6 | Optimal measure: 55-68ch | High legibility in dense technical dossiers
            </div>
          </div>

          {/* 4. Equipment & Diagnostic Labels */}
          <div className={styles.specimenCard}>
            <div className={styles.specimenHeader}>
              <span className={styles.specimenLevel}>LEVEL 04 // EQUIPMENT LABELS &amp; DATA STRINGS</span>
              <span className={styles.specimenFamily}>IBM Plex Mono 500 / 400</span>
            </div>
            <div className={styles.equipmentGrid}>
              <div className={styles.equipTag}><span className={styles.dot} /> GENERATOR / 1,250 kVA</div>
              <div className={styles.equipTag}><span className={styles.dot} /> DIGITAL AVR / R450</div>
              <div className={styles.equipTag}><span className={styles.dot} /> MSB 440V 60Hz</div>
              <div className={styles.equipTag}><span className={styles.dot} /> PLC / S7-1500 REDUNDANT</div>
              <div className={styles.equipTag}><span className={styles.dot} /> PNEUMATIC 30-BAR COMPRESSOR</div>
              <div className={styles.equipTag}><span className={styles.dot} /> 24/7 ATTENDANCE SUEZ</div>
            </div>
            <div className={styles.specimenMeta}>
              Monospace tabular alignment for diagnostic indicators, specifications, and hardware identifiers
            </div>
          </div>

        </div>

        {/* Evaluation Summary Box */}
        <div className={styles.evaluationSummary}>
          <h3 className={styles.evalTitle}>TYPOGRAPHIC DIRECTION ANALYSIS</h3>
          <div className={styles.evalGrid}>
            <div className={styles.evalItem}>
              <div className={styles.evalItemHeader}>
                <span className={styles.checkIcon}>✓</span>
                <strong>Hypothesis 1 (Barlow Condensed + Barlow + Plex Mono)</strong>
              </div>
              <p>
                <strong>Verdict:</strong> Superb balance of industrial engineering weight and maritime legibility. Barlow Condensed provides the authoritative, condensed punch of heavy machinery nameplates and classification society reports without feeling retro or playful. Barlow body copy maintains exceptional clarity on technical spec sheets.
              </p>
            </div>
            <div className={styles.evalItem}>
              <div className={styles.evalItemHeader}>
                <span className={styles.checkIcon}>—</span>
                <strong>Hypothesis 2 (Chakra Petch + Space Grotesk + Plex Mono)</strong>
              </div>
              <p>
                <strong>Verdict:</strong> Has sharp angular technical facets, but Chakra Petch leans slightly toward futuristic cyber/gaming aesthetics at scale, risking the feeling of a tech startup rather than heavy industrial marine engineers who overhaul 2-stroke diesels and 440V switchboards.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
