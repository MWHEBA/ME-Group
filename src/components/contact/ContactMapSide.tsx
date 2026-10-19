"use client";

import React from "react";
import styles from "./ContactMapSide.module.css";

export const headOffice = {
  name: "ME Group Head Office & Commercial Administration",
  role: "HEAD OFFICE & COMMERCIAL ADMINISTRATION",
  coordinates: "31.2592° N, 29.9875° E",
  address: "Mandara Bahari, Montaza 2nd District, Alexandria, Egypt",
  operationsHub: "Alexandria Port Maritime Area and all ports All over Egypt",
  phone: "+20 3 5510000",
  mobile: "+20 1012116108",
  secondaryMobile: "+20 1223855644",
  email: "info@MEGroup-eg.com",
  workingHours: "Saturday – Thursday: 10:00 – 18:00 (24/7 Technical Dispatch Available)",
  bbox: "29.9700%2C31.2450%2C30.0050%2C31.2750",
  marker: "31.2592%2C29.9875",
  osmUrl: "https://www.openstreetmap.org/?mlat=31.2592&mlon=29.9875#map=16/31.2592/29.9875",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=31.2592,29.9875",
};

interface ContactMapSideProps {
  locale?: "en" | "ar";
}

export function ContactMapSide({ locale = "en" }: ContactMapSideProps) {
  const isAr = locale === "ar";
  const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${headOffice.bbox}&layer=mapnik&marker=${headOffice.marker}`;

  const address = isAr
    ? "المندرة بحري، حي ثان المنتزه، الإسكندرية، مصر"
    : headOffice.address;
  const operationsHub = isAr
    ? "المنطقة البحرية بميناء الإسكندرية وجميع موانئ جمهورية مصر العربية"
    : headOffice.operationsHub;
  const workingHours = isAr
    ? "السبت – الخميس: 10:00 – 18:00 (خدمة الفرز الهندسي متاحة 24/7)"
    : headOffice.workingHours;
  const role = isAr
    ? "المقر الرئيسي والإدارة التجارية"
    : headOffice.role;

  return (
    <aside
      className={styles.mapSidebar}
      aria-label={isAr ? "موقع المقر الرئيسي لمجموعة ME Group والخريطة التفاعلية" : "ME Group Head Office Location and Interactive Map"}
    >
      <div className={styles.mapCard}>
        {/* Card Header with Custom Business Pin */}
        <div className={styles.mapCardHeader}>
          <div className={styles.customPinBadge}>
            <div className={styles.pinIconWrap} aria-hidden="true">
              📍
            </div>
            <span className={styles.pinHubTitle}>{isAr ? "المقر الرئيسي" : "HEAD OFFICE"}</span>
          </div>
          <span className={styles.coordBadge}>{headOffice.coordinates}</span>
        </div>

        {/* 100% Free OpenStreetMap Interactive Tile Embed */}
        <div className={styles.mapIframeContainer}>
          <iframe
            title={isAr ? "خريطة موقع المقر الرئيسي لمجموعة ME Group" : "ME Group Head Office Location Map"}
            src={embedSrc}
            className={styles.realIframe}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Location Info Footer */}
        <div className={styles.mapCardFooter}>
          <span className={styles.hubRole}>{role}</span>
          <p className={styles.hubAddress}>
            <strong>{isAr ? "المقر الرئيسي:" : "Head Office:"}</strong> {address}
          </p>
          <p className={styles.hubAddress}>
            <strong>{isAr ? "المركز التشغيلي:" : "Operations Hub:"}</strong> {operationsHub}
          </p>
          <p className={styles.hubHours}>
            <strong>{isAr ? "مواعيد العمل:" : "Office Hours:"}</strong> {workingHours}
          </p>

          {/* Direct Communication Channels */}
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{isAr ? "الهاتف:" : "TEL:"}</span>
              <a href={`tel:${headOffice.phone.replace(/\s+/g, '')}`} className={styles.contactLink}>
                {headOffice.phone}
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{isAr ? "الفرز 24/7:" : "DISPATCH:"}</span>
              <a href={`tel:${headOffice.mobile.replace(/\s+/g, '')}`} className={styles.contactLink}>
                {headOffice.mobile}
              </a>
              <a
                href={`https://wa.me/${headOffice.mobile.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsAppLink}
                aria-label={isAr ? "فرز واتساب" : "WhatsApp Dispatch"}
              >
                ({isAr ? "واتساب ↗" : "WhatsApp ↗"})
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{isAr ? "العمليات:" : "OPS:"}</span>
              <a href={`tel:${headOffice.secondaryMobile.replace(/\s+/g, '')}`} className={styles.contactLink}>
                {headOffice.secondaryMobile}
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{isAr ? "البريد:" : "EMAIL:"}</span>
              <a href={`mailto:${headOffice.email}`} className={styles.contactLink}>
                {headOffice.email}
              </a>
            </div>
          </div>

          <div className={styles.footerActions}>
            <a
              href={headOffice.osmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalLink}
            >
              <span>{isAr ? "عرض الخريطة الكاملة / الاتجاهات ↗" : "View Full Map / Directions ↗"}</span>
            </a>
            <span className={styles.activeStatus}>{isAr ? "الفرز الفني نشط" : "DISPATCH ACTIVE"}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
