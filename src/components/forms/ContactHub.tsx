import React from "react";
import Link from "next/link";
import styles from "./ContactHub.module.css";

export function ContactHub() {
  const hubs = [
    {
      code: "INTENT / 01",
      title: "TECHNICAL SUPPORT",
      tag: "STANDARD DISPATCH",
      description:
        "For vessel equipment overhauls, planned maintenance, diagnostics, inspection, and comprehensive technical assistance.",
      cta: "REQUEST TECHNICAL SUPPORT",
      href: "/contact/technical-support",
      primary: true,
    },
    {
      code: "INTENT / 02",
      title: "RAPID SUPPORT",
      tag: "PRIORITY LINE",
      description:
        "For urgent vessel breakdowns, blackouts, or critical propulsion failures requiring immediate technical triage.",
      cta: "REQUEST RAPID SUPPORT",
      href: "/contact/rapid-support",
      urgent: true,
    },
    {
      code: "INTENT / 03",
      title: "SPARE PARTS SOURCING",
      tag: "SUPPLY CHAIN",
      description:
        "For marine equipment spares, replacement components, OEM drawing matching, or nameplate identification.",
      cta: "REQUEST SPARE PARTS",
      href: "/contact/spare-parts",
    },
  ];

  return (
    <div className={styles.hubContainer}>
      <div className={styles.hubGrid}>
        {hubs.map((item, idx) => (
          <div
            key={idx}
            className={`${styles.hubCard} ${item.urgent ? styles.urgentCard : ""} ${
              item.primary ? styles.primaryCard : ""
            }`}
          >
            <div className={styles.cardTop}>
              <span className={styles.cardCode}>{item.code}</span>
              <span className={styles.cardTag}>{item.tag}</span>
            </div>

            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.description}</p>

            <div className={styles.cardFooter}>
              <Link href={item.href} className={styles.actionBtn}>
                <span>{item.cta}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
