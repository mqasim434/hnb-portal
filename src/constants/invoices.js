/** Invoice statuses (`invoices` collection). */

export const INVOICE_STATUS = Object.freeze({
  DRAFT: 'draft',
  APPROVED: 'approved',
  PAID: 'paid',
})

/** @param {string | null | undefined} status */
export function invoiceStatusLabel(status) {
  switch (status) {
    case INVOICE_STATUS.APPROVED:
      return 'Goedgekeurd'
    case INVOICE_STATUS.PAID:
      return 'Betaald'
    case INVOICE_STATUS.DRAFT:
    default:
      return 'Concept'
  }
}

/** Default hourly rate (EUR) when admin generates an invoice. */
export const DEFAULT_HOURLY_RATE = 18.5

/** @param {number} hours @param {number} hourlyRate */
export function computeLineAmount(hours, hourlyRate) {
  return Math.round(hours * hourlyRate * 100) / 100
}

/** @param {number} amount */
export function formatEuro(amount) {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(amount)
}
