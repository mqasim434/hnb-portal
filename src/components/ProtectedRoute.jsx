import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ACCOUNT_STATUS, getRoleHomePath } from '../constants/roles'
import AdminLayout from '../layouts/AdminLayout'
import PortalLayout from '../layouts/PortalLayout'
import PageRouteSkeleton from './performance/PageRouteSkeleton'

/**
 * @param {{ allowedRole: 'admin' | 'freelancer', layout?: 'portal' | 'admin' }} props
 */
export default function ProtectedRoute({ allowedRole, layout }) {
  const { user, role, accountStatus, loading } = useSelector((state) => state.auth)
  const location = useLocation()

  if (loading || (user && accountStatus == null)) {
    return (
      <div
        className="hnb-container"
        style={{ padding: '4rem 0', textAlign: 'center' }}
        aria-live="polite"
      >
        <p className="hnb-type-subhead">Sessie laden…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (
    accountStatus === ACCOUNT_STATUS.PENDING ||
    accountStatus === ACCOUNT_STATUS.REJECTED ||
    accountStatus === ACCOUNT_STATUS.SUSPENDED
  ) {
    return (
      <Navigate to="/auth/pending" replace state={{ blocked: accountStatus }} />
    )
  }

  if (accountStatus !== ACCOUNT_STATUS.ACTIVE) {
    return <Navigate to="/auth/pending" replace />
  }

  if (role !== allowedRole) {
    if (role) {
      return <Navigate to={getRoleHomePath(role)} replace />
    }
    return <Navigate to="/" replace />
  }

  const content = (
    <Suspense fallback={<PageRouteSkeleton />}>
      <Outlet />
    </Suspense>
  )

  if (layout === 'portal') return <PortalLayout>{content}</PortalLayout>
  if (layout === 'admin') return <AdminLayout>{content}</AdminLayout>
  return content
}
