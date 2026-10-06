import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { features } from "@/content/site";
import { ARTICLES } from "@/content/insights";
import { Container } from "@/components/primitives/Container";

export const metadata: Metadata = {
  title: "Marine Engineering Insights & Technical Articles | ME Group",
  description:
    "Technical guides, maintenance insights, and engineering articles for marine machinery and power systems.",
};

export default function InsightsPage() {
  // Strict feature gate: If insights flag is false or dataset is empty, return 404
  if (!features.insights || ARTICLES.length === 0) {
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
            TECHNICAL PUBLICATIONS
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
            INSIGHTS &amp; ENGINEERING GUIDES
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-6)" }}>
          {ARTICLES.map((art) => (
            <article
              key={art.slug}
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
                {art.title}
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}>
                {art.excerpt}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
