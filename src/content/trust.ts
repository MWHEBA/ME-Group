import type { Gated } from "./types";
import { features } from "./site";

export interface CertificationItem extends Gated {
  id: string;
  name: string;
  issuer: string;
  certificateNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  documentUrl?: string;
  logoUrl?: string;
}

export interface ClientLogoItem extends Gated {
  id: string;
  clientName: string;
  logoUrl: string;
  relationshipType?: string; // e.g. "Ship Owner", "Technical Management"
}

export interface CompanyMetricItem extends Gated {
  id: string;
  label: string;
  value: string;
  unit?: string;
  context?: string;
}

/**
 * Trust Signals - Strictly gated until client provides verified proof.
 */
export const VERIFIED_CERTIFICATIONS: CertificationItem[] = [];
export const VERIFIED_CLIENT_LOGOS: ClientLogoItem[] = [];
export const VERIFIED_METRICS: CompanyMetricItem[] = [];

export function getCertifications(): CertificationItem[] {
  if (!features.certifications) return [];
  return VERIFIED_CERTIFICATIONS.filter((c) => c.status === "confirmed");
}

export function getClientLogos(): ClientLogoItem[] {
  if (!features.clients) return [];
  return VERIFIED_CLIENT_LOGOS.filter((c) => c.status === "confirmed");
}

export function getMetrics(): CompanyMetricItem[] {
  if (!features.metrics) return [];
  return VERIFIED_METRICS.filter((m) => m.status === "confirmed");
}
