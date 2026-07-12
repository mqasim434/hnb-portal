# HNB Portal — Gebruikershandleiding

**H&B Service Group — Portaal & website**  
**Versie:** 1.1 · **Datum:** mei 2026  
**Doel:** Scenario-gebaseerde handleiding om alle functionaliteiten A tot Z te testen.

---

## Inhoudsopgave

1. [Over dit document](#1-over-dit-document)
2. [Wie gebruikt wat?](#2-wie-gebruikt-wat)
3. [Algemene toegang](#3-algemene-toegang)
4. [Scenario A — Bezoeker: personeelsaanvraag (B2B)](#4-scenario-a--bezoeker-personeelsaanvraag-b2b)
5. [Scenario B — Freelancer: aanmelden tot portaaltoegang](#5-scenario-b--freelancer-aanmelden-tot-portaaltoegang)
6. [Scenario C — Freelancer: dagelijks portaalgebruik](#6-scenario-c--freelancer-dagelijks-portaalgebruik)
7. [Scenario G — Opdrachtgever: opdracht plaatsen en freelancer selecteren](#7-scenario-g--opdrachtgever-opdracht-plaatsen-en-freelancer-selecteren)
8. [Scenario D — Beheerder: eerste inrichting](#8-scenario-d--beheerder-eerste-inrichting)
9. [Scenario E — Beheerder: dagelijkse operatie](#9-scenario-e--beheerder-dagelijkse-operatie)
10. [Scenario F — Masterflow A tot Z (acceptatietest)](#10-scenario-f--masterflow-a-tot-z-acceptatietest)
11. [Referentie: schermen & URL’s](#11-referentie-schermen--urls)
12. [Referentie: statussen](#12-referentie-statussen)
13. [Veelgestelde vragen & tips](#13-veelgestelde-vragen--tips)

---

## 1. Over dit document

Deze handleiding beschrijft het **H&B-portaal** en de gekoppelde **marketingwebsite**. U kunt de scenario’s in volgorde doorlopen om een volledige acceptatietest uit te voeren.

**Wat is inbegrepen in versie 1.1 (MVP + bedrijfsportaal):**

- Publieke website (informatie, contact, aanmeldformulieren)
- **Bedrijfsportaal** (opdrachtgever): opdrachten plaatsen, sollicitaties bekijken, freelancer selecteren
- Freelancerportaal: open opdrachten feed, solliciteren, compliance, toegewezen opdrachten, uren, facturen
- Beheerportaal (dashboard, gebruikers, onboarding, aanvragen, opdrachten-overzicht, uren, facturen, compliance)
- Inloggen met e-mail en wachtwoord (Firebase)
- Aparte admin-login via **`/admin/login`** (niet zichtbaar op de website)

**Wat valt buiten deze versie:**

- Online betalen (facturen worden handmatig op *Betaald* gezet)
- E-mailnotificaties bij goedkeuring/afwijzing (behalve optionele formulier-e-mails)
- Meerdere freelancers per opdracht selecteren
- Roosterplanning / shiftplanning (Phase 2)

**Mobiel gebruik:** In alle portalen (bedrijf, freelancer, beheer) opent u op smalle schermen het **☰ menu** voor navigatie, e-mail en uitloggen.

---

## 2. Wie gebruikt wat?

| Rol | Toegang | Inlog-URL | Start-URL na inloggen |
|-----|---------|-----------|------------------------|
| **Bezoeker** | Geen account nodig | — | Marketingpagina’s, formulieren |
| **Freelancer (in behandeling)** | Account aangemaakt, nog niet goedgekeurd | `/login` (freelancer-kaart) | `/auth/pending` |
| **Freelancer (actief)** | Goedgekeurd door H&B | `/login` (freelancer-kaart) | `/portal/dashboard` |
| **Opdrachtgever / bedrijf (actief)** | Goedgekeurd door H&B | `/login` (opdrachtgever-kaart) | `/company/dashboard` |
| **Beheerder (admin)** | Rol `admin` in systeem | **`/admin/login`** | `/admin/dashboard` |

---

## 3. Algemene toegang

### 3.1 Website openen

1. Open de website in een moderne browser (Chrome, Edge, Firefox, Safari).
2. Bij eerste bezoek verschijnt de **cookiebalk** onderaan.
3. Meer info: footer → **Cookiebeleid** (`/juridisch/cookies`).

### 3.2 Inloggen (freelancer of opdrachtgever)

| Stap | Actie |
|------|--------|
| 1 | Ga naar **Inloggen** (`/login`) via het menu of footer. |
| 2 | Er zijn **twee aparte kaarten** met **eigen invoervelden**: **Ik ben freelancer** en **Ik ben opdrachtgever**. |
| 3 | Vul e-mail en wachtwoord in op de juiste kaart. |
| 4 | Klik **Inloggen als freelancer** of **Inloggen als opdrachtgever**. |

**Na succesvolle login:**

- Actieve **freelancer** → `/portal/dashboard`
- Actieve **opdrachtgever** → `/company/dashboard`
- Account **in behandeling** → `/auth/pending`
- Account **afgewezen** of **gepauzeerd** → melding op pending-pagina

### 3.3 Inloggen (beheerder)

| Stap | Actie |
|------|--------|
| 1 | Typ handmatig **`/admin/login`** in de browser (geen knop op de website). |
| 2 | Vul alleen e-mail en wachtwoord in — **geen registratie of wachtwoord vergeten**. |
| 3 | Klik **Inloggen**. |

**Verwacht:** redirect naar `/admin/dashboard`. Bij uitloggen terug naar `/admin/login`. Niet-admin accounts worden geweigerd.

### 3.4 Account aanmaken (freelancer)

| Stap | Actie |
|------|--------|
| 1 | Op `/login` (freelancer-kaart) → **Account aanmaken** of `/auth/register`. |
| 2 | Vul naam, e-mail en wachtwoord in (minimaal 8 tekens). |
| 3 | Bevestig wachtwoord en registreer. |

**Verwacht resultaat:** account **in behandeling** tot H&B goedkeurt.

### 3.5 Account aanmaken (opdrachtgever / bedrijf)

| Stap | Actie |
|------|--------|
| 1 | Op `/login` (opdrachtgever-kaart) → **Bedrijfsaccount aanmaken** of `/auth/register/company`. |
| 2 | Vul bedrijfsnaam, contactpersoon, e-mail en wachtwoord in. |
| 3 | Registreer. |

**Verwacht:** account **in behandeling**. Admin keurt goed via `/admin/users` → rol **company**.

### 3.6 Wachtwoord vergeten

Alleen voor freelancer/opdrachtgever via `/login` → **Wachtwoord vergeten?** (`/auth/forgot-password`). Niet beschikbaar op `/admin/login`.

### 3.7 Uitloggen

- Freelancer/opdrachtgever: **Uitloggen** in portaalheader (op mobiel via **☰ menu**).
- Beheerder: **Uitloggen** → `/admin/login`.

---

## 4. Scenario A — Bezoeker: personeelsaanvraag (B2B)

**Doel:** Testen of een opdrachtgever **zonder account** personeel kan aanvragen (los van het bedrijfsportaal).

| # | Stap | Verwacht resultaat |
|---|------|-------------------|
| A1 | **Bedrijven** → **Personeel aanvragen** (`/bedrijven/personeel-aanvragen`). | Formulier met bedrijfs- en eventgegevens. |
| A2 | Vul verplichte velden in + privacy akkoord. | Validatie accepteert complete invoer. |
| A3 | Verzend aanvraag. | Succesmelding. |
| A4 | *(Beheerder)* `/admin/staff-requests`. | Nieuwe aanvraag status **Nieuw**. |

---

## 5. Scenario B — Freelancer: aanmelden tot portaaltoegang

*(Ongewijzigd kernproces — zie v1.0)*

| # | Stap | Verwacht resultaat |
|---|------|-------------------|
| B1–B4 | Optioneel: `/freelancers/direct-aanmelden` | Onboarding-wachtrij |
| B5–B7 | `/auth/register` + pending | Account in behandeling |
| B8–B11 | `/auth/compliance` — documenten uploaden | Status **In behandeling** per document |
| B12 | Admin keurt goed (Scenario E2/E3/E4) | Portaal opent (live sync) |

---

## 6. Scenario C — Freelancer: dagelijks portaalgebruik

**Voorwaarde:** Account **actief**, rol **freelancer**.

**Navigatie:** Dashboard · **Open opdrachten** · Compliance · **Mijn opdrachten** · Uren · Facturen  
*(Op mobiel: **☰ menu**)*

### C1 — Dashboard (`/portal/dashboard`)

Welkomsttekst + snelkoppelingen.

### C2 — Compliance (`/portal/compliance`)

Documentstatus bekijken en opnieuw uploaden bij afwijzing.

### C3 — Open opdrachten bekijken en solliciteren (`/portal/feed`)

| # | Stap | Verwacht resultaat |
|---|------|-------------------|
| C3.1 | Open **Open opdrachten**. | Lijst open opdrachten van opdrachtgevers. |
| C3.2 | **Meer info** → optionele motivatie → **Solliciteren**. | Status **In behandeling** op de kaart. |
| C3.3 | Na selectie door opdrachtgever. | Status **Geaccepteerd** + link naar Mijn opdrachten. |

*Geen opdrachten?* Opdrachtgever moet status **Open** zetten (Scenario G).

### C4 — Toegewezen opdrachten (`/portal/jobs`)

| # | Stap | Verwacht resultaat |
|---|------|-------------------|
| C4.1 | Open **Mijn opdrachten**. | Alleen opdrachten waarvoor u bent **geselecteerd**. |
| C4.2 | **Details bekijken** → **Uren registreren**. | Urenformulier met opdracht vooringevuld. |

*Lege lijst?* Opdrachtgever moet u selecteren (Scenario G) — solliciteren alleen op feed is niet genoeg.

### C5 — Uren (`/portal/hours`, `/portal/hours/new`)

Concept opslaan → **Indienen ter goedkeuring** → status **Ingediend**.

### C6 — Facturen (`/portal/invoices`)

Alleen **Goedgekeurd** en **Betaald** zichtbaar. **PDF** via browser.

---

## 7. Scenario G — Opdrachtgever: opdracht plaatsen en freelancer selecteren

**Voorwaarde:** Bedrijfsaccount **actief** (`role: company`).

### G1 — Registratie en goedkeuring

| # | Stap | Verwacht resultaat |
|---|------|-------------------|
| G1 | `/auth/register/company` | Account pending |
| G2 | Admin `/admin/users` → **Goedkeuren** | Rol company, status active |
| G3 | Inloggen op `/login` (opdrachtgever-kaart) | `/company/dashboard` |

### G2 — Opdracht plaatsen

| # | Stap | Verwacht resultaat |
|---|------|-------------------|
| G4 | `/company/assignments` → **Nieuwe opdracht** | Formulier opent |
| G5 | Vul gegevens in; status **Open** | Zichtbaar in freelancer feed |
| G6 | **Opdracht plaatsen** | Opdracht in lijst; form sluit |

### G3 — Sollicitaties en selectie

| # | Stap | Verwacht resultaat |
|---|------|-------------------|
| G7 | Freelancer solliciteert (Scenario C3) | Sollicitatie in **Beheren** → **Sollicitaties** |
| G8 | **Selecteren** bij gewenste freelancer | Opdracht **Toegewezen**; overige sollicitaties **Afgewezen** |
| G9 | Freelancer opent **Mijn opdrachten** | Opdracht zichtbaar |

Toegewezen opdrachten kunnen niet meer worden bewerkt of verwijderd.

---

## 8. Scenario D — Beheerder: eerste inrichting

### D1 — Eerste beheerder

| # | Stap |
|---|------|
| D1 | Registreer via `/auth/register` |
| D2 | Firebase: `users/{uid}` → `role: "admin"`, `accountStatus: "active"` |
| D3 | Log in via **`/admin/login`** → `/admin/dashboard` |

### D2 — Beheerportaal verkennen

| Menu | URL | Functie |
|------|-----|---------|
| Dashboard | `/admin/dashboard` | KPI’s + CSV-export |
| Aanvragen | `/admin/staff-requests` | B2B personeelsaanvragen (zonder account) |
| Gebruikers | `/admin/users` | Freelancer- **en bedrijfs**accounts goedkeuren |
| Onboarding | `/admin/onboarding` | Freelancer-aanmeldformulieren |
| Opdrachten | `/admin/assignments` | **Alleen-lezen overzicht** (bedrijven plaatsen opdrachten) |
| Uren / Facturen / Compliance | — | Zie Scenario E |

---

## 9. Scenario E — Beheerder: dagelijkse operatie

*(Stappen E1–E4 onboarding/compliance grotendeels ongewijzigd)*

### E5 — Opdrachten (alleen overzicht)

| # | Stap | Verwacht resultaat |
|---|------|-------------------|
| E17 | `/admin/assignments` | Alle opdrachten van bedrijven inzien |
| — | Geen aanmaken/toewijzen door admin | Bedrijf beheert via `/company/assignments` |

### E6–E8 — Uren, facturen, export

*(Zelfde als v1.0: uren goedkeuren, factuur genereren, CSV-export)*

---

## 10. Scenario F — Masterflow A tot Z (acceptatietest)

Gebruik **drie browsers**: opdrachtgever, freelancer, beheerder.

| Fase | Wie | Stappen | Controle |
|------|-----|---------|----------|
| **1. Setup** | Admin | Scenario D | Admin dashboard |
| **2. Accounts** | Admin | Goedkeur bedrijf + freelancer | Beide kunnen inloggen |
| **3. Post** | Bedrijf | Scenario G2 — **Open** opdracht | Feed `/portal/feed` |
| **4. Apply** | Freelancer | Scenario C3 — **Solliciteren** | Sollicitatie bij bedrijf |
| **5. Select** | Bedrijf | Scenario G3 — **Selecteren** | `/portal/jobs` |
| **6. Hours** | Freelancer + Admin | Scenario C5 + E6 | Goedgekeurde uren |
| **7. Invoice** | Admin | E7 | Freelancer ziet factuur |
| **8. Pay** | Admin | **Betaald** | Afgerond |

**Acceptatiecriteria:** geen consolefouten; pending gebruikers geen `/portal/*` behalve pending/compliance; admin-login alleen via `/admin/login`.

---

## 11. Referentie: schermen & URL’s

### Authenticatie

| Pagina | URL |
|--------|-----|
| Inloggen freelancer / opdrachtgever | `/login` |
| Registreren freelancer | `/auth/register` |
| Registreren bedrijf | `/auth/register/company` |
| **Beheer inloggen** | **`/admin/login`** |
| Wachtwoord vergeten | `/auth/forgot-password` |
| Pending | `/auth/pending` |
| Compliance (pending) | `/auth/compliance` |

### Bedrijfsportaal

| Pagina | URL |
|--------|-----|
| Dashboard | `/company/dashboard` |
| Opdrachten | `/company/assignments` |

### Freelancerportaal

| Pagina | URL |
|--------|-----|
| Dashboard | `/portal/dashboard` |
| **Open opdrachten** | **`/portal/feed`** |
| Compliance | `/portal/compliance` |
| **Mijn opdrachten** | **`/portal/jobs`** |
| Uren | `/portal/hours` |
| Facturen | `/portal/invoices` |

### Beheerportaal

| Pagina | URL |
|--------|-----|
| Dashboard | `/admin/dashboard` |
| Overige schermen | `/admin/staff-requests`, `/admin/users`, … |

---

## 12. Referentie: statussen

### Opdracht (`assignments`)

| Status | Betekenis |
|--------|-----------|
| `draft` | Concept — niet in feed |
| `open` | Zichtbaar op `/portal/feed`; sollicitaties mogelijk |
| `assigned` | Freelancer geselecteerd |
| `completed` / `cancelled` | Afgerond / geannuleerd |

### Sollicitatie (`assignmentApplications`)

| Status | Label |
|--------|-------|
| `pending` | In behandeling |
| `accepted` | Geaccepteerd (geselecteerd) |
| `rejected` | Afgewezen |

*(Overige statussen: account, compliance, uren, facturen — zie v1.0)*

---

## 13. Veelgestelde vragen & tips

### Geen opdrachten op `/portal/feed`

- Opdrachtgever moet status **Open** zetten en `companyId` moet aanwezig zijn.

### Solliciteren mislukt

- Freelancer **actief**; Firebase Auth UID = Firestore `users/{uid}`; opdracht nog **open**.

### Geen opdrachten op `/portal/jobs`

- Opdrachtgever moet **Selecteren** klikken — sollicitatie alleen is niet genoeg.

### Admin-URL geeft 404 op productie

- `vercel.json` moet SPA-rewrite bevatten; opnieuw deployen.

### Mobiele navigatie

- Tap **☰** in portaalheader voor menu.

---

## Bijlage — Testchecklist (afdrukken)

| # | Test | OK |
|---|------|----|
| 1 | Bedrijf registreren + admin goedkeuren | ☐ |
| 2 | Freelancer registreren + goedkeuren | ☐ |
| 3 | Open opdracht plaatsen (bedrijf) | ☐ |
| 4 | Solliciteren op `/portal/feed` | ☐ |
| 5 | Freelancer selecteren (bedrijf) | ☐ |
| 6 | Opdracht op `/portal/jobs` | ☐ |
| 7 | Uren + factuur flow | ☐ |
| 8 | Admin login `/admin/login` | ☐ |
| 9 | Mobiel ☰ menu | ☐ |

---

**H&B Service Group — HNB Portal Gebruikershandleiding v1.1**  
*PDF (Engels): `npm run manual:pdf` → `docs/HNB-PORTAL-USER-MANUAL.pdf`*
