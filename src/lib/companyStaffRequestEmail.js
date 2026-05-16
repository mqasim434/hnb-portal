/**
 * E-mailtrigger na B2B-personeelsaanvraag.
 * Zet VITE_COMPANY_REQUEST_EMAIL_ENDPOINT (POST, JSON) voor productie.
 * @param {Record<string, unknown>} payload
 */
export async function triggerCompanyStaffRequestEmails(payload) {
  const url = import.meta.env.VITE_COMPANY_REQUEST_EMAIL_ENDPOINT
  if (!url || typeof url !== 'string') {
    if (import.meta.env.DEV) {
      console.info('[H&B] B2B-aanvraag-e-mail overgeslagen (geen VITE_COMPANY_REQUEST_EMAIL_ENDPOINT)', payload)
    }
    return { ok: true, skipped: true }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      event: 'bedrijf_personeelsaanvraag',
      submittedAt: new Date().toISOString(),
      ...payload,
    }),
  })

  if (!res.ok) {
    throw new Error(`Aanvraag-e-mail mislukt (${res.status})`)
  }
  return { ok: true }
}

export function buildCompanyApplicantPayload(data) {
  return { channel: 'company_confirmation', ...data }
}

export function buildCompanyInternalPayload(data) {
  return { channel: 'internal_new_company_request', ...data }
}
