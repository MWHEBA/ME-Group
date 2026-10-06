import type { ElementType, ReactNode } from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  as?: ElementType;
  width?: "default" | "narrow" | "wide";
  className?: string;
  children: ReactNode;
}

export function Container({
  as: Tag = "div",
  width = "default",
  className,
  children,
}: ContainerProps) {
  const cls = [styles.container, styles[width], className]
    .filter(Boolean)
    .join(" ");
  return <Tag className={cls}>{children}</Tag>;
}
