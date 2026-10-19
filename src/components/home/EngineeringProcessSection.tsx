import React from "react";
import { Container } from "@/components/primitives/Container";
import { PROCESS_STEPS } from "@/content/home";
import { PROCESS_STEPS_AR } from "@/content/ar/home";
import styles from "./EngineeringProcessSection.module.css";

interface EngineeringProcessSectionProps {
  locale?: "en" | "ar";
}

export function EngineeringProcessSection({ locale = "en" }: EngineeringProcessSectionProps) {
  const isArabic = locale === "ar";
  const steps = isArabic ? PROCESS_STEPS_AR : PROCESS_STEPS;

  return (
    <section
      className={styles.processSection}
      aria-label={isArabic ? "مراحل المنهجية الهندسية" : "Engineering Workflow Process"}
      id="engineering-process"
    >
      <Container>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.kicker}>
              {isArabic ? "منهجية عمل قياسية" : "STANDARDIZED WORKFLOW"}
            </span>
            <h2 className={styles.title}>
              {isArabic ? "من تشخيص العطل إلى التشغيل الكامل." : "FROM FAULT TO FULL OPERATION."}
            </h2>
          </div>
          <p className={styles.subtitle}>
            {isArabic
              ? "تسلسل هندسي منضبط من 6 مراحل يضمن الوصول للسبب الجذري، والاختبار الدقيق، والتكليف المعتمد على متن السفينة."
              : "A disciplined six-stage engineering sequence ensuring root-cause resolution, verified testing, and documented operational sign-off onboard."}
          </p>
        </div>

        {/* Schematic Process Pipeline */}
        <div className={styles.pipelineContainer}>
          {/* Main technical connector line */}
          <div className={styles.connectorLine} aria-hidden="true" />

          <div className={styles.stepsGrid}>
            {steps.map((item) => (
              <div key={item.step} className={styles.stepItem}>
                <div className={styles.stepNode}>
                  <div className={styles.stepBadge}>
                    <span className={styles.stepNumber}>{item.step}</span>
                  </div>
                  <div className={styles.stepConnector} aria-hidden="true">
                    <span className={styles.connDot} />
                  </div>
                </div>

                <div className={styles.stepContent}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stageLabel}>
                      {isArabic ? `المرحلة / ${item.step}` : `STAGE / ${item.step}`}
                    </span>
                    <h3 className={styles.stepTitle}>{item.title}</h3>
                  </div>
                  <p className={styles.stepDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Guarantee / Engineering Note */}
        <div className={styles.processCallout}>
          <div className={styles.calloutTag}>
            {isArabic ? "البروتوكول الهندسي" : "ENGINEERING PROTOCOL"}
          </div>
          <p className={styles.calloutText}>
            {isArabic
              ? "يُختتم كل تدخل هندسي بتقرير فني رسمي يوثق القياسات والمعاملات المسجلة، والقطع المستبدلة، ونتائج اختبارات الأداء بعد التكليف."
              : "Every intervention concludes with a formal technical report detailing parameters recorded, parts installed, and post-commissioning performance measurements."}
          </p>
        </div>
      </Container>
    </section>
  );
}
