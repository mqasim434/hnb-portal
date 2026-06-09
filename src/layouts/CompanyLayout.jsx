import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { signOutUser } from '../lib/auth/authService'
import './AppShellLayout.css'

const COMPANY_LINKS = [{ to: '/company/dashboard', label: 'Dashboard' }]

export default function CompanyLayout({ children }) {
  const navigate = useNavigate()
  const { user, profile } = useSelector((state) => state.auth)
  const companyLabel = profile?.companyName || user?.displayName || user?.email

  async function handleLogout() {
    await signOutUser()
    navigate('/login')
  }

  return (
    <div className="app-shell app-shell--company">
      <header className="app-shell__header">
        <div className="app-shell__brand">
          <span className="app-shell__eyebrow">Bedrijfsportaal</span>
          <strong>H&amp;B Service Group</strong>
        </div>
        <nav className="app-shell__nav" aria-label="Bedrijfsnavigatie">
          {COMPANY_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `app-shell__nav-link${isActive ? ' app-shell__nav-link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="app-shell__user">
          <span className="app-shell__email">{companyLabel}</span>
          <button
            type="button"
            className="hnb-btn hnb-btn--outline app-shell__logout"
            onClick={handleLogout}
          >
            Uitloggen
          </button>
        </div>
      </header>
      <div className="app-shell__body">{children}</div>
    </div>
  )
}
