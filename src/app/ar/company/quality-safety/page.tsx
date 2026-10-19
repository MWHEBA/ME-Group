import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { COMPANY_CONTENT_AR } from "@/content/ar/company";
import { ctasAr } from "@/content/ar/site";
import styles from "@/app/company/quality-safety/quality-safety.module.css";

export const metadata: Metadata = {
  title: COMPANY_CONTENT_AR.qualitySafety.seoTitle,
  description: COMPANY_CONTENT_AR.qualitySafety.seoDescription,
};

export default function ArabicQualitySafetyPage() {
  const { qualitySafety } = COMPANY_CONTENT_AR;

  return (
    <div className={styles.pageWrap}>
      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="الجودة والسلامة التشغيلية">
        <Container>
          <div className={styles.heroInner}>
            <div className={styles.tagRow}>
              <span className={styles.kicker}>{qualitySafety.kicker}</span>
              <span className={styles.divider}>/</span>
              <span className={styles.tag}>السلامة والانضباط الفني</span>
            </div>

            <h1 className={styles.title}>{qualitySafety.heroHeading}</h1>

            <p className={styles.subheading}>{qualitySafety.heroSubheading}</p>

            <p className={styles.lead}>{qualitySafety.leadStatement}</p>

            <div className={styles.actions}>
              <Link href={ctasAr.technicalSupport.href} className={styles.primaryBtn}>
                <span>طلب دعم فني</span>
                <span aria-hidden="true">←</span>
              </Link>
              <Link href="/ar/company/approach" className={styles.secondaryBtn}>
                <span>المنهجية الهندسية</span>
                <span aria-hidden="true">←</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Sub-Navigation Bar */}
      <nav className={styles.subnav} aria-label="أقسام الشركة">
        <Container>
          <ul className={styles.subnavList}>
            <li>
              <Link href="/ar/company" className={styles.subnavLink}>
                نظرة عامة
              </Link>
            </li>
            <li>
              <Link href="/ar/company/about" className={styles.subnavLink}>
                من نحن والقيم
              </Link>
            </li>
            <li>
              <Link href="/ar/company/approach" className={styles.subnavLink}>
                المنهجية الهندسية
              </Link>
            </li>
            <li>
              <Link
                href="/ar/company/quality-safety"
                className={`${styles.subnavLink} ${styles.subnavLinkActive}`}
              >
                الجودة والسلامة
              </Link>
            </li>
          </ul>
        </Container>
      </nav>

      {/* Conservative Quality Stance Box */}
      <section className={styles.stanceSection} aria-label="موقف الجودة والسلامة">
        <Container>
          <div className={styles.stanceBox}>
            <span className={styles.stanceKicker}>معايير مثبتة ميدانياً</span>
            <h2 className={styles.stanceTitle}>ممارسات فنية صارمة تفوق الشعارات غير الموثقة</h2>
            <p className={styles.stanceText}>{qualitySafety.conservativeStance}</p>
          </div>
        </Container>
      </section>

      {/* Principles Grid */}
      <section className={styles.principlesSection} aria-label="مبادئ السلامة والجودة الأربعة">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>الضوابط الفنية الأساسية</span>
            <h2 className={styles.sectionTitle}>بروتوكولات السلامة التشغيلية الأربعة</h2>
            <p className={styles.sectionSubtitle}>
              ضوابط تشغيلية صارمة نطبقها في كافة التدخلات الميكانيكية والكهربائية والهوائية على السفن.
            </p>
          </div>

          <div className={styles.principlesGrid}>
            {qualitySafety.principles.map((pr) => (
              <div key={pr.code} className={styles.principleCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.principleCode}>{pr.code}</span>
                  <h3 className={styles.principleTitle}>{pr.title}</h3>
                </div>
                <p className={styles.principleDesc}>{pr.description}</p>
                <div className={styles.focusBlock}>
                  <span className={styles.focusLabel}>محاور التركيز التشغيلي:</span>
                  <ul className={styles.focusList}>
                    {pr.focusAreas.map((item, idx) => (
                      <li key={idx} className={styles.focusItem}>
                        <span className={styles.marker} aria-hidden="true">
                          ■
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Conversion Banner */}
      <section className={styles.conversionSection} aria-label="تواصل مع الفريق الهندسي">
        <Container>
          <div className={styles.conversionCard}>
            <div className={styles.conversionLeft}>
              <span className={styles.convKicker}>الدعم الهندسي</span>
              <h2 className={styles.convTitle}>تدخلات فنية آمنة ومنهجية على متن السفينة</h2>
              <p className={styles.convDesc}>
                تواصل مع ME Group لترتيب المعاينة الفنية، الصيانة الوقائية، أو الإصلاحات التصحيحية تحت أعلى بروتوكولات الأمان والسلامة.
              </p>
            </div>
            <div className={styles.conversionRight}>
              <Link href={ctasAr.technicalSupport.href} className={styles.convBtn}>
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
