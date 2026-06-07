import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ACCOUNT_STATUS, ROLES } from '../constants/roles'
import PageRouteSkeleton from './performance/PageRouteSkeleton'

/**
 * Allows logged-in freelancers (pending or active) to upload compliance documents
 * without full portal access.
 */
export default function FreelancerComplianceRoute() {
  const { user, role, accountStatus, loading } = useSelector((state) => state.auth)
  const location = useLocation()

  if (loading) {
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

  if (role === ROLES.ADMIN) {
    return <Navigate to="/admin/compliance" replace />
  }

  if (
    accountStatus === ACCOUNT_STATUS.REJECTED ||
    accountStatus === ACCOUNT_STATUS.SUSPENDED
  ) {
    return <Navigate to="/auth/pending" replace state={{ blocked: accountStatus }} />
  }

  const canUpload =
    accountStatus === ACCOUNT_STATUS.PENDING ||
    (accountStatus === ACCOUNT_STATUS.ACTIVE && role === ROLES.FREELANCER)

  if (!canUpload) {
    return <Navigate to="/auth/pending" replace />
  }

  return (
    <Suspense fallback={<PageRouteSkeleton />}>
      <Outlet />
    </Suspense>
  )
}
