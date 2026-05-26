import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useCompanyStaffRequestSubmit } from '../../hooks/useCompanyStaffRequestSubmit'
import { isSubmissionInProgressError } from '../../lib/submissionErrors'
import { createSubmitErrorHandler, rhfRules } from '../../lib/validation'

const STAFF_TYPES = [
  { value: '', label: 'Maak een keuze' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'beveiliging', label: 'Beveiliging' },
  { value: 'gemengd', label: 'Gemengd team' },
  { value: 'advies', label: 'Adviesgesprek' },
]

const EVENT_TYPES = [
  { value: '', label: 'Maak een keuze' },
  { value: 'festival', label: 'Festival' },
  { value: 'corporate', label: 'Corporate event' },
  { value: 'club', label: 'Clubavond' },
  { value: 'theater', label: 'Theater of arena' },
  { value: 'particulier', label: 'Particulier event' },
  { value: 'overig', label: 'Overig' },
]

const FIELD_ORDER = [
  'companyName',
  'contactPerson',
  'email',
  'phone',
  'staffType',
  'eventType',
  'location',
  'eventDateStart',
  'eventDateEnd',
  'numberOfWorkers',
  'additionalNotes',
  'privacyConsent',
]

const defaultValues = {
  companyName: '',
  contactPerson: '',
  email: '',
  phone: '',
  staffType: '',
  eventType: '',
  location: '',
  eventDateStart: '',
  eventDateEnd: '',
  numberOfWorkers: '',
  additionalNotes: '',
  privacyConsent: false,
}

function Req() {
  return (
    <span className="b2b-form__req" aria-hidden="true">
      *
    </span>
  )
}

/**
 * B2B personeelsaanvraag — branding via b2b-form*.
 */
export default function CompanyStaffRequestForm() {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    criteriaMode: 'firstError',
  })

  const { status, errorMessage, submit, reset: resetRemote } = useCompanyStaffRequestSubmit()

  useEffect(() => {
    if (status !== 'success') return
    document.getElementById('b2b-request-success')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [status])

  const onValid = async (data) => {
    try {
      const eventDates =
        data.eventDateStart && data.eventDateEnd
          ? `${data.eventDateStart} t/m ${data.eventDateEnd}`
          : ''

      await submit({
        companyName: data.companyName.trim(),
        contactPerson: data.contactPerson.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        staffType: data.staffType,
        eventType: data.eventType,
        location: data.location.trim(),
        eventDateStart: data.eventDateStart,
        eventDateEnd: data.eventDateEnd,
        eventDates,
        numberOfWorkers: data.numberOfWorkers,
        additionalNotes: (data.additionalNotes ?? '').trim(),
        privacyConsent: data.privacyConsent,
      })
      reset(defaultValues)
    } catch (e) {
      if (isSubmissionInProgressError(e)) return
    }
  }

  const b2bFieldElementId = (name) => `b2b-field-${name}`
  const onValidationError = useMemo(
    () => createSubmitErrorHandler(FIELD_ORDER, setFocus, b2bFieldElementId),
    [setFocus],
  )

  const onSubmit = handleSubmit(onValid, onValidationError)

  const inpClass = (name) => (errors[name] ? ' b2b-form__input--error' : '')
  const selClass = (name) => (errors[name] ? ' b2b-form__select--error' : '')
  const taClass = (name) => (errors[name] ? ' b2b-form__textarea--error' : '')

  return (
    <>
      {status === 'success' ? (
        <div className="b2b-success" role="status" aria-live="polite" id="b2b-request-success">
          <h3>Aanvraag ontvangen</h3>
          <p>
            Dank u wel — wij hebben uw personeelsaanvraag geregistreerd. U ontvangt een bevestiging per e-mail; ons team
            neemt zo snel mogelijk contact op om scope en vervolgstappen af te stemmen.
          </p>
          <div className="b2b-success__actions">
            <button type="button" className="hnb-btn hnb-btn--outline" onClick={() => resetRemote()}>
              Nog een aanvraag
            </button>
            <Link to="/contact" className="hnb-btn hnb-btn--primary">
              Direct contact
            </Link>
          </div>
        </div>
      ) : null}

      {status === 'error' ? (
        <div className="b2b-error-banner" role="alert">
          <h3>Versturen mislukt</h3>
          <p>
            {errorMessage ||
              'Probeer het later opnieuw of bel of mail ons via de contactpagina — wij helpen u verder.'}
          </p>
          <div className="b2b-success__actions" style={{ marginTop: 'var(--space-3)' }}>
            <button type="button" className="hnb-btn hnb-btn--primary" onClick={() => resetRemote()}>
              Opnieuw proberen
            </button>
          </div>
        </div>
      ) : null}

      {status !== 'success' ? (
        <form className="b2b-form" onSubmit={onSubmit} noValidate aria-busy={isSubmitting}>
          <p className="visually-hidden" id="b2b-form-desc">
            Velden met een sterretje zijn verplicht; validatie na het verlaten van een veld.
          </p>

          <div>
            <h2 className="b2b-form__title">Personeelsaanvraag</h2>
            <p className="b2b-form__lead">
              Geen betalingsgegevens nodig — na verzending stemmen we scope en beschikbaarheid af met uw
              contactpersoon.
            </p>
          </div>

          <div className="b2b-form__field">
            <label className="b2b-form__label" htmlFor="b2b-field-companyName">
              Bedrijfsnaam <Req />
            </label>
            <input
              id="b2b-field-companyName"
              type="text"
              autoComplete="organization"
              disabled={isSubmitting}
              className={`b2b-form__input${inpClass('companyName')}`}
              {...register('companyName', {
                required: 'Vul de bedrijfsnaam in.',
                maxLength: { value: 120, message: 'Maximaal 120 tekens.' },
              })}
            />
            {errors.companyName ? <p className="b2b-form__error">{errors.companyName.message}</p> : null}
          </div>

          <div className="b2b-form__field">
            <label className="b2b-form__label" htmlFor="b2b-field-contactPerson">
              Contactpersoon <Req />
            </label>
            <input
              id="b2b-field-contactPerson"
              type="text"
              autoComplete="name"
              disabled={isSubmitting}
              className={`b2b-form__input${inpClass('contactPerson')}`}
              {...register('contactPerson', {
                required: 'Vul de naam van de contactpersoon in.',
                maxLength: { value: 80, message: 'Maximaal 80 tekens.' },
              })}
            />
            {errors.contactPerson ? <p className="b2b-form__error">{errors.contactPerson.message}</p> : null}
          </div>

          <div className="b2b-form__field">
            <label className="b2b-form__label" htmlFor="b2b-field-email">
              Zakelijk e-mailadres <Req />
            </label>
            <input
              id="b2b-field-email"
              type="email"
              autoComplete="email"
              disabled={isSubmitting}
              className={`b2b-form__input${inpClass('email')}`}
              {...register('email', rhfRules.emailRequired)}
            />
            {errors.email ? <p className="b2b-form__error">{errors.email.message}</p> : null}
          </div>

          <div className="b2b-form__field">
            <label className="b2b-form__label" htmlFor="b2b-field-phone">
              Telefoonnummer <Req />
            </label>
            <input
              id="b2b-field-phone"
              type="tel"
              autoComplete="tel"
              placeholder="Bijv. 0201234567 of +31201234567"
              disabled={isSubmitting}
              className={`b2b-form__input${inpClass('phone')}`}
              {...register('phone', rhfRules.phoneNLRequired)}
            />
            <p className="b2b-form__hint">Bijv. 0201234567 of +31201234567</p>
            {errors.phone ? <p className="b2b-form__error">{errors.phone.message}</p> : null}
          </div>

          <div className="b2b-form__row b2b-form__row--2">
            <div className="b2b-form__field">
              <label className="b2b-form__label" htmlFor="b2b-field-staffType">
                Type personeel <Req />
              </label>
              <select
                id="b2b-field-staffType"
                disabled={isSubmitting}
                className={`b2b-form__select${selClass('staffType')}`}
                {...register('staffType', { required: 'Selecteer een type personeel.' })}
              >
                {STAFF_TYPES.map(({ value, label }) => (
                  <option key={value || 'empty'} value={value} disabled={value === ''}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.staffType ? <p className="b2b-form__error">{errors.staffType.message}</p> : null}
            </div>
            <div className="b2b-form__field">
              <label className="b2b-form__label" htmlFor="b2b-field-eventType">
                Type event <Req />
              </label>
              <select
                id="b2b-field-eventType"
                disabled={isSubmitting}
                className={`b2b-form__select${selClass('eventType')}`}
                {...register('eventType', { required: 'Selecteer het type event.' })}
              >
                {EVENT_TYPES.map(({ value, label }) => (
                  <option key={value || 'e-empty'} value={value} disabled={value === ''}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.eventType ? <p className="b2b-form__error">{errors.eventType.message}</p> : null}
            </div>
          </div>

          <div className="b2b-form__field">
            <label className="b2b-form__label" htmlFor="b2b-field-location">
              Locatie van het event <Req />
            </label>
            <input
              id="b2b-field-location"
              type="text"
              autoComplete="street-address"
              placeholder="Adres, locatienaam of stad"
              disabled={isSubmitting}
              className={`b2b-form__input${inpClass('location')}`}
              {...register('location', {
                required: 'Vul de locatie in.',
                maxLength: { value: 240, message: 'Maximaal 240 tekens.' },
              })}
            />
            {errors.location ? <p className="b2b-form__error">{errors.location.message}</p> : null}
          </div>

          <div className="b2b-form__field">
            <span className="b2b-form__label" id="b2b-dates-label">
              Datum of periode <Req />
            </span>
            <div className="b2b-form__daterow" role="group" aria-labelledby="b2b-dates-label">
              <div>
                <label className="b2b-form__hint" htmlFor="b2b-field-eventDateStart" style={{ display: 'block', marginBottom: '0.35rem' }}>
                  Startdatum
                </label>
                <input
                  id="b2b-field-eventDateStart"
                  type="date"
                  disabled={isSubmitting}
                  className={`b2b-form__input${inpClass('eventDateStart')}`}
                  {...register('eventDateStart', { required: 'Kies een startdatum.' })}
                />
                {errors.eventDateStart ? (
                  <p className="b2b-form__error">{errors.eventDateStart.message}</p>
                ) : null}
              </div>
              <div>
                <label className="b2b-form__hint" htmlFor="b2b-field-eventDateEnd" style={{ display: 'block', marginBottom: '0.35rem' }}>
                  Einddatum
                </label>
                <input
                  id="b2b-field-eventDateEnd"
                  type="date"
                  disabled={isSubmitting}
                  className={`b2b-form__input${inpClass('eventDateEnd')}`}
                  {...register('eventDateEnd', {
                    required: 'Kies een einddatum.',
                    validate: (v) => {
                      const s = getValues('eventDateStart')
                      if (!v || !s) return true
                      if (v < s) return 'Einddatum moet op of na de startdatum liggen.'
                      return true
                    },
                  })}
                />
                {errors.eventDateEnd ? <p className="b2b-form__error">{errors.eventDateEnd.message}</p> : null}
              </div>
            </div>
          </div>

          <div className="b2b-form__field">
            <label className="b2b-form__label" htmlFor="b2b-field-numberOfWorkers">
              Benodigde bezetting <Req />
            </label>
            <input
              id="b2b-field-numberOfWorkers"
              type="number"
              min={1}
              step={1}
              inputMode="numeric"
              disabled={isSubmitting}
              className={`b2b-form__input${inpClass('numberOfWorkers')}`}
              {...register('numberOfWorkers', {
                validate: (v) => {
                  const raw = v === undefined || v === null ? '' : String(v).trim()
                  if (raw === '') return 'Vul het gewenste aantal in.'
                  const n = Number(raw)
                  if (!Number.isFinite(n)) return 'Voer een geldig getal in.'
                  if (n < 1) return 'Minimaal 1.'
                  if (n > 5000) return 'Voor zeer grote crews: neem even telefonisch contact op.'
                  if (!Number.isInteger(n)) return 'Voer een geheel getal in.'
                  return true
                },
              })}
            />
            <p className="b2b-form__hint">
              Bijv. 5 hosts en 3 portiers — splits u graag in &apos;Aanvullende details&apos;.
            </p>
            {errors.numberOfWorkers ? (
              <p className="b2b-form__error">{errors.numberOfWorkers.message}</p>
            ) : null}
          </div>

          <div className="b2b-form__field">
            <label className="b2b-form__label" htmlFor="b2b-field-additionalNotes">
              Aanvullende details
            </label>
            <textarea
              id="b2b-field-additionalNotes"
              rows={5}
              disabled={isSubmitting}
              className={`b2b-form__textarea${taClass('additionalNotes')}`}
              placeholder="Uniformwensen, talen, drukke momenten, VIP-zones, vergunningssituatie, eerdere edities..."
              {...register('additionalNotes', {
                maxLength: { value: 2000, message: 'Maximaal 2000 tekens.' },
              })}
            />
            {errors.additionalNotes ? <p className="b2b-form__error">{errors.additionalNotes.message}</p> : null}
          </div>

          <div className="b2b-form__field">
            <label className="b2b-form__check" htmlFor="b2b-field-privacyConsent">
              <input
                id="b2b-field-privacyConsent"
                type="checkbox"
                disabled={isSubmitting}
                {...register('privacyConsent', rhfRules.gdprConsent)}
              />
              <span>
                Ik ga akkoord met de verwerking van mijn gegevens volgens de{' '}
                <Link to="/juridisch/privacy">privacyverklaring</Link>
                .
              </span>
            </label>
            {errors.privacyConsent ? <p className="b2b-form__error">{errors.privacyConsent.message}</p> : null}
          </div>

          <button type="submit" className="hnb-btn hnb-btn--primary b2b-form__submit" disabled={isSubmitting}>
            {isSubmitting ? 'Bezig met versturen…' : 'Aanvraag versturen'}
          </button>
        </form>
      ) : null}
    </>
  )
}
