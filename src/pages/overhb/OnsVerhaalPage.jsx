import {
  FiAward,
  FiCoffee,
  FiHeart,
  FiShield,
  FiUsers,
  FiZap,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import { ABOUT_SEO } from '../../content/aboutSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import '../public/About.css'
import './overhb-pages.css'

export default function OnsVerhaalPage() {
  const seo = ABOUT_SEO.verhaal
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  return (
    <main className="ohb-page about">
      <PageHero
        variant="navy"
        eyebrow="H&B Service Group"
        title="Ons verhaal"
        lead="We verbinden opdrachtgevers met betrouwbare servicemedewerkers en beveiliging — zodat ontvangst, toegang en coördinatie strak lopen, zonder dat uw team uitbrandt op last-minute personeelsgaten."
        stackCtasOnMobile
      >
        <Link to="/over-hb/het-team" className="hnb-btn hnb-btn--primary">
          Het team
        </Link>
        <Link to="/contact" className="hnb-btn hnb-btn--outline">
          Contact
        </Link>
      </PageHero>

      <BedrijvenTrustBadges />

      <section className="about-section" aria-labelledby="about-mission-title">
        <div className="hnb-container">
          <div className="about-section__inner">
            <span className="about-section__eyebrow">Missie</span>
            <h2 id="about-mission-title" className="about-section__title">
              Waarom wij bestaan
            </h2>
            <p className="about-prose">
              H&amp;B Service Group is gebouwd rond een simpel idee: de mensen op de vloer maken het verschil. Een
              locatie staat of valt bij servicemedewerkers die de bezoeker welkom doen voelen, bij portiers die rustig
              blijven als het druk wordt, bij teams die onder druk professioneel blijven. Wij investeren in screening,
              heldere communicatie en coördinatoren die uw opdracht behandelen als hun eigen verantwoordelijkheid — of
              u nu een COA-locatie, een bedrijfsevenement of een object beheert.
            </p>
            <p className="about-prose">
              Wij zijn opgericht omdat wij zelf vaak zagen wat er misging in de markt: scherpe tarieven die ten koste
              gingen van opleiding en certificering, last-minute vervangingen, anonieme personeelslijsten en
              coördinatoren die niet bereikbaar waren als het er echt toe deed. Daar wilden wij iets anders tegenover
              zetten: een partij die zegt wat zij doet, doet wat zij belooft, en bereikbaar blijft als het programma
              schuift.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section about-section--muted" aria-labelledby="about-founders-title">
        <div className="hnb-container">
          <div className="about-section__inner">
            <span className="about-section__eyebrow">Achtergrond</span>
            <h2 id="about-founders-title" className="about-section__title">
              Twee disciplines, één team
            </h2>
            <p className="about-prose">
              H&amp;B is opgericht door twee partners met complementaire expertise. De operationele kant — planning,
              aansturing en coördinatie op locatie — komt voort uit jarenlange ervaring in evenementenproductie. De
              strategische en commerciële kant — opbouw van klantrelaties, financiële sturing en groei — vult dat aan.
              Die combinatie maakt ons wendbaar én voorspelbaar: snelle besluiten op de vloer, structuur in de
              administratie.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section about-section--surface" aria-labelledby="about-what-title">
        <div className="hnb-container">
          <div className="about-section__inner about-section__inner--wide">
            <span className="about-section__eyebrow">Wat we doen</span>
            <h2 id="about-what-title" className="about-section__title">
              Servicemedewerkers en beveiliging van A tot Z
            </h2>
            <p className="about-prose about-prose--after-title">
              We roosteren, briefen en zetten teams in voor opdrachtgevers in Nederland
              en daarbuiten — altijd met controle op werkrecht, certificaten en
              beveiligingspas vóór definitieve bevestiging op uw locatie.
            </p>
            <div className="about-split">
              <article className="about-pillar">
                <div className="about-pillar__icon" aria-hidden="true">
                  <FiCoffee />
                </div>
                <h3 className="about-pillar__title">Servicemedewerkers (hosts)</h3>
                <p className="about-pillar__text">
                  Ontvangst, routing en representatie voor horeca, evenementen, bedrijven
                  en publieke locaties — professioneel en afgestemd op uw verwachtingen.
                </p>
              </article>
              <article className="about-pillar">
                <div className="about-pillar__icon" aria-hidden="true">
                  <FiShield />
                </div>
                <h3 className="about-pillar__title">Beveiliging</h3>
                <p className="about-pillar__text">
                  Bevoegde portiers en eventbeveiliging met focus op toegang,
                  de-escalatie en strakke portofoondiscipline met uw dienstdoende manager —
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
              Wat u mag verwachten van een partner, niet van een leverancierslijst
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
                    Werkrecht, vergunningen en referenties vóór roostervoorstellen
                    — uw locatieleider hoeft minder te improviseren.
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
                    Krappe deadlines met een inzetritme waar u op kunt
                    vertrouwen — bevestigingen, draaiboeken en vervanging waar het
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
                    Eén coördinator bewaakt uw briefing van intake tot evaluatie —
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
                    herbriefings, strakkere samenwerking en een rustiger vloerbeeld
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
                Het gezicht achter het rooster
              </h2>
              <p className="about-team__text">
                Ontdek onze planners en coördinatoren — of neem direct contact op
                voor een gesprek over uw programma.
              </p>
              <div className="ohb-cta-row" style={{ justifyContent: 'center' }}>
                <Link to="/over-hb/het-team" className="hnb-btn hnb-btn--primary">
                  Bekijk het team
                </Link>
                <Link to="/contact" className="hnb-btn hnb-btn--outline">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
