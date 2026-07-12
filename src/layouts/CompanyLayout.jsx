import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AppShellHeader from '../components/AppShellHeader'
import { signOutUser } from '../lib/auth/authService'
import { clearAuth } from '../store/slices/authSlice'
import './AppShellLayout.css'

const COMPANY_LINKS = [
  { to: '/company/dashboard', label: 'Dashboard' },
  { to: '/company/assignments', label: 'Opdrachten' },
]

export default function CompanyLayout({ children }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, profile } = useSelector((state) => state.auth)
  const companyLabel = profile?.companyName || user?.displayName || user?.email

  async function handleLogout() {
    try {
      await signOutUser()
    } finally {
      dispatch(clearAuth())
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="app-shell app-shell--company">
      <AppShellHeader
        eyebrow="Bedrijfsportaal"
        links={COMPANY_LINKS}
        userLabel={companyLabel}
        onLogout={handleLogout}
        navLabel="Bedrijfsnavigatie"
      />
      <div className="app-shell__body">{children}</div>
    </div>
  )
}
