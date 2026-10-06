import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import type { EquipmentItem } from "@/content/services";
import styles from "./ServiceEquipmentSection.module.css";

interface ServiceEquipmentSectionProps {
  equipment: EquipmentItem[];
  disciplineTitle: string;
}

export function ServiceEquipmentSection({
  equipment,
  disciplineTitle,
}: ServiceEquipmentSectionProps) {
  return (
    <section className={styles.equipmentSection} aria-label="Confirmed Equipment Handled">
      <Container>
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <span className={styles.kicker}>MACHINERY &amp; SYSTEM TAXONOMY</span>
            <h2 className={styles.title}>CONFIRMED EQUIPMENT HANDLED</h2>
            <p className={styles.subtitle}>
              Technical scope supported across {disciplineTitle}.
            </p>
          </div>
          <div className={styles.headerRight}>
            <Link href="/capabilities" className={styles.matrixLink}>
              <span>VIEW FULL CAPABILITY MATRIX</span>
              <span aria-hidden="true">→</span>
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
