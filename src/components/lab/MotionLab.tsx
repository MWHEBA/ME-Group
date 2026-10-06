"use client";

import React, { useState } from "react";
import styles from "./MotionLab.module.css";

type MotionExperiment = "A" | "B" | "C" | "D" | "E" | "F";

export function MotionLab() {
  const [activeExp, setActiveExp] = useState<MotionExperiment>("A");
  const [replayKey, setReplayKey] = useState<number>(0);
  const [reducedMotionEmulated, setReducedMotionEmulated] = useState<boolean>(false);

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  return (
    <section id="motion-lab" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.sectionTag}>SPECIMEN 09 // MOTION LAB (CSS NATIVE)</div>
        <h2 className={styles.title}>Mechanical Motion &amp; Precision Micro-Interactions</h2>
        <p className={styles.description}>
          All motion is strictly mechanical, linear or cubic-bezier controlled, and zero-overhead CSS native.
          Avoids bouncy SaaS transitions in favor of calibrated industrial timing and total accessibility compliance.
        </p>
      </div>

      {/* Control Strip */}
      <div className={styles.controlStrip}>
        <div className={styles.experimentTabs}>
          <button
            type="button"
            className={`${styles.expBtn} ${activeExp === "A" ? styles.active : ""}`}
            onClick={() => setActiveExp("A")}
          >
            A. SCHEMATIC LINE DRAW
          </button>
          <button
            type="button"
            className={`${styles.expBtn} ${activeExp === "B" ? styles.active : ""}`}
            onClick={() => setActiveExp("B")}
          >
            B. CONTROLLED REVEAL
          </button>
          <button
            type="button"
            className={`${styles.expBtn} ${activeExp === "C" ? styles.active : ""}`}
            onClick={() => setActiveExp("C")}
          >
            C. DIAGNOSTIC SCAN
          </button>
          <button
            type="button"
            className={`${styles.expBtn} ${activeExp === "D" ? styles.active : ""}`}
            onClick={() => setActiveExp("D")}
          >
            D. ME FRAME REVEAL
          </button>
          <button
            type="button"
            className={`${styles.expBtn} ${activeExp === "E" ? styles.active : ""}`}
            onClick={() => setActiveExp("E")}
          >
            E. TECHNICAL TRANSITION
          </button>
          <button
            type="button"
            className={`${styles.expBtn} ${activeExp === "F" ? styles.active : ""}`}
            onClick={() => setActiveExp("F")}
          >
            F. TELEMETRY PULSE
          </button>
        </div>

        <div className={styles.actionControls}>
          <button type="button" className={styles.replayButton} onClick={handleReplay}>
            ↻ REPLAY SEQUENCE
          </button>
          <label className={styles.reduceMotionToggle}>
            <input
              type="checkbox"
              checked={reducedMotionEmulated}
              onChange={(e) => setReducedMotionEmulated(e.target.checked)}
            />
            <span>EMULATE PREFERS-REDUCED-MOTION</span>
          </label>
        </div>
      </div>

      {/* Motion Stage */}
      <div className={`${styles.motionStage} ${reducedMotionEmulated ? styles.reducedMotionActive : ""}`} key={replayKey}>
        
        {/* Exp A: Line Draw */}
        {activeExp === "A" && (
          <div className={styles.expCanvas}>
            <div className={styles.stageHeader}>
              <span className={styles.expTitle}>EXPERIMENT A // SVG SCHEMATIC LINE DRAWING</span>
              <span className={styles.timingTag}>CSS STROKE-DASHOFFSET // 650MS CUBIC</span>
            </div>
            <div className={styles.svgDrawContainer}>
              <svg viewBox="0 0 600 200" className={styles.drawingSvg}>
                {/* Circuit paths */}
                <path
                  d="M 50 100 L 200 100 L 250 50 L 400 50 L 450 150 L 550 150"
                  className={styles.drawnLine1}
                />
                <path
                  d="M 200 100 L 200 160 L 350 160"
                  className={styles.drawnLine2}
                />
                <circle cx="200" cy="100" r="5" className={styles.drawNode1} />
                <circle cx="250" cy="50" r="5" className={styles.drawNode2} />
                <circle cx="450" cy="150" r="5" className={styles.drawNode3} />
              </svg>
            </div>
            <div className={styles.expFooter}>
              <strong>Behavior:</strong> Triggers on view entry to visually establish connections between systems and diagnostic data points.
            </div>
          </div>
        )}

        {/* Exp B: Controlled Reveal */}
        {activeExp === "B" && (
          <div className={styles.expCanvas}>
            <div className={styles.stageHeader}>
              <span className={styles.expTitle}>EXPERIMENT B // CONTROLLED CONTENT REVEAL</span>
              <span className={styles.timingTag}>STAGGERED CLIP-PATH // 380MS STEPPED</span>
            </div>
            <div className={styles.revealGrid}>
              <div className={`${styles.revealCard} ${styles.revealItem1}`}>
                <span className={styles.revealTag}>STEP 01</span>
                <h4>TELEMETRY INTAKE</h4>
                <p>Fault code received from Chief Engineer via satellite link.</p>
              </div>
              <div className={`${styles.revealCard} ${styles.revealItem2}`}>
                <span className={styles.revealTag}>STEP 02</span>
                <h4>SQUAD MOBILIZATION</h4>
                <p>Electrical squad dispatched with calibration tools within 120 mins.</p>
              </div>
              <div className={`${styles.revealCard} ${styles.revealItem3}`}>
                <span className={styles.revealTag}>STEP 03</span>
                <h4>BERTHSIDE EXECUTION</h4>
                <p>Class 3.1 rectification and dynamic synchronization sign-off.</p>
              </div>
            </div>
            <div className={styles.expFooter}>
              <strong>Behavior:</strong> Crisp mechanical curtain reveal replacing soft generic web fades.
            </div>
          </div>
        )}

        {/* Exp C: Diagnostic Scan */}
        {activeExp === "C" && (
          <div className={styles.expCanvas}>
            <div className={styles.stageHeader}>
              <span className={styles.expTitle}>EXPERIMENT C // DIAGNOSTIC LASER SCANNING BAR</span>
              <span className={styles.timingTag}>INFINITE LINEAR SWEEP // 2.4S DURATION</span>
            </div>
            <div className={styles.scanContainer}>
              <div className={styles.scanTarget}>
                <div className={styles.scanLaser} />
                <div className={styles.scanGridLines} />
                <div className={styles.scanTelemetry}>
                  <span>LASER CALIBRATION // SHAFT ROTATION: 180°</span>
                  <span className={styles.scanOk}>ALIGNMENT: +0.012 MM (NORMAL)</span>
                </div>
              </div>
            </div>
            <div className={styles.expFooter}>
              <strong>Behavior:</strong> Communicates real-time active monitoring in diagnostic case studies and technical modules.
            </div>
          </div>
        )}

        {/* Exp D: ME Frame Reveal */}
        {activeExp === "D" && (
          <div className={styles.expCanvas}>
            <div className={styles.stageHeader}>
              <span className={styles.expTitle}>EXPERIMENT D // ME-FRAME GEOMETRIC EXPAND</span>
              <span className={styles.timingTag}>POLYGON MORPH // 500MS EXPO</span>
            </div>
            <div className={styles.frameRevealContainer}>
              <div className={styles.morphingFrame}>
                <div className={styles.frameInnerContent}>
                  <h3>HIGH-VOLTAGE POWER DISTRIBUTION</h3>
                  <p>Certified 440V - 6.6kV Marine Commissioning Engineers</p>
                </div>
              </div>
            </div>
            <div className={styles.expFooter}>
              <strong>Behavior:</strong> Sharp expansion along the chamfered diagonal axis.
            </div>
          </div>
        )}

        {/* Exp E: Technical Transition */}
        {activeExp === "E" && (
          <div className={styles.expCanvas}>
            <div className={styles.stageHeader}>
              <span className={styles.expTitle}>EXPERIMENT E // ARCHITECTURAL SPLIT WIPE</span>
              <span className={styles.timingTag}>DUAL WIPE // 400MS</span>
            </div>
            <div className={styles.wipeContainer}>
              <div className={styles.wipeCurtainLeft}>
                <span>SERVICE CAPABILITY: DIESEL OVERHAUL</span>
              </div>
              <div className={styles.wipeCurtainRight}>
                <span>SERVICE CAPABILITY: AVR AUTOMATION</span>
              </div>
            </div>
            <div className={styles.expFooter}>
              <strong>Behavior:</strong> Section transitions snap with authoritative mechanical weight.
            </div>
          </div>
        )}

        {/* Exp F: Telemetry Pulse */}
        {activeExp === "F" && (
          <div className={styles.expCanvas}>
            <div className={styles.stageHeader}>
              <span className={styles.expTitle}>EXPERIMENT F // TELEMETRY STATUS BEACON</span>
              <span className={styles.timingTag}>CSS SUBTLE HARMONIC // 1.8S CYCLE</span>
            </div>
            <div className={styles.pulseContainer}>
              <div className={styles.beaconCard}>
                <div className={styles.beaconPing}>
                  <span className={styles.beaconRing} />
                  <span className={styles.beaconCenter} />
                </div>
                <div className={styles.beaconMeta}>
                  <strong>SUEZ CANAL EMERGENCY FLYING SQUAD</strong>
                  <span>STATUS: 24/7 BERTH ATTENDANCE ACTIVE</span>
                </div>
              </div>
            </div>
            <div className={styles.expFooter}>
              <strong>Behavior:</strong> Subtle micro-pulse indicating live operational readiness without distracting eye movement.
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
