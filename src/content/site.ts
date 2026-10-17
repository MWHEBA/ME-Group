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
    "Integrated technical support across mechanical, electrical, automation, pneumatic, and navigation & communication systems, supported by maintenance, rapid response, spare parts and vessel support services.",
  address: "Iskander Ibrahim St., Miami, Alexandria, Egypt",
  operationsHub: "Alexandria Port Maritime Area, Alexandria, Egypt",
  phone: "+20 3 5510000",
  mobile: "+20 1012116108",
  secondaryMobile: "+20 1223855644",
  email: "info@MEGroup-eg.com",
  website: "MEGroup-eg.com",
  status: "confirmed",
} as const satisfies Gated & Record<string, string>;

/**
 * Confirmed Support channels.
 * `responseTime` is strictly typed `never`: no guarantee may be added.
 */
export interface SupportInfo extends Gated {
  hours: "24/7";
  phone?: string;
  mobile?: string;
  secondaryMobile?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  responseTime?: never;
}

export const support: SupportInfo = {
  status: "confirmed",
  hours: "24/7",
  phone: "+20 3 5510000",
  mobile: "+20 1012116108",
  secondaryMobile: "+20 1223855644",
  whatsapp: "https://wa.me/201012116108",
  email: "info@MEGroup-eg.com",
  website: "https://MEGroup-eg.com",
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
