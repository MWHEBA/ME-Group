import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { serviceTaxonomyGroupsAR } from "@/content/ar/services";
import { ctasAr } from "@/content/ar/site";
import styles from "@/app/services/services-index.module.css";

export const metadata: Metadata = {
  title: "خدمات الهندسة البحرية والقدرات الفنية المتكاملة | ME Group",
  description:
    "دعم هندسي بحري متكامل يغطي الأنظمة الميكانيكية، الطاقة الكهربائية، التحكم الآلي، الأنظمة الهوائية، الإصلاح والصيانة، وخدمات دعم وتجهيز السفن.",
};

export default function ArabicServicesLandingPage() {
  return (
    <div className={styles.pageWrap}>
      {/* Editorial Hero */}
      <section className={styles.heroSection} aria-label="نظرة عامة على الخدمات">
        <Container>
          <div className={styles.heroInner}>
            <div className={styles.heroTagRow}>
              <span className={styles.heroKicker}>منظومة الخدمات الهندسية</span>
              <span className={styles.heroDivider}>/</span>
              <span className={styles.heroTag}>دعم فني متكامل للسفن</span>
            </div>

            <h1 className={styles.heroTitle}>
              خدمات هندسية بحرية متكاملة وموثوقة.
            </h1>

            <p className={styles.heroLead}>
              تدعم ME Group المنظومات الفنية للسفن عبر التخصصات الميكانيكية والكهربائية والتحكم الآلي والأنظمة الهوائية — مدعومة ببرامج صيانة منضبطة، توريد سريع لقطع الغيار الأصلية، تجهيز شامل للسفن بالمستلزمات، وإلكترونيات الراديو والملاحة المتخصصة.
            </p>

            <div className={styles.heroActions}>
              <Link href={ctasAr.technicalSupport.href} className={styles.primaryBtn}>
                <span>طلب دعم فني</span>
                <span aria-hidden="true">←</span>
              </Link>
              <Link href="/ar/capabilities" className={styles.secondaryBtn}>
                <span>مصفوفة القدرات الفنية</span>
                <span aria-hidden="true">←</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Discipline Taxonomy (Groups A, B, C, D) */}
      <section className={styles.taxonomySection} aria-label="تصنيف الخدمات الهندسية">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>تصنيف الخدمات</span>
            <h2 className={styles.sectionTitle}>ثمانية تخصصات فنية أساسية عبر أربعة مستويات متكاملة</h2>
            <p className={styles.sectionSubtitle}>
              هيكل تنظيمي منضبط يغطي: المنظومات الهندسية الحيوية، برامج الصيانة المجدولة، التجهيز اللوجستي للسفن، وإلكترونيات الملاحة والاتصالات.
            </p>
          </div>

          <div className={styles.groupsStack}>
            {serviceTaxonomyGroupsAR.map((group) => (
              <div key={group.slug} className={styles.groupBlock}>
                <div className={styles.groupHeader}>
                  <div className={styles.groupTitleWrap}>
                    <span className={styles.groupCode}>{group.code}</span>
                    <h3 className={styles.groupTitle}>{group.title}</h3>
                  </div>
                  <p className={styles.groupSummary}>{group.summary}</p>
                </div>

                <div className={styles.servicesGrid}>
                  {group.services.map((svc) => (
                    <Link
                      key={svc.slug}
                      href={svc.href}
                      className={styles.serviceCard}
                    >
                      <div className={styles.cardTop}>
                        <span className={styles.serviceNum}>{svc.number}</span>
                        <span className={styles.cardArrow} aria-hidden="true">
                          ←
                        </span>
                      </div>
                      <h4 className={styles.serviceTitle}>{svc.title}</h4>
                      <p className={styles.serviceSummary}>{svc.summary}</p>
                      <div className={styles.cardFooter}>
                        <span className={styles.exploreText}>استعراض نطاق التخصص ←</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Problem-Based Navigation Entry Points */}
      <section className={styles.problemSection} aria-label="توجيه الدعم الفني بحسب نوع المشكلة">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>التوجيه التشغيلي السريع</span>
            <h2 className={styles.sectionTitle}>ما الذي تحتاجه سفينتك الآن؟</h2>
            <p className={styles.sectionSubtitle}>
              مسارات فنية مباشرة ومخصصة وفقاً لنوع العطل التشغيلي النشط على متن السفينة.
            </p>
          </div>

          <div className={styles.problemGrid}>
            <Link
              href="/ar/contact/technical-support?system=mechanical"
              className={styles.problemCard}
            >
              <span className={styles.problemTag}>عطل ميكانيكي</span>
              <h3 className={styles.problemTitle}>أعطال المحركات أو المضخات</h3>
              <p className={styles.problemDesc}>
                أعطال محرك الدفع الرئيسي أو المساعد، سخونة مياه التبريد، تسريب سيلات الطلمبات، أو الاهتزازات غير الطبيعية.
              </p>
              <span className={styles.problemCta}>طلب فحص ميكانيكي ←</span>
            </Link>

            <Link
              href="/ar/contact/technical-support?system=electrical"
              className={styles.problemCard}
            >
              <span className={styles.problemTag}>عطل كهربائي</span>
              <h3 className={styles.problemTitle}>فصل القواطع أو المولدات</h3>
              <p className={styles.problemDesc}>
                إنذارات أعطال الأرضي، فصل القواطع الهوائية، تذبذب جهد الـ AVR، أو سخونة ملفات المحركات الكهربائية.
              </p>
              <span className={styles.problemCta}>طلب فحص كهربائي ←</span>
            </Link>

            <Link
              href="/ar/contact/technical-support?system=automation"
              className={styles.problemCard}
            >
              <span className={styles.problemTag}>عطل تحكم وأتمتة</span>
              <h3 className={styles.problemTitle}>أعطال الـ PLC أو إنذارات الـ AMS</h3>
              <p className={styles.problemDesc}>
                أخطاء دوائر الحساسات، فشل المزامنة التلقائية للمولدات، مشكلات لوجيك الـ PMS، أو إنذارات الحريق والغازات.
              </p>
              <span className={styles.problemCta}>طلب فحص تحكم آلي ←</span>
            </Link>

            <Link
              href="/ar/contact/technical-support?system=pneumatic"
              className={styles.problemCard}
            >
              <span className={styles.problemTag}>عطل أنظمة هوائية</span>
              <h3 className={styles.problemTitle}>بطء الضواغط أو تسريب الهواء</h3>
              <p className={styles.problemDesc}>
                بطء شحن هواء بدء التشغيل، تسريب صمامات السولينويد، تصلب المشغلات الهوائية، أو رطوبة خطوط الهواء.
              </p>
              <span className={styles.problemCta}>طلب فحص أنظمة هوائية ←</span>
            </Link>

            <Link href="/ar/contact/spare-parts" className={styles.problemCard}>
              <span className={styles.problemTag}>طلب قطع غيار</span>
              <h3 className={styles.problemTitle}>توفير عاجل لقطع الغيار</h3>
              <p className={styles.problemDesc}>
                مطابقة أرقام القطع الأصلية أو لوحات بيانات المعدات للمحركات، المضخات، القواطع، والصمامات.
              </p>
              <span className={styles.problemCta}>طلب قطع غيار ←</span>
            </Link>

            <Link href="/ar/contact/rapid-support" className={styles.problemCardHighlight}>
              <div className={styles.rapidHeader}>
                <span className={styles.rapidDot} aria-hidden="true" />
                <span className={styles.problemTag}>فرز فني عاجل للطوارئ</span>
              </div>
              <h3 className={styles.problemTitle}>استجابة سريعة 24/7</h3>
              <p className={styles.problemDesc}>
                أعطال فنية حرجة أو حالات إظلام تام تتطلب فرزاً هندسياً فورياً وتحركاً ميدانياً عاجلاً للسفينة.
              </p>
              <span className={styles.problemCta}>تفعيل الدعم السريع ←</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Cross-Discipline Integration Banner */}
      <section className={styles.crossBannerSection} aria-label="القيمة الهندسية المتكاملة">
        <Container>
          <div className={styles.crossBannerCard}>
            <div className={styles.crossBannerLeft}>
              <span className={styles.crossKicker}>الفارق الذي تصنعه ME GROUP</span>
              <h2 className={styles.crossTitle}>
                التشخيص متعدد التخصصات ينهي تكرار الأعطال تماماً.
              </h2>
              <p className={styles.crossLead}>
                غالباً ما تتخطى أعطال السفن الحدود الفنية التقليدية. ينسق مهندسونا بين التخصصات الميكانيكية والكهربائية والأتمتة والهواء تحت بروتوكول هندسي مسؤول وموحد.
              </p>
            </div>
            <div className={styles.crossBannerRight}>
              <Link href="/ar/capabilities" className={styles.crossBtn}>
                <span>استكشف مصفوفة القدرات الفنية</span>
                <span aria-hidden="true">←</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
