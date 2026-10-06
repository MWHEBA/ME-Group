import Link from "next/link";
import { ctas } from "@/content/site";
import styles from "./MobileSupportBar.module.css";

/**
 * Sticky support entry for mobile/tablet. Internal routes only — phone,
 * WhatsApp and email are not rendered until confirmed by the client.
 */
export function MobileSupportBar() {
  return (
    <nav className={styles.bar} aria-label="Support">
      <Link href={ctas.technicalSupport.href} className={styles.request}>
        {ctas.technicalSupport.label}
      </Link>
    </nav>
  );
}
