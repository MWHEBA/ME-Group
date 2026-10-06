import type { ReactNode } from "react";
import styles from "./Text.module.css";

interface TextProps {
  size?: "sm" | "base" | "lg";
  muted?: boolean;
  children: ReactNode;
}

export function Text({ size = "base", muted, children }: TextProps) {
  const cls = [styles[size], muted && styles.muted].filter(Boolean).join(" ");
  return <p className={cls}>{children}</p>;
}
