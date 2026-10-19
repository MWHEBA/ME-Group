import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { COMPANY_CONTENT_AR } from "@/content/ar/company";
import { ctasAr } from "@/content/ar/site";
import styles from "@/app/company/about/about.module.css";

export const metadata: Metadata = {
  title: COMPANY_CONTENT_AR.about.seoTitle,
  description: COMPANY_CONTENT_AR.about.seoDescription,
};

export default function ArabicAboutPage() {
  const { about } = COMPANY_CONTENT_AR;

  return (
    <div className={styles.pageWrap}>
      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="عن مجموعة ME Group">
        <Container>
          <div className={styles.heroInner}>
            <div className={styles.tagRow}>
              <span className={styles.kicker}>{about.kicker}</span>
              <span className={styles.divider}>/</span>
              <span className={styles.tag}>قاعدة هندسية تطبيقية راسخة</span>
            </div>

            <h1 className={styles.title}>{about.heroHeading}</h1>

            <p className={styles.subheading}>{about.heroSubheading}</p>

            <p className={styles.lead}>{about.leadStatement}</p>

            <div className={styles.actions}>
              <Link href={ctasAr.technicalSupport.href} className={styles.primaryBtn}>
                <span>طلب دعم فني</span>
                <span aria-hidden="true">←</span>
              </Link>
              <Link href="/ar/services" className={styles.secondaryBtn}>
                <span>منظومة الخدمات المتكاملة</span>
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
              <Link href="/ar/company/about" className={`${styles.subnavLink} ${styles.subnavLinkActive}`}>
                من نحن والقيم
              </Link>
            </li>
            <li>
              <Link href="/ar/company/approach" className={styles.subnavLink}>
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

      {/* Core Operational Scope */}
      <section className={styles.scopeSection} aria-label="النطاق التشغيلي المتكامل">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>سبعة مجالات هندسية متكاملة</span>
            <h2 className={styles.sectionTitle}>أين نطبق خبراتنا المتخصصة</h2>
            <p className={styles.sectionSubtitle}>{about.coreDisciplinesSummary}</p>
          </div>

          <div className={styles.disciplinesGrid}>
            <Link href="/ar/services/mechanical" className={styles.discCard}>
              <span className={styles.discNum}>01</span>
              <h3 className={styles.discTitle}>الهندسة الميكانيكية</h3>
              <p className={styles.discDesc}>
                محركات الدفع الرئيسية، المولدات المساعدة، المضخات البحرية، وخطوط الوقود والتبريد.
              </p>
              <span className={styles.discLink}>استعراض النطاق ←</span>
            </Link>

            <Link href="/ar/services/electrical" className={styles.discCard}>
              <span className={styles.discNum}>02</span>
              <h3 className={styles.discTitle}>الطاقة الكهربائية والتوزيع</h3>
              <p className={styles.discDesc}>
                المولدات البحرية، كروت الـ AVR، لوحات التوزيع الرئيسية، القواطع الهوائية، وأعطال الأرضي.
              </p>
              <span className={styles.discLink}>استعراض النطاق ←</span>
            </Link>

            <Link href="/ar/services/automation" className={styles.discCard}>
              <span className={styles.discNum}>03</span>
              <h3 className={styles.discTitle}>التحكم الآلي والأتمتة</h3>
              <p className={styles.discDesc}>
                المتحكمات البرمجية PLCs، أنظمة الإنذار والمراقبة AMS، مزامنة الأحمال PMS، ودوائر الحساسات.
              </p>
              <span className={styles.discLink}>استعراض النطاق ←</span>
            </Link>

            <Link href="/ar/services/pneumatic" className={styles.discCard}>
              <span className={styles.discNum}>04</span>
              <h3 className={styles.discTitle}>الأنظمة الهوائية</h3>
              <p className={styles.discDesc}>
                ضواغط هواء بدء التشغيل، البساتم والأسطوانات، أطقم الحشو والعزل، وصمامات التحكم الكهربية.
              </p>
              <span className={styles.discLink}>استعراض النطاق ←</span>
            </Link>

            <Link href="/ar/services/repair-maintenance" className={styles.discCard}>
              <span className={styles.discNum}>05</span>
              <h3 className={styles.discTitle}>الإصلاح والصيانة</h3>
              <p className={styles.discDesc}>
                دورة حياة فنية من 5 مراحل، برامج صيانة وقائية، واستجابة سريعة للأعطال الطارئة.
              </p>
              <span className={styles.discLink}>استعراض النطاق ←</span>
            </Link>

            <Link href="/ar/services/spare-parts" className={styles.discCard}>
              <span className={styles.discNum}>06</span>
              <h3 className={styles.discTitle}>قطع الغيار البحرية</h3>
              <p className={styles.discDesc}>
                مطابقة أرقام القطع الأصلية ولوحات بيانات الآلات لمختلف المعدات الميكانيكية والكهربائية.
              </p>
              <span className={styles.discLink}>استعراض النطاق ←</span>
            </Link>

            <Link href="/ar/services/vessel-support" className={styles.discCard}>
              <span className={styles.discNum}>07</span>
              <h3 className={styles.discTitle}>دعم وتجهيز السفن</h3>
              <p className={styles.discDesc}>
                المستهلكات الفنية، عدد غرفة الماكينات، مياه الشرب العذبة، الإعاشة، وحقائب الإسعافات.
              </p>
              <span className={styles.discLink}>استعراض النطاق ←</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Transparency & Integrity Section */}
      <section className={styles.transparencySection} aria-label="النزاهة والشفافية الفنية">
        <Container>
          <div className={styles.transparencyHeader}>
            <span className={styles.sectionKicker}>ممارسة هندسية قائمة على النزاهة</span>
            <h2 className={styles.sectionTitle}>شفافية كاملة قبل وأثناء وبعد كل تدخل فني</h2>
            <p className={styles.sectionSubtitle}>{about.transparencyPhilosophy}</p>
          </div>

          <div className={styles.pointsGrid}>
            {about.transparencyPoints.map((point, idx) => (
              <div key={idx} className={styles.pointCard}>
                <div className={styles.pointTop}>
                  <span className={styles.pointNum}>0{idx + 1}</span>
                  <h3 className={styles.pointTitle}>{point.title}</h3>
                </div>
                <p className={styles.pointDetail}>{point.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Conversion Banner */}
      <section className={styles.conversionSection} aria-label="تواصل مع ME Group">
        <Container>
          <div className={styles.conversionCard}>
            <div className={styles.conversionLeft}>
              <span className={styles.convKicker}>الدعم الهندسي</span>
              <h2 className={styles.convTitle}>اختبر فارق الدقة والوضوح الفني</h2>
              <p className={styles.convDesc}>
                تواصل مع مكتب الفرز والتشخيص الهندسي لدينا لمناقشة حالة آلات سفينتك، أو فحص الأنظمة الكهربائية، أو جدولة أعمال الصيانة القادمة.
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
