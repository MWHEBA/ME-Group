"use client";

import React, { useState } from "react";
import styles from "./LabNav.module.css";

interface SectionLink {
  id: string;
  label: string;
  badge?: string;
}

const SECTIONS: SectionLink[] = [
  { id: "hero-concepts", label: "01. HERO EXPLORATION", badge: "4 Concepts (Video)" },
  { id: "ui-ux-critique", label: "02. UI/UX CRITIQUE MATRIX", badge: "Skill QA" },
  { id: "typography-lab", label: "03. TYPOGRAPHY LAB", badge: "2 Hypotheses" },
  { id: "color-surface-lab", label: "04. COLOR & SURFACE", badge: "Contrast QA" },
  { id: "cta-system", label: "05. CTA SYSTEM", badge: "4 Hierarchy Levels" },
  { id: "engineering-graphics", label: "06. GRAPHIC LANGUAGE", badge: "Schematics" },
  { id: "me-frame-motif", label: "07. ME FRAME MOTIF", badge: "Geometry" },
  { id: "photography-media", label: "08. PHOTOGRAPHY & MEDIA", badge: "10 Scenarios" },
  { id: "motion-lab", label: "09. MOTION LAB", badge: "CSS Native" },
  { id: "component-language", label: "10. COMPONENT PROTOTYPES", badge: "5 Layouts" },
];

export function LabNav() {
  const [activeSection, setActiveSection] = useState<string>("hero-concepts");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={styles.labNav} aria-label="Visual Lab Navigation">
      <div className={styles.labNavInner}>
        <div className={styles.labBrand}>
          <span className={styles.labIndicator} aria-hidden="true" />
          <span className={styles.labTitle}>ME GROUP / VISUAL LAB</span>
          <span className={styles.labPhaseBadge}>PHASE 2 REVIEW</span>
        </div>
        <div className={styles.linksContainer}>
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              className={`${styles.navButton} ${activeSection === sec.id ? styles.active : ""}`}
              onClick={() => scrollToSection(sec.id)}
            >
              <span className={styles.linkLabel}>{sec.label}</span>
              {sec.badge && <span className={styles.badge}>{sec.badge}</span>}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
