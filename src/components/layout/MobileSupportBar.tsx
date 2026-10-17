import Link from "next/link";
import { ctas, support } from "@/content/site";
import styles from "./MobileSupportBar.module.css";

/**
 * Sticky support entry for mobile/tablet with confirmed WhatsApp quick dispatch
 * and technical support request link.
 */
export function MobileSupportBar() {
  return (
    <nav className={styles.bar} aria-label="Support">
      {support.whatsapp && (
        <a
          href={support.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.rapid}
          aria-label="Direct WhatsApp Dispatch"
        >
          <span>WhatsApp ↗</span>
        </a>
      )}
      <Link href={ctas.technicalSupport.href} className={styles.request}>
        <span>{ctas.technicalSupport.label}</span>
      </Link>
    </nav>
  );
}
