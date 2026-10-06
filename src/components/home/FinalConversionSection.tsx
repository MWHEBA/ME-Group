import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import styles from "./FinalConversionSection.module.css";

export function FinalConversionSection() {
  return (
    <section
      className={styles.conversionSection}
      aria-label="Action and Technical Inquiry"
    >
      <Container>
        <div className={styles.conversionBox}>
          {/* Engineering Frame Geometry */}
          <div className={styles.frameCornerTL} aria-hidden="true" />
          <div className={styles.frameCornerBR} aria-hidden="true" />

          <div className={styles.innerContent}>
            <span className={styles.kicker}>READY FOR DISPATCH &amp; CONSULTATION</span>

            <h2 className={styles.headline}>
              KEEP YOUR VESSEL<br />
              OPERATIONAL.
            </h2>

            <p className={styles.supportingText}>
              Talk to our engineering team about your technical requirements, maintenance needs, or marine spare parts.
            </p>

            <div className={styles.ctaRow}>
              <Link
                href="/contact/technical-support"
                className={styles.primaryCta}
              >
                <span>REQUEST TECHNICAL SUPPORT</span>
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/contact"
                className={styles.secondaryCta}
              >
                <span>GENERAL ENQUIRY</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
