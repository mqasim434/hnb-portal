import { Link } from 'react-router-dom'
import { FOOTER_LEGAL_LINKS, FOOTER_TAGLINE, NAV_GROUPS } from '../content/navigation'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner hnb-container">
        <div className="site-footer__grid">
          <div className="site-footer__col site-footer__col--brand">
            <Link to="/" className="site-footer__logo">
              <span className="site-footer__logo-mark">H&amp;B</span>
              <span className="site-footer__logo-name">Service Group</span>
            </Link>
            <p className="site-footer__tagline">{FOOTER_TAGLINE}</p>
          </div>

          {NAV_GROUPS.map((group) => (
            <nav
              key={group.id}
              className="site-footer__col site-footer__col--nav"
              aria-label={group.label}
            >
              <h2 className="site-footer__heading">{group.label}</h2>
              <ul className="site-footer__links">
                {group.items.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="site-footer__link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="site-footer__col site-footer__col--contact">
            <h2 className="site-footer__heading">Contact</h2>
            <ul className="site-footer__contact-list">
              <li className="site-footer__contact-item">
                <span className="site-footer__contact-label">E-mail</span>
                <a
                  className="site-footer__contact-value"
                  href="mailto:bookings@hbservicegroup.com"
                >
                  bookings@hbservicegroup.com
                </a>
              </li>
              <li className="site-footer__contact-item">
                <span className="site-footer__contact-label">Telefoon</span>
                <a
                  className="site-footer__contact-value"
                  href="tel:+31200000000"
                >
                  +31 (0) 20 000 0000
                </a>
              </li>
              <li className="site-footer__contact-item">
                <span className="site-footer__contact-label">Locatie</span>
                <span className="site-footer__contact-value">
                  Amsterdam, Nederland
                </span>
              </li>
              <li className="site-footer__contact-item">
                <Link to="/contact" className="site-footer__link">
                  Contactformulier →
                </Link>
              </li>
            </ul>
            <div className="site-footer__ctas">
              <Link to="/bedrijven/personeel-aanvragen" className="hnb-btn hnb-btn--primary">
                Personeel aanvragen
              </Link>
              <Link to="/freelancers/direct-aanmelden" className="hnb-btn hnb-btn--outline">
                Direct aanmelden
              </Link>
            </div>
          </div>
        </div>

        <div className="site-footer__bar">
          <div className="site-footer__bar-inner">
            <div className="site-footer__legal" aria-label="Juridische informatie">
              <ul className="site-footer__legal-links">
                {FOOTER_LEGAL_LINKS.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="site-footer__legal-link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="site-footer__meta">
            <p className="site-footer__copyright">
              © {year} H&amp;B Service Group. Alle rechten voorbehouden.
            </p>
            <p className="site-footer__credit">
              Gebouwd door{' '}
              <a
                href="https://www.devtanics.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Devtanics
              </a>
            </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
