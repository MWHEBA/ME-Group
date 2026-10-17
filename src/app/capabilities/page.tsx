import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { CAPABILITIES_CONTENT } from "@/content/capabilities";
import { ctas } from "@/content/site";
import styles from "./capabilities.module.css";

export const metadata: Metadata = {
  title: CAPABILITIES_CONTENT.seoTitle,
  description: CAPABILITIES_CONTENT.seoDescription,
};

export default function CapabilitiesPage() {
  const {
    kicker,
    heroHeading,
    heroSubheading,
    leadStatement,
    categories,
    crossDisciplineScenarios,
  } = CAPABILITIES_CONTENT;

  return (
    <div className={styles.pageWrap}>
      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="Capabilities Overview">
        <Container>
          <div className={styles.heroInner}>
            <div className={styles.kickerRow}>
              <span className={styles.kicker}>{kicker}</span>
              <span className={styles.divider}>/</span>
              <span className={styles.scopeTag}>CONFIRMED TECHNICAL PORTFOLIO</span>
            </div>

            <h1 className={styles.heroTitle}>{heroHeading}</h1>

            <p className={styles.heroSub}>{heroSubheading}</p>

            <p className={styles.leadText}>{leadStatement}</p>

            <div className={styles.heroActions}>
              <Link href={ctas.technicalSupport.href} className={styles.primaryBtn}>
                <span>REQUEST TECHNICAL SUPPORT</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/services" className={styles.secondaryBtn}>
                <span>EXPLORE SERVICES INDEX</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Cross-Disciplinary Problem Navigation */}
      <section className={styles.crossScenariosSection} aria-label="Cross-Discipline Triage Scenarios">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>CROSS-DISCIPLINARY PERSPECTIVE</span>
            <h2 className={styles.sectionTitle}>WHY VESSEL FAULTS CROSS DISCIPLINES</h2>
            <p className={styles.sectionSubtitle}>
              A single operational alarm often originates across mechanical clearances, electrical excitation, and automation logic.
            </p>
          </div>

          <div className={styles.scenariosGrid}>
            {crossDisciplineScenarios.map((scen) => (
              <div key={scen.id} className={styles.scenarioCard}>
                <div className={styles.scenTop}>
                  <span className={styles.scenBadge}>FAULT ANALYSIS</span>
                  <h3 className={styles.scenTitle}>{scen.title}</h3>
                </div>

                <div className={styles.symptomBox}>
                  <span className={styles.label}>OBSERVED OPERATIONAL SYMPTOM</span>
                  <p className={styles.symptomText}>{scen.observedSymptom}</p>
                </div>

                <div className={styles.disciplinesBox}>
                  <span className={styles.label}>SYSTEMS INVOLVED IN RESOLUTION</span>
                  <div className={styles.disciplinesList}>
                    {scen.disciplinesInvolved.map((d, dIdx) => (
                      <div key={dIdx} className={styles.disciplineRow}>
                        <div className={styles.discBadgeCol}>
                          <span className={styles.discCode}>SYS / {d.code}</span>
                          <span className={styles.discName}>{d.name}</span>
                        </div>
                        <p className={styles.discRole}>{d.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.resolutionBox}>
                  <span className={styles.label}>INTEGRATED ME GROUP RESOLUTION</span>
                  <p className={styles.resolutionText}>{scen.integratedResolution}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Equipment & Systems Matrix */}
      <section className={styles.matrixSection} aria-label="Machinery and Equipment Matrix">
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionKicker}>EQUIPMENT PORTFOLIO</span>
            <h2 className={styles.sectionTitle}>TECHNICAL MACHINERY MATRIX</h2>
            <p className={styles.sectionSubtitle}>
              Confirmed equipment handled across marine propulsion, power generation, switchgear, automation, fluid lines, and navigation electronics.
            </p>
          </div>

          <div className={styles.categoriesStack}>
            {categories.map((cat) => (
              <div key={cat.id} className={styles.categoryBlock}>
                <div className={styles.categoryBlockHeader}>
                  <div className={styles.catTitleWrap}>
                    <span className={styles.catCode}>{cat.code}</span>
                    <h3 className={styles.catTitle}>{cat.title.toUpperCase()}</h3>
                  </div>
                  <p className={styles.catSummary}>{cat.summary}</p>
                </div>

                <div className={styles.equipmentCardsGrid}>
                  {cat.equipmentList.map((eq, eqIdx) => (
                    <div key={eqIdx} className={styles.eqCard}>
                      <div className={styles.eqCardHeader}>
                        <span className={styles.primaryBadge}>{eq.primaryDiscipline}</span>
                        <Link href={eq.serviceRoute} className={styles.serviceLink}>
                          <span>DISCIPLINE DETAILS</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>

                      <h4 className={styles.eqName}>{eq.name}</h4>
                      <p className={styles.eqScope}>{eq.scopeSummary}</p>

                      <div className={styles.eqRelated}>
                        <span className={styles.relatedLabel}>INTERFACES WITH:</span>
                        <div className={styles.relatedTags}>
                          {eq.relatedDisciplines.map((rel, rIdx) => (
                            <span key={rIdx} className={styles.relTag}>
                              {rel}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Capabilities Conversion Action */}
      <section className={styles.actionSection} aria-label="Capabilities Intake Action">
        <Container>
          <div className={styles.actionCard}>
            <div className={styles.actionLeft}>
              <span className={styles.actionKicker}>TECHNICAL INTAKE</span>
              <h2 className={styles.actionTitle}>DOES YOUR ONBOARD EQUIPMENT REQUIRE INTERVENTION?</h2>
              <p className={styles.actionDesc}>
                Specify your machinery maker, model, and symptoms. Our marine engineering team compiles the necessary tooling and engineers.
              </p>
            </div>
            <div className={styles.actionRight}>
              <Link href={ctas.technicalSupport.href} className={styles.actionBtn}>
                <span>REQUEST TECHNICAL SUPPORT</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
