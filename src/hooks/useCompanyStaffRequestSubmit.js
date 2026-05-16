import { useCallback, useRef, useState } from 'react'
import {
  buildCompanyApplicantPayload,
  buildCompanyInternalPayload,
  triggerCompanyStaffRequestEmails,
} from '../lib/companyStaffRequestEmail'
import { createSubmissionInProgressError } from '../lib/submissionErrors'

/** @typedef {'idle' | 'submitting' | 'success' | 'error'} CompanyRequestStatus */

export function useCompanyStaffRequestSubmit() {
  const lockRef = useRef(false)
  /** @type {[CompanyRequestStatus, (s: CompanyRequestStatus) => void]} */
  const [status, setStatus] = useState(/** @type {CompanyRequestStatus} */ ('idle'))
  const [errorMessage, setErrorMessage] = useState('')

  const reset = useCallback(() => {
    setStatus('idle')
    setErrorMessage('')
  }, [])

  /** @param {Record<string, unknown>} formData */
  const submit = useCallback(async (formData) => {
    if (lockRef.current) {
      throw createSubmissionInProgressError()
    }
    lockRef.current = true
    setStatus('submitting')
    setErrorMessage('')
    try {
      await triggerCompanyStaffRequestEmails({
        applicant: buildCompanyApplicantPayload(formData),
        internal: buildCompanyInternalPayload(formData),
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
