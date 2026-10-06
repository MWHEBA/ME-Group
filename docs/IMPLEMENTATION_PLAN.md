# IMPLEMENTATION PLAN — ME Group

Status: **Revision 2 — documentation approved in principle with revisions applied. Awaiting approval before Phase 1.**

Guiding principle: no architecture for architecture's sake. Safeguards are welcome only where they materially improve the website.

## Application architecture
- Next.js (current stable, App Router) + TypeScript strict. Greenfield in repo root (workspace is empty, nothing to preserve except logos → moved to `public/brand/` on Phase 1; originals kept until trimmed SVG exists).
- Server Components by default; client components only for: mobile nav, mega menu, problem selector interactions, forms, process-timeline observer.
- Styling: **vanilla CSS** with tokens + CSS Modules per component (no Tailwind — project rule and brief). `src/styles/tokens.css`, `base.css`, `utilities.css` (few).
- Fonts: `next/font/google` (Barlow Condensed, Barlow, IBM Plex Mono) loaded in a single module so the typography hypothesis can be swapped in one place until frozen in Phase 2.
- Forms: Server Actions + Zod (Phase 4); progressive enhancement (works without JS).
- Content: typed TS modules + MDX for articles.
- i18n readiness: logical CSS properties (`margin-inline`, `padding-inline`, `inset-inline`), `dir`/`lang` on `<html>`, route group `[locale]` introduced only when Arabic is approved (D-05).
- Hosting-agnostic; `output` default; images via `next/image` (AVIF/WebP).

```
src/
  app/                (routes, layout, metadata, sitemap.ts, robots.ts, manifest)
  components/{primitives,layout,blocks,forms}/
  content/            (see CONTENT_MODEL)
  lib/                (seo, leads, analytics, validation, config)
  styles/             (tokens.css, base.css)
public/{brand,images,fonts?}
docs/
```

## Dependencies
**Recommended (Phase 1, lean):** `next`, `react`, `react-dom`, `typescript`, `eslint` + `eslint-config-next` (includes jsx-a11y rules), `prettier`. `zod` is added in Phase 4 together with the forms, not earlier.
**Later:** `@next/mdx` (Phase 6, articles), `@playwright/test` + `@axe-core/playwright` (Phase 7), `sharp` (usually bundled).
**Conditionally later:** a map lib (MapLibre GL) only when coverage is confirmed; `nodemailer`/provider SDK only when email channel chosen.
**Explicitly avoided:** Tailwind, UI kits (MUI/Chakra/shadcn-styled look), Framer Motion/GSAP (until a proven need — CSS + IO suffice), Lottie, three.js, jQuery, Swiper/carousel libs, react-hook-form (native + Server Actions suffice), icon packs (custom minimal SVG set), lodash, moment, CMS (deferred).

## Phases
| Phase | Scope | Depends on | Exit criteria |
|---|---|---|---|
| 0 — Documentation | Project memory docs | — | Approved |
| 1 — Foundation (lean) | Next.js + TS scaffold; design tokens; typography loading (hypothesis); responsive grid/container primitives; app shell (header, footer, mobile support bar); navigation (desktop + mobile, mega panel skeleton); brand assets moved to `public/brand/` unmodified; basic content architecture (typed modules with `status`, nav/services/company, `MediaSlot` type incl. `provenance`); accessibility foundation (landmarks, skip link, focus styles, reduced-motion base, semantic headings); basic metadata/robots/sitemap | Approval | Builds clean; shell responsive at 4 tiers; keyboard-navigable; no custom lint rules, no internal tooling, no speculative abstractions |
| 2 — Visual Lab / Design System | Real `/lab` route (dev, noindex, not in production/sitemap), see DESIGN_SYSTEM §14: typography specimen next to real logo; palette/surfaces; CTA hierarchy; navigation behavior; technical labels/numbering; photography treatments on dev media slots; logo-frame-inspired masks; schematic language; motion experiments (line drawing, controlled reveal, technical scan, image mask transition); ≥ 2 hero concepts. Full homepage NOT built. | 1 | Visual language judged distinctive; **typography frozen after visual approval**; chosen hero direction; motion vocabulary approved |
| 3 — Homepage | Homepage assembled from approved Lab language; confirmed sections only, gated sections behind flags; CTAs link to contact routes (forms can be simple stubs/pages) | 2 | Homepage validated visually/UX-wise and within performance budget **before** forms infrastructure investment |
| 4 — Conversion System / Forms | Four intent forms, `zod`, Server Actions, `LeadSink` abstraction, uploads UI (storage disabled until infra decided), validation, a11y tests | 3 | Keyboard/screen-reader tested; no integration hardcoded |
| 5 — Services & Capabilities | Service, equipment, capability pages from content model (All 7 services + /capabilities + /services index + Phase 4 form routing) | 3 (4 for form links) | Complete (Clean routes, 0 errors, rich verified architecture) |
| 6 — Company / Projects / Insights | Company overview, About, Approach, Quality & Safety implemented; Projects, Case Studies, Insights, and Trust Signals models built and strictly feature-gated | client data | Complete (Truthful corporate layer, strict feature gating, 0 errors) |
| 7 — Motion, Responsive, Accessibility & Performance Polish | Site-wide refinement, content-integrity audit, CSS duplication reduction, form UX polish, branded 404, WCAG 2.2 AA compliance | 3–6 | Complete (0 errors, strict typing, clean build, 0 unconfirmed claims) |
| 8 — Production Integration & Launch Readiness | Factual truth gate, centralized company config, delivery adapter boundary, server validation, upload security, typed env, zero-PII analytics, SEO/JSON-LD, security headers, launch checklist, deployment guide | client decisions | Complete (Code Ready / Launch Blocked by Client Configuration) |

## Performance budget (proposal)
Initial JS ≤ ~100 KB gz on home; hero media ≤ 200 KB poster/AVIF; no autoplay video in v1; fonts ≤ 3 families, subsetted; below-fold lazy; motion via compositor-only properties.

## Risks
1. **No real photography/projects** → site could feel hollow; mitigate with schematic illustration system and honest placeholders; request shoot.
2. **Hidden sections reduce initial "proof"**; risk of trust gap until facts supplied.
3. **Red mismatch** between brief and logo file.
4. **Logo PNG only**, padded, non-transparent → vector needed for masks/motion.
5. **Upload/storage and spam** need infra decisions; security review (file validation, malware scanning).
6. **SEO claims** (Egypt/Alexandria) vs. unconfirmed coverage → wording risk.
7. **Cinematic ambition vs. performance** → effects validated in the Visual Lab and measured in Phase 7; compositor-only animation (D-07).
8. **Arabic**: Barlow lacks Arabic glyphs; font pairing must be finalised without changing the Latin fonts.
9. Contact channels (phone/WhatsApp) absent → core "reach engineers in seconds" goal depends on them.
10. **Temporary media mistaken for real work** → `development-media` provenance, visible dev marker, production build guard (D-18).
11. **Typography unproven next to logo** → specimen gate in Phase 2 before freeze (D-15).

## Missing client information
Contact phone/WhatsApp/email/address · 24/7 channel and who answers · years in operation · projects, vessel types served, real case studies + photos/permission · ports/coverage · certifications/class/ISO · OEM relationships · clients/logos/permission · team size & roles (if to be shown) · workshop/facilities · confirmation or denial of each unconfirmed service · legal entity name, privacy/terms text · vector logo + brand guide (exact red) · domain/hosting · CRM/email/WhatsApp provider · analytics choice · Arabic timeline · photography.
