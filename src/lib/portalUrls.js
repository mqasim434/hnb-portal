/**
 * Zoho Creator portal-URL’s — zie `.env.example`.
 * @returns {string | null}
 */
export function getZohoFreelancerPortalUrl() {
  const u = import.meta.env.VITE_ZOHO_FREELANCER_PORTAL_URL
  return typeof u === 'string' && u.trim().length > 0 ? u.trim() : null
}

/**
 * @returns {string | null}
 */
export function getZohoCompanyPortalUrl() {
  const u = import.meta.env.VITE_ZOHO_COMPANY_PORTAL_URL
  return typeof u === 'string' && u.trim().length > 0 ? u.trim() : null
}
