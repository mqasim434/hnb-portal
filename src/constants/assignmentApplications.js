/** Sollicitaties op opdrachten (`assignmentApplications` collection). */

export const APPLICATION_STATUS = Object.freeze({
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn',
})

/** @param {string | null | undefined} status */
export function applicationStatusLabel(status) {
  switch (status) {
    case APPLICATION_STATUS.PENDING:
      return 'In behandeling'
    case APPLICATION_STATUS.ACCEPTED:
      return 'Geaccepteerd'
    case APPLICATION_STATUS.REJECTED:
      return 'Afgewezen'
    case APPLICATION_STATUS.WITHDRAWN:
      return 'Ingetrokken'
    default:
      return status || '—'
  }
}
