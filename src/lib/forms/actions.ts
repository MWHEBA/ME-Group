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
  data: TechnicalSupportRequest,
  locale: "en" | "ar" = "en"
): Promise<SubmissionResponse> {
  const isAr = locale === "ar";
  const errors = validateTechnicalSupport(data, locale);
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: isAr
        ? "يرجى استكمال جميع الحقول المطلوبة بشكل صحيح."
        : "Please complete all required fields correctly.",
      formType: "technical_support",
      timestamp: new Date().toISOString(),
      status: "development_pending",
      isDelivered: false,
      errors,
    };
  }

  const adapter = getDeliveryAdapter();
  const delivery = await adapter.deliverTechnicalSupport(data, locale);

  if (delivery.delivered) {
    return {
      success: true,
      message: isAr
        ? "تم إرسال طلب الدعم الفني بنجاح إلى الفريق الهندسي."
        : "Technical request dispatched successfully to the engineering queue.",
      formType: "technical_support",
      timestamp: new Date().toISOString(),
      status: "delivered",
      isDelivered: true,
      deliveryReference: delivery.referenceId,
    };
  }

  return {
    success: false,
    message:
      delivery.error ||
      (isAr
        ? "تعذر إرسال الطلب في الوقت الحالي. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة."
        : "Submission could not be completed. Please try again or contact us directly."),
    formType: "technical_support",
    timestamp: new Date().toISOString(),
    status: "unconfigured",
    isDelivered: false,
    deliveryReference: delivery.referenceId,
  };
}

export async function submitRapidSupportAction(
  data: RapidSupportRequest,
  locale: "en" | "ar" = "en"
): Promise<SubmissionResponse> {
  const isAr = locale === "ar";
  const errors = validateRapidSupport(data, locale);
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: isAr
        ? "يرجى استكمال البيانات المطلوبة للفرز الفني العاجل."
        : "Please complete the required information for priority dispatch.",
      formType: "rapid_support",
      timestamp: new Date().toISOString(),
      status: "development_pending",
      isDelivered: false,
      errors,
    };
  }

  const adapter = getDeliveryAdapter();
  const delivery = await adapter.deliverRapidSupport(data, locale);

  if (delivery.delivered) {
    return {
      success: true,
      message: isAr
        ? "تم إرسال بلاغ الدعم السريع بنجاح إلى فريق الاستجابة الفورية."
        : "Priority rapid support alert dispatched successfully.",
      formType: "rapid_support",
      timestamp: new Date().toISOString(),
      status: "delivered",
      isDelivered: true,
      deliveryReference: delivery.referenceId,
    };
  }

  return {
    success: false,
    message:
      delivery.error ||
      (isAr
        ? "تعذر إرسال البلاغ في الوقت الحالي. يرجى الاتصال هاتفياً للحالات الحرجة."
        : "Rapid support dispatch could not be completed. Please call our direct line."),
    formType: "rapid_support",
    timestamp: new Date().toISOString(),
    status: "unconfigured",
    isDelivered: false,
    deliveryReference: delivery.referenceId,
  };
}

export async function submitSparePartsAction(
  data: SparePartsRequest,
  locale: "en" | "ar" = "en"
): Promise<SubmissionResponse> {
  const isAr = locale === "ar";
  const errors = validateSpareParts(data, locale);
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: isAr
        ? "يرجى استكمال جميع حقول طلب التوريد المطلوبة."
        : "Please complete all required requisition fields.",
      formType: "spare_parts",
      timestamp: new Date().toISOString(),
      status: "development_pending",
      isDelivered: false,
      errors,
    };
  }

  const adapter = getDeliveryAdapter();
  const delivery = await adapter.deliverSpareParts(data, locale);

  if (delivery.delivered) {
    return {
      success: true,
      message: isAr
        ? "تم إرسال طلب قطع الغيار بنجاح إلى قسم المشتريات والتوريد."
        : "Spare parts requisition dispatched successfully to procurement.",
      formType: "spare_parts",
      timestamp: new Date().toISOString(),
      status: "delivered",
      isDelivered: true,
      deliveryReference: delivery.referenceId,
    };
  }

  return {
    success: false,
    message:
      delivery.error ||
      (isAr
        ? "تعذر إرسال طلب قطع الغيار في الوقت الحالي. يرجى المحاولة لاحقاً أو مراسلتنا مباشرة."
        : "Spare parts requisition could not be completed. Please contact us directly."),
    formType: "spare_parts",
    timestamp: new Date().toISOString(),
    status: "unconfigured",
    isDelivered: false,
    deliveryReference: delivery.referenceId,
  };
}

export async function submitGeneralEnquiryAction(
  data: GeneralEnquiryRequest,
  locale: "en" | "ar" = "en"
): Promise<SubmissionResponse> {
  const isAr = locale === "ar";
  const errors = validateGeneralEnquiry(data, locale);
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: isAr
        ? "يرجى استكمال جميع الحقول المطلوبة."
        : "Please complete all required fields.",
      formType: "general_enquiry",
      timestamp: new Date().toISOString(),
      status: "development_pending",
      isDelivered: false,
      errors,
    };
  }

  const adapter = getDeliveryAdapter();
  const delivery = await adapter.deliverGeneralEnquiry(data, locale);

  if (delivery.delivered) {
    return {
      success: true,
      message: isAr
        ? "تم إرسال استفساركم بنجاح."
        : "Enquiry dispatched successfully.",
      formType: "general_enquiry",
      timestamp: new Date().toISOString(),
      status: "delivered",
      isDelivered: true,
      deliveryReference: delivery.referenceId,
    };
  }

  return {
    success: false,
    message:
      delivery.error ||
      (isAr
        ? "تعذر إرسال الاستفسار في الوقت الحالي. يرجى استخدام قنوات الاتصال المباشرة."
        : "Enquiry could not be sent. Please use our direct contact channels."),
    formType: "general_enquiry",
    timestamp: new Date().toISOString(),
    status: "unconfigured",
    isDelivered: false,
    deliveryReference: delivery.referenceId,
  };
}
