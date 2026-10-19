"use client";

import React, { useState } from "react";
import { GeneralEnquiryRequest } from "@/lib/forms/types";
import { validateGeneralEnquiry, FieldErrors } from "@/lib/forms/validation";
import { submitGeneralEnquiryAction } from "@/lib/forms/actions";
import { FormField } from "./FormField";
import { FormSuccessState, FormErrorBanner } from "./FormFeedback";
import styles from "./GeneralEnquiryForm.module.css";

interface GeneralEnquiryFormProps {
  locale?: "en" | "ar";
}

export function GeneralEnquiryForm({ locale = "en" }: GeneralEnquiryFormProps) {
  const isAr = locale === "ar";
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

    const validationErrors = validateGeneralEnquiry(formData, locale);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorKey)?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitGeneralEnquiryAction(formData, locale);
      if (response.success) {
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
          ? "حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى."
          : "A connection error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <FormSuccessState
        locale={locale}
        formType="general_enquiry"
        title={isAr ? "تم تجهيز رسالة الاستفسار" : "ENQUIRY MESSAGE COMPILED"}
        message={
          isAr
            ? `شكراً لك، ${formData.contactName}. تم استلام استفسارك التجاري بنجاح وسيتم التواصل معك.`
            : `Thank you, ${formData.contactName}. Your commercial enquiry has been compiled.`
        }
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
      {globalError && <FormErrorBanner message={globalError} locale={locale} />}

      <div className={styles.fieldsGrid}>
        <FormField
          id="contactName"
          label={isAr ? "الاسم بالكامل" : "Your Full Name"}
          required
          error={errors.contactName}
        >
          <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleInputChange}
            placeholder={isAr ? "مثال: م. أحمد عبد الله" : "e.g. John Doe"}
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.contactName}
          />
        </FormField>

        <FormField
          id="companyName"
          label={isAr ? "الشركة / المؤسسة" : "Company"}
          error={errors.companyName}
        >
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder={isAr ? "مثال: شركة الملاحة البحرية" : "e.g. Maritime Logistics Ltd"}
            autoComplete="organization"
          />
        </FormField>

        <FormField
          id="email"
          label={isAr ? "البريد الإلكتروني" : "Email Address"}
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
          label={isAr ? "رقم الهاتف / واتساب" : "Phone Number"}
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
        label={isAr ? "الموضوع / عنوان الاستفسار" : "Subject / Topic"}
        required
        error={errors.subject}
      >
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder={isAr ? "مثال: شراكة صيانة دورية للأسطول" : "e.g. Annual Fleet Maintenance Partnership"}
          aria-required="true"
          aria-invalid={!!errors.subject}
        />
      </FormField>

      <FormField
        id="message"
        label={isAr ? "رسالتك أو تفاصيل الاستفسار" : "Your Message"}
        required
        error={errors.message}
      >
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder={isAr ? "اكتب تفاصيل استفسارك أو متطلبات العمل..." : "Enter your message or enquiry details..."}
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
          <span>
            {isSubmitting
              ? isAr
                ? "جاري الإرسال..."
                : "SENDING..."
              : isAr
              ? "إرسال الاستفسار"
              : "SEND ENQUIRY"}
          </span>
          <span aria-hidden="true">{isAr ? "←" : "→"}</span>
        </button>
      </div>
    </form>
  );
}
