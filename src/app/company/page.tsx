import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import { COMPANY_CONTENT } from "@/content/company";
import { ctas } from "@/content/site";
import styles from "./company.module.css";

export const metadata: Metadata = {
  title: COMPANY_CONTENT.overview.seoTitle,
  description: COMPANY_CONTENT.overview.seoDescription,
};

export default function CompanyOverviewPage() {
  const { overview } = COMPANY_CONTENT;

  return (
    <div className={styles.pageWrap}>
      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="Company Overview">
        <Container>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.tagRow}>
                <span className={styles.kicker}>{overview.kicker}</span>
                <span className={styles.divider}>/</span>
                <span className={styles.tag}>INTEGRATED MARINE ENGINEERING</span>
              </div>

              <h1 className={styles.title}>{overview.heroHeading}</h1>

              <p className={styles.subheading}>{overview.heroSubheading}</p>

              <p className={styles.lead}>{overview.leadStatement}</p>

              <div className={styles.actions}>
                <Link href={ctas.technicalSupport.href} className={styles.primaryBtn}>
                  <span>REQUEST TECHNICAL SUPPORT</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link href="/company/approach" className={styles.secondaryBtn}>
                  <span>OUR ENGINEERING APPROACH</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.visualFrame}>
                <div className={styles.frameHeader}>
                  <span className={styles.frameCode}>ME / CORP-01</span>
                  <span className={styles.frameTag}>ENGINEERING-FIRST</span>
                </div>
                <div className={styles.imageWrap}>
                  <Image
                    src="/images/dev/engineer-working.svg"
                    alt="ME Group marine engineers conducting diagnostic inspection on shipboard machinery"
                    width={520}
                    height={340}
                    className={styles.graphicImage}
                    priority
                  />
                </div>
                <div className={styles.frameFooter}>
                  <span className={styles.footerNote}>PROFESSIONAL MARINE ENGINEERING INTEGRITY</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sub-Navigation Bar */}
      <nav className={styles.subnav} aria-label="Company sections">
        <Container>
          <ul className={styles.subnavList}>
            <li>
              <Link href="/company" className={`${styles.subnavLink} ${styles.subnavLinkActive}`}>
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
              <Link href="/company/quality-safety" className={styles.subnavLink}>
                Quality &amp; Safety
              </Link>
            </li>
          </ul>
        </Container>
      </nav>

      {/* Stance Section */}
      <section className={styles.stanceSection} aria-label="Company Stance">
        <Container>
          <div className={styles.stanceBox}>
            <span className={styles.stanceKicker}>OUR OPERATIONAL STANCE</span>
            <h2 className={styles.stanceTitle}>ENGINEERING SPECIALISTS. NOT A BROKER. NOT A CHANDLER.</h2>
            <p className={styles.stanceText}>{overview.stance}</p>
          </div>
        </Container>
      </section>

      {/* Core Pillars Grid */}
      <section className={styles.pillarsSection} aria-label="Four Core Engineering Pillars">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>FOUNDATIONAL PRINCIPLES</span>
            <h2 className={styles.sectionTitle}>HOW ME GROUP DELIVERS VALUE</h2>
            <p className={styles.sectionSubtitle}>
              Four core operational commitments that define our client relationships and technical execution.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            {overview.pillars.map((pillar) => (
              <div key={pillar.number} className={styles.pillarCard}>
                <div className={styles.pillarHeader}>
                  <span className={styles.pillarNum}>{pillar.number}</span>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                </div>
                <p className={styles.pillarSummary}>{pillar.summary}</p>
                <p className={styles.pillarDetail}>{pillar.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Cross-Link Exploration Section */}
      <section className={styles.exploreSection} aria-label="Explore Company Subsections">
        <Container>
          <div className={styles.exploreGrid}>
            <Link href="/company/about" className={styles.exploreCard}>
              <span className={styles.exploreCode}>01 / ABOUT</span>
              <h3 className={styles.exploreTitle}>ABOUT ME GROUP</h3>
              <p className={styles.exploreDesc}>
                Our organization background, multidisciplinary coverage, and commitment to technical transparency.
              </p>
              <span className={styles.exploreCta}>Read Company Profile →</span>
            </Link>

            <Link href="/company/approach" className={styles.exploreCard}>
              <span className={styles.exploreCode}>02 / APPROACH</span>
              <h3 className={styles.exploreTitle}>ENGINEERING LIFECYCLE</h3>
              <p className={styles.exploreDesc}>
                The 5-stage lifecycle from diagnostic baseline to live load testing and verified handover.
              </p>
              <span className={styles.exploreCta}>Explore Our Methodology →</span>
            </Link>

            <Link href="/company/quality-safety" className={styles.exploreCard}>
              <span className={styles.exploreCode}>03 / QUALITY &amp; SAFETY</span>
              <h3 className={styles.exploreTitle}>QUALITY &amp; SAFETY</h3>
              <p className={styles.exploreDesc}>
                Safe isolation protocols, precision calibration tooling, live testing, and environmental awareness.
              </p>
              <span className={styles.exploreCta}>View Quality Standards →</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Conversion Banner */}
      <section className={styles.conversionSection} aria-label="Connect With Engineering Team">
        <Container>
          <div className={styles.conversionCard}>
            <div className={styles.conversionLeft}>
              <span className={styles.convKicker}>COLLABORATION &amp; DISPATCH</span>
              <h2 className={styles.convTitle}>ENGAGE AN ACCOUNTABLE MARINE ENGINEERING TEAM</h2>
              <p className={styles.convDesc}>
                Whether planning scheduled port maintenance or requiring rapid breakdown triage, our technical team is ready to review your machinery parameters.
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
