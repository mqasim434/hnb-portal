# H&B Service Group — Build status vs Development Plan

> **Master build tracker:** see [`MODULE-BUILD-PLAN.md`](./MODULE-BUILD-PLAN.md) for module-by-module todos, test steps, and alignment with all three client requirement documents.

**Source:** `Developmen Plan.docx` · `HnB Website Revisiedocument v3.docx` · `Website plan 2.0.pdf`  
**Repo:** `hnb-portal` (React + Vite + Firebase)  
**Last reviewed:** 2026-05-30  
This document maps the original **Product & Platform** plan to what exists in code today. The product has two sides:

| Side | Purpose | Status |
|------|---------|--------|
| **Marketing website** | Public site, lead gen, content | **Largely complete** (static React, not CMS) |
| **Portal** | Freelancer + admin operations | **Scaffold only** — routes & auth wiring, no business logic |

---

## Executive summary

- **Marketing:** Implemented as a Dutch-first static marketing site (expanded beyond the original 6-page outline). Forms submit via **optional HTTP email endpoints** — not Firestore.
- **Portal:** All `/portal/*` and `/admin/*` screens are **placeholder pages**. Protected routes exist but **login still points to Zoho Creator URLs**, not in-app Firebase Auth.
- **Firebase:** **Partially implemented** — SDK, config, Auth sync, role-based route guards. **No Firestore/Storage usage** in features yet. Requires `.env` credentials to activate.
- **ImageKit:** **Not implemented** (no package, config, or upload UI).
- **Core workflow** (apply → approve → assign → hours → invoice → pay): **Not built**.

---

## Module alignment (Development Plan)

### Module 1 — Marketing website

| Plan item | Planned | Built | Notes |
|-----------|---------|-------|-------|
| Public pages: Home, Hire Staff, Find Work, Services, About, Contact, Login | Yes | **Yes** (extended) | Dutch routes; legacy redirects (`/hire-staff`, `/find-work`, etc.) |
| Primary CTAs: Hire Staff + Find Work | Yes | **Yes** | Hero + nav; paths `/bedrijven/personeel-aanvragen`, `/freelancers/openstaande-opdrachten` |
| Home: hero, services, value prop, social proof | Yes | **Yes** | Extra bands: sectors, how-it-works preview, closing CTA |
| Hire Staff / B2B lead form | Yes | **Yes** | `/bedrijven/personeel-aanvragen` — 11+ fields, date range, privacy checkbox, success state |
| Find Work / freelancer CTA | Yes | **Yes** | Hub + open assignments (sample data) + direct register |
| **CMS-driven content** | Yes | **No** | Copy lives in `src/content/*.js` and page components |
| WordPress (original stack note) | Mentioned | **N/A** | Replaced by React static site |

**Additional marketing (not in original module list):**

| Area | Status |
|------|--------|
| Bedrijven: Ons aanbod, Tarieven, Sectoren, Functies, Vaste samenwerking | Done |
| Over H&B: Ons verhaal, Team, Werkgebied, Onze aanpak, Vergunningen, Nieuws (+ article pages) | Done |
| Freelancers: Hoe het werkt, Inkomsten, Certificering, Direct aanmelden | Done |
| Juridisch: Privacy, Cookies, Algemene voorwaarden | Done (static pages) |
| Contact form | Done (email endpoint optional) |
| SEO: sitemap, robots, JSON-LD, per-page meta | Done |
| 404 (Dutch) | Done |
| Skip-to-content link | Done |

**Pre-launch placeholders (content, not code gaps):** real phone, KvK, BTW, WPBR licence number in footer/compliance copy.

---

### Module 2 — Freelancer registration & onboarding

| Plan item | Planned | Built | Notes |
|-----------|---------|-------|-------|
| Step 1 — Basic info | Yes | **Partial** | Single-page form at `/freelancers/direct-aanmelden` (18+ fields), not `/register` wizard |
| Step 2 — Work type (Hospitality / Security) | Yes | **Partial** | Multi-select domains + conditional cert fields on same page |
| Step 3 — Security compliance branch | Yes | **Partial** | Conditional fields (diploma, grijze pas, BHV, VOG, SVH, etc.); **no upload**, **no account creation** |
| Upload existing licence | Yes | **No** | Text/select fields only |
| Register interest without licence | Yes | **No** | No separate tracked flow |
| Persist to backend / admin queue | Implied | **No** | Email webhook only (`VITE_REGISTRATION_EMAIL_ENDPOINT`) |

**Routes:** Plan `/register`, `/register/work-type`, `/register/compliance` → all redirect to `/freelancers/direct-aanmelden`.

---

### Module 3 — Security compliance

| Plan item | Planned | Built | Notes |
|-----------|---------|-------|-------|
| License upload, number, expiry | Yes | **No** | Form captures status via selects, not files/dates in DB |
| Statuses: Pending / Approved / Expired | Yes | **No** | No persistence |
| Interest registration without licence | Yes | **No** | — |
| Admin compliance validation UI | Yes | **Placeholder** | `/admin/compliance` → `PlaceholderPage` |

---

### Module 4 — Freelancer portal

| Route (plan) | Route (app) | Status |
|--------------|-------------|--------|
| `/portal/dashboard` | Same | **Placeholder** |
| `/portal/jobs` | Same | **Placeholder** |
| `/portal/hours` | Same | **Placeholder** |
| `/portal/hours/new` | Same | **Placeholder** |
| `/portal/invoices` | Same | **Placeholder** |

| Sub-module | Planned features | Built |
|------------|------------------|-------|
| Dashboard | Assigned jobs, hours, invoices, status | **No** |
| Time tracking | Start/end, break, notes; Draft → Submitted → Approved → Rejected | **No** |
| Invoices | Auto from approved hours, PDF, Draft/Approved/Paid | **No** |

---

### Module 5 — Admin panel

| Route (plan) | Route (app) | Status |
|--------------|-------------|--------|
| `/admin/dashboard` | Same | **Placeholder** |
| `/admin/users` | Same | **Placeholder** |
| `/admin/onboarding` | Same | **Placeholder** |
| `/admin/assignments` | Same | **Placeholder** |
| `/admin/hours` | Same | **Placeholder** |
| `/admin/invoices` | Same | **Placeholder** |
| `/admin/compliance` | Same | **Placeholder** |

| Feature | Planned | Built |
|---------|---------|-------|
| User management | Yes | **No** |
| Onboarding validation | Yes | **No** |
| Assignment creation & freelancer assignment | Yes | **No** |
| Time approval | Yes | **No** |
| Invoice generation | Yes | **No** |
| Export Excel/CSV | Yes | **No** |
| ID / KvK / VAT / licence checks | Yes | **No** |

**Note:** No **client/company portal** routes in app (plan Phase 3 mentions client portal separately).

---

### Module 6 — Core workflow engine

End-to-end flow from the plan:

1. Freelancer applies → **Partial** (form email only)  
2. H&B approves account → **No**  
3. License verified (security) → **No**  
4. Freelancer assigned to job → **No**  
5. Hours submitted → **No**  
6. H&B approves hours → **No**  
7. Invoice auto-generated → **No**  
8. Manual payment processed → **No**  

**Status:** **Not built.**

---

### Module 7 — Phase roadmap

| Phase | Scope | Status |
|-------|--------|--------|
| **Phase 1 (MVP)** | Website, acquisition, onboarding, portal, time tracking, admin approval, invoicing, security compliance | **~40%** — website + forms done; portal/admin/workflow not |
| **Phase 2** | Scheduling, notifications, automation, payment integrations | **Not started** |
| **Phase 3** | Client portal, analytics, performance tracking | **Not started** |

---

## Route map: plan vs implementation

| Planned route | Current behaviour |
|---------------|-------------------|
| `/` | Home (marketing) |
| `/hire-staff` | → `/bedrijven/personeel-aanvragen` |
| `/find-work` | → `/freelancers/openstaande-opdrachten` |
| `/login` | Marketing login hub; **external Zoho URLs** if env set |
| `/register/*` | → `/freelancers/direct-aanmelden` |
| `/portal/*` | Protected (`role: freelancer`); placeholders |
| `/admin/*` | Protected (`role: admin`); placeholders |

---

## Firebase — implementation status

| Component | In codebase? | Used in features? |
|-----------|--------------|-------------------|
| `firebase` npm package | **Yes** (`^12.12.1`) | — |
| `src/firebase/config.js` | **Yes** | Initializes Auth, Firestore, Storage when env complete |
| Env vars (`.env.example`) | **Yes** | `VITE_FIREBASE_*` — must be copied to `.env` |
| `FirebaseAuthSync` | **Yes** | Listens to Auth; reads custom claim `role` |
| Redux `authSlice` | **Yes** | Stores user + role |
| `ProtectedRoute` | **Yes** | Guards `/portal` and `/admin` |
| Firebase Auth sign-in UI | **No** | `/login` uses Zoho Creator links |
| Firestore reads/writes | **No** | Exported but unused |
| Firebase Storage uploads | **No** | Exported but unused |
| Cloud Functions / security rules | **No** | Not in repo |
| Custom claims setup (admin/freelancer) | **No** | Expected by guards; not documented in repo |

**Verdict:** Firebase is **wired for future portal auth**, not **operational**. Without `.env` values the app runs with `auth = null` and protected areas redirect to `/login`.

---

## ImageKit — implementation status

| Item | Status |
|------|--------|
| npm package / SDK | **Not present** |
| Env configuration | **Not present** |
| Upload components (licence, ID, etc.) | **Not present** |

**Verdict:** **Not implemented.** Needed for compliance document uploads unless you use Firebase Storage instead.

---

## Integrations today (non-Firebase)

| Integration | Purpose | Status |
|-------------|---------|--------|
| Optional email HTTP endpoints | Contact, B2B staff request, freelancer registration | Implemented; skips send if URL unset |
| Zoho Creator portal URLs | Freelancer / company login | Env-only links on `/login`; copy still references Zoho |
| Unsplash | Marketing hero images | In use |

Original plan stack (WordPress, Zoho CRM, Zoho Books) is **not** integrated in this codebase.

---

## What to build next (Portal — Phase 1 MVP)

Suggested order aligned with the Development Plan and current scaffold:

### Foundation
1. **Firebase project setup** — `.env`, Auth providers, Firestore schema, Storage rules, custom claims for `admin` / `freelancer`.
2. **Replace or complement Zoho login** — Firebase Auth on `/login` (or dedicated `/portal/login`); email/password or magic link.
3. **ImageKit or Firebase Storage** — document upload for licences, ID, certificates (choose one strategy).

### Data & onboarding
4. **Persist freelancer registration** — Firestore `users` / `applications`; admin onboarding queue (`/admin/onboarding`).
5. **Compliance module** — upload + metadata + status workflow (Pending / Approved / Expired).

### Operations
6. **Assignments** — admin CRUD + assign freelancers; portal jobs list.
7. **Time tracking** — submit hours (`/portal/hours/new`), admin approval (`/admin/hours`), status machine.
8. **Invoicing** — generate from approved hours, PDF export, status (Draft / Approved / Paid).
9. **Admin exports** — CSV/Excel for hours, users, compliance.

### Later (Phase 2–3)
- Notifications, scheduling, payments, **client portal**, analytics.

---

## File reference (portal scaffold)

```
src/firebase/config.js          — Firebase init (Auth, Firestore, Storage)
src/components/FirebaseAuthSync.jsx
src/components/ProtectedRoute.jsx
src/store/slices/authSlice.js
src/pages/portal/*.jsx          — All PlaceholderPage
src/pages/admin/*.jsx           — All PlaceholderPage
src/pages/public/Login.jsx      — Zoho external links
```

---

## Marketing website — quick checklist

| Item | Done? |
|------|-------|
| Home | Yes |
| B2B personeel aanvragen form | Yes |
| Freelancer marketing pages | Yes |
| Bedrijven pages | Yes |
| Over H&B pages | Yes |
| Contact + legal pages | Yes |
| Navigation + footer | Yes |
| CMS | No (static content) |
| Real business placeholders (phone, KvK, BTW, WPBR) | Client content |

---

*Generated from codebase audit + Development Plan document. Update this file as portal work progresses.*
