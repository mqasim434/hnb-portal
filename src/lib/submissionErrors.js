/** @typedef {{ code?: string }} SubmissionErrorLike */

export const SUBMISSION_IN_PROGRESS_CODE = 'HNB_SUBMISSION_IN_PROGRESS'

export function createSubmissionInProgressError() {
  const err = new Error('Verzending is al bezig.')
  /** @type {SubmissionErrorLike} */
  const e = err
  e.code = SUBMISSION_IN_PROGRESS_CODE
  return err
}

/**
 * @param {unknown} e
 */
export function isSubmissionInProgressError(e) {
  return (
    e instanceof Error &&
    /** @type {SubmissionErrorLike} */ (e).code === SUBMISSION_IN_PROGRESS_CODE
  )
}
