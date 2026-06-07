import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PageHero from '../../components/marketing/PageHero'
import { ACCOUNT_STATUS } from '../../constants/roles'
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
  const { user, accountStatus } = useSelector((state) => state.auth)
  const blocked = location.state?.blocked

  const status = blocked ?? accountStatus ?? ACCOUNT_STATUS.PENDING

  let title = 'Account in behandeling'
  let message =
    'Bedankt voor uw aanmelding. H&B beoordeelt uw profiel. Zodra uw account is goedgekeurd, krijgt u toegang tot het freelancerportaal.'

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
            {user && status === ACCOUNT_STATUS.PENDING ? (
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
            <Link to="/freelancers/direct-aanmelden" className="auth-form__links">
              Aanmeldformulier invullen
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
