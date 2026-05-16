import { isValidDutchPhoneNumber } from '../../utils/dutchPhone'
import { validationMessages as m } from './messages'

export { isValidDutchPhoneNumber }

/**
 * Vrije-tekst datum/periode (NL copy) — minimaal herkenbaar voor planners.
 * @param {unknown} raw
 * @returns {true | string}
 */
export function validateDutchDateOrPeriod(raw) {
  const s = String(raw ?? '').trim()
  if (s.length < 4) return m.datePeriodVague
  const hasDigit = /\d/.test(s)
  if (!hasDigit) return m.datePeriodNoDigit
  const hasMonth =
    /jan|feb|mrt|mar|apr|mei|jun|jul|aug|sep|oct|okt|nov|dec/i.test(s) ||
    /januari|februari|maart|april|juni|juli|augustus|oktober|september|november|december/i.test(
      s,
    )
  const hasYear = /\d{4}/.test(s)
  if (!hasYear && !hasMonth && s.length < 6) return m.datePeriodWeak
  return true
}

/**
 * HTML date input / ISO-achtige string (yyyy-mm-dd).
 * @param {unknown} raw
 * @returns {true | string}
 */
export function validateISODateInput(raw) {
  if (raw === undefined || raw === null || String(raw).trim() === '') {
    return m.isoDateRequired
  }
  const s = String(raw).trim()
  const d = Date.parse(s)
  if (Number.isNaN(d)) return m.isoDateInvalid
  return true
}

/**
 * @param {unknown} v
 * @returns {true | string}
 */
export function validateGdprConsent(v) {
  return v === true ? true : m.gdprRequired
}

/**
 * @param {unknown} raw
 * @param {(s: string) => boolean} phoneCheck default NL
 * @returns {true | string}
 */
export function validateDutchPhone(raw, phoneCheck = isValidDutchPhoneNumber) {
  if (raw === undefined || raw === null || String(raw).trim() === '') {
    return m.phoneRequired
  }
  return phoneCheck(String(raw)) ? true : m.phoneInvalidNL
}
