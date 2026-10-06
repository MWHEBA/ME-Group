import type { Gated } from "./types";
import { features } from "./site";

export type InsightCategory =
  | "mechanical"
  | "electrical"
  | "automation"
  | "pneumatics"
  | "maintenance"
  | "technical-guides";

export interface ArticleAuthor {
  name: string;
  role: string;
  organization: string;
}

export interface ArticleSeo {
  title: string;
  description: string;
  keywords?: string[];
}

export interface Article extends Gated {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  categoryLabel: string;
  publishedDate?: string;
  updatedDate?: string;
  author?: ArticleAuthor;
  readingTimeMinutes?: number;
  heroImage?: string;
  body: string;
  relatedServices: string[];
  relatedEquipment?: string[];
  seo: ArticleSeo;
}

export interface FutureContentTopic {
  id: string;
  category: InsightCategory;
  topicTitle: string;
  synopsis: string;
  targetAudience: string;
  relevantDisciplineCode: string;
}

/**
 * Editorial Content Strategy Roadmap for Future Publishing.
 * These represent planned technical editorial opportunities for ME Group
 * and are NOT presented as completed case studies or fake articles.
 */
export const FUTURE_EDITORIAL_ROADMAP: FutureContentTopic[] = [
  {
    id: "gen-faults",
    category: "electrical",
    topicTitle: "Marine Generator Faults: Diagnosing AVR Voltage Instability at Sea",
    synopsis:
      "A technical walkthrough on distinguishing between rotating diode failures, AVR potentiometer drift, and prime-mover speed hunting.",
    targetAudience: "Chief Engineers & Electrical Officers",
    relevantDisciplineCode: "02",
  },
  {
    id: "megger-testing",
    category: "electrical",
    topicTitle: "Electrical Insulation & Earth Fault Troubleshooting on 440V MSB Networks",
    synopsis:
      "Methodical feeder isolation protocols for locating intermittent high-resistance ground faults in high-humidity engine rooms.",
    targetAudience: "Technical Superintendents & ETOs",
    relevantDisciplineCode: "02",
  },
  {
    id: "compressor-pm",
    category: "pneumatics",
    topicTitle: "Preventive Maintenance of Marine Starting Air Compressors",
    synopsis:
      "Monitoring charging cycles, valve plate carbonization, and interstage relief valve lift pressures to avoid main engine starting lockouts.",
    targetAudience: "Second Engineers & Port Engineers",
    relevantDisciplineCode: "04",
  },
  {
    id: "plc-troubleshoot",
    category: "automation",
    topicTitle: "Marine PLC Diagnostic Buffers & 4-20mA Sensor Loop Faults",
    synopsis:
      "Techniques for verifying sensor transmitter loop integrity and clearing false engine shutdown trips.",
    targetAudience: "Automation Specialists & Fleet Managers",
    relevantDisciplineCode: "03",
  },
  {
    id: "prev-vs-corr",
    category: "maintenance",
    topicTitle: "Preventive vs. Corrective Maintenance: Reducing Unexpected Vessel Off-Hire",
    synopsis:
      "Balancing scheduled thermographic surveys and Megger checks against emergency fault intervention to minimize port turnaround disruption.",
    targetAudience: "Ship Owners & Technical Directors",
    relevantDisciplineCode: "05",
  },
  {
    id: "nameplate-id",
    category: "technical-guides",
    topicTitle: "Nameplate Identification Protocols for Urgent Marine Spare Parts",
    synopsis:
      "How to photograph and cross-reference equipment serial tags when original maker parts books are lost or damaged.",
    targetAudience: "Vessel Managers & Procurement Teams",
    relevantDisciplineCode: "07",
  },
];

/**
 * Verified Published Articles.
 * Empty until verified technical articles are written and approved.
 */
export const ARTICLES: Article[] = [];

export function isInsightsEnabled(): boolean {
  return features.insights && ARTICLES.length > 0;
}

export function getAllArticles(): Article[] {
  if (!features.insights) return [];
  return ARTICLES.filter((art) => art.status === "confirmed");
}

export function getArticleBySlug(slug: string): Article | undefined {
  if (!features.insights) return undefined;
  return ARTICLES.find((art) => art.slug === slug && art.status === "confirmed");
}
