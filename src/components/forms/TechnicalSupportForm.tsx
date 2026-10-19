"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  TechnicalSupportRequest,
  EngineeringDiscipline,
  UrgencyLevel,
  ContactPreference,
  AttachmentMetadata,
} from "@/lib/forms/types";
import { validateTechnicalSupport, FieldErrors } from "@/lib/forms/validation";
import { submitTechnicalSupportAction } from "@/lib/forms/actions";
import { FormField } from "./FormField";
import { FileUploadZone } from "./FileUploadZone";
import { FormSuccessState, FormErrorBanner } from "./FormFeedback";
import styles from "./TechnicalSupportForm.module.css";

interface TechnicalSupportFormProps {
  initialSystem?: EngineeringDiscipline;
  locale?: "en" | "ar";
}

function TechnicalSupportFormInner({ initialSystem, locale = "en" }: TechnicalSupportFormProps) {
  const isAr = locale === "ar";
  const searchParams = useSearchParams();
  const rawSystem = (searchParams.get("system") || searchParams.get("category") || "").toLowerCase();
  
  let resolvedSystem: EngineeringDiscipline = initialSystem || "mechanical";
  if (
    rawSystem === "mechanical" ||
    rawSystem === "electrical" ||
    rawSystem === "automation" ||
    rawSystem === "pneumatic" ||
    rawSystem === "radio"
  ) {
    resolvedSystem = rawSystem;
  } else if (
    rawSystem === "radio-equipment" ||
    rawSystem === "navigation-communication" ||
    rawSystem === "bridge" ||
    rawSystem === "navigation"
  ) {
    resolvedSystem = "radio";
  } else if (
    rawSystem === "inspection" ||
    rawSystem === "maintenance" ||
    rawSystem === "repair"
  ) {
    resolvedSystem = "other";
  }

  const [formData, setFormData] = useState<TechnicalSupportRequest>({
    vesselName: "",
    imoNumber: "",
    vesselType: "",
    currentPort: "",
    systemDiscipline: resolvedSystem,
    equipmentMaker: "",
    equipmentModel: "",
    problemDescription: "",
    urgency: "normal",
    attachments: [],
    contactName: "",
    companyName: "",
    email: "",
    phone: "",
    preferredContactMethod: "email",
  });

  const [prevSystem, setPrevSystem] = useState(resolvedSystem);
  if (prevSystem !== resolvedSystem) {
    setPrevSystem(resolvedSystem);
    setFormData((prev) => ({ ...prev, systemDiscipline: resolvedSystem }));
  }

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    isDelivered?: boolean;
    deliveryReference?: string;
  } | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const disciplines: { id: EngineeringDiscipline; label: string; code: string }[] = [
    { id: "mechanical", label: isAr ? "الأنظمة الميكانيكية" : "Mechanical Systems", code: "01" },
    { id: "electrical", label: isAr ? "الكهرباء ولوحات التوزيع" : "Electrical & MSB", code: "02" },
    { id: "automation", label: isAr ? "التحكم الآلي والـ PLC" : "Automation & PLC", code: "03" },
    { id: "pneumatic", label: isAr ? "الأنظمة الهوائية والضواغط" : "Pneumatics & Air", code: "04" },
    { id: "radio", label: isAr ? "أجهزة الراديو والملاحة" : "Radio & Bridge Systems", code: "08" },
    { id: "other", label: isAr ? "تخصصات أخرى / متعدد" : "Other / Multiple", code: "—" },
  ];

  const urgencyOptions: { id: UrgencyLevel; label: string; note: string }[] = [
    {
      id: "normal",
      label: isAr ? "تشغيل اعتيادي" : "Normal Operation",
      note: isAr ? "صيانة مجدولة أو فحص دوري" : "Scheduled maintenance or inspection",
    },
    {
      id: "priority",
      label: isAr ? "أولوية مجدولة" : "Priority Schedule",
      note: isAr ? "موعد إبحار قريب أو تراكي محدد" : "Impending departure or port stay",
    },
    {
      id: "urgent",
      label: isAr ? "عطل طارئ وتوقف للمعدة" : "Urgent Technical Breakdown",
      note: isAr ? "توقف تشغيلي نشط على متن السفينة" : "Active equipment failure onboard",
    },
  ];

  const contactMethods: { id: ContactPreference; label: string }[] = [
    { id: "email", label: isAr ? "البريد الإلكتروني" : "Email" },
    { id: "phone", label: isAr ? "الهاتف المباشر" : "Direct Phone" },
    { id: "whatsapp", label: isAr ? "واتساب" : "WhatsApp" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

    const validationErrors = validateTechnicalSupport(formData, locale);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus the first error field
      const firstErrorKey = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorKey);
      element?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitTechnicalSupportAction(formData, locale);
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
          ? "حدثت مشكلة في الاتصال. يرجى مراجعة البيانات والمحاولة مرة أخرى."
          : "A connection issue occurred. Please verify your details and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <FormSuccessState
        locale={locale}
        formType="technical_support"
        isDelivered={submissionResult?.isDelivered}
        deliveryReference={submissionResult?.deliveryReference}
        title={
          submissionResult?.isDelivered
            ? isAr
              ? "تم إرسال طلب الدعم الفني بنجاح"
              : "TECHNICAL REQUEST DISPATCHED"
            : isAr
            ? "تم تجهيز طلب الدعم الفني"
            : "TECHNICAL REQUEST COMPILED"
        }
        message={
          isAr
            ? `تم تسجيل بيانات الاستقبال والفرز الفني للسفينة "${formData.vesselName}".`
            : `Technical intake details recorded for vessel "${formData.vesselName}".`
        }
        onReset={() => {
          setIsSubmitted(false);
          setFormData({
            vesselName: "",
            imoNumber: "",
            vesselType: "",
            currentPort: "",
            systemDiscipline: "mechanical",
            equipmentMaker: "",
            equipmentModel: "",
            problemDescription: "",
            urgency: "normal",
            attachments: [],
            contactName: "",
            companyName: "",
            email: "",
            phone: "",
            preferredContactMethod: "email",
          });
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.formContainer}>
      {globalError && <FormErrorBanner message={globalError} locale={locale} />}

      {/* Step 01: Vessel Details */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleRow}>
            <span className={styles.stepBadge}>01 / 05</span>
            <h3 className={styles.sectionTitle}>
              {isAr ? "بيانات السفينة" : "VESSEL INFORMATION"}
            </h3>
          </div>
          <p className={styles.sectionSubtitle}>
            {isAr
              ? "حدد بيانات تعريف السفينة، ومعاملات التصنيف، والميناء أو المخطاف الحالي."
              : "Specify vessel identification, classification parameters, and current port or anchorage."}
          </p>
        </div>

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
              placeholder={isAr ? "مثال: MV Mediterranean Star" : "e.g. MV Mediterranean Star"}
              aria-required="true"
              aria-invalid={!!errors.vesselName}
              aria-describedby={errors.vesselName ? "vesselName-error" : undefined}
            />
          </FormField>

          <FormField
            id="imoNumber"
            label={isAr ? "رقم الـ IMO" : "IMO Number"}
            error={errors.imoNumber}
            hint={isAr ? "7 أرقام" : "7 digits"}
          >
            <input
              type="text"
              id="imoNumber"
              name="imoNumber"
              value={formData.imoNumber}
              onChange={handleInputChange}
              placeholder="e.g. 9123456"
              inputMode="numeric"
              aria-invalid={!!errors.imoNumber}
              aria-describedby={errors.imoNumber ? "imoNumber-error" : undefined}
            />
          </FormField>

          <FormField
            id="vesselType"
            label={isAr ? "نوع السفينة" : "Vessel Type"}
            error={errors.vesselType}
          >
            <input
              type="text"
              id="vesselType"
              name="vesselType"
              value={formData.vesselType}
              onChange={handleInputChange}
              placeholder={isAr ? "مثال: بضائع عامة / حاويات / بترولية / رورو" : "e.g. Bulk Carrier / Container / Tanker"}
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
              placeholder={isAr ? "مثال: بورسعيد / السويس / الإسكندرية" : "e.g. Port Said / Suez / Alexandria"}
              aria-required="true"
              aria-invalid={!!errors.currentPort}
              aria-describedby={errors.currentPort ? "currentPort-error" : undefined}
            />
          </FormField>
        </div>
      </div>

      {/* Step 02: Technical System */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleRow}>
            <span className={styles.stepBadge}>02 / 05</span>
            <h3 className={styles.sectionTitle}>
              {isAr ? "التخصص الفني والمنظومة" : "TECHNICAL DISCIPLINE & EQUIPMENT"}
            </h3>
          </div>
          <p className={styles.sectionSubtitle}>
            {isAr
              ? "اختر التخصص الهندسي الأساسي وحدد الشركة المصنعة وطراز المعدة."
              : "Select the primary engineering discipline and specify the machinery maker and model."}
          </p>
        </div>

        <div className={styles.disciplineSelector}>
          <span className={styles.subLabel}>
            {isAr ? "المنظومة الأساسية المعنية *" : "PRIMARY SYSTEM INVOLVED *"}
          </span>
          <div className={styles.disciplineGrid} role="radiogroup" aria-label="System Discipline">
            {disciplines.map((item) => {
              const isSelected = formData.systemDiscipline === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`${styles.disciplineBtn} ${isSelected ? styles.disciplineBtnActive : ""}`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, systemDiscipline: item.id }))
                  }
                >
                  <span className={styles.discCode}>{item.code}</span>
                  <span className={styles.discLabel}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.fieldsGrid} style={{ marginTop: "var(--space-4)" }}>
          <FormField
            id="equipmentMaker"
            label={isAr ? "الشركة المصنعة للمعدة (Maker)" : "Equipment Manufacturer / Maker"}
            error={errors.equipmentMaker}
          >
            <input
              type="text"
              id="equipmentMaker"
              name="equipmentMaker"
              value={formData.equipmentMaker}
              onChange={handleInputChange}
              placeholder="e.g. MAN B&W, Wärtsilä, ABB, Sailor, Furuno"
            />
          </FormField>

          <FormField
            id="equipmentModel"
            label={isAr ? "طراز المعدة / الرقم التسلسلي" : "Model / Serial Type"}
            error={errors.equipmentModel}
          >
            <input
              type="text"
              id="equipmentModel"
              name="equipmentModel"
              value={formData.equipmentModel}
              onChange={handleInputChange}
              placeholder="e.g. 6L28/32H / MSB-440"
            />
          </FormField>
        </div>
      </div>

      {/* Step 03: Problem Scope */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleRow}>
            <span className={styles.stepBadge}>03 / 05</span>
            <h3 className={styles.sectionTitle}>
              {isAr ? "توصيف العطل ودرجة الأهمية" : "PROBLEM DESCRIPTION & URGENCY"}
            </h3>
          </div>
          <p className={styles.sectionSubtitle}>
            {isAr
              ? "وضح تفاصيل العطل التشغيلي، رموز الإنذارات، ودرجة الاستجابة المطلوبة."
              : "Detail the observed operational malfunction, alarm codes, and required response urgency."}
          </p>
        </div>

        <FormField
          id="problemDescription"
          label={isAr ? "توصيف العطل والأعراض المرصودة" : "Problem Description & Observed Symptoms"}
          required
          error={errors.problemDescription}
        >
          <textarea
            id="problemDescription"
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleInputChange}
            placeholder={
              isAr
                ? "صف الأعطال الفنية، إشارات الإنذار، قراءات الضغوط ودرجات الحرارة، أو أسباب التوقف..."
                : "Describe the operational fault, alarms triggered, temperatures, pressures, or components affected..."
            }
            rows={5}
            aria-required="true"
            aria-invalid={!!errors.problemDescription}
            aria-describedby={
              errors.problemDescription ? "problemDescription-error" : undefined
            }
          />
        </FormField>

        <div className={styles.urgencySection}>
          <span className={styles.subLabel}>
            {isAr ? "الأولوية التشغيلية" : "OPERATIONAL URGENCY"}
          </span>
          <div className={styles.urgencyGrid}>
            {urgencyOptions.map((urg) => {
              const isSelected = formData.urgency === urg.id;
              return (
                <button
                  key={urg.id}
                  type="button"
                  className={`${styles.urgencyBtn} ${isSelected ? styles.urgencyBtnActive : ""}`}
                  onClick={() => setFormData((prev) => ({ ...prev, urgency: urg.id }))}
                >
                  <span className={styles.urgencyTitle}>{urg.label}</span>
                  <span className={styles.urgencyNote}>{urg.note}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step 04: Attachments */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleRow}>
            <span className={styles.stepBadge}>04 / 05</span>
            <h3 className={styles.sectionTitle}>
              {isAr ? "المستندات الفنية والصور" : "TECHNICAL ATTACHMENTS"}
            </h3>
          </div>
          <p className={styles.sectionSubtitle}>
            {isAr
              ? "أرفق صور لوحة بيانات المعدة، سجلات الإنذارات، المخططات الكهربائية، أو تقارير الخدمة."
              : "Attach equipment nameplate photos, alarm logs, electrical schematics, or service history."}
          </p>
        </div>

        <FileUploadZone
          locale={locale}
          label={isAr ? "المخططات الهندسية، صور اللوحات، أو سجلات الفحص (اختياري)" : undefined}
          attachments={formData.attachments}
          onAttachmentsChange={handleAttachmentsChange}
        />
      </div>

      {/* Step 05: Contact & Submit */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleRow}>
            <span className={styles.stepBadge}>05 / 05</span>
            <h3 className={styles.sectionTitle}>
              {isAr ? "بيانات مسؤول الاتصال" : "CONTACT DETAILS"}
            </h3>
          </div>
          <p className={styles.sectionSubtitle}>
            {isAr
              ? "بيانات المفتش الفني أو كبير المهندسين لتنسيق التوجيه الفني المباشر."
              : "Provide superintendent or chief engineer contact coordinates for operational dispatch."}
          </p>
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
              placeholder={isAr ? "مثال: م. أحمد عبد الله (Chief Engineer / Superintendent)" : "e.g. Chief Engineer / Technical Superintendent"}
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.contactName}
            />
          </FormField>

          <FormField
            id="companyName"
            label={isAr ? "اسم الشركة / إدارة الأسطول" : "Company / Management Firm"}
            required
            error={errors.companyName}
          >
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder={isAr ? "مثال: شركة الملاحة البحرية / الإدارة الفنية" : "e.g. Shipping Line / Technical Management"}
              autoComplete="organization"
              aria-required="true"
              aria-invalid={!!errors.companyName}
            />
          </FormField>

          <FormField
            id="email"
            label={isAr ? "البريد الإلكتروني للعمل" : "Corporate Email Address"}
            required
            error={errors.email}
          >
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@shipping-company.com"
              autoComplete="email"
              inputMode="email"
              aria-required="true"
              aria-invalid={!!errors.email}
            />
          </FormField>

          <FormField
            id="phone"
            label={isAr ? "رقم الهاتف / واتساب (مع كود الدولة)" : "Phone / WhatsApp Number (with Country Code)"}
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

        <div className={styles.preferenceRow}>
          <span className={styles.subLabel}>
            {isAr ? "قناة التواصل المفضلة" : "PREFERRED CONTACT CHANNEL"}
          </span>
          <div className={styles.channelOptions}>
            {contactMethods.map((cm) => (
              <label key={cm.id} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="preferredContactMethod"
                  value={cm.id}
                  checked={formData.preferredContactMethod === cm.id}
                  onChange={handleInputChange}
                />
                <span>{cm.label}</span>
              </label>
            ))}
          </div>
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
                  ? "جاري تسجيل الطلب..."
                  : "PROCESSING REQUEST..."
                : isAr
                ? "إرسال طلب الدعم الفني"
                : "SUBMIT TECHNICAL REQUEST"}
            </span>
            <span aria-hidden="true">{isAr ? "←" : "→"}</span>
          </button>
          <div className={styles.securityNote}>
            <span>
              {isAr
                ? "🔒 استقبال فني سري وآمن — تتم مراجعته بواسطة كبار مهندسي البحرية في أقل من ساعتين."
                : "🔒 Confidential technical intake — reviewed by senior marine engineering staff within 2 hours."}
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}

export function TechnicalSupportForm(props: TechnicalSupportFormProps) {
  return (
    <Suspense fallback={<div className={styles.formContainer}>Loading form...</div>}>
      <TechnicalSupportFormInner {...props} />
    </Suspense>
  );
}
