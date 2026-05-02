import {
  FiAward,
  FiCoffee,
  FiHeart,
  FiShield,
  FiUsers,
  FiZap,
} from 'react-icons/fi'
import './About.css'

export default function About() {
  return (
    <main className="about">
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="hnb-container">
          <h1 id="about-hero-title" className="about-hero__title">
            About{' '}
            <span className="about-hero__accent">H&amp;B Service Group</span>
          </h1>
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-mission-title">
        <div className="hnb-container">
          <div className="about-section__inner">
            <span className="about-section__eyebrow">Mission</span>
            <h2 id="about-mission-title" className="about-section__title">
              Why we exist
            </h2>
            <p className="about-mission">
              We connect serious event operators with dependable hospitality and
              security talent — so every guest line, door, and backstage handover
              runs like clockwork, without your team burning out on last-minute
              staffing gaps.
            </p>
            <p className="about-prose">
              H&amp;B Service Group was built around a simple idea: the people on
              the floor make or break the night. We invest in vetting, clear
              communication, and coordinators who treat your event like their own —
              whether you are running a single venue night or a multi-day festival
              program.
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
            <span className="about-section__eyebrow">What we do</span>
            <h2 id="about-what-title" className="about-section__title">
              Hospitality and security staffing, end to end
            </h2>
            <p className="about-prose about-prose--after-title">
              We roster, brief, and deploy teams for live events across the
              Netherlands and beyond — always with licensing, right-to-work, and
              role fit checked before anyone is confirmed for your site.
            </p>
            <div className="about-split">
              <article className="about-pillar">
                <div className="about-pillar__icon" aria-hidden="true">
                  <FiCoffee />
                </div>
                <h3 className="about-pillar__title">Hospitality</h3>
                <p className="about-pillar__text">
                  Hosts, hostesses, bar teams, and guest-facing staff who understand
                  pace, polish, and responsible service — matched to your brand
                  standards and service windows.
                </p>
              </article>
              <article className="about-pillar">
                <div className="about-pillar__icon" aria-hidden="true">
                  <FiShield />
                </div>
                <h3 className="about-pillar__title">Security</h3>
                <p className="about-pillar__text">
                  Licensed door and event security focused on access control,
                  de-escalation, and tight radio discipline with your duty manager —
                  without compromising the guest experience at the door.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-values-title">
        <div className="hnb-container">
          <div className="about-section__inner about-section__inner--wide">
            <span className="about-section__eyebrow">Why choose us</span>
            <h2 id="about-values-title" className="about-section__title">
              What you can expect from a partner, not a vendor list
            </h2>
            <p className="about-prose about-prose--after-title">
              Operators stay with us because we reduce operational noise — fewer
              surprises on site, fewer no-shows, and fewer frantic calls the hour
              before doors.
            </p>
            <ul className="about-values">
              <li className="about-value">
                <span className="about-value__icon" aria-hidden="true">
                  <FiAward />
                </span>
                <div>
                  <h3 className="about-value__title">Vetted people</h3>
                  <p className="about-value__text">
                    Right-to-work, licences, and references checked before roster
                    proposals — so your site lead spends less time improvising.
                  </p>
                </div>
              </li>
              <li className="about-value">
                <span className="about-value__icon" aria-hidden="true">
                  <FiZap />
                </span>
                <div>
                  <h3 className="about-value__title">Speed with structure</h3>
                  <p className="about-value__text">
                    Tight turnarounds handled with a dispatch rhythm you can plan
                    around — confirmations, call sheets, and contingency cover when
                    it matters.
                  </p>
                </div>
              </li>
              <li className="about-value">
                <span className="about-value__icon" aria-hidden="true">
                  <FiHeart />
                </span>
                <div>
                  <h3 className="about-value__title">Human coordination</h3>
                  <p className="about-value__text">
                    One coordinator owns your brief from booking to breakdown — no
                    anonymous handoffs or lost context between shifts.
                  </p>
                </div>
              </li>
              <li className="about-value">
                <span className="about-value__icon" aria-hidden="true">
                  <FiUsers />
                </span>
                <div>
                  <h3 className="about-value__title">Consistent crews</h3>
                  <p className="about-value__text">
                    Familiar faces for recurring programs — fewer re-briefings,
                    tighter teamwork, and a calmer floor when the room fills up.
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
            <span className="about-section__eyebrow">Team &amp; culture</span>
            <div className="about-team">
              <h2 id="about-team-heading" className="about-team__title">
                Meet the team — coming soon
              </h2>
              <p className="about-team__text">
                We&apos;re preparing profiles of our leadership and on-site
                coordinators so you can see who stands behind the roster. Until
                then, the best way to get to know us is a conversation — reach out
                via our contact page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
