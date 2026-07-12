# HNB Portal — User Manual

**H&B Service Group**  
**Version 1.1 · May 2026**

This manual walks you through the H&B portal step by step. Follow the steps in order to understand how the system works and to test every major function — from company job posting and freelancer applications to hours and invoices.

**How to read UI labels:** The website and portal are in Dutch. Throughout this manual, on-screen text appears as **Dutch (English translation)**.

---

## Contents

1. [Before you start](#1-before-you-start)
2. [Understanding user roles](#2-understanding-user-roles)
3. [Part I — Public website (no login)](#part-i--public-website-no-login)
4. [Part II — Freelancer: from sign-up to paid invoice](#part-ii--freelancer-from-sign-up-to-paid-invoice)
5. [Part III — Company (client): post jobs and select freelancers](#part-iii--company-client-post-jobs-and-select-freelancers)
6. [Part IV — Administrator: managing the portal](#part-iv--administrator-managing-the-portal)
7. [Part V — Complete end-to-end test (recommended order)](#part-v--complete-end-to-end-test-recommended-order)
8. [Quick reference](#8-quick-reference)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Before you start

### What you need

- A modern web browser (Chrome, Edge, Firefox, or Safari)
- Valid email addresses for each test user (freelancer, company, administrator)
- For administrators: access to **Firebase Console** (one-time setup only)

### What this portal includes (version 1.1)

| Area | What you can do |
|------|-----------------|
| Public website | Read information, submit contact form, request staff, apply as freelancer |
| **Company portal** | Register as client, post open assignments, review applications, select a freelancer |
| Freelancer portal | Browse open jobs, apply, upload compliance, view assigned jobs, submit hours, view invoices |
| Admin portal | Approve users (freelancer + company), review applications, oversee assignments, approve hours, create invoices |

### What is not included yet

- Online payment (invoices are marked **Betaald** (Paid) manually by admin)
- Automatic email when something is approved or rejected
- Multi-freelancer selection per assignment (one freelancer per job for now)
- Shift scheduling / roster planning (Phase 2)

### Mobile use

All portals (company, freelancer, admin) use a **hamburger menu (☰)** on small screens. Tap it to open navigation, email, and log out.

---

## 2. Understanding user roles

| Role | Who | Login URL | After login you go to |
|------|-----|-----------|------------------------|
| Visitor | Anyone on the public website | — | No login — stay on marketing pages |
| Freelancer (pending) | Registered but not yet approved | `/login` (freelancer card) | `/auth/pending` |
| Freelancer (active) | Approved by H&B | `/login` (freelancer card) | `/portal/dashboard` |
| **Company (client)** | Approved opdrachtgever | `/login` (opdrachtgever card) | `/company/dashboard` |
| Administrator | H&B staff with admin rights | **`/admin/login`** (not linked on public site) | `/admin/dashboard` |

---

## Part I — Public website (no login)

Use these steps to test the public-facing website.

### Step 1 — Open the website

1. Open the H&B website in your browser.
2. The home page loads at `/`.
3. On first visit, a **cookie banner** appears at the bottom of the screen.

### Step 2 — Accept or decline cookies

1. Read the cookie message.
2. Click **Alleen noodzakelijk** (Essential only) **or** **Alles accepteren** (Accept all).
3. For more detail: footer → **Cookiebeleid** — `/juridisch/cookies`.

### Step 3 — Browse the website

1. Use the top menu: **Freelancers**, **Bedrijven** (Companies), **Over H&B** (About H&B).
2. On mobile, open the **☰ menu** and check navigation works.

### Step 4 — Submit a contact message (optional)

1. Go to **Contact** — `/contact`.
2. Fill in and send the form.
3. Confirm the success message.

### Step 5 — Submit a B2B staff request (without account)

1. Go to **Bedrijven** → **Personeel aanvragen** — `/bedrijven/personeel-aanvragen`.
2. Fill in all required fields and privacy consent.
3. Click **Aanvraag versturen** (Submit request).
4. Admin reviews this at `/admin/staff-requests` (Part IV, Step 24).

### Step 6 — Submit a freelancer application form (optional)

1. Go to **Freelancers** → **Direct aanmelden** — `/freelancers/direct-aanmelden`.
2. Complete and submit the form.
3. Use the **same email** when registering in Part II.

---

## Part II — Freelancer: from sign-up to paid invoice

Follow every step with a **freelancer test account**.

### Section A — Create account and wait for approval

#### Step 7 — Create a portal login

1. Go to **Inloggen** — `/login`.
2. Use the **Ik ben freelancer** (I am a freelancer) card only (fields are separate from the company card).
3. Click **Nog geen account? Account aanmaken →** or open `/auth/register`.
4. Enter name, email, password (min. 8 characters), confirm password.
5. Click **Account aanmaken** (Create account).
6. Account status: **in behandeling** (pending).

#### Step 8 — View the pending screen

1. Redirect to `/auth/pending`.
2. Page explains H&B must approve your account.

#### Step 9 — Upload compliance documents (while pending)

1. Click **Documenten uploaden** — `/auth/compliance`.
2. Upload required documents (PDF/image, max ~10 MB):

   | Document | When needed |
   |----------|-------------|
   | **VOG** | Always |
   | **Identiteitsbewijs** (ID) | Always |
   | **Diploma Beveiliger 2+** | Security |
   | **Grijze pas** (WPBR) | Security |
   | **BHV** / **SVH** / **HACCP** | If applicable |

3. Submit each document. Status: **In behandeling** (Pending).

#### Step 10 — Wait for H&B approval

1. Administrator approves onboarding and/or user account (Part IV, Steps 25–27).
2. Portal opens automatically in most cases; otherwise log out and log in again at `/login`.

---

### Section B — Use the freelancer portal (after approval)

**Requirement:** Account status **active**, role **freelancer**.

#### Step 11 — Explore the dashboard

1. Confirm `/portal/dashboard` after login.
2. Use quick links: **Open opdrachten**, **Mijn opdrachten**, **Uren**, **Facturen**, **Compliance**.

#### Step 12 — Review compliance status

1. Click **Compliance** — `/portal/compliance`.
2. Review document statuses; re-upload if **Afgewezen** (Rejected).

#### Step 13 — Browse open assignments and apply

1. Click **Open opdrachten** — `/portal/feed`.
2. Read open jobs posted by companies (status **Open**).
3. Click **Meer info** (More info) for details.
4. Optionally add a short motivation, then click **Solliciteren** (Apply).
5. Status on the card becomes **In behandeling** (Pending) — waiting for company selection.
6. If already applied, the card shows your application status.

#### Step 14 — View assigned jobs (after company selects you)

1. Click **Mijn opdrachten** (My assignments) — `/portal/jobs`.
2. **Empty list?** Either no company has selected you yet, or admin assigned you via legacy flow.
3. After selection, the job appears here with status **Toegewezen** (Assigned).
4. Click **Details bekijken** — `/portal/jobs/{id}`.
5. Click **Uren registreren** to open hours form with assignment pre-selected.

#### Step 15 — Register hours as a draft

1. Go to **Uren** — `/portal/hours` or `/portal/hours/new`.
2. Select **Opdracht**, date, start/end time, break minutes.
3. Click **Opslaan als concept** (Save as draft). Status: **Concept** (Draft).

#### Step 16 — Submit hours for approval

1. On `/portal/hours`, click **Bewerken** (Edit) on a draft.
2. Click **Indienen ter goedkeuring** (Submit for approval). Status: **Ingediend** (Submitted).

#### Step 17 — Wait for hours approval

1. Admin approves (Part IV, Step 30). Refresh `/portal/hours` for **Goedgekeurd** (Approved).

#### Step 18 — View and download invoices

1. Click **Facturen** — `/portal/invoices`.
2. Only **Goedgekeurd** and **Betaald** invoices appear.
3. Click **PDF** → browser print → Save as PDF.

#### Step 19 — Log out

1. Click **Uitloggen** (Log out). On mobile: open **☰ menu** first.

---

## Part III — Company (client): post jobs and select freelancers

Use a **company test account**. Company accounts must be approved by H&B admin before login works.

### Section A — Register and get approved

#### Step 20 — Register a company account

1. Go to `/login` → **Ik ben opdrachtgever** (I am a client) card, or `/auth/register/company`.
2. Enter company name, contact name, email, password.
3. Click register. Status: **in behandeling** (pending).

#### Step 21 — Admin approves company account

1. Admin opens `/admin/users` (Part IV, Step 26).
2. Finds pending company user, clicks **Goedkeuren** (Approve).
3. Firestore user gets `role: company` and `accountStatus: active`.

#### Step 22 — Log in to the company portal

1. Go to `/login`.
2. Use the **Ik ben opdrachtgever** card (separate email/password fields from freelancer).
3. Click **Inloggen als opdrachtgever** (Log in as client).
4. Redirect to `/company/dashboard`.

---

### Section B — Post an assignment and select a freelancer

#### Step 23 — Open assignments

1. Click **Opdrachten** (Assignments) — `/company/assignments`, or use dashboard link.
2. On mobile, open **☰ menu** if navigation is hidden.

#### Step 24 — Create a new assignment

1. Click **Nieuwe opdracht** (New assignment).
2. Fill in title, type, location, dates, optional shift times, rate note.
3. Set status to **Open (zichtbaar voor freelancers)** — required for freelancer feed.
4. Click **Opdracht plaatsen** (Post assignment).
5. Assignment appears in the list. Click **Annuleren** to close the form without saving.

#### Step 25 — Wait for applications

1. Freelancer applies via `/portal/feed` (Part II, Step 13).
2. On your assignment row, click **Beheren** (Manage).
3. Scroll to **Sollicitaties** (Applications). Each row shows freelancer name, email, motivation, status.

#### Step 26 — Select a freelancer

1. In **Sollicitaties**, click **Selecteren** (Select) on the desired applicant.
2. Assignment status becomes **Toegewezen** (Assigned).
3. Selected freelancer sees the job under **Mijn opdrachten**; other pending applications become **Afgewezen** (Rejected).
4. Assigned jobs can no longer be edited or deleted.

#### Step 27 — Log out

1. Click **Uitloggen** in the company header (or via **☰ menu** on mobile).

---

## Part IV — Administrator: managing the portal

Use an **administrator account**. Admins log in at a **separate URL** — there is no admin link on the public website.

### Section A — First-time administrator setup

#### Step 28 — Create the first admin account

1. Register via `/auth/register` (freelancer registration path).
2. Account starts as **in behandeling** (pending).

#### Step 29 — Promote the account in Firebase

1. Firebase Console → **hnb-services** → Firestore → **users** → your UID document.
2. Set `role` → `"admin"` and `accountStatus` → `"active"`.
3. Save.

#### Step 30 — Log in to the admin portal

1. Open **`/admin/login`** directly in the browser (bookmark this URL).
2. Enter admin email and password only — **no registration or forgot-password links** on this page.
3. Non-admin accounts are rejected with an error message.
4. Redirect to `/admin/dashboard`.
5. After logout, you return to `/admin/login`.

---

### Section B — Daily admin tasks

#### Step 31 — Review the dashboard

1. On `/admin/dashboard`, read KPI numbers.
2. Click **Vernieuwen** (Refresh).
3. Click KPI cards to jump to related screens.
4. Use CSV export buttons at the bottom.

#### Step 32 — Handle a B2B staff request

1. **Aanvragen** — `/admin/staff-requests`.
2. Filter **Nieuw** (New) → **Details** → **Oppakken** → notes → **Afgerond**.

#### Step 33 — Review freelancer onboarding

1. **Onboarding** — `/admin/onboarding`.
2. Filter **In behandeling** → **Details** → **Goedkeuren** or **Afwijzen**.

#### Step 34 — Approve pending users (freelancer or company)

1. **Gebruikers** — `/admin/users`.
2. **Goedkeuren** sets role from `intendedRole` (freelancer or company).
3. Company users can then log in at `/login` (opdrachtgever card).

#### Step 35 — Review compliance documents

1. **Compliance** — `/admin/compliance`.
2. **Details** → verify file → **Goedkeuren**, **Afwijzen**, or **Markeer verlopen**.

#### Step 36 — Oversee assignments (read-only)

1. **Opdrachten** — `/admin/assignments`.
2. View all assignments posted by companies. **Admin cannot create or assign jobs here** — companies manage their own opdrachten.
3. Use **Beheren** to view details and assigned freelancers.

#### Step 37 — Approve submitted hours

1. **Uren** — `/admin/hours`.
2. Filter **Ingediend** → **Details** → **Goedkeuren** or **Afwijzen**.

#### Step 38 — Generate and approve invoices

1. **Facturen** — `/admin/invoices`.
2. Select freelancer, set hourly rate, **Factuur genereren**.
3. Filter **Concept** → **Details** → **PDF** → **Goedkeuren**.
4. After payment: **Betaald** (Paid).

#### Step 39 — Export data and log out

1. Dashboard CSV exports (users, hours, compliance, invoices).
2. **Uitloggen** → returns to `/admin/login`.

---

## Part V — Complete end-to-end test (recommended order)

Use **three browsers** (or profiles): company, freelancer, admin.

| Step | Who | Action | Verify |
|------|-----|--------|--------|
| 1 | Visitor | Part I: B2B staff request (optional) | Admin: request **Nieuw** |
| 2 | Company | Steps 20–21: register company; admin approves | Company can log in |
| 3 | Freelancer | Part II Steps 7–10: register, compliance | Admin: pending user + compliance |
| 4 | Admin | Steps 28–30: admin access | Dashboard loads |
| 5 | Admin | Steps 33–35: approve freelancer + compliance | Freelancer → dashboard |
| 6 | Company | Steps 24–25: post **Open** assignment | Freelancer sees it on `/portal/feed` |
| 7 | Freelancer | Step 13: **Solliciteren** | Company sees application |
| 8 | Company | Step 26: **Selecteren** | Job on freelancer `/portal/jobs` |
| 9 | Freelancer | Steps 15–16: submit hours | Admin: **Ingediend** |
| 10 | Admin | Step 37: approve hours | Freelancer: **Goedgekeurd** |
| 11 | Admin | Step 38: invoice generate + approve | Freelancer sees invoice |
| 12 | Admin | Step 38: mark **Betaald** | Freelancer: paid status |
| 13 | All | Log out / log in on each portal | Correct login URLs work |

**Pass criteria:** No console errors; statuses match Quick Reference; freelancers cannot open `/admin/*`; company cannot open `/portal/*`; pending users only see pending + compliance pages.

---

## 8. Quick reference

### Main URLs

| Purpose | URL |
|---------|-----|
| Log in (freelancer or company) | `/login` |
| Register freelancer | `/auth/register` |
| Register company | `/auth/register/company` |
| **Admin log in** | **`/admin/login`** |
| Forgot password | `/auth/forgot-password` (not on admin login) |
| Account pending | `/auth/pending` |
| Compliance (pending user) | `/auth/compliance` |
| Freelancer dashboard | `/portal/dashboard` |
| **Open assignments feed** | **`/portal/feed`** |
| **Assigned jobs** | **`/portal/jobs`** |
| Register hours | `/portal/hours/new` |
| Freelancer hours | `/portal/hours` |
| Freelancer invoices | `/portal/invoices` |
| **Company dashboard** | **`/company/dashboard`** |
| **Company assignments** | **`/company/assignments`** |
| Admin dashboard | `/admin/dashboard` |
| Staff requests | `/admin/staff-requests` |
| Users | `/admin/users` |
| Onboarding | `/admin/onboarding` |
| Assignments (read-only) | `/admin/assignments` |
| Hours | `/admin/hours` |
| Invoices | `/admin/invoices` |
| Compliance | `/admin/compliance` |

### Portal menus

**Freelancer:** Dashboard · Open opdrachten · Compliance · Mijn opdrachten · Uren · Facturen

**Company:** Dashboard · Opdrachten

**Admin:** Dashboard · Aanvragen · Gebruikers · Onboarding · Opdrachten · Uren · Facturen · Compliance

### Assignment statuses

| Status | Meaning |
|--------|---------|
| **Concept** (Draft) | Not visible in freelancer feed |
| **Open** | Visible on `/portal/feed`; accepts applications |
| **Toegewezen** (Assigned) | Freelancer selected; no more edits by company |
| **Afgerond** / **Geannuleerd** | Completed / cancelled |

### Application statuses (company selection)

| Status | Meaning |
|--------|---------|
| **In behandeling** (Pending) | Awaiting company decision |
| **Geaccepteerd** (Accepted) | Selected — job moves to freelancer **Mijn opdrachten** |
| **Afgewezen** (Rejected) | Not selected |

---

## 9. Troubleshooting

| Problem | What to check |
|---------|----------------|
| Cannot log in as freelancer/company | Use correct card on `/login`; account **active** in Firestore |
| Cannot log in as admin | Use **`/admin/login`**, not `/login`; `role: admin`, `accountStatus: active` |
| Admin URL shows 404 on production | Redeploy with `vercel.json` SPA rewrite; hard refresh |
| Stuck on pending | Admin approves at **Gebruikers** or **Onboarding** |
| No jobs on `/portal/feed` | Company must post assignment with status **Open** |
| Apply fails | Freelancer must be **active**; assignment still **Open**; Firebase UID must match `users/{uid}` |
| No jobs on `/portal/jobs` | Company must **Selecteren** a freelancer, or admin legacy assign |
| Company cannot edit assignment | Status **Toegewezen** — editing locked after selection |
| Upload fails | PDF/image; max ~10 MB; ImageKit configured |
| Mobile menu missing items | Tap **☰** in portal header |
| No invoice in freelancer portal | Admin must **Goedkeuren** invoice — drafts are admin-only |

---

## Appendix — Printable test checklist

| ✓ | Step | Done |
|---|------|------|
| ☐ | 1. Website + cookie banner | |
| ☐ | 2. Company registered + admin approved | |
| ☐ | 3. Freelancer registered + admin approved | |
| ☐ | 4. Compliance uploaded + approved | |
| ☐ | 5. Company posts **Open** assignment | |
| ☐ | 6. Freelancer applies on `/portal/feed` | |
| ☐ | 7. Company selects freelancer | |
| ☐ | 8. Job visible on `/portal/jobs` | |
| ☐ | 9. Hours submitted + approved | |
| ☐ | 10. Invoice generated + approved + paid | |
| ☐ | 11. Admin login at `/admin/login` | |
| ☐ | 12. Mobile ☰ menu on all portals | |

---

**H&B Service Group — HNB Portal User Manual v1.1**

*Regenerate PDF: `npm run manual:pdf`*
