import {
  SubmissionResponse,
  TechnicalSupportRequest,
  RapidSupportRequest,
  SparePartsRequest,
  GeneralEnquiryRequest,
} from "./types";
import {
  validateTechnicalSupport,
  validateRapidSupport,
  validateSpareParts,
  validateGeneralEnquiry,
} from "./validation";
import { getDeliveryAdapter } from "./adapter";

export async function submitTechnicalSupportAction(
  data: TechnicalSupportRequest
): Promise<SubmissionResponse> {
  const errors = validateTechnicalSupport(data);
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please complete all required fields correctly.",
      formType: "technical_support",
      timestamp: new Date().toISOString(),
      status: "development_pending",
      isDelivered: false,
      errors,
    };
  }

  const adapter = getDeliveryAdapter();
  const delivery = await adapter.deliverTechnicalSupport(data);

  if (delivery.delivered) {
    return {
      success: true,
      message: "Technical request dispatched successfully to the engineering queue.",
      formType: "technical_support",
      timestamp: new Date().toISOString(),
      status: "delivered",
      isDelivered: true,
      deliveryReference: delivery.referenceId,
    };
  }

  // Handle unconfigured or development mode safely
  const isDev = process.env.NODE_ENV !== "production";
  return {
    success: isDev,
    message: isDev
      ? "Development mode: Technical request validated. Production backend integration pending client credentials."
      : "Electronic submission is temporarily unavailable pending backend delivery configuration. Please use direct contact channels.",
    formType: "technical_support",
    timestamp: new Date().toISOString(),
    status: isDev ? "development_pending" : "unconfigured",
    isDelivered: false,
    deliveryReference: delivery.referenceId,
  };
}

export async function submitRapidSupportAction(
  data: RapidSupportRequest
): Promise<SubmissionResponse> {
  const errors = validateRapidSupport(data);
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please complete the required information for priority dispatch.",
      formType: "rapid_support",
      timestamp: new Date().toISOString(),
      status: "development_pending",
      isDelivered: false,
      errors,
    };
  }

  const adapter = getDeliveryAdapter();
  const delivery = await adapter.deliverRapidSupport(data);

  if (delivery.delivered) {
    return {
      success: true,
      message: "Priority rapid support alert dispatched successfully.",
      formType: "rapid_support",
      timestamp: new Date().toISOString(),
      status: "delivered",
      isDelivered: true,
      deliveryReference: delivery.referenceId,
    };
  }

  const isDev = process.env.NODE_ENV !== "production";
  return {
    success: isDev,
    message: isDev
      ? "Development mode: Rapid support alert validated. Production backend integration pending client credentials."
      : "Electronic submission is temporarily unavailable pending backend delivery configuration. Please use direct contact channels.",
    formType: "rapid_support",
    timestamp: new Date().toISOString(),
    status: isDev ? "development_pending" : "unconfigured",
    isDelivered: false,
    deliveryReference: delivery.referenceId,
  };
}

export async function submitSparePartsAction(
  data: SparePartsRequest
): Promise<SubmissionResponse> {
  const errors = validateSpareParts(data);
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please complete all required requisition fields.",
      formType: "spare_parts",
      timestamp: new Date().toISOString(),
      status: "development_pending",
      isDelivered: false,
      errors,
    };
  }

  const adapter = getDeliveryAdapter();
  const delivery = await adapter.deliverSpareParts(data);

  if (delivery.delivered) {
    return {
      success: true,
      message: "Spare parts requisition dispatched successfully to procurement.",
      formType: "spare_parts",
      timestamp: new Date().toISOString(),
      status: "delivered",
      isDelivered: true,
      deliveryReference: delivery.referenceId,
    };
  }

  const isDev = process.env.NODE_ENV !== "production";
  return {
    success: isDev,
    message: isDev
      ? "Development mode: Spare parts requisition validated. Production backend integration pending client credentials."
      : "Electronic submission is temporarily unavailable pending backend delivery configuration. Please use direct contact channels.",
    formType: "spare_parts",
    timestamp: new Date().toISOString(),
    status: isDev ? "development_pending" : "unconfigured",
    isDelivered: false,
    deliveryReference: delivery.referenceId,
  };
}

export async function submitGeneralEnquiryAction(
  data: GeneralEnquiryRequest
): Promise<SubmissionResponse> {
  const errors = validateGeneralEnquiry(data);
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please complete all required fields.",
      formType: "general_enquiry",
      timestamp: new Date().toISOString(),
      status: "development_pending",
      isDelivered: false,
      errors,
    };
  }

  const adapter = getDeliveryAdapter();
  const delivery = await adapter.deliverGeneralEnquiry(data);

  if (delivery.delivered) {
    return {
      success: true,
      message: "Enquiry dispatched successfully.",
      formType: "general_enquiry",
      timestamp: new Date().toISOString(),
      status: "delivered",
      isDelivered: true,
      deliveryReference: delivery.referenceId,
    };
  }

  const isDev = process.env.NODE_ENV !== "production";
  return {
    success: isDev,
    message: isDev
      ? "Development mode: Message validated. Production backend integration pending client credentials."
      : "Electronic submission is temporarily unavailable pending backend delivery configuration. Please use direct contact channels.",
    formType: "general_enquiry",
    timestamp: new Date().toISOString(),
    status: isDev ? "development_pending" : "unconfigured",
    isDelivered: false,
    deliveryReference: delivery.referenceId,
  };
}
