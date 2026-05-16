import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import PageHero from '../../components/marketing/PageHero'
import { FREELANCER_SEO } from '../../content/freelancerSeo'
import { useFreelancerRegistrationSubmit } from '../../hooks/useFreelancerRegistrationSubmit'
import { usePageSeo } from '../../hooks/usePageSeo'
import { isSubmissionInProgressError } from '../../lib/submissionErrors'
import { createSubmitErrorHandler, rhfRules } from '../../lib/validation'
import { normalizeDutchPhoneInput } from '../../utils/dutchPhone'
import './freelancers-pages.css'

/** Validatievolgorde = scroll naar eerste fout */
const FIELD_ORDER = [
  'voornaam',
  'achternaam',
  'email',
  'telefoonnummer',
  'woonplaats',
  'functievoorkeur',
  'beschikbaarheid',
  'beveiligingsdiploma',
  'overJezelf',
  'privacyConsent',
]

function flFieldElementId(name) {
  return name === 'functievoorkeur' ? 'fl-field-functievoorkeur' : `fl-field-${name}`
}

const defaultValues = {
  voornaam: '',
  achternaam: '',
  email: '',
  telefoonnummer: '',
  woonplaats: '',
  functievoorkeur: [],
  beschikbaarheid: '',
  beveiligingsdiploma: '',
  overJezelf: '',
  privacyConsent: false,
}

function hasFunctievoorkeur(value) {
  if (Array.isArray(value)) return value.length > 0
  return Boolean(value)
}

export default function FreelancerDirectRegister() {
  const seo = FREELANCER_SEO.aanmelden
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    criteriaMode: 'firstError',
  })

  const overJezelfValue = useWatch({ control, name: 'overJezelf', defaultValue: '' })
  const overLen = (overJezelfValue ?? '').length

  const { status, errorMessage, submit, reset: resetRemote } = useFreelancerRegistrationSubmit()

  useEffect(() => {
    if (status !== 'success') return
    document.getElementById('fl-aanmelding-succes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [status])

  const onValid = async (data) => {
    try {
      const voorkeuren = Array.isArray(data.functievoorkeur)
        ? data.functievoorkeur
        : data.functievoorkeur
          ? [data.functievoorkeur]
          : []

      await submit({
        voornaam: data.voornaam.trim(),
        achternaam: data.achternaam.trim(),
        email: data.email.trim(),
        telefoonnummer: normalizeDutchPhoneInput(data.telefoonnummer),
        woonplaats: data.woonplaats.trim(),
        functievoorkeur: voorkeuren,
        beschikbaarheid: data.beschikbaarheid.trim(),
        beveiligingsdiploma: data.beveiligingsdiploma,
        overJezelf: data.overJezelf.trim(),
        privacyConsent: data.privacyConsent,
      })
      reset(defaultValues)
    } catch (e) {
      if (isSubmissionInProgressError(e)) return
    }
  }

  const onValidationError = useMemo(
    () => createSubmitErrorHandler(FIELD_ORDER, setFocus, flFieldElementId),
    [setFocus],
  )

  const onSubmit = handleSubmit(onValid, onValidationError)

  const onResetForm = () => {
    resetRemote()
    reset(defaultValues)
  }

  const functievoorkeurRules = {
    validate: (v) =>
      hasFunctievoorkeur(v) || 'Selecteer minstens één functievoorkeur.',
  }

  return (
    <main className="fl-page">
      <PageHero
        variant="navy"
        eyebrow="Freelancers"
        title="Direct aanmelden"
        lead="Vul het formulier in — u ontvangt een bevestiging en wij plannen de vervolgstappen (documenten, checks en live zetten in het portaal)."
        stackCtasOnMobile
      >
        <Link to="/freelancers/hoe-het-werkt" className="hnb-btn hnb-btn--outline">
          Eerst het proces lezen
        </Link>
      </PageHero>

      <section className="fl-section hnb-container">
        {status === 'success' ? (
          <div
            className="fl-alert fl-alert--success fl-success-banner"
            role="status"
            aria-live="polite"
            id="fl-aanmelding-succes"
          >
            <h2>Aanmelding succesvol ontvangen</h2>
            <p>
              Bedankt — uw gegevens zijn binnen. U ontvangt zo snel mogelijk een bevestiging per e-mail; zo nodig
              neemt ons team persoonlijk contact met u op voor documenten of aanvullende vragen.
            </p>
            <div className="fl-form__actions" style={{ marginTop: 'var(--space-4)', marginBottom: 0 }}>
              <button type="button" className="hnb-btn hnb-btn--outline" onClick={onResetForm}>
                Nieuwe aanmelding
              </button>
              <Link to="/freelancers/openstaande-opdrachten" className="hnb-btn hnb-btn--primary">
                Bekijk opdrachten
              </Link>
            </div>
          </div>
        ) : null}

        {status === 'error' ? (
          <div className="fl-alert fl-alert--error" role="alert" aria-live="assertive">
            <h2>Versturen mislukt</h2>
            <p>
              {errorMessage ||
                'Probeer het later opnieuw of neem rechtstreeks contact op via de contactpagina — wij helpen u verder.'}
            </p>
            <div className="fl-form__actions" style={{ marginTop: 'var(--space-4)', marginBottom: 0 }}>
              <button type="button" className="hnb-btn hnb-btn--primary" onClick={() => resetRemote()}>
                Opnieuw proberen
              </button>
              <Link to="/contact" className="hnb-btn hnb-btn--outline">
                Naar contact
              </Link>
            </div>
          </div>
        ) : null}

        {status !== 'success' ? (
          <form
            className="fl-form"
            onSubmit={onSubmit}
            noValidate
            aria-busy={isSubmitting}
            aria-describedby={status === 'error' ? undefined : 'fl-form-beschrijving'}
          >
            <p id="fl-form-beschrijving" className="visually-hidden">
              Verplichte velden zijn gemarkeerd; validatie gebeurt na het verlaten van een veld.
            </p>

            <div className="fl-form__row--2">
              <div className="fl-form__field">
                <label htmlFor="fl-field-voornaam">Voornaam</label>
                <input
                  id="fl-field-voornaam"
                  type="text"
                  autoComplete="given-name"
                  aria-invalid={errors.voornaam ? 'true' : 'false'}
                  disabled={isSubmitting}
                  {...register('voornaam', { required: 'Vul uw voornaam in.' })}
                />
                {errors.voornaam ? (
                  <p className="fl-form__error" id="err-voornaam">
                    {errors.voornaam.message}
                  </p>
                ) : null}
              </div>
              <div className="fl-form__field">
                <label htmlFor="fl-field-achternaam">Achternaam</label>
                <input
                  id="fl-field-achternaam"
                  type="text"
                  autoComplete="family-name"
                  aria-invalid={errors.achternaam ? 'true' : 'false'}
                  disabled={isSubmitting}
                  {...register('achternaam', { required: 'Vul uw achternaam in.' })}
                />
                {errors.achternaam ? (
                  <p className="fl-form__error">{errors.achternaam.message}</p>
                ) : null}
              </div>
            </div>

            <div className="fl-form__field">
              <label htmlFor="fl-field-email">E-mailadres</label>
              <input
                id="fl-field-email"
                type="email"
                autoComplete="email"
                aria-invalid={errors.email ? 'true' : 'false'}
                disabled={isSubmitting}
                {...register('email', rhfRules.emailRequiredFreelancer)}
              />
              {errors.email ? <p className="fl-form__error">{errors.email.message}</p> : null}
            </div>

            <div className="fl-form__field">
              <label htmlFor="fl-field-telefoonnummer">Telefoonnummer</label>
              <input
                id="fl-field-telefoonnummer"
                type="tel"
                autoComplete="tel"
                placeholder="Bijv. 0612345678 of +31612345678"
                aria-invalid={errors.telefoonnummer ? 'true' : 'false'}
                disabled={isSubmitting}
                {...register('telefoonnummer', rhfRules.phoneNLRequired)}
              />
              <p className="fl-form__hint">Landcode +31 of 0, daarna 9 cijfers.</p>
              {errors.telefoonnummer ? (
                <p className="fl-form__error">{errors.telefoonnummer.message}</p>
              ) : null}
            </div>

            <div className="fl-form__field">
              <label htmlFor="fl-field-woonplaats">Woonplaats</label>
              <input
                id="fl-field-woonplaats"
                type="text"
                autoComplete="address-level2"
                aria-invalid={errors.woonplaats ? 'true' : 'false'}
                disabled={isSubmitting}
                {...register('woonplaats', { required: 'Vul uw woonplaats in.' })}
              />
              {errors.woonplaats ? <p className="fl-form__error">{errors.woonplaats.message}</p> : null}
            </div>

            <fieldset
              className="fl-form__fieldset"
              id="fl-field-functievoorkeur"
              disabled={isSubmitting}
              aria-invalid={errors.functievoorkeur ? 'true' : 'false'}
              aria-describedby={
                errors.functievoorkeur ? 'err-functievoorkeur' : 'fl-functievoorkeur-hint'
              }
            >
              <legend className="fl-form__legend">Functievoorkeur</legend>
              <p className="fl-form__hint" id="fl-functievoorkeur-hint">
                Selecteer alles wat op u van toepassing is.
              </p>
              <div className="fl-form__checks">
                <label className="fl-form__check">
                  <input
                    type="checkbox"
                    value="hospitality"
                    {...register('functievoorkeur', functievoorkeurRules)}
                  />
                  <span>Hospitality (host, bar, bediening)</span>
                </label>
                <label className="fl-form__check">
                  <input
                    type="checkbox"
                    value="beveiliging"
                    {...register('functievoorkeur', functievoorkeurRules)}
                  />
                  <span>Beveiliging (portier, event)</span>
                </label>
                <label className="fl-form__check">
                  <input
                    type="checkbox"
                    value="algemeen"
                    {...register('functievoorkeur', functievoorkeurRules)}
                  />
                  <span>Algemeen eventpersoneel (runner, productie)</span>
                </label>
              </div>
              {errors.functievoorkeur ? (
                <p className="fl-form__error" id="err-functievoorkeur">
                  {errors.functievoorkeur.message}
                </p>
              ) : null}
            </fieldset>

            <div className="fl-form__field">
              <label htmlFor="fl-field-beschikbaarheid">Beschikbaarheid</label>
              <textarea
                id="fl-field-beschikbaarheid"
                placeholder="Bijv. weekenden, vaste dagen, reisafstand…"
                aria-invalid={errors.beschikbaarheid ? 'true' : 'false'}
                disabled={isSubmitting}
                {...register('beschikbaarheid', {
                  required: 'Beschrijf kort uw beschikbaarheid.',
                })}
              />
              {errors.beschikbaarheid ? (
                <p className="fl-form__error">{errors.beschikbaarheid.message}</p>
              ) : null}
            </div>

            <div className="fl-form__field">
              <label htmlFor="fl-field-beveiligingsdiploma">Beveiligingsdiploma</label>
              <select
                id="fl-field-beveiligingsdiploma"
                aria-invalid={errors.beveiligingsdiploma ? 'true' : 'false'}
                disabled={isSubmitting}
                {...register('beveiligingsdiploma', {
                  required: 'Geef aan welke situatie op u van toepassing is.',
                })}
              >
                <option value="" disabled>
                  Maak een keuze…
                </option>
                <option value="niet_van_toepassing">Niet van toepassing (geen beveiligingswerk)</option>
                <option value="diploma_beveiliger_2">Diploma Beveiliger 2</option>
                <option value="diploma_beveiliger_3">Diploma Beveiliger 3 of hoger</option>
                <option value="opleiding_loopt">Opleiding loopt / diploma in behandeling</option>
              </select>
              {errors.beveiligingsdiploma ? (
                <p className="fl-form__error">{errors.beveiligingsdiploma.message}</p>
              ) : null}
            </div>

            <div className="fl-form__field">
              <label htmlFor="fl-field-overJezelf">Over jezelf</label>
              <textarea
                id="fl-field-overJezelf"
                maxLength={500}
                aria-invalid={errors.overJezelf ? 'true' : 'false'}
                disabled={isSubmitting}
                {...register('overJezelf', {
                  required: 'Vul dit veld in (maximaal 500 tekens).',
                  maxLength: {
                    value: 500,
                    message: 'Maximaal 500 tekens toegestaan.',
                  },
                })}
                aria-describedby="fl-overJezelf-count"
              />
              <p
                id="fl-overJezelf-count"
                className={`fl-form__charcount${overLen >= 500 ? ' fl-form__charcount--max' : ''}`}
              >
                {overLen} / 500 tekens
              </p>
              {errors.overJezelf ? <p className="fl-form__error">{errors.overJezelf.message}</p> : null}
            </div>

            <div className="fl-form__field">
              <label className="fl-form__check" htmlFor="fl-field-privacyConsent">
                <input
                  id="fl-field-privacyConsent"
                  type="checkbox"
                  aria-invalid={errors.privacyConsent ? 'true' : 'false'}
                  disabled={isSubmitting}
                  {...register('privacyConsent', rhfRules.gdprConsent)}
                />
                <span>
                  Ik ga akkoord met verwerking van mijn gegevens volgens de{' '}
                  <Link to="/juridisch/privacy">privacyverklaring</Link> (verplicht).
                </span>
              </label>
              {errors.privacyConsent ? (
                <p className="fl-form__error">{errors.privacyConsent.message}</p>
              ) : null}
            </div>

            <div className="fl-form__actions">
              <button
                type="submit"
                className="hnb-btn hnb-btn--primary fl-form__submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Bezig met versturen…' : 'Aanmelding versturen'}
              </button>
              <Link to="/contact" className="fl-form__secondary-link">
                Liever eerst contact opnemen
              </Link>
            </div>
          </form>
        ) : null}
      </section>
    </main>
  )
}
