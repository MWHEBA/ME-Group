"use client";

import React, { useState } from "react";
import {
  SparePartsRequest,
  SparePartsIdentificationPath,
  AttachmentMetadata,
} from "@/lib/forms/types";
import { validateSpareParts, FieldErrors } from "@/lib/forms/validation";
import { submitSparePartsAction } from "@/lib/forms/actions";
import { FormField } from "./FormField";
import { FileUploadZone } from "./FileUploadZone";
import { FormSuccessState, FormErrorBanner } from "./FormFeedback";
import styles from "./SparePartsForm.module.css";

interface SparePartsFormProps {
  locale?: "en" | "ar";
}

export function SparePartsForm({ locale = "en" }: SparePartsFormProps) {
  const isAr = locale === "ar";
  const [formData, setFormData] = useState<SparePartsRequest>({
    identificationPath: "known_part",
    partName: "",
    partNumber: "",
    maker: "",
    model: "",
    quantity: "1",
    deliveryLocation: "",
    requiredDate: "",
    notes: "",
    attachments: [],
    contactName: "",
    companyName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    isDelivered?: boolean;
    deliveryReference?: string;
  } | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handlePathChange = (path: SparePartsIdentificationPath) => {
    setFormData((prev) => ({ ...prev, identificationPath: path }));
    // Clear part number error if switching to need_identification
    if (path === "need_identification" && errors.partNumber) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.partNumber;
        return next;
      });
    }
  };

  const handleAttachmentsChange = (attachments: AttachmentMetadata[]) => {
    setFormData((prev) => ({ ...prev, attachments }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    const validationErrors = validateSpareParts(formData, locale);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorKey)?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitSparePartsAction(formData, locale);
      if (response.success) {
        setSubmissionResult({
          isDelivered: response.isDelivered,
          deliveryReference: response.deliveryReference,
        });
        setIsSubmitted(true);
      } else {
        if (response.errors) {
          setErrors(response.errors);
        }
        setGlobalError(response.message);
      }
    } catch {
      setGlobalError(
        isAr
          ? "حدث خطأ في الاتصال. يرجى مراجعة البيانات والمحاولة مرة أخرى."
          : "A connection error occurred. Please verify your details and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <FormSuccessState
        locale={locale}
        formType="spare_parts"
        isDelivered={submissionResult?.isDelivered}
        deliveryReference={submissionResult?.deliveryReference}
        title={
          submissionResult?.isDelivered
            ? isAr
              ? "تم إرسال طلب التوريد بنجاح"
              : "REQUISITION DISPATCHED"
            : isAr
            ? "تم تجهيز طلب قطع الغيار"
            : "SPARE PARTS REQUISITION PREPARED"
        }
        message={
          isAr
            ? `تم تجميع حزمة طلب التوريد لـ "${formData.partName}" (${formData.quantity}).`
            : `Requisition package compiled for "${formData.partName}" (${formData.quantity} units).`
        }
        onReset={() => {
          setIsSubmitted(false);
          setFormData({
            identificationPath: "known_part",
            partName: "",
            partNumber: "",
            maker: "",
            model: "",
            quantity: "1",
            deliveryLocation: "",
            requiredDate: "",
            notes: "",
            attachments: [],
            contactName: "",
            companyName: "",
            email: "",
            phone: "",
          });
        }}
      />
    );
  }

  const isKnownPath = formData.identificationPath === "known_part";

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.partsForm}>
      {globalError && <FormErrorBanner message={globalError} locale={locale} />}

      {/* Path Toggle Header */}
      <div className={styles.pathToggleCard}>
        <span className={styles.toggleKicker}>
          {isAr ? "حدد أسلوب تحديد القطعة" : "SELECT IDENTIFICATION METHOD"}
        </span>
        <div className={styles.toggleButtons}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${isKnownPath ? styles.toggleBtnActive : ""}`}
            onClick={() => handlePathChange("known_part")}
          >
            <span className={styles.toggleCode}>{isAr ? "المسار أ" : "PATH A"}</span>
            <span className={styles.toggleTitle}>
              {isAr ? "أعرف رقم القطعة (PART NUMBER)" : "I KNOW THE PART NUMBER"}
            </span>
            <span className={styles.toggleSub}>
              {isAr
                ? "رقم رسم المصنّع، الكتالوج، أو المرجع الفني متاح لدي"
                : "OEM drawing number, catalogue or maker reference available"}
            </span>
          </button>

          <button
            type="button"
            className={`${styles.toggleBtn} ${!isKnownPath ? styles.toggleBtnActive : ""}`}
            onClick={() => handlePathChange("need_identification")}
          >
            <span className={styles.toggleCode}>{isAr ? "المسار ب" : "PATH B"}</span>
            <span className={styles.toggleTitle}>
              {isAr ? "أحتاج لمساعدة في تحديد القطعة" : "I NEED HELP IDENTIFYING"}
            </span>
            <span className={styles.toggleSub}>
              {isAr
                ? "صورة لوحة بيانات المعدة (Nameplate)، أو طراز المعدة وأبعادها"
                : "Machinery nameplate photo, equipment model or dimensions"}
            </span>
          </button>
        </div>
      </div>

      {/* Part Specifications */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <span className={styles.stepBadge}>01 / 03</span>
          <h3 className={styles.sectionTitle}>
            {isKnownPath
              ? isAr
                ? "مواصفات القطعة والشركة المصنعة"
                : "PART & OEM SPECIFICATION"
              : isAr
              ? "بيانات المعدة والمكون المطلوب"
              : "EQUIPMENT & COMPONENT DETAILS"}
          </h3>
        </div>

        <div className={styles.fieldsGrid}>
          <FormField
            id="partName"
            label={isAr ? "اسم القطعة / المكون" : "Part / Component Name"}
            required
            error={errors.partName}
          >
            <input
              type="text"
              id="partName"
              name="partName"
              value={formData.partName}
              onChange={handleInputChange}
              placeholder={
                isAr
                  ? "مثال: ميكانيكال سيل / رشاش وقود / بطارية GMDSS / كارت AVR"
                  : "e.g. Mechanical Seal / Fuel Injector Nozzle / GMDSS Battery / AVR Board"
              }
              aria-required="true"
              aria-invalid={!!errors.partName}
            />
          </FormField>

          <FormField
            id="partNumber"
            label={
              isKnownPath
                ? isAr
                  ? "رقم القطعة / رقم الرسم (Part Number)"
                  : "Part Number / Drawing Ref"
                : isAr
                ? "رقم القطعة (إذا كان ظاهراً)"
                : "Part Number (If visible)"
            }
            required={isKnownPath}
            error={errors.partNumber}
          >
            <input
              type="text"
              id="partNumber"
              name="partNumber"
              value={formData.partNumber}
              onChange={handleInputChange}
              placeholder={
                isKnownPath
                  ? "e.g. 512.040-02 / 12345-AB"
                  : isAr
                  ? "اتركه فارغاً إن لم يكن ظاهراً"
                  : "Leave blank if not visible"
              }
              aria-required={isKnownPath}
              aria-invalid={!!errors.partNumber}
            />
          </FormField>

          <FormField
            id="maker"
            label={isAr ? "الشركة المصنعة للمعدة / الماركة" : "Equipment Maker / Brand"}
            error={errors.maker}
          >
            <input
              type="text"
              id="maker"
              name="maker"
              value={formData.maker}
              onChange={handleInputChange}
              placeholder="e.g. Alfa Laval, Yanmar, Sperre, Sailor, Furuno"
            />
          </FormField>

          <FormField
            id="model"
            label={isAr ? "طراز المعدة / النوع" : "Equipment Model / Type"}
            error={errors.model}
          >
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              placeholder="e.g. HL2/90 / 6EY18AL"
            />
          </FormField>
        </div>

        <div className={styles.fieldsGrid}>
          <FormField
            id="quantity"
            label={isAr ? "الكمية المطلوبة" : "Quantity Required"}
            required
            error={errors.quantity}
          >
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder={isAr ? "مثال: عدد 2 / طقم كامل (1 Set)" : "e.g. 2 Units / 1 Full Set"}
              aria-required="true"
              aria-invalid={!!errors.quantity}
            />
          </FormField>

          <FormField
            id="deliveryLocation"
            label={isAr ? "ميناء / وجهة التسليم المستهدفة" : "Target Delivery Port / Destination"}
            required
            error={errors.deliveryLocation}
          >
            <input
              type="text"
              id="deliveryLocation"
              name="deliveryLocation"
              value={formData.deliveryLocation}
              onChange={handleInputChange}
              placeholder={isAr ? "مثال: بورسعيد / غاطس السويس / الإسكندرية" : "e.g. Port Said / Suez Anchorage / Alexandria"}
              aria-required="true"
              aria-invalid={!!errors.deliveryLocation}
            />
          </FormField>
        </div>

        <FormField
          id="notes"
          label={isAr ? "ملاحظات فنية إضافية" : "Additional Technical Notes"}
          error={errors.notes}
        >
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder={
              isAr
                ? "اشتراطات خامات معينة، جهود كهربائية، أو موعد إبحار السفينة..."
                : "Special material requirements, voltage ratings, or vessel delivery timeline..."
            }
            rows={3}
          />
        </FormField>
      </div>

      {/* Attachments Section */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <span className={styles.stepBadge}>02 / 03</span>
          <h3 className={styles.sectionTitle}>
            {!isKnownPath
              ? isAr
                ? "صورة لوحة البيانات (Nameplate) أو القطعة التالفة"
                : "NAMEPLATE OR DEFECTIVE PART PHOTO"
              : isAr
              ? "الرسم الفني أو ورقة البيانات"
              : "TECHNICAL DRAWING OR SPEC SHEET"}
          </h3>
        </div>

        <FileUploadZone
          locale={locale}
          label={
            !isKnownPath
              ? isAr
                ? "صور لوحة البيانات والقطعة (موصى به بشدة)"
                : "NAMEPLATE & PART PHOTOS (RECOMMENDED)"
              : isAr
              ? "الرسم الهندسي أو المستندات (اختياري)"
              : "DRAWING OR DOCUMENTATION (OPTIONAL)"
          }
          description={
            !isKnownPath
              ? isAr
                ? "صورة واضحة للوحة بيانات المعدة تمكن مهندسي التوريد من مطابقة الكتالوج وتحديد الأرقام الأصلية بدقة."
                : "A clear photo of the machinery nameplate allows our sourcing team to identify the exact OEM catalog and part numbers."
              : isAr
              ? "أرفق الرسومات أو المخططات أو النشرات الفنية للتحقق من التفاوتات والأبعاد الدقيقة."
              : "Attach drawings, schematics, or maker technical sheets to verify exact dimensional tolerance."
          }
          attachments={formData.attachments}
          onAttachmentsChange={handleAttachmentsChange}
        />
      </div>

      {/* Contact Section */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <span className={styles.stepBadge}>03 / 03</span>
          <h3 className={styles.sectionTitle}>
            {isAr ? "مسؤول المشتريات / جهة الاتصال الفنية" : "BUYER / TECHNICAL CONTACT"}
          </h3>
        </div>

        <div className={styles.fieldsGrid}>
          <FormField
            id="contactName"
            label={isAr ? "اسم مسؤول الاتصال بالكامل" : "Contact Full Name"}
            required
            error={errors.contactName}
          >
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleInputChange}
              placeholder={isAr ? "مثال: م. فادي كامل (Superintendent)" : "e.g. Technical Buyer / Superintendent"}
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.contactName}
            />
          </FormField>

          <FormField
            id="companyName"
            label={isAr ? "اسم الشركة / المؤسسة" : "Company Name"}
            required
            error={errors.companyName}
          >
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder={isAr ? "مثال: شركة الملاحة البحرية" : "e.g. Marine Operations / Shipping Co"}
              autoComplete="organization"
              aria-required="true"
              aria-invalid={!!errors.companyName}
            />
          </FormField>

          <FormField
            id="email"
            label={isAr ? "البريد الإلكتروني للعمل" : "Corporate Email"}
            required
            error={errors.email}
          >
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="procurement@shipping-line.com"
              autoComplete="email"
              inputMode="email"
              aria-required="true"
              aria-invalid={!!errors.email}
            />
          </FormField>

          <FormField
            id="phone"
            label={isAr ? "رقم الهاتف / واتساب (مع كود الدولة)" : "Phone / WhatsApp (with Country Code)"}
            required
            error={errors.phone}
          >
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+20 100 000 0000"
              autoComplete="tel"
              inputMode="tel"
              aria-required="true"
              aria-invalid={!!errors.phone}
            />
          </FormField>
        </div>

        <div className={styles.submitWrap}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            <span>
              {isSubmitting
                ? isAr
                  ? "جاري معالجة الطلب..."
                  : "PROCESSING REQUISITION..."
                : isAr
                ? "إرسال طلب قطع الغيار"
                : "REQUEST SPARE PARTS"}
            </span>
            <span aria-hidden="true">{isAr ? "←" : "→"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
