import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import styles from "./ServiceConversionCta.module.css";

interface ServiceConversionCtaProps {
  disciplineTitle: string;
  ctaText: string;
  ctaTarget: string;
  ctaParam?: string;
  systemCode: string;
}

export function ServiceConversionCta({
  disciplineTitle,
  ctaText,
  ctaTarget,
  ctaParam,
  systemCode,
}: ServiceConversionCtaProps) {
  const primaryHref = ctaParam
    ? `${ctaTarget}?system=${ctaParam}`
    : ctaTarget;

  return (
    <section className={styles.ctaSection} aria-label="Request Technical Support Action">
      <Container>
        <div className={styles.ctaCard}>
          <div className={styles.headerRow}>
            <span className={styles.kicker}>TECHNICAL INTAKE &amp; DISPATCH</span>
            <span className={styles.code}>DISCIPLINE / {systemCode}</span>
          </div>

          <div className={styles.bodyGrid}>
            <div className={styles.textCol}>
              <h2 className={styles.title}>
                REQUIRE TECHNICAL SUPPORT FOR {disciplineTitle.toUpperCase()}?
              </h2>
              <p className={styles.description}>
                Submit your vessel details, observed equipment parameters, and port schedule. Our marine engineering triage team reviews the technical scope immediately.
              </p>
            </div>

            <div className={styles.buttonCol}>
              <Link href={primaryHref} className={styles.primaryBtn}>
                <span>{ctaText}</span>
                <span className={styles.btnArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
