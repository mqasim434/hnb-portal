/** B2B personeelsaanvragen (`staffRequests` collection). */

export const STAFF_REQUEST_STATUS = Object.freeze({
  NEW: 'new',
  IN_PROGRESS: 'in_progress',
  CLOSED: 'closed',
})

/** @param {string | null | undefined} status */
export function staffRequestStatusLabel(status) {
  switch (status) {
    case STAFF_REQUEST_STATUS.IN_PROGRESS:
      return 'In behandeling'
    case STAFF_REQUEST_STATUS.CLOSED:
      return 'Afgerond'
    case STAFF_REQUEST_STATUS.NEW:
    default:
      return 'Nieuw'
  }
}

/** @param {string | null | undefined} staffType */
export function staffTypeLabel(staffType) {
  switch (staffType) {
    case 'hospitality':
      return 'Hospitality'
    case 'beveiliging':
      return 'Beveiliging'
    case 'gemengd':
      return 'Gemengd team'
    case 'advies':
      return 'Adviesgesprek'
    default:
      return staffType || '—'
  }
}

/** @param {string | null | undefined} eventType */
export function eventTypeLabel(eventType) {
  switch (eventType) {
    case 'festival':
      return 'Festival'
    case 'corporate':
      return 'Corporate event'
    case 'club':
      return 'Clubavond'
    case 'theater':
      return 'Theater of arena'
    case 'particulier':
      return 'Particulier event'
    case 'overig':
      return 'Overig'
    default:
      return eventType || '—'
  }
}
