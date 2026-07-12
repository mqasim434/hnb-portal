/**
 * Demodata voor openstaande opdrachten (`/freelancers/openstaande-opdrachten`).
 * Later te vervangen door API-inhoud.
 * @typedef {'Servicemedewerker' | 'Beveiliging'} AssignmentDomain
 * @typedef {'open' | 'bijna_vol' | 'gesloten'} AssignmentStatus
 */

/**
 * @type {{
 *   id: string
 *   eventType: string
 *   domain: AssignmentDomain
 *   roleLabel: string
 *   dateISO: string
 *   dateLabel: string
 *   locationLine: string
 *   cityFilter: string
 *   hoursLabel: string
 *   crewLine: string
 *   rateLabel: string
 *   certification: string
 *   status: AssignmentStatus
 *   statusLabel: string
 * }[]}
 */
export const FREELANCER_ASSIGNMENTS_SAMPLE = [
  {
    id: 'a',
    eventType: 'ISG-evenement',
    domain: 'Servicemedewerker',
    roleLabel: 'Servicemedewerker (host)',
    dateISO: '2026-06-14',
    dateLabel: 'Za 14 juni 2026',
    locationLine: 'Amsterdam, Westerpark',
    cityFilter: 'Amsterdam',
    hoursLabel: '11:00–01:00 (incl. 60 min pauze)',
    crewLine: '4 plekken open van 12 in team',
    rateLabel: 'Tarief: op aanvraag — definitief in de briefing',
    certification: 'Representatief profiel',
    status: 'open',
    statusLabel: 'OPEN',
  },
  {
    id: 'b',
    eventType: 'Corporate receptie',
    domain: 'Servicemedewerker',
    roleLabel: 'Servicemedewerker (host)',
    dateISO: '2026-06-19',
    dateLabel: 'Do 19 juni 2026',
    locationLine: 'Utrecht, Jaarbeurs',
    cityFilter: 'Utrecht',
    hoursLabel: '16:00–00:00 (incl. 30 min pauze)',
    crewLine: '6 plekken open van 8 in team',
    rateLabel: 'Tarief: op aanvraag — definitief in de briefing',
    certification: 'Geen verplicht certificaat — representatief profiel',
    status: 'open',
    statusLabel: 'OPEN',
  },
  {
    id: 'c',
    eventType: 'Objectbeveiliging',
    domain: 'Beveiliging',
    roleLabel: 'Portier',
    dateISO: '2026-06-20',
    dateLabel: 'Vr 20 juni 2026',
    locationLine: 'Amsterdam, Centrum',
    cityFilter: 'Amsterdam',
    hoursLabel: '21:00–04:00 (incl. 30 min pauze)',
    crewLine: '1 plek open van 6 in team',
    rateLabel: 'Tarief: op aanvraag — definitief in de briefing',
    certification: 'Diploma Beveiliger 2 + geldige beveiligingspas',
    status: 'bijna_vol',
    statusLabel: 'BIJNA VOL',
  },
  {
    id: 'd',
    eventType: 'Evenementbeveiliging',
    domain: 'Beveiliging',
    roleLabel: 'Eventbeveiliging',
    dateISO: '2026-06-22',
    dateLabel: 'Zo 22 juni 2026',
    locationLine: 'Haarlem, Stadshart',
    cityFilter: 'Haarlem',
    hoursLabel: '09:00–20:00 (incl. 60 min pauze)',
    crewLine: '8 plekken open van 14 in team',
    rateLabel: 'Tarief: op aanvraag — definitief in de briefing',
    certification: 'Diploma Beveiliger 2 + beveiligingspas — BHV aanbevolen',
    status: 'open',
    statusLabel: 'OPEN',
  },
  {
    id: 'e',
    eventType: 'COA-locatie',
    domain: 'Servicemedewerker',
    roleLabel: 'Servicemedewerker (host)',
    dateISO: '2026-06-25',
    dateLabel: 'Wo 25 juni 2026',
    locationLine: 'Rotterdam',
    cityFilter: 'Rotterdam',
    hoursLabel: '14:00–23:30 (incl. 45 min pauze)',
    crewLine: 'Bezetting: vervuld',
    rateLabel: 'Tarief: op aanvraag — definitief in de briefing',
    certification: 'BHV aanbevolen',
    status: 'gesloten',
    statusLabel: 'GESLOTEN',
  },
  {
    id: 'f',
    eventType: 'Zakelijke bijeenkomst',
    domain: 'Servicemedewerker',
    roleLabel: 'Registratie & ontvangst',
    dateISO: '2026-07-01',
    dateLabel: 'Di 01 juli 2026',
    locationLine: 'Amsterdam, Zuidas',
    cityFilter: 'Amsterdam',
    hoursLabel: '07:30–15:00 (incl. 30 min pauze)',
    crewLine: '3 plekken open van 5 in team',
    rateLabel: 'Tarief: op aanvraag — definitief in de briefing',
    certification: 'Representatief profiel',
    status: 'open',
    statusLabel: 'OPEN',
  },
]
