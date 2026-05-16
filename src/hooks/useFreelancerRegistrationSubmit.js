import { useCallback, useRef, useState } from 'react'
import {
  buildApplicantEmailPayload,
  buildInternalNotifyPayload,
  triggerFreelancerRegistrationEmails,
} from '../lib/freelancerRegistrationEmail'
import { createSubmissionInProgressError } from '../lib/submissionErrors'
/**
 * @typedef {'idle' | 'submitting' | 'success' | 'error'} RegistrationStatus
 */

export function useFreelancerRegistrationSubmit() {
  const lockRef = useRef(false)
  /** @type {[RegistrationStatus, (s: RegistrationStatus) => void]} */
  const [status, setStatus] = useState(/** @type {RegistrationStatus} */ ('idle'))
  const [errorMessage, setErrorMessage] = useState('')

  const reset = useCallback(() => {
    setStatus('idle')
    setErrorMessage('')
  }, [])

  /**
   * @param {Record<string, unknown>} formData
   */
  const submit = useCallback(async (formData) => {
    if (lockRef.current) {
      throw createSubmissionInProgressError()
    }
    lockRef.current = true
    setStatus('submitting')
    setErrorMessage('')
    try {
      await triggerFreelancerRegistrationEmails({
        applicant: buildApplicantEmailPayload(formData),
        internal: buildInternalNotifyPayload(formData),
      })
      setStatus('success')
    } catch (e) {
      setStatus('error')
      const msg =
        e instanceof Error ? e.message : 'Er ging iets mis bij het versturen. Probeer het later opnieuw.'
      setErrorMessage(msg)
      throw e
    } finally {
      lockRef.current = false
    }
  }, [])
  return { status, errorMessage, submit, reset }
}
