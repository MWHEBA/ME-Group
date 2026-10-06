"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./ComponentLanguageLab.module.css";

type CompPrototype = "rail" | "specs" | "process" | "router" | "case";

export function ComponentLanguageLab() {
  const [activeProto, setActiveProto] = useState<CompPrototype>("rail");

  return (
    <section id="component-language" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.sectionTag}>SPECIMEN 10 &amp; 13 // COMPONENT LANGUAGE &amp; COMPOSITIONS</div>
        <h2 className={styles.title}>Non-Repetitive Industrial Component Architecture</h2>
        <p className={styles.description}>
          Establishing distinctive layout patterns for services, equipment specifications, and diagnostic routing.
          Eliminates standard ThemeForest card grids in favor of asymmetric rails, technical dossiers, and schematic split views.
        </p>
      </div>

      {/* Tabs */}
      <div className={styles.tabNav}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeProto === "rail" ? styles.active : ""}`}
          onClick={() => setActiveProto("rail")}
        >
          10.1 ASYMMETRIC SERVICE RAIL
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeProto === "specs" ? styles.active : ""}`}
          onClick={() => setActiveProto("specs")}
        >
          10.2 EQUIPMENT SPECIFICATION DOSSIER
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeProto === "process" ? styles.active : ""}`}
          onClick={() => setActiveProto("process")}
        >
          10.3 SCHEMATIC RESPONSE PROCESS
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeProto === "router" ? styles.active : ""}`}
          onClick={() => setActiveProto("router")}
        >
          10.4 CRITICAL PROBLEM ROUTER
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeProto === "case" ? styles.active : ""}`}
          onClick={() => setActiveProto("case")}
        >
          10.5 PROJECT METADATA SPLIT
        </button>
      </div>

      {/* Stage Display */}
      <div className={styles.prototypeStage}>
        
        {/* Prototype 1: Asymmetric Service Rail */}
        {activeProto === "rail" && (
          <div className={styles.railLayout}>
            <div className={styles.railSidebar}>
              <span className={styles.kicker}>SERVICES INDEX</span>
              <h3 className={styles.railHeading}>ENGINEERED VESSEL SYSTEMS</h3>
              <p className={styles.railDesc}>
                Direct squad mobilization for electrical generation, propulsion auxiliaries, and automation across Suez Canal ports.
              </p>
            </div>
            <div className={styles.railList}>
              <div className={styles.railItem}>
                <div className={styles.railItemHeader}>
                  <span className={styles.railItemNum}>01</span>
                  <h4>ELECTRICAL POWER &amp; GENERATION</h4>
                </div>
                <p>Alternator rewinding, AVR tuning, MSB sync, breaker overhaul, 440V distribution.</p>
                <div className={styles.railTags}>
                  <span>AVR</span>
                  <span>MSB 440V</span>
                  <span>LOAD SHARING</span>
                </div>
              </div>

              <div className={styles.railItem}>
                <div className={styles.railItemHeader}>
                  <span className={styles.railItemNum}>02</span>
                  <h4>PROPULSION &amp; AUXILIARY DIESEL</h4>
                </div>
                <p>Turbocharger balancing, cylinder head reconditioning, fuel pump timing, governor calibration.</p>
                <div className={styles.railTags}>
                  <span>TURBOCHARGER</span>
                  <span>INJECTORS</span>
                  <span>GOVERNORS</span>
                </div>
              </div>

              <div className={styles.railItem}>
                <div className={styles.railItemHeader}>
                  <span className={styles.railItemNum}>03</span>
                  <h4>AUTOMATION &amp; PLC CONTROL</h4>
                </div>
                <p>Alarm monitoring systems (AMS), pneumatic maneuvering valves, safety interlocks.</p>
                <div className={styles.railTags}>
                  <span>SIEMENS PLC</span>
                  <span>AMS</span>
                  <span>PNEUMATICS</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prototype 2: Equipment Spec Dossier */}
        {activeProto === "specs" && (
          <div className={styles.specsLayout}>
            <div className={styles.specsHeader}>
              <div>
                <span className={styles.kicker}>EQUIPMENT DOSSIER // TECHNICAL METRICS</span>
                <h3>SYNCHRONOUS MARINE GENERATOR 1,250 kVA</h3>
              </div>
              <span className={styles.classStamp}>IACS CLASS CERTIFIED</span>
            </div>
            <div className={styles.specsGrid}>
              <div className={styles.specImageCol}>
                <Image
                  src="/images/dev/generator.svg"
                  alt="Generator schematic"
                  width={600}
                  height={380}
                  className={styles.specImg}
                />
              </div>
              <div className={styles.specTableCol}>
                <table className={styles.specTable}>
                  <tbody>
                    <tr>
                      <th>RATED OUTPUT</th>
                      <td>1,250 kVA / 1,000 kWe (Continuous)</td>
                    </tr>
                    <tr>
                      <th>VOLTAGE &amp; FREQ</th>
                      <td>450 VAC // 3-Phase // 60 Hz // 1,800 RPM</td>
                    </tr>
                    <tr>
                      <th>INSULATION CLASS</th>
                      <td>Class H with VPI Impregnation</td>
                    </tr>
                    <tr>
                      <th>EXCITATION</th>
                      <td>Brushless with Digital Fast-Response AVR</td>
                    </tr>
                    <tr>
                      <th>ATTENDANCE SCOPE</th>
                      <td>Laser alignment, diode testing, winding insulation test</td>
                    </tr>
                    <tr>
                      <th>MOBILIZATION TIME</th>
                      <td>&lt; 2 Hours Suez / Port Said / Ain Sokhna</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Prototype 3: Schematic Process */}
        {activeProto === "process" && (
          <div className={styles.processLayout}>
            <div className={styles.processIntro}>
              <span className={styles.kicker}>4-STAGE DISPATCH PROTOCOL</span>
              <h3>INCIDENT RESPONSE &amp; BERTHSIDE MOBILIZATION</h3>
            </div>
            <div className={styles.processStepsGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>STAGE 01</div>
                <h4>TELEMETRY TRIAGE</h4>
                <p>Review of alarm logs, single-line diagrams, and fault codes within 30 minutes of notification.</p>
                <span className={styles.stepDuration}>T + 0.5 HR</span>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>STAGE 02</div>
                <h4>SQUAD MOBILIZATION</h4>
                <p>Assembly of class-certified engineers, calibrated test rigs, and OEM-equivalent spares.</p>
                <span className={styles.stepDuration}>T + 2.0 HR</span>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>STAGE 03</div>
                <h4>ON-SITE RECTIFICATION</h4>
                <p>Direct intervention at berth or anchorage. Component overhaul, tuning, and bench testing.</p>
                <span className={styles.stepDuration}>T + 6.0 HR</span>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>STAGE 04</div>
                <h4>CLASS SIGN-OFF</h4>
                <p>Sea trial, load test under surveyor supervision, and issuance of technical dossier.</p>
                <span className={styles.stepDuration}>COMPLETED</span>
              </div>
            </div>
          </div>
        )}

        {/* Prototype 4: Problem Router */}
        {activeProto === "router" && (
          <div className={styles.routerLayout}>
            <div className={styles.routerHeader}>
              <span className={styles.kicker}>OPERATIONAL TRIAGE</span>
              <h3>WHAT CRITICAL ISSUE IS YOUR VESSEL EXPERIENCING?</h3>
            </div>
            <div className={styles.problemTiles}>
              <div className={styles.problemTile}>
                <span className={styles.probCode}>ELEC / 01</span>
                <h4>GENERATOR / AVR BLACKOUT</h4>
                <p>Breaker tripping, voltage hunting, or reverse power fault on main switchboard.</p>
                <span className={styles.routeLink}>DISPATCH ELECTRICAL SQUAD →</span>
              </div>
              <div className={styles.problemTile}>
                <span className={styles.probCode}>MECH / 02</span>
                <h4>TURBOCHARGER SURGING / VIBRATION</h4>
                <p>High exhaust temps, rotor imbalance, or casing oil leakage.</p>
                <span className={styles.routeLink}>DISPATCH OVERHAUL SQUAD →</span>
              </div>
              <div className={styles.problemTile}>
                <span className={styles.probCode}>AUTO / 03</span>
                <h4>PNEUMATIC / PLC CONTROL FAILURE</h4>
                <p>Main engine maneuvering lockout, governor fault, or alarm monitoring offline.</p>
                <span className={styles.routeLink}>DISPATCH AUTOMATION SQUAD →</span>
              </div>
              <div className={styles.problemTile}>
                <span className={styles.probCode}>SUPPLY / 04</span>
                <h4>URGENT SPARE PART REQUIRED</h4>
                <p>Critical mechanical seal, fuel injector, or governor component needed before sailing.</p>
                <span className={styles.routeLink}>QUERY STOCK &amp; DISPATCH →</span>
              </div>
            </div>
          </div>
        )}

        {/* Prototype 5: Case Study Metadata Split */}
        {activeProto === "case" && (
          <div className={styles.caseLayout}>
            <div className={styles.caseHeroSplit}>
              <div className={styles.caseImage}>
                <Image
                  src="/images/dev/switchboard.svg"
                  alt="Case Switchboard"
                  width={700}
                  height={450}
                  className={styles.caseImg}
                />
              </div>
              <div className={styles.caseContent}>
                <span className={styles.caseBadge}>ATTENDANCE CASE // SUEZ CANAL ANCHORAGE</span>
                <h3 className={styles.caseHeading}>CONTAINERSHIP 8,500 TEU: EMERGENCY 440V MAIN SWITCHBOARD REPAIR</h3>
                <div className={styles.caseMetadataTable}>
                  <div className={styles.metaRow}>
                    <span>VESSEL TYPE:</span>
                    <strong>Post-Panamax Container</strong>
                  </div>
                  <div className={styles.metaRow}>
                    <span>LOCATION:</span>
                    <strong>Port Said Anchorage, Egypt</strong>
                  </div>
                  <div className={styles.metaRow}>
                    <span>FAILURE:</span>
                    <strong>Synchronizing breaker arcing &amp; AVR instability</strong>
                  </div>
                  <div className={styles.metaRow}>
                    <span>TOTAL DOWNTIME AVOIDED:</span>
                    <strong>48 Hours (Saved Suez convoy slot)</strong>
                  </div>
                  <div className={styles.metaRow}>
                    <span>CLASS SURVEYOR:</span>
                    <strong>Approved under DNV attendance</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
