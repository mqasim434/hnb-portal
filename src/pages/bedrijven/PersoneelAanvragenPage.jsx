import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import BedrijvenCtaStrip from '../../components/bedrijven/BedrijvenCtaStrip'
import CompanyStaffRequestForm from '../../components/bedrijven/CompanyStaffRequestForm'
import { COMPANY_SEO } from '../../content/companySeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import './bedrijven-pages.css'

export default function PersoneelAanvragenPage() {
  const seo = COMPANY_SEO.personeel
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
        title="Personeel dat past bij uw productie"
        lead="Vraag hospitality- en beveiligingsteams aan met voorgecontroleerde professionals, één coördinator en een roster dat u eerst goedkeurt — pas daarna definitief."
        stackCtasOnMobile
      >
        <a href="#b2b-form-anchor" className="hnb-btn hnb-btn--primary">
          Naar het formulier
        </a>
        <Link to="/bedrijven/ons-aanbod" className="hnb-btn hnb-btn--outline">
          Bekijk ons aanbod
        </Link>
      </PageHero>
      <BedrijvenTrustBadges />

      <section className="b2b-request hnb-container" aria-labelledby="b2b-request-title">
        <header className="b2b-request__intro" id="b2b-form-anchor">
          <span className="b2b-section__eyebrow">Personeelsaanvraag</span>
          <h2 id="b2b-request-title" className="b2b-section__title">
            Plan uw volgende event met H&amp;B
          </h2>
          <p className="b2b-section__lead">
            Vul de gegevens zo compleet mogelijk in — wij reageren met capaciteit, tariefindicatie waar mogelijk en
            concrete vervolgstappen. Geen verplichting vóór uw akkoord op het roster.
          </p>
        </header>

        <div className="b2b-request__layout">
          <div>
            <CompanyStaffRequestForm />
          </div>

          <aside className="b2b-sidebar" aria-label="Vertrouwen en service">
            <p className="b2b-sidebar__title">Waarom teams ons blijven boeken</p>
            <ul>
              <li>
                <span className="b2b-sidebar__strong">Reactie binnen één werkdag</span>
                op complete aanvragen — sneller bij start binnen 72 uur.
              </li>
              <li>
                <span className="b2b-sidebar__strong">Transparant roster</span>
                met rollen, namen (na screening) en call times vóór definitieve bevestiging.
              </li>
              <li>
                <span className="b2b-sidebar__strong">Compliance-check</span>
                op vergunningen en certificaten passend bij uw locatiebeleid.
              </li>
              <li>
                <span className="b2b-sidebar__strong">Eén aanspreekpunt</span>
                die uw briefing kent — minder geregel tijdens opbouw en show.
              </li>
            </ul>
            <p className="b2b-sidebar__footnote">
              Voor spoed of afwijkende vergunningscontext:{' '}
              <Link to="/contact">neem contact op</Link> — wij schakelen door naar uw coördinator.
            </p>
          </aside>
        </div>
      </section>

      <BedrijvenCtaStrip
        title="Nog oriënteren?"
        lead="Lees hoe we hospitality en beveiliging combineren — of bekijk typische rollen en sectoren."
        primaryTo="/bedrijven/ons-aanbod"
        primaryLabel="Ons aanbod"
        secondaryTo="/bedrijven/functies"
        secondaryLabel="Functieprofielen"
      />
    </main>
  )
}
