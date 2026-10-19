import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { SparePartsForm } from "@/components/forms/SparePartsForm";
import styles from "@/app/contact/spare-parts/spare-parts.module.css";

export const metadata: Metadata = {
  title: "طلب قطع غيار بحرية | توريد المكونات الأصلية OEM | ME Group",
  description:
    "توريد قطع غيار ومكونات الآلات البحرية وأطقم الإصلاح الأصلية. أرسل أرقام القطع الدقيقة أو صور لوحات بيانات المعدات (Nameplate) للتعرف عليها ومطابقتها فوراً.",
};

export default function ArabicSparePartsPage() {
  return (
    <div className={styles.pageWrap}>
      {/* Header Section */}
      <section className={styles.headerSection} aria-label="رأس صفحة طلب قطع الغيار البحرية">
        <Container>
          <div className={styles.headerContent}>
            <div className={styles.tagRow}>
              <span className={styles.kicker}>التوريد / 03</span>
              <span className={styles.tag}>توريد المكونات والقطع البحرية</span>
            </div>
            <h1 className={styles.pageTitle}>طلب قطع الغيار البحرية</h1>
            <p className={styles.pageSubtitle}>
              هل تعرف رقم القطعة بالضبط؟ أرسل الكود الفني. غير متأكد من رقم القطعة الدقيق؟ أرسل صورة واضحة للوحة بيانات المعدة (Nameplate) وسيقوم فريق التوريد الهندسي لدينا بتحديد مواصفات المصنّع الأصلي OEM فوراً.
            </p>
          </div>
        </Container>
      </section>

      {/* Form Body */}
      <section className={styles.formSection} aria-label="نموذج طلب توريد قطع الغيار">
        <Container>
          <div className={styles.formWrapper}>
            <SparePartsForm locale="ar" />
          </div>
        </Container>
      </section>
    </div>
  );
}
