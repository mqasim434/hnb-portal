import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import { ROLES } from '../../constants/roles'
import { usePageSeo } from '../../hooks/usePageSeo'
import { mapAuthError, registerFreelancerAccount } from '../../lib/auth/authService'
import { auth } from '../../firebase/config'
import './Auth.css'

export default function RegisterPage() {
  usePageSeo({
    title: 'Account aanmaken — H&B Service Group',
    description:
      'Maak een freelanceraccount aan voor het H&B-portaal. Na goedkeuring krijg je toegang tot opdrachten, uren en documenten.',
    canonicalPath: '/auth/register',
    noIndex: true,
  })

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Kies een wachtwoord van minimaal 8 tekens.')
      return
    }
    if (password !== confirmPassword) {
      setError('Wachtwoorden komen niet overeen.')
      return
    }

    setSubmitting(true)
    try {
      await registerFreelancerAccount({ email, displayName, password })
      setSuccess(true)
    } catch (err) {
      setError(mapAuthError(err))
    } finally {
      setSubmitting(false)
    }
  }

  if (!auth) {
    return (
      <main className="auth-page">
        <PageHero variant="navy" title="Account aanmaken" lead="Firebase is nog niet geconfigureerd." />
        <section className="auth-panel hnb-container">
          <div className="auth-alert auth-alert--info auth-form-wrap">
            Vul <code>VITE_FIREBASE_*</code> in je <code>.env</code>-bestand in.
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="auth-page">
      <PageHero
        variant="navy"
        eyebrow="Freelancerportaal"
        title="Account aanmaken"
        lead="Registreer met e-mail en wachtwoord. H&B beoordeelt je aanmelding voordat je toegang krijgt tot het portaal."
      />

      <section className="auth-panel hnb-container" aria-label="Registratieformulier">
        {success ? (
          <div className="auth-status-card">
            <h1>Aanmelding ontvangen</h1>
            <p>
              Je account is aangemaakt met status <strong>in behandeling</strong>. Zodra H&amp;B je
              profiel heeft goedgekeurd als <strong>{ROLES.FREELANCER}</strong>, kun je inloggen.
            </p>
            <p>
              Vul intussen het uitgebreide aanmeldformulier in voor snellere onboarding.
            </p>
            <div className="auth-form__actions">
              <Link to="/login" className="hnb-btn hnb-btn--freelancer auth-form__submit">
                Naar inloggen
              </Link>
              <Link to="/freelancers/direct-aanmelden" className="hnb-btn hnb-btn--outline auth-form__submit">
                Direct aanmelden (volledig formulier)
              </Link>
            </div>
          </div>
        ) : (
          <form className="auth-form-wrap auth-form-wrap--wide" onSubmit={handleSubmit} noValidate>
            <h2 className="auth-form__title">Freelancer registreren</h2>
            <p className="auth-form__lead">
              Al een account? <Link to="/login">Log in</Link>.
            </p>

            {error ? (
              <div className="auth-alert auth-alert--error" role="alert">
                {error}
              </div>
            ) : null}

            <div className="auth-field">
              <label htmlFor="register-name">Volledige naam</label>
              <input
                id="register-name"
                type="text"
                autoComplete="name"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">E-mailadres</label>
              <input
                id="register-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-password">Wachtwoord</label>
              <input
                id="register-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-confirm">Bevestig wachtwoord</label>
              <input
                id="register-confirm"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="auth-form__actions">
              <button
                type="submit"
                className="hnb-btn hnb-btn--freelancer auth-form__submit"
                disabled={submitting}
              >
                {submitting ? 'Account aanmaken…' : 'Account aanmaken'}
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  )
}
