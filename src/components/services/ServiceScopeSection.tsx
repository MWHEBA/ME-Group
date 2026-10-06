import React from "react";
import { Container } from "@/components/primitives/Container";
import type { ServiceScopeItem } from "@/content/services";
import styles from "./ServiceScopeSection.module.css";

interface ServiceScopeSectionProps {
  disciplinePhilosophy?: string;
  scopeCategories: ServiceScopeItem[];
  disciplineNumber: string;
}

export function ServiceScopeSection({
  disciplinePhilosophy,
  scopeCategories,
  disciplineNumber,
}: ServiceScopeSectionProps) {
  return (
    <section className={styles.scopeSection} aria-label="Technical Scope & Capabilities">
      <Container>
        {disciplinePhilosophy && (
          <div className={styles.philosophyBox}>
            <div className={styles.philosophyHeader}>
              <span className={styles.philosophyBadge}>ENGINEERING PRINCIPLE / {disciplineNumber}</span>
            </div>
            <p className={styles.philosophyText}>{disciplinePhilosophy}</p>
          </div>
        )}

        <div className={styles.sectionHeading}>
          <div className={styles.kickerRow}>
            <span className={styles.kicker}>CONFIRMED TECHNICAL SCOPE</span>
            <span className={styles.kickerDivider}>/</span>
            <span className={styles.kickerDetail}>WHAT WE HANDLE &amp; EXECUTE</span>
          </div>
          <h2 className={styles.title}>ENGINEERING DELIVERABLES &amp; INTERVENTIONS</h2>
        </div>

        <div className={styles.categoriesGrid}>
          {scopeCategories.map((cat, idx) => (
            <div key={idx} className={styles.categoryCard}>
              <div className={styles.cardHeader}>
                <span className={styles.categoryIndex}>0{idx + 1}</span>
                <h3 className={styles.categoryTitle}>{cat.title}</h3>
              </div>
              <p className={styles.categoryDesc}>{cat.description}</p>
              <ul className={styles.itemList}>
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx} className={styles.scopeItem}>
                    <span className={styles.itemMarker} aria-hidden="true">
                      ■
                    </span>
                    <span className={styles.itemText}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
