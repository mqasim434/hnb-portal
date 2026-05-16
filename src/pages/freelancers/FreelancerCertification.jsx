import { Link } from 'react-router-dom'
import { FiCoffee, FiShield } from 'react-icons/fi'
import MarketingCtaStrip from '../../components/marketing/MarketingCtaStrip'
import PageHero from '../../components/marketing/PageHero'
import {
  CERT_HOSPITALITY_ITEMS,
  CERT_SECURITY_ITEMS,
} from '../../content/freelancerCertifications'
import { MARKETING_PAGES } from '../../content/marketingPages'
import { FREELANCER_SEO } from '../../content/freelancerSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import './freelancers-pages.css'

const COPY = MARKETING_PAGES['fl-veiligheid-certificering']

export default function FreelancerCertification() {
  const seo = FREELANCER_SEO.certificering
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  return (
    <main className="fl-page">
      <PageHero variant="light" eyebrow={COPY.eyebrow} title={COPY.title} lead={COPY.lead} stackCtasOnMobile>
        <Link to="/freelancers/direct-aanmelden" className="hnb-btn hnb-btn--primary">
          Documenten aanleveren
        </Link>
        <Link to="/freelancers/openstaande-opdrachten" className="hnb-btn hnb-btn--outline">
          Bekijk opdrachten
        </Link>
      </PageHero>

      <section className="fl-section fl-section--surface hnb-container" aria-labelledby="fl-cert-lists-title">
        <header className="fl-section__head">
          <span className="fl-section__eyebrow">Overzicht</span>
          <h2 id="fl-cert-lists-title" className="fl-section__title">
            Hospitality en beveiliging
          </h2>
          <p className="fl-section__lead">
            Locaties kunnen aanvullende eisen stellen. Onderstaande lijsten vormen het uitgangspunt voor rostering
            bij H&amp;B Service Group.
          </p>
        </header>
        <div className="fl-cert-grid">
          <div className="fl-cert-panel">
            <h2>
              <FiCoffee aria-hidden />
              Hospitality
            </h2>
            <ul>
              {CERT_HOSPITALITY_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="fl-cert-panel">
            <h2>
              <FiShield aria-hidden />
              Beveiliging
            </h2>
            <ul>
              {CERT_SECURITY_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="fl-section hnb-container" aria-label="Beleid en veiligheid">
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
        headingId="fl-cert-cta-heading"
        title="Twijfelt u over een diploma?"
        lead="We denken mee over actualiteit, herbesteding en venue-specifieke uitzonderingen."
        primaryTo="/contact"
        primaryLabel="Vraag het ons"
        secondaryTo="/freelancers/hoe-het-werkt"
        secondaryLabel="Lees hoe onboarding werkt"
      />
    </main>
  )
}
