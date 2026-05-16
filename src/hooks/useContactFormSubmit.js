import { useCallback, useRef, useState } from 'react'
import { triggerContactFormEmail } from '../lib/contactFormEmail'
import { createSubmissionInProgressError } from '../lib/submissionErrors'

/**
 * @typedef {'idle' | 'submitting' | 'success' | 'error'} ContactFormStatus
 */

export function useContactFormSubmit() {
  const lockRef = useRef(false)
  /** @type {[ContactFormStatus, (s: ContactFormStatus) => void]} */
  const [status, setStatus] = useState(/** @type {ContactFormStatus} */ ('idle'))
  const [errorMessage, setErrorMessage] = useState('')

  const reset = useCallback(() => {
    setStatus('idle')
    setErrorMessage('')
  }, [])

  /**
   * @param {{ name: string, email: string, subject: string, message: string }} formData
   */
  const submit = useCallback(async (formData) => {
    if (lockRef.current) {
      throw createSubmissionInProgressError()
    }
    lockRef.current = true
    setStatus('submitting')
    setErrorMessage('')
    try {
      await triggerContactFormEmail(formData)
      setStatus('success')
    } catch (e) {
      setStatus('error')
      const msg =
        e instanceof Error
          ? e.message
          : 'Er ging iets mis bij het versturen. Probeer het later opnieuw.'
      setErrorMessage(msg)
      throw e
    } finally {
      lockRef.current = false
    }
  }, [])

  return { status, errorMessage, submit, reset }
}
