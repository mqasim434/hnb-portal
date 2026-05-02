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
            Find Flexible{' '}
            <span className="fw-hero__accent">Event Work</span>
          </h1>
          <p className="fw-hero__sub">
            Join the H&amp;B Service Group freelancer network — pick up shifts that
            fit your schedule, get clear briefings before you arrive, and work with
            teams who respect your time on site and after the doors close. Whether
            you&apos;re building experience or stacking peak-season hours, we&apos;ll
            match you to gigs that suit your skills and certifications.
          </p>
        </div>
      </section>

      <section
        className="fw-section fw-section--surface"
        aria-labelledby="fw-benefits-title"
      >
        <div className="hnb-container">
          <header className="fw-section__head">
            <span className="fw-section__eyebrow">Why work with us</span>
            <h2 id="fw-benefits-title" className="fw-section__title">
              Built for people who actually work the show
            </h2>
            <p className="fw-section__lead">
              We know the job doesn&apos;t end when the lights go down — so we focus
              on fair scheduling, predictable pay cycles, and coordinators who pick
              up the phone when something changes last minute.
            </p>
          </header>
          <ul className="fw-benefits">
            <li className="fw-benefit">
              <div className="fw-benefit__icon" aria-hidden="true">
                <FiClock />
              </div>
              <h3 className="fw-benefit__title">Flexible hours</h3>
              <p className="fw-benefit__text">
                Choose shifts that fit around study, family, or other jobs. We
                publish call times and wrap expectations up front so you can plan
                your week with confidence.
              </p>
            </li>
            <li className="fw-benefit">
              <div className="fw-benefit__icon" aria-hidden="true">
                <FiCreditCard />
              </div>
              <h3 className="fw-benefit__title">Fast payments</h3>
              <p className="fw-benefit__text">
                Invoicing and timesheets shouldn&apos;t be a puzzle. We use a
                structured payout rhythm and keep paperwork light so you get paid
                on time after your shift is signed off.
              </p>
            </li>
            <li className="fw-benefit">
              <div className="fw-benefit__icon" aria-hidden="true">
                <FiMessageSquare />
              </div>
              <h3 className="fw-benefit__title">Structured communication</h3>
              <p className="fw-benefit__text">
                One channel for briefings, dress code, access points, and on-site
                contacts — no chasing DMs across five apps. If the run-of-show
                moves, you hear it from us first.
              </p>
            </li>
            <li className="fw-benefit">
              <div className="fw-benefit__icon" aria-hidden="true">
                <FiCalendar />
              </div>
              <h3 className="fw-benefit__title">Variety of events</h3>
              <p className="fw-benefit__text">
                From intimate corporate receptions to late-night venues and outdoor
                festivals — build a CV that stays interesting while staying aligned
                to what you&apos;re licensed and trained to do.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="fw-section" aria-labelledby="fw-roles-title">
        <div className="hnb-container">
          <header className="fw-section__head">
            <span className="fw-section__eyebrow">Roles</span>
            <h2 id="fw-roles-title" className="fw-section__title">
              Types of roles we roster
            </h2>
            <p className="fw-section__lead">
              Tell us what you&apos;re qualified for during onboarding — we&apos;ll
              only offer you work that matches your profile, tickets, and right to
              work.
            </p>
          </header>
          <ul className="fw-roles">
            <li className="fw-role">
              <div className="fw-role__icon" aria-hidden="true">
                <FiCoffee />
              </div>
              <h3 className="fw-role__title">Hospitality</h3>
              <p className="fw-role__text">
                Hosts, hostesses, bar support, and guest-facing roles where
                polish and pace matter — ideal if you love reading a room and
                keeping service smooth under pressure.
              </p>
            </li>
            <li className="fw-role">
              <div className="fw-role__icon" aria-hidden="true">
                <FiShield />
              </div>
              <h3 className="fw-role__title">Security</h3>
              <p className="fw-role__text">
                Licensed door and event security — access control, patrols, and
                calm, professional presence when crowds peak. We only roster where
                your licence and venue policy align.
              </p>
            </li>
            <li className="fw-role">
              <div className="fw-role__icon" aria-hidden="true">
                <FiUsers />
              </div>
              <h3 className="fw-role__title">General event staff</h3>
              <p className="fw-role__text">
                Runners, accreditation, wristbanding, backstage support, and the
                hands-on logistics that keep changeovers tight — great if you like
                being where the action is.
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
            <span className="fw-section__eyebrow">Getting started</span>
            <h2 id="fw-steps-title" className="fw-section__title">
              How it works
            </h2>
            <p className="fw-section__lead">
              A simple path from application to your first shift — we review every
              profile so clients know who is walking through their door.
            </p>
          </header>
          <ol className="fw-steps">
            <li className="fw-step">
              <span className="fw-step__num" aria-hidden="true">
                1
              </span>
              <div className="fw-step__body">
                <h3 className="fw-step__label">Apply</h3>
                <p className="fw-step__text">
                  Complete our registration flow with your experience, availability,
                  and documents. It takes a little effort up front — it saves
                  everyone time on site later.
                </p>
              </div>
            </li>
            <li className="fw-step">
              <span className="fw-step__num" aria-hidden="true">
                2
              </span>
              <div className="fw-step__body">
                <h3 className="fw-step__label">Get approved</h3>
                <p className="fw-step__text">
                  Our team checks licences, right to work, and role fit. You&apos;ll
                  hear back with next steps — and we&apos;ll flag anything missing
                  clearly so you&apos;re not left guessing.
                </p>
              </div>
            </li>
            <li className="fw-step">
              <span className="fw-step__num" aria-hidden="true">
                3
              </span>
              <div className="fw-step__body">
                <h3 className="fw-step__label">Start working</h3>
                <p className="fw-step__text">
                  Once you&apos;re live on the roster, you&apos;ll see shifts that
                  match your profile. Accept what works for you, show up briefed,
                  and build a relationship with a team that books again and again.
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
              Ready to join our team?
            </h2>
            <p className="fw-cta__sub">
              Start your application — it only takes a few minutes to tell us who
              you are and what you&apos;re great at.
            </p>
          </div>
          <Link to="/register" className="hnb-btn hnb-btn--primary">
            Apply Now
          </Link>
        </div>
      </section>
    </main>
  )
}
