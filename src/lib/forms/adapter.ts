/**
 * Form Delivery Adapter Boundary
 * 
 * DESIGN PRINCIPLES:
 * 1. Zero fake integrations — no imaginary third-party services.
 * 2. Strict separation: UI -> Client Validation -> Server Action -> Server Validation -> Delivery Adapter.
 * 3. FormData (Multipart) Streaming: Zero Base64 bloat; real binary file transport.
 * 4. Resilient Local Development: Mock gracefully on localhost without requiring local PHP installation.
 * 5. Plug-and-play architecture: Default to Apache/PHP bridge with webhook compatibility.
 */

import {
  FormType,
  TechnicalSupportRequest,
  RapidSupportRequest,
  SparePartsRequest,
  GeneralEnquiryRequest,
} from "./types";

export interface DeliveryResult {
  delivered: boolean;
  adapterName: string;
  referenceId?: string;
  error?: string;
}

export interface FormDeliveryAdapter {
  name: string;
  isConfigured(): boolean;
  deliverTechnicalSupport(data: TechnicalSupportRequest, locale?: "en" | "ar"): Promise<DeliveryResult>;
  deliverRapidSupport(data: RapidSupportRequest, locale?: "en" | "ar"): Promise<DeliveryResult>;
  deliverSpareParts(data: SparePartsRequest, locale?: "en" | "ar"): Promise<DeliveryResult>;
  deliverGeneralEnquiry(data: GeneralEnquiryRequest, locale?: "en" | "ar"): Promise<DeliveryResult>;
}

/**
 * Production Native API Adapter
 * Dispatches multipart FormData to /api/send-mail.php on Apache/cPanel.
 * Provides rich local development logging and graceful fallback when on localhost.
 */
class ApiDeliveryAdapter implements FormDeliveryAdapter {
  name = "api_php_bridge";
  private endpoint: string;

  constructor(endpoint: string = "/api/send-mail.php") {
    this.endpoint = endpoint;
  }

  isConfigured(): boolean {
    return true;
  }

  async deliverTechnicalSupport(
    data: TechnicalSupportRequest,
    locale: "en" | "ar" = "en"
  ): Promise<DeliveryResult> {
    const formData = new FormData();
    formData.append("formType", "technical_support");
    formData.append("locale", locale);
    formData.append("vesselName", data.vesselName || "");
    if (data.imoNumber) formData.append("imoNumber", data.imoNumber);
    if (data.vesselType) formData.append("vesselType", data.vesselType);
    formData.append("currentPort", data.currentPort || "");
    formData.append("systemDiscipline", data.systemDiscipline || "");
    if (data.equipmentMaker) formData.append("equipmentMaker", data.equipmentMaker);
    if (data.equipmentModel) formData.append("equipmentModel", data.equipmentModel);
    formData.append("problemDescription", data.problemDescription || "");
    formData.append("urgency", data.urgency || "normal");
    formData.append("contactName", data.contactName || "");
    if (data.companyName) formData.append("companyName", data.companyName);
    formData.append("email", data.email || "");
    formData.append("phone", data.phone || "");
    formData.append("preferredContactMethod", data.preferredContactMethod || "email");
    if (data.honeypot) formData.append("honeypot", data.honeypot);

    // Append physical files
    if (data.attachments && data.attachments.length > 0) {
      data.attachments.forEach((att) => {
        if (att.file) {
          formData.append("attachments[]", att.file, att.name);
        }
      });
    }

    return this.postFormData("technical_support", formData);
  }

  async deliverRapidSupport(
    data: RapidSupportRequest,
    locale: "en" | "ar" = "en"
  ): Promise<DeliveryResult> {
    const formData = new FormData();
    formData.append("formType", "rapid_support");
    formData.append("locale", locale);
    formData.append("vesselName", data.vesselName || "");
    formData.append("currentPort", data.currentPort || "");
    formData.append("problemSummary", data.problemSummary || "");
    formData.append("phone", data.phone || "");
    if (data.systemDiscipline) formData.append("systemDiscipline", data.systemDiscipline);
    if (data.honeypot) formData.append("honeypot", data.honeypot);

    if (data.attachments && data.attachments.length > 0) {
      data.attachments.forEach((att) => {
        if (att.file) {
          formData.append("attachments[]", att.file, att.name);
        }
      });
    }

    return this.postFormData("rapid_support", formData);
  }

  async deliverSpareParts(
    data: SparePartsRequest,
    locale: "en" | "ar" = "en"
  ): Promise<DeliveryResult> {
    const formData = new FormData();
    formData.append("formType", "spare_parts");
    formData.append("locale", locale);
    formData.append("identificationPath", data.identificationPath || "known_part");
    formData.append("partName", data.partName || "");
    if (data.partNumber) formData.append("partNumber", data.partNumber);
    if (data.maker) formData.append("maker", data.maker);
    if (data.model) formData.append("model", data.model);
    formData.append("quantity", data.quantity || "");
    formData.append("deliveryLocation", data.deliveryLocation || "");
    if (data.requiredDate) formData.append("requiredDate", data.requiredDate);
    if (data.notes) formData.append("notes", data.notes);
    formData.append("contactName", data.contactName || "");
    if (data.companyName) formData.append("companyName", data.companyName);
    formData.append("email", data.email || "");
    formData.append("phone", data.phone || "");
    if (data.honeypot) formData.append("honeypot", data.honeypot);

    if (data.attachments && data.attachments.length > 0) {
      data.attachments.forEach((att) => {
        if (att.file) {
          formData.append("attachments[]", att.file, att.name);
        }
      });
    }

    return this.postFormData("spare_parts", formData);
  }

  async deliverGeneralEnquiry(
    data: GeneralEnquiryRequest,
    locale: "en" | "ar" = "en"
  ): Promise<DeliveryResult> {
    const formData = new FormData();
    formData.append("formType", "general_enquiry");
    formData.append("locale", locale);
    formData.append("contactName", data.contactName || "");
    if (data.companyName) formData.append("companyName", data.companyName);
    formData.append("email", data.email || "");
    if (data.phone) formData.append("phone", data.phone);
    formData.append("subject", data.subject || "");
    formData.append("message", data.message || "");
    if (data.honeypot) formData.append("honeypot", data.honeypot);

    return this.postFormData("general_enquiry", formData);
  }

  private async postFormData(formType: FormType, formData: FormData): Promise<DeliveryResult> {
    const isBrowser = typeof window !== "undefined";
    const isLocalDev =
      isBrowser &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.port === "3000");

    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        body: formData,
      });

      // If local dev returns 404 (because Next.js dev server has no PHP runtime)
      if (isLocalDev && (response.status === 404 || response.status === 405)) {
        return this.handleLocalDevMock(formType, formData);
      }

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
      }

      const resData = await response.json();
      if (!resData.success) {
        return {
          delivered: false,
          adapterName: this.name,
          error: resData.message || "Submission failed on server.",
        };
      }

      return {
        delivered: true,
        adapterName: this.name,
        referenceId: resData.deliveryReference || `MEG-${Date.now().toString(36).toUpperCase()}`,
      };
    } catch (err: unknown) {
      // In local development, gracefully intercept network/404 errors
      if (isLocalDev) {
        return this.handleLocalDevMock(formType, formData);
      }

      const errorMessage = err instanceof Error ? err.message : "Network connection error.";
      console.error(`[DELIVERY ERROR] ${formType} dispatch failed:`, errorMessage);
      return {
        delivered: false,
        adapterName: this.name,
        error: errorMessage,
      };
    }
  }

  private handleLocalDevMock(formType: FormType, formData: FormData): DeliveryResult {
    const fields: Record<string, unknown> = {};
    let fileCount = 0;

    formData.forEach((value, key) => {
      if (value instanceof File) {
        fileCount++;
      } else {
        fields[key] = value;
      }
    });

    console.group(`%c[LOCAL DEV MOCK] Form Dispatched: ${formType}`, "color: #00bcd4; font-weight: bold;");
    console.log("Endpoint target:", this.endpoint);
    console.log("Fields:", fields);
    console.log(`Attached files: ${fileCount}`);
    console.log("Note: Real email dispatch will execute when deployed to cPanel / Apache production.");
    console.groupEnd();

    return {
      delivered: true,
      adapterName: "local_dev_mock",
      referenceId: `DEV-${Date.now().toString(36).toUpperCase()}`,
    };
  }
}

/**
 * Webhook / REST API Adapter
 * Active only when FORM_WEBHOOK_URL is provided in environment variables.
 */
class WebhookDeliveryAdapter implements FormDeliveryAdapter {
  name = "webhook_http";
  private webhookUrl: string;

  constructor(url: string) {
    this.webhookUrl = url;
  }

  isConfigured(): boolean {
    return Boolean(this.webhookUrl);
  }

  async deliverTechnicalSupport(data: TechnicalSupportRequest): Promise<DeliveryResult> {
    return this.postPayload("technical_support", data);
  }

  async deliverRapidSupport(data: RapidSupportRequest): Promise<DeliveryResult> {
    return this.postPayload("rapid_support", data);
  }

  async deliverSpareParts(data: SparePartsRequest): Promise<DeliveryResult> {
    return this.postPayload("spare_parts", data);
  }

  async deliverGeneralEnquiry(data: GeneralEnquiryRequest): Promise<DeliveryResult> {
    return this.postPayload("general_enquiry", data);
  }

  private async postPayload(formType: FormType, data: unknown): Promise<DeliveryResult> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Form-Type": formType,
          ...(process.env.FORM_WEBHOOK_SECRET
            ? { Authorization: `Bearer ${process.env.FORM_WEBHOOK_SECRET}` }
            : {}),
        },
        body: JSON.stringify({
          formType,
          submittedAt: new Date().toISOString(),
          data,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const resData = await response.json().catch(() => ({}));
      return {
        delivered: true,
        adapterName: this.name,
        referenceId: resData.referenceId || `DISP-${Date.now().toString(36).toUpperCase()}`,
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Network error";
      console.error(`[DELIVERY ERROR] Failed to deliver ${formType}:`, errorMessage);
      return {
        delivered: false,
        adapterName: this.name,
        error: errorMessage,
      };
    }
  }
}

/**
 * Resolves the active delivery adapter based on environment configuration.
 * Default is the ApiDeliveryAdapter pointing to /api/send-mail.php.
 */
export function getDeliveryAdapter(): FormDeliveryAdapter {
  const webhookUrl = process.env.FORM_WEBHOOK_URL;
  if (webhookUrl && webhookUrl.startsWith("http")) {
    return new WebhookDeliveryAdapter(webhookUrl);
  }

  const customEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  return new ApiDeliveryAdapter(customEndpoint || "/api/send-mail.php");
}
