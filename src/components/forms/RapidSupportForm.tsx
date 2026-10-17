"use client";

import React, { useState } from "react";
import { RapidSupportRequest, EngineeringDiscipline, AttachmentMetadata } from "@/lib/forms/types";
import { validateRapidSupport, FieldErrors } from "@/lib/forms/validation";
import { submitRapidSupportAction } from "@/lib/forms/actions";
import { FormField } from "./FormField";
import { FileUploadZone } from "./FileUploadZone";
import { FormSuccessState, FormErrorBanner } from "./FormFeedback";
import styles from "./RapidSupportForm.module.css";

export function RapidSupportForm() {
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
    { id: "mechanical", label: "Mechanical Breakdown" },
    { id: "electrical", label: "Electrical / Blackout" },
    { id: "automation", label: "Control / PLC Fault" },
    { id: "pneumatic", label: "Pneumatic / Air Loss" },
    { id: "radio", label: "Radio & Bridge Breakdown" },
    { id: "other", label: "Other / Multiple" },
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

    const validationErrors = validateRapidSupport(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorKey)?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitRapidSupportAction(formData);
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
      setGlobalError("A connection error occurred. Please call dispatch directly if urgent.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <FormSuccessState
        formType="rapid_support"
        isDelivered={submissionResult?.isDelivered}
        deliveryReference={submissionResult?.deliveryReference}
        title={
          submissionResult?.isDelivered
            ? "RAPID ALERT DISPATCHED"
            : "RAPID SUPPORT PACKAGE PREPARED"
        }
        message={`Priority dispatch details compiled for vessel "${formData.vesselName}".`}
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
      {globalError && <FormErrorBanner message={globalError} />}

      {/* Priority Banner Header */}
      <div className={styles.priorityBar}>
        <div className={styles.pulseDot} aria-hidden="true" />
        <div className={styles.priorityText}>
          <span className={styles.priorityHeading}>STREAMLINED URGENT INTAKE</span>
          <span className={styles.prioritySub}>Direct operational queue for active breakdowns &amp; blackouts.</span>
        </div>
      </div>

      <div className={styles.formBody}>
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
              placeholder="e.g. MV Red Sea Pioneer"
              aria-required="true"
              aria-invalid={!!errors.vesselName}
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
              placeholder="e.g. Suez Anchorage / Port Said"
              aria-required="true"
              aria-invalid={!!errors.currentPort}
            />
          </FormField>
        </div>

        <FormField
          id="problemSummary"
          label="Urgent Fault &amp; Operational Impact"
          required
          error={errors.problemSummary}
        >
          <textarea
            id="problemSummary"
            name="problemSummary"
            value={formData.problemSummary}
            onChange={handleInputChange}
            placeholder="State the active fault (e.g. Generator 2 tripping on reverse power, Main engine cooling pump seized, steering gear hydraulic loss)..."
            rows={4}
            aria-required="true"
            aria-invalid={!!errors.problemSummary}
          />
        </FormField>

        {/* Optional Discipline */}
        <div className={styles.disciplineRow}>
          <span className={styles.subLabel}>SYSTEM CATEGORY (OPTIONAL)</span>
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
          label="Direct Dispatch Phone / WhatsApp (with Country Code)"
          required
          error={errors.phone}
          hint="We will contact this number immediately"
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
          label="FAULT PHOTO OR NAMEPLATE (OPTIONAL)"
          description="If you have an immediate photo of the alarm panel or defective component, attach it below."
          attachments={formData.attachments || []}
          onAttachmentsChange={handleAttachmentsChange}
        />

        <div className={styles.submitSection}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.rapidSubmitBtn}
          >
            <span>{isSubmitting ? "DISPATCHING REQUEST..." : "REQUEST RAPID SUPPORT"}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </form>
  );
}
