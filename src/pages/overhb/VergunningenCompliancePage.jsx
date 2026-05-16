import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import ComplianceBadgeGrid from '../../components/overhb/ComplianceBadgeGrid'
import { MARKETING_PAGES } from '../../content/marketingPages'
import { COMPLIANCE_BADGES } from '../../content/complianceBadges'
import { ABOUT_SEO } from '../../content/aboutSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import '../bedrijven/bedrijven-pages.css'
import './overhb-pages.css'

const copy = MARKETING_PAGES['hb-vergunningen']

export default function VergunningenCompliancePage() {
  const seo = ABOUT_SEO.compliance
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  return (
    <main className="ohb-page b2b-page">
      <PageHero variant="navy" eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} stackCtasOnMobile>
        {copy.ctas?.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className={c.primary ? 'hnb-btn hnb-btn--primary' : 'hnb-btn hnb-btn--outline'}
          >
            {c.label}
          </Link>
        ))}
      </PageHero>

      <BedrijvenTrustBadges />

      <section className="b2b-section b2b-section--surface" aria-labelledby="compliance-badges-heading">
        <div className="hnb-container">
          <div className="b2b-section__head">
            <span className="b2b-section__eyebrow">Aantoonbaar in orde</span>
            <h2 id="compliance-badges-heading" className="b2b-section__title">
              Waar we op sturen vóór de eerste shift
            </h2>
            <p className="b2b-section__lead">
              Documentatie en controles die aansluiten op vergunning, verzekeraar en
              uw eigen locatie-eisen — zonder corners te knippen.
            </p>
          </div>
          <ComplianceBadgeGrid items={COMPLIANCE_BADGES} />
        </div>
      </section>

      {copy.sections.map((section, index) => (
        <section
          key={section.heading || `comp-${index}`}
          className={`b2b-section${index % 2 === 1 ? ' b2b-section--paper' : ''}`}
        >
          <div className="hnb-container">
            <div className="b2b-prose">
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
          </div>
        </section>
      ))}
    </main>
  )
}
