/**
 * Normaliseert en valideert Nederlandse telefoonnummers (mobiel en vast, gangbare notatie).
 * Accepteert o.a. 06-12345678, 0612345678, +31 6 12345678, +31612345678, 0031612345678.
 * @param {string} raw
 */
export function normalizeDutchPhoneInput(raw) {
  if (!raw || typeof raw !== 'string') return ''
  let s = raw.trim().replace(/[\s().-]/g, '')
  if (s.startsWith('0031')) {
    s = `+31${s.slice(4)}`
  }
  return s
}

/**
 * @param {string} raw
 * @returns {boolean}
 */
export function isValidDutchPhoneNumber(raw) {
  const s = normalizeDutchPhoneInput(raw)
  if (!s) return false

  if (s.startsWith('+31')) {
    const rest = s.slice(3)
    return /^[1-9][0-9]{8}$/.test(rest)
  }

  if (s.startsWith('0')) {
    return /^0[1-9][0-9]{8}$/.test(s)
  }

  return false
}
