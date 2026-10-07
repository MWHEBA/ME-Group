"use client";

import React, { useState, Suspense, useEffect } from "react";
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
}

function TechnicalSupportFormInner({ initialSystem }: TechnicalSupportFormProps) {
  const searchParams = useSearchParams();
  const rawSystem = (searchParams.get("system") || searchParams.get("category") || "").toLowerCase();
  
  let resolvedSystem: EngineeringDiscipline = initialSystem || "mechanical";
  if (
    rawSystem === "mechanical" ||
    rawSystem === "electrical" ||
    rawSystem === "automation" ||
    rawSystem === "pneumatic"
  ) {
    resolvedSystem = rawSystem;
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

  useEffect(() => {
    if (resolvedSystem) {
      setFormData((prev) => ({ ...prev, systemDiscipline: resolvedSystem }));
    }
  }, [resolvedSystem]);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    isDelivered?: boolean;
    deliveryReference?: string;
  } | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const disciplines: { id: EngineeringDiscipline; label: string; code: string }[] = [
    { id: "mechanical", label: "Mechanical Systems", code: "01" },
    { id: "electrical", label: "Electrical & MSB", code: "02" },
    { id: "automation", label: "Automation & PLC", code: "03" },
    { id: "pneumatic", label: "Pneumatics & Air", code: "04" },
    { id: "other", label: "Other / Multiple", code: "05" },
  ];

  const urgencyOptions: { id: UrgencyLevel; label: string; note: string }[] = [
    { id: "normal", label: "Normal Operation", note: "Scheduled maintenance or inspection" },
    { id: "priority", label: "Priority Schedule", note: "Impending departure or port stay" },
    { id: "urgent", label: "Urgent Technical Breakdown", note: "Active equipment failure onboard" },
  ];

  const contactMethods: { id: ContactPreference; label: string }[] = [
    { id: "email", label: "Email" },
    { id: "phone", label: "Direct Phone" },
    { id: "whatsapp", label: "WhatsApp" },
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

    const validationErrors = validateTechnicalSupport(formData);
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
      const response = await submitTechnicalSupportAction(formData);
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
      setGlobalError("A connection issue occurred. Please verify your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <FormSuccessState
        formType="technical_support"
        isDelivered={submissionResult?.isDelivered}
        deliveryReference={submissionResult?.deliveryReference}
        title={
          submissionResult?.isDelivered
            ? "TECHNICAL REQUEST DISPATCHED"
            : "TECHNICAL REQUEST COMPILED"
        }
        message={`Technical intake details recorded for vessel "${formData.vesselName}".`}
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
      {globalError && <FormErrorBanner message={globalError} />}

      {/* Step 01: Vessel Details */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleRow}>
            <span className={styles.stepBadge}>01 / 05</span>
            <h3 className={styles.sectionTitle}>VESSEL INFORMATION</h3>
          </div>
          <p className={styles.sectionSubtitle}>
            Specify vessel identification, classification parameters, and current port or anchorage.
          </p>
        </div>

        <div className={styles.fieldsGrid}>
          <FormField
            id="vesselName"
            label="Vessel Name"
            required
            error={errors.vesselName}
          >
            <input
              type="text"
              id="vesselName"
              name="vesselName"
              value={formData.vesselName}
              onChange={handleInputChange}
              placeholder="e.g. MV Mediterranean Star"
              aria-required="true"
              aria-invalid={!!errors.vesselName}
              aria-describedby={errors.vesselName ? "vesselName-error" : undefined}
            />
          </FormField>

          <FormField
            id="imoNumber"
            label="IMO Number"
            error={errors.imoNumber}
            hint="7 digits"
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
            label="Vessel Type"
            error={errors.vesselType}
          >
            <input
              type="text"
              id="vesselType"
              name="vesselType"
              value={formData.vesselType}
              onChange={handleInputChange}
              placeholder="e.g. Bulk Carrier / Container / Tanker"
            />
          </FormField>

          <FormField
            id="currentPort"
            label="Current Port / Location"
            required
            error={errors.currentPort}
          >
            <input
              type="text"
              id="currentPort"
              name="currentPort"
              value={formData.currentPort}
              onChange={handleInputChange}
              placeholder="e.g. Port Said / Suez / Alexandria"
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
            <h3 className={styles.sectionTitle}>TECHNICAL DISCIPLINE &amp; EQUIPMENT</h3>
          </div>
          <p className={styles.sectionSubtitle}>
            Select the primary engineering discipline and specify the machinery maker and model.
          </p>
        </div>

        <div className={styles.disciplineSelector}>
          <span className={styles.subLabel}>PRIMARY SYSTEM INVOLVED *</span>
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
            label="Equipment Manufacturer / Maker"
            error={errors.equipmentMaker}
          >
            <input
              type="text"
              id="equipmentMaker"
              name="equipmentMaker"
              value={formData.equipmentMaker}
              onChange={handleInputChange}
              placeholder="e.g. MAN B&amp;W, Wärtsilä, Hyundai, ABB"
            />
          </FormField>

          <FormField
            id="equipmentModel"
            label="Model / Serial Type"
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
            <h3 className={styles.sectionTitle}>PROBLEM DESCRIPTION &amp; URGENCY</h3>
          </div>
          <p className={styles.sectionSubtitle}>
            Detail the observed operational malfunction, alarm codes, and required response urgency.
          </p>
        </div>

        <FormField
          id="problemDescription"
          label="Problem Description &amp; Observed Symptoms"
          required
          error={errors.problemDescription}
        >
          <textarea
            id="problemDescription"
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleInputChange}
            placeholder="Describe the operational fault, alarms triggered, temperatures, pressures, or components affected..."
            rows={5}
            aria-required="true"
            aria-invalid={!!errors.problemDescription}
            aria-describedby={
              errors.problemDescription ? "problemDescription-error" : undefined
            }
          />
        </FormField>

        <div className={styles.urgencySection}>
          <span className={styles.subLabel}>OPERATIONAL URGENCY</span>
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
            <h3 className={styles.sectionTitle}>TECHNICAL ATTACHMENTS</h3>
          </div>
          <p className={styles.sectionSubtitle}>
            Attach equipment nameplate photos, alarm logs, electrical schematics, or service history.
          </p>
        </div>

        <FileUploadZone
          attachments={formData.attachments}
          onAttachmentsChange={handleAttachmentsChange}
        />
      </div>

      {/* Step 05: Contact & Submit */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleRow}>
            <span className={styles.stepBadge}>05 / 05</span>
            <h3 className={styles.sectionTitle}>CONTACT DETAILS</h3>
          </div>
          <p className={styles.sectionSubtitle}>
            Provide superintendent or chief engineer contact coordinates for operational dispatch.
          </p>
        </div>

        <div className={styles.fieldsGrid}>
          <FormField
            id="contactName"
            label="Contact Full Name"
            required
            error={errors.contactName}
          >
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleInputChange}
              placeholder="e.g. Chief Engineer / Technical Superintendent"
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.contactName}
            />
          </FormField>

          <FormField
            id="companyName"
            label="Company / Management Firm"
            required
            error={errors.companyName}
          >
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="e.g. Shipping Line / Technical Management"
              autoComplete="organization"
              aria-required="true"
              aria-invalid={!!errors.companyName}
            />
          </FormField>

          <FormField
            id="email"
            label="Corporate Email Address"
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
            label="Phone / WhatsApp Number (with Country Code)"
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
          <span className={styles.subLabel}>PREFERRED CONTACT CHANNEL</span>
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
            <span>{isSubmitting ? "PROCESSING REQUEST..." : "SUBMIT TECHNICAL REQUEST"}</span>
            <span aria-hidden="true">→</span>
          </button>
          <div className={styles.securityNote}>
            <span>🔒 Confidential technical intake — reviewed by senior marine engineering staff within 2 hours.</span>
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
