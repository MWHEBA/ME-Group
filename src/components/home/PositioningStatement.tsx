import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import styles from "./PositioningStatement.module.css";

interface PositioningStatementProps {
  locale?: "en" | "ar";
}

export function PositioningStatement({ locale = "en" }: PositioningStatementProps) {
  const isArabic = locale === "ar";

  const disciplines = isArabic
    ? [
        {
          code: "01",
          title: "الدفع والآلات الميكانيكية",
          desc: "محركات الديزل، الشواحن التوربينية، مضخات الطرد المركزي، والآلات المساعدة الدوارة.",
        },
        {
          code: "02",
          title: "الطاقة الكهربائية والتوزيع",
          desc: "لوحات التوزيع الرئيسية 440V، قواطع المزامنة، المولدات البحرية، ومنظمات الجهد الرقمية AVR.",
        },
        {
          code: "03",
          title: "التحكم الآلي والمراقبة",
          desc: "بنية وحدات الـ PLC، أنظمة الإنذار والمراقبة (AMS)، إدارة الطاقة (PMS)، ودوائر الحماية.",
        },
        {
          code: "04",
          title: "الأنظمة الهوائية والصمامات",
          desc: "ضواغط هواء بدء الحركة 30-bar، مجففات الهواء، الأسطوانات، ومجموعات صمامات المناورة.",
        },
      ]
    : [
        {
          code: "01",
          title: "MECHANICAL PROPULSION",
          desc: "Engines, turbochargers, heavy centrifugal pumps, and auxiliary rotating machinery.",
        },
        {
          code: "02",
          title: "ELECTRICAL POWER",
          desc: "Main 440V switchboards, synchronizing breakers, marine generators, and digital AVRs.",
        },
        {
          code: "03",
          title: "AUTOMATION & CONTROL",
          desc: "PLC architectures, alarm monitoring (AMS), power management (PMS), and safety loops.",
        },
        {
          code: "04",
          title: "PNEUMATICS & VALVES",
          desc: "30-bar starting air compressors, dryers, cylinders, and maneuvering valve assemblies.",
        },
      ];

  return (
    <section className={styles.positioningSection} aria-label={isArabic ? "بيان الهوية الهندسية" : "ME Group Positioning Statement"}>
      <Container>
        <div className={styles.sectionGrid}>
          {/* Left Column: Editorial Statement */}
          <div className={styles.statementCol}>
            <span className={styles.kicker}>
              {isArabic ? "هندسة بحرية متكاملة" : "INTEGRATED MARINE ENGINEERING"}
            </span>
            <h2 className={styles.headline}>
              {isArabic ? (
                <>
                  شريك هندسي واحد.<br />
                  لكافة الأنظمة الحيوية.
                </>
              ) : (
                <>
                  ONE ENGINEERING PARTNER.<br />
                  MULTIPLE CRITICAL SYSTEMS.
                </>
              )}
            </h2>
            <p className={styles.leadParagraph}>
              {isArabic
                ? "لا تحتمل السفن الحديثة تجزئة معالجة الأعطال الفنية. تقدم ME Group دعماً هندسياً متكاملاً يغطي الآلات الميكانيكية، وتوزيع الطاقة الكهربائية، ومنطق التحكم الآلي، والأنظمة الهوائية — لإعادة الموثوقية التشغيلية بمسؤولية هندسية موحدة ومباشرة."
                : "Modern vessels cannot afford fragmented troubleshooting. ME Group delivers cohesive technical support across mechanical machinery, high-power electrical distribution, automated control logic, and pneumatic systems — restoring operational reliability with singular accountability."}
            </p>
            <div className={styles.actionWrap}>
              <Link
                href={isArabic ? "/ar/company" : "/company"}
                className={styles.textLink}
              >
                <span>
                  {isArabic ? "عن معاييرنا ومنهجيتنا الهندسية" : "ABOUT OUR ENGINEERING STANDARDS"}
                </span>
                <span className={styles.arrow}>{isArabic ? "←" : "→"}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Indexed Disciplines & Technical Callout */}
          <div className={styles.disciplinesCol}>
            <div className={styles.disciplinesCard}>
              <div className={styles.cardHeader}>
                <span className={styles.headerTag}>
                  {isArabic ? "واجهات الأنظمة" : "SYSTEM INTERFACES"}
                </span>
                <span className={styles.headerStatus}>
                  {isArabic ? "تكامل تام" : "TOTAL INTEGRATION"}
                </span>
              </div>

              <div className={styles.disciplineList}>
                {disciplines.map((item) => (
                  <div key={item.code} className={styles.disciplineItem}>
                    <span className={styles.itemCode}>{item.code}</span>
                    <div className={styles.itemContent}>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
