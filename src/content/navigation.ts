import type { FeatureFlags } from "./site";
import type { Gated } from "./types";

export interface NavItem extends Gated {
  id: string;
  label: string;
  href: string;
  /** Item is hidden unless this feature flag is enabled. */
  feature?: keyof FeatureFlags;
  /** Opens the Services mega panel. */
  mega?: boolean;
}

export const primaryNav: NavItem[] = [
  {
    id: "services",
    label: "Services",
    href: "/services",
    mega: true,
    status: "confirmed",
  },
  {
    id: "capabilities",
    label: "Capabilities",
    href: "/capabilities",
    status: "confirmed",
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    feature: "projects",
    status: "needs-confirmation",
  },
  { id: "company", label: "Company", href: "/company", status: "confirmed" },
  {
    id: "insights",
    label: "Insights",
    href: "/insights",
    feature: "insights",
    status: "needs-confirmation",
  },
  { id: "contact", label: "Contact", href: "/contact", status: "confirmed" },
];

/**
 * Entry point for the future "What does your vessel need?" problem selector.
 * Points to Contact until the selector exists (Phase 3).
 */
export const intentEntry = {
  label: "What does your vessel need?",
  href: "/contact/technical-support",
} as const;

export const footerLinks = {
  company: [
    { label: "Company Overview", href: "/company" },
    { label: "About & Values", href: "/company/about" },
    { label: "Engineering Approach", href: "/company/approach" },
    { label: "Quality & Safety", href: "/company/quality-safety" },
    { label: "Capabilities Matrix", href: "/capabilities" },
  ],
  contact: [
    { label: "Request Technical Support", href: "/contact/technical-support" },
    { label: "General Company Enquiry", href: "/contact" },
  ],
} as const;
