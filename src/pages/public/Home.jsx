import { Link } from 'react-router-dom'
import {
  FiBriefcase,
  FiCoffee,
  FiHeadphones,
  FiMapPin,
  FiMoon,
  FiMusic,
  FiSend,
  FiShield,
  FiUserCheck,
  FiUsers,
} from 'react-icons/fi'
import './Home.css'

const heroImage =
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80'

export default function Home() {
  return (
    <main className="home">
      <section className="home-hero" aria-labelledby="home-hero-heading">
        <div className="home-hero__media" aria-hidden="true">
          <img
            src={heroImage}
            alt=""
            width={2000}
            height={1333}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="home-hero__overlay" aria-hidden="true" />
        <div className="home-hero__grain" aria-hidden="true" />
        <div className="home-hero__inner hnb-container">
          <h1 id="home-hero-heading" className="home-hero__headline hnb-type-hero">
            Betrouwbaar eventpersoneel.{' '}
            <span className="home-hero__accent">Wanneer u het nodig heeft.</span>
          </h1>
          <p className="home-hero__sub">
            H&amp;B Service Group levert gecontroleerde hospitalityteams en
            beveiliging met vergunning voor live-evenementen, locaties en
            zakelijke programma&apos;s — ingepland, gebriefd en op locatie op het
            juiste moment, met één coördinator vanaf de boeking tot de afbouw.
          </p>
          <div className="home-hero__actions">
            <Link to="/bedrijven/vind-talent" className="hnb-btn hnb-btn--primary">
              Vind talent
            </Link>
            <Link
              to="/freelancers/ontdek-mogelijkheden"
              className="hnb-btn hnb-btn--outline"
            >
              Ontdek mogelijkheden
            </Link>
          </div>
        </div>
      </section>

      <section
        className="home-section home-section--surface"
        aria-labelledby="home-services-heading"
      >
        <div className="hnb-container">
          <header className="home-section__header">
            <span className="home-section__eyebrow">Wat we leveren</span>
            <h2 id="home-services-heading" className="home-section__title">
              Hospitality en beveiliging in één roster
            </h2>
            <p className="home-section__lead">
              Van professionele gastheerschap tot gecontroleerde toegang en
              teams die verkeersstromen begrijpen — wij matchen de juiste mensen
              aan het tempo en de compliance van uw evenement.
            </p>
          </header>
          <div className="home-services__grid">
            <article className="home-service-card">
              <div className="home-service-card__icon" aria-hidden="true">
                <FiCoffee />
              </div>
              <h3 className="home-service-card__title">Hospitality-medewerkers</h3>
              <p className="home-service-card__text">
                Hosts, barteams, barbacks, foodrunners en gastgerichte teams,
                getraind voor hoge drukte — afgestemd op uw programma, merkstandaarden
                en verantwoorde uitgifte.
              </p>
              <Link to="/bedrijven/functies" className="home-service-card__link">
                Ontdek hospitality →
              </Link>
            </article>
            <article className="home-service-card">
              <div className="home-service-card__icon" aria-hidden="true">
                <FiShield />
              </div>
              <h3 className="home-service-card__title">Beveiligingsmedewerkers</h3>
              <p className="home-service-card__text">
                Bevoegde portiers en eventbeveiliging met focus op toegang,
                de-escalatie en heldere portofoonlijn met uw productieleiding —
                zonder de gastbeleving te schaden.
              </p>
              <Link to="/bedrijven/functies" className="home-service-card__link">
                Ontdek beveiliging →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="home-markets-heading">
        <div className="hnb-container">
          <header className="home-section__header">
            <span className="home-section__eyebrow">Waar we actief zijn</span>
            <h2 id="home-markets-heading" className="home-section__title">
              Gemaakt voor veeleisende eventomgevingen
            </h2>
            <p className="home-section__lead">
              Korte doorlooptijden, wisselende bezetting en pieken tot laat zijn
              voor ons normaal — we schalen teams op of af met behoud van kwaliteit.
            </p>
          </header>
          <ul className="home-markets__grid">
            <li className="home-market-tile">
              <div className="home-market-tile__icon" aria-hidden="true">
                <FiMusic />
              </div>
              <h3 className="home-market-tile__title">Festivals</h3>
              <p className="home-market-tile__text">
                Meerdaagse opbouw, perimeter en backstage, en barteams die de rij
                door laten stromen wanneer de headliner begint.
              </p>
            </li>
            <li className="home-market-tile">
              <div className="home-market-tile__icon" aria-hidden="true">
                <FiBriefcase />
              </div>
              <h3 className="home-market-tile__title">Zakelijke events</h3>
              <p className="home-market-tile__text">
                Galas, productlanceringen en high-stakes momenten — discrete
                uniformen, gepolijste bediening en beveiliging op de achtergrond.
              </p>
            </li>
            <li className="home-market-tile">
              <div className="home-market-tile__icon" aria-hidden="true">
                <FiMoon />
              </div>
              <h3 className="home-market-tile__title">Nachtleven</h3>
              <p className="home-market-tile__text">
                Piebbezetting voor clubs en late locaties: ID-checks, vloerbeeld
                en barondersteuning die meebeweegt met de zaal.
              </p>
            </li>
            <li className="home-market-tile">
              <div className="home-market-tile__icon" aria-hidden="true">
                <FiMapPin />
              </div>
              <h3 className="home-market-tile__title">Locaties</h3>
              <p className="home-market-tile__text">
                Arena&apos;s, schouwburgen en multifunctionele ruimtes — terugkerende
                programma&apos;s met bekende gezichten en minder overdrachtsmomenten.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section
        className="home-section home-section--elevated"
        aria-labelledby="home-values-heading"
      >
        <div className="hnb-container">
          <header className="home-section__header">
            <span className="home-section__eyebrow">Waarom organisatoren voor ons kiezen</span>
            <h2 id="home-values-heading" className="home-section__title">
              Een partnermodel, geen spreadsheet met namen
            </h2>
            <p className="home-section__lead">
              We beschermen uw reputatie op de vloer — met mensen die voorbereid
              komen, duidelijk communiceren en uw merk vertegenwoordigen als
              insiders.
            </p>
          </header>
          <ul className="home-values__grid">
            <li className="home-value">
              <div className="home-value__icon" aria-hidden="true">
                <FiUserCheck />
              </div>
              <div>
                <h3 className="home-value__title">Voorgecontroleerd personeel</h3>
                <p className="home-value__text">
                  Arbeidsrecht, vergunningen en rolpas vóór voorstel — uw siteleider
                  hoeft minder te improviseren.
                </p>
              </div>
            </li>
            <li className="home-value">
              <div className="home-value__icon" aria-hidden="true">
                <FiSend />
              </div>
              <div>
                <h3 className="home-value__title">Snelle inzet</h3>
                <p className="home-value__text">
                  Strakke deadlines en last-minute wijzigingen worden opgevangen met
                  een gestructureerd dispatchproces — bevestigingen, call times en
                  vervanging waar nodig.
                </p>
              </div>
            </li>
            <li className="home-value">
              <div className="home-value__icon" aria-hidden="true">
                <FiUsers />
              </div>
              <div>
                <h3 className="home-value__title">Flexibele schil</h3>
                <p className="home-value__text">
                  Schaal van intieme recepties tot piekcapaciteit zonder verlies aan
                  verhoudingen — hospitality en security in één plan.
                </p>
              </div>
            </li>
            <li className="home-value">
              <div className="home-value__icon" aria-hidden="true">
                <FiHeadphones />
              </div>
              <div>
                <h3 className="home-value__title">Één vast aanspreekpunt</h3>
                <p className="home-value__text">
                  Eén coördinator bewaakt uw briefing, roster en aanpassingen op
                  locatie — minder overdracht, snellere besluiten, duidelijke
                  rapportage achteraf.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="home-cta" aria-labelledby="home-cta-heading">
        <div className="home-cta__inner hnb-container">
          <h2 id="home-cta-heading" className="home-cta__title">
            Klaar om uw volgende event te bezetten?
          </h2>
          <div className="home-cta__actions">
            <Link to="/bedrijven/vind-talent" className="hnb-btn hnb-btn--primary">
              Vind talent
            </Link>
            <Link
              to="/freelancers/ontdek-mogelijkheden"
              className="hnb-btn hnb-btn--outline"
            >
              Ontdek mogelijkheden
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
