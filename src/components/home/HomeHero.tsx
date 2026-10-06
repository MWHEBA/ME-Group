"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import styles from "./HomeHero.module.css";

export function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Safe fallback for autoplay policies: muted is supported by all modern browsers
      });
    }
  }, []);

  return (
    <section className={styles.heroSection} aria-label="ME Group Marine Engineering Hero">
      {/* Background Full-Bleed Video Layer */}
      <div className={styles.videoField} aria-hidden="true">
        <video
          ref={videoRef}
          className={styles.nativeVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.webp"
        >
          <source src="/videos/hero-cinematic.mp4" type="video/mp4" />
          <source src="/videos/background-video.mp4" type="video/mp4" />
        </video>
        {/* Soft Cinematic Left Gradient */}
        <div className={styles.gradientOverlay} />
      </div>

      {/* Restrained Engineering Graphic Identity Layer */}
      <div className={styles.engineeringOverlay} aria-hidden="true">
        <Container>
          <div className={styles.overlayInner}>
            {/* ME Frame Corner Motifs */}
            <div className={styles.frameCornerTL} />
            <div className={styles.frameCornerTR} />
            <div className={styles.frameCornerBL} />
            <div className={styles.frameCornerBR} />

            {/* Subtle 1px Schematic Path */}
            <svg viewBox="0 0 1000 120" className={styles.schematicPath}>
              <line x1="20" y1="60" x2="220" y2="60" stroke="rgba(237, 28, 36, 0.45)" strokeWidth="1" />
              <circle cx="220" cy="60" r="3" fill="#ed1c24" />
              <line x1="220" y1="60" x2="250" y2="90" stroke="rgba(237, 28, 36, 0.45)" strokeWidth="1" />
              <line x1="250" y1="90" x2="480" y2="90" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="3,3" />
            </svg>
          </div>
        </Container>
      </div>

      {/* Foreground Semantic Content */}
      <Container>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeadline}>
            <span>KEEPING</span>
            <span className={styles.headlineAccent}>VESSELS</span>
            <span>MOVING.</span>
          </h1>

          <div className={styles.heroSubtitle}>
            Marine Engineering, Maintenance &amp; Vessel Support.
          </div>

          <p className={styles.heroSupporting}>
            Integrated technical support across mechanical, electrical, automation and pneumatic systems.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/contact/technical-support" className={styles.ctaPrimary}>
              <span>REQUEST TECHNICAL SUPPORT</span>
              <span className={styles.arrowIcon}>→</span>
            </Link>
            <Link href="#systems" className={styles.ctaSecondary}>
              <span>EXPLORE CAPABILITIES</span>
              <span className={styles.arrowIcon}>↓</span>
            </Link>
          </div>

          {/* 4-System Category Rail */}
          <div className={styles.systemRail}>
            <Link href="/services/mechanical" className={styles.railItem}>
              <span className={styles.railCode}>MECH / 01</span>
              <span className={styles.railName}>MECHANICAL</span>
            </Link>
            <div className={styles.railDivider} />
            <Link href="/services/electrical" className={styles.railItem}>
              <span className={styles.railCode}>ELEC / 02</span>
              <span className={styles.railName}>ELECTRICAL</span>
            </Link>
            <div className={styles.railDivider} />
            <Link href="/services/automation" className={styles.railItem}>
              <span className={styles.railCode}>AUTO / 03</span>
              <span className={styles.railName}>AUTOMATION</span>
            </Link>
            <div className={styles.railDivider} />
            <Link href="/services/pneumatic" className={styles.railItem}>
              <span className={styles.railCode}>PNEU / 04</span>
              <span className={styles.railName}>PNEUMATIC</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
