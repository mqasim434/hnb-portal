/** Compliance document types stored under users/{uid}/compliance/{type}. */

export const COMPLIANCE_STATUS = Object.freeze({
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
})

export const COMPLIANCE_TYPES = Object.freeze({
  VOG: 'vog',
  DIPLOMA: 'diploma_beveiliger',
  GRIJZE_PAS: 'grijze_pas',
  IDENTITEIT: 'identiteitsbewijs',
  BHV: 'bhv',
  SVH: 'svh',
  HACCP: 'haccp',
})

/** @type {Record<string, { label: string, hint: string, requiresNumber: boolean, requiresExpiry: boolean, numberLabel?: string }>} */
export const COMPLIANCE_TYPE_CONFIG = {
  [COMPLIANCE_TYPES.VOG]: {
    label: 'VOG (Verklaring Omtrent Gedrag)',
    hint: 'Upload een geldige VOG (PDF of scan).',
    requiresNumber: false,
    requiresExpiry: true,
  },
  [COMPLIANCE_TYPES.DIPLOMA]: {
    label: 'Diploma Beveiliger 2+',
    hint: 'Upload uw diploma of registratiebewijs.',
    requiresNumber: true,
    requiresExpiry: true,
    numberLabel: 'Diploma- / registratienummer',
  },
  [COMPLIANCE_TYPES.GRIJZE_PAS]: {
    label: 'Grijze pas (WPBR-legitimatie)',
    hint: 'Upload een scan van uw geldige grijze pas.',
    requiresNumber: true,
    requiresExpiry: true,
    numberLabel: 'Pasnummer',
  },
  [COMPLIANCE_TYPES.IDENTITEIT]: {
    label: 'Identiteitsbewijs',
    hint: 'Upload een scan van paspoort of ID-kaart (alleen voor interne controle).',
    requiresNumber: false,
    requiresExpiry: true,
  },
  [COMPLIANCE_TYPES.BHV]: {
    label: 'BHV-certificaat',
    hint: 'Upload uw BHV-certificaat indien van toepassing.',
    requiresNumber: false,
    requiresExpiry: true,
  },
  [COMPLIANCE_TYPES.SVH]: {
    label: 'SVH Sociale Hygiëne',
    hint: 'Upload uw SVH-certificaat (hospitality).',
    requiresNumber: false,
    requiresExpiry: true,
  },
  [COMPLIANCE_TYPES.HACCP]: {
    label: 'HACCP-basis',
    hint: 'Upload uw HACCP-bewijs (hospitality).',
    requiresNumber: false,
    requiresExpiry: true,
  },
}

/** @type {string[]} */
export const CORE_COMPLIANCE_TYPES = [
  COMPLIANCE_TYPES.VOG,
  COMPLIANCE_TYPES.DIPLOMA,
  COMPLIANCE_TYPES.GRIJZE_PAS,
  COMPLIANCE_TYPES.IDENTITEIT,
]

/** @param {string | null | undefined} status */
export function complianceStatusLabel(status) {
  switch (status) {
    case COMPLIANCE_STATUS.APPROVED:
      return 'Goedgekeurd'
    case COMPLIANCE_STATUS.REJECTED:
      return 'Afgewezen'
    case COMPLIANCE_STATUS.EXPIRED:
      return 'Verlopen'
    case COMPLIANCE_STATUS.PENDING:
    default:
      return 'In behandeling'
  }
}

/**
 * @param {{ status?: string, expiryDate?: string | null }} record
 */
export function isComplianceExpired(record) {
  if (!record?.expiryDate) return record?.status === COMPLIANCE_STATUS.EXPIRED
  if (record.status === COMPLIANCE_STATUS.EXPIRED) return true
  if (record.status !== COMPLIANCE_STATUS.APPROVED) return false
  const expiry = new Date(record.expiryDate)
  if (Number.isNaN(expiry.getTime())) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  expiry.setHours(0, 0, 0, 0)
  return expiry < today
}

/** @param {{ status?: string, expiryDate?: string | null }} record */
export function complianceDisplayStatus(record) {
  if (isComplianceExpired(record)) return COMPLIANCE_STATUS.EXPIRED
  return record?.status ?? COMPLIANCE_STATUS.PENDING
}
