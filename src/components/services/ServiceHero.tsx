import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import styles from "./ServiceHero.module.css";

interface ServiceHeroProps {
  number: string;
  kicker: string;
  categoryTitle: string;
  title: string;
  heroSubheading: string;
  leadParagraph: string;
  ctaText: string;
  ctaTarget: string;
  ctaParam?: string;
  imagePath: string;
  imageAlt: string;
}

export function ServiceHero({
  number,
  kicker,
  categoryTitle,
  title,
  heroSubheading,
  leadParagraph,
  ctaText,
  ctaTarget,
  ctaParam,
  imagePath,
  imageAlt,
}: ServiceHeroProps) {
  const primaryHref = ctaParam
    ? `${ctaTarget}?system=${ctaParam}`
    : ctaTarget;

  return (
    <section className={styles.heroSection} aria-label={`${title} Overview`}>
      <Container>
        <div className={styles.heroGrid}>
          {/* Left: Content */}
          <div className={styles.contentCol}>
            <div className={styles.kickerRow}>
              <span className={styles.numberBadge}>{number}</span>
              <span className={styles.kicker}>{kicker}</span>
              <span className={styles.divider}>/</span>
              <span className={styles.category}>{categoryTitle}</span>
            </div>

            <h1 className={styles.title}>{title}</h1>

            <p className={styles.subheading}>{heroSubheading}</p>

            <p className={styles.lead}>{leadParagraph}</p>

            <div className={styles.actions}>
              <Link href={primaryHref} className={styles.primaryBtn}>
                <span>{ctaText}</span>
                <span className={styles.btnArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right: Technical Visual Representation */}
          <div className={styles.visualCol}>
            <div className={styles.visualFrame}>
              <div className={styles.frameHeader}>
                <span className={styles.frameCode}>SYS / {number}</span>
                <span className={styles.frameStatus}>CONFIRMED CAPABILITY</span>
              </div>
              <div className={styles.imageWrap}>
                <Image
                  src={imagePath}
                  alt={imageAlt}
                  width={560}
                  height={380}
                  className={styles.graphicImage}
                  priority
                />
              </div>
              <div className={styles.frameFooter}>
                <span className={styles.footerNote}>ME GROUP ENGINEERING ARCHITECTURE</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
