import React from "react";
import { Container } from "@/components/primitives/Container";
import styles from "./ServiceProcessSection.module.css";

interface ProcessStep {
  step: string;
  title: string;
  detail: string;
}

interface ServiceProcessSectionProps {
  steps: ProcessStep[];
  disciplineTitle: string;
  locale?: "en" | "ar";
}

export function ServiceProcessSection({
  steps,
  disciplineTitle,
  locale = "en",
}: ServiceProcessSectionProps) {
  const isAr = locale === "ar";

  return (
    <section className={styles.processSection} aria-label="Technical Engineering Process">
      <Container>
        <div className={styles.header}>
          <span className={styles.kicker}>
            {isAr ? "البروتوكول الهندسي" : "ENGINEERING PROTOCOL"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "كيف ننفذ ونتحقق من الجودة" : "HOW WE EXECUTE & VERIFY"}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? `منهجية عمل قياسية مطبقة في كافة تدخلات ${disciplineTitle}.`
              : `Standardized operational methodology applied during ${disciplineTitle} interventions.`}
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((item, idx) => (
            <div key={idx} className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>{item.step}</span>
                <div className={styles.connector} aria-hidden="true" />
              </div>
              <h3 className={styles.stepTitle}>{item.title}</h3>
              <p className={styles.stepDetail}>{item.detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
