import { analyticsConsentGranted } from '../consent/cookieConsent'

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()

let initialized = false

/** @returns {boolean} */
export function isGoogleAnalyticsConfigured() {
  return Boolean(measurementId)
}

/** Load gtag.js only after explicit analytics consent. */
export function initGoogleAnalytics() {
  if (!measurementId || initialized || typeof window === 'undefined') return
  if (!analyticsConsentGranted()) return

  initialized = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', measurementId, { anonymize_ip: true })
}

/** Call on app boot when consent was saved earlier. */
export function bootstrapGoogleAnalytics() {
  initGoogleAnalytics()
}

/** @param {boolean} granted */
export function applyAnalyticsConsent(granted) {
  if (granted) {
    initGoogleAnalytics()
  }
}
