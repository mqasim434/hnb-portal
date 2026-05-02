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
            Staffing <span className="svc-hero__accent">Services</span>
          </h1>
          <p className="svc-hero__sub">
            H&amp;B Service Group supplies hospitality and security teams for live
            events — from brief and roster through on-site coordination — so your
            production lead can focus on the guest experience, not last-minute
            gaps.
          </p>
        </div>
      </section>

      <section className="svc-section" aria-labelledby="svc-overview-title">
        <div className="hnb-container">
          <header className="svc-section__head">
            <span className="svc-section__eyebrow">Overview</span>
            <h2 id="svc-overview-title" className="svc-section__title">
              One partner for front-of-house and controlled access
            </h2>
            <p className="svc-section__lead">
              We combine rostering, compliance checks, and a single coordinator so
              you are not juggling separate agencies for bar teams and door staff.
              Every engagement is scoped to your venue, licensing context, and
              run-of-show.
            </p>
          </header>
          <p className="svc-prose">
            Whether you need a tight pool for a recurring club night or a larger
            crew for a festival weekend, we align headcount, shift patterns, and
            skill mix to your risk profile — without compromising service warmth at
            the door or at the bar.
          </p>
        </div>
      </section>

      <section
        className="svc-section svc-section--surface"
        aria-labelledby="svc-deliver-title"
      >
        <div className="hnb-container">
          <header className="svc-section__head">
            <span className="svc-section__eyebrow">What we deliver</span>
            <h2 id="svc-deliver-title" className="svc-section__title">
              Hospitality and security, scoped together
            </h2>
            <p className="svc-section__lead">
              Two disciplines, one briefing pack — so hosts, bartenders, and
              security share the same call times, access rules, and escalation path
              on the night.
            </p>
          </header>
          <div className="svc-grid-2">
            <article className="svc-card">
              <div className="svc-card__icon" aria-hidden="true">
                <FiCoffee />
              </div>
              <h3 className="svc-card__title">Hospitality staffing</h3>
              <ul className="svc-card__list">
                <li>Hosts, hostesses, and guest-facing reception roles</li>
                <li>Bar, barback, and service support for peak-volume service</li>
                <li>Coat check, accreditation desks, and VIP lane coverage</li>
                <li>Briefings aligned to your brand tone and service standards</li>
              </ul>
            </article>
            <article className="svc-card">
              <div className="svc-card__icon" aria-hidden="true">
                <FiShield />
              </div>
              <h3 className="svc-card__title">Security staffing</h3>
              <ul className="svc-card__list">
                <li>Licensed door supervisors and event security personnel</li>
                <li>Access control, perimeter awareness, and crowd monitoring</li>
                <li>Radio discipline with your duty manager and production desk</li>
                <li>Rostered only where licence class and venue policy match</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="svc-section" aria-labelledby="svc-process-title">
        <div className="hnb-container">
          <header className="svc-section__head">
            <span className="svc-section__eyebrow">Engagement</span>
            <h2 id="svc-process-title" className="svc-section__title">
              How a typical engagement works
            </h2>
            <p className="svc-section__lead">
              Transparent steps from first call to post-event wrap — no black-box
              staffing lists or surprise substitutions at the gate.
            </p>
          </header>
          <ol className="svc-steps">
            <li className="svc-step">
              <span className="svc-step__num">1</span>
              <h3 className="svc-step__title">Discovery &amp; scope</h3>
              <p className="svc-step__text">
                We capture dates, headcount ranges, site layout, licensing notes, and
                uniform expectations — then confirm feasibility and timelines.
              </p>
            </li>
            <li className="svc-step">
              <span className="svc-step__num">2</span>
              <h3 className="svc-step__title">Roster &amp; approvals</h3>
              <p className="svc-step__text">
                You receive a proposed roster with roles and call times. Nothing is
                confirmed until you sign off on names and shift splits.
              </p>
            </li>
            <li className="svc-step">
              <span className="svc-step__num">3</span>
              <h3 className="svc-step__title">Brief &amp; dispatch</h3>
              <p className="svc-step__text">
                Teams receive a consolidated brief: access points, escalation
                contacts, service windows, and any site-specific rules.
              </p>
            </li>
            <li className="svc-step">
              <span className="svc-step__num">4</span>
              <h3 className="svc-step__title">On-site &amp; review</h3>
              <p className="svc-step__text">
                Your coordinator stays reachable during the run. After load-out we
                review hours, incidents, and learnings for the next booking.
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
            <span className="svc-section__eyebrow">Sectors</span>
            <h2 id="svc-sectors-title" className="svc-section__title">
              Where we most often deploy
            </h2>
            <p className="svc-section__lead">
              Programs differ by risk and tempo — we tune ratios and shift patterns
              to the environment instead of sending generic “event packs.”
            </p>
          </header>
          <ul className="svc-sectors">
            {[
              'Festivals & outdoor',
              'Corporate & private',
              'Nightlife & venues',
              'Theatre & arenas',
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
            <span className="svc-section__eyebrow">Included</span>
            <h2 id="svc-includes-title" className="svc-section__title">
              What you can expect in every package
            </h2>
          </header>
          <div className="svc-grid-2">
            <article className="svc-card">
              <div className="svc-card__icon" aria-hidden="true">
                <FiCheckSquare />
              </div>
              <h3 className="svc-card__title">Compliance-ready rostering</h3>
              <p className="svc-card__copy">
                Right-to-work and licence checks before confirmation; documentation
                organised so your venue security and finance teams see a clean trail.
              </p>
            </article>
            <article className="svc-card">
              <div className="svc-card__icon" aria-hidden="true">
                <FiHeadphones />
              </div>
              <h3 className="svc-card__title">Dedicated coordination</h3>
              <p className="svc-card__copy">
                One point of contact for changes, substitutions, and on-site
                questions — fewer handoffs and faster decisions when the schedule
                moves.
              </p>
            </article>
            <article className="svc-card">
              <div className="svc-card__icon" aria-hidden="true">
                <FiLayers />
              </div>
              <h3 className="svc-card__title">Flexible scale</h3>
              <p className="svc-card__copy">
                Scale up for peak nights or multi-day builds; hold a smaller core
                team for recurring programs with familiar faces on the roster.
              </p>
            </article>
            <article className="svc-card">
              <div className="svc-card__icon" aria-hidden="true">
                <FiBriefcase />
              </div>
              <h3 className="svc-card__title">Commercial clarity</h3>
              <p className="svc-card__copy">
                Clear scopes, rate cards where applicable, and structured
                timesheets — so finance and operations are aligned before doors open.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="svc-cta" aria-labelledby="svc-cta-title">
        <div className="svc-cta__inner hnb-container">
          <div>
            <h2 id="svc-cta-title" className="svc-cta__title">
              Ready to scope your next event?
            </h2>
            <p className="svc-cta__sub">
              Send a staffing request or speak with a coordinator — we&apos;ll reply
              with availability and next steps.
            </p>
          </div>
          <div className="svc-cta__actions">
            <Link to="/hire-staff" className="hnb-btn hnb-btn--primary">
              Hire Staff
            </Link>
            <Link to="/contact" className="hnb-btn hnb-btn--outline">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
