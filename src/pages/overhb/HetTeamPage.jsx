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

const CULTURE_TEXT =
  'Wij geloven dat respect voor podium-, hospitality- en beveiligingsteams de kwaliteit van elk event verhoogt. Open communicatie, voorspelbare processen en geen romantiek over \'gewoon even regelen\' — alleen afspraken die kloppen onder tijdsdruk. Wij behandelen mensen die voor ons werken als professionals, en daarom houden zij seizoen na seizoen vol.'

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

      <section className="b2b-section" aria-labelledby="team-culture-heading">
        <div className="hnb-container">
          <header className="b2b-section__head">
            <h2 id="team-culture-heading" className="b2b-section__title">
              Cultuur
            </h2>
            <p className="b2b-section__lead ohb-culture-lead">{CULTURE_TEXT}</p>
          </header>
        </div>
      </section>

      <section className="b2b-section b2b-section--paper" aria-labelledby="team-profiles-heading">
        <div className="hnb-container">
          <div className="b2b-section__head">
            <span className="b2b-section__eyebrow">Kern van het team</span>
            <h2 id="team-profiles-heading" className="b2b-section__title">
              Mensen op de vloer &amp; achter de schermen
            </h2>
            <p className="b2b-section__lead">
              Ervaren planners en inzetcoördinatoren die uw productie begrijpen — tot er echte foto&apos;s en namen
              definitief zijn, werken we met dit kernbeeld.
            </p>
          </div>
          <ul className="ohb-team-grid">
            {TEAM_PROFILES.map((p) => (
              <li key={p.id}>
                <TeamProfileCard name={p.name} role={p.role} bio={p.bio} initials={p.initials} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
