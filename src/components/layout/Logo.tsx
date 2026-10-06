import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

interface LogoProps {
  variant?: "white" | "horizontal" | "auto";
  scrolled?: boolean;
  isHomePage?: boolean;
}

/** Official ME Group logo with dynamic white (Homepage hero) / horizontal state. */
export function Logo({
  variant = "auto",
  scrolled = false,
  isHomePage = false,
}: LogoProps) {
  let src = "/brand/me-group-logo-horizontal.png";

  if (variant === "white") {
    src = "/brand/me-group-logo-white.png";
  } else if (variant === "horizontal") {
    src = "/brand/me-group-logo-horizontal.png";
  } else {
    // Auto mode: White logo ONLY on homepage when not scrolled; horizontal in all other pages & sticky
    src =
      isHomePage && !scrolled
        ? "/brand/me-group-logo-white.png"
        : "/brand/me-group-logo-horizontal.png";
  }

  return (
    <Link
      href="/"
      className={styles.link}
      aria-label="ME Group — Marine Engineering Group, home"
    >
      <Image
        src={src}
        alt="ME Group Marine Engineering Group"
        width={2550}
        height={863}
        priority
        className={styles.image}
      />
    </Link>
  );
}
