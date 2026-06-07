# HNB Portal — User Manual

**H&B Service Group**  
**Version 1.0 · May 2026**

This manual walks you through the H&B portal step by step. Follow the steps in order to understand how the system works and to test every major function from registration to paid invoice.

**How to read UI labels:** The website and portal are in Dutch. Throughout this manual, on-screen text appears as **Dutch (English translation)**.

---

## Contents

1. [Before you start](#1-before-you-start)
2. [Understanding user roles](#2-understanding-user-roles)
3. [Part I — Public website (no login)](#part-i--public-website-no-login)
4. [Part II — Freelancer: from sign-up to paid invoice](#part-ii--freelancer-from-sign-up-to-paid-invoice)
5. [Part III — Administrator: managing the portal](#part-iii--administrator-managing-the-portal)
6. [Part IV — Complete end-to-end test (recommended order)](#part-iv--complete-end-to-end-test-recommended-order)
7. [Quick reference](#7-quick-reference)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Before you start

### What you need

- A modern web browser (Chrome, Edge, Firefox, or Safari)
- A valid email address for each test user (freelancer and administrator)
- For administrators: access to **Firebase Console** (one-time setup only)

### What this portal includes (version 1.0)

| Area | What you can do |
|------|-----------------|
| Public website | Read information, submit contact form, request staff, apply as freelancer |
| Freelancer portal | Upload compliance documents, view assignments, submit hours, view invoices |
| Admin portal | Approve users, review applications, assign jobs, approve hours, create invoices |

### What is not included yet

- Online payment (invoices are marked **Betaald** (Paid) manually by admin)
- Automatic email when something is approved or rejected
- Separate login for B2B client companies

---

## 2. Understanding user roles

| Role | Who | After login you go to |
|------|-----|------------------------|
| Visitor | Anyone on the public website | No login — stay on marketing pages |
| Freelancer (pending) | Registered but not yet approved | `/auth/pending` |
| Freelancer (active) | Approved by H&B | `/portal/dashboard` |
| Administrator | H&B staff with admin rights | `/admin/dashboard` |

---

## Part I — Public website (no login)

Use these steps to test the public-facing website.

### Step 1 — Open the website

1. Open the H&B website in your browser.
2. The home page loads at `/`.
3. On first visit, a **cookie banner** appears at the bottom of the screen.

### Step 2 — Accept or decline cookies

1. Read the cookie message.
2. Click **Alleen noodzakelijk** (Essential only) to allow only required cookies, **or**
3. Click **Alles accepteren** (Accept all) to also allow analytics (if configured).
4. For more detail, open **Cookiebeleid** (Cookie policy) from the footer: `/juridisch/cookies`.

### Step 3 — Browse the website

1. Use the top menu: **Freelancers**, **Bedrijven** (Companies), **Over H&B** (About H&B).
2. Open any page and confirm content loads correctly.
3. On mobile, open the menu icon and check navigation works.

### Step 4 — Submit a contact message (optional)

1. Go to **Contact** — `/contact`.
2. Fill in name, email, subject, and message.
3. Click **Bericht verzenden** (Send message).
4. Confirm the success message appears.

### Step 5 — Submit a B2B staff request

1. Go to **Bedrijven** (Companies) → **Personeel aanvragen** (Request staff) — `/bedrijven/personeel-aanvragen`.
2. Fill in all required fields:
   - Company name and contact person
   - Email and phone
   - Staff type and event type
   - Location, dates, number of workers
3. Check the **privacyverklaring** (privacy statement) box.
4. Click **Aanvraag versturen** (Submit request).
5. Confirm the success message. The request is saved for H&B admin review (Part III, Step 22).

### Step 6 — Submit a freelancer application form (optional at this stage)

1. Go to **Freelancers** → **Direct aanmelden** (Register directly) — `/freelancers/direct-aanmelden`.
2. Complete the full application form (personal details, domains, certifications).
3. Accept privacy consent and submit.
4. Note the email address you used — you will need the same email in Part II.

---

## Part II — Freelancer: from sign-up to paid invoice

Follow every step below with a **freelancer test account**. Use a new email address that is not already in the system.

---

### Section A — Create account and wait for approval

#### Step 7 — Create a portal login

1. Go to **Inloggen** (Log in) — `/login`.
2. Click **Nog geen account? Account aanmaken →** (Create account), or open `/auth/register` directly.
3. Enter your **name**, **email**, and **password** (minimum 8 characters).
4. Confirm the password.
5. Click **Account aanmaken** (Create account).
6. You see a message that your account is **in behandeling** (pending).

#### Step 8 — View the pending screen

1. You are redirected to `/auth/pending`.
2. The page explains that H&B must approve your account before you can use the full portal.
3. You remain logged in as your email address.

#### Step 9 — Upload compliance documents (while pending)

1. On the pending page, click **Documenten uploaden** (Upload documents), or go to `/auth/compliance`.
2. For each required document type, upload a PDF or image (maximum about 10 MB):

   | Document on screen | When needed |
   |--------------------|-------------|
   | **VOG** (Certificate of conduct) | Always |
   | **Identiteitsbewijs** (ID document) | Always |
   | **Diploma Beveiliger 2+** | Security work |
   | **Grijze pas** (WPBR grey pass) | Security work |
   | **BHV-certificaat** (First aid) | If applicable |
   | **SVH** / **HACCP** | Hospitality work |

3. Enter document number and expiry date where the form asks for them.
4. Submit each document. Status shows **In behandeling** (Pending) until admin approves.
5. Repeat for all documents you need to upload.

#### Step 10 — Wait for H&B approval

1. Stay on `/auth/pending` or log out and log in again later.
2. An administrator must approve your onboarding application and/or your user account (Part III, Steps 18–21).
3. When approved, the portal opens automatically in most cases. If not, click **Uitloggen** (Log out), then log in again at `/login`.

---

### Section B — Use the freelancer portal (after approval)

**Requirement:** Your account status must be **active**. You should land on `/portal/dashboard`.

#### Step 11 — Explore the dashboard

1. After login, confirm you are on `/portal/dashboard`.
2. Read the welcome message and summary.
3. Use the quick-link cards to jump to **Opdrachten** (Assignments), **Uren** (Hours), **Facturen** (Invoices), or **Compliance**.
4. Check the compliance summary (how many core documents are approved).

#### Step 12 — Review compliance status

1. Click **Compliance** in the top menu — `/portal/compliance`.
2. Review each document: **In behandeling** (Pending), **Goedgekeurd** (Approved), **Afgewezen** (Rejected), or **Verlopen** (Expired).
3. If a document was **Afgewezen** (Rejected), upload a corrected file again.

#### Step 13 — View your assignments

1. Click **Opdrachten** (Assignments) — `/portal/jobs`.
2. If the list is empty, an administrator must assign you to a job first (Part III, Steps 26–29). Wait and refresh.
3. When assignments appear, read title, location, dates, and status.
4. Click **Details bekijken** (View details) on one assignment — `/portal/jobs/{id}`.
5. Read the full job description, shift times, and client information.
6. Click **Uren registreren** (Register hours) to open the hours form with this assignment pre-selected.

#### Step 14 — Register hours as a draft

1. Go to **Uren** (Hours) — `/portal/hours`, or use the link from Step 13.
2. Click **Uren registreren** (Register hours) — `/portal/hours/new`.
3. Select an **Opdracht** (Assignment) from the dropdown.
4. Enter **work date**, **start time**, **end time**, and **break minutes** if applicable.
5. Add optional notes.
6. Check the calculated total hours preview.
7. Click **Opslaan als concept** (Save as draft).
8. You return to `/portal/hours`. The entry shows status **Concept** (Draft).

#### Step 15 — Edit and submit hours for approval

1. On `/portal/hours`, find your draft entry.
2. Click **Bewerken** (Edit).
3. Correct any details if needed.
4. Click **Indienen ter goedkeuring** (Submit for approval).
5. Status changes to **Ingediend** (Submitted). You can no longer edit this entry.
6. The summary at the top shows hours **in behandeling** (pending approval).

#### Step 16 — Wait for hours approval

1. An administrator reviews your hours (Part III, Steps 30–32).
2. Refresh `/portal/hours`. Status should become **Goedgekeurd** (Approved) or **Afgewezen** (Rejected).
3. If **Afgewezen** (Rejected), click **Bewerken** (Edit), fix the entry, and submit again.

#### Step 17 — View and download invoices

1. Click **Facturen** (Invoices) — `/portal/invoices`.
2. Only **Goedgekeurd** (Approved) and **Betaald** (Paid) invoices appear here (not drafts).
3. Read invoice number, period, hours, amount, and status.
4. Click **PDF** on a row. Your browser print dialog opens.
5. Choose **Save as PDF** or print. The invoice is generated from your browser — it is not stored as a separate file on a server.

#### Step 18 — Log out as freelancer

1. Click **Uitloggen** (Log out) in the top-right of the portal header.
2. You return to the public site or login page.

---

## Part III — Administrator: managing the portal

Follow these steps with an **administrator account**. If no admin exists yet, complete Steps 19–20 first.

---

### Section A — First-time administrator setup

#### Step 19 — Create the first admin account

1. Open `/auth/register` in your browser.
2. Register with the email that will become the administrator.
3. Note: the account starts as **in behandeling** (pending).

#### Step 20 — Promote the account in Firebase

1. Open [Firebase Console](https://console.firebase.google.com) for project **hnb-services**.
2. Go to **Firestore Database** → collection **users**.
3. Find the document whose ID matches your user ID (same as Firebase Auth UID).
4. Edit the document and set:
   - `role` → `"admin"`
   - `accountStatus` → `"active"`
5. Save the document.

#### Step 21 — Log in to the admin portal

1. Go to `/login`.
2. Enter admin email and password.
3. Click **Inloggen als freelancer** (Log in as freelancer) — admins use the same login form.
4. You are redirected to `/admin/dashboard`.

---

### Section B — Daily admin tasks (step by step)

#### Step 22 — Review the dashboard

1. On `/admin/dashboard`, read the KPI numbers (pending users, open onboarding, new requests, hours to review, etc.).
2. Click **Vernieuwen** (Refresh) to update counts.
3. Click any KPI card to jump to the related screen.

#### Step 23 — Handle a B2B staff request

1. Click **Aanvragen** (Requests) — `/admin/staff-requests`.
2. Set filter to **Nieuw** (New).
3. Find the request from Part I, Step 5.
4. Click **Details** to read company and event information.
5. Click **Oppakken** (Take on). Status becomes **In behandeling** (In progress).
6. Add **interne notities** (internal notes) in the detail panel if needed.
7. When finished, click **Afgerond** (Closed).

#### Step 24 — Review a freelancer onboarding application

1. Click **Onboarding** — `/admin/onboarding`.
2. Set filter to **In behandeling** (Pending).
3. Find the application from Part I, Step 6 or Part II.
4. Click **Details** and review all submitted information.
5. Add internal notes if needed.
6. Click **Goedkeuren** (Approve) to accept the application and activate the linked user account, **or** click **Afwijzen** (Reject) to decline.

#### Step 25 — Approve a pending user account (alternative)

1. Click **Gebruikers** (Users) — `/admin/users`.
2. Find users with status **in behandeling** (pending).
3. Click **Goedkeuren** (Approve) to activate as freelancer, or **Afwijzen** (Reject).
4. The freelancer’s session updates live — they usually do not need to log in again.

#### Step 26 — Review compliance documents

1. Click **Compliance** — `/admin/compliance`.
2. Set filter to **In behandeling** (Pending).
3. Open **Details** on a document.
4. Open the file link and verify the upload.
5. Click **Goedkeuren** (Approve) with optional notes, **Afwijzen** (Reject) with feedback, or **Markeer verlopen** (Mark expired) for expired documents.
6. The freelancer sees the updated status on `/portal/compliance` or `/auth/compliance`.

#### Step 27 — Create a new assignment

1. Click **Opdrachten** (Assignments) — `/admin/assignments`.
2. In the **Nieuwe opdracht** (New assignment) form, enter:
   - Title and assignment type
   - Location and date range
   - Optional shift times and rate note
   - Optional client company name
3. Click **Opdracht aanmaken** (Create assignment).
4. The new assignment appears in the list below.

#### Step 28 — Assign a freelancer to the job

1. On the same page, find the assignment you created.
2. Click **Beheren** (Manage) on that row.
3. In the detail panel, check one or more active freelancers.
4. Click **Toewijzing opslaan** (Save assignment).
5. The freelancer now sees the job on `/portal/jobs` (Part II, Step 13).

#### Step 29 — Approve submitted hours

1. Click **Uren** (Hours) — `/admin/hours`.
2. Set filter to **Ingediend** (Submitted).
3. Open **Details** on an entry from Part II, Step 15.
4. Verify date, times, assignment, and total hours.
5. Click **Goedkeuren** (Approve) with optional internal notes, or **Afwijzen** (Reject) with feedback.
6. Confirm the freelancer sees the new status on `/portal/hours`.

#### Step 30 — Generate an invoice from approved hours

1. Click **Facturen** (Invoices) — `/admin/invoices`.
2. In **Nieuwe factuur genereren** (Generate new invoice):
   - Select the **Freelancer** from the dropdown.
   - The screen shows how many approved, uninvoiced hours are available.
   - Enter **Uurtarief (EUR)** (Hourly rate) — default is approximately €18.50.
   - Add an optional note for the invoice.
3. Click **Factuur genereren** (Generate invoice).
4. A draft invoice is created. Approved hours are linked so they cannot be invoiced twice.

#### Step 31 — Review and approve the invoice

1. Set the invoice filter to **Concept** (Draft).
2. Click **Details** and verify line items (dates, assignments, hours, amounts).
3. Click **PDF** to preview via the browser print dialog.
4. Click **Goedkeuren** (Approve).
5. The freelancer can now see the invoice on `/portal/invoices` (Part II, Step 17).

#### Step 32 — Mark the invoice as paid

1. After payment is processed outside the system (bank transfer, etc.), filter invoices by **Goedgekeurd** (Approved).
2. Open the invoice and click **Betaald** (Paid).
3. Status becomes **Betaald** (Paid) for both admin and freelancer.

#### Step 33 — Export data to CSV

1. Return to `/admin/dashboard`.
2. Click any export button:
   - **Gebruikers exporteren** (Export users)
   - **Uren exporteren** (Export hours)
   - **Compliance exporteren** (Export compliance)
   - **Facturen exporteren** (Export invoices)
3. A CSV file downloads. Open it in Excel (UTF-8 encoding).

#### Step 34 — Log out as administrator

1. Click **Uitloggen** (Log out) in the admin header.

---

## Part IV — Complete end-to-end test (recommended order)

Use this single numbered list to test the **entire portal** from start to finish. Use two browsers: one for the freelancer, one for the admin.

| Step | Who | Action | Verify |
|------|-----|--------|--------|
| 1 | Visitor | Part I, Steps 1–5: open site, cookies, B2B request | — |
| 2 | Freelancer | Part I, Step 6: submit application form | — |
| 3 | Freelancer | Part II, Steps 7–9: register, pending, upload compliance | Admin sees onboarding + compliance |
| 4 | Admin | Part III, Steps 19–21: ensure admin access | Dashboard loads |
| 5 | Admin | Steps 24–26: approve onboarding, user, compliance | Freelancer reaches dashboard |
| 6 | Admin | Steps 27–28: create assignment, assign freelancer | Job on `/portal/jobs` |
| 7 | Freelancer | Steps 14–15: save draft hours, submit | Admin sees **Ingediend** |
| 8 | Admin | Step 29: approve hours | Freelancer sees **Goedgekeurd** |
| 9 | Admin | Steps 30–31: generate and approve invoice | Freelancer sees invoice |
| 10 | Admin | Step 32: mark **Betaald** (Paid) | Freelancer sees paid status |
| 11 | Admin | Step 33: export CSV | File opens in Excel |
| 12 | Both | Log out and log in again | Sessions work correctly |

**Pass criteria:** No errors in the browser console; each status matches the Quick Reference below; freelancers cannot open `/admin/*`; pending users cannot open `/portal/*` except pending and compliance pages.

---

## 7. Quick reference

### Main URLs

| Purpose | URL |
|---------|-----|
| Log in | `/login` |
| Register | `/auth/register` |
| Forgot password | `/auth/forgot-password` |
| Account pending | `/auth/pending` |
| Upload documents (pending) | `/auth/compliance` |
| Freelancer dashboard | `/portal/dashboard` |
| Freelancer jobs | `/portal/jobs` |
| Register hours | `/portal/hours/new` |
| Freelancer hours list | `/portal/hours` |
| Freelancer invoices | `/portal/invoices` |
| Admin dashboard | `/admin/dashboard` |
| Staff requests | `/admin/staff-requests` |
| Users | `/admin/users` |
| Onboarding | `/admin/onboarding` |
| Assignments | `/admin/assignments` |
| Hours approval | `/admin/hours` |
| Invoices | `/admin/invoices` |
| Compliance review | `/admin/compliance` |
| Request staff (public) | `/bedrijven/personeel-aanvragen` |
| Freelancer application (public) | `/freelancers/direct-aanmelden` |

### Status labels on screen

| Dutch (English) | Used for |
|-----------------|----------|
| **In behandeling** (Pending / In progress) | Accounts, onboarding, compliance, requests |
| **Goedgekeurd** (Approved) | Compliance, hours, invoices |
| **Afgewezen** (Rejected) | Applications, compliance, hours |
| **Verlopen** (Expired) | Compliance documents |
| **Concept** (Draft) | Hours, invoices (admin only for invoices) |
| **Ingediend** (Submitted) | Hours awaiting review |
| **Betaald** (Paid) | Invoices |
| **Nieuw** (New) | B2B staff requests |
| **Afgerond** (Closed) | Completed staff requests |

### Freelancer portal menu

**Dashboard** · **Compliance** · **Opdrachten** (Assignments) · **Uren** (Hours) · **Facturen** (Invoices)

### Admin portal menu

**Dashboard** · **Aanvragen** (Requests) · **Gebruikers** (Users) · **Onboarding** · **Opdrachten** (Assignments) · **Uren** (Hours) · **Facturen** (Invoices) · **Compliance**

---

## 8. Troubleshooting

| Problem | What to check |
|---------|----------------|
| Cannot log in | Email/password correct; account approved (`accountStatus: active` in Firestore) |
| Stuck on pending page | Admin must approve at **Gebruikers** (Users) or **Onboarding** |
| No assignments visible | Admin must assign you at **Opdrachten** (Assignments) → **Beheren** (Manage) → **Toewijzing opslaan** (Save) |
| Upload fails | PDF or image only; max ~10 MB; ImageKit must be configured |
| Cannot submit hours | Select an assignment; end time after start time; only **Concept** or **Afgewezen** entries are editable |
| No hours for invoice | Hours must be **Goedgekeurd** (Approved) and not already on another invoice |
| No invoice in freelancer portal | Admin must click **Goedkeuren** (Approve) on the invoice — drafts are admin-only |
| PDF button does nothing | Allow pop-ups; use browser print → Save as PDF |
| Forgot password email missing | Check spam; confirm Firebase email auth is enabled |

---

## Appendix — Printable test checklist

| ✓ | Step | Done |
|---|------|------|
| ☐ | 1. Website loads, cookie banner works | |
| ☐ | 2. B2B staff request submitted | |
| ☐ | 3. Freelancer application form submitted | |
| ☐ | 4. Freelancer account registered | |
| ☐ | 5. Compliance documents uploaded (pending) | |
| ☐ | 6. Admin: onboarding approved | |
| ☐ | 7. Admin: compliance approved | |
| ☐ | 8. Freelancer: dashboard accessible | |
| ☐ | 9. Admin: assignment created and assigned | |
| ☐ | 10. Freelancer: hours submitted | |
| ☐ | 11. Admin: hours approved | |
| ☐ | 12. Admin: invoice generated and approved | |
| ☐ | 13. Freelancer: invoice visible + PDF | |
| ☐ | 14. Admin: invoice marked paid | |
| ☐ | 15. Admin: CSV export works | |
| ☐ | 16. Forgot password tested | |
| ☐ | 17. Log out / log in on both roles | |

---

**H&B Service Group — HNB Portal User Manual v1.0**

*Document path: `docs/HNB-PORTAL-USER-MANUAL.pdf` · Regenerate with `npm run manual:pdf`*
