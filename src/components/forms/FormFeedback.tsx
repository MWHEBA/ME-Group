import React from "react";
import Link from "next/link";
import { FormType } from "@/lib/forms/types";
import styles from "./FormFeedback.module.css";

interface FormSuccessProps {
  formType: FormType;
  title?: string;
  message?: string;
  isDelivered?: boolean;
  deliveryReference?: string;
  onReset?: () => void;
  locale?: "en" | "ar";
}

export function FormSuccessState({
  formType,
  title,
  message,
  isDelivered = false,
  deliveryReference,
  onReset,
  locale = "en",
}: FormSuccessProps) {
  const isAr = locale === "ar";
  const isDev = process.env.NODE_ENV !== "production";

  const defaultTitle = isAr
    ? isDelivered
      ? "تم إرسال الطلب بنجاح"
      : "تم استلام الطلب وتأكيده"
    : isDelivered
    ? "REQUEST DISPATCHED"
    : isDev
    ? "DEVELOPMENT VALIDATION SUCCESS"
    : "SUBMISSION COMPILED";

  const defaultMessage = isAr
    ? isDelivered
      ? "تم تحويل طلبكم الفني مباشرة إلى الفريق الهندسي المختص للفرز والمتابعة."
      : "تم استلام بيانات طلبكم بنجاح وجارٍ مراجعتها من قبل كبار المهندسين."
    : isDelivered
    ? "Your technical request has been transmitted successfully to the engineering queue."
    : isDev
    ? "Payload passed complete server validation. Production delivery adapter is awaiting live client credentials."
    : "Your request data has been validated and compiled.";

  return (
    <div className={styles.successBox} role="status">
      <div className={styles.headerRow}>
        <span className={styles.statusBadge}>
          {isAr
            ? isDelivered
              ? `الحالة: تم الإرسال (${deliveryReference || "مؤكد"})`
              : "الحالة: تم الاستلام بنجاح"
            : isDelivered
            ? `STATUS: DISPATCHED (${deliveryReference || "OK"})`
            : isDev
            ? "STATUS: DEV VALIDATED"
            : "STATUS: AWAITING BACKEND"}
        </span>
        <span className={styles.formTypeCode}>
          {isAr ? `الطلب / ${formType}` : `INTENT / ${formType.toUpperCase()}`}
        </span>
      </div>

      <div className={styles.successBody}>
        <div className={styles.checkIcon} aria-hidden="true">
          ✓
        </div>
        <div className={styles.textWrap}>
          <h3 className={styles.successTitle}>{title || defaultTitle}</h3>
          <p className={styles.successMessage}>{message || defaultMessage}</p>
        </div>
      </div>

      {isDev && !isDelivered && (
        <div className={styles.integrationNotice}>
          <div className={styles.noticeTag}>
            {isAr ? "بيئة التطوير والاختبار" : "DEVELOPMENT INTEGRATION BOUNDARY"}
          </div>
          <p className={styles.noticeText}>
            {isAr
              ? "تم فحص النموذج ومطابقته مع المخطط الهندسي. يتم تفعيل الإرسال الحي عبر البريد أو الـ Webhook في بيئة الإنتاج."
              : "Form validated against production schema. Configure FORM_WEBHOOK_URL or SMTP credentials in production to enable live dispatch."}
          </p>
        </div>
      )}

      <div className={styles.actionRow}>
        {onReset && (
          <button type="button" onClick={onReset} className={styles.resetBtn}>
            {isAr ? "إرسال طلب آخر" : "SUBMIT ANOTHER REQUEST"}
          </button>
        )}
        <Link href={isAr ? "/ar" : "/"} className={styles.homeLink}>
          {isAr ? "العودة إلى الصفحة الرئيسية ←" : "RETURN TO HOMEPAGE →"}
        </Link>
      </div>
    </div>
  );
}

interface FormErrorProps {
  message: string;
  locale?: "en" | "ar";
}

export function FormErrorBanner({ message, locale = "en" }: FormErrorProps) {
  const isAr = locale === "ar";
  return (
    <div className={styles.errorBanner} role="alert">
      <div className={styles.errorIcon} aria-hidden="true">
        !
      </div>
      <div className={styles.errorText}>
        <strong>{isAr ? "تنبيه الإرسال:" : "SUBMISSION NOTICE:"}</strong> {message}
      </div>
    </div>
  );
}
