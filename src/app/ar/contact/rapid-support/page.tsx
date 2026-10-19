import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { RapidSupportForm } from "@/components/forms/RapidSupportForm";
import styles from "@/app/contact/rapid-support/rapid-support.module.css";

export const metadata: Metadata = {
  title: "الدعم الفني السريع | بلاغات الأعطال البحرية الطارئة | ME Group",
  description:
    "استقبال فني عاجل ذو أولوية لأعطال المعدات البحرية النشطة، حالات الإظلام التام (Blackout)، أو أعطال محركات الدفع التي تتطلب تدخلاً فورياً.",
};

export default function ArabicRapidSupportPage() {
  return (
    <div className={styles.pageWrap}>
      {/* Dark Urgent Header */}
      <section className={styles.headerSection} aria-label="رأس صفحة الدعم الفني السريع">
        <Container>
          <div className={styles.headerContent}>
            <div className={styles.tagRow}>
              <span className={styles.pulseDot} aria-hidden="true" />
              <span className={styles.kicker}>خط الفرز ذو الأولوية القصوى</span>
            </div>
            <h1 className={styles.pageTitle}>الدعم الفني السريع للطوارئ</h1>
            <p className={styles.pageSubtitle}>
              مسار استقبال تشغيلي مباشر ومبسط للأعطال الحرجة وحالات الإظلام التام وأعطال الآلات التي تهدد رحلة السفينة.
            </p>
          </div>
        </Container>
      </section>

      {/* Direct Phone / Form Split */}
      <section className={styles.bodySection} aria-label="نموذج الدعم السريع والاتصال المباشر">
        <Container>
          <div className={styles.contentGrid}>
            {/* Left: Rapid Form */}
            <div className={styles.formCol}>
              <RapidSupportForm locale="ar" />
            </div>

            {/* Right: Direct Dispatch Info Card */}
            <div className={styles.infoCol}>
              <div className={styles.infoCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.infoTag}>بروتوكول الطوارئ</span>
                </div>
                <h3 className={styles.infoTitle}>التصعيد الهاتفي الفوري</h3>
                <p className={styles.infoDesc}>
                  إذا كانت سفينتك تواجه حالة طوارئ نشطة أو موعد إبحار فوري لا يحتمل الانتظار، اتصل مباشرة بمسؤول الفرز الفني.
                </p>

                <div className={styles.contactBlock}>
                  <span className={styles.blockLabel}>الخط الساخن للفرز التشغيلي 24/7</span>
                  <a href="tel:+201012116108" className={styles.hotlineLink}>
                    <span className={styles.phoneIcon} aria-hidden="true">☎</span>
                    <span>الفرز الفني: 6108 1211 10 20+</span>
                  </a>
                </div>

                <div className={styles.protocolNotes}>
                  <div className={styles.noteItem}>
                    <span className={styles.noteDot} aria-hidden="true">■</span>
                    <span>تحرك فوري للمهندسين بأجهزة الفحص والتشخيص البحري المتخصصة.</span>
                  </div>
                  <div className={styles.noteItem}>
                    <span className={styles.noteDot} aria-hidden="true">■</span>
                    <span>فرز وتشخيص فني أولي يتم خلال المكالمة الهاتفية التوجيهية الأولى.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
