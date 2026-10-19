"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/primitives/Container";
import { company } from "@/content/site";
import { companyAr } from "@/content/ar/site";
import { footerLinks } from "@/content/navigation";
import { footerLinksAr } from "@/content/ar/navigation";
import { serviceGroups } from "@/content/services";
import { serviceTaxonomyGroupsAR } from "@/content/ar/services";
import { isVisible } from "@/lib/site";
import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname() || "/";
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");

  const currentCompany = isArabic ? companyAr : company;
  const currentFooterLinks = isArabic ? footerLinksAr : footerLinks;
  const currentServiceGroups = isArabic ? serviceTaxonomyGroupsAR : serviceGroups;

  return (
    <footer className={styles.footer} role="contentinfo" aria-label={isArabic ? "تذييل الموقع" : "Site Footer"}>
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
              {isArabic
                ? "الهندسة البحرية المتكاملة، الصيانة، ودعم السفن في الموانئ المصرية والمجرى الملاحي لقناة السويس."
                : "Integrated Marine Engineering, Maintenance & Vessel Support across Egyptian ports and the Suez Canal corridor."}
            </p>

            <div className={styles.hqBadge}>
              <div className={styles.hqStatus}>
                <span className={styles.hqDot} aria-hidden="true" />
                <span>
                  {isArabic
                    ? "استقبال البلاغات الفنية 24/7 نشط"
                    : "24/7 TECHNICAL INTAKE ACTIVE"}
                </span>
              </div>
              <p className={styles.hqText}>
                <strong>{isArabic ? "العمليات البحرية:" : "Operations:"}</strong>{" "}
                {currentCompany.operationsHub}
              </p>
              <p className={styles.hqText}>
                <strong>{isArabic ? "المقر الرئيسي:" : "Head Office:"}</strong>{" "}
                {currentCompany.address}
              </p>
            </div>
          </div>

          {/* Column 2: Core Engineering Services */}
          <nav aria-label={isArabic ? "الخدمات الهندسية" : "Core Engineering Services"} className={styles.col}>
            <h3 className={styles.heading}>
              {isArabic ? "الخدمات الهندسية" : "ENGINEERING SERVICES"}
            </h3>
            <ul className={styles.linkList}>
              {currentServiceGroups
                .filter(isVisible)
                .flatMap((group) => group.services)
                .filter(isVisible)
                .map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={service.href}
                      className={styles.link}
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Column 3: Company & Standards */}
          <nav aria-label={isArabic ? "عن الشركة والقدرات" : "Company Overview and Standards"} className={styles.col}>
            <h3 className={styles.heading}>
              {isArabic ? "عن المجموعة والقدرات" : "COMPANY & CAPABILITIES"}
            </h3>
            <ul className={styles.linkList}>
              {currentFooterLinks.company.map((l) => (
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
            <h3 className={styles.heading}>
              {isArabic ? "قنوات التواصل المباشر" : "DIRECT COMMUNICATIONS"}
            </h3>
            <div className={styles.intakeBlock}>
              <div className={styles.contactLines}>
                <div className={styles.contactRow}>
                  <span className={styles.contactTag}>
                    {isArabic ? "هاتف" : "TEL"}
                  </span>
                  <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className={styles.contactLink}>
                    {company.phone}
                  </a>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactTag}>
                    {isArabic ? "طوارئ" : "DISPATCH"}
                  </span>
                  <a href={`tel:${company.mobile.replace(/\s+/g, "")}`} className={styles.contactLink}>
                    {company.mobile}
                  </a>
                  <a
                    href="https://wa.me/201012116108"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsAppBadge}
                    aria-label={isArabic ? "واتساب مباشر للفرز الهندسي" : "Direct WhatsApp Dispatch"}
                  >
                    {isArabic ? "واتساب ↗" : "WhatsApp ↗"}
                  </a>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactTag}>
                    {isArabic ? "بريد" : "EMAIL"}
                  </span>
                  <a href={`mailto:${company.email}`} className={styles.contactLink}>
                    {company.email}
                  </a>
                </div>
              </div>

              <Link
                href={isArabic ? "/ar/contact/technical-support" : "/contact/technical-support"}
                className={styles.intakeCta}
              >
                <span>
                  {isArabic ? "طلب دعم فني بحري" : "TECHNICAL SUPPORT INTAKE"}
                </span>
                <span aria-hidden="true" className={styles.arrowIcon}>
                  {isArabic ? "←" : "→"}
                </span>
              </Link>

              <Link
                href={isArabic ? "/ar/contact" : "/contact"}
                className={styles.enquiryLink}
              >
                <span>
                  {isArabic ? "استفسارات تجارية وعامة ←" : "General Corporate Enquiry →"}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Compliance Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.legalGroup}>
            <p className={styles.legal}>
              © {currentYear} {currentCompany.fullName} ({company.name}).{" "}
              {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
            <p className={styles.credits}>
              {isArabic ? "جميع الحقوق محفوظة لـ " : "All rights reserved to "}
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
            {isArabic
              ? "مطابقة لمعايير أيزو 9001 / هيئات التصنيف البحري الدولية • الإسكندرية، مصر"
              : "ISO 9001 / Marine Class Compliance • Alexandria, Egypt"}
          </p>
        </div>
      </Container>
    </footer>
  );
}
