"use client";

import React, { useState } from "react";
import { GeneralEnquiryRequest } from "@/lib/forms/types";
import { validateGeneralEnquiry, FieldErrors } from "@/lib/forms/validation";
import { submitGeneralEnquiryAction } from "@/lib/forms/actions";
import { FormField } from "./FormField";
import { FormSuccessState, FormErrorBanner } from "./FormFeedback";
import styles from "./GeneralEnquiryForm.module.css";

export function GeneralEnquiryForm() {
  const [formData, setFormData] = useState<GeneralEnquiryRequest>({
    contactName: "",
    companyName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    const validationErrors = validateGeneralEnquiry(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorKey)?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitGeneralEnquiryAction(formData);
      if (response.success) {
        setIsSubmitted(true);
      } else {
        if (response.errors) {
          setErrors(response.errors);
        }
        setGlobalError(response.message);
      }
    } catch {
      setGlobalError("A connection error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <FormSuccessState
        formType="general_enquiry"
        title="ENQUIRY MESSAGE COMPILED"
        message={`Thank you, ${formData.contactName}. Your commercial enquiry has been compiled.`}
        onReset={() => {
          setIsSubmitted(false);
          setFormData({
            contactName: "",
            companyName: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.enquiryForm}>
      {globalError && <FormErrorBanner message={globalError} />}

      <div className={styles.fieldsGrid}>
        <FormField
          id="contactName"
          label="Your Full Name"
          required
          error={errors.contactName}
        >
          <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleInputChange}
            placeholder="e.g. John Doe"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.contactName}
          />
        </FormField>

        <FormField
          id="companyName"
          label="Company"
          error={errors.companyName}
        >
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="e.g. Maritime Logistics Ltd"
            autoComplete="organization"
          />
        </FormField>

        <FormField
          id="email"
          label="Email Address"
          required
          error={errors.email}
        >
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="name@company.com"
            autoComplete="email"
            inputMode="email"
            aria-required="true"
            aria-invalid={!!errors.email}
          />
        </FormField>

        <FormField
          id="phone"
          label="Phone Number"
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
            aria-invalid={!!errors.phone}
          />
        </FormField>
      </div>

      <FormField
        id="subject"
        label="Subject / Topic"
        required
        error={errors.subject}
      >
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="e.g. Annual Fleet Maintenance Partnership"
          aria-required="true"
          aria-invalid={!!errors.subject}
        />
      </FormField>

      <FormField
        id="message"
        label="Your Message"
        required
        error={errors.message}
      >
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Enter your message or enquiry details..."
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
        />
      </FormField>

      <div className={styles.submitWrap}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          <span>{isSubmitting ? "SENDING..." : "SEND ENQUIRY"}</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
