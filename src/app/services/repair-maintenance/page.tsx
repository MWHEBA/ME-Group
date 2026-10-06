import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/content/services";
import { Container } from "@/components/primitives/Container";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceScopeSection } from "@/components/services/ServiceScopeSection";
import { ServiceEquipmentSection } from "@/components/services/ServiceEquipmentSection";
import { ServiceProblemScenarios } from "@/components/services/ServiceProblemScenarios";
import { ServiceCrossDisciplines } from "@/components/services/ServiceCrossDisciplines";
import { ServiceConversionCta } from "@/components/services/ServiceConversionCta";
import styles from "./repair-maintenance.module.css";

export const metadata: Metadata = {
  title: "Marine Repair & Maintenance Philosophy | Preventive & Corrective | ME Group",
  description:
    "Structured marine repair and maintenance methodology: technical inspection, scheduled preventive upkeep, emergency corrective repairs, operational testing, and 24/7 rapid response.",
};

export default function RepairMaintenancePage() {
  const service = getServiceBySlug("repair-maintenance");
  if (!service) notFound();

  return (
    <main>
      <ServiceHero
        number={service.number}
        kicker={service.kicker}
        categoryTitle={service.categoryTitle}
        title={service.title}
        heroSubheading={service.heroSubheading}
        leadParagraph={service.leadParagraph}
        ctaText={service.ctaText}
        ctaTarget={service.ctaTarget}
        ctaParam={service.ctaParam}
        imagePath={service.imagePath}
        imageAlt={service.imageAlt}
      />

      {/* 5-Stage Engineering Lifecycle Narrative */}
      <section className={styles.lifecycleSection} aria-label="5-Stage Maintenance Lifecycle">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>STRUCTURED OPERATIONAL PROTOCOL</span>
            <h2 className={styles.title}>THE 5-STAGE MAINTENANCE LIFECYCLE</h2>
            <p className={styles.subtitle}>
              From root-cause isolation to verified sign-off, every intervention follows a systematic path.
            </p>
          </div>

          <div className={styles.lifecycleGrid}>
            {service.processSteps.map((step, idx) => (
              <div key={idx} className={styles.lifecycleCard}>
                <div className={styles.cardTop}>
                  <span className={styles.stepNum}>0{idx + 1}</span>
                  <span className={styles.stepStage}>{step.title}</span>
                </div>
                <p className={styles.stepDetail}>{step.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Preventive vs Corrective Matrix */}
      <section className={styles.matrixSection} aria-label="Preventive vs Corrective Support">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>MAINTENANCE MODALITIES</span>
            <h2 className={styles.title}>PLANNED PREVENTIVE UPKEEP VS. CORRECTIVE RESPONSE</h2>
            <p className={styles.subtitle}>
              How ME Group balances proactive reliability programs with rapid technical fault resolution.
            </p>
          </div>

          <div className={styles.modalitiesGrid}>
            {/* Planned Preventive */}
            <div className={styles.modalityCard}>
              <div className={styles.modalityHeader}>
                <span className={styles.modalityTag}>SCHEDULED / PROACTIVE</span>
                <h3 className={styles.modalityTitle}>PREVENTIVE MAINTENANCE</h3>
              </div>
              <p className={styles.modalityDesc}>
                Conducted during scheduled port windows or routine layovers to assess wear, calibrate sensors, and renew consumables before equipment failure occurs.
              </p>
              <ul className={styles.modalityList}>
                <li>Crankcase inspections and bearing clearance logs</li>
                <li>Switchboard thermography surveys under generator load</li>
                <li>Megger insulation resistance tracking across feeder cables</li>
                <li>Pneumatic air dryer, FRL filter, and coalescer renewals</li>
                <li>Pump mechanical seal replacements and wear ring checks</li>
              </ul>
              <div className={styles.modalityFooter}>
                <Link
                  href="/contact/technical-support"
                  className={styles.modalityLink}
                >
                  <span>PLAN PREVENTIVE INTERVENTION</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Corrective Response */}
            <div className={styles.modalityCardAlert}>
              <div className={styles.modalityHeader}>
                <div className={styles.alertTop}>
                  <span className={styles.alertDot} aria-hidden="true" />
                  <span className={styles.modalityTag}>EMERGENCY / FAULT</span>
                </div>
                <h3 className={styles.modalityTitle}>CORRECTIVE RESPONSE</h3>
              </div>
              <p className={styles.modalityDesc}>
                Mobilized immediately when active equipment failure threatens vessel schedule, safety, or cargo operations.
              </p>
              <ul className={styles.modalityList}>
                <li>Emergency earth fault tracing and distribution clearing</li>
                <li>Tripped circuit breaker (ACB) teardown and diagnostic trip testing</li>
                <li>Seized cooling pump or jammed actuator emergency overhaul</li>
                <li>Starting air compressor discharge valve rebuilding under port pressure</li>
                <li>PLC communication recovery and sensor trip bypass verification</li>
              </ul>
              <div className={styles.modalityFooter}>
                <Link
                  href="/contact/technical-support"
                  className={styles.alertLink}
                >
                  <span>DISPATCH TECHNICAL SUPPORT</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ServiceScopeSection
        disciplinePhilosophy={service.disciplinePhilosophy}
        scopeCategories={service.scopeCategories}
        disciplineNumber={service.number}
      />

      <ServiceEquipmentSection
        equipment={service.equipmentHandled}
        disciplineTitle={service.shortTitle}
      />

      <ServiceProblemScenarios
        scenarios={service.problemScenarios}
        ctaTarget={service.ctaTarget}
        ctaParam={service.ctaParam}
      />

      <ServiceCrossDisciplines
        relatedDisciplines={service.relatedDisciplines}
        currentDisciplineTitle={service.shortTitle}
      />

      <ServiceConversionCta
        disciplineTitle={service.shortTitle}
        ctaText={service.ctaText}
        ctaTarget={service.ctaTarget}
        ctaParam={service.ctaParam}
        systemCode={service.number}
      />
    </main>
  );
}
