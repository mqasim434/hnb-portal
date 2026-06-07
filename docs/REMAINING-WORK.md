# Remaining work — H&B Service Group portal

**Project:** `hnb-portal` · Firebase `hnb-services`  
**Stack:** React + Vite · Firebase Auth + Firestore · ImageKit uploads · Spark (free) plan  
**Last updated:** 2026-05-30  

This document lists **everything not yet finished**, grouped by priority, with **concrete implementation notes** (files, schema, routes, env vars).  

For what is **already built**, see [`MODULE-BUILD-PLAN.md`](./MODULE-BUILD-PLAN.md).  
For **manual QA**, see [`E2E-WORKFLOW-TEST.md`](./E2E-WORKFLOW-TEST.md).

> **Note:** [`PROJECT-BUILD-STATUS.md`](./PROJECT-BUILD-STATUS.md) is outdated (written before Modules 3–9). Treat this file as the current gap analysis.

---

## Summary

| Area | Status |
|------|--------|
| **Phase 1 MVP (Modules 2–9)** | Code complete — needs live QA sign-off |
| **Module 1 (Marketing)** | ~95% — copy, content, assets |
| **Module 10 (E2E QA)** | Test script done — **not executed / signed off** |
| **Module 11 (Phase 2)** | Not started |
| **Module 12 (Phase 3)** | Not started |

---

## 1. Pre-launch — do before go-live

These items block a confident production launch without changing architecture.

### 1.1 Run end-to-end QA (Module 10)

| Item | Detail |
|------|--------|
| **What** | Walk through all steps in [`E2E-WORKFLOW-TEST.md`](./E2E-WORKFLOW-TEST.md) |
| **Who** | Manual — admin + freelancer test accounts |
| **Output** | Fill sign-off checklist; log bugs in GitHub/issues |
| **Known gaps to verify** | ImageKit auth in prod (`/api/imagekit-auth`), Firestore rules deployed, first admin bootstrapped |

---

### 1.2 Client content & env configuration

Real business data is **env-driven** (`src/content/company.js`). Add to `.env` (and production host):

```env
VITE_COMPANY_EMAIL=bookings@hbservicegroup.com
VITE_COMPANY_PHONE=+31 ...
VITE_COMPANY_KVK=...
VITE_COMPANY_BTW=...
VITE_COMPANY_WPBR=...
VITE_COMPANY_LOCATION=Amsterdam, Nederland

# Optional analytics (loads only after cookie consent)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

| Location | File | Action |
|----------|------|--------|
| Footer / contact / mobile menu | `src/content/company.js`, `Footer.jsx`, `Navbar.jsx`, `Contact.jsx` | Set env vars |
| WPBR vergunning page | `src/content/complianceLegalContent.js` line 13 | Replace `[PLACEHOLDER — IN AANVRAAG]` with real vergunningnummer |
| Invoice PDF header | `src/lib/invoices/pdf.js` | Optionally add KvK/BTW from `COMPANY` |

**Implementation:** Create `.env.example` documenting all `VITE_*` keys (Firebase, ImageKit, company, GA, email endpoints).

---

### 1.3 Marketing copy — je/jij tone pass (Rev §2, §5)

| Item | Detail |
|------|--------|
| **Decision** | Site-wide informal Dutch (*je/jij*), not *u/uw* |
| **Done** | Footer tagline, portal pages, register page, cookie policy |
| **Remaining** | ~48+ formal phrases in `src/content/marketingPages.js`; bedrijven pages (`FunctieprofielenPage.jsx`, etc.); `complianceLegalContent.js` (B2B-facing — may keep *u* for opdrachtgevers only; confirm with client) |

**Implementation approach:**

1. `rg "\b(uw|u |U |kunt u|voor u)\b" src/content src/pages` — fix per page.
2. Freelancer-facing copy → *je/jij/jouw*.
3. B2B opdrachtgever copy → confirm tone (revision doc says entire site; many NL B2B sites still use *u* for clients).
4. Portal/auth already uses *je* — keep consistent.

**Effort:** 1–2 days copy edit; no schema changes.

---

### 1.4 Spelling & revision checklist (Rev §18 items 1–6)

| Issue | Location | Fix |
|-------|----------|-----|
| `portofoondiscipline` → `radiodiscipline` | `src/pages/overhb/OnsVerhaalPage.jsx`, `src/content/bedrijvenSectorCards.js` | Search-replace |
| Other Rev §2 typos | Grep `Piebbezetting`, `Functieprofielen` misspellings | Audit `docs/_extracted-requirements.txt` §2 |
| Team placeholder | `HetTeamPage.jsx` uses fictional `TEAM_PROFILES` | Replace with real names/photos when client provides (Rev §8.2, item 20) |
| Hero / CTAs / nav | Largely done | Spot-check against Rev §4–6 |

---

### 1.5 Optional email notification endpoints (forms)

Forms **persist to Firestore** (B2B, onboarding) but email is optional:

| Form | Env var | Lib |
|------|---------|-----|
| Contact | `VITE_CONTACT_FORM_EMAIL_ENDPOINT` | `src/lib/contactFormEmail.js` |
| B2B personeel | `VITE_COMPANY_REQUEST_EMAIL_ENDPOINT` | `src/lib/companyStaffRequestEmail.js` |
| Freelancer aanmelden | `VITE_REGISTRATION_EMAIL_ENDPOINT` | `src/lib/freelancerRegistrationEmail.js` |

**Implementation:** Deploy a small serverless handler (Vercel serverless, Cloudflare Worker, or Formspree) that accepts POST JSON and sends email. Without this, admins rely on Firestore queues only (`/admin/staff-requests`, `/admin/onboarding`).

---

### 1.6 Production deployment checklist

| Component | Command / host |
|-----------|----------------|
| Firestore rules + indexes | `firebase deploy --only firestore:rules,firestore:indexes` |
| Frontend | Vercel/Netlify static deploy from `npm run build` |
| ImageKit auth (prod) | `api/imagekit-auth.js` + `IMAGEKIT_PRIVATE_KEY` on host |
| ImageKit auth (dev) | Vite middleware in `vite.config.js` |
| SEO files | Generated at build: `scripts/generate-seo-files.mjs` |
| Cookie banner | Already in `RootLayout` — verify on production domain |
| SSL / canonical | Ensure `VITE_SITE_URL` or site config matches live domain |

---

## 2. Module 1 — Marketing polish (remaining)

| Item | Status | Implementation |
|------|--------|----------------|
| Cookie consent banner | ✅ | `CookieConsentBanner.jsx` — optional: add “Cookie-instellingen” link to re-open banner |
| Google Analytics | ✅ | `VITE_GA_MEASUREMENT_ID` + consent in `googleAnalytics.js` |
| Company contact via env | ✅ | `src/content/company.js` |
| je/jij tone | ⬜ | See §1.3 |
| Spelling audit | ⬜ | See §1.4 |
| Brand video homepage | ⬜ | Client asset → embed in `Home.jsx` hero or band below (Rev §15.1) |
| Founder photo | ⬜ | `OnsVerhaalPage.jsx` |
| Client testimonials / logos | ⬜ | `Home.jsx` social proof section |
| CMS | Out of scope | Would replace `src/content/*.js` — only if client requests |

---

## 3. Built modules — gaps & enhancements (still Phase 1)

These are **not blockers** but known limitations of the current MVP.

### 3.1 Architecture / UX

| Issue | Detail | Suggested fix |
|-------|--------|---------------|
| **Double chrome on portal/admin** | `/portal/*` and `/admin/*` render inside `RootLayout` (marketing `Navbar` + `Footer`) *and* `PortalLayout` / `AdminLayout` | Restructure router: move portal/admin to sibling routes without marketing shell, or hide marketing nav when path starts with `/portal` or `/admin` |
| **`DocumentUpload` vs ImageKit** | Module plan mentions Firebase Storage; **compliance uses ImageKit** (`src/lib/imagekit/upload.js`) | Update docs only, or migrate if client enables Storage on Blaze |
| **Company role** | `ROLES.COMPANY` exists in `constants/roles.js` but no company portal | Phase 3, or remove unused role until Phase 3 |

---

### 3.2 Invoicing (Module 8)

| Gap | Current behaviour | Enhancement |
|-----|-------------------|-------------|
| Hourly rate | Admin enters rate at invoice generation (`DEFAULT_HOURLY_RATE = 18.50`) | Store `hourlyRate` on `assignments` or freelancer profile; pre-fill on generate |
| PDF | Browser print dialog (`printInvoicePdf`) | Optional: jsPDF or server-side PDF storage (needs Blaze/storage) |
| Payment | Manual **Betaald** button | Phase 2 Mollie/Stripe |
| Freelancer VAT/KvK on invoice | Not on invoice | Add fields to `users/{uid}` + invoice template |

**Files:** `src/lib/invoices/invoices.js`, `src/lib/invoices/pdf.js`, `AdminInvoices.jsx`

---

### 3.3 Time tracking (Module 7)

| Gap | Enhancement |
|-----|-------------|
| No overlap detection | Validate duplicate `workDate` + assignment server-side or in form |
| No max hours rule | Optional business rule in `computeTotalHours()` |
| Admin bulk approve | Multi-select on `AdminHours.jsx` |

---

### 3.4 Assignments (Module 6)

| Gap | Enhancement |
|-----|-------------|
| No shift-level granularity | Phase 2 scheduling (see Module 11) |
| Freelancer accept/decline | Add `assignmentResponses` or status per freelancer |
| `rateNote` is free text | Parse or replace with numeric fields for invoicing |

---

### 3.5 Compliance (Module 4)

| Gap | Enhancement |
|-----|-------------|
| Expiry is manual | Scheduled check + email reminder (Phase 2) |
| Auto-expire on date | Cloud Function or daily client-side admin job |
| Legal copy claims 2FA | `complianceLegalContent.js` — **2FA not implemented**; add Firebase MFA or soften copy |
| “Encrypted storage” | Clarify ImageKit security in privacy copy |

---

### 3.6 Onboarding (Module 3) — optional routes

| Item | Routes (planned) | Implementation |
|------|------------------|----------------|
| 3-step wizard | `/auth/register` → `/auth/register/work-type` → `/auth/register/compliance` | Split `RegisterPage` into steps; reuse `FreelancerDirectRegister` field groups |
| Interest without licence | Dedicated marketing + tracked flag | Page linking to shortened onboarding; already partially flagged `interestWithoutLicence` in Firestore |

**Files to add:** `src/pages/auth/RegisterWorkTypePage.jsx`, `RegisterCompliancePage.jsx`; update `router/index.jsx`.

---

### 3.7 Admin / data

| Gap | Enhancement |
|-----|-------------|
| CSV export only | Add Excel (.xlsx) via SheetJS if required |
| No audit log | `adminActions` collection for approve/reject events |
| User suspend | `suspendUser` may exist in `userStatus.js` — verify UI on `AdminUsers.jsx` |

---

## 4. Module 11 — Phase 2 (not started)

**Goal:** Scheduling, notifications, automation, payment integrations.  
**Depends on:** Phase 1 QA complete.  
**Plan constraint:** Spark plan limits server-side logic — several features need **Blaze + Cloud Functions** or **external services**.

### 4.1 Notifications

**User stories:** Email (later push) when account approved, assignment created, hours approved/rejected, invoice approved, compliance expiring.

| Layer | Implementation |
|-------|----------------|
| **Trigger** | Firestore `onWrite` Cloud Functions (needs Blaze) **or** admin “Send notification” buttons calling HTTP API |
| **Email provider** | SendGrid, Resend, Postmark — API key in Functions secrets |
| **Templates** | Dutch HTML templates per event type |
| **In-app** | `users/{uid}/notifications` subcollection + bell icon in portal/admin layouts |
| **Preferences** | `users/{uid}.notificationPreferences` |

**Suggested Firestore schema:**

```text
notifications/{id}
  userId, type, title, body, read, createdAt, linkPath
```

**Files to create:** `functions/src/notifications/`, `src/lib/notifications/`, `NotificationBell.jsx`

---

### 4.2 Scheduling & shifts

**User stories:** Freelancer availability, shift offers, accept/decline, calendar view, no-show tracking.

| Layer | Implementation |
|-------|----------------|
| **Schema** | New `shifts` collection linked to `assignments/{id}` |
| **Fields** | `assignmentId`, `date`, `startTime`, `endTime`, `slots`, `assignedFreelancerIds[]`, `status` (open/filled/cancelled) |
| **Availability** | `users/{uid}/availability/{weekId}` or recurring rules |
| **Portal** | `/portal/shifts`, `/portal/availability` |
| **Admin** | `/admin/shifts` — drag calendar or list UI |
| **Indexes** | Composite on `date`, `status`, `assignedFreelancerIds` |

**Alternative (lighter MVP):** Extend `assignments` with `shifts[]` array instead of new collection.

---

### 4.3 Automation

| Automation | Implementation |
|------------|----------------|
| Auto-draft invoice when all hours for period approved | Scheduled Function or admin one-click “Generate all” |
| Remind freelancer pending hours | Email after assignment `dateEnd` |
| Compliance expiry warnings | Daily query + notification |
| Staff request stale alerts | KPI already on dashboard — add email if `new` > 48h |

---

### 4.4 Payment integrations

**User stories:** Pay invoice online; status syncs to `invoices.status = paid`.

| Layer | Implementation |
|-------|----------------|
| **Provider** | Mollie (NL) or Stripe |
| **Flow** | Admin approves invoice → freelancer clicks **Betalen** → redirect to checkout → webhook marks paid |
| **Backend** | **Required:** serverless webhook handler (`api/mollie-webhook.js`) — cannot stay client-only |
| **Schema** | Add `paymentId`, `paymentProvider`, `paidAt`, `paymentMethod` on `invoices` |
| **Spark note** | Webhooks OK on Vercel; Firebase Functions optional |

**Files:** `src/lib/payments/mollie.js`, `PortalInvoices.jsx` pay button, webhook API route

---

### 4.5 Phase 2 suggested build order

1. In-app + email notifications (highest ROI)  
2. Shift scheduling (extends assignments)  
3. Payment webhook (Mollie)  
4. Automation jobs  

**Estimated:** 3–6 weeks depending on Blaze approval and provider setup.

---

## 5. Module 12 — Phase 3 (not started)

**Goal:** Client portal, analytics, freelancer performance tracking.

### 5.1 Client (B2B) portal

| Item | Implementation |
|------|----------------|
| **Auth** | `role: company` on `users/{uid}`; invite flow from staff request |
| **Routes** | `/client/dashboard`, `/client/requests`, `/client/roster`, `/client/invoices` |
| **Features** | View assigned staff, request status, download invoice summaries, event documents |
| **Rules** | Firestore: company users read only their `staffRequests` + linked assignments |

---

### 5.2 Analytics & reporting

| Item | Implementation |
|------|----------------|
| **Admin analytics** | Charts on `/admin/dashboard` — hours by month, revenue, freelancer utilization |
| **Data** | Aggregate queries or pre-computed `stats/{month}` docs |
| **Export** | Extend CSV to scheduled reports |
| **Marketing GA** | Already env-gated — configure GTM if client prefers |

---

### 5.3 Freelancer performance tracking

| Item | Implementation |
|------|----------------|
| **Metrics** | On-time rate, no-shows, hours submitted vs approved, compliance score |
| **Schema** | `users/{uid}/performance/summary` updated on hour approve / shift complete |
| **Admin UI** | Column on user list or `/admin/freelancers/:id` detail |
| **Portal** | Optional freelancer-facing stats on dashboard |

---

## 6. Revision doc — items still open (§18)

Cross-reference with [`docs/_extracted-requirements.txt`](./_extracted-requirements.txt) §18.

| # | Priority | Item | Status |
|---|----------|------|--------|
| 1 | Critical | Spelling errors | Partial — `portofoondiscipline` remains |
| 2 | Critical | Team placeholder | Fictional profiles — need real content |
| 3 | Critical | Hero headline | Implemented — verify against Rev Option A/B |
| 4 | Critical | CTA button names | Largely done |
| 5 | Critical | je/jij tone | Partial |
| 6 | Critical | Navigation restructure | Done |
| 7–12 | High | Colours, contact, login, 404, section alternation | Mostly done — visual QA |
| 13–18 | Medium | Vergunningen, footer, SEO, validation, mobile, performance | Mostly done |
| 19–22 | When available | Video, team photos, founder photo, testimonials | **Client assets** |

---

## 7. Documentation debt

| File | Issue | Action |
|------|-------|--------|
| `PROJECT-BUILD-STATUS.md` | Says portal is all placeholders | Rewrite or archive |
| `MODULE-BUILD-PLAN.md` §Module 2 | Says Firebase Storage, not ImageKit | Update stack description |
| `.env.example` | Missing | Add with all variables |
| `MODULE-BUILD-PLAN.md` §Current focus | Stale | Point to this doc |

---

## 8. Environment variables — full reference

```env
# Firebase (required for portal)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# ImageKit (required for compliance uploads)
VITE_IMAGEKIT_PUBLIC_KEY=
VITE_IMAGEKIT_URL_ENDPOINT=
VITE_IMAGEKIT_AUTH_ENDPOINT=/api/imagekit-auth
IMAGEKIT_PRIVATE_KEY=           # server-side only (Vercel / dev middleware)

# Company (pre-launch content)
VITE_COMPANY_EMAIL=
VITE_COMPANY_PHONE=
VITE_COMPANY_KVK=
VITE_COMPANY_BTW=
VITE_COMPANY_WPBR=
VITE_COMPANY_LOCATION=

# Analytics (optional)
VITE_GA_MEASUREMENT_ID=

# Form email webhooks (optional)
VITE_CONTACT_FORM_EMAIL_ENDPOINT=
VITE_COMPANY_REQUEST_EMAIL_ENDPOINT=
VITE_REGISTRATION_EMAIL_ENDPOINT=
```

---

## 9. Recommended priority order

| Order | Work package | Effort | Blocks launch? |
|-------|--------------|--------|----------------|
| 1 | Run `E2E-WORKFLOW-TEST.md` + fix bugs | 1–2 days | Yes |
| 2 | Fill `.env` company + WPBR content | 1 hour | Yes (trust/compliance) |
| 3 | Spelling + je/jij pass (marketing) | 1–2 days | Recommended |
| 4 | Fix portal double-nav (UX) | 0.5 day | Recommended |
| 5 | `.env.example` + update stale docs | 2 hours | No |
| 6 | Optional form email endpoints | 1 day | No |
| 7 | Client assets (video, photos, testimonials) | Client-dependent | No |
| 8 | Phase 2 — notifications | 1–2 weeks | No |
| 9 | Phase 2 — scheduling | 2–3 weeks | No |
| 10 | Phase 2 — payments | 1–2 weeks | No |
| 11 | Phase 3 — client portal | 3+ weeks | No |

---

## 10. Quick reference — what is done

For completeness, Phase 1 delivery includes:

- Firebase Auth, Firestore roles, protected routes, live profile sync  
- Onboarding applications + admin queue  
- Compliance uploads (ImageKit) + admin review  
- B2B staff requests + admin  
- Assignments + portal jobs  
- Time entries + admin approval  
- Invoices + PDF print + manual paid  
- Admin dashboard KPIs + CSV export  
- Cookie banner + GA hook  
- Marketing site (extended), SEO, juridisch pages  

---

*Maintained alongside `MODULE-BUILD-PLAN.md`. Update this file when closing gaps or starting Phase 2 modules.*
