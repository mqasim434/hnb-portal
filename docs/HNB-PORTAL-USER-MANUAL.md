# HNB Portal — Gebruikershandleiding

**H&B Service Group — Portaal & website**  
**Versie:** 1.0 · **Datum:** mei 2026  
**Doel:** Scenario-gebaseerde handleiding om alle functionaliteiten A tot Z te testen.

---

## Inhoudsopgave

1. [Over dit document](#1-over-dit-document)
2. [Wie gebruikt wat?](#2-wie-gebruikt-wat)
3. [Algemene toegang](#3-algemene-toegang)
4. [Scenario A — Bezoeker: personeelsaanvraag (B2B)](#4-scenario-a--bezoeker-personeelsaanvraag-b2b)
5. [Scenario B — Freelancer: aanmelden tot portaaltoegang](#5-scenario-b--freelancer-aanmelden-tot-portaaltoegang)
6. [Scenario C — Freelancer: dagelijks portaalgebruik](#6-scenario-c--freelancer-dagelijks-portaalgebruik)
7. [Scenario D — Beheerder: eerste inrichting](#7-scenario-d--beheerder-eerste-inrichting)
8. [Scenario E — Beheerder: dagelijkse operatie](#8-scenario-e--beheerder-dagelijkse-operatie)
9. [Scenario F — Masterflow A tot Z (acceptatietest)](#9-scenario-f--masterflow-a-tot-z-acceptatietest)
10. [Referentie: schermen & URL’s](#10-referentie-schermen--urls)
11. [Referentie: statussen](#11-referentie-statussen)
12. [Veelgestelde vragen & tips](#12-veelgestelde-vragen--tips)

---

## 1. Over dit document

Deze handleiding beschrijft het **H&B-portaal** en de gekoppelde **marketingwebsite**. U kunt de scenario’s in volgorde doorlopen om een volledige acceptatietest uit te voeren.

**Wat is inbegrepen in versie 1.0 (MVP):**

- Publieke website (informatie, contact, aanmeldformulieren)
- Freelancerportaal (compliance, opdrachten, uren, facturen)
- Beheerportaal (dashboard, gebruikers, onboarding, aanvragen, opdrachten, uren, facturen, compliance)
- Inloggen met e-mail en wachtwoord (Firebase)

**Wat valt buiten deze versie:**

- Online betalen (facturen worden handmatig op *Betaald* gezet)
- E-mailnotificaties bij goedkeuring/afwijzing (behalve optionele formulier-e-mails)
- Apart inlogportaal voor opdrachtgevers (B2B-klanten)
- Roosterplanning / shiftplanning (Phase 2)

---

## 2. Wie gebruikt wat?

| Rol | Toegang | Start-URL na inloggen |
|-----|---------|------------------------|
| **Bezoeker** | Geen account nodig | Marketingpagina’s, formulieren |
| **Freelancer (in behandeling)** | Account aangemaakt, nog niet goedgekeurd | `/auth/pending` |
| **Freelancer (actief)** | Goedgekeurd door H&B | `/portal/dashboard` |
| **Beheerder (admin)** | Rol `admin` in systeem | `/admin/dashboard` |

---

## 3. Algemene toegang

### 3.1 Website openen

1. Open de website in een moderne browser (Chrome, Edge, Firefox, Safari).
2. Bij eerste bezoek verschijnt de **cookiebalk** onderaan.
   - **Alleen noodzakelijk** — geen analytische cookies.
   - **Alles accepteren** — ook Google Analytics (indien geconfigureerd).
3. Meer info: footer → **Cookiebeleid** (`/juridisch/cookies`).

### 3.2 Inloggen

| Stap | Actie |
|------|--------|
| 1 | Ga naar **Inloggen** (`/login`) via het menu of footer. |
| 2 | Kies het blok **Freelancerportaal** of **Beheer**. |
| 3 | Vul **e-mailadres** en **wachtwoord** in. |
| 4 | Klik **Inloggen**. |

**Na succesvolle login:**

- Actieve **freelancer** → `/portal/dashboard`
- Actieve **beheerder** → `/admin/dashboard`
- Account **in behandeling** → `/auth/pending`
- Account **afgewezen** of **gepauzeerd** → melding op pending-pagina

### 3.3 Account aanmaken (freelancer)

| Stap | Actie |
|------|--------|
| 1 | Op `/login` → link **Account aanmaken** of ga direct naar `/auth/register`. |
| 2 | Vul naam, e-mail en wachtwoord in (minimaal 8 tekens). |
| 3 | Bevestig wachtwoord. |
| 4 | Klik registreren. |

**Verwacht resultaat:** melding dat het account **in behandeling** is. U kunt nog niet het volledige portaal gebruiken tot H&B goedkeurt.

### 3.4 Wachtwoord vergeten

| Stap | Actie |
|------|--------|
| 1 | `/login` → **Wachtwoord vergeten?** (`/auth/forgot-password`). |
| 2 | Vul uw e-mail in. |
| 3 | Volg de link in de e-mail van Firebase om een nieuw wachtwoord in te stellen. |

### 3.5 Uitloggen

- In het portaal of beheer: knop **Uitloggen** rechtsboven in de blauwe balk.
- Op pending-pagina: knop **Uitloggen**.

---

## 4. Scenario A — Bezoeker: personeelsaanvraag (B2B)

**Doel:** Testen of een opdrachtgever zonder account personeel kan aanvragen.

| # | Stap | Verwacht resultaat |
|---|------|-------------------|
| A1 | Ga naar **Bedrijven** → **Personeel aanvragen** (`/bedrijven/personeel-aanvragen`). | Formulier met bedrijfs- en eventgegevens. |
| A2 | Vul alle verplichte velden in (bedrijfsnaam, contactpersoon, e-mail, telefoon, type personeel, type event, locatie, aantal medewerkers, datums). | Validatie accepteert alleen complete invoer. |
| A3 | Vink **privacyverklaring** aan. | Verplicht vóór verzenden. |
| A4 | Klik **Aanvraag verzenden** (of equivalente verzendknop). | Succesmelding op scherm. |
| A5 | *(Beheerder)* Open later `/admin/staff-requests`. | Nieuwe aanvraag met status **Nieuw**. |

**Optioneel — contactformulier:**

| # | Stap | URL |
|---|------|-----|
| A6 | Vul het contactformulier in. | `/contact` |

---

## 5. Scenario B — Freelancer: aanmelden tot portaaltoegang

**Doel:** Volledige onboarding van nieuwe freelancer vóór actieve portaaltoegang.

**Tip:** Gebruik voor testen een **nieuw e-mailadres** dat nog niet in het systeem staat (bijv. `test.freelancer+1@uwbedrijf.nl`).

### Deel B1 — Uitgebreid aanmeldformulier

| # | Stap | Verwacht resultaat |
|---|------|-------------------|
| B1 | Ga naar **Freelancers** → **Direct aanmelden** (`/freelancers/direct-aanmelden`). | Lang formulier met persoonlijke gegevens, domeinen, certificering. |
| B2 | Vul het formulier volledig in (hospitality en/of beveiliging; conditionele velden verschijnen per domein). | — |
| B3 | Geef toestemming (privacy). | — |
| B4 | Verzend. | Succesmelding; gegevens opgeslagen in onboarding-wachtrij. |

### Deel B2 — Portaalaccount koppelen

| # | Stap | Verwacht resultaat |
|---|------|-------------------|
| B5 | Ga naar `/auth/register` met **dezelfde e-mail** als in B1. | — |
| B6 | Maak account aan met wachtwoord. | Account status: **in behandeling**. |
| B7 | U wordt doorgestuurd naar `/auth/pending`. | Tekst: account wacht op goedkeuring. |

### Deel B3 — Compliance uploaden (vóór goedkeuring)

| # | Stap | Verwacht resultaat |
|---|------|-------------------|
| B8 | Op `/auth/pending` → klik **Documenten uploaden** (`/auth/compliance`). | Overzicht compliance-documenten. |
| B9 | Upload minimaal kerndocumenten, bijv.: **VOG**, **Identiteitsbewijs**; voor beveiliging ook **Diploma**, **Grijze pas**. | PDF of afbeelding, max. ca. 10 MB per bestand. |
| B10 | Vul verplichte velden in (documentnummer, vervaldatum waar gevraagd). | Status per document: **In behandeling**. |
| B11 | Herhaal voor elk vereist documenttype. | — |

**Documenttypes in het systeem:**

| Type | Wanneer nodig |
|------|----------------|
| VOG | Altijd (kern) |
| Identiteitsbewijs | Altijd (kern) |
| Diploma Beveiliger 2+ | Beveiliging |
| Grijze pas (WPBR) | Beveiliging |
| BHV | Indien van toepassing |
| SVH / HACCP | Hospitality |

### Deel B4 — Wachten op H&B (beheerder)

De freelancer blijft op `/auth/pending` tot de beheerder in **Scenario D/E** de aanmelding en het account goedkeurt (stappen D3–D5).

**Verwacht na goedkeuring:** freelancer hoeft **niet opnieuw in te loggen** — het portaal opent automatisch (live synchronisatie). Zo niet: uitloggen en opnieuw inloggen.

---

## 6. Scenario C — Freelancer: dagelijks portaalgebruik

**Voorwaarde:** Account status = **actief**, rol = **freelancer**.

Navigatie: blauwe balk bovenaan — **Dashboard · Compliance · Opdrachten · Uren · Facturen**.

### C1 — Dashboard

| # | Stap | URL | Verwacht resultaat |
|---|------|-----|-------------------|
| C1 | Open dashboard. | `/portal/dashboard` | Welkomsttekst + snelkoppelingen naar opdrachten, uren, facturen, compliance. |
| C2 | Controleer compliance-samenvatting. | — | Aantal goedgekeurde kerndocumenten / totaal. |

### C2 — Compliance (actieve freelancer)

| # | Stap | URL |
|---|------|-----|
| C3 | Ga naar **Compliance**. | `/portal/compliance` |
| C4 | Bekijk status per document (In behandeling / Goedgekeurd / Afgewezen / Verlopen). | — |
| C5 | Bij afwijzing: opnieuw uploaden via het formulier. | — |

### C3 — Opdrachten bekijken

| # | Stap | URL | Verwacht resultaat |
|---|------|-----|-------------------|
| C6 | Open **Opdrachten**. | `/portal/jobs` | Lijst van aan u toegewezen opdrachten. |
| C7 | Klik **Details bekijken** bij een opdracht. | `/portal/jobs/{id}` | Titel, locatie, periode, diensttijden, omschrijving. |
| C8 | Klik **Uren registreren** op detailpagina. | → `/portal/hours/new?assignmentId=...` | Urenformulier met opdracht vooringevuld. |

*Als er geen opdrachten staan:* de beheerder moet eerst een opdracht aanmaken en u toewijzen (Scenario E3).

### C4 — Uren registreren en indienen

| # | Stap | URL / actie | Verwacht resultaat |
|---|------|-------------|-------------------|
| C9 | Ga naar **Uren** of gebruik link uit C8. | `/portal/hours` of `/portal/hours/new` | — |
| C10 | Klik **Uren registreren** (indien vanaf overzicht). | `/portal/hours/new` | Formulier: opdracht, datum, starttijd, eindtijd, pauze, opmerking. |
| C11 | Selecteer **opdracht**, vul datum en tijden in. | — | Voorbeeld totaal uren wordt berekend. |
| C12 | Klik **Opslaan als concept** of **Indienen ter goedkeuring**. | — | Respectievelijk status **Concept** (bewerkbaar) of **Ingediend**. |
| C13 | Open concept via **Bewerken** op `/portal/hours`. | `?edit={id}` | — |
| C14 | Bewerk en klik opnieuw **Indienen ter goedkeuring**. | — | Status **Ingediend**; niet meer bewerkbaar door freelancer. |
| C15 | Controleer overzicht. | `/portal/hours` | Telling goedgekeurd / in behandeling bovenaan. |

**Urenstatussen (freelancer):**

| Status | Betekenis | Freelancer kan bewerken? |
|--------|-----------|--------------------------|
| Concept | Opgeslagen, nog niet ingediend | Ja |
| Ingediend | Wacht op H&B | Nee |
| Goedgekeurd | Geaccepteerd door H&B | Nee |
| Afgewezen | Ter correctie | Ja (opnieuw indienen) |

### C5 — Facturen bekijken

| # | Stap | URL | Verwacht resultaat |
|---|------|-----|-------------------|
| C16 | Open **Facturen**. | `/portal/invoices` | Alleen **goedgekeurde** en **betaalde** facturen zichtbaar. |
| C17 | Controleer openstaand vs. betaald bedrag. | — | Samenvatting bovenaan. |
| C18 | Klik **PDF** bij een factuur. | — | Printvenster opent → opslaan als PDF via browser. |

*Conceptfacturen* ziet de freelancer **niet** — alleen H&B in beheer.

---

## 7. Scenario D — Beheerder: eerste inrichting

**Doel:** Eénmalige setup zodat u het beheerportaal kunt gebruiken.

### D1 — Eerste beheerder aanmaken

| # | Stap | Verwacht resultaat |
|---|------|-------------------|
| D1 | Registreer een account via `/auth/register` (e-mail van de toekomstige beheerder). | Account **in behandeling**. |
| D2 | In **Firebase Console** → Firestore → collectie `users` → document `{uw-uid}`: | — |
| D3 | Zet velden: `role` = `"admin"` en `accountStatus` = `"active"`. | — |
| D4 | Log in op `/login` met dat account. | Redirect naar `/admin/dashboard`. |

> **Belangrijk:** Alleen gebruikers met rol `admin` en status `active` komen in het beheerportaal.

### D2 — Beheerportaal verkennen

Navigatie (beheer-balk):

| Menu | URL | Functie |
|------|-----|---------|
| Dashboard | `/admin/dashboard` | KPI’s + CSV-export |
| Aanvragen | `/admin/staff-requests` | B2B personeelsaanvragen |
| Gebruikers | `/admin/users` | Wachtrij pending accounts |
| Onboarding | `/admin/onboarding` | Freelancer-aanmeldformulieren |
| Opdrachten | `/admin/assignments` | Opdrachten CRUD + toewijzen |
| Uren | `/admin/hours` | Uren goedkeuren/afwijzen |
| Facturen | `/admin/invoices` | Facturen genereren + status |
| Compliance | `/admin/compliance` | Documenten beoordelen |

| # | Stap | Verwacht resultaat |
|---|------|-------------------|
| D5 | Open **Dashboard** → klik **Vernieuwen**. | Aantallen openstaande taken. |
| D6 | Klik op een KPI-kaart (bijv. *Uren te beoordelen*). | Navigatie naar juist scherm. |

---

## 8. Scenario E — Beheerder: dagelijkse operatie

Doorloop deze stappen in logische volgorde wanneer u een nieuwe freelancer end-to-end verwerkt.

### E1 — B2B-aanvraag afhandelen

| # | Stap | Actie | Verwacht resultaat |
|---|------|-------|-------------------|
| E1 | `/admin/staff-requests` | Filter **Nieuw** | Lijst openstaande aanvragen |
| E2 | Open **Details** | Lees bedrijfs- en eventinfo | — |
| E3 | Klik **Oppakken** | — | Status **In behandeling** |
| E4 | Voeg interne notities toe | In detailpaneel | Opgeslagen bij aanvraag |
| E5 | Klik **Afgerond** | — | Status **Afgerond** |

### E2 — Onboarding-aanmelding beoordelen

| # | Stap | Actie | Verwacht resultaat |
|---|------|-------|-------------------|
| E6 | `/admin/onboarding` | Filter **In behandeling** | Aanmelding uit Scenario B |
| E7 | **Details** | Controleer alle velden (domeinen, certificaten, ervaring) | — |
| E8 | Voeg **interne notities** toe indien nodig | — | — |
| E9 | **Goedkeuren** | — | Status aanmelding **Goedgekeurd**; gekoppeld gebruikersaccount wordt **actieve freelancer** |
| E10 | Of **Afwijzen** (test) | — | Gekoppeld account **afgewezen** |

**Alternatief:** goedkeuring via `/admin/users` → **Goedkeuren** op pending account (zonder onboarding-detail).

### E3 — Gebruiker goedkeuren (alleen account)

| # | Stap | URL | Actie |
|---|------|-----|-------|
| E11 | Open wachtrij | `/admin/users` | **Goedkeuren** of **Afwijzen** per rij |

### E4 — Compliance documenten beoordelen

| # | Stap | Actie | Verwacht resultaat |
|---|------|-------|-------------------|
| E12 | `/admin/compliance` | Filter **In behandeling** | Uploads uit Scenario B |
| E13 | **Details** | Bekijk bestand (link), nummer, vervaldatum | — |
| E14 | **Goedkeuren** | Optioneel interne notitie | Freelancer ziet **Goedgekeurd** |
| E15 | **Afwijzen** | Met feedback in notities | Freelancer kan opnieuw uploaden |
| E16 | **Markeer verlopen** | Bij verlopen document | Status **Verlopen** |

### E5 — Opdracht aanmaken en freelancer toewijzen

| # | Stap | Actie | Verwacht resultaat |
|---|------|-------|-------------------|
| E17 | `/admin/assignments` | Vul formulier **Nieuwe opdracht** (titel, type, locatie, datums, optioneel diensttijden, tariefnotitie) | — |
| E18 | Klik **Opdracht aanmaken** | — | Opdracht in lijst |
| E19 | Klik **Beheren** bij de opdracht | — | Detailpaneel |
| E20 | Vink actieve **freelancer(s)** aan | — | — |
| E21 | Klik **Toewijzing opslaan** | — | Freelancer ziet opdracht op `/portal/jobs` |

### E6 — Uren goedkeuren

| # | Stap | Actie | Verwacht resultaat |
|---|------|-------|-------------------|
| E22 | `/admin/hours` | Filter **Ingediend** | Uren uit Scenario C |
| E23 | **Details** | Controleer datum, tijden, opdracht | — |
| E24 | **Goedkeuren** | Optioneel interne notitie | Freelancer: status **Goedgekeurd** |
| E25 | Of **Afwijzen** | Met notitie | Freelancer kan corrigeren en opnieuw indienen |

### E7 — Factuur genereren en afhandelen

| # | Stap | Actie | Verwacht resultaat |
|---|------|-------|-------------------|
| E26 | `/admin/invoices` | Sectie **Nieuwe factuur genereren** | — |
| E27 | Selecteer **freelancer** | — | Telling goedgekeurde, nog niet gefactureerde uren |
| E28 | Stel **uurtarief (EUR)** in | Standaard ca. € 18,50 | — |
| E29 | Optioneel: opmerking op factuur | — | — |
| E30 | **Factuur genereren** | — | Conceptfactuur; uren gekoppeld (`invoiceId`) |
| E31 | Filter **Concept** → **Details** | Controleer regels | — |
| E32 | **PDF** | Print / opslaan als PDF | — |
| E33 | **Goedkeuren** | — | Freelancer ziet factuur op `/portal/invoices` |
| E34 | Na handmatige betaling: filter **Goedgekeurd** → **Betaald** | — | Status **Betaald** |

**Factuurstatussen:**

| Status | Zichtbaar voor freelancer | Betekenis |
|--------|---------------------------|-----------|
| Concept | Nee | Intern, nog controleren |
| Goedgekeurd | Ja | Officiële factuur, wacht op betaling |
| Betaald | Ja | Betaling verwerkt door H&B |

### E8 — Dashboard & data-export

| # | Stap | Actie |
|---|------|-------|
| E35 | `/admin/dashboard` → **Vernieuwen** | KPI’s bijwerken na bovenstaande stappen |
| E36 | **Gebruikers exporteren** | CSV-download |
| E37 | **Uren exporteren** | CSV-download |
| E38 | **Compliance exporteren** | CSV-download |
| E39 | **Facturen exporteren** | CSV-download |

Open CSV-bestanden in Excel (UTF-8, komma-gescheiden).

---

## 9. Scenario F — Masterflow A tot Z (acceptatietest)

Gebruik **twee browsers** (of incognito + normaal): één als **freelancer**, één als **beheerder**.

| Fase | Wie | Stappen | Controle |
|------|-----|---------|----------|
| **1. Lead** | Bezoeker | Scenario A (B2B-aanvraag) | Admin: aanvraag **Nieuw** |
| **2. Apply** | Freelancer | Scenario B (formulier + register + compliance upload) | Admin: onboarding **In behandeling** |
| **3. Approve account** | Admin | E2 + E4 compliance | Freelancer: portaal opent |
| **4. Assign** | Admin | E5 | Freelancer: opdracht op `/portal/jobs` |
| **5. Hours** | Freelancer | Scenario C4 (concept → indienen) | Admin: uren **Ingediend** |
| **6. Approve hours** | Admin | E6 | Freelancer: **Goedgekeurd** |
| **7. Invoice** | Admin | E7 (genereren → goedkeuren) | Freelancer: factuur + PDF |
| **8. Pay** | Admin | E7 stap **Betaald** | Freelancer: status **Betaald** |
| **9. Report** | Admin | E8 export + dashboard KPI’s | CSV klopt met handmatige telling |

**Acceptatiecriteria:** geen foutmeldingen in browserconsole; elke status overeenkomstig met tabel in §11; freelancer kan **geen** admin-URL’s openen; pending freelancer kan **geen** `/portal/*` openen (alleen pending + compliance).

---

## 10. Referentie: schermen & URL’s

### Publieke website (selectie)

| Pagina | URL |
|--------|-----|
| Home | `/` |
| Freelancers overzicht | `/freelancers` |
| Direct aanmelden | `/freelancers/direct-aanmelden` |
| Openstaande opdrachten (marketing) | `/freelancers/openstaande-opdrachten` |
| Personeel aanvragen | `/bedrijven/personeel-aanvragen` |
| Contact | `/contact` |
| Privacy | `/juridisch/privacy` |
| Cookiebeleid | `/juridisch/cookies` |
| Algemene voorwaarden | `/juridisch/algemene-voorwaarden` |

### Authenticatie

| Pagina | URL |
|--------|-----|
| Inloggen | `/login` |
| Registreren | `/auth/register` |
| Wachtwoord vergeten | `/auth/forgot-password` |
| Account in behandeling | `/auth/pending` |
| Compliance (pending user) | `/auth/compliance` |

### Freelancerportaal *(login verplicht, rol freelancer, status actief)*

| Pagina | URL |
|--------|-----|
| Dashboard | `/portal/dashboard` |
| Compliance | `/portal/compliance` |
| Opdrachten | `/portal/jobs` |
| Opdrachtdetail | `/portal/jobs/{id}` |
| Urenoverzicht | `/portal/hours` |
| Uren registreren | `/portal/hours/new` |
| Uren bewerken | `/portal/hours/new?edit={id}` |
| Facturen | `/portal/invoices` |

### Beheerportaal *(login verplicht, rol admin, status actief)*

| Pagina | URL |
|--------|-----|
| Dashboard | `/admin/dashboard` |
| Personeelsaanvragen | `/admin/staff-requests` |
| Gebruikers | `/admin/users` |
| Onboarding | `/admin/onboarding` |
| Opdrachten | `/admin/assignments` |
| Uren | `/admin/hours` |
| Facturen | `/admin/invoices` |
| Compliance | `/admin/compliance` |

---

## 11. Referentie: statussen

### Accountstatus (`users`)

| Status | Freelancer ervaring |
|--------|---------------------|
| `pending` | Alleen `/auth/pending` + compliance upload |
| `active` | Volledig portaal of beheer |
| `rejected` | Melding: aanmelding afgewezen |
| `suspended` | Melding: account gepauzeerd |

### Onboarding-aanmelding

| Status | Label in beheer |
|--------|-----------------|
| `pending` | In behandeling |
| `approved` | Goedgekeurd |
| `rejected` | Afgewezen |

### B2B personeelsaanvraag

| Status | Label |
|--------|-------|
| `new` | Nieuw |
| `in_progress` | In behandeling |
| `closed` | Afgerond |

### Compliance-document

| Status | Label |
|--------|-------|
| `pending` | In behandeling |
| `approved` | Goedgekeurd |
| `rejected` | Afgewezen |
| `expired` | Verlopen |

### Urenregistratie

| Status | Label |
|--------|-------|
| `draft` | Concept |
| `submitted` | Ingediend |
| `approved` | Goedgekeurd |
| `rejected` | Afgewezen |

### Factuur

| Status | Label |
|--------|-------|
| `draft` | Concept |
| `approved` | Goedgekeurd |
| `paid` | Betaald |

---

## 12. Veelgestelde vragen & tips

### De freelancer ziet geen opdrachten

- Controleer of de beheerder de freelancer heeft **toegewezen** bij de opdracht (`/admin/assignments` → **Beheren** → **Toewijzing opslaan**).
- Controleer of het account **actief** is.

### Upload van compliance mislukt

- Bestandstype: PDF of afbeelding; max. ca. 10 MB.
- ImageKit moet correct geconfigureerd zijn (technische beheerder).
- Probeer een andere browser of kleiner bestand.

### Uren kunnen niet worden ingediend

- Selecteer een **toegewezen opdracht**.
- Eindtijd moet na starttijd liggen; pauze mag totaal niet langer zijn dan gewerkte tijd.
- Alleen **concept** of **afgewezen** registraties zijn bewerkbaar.

### Geen uren beschikbaar voor factuur

- Uren moeten status **Goedgekeurd** hebben.
- Uren die al op een factuur staan (`invoiceId` gevuld) worden niet opnieuw gefactureerd.

### Freelancer ziet geen conceptfactuur

- **Bedoeld gedrag:** alleen goedgekeurde en betaalde facturen zijn zichtbaar in het freelancerportaal.

### PDF-factuur

- Klik **PDF** → browserprintdialoog → kies **Opslaan als PDF** (niet een apart opgeslagen serverbestand).

### Cookie-instellingen wijzigen

- Wis sitegegevens/cookies voor het domein en herlaad de pagina om de cookiebalk opnieuw te zien.

### Technische ondersteuning

- Contact via `/contact` of het e-mailadres in de footer.
- Voor technische implementatie: zie `docs/E2E-WORKFLOW-TEST.md` en `docs/REMAINING-WORK.md` (intern).

---

## Bijlage — Testchecklist (afdrukken)

| # | Test | OK | Opmerkingen |
|---|------|----|-------------|
| 1 | Cookiebalk werkt | ☐ | |
| 2 | B2B-aanvraag verzonden | ☐ | |
| 3 | Freelancer aanmeldformulier | ☐ | |
| 4 | Freelancer register + pending | ☐ | |
| 5 | Compliance upload (pending) | ☐ | |
| 6 | Admin onboarding goedkeuren | ☐ | |
| 7 | Admin compliance goedkeuren | ☐ | |
| 8 | Freelancer portaal toegang | ☐ | |
| 9 | Opdracht toewijzen | ☐ | |
| 10 | Uren indienen | ☐ | |
| 11 | Uren goedkeuren | ☐ | |
| 12 | Factuur genereren | ☐ | |
| 13 | Factuur goedkeuren (freelancer ziet) | ☐ | |
| 14 | Factuur betaald | ☐ | |
| 15 | CSV-export dashboard | ☐ | |
| 16 | Wachtwoord vergeten | ☐ | |
| 17 | Uitloggen / opnieuw inloggen | ☐ | |

---

**H&B Service Group — HNB Portal User Manual v1.0**  
*Voor vragen over deze handleiding: neem contact op met uw implementatiepartner of H&B Service Group.*
