import { useEffect, useState } from 'react'
import { FiLock } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ACCOUNT_STATUS, ROLES } from '../../constants/roles'
import { usePageSeo } from '../../hooks/usePageSeo'
import { mapAuthError, signInWithEmail, signOutUser, fetchUserProfile } from '../../lib/auth/authService'
import { auth } from '../../firebase/config'
import './Auth.css'
import './AdminLoginPage.css'

export default function AdminLoginPage() {
  usePageSeo({
    title: 'Beheer — inloggen',
    description: 'Inloggen voor H&B Service Group beheerders.',
    canonicalPath: '/admin/login',
    noIndex: true,
  })

  const navigate = useNavigate()
  const location = useLocation()
  const { user, role, accountStatus, loading } = useSelector((state) => state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const firebaseReady = Boolean(auth)
  const redirectPath = location.state?.from

  useEffect(() => {
    if (loading || !user || accountStatus == null) return

    if (role === ROLES.ADMIN && accountStatus === ACCOUNT_STATUS.ACTIVE) {
      navigate(redirectPath || '/admin/dashboard', { replace: true })
    }
  }, [user, role, accountStatus, loading, navigate, redirectPath])

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signInWithEmail({ email, password })

      const uid = auth?.currentUser?.uid
      if (!uid) {
        throw new Error('Inloggen mislukt. Probeer het opnieuw.')
      }

      const profile = await fetchUserProfile(uid, { preferServer: true })
      if (profile?.role !== ROLES.ADMIN || profile?.accountStatus !== ACCOUNT_STATUS.ACTIVE) {
        await signOutUser()
        throw new Error('Dit account heeft geen beheertoegang.')
      }
    } catch (err) {
      setError(mapAuthError(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-page__panel" aria-label="Beheer inloggen">
        <div className="admin-login-page__card">
          <div className="admin-login-page__icon" aria-hidden="true">
            <FiLock />
          </div>
          <p className="admin-login-page__eyebrow">H&amp;B Service Group</p>
          <h1 className="admin-login-page__title">Beheer</h1>
          <p className="admin-login-page__lead">Alleen voor geautoriseerde beheerders.</p>

          {!firebaseReady ? (
            <div className="auth-alert auth-alert--info">
              Firebase is nog niet geconfigureerd. Vul <code>VITE_FIREBASE_*</code> in je{' '}
              <code>.env</code>-bestand in.
            </div>
          ) : (
            <form className="admin-login-page__form" onSubmit={handleSubmit} noValidate>
              {error ? (
                <div className="auth-alert auth-alert--error" role="alert">
                  {error}
                </div>
              ) : null}

              <div className="auth-field">
                <label htmlFor="admin-login-email">E-mailadres</label>
                <input
                  id="admin-login-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@hbservicegroup.com"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="admin-login-password">Wachtwoord</label>
                <input
                  id="admin-login-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <button
                type="submit"
                className="hnb-btn hnb-btn--primary auth-form__submit"
                disabled={submitting}
              >
                {submitting ? 'Bezig met inloggen…' : 'Inloggen'}
              </button>
            </form>
          )}

          <p className="admin-login-page__forgot">
            <Link to="/auth/forgot-password">Wachtwoord vergeten?</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
