/** Onboarding application review status (Firestore `onboardingApplications.status`). */

export const ONBOARDING_STATUS = Object.freeze({
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
})

export const ONBOARDING_SOURCE = Object.freeze({
  DIRECT_AANMELDEN: 'direct_aanmelden',
})

/** @param {string | null | undefined} status */
export function onboardingStatusLabel(status) {
  switch (status) {
    case ONBOARDING_STATUS.APPROVED:
      return 'Goedgekeurd'
    case ONBOARDING_STATUS.REJECTED:
      return 'Afgewezen'
    case ONBOARDING_STATUS.PENDING:
    default:
      return 'In behandeling'
  }
}
