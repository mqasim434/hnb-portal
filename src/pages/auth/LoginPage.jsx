import { useEffect, useState } from 'react'
import { FiArrowRight, FiBriefcase, FiUser } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PageHero from '../../components/marketing/PageHero'
import { LOGIN_SEO } from '../../content/loginSeo'
import { ACCOUNT_STATUS, getRoleHomePath } from '../../constants/roles'
import { usePageSeo } from '../../hooks/usePageSeo'
import { mapAuthError, signInWithEmail } from '../../lib/auth/authService'
import { auth } from '../../firebase/config'
import './LoginPage.css'

/**
 * @param {{
 *   emailId: string
 *   passwordId: string
 *   emailPlaceholder: string
 *   submitLabel: string
 *   submittingLabel: string
 *   buttonClassName: string
 * }} props
 */
function PortalLoginForm({
  emailId,
  passwordId,
  emailPlaceholder,
  submitLabel,
  submittingLabel,
  buttonClassName,
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signInWithEmail({ email, password })
    } catch (err) {
      setError(mapAuthError(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      {error ? (
        <div className="login-form__alert login-form__alert--error" role="alert">
          {error}
        </div>
      ) : null}

      <div className="login-form__field">
        <label htmlFor={emailId}>E-mailadres</label>
        <input
          id={emailId}
          className="login-form__input"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailPlaceholder}
        />
      </div>

      <div className="login-form__field">
        <label htmlFor={passwordId}>Wachtwoord</label>
        <input
          id={passwordId}
          className="login-form__input"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="login-form__footer">
        <Link className="login-form__forgot" to="/auth/forgot-password">
          Wachtwoord vergeten?
        </Link>
      </div>

      <button type="submit" className={buttonClassName} disabled={submitting}>
        {submitting ? submittingLabel : submitLabel}
        {!submitting ? <FiArrowRight className="login-card__btn-icon" aria-hidden /> : null}
      </button>
    </form>
  )
}

export default function Login() {
  usePageSeo({
    title: LOGIN_SEO.title,
    description: LOGIN_SEO.description,
    canonicalPath: LOGIN_SEO.path,
  })

  const navigate = useNavigate()
  const location = useLocation()
  const { user, role, accountStatus, loading } = useSelector((state) => state.auth)

  const firebaseReady = Boolean(auth)
  const redirectPath = location.state?.from

  useEffect(() => {
    if (loading || !user || accountStatus == null) return

    if (accountStatus !== ACCOUNT_STATUS.ACTIVE) {
      navigate('/auth/pending', { replace: true })
      return
    }

    if (redirectPath && role) {
      navigate(redirectPath, { replace: true })
      return
    }

    if (role) {
      navigate(getRoleHomePath(role), { replace: true })
    }
  }, [user, role, accountStatus, loading, navigate, redirectPath])

  return (
    <main className="login-page">
      <PageHero
        variant="navy"
        eyebrow="H&B Service Group"
        title="Welkom terug"
        lead="Log in op jouw portaal. Freelancers beheren opdrachten en uren; opdrachtgevers volgen aanvragen."
      />

      <section className="login-cards hnb-container" aria-label="Portaal inloggen">
        <div className="login-grid">
          <article
            className="login-card login-card--freelancer"
            aria-labelledby="login-freelancer-title"
          >
            <div className="login-card__header">
              <div className="login-card__icon login-card__icon--freelancer" aria-hidden="true">
                <FiUser />
              </div>
              <h2 id="login-freelancer-title" className="login-card__title">
                Ik ben freelancer
              </h2>
              <p className="login-card__text">
                Bekijk jouw opdrachten, dien uren in en beheer je profiel.
              </p>
            </div>

            <div className="login-card__body">
              {!firebaseReady ? (
                <div className="login-form">
                  <div className="login-form__alert login-form__alert--info">
                    Firebase is nog niet geconfigureerd. Vul <code>VITE_FIREBASE_*</code> in je{' '}
                    <code>.env</code>-bestand in en herstart de dev-server.
                  </div>
                </div>
              ) : (
                <PortalLoginForm
                  emailId="login-freelancer-email"
                  passwordId="login-freelancer-password"
                  emailPlaceholder="naam@voorbeeld.nl"
                  submitLabel="Inloggen als freelancer"
                  submittingLabel="Bezig met inloggen…"
                  buttonClassName="hnb-btn hnb-btn--freelancer login-card__btn"
                />
              )}
            </div>

            <footer className="login-card__footer">
              <Link className="login-card__link" to="/auth/register">
                Nog geen account? Account aanmaken →
              </Link>
              <Link className="login-card__link login-card__link--muted" to="/freelancers/direct-aanmelden">
                Of vul het volledige aanmeldformulier in
              </Link>
            </footer>
          </article>

          <article
            className="login-card login-card--company"
            aria-labelledby="login-company-title"
          >
            <div className="login-card__header">
              <div className="login-card__icon login-card__icon--company" aria-hidden="true">
                <FiBriefcase />
              </div>
              <h2 id="login-company-title" className="login-card__title">
                Ik ben opdrachtgever
              </h2>
              <p className="login-card__text">
                Plaats opdrachten, bekijk sollicitaties en selecteer freelancers voor jouw evenementen.
              </p>
            </div>

            <div className="login-card__body">
              {!firebaseReady ? (
                <div className="login-form">
                  <div className="login-form__alert login-form__alert--info">
                    Firebase is nog niet geconfigureerd. Vul <code>VITE_FIREBASE_*</code> in je{' '}
                    <code>.env</code>-bestand in en herstart de dev-server.
                  </div>
                </div>
              ) : (
                <PortalLoginForm
                  emailId="login-company-email"
                  passwordId="login-company-password"
                  emailPlaceholder="naam@bedrijf.nl"
                  submitLabel="Inloggen als opdrachtgever"
                  submittingLabel="Bezig met inloggen…"
                  buttonClassName="hnb-btn hnb-btn--primary login-card__btn"
                />
              )}
            </div>

            <footer className="login-card__footer">
              <Link className="login-card__link" to="/auth/register/company">
                Nog geen account? Bedrijfsaccount aanmaken →
              </Link>
              <Link className="login-card__link login-card__link--muted" to="/bedrijven/personeel-aanvragen">
                Eerst personeel aanvragen zonder account
              </Link>
            </footer>
          </article>
        </div>

        <p className="login-page__help">
          Problemen met inloggen?{' '}
          <Link to="/contact">Neem contact op met ons team</Link>.
        </p>
      </section>
    </main>
  )
}
