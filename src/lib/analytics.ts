/**
 * Privacy-First Analytics & Conversion Tracking Layer
 * 
 * PRIVACY RULES:
 * 1. Zero PII: Never collect or transmit names, emails, phones, IMO numbers, vessel names,
 *    problem details, or filenames.
 * 2. Optional: If no analytics provider is configured, all tracking calls are clean no-ops.
 * 3. Submission integrity: `*_submitted` events are only fired on verified successful dispatch.
 */

export type SemanticAnalyticsEvent =
  | "technical_support_started"
  | "technical_support_submitted"
  | "rapid_support_started"
  | "rapid_support_submitted"
  | "spare_parts_started"
  | "spare_parts_submitted"
  | "general_enquiry_submitted"
  | "attachment_added"
  | "service_discipline_selected"
  | "support_cta_clicked";

export interface EventProperties {
  discipline?: string;
  urgency?: string;
  sourceSection?: string;
  attachmentCount?: number;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Tracks a semantic event without PII.
 */
export function trackEvent(
  event: SemanticAnalyticsEvent,
  properties?: EventProperties
): void {
  // If no analytics is enabled, exit silently
  if (typeof window === "undefined") return;

  const isAnalyticsEnabled = Boolean(process.env.NEXT_PUBLIC_ANALYTICS_ID);
  if (!isAnalyticsEnabled) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[ANALYTICS DEV EVENT]: ${event}`, properties || {});
    }
    return;
  }

  // Safe dispatch to window.dataLayer or standard analytics provider if initialized
  try {
    const win = window as unknown as { dataLayer?: Record<string, unknown>[] };
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({
        event,
        ...properties,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.error("[ANALYTICS ERROR]", err);
  }
}
