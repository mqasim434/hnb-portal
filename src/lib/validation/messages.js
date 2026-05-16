/**
 * Gedeelde Nederlandse validatiemeldingen (formulieren).
 * @type {Readonly<Record<string, string>>}
 */
export const validationMessages = Object.freeze({
  emailRequired: 'Vul een e-mailadres in.',
  emailInvalid: 'Voer een geldig e-mailadres in.',
  phoneRequired: 'Vul een telefoonnummer in.',
  phoneInvalidNL:
    'Voer een geldig Nederlands nummer in (bijv. 0612345678 of +31612345678).',
  gdprRequired:
    'U dient akkoord te gaan met de verwerking van uw gegevens (privacyverklaring).',
  datePeriodVague: 'Vul een duidelijkere datum of periode in.',
  datePeriodWeak:
    'Vermeld bij voorkeur ook een jaar of maand (bijv. juni 2026).',
  datePeriodNoDigit: 'Voeg minstens één cijfer toe (bijv. dag, maand of jaar).',
  isoDateRequired: 'Kies een datum.',
  isoDateInvalid: 'Ongeldige datum.',
  requiredShort: 'Dit veld is verplicht.',
})
