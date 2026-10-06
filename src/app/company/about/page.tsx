import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { COMPANY_CONTENT } from "@/content/company";
import { ctas } from "@/content/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: COMPANY_CONTENT.about.seoTitle,
  description: COMPANY_CONTENT.about.seoDescription,
};

export default function AboutPage() {
  const { about } = COMPANY_CONTENT;

  return (
    <div className={styles.pageWrap}>
      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="About ME Group">
        <Container>
          <div className={styles.heroInner}>
            <div className={styles.tagRow}>
              <span className={styles.kicker}>{about.kicker}</span>
              <span className={styles.divider}>/</span>
              <span className={styles.tag}>PRACTICAL ENGINEERING FOUNDATION</span>
            </div>

            <h1 className={styles.title}>{about.heroHeading}</h1>

            <p className={styles.subheading}>{about.heroSubheading}</p>

            <p className={styles.lead}>{about.leadStatement}</p>

            <div className={styles.actions}>
              <Link href={ctas.technicalSupport.href} className={styles.primaryBtn}>
                <span>REQUEST TECHNICAL SUPPORT</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/services" className={styles.secondaryBtn}>
                <span>EXPLORE SERVICES ECOSYSTEM</span>
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
              <Link href="/company/about" className={`${styles.subnavLink} ${styles.subnavLinkActive}`}>
                About &amp; Values
              </Link>
            </li>
            <li>
              <Link href="/company/approach" className={styles.subnavLink}>
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

      {/* Core Operational Scope */}
      <section className={styles.scopeSection} aria-label="Integrated Operational Scope">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>SEVEN INTEGRATED DISCIPLINES</span>
            <h2 className={styles.sectionTitle}>WHERE WE APPLY OUR EXPERTISE</h2>
            <p className={styles.sectionSubtitle}>{about.coreDisciplinesSummary}</p>
          </div>

          <div className={styles.disciplinesGrid}>
            <Link href="/services/mechanical" className={styles.discCard}>
              <span className={styles.discNum}>01</span>
              <h3 className={styles.discTitle}>Mechanical Engineering</h3>
              <p className={styles.discDesc}>
                Propulsion engines, auxiliary generators, marine pumps, fuel and cooling line diagnostics.
              </p>
              <span className={styles.discLink}>View Scope →</span>
            </Link>

            <Link href="/services/electrical" className={styles.discCard}>
              <span className={styles.discNum}>02</span>
              <h3 className={styles.discTitle}>Electrical Power &amp; Distribution</h3>
              <p className={styles.discDesc}>
                Marine generators, AVRs, Main Switchboards, circuit breakers, earth faults, and motor overhauls.
              </p>
              <span className={styles.discLink}>View Scope →</span>
            </Link>

            <Link href="/services/automation" className={styles.discCard}>
              <span className={styles.discNum}>03</span>
              <h3 className={styles.discTitle}>Automation &amp; Control</h3>
              <p className={styles.discDesc}>
                PLCs, Alarm Monitoring Systems (AMS), PMS synchronization, and sensor loops.
              </p>
              <span className={styles.discLink}>View Scope →</span>
            </Link>

            <Link href="/services/pneumatic" className={styles.discCard}>
              <span className={styles.discNum}>04</span>
              <h3 className={styles.discTitle}>Pneumatic Systems</h3>
              <p className={styles.discDesc}>
                Starting air compressors, cylinders, seal kits, solenoid valves, and leakage detection.
              </p>
              <span className={styles.discLink}>View Scope →</span>
            </Link>

            <Link href="/services/repair-maintenance" className={styles.discCard}>
              <span className={styles.discNum}>05</span>
              <h3 className={styles.discTitle}>Repair &amp; Maintenance</h3>
              <p className={styles.discDesc}>
                5-stage engineering lifecycle, preventive maintenance programs, and emergency fault response.
              </p>
              <span className={styles.discLink}>View Scope →</span>
            </Link>

            <Link href="/services/spare-parts" className={styles.discCard}>
              <span className={styles.discNum}>06</span>
              <h3 className={styles.discTitle}>Marine Spare Parts</h3>
              <p className={styles.discDesc}>
                Part number verification and nameplate matching across mechanical, electrical, and pneumatic gear.
              </p>
              <span className={styles.discLink}>View Scope →</span>
            </Link>

            <Link href="/services/vessel-support" className={styles.discCard}>
              <span className={styles.discNum}>07</span>
              <h3 className={styles.discTitle}>Vessel Support &amp; Supplies</h3>
              <p className={styles.discDesc}>
                Technical consumables, engine-room tools, potable drinking water, provisions, and medical kits.
              </p>
              <span className={styles.discLink}>View Scope →</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Transparency & Integrity Section */}
      <section className={styles.transparencySection} aria-label="Technical Transparency & Integrity">
        <Container>
          <div className={styles.transparencyHeader}>
            <span className={styles.sectionKicker}>ETHICAL ENGINEERING PRACTICE</span>
            <h2 className={styles.sectionTitle}>TRANSPARENCY BEFORE, DURING &amp; AFTER INTERVENTION</h2>
            <p className={styles.sectionSubtitle}>{about.transparencyPhilosophy}</p>
          </div>

          <div className={styles.pointsGrid}>
            {about.transparencyPoints.map((point, idx) => (
              <div key={idx} className={styles.pointCard}>
                <div className={styles.pointTop}>
                  <span className={styles.pointNum}>0{idx + 1}</span>
                  <h3 className={styles.pointTitle}>{point.title}</h3>
                </div>
                <p className={styles.pointDetail}>{point.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Conversion Banner */}
      <section className={styles.conversionSection} aria-label="Connect With ME Group">
        <Container>
          <div className={styles.conversionCard}>
            <div className={styles.conversionLeft}>
              <span className={styles.convKicker}>ENGINEERING SUPPORT</span>
              <h2 className={styles.convTitle}>EXPERIENCE THE DIFFERENCE OF TECHNICAL CLARITY</h2>
              <p className={styles.convDesc}>
                Contact our engineering triage desk to discuss your vessel machinery, electrical systems, or upcoming maintenance window.
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
