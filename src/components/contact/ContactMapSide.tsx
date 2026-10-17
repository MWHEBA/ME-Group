"use client";

import React from "react";
import styles from "./ContactMapSide.module.css";

export const headOffice = {
  name: "ME Group Head Office & Commercial Administration",
  role: "HEAD OFFICE & COMMERCIAL ADMINISTRATION",
  coordinates: "31.2592° N, 29.9875° E",
  address: "Iskander Ibrahim St., Miami, Alexandria, Egypt",
  operationsHub: "Alexandria Port Maritime Area, Alexandria, Egypt",
  phone: "+20 3 5510000",
  mobile: "+20 1012116108",
  secondaryMobile: "+20 1223855644",
  email: "info@MEGroup-eg.com",
  workingHours: "Sunday – Thursday: 08:00 – 17:00 (24/7 Technical Dispatch Available)",
  bbox: "29.9700%2C31.2450%2C30.0050%2C31.2750",
  marker: "31.2592%2C29.9875",
  osmUrl: "https://www.openstreetmap.org/?mlat=31.2592&mlon=29.9875#map=16/31.2592/29.9875",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=31.2592,29.9875",
};

export function ContactMapSide() {
  const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${headOffice.bbox}&layer=mapnik&marker=${headOffice.marker}`;

  return (
    <aside className={styles.mapSidebar} aria-label="ME Group Head Office Location and Interactive Map">
      <div className={styles.mapCard}>
        {/* Card Header with Custom Business Pin */}
        <div className={styles.mapCardHeader}>
          <div className={styles.customPinBadge}>
            <div className={styles.pinIconWrap} aria-hidden="true">
              📍
            </div>
            <span className={styles.pinHubTitle}>HEAD OFFICE</span>
          </div>
          <span className={styles.coordBadge}>{headOffice.coordinates}</span>
        </div>

        {/* 100% Free OpenStreetMap Interactive Tile Embed */}
        <div className={styles.mapIframeContainer}>
          <iframe
            title="ME Group Head Office Location Map"
            src={embedSrc}
            className={styles.realIframe}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Location Info Footer */}
        <div className={styles.mapCardFooter}>
          <span className={styles.hubRole}>{headOffice.role}</span>
          <p className={styles.hubAddress}>
            <strong>Head Office:</strong> {headOffice.address}
          </p>
          <p className={styles.hubAddress}>
            <strong>Operations Hub:</strong> {headOffice.operationsHub}
          </p>
          <p className={styles.hubHours}>
            <strong>Office Hours:</strong> {headOffice.workingHours}
          </p>

          {/* Direct Communication Channels */}
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>TEL:</span>
              <a href={`tel:${headOffice.phone.replace(/\s+/g, '')}`} className={styles.contactLink}>
                {headOffice.phone}
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>DISPATCH:</span>
              <a href={`tel:${headOffice.mobile.replace(/\s+/g, '')}`} className={styles.contactLink}>
                {headOffice.mobile}
              </a>
              <a
                href={`https://wa.me/${headOffice.mobile.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsAppLink}
                aria-label="WhatsApp Dispatch"
              >
                (WhatsApp ↗)
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>OPS:</span>
              <a href={`tel:${headOffice.secondaryMobile.replace(/\s+/g, '')}`} className={styles.contactLink}>
                {headOffice.secondaryMobile}
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>EMAIL:</span>
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
              <span>View Full Map / Directions ↗</span>
            </a>
            <span className={styles.activeStatus}>DISPATCH ACTIVE</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
