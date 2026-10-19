import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { TechnicalSupportForm } from "@/components/forms/TechnicalSupportForm";
import styles from "@/app/contact/technical-support/technical-support.module.css";

export const metadata: Metadata = {
  title: "طلب دعم فني بحري | صيانة وعمرة الآلات البحرية | ME Group",
  description:
    "قدم طلب دعم فني منظم لعمرة آلات السفينة، توزيع الطاقة الكهربائية، تشخيص التحكم الآلي والـ PLC، الأنظمة الهوائية، وأجهزة الراديو والملاحة البحرية في الموانئ المصرية ومنطقة قناة السويس.",
};

export default function ArabicTechnicalSupportPage() {
  const contactTabs = [
    { label: "الاستفسارات التجارية", href: "/ar/contact", active: false },
    { label: "طلب دعم فني", href: "/ar/contact/technical-support", active: true },
    { label: "الدعم السريع (طوارئ)", href: "/ar/contact/rapid-support", active: false },
    { label: "طلب قطع غيار", href: "/ar/contact/spare-parts", active: false },
  ];

  return (
    <div className={styles.pageWrap}>
      {/* Channel Switcher Bar */}
      <nav className={styles.tabNav} aria-label="قنوات التواصل">
        <Container>
          <div className={styles.tabList}>
            {contactTabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`${styles.tabItem} ${tab.active ? styles.tabItemActive : ""}`}
                aria-current={tab.active ? "page" : undefined}
              >
                <span>{tab.label}</span>
              </Link>
            ))}
          </div>
        </Container>
      </nav>

      {/* Header Banner */}
      <section className={styles.headerSection} aria-label="رأس صفحة الدعم الفني">
        <Container>
          <div className={styles.headerGrid}>
            <div className={styles.headerContent}>
              <div className={styles.tagRow}>
                <span className={styles.kicker}>الفرز والاستقبال الهندسي</span>
                <span className={styles.tagDivider} aria-hidden="true">/</span>
                <span className={styles.tag}>فرز فني على مدار 24/7</span>
              </div>
              <h1 className={styles.pageTitle}>طلب دعم فني متخصص</h1>
              <p className={styles.pageSubtitle}>
                أدخل بيانات السفينة، الأعراض المرصودة على المعدة، وتفاصيل الآلات. يراجع فريق الفرز الهندسي النطاق الفني، ويطابق مواصفات الشركات المصنعة، ويجهز أجهزة الفحص والمعايرة والمهندسين المعتمدين فوراً.
              </p>
            </div>

            {/* SLA & Readiness Highlights */}
            <div className={styles.highlightsCard} aria-label="القدرات التشغيلية وسرعة الاستجابة">
              <div className={styles.highlightItem}>
                <span className={styles.highlightLabel}>زمن الاستجابة الأولي</span>
                <span className={styles.highlightValue}>&lt; ساعتين للفرز والتشخيص المبدئي</span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.highlightLabel}>النطاق الجغرافي</span>
                <span className={styles.highlightValue}>كافة الموانئ المصرية وقناة السويس</span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.highlightLabel}>جاهزية الأطقم</span>
                <span className={styles.highlightValue}>فرق فحص هندسي معتمدة ميدانياً</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content: Form + Triage Protocol Sidebar */}
      <section className={styles.bodySection} aria-label="نموذج الاستقبال الهندسي وبروتوكول الفرز">
        <Container>
          <div className={styles.contentGrid}>
            {/* Left / Primary Column: Form */}
            <div className={styles.formCol}>
              <TechnicalSupportForm locale="ar" />
            </div>

            {/* Right / Secondary Column: Sidebar */}
            <aside className={styles.sidebarCol} aria-label="إرشادات وبروتوكولات الدعم الفني">
              {/* Card 1: Engineering Triage Workflow */}
              <div className={styles.sidebarCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardKicker}>بروتوكول التدخل</span>
                  <h2 className={styles.cardTitle}>خطوات التدخل الهندسي</h2>
                </div>
                <div className={styles.workflowSteps}>
                  <div className={styles.workflowStep}>
                    <span className={styles.stepNum}>01</span>
                    <div className={styles.stepBody}>
                      <strong className={styles.stepHead}>تقييم النطاق الفني</strong>
                      <p className={styles.stepDesc}>
                        يقوم كبار المهندسين بتحليل الأعراض، رموز الأعطال، ومخططات المصنع لتحديد الأسباب الجذرية.
                      </p>
                    </div>
                  </div>

                  <div className={styles.workflowStep}>
                    <span className={styles.stepNum}>02</span>
                    <div className={styles.stepBody}>
                      <strong className={styles.stepHead}>تجهيز العدد وقطع الغيار</strong>
                      <p className={styles.stepDesc}>
                        تجهيز أدوات القياس والمعايرة الدقيقة وقطع الغيار الأصلية المطلوبة قبل الصعود للسفينة.
                      </p>
                    </div>
                  </div>

                  <div className={styles.workflowStep}>
                    <span className={styles.stepNum}>03</span>
                    <div className={styles.stepBody}>
                      <strong className={styles.stepHead}>التنفيذ الميداني وإصدار التقرير</strong>
                      <p className={styles.stepDesc}>
                        صعود المهندسين على الرصيف أو المخطاف، إتمام العمرة، الاختبار تحت الحمل، وتسليم التقرير الفني الشامل.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Required Information Checklist */}
              <div className={styles.sidebarCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardKicker}>قائمة البيانات المطلوبة</span>
                  <h2 className={styles.cardTitle}>لتسريع الاستجابة والتحرك</h2>
                </div>
                <p className={styles.cardIntro}>
                  توفير البيانات كاملة عند تقديم الطلب يسهم بشكل كبير في حشد المهندسين والمعدات المناسبة فوراً:
                </p>
                <ul className={styles.checklist}>
                  <li className={styles.checkItem}>
                    <span className={styles.checkIcon} aria-hidden="true">■</span>
                    <span>اسم السفينة، رقم الـ IMO، رصيف التراكي / المخطاف الحالي، وموعد الإبحار المتوقع</span>
                  </li>
                  <li className={styles.checkItem}>
                    <span className={styles.checkIcon} aria-hidden="true">■</span>
                    <span>الشركة المصنعة للمعدة، الطراز، والرقم التسلسلي (أو صورة واضحة للوحة البيانات Nameplate)</span>
                  </li>
                  <li className={styles.checkItem}>
                    <span className={styles.checkIcon} aria-hidden="true">■</span>
                    <span>الإنذارات المرصودة، قراءات الضغوط ودرجات الحرارة، والتسلسل الزمني لظهور العطل</span>
                  </li>
                  <li className={styles.checkItem}>
                    <span className={styles.checkIcon} aria-hidden="true">■</span>
                    <span>المخططات الكهربائية أحادية الخط (Single-Line) أو تقارير الخدمة السابقة إن وجدت</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Urgent Breakdown Notice */}
              <div className={`${styles.sidebarCard} ${styles.urgentCard}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.urgentKicker}>عطل حرج أو طارئ؟</span>
                  <h2 className={styles.cardTitle}>طوارئ أثناء الرحلة البحرية</h2>
                </div>
                <p className={styles.urgentText}>
                  إذا كانت سفينتك تواجه موعد إبحار وشيكاً، أو حالة إظلام تام (Blackout)، أو عطل دفع حرجاً، استخدم مسار الطوارئ المباشر.
                </p>
                <div className={styles.cardActions}>
                  <Link href="/ar/contact/rapid-support" className={styles.urgentLink}>
                    <span>طلب دعم سريع فوري ←</span>
                  </Link>
                  <a href="tel:+201012116108" className={styles.hotlineLink}>
                    <span aria-hidden="true">☎</span>
                    <span>فرز طوارئ 24/7: 6108 1211 10 20+</span>
                  </a>
                </div>
              </div>

              {/* Card 4: Need Spare Parts Only */}
              <div className={styles.sidebarCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardKicker}>توريد قطع الغيار فقط</span>
                  <h2 className={styles.cardTitle}>توفير المكونات والقطع</h2>
                </div>
                <p className={styles.cardIntro}>
                  إذا كنت تحتاج فقط إلى أطقم إصلاح أو صمامات أو حساسات أو قطع ميكانيكية أصلية دون الحاجة لحضور مهندسين:
                </p>
                <Link href="/ar/contact/spare-parts" className={styles.secondaryActionBtn}>
                  <span>فتح طلب توريد قطع غيار ←</span>
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
