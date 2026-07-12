/**
 * Nieuws — teasers + volledige artikelen (FIX 58 option A, FIX 59).
 * @typedef {{ slug: string, monthLabel: string, isoDate: string, title: string, excerpt: string, author: string, sections: { heading: string, paragraphs: string[] }[] }} NewsArticle
 */

/** @type {NewsArticle[]} */
export const NEWS_ARTICLES = [
  {
    slug: 'nieuwe-freelancerportal-april-2026',
    monthLabel: 'APRIL 2026',
    isoDate: '2026-04-01',
    title: 'Nieuwe freelancerportal in gebruik',
    excerpt:
      'Freelancers kunnen vanaf nu hun uren, beschikbaarheid en facturatieonderdelen volledig digitaal volgen via het portaal. Wij rollen stapsgewijs uit en begeleiden bestaande teams bij de overstap.',
    author: 'H&B Redactie',
    sections: [
      {
        heading: 'Digitaal dossier, minder ruis',
        paragraphs: [
          'We hebben de freelancerportal uitgebreid zodat planning, uren en facturatie-onderdelen op één plek samenkomen. Het doel is simpel: minder e-mailheen-en-weer vlak voor factuurdeadlines en snellere vaststelling van beschikbaarheid rond terugkerende programma\'s.',
          'Bestaande freelancers krijgen persoonlijke begeleiding bij de overstap: korte video-instructies en, waar nodig, een checkgesprek met onboarding.',
        ],
      },
      {
        heading: 'Wat u merkt als partner',
        paragraphs: [
          'Voor opdrachtgevers verandert vooral de snelheid en transparantie: status van urenmutaties wordt beter zichtbaar en documentatie rondom shifts is geordend voor audit en vergunningverlener waar van toepassing.',
        ],
      },
    ],
  },
  {
    slug: 'verscherpte-screening-beveiliging-maart-2026',
    monthLabel: 'MAART 2026',
    isoDate: '2026-03-01',
    title: 'Verscherpte screening beveiliging',
    excerpt:
      'In lijn met de gewijzigde vergunningsplicht hebben wij onze controle op diploma\'s en actuele registraties aangescherpt — transparanter voor opdrachtgevers en sneller verwerkt in het rooster.',
    author: 'H&B Redactie',
    sections: [
      {
        heading: 'Strakkere checks vóór plaatsing',
        paragraphs: [
          'We hebben onze interne controle op legitimatiebewijzen, geldigheid van registraties en rol-match aangescherpt. Gegevens worden tijdig gevalideerd zodat voorstellen voor roosters niet stranden op het laatste moment.',
          'Transparant voor u: waar iemand niet voldoet, documenteren wij de reden en zoeken we parallel naar haalbare alternatieven passend bij uw locatiebeleid.',
        ],
      },
      {
        heading: 'Effect op doorlooptijd',
        paragraphs: [
          'Door vroeg signaleren blijft uw projectie op bezetting stabieler. Teams op de vloer merken vooral dat er minder “onbekende namen” meer op de dag zelf hoeven te schuiven.',
        ],
      },
    ],
  },
  {
    slug: 'partnerschap-amsterdamse-venuegroep-februari-2026',
    monthLabel: 'FEBRUARI 2026',
    isoDate: '2026-02-01',
    title: 'Partnerschap met Amsterdamse venuegroep',
    excerpt:
      'Vaste flexpool voor servicemedewerkers en deurbeveiliging op meerdere locaties — kortere instaptijd voor teams en consistente service voor terugkerende bezoekers',
    author: 'H&B Redactie',
    sections: [
      {
        heading: 'Één briefing, meerdere zaaldeuren',
        paragraphs: [
          'We werken samen met een venuegroep aan vaste flexpools voor servicemedewerkers en deurbeveiliging. Terugkerende bezoekers zien herkenbare teams; locaties krijgen voorspelbare coördinatielijnen.',
          'Uniform- en huisregels zijn per locatie vastgelegd; roosters worden afgestemd op publieksprofiel en vergunning.',
        ],
      },
      {
        heading: 'Operational excellence',
        paragraphs: [
          'Kortere instaptijd voor teams betekent minder herbriefing bij elke individuele booking. Daardoor blijft de kwaliteit op piekavonden consistenter — ook als er meerdere zalen tegelijk openen.',
        ],
      },
    ],
  },
]

export function getNewsArticleBySlug(slug) {
  return NEWS_ARTICLES.find((a) => a.slug === slug)
}

export function getRelatedNews(slug, limit = 3) {
  return NEWS_ARTICLES.filter((a) => a.slug !== slug).slice(0, limit)
}
