import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import { company } from "@/content/site";
import { footerLinks } from "@/content/navigation";
import { serviceGroups } from "@/content/services";
import { isVisible } from "@/lib/site";
import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Site Footer">
      <Container>
        <div className={styles.grid}>
          {/* Column 1: Brand, Mission & HQ Operations */}
          <div className={styles.brand}>
            <Image
              src="/brand/me-group-logo-horizontal.png"
              alt={`${company.name} — ${company.fullName}`}
              width={220}
              height={75}
              className={styles.logo}
            />
            <p className={styles.tagline}>
              Integrated Marine Engineering, Maintenance &amp; Vessel Support across Egyptian ports and the Suez Canal corridor.
            </p>

            <div className={styles.hqBadge}>
              <div className={styles.hqStatus}>
                <span className={styles.hqDot} aria-hidden="true" />
                <span>24/7 TECHNICAL INTAKE ACTIVE</span>
              </div>
              <p className={styles.hqText}>
                <strong>Operations:</strong> {company.operationsHub}
              </p>
              <p className={styles.hqText}>
                <strong>Head Office:</strong> {company.address}
              </p>
            </div>
          </div>

          {/* Column 2: Core Engineering Services */}
          <nav aria-label="Core Engineering Services" className={styles.col}>
            <h3 className={styles.heading}>ENGINEERING SERVICES</h3>
            <ul className={styles.linkList}>
              {serviceGroups
                .filter(isVisible)
                .flatMap((group) => group.services)
                .filter(isVisible)
                .map((service) => (
                  <li key={service.slug}>
                    <Link href={service.href} className={styles.link}>
                      {service.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Column 3: Company & Standards */}
          <nav aria-label="Company Overview and Standards" className={styles.col}>
            <h3 className={styles.heading}>COMPANY &amp; CAPABILITIES</h3>
            <ul className={styles.linkList}>
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Direct Intake & Communications */}
          <div className={styles.col}>
            <h3 className={styles.heading}>DIRECT COMMUNICATIONS</h3>
            <div className={styles.intakeBlock}>
              <div className={styles.contactLines}>
                <div className={styles.contactRow}>
                  <span className={styles.contactTag}>TEL</span>
                  <a href={`tel:${company.phone.replace(/\s+/g, '')}`} className={styles.contactLink}>
                    {company.phone}
                  </a>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactTag}>DISPATCH</span>
                  <a href={`tel:${company.mobile.replace(/\s+/g, '')}`} className={styles.contactLink}>
                    {company.mobile}
                  </a>
                  <a
                    href="https://wa.me/201012116108"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsAppBadge}
                    aria-label="Direct WhatsApp Dispatch"
                  >
                    WhatsApp ↗
                  </a>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactTag}>EMAIL</span>
                  <a href={`mailto:${company.email}`} className={styles.contactLink}>
                    {company.email}
                  </a>
                </div>
              </div>

              <Link href="/contact/technical-support" className={styles.intakeCta}>
                <span>TECHNICAL SUPPORT INTAKE</span>
                <span aria-hidden="true">→</span>
              </Link>

              <Link href="/contact" className={styles.enquiryLink}>
                <span>General Corporate Enquiry →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Compliance Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.legalGroup}>
            <p className={styles.legal}>
              © {currentYear} {company.fullName} ({company.name}). All rights reserved.
            </p>
            <p className={styles.credits}>
              All rights reserved to{' '}
              <a
                href="https://mwheba.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.creditsLink}
              >
                MWHEBA Software Solutions
              </a>
            </p>
          </div>
          <p className={styles.compliance}>
            ISO 9001 / Marine Class Compliance • Alexandria, Egypt
          </p>
        </div>
      </Container>
    </footer>
  );
}
