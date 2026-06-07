/** Rollen en accountstatus — aligned with Development Plan + ProtectedRoute. */

export const ROLES = Object.freeze({
  ADMIN: 'admin',
  FREELANCER: 'freelancer',
  COMPANY: 'company',
})

export const ACCOUNT_STATUS = Object.freeze({
  PENDING: 'pending',
  ACTIVE: 'active',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
})

/** @param {string | null | undefined} role */
export function getRoleHomePath(role) {
  switch (role) {
    case ROLES.ADMIN:
      return '/admin/dashboard'
    case ROLES.FREELANCER:
      return '/portal/dashboard'
    case ROLES.COMPANY:
      return '/portal/dashboard'
    default:
      return '/auth/pending'
  }
}

/** @param {string | null | undefined} status */
export function canAccessPortal(status) {
  return status === ACCOUNT_STATUS.ACTIVE
}
