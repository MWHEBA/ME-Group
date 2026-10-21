# Master Architecture & Implementation Plan: ME Group Form Delivery System

## 1. Context & Architectural Root Cause Analysis
The ME Group production site is statically exported (`output: "export"` in `next.config.ts`) and served on an Apache / cPanel host (`/home/megroupe/public_html` on `84.247.179.163`).
In Phase 4 and Phase 8 (see `docs/DECISIONS.md: D-09, D-27, D-32`), form submission was architected around Next.js Server Actions. However, when the project was transitioned to static export:
1. **Server Actions Became Inert**: With `output: "export"`, Next.js compiles forms to client-side bundles. Code in `src/lib/forms/actions.ts` runs exclusively inside the user's browser.
2. **Missing Environment Variables**: Server-only environment variables (`FORM_WEBHOOK_URL`, `SMTP_*`) are hidden by Next.js from the browser bundle because they lack the `NEXT_PUBLIC_` prefix. Consequently, `getDeliveryAdapter()` in `src/lib/forms/adapter.ts` always evaluates to `undefined`, invoking `UnconfiguredDeliveryAdapter`, which hard-rejects all submissions with: *"الإرسال الإلكتروني قيد التهيئة حالياً. يرجى استخدام قنوات الاتصال المباشرة."*
3. **Dropped File Binaries**: `FileUploadZone.tsx` collects file metadata (`id, name, size, type`) but discards actual `File` blobs, preventing attachments from ever being transmitted.
4. **Environment Constraints**: The local Windows development machine has no PHP runtime (`php -v` is uninstalled), while the remote host has no Node.js runtime.

---

## 2. Hardened Architecture (The Pluggable Bridge Pattern)

To resolve this fundamentally without breaking static hosting or adding recurring infrastructure costs:

```
[ Client Browser (Next.js React Form) ]
       │
       ├──► 1. Client-Side Validation (Required fields, MIME types, 5MB/10MB limits)
       ├──► 2. Multipart Streaming (FormData encapsulation - zero Base64 bloat)
       │
       ▼ (actions.ts -> ApiDeliveryAdapter)
[ POST /api/send-mail.php (Apache / PHP 8.x in public_html) ]
       │
       ├──► Security & Anti-Abuse Shield:
       │    ├── CORS validation (strictly megroup-eg.com + localhost)
       │    ├── Honeypot Anti-Spam Trap (silent bot discard)
       │    ├── IP Rate Limiting (transient lock, max 5 req / 10 min per IP)
       │    └── CRLF / Header Injection Sanitization
       │
       ├──► Dual-Engine Mail Transport:
       │    ├── Mode A (Native Local cPanel MTA): Zero-latency, SPF-aligned with 84.247.179.163, passwordless
       │    └── Mode B (Authenticated SMTP Fallback): Port 587 TLS via isolated server config
       │
       ▼
[ Deliveries Dispatched ]
       ├──► 1. Internal Staff Alert to info@megroup-eg.com (Full Vessel/IMO/Parts info + Physical Attachments)
       └──► 2. Safe Client Auto-acknowledgment (Protected against backscatter; contains unique ref MEG-2026-XXXX)
```

---

## 3. Form Schemas & Field Mapping Specification

The endpoint `/api/send-mail.php` handles all 4 conversion channels with strict field extraction:

| Form Type | Target Route | Specific Fields Extracted |
|-----------|--------------|---------------------------|
| **General Enquiry** | `/contact`, `/ar/contact` | `contactName`, `companyName`, `email`, `phone`, `subject`, `message` |
| **Technical Support** | `/contact/technical-support` | `vesselName`, `imoNumber`, `vesselType`, `currentPort`, `systemDiscipline`, `equipmentMaker`, `equipmentModel`, `problemDescription`, `urgency`, `contactName`, `companyName`, `email`, `phone`, `preferredContactMethod`, `attachments[]` |
| **Rapid Support** | `/contact/rapid-support` | `vesselName`, `currentPort`, `problemSummary`, `phone`, `systemDiscipline`, `attachments[]` |
| **Spare Parts** | `/contact/spare-parts` | `identificationPath`, `partName`, `partNumber`, `maker`, `model`, `quantity`, `deliveryLocation`, `requiredDate`, `notes`, `contactName`, `companyName`, `email`, `phone`, `attachments[]` |

### API Contract (JSON Response):
```json
{
  "success": true,
  "formType": "technical_support",
  "deliveryReference": "MEG-2026-A8F2K",
  "message": "Technical request dispatched successfully to the engineering queue.",
  "timestamp": "2026-10-21T20:50:00Z"
}
```

---

## 4. Work Breakdown & Implementation Phases

### Phase 1: Real File Attachment & FormData Architecture
- **Task 1.1**: Update `src/lib/forms/types.ts`:
  - Extend attachment interface to carry real file references (`file?: File`) alongside metadata (`id, name, size, type`).
- **Task 1.2**: Update `src/components/forms/FileUploadZone.tsx`:
  - Retain actual `File` objects in component state upon file selection or drag-and-drop.
  - Enforce size limits (5MB per file, up to 10MB total) and allowed file extensions (`.pdf, .jpg, .jpeg, .png, .webp`).
- **Task 1.3**: Update `TechnicalSupportForm.tsx` & `SparePartsForm.tsx`:
  - Pass the actual `File` objects into submission actions for binary streaming.

### Phase 2: Next.js Frontend Delivery Adapter & Action Integration
- **Task 2.1**: Update `src/lib/forms/adapter.ts`:
  - Implement `ApiDeliveryAdapter` using `FormData` (Multipart) targeting `/api/send-mail.php`.
  - Add graceful Local Development fallback: Since Windows does not have PHP installed locally, detect `localhost:3000` / dev environment. If `/api/send-mail.php` is unavailable, output rich debug payloads to the browser console and return a simulated success response so UI testing remains 100% functional without requiring a local PHP server.
- **Task 2.2**: Update `src/lib/forms/actions.ts`:
  - Wire all 4 form actions (`general_enquiry`, `technical_support`, `rapid_support`, `spare_parts`) to build `FormData` payloads and retrieve the real `deliveryReference` from the backend.

### Phase 3: Secure Native PHP Mail Dispatcher (`public/api/send-mail.php`)
- **Task 3.1**: Security & Anti-Abuse Core:
  - CORS header handling (strictly allowing `megroup-eg.com`, `www.megroup-eg.com`, and `localhost`).
  - Honeypot validation (reject bot submissions silently with success status to thwart retry loops).
  - Rate limiting (IP-based throttling using transient file storage in system temp directory).
  - Sanitization of all input strings against CRLF / email header injection.
- **Task 3.2**: Dual-Engine Email Transport:
  - Implement primary dispatch via native cPanel MTA (PHP `mail()` with proper MIME multipart boundaries, UTF-8 charset, and binary attachments), aligning with server IP `84.247.179.163` and SPF records.
  - Include fallback to authenticated SMTP (`mail.mwheba.co.uk`) reading credentials from an isolated, protected file or server environment.
- **Task 3.3**: Branded Email Templates & Safe Auto-responder:
  - **ME Group Operations Notification**: High-contrast, executive layout detailing Vessel Name, IMO, Current Port, Urgency, Systems, Equipment Maker/Model, and physical email attachments.
  - **Safe Client Auto-Acknowledgment**: Professional bilingual (EN/AR) confirmation email assuring receipt, 24/7 emergency hotline, and unique reference number (`MEG-YYYY-XXXX`). Protected with backscatter guards (rate-limited per target recipient).

### Phase 4: Apache Configuration & Static Build Integration
- **Task 4.1**: Check `.htaccess`:
  - Verify that rewrite rules correctly preserve `.php` execution under `/api/` without rewriting to `index.html`.
- **Task 4.2**: Verify `npm run build`:
  - Confirm Next.js copies `public/api/send-mail.php` into `out/api/send-mail.php`.
  - Run `npx tsc --noEmit` and `npm run lint` to confirm zero regressions.

### Phase 5: Verification & Safety Protocol
- **Task 5.1**: Test payload serialization with and without file attachments via Next.js dev server.
- **Task 5.2**: Test error boundaries, honeypot triggering, and rate limit feedback.
- **Task 5.3**: Strict User-Gated Deployment:
  - No deployment (`deploy.py` or SSH upload) may be run without explicit confirmation from user.
  - Test email dispatch once deployed and approved.

---

## 5. Engineering Risk Matrix & Defenses
| Risk | Severity | Engineered Defense |
|------|----------|-------------------|
| File attachment memory bloat | High | Use `FormData` multipart streaming instead of Base64 JSON. 5MB file cap. |
| Credentials exposure in public_html | Critical | Uses local cPanel mail engine without exposing passwords in client code; SMTP fallback credentials stored outside web root. |
| Backscatter / Reflection spam | High | Strict honeypot + IP rate-limiting + recipient rate-limiting guard. |
| Local developer 404 in Next.js dev server | Medium | `ApiDeliveryAdapter` detects dev environment and provides graceful fallback with complete payload logging. |
| Missing local PHP on Windows | Low | Adapter provides dev-mode mock; script syntax and logic written as self-contained standard PHP 8.x. |
| Accidental premature deployment | Critical | Explicit safety gate in Phase 5: deploy.py requires manual user review and approval. |
