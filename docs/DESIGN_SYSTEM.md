# DESIGN SYSTEM — ME Group

> Revision 2 — creative rules relaxed (gradients/red), typography unfrozen, visual lab added, photography and logo rules added. See DECISIONS D-14 → D-19.

## 0. Rules
**Hard rules**
- Colors are consumed through CSS variables declared in `:root`. Hex/rgb values live only in the token file (including any gradient/overlay stops).
- Official ME logo assets are used as supplied. **Never redraw, recolor or reinterpret the logo.** CSS/SVG geometry *inspired by* the outer ME frame may be used for masks, frames and motion, but must never replace or modify the logo (see §13).
- Typography is a hypothesis until the Phase 2 specimen is approved (see §3).

**Strong defaults (preferences, not prohibitions)**
- Avoid decorative gradients, glow effects, glassmorphism and trendy effects by default.
- A carefully justified gradient, overlay or brand treatment is allowed when it materially improves a specific composition. Justification is recorded next to the usage (comment or DECISIONS entry) and the treatment is defined as a named token (e.g. `--overlay-media`), not ad hoc.
- ME Red stays controlled and intentional: CTAs, interaction states, technical indicators, important brand moments. Large red surfaces are allowed exceptionally for deliberate high-impact brand moments.
- Transitions purposeful; CSS clean, semantic and reusable.

## 1. Direction
The goal is **PREMIUM · INDUSTRIAL · TECHNICAL · CINEMATIC · PRECISE · CONFIDENT**. Minimalism is a tool, not the identity.

"An engineering system, not a brochure." Reference language: technical drawings, schematics, equipment labels, diagnostic interfaces, engine-room photography. Expressed through asymmetry, scale, editorial composition, engineering graphics (rules, mono labels, index numbers like `01 / 06`, crosshair/corner marks), photography and controlled motion — not ocean imagery.

Must not drift into: SaaS dashboard design, generic corporate minimalism, repetitive card grids, excessive boxed sections, generic marine-blue aesthetics, template-looking layouts.

## 2. Color tokens (`src/styles/tokens.css`)
```css
:root {
  /* brand */
  --color-brand-red: #ED1C24;      /* sampled from logo; brief says ~#F51B23 — see D-03 */
  --color-brand-red-strong: #C4141B; /* hover/pressed */
  --color-charcoal: #1E1E1E;
  --color-white: #FFFFFF;

  /* neutrals */
  --color-ink-900: #121212;        /* deepest dark section */
  --color-ink-800: #1E1E1E;
  --color-ink-700: #2A2A2A;
  --color-ink-500: #5C5C5C;        /* secondary text on light (AA on white) */
  --color-ink-300: #A8A8A8;        /* secondary text on dark */
  --color-line-light: #DADADA;
  --color-line-dark: #3A3A3A;
  --color-surface-0: #FFFFFF;
  --color-surface-1: #F5F5F3;      /* off-white industrial */
  --color-surface-2: #ECECE9;

  /* semantic (aliases — components use only these) */
  --bg-page: var(--color-surface-0);
  --bg-alt: var(--color-surface-1);
  --bg-inverse: var(--color-ink-900);
  --text-primary: var(--color-charcoal);
  --text-secondary: var(--color-ink-500);
  --text-inverse: var(--color-white);
  --text-inverse-muted: var(--color-ink-300);
  --accent: var(--color-brand-red);
  --accent-hover: var(--color-brand-red-strong);
  --border: var(--color-line-light);
  --border-inverse: var(--color-line-dark);
  --focus-ring: var(--color-brand-red);
  --overlay-media: rgb(18 18 18 / 0.55); /* default flat scrim; justified gradient/overlay variants are added as named tokens, see §0 */
  --status-error: var(--color-brand-red-strong);
  --status-ok: #2F7D4F;
}
```
Contrast: red on white ≈ 4.5:1 — use for ≥18px text, icons, borders; body text always charcoal. White on red buttons passes for large/bold labels only; verify per build.
Red usage: ME Red remains controlled and intentional — primarily CTAs, interaction states, technical indicators and important brand moments. Large red surfaces may be used exceptionally for deliberate high-impact brand moments when the composition benefits. No numeric viewport budget; each large-red use is reviewed in the Visual Lab.

## 3. Typography
**Status: initial hypothesis — approved to start, NOT frozen.** Frozen only after visual approval of the Phase 2 typography specimen, evaluated next to the real ME Group logo (see §14-A). Until then, fonts are loaded centrally in one place so a swap is a one-file change; after freeze, no changes without explicit approval.

Chosen for fit with the logo (heavy italic extended display + condensed bold tagline). Loaded via `next/font/google`, self-hosted, `display: swap`, subsetted.

| Role | Family | Weights | Use |
|---|---|---|---|
| Display | **Barlow Condensed** | 600, 700 (+italic 700 for hero accent) | H1/H2, uppercase, tight leading |
| Text / UI | **Barlow** | 400, 500, 600 | body, nav, forms, buttons |
| Technical | **IBM Plex Mono** | 400, 500 | labels, indices, data, nameplate fields |

Cyrillic/Arabic note: Barlow has no Arabic. Future Arabic uses **IBM Plex Sans Arabic** (same Plex family as mono) for body and display; defined in D-05.

Scale (fluid `clamp`, tokens `--text-*`): `xs 12 / sm 14 / base 16–17 / lg 20 / xl 24 / 2xl 32 / 3xl 44 / 4xl 64 / 5xl 96 (hero only)`. Display line-height 0.95–1.05; body 1.55–1.65; measure ≤ 68ch. Do not use giant type except hero.

## 4. Spacing, layout, containers
- 4px base: `--space-1..12` = 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- Grid: 12 columns desktop, 8 tablet, 4 mobile; gutter 24/20/16.
- Containers: `--container-sm 720`, `--container-md 960`, `--container-lg 1200`, `--container-xl 1440`, page padding `clamp(16px, 4vw, 64px)`.
- Section rhythm: `--section-y: clamp(64px, 10vw, 144px)`. Vary section structure; no repeating card-grid template.

## 5. Breakpoints
`--bp-sm 480` · `--bp-md 768` · `--bp-lg 1024` · `--bp-xl 1280` · `--bp-2xl 1680` (large desktop). Container queries preferred for components.

## 6. Radii, borders, shadows, z-index
- Radii: `--radius-0: 0`, `--radius-1: 2px`, `--radius-2: 4px`. **Default is square/near-square** (engineering feel). Logo-frame-inspired geometry (§13) is used for media masks and frames.
- Borders: `--border-hair: 1px solid var(--border)`; technical rules are 1px.
- Shadows: `--shadow-1` (low, for floating menu/sticky CTA). Glow and glassmorphism are off by default (§0); any exception needs a named token and justification.
- z-index: `base 0 · raised 10 · sticky 100 · menu 200 · overlay 300 · modal 400 · toast 500`.

## 7. Motion tokens
`--dur-fast 120ms · --dur-base 220ms · --dur-slow 480ms · --dur-draw 900ms`
`--ease-standard cubic-bezier(.2,0,0,1) · --ease-exit cubic-bezier(.4,0,1,1)`.
See Motion principles below.

## 8. Motion principles
1. Motion explains structure (line draws, step reveals, mask wipes), never decorates.
2. Max one signature motion per section.
3. Use CSS transitions, `clip-path`, SVG `stroke-dashoffset`, and IntersectionObserver first; no animation library until proven necessary (D-06).
4. Animate only `opacity`, `transform`, `clip-path`, `stroke-dashoffset`.
5. `prefers-reduced-motion: reduce` → no draw/parallax/scan; content shown in final state instantly; transitions ≤ 1 frame.
6. No scroll-jacking. No hover-only critical function. No autoplay heavy video.
7. Candidate signature moves (validated in Visual Lab before use): (a) logo-frame-inspired mask for hero media, (b) schematic line-draw in the process timeline, (c) a "scan" indicator in Rapid Response, (d) controlled reveal, (e) image mask transition, (f) edge rule on hover/focus.
8. Cinematic comes from scale, composition, photography and controlled motion — not from effect stacking.

## 9. Photography (first-class design layer)
Real engine rooms, switchboards, control panels, machinery detail, engineers at work, vessels, ports. Treatments (crop, scrim, tonal, mask) are defined and tested in the Visual Lab.

**Development media slots** (clearly replaceable; each is a content-layer `MediaSlot`):
`vessel-exterior · engine-room · engineer-at-work · generator · switchboard · control-panel-plc · pneumatic-equipment · pump-machinery · technical-inspection · spare-parts`

Rules:
- Every temporary asset has `provenance: "development-media"` in the content layer (CONTENT_MODEL `MediaSlot`), never `confirmed`/`ME Group work`.
- Temporary media is never captioned, labelled or placed as ME Group's actual work, vessels or projects. In dev builds it carries a visible `DEV MEDIA` marker; production build fails if any `development-media` is referenced.
- Slots define aspect ratios, focal point, alt-text requirement and mask/treatment, so real photography drops in without layout changes.
- Sourcing for placeholders: neutral tonal placeholders or schematic SVG; licensed/generated imagery only if clearly marked and approved. No stock marine clichés.

## 10. Components (strategy)
Build **only when first used** by an approved page. Families, in dependency order:
1. Primitives: `Container`, `Section`, `Heading`, `Text`, `Button`, `Link`, `Label`, `Rule`, `Icon`.
2. Layout: `Header`, `NavDesktop`, `NavMobile`, `Footer`, `StickySupportBar` (mobile).
3. Content blocks: `Hero`, `SectionHeader`, `ServiceCard` (engineering), `TechnicalDataBlock`, `ProcessTimeline`, `ProblemSelector`, `CapabilityCard`/`EquipmentCard`, `ProjectCard`, `CaseStudy`, `TrustMetric`, `LogoCloud`, `ArticleCard`, `EmergencyCTA`, `CoverageMap`.
4. Forms: `Field`, `Select`, `FileUpload`, `UrgencySelector`, `TechnicalRequestForm`, `PartsRequestForm`, `RapidSupportForm`, `GeneralEnquiryForm`.
Each content component accepts typed props from the content model and renders `[CLIENT TO CONFIRM]` placeholder state when `status !== "confirmed"` (in dev) or hides (in production) per config.

## 11. Responsive strategy
| Tier | Behavior |
|---|---|
| Large desktop ≥1680 | Max container 1440, cinematic hero, larger media, 12-col asymmetry |
| Desktop 1024–1679 | Full nav + mega menu, side-by-side compositions |
| Tablet 768–1023 | 8-col, nav collapses to drawer, sections re-composed (not just narrowed), touch targets ≥ 44px |
| Mobile <768 | Single column, **sticky bottom bar: Rapid Support · Call · WhatsApp** (once contacts confirmed), problem selector as full-width list, process as vertical rail, accordion replaces tabs, forms stepped with 1 intent per screen |
No hover-dependent critical function; hover enhancements mirrored by `:focus-visible` and tap states.

## 12. Accessibility strategy
- WCAG 2.2 AA target. Semantic landmarks (`header/nav/main/footer`), one `h1`/page, ordered headings.
- Skip link; visible 2px `--focus-ring` offset outline on all interactive elements.
- Forms: persistent visible `<label>`, `aria-describedby` for hints and errors, `aria-invalid`, error summary focused on submit failure, no placeholder-as-label, autocomplete attributes, file upload with keyboard-operable native input and size/type guidance.
- Mega menu: disclosure pattern (button + `aria-expanded`), Esc closes, focus returns, no hover-only.
- Process timeline and problem selector: real lists/links; animation is progressive enhancement.
- Reduced motion, `forced-colors` safe borders, min 44px targets, language attributes and `dir` ready.
- Automated: eslint-plugin-jsx-a11y (Phase 1, lightweight); axe/Playwright added Phase 7; manual keyboard + screen reader pass per phase.

## 13. Logo and logo-frame geometry
- Use the supplied official assets (`ME-Logo.png`, `ME-Logo-Square.png`) unmodified. Do not redraw, recolor, trace or reinterpret the logo. Preparation limited to non-destructive delivery (move to `public/brand/`, optimized formats) unless an official vector is supplied.
- Logo-frame-inspired CSS/SVG geometry (skewed trapezoid with rounded corners) is a **separate UI motif** for masks, frames, crops, loaders and transitions. It is named `frame-motif`, lives apart from brand assets, and must never replace, overlay-as-logo or modify the logo.

## 14. Visual Lab (Phase 2) — not a Storybook
A real route (`/lab`, dev/noindex, excluded from sitemap and production) demonstrating the identity in context. Contents:
A. Typography specimen: `KEEPING VESSELS MOVING.`, `MARINE ENGINEERING`, section headings, body copy, navigation, buttons, technical labels, data/equipment labels — shown next to the real ME logo; outcome decides typography freeze.
B. Brand palette and surface combinations (light, off-white, charcoal, near-black, red moments incl. exceptional large-red).
C. Button/CTA hierarchy.
D. Navigation behavior (desktop, mega panel, mobile drawer + sticky bar).
E. Technical labels, numbering, engineering markers.
F. Photography treatments (on dev media slots).
G. Logo-frame-inspired image masks.
H. Engineering schematic visual language.
I. Motion experiments: line drawing, controlled reveal, technical scan, image mask transition.
J. **At least 2 distinct hero composition concepts.**
Exit: client/lead judges whether the language is distinctive before homepage production. The full homepage is not built in this phase.
