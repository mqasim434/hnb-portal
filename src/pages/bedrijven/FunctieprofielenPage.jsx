import { Link } from 'react-router-dom'
import {
  FiBriefcase,
  FiCheckSquare,
  FiCoffee,
  FiHeadphones,
  FiLayers,
  FiShield,
} from 'react-icons/fi'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import BedrijvenCtaStrip from '../../components/bedrijven/BedrijvenCtaStrip'
import { B2B_INCLUDED_PACKAGE } from '../../content/bedrijvenIncludedPackage'
import { B2B_ROLE_PROFILES } from '../../content/bedrijvenRoleProfiles'
import { CLIENT_PROCESS_STEPS } from '../../content/clientProcessSteps'
import { COMPANY_SEO } from '../../content/companySeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import '../public/Services.css'
import './bedrijven-pages.css'

export default function FunctieprofielenPage() {
  const seo = COMPANY_SEO.functies
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  return (
    <main className="b2b-page svc">
      <PageHero
        variant="light"
        eyebrow="Bedrijven"
        title="Functieprofielen"
        lead="H&amp;B Service Group levert servicemedewerkers (hosts) en beveiliging — van intake en rooster tot coördinatie op locatie — zodat uw organisatie zich op de uitvoering kan richten, niet op gaten in de planning."
        stackCtasOnMobile
      >
        <Link to="/bedrijven/personeel-aanvragen" className="hnb-btn hnb-btn--primary">
          Personeel aanvragen
        </Link>
        <Link to="/bedrijven/ons-aanbod" className="hnb-btn hnb-btn--outline">
          Ons aanbod
        </Link>
      </PageHero>
      <BedrijvenTrustBadges />

      <section className="svc-section" aria-labelledby="svc-overview-title">
        <div className="hnb-container">
          <header className="svc-section__head">
            <span className="svc-section__eyebrow">Overzicht</span>
            <h2 id="svc-overview-title" className="svc-section__title">
              Eén partner voor gastheerschap en gecontroleerde toegang
            </h2>
            <p className="svc-section__lead">
              We combineren planning, compliance-checks en één coördinator — twee hoofdcategorieën onder één
              aanspreekpunt.
            </p>
          </header>
          <p className="svc-prose">
            Of u servicemedewerkers nodig heeft voor een receptie, beveiliging voor een object of een gemengd team
            voor een evenement: we stemmen bezetting, diensten en skillmix af op uw risicoprofiel en locatie-eisen.
          </p>
        </div>
      </section>

      <section
        className="svc-section svc-section--surface"
        aria-labelledby="svc-deliver-title"
      >
        <div className="hnb-container">
          <header className="svc-section__head">
            <span className="svc-section__eyebrow">Wat we leveren</span>
            <h2 id="svc-deliver-title" className="svc-section__title">
              Servicemedewerkers en beveiliging gezamenlijk ingekocht
            </h2>
            <p className="svc-section__lead">
              Twee disciplines, één briefing — servicemedewerkers en beveiliging delen dezelfde aanmeldmomenten,
              toegangsregels en escalatielijn.
            </p>
          </header>
          <div className="svc-grid-2">
            <article className="svc-card">
              <div className="svc-card__icon" aria-hidden="true">
                <FiCoffee />
              </div>
              <h3 className="svc-card__title">Servicemedewerkers (hosts)</h3>
              <ul className="svc-card__list">
                <li>Ontvangst, routing en representatie</li>
                <li>Garderobe, accreditatie en VIP-routes</li>
                <li>Professioneel en afgestemd op uw locatie en dresscode</li>
              </ul>
            </article>
            <article className="svc-card">
              <div className="svc-card__icon" aria-hidden="true">
                <FiShield />
              </div>
              <h3 className="svc-card__title">Beveiliging</h3>
              <ul className="svc-card__list">
                <li>Portier, eventbeveiliging en objectbeveiliging</li>
                <li>Toegang en overzicht in de menigte</li>
                <li>Alleen inroosteren waar diploma, pas en locatiebeleid matchen</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="svc-section svc-section--muted" aria-labelledby="svc-roles-title">
        <div className="hnb-container">
          <header className="svc-section__head">
            <span className="svc-section__eyebrow">Profielen</span>
            <h2 id="svc-roles-title" className="svc-section__title">
              Typische rollen op het rooster
            </h2>
            <p className="svc-section__lead">
              Elk profiel wordt gematcht op certificaten, ervaring en uw merk — onderstaande snapshots zijn het
              uitgangspunt voor briefing en planning.
            </p>
          </header>
          <div className="b2b-role-grid">
            {B2B_ROLE_PROFILES.map((role) => (
              <article key={role.id} className="b2b-role-card">
                <span className="b2b-role-card__tag">{role.tag}</span>
                <h3>{role.title}</h3>
                <ul>
                  {role.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-section" aria-labelledby="svc-process-title">
        <div className="hnb-container">
          <header className="svc-section__head">
            <span className="svc-section__eyebrow">Samenwerking</span>
            <h2 id="svc-process-title" className="svc-section__title">
              Zo loopt een typische opdracht
            </h2>
            <p className="svc-section__lead">
              Transparante stappen van eerste gesprek tot nabespreking — geen black-box personeelslijsten en geen
              verrassende vervanging bij de ingang.
            </p>
          </header>
          <ol className="svc-steps">
            {CLIENT_PROCESS_STEPS.map((step, index) => (
              <li key={step.title} className="svc-step">
                <span className="svc-step__num">{index + 1}</span>
                <h3 className="svc-step__title">{step.title}</h3>
                <p className="svc-step__text">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="svc-section svc-section--muted"
        aria-labelledby="svc-sectors-title"
      >
        <div className="hnb-container">
          <header className="svc-section__head">
            <span className="svc-section__eyebrow">Sectoren</span>
            <h2 id="svc-sectors-title" className="svc-section__title">
              Waar we vooral actief zijn
            </h2>
            <p className="svc-section__lead">
              Programma&apos;s verschillen in risico en tempo — we stemmen verhoudingen en diensten af op de omgeving.
              plaats van generieke “eventpakketten”.
            </p>
          </header>
          <ul className="svc-sectors">
            {[
              'ISG & evenementen',
              'COA & publieke sector',
              'Bedrijven & horeca',
              'Objecten & kermissen',
            ].map((label) => (
              <li key={label} className="svc-sector">
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="svc-section svc-section--surface" aria-labelledby="svc-includes-title">
        <div className="hnb-container">
          <header className="svc-section__head">
            <span className="svc-section__eyebrow">{B2B_INCLUDED_PACKAGE.eyebrow}</span>
            <h2 id="svc-includes-title" className="svc-section__title">
              {B2B_INCLUDED_PACKAGE.title}
            </h2>
          </header>
          <div className="svc-grid-2">
            {[FiCheckSquare, FiHeadphones, FiLayers, FiBriefcase].map((Icon, i) => {
              const tile = B2B_INCLUDED_PACKAGE.tiles[i]
              return (
                <article key={tile.title} className="svc-card">
                  <div className="svc-card__icon" aria-hidden="true">
                    <Icon />
                  </div>
                  <h3 className="svc-card__title">{tile.title}</h3>
                  <p className="svc-card__copy">{tile.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <BedrijvenCtaStrip
        title="Klaar om uw volgende event te plannen?"
        lead="Dien een personeelsaanvraag in — wij reageren met beschikbaarheid en vervolgstappen."
        primaryTo="/bedrijven/personeel-aanvragen"
        primaryLabel="Personeel aanvragen"
        secondaryTo="/contact"
        secondaryLabel="Contact opnemen"
      />
    </main>
  )
}
