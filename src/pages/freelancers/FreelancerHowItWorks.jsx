import { Link } from 'react-router-dom'
import HowItWorksTimeline from '../../components/freelancers/HowItWorksTimeline'
import MarketingCtaStrip from '../../components/marketing/MarketingCtaStrip'
import PageHero from '../../components/marketing/PageHero'
import { MARKETING_PAGES } from '../../content/marketingPages'
import { HOW_IT_WORKS_TIMELINE_STEPS } from '../../content/freelancerHowItWorks'
import { FREELANCER_SEO } from '../../content/freelancerSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import './freelancers-pages.css'

const COPY = MARKETING_PAGES['fl-zo-werkt-het']

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
        eyebrow={COPY.eyebrow}
        title={COPY.title}
        lead={COPY.lead}
        stackCtasOnMobile
      >
        <Link to="/freelancers/direct-aanmelden" className="hnb-btn hnb-btn--primary">
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

      <section className="fl-section hnb-container" aria-label="Aanvullende toelichting">
        {COPY.sections.map((section) => (
          <div key={section.heading} className="fl-prose-block">
            {section.heading ? <h2>{section.heading}</h2> : null}
            {section.paragraphs?.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            {section.bullets?.length ? (
              <ul>
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </section>

      <MarketingCtaStrip
        headingId="fl-how-works-cta-heading"
        title="Voldoet u aan de eisen?"
        lead="Start uw aanmelding — wij plannen uw check en onboarding rond uw beschikbaarheid."
        primaryTo="/freelancers/direct-aanmelden"
        primaryLabel="Naar het formulier"
        secondaryTo="/freelancers/jouw-certificering"
        secondaryLabel="Certificering bekijken"
      />
    </main>
  )
}
