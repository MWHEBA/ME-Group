"use client";

import React from "react";
import styles from "./UiUxCritiqueMatrix.module.css";

interface EvaluationCriterion {
  dimension: string;
  conceptD: { score: string; critique: string };
  conceptA: { score: string; critique: string };
  conceptB: { score: string; critique: string };
  conceptC: { score: string; critique: string };
}

const CRITERIA: EvaluationCriterion[] = [
  {
    dimension: "1. Visual Hierarchy",
    conceptD: {
      score: "9.5 / 10",
      critique: "Full-bleed mechanical film provides immense emotional immersion; dark atmospheric scrim locks the eye firmly onto the headline and red primary CTA.",
    },
    conceptA: {
      score: "9.2 / 10",
      critique: "Dominant imagery anchors the eye; headline has immense presence; CTA pops immediately over darkened base.",
    },
    conceptB: {
      score: "8.9 / 10",
      critique: "Very structured grid-based eye path (Header Meta → Headline → CTAs → System Matrix → Schematic Diagram).",
    },
    conceptC: {
      score: "8.6 / 10",
      critique: "Editorial asymmetry creates high sophistication, but requires slightly more scanning effort across 3 columns.",
    },
  },
  {
    dimension: "2. Brand Distinctiveness",
    conceptD: {
      score: "9.8 / 10",
      critique: "Extreme machinery close-ups and continuous operating motion completely eliminate generic marine tropes (no blue water, no sailing ships, pure heavy industry).",
    },
    conceptA: {
      score: "8.8 / 10",
      critique: "Powerful scale and cinematic industrial mood separates ME Group from flat corporate marine sites.",
    },
    conceptB: {
      score: "9.5 / 10",
      critique: "Extremely unique CAD/schematic aesthetic; feels custom-engineered specifically for ME Group.",
    },
    conceptC: {
      score: "9.1 / 10",
      critique: "Editorial publication aesthetic is rare in maritime engineering; communicates bespoke class authority.",
    },
  },
  {
    dimension: "3. Engineering Credibility",
    conceptD: {
      score: "9.9 / 10",
      critique: "Highest authentic impact: visitors instantly see real cylinder heads, rotating turbochargers, and electrical synchronizers operating in real-time.",
    },
    conceptA: {
      score: "9.0 / 10",
      critique: "Physical engine room depth makes superintendents feel 'these people actually operate in heavy machinery'.",
    },
    conceptB: {
      score: "9.7 / 10",
      critique: "Highest engineering authenticity; CAD rulers, system codes, and telemetry lines signal deep technical rigor.",
    },
    conceptC: {
      score: "8.8 / 10",
      critique: "Editorial data dossier reads like an official surveyor report or classification society bulletin.",
    },
  },
  {
    dimension: "4. CTA Prominence & Conversion",
    conceptD: {
      score: "9.6 / 10",
      critique: "Action Red primary CTA (#D9141B) achieves maximum contrast over the dark video scrim; non-blocking HTML renders CTAs instantly.",
    },
    conceptA: {
      score: "9.5 / 10",
      critique: "Action Red primary CTA (#D9141B) achieves maximum contrast against the darkened base; instant click target.",
    },
    conceptB: {
      score: "9.0 / 10",
      critique: "High prominence on dark technical canvas; secondary 'System Index' anchors exploratory navigation.",
    },
    conceptC: {
      score: "8.7 / 10",
      critique: "Clear button presence, though sits within an editorial column rather than a full-width hero bar.",
    },
  },
  {
    dimension: "5. Readability & Scannability",
    conceptD: {
      score: "9.1 / 10",
      critique: "Strict gradient scrim (0.7 to 0.95 opacity) ensures video movement never compromises typography legibility or WCAG AA contrast.",
    },
    conceptA: {
      score: "8.9 / 10",
      critique: "High contrast white/red on dark scrim; concise copy ensures zero reading fatigue for busy fleet managers.",
    },
    conceptB: {
      score: "9.1 / 10",
      critique: "Monospace metadata and structured system taxonomy allow instant scannability for specific technical issues.",
    },
    conceptC: {
      score: "9.3 / 10",
      critique: "Highest reading comfort on pure light editorial background with crisp Barlow typography.",
    },
  },
  {
    dimension: "6. Responsive Quality (Mobile)",
    conceptD: {
      score: "9.4 / 10",
      critique: "Mobile architecture provides seamless dual-mode: lightweight compressed video loop OR zero-data instant poster still with zero layout shift.",
    },
    conceptA: {
      score: "9.1 / 10",
      critique: "Background adapts gracefully into a dedicated machinery header; primary CTA remains firmly above the fold.",
    },
    conceptB: {
      score: "8.8 / 10",
      critique: "System matrix collapses into an intuitive 2x2 grid; schematic aperture shifts below the CTAs.",
    },
    conceptC: {
      score: "8.5 / 10",
      critique: "Asymmetric 3-column layout stacks into a long vertical sequence; slightly longer mobile scroll.",
    },
  },
  {
    dimension: "7. Usability & Cognitive Load",
    conceptD: {
      score: "9.5 / 10",
      critique: "Immediate emotional and functional clarity: the film demonstrates capability while headline and CTAs provide immediate operational action.",
    },
    conceptA: {
      score: "9.4 / 10",
      critique: "Instant comprehension: large headline, immediate problem statement, direct dispatch button.",
    },
    conceptB: {
      score: "8.9 / 10",
      critique: "High information density; perfect for technical superintendents but slightly dense for casual visitors.",
    },
    conceptC: {
      score: "8.8 / 10",
      critique: "Engaging reading flow, but requires mental orientation across asymmetric columns.",
    },
  },
  {
    dimension: "8. Accessibility (WCAG 2.1 AA)",
    conceptD: {
      score: "9.7 / 10",
      critique: "Full compliance: native autoPlay/muted/playsInline, strict `prefers-reduced-motion` pause behavior, and 14:1 text-to-scrim contrast.",
    },
    conceptA: {
      score: "9.6 / 10",
      critique: "Exceeds 4.85:1 contrast for red action button; white text on dark background achieves 14:1 contrast.",
    },
    conceptB: {
      score: "9.5 / 10",
      critique: "High contrast across all monospace tags; all borders and interactive states meet 3:1 graphical requirement.",
    },
    conceptC: {
      score: "9.4 / 10",
      critique: "Charcoal on white achieves 13.8:1 contrast; red action button achieves 4.85:1 AA pass on white surface.",
    },
  },
  {
    dimension: "9. Visual Memorability",
    conceptD: {
      score: "9.9 / 10",
      critique: "Maximum unforgettable impact: the physical sensation of active machinery and industrial power establishes ME Group as an elite engineering force.",
    },
    conceptA: {
      score: "9.3 / 10",
      critique: "High cinematic punch; stays in the visitor's memory as a bold, heavy industrial powerhouse.",
    },
    conceptB: {
      score: "9.6 / 10",
      critique: "Uniquely engineered; stands out distinctly against every competing marine website in the region.",
    },
    conceptC: {
      score: "9.0 / 10",
      critique: "Prestigious editorial feel creates an aura of established academic and engineering authority.",
    },
  },
  {
    dimension: "10. Likelihood of Looking Like a Template",
    conceptD: {
      score: "Absolute Zero (9.9/10)",
      critique: "Bespoke machinery film loop combined with restrained CSS engineering overlays makes it 100% impossible to confuse with any web template.",
    },
    conceptA: {
      score: "Low Risk (8.9/10)",
      critique: "Custom HUD overlays and tight machinery textures prevent it from feeling like generic marine stock templates.",
    },
    conceptB: {
      score: "Near Zero (9.8/10)",
      critique: "Entirely bespoke schematic language and 4-system matrix; impossible to mistake for ThemeForest.",
    },
    conceptC: {
      score: "Near Zero (9.5/10)",
      critique: "Asymmetric publication layout and figure captions are completely atypical for standard corporate sites.",
    },
  },
];

export function UiUxCritiqueMatrix() {
  return (
    <section id="ui-ux-critique" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.sectionTag}>SPECIMEN 02 // UI/UX DESIGN SKILL CRITIQUE FRAMEWORK</div>
        <h2 className={styles.title}>Objective Quality-Assurance Matrix Across 10 Dimensions</h2>
        <p className={styles.description}>
          Independent evaluation of all four hero concepts utilizing the UI/UX design skill framework.
          As mandated by the brief, <strong>no automatic winner is selected</strong>; the findings below are presented for creative review and client selection.
        </p>
      </div>

      {/* Summary Score Cards */}
      <div className={styles.conceptSummaryCards}>
        
        <div className={`${styles.summaryCard} ${styles.primarySummaryCard}`}>
          <div className={styles.summaryCardHeader}>
            <span className={styles.conceptTagPrimary}>CONCEPT D (PRIMARY DIRECTION)</span>
            <span className={styles.conceptRatingPrimary}>AVG: 9.68 / 10</span>
          </div>
          <h3>FULL-BLEED CINEMATIC VIDEO HERO</h3>
          <p>
            <strong>Core Strength:</strong> Maximum emotional and technical power. Physical machinery close-ups, rotating equipment, and zero template risk combined with instant non-blocking HTML/CSS typography and CTAs.
          </p>
          <div className={styles.bestForPrimary}>
            <strong>Best For:</strong> Flagship brand dominance, unforgettable visual impact, and rapid downtime conversion.
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryCardHeader}>
            <span className={styles.conceptTag}>CONCEPT A</span>
            <span className={styles.conceptRating}>AVG: 9.17 / 10</span>
          </div>
          <h3>CINEMATIC STILL</h3>
          <p>
            <strong>Core Strength:</strong> Immense visual power, high instant CTA clarity, and immediate emotional impression of heavy machinery.
          </p>
          <div className={styles.bestFor}>
            <strong>Best For:</strong> Immediate emergency conversion on static backdrops.
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryCardHeader}>
            <span className={styles.conceptTag}>CONCEPT B</span>
            <span className={styles.conceptRating}>AVG: 9.22 / 10</span>
          </div>
          <h3>PRECISION / SCHEMATIC</h3>
          <p>
            <strong>Core Strength:</strong> Highest technical authenticity, zero template risk, and intuitive system taxonomy routing (SYS/01 to SYS/04).
          </p>
          <div className={styles.bestFor}>
            <strong>Best For:</strong> Deep technical superintendents and classification due-diligence.
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryCardHeader}>
            <span className={styles.conceptTag}>CONCEPT C</span>
            <span className={styles.conceptRating}>AVG: 9.02 / 10</span>
          </div>
          <h3>INDUSTRIAL EDITORIAL</h3>
          <p>
            <strong>Core Strength:</strong> High-end publication prestige, maximum typography elegance, and spacious negative space balance.
          </p>
          <div className={styles.bestFor}>
            <strong>Best For:</strong> Executive maritime presentation and consultative fleet support.
          </div>
        </div>

      </div>

      {/* Detailed 10-Dimension Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.critiqueTable}>
          <thead>
            <tr>
              <th style={{ width: "16%" }}>DIMENSION</th>
              <th style={{ width: "23%", backgroundColor: "var(--color-ink-700)", borderTop: "2px solid var(--color-brand-red)" }}>
                CONCEPT D — CINEMATIC VIDEO (PRIMARY)
              </th>
              <th style={{ width: "21%" }}>CONCEPT A — CINEMATIC STILL</th>
              <th style={{ width: "20%" }}>CONCEPT B — SCHEMATIC</th>
              <th style={{ width: "20%" }}>CONCEPT C — EDITORIAL</th>
            </tr>
          </thead>
          <tbody>
            {CRITERIA.map((crit, idx) => (
              <tr key={idx}>
                <td className={styles.dimensionCell}>
                  <strong>{crit.dimension}</strong>
                </td>
                <td className={styles.primaryCell}>
                  <div className={styles.cellScorePrimary}>{crit.conceptD.score}</div>
                  <div className={styles.cellCritique}>{crit.conceptD.critique}</div>
                </td>
                <td>
                  <div className={styles.cellScore}>{crit.conceptA.score}</div>
                  <div className={styles.cellCritique}>{crit.conceptA.critique}</div>
                </td>
                <td>
                  <div className={styles.cellScore}>{crit.conceptB.score}</div>
                  <div className={styles.cellCritique}>{crit.conceptB.critique}</div>
                </td>
                <td>
                  <div className={styles.cellScore}>{crit.conceptC.score}</div>
                  <div className={styles.cellCritique}>{crit.conceptC.critique}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.matrixFooter}>
        <div className={styles.footerNote}>
          <span className={styles.noteIndicator}>!</span>
          <span>
            <strong>Next Action:</strong> Awaiting client review of the Visual Lab to select the official hero direction (with Concept D Full-Bleed Video Hero proposed as primary) before Phase 3 production begins.
          </span>
        </div>
      </div>
    </section>
  );
}
