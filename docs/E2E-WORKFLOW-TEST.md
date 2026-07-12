# End-to-end workflow test script

**Project:** H&B Service Group portal (`hnb-services` Firebase)  
**Purpose:** Verify the full MVP path from freelancer application to paid invoice.  
**Prerequisites:** Dev server running (`npm run dev`) · Firestore rules/indexes deployed · ImageKit env vars set · two test accounts (admin + freelancer)

---

## Setup (once)

1. **Firebase Console** — Email/Password auth enabled; Firestore `(default)` database active.
2. **`.env`** — `VITE_FIREBASE_*`, `VITE_IMAGEKIT_*`, `IMAGEKIT_PRIVATE_KEY` (dev middleware). Optional: `VITE_GA_MEASUREMENT_ID`, `VITE_COMPANY_PHONE`, `VITE_COMPANY_KVK`, `VITE_COMPANY_BTW`, `VITE_COMPANY_WPBR`.
3. **First admin** — register at `/auth/register`, then in Firestore set `users/{uid}`:
   - `role: "admin"`
   - `accountStatus: "active"`
4. **ImageKit check** — open `http://localhost:5173/api/imagekit-auth` → JSON with `token`, `signature`, `expire`.

---

## Step 1 — Freelancer applies

| # | Action | Expected |
|---|--------|----------|
| 1.1 | Open `/freelancers/direct-aanmelden` | Form loads |
| 1.2 | Submit complete application | Success message; doc in `onboardingApplications` with `status: pending` |
| 1.3 | Register at `/auth/register` with **same email** | Account created; redirected to `/auth/pending` |
| 1.4 | Check Firestore | Application linked: `userId` set on onboarding doc |

---

## Step 2 — H&B approves account

| # | Action | Expected |
|---|--------|----------|
| 2.1 | Admin → `/admin/onboarding` | Application visible (filter: In behandeling) |
| 2.2 | Approve application | Status `approved`; linked user `accountStatus: active`, `role: freelancer` |
| 2.3 | Freelancer refreshes or re-login | Portal accessible at `/portal/dashboard` (live sync via Firestore listener) |

**Alternate path:** `/admin/users` → approve pending user directly (without onboarding doc).

---

## Step 3 — Compliance (security / licenses)

| # | Action | Expected |
|---|--------|----------|
| 3.1 | Freelancer → `/portal/compliance` | Upload forms for required document types |
| 3.2 | Upload PDF/image (max 10 MB) | File in ImageKit; record in `users/{uid}/compliance/{type}` with `status: pending` |
| 3.3 | Admin → `/admin/compliance` | Record in queue |
| 3.4 | Approve each document | Status `approved`; freelancer sees updated status |

---

## Step 4 — H&B assigns freelancer to job

| # | Action | Expected |
|---|--------|----------|
| 4.1 | Admin → `/admin/assignments` | Create assignment (status assigned/open) |
| 4.2 | Assign freelancer | `assignedFreelancerIds` contains freelancer UID |
| 4.3 | Freelancer → `/portal/jobs` | Assignment listed |
| 4.4 | Open job detail | Full details; **Uren registreren** link visible |

---

## Step 5 — Freelancer submits hours

| # | Action | Expected |
|---|--------|----------|
| 5.1 | `/portal/hours/new` (or from job detail) | Form with assignment pre-selected |
| 5.2 | Save as concept | Entry in `/portal/hours` with status *Concept* |
| 5.3 | Edit → **Indienen** | Status *Ingediend*; not editable by freelancer |
| 5.4 | Firestore | `timeEntries` doc: `status: submitted`, `submittedAt` set |

---

## Step 6 — H&B approves hours

| # | Action | Expected |
|---|--------|----------|
| 6.1 | Admin → `/admin/hours` (filter: Ingediend) | Entry visible |
| 6.2 | **Goedkeuren** | Status `approved` |
| 6.3 | Freelancer → `/portal/hours` | Status *Goedgekeurd* |
| 6.4 | Admin dashboard | “Uren te beoordelen” count decreases |

---

## Step 7 — System generates invoice

| # | Action | Expected |
|---|--------|----------|
| 7.1 | Admin → `/admin/invoices` | Select freelancer; preview shows uninvoiced approved hours |
| 7.2 | Set hourly rate → **Factuur genereren** | Invoice `status: draft`; time entries get `invoiceId` |
| 7.3 | **PDF** | Print preview opens with line items and total |
| 7.4 | **Goedkeuren** | Invoice `status: approved` |
| 7.5 | Freelancer → `/portal/invoices` | Invoice visible; PDF downloadable |

---

## Step 8 — H&B processes payment

| # | Action | Expected |
|---|--------|----------|
| 8.1 | Admin → `/admin/invoices` (filter: Goedgekeurd) | Approved invoice listed |
| 8.2 | **Betaald** | Status `paid` |
| 8.3 | Freelancer → `/portal/invoices` | Status *Betaald* |
| 8.4 | Dashboard KPI | “Facturen openstaand” count decreases |

---

## B2B staff request (parallel path)

| # | Action | Expected |
|---|--------|----------|
| B.1 | `/bedrijven/personeel-aanvragen` | Hero CTA scrolls to `#b2b-request-form` (not page header) |
| B.2 | Submit form with multi-select staff types and locations | Success message; doc in `staffRequests` with `status: new` |
| B.3 | Select only **Adviesgesprek** | Advies panel shown; event fields optional |
| B.4 | Admin → `/admin/staff-requests` | Request visible; **Oppakken** / **Afgerond** do not overwrite `adminNotes` |

---

## Company portal (opdrachtgever)

| # | Action | Expected |
|---|--------|----------|
| C.1 | Company login → `/company/dashboard` | KPI tiles: open assignments, pending applications, assigned |
| C.2 | Create assignment → freelancer applies | Application visible on `/company/assignments` |
| C.3 | Select freelancer | Assignment shows selected freelancer |
| C.4 | **Uitloggen** (company layout or public navbar) | Redirect to `/` (homepage), not `/login` |

---

## Public UX & auth

| # | Action | Expected |
|---|--------|----------|
| U.1 | Logged-in user on public pages | Navbar shows **Mijn portaal** / **Bedrijfsportaal** + **Uitloggen** (no **Inloggen**) |
| U.2 | Logged-in user visits `/login` without `state.from` | Stays on login page or can browse public site (no forced redirect) |
| U.3 | Public pages | No site footer (legal pages still at `/juridisch/*`) |
| U.4 | `/admin/login` | **Wachtwoord vergeten?** links to `/auth/forgot-password` |

---

## Freelancer dashboard UX

| # | Action | Expected |
|---|--------|----------|
| F.1 | `/portal/dashboard` with incomplete compliance | Prominent compliance alert at top with link to `/portal/compliance` |
| F.2 | Dashboard tiles | Bold titles; stats where applicable (open opdrachten, uren, compliance) |

---

## Admin onboarding undo

| # | Action | Expected |
|---|--------|----------|
| O.1 | `/admin/onboarding` — approved application | **Terug naar in behandeling** restores `status: pending` |

---

## Invoice PDF

| # | Action | Expected |
|---|--------|----------|
| I.1 | Admin or freelancer → invoice **PDF** | Print dialog opens via hidden iframe (works with popup blockers) |

---

## Admin dashboard & exports

| # | Action | Expected |
|---|--------|----------|
| D.1 | `/admin/dashboard` | KPI cards match live Firestore counts |
| D.2 | Export each CSV | File downloads; opens correctly in Excel (UTF-8) |
| D.3 | **Vernieuwen** | Counts update after workflow actions |

---

## Known MVP limitations (not bugs)

- **Payments:** manual only — no Mollie/Stripe integration (Phase 2).
- **PDF:** browser print dialog, not stored server-side.
- **Hourly rate:** set at invoice generation, not parsed from assignment `rateNote`.
- **Notifications:** no email on approve/reject (except existing form notification emails).
- **ImageKit:** required for compliance uploads (no Firebase Storage on Spark plan).

---

## Sign-off checklist

- [ ] Steps 1–8 completed without console errors
- [ ] B2B form scroll anchor and multi-select validation work
- [ ] Company selection flow (C.1–C.4) verified if company accounts exist
- [ ] Public navbar auth state (U.1–U.4) correct
- [ ] Freelancer compliance alert (F.1) when documents incomplete
- [ ] Firestore data consistent at each step
- [ ] Freelancer cannot access admin routes
- [ ] Pending freelancer cannot access portal routes
- [ ] CSV exports contain expected rows
- [ ] Dashboard KPIs match manual counts

**Tested by:** _______________  
**Date:** _______________  
**Environment:** local / staging / production  
**Notes:**

---

*Aligned with `docs/MODULE-BUILD-PLAN.md` Module 10 · Core workflow from Website plan 2.0 §11*
