/** Opdrachten / assignments (`assignments` collection). */

export const ASSIGNMENT_STATUS = Object.freeze({
  DRAFT: 'draft',
  OPEN: 'open',
  ASSIGNED: 'assigned',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
})

export const ASSIGNMENT_TYPES = Object.freeze({
  HOSPITALITY: 'hospitality',
  BEVEILIGING: 'beveiliging',
  GEMENGD: 'gemengd',
  ALGEMEEN: 'algemeen',
})

/** @param {string | null | undefined} status */
export function assignmentStatusLabel(status) {
  switch (status) {
    case ASSIGNMENT_STATUS.DRAFT:
      return 'Concept'
    case ASSIGNMENT_STATUS.OPEN:
      return 'Open'
    case ASSIGNMENT_STATUS.ASSIGNED:
      return 'Toegewezen'
    case ASSIGNMENT_STATUS.COMPLETED:
      return 'Afgerond'
    case ASSIGNMENT_STATUS.CANCELLED:
      return 'Geannuleerd'
    default:
      return status || '—'
  }
}

/** @param {string | null | undefined} type */
export function assignmentTypeLabel(type) {
  switch (type) {
    case ASSIGNMENT_TYPES.HOSPITALITY:
      return 'Hospitality'
    case ASSIGNMENT_TYPES.BEVEILIGING:
      return 'Beveiliging'
    case ASSIGNMENT_TYPES.GEMENGD:
      return 'Gemengd'
    case ASSIGNMENT_TYPES.ALGEMEEN:
      return 'Algemeen'
    default:
      return type || '—'
  }
}

export const ASSIGNMENT_TYPE_OPTIONS = [
  { value: ASSIGNMENT_TYPES.HOSPITALITY, label: 'Hospitality' },
  { value: ASSIGNMENT_TYPES.BEVEILIGING, label: 'Beveiliging' },
  { value: ASSIGNMENT_TYPES.GEMENGD, label: 'Gemengd team' },
  { value: ASSIGNMENT_TYPES.ALGEMEEN, label: 'Algemeen eventpersoneel' },
]

export const ASSIGNMENT_STATUS_OPTIONS = [
  { value: ASSIGNMENT_STATUS.DRAFT, label: 'Concept' },
  { value: ASSIGNMENT_STATUS.OPEN, label: 'Open' },
  { value: ASSIGNMENT_STATUS.ASSIGNED, label: 'Toegewezen' },
  { value: ASSIGNMENT_STATUS.COMPLETED, label: 'Afgerond' },
  { value: ASSIGNMENT_STATUS.CANCELLED, label: 'Geannuleerd' },
]

/** Status options companies may set when posting. */
export const COMPANY_ASSIGNMENT_STATUS_OPTIONS = [
  { value: ASSIGNMENT_STATUS.DRAFT, label: 'Concept (nog niet zichtbaar)' },
  { value: ASSIGNMENT_STATUS.OPEN, label: 'Open (zichtbaar voor freelancers)' },
  { value: ASSIGNMENT_STATUS.COMPLETED, label: 'Afgerond' },
  { value: ASSIGNMENT_STATUS.CANCELLED, label: 'Geannuleerd' },
]
