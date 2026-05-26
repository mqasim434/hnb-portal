import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import BedrijvenCtaStrip from '../../components/bedrijven/BedrijvenCtaStrip'
import BedrijvenHospitalitySecuritySplit from '../../components/bedrijven/BedrijvenHospitalitySecuritySplit'
import { B2B_INCLUDED_PACKAGE } from '../../content/bedrijvenIncludedPackage'
import { MARKETING_PAGES } from '../../content/marketingPages'
import { COMPANY_SEO } from '../../content/companySeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import './bedrijven-pages.css'

const data = MARKETING_PAGES['bv-ons-aanbod']

export default function OnsAanbodPage() {
  const seo = COMPANY_SEO.aanbod
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  return (
    <main className="b2b-page">
      <PageHero
        variant="navy"
        eyebrow={data.eyebrow}
        title={data.title}
        lead={data.lead}
        stackCtasOnMobile
      >
        <Link to="/bedrijven/personeel-aanvragen" className="hnb-btn hnb-btn--primary">
          Personeel aanvragen
        </Link>
        <Link to="/bedrijven/tarieven" className="hnb-btn hnb-btn--outline">
          Tarieven
        </Link>
      </PageHero>
      <BedrijvenTrustBadges />
      <BedrijvenHospitalitySecuritySplit />
      <section className="b2b-section b2b-section--surface" aria-labelledby="b2b-aanbod-included">
        <div className="hnb-container">
          <header className="b2b-section__head">
            <span className="b2b-section__eyebrow">{B2B_INCLUDED_PACKAGE.eyebrow}</span>
            <h2 id="b2b-aanbod-included" className="b2b-section__title">
              {B2B_INCLUDED_PACKAGE.title}
            </h2>
          </header>
          <div className="b2b-included-grid">
            {B2B_INCLUDED_PACKAGE.tiles.map((tile) => (
              <article key={tile.title} className="b2b-included-card">
                <h3>{tile.title}</h3>
                <p>{tile.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="b2b-section">
        <div className="hnb-container">
          {data.sections.map((section, i) => (
            <div key={section.heading || `sec-${i}`} className="b2b-prose">
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
        title="Capaciteit reserveren zonder verrassingen"
        lead="Vraag een voorstel aan — rooster en afspraken pas na uw akkoord."
        primaryTo="/bedrijven/personeel-aanvragen"
        primaryLabel="Start uw aanvraag"
        secondaryTo="/contact"
        secondaryLabel="Spreek ons kantoor"
      />
    </main>
  )
}
