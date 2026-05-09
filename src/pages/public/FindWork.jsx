import { Link } from 'react-router-dom'
import {
  FiCalendar,
  FiClock,
  FiCoffee,
  FiCreditCard,
  FiMessageSquare,
  FiShield,
  FiUsers,
} from 'react-icons/fi'
import './FindWork.css'

export default function FindWork() {
  return (
    <main className="fw">
      <section className="fw-hero" aria-labelledby="fw-hero-title">
        <div className="hnb-container">
          <h1 id="fw-hero-title" className="fw-hero__title">
            Vind flexibel{' '}
            <span className="fw-hero__accent">eventwerk</span>
          </h1>
          <p className="fw-hero__sub">
            Sluit u aan bij het freelancer-netwerk van H&amp;B Service Group —
            kies diensten die in uw planning passen, ontvang duidelijke briefings
            vóór aankomst en werk met teams die uw tijd op en na het event
            respecteren. Of u nu ervaring opbouwt of piekseizoenuren maakt: wij
            matchen u aan klussen die passen bij uw skills en certificaten.
          </p>
        </div>
      </section>

      <section
        className="fw-section fw-section--surface"
        aria-labelledby="fw-benefits-title"
      >
        <div className="hnb-container">
          <header className="fw-section__head">
            <span className="fw-section__eyebrow">Waarom met ons werken</span>
            <h2 id="fw-benefits-title" className="fw-section__title">
              Gemaakt voor mensen die de show echt draaien
            </h2>
            <p className="fw-section__lead">
              We weten dat het werk niet stopt als het licht uitgaat — daarom
              zetten we in op eerlijke planning, voorspelbare uitbetaling en
              coördinatoren die bereikbaar zijn als het op het laatste moment
              schuift.
            </p>
          </header>
          <ul className="fw-benefits">
            <li className="fw-benefit">
              <div className="fw-benefit__icon" aria-hidden="true">
                <FiClock />
              </div>
              <h3 className="fw-benefit__title">Flexibele uren</h3>
              <p className="fw-benefit__text">
                Kies diensten rond studie, gezin of een andere baan. Call times en
                verwachte eindtijd communiceren we vooraf, zodat u uw week kunt
                plannen.
              </p>
            </li>
            <li className="fw-benefit">
              <div className="fw-benefit__icon" aria-hidden="true">
                <FiCreditCard />
              </div>
              <h3 className="fw-benefit__title">Snelle uitbetalingen</h3>
              <p className="fw-benefit__text">
                Facturatie en mutatierondes hoeven geen puzzel te zijn. We hanteren
                een vast ritme en houden administratie beperkt, zodat u op tijd
                betaald wordt na akkoord op uw dienst.
              </p>
            </li>
            <li className="fw-benefit">
              <div className="fw-benefit__icon" aria-hidden="true">
                <FiMessageSquare />
              </div>
              <h3 className="fw-benefit__title">Gestructureerde communicatie</h3>
              <p className="fw-benefit__text">
                Eén kanaal voor briefing, dresscode, toegang en contacten op locatie
                — geen DM&apos;s over vijf apps. Als het programma verschuift, hoort
                u dat als eerste van ons.
              </p>
            </li>
            <li className="fw-benefit">
              <div className="fw-benefit__icon" aria-hidden="true">
                <FiCalendar />
              </div>
              <h3 className="fw-benefit__title">Afzwakking in events</h3>
              <p className="fw-benefit__text">
                Van intieme recepties tot late locaties en buitenfestivals — bouw
                een cv dat interessant blijft én binnen uw vergunning valt.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="fw-section" aria-labelledby="fw-roles-title">
        <div className="hnb-container">
          <header className="fw-section__head">
            <span className="fw-section__eyebrow">Rollen</span>
            <h2 id="fw-roles-title" className="fw-section__title">
              Rollen die we inplannen
            </h2>
            <p className="fw-section__lead">
              Tijdens onboarding geeft u aan waarvoor u gekwalificeerd bent — wij
              bieden alleen werk dat past bij profiel, papieren en recht om te
              werken.
            </p>
          </header>
          <ul className="fw-roles">
            <li className="fw-role">
              <div className="fw-role__icon" aria-hidden="true">
                <FiCoffee />
              </div>
              <h3 className="fw-role__title">Hospitality</h3>
              <p className="fw-role__text">
                Hosts, hostesses, barondersteuning en gastrollen waar tempo én
                uitstraling tellen — ideaal als u een zaal leest en service onder
                druk stabiel houdt.
              </p>
            </li>
            <li className="fw-role">
              <div className="fw-role__icon" aria-hidden="true">
                <FiShield />
              </div>
              <h3 className="fw-role__title">Beveiliging</h3>
              <p className="fw-role__text">
                Bevoegde portiers en eventbeveiliging — toegang, rondes en rustige,
                professionele aanwezigheid tijdens drukte. Alleen ingepland waar uw
                vergunning en beleid passend zijn.
              </p>
            </li>
            <li className="fw-role">
              <div className="fw-role__icon" aria-hidden="true">
                <FiUsers />
              </div>
              <h3 className="fw-role__title">Algemeen eventpersoneel</h3>
              <p className="fw-role__text">
                Runners, accreditatie, bandjes, backstage en hands-on logistiek —
                perfect als u midden in de actie wilt staan.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section
        className="fw-section fw-section--warm"
        aria-labelledby="fw-steps-title"
      >
        <div className="hnb-container">
          <header className="fw-section__head">
            <span className="fw-section__eyebrow">Beginnen</span>
            <h2 id="fw-steps-title" className="fw-section__title">
              Zo werkt het
            </h2>
            <p className="fw-section__lead">
              Een eenvoudige route van aanmelding tot eerste dienst — we beoordelen
              elk profiel zodat opdrachtgevers weten wie bij hen binnenkomt.
            </p>
          </header>
          <ol className="fw-steps">
            <li className="fw-step">
              <span className="fw-step__num" aria-hidden="true">
                1
              </span>
              <div className="fw-step__body">
                <h3 className="fw-step__label">Aanmelden</h3>
                <p className="fw-step__text">
                  Doorloop registratie met ervaring, beschikbaarheid en documenten.
                  Wat meer moeite vooraf bespaart iedereen tijd op locatie.
                </p>
              </div>
            </li>
            <li className="fw-step">
              <span className="fw-step__num" aria-hidden="true">
                2
              </span>
              <div className="fw-step__body">
                <h3 className="fw-step__label">Goedkeuring</h3>
                <p className="fw-step__text">
                  We controleren vergunningen, recht om te werken en rolpas. U hoort
                  duidelijke vervolgstappen — ontbrekend materiaal melden we
                  concreet.
                </p>
              </div>
            </li>
            <li className="fw-step">
              <span className="fw-step__num" aria-hidden="true">
                3
              </span>
              <div className="fw-step__body">
                <h3 className="fw-step__label">Aan de slag</h3>
                <p className="fw-step__text">
                  Live op het roster ziet u passende shifts. Accepteer wat past,
                  kom gebriefd opdagen en bouw een relatie met een team dat u
                  terugvraagt.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="fw-cta" aria-labelledby="fw-cta-title">
        <div className="fw-cta__inner hnb-container">
          <div>
            <h2 id="fw-cta-title" className="fw-cta__title">
              Klaar om mee te doen?
            </h2>
            <p className="fw-cta__sub">
              Start uw aanmelding — in een paar minuten vertelt u wie u bent en
              waar u goed in bent.
            </p>
          </div>
          <Link to="/register" className="hnb-btn hnb-btn--primary">
            Nu aanmelden
          </Link>
        </div>
      </section>
    </main>
  )
}
