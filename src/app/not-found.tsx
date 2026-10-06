import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { ctas } from "@/content/site";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <Section tone="inverse" className={styles.section}>
      <Container width="narrow">
        <div className={styles.wrapper}>
          <span className={styles.code}>ERROR 404 / ROUTE NOT LOCATED</span>
          <h1 className={styles.heading}>SYSTEM NOT FOUND</h1>
          <p className={styles.lead}>
            The requested technical specification, service route, or document is not available at this coordinate.
          </p>
          <div className={styles.actions}>
            <Button href="/" variant="primary">
              Return to Homepage
            </Button>
            <Button href="/services" variant="secondary">
              Browse Services
            </Button>
            <Button href="/contact/technical-support" variant="secondary">
              Technical Support
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
