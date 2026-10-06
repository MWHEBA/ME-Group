import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/content/services";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceScopeSection } from "@/components/services/ServiceScopeSection";
import { ServiceEquipmentSection } from "@/components/services/ServiceEquipmentSection";
import { ServiceProcessSection } from "@/components/services/ServiceProcessSection";
import { ServiceProblemScenarios } from "@/components/services/ServiceProblemScenarios";
import { ServiceCrossDisciplines } from "@/components/services/ServiceCrossDisciplines";
import { ServiceConversionCta } from "@/components/services/ServiceConversionCta";

export const metadata: Metadata = {
  title: "Marine Mechanical Engineering & Machinery Overhaul | ME Group",
  description:
    "Specialized marine mechanical engineering services for main propulsion engines, auxiliary diesel generators, centrifugal/gear pumps, fuel systems, and cooling circuits.",
};

export default function MechanicalServicePage() {
  const service = getServiceBySlug("mechanical");
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
