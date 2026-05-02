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
            Reliable Event Staff.{' '}
            <span className="home-hero__accent">On Demand.</span>
          </h1>
          <p className="home-hero__sub">
            H&amp;B Service Group supplies vetted hospitality teams and licensed
            security for live events, venues, and corporate programs — rostered,
            briefed, and on-site when you need them, with a single coordinator from
            booking to breakdown.
          </p>
          <div className="home-hero__actions">
            <Link to="/hire-staff" className="hnb-btn hnb-btn--primary">
              Hire Staff
            </Link>
            <Link to="/find-work" className="hnb-btn hnb-btn--outline">
              Find Work
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
            <span className="home-section__eyebrow">What we deliver</span>
            <h2 id="home-services-heading" className="home-section__title">
              Hospitality and security, one roster
            </h2>
            <p className="home-section__lead">
              From front-of-house polish to controlled access and crowd-aware
              teams, we match the right people to the tempo and compliance profile
              of your event.
            </p>
          </header>
          <div className="home-services__grid">
            <article className="home-service-card">
              <div className="home-service-card__icon" aria-hidden="true">
                <FiCoffee />
              </div>
              <h3 className="home-service-card__title">Hospitality staff</h3>
              <p className="home-service-card__text">
                Hosts, bartenders, barbacks, food runners, and guest-facing teams
                trained for high-volume service — aligned to your run-of-show,
                brand standards, and responsible service expectations.
              </p>
              <Link to="/services" className="home-service-card__link">
                Explore hospitality →
              </Link>
            </article>
            <article className="home-service-card">
              <div className="home-service-card__icon" aria-hidden="true">
                <FiShield />
              </div>
              <h3 className="home-service-card__title">Security personnel</h3>
              <p className="home-service-card__text">
                Licensed door supervisors and event security focused on access
                control, de-escalation, and clear radio comms with your production
                lead — without compromising the guest experience.
              </p>
              <Link to="/services" className="home-service-card__link">
                Explore security →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section
        className="home-section"
        aria-labelledby="home-markets-heading"
      >
        <div className="hnb-container">
          <header className="home-section__header">
            <span className="home-section__eyebrow">Where we operate</span>
            <h2 id="home-markets-heading" className="home-section__title">
              Built for demanding event environments
            </h2>
            <p className="home-section__lead">
              Short turnarounds, shifting headcounts, and late-night peaks are
              normal for us — we scale crews up or down while keeping quality
              consistent.
            </p>
          </header>
          <ul className="home-markets__grid">
            <li className="home-market-tile">
              <div className="home-market-tile__icon" aria-hidden="true">
                <FiMusic />
              </div>
              <h3 className="home-market-tile__title">Festivals</h3>
              <p className="home-market-tile__text">
                Multi-day builds, perimeter and backstage coverage, and bar teams
                that keep lines moving when the headliner drops.
              </p>
            </li>
            <li className="home-market-tile">
              <div className="home-market-tile__icon" aria-hidden="true">
                <FiBriefcase />
              </div>
              <h3 className="home-market-tile__title">Corporate events</h3>
              <p className="home-market-tile__text">
                Galas, product launches, and shareholder moments — discreet
                uniforms, polished service, and security that stays in the
                background.
              </p>
            </li>
            <li className="home-market-tile">
              <div className="home-market-tile__icon" aria-hidden="true">
                <FiMoon />
              </div>
              <h3 className="home-market-tile__title">Nightlife</h3>
              <p className="home-market-tile__text">
                Peak-night staffing for clubs and late venues: ID checks, floor
                presence, and bar support that matches the pace of the room.
              </p>
            </li>
            <li className="home-market-tile">
              <div className="home-market-tile__icon" aria-hidden="true">
                <FiMapPin />
              </div>
              <h3 className="home-market-tile__title">Venues</h3>
              <p className="home-market-tile__text">
                Arenas, theatres, and multi-use spaces — recurring programs with
                familiar faces, fewer handovers, and tighter operational rhythm.
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
            <span className="home-section__eyebrow">Why operators choose us</span>
            <h2 id="home-values-heading" className="home-section__title">
              A partner model, not a spreadsheet of names
            </h2>
            <p className="home-section__lead">
              We protect your reputation on the floor — with people who show up
              prepared, communicate clearly, and represent your brand like insiders.
            </p>
          </header>
          <ul className="home-values__grid">
            <li className="home-value">
              <div className="home-value__icon" aria-hidden="true">
                <FiUserCheck />
              </div>
              <div>
                <h3 className="home-value__title">Pre-screened staff</h3>
                <p className="home-value__text">
                  Right-to-work, licensing, and role-fit checks before anyone is
                  proposed — so your site lead spends less time firefighting.
                </p>
              </div>
            </li>
            <li className="home-value">
              <div className="home-value__icon" aria-hidden="true">
                <FiSend />
              </div>
              <div>
                <h3 className="home-value__title">Fast deployment</h3>
                <p className="home-value__text">
                  Tight timelines and last-minute changes are handled with a
                  structured dispatch process — confirmations, call times, and
                  contingency cover where it matters.
                </p>
              </div>
            </li>
            <li className="home-value">
              <div className="home-value__icon" aria-hidden="true">
                <FiUsers />
              </div>
              <div>
                <h3 className="home-value__title">Flexible workforce</h3>
                <p className="home-value__text">
                  Scale from intimate receptions to peak-capacity nights without
                  sacrificing ratios — hospitality and security booked as one plan.
                </p>
              </div>
            </li>
            <li className="home-value">
              <div className="home-value__icon" aria-hidden="true">
                <FiHeadphones />
              </div>
              <div>
                <h3 className="home-value__title">Single point of contact</h3>
                <p className="home-value__text">
                  One coordinator owns your brief, roster, and on-site adjustments —
                  fewer handoffs, faster decisions, cleaner reporting after the event.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="home-cta" aria-labelledby="home-cta-heading">
        <div className="home-cta__inner hnb-container">
          <h2 id="home-cta-heading" className="home-cta__title">
            Ready to staff your next event?
          </h2>
          <div className="home-cta__actions">
            <Link to="/hire-staff" className="hnb-btn hnb-btn--primary">
              Hire Staff
            </Link>
            <Link to="/find-work" className="hnb-btn hnb-btn--outline">
              Find Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
