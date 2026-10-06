# LAUNCH CHECKLIST — ME GROUP WEBSITE

> **Status Classification**:
> - **[READY]**: Technical implementation completed and verified in codebase.
> - **[CLIENT REQUIRED]**: Unresolved facts, credentials, or approved brand media that require direct client provision.
> - **[DEPLOYMENT REQUIRED]**: Infrastructure and hosting configuration needed during go-live.
> - **[POST-LAUNCH]**: Verification and monitoring checks following live deployment.

---

## 1. READY (Technical Implementation Complete)

- [x] **Production Design System**: Clean industrial visual language, zero gradients, 100% `:root` CSS variables, strict readability scale (`--text-xs: 0.875rem` minimum).
- [x] **26 Route Architecture**: All core service routes, capabilities matrix, company pages, contact entrypoints, custom 404, robots.ts, sitemap.xml, and icon.
- [x] **Form Validation & Server Boundary**: Server actions with strict server-side validation for Technical Support, Rapid Support, Spare Parts, and General Enquiry.
- [x] **Form Delivery Adapter Interface**: Pluggable architecture (`src/lib/forms/adapter.ts`) ready for Webhook / REST API or SMTP integrations without fake success claims.
- [x] **Anti-Spam Protection**: Server-side honeypot validation with zero client friction.
- [x] **File Upload Security Baseline**: Conservative default types (PDF, JPG, PNG, WEBP), 10MB size restriction, client/server validation, storage isolation boundary.
- [x] **Zero-PII Analytics Layer**: Semantic conversion event architecture (`src/lib/analytics.ts`) with no personal or vessel identifying data transmitted.
- [x] **SEO & Metadata**: Unique titles, meta descriptions, canonical URLs, semantic single H1s, and valid OpenGraph / Twitter tags.
- [x] **Verified JSON-LD Structured Data**: Organization schema containing strictly confirmed facts (no fake addresses, ratings, or unverified badges).
- [x] **HTTP Security Headers**: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and `Strict-Transport-Security` configured in `next.config.ts`.
- [x] **Feature Gating**: Disabled unconfirmed sections (`Projects`, `Insights`, `Coverage`, `Clients`) properly excluded from sitemap and returning 404.
- [x] **Internal Visual Lab Isolation**: `/lab` route excluded from navigation, footer, sitemap, and tagged `noindex, nofollow`.
- [x] **Accessibility Baseline**: WCAG 2.2 AA compliant contrast, visible focus rings, landmark navigation, skip link, and semantic form labels.

---

## 2. CLIENT REQUIRED (Launch Blockers Pending Client Provision)

The following items are required from ME Group before the website can be opened to public visitors:

1. **Direct Contact Channels**:
   - [ ] Verified 24/7 Telephone Number for technical dispatch.
   - [ ] Verified WhatsApp Business number.
   - [ ] Verified General Enquiry Email (`info@...` or `contact@...`).
   - [ ] Verified Technical Support / Emergency Email (`support@...` or `dispatch@...`).
   - [ ] Registered / Physical Office Address (if intended for public display).

2. **Legal & Privacy Policies**:
   - [ ] Client-approved **Privacy Policy** document (mandatory before collecting vessel & contact data via forms).
   - [ ] Client-approved **Terms of Service** / Legal Notice.

3. **Production Domain**:
   - [ ] Final approved production domain (e.g. `https://www.megroup-marine.com`).
   - [ ] DNS management access for SSL certificate provisioning and CNAME routing.

4. **Form Delivery Destination**:
   - [ ] Confirmation of backend destination (CRM Webhook URL + API key OR Transactional SMTP credentials).

5. **Brand Media & Social Assets**:
   - [ ] Final approved hero video film (if replacing development media).
   - [ ] Official Open Graph social share image (1200x630px).
   - [ ] Official Company Social Profile Links (e.g. LinkedIn).

6. **Content Activations (Optional for v1.0)**:
   - [ ] Verified Case Studies & Projects (to enable `features.projects = true`).
   - [ ] Verified Technical Articles (to enable `features.insights = true`).
   - [ ] Verified Classification & Quality Certification documents (to enable `features.certifications = true`).

---

## 3. DEPLOYMENT REQUIRED (Infrastructure & Server Setup)

- [ ] **Hosting Environment Provisioning**: Node.js 18+ / 20+ runtime or Edge serverless platform (Vercel, AWS, Cloudflare, or Linux VPS).
- [ ] **Environment Variables Setup**:
  - `NEXT_PUBLIC_SITE_URL` set to canonical HTTPS domain.
  - `NEXT_PUBLIC_SITE_ENV` set to `production` (activates search engine indexing).
  - Client contact variables populated (`NEXT_PUBLIC_COMPANY_PHONE`, `NEXT_PUBLIC_COMPANY_EMAIL`, etc.).
  - `FORM_WEBHOOK_URL` / `FORM_WEBHOOK_SECRET` or SMTP variables configured.
- [ ] **SSL / TLS Certificate**: Valid HTTPS certificate active with automated renewal.
- [ ] **Production Build Execution**: `npm run build` completed with zero TypeScript or asset warnings.

---

## 4. POST-LAUNCH (Go-Live Quality Assurance)

- [ ] **HTTPS Redirection**: Verify all HTTP traffic automatically redirects to HTTPS.
- [ ] **Canonical Domain Routing**: Verify `non-www` to `www` (or vice versa) canonical 301 redirect.
- [ ] **Robots & Indexing**: Verify `https://<domain>/robots.txt` returns `Allow: /` and `Disallow: /lab`.
- [ ] **Sitemap Verification**: Verify `https://<domain>/sitemap.xml` contains exactly the 26 verified public routes.
- [ ] **Live Form Delivery Test**: Submit a test inquiry on all 4 forms and verify end-to-end receipt in the designated CRM/email inbox.
- [ ] **Mobile Touch Test**: Test phone/WhatsApp direct call actions from mobile device.
- [ ] **Hero Media Playback**: Verify background media streams smoothly with fallback on low-bandwidth / Save-Data mode.
- [ ] **404 Handling**: Verify non-existent URLs return custom branded 404 page with navigation recovery.
- [ ] **Search Console & Webmaster Setup**: Submit sitemap to Google Search Console and Bing Webmaster Tools.
- [ ] **Core Web Vitals Monitoring**: Measure real-user LCP, CLS, and INP metrics.
