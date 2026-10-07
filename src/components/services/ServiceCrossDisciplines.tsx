import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import type { RelatedDisciplineLink } from "@/content/services";
import styles from "./ServiceCrossDisciplines.module.css";

interface ServiceCrossDisciplinesProps {
  relatedDisciplines: RelatedDisciplineLink[];
  currentDisciplineTitle: string;
}

export function ServiceCrossDisciplines({
  relatedDisciplines,
  currentDisciplineTitle,
}: ServiceCrossDisciplinesProps) {
  return (
    <section className={styles.crossSection} aria-label="Integrated Cross-Disciplinary Connections">
      <Container>
        <div className={styles.header}>
          <span className={styles.kicker}>CROSS-DISCIPLINE THINKING</span>
          <h2 className={styles.title}>HOW {currentDisciplineTitle.toUpperCase()} CONNECTS ACROSS THE VESSEL</h2>
          <p className={styles.subtitle}>
            Shipboard faults do not operate in silos. ME Group engineers cross-examine adjacent systems to resolve root causes.
          </p>
        </div>

        <div className={styles.grid}>
          {relatedDisciplines.map((rel, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.codeBadge}>SYS / {rel.systemCode}</span>
                <h3 className={styles.cardTitle}>{rel.title}</h3>
              </div>
              <p className={styles.reasonText}>{rel.reason}</p>
              <div className={styles.cardFooter}>
                <Link href={`/services/${rel.slug}`} className={styles.exploreLink}>
                  <span>EXPLORE</span>
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
