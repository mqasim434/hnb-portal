import {
  FiAward,
  FiCoffee,
  FiHeart,
  FiShield,
  FiUsers,
  FiZap,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
  return (
    <main className="about">
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="hnb-container">
          <h1 id="about-hero-title" className="about-hero__title">
            Over{' '}
            <span className="about-hero__accent">H&amp;B Service Group</span>
          </h1>
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-mission-title">
        <div className="hnb-container">
          <div className="about-section__inner">
            <span className="about-section__eyebrow">Missie</span>
            <h2 id="about-mission-title" className="about-section__title">
              Waarom we bestaan
            </h2>
            <p className="about-mission">
              We verbinden serieuze eventorganisatoren met betrouwbaar
              hospitality- en beveiligingstalent — zodat elke rij bij de bar,
              elke deur en elke backstage-overdracht strak loopt, zonder dat uw
              team uitbrandt op last-minute staffing-gaten.
            </p>
            <p className="about-prose">
              H&amp;B Service Group is gebouwd rond een simpel idee: de mensen op de
              vloer maken de avond. We investeren in screening, heldere communicatie
              en coördinatoren die uw event behandelen als hun eigen product —
              of u nu één clubnacht draait of een meerdaags festivalprogramma.
            </p>
          </div>
        </div>
      </section>

      <section
        className="about-section about-section--surface"
        aria-labelledby="about-what-title"
      >
        <div className="hnb-container">
          <div className="about-section__inner about-section__inner--wide">
            <span className="about-section__eyebrow">Wat we doen</span>
            <h2 id="about-what-title" className="about-section__title">
              Hospitality- en beveiligingspersoneel van A tot Z
            </h2>
            <p className="about-prose about-prose--after-title">
              We rosteren, briefen en zetten teams in voor live events in Nederland
              en daarbuiten — altijd met controle op werkrecht, vergunningen en
              rolpas vóór definitieve bevestiging op uw locatie.
            </p>
            <div className="about-split">
              <article className="about-pillar">
                <div className="about-pillar__icon" aria-hidden="true">
                  <FiCoffee />
                </div>
                <h3 className="about-pillar__title">Hospitality</h3>
                <p className="about-pillar__text">
                  Hosts, hostesses, barteams en gastgericht personeel dat tempo,
                  uitstraling en verantwoorde uitgifte begrijpt — afgestemd op uw
                  merkstandaarden en servicewindows.
                </p>
              </article>
              <article className="about-pillar">
                <div className="about-pillar__icon" aria-hidden="true">
                  <FiShield />
                </div>
                <h3 className="about-pillar__title">Beveiliging</h3>
                <p className="about-pillar__text">
                  Bevoegde portiers en eventbeveiliging met focus op toegang,
                  de-escalatie en strakke portofoondiscipline met uw duty manager —
                  zonder de gastbeleving bij de deur te schaden.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-values-title">
        <div className="hnb-container">
          <div className="about-section__inner about-section__inner--wide">
            <span className="about-section__eyebrow">Waarom kiezen voor ons</span>
            <h2 id="about-values-title" className="about-section__title">
              Wat u mag verwachten van een partner, niet van een vendorlijst
            </h2>
            <p className="about-prose about-prose--after-title">
              Opdrachtgevers blijven omdat we operationele ruis verminderen —
              minder verrassingen op locatie, minder no-shows en minder hectiek
              vlak voor opening.
            </p>
            <ul className="about-values">
              <li className="about-value">
                <span className="about-value__icon" aria-hidden="true">
                  <FiAward />
                </span>
                <div>
                  <h3 className="about-value__title">Gescreende mensen</h3>
                  <p className="about-value__text">
                    Werkrecht, vergunningen en referenties vóór roster-voorstellen
                    — uw siteleider hoeft minder te improviseren.
                  </p>
                </div>
              </li>
              <li className="about-value">
                <span className="about-value__icon" aria-hidden="true">
                  <FiZap />
                </span>
                <div>
                  <h3 className="about-value__title">Snelheid met structuur</h3>
                  <p className="about-value__text">
                    Krappe deadlines met een dispatch-ritme waar u op kunt
                    vertrouwen — bevestigingen, call sheets en vervanging waar het
                    nodig is.
                  </p>
                </div>
              </li>
              <li className="about-value">
                <span className="about-value__icon" aria-hidden="true">
                  <FiHeart />
                </span>
                <div>
                  <h3 className="about-value__title">Menselijke coördinatie</h3>
                  <p className="about-value__text">
                    Eén coördinator bewaakt uw briefing van boeking tot afbouw —
                    geen anonieme overdracht of verloren context tussen diensten.
                  </p>
                </div>
              </li>
              <li className="about-value">
                <span className="about-value__icon" aria-hidden="true">
                  <FiUsers />
                </span>
                <div>
                  <h3 className="about-value__title">Consistente crews</h3>
                  <p className="about-value__text">
                    Vaste gezichten bij terugkerende programma&apos;s — minder
                    her-briefings, strakkere samenwerking en een rustiger vloerbeeld
                    tijdens drukte.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        className="about-section about-section--muted"
        aria-labelledby="about-team-heading"
      >
        <div className="hnb-container">
          <div className="about-section__inner">
            <span className="about-section__eyebrow">Team &amp; cultuur</span>
            <div className="about-team">
              <h2 id="about-team-heading" className="about-team__title">
                Maak kennis met het team — binnenkort
              </h2>
              <p className="about-team__text">
                We bereiden profielen van onze leiding en locatiecoördinatoren voor
                zodat u ziet wie achter het roster staat. Tot die tijd is
                persoonlijk contact de beste manier om ons te leren kennen — neem
                via de{' '}
                <Link to="/contact">contactpagina</Link> op met ons.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
