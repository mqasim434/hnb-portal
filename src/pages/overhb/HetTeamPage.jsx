import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import TeamProfileCard from '../../components/overhb/TeamProfileCard'
import { MARKETING_PAGES } from '../../content/marketingPages'
import { TEAM_PROFILES } from '../../content/teamProfiles'
import { ABOUT_SEO } from '../../content/aboutSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import '../bedrijven/bedrijven-pages.css'
import './overhb-pages.css'

const copy = MARKETING_PAGES['hb-wie-wij-zijn']

export default function HetTeamPage() {
  const seo = ABOUT_SEO.team
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  return (
    <main className="ohb-page b2b-page">
      <PageHero
        variant="navy"
        eyebrow={copy.eyebrow}
        title="Het team"
        lead={copy.lead}
        stackCtasOnMobile
      >
        <Link to="/over-hb/ons-verhaal" className="hnb-btn hnb-btn--outline">
          Ons verhaal
        </Link>
        <Link to="/contact" className="hnb-btn hnb-btn--primary">
          Neem contact op
        </Link>
      </PageHero>

      <BedrijvenTrustBadges />

      {copy.sections.map((section, index) => (
        <section
          key={section.heading || `team-sec-${index}`}
          className={`b2b-section${index % 2 === 1 ? ' b2b-section--surface' : ''}`}
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

      <section className="b2b-section b2b-section--paper" aria-labelledby="team-profiles-heading">
        <div className="hnb-container">
          <div className="b2b-section__head">
            <span className="b2b-section__eyebrow">Mensen op de vloer &amp; achter schermen</span>
            <h2 id="team-profiles-heading" className="b2b-section__title">
              Kern van het coördinatieteam
            </h2>
            <p className="b2b-section__lead">
              Ervaren planners en dispatchers die uw productie begrijpen — met focus op
              voorspelbare communicatie en compliance op het roster.
            </p>
          </div>
          <ul className="ohb-team-grid">
            {TEAM_PROFILES.map((p) => (
              <li key={p.id}>
                <TeamProfileCard
                  name={p.name}
                  role={p.role}
                  bio={p.bio}
                  initials={p.initials}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
