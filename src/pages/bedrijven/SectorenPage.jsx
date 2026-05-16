import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import BedrijvenCtaStrip from '../../components/bedrijven/BedrijvenCtaStrip'
import BedrijvenHospitalitySecuritySplit from '../../components/bedrijven/BedrijvenHospitalitySecuritySplit'
import { MARKETING_PAGES } from '../../content/marketingPages'
import { COMPANY_SEO } from '../../content/companySeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import './bedrijven-pages.css'

const data = MARKETING_PAGES['bv-sectoren']
const sectorLabels =
  data.sections[0]?.bullets?.map((b, i) => ({ id: i, text: b })) ?? []

export default function SectorenPage() {
  const seo = COMPANY_SEO.sectoren
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
        <Link to="/bedrijven/functies" className="hnb-btn hnb-btn--outline">
          Functieprofielen
        </Link>
      </PageHero>
      <BedrijvenTrustBadges />
      <section className="b2b-section b2b-section--paper">
        <div className="hnb-container">
          <header className="b2b-section__head">
            <span className="b2b-section__eyebrow">Focus</span>
            <h2 className="b2b-section__title">Waar we sterk in zijn</h2>
            <p className="b2b-section__lead">
              Elk segment vraagt andere verhoudingen tussen hospitality en beveiliging — wij tunen roosters op uw
              productie, niet op een standaardpakket.
            </p>
          </header>
          <ul className="b2b-sector-grid">
            {sectorLabels.map(({ id, text }) => (
              <li key={id} className="b2b-sector-card">
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <BedrijvenHospitalitySecuritySplit />
      <section className="b2b-section b2b-section--surface">
        <div className="hnb-container">
          {data.sections.slice(1).map((section, i) => (
            <div key={section.heading || `s-${i}`} className="b2b-prose">
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
        title="Past uw sector hierbij?"
        lead="Vertel ons over programma en locatie — wij adviseren bezetting en compliance."
        primaryTo="/bedrijven/personeel-aanvragen"
        primaryLabel="Briefing starten"
        secondaryTo="/contact"
        secondaryLabel="Adviesgesprek"
      />
    </main>
  )
}
