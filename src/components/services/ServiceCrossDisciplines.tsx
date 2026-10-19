import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import type { RelatedDisciplineLink } from "@/content/services";
import styles from "./ServiceCrossDisciplines.module.css";

interface ServiceCrossDisciplinesProps {
  relatedDisciplines: RelatedDisciplineLink[];
  currentDisciplineTitle: string;
  locale?: "en" | "ar";
}

export function ServiceCrossDisciplines({
  relatedDisciplines,
  currentDisciplineTitle,
  locale = "en",
}: ServiceCrossDisciplinesProps) {
  const isAr = locale === "ar";

  return (
    <section className={styles.crossSection} aria-label="Integrated Cross-Disciplinary Connections">
      <Container>
        <div className={styles.header}>
          <span className={styles.kicker}>
            {isAr ? "الترابط بين التخصصات" : "CROSS-DISCIPLINE THINKING"}
          </span>
          <h2 className={styles.title}>
            {isAr
              ? `كيف ترتبط ${currentDisciplineTitle} بباقي منظومات السفينة`
              : `HOW ${currentDisciplineTitle.toUpperCase()} CONNECTS ACROSS THE VESSEL`}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? "أعطال السفن لا تحدث في جزر منعزلة؛ يفحص مهندسونا الأنظمة المجاورة لعلاج السبب الجذري."
              : "Shipboard faults do not operate in silos. ME Group engineers cross-examine adjacent systems to resolve root causes."}
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
                <Link
                  href={isAr ? `/ar/services/${rel.slug}` : `/services/${rel.slug}`}
                  className={styles.exploreLink}
                >
                  <span>{isAr ? "استكشف التخصص" : "EXPLORE"}</span>
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
