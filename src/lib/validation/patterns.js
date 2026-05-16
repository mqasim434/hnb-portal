/**
 * E-mail (praktisch, RFC-achtig genoeg voor front-end).
 * Zelfde familie als eerder in Contact.jsx.
 */
export const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

/** Eenvoudigere variant (B2B-formulier); nog steeds strikt genoeg voor UI-validatie */
export const EMAIL_PATTERN_SIMPLE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
