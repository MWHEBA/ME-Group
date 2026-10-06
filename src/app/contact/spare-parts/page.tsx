import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { SparePartsForm } from "@/components/forms/SparePartsForm";
import styles from "./spare-parts.module.css";

export const metadata: Metadata = {
  title: "Request Marine Spare Parts | OEM & Component Sourcing | ME Group",
  description:
    "Source marine equipment spare parts, components, and replacement kits. Submit exact OEM part numbers or machinery nameplate photos for identification.",
};

export default function SparePartsPage() {
  return (
    <div className={styles.pageWrap}>
      {/* Header Section */}
      <section className={styles.headerSection} aria-label="Spare Parts Sourcing Header">
        <Container>
          <div className={styles.headerContent}>
            <div className={styles.tagRow}>
              <span className={styles.kicker}>SUPPLY / 03</span>
              <span className={styles.tag}>MARINE COMPONENT SOURCING</span>
            </div>
            <h1 className={styles.pageTitle}>REQUEST MARINE SPARE PARTS</h1>
            <p className={styles.pageSubtitle}>
              Know the exact part number? Send the code. Unsure of the specific part? Send a photo of the machinery nameplate and our technical sourcing team will identify the OEM specification.
            </p>
          </div>
        </Container>
      </section>

      {/* Form Body */}
      <section className={styles.formSection} aria-label="Spare Parts Requisition Form">
        <Container>
          <div className={styles.formWrapper}>
            <SparePartsForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
