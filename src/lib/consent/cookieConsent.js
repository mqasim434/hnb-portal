const STORAGE_KEY = 'hnb-cookie-consent-v1'

/** @typedef {{ necessary: true, analytics: boolean, updatedAt?: string }} CookieConsent */

/** @returns {CookieConsent | null} */
export function readCookieConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed.analytics !== 'boolean') return null
    return { necessary: true, analytics: parsed.analytics, updatedAt: parsed.updatedAt }
  } catch {
    return null
  }
}

/** @param {boolean} analytics */
export function saveCookieConsent(analytics) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      necessary: true,
      analytics,
      updatedAt: new Date().toISOString(),
    }),
  )
}

/** @returns {boolean} */
export function hasCookieConsentChoice() {
  return readCookieConsent() != null
}

/** @returns {boolean} */
export function analyticsConsentGranted() {
  return readCookieConsent()?.analytics === true
}
