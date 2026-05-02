import { Link } from 'react-router-dom'
import './Footer.css'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/hire-staff', label: 'Hire Staff' },
  { to: '/find-work', label: 'Find Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

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
            <p className="site-footer__tagline">
              Reliable Event Staff. On Demand.
            </p>
          </div>

          <nav
            className="site-footer__col site-footer__col--links"
            aria-label="Footer quick links"
          >
            <h2 className="site-footer__heading">Quick links</h2>
            <ul className="site-footer__links">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="site-footer__link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__col site-footer__col--contact">
            <h2 className="site-footer__heading">Contact</h2>
            <ul className="site-footer__contact-list">
              <li className="site-footer__contact-item">
                <span className="site-footer__contact-label">Email</span>
                <a
                  className="site-footer__contact-value"
                  href="mailto:bookings@hbservicegroup.com"
                >
                  bookings@hbservicegroup.com
                </a>
              </li>
              <li className="site-footer__contact-item">
                <span className="site-footer__contact-label">Phone</span>
                <a
                  className="site-footer__contact-value"
                  href="tel:+31200000000"
                >
                  +31 (0) 20 000 0000
                </a>
              </li>
              <li className="site-footer__contact-item">
                <span className="site-footer__contact-label">Location</span>
                <span className="site-footer__contact-value">
                  Amsterdam, Netherlands
                </span>
              </li>
            </ul>
            <div className="site-footer__ctas">
              <Link to="/hire-staff" className="hnb-btn hnb-btn--primary">
                Hire Staff
              </Link>
              <Link to="/find-work" className="hnb-btn hnb-btn--outline">
                Find Work
              </Link>
            </div>
          </div>
        </div>

        <div className="site-footer__bar">
          <div className="site-footer__bar-inner">
            <p className="site-footer__copyright">
              © {year} H&amp;B Service Group. All rights reserved.
            </p>
            <p className="site-footer__credit">Built by <a href="https://www.devtanics.com" target="_blank" rel="noopener noreferrer">Devtanics</a></p>
          </div>
        </div>
      </div>
    </footer>
  )
}
