"use client";

import React from "react";
import styles from "./ContactMapSide.module.css";

export const headOffice = {
  name: "ME Group Head Office & Operations Complex",
  role: "HEAD OFFICE & ENGINEERING HEADQUARTERS",
  coordinates: "31.1925° N, 29.8950° E",
  address: "Alexandria Port Maritime Area, Alexandria, Egypt",
  workingHours: "Sunday – Thursday: 08:00 – 17:00 (24/7 Technical Dispatch)",
  bbox: "29.8600%2C31.1700%2C29.9300%2C31.2150",
  marker: "31.1925%2C29.8950",
  osmUrl: "https://www.openstreetmap.org/?mlat=31.1925&mlon=29.8950#map=14/31.1925/29.8950",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=31.1925,29.8950",
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
            <strong>Address:</strong> {headOffice.address}
          </p>
          <p className={styles.hubHours}>
            <strong>Hours:</strong> {headOffice.workingHours}
          </p>
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
