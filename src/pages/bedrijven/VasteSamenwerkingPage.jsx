import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import BedrijvenCtaStrip from '../../components/bedrijven/BedrijvenCtaStrip'
import { MARKETING_PAGES } from '../../content/marketingPages'
import { COMPANY_SEO } from '../../content/companySeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import './bedrijven-pages.css'

const data = MARKETING_PAGES['bv-flexpools']

export default function VasteSamenwerkingPage() {
  const seo = COMPANY_SEO.vaste
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  return (
    <main className="b2b-page">
      <PageHero
        variant="navy"
        eyebrow="Bedrijven"
        title="Vaste samenwerking"
        lead={data.lead}
        stackCtasOnMobile
      >
        <Link to="/bedrijven/personeel-aanvragen" className="hnb-btn hnb-btn--primary">
          Plan een intake
        </Link>
        <Link to="/contact" className="hnb-btn hnb-btn--outline">
          Flexpool bespreken
        </Link>
      </PageHero>
      <BedrijvenTrustBadges />
      <section className="b2b-section">
        <div className="hnb-container">
          {data.sections.map((section, i) => (
            <div key={section.heading || `v-${i}`} className="b2b-prose">
              {section.heading ? <h2>{section.heading}</h2> : null}
              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
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
        </div>
      </section>
      <BedrijvenCtaStrip
        title="Een vaste kern voor uw venue of reeks?"
        lead="We bouwen een pool die uw huisstijl kent — sneller inzetbaar bij pieken en rustiger op de vloer."
        primaryTo="/bedrijven/personeel-aanvragen"
        primaryLabel="Personeel aanvragen"
        secondaryTo="/bedrijven/tarieven"
        secondaryLabel="Tarieven bekijken"
      />
    </main>
  )
}
