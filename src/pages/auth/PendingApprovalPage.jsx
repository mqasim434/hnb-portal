import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PageHero from '../../components/marketing/PageHero'
import { ACCOUNT_STATUS, getRoleHomePath, ROLES } from '../../constants/roles'
import { usePageSeo } from '../../hooks/usePageSeo'
import { signOutUser } from '../../lib/auth/authService'
import './Auth.css'

export default function PendingApprovalPage() {
  usePageSeo({
    title: 'Account in behandeling — H&B Service Group',
    description: 'Uw H&B-portaalaccount wacht op goedkeuring.',
    canonicalPath: '/auth/pending',
    noIndex: true,
  })

  const location = useLocation()
  const navigate = useNavigate()
  const { user, role, profile, accountStatus, loading } = useSelector((state) => state.auth)
  const blocked = location.state?.blocked
  const intendedRole = profile?.intendedRole

  const status = blocked ?? accountStatus ?? ACCOUNT_STATUS.PENDING

  useEffect(() => {
    if (loading || !user || accountStatus == null) return
    if (accountStatus !== ACCOUNT_STATUS.ACTIVE) return
    navigate(getRoleHomePath(role), { replace: true })
  }, [loading, user, role, accountStatus, navigate])

  let title = 'Account in behandeling'
  let message =
    intendedRole === ROLES.COMPANY
      ? 'Bedankt voor je aanmelding als opdrachtgever. H&B beoordeelt je bedrijfsaccount. Zodra je bent goedgekeurd, kun je inloggen op het bedrijfsportaal.'
      : 'Bedankt voor je aanmelding. H&B beoordeelt je profiel. Zodra je account is goedgekeurd, krijg je toegang tot het freelancerportaal.'

  if (status === ACCOUNT_STATUS.REJECTED) {
    title = 'Aanmelding afgewezen'
    message =
      'Uw aanmelding is helaas niet goedgekeurd. Neem contact op met H&B als u denkt dat dit een vergissing is.'
  } else if (status === ACCOUNT_STATUS.SUSPENDED) {
    title = 'Account gepauzeerd'
    message =
      'Uw account is tijdelijk gedeactiveerd. Neem contact op met H&B voor meer informatie.'
  }

  async function handleLogout() {
    await signOutUser()
  }

  return (
    <main className="auth-page">
      <PageHero variant="navy" title={title} lead="H&B Service Group — portaaltoegang" />

      <section className="auth-panel hnb-container">
        <div className="auth-status-card">
          <h1>{title}</h1>
          <p>{message}</p>
          {user?.email ? (
            <p>
              Ingelogd als <strong>{user.email}</strong>.
            </p>
          ) : null}
          <div className="auth-form__actions">
            {user && status === ACCOUNT_STATUS.PENDING && intendedRole !== ROLES.COMPANY ? (
              <Link to="/auth/compliance" className="hnb-btn hnb-btn--freelancer">
                Documenten uploaden
              </Link>
            ) : null}
            {user ? (
              <button type="button" className="hnb-btn hnb-btn--outline" onClick={handleLogout}>
                Uitloggen
              </button>
            ) : (
              <Link to="/login" className="hnb-btn hnb-btn--freelancer">
                Naar inloggen
              </Link>
            )}
            <Link to="/contact" className="hnb-btn hnb-btn--outline">
              Contact opnemen
            </Link>
            {intendedRole !== ROLES.COMPANY ? (
              <Link to="/freelancers/direct-aanmelden" className="auth-form__links">
                Aanmeldformulier invullen
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  )
}
