import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { TRIAGE_PROBLEMS, TriageProblem } from "@/content/home";
import { TRIAGE_PROBLEMS_AR } from "@/content/ar/home";
import styles from "./ProblemTriageSection.module.css";

interface ProblemTriageSectionProps {
  locale?: "en" | "ar";
}

export function ProblemTriageSection({ locale = "en" }: ProblemTriageSectionProps) {
  const isArabic = locale === "ar";
  const problems = isArabic ? TRIAGE_PROBLEMS_AR : TRIAGE_PROBLEMS;

  return (
    <section
      className={styles.triageSection}
      aria-label={isArabic ? "فرز وتشخيص الأعطال التشغيلية" : "Operational Problem Triage"}
    >
      <Container>
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.kicker}>
              {isArabic ? "التشخيص الفني والفرز" : "DIAGNOSTIC TRIAGE"}
            </span>
            <h2 className={styles.title}>
              {isArabic ? "ما الذي تحتاجه سفينتك؟" : "WHAT DOES YOUR VESSEL NEED?"}
            </h2>
          </div>
          <p className={styles.subtitle}>
            {isArabic
              ? "وجّه طلبك مباشرةً إلى التخصص الهندسي المطلوب وفقاً للحالة التشغيلية الراهنة لسفينتك."
              : "Direct your inquiry straight to the specialized engineering discipline required for your vessel's current operational state."}
          </p>
        </div>

        <div className={styles.triageGrid}>
          {problems.map((problem: TriageProblem) => (
            <div key={problem.id} className={styles.triageCard}>
              <div className={styles.cardTop}>
                <span className={styles.cardCode}>{problem.code}</span>
                <span className={styles.indicator} aria-hidden="true" />
              </div>

              <h3 className={styles.cardTitle}>{problem.title}</h3>
              <p className={styles.cardSummary}>{problem.summary}</p>

              <div className={styles.cardAction}>
                <Link href={problem.href} className={styles.actionLink}>
                  <span>{problem.actionText}</span>
                  <span className={styles.arrow} aria-hidden="true">{isArabic ? "←" : "→"}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.emergencyFooter}>
          <div className={styles.emergencyPrompt}>
            <span className={styles.emergencyDot} aria-hidden="true" />
            <span className={styles.emergencyText}>
              {isArabic
                ? "غير متأكد من السبب الجذري للعطل؟ تواصل مع غرفة العمليات الفنية لإجراء تقييم أولي."
                : "Unsure of the root cause? Contact our technical dispatch for preliminary diagnostics."}
            </span>
          </div>
          <Link
            href={isArabic ? "/ar/contact/technical-support" : "/contact/technical-support"}
            className={styles.emergencyLink}
          >
            {isArabic ? "التواصل مع غرفة العمليات الفنية" : "CONTACT TECHNICAL DISPATCH"}
          </Link>
        </div>
      </Container>
    </section>
  );
}
