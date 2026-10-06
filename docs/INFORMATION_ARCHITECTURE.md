# INFORMATION ARCHITECTURE — ME Group

Legend: ✅ content confirmed · ⚠️ structure only / `[CLIENT TO CONFIRM]` · 🔒 hidden in production until confirmed

## 1. Sitemap
```
/                                   Home                                  ✅ (metrics ⚠️🔒)
/company
  /about                            About ME Group                        ⚠️
  /approach                         Our Approach                          ✅ (process model)
  /quality-safety                   Quality & Safety                      ⚠️🔒
  /certifications                   Certifications                        ⚠️🔒
  /coverage                         Coverage                              ⚠️🔒
/services
  /marine-engineering
    /mechanical                     Mechanical Services                   ✅
    /electrical                     Electrical Power & Distribution       ✅
    /automation                     Automation & Control                  ✅
    /pneumatic                      Pneumatic Systems                     ✅
  /repair-maintenance
    /preventive                     Preventive Maintenance                ✅
    /corrective                     Corrective Maintenance                ✅
    /inspection-diagnostics         Inspection & Diagnostics              ✅
    /rapid-response                 Rapid Response (24/7)                 ✅
  /vessel-support
    /spare-parts                    Marine Spare Parts                    ✅
    /technical-supplies             Technical Supplies                    ✅
    /provisioning                   Vessel Provisioning                   ✅
/capabilities
  /equipment                        Equipment We Service                  ✅ (derived from services)
  /equipment/[slug]                 e.g. generators, switchboards, PLC    ✅
  /vessel-types                     Vessel Types                          ⚠️🔒
  /technical                        Technical Capabilities                ✅
/projects                           Selected Projects                     ⚠️🔒
  /[slug]                           Case Study                            ⚠️🔒
/insights                           Technical Articles / Resources        ⚠️ (dev articles hidden)
  /[slug]
/contact
  /                                 General Enquiry
  /technical-support                Request Technical Support
  /spare-parts                      Request Spare Parts
  /rapid-support                    Rapid / Emergency Support
/privacy  /terms  /cookies          Legal (⚠️ client text)
```
Future long-tail (architecture only, no pages yet): `/problems/[slug]` (e.g. generator AVR fault), `/locations/[slug]`, `/capabilities/equipment/[slug]`. Locations stay disabled until coverage confirmed. `/ar/...` reserved for Arabic.

## 2. Navigation (intent-first, shallow)
**Primary (desktop, max 6 items):** Services · Capabilities · Projects · Company · Insights · Contact
**Persistent right slot:** `REQUEST TECHNICAL SUPPORT` (red button) + `Rapid Support` link with 24/7 indicator.
- Services opens a single-level mega panel: 3 columns (Marine Engineering / Repair & Maintenance / Vessel Support), each with 3–4 links + a footer strip "What does your vessel need?" → problem selector. No third level.
- Projects/Insights hidden from nav while content is unconfirmed (config flag).
**Mobile:** top bar (logo, menu button); full-screen drawer with accordion groups; **sticky bottom bar**: Rapid Support · Technical Request. Always ≤ 2 taps to a request form.
**Footer:** services index, company, contact paths, legal, language slot (future), `[CLIENT TO CONFIRM]` contact/address block.

## 3. Intent routing (problem selector → destination)
| Intent | Destination |
|---|---|
| Mechanical Problem | `/contact/technical-support?system=mechanical` |
| Electrical Fault | `…?system=electrical` |
| Automation / PLC Issue | `…?system=automation` |
| Pneumatic Problem | `…?system=pneumatic` |
| Need Spare Parts | `/contact/spare-parts` |
| Need Vessel Supplies | `/contact/general?topic=supplies` |
| Urgent Technical Support | `/contact/rapid-support` |
Each also links to the relevant service page as secondary action.

## 4. Homepage journey (14 sections → composition)
01 Hero (KEEPING VESSELS MOVING.) · 02 Proof (configurable metrics, hidden until confirmed) · 03 Core engineering (4 systems) · 04 "What does your vessel need?" · 05 Process (Inspect→Commission→Support) · 06 Rapid Response (dark) · 07 Equipment · 08 Projects (⚠️🔒) · 09 Spare parts · 10 Coverage (⚠️🔒) · 11 Why ME Group · 12 Clients/Partners (⚠️🔒) · 13 Insights (⚠️🔒) · 14 Final CTA.
Production visible set until confirmation: 01, 03, 04, 05, 06, 07, 09, 11, 14. Sections 02, 08, 10, 12, 13 render only when `siteConfig.features.*` is on and content is `confirmed`. Section layouts must differ (split, rail, full-bleed dark, index list, tabbed) to avoid repetition.

## 5. Conversion paths
Every page ends in one of the four forms. Header CTA, hero CTA, rapid-response CTA, sticky mobile bar, and final CTA all route to the intent-matched form. Form specs are in CONTENT_MODEL.md §6.

## 6. SEO URL strategy
Lowercase, hyphenated, ≤ 3 levels, canonical per page, `hreflang` slot ready. Page titles follow `"{Topic} | ME Group — Marine Engineering Group"`. Keyword directions (Marine Engineering Egypt/Alexandria, ship electrical repair, marine automation, emergency marine repair, spare parts Egypt, 24/7 marine technical support, etc.) map to service/equipment pages and later `/locations/*`; **geographic claims only after coverage confirmed** (Egypt/Alexandria is a keyword target, not yet a stated coverage fact).
