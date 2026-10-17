import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { serviceTaxonomyGroups } from "@/content/services";
import { ctas } from "@/content/site";
import styles from "./services-index.module.css";

export const metadata: Metadata = {
  title: "Marine Engineering Services & Technical Capabilities | ME Group",
  description:
    "Integrated marine engineering support across mechanical, electrical power, automation & control, pneumatic systems, repair & maintenance, and vessel support.",
};

export default function ServicesLandingPage() {

  return (
    <div className={styles.pageWrap}>
      {/* Editorial Hero */}
      <section className={styles.heroSection} aria-label="Services Overview">
        <Container>
          <div className={styles.heroInner}>
            <div className={styles.heroTagRow}>
              <span className={styles.heroKicker}>ENGINEERING ECOSYSTEM</span>
              <span className={styles.heroDivider}>/</span>
              <span className={styles.heroTag}>INTEGRATED SHIPBOARD SUPPORT</span>
            </div>

            <h1 className={styles.heroTitle}>
              INTEGRATED MARINE ENGINEERING SUPPORT.
            </h1>

            <p className={styles.heroLead}>
              ME Group supports vessel technical systems across mechanical, electrical, automation, and pneumatic disciplines—backed by structured maintenance programs, rapid spare parts sourcing, comprehensive vessel support, and specialized maritime radio &amp; bridge electronics.
            </p>

            <div className={styles.heroActions}>
              <Link href={ctas.technicalSupport.href} className={styles.primaryBtn}>
                <span>REQUEST TECHNICAL SUPPORT</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/capabilities" className={styles.secondaryBtn}>
                <span>VIEW CAPABILITY MATRIX</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Discipline Taxonomy (Groups A, B, C, D) */}
      <section className={styles.taxonomySection} aria-label="Engineering Taxonomy">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>SERVICE TAXONOMY</span>
            <h2 className={styles.sectionTitle}>EIGHT CORE DISCIPLINES ACROSS FOUR SPECIALIZED TIERS</h2>
            <p className={styles.sectionSubtitle}>
              Structured into four operational tiers: core engineering systems, structured maintenance, vessel support, and specialized navigation &amp; communications.
            </p>
          </div>

          <div className={styles.groupsStack}>
            {serviceTaxonomyGroups.map((group) => (
              <div key={group.slug} className={styles.groupBlock}>
                <div className={styles.groupHeader}>
                  <div className={styles.groupTitleWrap}>
                    <span className={styles.groupCode}>{group.code}</span>
                    <h3 className={styles.groupTitle}>{group.title.toUpperCase()}</h3>
                  </div>
                  <p className={styles.groupSummary}>{group.summary}</p>
                </div>

                <div className={styles.servicesGrid}>
                  {group.services.map((svc) => (
                    <Link
                      key={svc.slug}
                      href={svc.href}
                      className={styles.serviceCard}
                    >
                      <div className={styles.cardTop}>
                        <span className={styles.serviceNum}>{svc.number}</span>
                        <span className={styles.cardArrow} aria-hidden="true">
                          →
                        </span>
                      </div>
                      <h4 className={styles.serviceTitle}>{svc.title}</h4>
                      <p className={styles.serviceSummary}>{svc.summary}</p>
                      <div className={styles.cardFooter}>
                        <span className={styles.exploreText}>VIEW DISCIPLINE SCOPE</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Problem-Based Navigation Entry Points */}
      <section className={styles.problemSection} aria-label="Problem-Based Support Navigation">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>OPERATIONAL NAVIGATION</span>
            <h2 className={styles.sectionTitle}>WHAT DOES YOUR VESSEL NEED RIGHT NOW?</h2>
            <p className={styles.sectionSubtitle}>
              Direct technical routing based on active shipboard failure modes and operational requirements.
            </p>
          </div>

          <div className={styles.problemGrid}>
            <Link
              href="/contact/technical-support?system=mechanical"
              className={styles.problemCard}
            >
              <span className={styles.problemTag}>MECHANICAL ISSUE</span>
              <h3 className={styles.problemTitle}>Engine or Pump Breakdown</h3>
              <p className={styles.problemDesc}>
                Main/auxiliary engine faults, cooling line overheating, pump seal leakage, or abnormal vibration.
              </p>
              <span className={styles.problemCta}>Request Mechanical Intake →</span>
            </Link>

            <Link
              href="/contact/technical-support?system=electrical"
              className={styles.problemCard}
            >
              <span className={styles.problemTag}>ELECTRICAL FAULT</span>
              <h3 className={styles.problemTitle}>Switchboard / Generator Trip</h3>
              <p className={styles.problemDesc}>
                Earth fault alarms, breaker trip status, AVR voltage hunting, or motor winding thermal overloads.
              </p>
              <span className={styles.problemCta}>Request Electrical Intake →</span>
            </Link>

            <Link
              href="/contact/technical-support?system=automation"
              className={styles.problemCard}
            >
              <span className={styles.problemTag}>AUTOMATION ISSUE</span>
              <h3 className={styles.problemTitle}>PLC / AMS Alarm Blackout</h3>
              <p className={styles.problemDesc}>
                Sensor loop error, generator auto-sync failure, PMS logic fault, or fire/gas detection fault.
              </p>
              <span className={styles.problemCta}>Request Automation Intake →</span>
            </Link>

            <Link
              href="/contact/technical-support?system=pneumatic"
              className={styles.problemCard}
            >
              <span className={styles.problemTag}>PNEUMATIC ISSUE</span>
              <h3 className={styles.problemTitle}>Compressor / Air Loss</h3>
              <p className={styles.problemDesc}>
                Slow starting air charge, leaking solenoid valves, sticking actuators, or wet control air lines.
              </p>
              <span className={styles.problemCta}>Request Pneumatics Intake →</span>
            </Link>

            <Link href="/contact/technical-support" className={styles.problemCard}>
              <span className={styles.problemTag}>PARTS REQUIREMENT</span>
              <h3 className={styles.problemTitle}>Urgent Spare Part Sourcing</h3>
              <p className={styles.problemDesc}>
                Part number verification or nameplate matching for engines, pumps, switchgear, and valves.
              </p>
              <span className={styles.problemCta}>Request Spare Parts →</span>
            </Link>

            <Link href="/contact/technical-support" className={styles.problemCardHighlight}>
              <div className={styles.rapidHeader}>
                <span className={styles.rapidDot} aria-hidden="true" />
                <span className={styles.problemTag}>EMERGENCY DISPATCH</span>
              </div>
              <h3 className={styles.problemTitle}>24/7 Rapid Intervention</h3>
              <p className={styles.problemDesc}>
                Urgent technical breakdown requiring immediate engineering triage and mobilized on-board response.
              </p>
              <span className={styles.problemCta}>Engage Rapid Support →</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Cross-Discipline Integration Banner */}
      <section className={styles.crossBannerSection} aria-label="Integrated Engineering Value">
        <Container>
          <div className={styles.crossBannerCard}>
            <div className={styles.crossBannerLeft}>
              <span className={styles.crossKicker}>THE ME GROUP ADVANTAGE</span>
              <h2 className={styles.crossTitle}>
                CROSS-DISCIPLINE DIAGNOSTICS ELIMINATE REPEAT FAILURES.
              </h2>
              <p className={styles.crossLead}>
                Vessel faults frequently cross traditional technical boundaries. Our teams coordinate mechanical, electrical, automation, and pneumatic specialists under one accountable engineering protocol.
              </p>
            </div>
            <div className={styles.crossBannerRight}>
              <Link href="/capabilities" className={styles.crossBtn}>
                <span>EXPLORE CAPABILITIES MATRIX</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
