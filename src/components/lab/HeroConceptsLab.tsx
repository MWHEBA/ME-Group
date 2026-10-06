"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./HeroConceptsLab.module.css";

type HeroConceptId = "conceptD" | "conceptA" | "conceptB" | "conceptC";
type ViewportMode = "desktop" | "mobile";
type ScrimIntensity = "vivid" | "balanced" | "clear";

export function HeroConceptsLab() {
  const [activeConcept, setActiveConcept] = useState<HeroConceptId>("conceptD");
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [videoPlaying, setVideoPlaying] = useState<boolean>(true);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [mobileMode, setMobileMode] = useState<"video" | "poster">("video");
  const [scrimIntensity, setScrimIntensity] = useState<ScrimIntensity>("vivid");

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.play().catch(() => {
          // Autoplay policy fallback: muted video is supported everywhere
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [videoPlaying, activeConcept, viewport, mobileMode]);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
        setVideoPlaying(false);
      } else {
        videoRef.current.play().then(() => setVideoPlaying(true)).catch(() => {});
      }
    } else {
      setVideoPlaying(!videoPlaying);
    }
  };

  return (
    <section id="hero-concepts" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.sectionTag}>SPECIMEN 01 &amp; 11 // HERO EXPLORATION (4 CONCEPTS)</div>
        <h2 className={styles.title}>Hero Exploration &amp; Full-Bleed Cinematic Video Loop</h2>
        <p className={styles.description}>
          Four distinct art-direction models for ME Group. <strong>Concept D (Primary Direction)</strong> features the <strong>Full-Bleed Marine Engineering Film Loop</strong> (<code>/videos/hero-cinematic.mp4</code>) with an optimized, bright, vivid gradient scrim ensuring maximum machinery visibility and crystal-clear typography.
        </p>
      </div>

      {/* Hero Selector & Viewport Switcher Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.conceptTabs}>
          <button
            type="button"
            className={`${styles.conceptBtn} ${activeConcept === "conceptD" ? styles.active : ""}`}
            onClick={() => setActiveConcept("conceptD")}
          >
            <span className={styles.conceptCode}>CONCEPT D (PRIMARY DIRECTION)</span>
            <span className={styles.conceptName}>CINEMATIC VIDEO LOOP</span>
          </button>
          <button
            type="button"
            className={`${styles.conceptBtn} ${activeConcept === "conceptA" ? styles.active : ""}`}
            onClick={() => setActiveConcept("conceptA")}
          >
            <span className={styles.conceptCode}>CONCEPT A</span>
            <span className={styles.conceptName}>CINEMATIC STILL</span>
          </button>
          <button
            type="button"
            className={`${styles.conceptBtn} ${activeConcept === "conceptB" ? styles.active : ""}`}
            onClick={() => setActiveConcept("conceptB")}
          >
            <span className={styles.conceptCode}>CONCEPT B</span>
            <span className={styles.conceptName}>PRECISION / SCHEMATIC</span>
          </button>
          <button
            type="button"
            className={`${styles.conceptBtn} ${activeConcept === "conceptC" ? styles.active : ""}`}
            onClick={() => setActiveConcept("conceptC")}
          >
            <span className={styles.conceptCode}>CONCEPT C</span>
            <span className={styles.conceptName}>INDUSTRIAL EDITORIAL</span>
          </button>
        </div>

        <div className={styles.viewportControls}>
          <span className={styles.viewportLabel}>VIEWPORT:</span>
          <button
            type="button"
            className={`${styles.vpBtn} ${viewport === "desktop" ? styles.activeVp : ""}`}
            onClick={() => setViewport("desktop")}
          >
            DESKTOP (1440px)
          </button>
          <button
            type="button"
            className={`${styles.vpBtn} ${viewport === "mobile" ? styles.activeVp : ""}`}
            onClick={() => setViewport("mobile")}
          >
            MOBILE (390px)
          </button>
        </div>
      </div>

      {/* Concept D Video Control Sub-bar */}
      {activeConcept === "conceptD" && (
        <div className={styles.videoSubBar}>
          <div className={styles.videoPlaybackStatus}>
            <span className={styles.liveVideoBadge}>
              <span className={`${styles.livePulse} ${videoPlaying ? styles.pulseActive : ""}`} />
              <span>HTML5 VIDEO: <code>/videos/hero-cinematic.mp4</code></span>
            </span>
            
            {/* Scrim Brightness Selector */}
            <div className={styles.scrimSelectorGroup}>
              <span className={styles.scrimLabel}>VIDEO BRIGHTNESS / SCRIM:</span>
              <button
                type="button"
                className={`${styles.scrimBtn} ${scrimIntensity === "clear" ? styles.activeScrim : ""}`}
                onClick={() => setScrimIntensity("clear")}
                title="Brightest video overlay"
              >
                CLEAR (100% VIVID)
              </button>
              <button
                type="button"
                className={`${styles.scrimBtn} ${scrimIntensity === "vivid" ? styles.activeScrim : ""}`}
                onClick={() => setScrimIntensity("vivid")}
                title="Recommended vivid balance"
              >
                VIVID (RECOMMENDED)
              </button>
              <button
                type="button"
                className={`${styles.scrimBtn} ${scrimIntensity === "balanced" ? styles.activeScrim : ""}`}
                onClick={() => setScrimIntensity("balanced")}
                title="Balanced contrast"
              >
                BALANCED
              </button>
            </div>
          </div>

          <div className={styles.videoPlaybackControls}>
            <button
              type="button"
              className={styles.playbackBtn}
              onClick={toggleVideoPlayback}
            >
              {videoPlaying ? "⏸ PAUSE FILM" : "▶ PLAY FILM"}
            </button>
            {viewport === "mobile" && (
              <div className={styles.mobileDeliverySwitch}>
                <span className={styles.subBarLabel}>MOBILE:</span>
                <button
                  type="button"
                  className={`${styles.mobileOptBtn} ${mobileMode === "video" ? styles.activeMobileOpt : ""}`}
                  onClick={() => setMobileMode("video")}
                >
                  VIDEO
                </button>
                <button
                  type="button"
                  className={`${styles.mobileOptBtn} ${mobileMode === "poster" ? styles.activeMobileOpt : ""}`}
                  onClick={() => setMobileMode("poster")}
                >
                  POSTER
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive Hero Stage */}
      <div className={`${styles.heroStage} ${styles[viewport]}`}>
        
        {/* ========================================================= */}
        {/* CONCEPT D: REFINED FULL-BLEED CINEMATIC VIDEO HERO        */}
        {/* ========================================================= */}
        {activeConcept === "conceptD" && (
          <div className={styles.heroDWrapper}>
            
            {/* Full-Bleed HTML5 Film Video Layer */}
            <div className={styles.heroDVideoField}>
              {viewport === "mobile" && mobileMode === "poster" ? (
                /* Mobile High-Performance Poster Fallback */
                <Image
                  src="/images/dev/hero-video-poster.svg"
                  alt="Cinematic Marine Machinery Poster Frame"
                  fill
                  priority
                  className={styles.heroDPosterImg}
                />
              ) : (
                /* Native HTML5 Continuous Video Loop */
                <div className={styles.videoContainer}>
                  <video
                    ref={videoRef}
                    className={`${styles.nativeHeroVideo} ${videoLoaded ? styles.videoVisible : styles.videoBuffering}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="/images/dev/hero-video-poster.svg"
                    onLoadedData={() => setVideoLoaded(true)}
                    onPlaying={() => setVideoPlaying(true)}
                    onPause={() => setVideoPlaying(false)}
                  >
                    <source src="/videos/hero-cinematic.mp4" type="video/mp4" />
                    <source src="/videos/background-video.mp4" type="video/mp4" />
                  </video>
                  
                  {/* Poster fallback underlay for seamless zero-flicker render */}
                  {!videoLoaded && (
                    <Image
                      src="/images/dev/hero-video-poster.svg"
                      alt="Cinematic Poster Fallback"
                      fill
                      priority
                      className={styles.heroDPosterImg}
                    />
                  )}
                </div>
              )}

              {/* Lighter Directional Scrim for maximum video clarity */}
              <div className={`${styles.heroDAtmosphericScrim} ${styles[`scrim_${scrimIntensity}`]}`} />
            </div>

            {/* Restrained Engineering Graphic Identity Layer (Only 10% Visual Weight) */}
            <div className={styles.heroDEngineeringLayer} aria-hidden="true">
              {/* Top Subtle System Tag */}
              <div className={styles.dTopStatus}>
                <div className={styles.dSystemBadge}>
                  <span className={styles.dSystemCode}>SYS / 01</span>
                  <span className={styles.dDivider}>—</span>
                  <span className={styles.dSystemName}>MARINE ENGINEERING</span>
                </div>
                <div className={styles.dDiagnosticPoint}>
                  <span className={styles.dDot} />
                  <span>OPERATIONAL</span>
                </div>
              </div>

              {/* Architectural Frame Corners (ME Frame Motif) */}
              <div className={styles.dFrameCornerTL} />
              <div className={styles.dFrameCornerTR} />
              <div className={styles.dFrameCornerBL} />
              <div className={styles.dFrameCornerBR} />

              {/* One Restrained 1px Schematic Path */}
              <svg viewBox="0 0 1000 120" className={styles.dSchematicOverlaySvg}>
                <line x1="20" y1="60" x2="220" y2="60" stroke="rgba(237, 28, 36, 0.45)" strokeWidth="1" />
                <circle cx="220" cy="60" r="3" fill="#ed1c24" />
                <line x1="220" y1="60" x2="250" y2="90" stroke="rgba(237, 28, 36, 0.45)" strokeWidth="1" />
                <line x1="250" y1="90" x2="480" y2="90" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="3,3" />
              </svg>
            </div>

            {/* Foreground Semantic Content (Immediate, Zero Layout Shift, Generous Breathing Room) */}
            <div className={styles.heroDContent}>
              
              <h1 className={styles.heroDHeadline}>
                <span>KEEPING</span>
                <span className={styles.dHeadlineAccent}>VESSELS</span>
                <span>MOVING.</span>
              </h1>

              <div className={styles.heroDSubTitle}>
                Marine Engineering, Maintenance &amp; Vessel Support.
              </div>

              <p className={styles.heroDSupporting}>
                Integrated technical support across mechanical, electrical, automation and pneumatic systems.
              </p>

              {/* CTA Action Group */}
              <div className={styles.heroDCtaGroup}>
                <button type="button" className={styles.ctaPrimary}>
                  <span>REQUEST TECHNICAL SUPPORT</span>
                  <span className={styles.arrowIcon}>→</span>
                </button>
                <button type="button" className={styles.ctaSecondary}>
                  <span>EXPLORE CAPABILITIES</span>
                  <span className={styles.arrowIcon}>↗</span>
                </button>
              </div>

              {/* Simplified Core Service Categories Index */}
              <div className={styles.heroDSystemRail}>
                <div className={styles.dRailItem}>
                  <span className={styles.dRailCode}>MECH / 01</span>
                  <span className={styles.dRailName}>MECHANICAL</span>
                </div>
                <div className={styles.dRailDivider} />
                <div className={styles.dRailItem}>
                  <span className={styles.dRailCode}>ELEC / 02</span>
                  <span className={styles.dRailName}>ELECTRICAL</span>
                </div>
                <div className={styles.dRailDivider} />
                <div className={styles.dRailItem}>
                  <span className={styles.dRailCode}>AUTO / 03</span>
                  <span className={styles.dRailName}>AUTOMATION</span>
                </div>
                <div className={styles.dRailDivider} />
                <div className={styles.dRailItem}>
                  <span className={styles.dRailCode}>PNEU / 04</span>
                  <span className={styles.dRailName}>PNEUMATIC</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* CONCEPT A: CINEMATIC STILL                                */}
        {/* ========================================================= */}
        {activeConcept === "conceptA" && (
          <div className={styles.heroAWrapper}>
            <div className={styles.heroABg}>
              <Image
                src="/images/dev/engine-room.svg"
                alt="Cinematic Engine Room"
                fill
                priority
                className={styles.heroAImg}
              />
              <div className={styles.heroAScrim} />
            </div>

            <div className={styles.heroATelemetryLayer}>
              <div className={styles.telemetryTop}>
                <div className={styles.telemetryBadge}>
                  <span className={styles.livePulse} />
                  <span>MARINE ENGINEERING &amp; MAINTENANCE</span>
                </div>
              </div>
              <div className={styles.telemetryBottom}>
                <div className={styles.bracketTL} />
                <div className={styles.bracketTR} />
                <div className={styles.specimenWatermark}>ME GROUP // CONCEPT A</div>
              </div>
            </div>

            <div className={styles.heroAContent}>
              <h1 className={styles.heroAHeadline}>
                <span>KEEPING</span>
                <span className={styles.redHighlight}>VESSELS</span>
                <span>MOVING.</span>
              </h1>

              <div className={styles.heroDSubTitle}>
                Marine Engineering, Maintenance &amp; Vessel Support.
              </div>

              <p className={styles.heroASupporting}>
                Integrated technical support across mechanical, electrical, automation and pneumatic systems.
              </p>

              <div className={styles.heroACtaGroup}>
                <button type="button" className={styles.ctaPrimary}>
                  <span>REQUEST TECHNICAL SUPPORT</span>
                  <span className={styles.arrowIcon}>→</span>
                </button>
                <button type="button" className={styles.ctaSecondary}>
                  <span>EXPLORE CAPABILITIES</span>
                  <span className={styles.arrowIcon}>↗</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CONCEPT B: PRECISION / SCHEMATIC                          */}
        {/* ========================================================= */}
        {activeConcept === "conceptB" && (
          <div className={styles.heroBWrapper}>
            <div className={styles.heroBGridBg} />
            <div className={styles.heroBLayout}>
              <div className={styles.heroBLeft}>
                <div className={styles.heroBHeaderMeta}>
                  <div className={styles.sysIndexNumber}>SYS // 01</div>
                  <div className={styles.classCertPill}>MARINE ENGINEERING</div>
                </div>

                <h1 className={styles.heroBHeadline}>
                  KEEPING VESSELS MOVING.
                </h1>

                <div className={styles.heroDSubTitle}>
                  Marine Engineering, Maintenance &amp; Vessel Support.
                </div>

                <p className={styles.heroBSupporting}>
                  Integrated technical support across mechanical, electrical, automation and pneumatic systems.
                </p>

                <div className={styles.heroBCtaGroup}>
                  <button type="button" className={styles.ctaPrimary}>
                    <span>REQUEST TECHNICAL SUPPORT</span>
                    <span className={styles.arrowIcon}>→</span>
                  </button>
                  <button type="button" className={styles.ctaSecondaryDark}>
                    <span>SYSTEM INDEX</span>
                    <span className={styles.arrowIcon}>↓</span>
                  </button>
                </div>

                <div className={styles.heroBSystemMatrix}>
                  <div className={styles.systemBox}>
                    <span className={styles.sysNum}>01</span>
                    <span className={styles.sysName}>MECHANICAL</span>
                  </div>
                  <div className={styles.systemBox}>
                    <span className={styles.sysNum}>02</span>
                    <span className={styles.sysName}>ELECTRICAL</span>
                  </div>
                  <div className={styles.systemBox}>
                    <span className={styles.sysNum}>03</span>
                    <span className={styles.sysName}>AUTOMATION</span>
                  </div>
                  <div className={styles.systemBox}>
                    <span className={styles.sysNum}>04</span>
                    <span className={styles.sysName}>PNEUMATIC</span>
                  </div>
                </div>
              </div>

              <div className={styles.heroBRight}>
                <div className={styles.schematicFrame}>
                  <div className={styles.schematicTopBar}>
                    <span>SCHEMATIC REF: MSB-SYNC-88</span>
                    <span className={styles.schematicScale}>SCALE: 1:1</span>
                  </div>
                  <div className={styles.schematicAperture}>
                    <Image
                      src="/images/dev/switchboard.svg"
                      alt="Precision Switchboard"
                      fill
                      className={styles.schematicImg}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CONCEPT C: INDUSTRIAL EDITORIAL                           */}
        {/* ========================================================= */}
        {activeConcept === "conceptC" && (
          <div className={styles.heroCWrapper}>
            <div className={styles.heroCMonogram} aria-hidden="true">
              ME
            </div>

            <div className={styles.heroCLayout}>
              <div className={styles.heroCTopRow}>
                <div className={styles.journalMeta}>
                  <span>TECHNICAL VESSEL SUPPORT</span>
                </div>
              </div>

              <div className={styles.heroCTitleRow}>
                <h1 className={styles.heroCHeadline}>
                  KEEPING VESSELS MOVING<span className={styles.heroCPeriod}>.</span>
                </h1>
              </div>

              <div className={styles.heroCAsymmetricGrid}>
                <div className={styles.editorialCol}>
                  <div className={styles.editorialLead}>
                    <strong>Marine Engineering, Maintenance &amp; Vessel Support.</strong>
                  </div>
                  <p className={styles.editorialBody}>
                    Integrated technical support across mechanical, electrical, automation and pneumatic systems.
                  </p>
                  <div className={styles.heroCCtaBox}>
                    <button type="button" className={styles.ctaPrimary}>
                      <span>REQUEST TECHNICAL SUPPORT</span>
                      <span className={styles.arrowIcon}>→</span>
                    </button>
                    <button type="button" className={styles.editorialLink}>
                      EXPLORE CAPABILITIES ↗
                    </button>
                  </div>
                </div>

                <div className={styles.editorialImageCol}>
                  <div className={styles.tightCropFrame}>
                    <Image
                      src="/images/dev/generator.svg"
                      alt="Generator Equipment"
                      fill
                      className={styles.editorialCropImg}
                    />
                  </div>
                </div>

                <div className={styles.metadataCol}>
                  <div className={styles.metaDossierCard}>
                    <div className={styles.dossierHeader}>CORE CAPABILITIES</div>
                    <div className={styles.dossierItem}>
                      <span className={styles.dossierKey}>MECH / 01:</span>
                      <strong className={styles.dossierVal}>MECHANICAL</strong>
                    </div>
                    <div className={styles.dossierItem}>
                      <span className={styles.dossierKey}>ELEC / 02:</span>
                      <strong className={styles.dossierVal}>ELECTRICAL</strong>
                    </div>
                    <div className={styles.dossierItem}>
                      <span className={styles.dossierKey}>AUTO / 03:</span>
                      <strong className={styles.dossierVal}>AUTOMATION</strong>
                    </div>
                    <div className={styles.dossierItem}>
                      <span className={styles.dossierKey}>PNEU / 04:</span>
                      <strong className={styles.dossierVal}>PNEUMATIC</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Concept Architecture Breakdown */}
      <div className={styles.conceptDetailsCard}>
        <div className={styles.detailsHeader}>
          <span className={styles.detailsTag}>CONCEPT ARCHITECTURE BREAKDOWN // {activeConcept.toUpperCase()}</span>
          <span className={styles.detailsReviewPill}>REFINED FOR FINAL APPROVAL</span>
        </div>

        <div className={styles.detailsGrid}>
          {activeConcept === "conceptD" && (
            <>
              <div className={styles.detailItem}>
                <h4>70% FILM DOMINANCE</h4>
                <p><strong>Vivid Machinery Immersion:</strong> Continuous seamless loop of rotating equipment and switchgear with an optimized light directional scrim so the machinery details are 100% visible and vivid.</p>
              </div>
              <div className={styles.detailItem}>
                <h4>20% CLEAN TYPOGRAPHY</h4>
                <p><strong>Uncluttered Headline &amp; Subtitle:</strong> Generous breathing room around <code>KEEPING VESSELS MOVING.</code> with confirmed core copy and prominent operational CTAs.</p>
              </div>
              <div className={styles.detailItem}>
                <h4>10% RESTRAINED GRAPHICS</h4>
                <p><strong>Confirmed Core Categories:</strong> Clean 4-service index (<code>MECH / 01</code>, <code>ELEC / 02</code>, <code>AUTO / 03</code>, <code>PNEU / 04</code>) with subtle hairline schematics and ME-frame corners.</p>
              </div>
            </>
          )}

          {activeConcept === "conceptA" && (
            <>
              <div className={styles.detailItem}>
                <h4>VISUAL MOOD</h4>
                <p><strong>Cinematic Still:</strong> High-impact engine-room depth and dramatic lighting on a static backdrop.</p>
              </div>
              <div className={styles.detailItem}>
                <h4>GRAPHIC LAYER</h4>
                <p>Minimalist measurement brackets over high-contrast imagery.</p>
              </div>
              <div className={styles.detailItem}>
                <h4>MOBILE</h4>
                <p>Photography adapts above the headline, keeping primary CTA above the fold.</p>
              </div>
            </>
          )}

          {activeConcept === "conceptB" && (
            <>
              <div className={styles.detailItem}>
                <h4>VISUAL MOOD</h4>
                <p><strong>Architectural &amp; Schematic:</strong> CAD hair lines, blueprint grid, and confirmed service category taxonomy.</p>
              </div>
              <div className={styles.detailItem}>
                <h4>GRAPHIC LAYER</h4>
                <p>Interactive service matrix, aperture framing with chamfered bevels.</p>
              </div>
              <div className={styles.detailItem}>
                <h4>MOBILE</h4>
                <p>Matrix collapses into a 2x2 grid below the primary CTA.</p>
              </div>
            </>
          )}

          {activeConcept === "conceptC" && (
            <>
              <div className={styles.detailItem}>
                <h4>VISUAL MOOD</h4>
                <p><strong>Industrial Editorial:</strong> High-end engineering journal layout with extreme scale contrast and whitespace.</p>
              </div>
              <div className={styles.detailItem}>
                <h4>GRAPHIC LAYER</h4>
                <p>Oversized background monogram watermark and concise capability dossier.</p>
              </div>
              <div className={styles.detailItem}>
                <h4>MOBILE</h4>
                <p>Asymmetric layout flows into a sequenced vertical dossier on mobile screens.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
