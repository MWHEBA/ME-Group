/**
 * Phase 4 — Typed conversion request models
 * Separates data structure from UI components and transport.
 */

export type UrgencyLevel = "normal" | "priority" | "urgent";

export type EngineeringDiscipline =
  | "mechanical"
  | "electrical"
  | "automation"
  | "pneumatic"
  | "other";

export type ContactPreference = "email" | "phone" | "whatsapp";

export interface AttachmentMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface TechnicalSupportRequest {
  // Step 01: Vessel Details
  vesselName: string;
  imoNumber?: string;
  vesselType?: string;
  currentPort: string;

  // Step 02: Technical System
  systemDiscipline: EngineeringDiscipline;
  equipmentMaker?: string;
  equipmentModel?: string;

  // Step 03: Problem Scope
  problemDescription: string;
  urgency: UrgencyLevel;

  // Step 04: Attachments
  attachments: AttachmentMetadata[];

  // Step 05: Contact Information
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  preferredContactMethod: ContactPreference;
  honeypot?: string;
}

export interface RapidSupportRequest {
  vesselName: string;
  currentPort: string;
  problemSummary: string;
  phone: string;
  systemDiscipline?: EngineeringDiscipline;
  attachments?: AttachmentMetadata[];
  honeypot?: string;
}

export type SparePartsIdentificationPath = "known_part" | "need_identification";

export interface SparePartsRequest {
  identificationPath: SparePartsIdentificationPath;
  partName: string;
  partNumber?: string;
  maker?: string;
  model?: string;
  quantity: string;
  deliveryLocation: string;
  requiredDate?: string;
  notes?: string;
  attachments: AttachmentMetadata[];
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  honeypot?: string;
}

export interface GeneralEnquiryRequest {
  contactName: string;
  companyName?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export type FormType =
  | "technical_support"
  | "rapid_support"
  | "spare_parts"
  | "general_enquiry";

export interface SubmissionResponse {
  success: boolean;
  message: string;
  formType: FormType;
  submissionId?: string;
  timestamp: string;
  status: "development_pending" | "delivered" | "unconfigured";
  isDelivered: boolean;
  deliveryReference?: string;
  errors?: Record<string, string>;
}
