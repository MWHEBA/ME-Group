import React from "react";
import { Container } from "@/components/primitives/Container";
import { WHY_ME_GROUP } from "@/content/home";
import styles from "./WhyMeGroupSection.module.css";

export function WhyMeGroupSection() {
  return (
    <section className={styles.whySection} aria-label="Why Choose ME Group">
      <Container>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.kicker}>OPERATIONAL CREDIBILITY</span>
            <h2 className={styles.title}>WHY PARTNER WITH ME GROUP</h2>
          </div>
          <p className={styles.subtitle}>
            A dedicated marine engineering organisation delivering multidisciplinary competence, rapid field response, and technical integrity.
          </p>
        </div>

        {/* 4 Pillars Editorial Grid */}
        <div className={styles.pillarsGrid}>
          {WHY_ME_GROUP.map((pillar, idx) => (
            <div key={idx} className={styles.pillarCard}>
              <div className={styles.pillarHeader}>
                <span className={styles.pillarCode}>{pillar.code}</span>
                <span className={styles.indexNum}>0{idx + 1}</span>
              </div>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarDescription}>{pillar.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
