import React from "react";
import { Container } from "@/components/primitives/Container";
import { WHY_ME_GROUP } from "@/content/home";
import { WHY_ME_GROUP_AR } from "@/content/ar/home";
import styles from "./WhyMeGroupSection.module.css";

interface WhyMeGroupSectionProps {
  locale?: "en" | "ar";
}

export function WhyMeGroupSection({ locale = "en" }: WhyMeGroupSectionProps) {
  const isArabic = locale === "ar";
  const pillars = isArabic ? WHY_ME_GROUP_AR : WHY_ME_GROUP;

  return (
    <section
      className={styles.whySection}
      aria-label={isArabic ? "لماذا تختار مجموعة الهندسة البحرية" : "Why Choose ME Group"}
    >
      <Container>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.kicker}>
              {isArabic ? "المصداقية والاعتمادية التشغيلية" : "OPERATIONAL CREDIBILITY"}
            </span>
            <h2 className={styles.title}>
              {isArabic ? "لماذا تختار الشراكة مع ME GROUP" : "WHY PARTNER WITH ME GROUP"}
            </h2>
          </div>
          <p className={styles.subtitle}>
            {isArabic
              ? "مؤسسة هندسية بحرية متخصصة تقدم كفاءات فنية متعددة التخصصات، استجابة ميدانية فورية، ونزاهة هندسية موثوقة."
              : "A dedicated marine engineering organisation delivering multidisciplinary competence, rapid field response, and technical integrity."}
          </p>
        </div>

        {/* 4 Pillars Editorial Grid */}
        <div className={styles.pillarsGrid}>
          {pillars.map((pillar, idx) => (
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
