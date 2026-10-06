# DEPLOYMENT GUIDE — ME GROUP PRODUCTION WEBSITE

This document outlines the deployment procedure, server assumptions, environment configurations, and security practices for running the ME Group production website.

---

## 1. Technical Stack & Server Assumptions

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Runtime**: Node.js 18.17.0+ or Node.js 20+ (LTS recommended)
- **Deployment Targets**:
  - **Serverless / Edge**: Vercel, AWS Amplify, Cloudflare Pages with Next.js adapter.
  - **Container / VM**: Docker container, Linux VPS (Ubuntu 22.04 LTS / Debian 12) with PM2 or systemd service + Nginx reverse proxy.

---

## 2. Environment Variables Configuration

Copy `.env.example` to your production environment configuration manager or `.env.production.local`.

### Core Configuration Variables:

```bash
# 1. Canonical Production URL (No trailing slash)
NEXT_PUBLIC_SITE_URL=https://www.megroup-marine.com

# 2. Site Environment (Set to 'production' to enable indexing in robots.txt)
NEXT_PUBLIC_SITE_ENV=production

# 3. Verified Client Contact Information (Populate when confirmed)
NEXT_PUBLIC_COMPANY_PHONE=+20XXXXXXXXXX
NEXT_PUBLIC_COMPANY_WHATSAPP=+20XXXXXXXXXX
NEXT_PUBLIC_COMPANY_EMAIL=info@megroup-marine.com
NEXT_PUBLIC_SUPPORT_EMAIL=support@megroup-marine.com
NEXT_PUBLIC_EMERGENCY_PHONE=+20XXXXXXXXXX

# 4. Form Submission Delivery Adapter (Server-only secrets)
# Webhook destination (e.g. CRM, ERP, Zapier, or internal API)
FORM_WEBHOOK_URL=https://api.megroup-marine.com/v1/leads/intake
FORM_WEBHOOK_SECRET=your_secure_webhook_token_here

# Optional: Transactional SMTP (if webhook is not used)
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@mg.megroup-marine.com
SMTP_PASS=your_smtp_password
SMTP_FROM="ME Group Technical Dispatch <dispatch@megroup-marine.com>"

# 5. Optional Analytics ID (Google Analytics / GTM)
NEXT_PUBLIC_ANALYTICS_ID=
```

---

## 3. Build & Execution Commands

### Standard Production Build:

```bash
# 1. Install dependencies
npm ci

# 2. Type-check validation
npx tsc --noEmit

# 3. Lint check
npm run lint

# 4. Compile optimized production build
npm run build

# 5. Start production server (default port 3000)
npm run start
```

---

## 4. Reverse Proxy Configuration (Nginx Example)

If hosting on a Linux VPS / Dedicated server:

```nginx
server {
    listen 80;
    server_name megroup-marine.com www.megroup-marine.com;
    return 301 https://www.megroup-marine.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name megroup-marine.com;
    
    # SSL Certificates
    ssl_certificate /etc/letsencrypt/live/megroup-marine.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/megroup-marine.com/privkey.pem;

    # Canonical redirect to www
    return 301 https://www.megroup-marine.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.megroup-marine.com;

    ssl_certificate /etc/letsencrypt/live/megroup-marine.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/megroup-marine.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 5. File Upload Storage Strategy

- Current Phase 8 baseline accepts client-validated metadata (`PDF`, `JPG`, `PNG`, `WEBP` up to 10MB).
- In production with active file storage, uploads should be piped directly to an isolated cloud object bucket (e.g. AWS S3, Cloudflare R2, or Google Cloud Storage) with signed URLs.
- **Never store uploaded documents in `/public` or local server source directories.**

---

## 6. Post-Deployment Verification Procedure

1. Test `https://www.megroup-marine.com` in browser.
2. Confirm `https://www.megroup-marine.com/robots.txt` yields:
   ```txt
   User-agent: *
   Allow: /
   Disallow: /lab
   Sitemap: https://www.megroup-marine.com/sitemap.xml
   ```
3. Confirm `https://www.megroup-marine.com/sitemap.xml` lists all 26 production routes.
4. Perform test submission across all four forms:
   - Technical Support
   - Rapid Support
   - Spare Parts
   - General Enquiry
5. Verify webhook / email arrival in destination system.
6. Test mobile menu, sticky bar, and dark/light system colors.
