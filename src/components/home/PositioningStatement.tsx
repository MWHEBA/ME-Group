import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import styles from "./PositioningStatement.module.css";

export function PositioningStatement() {
  return (
    <section className={styles.positioningSection} aria-label="ME Group Positioning Statement">
      <Container>
        <div className={styles.sectionGrid}>
          {/* Left Column: Editorial Statement */}
          <div className={styles.statementCol}>
            <span className={styles.kicker}>INTEGRATED MARINE ENGINEERING</span>
            <h2 className={styles.headline}>
              ONE ENGINEERING PARTNER.<br />
              MULTIPLE CRITICAL SYSTEMS.
            </h2>
            <p className={styles.leadParagraph}>
              Modern vessels cannot afford fragmented troubleshooting. ME Group delivers cohesive technical support across mechanical machinery, high-power electrical distribution, automated control logic, and pneumatic systems — restoring operational reliability with singular accountability.
            </p>
            <div className={styles.actionWrap}>
              <Link href="/company" className={styles.textLink}>
                <span>ABOUT OUR ENGINEERING STANDARDS</span>
                <span className={styles.arrow}>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Indexed Disciplines & Technical Callout */}
          <div className={styles.disciplinesCol}>
            <div className={styles.disciplinesCard}>
              <div className={styles.cardHeader}>
                <span className={styles.headerTag}>SYSTEM INTERFACES</span>
                <span className={styles.headerStatus}>TOTAL INTEGRATION</span>
              </div>

              <div className={styles.disciplineList}>
                <div className={styles.disciplineItem}>
                  <span className={styles.itemCode}>01</span>
                  <div className={styles.itemContent}>
                    <h3>MECHANICAL PROPULSION</h3>
                    <p>Engines, turbochargers, heavy centrifugal pumps, and auxiliary rotating machinery.</p>
                  </div>
                </div>

                <div className={styles.disciplineItem}>
                  <span className={styles.itemCode}>02</span>
                  <div className={styles.itemContent}>
                    <h3>ELECTRICAL POWER</h3>
                    <p>Main 440V switchboards, synchronizing breakers, marine generators, and digital AVRs.</p>
                  </div>
                </div>

                <div className={styles.disciplineItem}>
                  <span className={styles.itemCode}>03</span>
                  <div className={styles.itemContent}>
                    <h3>AUTOMATION &amp; CONTROL</h3>
                    <p>PLC architectures, alarm monitoring (AMS), power management (PMS), and safety loops.</p>
                  </div>
                </div>

                <div className={styles.disciplineItem}>
                  <span className={styles.itemCode}>04</span>
                  <div className={styles.itemContent}>
                    <h3>PNEUMATICS &amp; VALVES</h3>
                    <p>30-bar starting air compressors, dryers, cylinders, and maneuvering valve assemblies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
