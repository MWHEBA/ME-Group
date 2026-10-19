"use client";

import React, { useState } from "react";
import { RapidSupportRequest, EngineeringDiscipline, AttachmentMetadata } from "@/lib/forms/types";
import { validateRapidSupport, FieldErrors } from "@/lib/forms/validation";
import { submitRapidSupportAction } from "@/lib/forms/actions";
import { FormField } from "./FormField";
import { FileUploadZone } from "./FileUploadZone";
import { FormSuccessState, FormErrorBanner } from "./FormFeedback";
import styles from "./RapidSupportForm.module.css";

interface RapidSupportFormProps {
  locale?: "en" | "ar";
}

export function RapidSupportForm({ locale = "en" }: RapidSupportFormProps) {
  const isAr = locale === "ar";
  const [formData, setFormData] = useState<RapidSupportRequest>({
    vesselName: "",
    currentPort: "",
    problemSummary: "",
    phone: "",
    systemDiscipline: undefined,
    attachments: [],
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    isDelivered?: boolean;
    deliveryReference?: string;
  } | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const disciplines: { id: EngineeringDiscipline; label: string }[] = [
    { id: "mechanical", label: isAr ? "عطل ميكانيكي / محركات" : "Mechanical Breakdown" },
    { id: "electrical", label: isAr ? "عطل كهربائي / إظلام" : "Electrical / Blackout" },
    { id: "automation", label: isAr ? "عطل تحكم / PLC" : "Control / PLC Fault" },
    { id: "pneumatic", label: isAr ? "عطل هوائي / ضواغط" : "Pneumatic / Air Loss" },
    { id: "radio", label: isAr ? "عطل راديو وملاحة" : "Radio & Bridge Breakdown" },
    { id: "other", label: isAr ? "أخرى / متعدد" : "Other / Multiple" },
  ];

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

  const handleAttachmentsChange = (attachments: AttachmentMetadata[]) => {
    setFormData((prev) => ({ ...prev, attachments }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    const validationErrors = validateRapidSupport(formData, locale);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorKey)?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitRapidSupportAction(formData, locale);
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
          ? "حدث خطأ في الاتصال. يرجى الاتصال بهاتف الفرز مباشرة في الحالات الحرجة."
          : "A connection error occurred. Please call dispatch directly if urgent."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <FormSuccessState
        locale={locale}
        formType="rapid_support"
        isDelivered={submissionResult?.isDelivered}
        deliveryReference={submissionResult?.deliveryReference}
        title={
          submissionResult?.isDelivered
            ? isAr
              ? "تم إرسال بلاغ الدعم السريع"
              : "RAPID ALERT DISPATCHED"
            : isAr
            ? "تم تجهيز ملف الدعم الفني العاجل"
            : "RAPID SUPPORT PACKAGE PREPARED"
        }
        message={
          isAr
            ? `تم استلام بيانات الفرز الفني ذات الأولوية للسفينة "${formData.vesselName}".`
            : `Priority dispatch details compiled for vessel "${formData.vesselName}".`
        }
        onReset={() => {
          setIsSubmitted(false);
          setFormData({
            vesselName: "",
            currentPort: "",
            problemSummary: "",
            phone: "",
            systemDiscipline: undefined,
            attachments: [],
          });
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.rapidForm}>
      {globalError && <FormErrorBanner message={globalError} locale={locale} />}

      {/* Priority Banner Header */}
      <div className={styles.priorityBar}>
        <div className={styles.pulseDot} aria-hidden="true" />
        <div className={styles.priorityText}>
          <span className={styles.priorityHeading}>
            {isAr ? "فرز فني عاجل وفوري" : "STREAMLINED URGENT INTAKE"}
          </span>
          <span className={styles.prioritySub}>
            {isAr
              ? "طابور تشغيلي مباشر للأعطال الحرجة وحالات الإظلام التام (Blackout)."
              : "Direct operational queue for active breakdowns & blackouts."}
          </span>
        </div>
      </div>

      <div className={styles.formBody}>
        <div className={styles.fieldsGrid}>
          <FormField
            id="vesselName"
            label={isAr ? "اسم السفينة" : "Vessel Name"}
            required
            error={errors.vesselName}
          >
            <input
              type="text"
              id="vesselName"
              name="vesselName"
              value={formData.vesselName}
              onChange={handleInputChange}
              placeholder={isAr ? "مثال: MV Red Sea Pioneer" : "e.g. MV Red Sea Pioneer"}
              aria-required="true"
              aria-invalid={!!errors.vesselName}
            />
          </FormField>

          <FormField
            id="currentPort"
            label={isAr ? "الميناء الحالي / المخطاف" : "Current Port / Location"}
            required
            error={errors.currentPort}
          >
            <input
              type="text"
              id="currentPort"
              name="currentPort"
              value={formData.currentPort}
              onChange={handleInputChange}
              placeholder={isAr ? "مثال: مخطاف السويس / بورسعيد / الإسكندرية" : "e.g. Suez Anchorage / Port Said"}
              aria-required="true"
              aria-invalid={!!errors.currentPort}
            />
          </FormField>
        </div>

        <FormField
          id="problemSummary"
          label={isAr ? "توصيف العطل العاجل والأثر التشغيلي" : "Urgent Fault & Operational Impact"}
          required
          error={errors.problemSummary}
        >
          <textarea
            id="problemSummary"
            name="problemSummary"
            value={formData.problemSummary}
            onChange={handleInputChange}
            placeholder={
              isAr
                ? "حدد العطل النشط (مثال: فصل المولد 2 على Reverse Power، توقف مضخة تبريد المحرك، فقدان الضغط الهيدروليكي للتوجيه)..."
                : "State the active fault (e.g. Generator 2 tripping on reverse power, Main engine cooling pump seized, steering gear hydraulic loss)..."
            }
            rows={4}
            aria-required="true"
            aria-invalid={!!errors.problemSummary}
          />
        </FormField>

        {/* Optional Discipline */}
        <div className={styles.disciplineRow}>
          <span className={styles.subLabel}>
            {isAr ? "تخصص المنظومة (اختياري)" : "SYSTEM CATEGORY (OPTIONAL)"}
          </span>
          <div className={styles.disciplineOptions}>
            {disciplines.map((d) => {
              const isSelected = formData.systemDiscipline === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  className={`${styles.discPill} ${isSelected ? styles.discPillActive : ""}`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      systemDiscipline: prev.systemDiscipline === d.id ? undefined : d.id,
                    }))
                  }
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>

        <FormField
          id="phone"
          label={isAr ? "رقم الفرز المباشر / واتساب (مع كود الدولة)" : "Direct Dispatch Phone / WhatsApp (with Country Code)"}
          required
          error={errors.phone}
          hint={isAr ? "سيتواصل معك مهندس الفرز فوراً عبر هذا الرقم" : "We will contact this number immediately"}
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

        <FileUploadZone
          locale={locale}
          label={isAr ? "صورة لوحة الإنذارات أو لوحة بيانات المعدة (اختياري)" : "FAULT PHOTO OR NAMEPLATE (OPTIONAL)"}
          description={
            isAr
              ? "إذا توفرت لديك صورة فورية للوحة الإنذارات أو القطعة التالفة، يرجى إرفاقها أدناه."
              : "If you have an immediate photo of the alarm panel or defective component, attach it below."
          }
          attachments={formData.attachments || []}
          onAttachmentsChange={handleAttachmentsChange}
        />

        <div className={styles.submitSection}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.rapidSubmitBtn}
          >
            <span>
              {isSubmitting
                ? isAr
                  ? "جاري إرسال البلاغ..."
                  : "DISPATCHING REQUEST..."
                : isAr
                ? "إرسال طلب الدعم العاجل"
                : "REQUEST RAPID SUPPORT"}
            </span>
            <span aria-hidden="true">{isAr ? "←" : "→"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
