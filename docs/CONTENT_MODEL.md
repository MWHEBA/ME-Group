# CONTENT MODEL — ME Group

Content lives in `src/content/` as typed TypeScript modules. **Phase 1–3: TypeScript types only, no runtime schema validation. Zod is introduced in Phase 4 with the Conversion System (form validation); runtime content validation with Zod may be added then if it proves useful.** JSX contains no company facts. Migration path to a CMS (Sanity/Payload) is preserved because components consume typed props, not raw files.

## 1. Universal field: status
```ts
type ContentStatus = "confirmed" | "needs-confirmation" | "development-sample";
interface Gated { status: ContentStatus; note?: string }
```
- Production build renders only `confirmed`. 
- Dev build renders others with a visible `[CLIENT TO CONFIRM]` / `DEVELOPMENT DATA` tag.
- Production-build guard that fails on `development-sample` / `development-media` content: planned (Phase 3+); Phase 1 only filters at render/navigation level.

### MediaSlot (Phase 1)
```ts
type MediaSlotId = "vessel-exterior" | "engine-room" | "engineer-at-work" | "generator" | "switchboard"
  | "control-panel-plc" | "pneumatic-equipment" | "pump-machinery" | "technical-inspection" | "spare-parts";
type MediaProvenance = "development-media" | "me-group-confirmed";
interface MediaSlot { id: MediaSlotId; label: string; aspect: string; provenance: MediaProvenance; src?: string; alt: string; credit?: string }
```
Temporary media must be `development-media`; it is never presented as ME Group work.

## 2. Folder layout
```
src/content/
  site.ts            company info, contact (empty until confirmed), feature flags, social
  navigation.ts      primary, mega panel, footer, mobile bar
  services.ts        service groups and services
  capabilities.ts    technical capabilities list
  equipment.ts       equipment categories (derived from confirmed services)
  problems.ts        problem-selector intents and routes
  process.ts         inspect→support steps
  metrics.ts         trust metrics (all needs-confirmation)
  projects.ts        projects (dev samples only, flagged)
  articles/          MDX technical articles (frontmatter typed)
  clients.ts         partners/logos (empty)
  coverage.ts        locations (empty)
  forms.ts           form definitions (fields, options, validation keys)
  seo.ts             default metadata, per-route overrides, keyword targets
```

## 3. Core types (abridged)
```ts
interface ServiceGroup { slug; title; summary; services: Service[] } & Gated
interface Service {
  slug: string; title: string; summary: string;
  scope: string[];                 // confirmed bullet items only
  equipment: string[];             // refs to equipment slugs
  relatedProblems: string[];
  seo: { title; description; keywordTargets: string[] };
} & Gated

interface Equipment { slug; name; category: "mechanical"|"electrical"|"automation"|"pneumatic";
  servicesProvided: string[]; commonFaults?: string[] /* only if client confirms */ } & Gated

interface Problem { id; label; route: string; query?: Record<string,string>; serviceSlug?: string }

interface ProcessStep { id: "inspect"|"diagnose"|"repair"|"test"|"commission"|"support";
  title; description; indicator: string }

interface Metric { key: "yearsExperience"|"projects"|"vessels"|"locations"; label; value?: number|string; unit?: string } & Gated

interface Project {
  slug; title; vesselType; location; challenge; scope: string[]; solution; result;
  gallery: { src; alt; width; height }[]; date?: string
} & Gated          // all current entries are development-sample or absent

interface Article { slug; title; excerpt; date; tags: string[]; body: MDX; seo } & Gated
interface ClientLogo { name; src; url? } & Gated          // empty
interface CoverageLocation { name; type: "port"|"region"; coordinates?; notes? } & Gated  // empty
interface CompanyInfo { name; fullName; tagline; support: { phone?; whatsapp?; email?; hours: "24/7" /* confirmed */; responseTime?: never } }
```
`responseTime` is typed `never`: a guarantee cannot be added without a deliberate type change.

## 4. Feature flags (`site.ts`)
```ts
features: { metrics:false, projects:false, coverage:false, clients:false, insights:false,
            certifications:false, vesselTypes:false, arabic:false, analytics:false }
```

## 5. Seed content
Services/equipment/process/problems are seeded verbatim from the confirmed list in PROJECT_BRIEF §5. Unconfirmed service families (dry docking, hull repair, etc.) are **not** seeded; a documented `expansionServices` slot exists but is empty.

## 6. Form definitions
Shared infrastructure: `FormDefinition { id, intent, fields: Field[], submitLabel }`, Zod schema per form, server action `submitLead(intent, payload)` → `LeadRouter` interface.

**A. Technical Support — "SEND TECHNICAL REQUEST"**: vesselName*, imoNumber (7 digits, optional), vesselType, currentPortLocation*, system* (mechanical/electrical/automation/pneumatic/other), manufacturer, model, problemDescription*, urgency* (Normal / Urgent / Vessel Stopped), contact name*, email or phone*, uploads: photo, nameplate, document, drawing, fault screenshot.
**B. Spare Part — "REQUEST QUOTATION"**: partName*, manufacturer, model, partNumber, quantity*, equipment, vessel, deliveryLocation*, requiredDate, attachment/nameplate, contact*.
**C. Rapid Support — "GET TECHNICAL SUPPORT"**: vessel*, location*, problem*, phoneWhatsApp*. Intentionally 4 fields.
**D. General Enquiry**: name*, company, email*, topic, message*.

### Lead pipeline (no hardcoded integrations)
```ts
interface LeadSink { name: string; send(lead: Lead): Promise<void> }
// sinks enabled by env: EMAIL_SMTP_*, CRM_WEBHOOK_URL, WHATSAPP_*; none enabled → dev logs + clear "not configured" state
```
- Spam: honeypot + server-side rate limit; CAPTCHA decision deferred (D-09).
- Uploads: accept images/PDF/DWG, size limit 10 MB each (proposal); storage adapter interface (S3-compatible/local) — **not chosen until infra confirmed**; until then upload fields are present but flagged "storage not configured".
- Lead routing: `intent + urgency` → sink priority ("Vessel Stopped" flagged for immediate channel).
- Analytics: typed `track(event)` abstraction, no-op by default (events: `cta_click`, `form_start`, `form_submit`, `form_error`, `intent_select`).
- Privacy: consent copy slot for legal text `[CLIENT TO CONFIRM]`.

## 7. SEO data
`seo.ts` defines default title template, OG image slot, per-route metadata, JSON-LD builders: `Organization`, `LocalBusiness`/`ProfessionalService` (**emitted only when address/phone confirmed**), `Service`, `BreadcrumbList`, `Article`, `FAQPage` (only with real FAQs). Sitemap generated from content with `status==="confirmed"` and enabled flags; `robots.ts` disallows everything on non-production hosts.
