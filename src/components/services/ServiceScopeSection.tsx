import React from "react";
import { Container } from "@/components/primitives/Container";
import type { ServiceScopeItem } from "@/content/services";
import styles from "./ServiceScopeSection.module.css";

interface ServiceScopeSectionProps {
  disciplinePhilosophy?: string;
  scopeCategories: ServiceScopeItem[];
  disciplineNumber: string;
  locale?: "en" | "ar";
}

export function ServiceScopeSection({
  disciplinePhilosophy,
  scopeCategories,
  disciplineNumber,
  locale = "en",
}: ServiceScopeSectionProps) {
  const isAr = locale === "ar";

  return (
    <section className={styles.scopeSection} aria-label="Technical Scope & Capabilities">
      <Container>
        {disciplinePhilosophy && (
          <div className={styles.philosophyBox}>
            <div className={styles.philosophyHeader}>
              <span className={styles.philosophyBadge}>
                {isAr
                  ? `مبدأ هندسي / ${disciplineNumber}`
                  : `ENGINEERING PRINCIPLE / ${disciplineNumber}`}
              </span>
            </div>
            <p className={styles.philosophyText}>{disciplinePhilosophy}</p>
          </div>
        )}

        <div className={styles.sectionHeading}>
          <div className={styles.kickerRow}>
            <span className={styles.kicker}>
              {isAr ? "النطاق الفني المعتمد" : "CONFIRMED TECHNICAL SCOPE"}
            </span>
            <span className={styles.kickerDivider}>/</span>
            <span className={styles.kickerDetail}>
              {isAr ? "ما ننفذه ونتعامل معه" : "WHAT WE HANDLE & EXECUTE"}
            </span>
          </div>
          <h2 className={styles.title}>
            {isAr ? "مخرجات التدخل الهندسي ونطاق العمل" : "ENGINEERING DELIVERABLES & INTERVENTIONS"}
          </h2>
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
