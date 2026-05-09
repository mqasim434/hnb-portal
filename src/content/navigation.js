/** Primary marketing navigation (Dutch). */

export const NAV_GROUPS = [
  {
    id: 'freelancers',
    label: 'Freelancers',
    pathPrefix: '/freelancers',
    items: [
      { to: '/freelancers/ontdek-mogelijkheden', label: 'Ontdek mogelijkheden' },
      { to: '/freelancers/zo-werkt-het', label: 'Zo werkt het' },
      { to: '/freelancers/inkomsten-betalingen', label: 'Inkomsten & betalingen' },
      { to: '/freelancers/veiligheid-certificering', label: 'Veiligheid & certificering' },
      { to: '/freelancers/werkwijze', label: 'Werkwijze' },
      { to: '/freelancers/aan-de-slag', label: 'Aan de slag' },
    ],
  },
  {
    id: 'bedrijven',
    label: 'Bedrijven',
    pathPrefix: '/bedrijven',
    items: [
      { to: '/bedrijven/vind-talent', label: 'Vind talent' },
      { to: '/bedrijven/vergelijk-professionals', label: 'Vergelijk professionals' },
      { to: '/bedrijven/tarieven', label: 'Tarieven' },
      { to: '/bedrijven/filters', label: 'Filters' },
      { to: '/bedrijven/sectoren', label: 'Sectoren' },
      { to: '/bedrijven/functies', label: 'Functies' },
      { to: '/bedrijven/flexpools', label: 'Flexpools' },
    ],
  },
  {
    id: 'over-hb',
    label: 'Over H&B Service Group',
    pathPrefix: '/over-hb',
    items: [
      { to: '/over-hb/over-ons', label: 'Over ons' },
      { to: '/over-hb/wie-wij-zijn', label: 'Wie wij zijn' },
      { to: '/over-hb/wat-wij-doen', label: 'Wat wij doen' },
      { to: '/over-hb/nieuws', label: 'Nieuws' },
      { to: '/over-hb/chat', label: 'Chat' },
      { to: '/over-hb/netwerk', label: 'Netwerk' },
      { to: '/over-hb/beleid', label: 'Beleid' },
    ],
  },
]

export const HEADER_CTAS = [
  { to: '/bedrijven/vind-talent', label: 'Vind talent', variant: 'primary' },
  { to: '/freelancers/ontdek-mogelijkheden', label: 'Ontdek mogelijkheden', variant: 'outline' },
]

export const FOOTER_TAGLINE =
  'Betrouwbaar eventpersoneel. Wanneer u het nodig heeft.'
