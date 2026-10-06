import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { features } from "@/content/site";
import { CASE_STUDIES, projectFilters } from "@/content/projects";
import { Container } from "@/components/primitives/Container";

export const metadata: Metadata = {
  title: "Case Studies & Marine Projects | ME Group",
  description:
    "Verified marine engineering case studies and technical interventions by ME Group across propulsion, power generation, and automation.",
};

export default function ProjectsPage() {
  // Strict feature gate: If projects flag is false or dataset is empty, return 404
  if (!features.projects || CASE_STUDIES.length === 0) {
    notFound();
  }

  return (
    <main style={{ padding: "var(--section-y) 0", backgroundColor: "var(--bg-page)" }}>
      <Container>
        <div style={{ marginBottom: "var(--space-8)" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              fontWeight: 700,
              color: "var(--accent-action)",
              letterSpacing: "var(--tracking-label)",
            }}
          >
            VERIFIED CASE STUDIES
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-4xl)",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--text-primary)",
              marginTop: "var(--space-2)",
            }}
          >
            PROJECTS &amp; INTERVENTIONS
          </h1>
        </div>

        {/* Filter bar */}
        <div
          style={{
            display: "flex",
            gap: "var(--space-2)",
            flexWrap: "wrap",
            marginBottom: "var(--space-6)",
          }}
        >
          {projectFilters.map((f) => (
            <span
              key={f.id}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                padding: "var(--space-2) var(--space-4)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-1)",
                backgroundColor: "var(--bg-alt)",
                color: "var(--text-primary)",
              }}
            >
              {f.label}
            </span>
          ))}
        </div>

        {/* Verified Case Studies List */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-6)" }}>
          {CASE_STUDIES.map((cs) => (
            <article
              key={cs.slug}
              style={{
                backgroundColor: "var(--bg-alt)",
                border: "1px solid var(--border)",
                padding: "var(--space-6)",
                borderRadius: "var(--radius-1)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xl)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {cs.title}
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}>
                {cs.problem}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
