/**
 * Form Delivery Adapter Boundary
 * 
 * DESIGN PRINCIPLES:
 * 1. Zero fake integrations — no imaginary third-party services.
 * 2. Strict separation: UI -> Client Validation -> Server Action -> Server Validation -> Delivery Adapter.
 * 3. Never fake successful delivery to visitors if no real backend exists.
 * 4. Plug-and-play architecture for future SMTP, CRM, or Webhook providers once client credentials are confirmed.
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
  deliverTechnicalSupport(data: TechnicalSupportRequest): Promise<DeliveryResult>;
  deliverRapidSupport(data: RapidSupportRequest): Promise<DeliveryResult>;
  deliverSpareParts(data: SparePartsRequest): Promise<DeliveryResult>;
  deliverGeneralEnquiry(data: GeneralEnquiryRequest): Promise<DeliveryResult>;
}

/**
 * Standard unconfigured fallback adapter.
 * Used when no delivery provider (SMTP/Webhook/CRM) is specified in environment variables.
 */
class UnconfiguredDeliveryAdapter implements FormDeliveryAdapter {
  name = "unconfigured_fallback";

  isConfigured(): boolean {
    return false;
  }

  async deliverTechnicalSupport(data: TechnicalSupportRequest): Promise<DeliveryResult> {
    return this.handleUnconfigured("technical_support", data.vesselName);
  }

  async deliverRapidSupport(data: RapidSupportRequest): Promise<DeliveryResult> {
    return this.handleUnconfigured("rapid_support", data.vesselName);
  }

  async deliverSpareParts(data: SparePartsRequest): Promise<DeliveryResult> {
    return this.handleUnconfigured("spare_parts", data.partName);
  }

  async deliverGeneralEnquiry(data: GeneralEnquiryRequest): Promise<DeliveryResult> {
    return this.handleUnconfigured("general_enquiry", data.subject);
  }

  private handleUnconfigured(formType: FormType, context: string): DeliveryResult {
    const isDev = process.env.NODE_ENV !== "production";
    
    if (isDev) {
      console.log(`[DEV ADAPTER] Form '${formType}' validated for '${context}'. No production delivery sink configured.`);
      return {
        delivered: false,
        adapterName: this.name,
        referenceId: `DEV-${Date.now().toString(36).toUpperCase()}`,
      };
    }

    // In production without credentials:
    console.warn(`[WARN] Form submission attempted for '${formType}' but no delivery provider is configured.`);
    return {
      delivered: false,
      adapterName: this.name,
      error: "No production delivery provider configured.",
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
 */
export function getDeliveryAdapter(): FormDeliveryAdapter {
  const webhookUrl = process.env.FORM_WEBHOOK_URL;
  if (webhookUrl && webhookUrl.startsWith("http")) {
    return new WebhookDeliveryAdapter(webhookUrl);
  }

  return new UnconfiguredDeliveryAdapter();
}
