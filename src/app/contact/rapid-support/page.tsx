import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { RapidSupportForm } from "@/components/forms/RapidSupportForm";
import styles from "./rapid-support.module.css";

export const metadata: Metadata = {
  title: "Rapid Marine Technical Support | Urgent Breakdown | ME Group",
  description:
    "Priority technical intake for active marine equipment breakdowns, generator blackouts, or propulsion failures requiring urgent attention.",
};

export default function RapidSupportPage() {
  return (
    <div className={styles.pageWrap}>
      {/* Dark Urgent Header */}
      <section className={styles.headerSection} aria-label="Rapid Support Priority Header">
        <Container>
          <div className={styles.headerContent}>
            <div className={styles.tagRow}>
              <span className={styles.pulseDot} aria-hidden="true" />
              <span className={styles.kicker}>PRIORITY DISPATCH LINE</span>
            </div>
            <h1 className={styles.pageTitle}>RAPID TECHNICAL SUPPORT</h1>
            <p className={styles.pageSubtitle}>
              Streamlined operational intake for active breakdowns, blackouts, or urgent voyage-critical machinery issues.
            </p>
          </div>
        </Container>
      </section>

      {/* Direct Phone / Form Split */}
      <section className={styles.bodySection} aria-label="Rapid Support Form and Phone">
        <Container>
          <div className={styles.contentGrid}>
            {/* Left: Rapid Form */}
            <div className={styles.formCol}>
              <RapidSupportForm />
            </div>

            {/* Right: Direct Dispatch Info Card */}
            <div className={styles.infoCol}>
              <div className={styles.infoCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.infoTag}>DISPATCH PROTOCOL</span>
                </div>
                <h3 className={styles.infoTitle}>IMMEDIATE TELEPHONE ESCALATION</h3>
                <p className={styles.infoDesc}>
                  If your vessel is facing an active emergency or immediate departure deadline, contact technical dispatch directly.
                </p>

                <div className={styles.contactBlock}>
                  <span className={styles.blockLabel}>OPERATIONAL DISPATCH HOTLINE</span>
                  <a href="tel:+201012116108" className={styles.hotlineLink}>
                    <span className={styles.phoneIcon} aria-hidden="true">☎</span>
                    <span>DISPATCH: +20 1012116108</span>
                  </a>
                </div>

                <div className={styles.protocolNotes}>
                  <div className={styles.noteItem}>
                    <span className={styles.noteDot} aria-hidden="true">■</span>
                    <span>Engineers mobilized with specialized marine diagnostic tools.</span>
                  </div>
                  <div className={styles.noteItem}>
                    <span className={styles.noteDot} aria-hidden="true">■</span>
                    <span>Preliminary technical triage conducted during initial phone briefing.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
