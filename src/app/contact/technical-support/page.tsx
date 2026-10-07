import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { TechnicalSupportForm } from "@/components/forms/TechnicalSupportForm";
import styles from "./technical-support.module.css";

export const metadata: Metadata = {
  title: "Request Technical Support | Marine Engineering & Maintenance | ME Group",
  description:
    "Submit a structured technical support request for vessel machinery overhaul, power distribution, automation troubleshooting, or pneumatic repairs across Egyptian ports and Suez Canal anchorages.",
};

export default function TechnicalSupportPage() {
  const contactTabs = [
    { label: "Commercial Enquiry", href: "/contact", active: false },
    { label: "Technical Support", href: "/contact/technical-support", active: true },
    { label: "Rapid Support (Urgent)", href: "/contact/rapid-support", active: false },
    { label: "Spare Parts Sourcing", href: "/contact/spare-parts", active: false },
  ];

  return (
    <div className={styles.pageWrap}>
      {/* Channel Switcher Bar */}
      <nav className={styles.tabNav} aria-label="Contact Channels">
        <Container>
          <div className={styles.tabList}>
            {contactTabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`${styles.tabItem} ${tab.active ? styles.tabItemActive : ""}`}
                aria-current={tab.active ? "page" : undefined}
              >
                <span>{tab.label}</span>
              </Link>
            ))}
          </div>
        </Container>
      </nav>

      {/* Header Banner */}
      <section className={styles.headerSection} aria-label="Technical Support Header">
        <Container>
          <div className={styles.headerGrid}>
            <div className={styles.headerContent}>
              <div className={styles.tagRow}>
                <span className={styles.kicker}>ENGINEERING INTAKE</span>
                <span className={styles.tagDivider} aria-hidden="true">/</span>
                <span className={styles.tag}>24/7 TECHNICAL DISPATCH</span>
              </div>
              <h1 className={styles.pageTitle}>REQUEST TECHNICAL SUPPORT</h1>
              <p className={styles.pageSubtitle}>
                Provide vessel parameters, observed machinery symptoms, and equipment details. Our engineering triage team reviews the technical scope, matches maker specifications, and prepares required diagnostic tooling and certified specialists.
              </p>
            </div>

            {/* SLA & Readiness Highlights */}
            <div className={styles.highlightsCard} aria-label="Operational Capabilities">
              <div className={styles.highlightItem}>
                <span className={styles.highlightLabel}>RESPONSE SLA</span>
                <span className={styles.highlightValue}>&lt; 2 Hours Preliminary Triage</span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.highlightLabel}>GEOGRAPHIC REACH</span>
                <span className={styles.highlightValue}>All Egyptian Ports &amp; Suez Canal</span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.highlightLabel}>SQUAD READINESS</span>
                <span className={styles.highlightValue}>Class-Approved Diagnostic Teams</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content: Form + Triage Protocol Sidebar */}
      <section className={styles.bodySection} aria-label="Technical Support Intake Form and Dispatch Protocol">
        <Container>
          <div className={styles.contentGrid}>
            {/* Left / Primary Column: Form */}
            <div className={styles.formCol}>
              <TechnicalSupportForm />
            </div>

            {/* Right / Secondary Column: Sidebar */}
            <aside className={styles.sidebarCol} aria-label="Technical Support Guidance and Protocols">
              {/* Card 1: Engineering Triage Workflow */}
              <div className={styles.sidebarCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardKicker}>DISPATCH PROTOCOL</span>
                  <h2 className={styles.cardTitle}>ENGINEERING WORKFLOW</h2>
                </div>
                <div className={styles.workflowSteps}>
                  <div className={styles.workflowStep}>
                    <span className={styles.stepNum}>01</span>
                    <div className={styles.stepBody}>
                      <strong className={styles.stepHead}>Technical Scope Assessment</strong>
                      <p className={styles.stepDesc}>
                        Senior marine engineers analyze submitted symptoms, error codes, and maker schematics to determine root causes.
                      </p>
                    </div>
                  </div>

                  <div className={styles.workflowStep}>
                    <span className={styles.stepNum}>02</span>
                    <div className={styles.stepBody}>
                      <strong className={styles.stepHead}>Tooling &amp; Parts Matching</strong>
                      <p className={styles.stepDesc}>
                        Calibrated diagnostic equipment, calibration gear, and OEM replacement components are prepared for attendance.
                      </p>
                    </div>
                  </div>

                  <div className={styles.workflowStep}>
                    <span className={styles.stepNum}>03</span>
                    <div className={styles.stepBody}>
                      <strong className={styles.stepHead}>Onboard Attendance &amp; Report</strong>
                      <p className={styles.stepDesc}>
                        Engineers board at berth or anchorage, execute repairs, test under load, and issue comprehensive service reports.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Required Information Checklist */}
              <div className={styles.sidebarCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardKicker}>INTAKE CHECKLIST</span>
                  <h2 className={styles.cardTitle}>TO EXPEDITE DISPATCH</h2>
                </div>
                <p className={styles.cardIntro}>
                  Providing complete data during submission significantly accelerates mobilization:
                </p>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <span className={styles.checkIcon} aria-hidden="true">■</span>
                    <span>Vessel IMO, Current Berth / Anchorage, and Departure ETD</span>
                  </li>
                  <li className={styles.checkItem}>
                    <span className={styles.checkIcon} aria-hidden="true">■</span>
                    <span>Equipment Maker, Model, and Serial Number (or Nameplate Photo)</span>
                  </li>
                  <li className={styles.checkItem}>
                    <span className={styles.checkIcon} aria-hidden="true">■</span>
                    <span>Observed Alarms, Pressures, Temperatures, and Failure Timeline</span>
                  </li>
                  <li className={styles.checkItem}>
                    <span className={styles.checkIcon} aria-hidden="true">■</span>
                    <span>Single-Line Diagrams or Service History (if available)</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Urgent Breakdown Notice */}
              <div className={`${styles.sidebarCard} ${styles.urgentCard}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.urgentKicker}>CRITICAL BREAKDOWN?</span>
                  <h2 className={styles.cardTitle}>ACTIVE VOYAGE EMERGENCY</h2>
                </div>
                <p className={styles.urgentText}>
                  If your vessel faces an immediate sailing deadline, blackout, or critical propulsion failure, use our priority bypass line.
                </p>
                <div className={styles.cardActions}>
                  <Link href="/contact/rapid-support" className={styles.urgentLink}>
                    <span>REQUEST RAPID SUPPORT →</span>
                  </Link>
                  <a href="tel:+201000000000" className={styles.hotlineLink}>
                    <span aria-hidden="true">☎</span>
                    <span>24/7 HOTLINE: DIRECT DISPATCH</span>
                  </a>
                </div>
              </div>

              {/* Card 4: Need Spare Parts Only */}
              <div className={styles.sidebarCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardKicker}>SPARE PARTS ONLY</span>
                  <h2 className={styles.cardTitle}>COMPONENT SOURCING</h2>
                </div>
                <p className={styles.cardIntro}>
                  If you only require replacement kits, valves, sensors, or OEM mechanical components without engineer attendance:
                </p>
                <Link href="/contact/spare-parts" className={styles.secondaryActionBtn}>
                  <span>OPEN SPARE PARTS REQUISITION →</span>
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
