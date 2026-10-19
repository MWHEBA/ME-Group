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
import { companyAr } from "@/content/ar/site";

export const metadata: Metadata = {
  title: `${companyAr.fullName} | خدمات الهندسة البحرية، الصيانة، ودعم السفن`,
  description:
    "دعم فني هندسي متكامل يغطي الأنظمة الميكانيكية، الطاقة الكهربائية والتوزيع، التحكم الآلي، والأنظمة الهوائية عبر الموانئ المصرية والمجرى الملاحي لقناة السويس.",
  openGraph: {
    title: `${companyAr.fullName} | خدمات الهندسة البحرية، الصيانة، ودعم السفن`,
    description:
      "دعم فني هندسي متكامل يغطي الأنظمة الميكانيكية، الطاقة الكهربائية والتوزيع، التحكم الآلي، والأنظمة الهوائية عبر الموانئ المصرية والمجرى الملاحي لقناة السويس.",
    type: "website",
    locale: "ar_EG",
  },
};

export default function ArabicHomePage() {
  return (
    <main id="main-content">
      {/* 01. Hero (Cinematic Precision — Video & Overlay) */}
      <HomeHero locale="ar" />

      {/* 02. Positioning Statement */}
      <PositioningStatement locale="ar" />

      {/* 03. Core Engineering Systems */}
      <CoreSystemsSection locale="ar" />

      {/* 04. Problem-Based Operational Triage */}
      <ProblemTriageSection locale="ar" />

      {/* 05. Standardized Engineering Process */}
      <EngineeringProcessSection locale="ar" />

      {/* 06. Rapid Support Operational Banner */}
      <RapidSupportBanner locale="ar" />

      {/* 07. Supported Machinery Taxonomy */}
      <EquipmentTaxonomySection locale="ar" />

      {/* 09. Marine Spare Parts Protocol */}
      <SparePartsSection locale="ar" />

      {/* 11. Why Partner With ME Group */}
      <WhyMeGroupSection locale="ar" />

      {/* 14. Final Technical Conversion */}
      <FinalConversionSection locale="ar" />
    </main>
  );
}
