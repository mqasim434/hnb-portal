import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import { usePageSeo } from '../../hooks/usePageSeo'
import { mapAuthError, sendPasswordReset } from '../../lib/auth/authService'
import { auth } from '../../firebase/config'
import './Auth.css'

export default function ForgotPasswordPage() {
  usePageSeo({
    title: 'Wachtwoord vergeten — H&B Service Group',
    description: 'Vraag een wachtwoord-reset aan voor uw H&B-portaalaccount.',
    canonicalPath: '/auth/forgot-password',
    noIndex: true,
  })

  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await sendPasswordReset(email)
      setSent(true)
    } catch (err) {
      setError(mapAuthError(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <PageHero
        variant="navy"
        title="Wachtwoord vergeten"
        lead="We sturen een resetlink naar uw e-mailadres als er een account bij ons bekend is."
      />

      <section className="auth-panel hnb-container" aria-label="Wachtwoord resetten">
        {!auth ? (
          <div className="auth-form-wrap auth-alert auth-alert--info">
            Firebase is nog niet geconfigureerd.
          </div>
        ) : sent ? (
          <div className="auth-status-card">
            <h1>E-mail verstuurd</h1>
            <p>
              Als <strong>{email}</strong> bij ons bekend is, ontvangt u binnen enkele minuten een
              link om uw wachtwoord te resetten.
            </p>
            <Link to="/login" className="hnb-btn hnb-btn--freelancer">
              Terug naar inloggen
            </Link>
          </div>
        ) : (
          <form className="auth-form-wrap" onSubmit={handleSubmit} noValidate>
            <h2 className="auth-form__title">Resetlink aanvragen</h2>

            {error ? (
              <div className="auth-alert auth-alert--error" role="alert">
                {error}
              </div>
            ) : null}

            <div className="auth-field">
              <label htmlFor="reset-email">E-mailadres</label>
              <input
                id="reset-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-form__actions">
              <button
                type="submit"
                className="hnb-btn hnb-btn--freelancer auth-form__submit"
                disabled={submitting}
              >
                {submitting ? 'Versturen…' : 'Resetlink versturen'}
              </button>
              <Link to="/login" className="auth-form__links">
                Terug naar inloggen
              </Link>
            </div>
          </form>
        )}
      </section>
    </main>
  )
}
