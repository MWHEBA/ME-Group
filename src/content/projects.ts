import type { Gated } from "./types";
import { features } from "./site";

export interface CaseStudy extends Gated {
  slug: string;
  title: string;
  projectType?: string;
  vesselName?: string;
  vesselType?: string;
  client?: string;
  isClientConfidential?: boolean;
  location?: string;
  serviceCategories: string[];
  equipment: string[];
  problem: string;
  scope: string[];
  diagnosis: string;
  solution: string;
  testing?: string;
  commissioning?: string;
  result: string;
  completionDate?: string;
  heroImage?: string;
  gallery?: string[];
  technicalDocuments?: { title: string; url: string }[];
  relatedServices: string[];
  featured?: boolean;
}

export interface ProjectFilter {
  id: string;
  label: string;
  systemCode?: string;
}

export const projectFilters: ProjectFilter[] = [
  { id: "all", label: "All Disciplines" },
  { id: "mechanical", label: "Mechanical Systems", systemCode: "01" },
  { id: "electrical", label: "Electrical & Switchboards", systemCode: "02" },
  { id: "automation", label: "Automation & PLCs", systemCode: "03" },
  { id: "pneumatic", label: "Pneumatics & Air", systemCode: "04" },
];

/**
 * Verified ME Group Project Records.
 * In accordance with zero-fabrication policy, this dataset remains empty
 * until verified client case studies and permissions are formally provided.
 */
export const CASE_STUDIES: CaseStudy[] = [];

export function isProjectsEnabled(): boolean {
  return features.projects && CASE_STUDIES.length > 0;
}

export function getAllCaseStudies(): CaseStudy[] {
  if (!features.projects) return [];
  return CASE_STUDIES.filter((cs) => cs.status === "confirmed");
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  if (!features.projects) return undefined;
  return CASE_STUDIES.find((cs) => cs.slug === slug && cs.status === "confirmed");
}
