import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { LabNav } from "@/components/lab/LabNav";
import { HeroConceptsLab } from "@/components/lab/HeroConceptsLab";
import { UiUxCritiqueMatrix } from "@/components/lab/UiUxCritiqueMatrix";
import { TypographyLab } from "@/components/lab/TypographyLab";
import { SurfaceLab } from "@/components/lab/SurfaceLab";
import { CtaLab } from "@/components/lab/CtaLab";
import { GraphicLanguageLab } from "@/components/lab/GraphicLanguageLab";
import { MotifLab } from "@/components/lab/MotifLab";
import { PhotographyLab } from "@/components/lab/PhotographyLab";
import { MotionLab } from "@/components/lab/MotionLab";
import { ComponentLanguageLab } from "@/components/lab/ComponentLanguageLab";
import styles from "./lab.module.css";

export const metadata: Metadata = {
  title: "ME Group Visual Lab // Phase 2 Design System & Art Direction",
  description: "Interactive brand art direction board, typography laboratory, surface architecture, and 3 distinct hero concepts for ME Group.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VisualLabPage() {
  return (
    <main className={styles.labMain}>
      {/* Visual Lab Master Banner */}
      <section className={styles.heroBanner}>
        <Container>
          <div className={styles.bannerInner}>
            <div className={styles.phaseTag}>
              <span className={styles.livePulse} />
              <span>PHASE 2 // VISUAL LAB &amp; BRAND PROTOTYPE</span>
            </div>
            
            <h1 className={styles.bannerTitle}>
              ME GROUP DIGITAL ART DIRECTION BOARD
            </h1>

            <p className={styles.bannerSubtitle}>
              Interactive design laboratory testing typography hypotheses, surface contrast matrices, engineering graphic language, CSS-native mechanical motion, and three distinct hero concepts for ME Group (Marine Engineering Group).
            </p>

            <div className={styles.bannerMetaGrid}>
              <div className={styles.metaItem}>
                <span className={styles.metaKey}>STATUS:</span>
                <span className={styles.metaValHighlight}>PROPOSED — AWAITING VISUAL APPROVAL</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaKey}>PRIMARY POSITIONING:</span>
                <span className={styles.metaVal}>KEEPING VESSELS MOVING.</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaKey}>CREATIVE GOAL:</span>
                <span className={styles.metaVal}>Heavy Industrial • Technical Depth • Non-Template</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sticky Navigation */}
      <LabNav />

      {/* Lab Specimens Container */}
      <Container>
        <div className={styles.labSections}>
          {/* 01. Hero Concepts */}
          <HeroConceptsLab />

          {/* 02. UI/UX Design Skill Critique Matrix */}
          <UiUxCritiqueMatrix />

          {/* 03. Typography Exploration */}
          <TypographyLab />

          {/* 04. Color & Surface Lab */}
          <SurfaceLab />

          {/* 05. CTA System */}
          <CtaLab />

          {/* 06. Engineering Graphic Language */}
          <GraphicLanguageLab />

          {/* 07. ME Frame Motif */}
          <MotifLab />

          {/* 08. Photography & Media Direction */}
          <PhotographyLab />

          {/* 09. Motion Lab */}
          <MotionLab />

          {/* 10. Technical Component Language */}
          <ComponentLanguageLab />

          {/* Phase 2 Sign-Off Summary Card */}
          <section className={styles.signOffCard}>
            <div className={styles.signOffHeader}>
              <span className={styles.signOffTag}>PHASE 2 REVIEW SUMMARY</span>
              <span className={styles.signOffBadge}>STOP CONDITION REACHED</span>
            </div>
            <div className={styles.signOffBody}>
              <h3>Next Step: Creative Direction &amp; Hero Direction Selection</h3>
              <p>
                Visual exploration for Phase 2 is complete. Production of the final homepage, service forms, and subpages remains on hold until visual approval and hero selection are confirmed.
              </p>
              <div className={styles.recommendationsList}>
                <div className={styles.recItem}>
                  <strong>Typography Recommendation:</strong> Retain <em>Hypothesis 1</em> (Barlow Condensed 700 + Barlow + IBM Plex Mono) for superior industrial authority and maritime legibility.
                </div>
                <div className={styles.recItem}>
                  <strong>Color &amp; Contrast Recommendation:</strong> Decouple <code>--color-brand-red (#ed1c24)</code> for logo/branding from <code>--color-brand-red-action (#d9141b)</code> to achieve 100% WCAG AA (4.85:1) compliance for small text and primary buttons.
                </div>
                <div className={styles.recItem}>
                  <strong>Motion Vocabulary:</strong> Zero JavaScript animation libraries. Use CSS-native <code>cubic-bezier(0.2, 0, 0, 1)</code> transitions with full <code>prefers-reduced-motion</code> compliance.
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
