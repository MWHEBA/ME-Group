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
  const delivery = await adapter.deliverTechnicalSupport(data);

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

  // Handle unconfigured or development mode safely
  const isDev = process.env.NODE_ENV !== "production";
  return {
    success: isDev,
    message: isDev
      ? isAr
        ? "وضع التطوير: تم التحقق من صحة الطلب الفني بنجاح."
        : "Development mode: Technical request validated. Production backend integration pending client credentials."
      : isAr
        ? "الإرسال الإلكتروني قيد التهيئة حالياً. يرجى استخدام قنوات الاتصال المباشرة."
        : "Electronic submission is temporarily unavailable pending backend delivery configuration. Please use direct contact channels.",
    formType: "technical_support",
    timestamp: new Date().toISOString(),
    status: isDev ? "development_pending" : "unconfigured",
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
  const delivery = await adapter.deliverRapidSupport(data);

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

  const isDev = process.env.NODE_ENV !== "production";
  return {
    success: isDev,
    message: isDev
      ? isAr
        ? "وضع التطوير: تم التحقق من صحة بلاغ الدعم السريع."
        : "Development mode: Rapid support alert validated. Production backend integration pending client credentials."
      : isAr
        ? "الإرسال الإلكتروني قيد التهيئة حالياً. يرجى الاتصال هاتفياً للحالات الحرجة."
        : "Electronic submission is temporarily unavailable pending backend delivery configuration. Please use direct contact channels.",
    formType: "rapid_support",
    timestamp: new Date().toISOString(),
    status: isDev ? "development_pending" : "unconfigured",
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
  const delivery = await adapter.deliverSpareParts(data);

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

  const isDev = process.env.NODE_ENV !== "production";
  return {
    success: isDev,
    message: isDev
      ? isAr
        ? "وضع التطوير: تم التحقق من صحة طلب قطع الغيار."
        : "Development mode: Spare parts requisition validated. Production backend integration pending client credentials."
      : isAr
        ? "الإرسال الإلكتروني قيد التهيئة حالياً. يرجى استخدام قنوات الاتصال المباشرة."
        : "Electronic submission is temporarily unavailable pending backend delivery configuration. Please use direct contact channels.",
    formType: "spare_parts",
    timestamp: new Date().toISOString(),
    status: isDev ? "development_pending" : "unconfigured",
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
  const delivery = await adapter.deliverGeneralEnquiry(data);

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

  const isDev = process.env.NODE_ENV !== "production";
  return {
    success: isDev,
    message: isDev
      ? isAr
        ? "وضع التطوير: تم التحقق من صحة الرسالة بنجاح."
        : "Development mode: Message validated. Production backend integration pending client credentials."
      : isAr
        ? "الإرسال الإلكتروني قيد التهيئة حالياً. يرجى استخدام قنوات الاتصال المباشرة."
        : "Electronic submission is temporarily unavailable pending backend delivery configuration. Please use direct contact channels.",
    formType: "general_enquiry",
    timestamp: new Date().toISOString(),
    status: isDev ? "development_pending" : "unconfigured",
    isDelivered: false,
    deliveryReference: delivery.referenceId,
  };
}
