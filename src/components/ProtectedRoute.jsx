import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

/**
 * Requires a signed-in Firebase user (mirrored in Redux) and a matching `role` claim.
 */
export default function ProtectedRoute({ allowedRole }) {
  const { user, role, loading } = useSelector((state) => state.auth)
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
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    )
  }

  if (role !== allowedRole) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
