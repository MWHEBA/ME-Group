import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { CONFIRMED_EQUIPMENT } from "@/content/home";
import styles from "./EquipmentTaxonomySection.module.css";

export function EquipmentTaxonomySection() {
  return (
    <section
      className={styles.taxonomySection}
      aria-label="Supported Machinery and Equipment Taxonomy"
    >
      <Container>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.kicker}>MACHINERY TAXONOMY</span>
            <h2 className={styles.title}>SUPPORTED VESSEL EQUIPMENT</h2>
          </div>
          <p className={styles.subtitle}>
            Field-tested technical support, overhauls, and calibration across confirmed core marine machinery and propulsion subsystems.
          </p>
        </div>

        {/* Taxonomy Categories Grid */}
        <div className={styles.taxonomyGrid}>
          {CONFIRMED_EQUIPMENT.map((group, idx) => (
            <div key={idx} className={styles.taxonomyCard}>
              <div className={styles.cardHeader}>
                <span className={styles.groupCode}>0{idx + 1} / CAT</span>
                <h3 className={styles.groupTitle}>{group.category}</h3>
              </div>

              <ul className={styles.itemList}>
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx} className={styles.itemRow}>
                    <span className={styles.itemTag}>EQ / 0{itemIdx + 1}</span>
                    <span className={styles.itemName}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Section Action Bar */}
        <div className={styles.actionBar}>
          <div className={styles.actionNote}>
            Need technical service or diagnostics for specific vessel equipment?
          </div>
          <Link href="/contact/technical-support" className={styles.actionLink}>
            <span>INQUIRE ABOUT SPECIFIC MACHINERY</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
