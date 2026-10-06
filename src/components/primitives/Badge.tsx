import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Badge.module.css";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "default" | "subtle" | "inverse" | "accent" | "outline";
  size?: "sm" | "md";
  dot?: boolean | "ok";
  className?: string;
}

/** Unified capsule badge component matching ME Group corporate visual system. */
export function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
  ...props
}: BadgeProps) {
  const rootClass = [
    styles.badge,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={rootClass} {...props}>
      {dot && (
        <span
          className={`${styles.dot} ${dot === "ok" ? styles.dotOk : ""}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
