import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import type { ProblemScenario } from "@/content/services";
import styles from "./ServiceProblemScenarios.module.css";

interface ServiceProblemScenariosProps {
  scenarios: ProblemScenario[];
  ctaTarget: string;
  ctaParam?: string;
  locale?: "en" | "ar";
}

export function ServiceProblemScenarios({
  scenarios,
  ctaTarget,
  ctaParam,
  locale = "en",
}: ServiceProblemScenariosProps) {
  const isAr = locale === "ar";
  const primaryHref = ctaParam
    ? `${ctaTarget}?system=${ctaParam}`
    : ctaTarget;

  return (
    <section className={styles.scenarioSection} aria-label="Observed Marine Fault Scenarios">
      <Container>
        <div className={styles.header}>
          <span className={styles.kicker}>
            {isAr ? "فرز وتشخيص الأعطال" : "PROBLEM CONTEXT & TRIAGE"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "سيناريوهات أعطال شائعة نتولى حلها" : "TYPICAL FAULT SCENARIOS WE RESOLVE"}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? "أعراض تشغيلية واقعية مرصودة على متن السفينة ومسار تدخلنا الفني المباشر."
              : "Practical operational symptoms encountered onboard and our technical response path."}
          </p>
        </div>

        <div className={styles.scenariosGrid}>
          {scenarios.map((scen, idx) => (
            <div key={idx} className={styles.scenarioCard}>
              <div className={styles.cardHeader}>
                <span className={styles.systemTag}>{scen.systemInvolved}</span>
                <span className={styles.indexNum}>
                  {isAr ? `سيناريو 0${idx + 1}` : `SCENARIO 0${idx + 1}`}
                </span>
              </div>
              <div className={styles.symptomBox}>
                <span className={styles.boxLabel}>
                  {isAr ? "العَرَض المرصود" : "OBSERVED SYMPTOM"}
                </span>
                <p className={styles.symptomText}>{scen.symptom}</p>
              </div>
              <div className={styles.actionBox}>
                <span className={styles.boxLabel}>
                  {isAr ? "التدخل الهندسي" : "TECHNICAL INTERVENTION"}
                </span>
                <p className={styles.actionText}>{scen.action}</p>
              </div>
              <div className={styles.cardFooter}>
                <Link href={primaryHref} className={styles.actionLink}>
                  <span>{isAr ? "الإبلاغ عن عَرَض مماثل" : "REPORT SIMILAR SYMPTOM"}</span>
                  <span aria-hidden="true">{isAr ? "←" : "→"}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
