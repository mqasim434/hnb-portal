import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import ComplianceBadgeGrid from '../../components/overhb/ComplianceBadgeGrid'
import { INSURANCE_BLOCK, LEGAL_FRAMEWORK, REPORTING_BLOCK } from '../../content/complianceLegalContent'
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

      <section className="b2b-section b2b-section--surface" aria-labelledby="legal-framework-heading">
        <div className="hnb-container">
          <header className="b2b-section__head">
            <span className="b2b-section__eyebrow">{LEGAL_FRAMEWORK.eyebrow}</span>
            <h2 id="legal-framework-heading" className="b2b-section__title">
              {LEGAL_FRAMEWORK.title}
            </h2>
            <p className="b2b-section__lead">{LEGAL_FRAMEWORK.intro}</p>
          </header>
          <div className="ohb-legal-grid">
            {LEGAL_FRAMEWORK.frameworks.map((f) => (
              <article key={f.id} className="ohb-legal-card">
                <h3 className="ohb-legal-card__title">{f.title}</h3>
                <p className="ohb-legal-card__body">{f.body}</p>
                {f.footnote && f.footnoteLabel ? (
                  <p className="ohb-legal-card__meta">
                    <span className="ohb-legal-card__meta-label">{f.footnoteLabel}</span>
                    {' — '}
                    {f.footnote}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="b2b-section" aria-labelledby="insurance-heading">
        <div className="hnb-container">
          <header className="b2b-section__head">
            <span className="b2b-section__eyebrow">{INSURANCE_BLOCK.eyebrow}</span>
            <h2 id="insurance-heading" className="b2b-section__title">
              {INSURANCE_BLOCK.title}
            </h2>
          </header>
          <p className="ohb-prose-muted" style={{ maxWidth: '44rem', marginBottom: 'var(--space-4)' }}>
            {INSURANCE_BLOCK.intro}
          </p>
          <ul className="ohb-region-list">
            {INSURANCE_BLOCK.bullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="b2b-section b2b-section--paper" aria-labelledby="reporting-heading">
        <div className="hnb-container">
          <article style={{ maxWidth: '46rem' }}>
            <h2 id="reporting-heading" className="b2b-section__title">
              {REPORTING_BLOCK.title}
            </h2>
            <p className="ohb-prose-muted">{REPORTING_BLOCK.body}</p>
          </article>
        </div>
      </section>

      <section className="b2b-section b2b-section--surface" aria-labelledby="compliance-badges-heading">
        <div className="hnb-container">
          <div className="b2b-section__head">
            <span className="b2b-section__eyebrow">Aantoonbaar</span>
            <h2 id="compliance-badges-heading" className="b2b-section__title">
              Concrete controles achter elk rooster
            </h2>
            <p className="b2b-section__lead">
              Voorbereid op vergunning, verzekeraar en uw locatie — naast het wettelijk kader hierboven.
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
