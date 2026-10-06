import type { ReactNode } from "react";
import styles from "./Heading.module.css";

interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "md" | "lg" | "xl" | "display";
  id?: string;
  children: ReactNode;
}

/** `as` sets the semantic level; `size` sets the visual size independently. */
export function Heading({
  as: Tag = "h2",
  size = "lg",
  id,
  children,
}: HeadingProps) {
  return (
    <Tag id={id} className={styles[size]}>
      {children}
    </Tag>
  );
}
