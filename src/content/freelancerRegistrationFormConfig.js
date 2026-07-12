/** Opties voor het direct-aanmeldformulier (Nederlandse labels). */

/** @type {{ value: string, label: string }[]} */
export const FL_REG_DOMEIN_OPTS = [
  { value: 'hospitality', label: 'Servicemedewerkers (hosts)' },
  { value: 'beveiliging', label: 'Beveiliging' },
]

/**
 * Voorkeursrollen per gekozen domein (value = domein-key).
 * Servicemedewerkers: geen aparte rolkeuze (klantreview).
 * @type {Record<string, { value: string, label: string }[]>}
 */
export const FL_REG_ROLLEN_BY_DOMEIN = {
  hospitality: [],
  beveiliging: [
    { value: 'portier', label: 'Portier' },
    { value: 'eventbeveiliging', label: 'Eventbeveiliging' },
    { value: 'object', label: 'Objectbeveiliging' },
  ],
}

/** @type {{ value: string, label: string }[]} */
export const FL_REG_ERVARING_OPTS = [
  { value: 'geen', label: 'Geen ervaring' },
  { value: '1_2_jaar', label: '1–2 jaar ervaring' },
  { value: '3_plus_jaar', label: '3+ jaar ervaring' },
  { value: 'doorgewinterd', label: 'Doorgewinterd (5+ jaar)' },
]

/** @type {{ value: string, label: string }[]} */
export const FL_REG_BEVEILIGINGSPAS_OPTS = [
  { value: 'grijs', label: 'Grijze beveiligingspas — allround beveiliger' },
  { value: 'groen', label: 'Groene beveiligingspas — beveiliger in opleiding' },
  { value: 'blauw_portier', label: 'Blauwe beveiligingspas — portier' },
  { value: 'blauw_event', label: 'Blauwe beveiligingspas — evenement' },
  { value: 'oranje', label: 'Oranje beveiligingspas — voetbalsteward' },
]

/** @type {{ value: string, label: string }[]} */
export const FL_REG_REIS_OPTS = [
  { value: 'woonplaats', label: 'Alleen woonplaats' },
  { value: 'km30', label: 'Tot 30 km' },
  { value: 'km60', label: 'Tot 60 km' },
  { value: 'heel_nl', label: 'Heel Nederland' },
]

/** @type {{ value: string, label: string }[]} */
export const FL_REG_CONTRACT_OPTS = [
  { value: 'loondienst', label: 'Loondienst' },
  { value: 'payroll', label: 'Payroll' },
  { value: 'zzp', label: 'zzp met modelovereenkomst' },
  { value: 'geen_voorkeur', label: 'Maakt me niet uit' },
]

/** @type {{ value: string, label: string }[]} */
export const FL_REG_JA_NEE_OPLEIDING = [
  { value: 'ja', label: 'Ja' },
  { value: 'nee', label: 'Nee' },
  { value: 'opleiding', label: 'In opleiding' },
]

/** @type {{ value: string, label: string }[]} */
export const FL_REG_JA_NEE = [
  { value: 'ja', label: 'Ja' },
  { value: 'nee', label: 'Nee' },
]

/** @type {{ value: string, label: string }[]} */
export const FL_REG_VOG_OPTS = [
  { value: 'ja', label: 'Ja' },
  { value: 'nee', label: 'Nee' },
  { value: 'bereid', label: 'Bereid om aan te vragen' },
]

/** @type {{ value: string, label: string }[]} */
export const FL_REG_SVH_OPTS = [
  { value: 'ja', label: 'Ja' },
  { value: 'nee', label: 'Nee' },
  { value: 'bereid', label: 'Bereid om te halen' },
]
