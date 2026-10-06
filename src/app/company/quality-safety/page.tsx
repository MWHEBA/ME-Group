import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { COMPANY_CONTENT } from "@/content/company";
import { ctas } from "@/content/site";
import styles from "./quality-safety.module.css";

export const metadata: Metadata = {
  title: COMPANY_CONTENT.qualitySafety.seoTitle,
  description: COMPANY_CONTENT.qualitySafety.seoDescription,
};

export default function QualitySafetyPage() {
  const { qualitySafety } = COMPANY_CONTENT;

  return (
    <div className={styles.pageWrap}>
      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="Quality and Operational Safety">
        <Container>
          <div className={styles.heroInner}>
            <div className={styles.tagRow}>
              <span className={styles.kicker}>{qualitySafety.kicker}</span>
              <span className={styles.divider}>/</span>
              <span className={styles.tag}>SAFETY &amp; TECHNICAL DISCIPLINE</span>
            </div>

            <h1 className={styles.title}>{qualitySafety.heroHeading}</h1>

            <p className={styles.subheading}>{qualitySafety.heroSubheading}</p>

            <p className={styles.lead}>{qualitySafety.leadStatement}</p>

            <div className={styles.actions}>
              <Link href={ctas.technicalSupport.href} className={styles.primaryBtn}>
                <span>REQUEST TECHNICAL SUPPORT</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/company/approach" className={styles.secondaryBtn}>
                <span>ENGINEERING METHODOLOGY</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Sub-Navigation Bar */}
      <nav className={styles.subnav} aria-label="Company sections">
        <Container>
          <ul className={styles.subnavList}>
            <li>
              <Link href="/company" className={styles.subnavLink}>
                Overview
              </Link>
            </li>
            <li>
              <Link href="/company/about" className={styles.subnavLink}>
                About &amp; Values
              </Link>
            </li>
            <li>
              <Link href="/company/approach" className={styles.subnavLink}>
                Engineering Approach
              </Link>
            </li>
            <li>
              <Link
                href="/company/quality-safety"
                className={`${styles.subnavLink} ${styles.subnavLinkActive}`}
              >
                Quality &amp; Safety
              </Link>
            </li>
          </ul>
        </Container>
      </nav>

      {/* Conservative Quality Stance Box */}
      <section className={styles.stanceSection} aria-label="Quality Stance">
        <Container>
          <div className={styles.stanceBox}>
            <span className={styles.stanceKicker}>FIELD-PROVEN STANDARDS</span>
            <h2 className={styles.stanceTitle}>RIGOROUS PRACTICES OVER UNVERIFIED BADGES</h2>
            <p className={styles.stanceText}>{qualitySafety.conservativeStance}</p>
          </div>
        </Container>
      </section>

      {/* Principles Grid */}
      <section className={styles.principlesSection} aria-label="Four Core Safety & Quality Principles">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>CORE TECHNICAL CONTROLS</span>
            <h2 className={styles.sectionTitle}>OUR FOUR OPERATIONAL SAFETY PROTOCOLS</h2>
            <p className={styles.sectionSubtitle}>
              Strict operational controls applied during all on-board mechanical, electrical, and pneumatic interventions.
            </p>
          </div>

          <div className={styles.principlesGrid}>
            {qualitySafety.principles.map((pr) => (
              <div key={pr.code} className={styles.principleCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.principleCode}>{pr.code}</span>
                  <h3 className={styles.principleTitle}>{pr.title}</h3>
                </div>
                <p className={styles.principleDesc}>{pr.description}</p>
                <div className={styles.focusBlock}>
                  <span className={styles.focusLabel}>OPERATIONAL FOCUS:</span>
                  <ul className={styles.focusList}>
                    {pr.focusAreas.map((item, idx) => (
                      <li key={idx} className={styles.focusItem}>
                        <span className={styles.marker} aria-hidden="true">
                          ■
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Conversion Banner */}
      <section className={styles.conversionSection} aria-label="Contact Engineering Team">
        <Container>
          <div className={styles.conversionCard}>
            <div className={styles.conversionLeft}>
              <span className={styles.convKicker}>ENGINEERING SUPPORT</span>
              <h2 className={styles.convTitle}>EXPERIENCE METHODICAL, SAFE ON-BOARD INTERVENTIONS</h2>
              <p className={styles.convDesc}>
                Contact ME Group to arrange technical inspection, preventive maintenance, or corrective repairs executed under strict safety protocols.
              </p>
            </div>
            <div className={styles.conversionRight}>
              <Link href={ctas.technicalSupport.href} className={styles.convBtn}>
                <span>REQUEST TECHNICAL SUPPORT</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
