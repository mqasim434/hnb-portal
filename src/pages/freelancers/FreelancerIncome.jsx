import { Link } from 'react-router-dom'
import MarketingCtaStrip from '../../components/marketing/MarketingCtaStrip'
import PageHero from '../../components/marketing/PageHero'
import { MARKETING_PAGES } from '../../content/marketingPages'
import { FREELANCER_SEO } from '../../content/freelancerSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import './freelancers-pages.css'

const COPY = MARKETING_PAGES['fl-inkomsten-betalingen']

export default function FreelancerIncome() {
  const seo = FREELANCER_SEO.inkomsten
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  return (
    <main className="fl-page">
      <PageHero variant="light" eyebrow={COPY.eyebrow} title={COPY.title} lead={COPY.lead} stackCtasOnMobile>
        <Link to="/freelancers/direct-aanmelden" className="hnb-btn hnb-btn--primary">
          Freelancer worden
        </Link>
        <Link to="/login" className="hnb-btn hnb-btn--outline">
          Inloggen portaal
        </Link>
      </PageHero>

      <section className="fl-section fl-section--muted hnb-container" aria-label="Inkomsten en betalingen">
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
        headingId="fl-income-cta-heading"
        title="Vragen over uw constructie?"
        lead="We denken mee over ZZP, loon of payrolling — afhankelijk van uw opdracht en afspraak."
        primaryTo="/contact"
        primaryLabel="Neem contact op"
        secondaryTo="/freelancers/hoe-het-werkt"
        secondaryLabel="Proces bekijken"
      />
    </main>
  )
}
