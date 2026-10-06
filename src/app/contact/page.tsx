import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { GeneralEnquiryForm } from "@/components/forms/GeneralEnquiryForm";
import { ContactMapSide } from "@/components/contact/ContactMapSide";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact & General Enquiry | ME Group",
  description:
    "Get in touch with Marine Engineering Group for commercial inquiries, corporate partnerships, or general business communications.",
};

export default function ContactPage() {
  return (
    <div className={styles.pageWrap}>
      <section className={styles.heroSection} aria-label="General Company Enquiry">
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.kicker}>GENERAL ENQUIRY</span>
            <h1 className={styles.pageTitle}>COMMERCIAL &amp; COMPANY COMMUNICATIONS</h1>
            <p className={styles.pageSubtitle}>
              For corporate communications, business partnerships, or general inquiries.
            </p>
          </div>
        </Container>
      </section>

      {/* Side-by-Side: Form and Real Interactive Map */}
      <section className={styles.generalSection} id="general-enquiry" aria-label="General Company Enquiry and Operations Map">
        <Container>
          <div className={styles.contactGrid}>
            <div className={styles.formContainer}>
              <GeneralEnquiryForm />
            </div>
            <div className={styles.mapContainer}>
              <ContactMapSide />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
