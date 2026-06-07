/** Time entry statuses (`timeEntries` collection). */

export const TIME_ENTRY_STATUS = Object.freeze({
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  REJECTED: 'rejected',
})

/** @param {string | null | undefined} status */
export function timeEntryStatusLabel(status) {
  switch (status) {
    case TIME_ENTRY_STATUS.SUBMITTED:
      return 'Ingediend'
    case TIME_ENTRY_STATUS.APPROVED:
      return 'Goedgekeurd'
    case TIME_ENTRY_STATUS.REJECTED:
      return 'Afgewezen'
    case TIME_ENTRY_STATUS.DRAFT:
    default:
      return 'Concept'
  }
}

/** @param {string | null | undefined} status */
export function canFreelancerEditTimeEntry(status) {
  return status === TIME_ENTRY_STATUS.DRAFT || status === TIME_ENTRY_STATUS.REJECTED
}

/**
 * @param {string} startTime HH:mm
 * @param {string} endTime HH:mm
 * @param {number} breakMinutes
 */
export function computeTotalHours(startTime, endTime, breakMinutes = 0) {
  const [sh, sm] = startTime.split(':').map(Number)
  const [eh, em] = endTime.split(':').map(Number)
  if ([sh, sm, eh, em].some((n) => Number.isNaN(n))) return null

  const startMinutes = sh * 60 + sm
  const endMinutes = eh * 60 + em
  if (endMinutes <= startMinutes) return null

  const breakM = Math.max(0, Number(breakMinutes) || 0)
  const worked = endMinutes - startMinutes - breakM
  if (worked <= 0) return null

  return Math.round((worked / 60) * 100) / 100
}
