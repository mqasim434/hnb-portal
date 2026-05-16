/** Openbare site-naam (JSON-LD, OG). */
export const SITE_NAME = 'H&B Service Group'

export const SITE_LANGUAGE = 'nl-NL'

/**
 * Geconfigureerde productie-URL zonder trailing slash (sitemap, canonieke OG-URL).
 * Zonder VITE_SITE_URL: leeg in build-scripts; in de browser valt het terug op origin.
 */
export function getConfiguredSiteUrl() {
  const env = import.meta.env.VITE_SITE_URL
  if (typeof env === 'string' && env.trim()) {
    return env.replace(/\/$/, '')
  }
  return ''
}

/**
 * Voor canonieke links en OG in de browser: eerst VITE_SITE_URL, anders origin.
 * @returns {string}
 */
export function getCanonicalOrigin() {
  const configured = getConfiguredSiteUrl()
  if (configured) return configured
  if (typeof window !== 'undefined') return window.location.origin
  return ''
}

/**
 * @param {string} [path] — bv. "/contact"
 */
export function getCanonicalUrl(path = '/') {
  const origin = getCanonicalOrigin()
  const p = path === '/' || !path ? '/' : path.startsWith('/') ? path : `/${path}`
  return `${origin}${p}`
}

/**
 * Absolute OG/Twitter image.
 * @param {string} [ogImage] — absolute URL of pad begint met /
 */
export function resolveOgImageUrl(ogImage) {
  if (ogImage) {
    const s = String(ogImage).trim()
    if (s.startsWith('http://') || s.startsWith('https://')) return s
    const origin = getCanonicalOrigin()
    const path = s.startsWith('/') ? s : `/${s}`
    return `${origin}${path}`
  }
  const env = import.meta.env.VITE_OG_IMAGE_URL
  if (typeof env === 'string' && env.trim()) return env.trim()
  const origin = getCanonicalOrigin()
  return `${origin}/favicon.svg`
}

/**
 * @returns {string | undefined}
 */
export function getTwitterSiteHandle() {
  const h = import.meta.env.VITE_TWITTER_SITE
  if (typeof h !== 'string' || !h.trim()) return undefined
  const t = h.trim()
  return t.startsWith('@') ? t : `@${t}`
}
