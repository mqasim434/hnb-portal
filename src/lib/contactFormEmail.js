/**
 * Optionele server-trigger voor contactformulier (bevestiging naar aanvrager + intern).
 * Zet VITE_CONTACT_FORM_EMAIL_ENDPOINT (POST, JSON) in productie; zonder endpoint wordt in dev alleen gelogd.
 */

/**
 * @param {{ name: string, email: string, subject: string, message: string }} formData
 * @returns {Promise<{ ok: boolean, skipped?: boolean }>}
 */
export async function triggerContactFormEmail(formData) {
  const url = import.meta.env.VITE_CONTACT_FORM_EMAIL_ENDPOINT
  if (!url || typeof url !== 'string') {
    if (import.meta.env.DEV) {
      console.info('[H&B] Contact e-mail overgeslagen (geen VITE_CONTACT_FORM_EMAIL_ENDPOINT)', formData)
    }
    return { ok: true, skipped: true }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      event: 'contact_form',
      submittedAt: new Date().toISOString(),
      channel: 'contact_confirmation',
      ...formData,
    }),
  })

  if (!res.ok) {
    throw new Error(`Bevestiging versturen mislukt (${res.status})`)
  }
  return { ok: true }
}
