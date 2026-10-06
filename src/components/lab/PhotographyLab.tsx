"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./PhotographyLab.module.css";

interface MediaScenario {
  id: string;
  title: string;
  category: string;
  treatment: string;
  svgSrc: string;
  notes: string;
  cropClass: string;
}

const SCENARIOS: MediaScenario[] = [
  {
    id: "sc-01",
    title: "Vessel Exterior / Anchorage Operations",
    category: "MARINE / BERTH",
    treatment: "Full-bleed with coordinate & horizon overlay",
    svgSrc: "/images/dev/vessel-exterior.svg",
    notes: "Dramatic low-angle vessel hull, conveying scale and offshore readiness.",
    cropClass: "treatmentFullBleed",
  },
  {
    id: "sc-02",
    title: "Main Propulsion & Engine Room Core",
    category: "PROPULSION / 01",
    treatment: "Darkened industrial + cylinder telemetry overlay",
    svgSrc: "/images/dev/engine-room.svg",
    notes: "High-contrast mechanical depth showing heavy engine components.",
    cropClass: "treatmentDarkened",
  },
  {
    id: "sc-03",
    title: "Chief Commissioning Engineer On-Site",
    category: "FIELD OPS / ATTENDANCE",
    treatment: "Tight operational crop + diagnostic HUD",
    svgSrc: "/images/dev/engineer-working.svg",
    notes: "Physical human engineering expertise; diagnostic instrument focus.",
    cropClass: "treatmentTightCrop",
  },
  {
    id: "sc-04",
    title: "Main Switchboard & 440V Sync Panels",
    category: "ELECTRICAL / 02",
    treatment: "Technical split + busbar schematic line",
    svgSrc: "/images/dev/switchboard.svg",
    notes: "Precision electrical power distribution and breaker interlocks.",
    cropClass: "treatmentSplit",
  },
  {
    id: "sc-05",
    title: "Marine Generator & AVR Exciter",
    category: "POWER GEN / 03",
    treatment: "ME-Frame Mask treatment + dimensional callouts",
    svgSrc: "/images/dev/generator.svg",
    notes: "Stator cooling fins, brushless exciter, and terminal enclosure.",
    cropClass: "treatmentFrameMask",
  },
  {
    id: "sc-06",
    title: "Automation, PLC & Alarm Monitoring",
    category: "AUTOMATION / 04",
    treatment: "Micro DIN-rail crop + I/O channel status",
    svgSrc: "/images/dev/plc-automation.svg",
    notes: "High-density control cabinet wiring, Ethernet hubs, and safety relays.",
    cropClass: "treatmentTightCrop",
  },
  {
    id: "sc-07",
    title: "30-Bar Starting Air Compressor & Receiver",
    category: "PNEUMATICS / 05",
    treatment: "Editorial vertical crop + pressure rating callout",
    svgSrc: "/images/dev/compressor.svg",
    notes: "Dual-stage compression head, safety unloader, and high-pressure bottle.",
    cropClass: "treatmentEditorial",
  },
  {
    id: "sc-08",
    title: "Heavy Ballast & Cooling Water Pump",
    category: "MECHANICAL / 06",
    treatment: "Foreground pump volute with background depth",
    svgSrc: "/images/dev/pump-mechanical.svg",
    notes: "Mechanical seal housing, suction flange, and dynamic flow vector.",
    cropClass: "treatmentDepth",
  },
  {
    id: "sc-09",
    title: "Laser Shaft Alignment & Vibration Scope",
    category: "DIAGNOSTICS / 07",
    treatment: "Target crosshairs + live tolerance waveform overlay",
    svgSrc: "/images/dev/inspection.svg",
    notes: "Precision optical measurement (<0.04mm) for class renewal.",
    cropClass: "treatmentOverlay",
  },
  {
    id: "sc-10",
    title: "Class 3.1 Certified Marine Spare Parts",
    category: "SUPPLY / SPARES",
    treatment: "High-contrast dark catalog layout + OEM specs",
    svgSrc: "/images/dev/spare-parts.svg",
    notes: "Machined bearing shells, fuel injection valves, and ring packs.",
    cropClass: "treatmentDarkened",
  },
];

export function PhotographyLab() {
  const [selectedScenario, setSelectedScenario] = useState<MediaScenario>(SCENARIOS[0]);

  return (
    <section id="photography-media" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.sectionTag}>SPECIMEN 08 // PHOTOGRAPHY &amp; MEDIA DIRECTION</div>
        <h2 className={styles.title}>10 Industrial Media Scenarios &amp; Visual Treatments</h2>
        <p className={styles.description}>
          Photography must feel close, physical, mechanical, and textured — avoiding generic maritime stock photography.
          All assets shown below are clearly marked <strong>DEVELOPMENT MEDIA</strong> for prototyping art direction.
        </p>
      </div>

      {/* Interactive Media Showcase */}
      <div className={styles.showcaseGrid}>
        
        {/* Left Column: Media Scenarios Index */}
        <div className={styles.scenarioList}>
          <div className={styles.listHeader}>
            <span>10 OPERATIONAL MEDIA SCENARIOS</span>
            <span>TREATMENT APPLIED</span>
          </div>
          <div className={styles.listItems}>
            {SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                type="button"
                className={`${styles.scenarioBtn} ${selectedScenario.id === sc.id ? styles.activeScenario : ""}`}
                onClick={() => setSelectedScenario(sc)}
              >
                <div className={styles.scenarioBtnMeta}>
                  <span className={styles.indexNum}>0{idx + 1}</span>
                  <span className={styles.scCategory}>{sc.category}</span>
                </div>
                <div className={styles.scTitle}>{sc.title}</div>
                <div className={styles.scTreatmentBadge}>{sc.treatment}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Active Treatment Preview */}
        <div className={styles.previewContainer}>
          <div className={styles.previewHeader}>
            <div className={styles.previewMeta}>
              <span className={styles.redDot} />
              <span className={styles.activeTitle}>{selectedScenario.title}</span>
            </div>
            <span className={styles.devWatermark}>DEVELOPMENT MEDIA</span>
          </div>

          <div className={`${styles.imageWrapper} ${styles[selectedScenario.cropClass]}`}>
            <Image
              src={selectedScenario.svgSrc}
              alt={selectedScenario.title}
              width={1200}
              height={800}
              className={styles.mainImage}
            />

            {/* Overlaid Technical Markers */}
            <div className={styles.technicalOverlayLayer}>
              <div className={styles.tlBracket} />
              <div className={styles.trBracket} />
              <div className={styles.blBracket} />
              <div className={styles.brBracket} />
              <div className={styles.overlayInfoBar}>
                <span className={styles.overlayCode}>{`REF: ${selectedScenario.id.toUpperCase()} // CLASS: APPROVED`}</span>
                <span className={styles.overlayScale}>{"SCALE: 1:1 // 100% VECTOR"}</span>
              </div>
            </div>
          </div>

          <div className={styles.previewFooter}>
            <div className={styles.treatmentNotes}>
              <strong>Art Direction Rationale:</strong> {selectedScenario.notes}
            </div>
            <div className={styles.appliedRule}>
              <strong>Treatment Class:</strong> <code>{selectedScenario.treatment}</code>
            </div>
          </div>
        </div>

      </div>

      {/* Photography Treatment Rules Matrix */}
      <div className={styles.treatmentRulesGrid}>
        <div className={styles.ruleCard}>
          <div className={styles.ruleCardHeader}>
            <span className={styles.ruleNum}>01</span>
            <h4>TIGHT MACHINERY CROPS</h4>
          </div>
          <p>Highlight machined metal textures, bolt circles, turbocharger blades, and wiring channels. Frame machinery as precision engineering rather than background scenery.</p>
        </div>
        <div className={styles.ruleCard}>
          <div className={styles.ruleCardHeader}>
            <span className={styles.ruleNum}>02</span>
            <h4>DARK INDUSTRIAL PALETTE</h4>
          </div>
          <p>Maintain deep shadow tones (#121212 - #1E1E1E) with directional ambient highlights. Red accents appear only on specific test points or safety indicators.</p>
        </div>
        <div className={styles.ruleCard}>
          <div className={styles.ruleCardHeader}>
            <span className={styles.ruleNum}>03</span>
            <h4>TECHNICAL SCHEMATIC OVERLAYS</h4>
          </div>
          <p>Integrate 1px hairline coordinate markers, dimension callouts, and system tags directly across imagery to reinforce diagnostic authority.</p>
        </div>
        <div className={styles.ruleCard}>
          <div className={styles.ruleCardHeader}>
            <span className={styles.ruleNum}>04</span>
            <h4>AUTHENTIC HARBOR &amp; BERTH CONTEXT</h4>
          </div>
          <p>Port Saïd, Suez Canal anchorage, and dry dock lighting — real working environments with safety PPE and genuine marine engineering challenges.</p>
        </div>
      </div>
    </section>
  );
}
