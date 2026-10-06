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
import styles from "./spare-parts.module.css";

export const metadata: Metadata = {
  title: "Marine Spare Parts Sourcing & Verification | ME Group",
  description:
    "Fast marine spare parts identification and delivery. Send your part number or equipment nameplate photo for engines, pumps, switchboards, compressors, and automation systems.",
};

export default function SparePartsPage() {
  const service = getServiceBySlug("spare-parts");
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

      {/* Dual Intake Strategy Banner */}
      <section className={styles.strategySection} aria-label="Spare Parts Intake Pathways">
        <Container>
          <div className={styles.strategyHeader}>
            <span className={styles.kicker}>FAST IDENTIFICATION PROTOCOL</span>
            <h2 className={styles.title}>TWO PATHWAYS TO ACCURATE PART IDENTIFICATION</h2>
            <p className={styles.subtitle}>
              We eliminate turnaround delays by matching components with maker drawings and serial numbers.
            </p>
          </div>

          <div className={styles.strategyGrid}>
            {/* Pathway 1: Known Part Number */}
            <div className={styles.strategyCard}>
              <div className={styles.cardHeader}>
                <span className={styles.pathwayBadge}>PATHWAY 01</span>
                <h3 className={styles.cardTitle}>KNOW THE PART NUMBER?</h3>
              </div>
              <p className={styles.cardDesc}>
                If you have the maker part number, drawing reference, or catalog code from your shipboard manual:
              </p>
              <div className={styles.actionBox}>
                <span className={styles.actionPrompt}>SEND THE NUMBER &amp; MAKER</span>
                <p className={styles.actionDetail}>
                  We cross-reference availability, verify superseded part numbers, and confirm compatibility.
                </p>
              </div>
              <Link href="/contact/spare-parts" className={styles.cardBtn}>
                <span>ENTER PART NUMBER INTAKE</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Pathway 2: Unknown Part Number / Nameplate Photo */}
            <div className={styles.strategyCardHighlight}>
              <div className={styles.cardHeader}>
                <span className={styles.pathwayBadge}>PATHWAY 02</span>
                <h3 className={styles.cardTitle}>DON&apos;T KNOW THE PART NUMBER?</h3>
              </div>
              <p className={styles.cardDesc}>
                If the parts manual is lost, damaged, or the component has no visible code:
              </p>
              <div className={styles.actionBoxHighlight}>
                <span className={styles.actionPrompt}>SEND THE NAMEPLATE PHOTO</span>
                <p className={styles.actionDetail}>
                  Photograph the equipment nameplate or serial stamped casing. Our engineers extract the exact build specifications.
                </p>
              </div>
              <Link href="/contact/spare-parts" className={styles.cardBtnHighlight}>
                <span>UPLOAD NAMEPLATE PHOTO</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 6 Essential Parameters Workflow */}
      <section className={styles.workflowSection} aria-label="Spare Parts Request Parameters">
        <Container>
          <div className={styles.workflowCard}>
            <div className={styles.workflowHeader}>
              <span className={styles.kicker}>DISPATCH PROTOCOL</span>
              <h2 className={styles.workflowTitle}>THE 6 ESSENTIAL PARAMETERS FOR FAST DISPATCH</h2>
            </div>

            <div className={styles.parametersGrid}>
              <div className={styles.paramItem}>
                <span className={styles.paramNum}>01</span>
                <h4 className={styles.paramTitle}>PART DESCRIPTION</h4>
                <p className={styles.paramDesc}>System name &amp; physical component required.</p>
              </div>
              <div className={styles.paramItem}>
                <span className={styles.paramNum}>02</span>
                <h4 className={styles.paramTitle}>PART NO. / NAMEPLATE</h4>
                <p className={styles.paramDesc}>Known code or photo of maker nameplate.</p>
              </div>
              <div className={styles.paramItem}>
                <span className={styles.paramNum}>03</span>
                <h4 className={styles.paramTitle}>MAKER &amp; MODEL</h4>
                <p className={styles.paramDesc}>Equipment manufacturer &amp; exact serial build.</p>
              </div>
              <div className={styles.paramItem}>
                <span className={styles.paramNum}>04</span>
                <h4 className={styles.paramTitle}>QUANTITY &amp; CRITICALITY</h4>
                <p className={styles.paramDesc}>Required units &amp; urgency level on board.</p>
              </div>
              <div className={styles.paramItem}>
                <span className={styles.paramNum}>05</span>
                <h4 className={styles.paramTitle}>DELIVERY LOCATION</h4>
                <p className={styles.paramDesc}>Target port call or shipping agent address.</p>
              </div>
              <div className={styles.paramItem}>
                <span className={styles.paramNum}>06</span>
                <h4 className={styles.paramTitle}>REQUIRED DATE</h4>
                <p className={styles.paramDesc}>Vessel ETA / ETD window constraints.</p>
              </div>
            </div>

            <div className={styles.workflowCta}>
              <Link href="/contact/spare-parts" className={styles.workflowBtn}>
                <span>OPEN SPARE PARTS REQUEST FORM</span>
                <span aria-hidden="true">→</span>
              </Link>
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
    </main>
  );
}
