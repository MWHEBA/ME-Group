import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { TRIAGE_PROBLEMS, TriageProblem } from "@/content/home";
import styles from "./ProblemTriageSection.module.css";

export function ProblemTriageSection() {
  return (
    <section className={styles.triageSection} aria-label="Operational Problem Triage">
      <Container>
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.kicker}>DIAGNOSTIC TRIAGE</span>
            <h2 className={styles.title}>WHAT DOES YOUR VESSEL NEED?</h2>
          </div>
          <p className={styles.subtitle}>
            Direct your inquiry straight to the specialized engineering discipline required for your vessel&apos;s current operational state.
          </p>
        </div>

        <div className={styles.triageGrid}>
          {TRIAGE_PROBLEMS.map((problem: TriageProblem) => (
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
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.emergencyFooter}>
          <div className={styles.emergencyPrompt}>
            <span className={styles.emergencyDot} aria-hidden="true" />
            <span className={styles.emergencyText}>
              Unsure of the root cause? Contact our technical dispatch for preliminary diagnostics.
            </span>
          </div>
          <Link href="/contact/technical-support" className={styles.emergencyLink}>
            CONTACT TECHNICAL DISPATCH
          </Link>
        </div>
      </Container>
    </section>
  );
}
