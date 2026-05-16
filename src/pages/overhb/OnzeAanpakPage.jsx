import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import AboutProcessTimeline from '../../components/overhb/AboutProcessTimeline'
import { MARKETING_PAGES } from '../../content/marketingPages'
import { ABOUT_PROCESS_STEPS } from '../../content/aboutProcessTimeline'
import { ABOUT_SEO } from '../../content/aboutSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import '../bedrijven/bedrijven-pages.css'
import './overhb-pages.css'

const copy = MARKETING_PAGES['hb-wat-wij-doen']

export default function OnzeAanpakPage() {
  const seo = ABOUT_SEO.aanpak
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  return (
    <main className="ohb-page b2b-page">
      <PageHero variant="navy" eyebrow={copy.eyebrow} title="Onze aanpak" lead={copy.lead} stackCtasOnMobile>
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

      <section className="b2b-section b2b-section--surface">
        <div className="hnb-container">
          <div className="ohb-aanpak-grid">
            <div className="b2b-section__head">
              <span className="b2b-section__eyebrow">Proces</span>
              <h2 className="b2b-section__title">Van intake tot nazorg</h2>
              <p className="b2b-section__lead">
                Eén doorlopende keten — transparant voor u, uitvoerbaar voor onze teams
                op locatie. Geen losse eilanden tussen planning en vloer.
              </p>
            </div>
            <AboutProcessTimeline steps={ABOUT_PROCESS_STEPS} />
          </div>
        </div>
      </section>

      {copy.sections.map((section, index) => (
        <section
          key={section.heading || `aanpak-${index}`}
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
