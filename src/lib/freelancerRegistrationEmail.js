/**
 * Server-side e-mailtriggers na freelancer-aanmelding.
 * Zet VITE_REGISTRATION_EMAIL_ENDPOINT (POST, JSON) in productie; zonder endpoint wordt in dev alleen gelogd.
 *
 * Payload kan door uw backend worden omgezet naar bv. bevestiging aan sollicitant + interne notificatie.
 */

/**
 * @param {Record<string, unknown>} payload
 * @returns {Promise<{ ok: boolean, skipped?: boolean }>}
 */
export async function triggerFreelancerRegistrationEmails(payload) {
  const url = import.meta.env.VITE_REGISTRATION_EMAIL_ENDPOINT
  if (!url || typeof url !== 'string') {
    if (import.meta.env.DEV) {
      console.info('[H&B] E-mailtriggers overgeslagen (geen VITE_REGISTRATION_EMAIL_ENDPOINT)', payload)
    }
    return { ok: true, skipped: true }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      event: 'freelancer_aanmelding',
      submittedAt: new Date().toISOString(),
      ...payload,
    }),
  })

  if (!res.ok) {
    throw new Error(`E-mailtrigger mislukt (${res.status})`)
  }
  return { ok: true }
}

/** Alias voor expliciete “bevestiging naar sollicitant”-hook in integraties. */
export function buildApplicantEmailPayload(formData) {
  return { channel: 'applicant_confirmation', ...formData }
}

/** Alias voor interne notificatie-hook. */
export function buildInternalNotifyPayload(formData) {
  return { channel: 'internal_new_applicant', ...formData }
}
