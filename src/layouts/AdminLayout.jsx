import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AppShellHeader from '../components/AppShellHeader'
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
    navigate('/admin/login')
  }

  return (
    <div className="app-shell app-shell--admin">
      <AppShellHeader
        eyebrow="Beheer"
        links={ADMIN_LINKS}
        userLabel={user?.email}
        onLogout={handleLogout}
        navLabel="Beheernavigatie"
      />
      <div className="app-shell__body">{children}</div>
    </div>
  )
}
