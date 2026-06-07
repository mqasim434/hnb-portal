import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { signOutUser } from '../lib/auth/authService'
import './AppShellLayout.css'

const ADMIN_LINKS = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/staff-requests', label: 'Aanvragen' },
  { to: '/admin/users', label: 'Gebruikers' },
  { to: '/admin/onboarding', label: 'Onboarding' },
  { to: '/admin/assignments', label: 'Opdrachten' },
  { to: '/admin/hours', label: 'Uren' },
  { to: '/admin/invoices', label: 'Facturen' },
  { to: '/admin/compliance', label: 'Compliance' },
]

export default function AdminLayout({ children }) {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  async function handleLogout() {
    await signOutUser()
    navigate('/login')
  }

  return (
    <div className="app-shell app-shell--admin">
      <header className="app-shell__header">
        <div className="app-shell__brand">
          <span className="app-shell__eyebrow">Beheer</span>
          <strong>H&amp;B Service Group</strong>
        </div>
        <nav className="app-shell__nav" aria-label="Beheernavigatie">
          {ADMIN_LINKS.map(({ to, label }) => (
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
          <span className="app-shell__email">{user?.email}</span>
          <button type="button" className="hnb-btn hnb-btn--outline app-shell__logout" onClick={handleLogout}>
            Uitloggen
          </button>
        </div>
      </header>
      <div className="app-shell__body">{children}</div>
    </div>
  )
}
