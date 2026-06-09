import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AppShellHeader from '../components/AppShellHeader'
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
      <AppShellHeader
        eyebrow="Freelancerportaal"
        links={PORTAL_LINKS}
        userLabel={user?.email}
        onLogout={handleLogout}
        navLabel="Portaalnavigatie"
      />
      <div className="app-shell__body">{children}</div>
    </div>
  )
}
