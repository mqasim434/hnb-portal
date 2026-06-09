import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import { ROLES } from '../../constants/roles'
import { usePageSeo } from '../../hooks/usePageSeo'
import { mapAuthError, registerCompanyAccount } from '../../lib/auth/authService'
import { auth } from '../../firebase/config'
import './Auth.css'

export default function RegisterCompanyPage() {
  usePageSeo({
    title: 'Bedrijfsaccount aanmaken — H&B Service Group',
    description:
      'Registreer als opdrachtgever om opdrachten te plaatsen en freelancers te selecteren.',
    canonicalPath: '/auth/register/company',
    noIndex: true,
  })

  const [companyName, setCompanyName] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)

    if (!companyName.trim()) {
      setError('Vul een bedrijfsnaam in.')
      return
    }
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
      await registerCompanyAccount({ email, companyName, contactPerson, password })
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
        <PageHero variant="navy" title="Bedrijfsaccount aanmaken" lead="Firebase is nog niet geconfigureerd." />
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
        eyebrow="Bedrijfsportaal"
        title="Bedrijfsaccount aanmaken"
        lead="Registreer als opdrachtgever. Na goedkeuring door H&B kun je opdrachten plaatsen waar freelancers op reageren."
      />

      <section className="auth-panel hnb-container" aria-label="Bedrijfsregistratie">
        {success ? (
          <div className="auth-status-card">
            <h1>Aanmelding ontvangen</h1>
            <p>
              Je bedrijfsaccount is aangemaakt met status <strong>in behandeling</strong>. Zodra H&amp;B
              je account heeft goedgekeurd als <strong>{ROLES.COMPANY}</strong>, kun je inloggen op het
              bedrijfsportaal.
            </p>
            <div className="auth-form__actions">
              <Link to="/login" className="hnb-btn hnb-btn--primary auth-form__submit">
                Naar inloggen
              </Link>
            </div>
          </div>
        ) : (
          <form className="auth-form-wrap auth-form-wrap--wide" onSubmit={handleSubmit} noValidate>
            <h2 className="auth-form__title">Opdrachtgever registreren</h2>
            <p className="auth-form__lead">
              Al een account? <Link to="/login">Log in</Link>. Freelancer?{' '}
              <Link to="/auth/register">Freelancer registreren</Link>.
            </p>

            {error ? (
              <div className="auth-alert auth-alert--error" role="alert">
                {error}
              </div>
            ) : null}

            <div className="auth-field">
              <label htmlFor="company-name">Bedrijfsnaam</label>
              <input
                id="company-name"
                type="text"
                autoComplete="organization"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="company-contact">Contactpersoon</label>
              <input
                id="company-contact"
                type="text"
                autoComplete="name"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="company-email">Zakelijk e-mailadres</label>
              <input
                id="company-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="company-password">Wachtwoord</label>
              <input
                id="company-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="company-confirm">Bevestig wachtwoord</label>
              <input
                id="company-confirm"
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
                className="hnb-btn hnb-btn--primary auth-form__submit"
                disabled={submitting}
              >
                {submitting ? 'Account aanmaken…' : 'Bedrijfsaccount aanmaken'}
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  )
}
