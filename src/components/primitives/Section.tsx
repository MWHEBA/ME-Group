import type { ReactNode } from "react";
import styles from "./Section.module.css";

interface SectionProps {
  tone?: "default" | "alt" | "inverse";
  /** id of the heading that labels this section. */
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

export function Section({
  tone = "default",
  labelledBy,
  className,
  children,
}: SectionProps) {
  const cls = [styles.section, styles[tone], className]
    .filter(Boolean)
    .join(" ");
  return (
    <section className={cls} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
