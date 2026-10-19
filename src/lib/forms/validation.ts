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
  data: Partial<TechnicalSupportRequest>,
  locale: "en" | "ar" = "en"
): FieldErrors {
  const isAr = locale === "ar";
  const errors: FieldErrors = {};

  if (data.honeypot) {
    errors.honeypot = isAr ? "تم رفض الإرسال التلقائي." : "Automated submission rejected.";
    return errors;
  }

  if (!data.vesselName?.trim()) {
    errors.vesselName = isAr ? "يرجى إدخال اسم السفينة." : "Enter the vessel name.";
  }

  if (data.imoNumber && !isValidIMO(data.imoNumber)) {
    errors.imoNumber = isAr
      ? "يجب أن يتكون رقم IMO من 7 أرقام (مثال: 9123456)."
      : "IMO number should contain 7 digits (e.g. 9123456).";
  }

  if (!data.currentPort?.trim()) {
    errors.currentPort = isAr
      ? "يرجى إدخال الميناء الحالي أو موقع السفينة."
      : "Enter the vessel's current port or location.";
  }

  if (!data.systemDiscipline) {
    errors.systemDiscipline = isAr
      ? "يرجى تحديد التخصص الفني الرئيسي."
      : "Select the primary technical discipline.";
  }

  if (!data.problemDescription?.trim()) {
    errors.problemDescription = isAr
      ? "يرجى تقديم وصف للعطل أو المشكلة الفنية."
      : "Provide a description of the fault or technical issue.";
  } else if (data.problemDescription.trim().length < 10) {
    errors.problemDescription = isAr
      ? "يرجى تقديم تفاصيل فنية أكثر (10 أحرف على الأقل)."
      : "Please provide more technical detail (at least 10 characters).";
  }

  if (!data.contactName?.trim()) {
    errors.contactName = isAr ? "يرجى إدخال الاسم بالكامل." : "Enter your full name.";
  }

  if (!data.companyName?.trim()) {
    errors.companyName = isAr
      ? "يرجى إدخال اسم الشركة أو جهة الإدارة."
      : "Enter your company or management organisation.";
  }

  if (!data.email?.trim()) {
    errors.email = isAr ? "يرجى إدخال البريد الإلكتروني." : "Enter your email address.";
  } else if (!isValidEmail(data.email)) {
    errors.email = isAr
      ? "يرجى إدخال بريد إلكتروني صحيح (مثال: name@company.com)."
      : "Enter a valid email address (e.g. name@company.com).";
  }

  if (!data.phone?.trim()) {
    errors.phone = isAr ? "يرجى إدخال رقم الهاتف أو الواتساب." : "Enter your phone or WhatsApp number.";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = isAr
      ? "يرجى إدخال رقم هاتف صحيح مع كود الدولة (مثال: +20 100 000 0000)."
      : "Enter a valid phone number with country code (e.g. +20 100 000 0000).";
  }

  return errors;
}

export function validateRapidSupport(
  data: Partial<RapidSupportRequest>,
  locale: "en" | "ar" = "en"
): FieldErrors {
  const isAr = locale === "ar";
  const errors: FieldErrors = {};

  if (data.honeypot) {
    errors.honeypot = isAr ? "تم رفض الإرسال التلقائي." : "Automated submission rejected.";
    return errors;
  }

  if (!data.vesselName?.trim()) {
    errors.vesselName = isAr ? "يرجى إدخال اسم السفينة." : "Enter the vessel name.";
  }

  if (!data.currentPort?.trim()) {
    errors.currentPort = isAr
      ? "يرجى إدخال الميناء الحالي أو موقع السفينة."
      : "Enter the vessel's current port or location.";
  }

  if (!data.problemSummary?.trim()) {
    errors.problemSummary = isAr
      ? "يرجى وصف العطل الطارئ أو المشكلة الفنية."
      : "Describe the urgent breakdown or fault.";
  }

  if (!data.phone?.trim()) {
    errors.phone = isAr
      ? "يرجى إدخال رقم هاتف أو واتساب مباشر للتواصل الفوري."
      : "Enter a direct phone or WhatsApp number for rapid dispatch.";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = isAr
      ? "يرجى إدخال رقم اتصال صحيح مع كود الدولة."
      : "Enter a valid contact number with country code.";
  }

  return errors;
}

export function validateSpareParts(
  data: Partial<SparePartsRequest>,
  locale: "en" | "ar" = "en"
): FieldErrors {
  const isAr = locale === "ar";
  const errors: FieldErrors = {};

  if (data.honeypot) {
    errors.honeypot = isAr ? "تم رفض الإرسال التلقائي." : "Automated submission rejected.";
    return errors;
  }

  if (!data.partName?.trim()) {
    errors.partName = isAr
      ? "يرجى إدخال اسم القطعة أو وصف المكون المطلوب."
      : "Enter the part name or equipment component description.";
  }

  if (data.identificationPath === "known_part" && !data.partNumber?.trim()) {
    errors.partNumber = isAr
      ? "يرجى إدخال رقم القطعة أو كود الرسم الهندسي OEM."
      : "Enter the part number or OEM drawing code.";
  }

  if (!data.quantity?.trim()) {
    errors.quantity = isAr ? "يرجى تحديد الكمية المطلوبة." : "Specify the quantity required.";
  }

  if (!data.deliveryLocation?.trim()) {
    errors.deliveryLocation = isAr
      ? "يرجى إدخال ميناء أو وجهة التسليم المطلوبة."
      : "Enter the required delivery port or destination.";
  }

  if (!data.contactName?.trim()) {
    errors.contactName = isAr ? "يرجى إدخال الاسم بالكامل." : "Enter your name.";
  }

  if (!data.companyName?.trim()) {
    errors.companyName = isAr ? "يرجى إدخال اسم الشركة." : "Enter your company name.";
  }

  if (!data.email?.trim()) {
    errors.email = isAr ? "يرجى إدخال البريد الإلكتروني." : "Enter your email address.";
  } else if (!isValidEmail(data.email)) {
    errors.email = isAr ? "يرجى إدخال بريد إلكتروني صحيح." : "Enter a valid email address.";
  }

  if (!data.phone?.trim()) {
    errors.phone = isAr ? "يرجى إدخال رقم هاتف التواصل." : "Enter your contact phone number.";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = isAr ? "يرجى إدخال رقم هاتف صحيح." : "Enter a valid phone number.";
  }

  return errors;
}

export function validateGeneralEnquiry(
  data: Partial<GeneralEnquiryRequest>,
  locale: "en" | "ar" = "en"
): FieldErrors {
  const isAr = locale === "ar";
  const errors: FieldErrors = {};

  if (data.honeypot) {
    errors.honeypot = isAr ? "تم رفض الإرسال التلقائي." : "Automated submission rejected.";
    return errors;
  }

  if (!data.contactName?.trim()) {
    errors.contactName = isAr ? "يرجى إدخال الاسم بالكامل." : "Enter your name.";
  }

  if (!data.email?.trim()) {
    errors.email = isAr ? "يرجى إدخال البريد الإلكتروني." : "Enter your email address.";
  } else if (!isValidEmail(data.email)) {
    errors.email = isAr ? "يرجى إدخال بريد إلكتروني صحيح." : "Enter a valid email address.";
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = isAr ? "يرجى إدخال رقم هاتف صحيح." : "Enter a valid phone number.";
  }

  if (!data.subject?.trim()) {
    errors.subject = isAr ? "يرجى إدخال موضوع الاستفسار." : "Enter the subject of your enquiry.";
  }

  if (!data.message?.trim()) {
    errors.message = isAr ? "يرجى إدخال نص الرسالة." : "Enter your message.";
  } else if (data.message.trim().length < 10) {
    errors.message = isAr
      ? "يجب أن تكون الرسالة من 10 أحرف على الأقل."
      : "Message must be at least 10 characters.";
  }

  return errors;
}
