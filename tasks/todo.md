# Implementation Tasks: ME Group Forms & Email Delivery System

## Phase 1: Real File Attachment & FormData Architecture
- [x] Task 1.1: Extend `AttachmentMetadata` in `src/lib/forms/types.ts` to include real `file?: File` references.
- [x] Task 1.2: Update `src/components/forms/FileUploadZone.tsx` to retain actual `File` objects in state with size caps (5MB/file, 10MB total).
- [x] Task 1.3: Update `TechnicalSupportForm.tsx` & `SparePartsForm.tsx` to pass physical files into action payloads.

## Checkpoint: Phase 1
- [x] TypeScript check passes (`npx tsc --noEmit`) and files are retained in component state cleanly.

## Phase 2: Next.js Frontend Delivery Adapter & Action Integration
- [x] Task 2.1: Implement `ApiDeliveryAdapter` in `src/lib/forms/adapter.ts` with `FormData` multipart streaming targeting `/api/send-mail.php`.
- [x] Task 2.2: Add smart Local Development fallback in `ApiDeliveryAdapter` (logs full payload to console and simulates success if local PHP is missing).
- [x] Task 2.3: Update `src/lib/forms/actions.ts` to convert all 4 forms into `FormData` payloads and handle backend reference IDs.

## Checkpoint: Phase 2
- [x] Form submission flows work in local development without 404 errors, and console verifies full payload structure.

## Phase 3: Secure Native PHP Mail Dispatcher (`public/api/send-mail.php`)
- [x] Task 3.1: Create `public/api/send-mail.php` with CORS validation, Honeypot check, IP rate-limiting, and header-injection sanitization.
- [x] Task 3.2: Implement Dual-Engine mail dispatch (Primary: Local cPanel MTA with SPF alignment on 84.247.179.163; Fallback: Authenticated SMTP).
- [x] Task 3.3: Implement MIME multipart message builder with binary attachments from `$_FILES`.
- [x] Task 3.4: Implement branded HTML templates for Staff notification (`info@megroup-eg.com`) and Client Auto-acknowledgment (with backscatter protections).

## Checkpoint: Phase 3
- [x] Self-contained PHP script syntax is complete, robust, and handles all 4 form schemas with zero external dependencies.

## Phase 4: Apache Configuration & Static Build Integration
- [x] Task 4.1: Verify `.htaccess` preserves `.php` execution under `/api/`.
- [x] Task 4.2: Run `npm run build` and confirm `public/api/send-mail.php` exports cleanly to `out/api/send-mail.php`.

## Checkpoint: Phase 4
- [x] Production build succeeds with zero errors and all static/dynamic assets are aligned.

## Phase 5: Verification & Safety Protocol
- [x] Task 5.1: Test form submissions and verify payload handling.
- [x] Task 5.2: Verify security controls (Honeypot, Rate Limiting).
- [x] Task 5.3: Strict User-Gated Deployment confirmation (explicit manual approval before running `deploy.py`).
