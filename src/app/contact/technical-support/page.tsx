import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { TechnicalSupportForm } from "@/components/forms/TechnicalSupportForm";
import { EngineeringDiscipline } from "@/lib/forms/types";
import styles from "./technical-support.module.css";

export const metadata: Metadata = {
  title: "Request Technical Support | Marine Engineering & Maintenance | ME Group",
  description:
    "Submit a structured technical support request for vessel machinery overhaul, power distribution, automation troubleshooting, or pneumatic repairs.",
};

interface PageProps {
  searchParams: Promise<{ system?: string; category?: string }>;
}

export default async function TechnicalSupportPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawSystem = (params.system || params.category || "").toLowerCase();

  let initialSystem: EngineeringDiscipline = "mechanical";
  if (
    rawSystem === "mechanical" ||
    rawSystem === "electrical" ||
    rawSystem === "automation" ||
    rawSystem === "pneumatic"
  ) {
    initialSystem = rawSystem;
  }

  return (
    <div className={styles.pageWrap}>
      {/* Header Banner */}
      <section className={styles.headerSection} aria-label="Technical Support Header">
        <Container>
          <div className={styles.headerContent}>
            <div className={styles.tagRow}>
              <span className={styles.kicker}>ENGINEERING INTAKE</span>
              <span className={styles.tag}>24/7 TECHNICAL DISPATCH</span>
            </div>
            <h1 className={styles.pageTitle}>REQUEST TECHNICAL SUPPORT</h1>
            <p className={styles.pageSubtitle}>
              Provide vessel parameters, observed machinery symptoms, and equipment details. Our engineering triage team reviews the technical scope and prepares the required tooling and specialists.
            </p>
          </div>
        </Container>
      </section>

      {/* Form Body */}
      <section className={styles.formSection} aria-label="Technical Support Intake Form">
        <Container>
          <div className={styles.formWrapper}>
            <TechnicalSupportForm initialSystem={initialSystem} />
          </div>
        </Container>
      </section>
    </div>
  );
}
