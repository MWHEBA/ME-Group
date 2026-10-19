import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { CONFIRMED_EQUIPMENT } from "@/content/home";
import { CONFIRMED_EQUIPMENT_AR } from "@/content/ar/home";
import styles from "./EquipmentTaxonomySection.module.css";

interface EquipmentTaxonomySectionProps {
  locale?: "en" | "ar";
}

export function EquipmentTaxonomySection({ locale = "en" }: EquipmentTaxonomySectionProps) {
  const isArabic = locale === "ar";
  const equipment = isArabic ? CONFIRMED_EQUIPMENT_AR : CONFIRMED_EQUIPMENT;

  return (
    <section
      className={styles.taxonomySection}
      aria-label={isArabic ? "تصنيف الآلات والمعدات البحرية" : "Supported Machinery and Equipment Taxonomy"}
    >
      <Container>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.kicker}>
              {isArabic ? "تصنيف المعدات والآلات" : "MACHINERY TAXONOMY"}
            </span>
            <h2 className={styles.title}>
              {isArabic ? "الآلات والمعدات البحرية المعتمدة" : "SUPPORTED VESSEL EQUIPMENT"}
            </h2>
          </div>
          <p className={styles.subtitle}>
            {isArabic
              ? "دعم فني ميداني معتمد، وعمرات شاملة، ومعايرة عبر كافة المنظومات الميكانيكية والكهربائية على متن السفن."
              : "Field-tested technical support, overhauls, and calibration across confirmed core marine machinery and propulsion subsystems."}
          </p>
        </div>

        {/* Taxonomy Categories Grid */}
        <div className={styles.taxonomyGrid}>
          {equipment.map((group, idx) => (
            <div key={idx} className={styles.taxonomyCard}>
              <div className={styles.cardHeader}>
                <span className={styles.groupCode}>
                  {isArabic ? `0${idx + 1} / فئة` : `0${idx + 1} / CAT`}
                </span>
                <h3 className={styles.groupTitle}>{group.category}</h3>
              </div>

              <ul className={styles.itemList}>
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx} className={styles.itemRow}>
                    <span className={styles.itemTag}>
                      {isArabic ? `معدة / 0${itemIdx + 1}` : `EQ / 0${itemIdx + 1}`}
                    </span>
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
            {isArabic
              ? "هل تحتاج إلى خدمة فنية أو فحص تشخيصي لمعدة بحرية محددة؟"
              : "Need technical service or diagnostics for specific vessel equipment?"}
          </div>
          <Link
            href={isArabic ? "/ar/contact/technical-support" : "/contact/technical-support"}
            className={styles.actionLink}
          >
            <span>{isArabic ? "استفسر عن معدة محددة" : "INQUIRE ABOUT SPECIFIC MACHINERY"}</span>
            <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
