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
}

export function FormSuccessState({
  formType,
  title,
  message,
  isDelivered = false,
  deliveryReference,
  onReset,
}: FormSuccessProps) {
  const isDev = process.env.NODE_ENV !== "production";

  const defaultTitle = isDelivered
    ? "REQUEST DISPATCHED"
    : isDev
    ? "DEVELOPMENT VALIDATION SUCCESS"
    : "SUBMISSION COMPILED";

  const defaultMessage = isDelivered
    ? "Your technical request has been transmitted successfully to the engineering queue."
    : isDev
    ? "Payload passed complete server validation. Production delivery adapter is awaiting live client credentials."
    : "Your request data has been validated and compiled.";

  return (
    <div className={styles.successBox} role="status">
      <div className={styles.headerRow}>
        <span className={styles.statusBadge}>
          {isDelivered
            ? `STATUS: DISPATCHED (${deliveryReference || "OK"})`
            : isDev
            ? "STATUS: DEV VALIDATED"
            : "STATUS: AWAITING BACKEND"}
        </span>
        <span className={styles.formTypeCode}>INTENT / {formType.toUpperCase()}</span>
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
          <div className={styles.noticeTag}>DEVELOPMENT INTEGRATION BOUNDARY</div>
          <p className={styles.noticeText}>
            Form validated against production schema. Configure <code>FORM_WEBHOOK_URL</code> or SMTP credentials in production to enable live dispatch.
          </p>
        </div>
      )}

      <div className={styles.actionRow}>
        {onReset && (
          <button type="button" onClick={onReset} className={styles.resetBtn}>
            SUBMIT ANOTHER REQUEST
          </button>
        )}
        <Link href="/" className={styles.homeLink}>
          RETURN TO HOMEPAGE →
        </Link>
      </div>
    </div>
  );
}

interface FormErrorProps {
  message: string;
}

export function FormErrorBanner({ message }: FormErrorProps) {
  return (
    <div className={styles.errorBanner} role="alert">
      <div className={styles.errorIcon} aria-hidden="true">
        !
      </div>
      <div className={styles.errorText}>
        <strong>SUBMISSION NOTICE:</strong> {message}
      </div>
    </div>
  );
}
