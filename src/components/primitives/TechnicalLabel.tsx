import type { ReactNode } from "react";
import styles from "./TechnicalLabel.module.css";

/** Mono label for indices, status and engineering markers. */
export function TechnicalLabel({ children }: { children: ReactNode }) {
  return <span className={styles.label}>{children}</span>;
}
