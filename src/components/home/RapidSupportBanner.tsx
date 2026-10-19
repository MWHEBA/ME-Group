import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import styles from "./RapidSupportBanner.module.css";

interface RapidSupportBannerProps {
  locale?: "en" | "ar";
}

export function RapidSupportBanner({ locale = "en" }: RapidSupportBannerProps) {
  const isArabic = locale === "ar";

  return (
    <section
      className={styles.rapidSection}
      aria-label={isArabic ? "التدخل والدعم الفني السريع" : "Rapid Support Intervention"}
    >
      <Container>
        <div className={styles.bannerContainer}>
          <div className={styles.contentCol}>
            <div className={styles.tagWrap}>
              <span className={styles.indicator} aria-hidden="true" />
              <span className={styles.kicker}>
                {isArabic ? "دعم تشغيلي فوري وطارئ" : "URGENT OPERATIONAL SUPPORT"}
              </span>
            </div>
            <h2 className={styles.headline}>
              {isArabic ? (
                <>
                  عندما يكون توقف السفينة<br />
                  خارج الحسابات.
                </>
              ) : (
                <>
                  WHEN DOWNTIME<br />
                  ISN&apos;T AN OPTION.
                </>
              )}
            </h2>
            <p className={styles.bodyText}>
              {isArabic
                ? "الأعطال المفاجئة في الآلات أو انقطاع الطاقة الكهربائية (Blackout) يهدد جداول الإبحار وسلامة السفينة. تحشد ME Group نخبة من مهندسي البحرية ذوي الخبرة للتدخل السريع وحل الأعطال الحرجة بأعلى معايير الأمان."
                : "Machinery breakdowns and electrical blackouts threaten sailing schedules and vessel safety. ME Group mobilizes experienced marine engineering specialists to resolve critical failures onboard swiftly and safely."}
            </p>
          </div>

          <div className={styles.actionCol}>
            <div className={styles.actionCard}>
              <div className={styles.cardHeader}>
                <span className={styles.supportLabel}>
                  {isArabic ? "غرفة الطوارئ / تدخل عاجل" : "DISPATCH / URGENT"}
                </span>
                <span className={styles.supportCode}>
                  {isArabic ? "خط أولوية فوري" : "PRIORITY LINE"}
                </span>
              </div>
              <p className={styles.cardInfo}>
                {isArabic
                  ? "اتصال مباشر لحالات التوقف المفاجئ، انقطاع التيار، أو أعطال منظومة الدفع الحرجة."
                  : "Direct connection for active breakdowns, blackouts, or critical propulsion failures."}
              </p>
              <div className={styles.ctaGroup}>
                <Link
                  href={isArabic ? "/ar/contact/technical-support" : "/contact/technical-support"}
                  className={styles.primaryCta}
                >
                  <span>{isArabic ? "طلب دعم هندسي عاجل" : "REQUEST IMMEDIATE SUPPORT"}</span>
                  <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
                </Link>
                <a href="tel:+201012116108" className={styles.phoneLink}>
                  <span className={styles.phoneIcon} aria-hidden="true">☎</span>
                  <span>{isArabic ? "طوارئ العمليات: +20 1012116108" : "DISPATCH: +20 1012116108"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
