import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { CAPABILITIES_CONTENT_AR } from "@/content/ar/capabilities";
import { ctasAr } from "@/content/ar/site";
import styles from "@/app/capabilities/capabilities.module.css";

export const metadata: Metadata = {
  title: CAPABILITIES_CONTENT_AR.seoTitle,
  description: CAPABILITIES_CONTENT_AR.seoDescription,
};

export default function ArabicCapabilitiesPage() {
  const {
    kicker,
    heroHeading,
    heroSubheading,
    leadStatement,
    categories,
    crossDisciplineScenarios,
  } = CAPABILITIES_CONTENT_AR;

  return (
    <div className={styles.pageWrap}>
      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="نظرة عامة على القدرات الفنية">
        <Container>
          <div className={styles.heroInner}>
            <div className={styles.kickerRow}>
              <span className={styles.kicker}>{kicker}</span>
              <span className={styles.divider}>/</span>
              <span className={styles.scopeTag}>محفظة فنية معتمدة ومثبتة</span>
            </div>

            <h1 className={styles.heroTitle}>{heroHeading}</h1>

            <p className={styles.heroSub}>{heroSubheading}</p>

            <p className={styles.leadText}>{leadStatement}</p>

            <div className={styles.heroActions}>
              <Link href={ctasAr.technicalSupport.href} className={styles.primaryBtn}>
                <span>طلب دعم فني</span>
                <span aria-hidden="true">←</span>
              </Link>
              <Link href="/ar/services" className={styles.secondaryBtn}>
                <span>دليل الخدمات المتكاملة</span>
                <span aria-hidden="true">←</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Cross-Disciplinary Problem Navigation */}
      <section className={styles.crossScenariosSection} aria-label="سيناريوهات الأعطال متداخلة التخصصات">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>رؤية هندسية متكاملة</span>
            <h2 className={styles.sectionTitle}>لماذا تتداخل أعطال السفن بين التخصصات</h2>
            <p className={styles.sectionSubtitle}>
              غالباً ما ينشأ إنذار تشغيلي واحد من تداخل بين الخلوصات الميكانيكية، ودوائر الإثارة الكهربائية، والمنطق البرمجي للأتمتة.
            </p>
          </div>

          <div className={styles.scenariosGrid}>
            {crossDisciplineScenarios.map((scen) => (
              <div key={scen.id} className={styles.scenarioCard}>
                <div className={styles.scenTop}>
                  <span className={styles.scenBadge}>تحليل العطل</span>
                  <h3 className={styles.scenTitle}>{scen.title}</h3>
                </div>

                <div className={styles.symptomBox}>
                  <span className={styles.label}>العَرَض التشغيلي المرصود</span>
                  <p className={styles.symptomText}>{scen.observedSymptom}</p>
                </div>

                <div className={styles.disciplinesBox}>
                  <span className={styles.label}>المنظومات المشاركة في الحل</span>
                  <div className={styles.disciplinesList}>
                    {scen.disciplinesInvolved.map((d, dIdx) => (
                      <div key={dIdx} className={styles.disciplineRow}>
                        <div className={styles.discBadgeCol}>
                          <span className={styles.discCode}>SYS / {d.code}</span>
                          <span className={styles.discName}>{d.name}</span>
                        </div>
                        <p className={styles.discRole}>{d.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.resolutionBox}>
                  <span className={styles.label}>الحل الهندسي المتكامل من ME GROUP</span>
                  <p className={styles.resolutionText}>{scen.integratedResolution}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Equipment & Systems Matrix */}
      <section className={styles.matrixSection} aria-label="مصفوفة الآلات والمعدات">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>محفظة المعدات</span>
            <h2 className={styles.sectionTitle}>المصفوفة الفنية للآلات والمعدات</h2>
            <p className={styles.sectionSubtitle}>
              المعدات المعتمدة التي نتعامل معها في محركات الدفع، توليد الطاقة، لوحات التوزيع، الأتمتة، خطوط السوائل، وإلكترونيات الملاحة.
            </p>
          </div>

          <div className={styles.categoriesStack}>
            {categories.map((cat) => (
              <div key={cat.id} className={styles.categoryBlock}>
                <div className={styles.categoryBlockHeader}>
                  <div className={styles.catTitleWrap}>
                    <span className={styles.catCode}>{cat.code}</span>
                    <h3 className={styles.catTitle}>{cat.title}</h3>
                  </div>
                  <p className={styles.catSummary}>{cat.summary}</p>
                </div>

                <div className={styles.equipmentCardsGrid}>
                  {cat.equipmentList.map((eq, eqIdx) => (
                    <div key={eqIdx} className={styles.eqCard}>
                      <div className={styles.eqCardHeader}>
                        <span className={styles.primaryBadge}>{eq.primaryDiscipline}</span>
                        <Link href={eq.serviceRoute} className={styles.serviceLink}>
                          <span>تفاصيل التخصص</span>
                          <span aria-hidden="true">←</span>
                        </Link>
                      </div>

                      <h4 className={styles.eqName}>{eq.name}</h4>
                      <p className={styles.eqScope}>{eq.scopeSummary}</p>

                      <div className={styles.eqRelated}>
                        <span className={styles.relatedLabel}>تتداخل وتتكامل مع:</span>
                        <div className={styles.relatedTags}>
                          {eq.relatedDisciplines.map((rel, rIdx) => (
                            <span key={rIdx} className={styles.relTag}>
                              {rel}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Capabilities Conversion Action */}
      <section className={styles.actionSection} aria-label="طلب تدخل فني للمعدات">
        <Container>
          <div className={styles.actionCard}>
            <div className={styles.actionLeft}>
              <span className={styles.actionKicker}>الاستقبال الهندسي</span>
              <h2 className={styles.actionTitle}>هل تتطلب معدات سفينتك تدخلاً فحصياً أو صيانة؟</h2>
              <p className={styles.actionDesc}>
                حدد طراز المعدة والشركة المصنعة والأعراض المرصودة. يتولى فريقنا الهندسي تجهيز أجهزة الفحص المتطورة والمهندسين المتخصصين.
              </p>
            </div>
            <div className={styles.actionRight}>
              <Link href={ctasAr.technicalSupport.href} className={styles.actionBtn}>
                <span>طلب دعم فني</span>
                <span aria-hidden="true">←</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
