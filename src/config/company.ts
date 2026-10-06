/**
 * Centralized Client & Company Production Configuration
 * 
 * SOURCING RULE:
 * Confirmed client facts only. Unconfirmed values remain undefined.
 * Missing values MUST NOT be filled with placeholder guesses.
 * UI elements consume this centralized config and conditionally hide
 * any unconfirmed contact methods or addresses.
 */

export interface CompanyConfig {
  /** Legal entity name */
  legalName: string;
  /** Primary brand display name */
  displayName: string;
  /** Short tagline */
  tagline: string;
  /** Formal business descriptor */
  descriptor: string;
  /** High-level summary of capabilities */
  description: string;
  
  /** Direct contact channels — populated ONLY upon verified client provision */
  contact: {
    hours: "24/7";
    telephone?: string;
    whatsapp?: string;
    generalEmail?: string;
    technicalSupportEmail?: string;
    emergencyContact?: string;
    address?: {
      street?: string;
      city?: string;
      country?: string;
      postalCode?: string;
    };
    socialLinks: {
      linkedin?: string;
      twitter?: string;
    };
  };

  /** Canonical production domain — defined via environment or client deployment */
  domain?: string;
}

export const companyConfig: CompanyConfig = {
  legalName: "Marine Engineering Group",
  displayName: "ME Group",
  tagline: "Keeping vessels moving.",
  descriptor: "Marine Engineering, Maintenance & Vessel Support.",
  description:
    "Integrated technical support across mechanical, electrical, automation and pneumatic systems, supported by maintenance, rapid response, spare parts and vessel support services.",
  
  contact: {
    hours: "24/7",
    // Verified phone, email, WhatsApp, address remain intentionally unset until confirmed by client.
    telephone: process.env.NEXT_PUBLIC_COMPANY_PHONE || undefined,
    whatsapp: process.env.NEXT_PUBLIC_COMPANY_WHATSAPP || undefined,
    generalEmail: process.env.NEXT_PUBLIC_COMPANY_EMAIL || undefined,
    technicalSupportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || undefined,
    emergencyContact: process.env.NEXT_PUBLIC_EMERGENCY_PHONE || undefined,
    address: undefined,
    socialLinks: {},
  },

  domain: process.env.NEXT_PUBLIC_SITE_URL || undefined,
};

/** Utility helpers to check availability of contact methods */
export const hasDirectPhone = Boolean(companyConfig.contact.telephone);
export const hasDirectWhatsApp = Boolean(companyConfig.contact.whatsapp);
export const hasDirectEmail = Boolean(companyConfig.contact.generalEmail || companyConfig.contact.technicalSupportEmail);
export const hasPhysicalAddress = Boolean(companyConfig.contact.address?.street);
