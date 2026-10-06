/**
 * Phase 4 — Form validation functions
 * Human-readable, non-technical, accessible error messages.
 */

import {
  TechnicalSupportRequest,
  RapidSupportRequest,
  SparePartsRequest,
  GeneralEnquiryRequest,
} from "./types";

export type FieldErrors = Record<string, string>;

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  // Supports international formats (+ and digits, min 6 digits)
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^(\+)?[0-9]{6,16}$/.test(cleaned);
}

export function isValidIMO(imo: string): boolean {
  if (!imo.trim()) return true; // IMO is optional
  const cleaned = imo.replace(/\D/g, "");
  return cleaned.length === 7;
}

export function validateTechnicalSupport(
  data: Partial<TechnicalSupportRequest>
): FieldErrors {
  const errors: FieldErrors = {};

  if (data.honeypot) {
    errors.honeypot = "Automated submission rejected.";
    return errors;
  }

  if (!data.vesselName?.trim()) {
    errors.vesselName = "Enter the vessel name.";
  }

  if (data.imoNumber && !isValidIMO(data.imoNumber)) {
    errors.imoNumber = "IMO number should contain 7 digits (e.g. 9123456).";
  }

  if (!data.currentPort?.trim()) {
    errors.currentPort = "Enter the vessel's current port or location.";
  }

  if (!data.systemDiscipline) {
    errors.systemDiscipline = "Select the primary technical discipline.";
  }

  if (!data.problemDescription?.trim()) {
    errors.problemDescription = "Provide a description of the fault or technical issue.";
  } else if (data.problemDescription.trim().length < 10) {
    errors.problemDescription = "Please provide more technical detail (at least 10 characters).";
  }

  if (!data.contactName?.trim()) {
    errors.contactName = "Enter your full name.";
  }

  if (!data.companyName?.trim()) {
    errors.companyName = "Enter your company or management organisation.";
  }

  if (!data.email?.trim()) {
    errors.email = "Enter your email address.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Enter a valid email address (e.g. name@company.com).";
  }

  if (!data.phone?.trim()) {
    errors.phone = "Enter your phone or WhatsApp number.";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = "Enter a valid phone number with country code (e.g. +20 100 000 0000).";
  }

  return errors;
}

export function validateRapidSupport(
  data: Partial<RapidSupportRequest>
): FieldErrors {
  const errors: FieldErrors = {};

  if (data.honeypot) {
    errors.honeypot = "Automated submission rejected.";
    return errors;
  }

  if (!data.vesselName?.trim()) {
    errors.vesselName = "Enter the vessel name.";
  }

  if (!data.currentPort?.trim()) {
    errors.currentPort = "Enter the vessel's current port or location.";
  }

  if (!data.problemSummary?.trim()) {
    errors.problemSummary = "Describe the urgent breakdown or fault.";
  }

  if (!data.phone?.trim()) {
    errors.phone = "Enter a direct phone or WhatsApp number for rapid dispatch.";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = "Enter a valid contact number with country code.";
  }

  return errors;
}

export function validateSpareParts(
  data: Partial<SparePartsRequest>
): FieldErrors {
  const errors: FieldErrors = {};

  if (data.honeypot) {
    errors.honeypot = "Automated submission rejected.";
    return errors;
  }

  if (!data.partName?.trim()) {
    errors.partName = "Enter the part name or equipment component description.";
  }

  if (data.identificationPath === "known_part" && !data.partNumber?.trim()) {
    errors.partNumber = "Enter the part number or OEM drawing code.";
  }

  if (!data.quantity?.trim()) {
    errors.quantity = "Specify the quantity required.";
  }

  if (!data.deliveryLocation?.trim()) {
    errors.deliveryLocation = "Enter the required delivery port or destination.";
  }

  if (!data.contactName?.trim()) {
    errors.contactName = "Enter your name.";
  }

  if (!data.companyName?.trim()) {
    errors.companyName = "Enter your company name.";
  }

  if (!data.email?.trim()) {
    errors.email = "Enter your email address.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.phone?.trim()) {
    errors.phone = "Enter your contact phone number.";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  return errors;
}

export function validateGeneralEnquiry(
  data: Partial<GeneralEnquiryRequest>
): FieldErrors {
  const errors: FieldErrors = {};

  if (data.honeypot) {
    errors.honeypot = "Automated submission rejected.";
    return errors;
  }

  if (!data.contactName?.trim()) {
    errors.contactName = "Enter your name.";
  }

  if (!data.email?.trim()) {
    errors.email = "Enter your email address.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!data.subject?.trim()) {
    errors.subject = "Enter the subject of your enquiry.";
  }

  if (!data.message?.trim()) {
    errors.message = "Enter your message.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}
