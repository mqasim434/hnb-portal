import { Link } from 'react-router-dom'
import {
  FiBriefcase,
  FiCheckSquare,
  FiCoffee,
  FiHeadphones,
  FiLayers,
  FiShield,
} from 'react-icons/fi'
import './Services.css'

export default function Services() {
  return (
    <main className="svc">
      <section className="svc-hero" aria-labelledby="svc-hero-title">
        <div className="hnb-container">
          <h1 id="svc-hero-title" className="svc-hero__title">
            Personeels-<span className="svc-hero__accent">diensten</span>
          </h1>
          <p className="svc-hero__sub">
            H&amp;B Service Group levert hospitality en beveiliging voor live
            events — van briefing en roster tot coördinatie op locatie — zodat uw
            productieleiding zich op de gast kan richten, niet op gaten in de
            planning.
          </p>
        </div>
      </section>

      <section className="svc-section" aria-labelledby="svc-overview-title">
        <div className="hnb-container">
          <header className="svc-section__head">
            <span className="svc-section__eyebrow">Overzicht</span>
            <h2 id="svc-overview-title" className="svc-section__title">
              Eén partner voor gastheerschap en gecontroleerde toegang
            </h2>
            <p className="svc-section__lead">
              We combineren planning, compliance-checks en één coördinator, zodat u
              niet twee bureaus hoeft te managen voor bar en deur. Elke opdracht is
              afgestemd op locatie, vergunningscontext en programma.
            </p>
          </header>
          <p className="svc-prose">
            Of u nu een compacte pool voor een vaste clubavond nodig heeft of een
            grote crew voor een festivalweekend: we stemmen bezetting, diensten en
            skillmix af op uw risicoprofiel — zonder koude service bij de deur of
            aan de bar.
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
              Hospitality en beveiliging gezamenlijk ingekocht
            </h2>
            <p className="svc-section__lead">
              Twee disciplines, één briefing — hosts, bartenders en beveiliging
              delen dezelfde call times, toegangsregels en escalatielijn op de
              avond.
            </p>
          </header>
          <div className="svc-grid-2">
            <article className="svc-card">
              <div className="svc-card__icon" aria-hidden="true">
                <FiCoffee />
              </div>
              <h3 className="svc-card__title">Hospitality</h3>
              <ul className="svc-card__list">
                <li>Hosts, hostesses en ontvangst aan de deur</li>
                <li>Bar, barback en ondersteuning bij piekdrukte</li>
                <li>Garderobe, accreditatie en VIP-routes</li>
                <li>Briefings op toon en servicenorm van uw merk</li>
              </ul>
            </article>
            <article className="svc-card">
              <div className="svc-card__icon" aria-hidden="true">
                <FiShield />
              </div>
              <h3 className="svc-card__title">Beveiliging</h3>
              <ul className="svc-card__list">
                <li>Bevoegde portiers en eventbeveiliging</li>
                <li>Toegang, perimeter en overzicht in de menigte</li>
                <li>Portofoondiscipline met duty manager en productie</li>
                <li>Alleen rosteren waar vergunning en locatiebeleid matchen</li>
              </ul>
            </article>
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
              Transparante stappen van eerste gesprek tot nabespreking — geen
              black-box personeelslijsten en geen verrassende vervanging bij de
              ingang.
            </p>
          </header>
          <ol className="svc-steps">
            <li className="svc-step">
              <span className="svc-step__num">1</span>
              <h3 className="svc-step__title">Verkenning &amp; scope</h3>
              <p className="svc-step__text">
                We vastleggen data, bezettingsbandbreedte, plattegrond,
                vergunning-notities en uniform — daarna bevestigen we haalbaarheid
                en planning.
              </p>
            </li>
            <li className="svc-step">
              <span className="svc-step__num">2</span>
              <h3 className="svc-step__title">Roster &amp; akkoord</h3>
              <p className="svc-step__text">
                U ontvangt een voorstel met rollen en call times. Niets is
                definitief zonder uw akkoord op namen en verdeling.
              </p>
            </li>
            <li className="svc-step">
              <span className="svc-step__num">3</span>
              <h3 className="svc-step__title">Brief &amp; dispatch</h3>
              <p className="svc-step__text">
                Teams krijgen één pakket: ingangen, escalatie, bedieningsvensters
                en locatieregels.
              </p>
            </li>
            <li className="svc-step">
              <span className="svc-step__num">4</span>
              <h3 className="svc-step__title">Op locatie &amp; evaluatie</h3>
              <p className="svc-step__text">
                Uw coördinator blijft bereikbaar tijdens de run. Na afbouw
                bespreken we uren, incidenten en learnings voor de volgende
                boeking.
              </p>
            </li>
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
              Programma&apos;s verschillen in risico en tempo — we tunen verhoudingen
              en diensten op de omgeving in plaats van generieke “eventpakketten”.
            </p>
          </header>
          <ul className="svc-sectors">
            {[
              'Festivals & outdoor',
              'Corporate & besloten',
              'Nachtleven & venues',
              'Theater & arena’s',
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
            <span className="svc-section__eyebrow">Inbegrepen</span>
            <h2 id="svc-includes-title" className="svc-section__title">
              Wat u in elk pakket mag verwachten
            </h2>
          </header>
          <div className="svc-grid-2">
            <article className="svc-card">
              <div className="svc-card__icon" aria-hidden="true">
                <FiCheckSquare />
              </div>
              <h3 className="svc-card__title">Compliance-klaar rosteren</h3>
              <p className="svc-card__copy">
                Arbeidsrecht en vergunningen vóór bevestiging; documentatie
                geordend voor locatiebeveiliging en finance.
              </p>
            </article>
            <article className="svc-card">
              <div className="svc-card__icon" aria-hidden="true">
                <FiHeadphones />
              </div>
              <h3 className="svc-card__title">Vaste coördinatie</h3>
              <p className="svc-card__copy">
                Eén aanspreekpunt voor wijzigingen, vervanging en vragen op locatie
                — minder overdracht en sneller beslissen als het programma schuift.
              </p>
            </article>
            <article className="svc-card">
              <div className="svc-card__icon" aria-hidden="true">
                <FiLayers />
              </div>
              <h3 className="svc-card__title">Flexibele schaal</h3>
              <p className="svc-card__copy">
                Opschalen voor piek of meerdaagse opbouw; kleinere kernteams met
                bekende gezichten voor terugkerende programma&apos;s.
              </p>
            </article>
            <article className="svc-card">
              <div className="svc-card__icon" aria-hidden="true">
                <FiBriefcase />
              </div>
              <h3 className="svc-card__title">Commerciële helderheid</h3>
              <p className="svc-card__copy">
                Heldere scopes, tariefkaarten waar van toepassing en gestructureerde
                mutaties — zodat finance en operatie vóór open gekend zijn.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="svc-cta" aria-labelledby="svc-cta-title">
        <div className="svc-cta__inner hnb-container">
          <div>
            <h2 id="svc-cta-title" className="svc-cta__title">
              Klaar om uw volgende event te plannen?
            </h2>
            <p className="svc-cta__sub">
              Dien een personeelsaanvraag in of spreek een coördinator — wij
              reageren met beschikbaarheid en vervolgstappen.
            </p>
          </div>
          <div className="svc-cta__actions">
            <Link to="/bedrijven/vind-talent" className="hnb-btn hnb-btn--primary">
              Vind talent
            </Link>
            <Link to="/contact" className="hnb-btn hnb-btn--outline">
              Contact opnemen
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
