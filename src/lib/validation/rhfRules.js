import { validationMessages as m } from './messages'
import { EMAIL_PATTERN, EMAIL_PATTERN_SIMPLE } from './patterns'
import {
  validateDutchDateOrPeriod,
  validateDutchPhone,
  validateGdprConsent,
  validateISODateInput,
} from './validators'

/**
 * Gedeelde react-hook-form regels (RegisterOptions).
 */
export const rhfRules = {
  emailRequired: {
    required: m.emailRequired,
    pattern: {
      value: EMAIL_PATTERN,
      message: m.emailInvalid,
    },
  },

  emailRequiredFreelancer: {
    required: 'Vul uw e-mailadres in.',
    pattern: {
      value: EMAIL_PATTERN,
      message: m.emailInvalid,
    },
  },

  emailRequiredSimple: {
    required: m.emailRequired,
    pattern: {
      value: EMAIL_PATTERN_SIMPLE,
      message: m.emailInvalid,
    },
  },

  phoneNLRequired: {
    validate: (v) => validateDutchPhone(v),
  },

  gdprConsent: {
    validate: (v) => validateGdprConsent(v),
  },

  eventDatesNL: {
    required: 'Vul een datum of periode in.',
    minLength: { value: 3, message: 'Geef een concretere datum of periode.' },
    maxLength: { value: 200, message: 'Maximaal 200 tekens.' },
    validate: (v) => validateDutchDateOrPeriod(v),
  },

  isoDate: {
    validate: (v) => validateISODateInput(v),
  },
}
