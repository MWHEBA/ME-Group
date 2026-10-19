import React from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import styles from "./SparePartsSection.module.css";

interface SparePartsSectionProps {
  locale?: "en" | "ar";
}

export function SparePartsSection({ locale = "en" }: SparePartsSectionProps) {
  const isArabic = locale === "ar";

  const requisitionFields = isArabic
    ? [
        { label: "توصيف القطعة", detail: "الاسم الدقيق أو الوصف الفني للقطعة" },
        { label: "الرقم الكودي", detail: "كود المصنّع OEM أو رقم الرسم الهندسي" },
        { label: "الشركة المصنعة", detail: "اسم المصنّع والعلامة التجارية" },
        { label: "طراز المعدة", detail: "الرقم التسلسلي ومواصفات الطراز" },
        { label: "الكمية وموعد التسليم", detail: "العدد المطلوب وميناء التسليم المستهدف" },
        { label: "صورة لوحة البيانات", detail: "صورة مباشرة للوحة بيانات الماكينة (Nameplate)" },
      ]
    : [
        { label: "PART IDENTIFIER", detail: "Exact Part Name or Description" },
        { label: "PART NUMBER", detail: "Maker OEM Code or Drawing Ref" },
        { label: "EQUIPMENT MAKER", detail: "Manufacturer & Brand" },
        { label: "EQUIPMENT MODEL", detail: "Serial & Type Spec" },
        { label: "QUANTITY & DATE", detail: "Units Required & Target Delivery" },
        { label: "NAMEPLATE PHOTO", detail: "Direct Photo of Equipment Plate" },
      ];

  return (
    <section
      className={styles.partsSection}
      aria-label={isArabic ? "توريد قطع الغيار البحرية" : "Marine Spare Parts Sourcing"}
    >
      <Container>
        <div className={styles.partsGrid}>
          {/* Left Column: Commercial Statement */}
          <div className={styles.statementCol}>
            <span className={styles.kicker}>
              {isArabic ? "توريد / قطع غيار بحرية" : "SUPPLY / SPARES"}
            </span>
            <h2 className={styles.headline}>
              {isArabic ? (
                <>
                  تعرف رقم القطعة؟<br />
                  أرسل الرقم الكودي.<br />
                  <span className={styles.subHeadline}>
                    لا تعرف رقم القطعة؟<br />
                    أرسل صورة لوحة البيانات (Nameplate).
                  </span>
                </>
              ) : (
                <>
                  KNOW THE PART?<br />
                  SEND THE NUMBER.<br />
                  <span className={styles.subHeadline}>
                    DON&apos;T KNOW THE PART?<br />
                    SEND THE NAMEPLATE.
                  </span>
                </>
              )}
            </h2>

            <p className={styles.description}>
              {isArabic
                ? "نُبسّط إجراءات توفير وشحن قطع الغيار البحرية. سواء كنت تملك الأرقام الكودية الأصلية لرسومات المصنّع (OEM) أو فقط صورة للوحة البيانات المثبتة على الماكينة، يتولى فريقنا الهندسي الفحص الفني والمطابقة والتوريد السريع لأدق المكونات."
                : "We streamline marine equipment spare part procurement. Whether you possess exact OEM drawing numbers or only an onboard machinery nameplate photo, our technical sourcing team identifies, verifies, and dispatches the correct components."}
            </p>

            <div className={styles.actionWrap}>
              <Link
                href={isArabic ? "/ar/contact/spare-parts" : "/contact/spare-parts"}
                className={styles.primaryBtn}
              >
                <span>{isArabic ? "طلب قطع غيار بحرية" : "REQUEST SPARE PARTS"}</span>
                <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Sourcing Protocol Card */}
          <div className={styles.protocolCol}>
            <div className={styles.protocolCard}>
              <div className={styles.cardHeader}>
                <span className={styles.headerTag}>
                  {isArabic ? "بروتوكول طلب التوريد" : "REQUISITION PROTOCOL"}
                </span>
                <span className={styles.headerCode}>
                  {isArabic ? "توريد / 09" : "PROCURE / 09"}
                </span>
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
                  {isArabic
                    ? "نستقبل صور لوحات البيانات والرسومات الهندسية مباشرة عبر نموذج الاستفسار الآمن."
                    : "Nameplate photos and technical drawings accepted via secure inquiry."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
