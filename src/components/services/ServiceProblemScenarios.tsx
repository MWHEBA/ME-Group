import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import type { ProblemScenario } from "@/content/services";
import styles from "./ServiceProblemScenarios.module.css";

interface ServiceProblemScenariosProps {
  scenarios: ProblemScenario[];
  ctaTarget: string;
  ctaParam?: string;
}

export function ServiceProblemScenarios({
  scenarios,
  ctaTarget,
  ctaParam,
}: ServiceProblemScenariosProps) {
  const primaryHref = ctaParam
    ? `${ctaTarget}?system=${ctaParam}`
    : ctaTarget;

  return (
    <section className={styles.scenarioSection} aria-label="Observed Marine Fault Scenarios">
      <Container>
        <div className={styles.header}>
          <span className={styles.kicker}>PROBLEM CONTEXT &amp; TRIAGE</span>
          <h2 className={styles.title}>TYPICAL FAULT SCENARIOS WE RESOLVE</h2>
          <p className={styles.subtitle}>
            Practical operational symptoms encountered onboard and our technical response path.
          </p>
        </div>

        <div className={styles.scenariosGrid}>
          {scenarios.map((scen, idx) => (
            <div key={idx} className={styles.scenarioCard}>
              <div className={styles.cardHeader}>
                <span className={styles.systemTag}>{scen.systemInvolved}</span>
                <span className={styles.indexNum}>SCENARIO 0{idx + 1}</span>
              </div>
              <div className={styles.symptomBox}>
                <span className={styles.boxLabel}>OBSERVED SYMPTOM</span>
                <p className={styles.symptomText}>{scen.symptom}</p>
              </div>
              <div className={styles.actionBox}>
                <span className={styles.boxLabel}>TECHNICAL INTERVENTION</span>
                <p className={styles.actionText}>{scen.action}</p>
              </div>
              <div className={styles.cardFooter}>
                <Link href={primaryHref} className={styles.actionLink}>
                  <span>REPORT SIMILAR SYMPTOM</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
