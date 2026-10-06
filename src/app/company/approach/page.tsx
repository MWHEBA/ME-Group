import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { COMPANY_CONTENT } from "@/content/company";
import { ctas } from "@/content/site";
import styles from "./approach.module.css";

export const metadata: Metadata = {
  title: COMPANY_CONTENT.approach.seoTitle,
  description: COMPANY_CONTENT.approach.seoDescription,
};

export default function ApproachPage() {
  const { approach } = COMPANY_CONTENT;

  return (
    <div className={styles.pageWrap}>
      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="Engineering Approach">
        <Container>
          <div className={styles.heroInner}>
            <div className={styles.tagRow}>
              <span className={styles.kicker}>{approach.kicker}</span>
              <span className={styles.divider}>/</span>
              <span className={styles.tag}>METHODICAL TECHNICAL LIFECYCLE</span>
            </div>

            <h1 className={styles.title}>{approach.heroHeading}</h1>

            <p className={styles.subheading}>{approach.heroSubheading}</p>

            <p className={styles.lead}>{approach.leadStatement}</p>

            <div className={styles.actions}>
              <Link href={ctas.technicalSupport.href} className={styles.primaryBtn}>
                <span>REQUEST TECHNICAL SUPPORT</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/services/repair-maintenance" className={styles.secondaryBtn}>
                <span>VIEW REPAIR &amp; MAINTENANCE</span>
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
              <Link href="/company/approach" className={`${styles.subnavLink} ${styles.subnavLinkActive}`}>
                Engineering Approach
              </Link>
            </li>
            <li>
              <Link href="/company/quality-safety" className={styles.subnavLink}>
                Quality &amp; Safety
              </Link>
            </li>
          </ul>
        </Container>
      </nav>

      {/* Lifecycle Framework Section */}
      <section className={styles.lifecycleSection} aria-label="5-Stage Engineering Protocol">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>OPERATIONAL PROTOCOL</span>
            <h2 className={styles.sectionTitle}>THE 5-STAGE TECHNICAL INTERVENTION FRAMEWORK</h2>
            <p className={styles.sectionSubtitle}>{approach.reconciliationNote}</p>
          </div>

          <div className={styles.stagesStack}>
            {approach.lifecycleStages.map((st) => (
              <div key={st.step} className={styles.stageCard}>
                <div className={styles.stageHeader}>
                  <div className={styles.stepNumCol}>
                    <span className={styles.stepNum}>{st.step}</span>
                  </div>
                  <div className={styles.stageTitleCol}>
                    <span className={styles.stageCategory}>INTERVENTION STAGE</span>
                    <h3 className={styles.stageName}>{st.stageName}</h3>
                  </div>
                </div>

                <div className={styles.stageBody}>
                  <div className={styles.actionBlock}>
                    <span className={styles.blockLabel}>TECHNICAL EXECUTION &amp; ACTIONS</span>
                    <p className={styles.actionText}>{st.technicalAction}</p>
                  </div>

                  <div className={styles.deliverableBlock}>
                    <span className={styles.blockLabel}>HANDOVER DELIVERABLE</span>
                    <p className={styles.deliverableText}>{st.deliverable}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Operational Principles Section */}
      <section className={styles.principlesSection} aria-label="Operational Execution Principles">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>DISCIPLINED INTERVENTION</span>
            <h2 className={styles.sectionTitle}>OPERATIONAL PRINCIPLES GOVERNING EVERY JOB</h2>
            <p className={styles.sectionSubtitle}>
              Three engineering principles ensuring high first-time resolution rates and tight port turnaround adherence.
            </p>
          </div>

          <div className={styles.principlesGrid}>
            {approach.operationalPrinciples.map((p, idx) => (
              <div key={idx} className={styles.principleCard}>
                <div className={styles.principleTop}>
                  <span className={styles.principleNum}>0{idx + 1}</span>
                  <h3 className={styles.principleTitle}>{p.title}</h3>
                </div>
                <p className={styles.principleText}>{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Conversion Banner */}
      <section className={styles.conversionSection} aria-label="Plan Technical Support">
        <Container>
          <div className={styles.conversionCard}>
            <div className={styles.conversionLeft}>
              <span className={styles.convKicker}>TECHNICAL INTAKE</span>
              <h2 className={styles.convTitle}>REQUIRE DIAGNOSTIC INTERVENTION ON YOUR VESSEL?</h2>
              <p className={styles.convDesc}>
                Submit your vessel parameters, observed machinery symptoms, and target port. Our engineering team prepares the necessary diagnostic tools and specialists.
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
