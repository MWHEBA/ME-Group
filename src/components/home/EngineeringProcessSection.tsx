import React from "react";
import { Container } from "@/components/primitives/Container";
import { PROCESS_STEPS } from "@/content/home";
import styles from "./EngineeringProcessSection.module.css";

export function EngineeringProcessSection() {
  return (
    <section
      className={styles.processSection}
      aria-label="Engineering Workflow Process"
      id="engineering-process"
    >
      <Container>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.kicker}>STANDARDIZED WORKFLOW</span>
            <h2 className={styles.title}>FROM FAULT TO FULL OPERATION.</h2>
          </div>
          <p className={styles.subtitle}>
            A disciplined six-stage engineering sequence ensuring root-cause resolution, verified testing, and documented operational sign-off onboard.
          </p>
        </div>

        {/* Schematic Process Pipeline */}
        <div className={styles.pipelineContainer}>
          {/* Main technical connector line */}
          <div className={styles.connectorLine} aria-hidden="true" />

          <div className={styles.stepsGrid}>
            {PROCESS_STEPS.map((item) => (
              <div key={item.step} className={styles.stepItem}>
                <div className={styles.stepNode}>
                  <div className={styles.stepBadge}>
                    <span className={styles.stepNumber}>{item.step}</span>
                  </div>
                  <div className={styles.stepConnector} aria-hidden="true">
                    <span className={styles.connDot} />
                  </div>
                </div>

                <div className={styles.stepContent}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stageLabel}>STAGE / {item.step}</span>
                    <h3 className={styles.stepTitle}>{item.title}</h3>
                  </div>
                  <p className={styles.stepDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Guarantee / Engineering Note */}
        <div className={styles.processCallout}>
          <div className={styles.calloutTag}>ENGINEERING PROTOCOL</div>
          <p className={styles.calloutText}>
            Every intervention concludes with a formal technical report detailing parameters recorded, parts installed, and post-commissioning performance measurements.
          </p>
        </div>
      </Container>
    </section>
  );
}
