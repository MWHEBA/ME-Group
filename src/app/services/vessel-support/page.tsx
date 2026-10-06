import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/content/services";
import { Container } from "@/components/primitives/Container";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceScopeSection } from "@/components/services/ServiceScopeSection";
import { ServiceEquipmentSection } from "@/components/services/ServiceEquipmentSection";
import { ServiceProcessSection } from "@/components/services/ServiceProcessSection";
import { ServiceProblemScenarios } from "@/components/services/ServiceProblemScenarios";
import { ServiceCrossDisciplines } from "@/components/services/ServiceCrossDisciplines";
import { ServiceConversionCta } from "@/components/services/ServiceConversionCta";
import styles from "./vessel-support.module.css";

export const metadata: Metadata = {
  title: "Vessel Technical Supplies, Consumables & Provisioning | ME Group",
  description:
    "Integrated vessel support services: high-grade engine-room consumables, workshop measurement tools, certified potable drinking water, fresh/frozen food provisions, and medical supplies.",
};

export default function VesselSupportPage() {
  const service = getServiceBySlug("vessel-support");
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

      {/* Engineering-First Value Note */}
      <section className={styles.positioningNote} aria-label="Engineering Stance">
        <Container>
          <div className={styles.noteBox}>
            <div className={styles.noteHeader}>
              <span className={styles.noteBadge}>ENGINEERING FOUNDATION</span>
            </div>
            <h2 className={styles.noteTitle}>TECHNICAL SUPPLIES BACKED BY ENGINEERING EXPERTISE</h2>
            <p className={styles.noteText}>
              Unlike generic suppliers, ME Group handles vessel provisioning and technical consumables through an engineer&apos;s lens. We verify material grades, pressure ratings, and temperature tolerances before items ever leave our supply chain, ensuring on-board reliability.
            </p>
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

      <ServiceProcessSection
        steps={service.processSteps}
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
