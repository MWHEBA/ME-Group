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

export function SparePartsForm() {
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

    const validationErrors = validateSpareParts(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorKey)?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitSparePartsAction(formData);
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
      setGlobalError("A connection error occurred. Please verify your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <FormSuccessState
        formType="spare_parts"
        isDelivered={submissionResult?.isDelivered}
        deliveryReference={submissionResult?.deliveryReference}
        title={
          submissionResult?.isDelivered
            ? "REQUISITION DISPATCHED"
            : "SPARE PARTS REQUISITION PREPARED"
        }
        message={`Requisition package compiled for "${formData.partName}" (${formData.quantity} units).`}
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
      {globalError && <FormErrorBanner message={globalError} />}

      {/* Path Toggle Header */}
      <div className={styles.pathToggleCard}>
        <span className={styles.toggleKicker}>SELECT IDENTIFICATION METHOD</span>
        <div className={styles.toggleButtons}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${isKnownPath ? styles.toggleBtnActive : ""}`}
            onClick={() => handlePathChange("known_part")}
          >
            <span className={styles.toggleCode}>PATH A</span>
            <span className={styles.toggleTitle}>I KNOW THE PART NUMBER</span>
            <span className={styles.toggleSub}>OEM drawing number, catalogue or maker reference available</span>
          </button>

          <button
            type="button"
            className={`${styles.toggleBtn} ${!isKnownPath ? styles.toggleBtnActive : ""}`}
            onClick={() => handlePathChange("need_identification")}
          >
            <span className={styles.toggleCode}>PATH B</span>
            <span className={styles.toggleTitle}>I NEED HELP IDENTIFYING</span>
            <span className={styles.toggleSub}>Machinery nameplate photo, equipment model or dimensions</span>
          </button>
        </div>
      </div>

      {/* Part Specifications */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <span className={styles.stepBadge}>01 / 03</span>
          <h3 className={styles.sectionTitle}>
            {isKnownPath ? "PART & OEM SPECIFICATION" : "EQUIPMENT & COMPONENT DETAILS"}
          </h3>
        </div>

        <div className={styles.fieldsGrid}>
          <FormField
            id="partName"
            label="Part / Component Name"
            required
            error={errors.partName}
          >
            <input
              type="text"
              id="partName"
              name="partName"
              value={formData.partName}
              onChange={handleInputChange}
              placeholder="e.g. Mechanical Seal / Fuel Injector Nozzle / GMDSS Battery / AVR Board"
              aria-required="true"
              aria-invalid={!!errors.partName}
            />
          </FormField>

          <FormField
            id="partNumber"
            label={isKnownPath ? "Part Number / Drawing Ref" : "Part Number (If visible)"}
            required={isKnownPath}
            error={errors.partNumber}
          >
            <input
              type="text"
              id="partNumber"
              name="partNumber"
              value={formData.partNumber}
              onChange={handleInputChange}
              placeholder={isKnownPath ? "e.g. 512.040-02 / 12345-AB" : "Leave blank if not visible"}
              aria-required={isKnownPath}
              aria-invalid={!!errors.partNumber}
            />
          </FormField>

          <FormField
            id="maker"
            label="Equipment Maker / Brand"
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
            label="Equipment Model / Type"
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
            label="Quantity Required"
            required
            error={errors.quantity}
          >
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="e.g. 2 Units / 1 Full Set"
              aria-required="true"
              aria-invalid={!!errors.quantity}
            />
          </FormField>

          <FormField
            id="deliveryLocation"
            label="Target Delivery Port / Destination"
            required
            error={errors.deliveryLocation}
          >
            <input
              type="text"
              id="deliveryLocation"
              name="deliveryLocation"
              value={formData.deliveryLocation}
              onChange={handleInputChange}
              placeholder="e.g. Port Said / Suez Anchorage / Alexandria"
              aria-required="true"
              aria-invalid={!!errors.deliveryLocation}
            />
          </FormField>
        </div>

        <FormField
          id="notes"
          label="Additional Technical Notes"
          error={errors.notes}
        >
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Special material requirements, voltage ratings, or vessel delivery timeline..."
            rows={3}
          />
        </FormField>
      </div>

      {/* Attachments Section */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <span className={styles.stepBadge}>02 / 03</span>
          <h3 className={styles.sectionTitle}>
            {!isKnownPath ? "NAMEPLATE OR DEFECTIVE PART PHOTO" : "TECHNICAL DRAWING OR SPEC SHEET"}
          </h3>
        </div>

        <FileUploadZone
          label={!isKnownPath ? "NAMEPLATE & PART PHOTOS (RECOMMENDED)" : "DRAWING OR DOCUMENTATION (OPTIONAL)"}
          description={
            !isKnownPath
              ? "A clear photo of the machinery nameplate allows our sourcing team to identify the exact OEM catalog and part numbers."
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
          <h3 className={styles.sectionTitle}>BUYER / TECHNICAL CONTACT</h3>
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
              placeholder="e.g. Technical Buyer / Superintendent"
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.contactName}
            />
          </FormField>

          <FormField
            id="companyName"
            label="Company Name"
            required
            error={errors.companyName}
          >
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="e.g. Marine Operations / Shipping Co"
              autoComplete="organization"
              aria-required="true"
              aria-invalid={!!errors.companyName}
            />
          </FormField>

          <FormField
            id="email"
            label="Corporate Email"
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
            label="Phone / WhatsApp (with Country Code)"
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
            <span>{isSubmitting ? "PROCESSING REQUISITION..." : "REQUEST SPARE PARTS"}</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </form>
  );
}
