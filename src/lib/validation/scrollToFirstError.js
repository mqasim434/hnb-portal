/**
 * @param {string[]} fieldOrder
 * @param {import('react-hook-form').FieldErrors<any>} submitErrors
 * @param {object} opts
 * @param {(name: string) => void} opts.setFocus — react-hook-form setFocus
 * @param {(fieldName: string) => string} opts.resolveElementId — veld-ID in DOM
 */
export function scrollToFirstError(fieldOrder, submitErrors, { setFocus, resolveElementId }) {
  const first = fieldOrder.find((name) => submitErrors[name])
  if (!first || typeof setFocus !== 'function') return
  setFocus(first, { shouldSelect: true })
  requestAnimationFrame(() => {
    const id = resolveElementId(first)
    const el = id ? document.getElementById(id) : null
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}

/**
 * Factory voor react-hook-form handleSubmit(onValid, onInvalid).
 * @param {string[]} fieldOrder
 * @param {(name: string) => void} setFocus
 * @param {(fieldName: string) => string} resolveElementId
 * @returns {(errors: import('react-hook-form').FieldErrors<any>) => void}
 */
export function createSubmitErrorHandler(fieldOrder, setFocus, resolveElementId) {
  return (submitErrors) => {
    scrollToFirstError(fieldOrder, submitErrors, { setFocus, resolveElementId })
  }
}
