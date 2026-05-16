import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import BedrijvenCtaStrip from '../../components/bedrijven/BedrijvenCtaStrip'
import { MARKETING_PAGES } from '../../content/marketingPages'
import { COMPANY_SEO } from '../../content/companySeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import './bedrijven-pages.css'

const data = MARKETING_PAGES['bv-tarieven']

export default function TarievenPage() {
  const seo = COMPANY_SEO.tarieven
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  return (
    <main className="b2b-page">
      <PageHero
        variant="light"
        eyebrow={data.eyebrow}
        title={data.title}
        lead={data.lead}
        stackCtasOnMobile
      >
        <Link to="/bedrijven/personeel-aanvragen" className="hnb-btn hnb-btn--primary">
          Personeelsaanvraag indienen
        </Link>
        <Link to="/bedrijven/ons-aanbod" className="hnb-btn hnb-btn--outline">
          Ons aanbod
        </Link>
      </PageHero>
      <BedrijvenTrustBadges />
      <section className="b2b-section">
        <div className="hnb-container">
          {data.sections.map((section, i) => (
            <div key={section.heading || `t-${i}`} className="b2b-prose">
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
        title="Concrete rate card nodig?"
        lead="Deel uw data en bezetting — wij leveren een voorstel passend bij rol, risico en doorlooptijd."
        primaryTo="/bedrijven/personeel-aanvragen"
        primaryLabel="Vraag offerte aan"
        secondaryTo="/contact"
        secondaryLabel="Neem contact op"
      />
    </main>
  )
}
