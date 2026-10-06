/**
 * Typed Environment Configuration Layer
 * 
 * DESIGN PRINCIPLES:
 * 1. Strict separation of public config (`NEXT_PUBLIC_*`) and server-only secrets.
 * 2. Fail-safe defaults: never crash the application if optional env vars are missing.
 * 3. Never expose server secrets to the browser.
 */

export interface PublicEnvConfig {
  siteUrl: string;
  siteEnv: "development" | "preview" | "production";
  isProduction: boolean;
  isIndexable: boolean;
  analyticsId?: string;
  companyPhone?: string;
  companyWhatsApp?: string;
  companyEmail?: string;
  supportEmail?: string;
  emergencyPhone?: string;
}

export interface ServerEnvConfig {
  formWebhookUrl?: string;
  formWebhookSecret?: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
  smtpFrom?: string;
}

export const publicEnv: PublicEnvConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  siteEnv: (process.env.NEXT_PUBLIC_SITE_ENV as PublicEnvConfig["siteEnv"]) || "development",
  isProduction: process.env.NODE_ENV === "production",
  isIndexable: process.env.NEXT_PUBLIC_SITE_ENV === "production",
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID || undefined,
  companyPhone: process.env.NEXT_PUBLIC_COMPANY_PHONE || undefined,
  companyWhatsApp: process.env.NEXT_PUBLIC_COMPANY_WHATSAPP || undefined,
  companyEmail: process.env.NEXT_PUBLIC_COMPANY_EMAIL || undefined,
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || undefined,
  emergencyPhone: process.env.NEXT_PUBLIC_EMERGENCY_PHONE || undefined,
};

/**
 * Server-only environment access.
 * Must only be called from server components, actions, or route handlers.
 */
export function getServerEnv(): ServerEnvConfig {
  if (typeof window !== "undefined") {
    throw new Error("Security Error: getServerEnv() cannot be called on the client side.");
  }

  return {
    formWebhookUrl: process.env.FORM_WEBHOOK_URL,
    formWebhookSecret: process.env.FORM_WEBHOOK_SECRET,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    smtpFrom: process.env.SMTP_FROM,
  };
}
