import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { signOutUser } from '../lib/auth/authService'
import './AppShellLayout.css'

const PORTAL_LINKS = [
  { to: '/portal/dashboard', label: 'Dashboard' },
  { to: '/portal/feed', label: 'Open opdrachten' },
  { to: '/portal/compliance', label: 'Compliance' },
  { to: '/portal/jobs', label: 'Mijn opdrachten' },
  { to: '/portal/hours', label: 'Uren' },
  { to: '/portal/invoices', label: 'Facturen' },
]

export default function PortalLayout({ children }) {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  async function handleLogout() {
    await signOutUser()
    navigate('/login')
  }

  return (
    <div className="app-shell app-shell--portal">
      <header className="app-shell__header">
        <div className="app-shell__brand">
          <span className="app-shell__eyebrow">Freelancerportaal</span>
          <strong>H&amp;B Service Group</strong>
        </div>
        <nav className="app-shell__nav" aria-label="Portaalnavigatie">
          {PORTAL_LINKS.map(({ to, label }) => (
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
