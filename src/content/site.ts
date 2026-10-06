import type { Gated } from "./types";

export interface FeatureFlags {
  metrics: boolean;
  projects: boolean;
  coverage: boolean;
  clients: boolean;
  insights: boolean;
  certifications: boolean;
  vesselTypes: boolean;
  arabic: boolean;
  analytics: boolean;
}

/** Unconfirmed areas stay off until the client supplies and approves content. */
export const features: FeatureFlags = {
  metrics: false,
  projects: false,
  coverage: false,
  clients: false,
  insights: false,
  certifications: false,
  vesselTypes: false,
  arabic: false,
  analytics: false,
};

export const company = {
  name: "ME Group",
  fullName: "Marine Engineering Group",
  tagline: "Keeping vessels moving.",
  descriptor: "Marine Engineering, Maintenance & Vessel Support.",
  description:
    "Integrated technical support across mechanical, electrical, automation and pneumatic systems, supported by maintenance, rapid response, spare parts and vessel support services.",
  status: "confirmed",
} as const satisfies Gated & Record<string, string>;

/**
 * Support channels. Phone, WhatsApp and email are intentionally absent until
 * confirmed by the client. `responseTime` is typed `never`: no guarantee may
 * be added without deliberately changing this type.
 */
export interface SupportInfo extends Gated {
  hours: "24/7";
  phone?: string;
  whatsapp?: string;
  email?: string;
  responseTime?: never;
}

export const support: SupportInfo = {
  status: "confirmed",
  hours: "24/7",
  note: "Contact channels [CLIENT TO CONFIRM].",
};

export const ctas = {
  technicalSupport: {
    label: "Request Technical Support",
    href: "/contact/technical-support",
  },
  technicalRequestShort: {
    label: "Request Support",
    href: "/contact/technical-support",
  },
} as const;
