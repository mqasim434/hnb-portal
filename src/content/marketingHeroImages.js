/**
 * Marketing hero visuals.
 * Homepage gebruikt het vorige live-event beeld (licht getoond via CSS).
 * Overige pagina's: zakelijk daglichtbeeld.
 */

/** Vorige homepage-hero — live event / menigte */
export const HOME_PAGE_HERO_SRC =
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=2400&h=1350&q=82'

/** @type {{ src: string, width: number, height: number, alt: string }} */
export const HOME_PAGE_HERO = {
  src: HOME_PAGE_HERO_SRC,
  width: 2400,
  height: 1350,
  alt: 'Publiek en sfeer tijdens een live event — H&B Service Group levert hospitality en beveiliging voor festivals, venues en zakelijke programma\'s.',
}

export const CORPORATE_DAYLIGHT_EVENT_HERO_SRC =
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2400&h=1350&q=82'

/** @type {{ src: string, width: number, height: number, alt: string }} */
export const CORPORATE_DAYLIGHT_EVENT_HERO = {
  src: CORPORATE_DAYLIGHT_EVENT_HERO_SRC,
  width: 2400,
  height: 1350,
  alt: 'Professionals tijdens een zakelijke bespreking overdag — H&B Service Group levert hospitality en beveiliging voor congressen en live events.',
}
