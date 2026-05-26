import { Link } from 'react-router-dom'
import MarketingFeatureCard from '../../components/marketing/MarketingFeatureCard'
import PageHero from '../../components/marketing/PageHero'
import { FREELANCER_SEO } from '../../content/freelancerSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import './freelancers-pages.css'

const CARDS = [
  {
    to: '/freelancers/openstaande-opdrachten',
    label: 'Opdrachten',
    title: 'Openstaande opdrachten',
    text: 'Bekijk actuele shifts met rol, stad, uren en certificeringseisen — transparant voordat u zich aanmeldt.',
  },
  {
    to: '/freelancers/hoe-het-werkt',
    label: 'Proces',
    title: 'Hoe het werkt',
    text: 'Tijdlijn van aanmelding tot uitbetaling: screening, briefing, werk op locatie en urenregistratie.',
  },
  {
    to: '/freelancers/inkomsten-betalingen',
    label: 'Financiën',
    title: 'Inkomsten & betalingen',
    text: 'Hoe tarieven, mutaties en betaaltermijnen in elkaar zitten — geen verrassingen na uw dienst.',
  },
  {
    to: '/freelancers/jouw-certificering',
    label: 'Compliance',
    title: 'Jouw certificering',
    text: 'Overzicht per domein: hospitality en beveiliging, inclusief veelvoorkomende locatie-eisen.',
  },
  {
    to: '/freelancers/direct-aanmelden',
    label: 'Aanmelden',
    title: 'Direct aanmelden',
    text: 'Start uw profiel: voorkeursrollen, beschikbaarheid en contactgegevens. Wij nemen persoonlijk contact op.',
  },
  {
    to: '/contact',
    label: 'Contact',
    title: 'Vragen vóór u zich aanmeldt?',
    text: 'Ons team helpt met certificering, beschikbaarheid en praktische verwachtingen op locatie.',
    linkText: 'Contact opnemen →',
  },
]

export default function FreelancersHub() {
  const seo = FREELANCER_SEO.hub
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  return (
    <main className="fl-page">
      <PageHero
        variant="navy"
        eyebrow="Freelancers"
        title="Werk dat past bij uw vak"
        lead="H&B Service Group verbindt u aan hospitality- en beveiligingsopdrachten met duidelijke afspraken, vaste communicatielijnen en ondersteuning vanuit Amsterdam."
        stackCtasOnMobile
      >
        <Link to="/freelancers/openstaande-opdrachten" className="hnb-btn hnb-btn--freelancer">
          Bekijk opdrachten
        </Link>
        <Link to="/freelancers/direct-aanmelden" className="hnb-btn hnb-btn--freelancer">
          Direct aanmelden
        </Link>
      </PageHero>

      <section className="fl-section fl-section--surface hnb-container" aria-label="Freelancer-onderwerpen">
        <header className="fl-section__head">
          <span className="fl-section__eyebrow">Navigatie</span>
          <h2 className="fl-section__title">Alles voor uw traject bij H&amp;B</h2>
          <p className="fl-section__lead">
            Kies een onderwerp hieronder. Elk thema is gericht op wat u nodig heeft: openstaande shifts, de
            procesuitleg, uw certificering, of direct aanmelden. Zodra u live staat in het systeem, vindt u dezelfde
            informatie ook in het portaal.
          </p>
        </header>
        <div className="fl-hub-grid">
          {CARDS.map((c) => (
            <MarketingFeatureCard
              key={c.to}
              variant="hub"
              label={c.label}
              title={c.title}
              text={c.text}
              linkTo={c.to}
              linkText={c.linkText ?? `Naar ${c.title.toLowerCase()} →`}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
