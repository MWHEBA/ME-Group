import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import styles from "./RapidSupportBanner.module.css";

export function RapidSupportBanner() {
  return (
    <section className={styles.rapidSection} aria-label="Rapid Support Intervention">
      <Container>
        <div className={styles.bannerContainer}>
          <div className={styles.contentCol}>
            <div className={styles.tagWrap}>
              <span className={styles.indicator} aria-hidden="true" />
              <span className={styles.kicker}>URGENT OPERATIONAL SUPPORT</span>
            </div>
            <h2 className={styles.headline}>
              WHEN DOWNTIME<br />
              ISN&apos;T AN OPTION.
            </h2>
            <p className={styles.bodyText}>
              Machinery breakdowns and electrical blackouts threaten sailing schedules and vessel safety. ME Group mobilizes experienced marine engineering specialists to resolve critical failures onboard swiftly and safely.
            </p>
          </div>

          <div className={styles.actionCol}>
            <div className={styles.actionCard}>
              <div className={styles.cardHeader}>
                <span className={styles.supportLabel}>DISPATCH / URGENT</span>
                <span className={styles.supportCode}>PRIORITY LINE</span>
              </div>
              <p className={styles.cardInfo}>
                Direct connection for active breakdowns, blackouts, or critical propulsion failures.
              </p>
              <div className={styles.ctaGroup}>
                <Link href="/contact/technical-support" className={styles.primaryCta}>
                  <span>REQUEST IMMEDIATE SUPPORT</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <a href="tel:+201000000000" className={styles.phoneLink}>
                  <span className={styles.phoneIcon} aria-hidden="true">☎</span>
                  <span>DIRECT DISPATCH PHONE</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
