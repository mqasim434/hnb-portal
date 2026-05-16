import { FiArrowRight, FiBriefcase, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import { LOGIN_SEO } from '../../content/loginSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import { getZohoCompanyPortalUrl, getZohoFreelancerPortalUrl } from '../../lib/portalUrls'
import './Login.css'

export default function Login() {
  usePageSeo({
    title: LOGIN_SEO.title,
    description: LOGIN_SEO.description,
    canonicalPath: LOGIN_SEO.path,
  })

  const freelancerPortal = getZohoFreelancerPortalUrl()
  const companyPortal = getZohoCompanyPortalUrl()

  return (
    <main className="login-page">
      <PageHero
        variant="navy"
        eyebrow="H&B Service Group"
        title="Portaal inloggen"
        lead="Kies uw omgeving. Beide portalen draaien op Zoho Creator — na inloggen volgt uw eigen dashboard voor uren, documenten of aanvragen."
      />

      <section className="login-cards hnb-container" aria-label="Portaalkeuze">
        <div className="login-grid">
          <article className="login-card login-card--freelancer" aria-labelledby="login-freelancer-title">
            <div className="login-card__icon login-card__icon--freelancer" aria-hidden="true">
              <FiUser />
            </div>
            <h2 id="login-freelancer-title" className="login-card__title">
              Freelancerportaal
            </h2>
            <p className="login-card__text">
              Planning, uren en documenten voor professionals die via H&amp;B werken. Log in met uw Zoho-account.
            </p>
            <div className="login-card__actions">
              {freelancerPortal ? (
                <a
                  className="hnb-btn hnb-btn--primary login-card__btn"
                  href={freelancerPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inloggen freelancerportaal
                  <FiArrowRight className="login-card__btn-icon" aria-hidden />
                </a>
              ) : (
                <p className="login-card__missing">
                  Portaal-URL nog niet geconfigureerd. Zet{' '}
                  <code className="login-card__code">VITE_ZOHO_FREELANCER_PORTAL_URL</code> in uw omgeving
                  of neem contact op.
                </p>
              )}
              <Link className="hnb-btn hnb-btn--outline login-card__btn login-card__btn--secondary" to="/freelancers/hoe-het-werkt">
                Zo werkt het voor freelancers
              </Link>
              <Link className="login-card__link" to="/freelancers/direct-aanmelden">
                Nog geen account? Direct aanmelden
              </Link>
            </div>
          </article>

          <article className="login-card login-card--company" aria-labelledby="login-company-title">
            <div className="login-card__icon login-card__icon--company" aria-hidden="true">
              <FiBriefcase />
            </div>
            <h2 id="login-company-title" className="login-card__title">
              Bedrijfsportaal
            </h2>
            <p className="login-card__text">
              Overzicht voor opdrachtgevers: aanvragen, status en communicatie rond teams en compliance.
            </p>
            <div className="login-card__actions">
              {companyPortal ? (
                <a
                  className="hnb-btn hnb-btn--primary login-card__btn"
                  href={companyPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inloggen bedrijfsportaal
                  <FiArrowRight className="login-card__btn-icon" aria-hidden />
                </a>
              ) : (
                <p className="login-card__missing">
                  Portaal-URL nog niet geconfigureerd. Zet{' '}
                  <code className="login-card__code">VITE_ZOHO_COMPANY_PORTAL_URL</code> in uw omgeving of
                  vraag toegang aan via contact.
                </p>
              )}
              <Link className="hnb-btn hnb-btn--outline login-card__btn login-card__btn--secondary" to="/bedrijven/personeel-aanvragen">
                Personeel aanvragen
              </Link>
              <Link className="login-card__link" to="/contact">
                Toegang of vragen — contact
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
