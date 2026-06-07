# H&B Service Group — Module Build Plan

**Sources aligned in this document:**

| Document | Scope |
|----------|--------|
| `Developmen Plan.docx` | Product modules 1–7, routes, MVP workflow |
| `HnB Website Revisiedocument v3.docx` | Dutch copy, UX, colours, nav, forms, SEO, checklist |
| `Website plan 2.0.pdf` | MVP goals, architecture intent, phase roadmap |

**Stack in this repo:** React + Vite (marketing) · Firebase Auth + Firestore + **Storage** (Spark/free plan — **no Cloud Functions**)

**How to use this file:** Build modules **in order**. Each module must be **complete, standalone, and testable** before moving on. Status: ✅ Done · 🟡 Partial · ⬜ Not started · 🔄 In progress

---

## Executive alignment

| Client requirement | Our implementation |
|--------------------|-------------------|
| CMS marketing site | Static React + `src/content/*.js` (no CMS) |
| Zoho Creator portal | **Custom Firebase portal** (replaces Zoho) |
| WordPress | **Not used** — React static site |
| Workflow: apply → approve → assign → hours → invoice | Modules 2–9 below |
| Revision doc Dutch copy & nav | Module 1 (~90%) |
| Image / compliance uploads | **Firebase Storage** (Spark plan) |

---

## Module overview

| # | Module | Plan refs | Status | Depends on |
|---|--------|-----------|--------|------------|
| **1** | Marketing website & lead capture | Dev M1 · Rev §1–16 · PDF §5–6 | 🟡 ~95% | — |
| **2** | Platform foundation (Auth, roles, ImageKit) | Dev M5/M6 base · PDF §4 | ✅ Code complete | — |
| **3** | Freelancer registration & onboarding | Dev M2 · PDF §7 | ✅ Code complete | 2 |
| **4** | Security compliance | Dev M3 · PDF §8 | ✅ Code complete | 2, 3 |
| **5** | B2B staff requests (persist + admin) | Dev M1 form · PDF §6.2 | ✅ Code complete | 2 |
| **6** | Assignments | Dev M4/M5 · PDF §9–10 | ✅ Code complete | 2 |
| **7** | Time tracking | Dev M4 · PDF §9 | ✅ Code complete | 6 |
| **8** | Invoicing | Dev M4/M5 · PDF §9 | ✅ Code complete | 7 |
| **9** | Admin operations & exports | Dev M5 · PDF §10 | ✅ Code complete | 3–8 |
| **10** | End-to-end workflow QA | Dev M6 · PDF §11 | ✅ Test script | 3–9 |
| **11** | Phase 2 — scheduling, notifications, payments | Dev M7 Phase 2 | ⬜ | 10 |
| **12** | Phase 3 — client portal, analytics | Dev M7 Phase 3 | ⬜ | 10 |

---

## Module 1 — Marketing website & lead capture 🟡

**Goal:** Public Dutch site that converts B2B and freelancer visitors; forms capture leads.

### Done ✅

- [x] Home, freelancers hub + subpages, bedrijven subpages, over H&B subpages
- [x] Contact page + form (optional email endpoint)
- [x] B2B personeel aanvragen form (11+ fields, validation, success state)
- [x] Freelancer direct aanmelden form (18+ fields, conditional security/hospitality)
- [x] Navigation restructure (Freelancers / Bedrijven / Over H&B)
- [x] Legacy URL redirects
- [x] SEO: sitemap, robots, JSON-LD, per-page meta
- [x] 404 page (Dutch)
- [x] Skip-to-content link
- [x] Juridisch pages (privacy, cookies, voorwaarden)
- [x] Nieuws + article pages
- [x] Footer structure (3 columns)
- [x] Primary CTA colours (#D35400 B2B, #2C5AA0 freelancer)

### Left ⬜

- [ ] Global **je/jij** tone pass on marketing pages (Rev §2 — B2B pages still use *u* in places)
- [ ] Remaining spelling fixes from Rev §2 (audit grep)
- [x] Cookie consent banner (Rev §17.5 — GDPR) — `CookieConsentBanner.jsx`
- [x] Google Analytics hook (Rev §17.5 — env-gated `VITE_GA_MEASUREMENT_ID`)
- [x] Company contact config via env (`src/content/company.js` — phone, KvK, BTW, WPBR)
- [ ] Brand video on homepage (Rev §15.1 — asset from client)
- [ ] CMS (planned in docs) — **out of scope unless client requests**

**Test (Module 1):** Browse all nav links · submit contact + B2B + freelancer forms · check mobile menu · validate SEO tags in view-source.

---

## Module 2 — Platform foundation 🔄

**Goal:** Firebase Auth with roles in **Firestore**, protected routes, **Firebase Storage** uploads. Works on **Spark (free) plan** — no Blaze billing.

### Done ✅

- [x] `src/firebase/config.js` — Auth, Firestore, Storage
- [x] Auth pages: login, register, forgot-password, pending
- [x] Branded dual-card login with Firebase email/password
- [x] `firestore.rules` + `storage.rules` — roles in Firestore (not custom claims)
- [x] Admin approve/reject via Firestore (`/admin/users`)
- [x] `DocumentUpload` → Firebase Storage
- [x] Portal + admin layouts
- [x] Real-time profile sync when admin approves (no re-login required)

### Deploy (Spark OK)

```powershell
firebase deploy --only firestore:rules,storage
```

**First admin (one-time):** Firebase Console → Firestore → `users/{your-uid}` → set `role: "admin"`, `accountStatus: "active"`.

### Removed (required Blaze plan)

- ~~Cloud Functions~~ (`setUserRole`, ImageKit signatures, `bootstrapAdmin`)
- ~~ImageKit~~ → replaced by Firebase Storage

**Test (Module 2):** See [Module 2 test steps](#module-2--test-steps) at bottom.

---

## Module 3 — Freelancer registration & onboarding ✅

**Goal:** Persist onboarding data; link to Firebase account; admin review queue.

### Done ✅

- [x] Firestore `onboardingApplications` collection + rules + indexes
- [x] Save direct-aanmelden form to Firestore (+ optional email)
- [x] Link application to `users/{uid}` when registered (same e-mail)
- [x] `/admin/onboarding` — list, filter, approve/reject, notes
- [x] `interestWithoutLicence` flag when diploma/pas not yet complete

### Left ⬜

- [ ] Optional 3-step wizard routes (`/auth/register` → work-type → compliance)
- [ ] Dedicated interest-without-licence marketing flow page

**Test (Module 3):** See test steps below.

---

## Module 3 — Test steps

1. **Submit aanmelding** — `/freelancers/direct-aanmelden` → success banner
2. **Firestore** — `onboardingApplications` doc with `status: pending`
3. **Register same e-mail** — `/auth/register` → user doc gets `onboardingApplicationId`, application gets `userId`
4. **Admin queue** — `/admin/onboarding` → see application, open Details, add notes
5. **Approve** — application `approved`; linked user becomes active freelancer (can open `/portal/dashboard`)
6. **Reject flow** — new test application → Afwijzen → linked user sees rejected pending page

```powershell
firebase deploy --only firestore:rules,firestore:indexes
```

---

## Module 4 — Security compliance ✅

**Goal:** License upload, number, expiry; statuses Pending / Approved / Expired.

### Done ✅

- [x] Compliance records on `users/{uid}/compliance/{type}` (number, expiry, status)
- [x] ImageKit uploads for VOG, diploma, pas, ID + optional BHV/SVH/HACCP
- [x] Pending freelancers can upload at `/auth/compliance` (before account approval)
- [x] Active freelancers at `/portal/compliance`
- [x] `/admin/compliance` — review queue, approve/reject, notes, manual expire
- [x] Expiry warning when approved doc is past date (admin marks expired manually)

**Test (Module 4):** See test steps below.

---

## Module 4 — Test steps

1. **Pending upload** — register → stay pending → `/auth/pending` → **Documenten uploaden** → submit VOG with expiry date
2. **Firestore** — `users/{uid}/compliance/vog` with `status: pending`
3. **Admin** — `/admin/compliance` → approve document
4. **Freelancer view** — `/auth/compliance` or `/portal/compliance` shows **Goedgekeurd**
5. **Reject/resubmit** — admin rejects with note → freelancer re-uploads
6. **Expiry** — set past expiry on approved doc → admin sees warning → **Markeer verlopen**

```powershell
firebase deploy --only firestore:rules,firestore:indexes
```

---

## Module 5 — B2B staff requests (persist) ✅

**Goal:** Personeel aanvragen stored in Firestore; admin can view.

### Done ✅

- [x] Firestore `staffRequests` collection + rules + indexes
- [x] `useCompanyStaffRequestSubmit` persists to Firestore, then optional email
- [x] `/admin/staff-requests` — list, filter, status workflow, notes

**Test (Module 5):** See test steps below.

---

## Module 5 — Test steps

1. **Submit B2B form** — `/bedrijven/personeel-aanvragen` → success banner
2. **Firestore** — `staffRequests` doc with `status: new`
3. **Admin** — `/admin/staff-requests` → **Oppakken** → status `in_progress`
4. **Close** — **Afgerond** → status `closed`
5. **Notes** — add internal notes in Details panel

```powershell
firebase deploy --only firestore:rules,firestore:indexes
```

---

## Module 6 — Assignments ✅

**Goal:** Admin creates assignments; assigns freelancers; portal shows jobs.

### Done ✅

- [x] Firestore `assignments` schema + rules + indexes
- [x] `/admin/assignments` — create, edit, delete, assign freelancers
- [x] `/portal/jobs` — list assigned jobs
- [x] `/portal/jobs/:id` — job detail

**Test (Module 6):** See test steps below.

---

## Module 6 — Test steps

1. **Ensure active freelancer** — approve a test user at `/admin/users`
2. **Create assignment** — `/admin/assignments` → fill form → **Opdracht aanmaken**
3. **Assign** — **Beheren** → check freelancer → **Toewijzing opslaan**
4. **Freelancer portal** — log in → `/portal/jobs` → see assignment
5. **Detail** — **Details bekijken** → full job info

```powershell
firebase deploy --only firestore:rules,firestore:indexes
```

---

## Module 7 — Time tracking ✅

**Goal:** Submit hours per assignment; status Draft → Submitted → Approved → Rejected.

### Todos

- [x] Firestore `timeEntries` schema — `src/constants/timeEntries.js`, `src/lib/timeEntries/entries.js`
- [x] `/portal/hours/new` + `/portal/hours` — create, edit draft, submit (`SubmitHours.jsx`, `PortalHours.jsx`)
- [x] `/admin/hours` — approve/reject (`AdminHours.jsx`)
- [x] Firestore rules + indexes for `timeEntries`
- [x] Link from job detail → `/portal/hours/new?assignmentId=`

**Test (Module 7):**

1. **Freelancer** — log in → `/portal/jobs` → open assignment → **Uren registreren**
2. **Draft** — fill date/times → **Opslaan als concept** → appears on `/portal/hours`
3. **Submit** — edit draft → **Indienen** → status *Ingediend*
4. **Admin** — `/admin/hours` → filter *Ingediend* → **Goedkeuren** or **Afwijzen**
5. **Freelancer** — `/portal/hours` shows updated status; rejected entries can be edited and resubmitted

```powershell
firebase deploy --only firestore:rules,firestore:indexes
```

---

## Module 8 — Invoicing ✅

**Goal:** Auto-generate from approved hours; PDF; Draft / Approved / Paid.

### Todos

- [x] Firestore `invoices` schema — `src/constants/invoices.js`, `src/lib/invoices/invoices.js`
- [x] Generation from approved uninvoiced hours (admin sets hourly rate)
- [x] `/portal/invoices` + `/admin/invoices`
- [x] PDF export via browser print (`src/lib/invoices/pdf.js`)
- [x] Firestore rules + indexes

**Test (Module 8):**

1. **Approve hours** — ensure freelancer has approved time entries (Module 7)
2. **Generate** — `/admin/invoices` → select freelancer → set rate → **Factuur genereren**
3. **Review** — concept appears in filter *Concept* → **PDF** preview
4. **Approve** — **Goedkeuren** → freelancer sees invoice at `/portal/invoices`
5. **Pay** — filter *Goedgekeurd* → **Betaald** → status updates both sides

```powershell
firebase deploy --only firestore:rules,firestore:indexes
```

---

## Module 9 — Admin operations & exports ✅

**Goal:** Dashboard KPIs; CSV/Excel export.

### Todos

- [x] `/admin/dashboard` — counts (pending users, hours, invoices, compliance, etc.)
- [x] Export users, hours, compliance, invoices to CSV — `src/lib/admin/csv.js`, `src/lib/admin/dashboard.js`

**Test (Module 9):**

1. **Dashboard** — `/admin/dashboard` → KPI cards match Firestore (e.g. pending user count vs `/admin/users`)
2. **Refresh** — **Vernieuwen** reloads counts after an action elsewhere
3. **CSV** — export each dataset → open in Excel; UTF-8, headers in Dutch
4. **Links** — KPI cards navigate to the relevant admin screen

---

## Module 10 — End-to-end workflow QA ✅

**Goal:** Full path from apply to paid invoice.

### Todos

- [x] Documented test script covering Dev Plan workflow steps 1–8 — `docs/E2E-WORKFLOW-TEST.md`
- [ ] Run script in your environment and note gaps (manual sign-off)

**Test (Module 10):** Walk through `docs/E2E-WORKFLOW-TEST.md` end-to-end; fix any gaps found during live QA.

---

## Revision doc checklist cross-reference

| Rev §18 item | Module |
|--------------|--------|
| 1–6 Critical (spelling, nav, tone, CTAs) | 1 |
| 7–12 High (colours, contact, login, 404) | 1, 2 |
| 13–18 Medium (vergunningen, footer, SEO, validation) | 1, 3, 4 |

---

## Module 2 — Test steps

**Prerequisites:** Firebase **Spark plan** · Email/Password auth enabled · Firestore + **Storage** enabled · `.env` filled · rules deployed

1. **Register** — `/auth/register` → success message
2. **Pending** — `/login` → `/auth/pending`
3. **First admin** — Firestore Console: set your user `role: admin`, `accountStatus: active`
4. **Admin** — `/admin/dashboard`, `/admin/users` → approve freelancer
5. **Freelancer** — portal opens (approval syncs live via Firestore listener)
6. **Upload** — `/portal/dashboard` → upload PDF → check Storage + Firestore `users/{uid}/documents`
7. **Forgot password** — `/auth/forgot-password`

```powershell
firebase deploy --only firestore:rules,storage
```

---

## Current focus

**Master gap list:** [`REMAINING-WORK.md`](./REMAINING-WORK.md) — pre-launch items, MVP gaps, Phase 2/3 implementation details.

**Client user manual (English + PDF):** [`HNB-PORTAL-USER-MANUAL-EN.md`](./HNB-PORTAL-USER-MANUAL-EN.md) · [`HNB-PORTAL-USER-MANUAL.pdf`](./HNB-PORTAL-USER-MANUAL.pdf) — regenerate with `npm run manual:pdf`

**Client user manual (Dutch):** [`HNB-PORTAL-USER-MANUAL.md`](./HNB-PORTAL-USER-MANUAL.md)

**Immediate:** Run [`E2E-WORKFLOW-TEST.md`](./E2E-WORKFLOW-TEST.md) · fill company `.env` · marketing copy polish.

---

*Last updated: 2026-05-30 · Update status checkboxes as modules ship.*
