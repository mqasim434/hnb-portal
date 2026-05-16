import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import BedrijvenCtaStrip from '../../components/bedrijven/BedrijvenCtaStrip'
import BedrijvenHospitalitySecuritySplit from '../../components/bedrijven/BedrijvenHospitalitySecuritySplit'
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
      <section className="b2b-section b2b-section--surface">
        <div className="hnb-container">
          {data.sections.slice(1).map((section, i) => (
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
        lead="Vraag een voorstel aan — roster en afspraken pas na uw akkoord."
        primaryTo="/bedrijven/personeel-aanvragen"
        primaryLabel="Start uw aanvraag"
        secondaryTo="/contact"
        secondaryLabel="Spreek ons kantoor"
      />
    </main>
  )
}
