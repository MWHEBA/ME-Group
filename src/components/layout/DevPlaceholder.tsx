import type { ReactNode } from "react";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import { TechnicalLabel } from "@/components/primitives/TechnicalLabel";
import { Text } from "@/components/primitives/Text";

interface DevPlaceholderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

/** Phase 1 route stand-in so navigation never 404s. Not a designed page. */
export function DevPlaceholder({
  title,
  description,
  children,
}: DevPlaceholderProps) {
  return (
    <Section labelledBy="page-title">
      <Container>
        <TechnicalLabel>Development placeholder</TechnicalLabel>
        <Heading as="h1" size="xl" id="page-title">
          {title}
        </Heading>
        {description && <Text muted>{description}</Text>}
        {children}
      </Container>
    </Section>
  );
}
