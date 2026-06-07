/** Company contact & registration — override via `.env` for live content. */

const env = import.meta.env

export const COMPANY = Object.freeze({
  name: 'H&B Service Group',
  email: env.VITE_COMPANY_EMAIL || 'bookings@hbservicegroup.com',
  phone: (env.VITE_COMPANY_PHONE || '').trim(),
  location: env.VITE_COMPANY_LOCATION || 'Amsterdam, Nederland',
  kvk: (env.VITE_COMPANY_KVK || '').trim(),
  btw: (env.VITE_COMPANY_BTW || '').trim(),
  wpbr: (env.VITE_COMPANY_WPBR || '').trim(),
})

/** @returns {string} */
export function companyPhoneDisplay() {
  return COMPANY.phone || 'Op aanvraag via e-mail'
}

/** @returns {string | null} */
export function companyPhoneHref() {
  if (!COMPANY.phone) return null
  return `tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`
}

/** @returns {string} */
export function companyRegistrationLine() {
  const parts = []
  if (COMPANY.kvk) parts.push(`KvK ${COMPANY.kvk}`)
  if (COMPANY.btw) parts.push(`BTW ${COMPANY.btw}`)
  if (COMPANY.wpbr) parts.push(`WPBR ${COMPANY.wpbr}`)
  if (parts.length === 0) {
    return 'Handelsgegevens op aanvraag · WPBR-conform'
  }
  return parts.join(' · ')
}
