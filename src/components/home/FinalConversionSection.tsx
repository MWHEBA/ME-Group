import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import styles from "./FinalConversionSection.module.css";

interface FinalConversionSectionProps {
  locale?: "en" | "ar";
}

export function FinalConversionSection({ locale = "en" }: FinalConversionSectionProps) {
  const isArabic = locale === "ar";

  return (
    <section
      className={styles.conversionSection}
      aria-label={isArabic ? "طلب الخدمة الفنية والتواصل" : "Action and Technical Inquiry"}
    >
      <Container>
        <div className={styles.conversionBox}>
          {/* Engineering Frame Geometry */}
          <div className={styles.frameCornerTL} aria-hidden="true" />
          <div className={styles.frameCornerBR} aria-hidden="true" />

          <div className={styles.innerContent}>
            <span className={styles.kicker}>
              {isArabic ? "جاهزية تامة للاستجابة والتحرك الميداني" : "READY FOR DISPATCH & CONSULTATION"}
            </span>

            <h2 className={styles.headline}>
              {isArabic ? (
                <>
                  حافظ على استقرار وجاهزية<br />
                  عمليات سفينتك.
                </>
              ) : (
                <>
                  KEEP YOUR VESSEL<br />
                  OPERATIONAL.
                </>
              )}
            </h2>

            <p className={styles.supportingText}>
              {isArabic
                ? "تواصل مع فريقنا الهندسي لمناقشة المتطلبات الفنية، خطط الصيانة الوقائية والعمرات، أو احتياجات قطع الغيار البحرية."
                : "Talk to our engineering team about your technical requirements, maintenance needs, or marine spare parts."}
            </p>

            <div className={styles.ctaRow}>
              <Link
                href={isArabic ? "/ar/contact/technical-support" : "/contact/technical-support"}
                className={styles.primaryCta}
              >
                <span>{isArabic ? "طلب دعم فني بحري" : "REQUEST TECHNICAL SUPPORT"}</span>
                <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
              </Link>

              <Link
                href={isArabic ? "/ar/contact" : "/contact"}
                className={styles.secondaryCta}
              >
                <span>{isArabic ? "استفسارات عامة" : "GENERAL ENQUIRY"}</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
