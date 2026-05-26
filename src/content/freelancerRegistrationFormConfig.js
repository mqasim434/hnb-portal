/** Opties voor het direct-aanmeldformulier (Nederlandse labels). */

/** @type {{ value: string, label: string }[]} */
export const FL_REG_DOMEIN_OPTS = [
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'beveiliging', label: 'Beveiliging' },
  { value: 'algemeen', label: 'Algemeen eventpersoneel' },
]

/**
 * Voorkeursrollen per gekozen domein (value = domein-key).
 * @type {Record<string, { value: string, label: string }[]>}
 */
export const FL_REG_ROLLEN_BY_DOMEIN = {
  hospitality: [
    { value: 'host_hostess', label: 'Host / hostess' },
    { value: 'bar_bediening', label: 'Bar / bediening' },
    { value: 'registratie', label: 'Registratie / ontvangst' },
    { value: 'runner_hospitality', label: 'Runner (hospitality)' },
    { value: 'ontbijt_catering', label: 'Ontbijt / cateringondersteuning' },
  ],
  beveiliging: [
    { value: 'portier_event', label: 'Portier / eventbeveiliging' },
    { value: 'object', label: 'Objectbeveiliging' },
    { value: 'backstage_perimeter', label: 'Backstage / perimeter' },
  ],
  algemeen: [
    { value: 'runner_productie', label: 'Runner / productie' },
    { value: 'opbouw_afbouw', label: 'Opbouw / afbouw' },
    { value: 'allround', label: 'Allround eventhulp' },
  ],
}

/** @type {{ value: string, label: string }[]} */
export const FL_REG_ERVARING_OPTS = [
  { value: 'geen', label: 'Geen ervaring' },
  { value: '1_2_seizoenen', label: '1-2 seizoenen' },
  { value: '3_plus_seizoenen', label: '3+ seizoenen' },
  { value: 'doorgewinterd', label: 'Doorgewinterd' },
]

/** @type {{ value: string, label: string }[]} */
export const FL_REG_BESCHIKBAARHEID_OPTS = [
  { value: 'doordeweeks_overdag', label: 'Doordeweeks overdag' },
  { value: 'doordeweeks_avond', label: 'Doordeweeks avond' },
  { value: 'weekend_overdag', label: 'Weekend overdag' },
  { value: 'weekend_avond_nacht', label: 'Weekend avond-nacht' },
  { value: 'feestdagen', label: 'Feestdagen' },
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
export const FL_REG_JA_NEE_AANVRAAG = [
  { value: 'ja', label: 'Ja' },
  { value: 'nee', label: 'Nee' },
  { value: 'aanvraag', label: 'In aanvraag' },
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

/** @type {{ value: string, label: string }[]} */
export const FL_REG_HACCP_OPTS = [
  { value: 'ja', label: 'Ja' },
  { value: 'nee', label: 'Nee' },
  { value: 'nvt', label: 'Niet van toepassing' },
]
