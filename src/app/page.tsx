import React from "react";
import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { PositioningStatement } from "@/components/home/PositioningStatement";
import { CoreSystemsSection } from "@/components/home/CoreSystemsSection";
import { ProblemTriageSection } from "@/components/home/ProblemTriageSection";
import { EngineeringProcessSection } from "@/components/home/EngineeringProcessSection";
import { RapidSupportBanner } from "@/components/home/RapidSupportBanner";
import { EquipmentTaxonomySection } from "@/components/home/EquipmentTaxonomySection";
import { SparePartsSection } from "@/components/home/SparePartsSection";
import { WhyMeGroupSection } from "@/components/home/WhyMeGroupSection";
import { FinalConversionSection } from "@/components/home/FinalConversionSection";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: `${company.name} | Marine Engineering, Maintenance & Vessel Support`,
  description:
    "Integrated marine engineering support across mechanical propulsion, electrical power & distribution, automation & control, and pneumatic systems.",
  openGraph: {
    title: `${company.name} | Marine Engineering, Maintenance & Vessel Support`,
    description:
      "Integrated marine engineering support across mechanical propulsion, electrical power & distribution, automation & control, and pneumatic systems.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main id="main-content">
      {/* 01. Hero (Cinematic Precision — Concept D) */}
      <HomeHero />

      {/* 02. Positioning Statement */}
      <PositioningStatement />

      {/* 03. Core Engineering Systems */}
      <CoreSystemsSection />

      {/* 04. Problem-Based Operational Triage */}
      <ProblemTriageSection />

      {/* 05. Standardized Engineering Process */}
      <EngineeringProcessSection />

      {/* 06. Rapid Support Operational Banner */}
      <RapidSupportBanner />

      {/* 07. Supported Machinery Taxonomy */}
      <EquipmentTaxonomySection />

      {/* 09. Marine Spare Parts Protocol */}
      <SparePartsSection />

      {/* 11. Why Partner With ME Group */}
      <WhyMeGroupSection />

      {/* 14. Final Technical Conversion */}
      <FinalConversionSection />
    </main>
  );
}
