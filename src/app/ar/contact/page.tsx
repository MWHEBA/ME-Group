import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { GeneralEnquiryForm } from "@/components/forms/GeneralEnquiryForm";
import { ContactMapSide } from "@/components/contact/ContactMapSide";
import styles from "@/app/contact/contact.module.css";

export const metadata: Metadata = {
  title: "اتصل بنا والاستفسارات التجارية | مجموعة ME Group",
  description:
    "تواصل مع مجموعة الهندسة البحرية ME Group للاستفسارات التجارية، شراكات الصيانة البحرية، أو المراسلات المؤسسية العامة.",
};

export default function ArabicContactPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={styles.heroSection} aria-label="الاستفسارات العامة والتجارية">
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.kicker}>الاستفسارات العامة والتجارية</span>
            <h1 className={styles.pageTitle}>التواصل التجاري والمؤسسي</h1>
            <p className={styles.pageSubtitle}>
              للتواصل المؤسسي، الشراكات البحرية، أو الاستفسارات التجارية العامة.
            </p>
          </div>
        </Container>
      </section>

      {/* Side-by-Side: Form and Real Interactive Map */}
      <section className={styles.generalSection} id="general-enquiry" aria-label="نموذج الاستفسار وخريطة العمليات">
        <Container>
          <div className={styles.contactGrid}>
            <div className={styles.formContainer}>
              <GeneralEnquiryForm locale="ar" />
            </div>
            <div className={styles.mapContainer}>
              <ContactMapSide locale="ar" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
