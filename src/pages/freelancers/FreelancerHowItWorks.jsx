import { Link } from 'react-router-dom'
import HowItWorksTimeline from '../../components/freelancers/HowItWorksTimeline'
import MarketingCtaStrip from '../../components/marketing/MarketingCtaStrip'
import PageHero from '../../components/marketing/PageHero'
import { HOW_IT_WORKS_TIMELINE_STEPS } from '../../content/freelancerHowItWorks'
import { FREELANCER_SEO } from '../../content/freelancerSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import './freelancers-pages.css'

export default function FreelancerHowItWorks() {
  const seo = FREELANCER_SEO.hoeHetWerkt
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  return (
    <main className="fl-page">
      <PageHero
        variant="light"
        eyebrow="FREELANCERS"
        title="Hoe het werkt"
        lead="Van aanmelding tot definitieve bevestiging op de planning: heldere stappen en vaste afspraken, zodat u weet wat u kunt verwachten."
        stackCtasOnMobile
      >
        <Link to="/freelancers/direct-aanmelden" className="hnb-btn hnb-btn--freelancer">
          Direct aanmelden
        </Link>
        <Link to="/freelancers/openstaande-opdrachten" className="hnb-btn hnb-btn--outline">
          Bekijk opdrachten
        </Link>
      </PageHero>

      <section className="fl-section fl-section--surface hnb-container" aria-labelledby="fl-timeline-title">
        <header className="fl-section__head">
          <span className="fl-section__eyebrow">Tijdlijn</span>
          <h2 id="fl-timeline-title" className="fl-section__title">
            Zo loopt uw traject
          </h2>
          <p className="fl-section__lead">
            Vijf duidelijke fasen — elk met een korte toelichting zodat u precies weet waar u aan toe bent.
          </p>
        </header>
        <HowItWorksTimeline steps={HOW_IT_WORKS_TIMELINE_STEPS} />
      </section>

      <MarketingCtaStrip
        headingId="fl-how-works-cta-heading"
        title="Voldoet u aan de eisen?"
        lead="Start uw aanmelding — wij plannen uw check en onboarding rond uw beschikbaarheid."
        primaryTo="/freelancers/direct-aanmelden"
        primaryLabel="Naar het formulier"
        secondaryTo="/freelancers/jouw-certificering"
        secondaryLabel="Certificering bekijken"
        primaryVariant="freelancer"
        secondaryVariant="freelancer"
      />
    </main>
  )
}
