import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import { COMPANY_CONTENT_AR } from "@/content/ar/company";
import { ctasAr } from "@/content/ar/site";
import styles from "@/app/company/company.module.css";

export const metadata: Metadata = {
  title: COMPANY_CONTENT_AR.overview.seoTitle,
  description: COMPANY_CONTENT_AR.overview.seoDescription,
};

export default function ArabicCompanyOverviewPage() {
  const { overview } = COMPANY_CONTENT_AR;

  return (
    <div className={styles.pageWrap}>
      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="نظرة عامة على الشركة">
        <Container>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.tagRow}>
                <span className={styles.kicker}>{overview.kicker}</span>
                <span className={styles.divider}>/</span>
                <span className={styles.tag}>هندسة بحرية متكاملة</span>
              </div>

              <h1 className={styles.title}>{overview.heroHeading}</h1>

              <p className={styles.subheading}>{overview.heroSubheading}</p>

              <p className={styles.lead}>{overview.leadStatement}</p>

              <div className={styles.actions}>
                <Link href={ctasAr.technicalSupport.href} className={styles.primaryBtn}>
                  <span>طلب دعم فني</span>
                  <span aria-hidden="true">←</span>
                </Link>
                <Link href="/ar/company/approach" className={styles.secondaryBtn}>
                  <span>منهجيتنا الهندسية</span>
                  <span aria-hidden="true">←</span>
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.visualFrame}>
                <div className={styles.frameHeader}>
                  <span className={styles.frameCode}>ME / CORP-01</span>
                  <span className={styles.frameTag}>الهندسة أولاً</span>
                </div>
                <div className={styles.imageWrap}>
                  <Image
                    src="/images/dev/engineer-working.svg"
                    alt="مهندسو ME Group يجرون فحصاً تشخيصياً على آلات السفينة"
                    width={520}
                    height={340}
                    className={styles.graphicImage}
                    priority
                  />
                </div>
                <div className={styles.frameFooter}>
                  <span className={styles.footerNote}>نزاهة هندسية واحترافية بحرية</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sub-Navigation Bar */}
      <nav className={styles.subnav} aria-label="أقسام الشركة">
        <Container>
          <ul className={styles.subnavList}>
            <li>
              <Link href="/ar/company" className={`${styles.subnavLink} ${styles.subnavLinkActive}`}>
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
              <Link href="/ar/company/quality-safety" className={styles.subnavLink}>
                الجودة والسلامة
              </Link>
            </li>
          </ul>
        </Container>
      </nav>

      {/* Stance Section */}
      <section className={styles.stanceSection} aria-label="الموقف التشغيلي للشركة">
        <Container>
          <div className={styles.stanceBox}>
            <span className={styles.stanceKicker}>موقفنا التشغيلي</span>
            <h2 className={styles.stanceTitle}>متخصصون وخبراء في الهندسة البحرية — ولسنا وسطاء أو وكلاء شحن عموميين</h2>
            <p className={styles.stanceText}>{overview.stance}</p>
          </div>
        </Container>
      </section>

      {/* Core Pillars Grid */}
      <section className={styles.pillarsSection} aria-label="الركائز الهندسية الأربع">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>المبادئ التأسيسية</span>
            <h2 className={styles.sectionTitle}>كيف تصنع ME GROUP الفارق التشغيلي</h2>
            <p className={styles.sectionSubtitle}>
              أربعة التزامات تشغيلية تحكم شراكاتنا مع العملاء ومستوى تنفيذنا الفني الميداني.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            {overview.pillars.map((pillar) => (
              <div key={pillar.number} className={styles.pillarCard}>
                <div className={styles.pillarHeader}>
                  <span className={styles.pillarNum}>{pillar.number}</span>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                </div>
                <p className={styles.pillarSummary}>{pillar.summary}</p>
                <p className={styles.pillarDetail}>{pillar.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Cross-Link Exploration Section */}
      <section className={styles.exploreSection} aria-label="استكشف أقسام الشركة">
        <Container>
          <div className={styles.exploreGrid}>
            <Link href="/ar/company/about" className={styles.exploreCard}>
              <span className={styles.exploreCode}>01 / عن الشركة</span>
              <h3 className={styles.exploreTitle}>من نحن وفلسفتنا</h3>
              <p className={styles.exploreDesc}>
                خلفيتنا المهنية، التخصصات المتكاملة التي نغطيها، والتزامنا الراسخ بالشفافية الفنية.
              </p>
              <span className={styles.exploreCta}>قراءة الملف الفني للشركة ←</span>
            </Link>

            <Link href="/ar/company/approach" className={styles.exploreCard}>
              <span className={styles.exploreCode}>02 / المنهجية</span>
              <h3 className={styles.exploreTitle}>دورة الحياة الهندسية</h3>
              <p className={styles.exploreDesc}>
                دورة حياة فنية من 5 مراحل تبدأ بالمعاينة والتشخيص الدقيق وتنتهي باختبارات التحميل والتسليم.
              </p>
              <span className={styles.exploreCta}>استكشف أسلوب عملنا ←</span>
            </Link>

            <Link href="/ar/company/quality-safety" className={styles.exploreCard}>
              <span className={styles.exploreCode}>03 / الجودة والسلامة</span>
              <h3 className={styles.exploreTitle}>الجودة والسلامة التشغيلية</h3>
              <p className={styles.exploreDesc}>
                بروتوكولات العزل الآمن، أدوات المعايرة الدقيقة، اختبارات التحميل الواقعية، وحماية بيئة العمل.
              </p>
              <span className={styles.exploreCta}>استعراض معايير الجودة ←</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Conversion Banner */}
      <section className={styles.conversionSection} aria-label="تواصل مع الفريق الهندسي">
        <Container>
          <div className={styles.conversionCard}>
            <div className={styles.conversionLeft}>
              <span className={styles.convKicker}>التعاون والجاهزية</span>
              <h2 className={styles.convTitle}>اعتمد على فريق هندسي بحري مسؤول</h2>
              <p className={styles.convDesc}>
                سواء كنت تخطط لأعمال صيانة دورية أثناء توقف السفينة بالميناء أو تحتاج إلى فرز وتشخيص عاجل للأعطال، فريقنا الفني جاهز لمراجعة معاملات معداتك فوراً.
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
