import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { COMPANY_CONTENT_AR } from "@/content/ar/company";
import { ctasAr } from "@/content/ar/site";
import styles from "@/app/company/approach/approach.module.css";

export const metadata: Metadata = {
  title: COMPANY_CONTENT_AR.approach.seoTitle,
  description: COMPANY_CONTENT_AR.approach.seoDescription,
};

export default function ArabicApproachPage() {
  const { approach } = COMPANY_CONTENT_AR;

  return (
    <div className={styles.pageWrap}>
      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="المنهجية الهندسية">
        <Container>
          <div className={styles.heroInner}>
            <div className={styles.tagRow}>
              <span className={styles.kicker}>{approach.kicker}</span>
              <span className={styles.divider}>/</span>
              <span className={styles.tag}>دورة حياة فنية منضبطة ومنهجية</span>
            </div>

            <h1 className={styles.title}>{approach.heroHeading}</h1>

            <p className={styles.subheading}>{approach.heroSubheading}</p>

            <p className={styles.lead}>{approach.leadStatement}</p>

            <div className={styles.actions}>
              <Link href={ctasAr.technicalSupport.href} className={styles.primaryBtn}>
                <span>طلب دعم فني</span>
                <span aria-hidden="true">←</span>
              </Link>
              <Link href="/ar/services/repair-maintenance" className={styles.secondaryBtn}>
                <span>خدمات الإصلاح والصيانة</span>
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
              <Link href="/ar/company/approach" className={`${styles.subnavLink} ${styles.subnavLinkActive}`}>
                المنهجية الهندسية
              </Link>
            </li>
            <li>
              <Link href="/ar/company/quality-safety" className={styles.subnavLink}>
                الجودة والسلامة
              </Link>
            </li>
          </ul>
        </Container>
      </nav>

      {/* Lifecycle Framework Section */}
      <section className={styles.lifecycleSection} aria-label="بروتوكول التدخل الفني المكون من 5 مراحل">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>البروتوكول التشغيلي</span>
            <h2 className={styles.sectionTitle}>إطار التدخل الفني المكون من 5 مراحل</h2>
            <p className={styles.sectionSubtitle}>{approach.reconciliationNote}</p>
          </div>

          <div className={styles.stagesStack}>
            {approach.lifecycleStages.map((st) => (
              <div key={st.step} className={styles.stageCard}>
                <div className={styles.stageHeader}>
                  <div className={styles.stepNumCol}>
                    <span className={styles.stepNum}>{st.step}</span>
                  </div>
                  <div className={styles.stageTitleCol}>
                    <span className={styles.stageCategory}>مرحلة التدخل</span>
                    <h3 className={styles.stageName}>{st.stageName}</h3>
                  </div>
                </div>

                <div className={styles.stageBody}>
                  <div className={styles.actionBlock}>
                    <span className={styles.blockLabel}>التنفيذ الفني والإجراءات الهندسية</span>
                    <p className={styles.actionText}>{st.technicalAction}</p>
                  </div>

                  <div className={styles.deliverableBlock}>
                    <span className={styles.blockLabel}>مخرجات ومستندات التسليم</span>
                    <p className={styles.deliverableText}>{st.deliverable}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Operational Principles Section */}
      <section className={styles.principlesSection} aria-label="مبادئ التنفيذ التشغيلي">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>تدخل هندسي منضبط</span>
            <h2 className={styles.sectionTitle}>مبادئ تشغيلية تحكم كل مهمة فنية</h2>
            <p className={styles.sectionSubtitle}>
              ثلاثة مبادئ هندسية تضمن حل الأعطال من المرة الأولى والالتزام الصارم بجدول تراكي السفينة.
            </p>
          </div>

          <div className={styles.principlesGrid}>
            {approach.operationalPrinciples.map((p, idx) => (
              <div key={idx} className={styles.principleCard}>
                <div className={styles.principleTop}>
                  <span className={styles.principleNum}>0{idx + 1}</span>
                  <h3 className={styles.principleTitle}>{p.title}</h3>
                </div>
                <p className={styles.principleText}>{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Conversion Banner */}
      <section className={styles.conversionSection} aria-label="طلب دعم فني">
        <Container>
          <div className={styles.conversionCard}>
            <div className={styles.conversionLeft}>
              <span className={styles.convKicker}>الاستقبال والفرز الفني</span>
              <h2 className={styles.convTitle}>هل تحتاج إلى تدخل تشخيصي على سفينتك؟</h2>
              <p className={styles.convDesc}>
                أرسل معاملات سفينتك، والأعراض المرصودة على المعدة، والميناء المستهدف. يُعد فريقنا الهندسي أجهزة الفحص المتطورة والمهندسين المعتمدين فوراً.
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
