"use client";

import React from "react";
import styles from "./GraphicLanguageLab.module.css";

export function GraphicLanguageLab() {
  return (
    <section id="engineering-graphics" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.sectionTag}>SPECIMEN 06 // ENGINEERING GRAPHIC LANGUAGE</div>
        <h2 className={styles.title}>Schematic Vocabulary &amp; Industrial Taxonomy</h2>
        <p className={styles.description}>
          Developing a bespoke, architectural graphic system inspired by marine engineering drawings, classification society certificates, and telemetry consoles.
          All elements are disciplined visual markers, strictly avoiding sci-fi HUD cliches.
        </p>
      </div>

      <div className={styles.gridContainer}>
        
        {/* Module 1: System Taxonomic Tags */}
        <div className={styles.moduleCard}>
          <div className={styles.moduleHeader}>
            <span className={styles.moduleTag}>06.1 TAXONOMY TAGS</span>
            <span className={styles.statusLive}>STANDARDIZED</span>
          </div>
          <div className={styles.moduleBody}>
            <div className={styles.tagsDisplay}>
              <div className={styles.sysTagItem}>
                <span className={styles.tagCode}>SYS / 01</span>
                <span className={styles.tagName}>PROPULSION &amp; AUX ENGINES</span>
                <span className={styles.tagStatus}>OPERATIONAL</span>
              </div>
              <div className={styles.sysTagItem}>
                <span className={styles.tagCode}>ELEC / 02</span>
                <span className={styles.tagName}>440V POWER &amp; SWITCHBOARDS</span>
                <span className={styles.tagStatus}>OPERATIONAL</span>
              </div>
              <div className={styles.sysTagItem}>
                <span className={styles.tagCode}>AUTO / 03</span>
                <span className={styles.tagName}>PLC &amp; ALARM MONITORING</span>
                <span className={styles.tagStatus}>STANDBY</span>
              </div>
              <div className={styles.sysTagItem}>
                <span className={styles.tagCode}>PNEUM / 04</span>
                <span className={styles.tagName}>30-BAR COMPRESSION SYSTEMS</span>
                <span className={styles.tagStatus}>OPERATIONAL</span>
              </div>
              <div className={styles.sysTagItem}>
                <span className={styles.tagCode}>MECH / 05</span>
                <span className={styles.tagName}>PUMPS, VALVES &amp; PIPING</span>
                <span className={styles.tagStatus}>ACTIVE</span>
              </div>
            </div>
            <div className={styles.caption}>
              Used across section kickers, card headers, and service index rails.
            </div>
          </div>
        </div>

        {/* Module 2: Precision Dimension & Measurement Rulers */}
        <div className={styles.moduleCard}>
          <div className={styles.moduleHeader}>
            <span className={styles.moduleTag}>06.2 MEASUREMENT RULES &amp; CALIPER FRAMES</span>
            <span className={styles.statusLive}>ARCHITECTURAL</span>
          </div>
          <div className={styles.moduleBody}>
            <div className={styles.measurementFrame}>
              <div className={styles.rulerTop}>
                <span>0.00</span>
                <span>|</span>
                <span>250 MM</span>
                <span>|</span>
                <span>500 MM</span>
                <span>|</span>
                <span>750 MM</span>
                <span>|</span>
                <span>1000 MM</span>
              </div>
              <div className={styles.measurementContent}>
                <div className={styles.crosshair}>
                  <div className={styles.crosshairH} />
                  <div className={styles.crosshairV} />
                  <span className={styles.crosshairPoint}>+ SENSOR 01</span>
                </div>
                <div className={styles.caliperCallout}>
                  <span className={styles.caliperVal}>TOLERANCE ± 0.015 MM</span>
                  <span className={styles.caliperRef}>REF: ME-ALIGN-408</span>
                </div>
              </div>
              <div className={styles.rulerBottom}>
                <span className={styles.dimLabel}>SPAN: 1,000 MM ACCREDITED ISO 9001:2015</span>
              </div>
            </div>
            <div className={styles.caption}>
              Subtle dimension overlays integrated into photography containers and specification tables.
            </div>
          </div>
        </div>

        {/* Module 3: Diagnostic Brackets & Status Matrices */}
        <div className={styles.moduleCard}>
          <div className={styles.moduleHeader}>
            <span className={styles.moduleTag}>06.3 DIAGNOSTIC BRACKETS &amp; METADATA CALLOUTS</span>
            <span className={styles.statusLive}>DATA-LAYER</span>
          </div>
          <div className={styles.moduleBody}>
            <div className={styles.bracketsContainer}>
              <div className={styles.bracketBlock}>
                <div className={styles.bracketCornerTL} />
                <div className={styles.bracketCornerTR} />
                <div className={styles.bracketCornerBL} />
                <div className={styles.bracketCornerBR} />
                <div className={styles.bracketContent}>
                  <div className={styles.bracketKicker}>TELEMETRY // ON-CALL DESK</div>
                  <div className={styles.bracketVal}>24/7/365</div>
                  <div className={styles.bracketSub}>RAPID MOBILIZATION SUEZ / ARABIAN GULF</div>
                </div>
              </div>

              <div className={styles.bracketBlock}>
                <div className={styles.bracketCornerTL} />
                <div className={styles.bracketCornerTR} />
                <div className={styles.bracketCornerBL} />
                <div className={styles.bracketCornerBR} />
                <div className={styles.bracketContent}>
                  <div className={styles.bracketKicker}>COMPLIANCE CERTIFICATION</div>
                  <div className={styles.bracketVal}>CLASS 3.1</div>
                  <div className={styles.bracketSub}>IACS VERIFIED SPARES &amp; PROCEDURES</div>
                </div>
              </div>
            </div>
            <div className={styles.caption}>
              Encapsulates critical operational commitments without marketing hyperbole.
            </div>
          </div>
        </div>

        {/* Module 4: 1px Schematic Bus lines */}
        <div className={styles.moduleCard}>
          <div className={styles.moduleHeader}>
            <span className={styles.moduleTag}>06.4 SCHEMATIC BUSBARS &amp; FLOW PATHS</span>
            <span className={styles.statusLive}>VECTOR NATIVE</span>
          </div>
          <div className={styles.moduleBody}>
            <div className={styles.schematicCanvas}>
              <svg viewBox="0 0 400 120" className={styles.schematicSvg}>
                <line x1="20" y1="30" x2="380" y2="30" stroke="#3a3a3a" strokeWidth="1" />
                <line x1="20" y1="30" x2="180" y2="30" stroke="#ed1c24" strokeWidth="2" />
                <circle cx="180" cy="30" r="4" fill="#ed1c24" />
                <line x1="180" y1="30" x2="180" y2="90" stroke="#ed1c24" strokeWidth="2" />
                <circle cx="180" cy="90" r="4" fill="#ed1c24" />
                <line x1="180" y1="90" x2="340" y2="90" stroke="#ed1c24" strokeWidth="2" />
                <circle cx="340" cy="90" r="4" fill="#ed1c24" />
                
                <text x="30" y="20" fill="#a8a8a8" fontSize="9" fontFamily="monospace">GEN 1 (440V / 60Hz)</text>
                <text x="200" y="80" fill="#ed1c24" fontSize="9" fontFamily="monospace">SYNCHRONIZER INTERLOCK</text>
                <text x="345" y="94" fill="#fff" fontSize="9" fontFamily="monospace">MSB BUS</text>
              </svg>
            </div>
            <div className={styles.caption}>
              Lightweight SVG wiring paths that connect process steps across editorial layouts.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
