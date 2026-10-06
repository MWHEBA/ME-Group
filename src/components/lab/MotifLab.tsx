"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./MotifLab.module.css";

type MotifApplication = "mask" | "frame" | "divider" | "watermark";

export function MotifLab() {
  const [activeApp, setActiveApp] = useState<MotifApplication>("mask");

  return (
    <section id="me-frame-motif" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.sectionTag}>SPECIMEN 07 // ME FRAME MOTIF SYSTEM</div>
        <h2 className={styles.title}>Brand Geometry &amp; Architectural Motif Exploration</h2>
        <p className={styles.description}>
          Extracting an independent UI geometry from the ME brand silhouette without altering or redrawing the official logo mark.
          The motif is explored as an image mask, a photographic frame, a section transition boundary, and an architectural background watermark.
        </p>
      </div>

      {/* Selector */}
      <div className={styles.selectorBar}>
        <button
          type="button"
          className={`${styles.selectorBtn} ${activeApp === "mask" ? styles.active : ""}`}
          onClick={() => setActiveApp("mask")}
        >
          07.1 GEOMETRIC IMAGE MASK
        </button>
        <button
          type="button"
          className={`${styles.selectorBtn} ${activeApp === "frame" ? styles.active : ""}`}
          onClick={() => setActiveApp("frame")}
        >
          07.2 TECHNICAL APERTURE FRAME
        </button>
        <button
          type="button"
          className={`${styles.selectorBtn} ${activeApp === "divider" ? styles.active : ""}`}
          onClick={() => setActiveApp("divider")}
        >
          07.3 SECTION BOUNDARY ANGLE
        </button>
        <button
          type="button"
          className={`${styles.selectorBtn} ${activeApp === "watermark" ? styles.active : ""}`}
          onClick={() => setActiveApp("watermark")}
        >
          07.4 ARCHITECTURAL WATERMARK
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className={styles.stageCard}>
        
        {/* Application 1: Geometric Image Mask */}
        {activeApp === "mask" && (
          <div className={styles.stageContent}>
            <div className={styles.motifPreviewGrid}>
              <div className={styles.maskedImageContainer}>
                <div className={styles.maskShape}>
                  <Image
                    src="/images/dev/engine-room.svg"
                    alt="Engine room masked"
                    width={800}
                    height={500}
                    className={styles.maskedImg}
                  />
                  <div className={styles.maskBorderOverlay} />
                </div>
              </div>
              <div className={styles.motifExplanation}>
                <span className={styles.motifTag}>CSS CLIP-PATH FORMULA</span>
                <h3 className={styles.motifHeading}>CHAMFERED CORNER BEVEL</h3>
                <p>
                  A subtle 24px corner bevel on opposite diagonal vertices creates instant brand resonance with the ME symbol without needing to show the logo itself.
                </p>
                <div className={styles.codeBlock}>
                  <code>clip-path: polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px));</code>
                </div>
                <div className={styles.usageGuideline}>
                  <strong>Usage rule:</strong> Max 1 masked hero element or featured case study per page. Never repeat continuously.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Application 2: Technical Aperture Frame */}
        {activeApp === "frame" && (
          <div className={styles.stageContent}>
            <div className={styles.motifPreviewGrid}>
              <div className={styles.frameContainer}>
                <div className={styles.apertureFrame}>
                  <div className={styles.apertureTopLeft} />
                  <div className={styles.apertureBottomRight} />
                  <div className={styles.apertureLabel}>TARGET // MSB BUSBAR ALIGNMENT</div>
                  <Image
                    src="/images/dev/switchboard.svg"
                    alt="Switchboard aperture"
                    width={800}
                    height={500}
                    className={styles.frameImg}
                  />
                </div>
              </div>
              <div className={styles.motifExplanation}>
                <span className={styles.motifTag}>VIEWPORT APERTURE BRACKETS</span>
                <h3 className={styles.motifHeading}>PRECISION MEASUREMENT BORDER</h3>
                <p>
                  Combines the ME frame angles with 1px red boundary ticks. Focuses visitor attention onto critical machinery details during technical case demonstrations.
                </p>
                <div className={styles.codeBlock}>
                  <code>border: 1px solid var(--border-inverse); border-left: 3px solid var(--accent);</code>
                </div>
                <div className={styles.usageGuideline}>
                  <strong>Usage rule:</strong> Excellent for technical inspection photos, diagnostic telemetry, and equipment breakdown callouts.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Application 3: Section Boundary Angle */}
        {activeApp === "divider" && (
          <div className={styles.stageContent}>
            <div className={styles.dividerStack}>
              <div className={styles.upperSurface}>
                <span className={styles.surfaceLabel}>UPPER SECTION: LIGHT EDITORIAL (#FFFFFF)</span>
                <h4>PRIMARY SERVICE CAPABILITIES</h4>
              </div>
              <div className={styles.angularDivider}>
                <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className={styles.dividerSvg}>
                  <polygon points="0,0 1200,0 1200,40 600,0 0,40" fill="#121212" />
                  <line x1="0" y1="40" x2="600" y2="0" stroke="#ed1c24" strokeWidth="2" />
                  <line x1="600" y1="0" x2="1200" y2="40" stroke="#ed1c24" strokeWidth="2" />
                </svg>
              </div>
              <div className={styles.lowerSurface}>
                <span className={styles.surfaceLabelDark}>LOWER SECTION: DARK TECHNICAL (#121212)</span>
                <h4 className={styles.whiteHeading}>24/7 RAPID ATTENDANCE DISPATCH</h4>
              </div>
            </div>
          </div>
        )}

        {/* Application 4: Architectural Background Watermark */}
        {activeApp === "watermark" && (
          <div className={styles.stageContent}>
            <div className={styles.watermarkStage}>
              {/* Giant SVG Motif Background */}
              <div className={styles.watermarkBg} aria-hidden="true">
                <svg viewBox="0 0 400 400" className={styles.watermarkSvg}>
                  <path
                    d="M 50 100 L 300 50 L 350 300 L 100 350 Z"
                    fill="none"
                    stroke="rgba(237, 28, 36, 0.08)"
                    strokeWidth="6"
                  />
                  <path
                    d="M 120 160 L 280 130 L 310 270 L 150 300 Z"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.03)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className={styles.watermarkContent}>
                <span className={styles.watermarkTag}>ARCHITECTURAL WATERMARK</span>
                <h3>OVERSIZED BACKGROUND MONOGRAM</h3>
                <p>
                  Very subtle (3% to 8% opacity) hairline geometry sitting behind high-density content columns to ground asymmetric typography and anchor whitespace.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
