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
}

export function ServiceProcessSection({
  steps,
  disciplineTitle,
}: ServiceProcessSectionProps) {
  return (
    <section className={styles.processSection} aria-label="Technical Engineering Process">
      <Container>
        <div className={styles.header}>
          <span className={styles.kicker}>ENGINEERING PROTOCOL</span>
          <h2 className={styles.title}>HOW WE EXECUTE &amp; VERIFY</h2>
          <p className={styles.subtitle}>
            Standardized operational methodology applied during {disciplineTitle} interventions.
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
