import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  href: string;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  className?: string;
  children: ReactNode;
}

/** Navigation action (link). Real <button> elements are added with forms (Phase 4). */
export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonProps) {
  const cls = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
