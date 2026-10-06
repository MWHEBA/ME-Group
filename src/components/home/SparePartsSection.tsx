import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import styles from "./SparePartsSection.module.css";

export function SparePartsSection() {
  const requisitionFields = [
    { label: "PART IDENTIFIER", detail: "Exact Part Name or Description" },
    { label: "PART NUMBER", detail: "Maker OEM Code or Drawing Ref" },
    { label: "EQUIPMENT MAKER", detail: "Manufacturer & Brand" },
    { label: "EQUIPMENT MODEL", detail: "Serial & Type Spec" },
    { label: "QUANTITY & DATE", detail: "Units Required & Target Delivery" },
    { label: "NAMEPLATE PHOTO", detail: "Direct Photo of Equipment Plate" },
  ];

  return (
    <section className={styles.partsSection} aria-label="Marine Spare Parts Sourcing">
      <Container>
        <div className={styles.partsGrid}>
          {/* Left Column: Commercial Statement */}
          <div className={styles.statementCol}>
            <span className={styles.kicker}>SUPPLY / SPARES</span>
            <h2 className={styles.headline}>
              KNOW THE PART?<br />
              SEND THE NUMBER.<br />
              <span className={styles.subHeadline}>
                DON&apos;T KNOW THE PART?<br />
                SEND THE NAMEPLATE.
              </span>
            </h2>

            <p className={styles.description}>
              We streamline marine equipment spare part procurement. Whether you possess exact OEM drawing numbers or only an onboard machinery nameplate photo, our technical sourcing team identifies, verifies, and dispatches the correct components.
            </p>

            <div className={styles.actionWrap}>
              <Link href="/contact/spare-parts" className={styles.primaryBtn}>
                <span>REQUEST SPARE PARTS</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Sourcing Protocol Card */}
          <div className={styles.protocolCol}>
            <div className={styles.protocolCard}>
              <div className={styles.cardHeader}>
                <span className={styles.headerTag}>REQUISITION PROTOCOL</span>
                <span className={styles.headerCode}>PROCURE / 09</span>
              </div>

              <div className={styles.fieldsGrid}>
                {requisitionFields.map((field, idx) => (
                  <div key={idx} className={styles.fieldItem}>
                    <span className={styles.fieldIndex}>0{idx + 1}</span>
                    <div className={styles.fieldText}>
                      <span className={styles.fieldLabel}>{field.label}</span>
                      <span className={styles.fieldDetail}>{field.detail}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.protocolFooter}>
                <span className={styles.footerNote}>
                  Nameplate photos and technical drawings accepted via secure inquiry.
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
