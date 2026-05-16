/** Primary marketing navigation (Dutch). Chat, Netwerk en Beleid staan niet in het hoofdmenu. */

export const NAV_GROUPS = [
  {
    id: 'freelancers',
    label: 'Freelancers',
    pathPrefix: '/freelancers',
    items: [
      { to: '/freelancers', label: 'Overzicht' },
      { to: '/freelancers/openstaande-opdrachten', label: 'Openstaande opdrachten' },
      { to: '/freelancers/hoe-het-werkt', label: 'Hoe het werkt' },
      { to: '/freelancers/inkomsten-betalingen', label: 'Inkomsten & betalingen' },
      { to: '/freelancers/jouw-certificering', label: 'Jouw certificering' },
      { to: '/freelancers/direct-aanmelden', label: 'Direct aanmelden' },
    ],
  },
  {
    id: 'bedrijven',
    label: 'Bedrijven',
    pathPrefix: '/bedrijven',
    items: [
      { to: '/bedrijven/personeel-aanvragen', label: 'Personeel aanvragen' },
      { to: '/bedrijven/ons-aanbod', label: 'Ons aanbod' },
      { to: '/bedrijven/tarieven', label: 'Tarieven op aanvraag' },
      { to: '/bedrijven/sectoren', label: 'Onze sectoren' },
      { to: '/bedrijven/functies', label: 'Functieprofielen' },
      { to: '/bedrijven/vaste-samenwerking', label: 'Vaste samenwerking' },
    ],
  },
  {
    id: 'over-hb',
    label: 'Over H&B',
    /** Volledige naam voor tooltip (desktop nav ruimte) */
    groupTitle: 'Over H&B Service Group',
    pathPrefix: '/over-hb',
    items: [
      { to: '/over-hb/ons-verhaal', label: 'Ons verhaal' },
      { to: '/over-hb/het-team', label: 'Het team' },
      { to: '/over-hb/werkgebied', label: 'Werkgebied' },
      { to: '/over-hb/onze-aanpak', label: 'Onze aanpak' },
      { to: '/over-hb/vergunningen-compliance', label: 'Vergunningen & compliance' },
      { to: '/over-hb/nieuws', label: 'Nieuws' },
    ],
  },
]

/** Desktop header CTAs (mobile menu gebruikt vaste labels onderaan). */
export const HEADER_CTAS = [
  { to: '/bedrijven/personeel-aanvragen', label: 'Personeel aanvragen', variant: 'primary' },
  {
    to: '/freelancers/openstaande-opdrachten',
    label: 'Openstaande opdrachten',
    variant: 'outline',
  },
]

export const MOBILE_MENU_PRIMARY_CTA = {
  to: '/bedrijven/personeel-aanvragen',
  label: 'Personeel aanvragen',
}

export const MOBILE_MENU_SECONDARY_CTA = {
  to: '/freelancers/direct-aanmelden',
  label: 'Direct aanmelden',
}

export const FOOTER_TAGLINE =
  'Betrouwbaar eventpersoneel. Wanneer u het nodig heeft.'

/** Juridische pagina’s (footer, niet in hoofdnavigatie). */
export const FOOTER_LEGAL_LINKS = [
  { to: '/juridisch/privacy', label: 'Privacy' },
  { to: '/juridisch/cookies', label: 'Cookies' },
  { to: '/juridisch/algemene-voorwaarden', label: 'Algemene voorwaarden' },
]
