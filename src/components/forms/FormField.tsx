import React from "react";
import styles from "./FormField.module.css";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  id,
  label,
  error,
  required,
  hint,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={`${styles.fieldWrapper} ${error ? styles.hasError : ""} ${className || ""}`}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.label}>
          {label}
          {required ? (
            <span className={styles.requiredMarker} aria-hidden="true">*</span>
          ) : (
            <span className={styles.optionalBadge}>OPTIONAL</span>
          )}
        </label>
        {hint && <span className={styles.hintText}>{hint}</span>}
      </div>

      <div className={styles.controlWrapper}>{children}</div>

      {error && (
        <div className={styles.errorRow} id={`${id}-error`} role="alert">
          <span className={styles.errorIcon} aria-hidden="true">!</span>
          <span className={styles.errorMessage}>{error}</span>
        </div>
      )}
    </div>
  );
}
