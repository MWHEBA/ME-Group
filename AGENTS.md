<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Rules for ME Group Website

## 1. Safety & Deployment Policy
- **NO Automatic Deployment:** Never run deployment scripts (such as `deploy.py`, SFTP/SSH upload commands, or production deployment workflows) automatically without explicit, prior confirmation and approval from the user.
- **No Unrequested Browser Runs:** Never open, launch, or control the browser automatically unless specifically requested by the user.

## 2. Design & Styling System (Strict UI Rules)
- **CSS Variables Only:** Use ONLY CSS variables declared in `:root` for all colors. NEVER hardcode hex (`#fff`), `rgb()`, or `hsl()` directly in CSS/HTML/React components.
- **Flat Colors Only (No Gradients):** Gradients are strictly prohibited. Maintain a clean, calm, elegant, and corporate look with flat colors.
- **Typography & Fonts:** NEVER change fonts or load external/unapproved font families. Preserve existing typography and hierarchy.
- **Subtle & Minimal Animations:** Avoid excessive or flashy animations. Keep transitions subtle, semantic, minimal, and professional.
- **Balanced Layouts:** Prioritize readability with balanced whitespace, consistent container padding, and clean alignments.

## 3. Component Architecture & Cross-Page Consistency
- **Cross-Component Consistency Directive:** Any styling, layout, header, footer, card, button, modal, or form modification discussed or requested MUST automatically be audited and consistently propagated across all similar pages and components.
- **Component-Based DRY Architecture:** Maintain modular React components under `src/components/` to prevent code duplication and ensure design updates cascade cleanly.

## 4. Coding & Language Standards
- **Language Policy:** Use Egyptian Arabic in chat and comments. Use English in code (variables, functions, types, components) and documentation.
- **Clean Semantic Code:** Maintain clean HTML5 semantics, accessible elements, and well-structured TypeScript/React code.
- **Preserve Documentation Integrity:** Keep existing comments and docstrings intact unless explicitly instructed to modify them.
