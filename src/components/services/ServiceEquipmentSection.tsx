import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import type { EquipmentItem } from "@/content/services";
import styles from "./ServiceEquipmentSection.module.css";

interface ServiceEquipmentSectionProps {
  equipment: EquipmentItem[];
  disciplineTitle: string;
  locale?: "en" | "ar";
}

export function ServiceEquipmentSection({
  equipment,
  disciplineTitle,
  locale = "en",
}: ServiceEquipmentSectionProps) {
  const isAr = locale === "ar";

  return (
    <section className={styles.equipmentSection} aria-label="Confirmed Equipment Handled">
      <Container>
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <span className={styles.kicker}>
              {isAr ? "تصنيف الآلات والمنظومات" : "MACHINERY & SYSTEM TAXONOMY"}
            </span>
            <h2 className={styles.title}>
              {isAr ? "المعدات والآلات المعتمدة" : "CONFIRMED EQUIPMENT HANDLED"}
            </h2>
            <p className={styles.subtitle}>
              {isAr
                ? `النطاق الفني المعتمد في ${disciplineTitle}.`
                : `Technical scope supported across ${disciplineTitle}.`}
            </p>
          </div>
          <div className={styles.headerRight}>
            <Link
              href={isAr ? "/ar/capabilities" : "/capabilities"}
              className={styles.matrixLink}
            >
              <span>{isAr ? "مصفوفة القدرات الفنية الكاملة" : "VIEW FULL CAPABILITY MATRIX"}</span>
              <span aria-hidden="true">{isAr ? "←" : "→"}</span>
            </Link>
          </div>
        </div>

        <div className={styles.equipmentGrid}>
          {equipment.map((item, idx) => (
            <div key={idx} className={styles.equipmentCard}>
              <div className={styles.cardTop}>
                <span className={styles.categoryBadge}>{item.category}</span>
                <span className={styles.statusIndicator} title="Confirmed Capability">
                  ●
                </span>
              </div>
              <h3 className={styles.equipmentName}>{item.name}</h3>
              {item.notes && <p className={styles.equipmentNotes}>{item.notes}</p>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
