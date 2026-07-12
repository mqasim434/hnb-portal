import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import PageHero from '../../components/marketing/PageHero'
import {
  FL_REG_BEVEILIGINGSPAS_OPTS,
  FL_REG_CONTRACT_OPTS,
  FL_REG_DOMEIN_OPTS,
  FL_REG_ERVARING_OPTS,
  FL_REG_JA_NEE,
  FL_REG_JA_NEE_OPLEIDING,
  FL_REG_REIS_OPTS,
  FL_REG_ROLLEN_BY_DOMEIN,
  FL_REG_SVH_OPTS,
  FL_REG_VOG_OPTS,
} from '../../content/freelancerRegistrationFormConfig'
import { FREELANCER_SEO } from '../../content/freelancerSeo'
import { useFreelancerRegistrationSubmit } from '../../hooks/useFreelancerRegistrationSubmit'
import { usePageSeo } from '../../hooks/usePageSeo'
import { isSubmissionInProgressError } from '../../lib/submissionErrors'
import { createSubmitErrorHandler, rhfRules } from '../../lib/validation'
import { normalizeDutchPhoneInput } from '../../utils/dutchPhone'
import './freelancers-pages.css'

/** @param {unknown} v */
function asArray(v) {
  if (Array.isArray(v)) return v
  if (v) return [v]
  return []
}

function ReqMarker() {
  return (
    <span className="fl-form__req" aria-hidden="true">
      *
    </span>
  )
}

/** Validatievolgorde = scroll naar eerste fout */
const FIELD_ORDER = [
  'voornaam',
  'achternaam',
  'email',
  'telefoonnummer',
  'geboortedatum',
  'woonplaats',
  'domeinen',
  'voorkeursrollen',
  'ervaringsniveau',
  'reisbereidheid',
  'beveilig_diploma',
  'beveilig_passen',
  'beveilig_bhv',
  'beveilig_vog',
  'hosp_svh',
  'hosp_bhv',
  'contractvoorkeur',
  'aanvullendeInfo',
  'privacyConsent',
]

/** @param {string} name */
function flFieldElementId(name) {
  return `fl-field-${name}`
}

/** @param {string} value */
function validateGeboortedatum18(value) {
  if (!value || String(value).trim() === '') {
    return 'Vul uw geboortedatum in.'
  }
  const parts = String(value).split('-')
  if (parts.length !== 3) {
    return 'Ongeldige datum.'
  }
  const y = Number(parts[0])
  const m = Number(parts[1])
  const d = Number(parts[2])
  if (!y || !m || !d) return 'Ongeldige datum.'
  const birth = new Date(y, m - 1, d)
  if (Number.isNaN(birth.getTime())) return 'Ongeldige datum.'
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1
  }
  if (age < 18) {
    return 'U moet 18 jaar of ouder zijn.'
  }
  return true
}

const defaultValues = {
  voornaam: '',
  achternaam: '',
  email: '',
  telefoonnummer: '',
  geboortedatum: '',
  woonplaats: '',
  domeinen: [],
  voorkeursrollen: [],
  ervaringsniveau: '',
  reisbereidheid: '',
  beveilig_diploma: '',
  beveilig_passen: [],
  beveilig_bhv: '',
  beveilig_vog: '',
  hosp_svh: '',
  hosp_bhv: '',
  contractvoorkeur: '',
  aanvullendeInfo: '',
  privacyConsent: false,
}

/** @param {unknown} v */
function validateMinOne(v, message) {
  return asArray(v).length > 0 ? true : message
}

const domeinenCheckboxRules = {
  validate: (v) => validateMinOne(v, 'Selecteer minstens één domein.'),
}

const voorkeursrollenRules = {
  validate: (v, formValues) => {
    const domeinen = asArray(formValues?.domeinen)
    const needsRoles = domeinen.includes('beveiliging')
    if (!needsRoles) return true
    return validateMinOne(v, 'Selecteer minstens één voorkeursrol.')
  },
}

const beveiligPassenRules = {
  validate: (v, formValues) => {
    const domeinen = asArray(formValues?.domeinen)
    if (!domeinen.includes('beveiliging')) return true
    return validateMinOne(v, 'Selecteer minstens één beveiligingspas.')
  },
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
    shouldUnregister: true,
  })

  const domeinenWatch = useWatch({ control, name: 'domeinen', defaultValue: [] })
  const domeinen = asArray(domeinenWatch)
  const showBeveiliging = domeinen.includes('beveiliging')
  const showHospitality = domeinen.includes('hospitality')

  const beschikbareRollen = useMemo(() => {
    if (domeinen.length === 0) return []
    const seen = new Set()
    const out = []
    for (const dom of domeinen) {
      const opts = FL_REG_ROLLEN_BY_DOMEIN[dom] || []
      for (const o of opts) {
        if (seen.has(o.value)) continue
        seen.add(o.value)
        out.push(o)
      }
    }
    return out
  }, [domeinen])

  const { status, errorMessage, submit, reset: resetRemote } = useFreelancerRegistrationSubmit()

  useEffect(() => {
    if (status !== 'success') return
    document.getElementById('fl-aanmelding-succes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [status])

  const onValid = async (data) => {
    try {
      await submit({
        voornaam: data.voornaam.trim(),
        achternaam: data.achternaam.trim(),
        email: data.email.trim(),
        telefoonnummer: normalizeDutchPhoneInput(data.telefoonnummer),
        geboortedatum: data.geboortedatum,
        woonplaats: data.woonplaats.trim(),
        domeinen: asArray(data.domeinen),
        voorkeursrollen: asArray(data.voorkeursrollen),
        ervaringsniveau: data.ervaringsniveau,
        reisbereidheid: data.reisbereidheid,
        beveilig_diploma: data.beveilig_diploma ?? '',
        beveilig_passen: asArray(data.beveilig_passen),
        beveilig_bhv: data.beveilig_bhv ?? '',
        beveilig_vog: data.beveilig_vog ?? '',
        hosp_svh: data.hosp_svh ?? '',
        hosp_bhv: data.hosp_bhv ?? '',
        contractvoorkeur: data.contractvoorkeur,
        aanvullendeInfo: data.aanvullendeInfo?.trim() ?? '',
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
            <h2>Bedankt voor uw aanmelding.</h2>
            <p>
              Wij hebben uw gegevens ontvangen en nemen binnen één werkdag persoonlijk contact met u op.
            </p>
            <h3 className="fl-alert__subheading">Wat gebeurt er nu?</h3>
            <ul className="fl-alert__list">
              <li>U ontvangt een bevestiging per e-mail met de vervolgstappen.</li>
              <li>Een coördinator neemt telefonisch of per e-mail contact op voor een korte kennismaking.</li>
              <li>Daarna nodigen wij u uit om documenten te uploaden in het portaal.</li>
              <li>Zodra screening is afgerond, staat u live en kunt u shifts accepteren.</li>
            </ul>
            <div className="fl-form__actions" style={{ marginTop: 'var(--space-4)', marginBottom: 0 }}>
              <button type="button" className="hnb-btn hnb-btn--outline" onClick={onResetForm}>
                Nieuwe aanmelding
              </button>
              <Link to="/freelancers/openstaande-opdrachten" className="hnb-btn hnb-btn--freelancer">
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
              Verplichte velden zijn gemarkeerd met een sterretje; validatie gebeurt na het verlaten van een veld.
            </p>
            <div className="fl-form__section" aria-labelledby="fl-reg-sect-1-title">
              <h3 id="fl-reg-sect-1-title" className="fl-form__section-title">
                Persoonlijke gegevens
              </h3>

              <div className="fl-form__row--2">
                <div className="fl-form__field">
                  <label htmlFor={flFieldElementId('voornaam')}>
                    Voornaam <ReqMarker /> <span className="visually-hidden">verplicht</span>
                  </label>
                  <input
                    id={flFieldElementId('voornaam')}
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
                  <label htmlFor={flFieldElementId('achternaam')}>
                    Achternaam <ReqMarker /> <span className="visually-hidden">verplicht</span>
                  </label>
                  <input
                    id={flFieldElementId('achternaam')}
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
                <label htmlFor={flFieldElementId('email')}>
                  E-mailadres <ReqMarker /> <span className="visually-hidden">verplicht</span>
                </label>
                <input
                  id={flFieldElementId('email')}
                  type="email"
                  autoComplete="email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  disabled={isSubmitting}
                  {...register('email', rhfRules.emailRequiredFreelancer)}
                />
                {errors.email ? <p className="fl-form__error">{errors.email.message}</p> : null}
              </div>

              <div className="fl-form__field">
                <label htmlFor={flFieldElementId('telefoonnummer')}>
                  Telefoonnummer <ReqMarker /> <span className="visually-hidden">verplicht</span>
                </label>
                <input
                  id={flFieldElementId('telefoonnummer')}
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
                <label htmlFor={flFieldElementId('geboortedatum')}>
                  Geboortedatum <ReqMarker /> <span className="visually-hidden">verplicht</span>
                </label>
                <input
                  id={flFieldElementId('geboortedatum')}
                  type="date"
                  autoComplete="bday"
                  aria-invalid={errors.geboortedatum ? 'true' : 'false'}
                  disabled={isSubmitting}
                  {...register('geboortedatum', { validate: validateGeboortedatum18 })}
                />
                <p className="fl-form__hint">U moet 18 jaar of ouder zijn.</p>
                {errors.geboortedatum ? (
                  <p className="fl-form__error">{errors.geboortedatum.message}</p>
                ) : null}
              </div>

              <div className="fl-form__field">
                <label htmlFor={flFieldElementId('woonplaats')}>
                  Woonplaats <ReqMarker /> <span className="visually-hidden">verplicht</span>
                </label>
                <input
                  id={flFieldElementId('woonplaats')}
                  type="text"
                  autoComplete="address-level2"
                  aria-invalid={errors.woonplaats ? 'true' : 'false'}
                  disabled={isSubmitting}
                  {...register('woonplaats', { required: 'Vul uw woonplaats in.' })}
                />
                {errors.woonplaats ? <p className="fl-form__error">{errors.woonplaats.message}</p> : null}
              </div>
            </div>

            <div className="fl-form__section" aria-labelledby="fl-reg-sect-2-title">
              <h3 id="fl-reg-sect-2-title" className="fl-form__section-title">
                Voorkeuren en ervaring
              </h3>

              <fieldset
                className="fl-form__fieldset"
                id={flFieldElementId('domeinen')}
                disabled={isSubmitting}
                aria-invalid={errors.domeinen ? 'true' : 'false'}
                aria-describedby={errors.domeinen ? 'err-domeinen' : 'hint-domeinen'}
              >
                <legend className="fl-form__legend">
                  Voor welk domein meldt u zich aan? <ReqMarker />
                </legend>
                <p className="fl-form__hint" id="hint-domeinen">
                  Selecteer alles wat op u van toepassing is.
                </p>
                <div className="fl-form__checks">
                  {FL_REG_DOMEIN_OPTS.map((o) => (
                    <label key={o.value} className="fl-form__check">
                      <input type="checkbox" value={o.value} {...register('domeinen', domeinenCheckboxRules)} />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
                {errors.domeinen ? (
                  <p className="fl-form__error" id="err-domeinen">
                    {errors.domeinen.message}
                  </p>
                ) : null}
              </fieldset>

              {beschikbareRollen.length > 0 ? (
                <fieldset
                  className="fl-form__fieldset"
                  id={flFieldElementId('voorkeursrollen')}
                  disabled={isSubmitting}
                  aria-invalid={errors.voorkeursrollen ? 'true' : 'false'}
                  aria-describedby={errors.voorkeursrollen ? 'err-rollen' : 'hint-rollen'}
                >
                  <legend className="fl-form__legend">
                    Voorkeursrollen <ReqMarker />
                  </legend>
                  <p className="fl-form__hint" id="hint-rollen">
                    Gebaseerd op uw domein(keuze).
                  </p>
                  <div className="fl-form__checks">
                    {beschikbareRollen.map((o) => (
                      <label key={o.value} className="fl-form__check">
                        <input
                          type="checkbox"
                          value={o.value}
                          {...register('voorkeursrollen', voorkeursrollenRules)}
                        />
                        <span>{o.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.voorkeursrollen ? (
                    <p className="fl-form__error" id="err-rollen">
                      {errors.voorkeursrollen.message}
                    </p>
                  ) : null}
                </fieldset>
              ) : null}

              <fieldset
                className="fl-form__fieldset"
                id={flFieldElementId('ervaringsniveau')}
                disabled={isSubmitting}
                aria-invalid={errors.ervaringsniveau ? 'true' : 'false'}
              >
                <legend className="fl-form__legend">
                  Ervaringsjaren <ReqMarker />
                </legend>
                <div className="fl-form__checks">
                  {FL_REG_ERVARING_OPTS.map((o) => (
                    <label key={o.value} className="fl-form__check">
                      <input
                        type="radio"
                        value={o.value}
                        {...register('ervaringsniveau', { required: 'Kies uw ervaringsjaren.' })}
                      />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
                {errors.ervaringsniveau ? (
                  <p className="fl-form__error">{errors.ervaringsniveau.message}</p>
                ) : null}
              </fieldset>

              <fieldset
                className="fl-form__fieldset"
                id={flFieldElementId('reisbereidheid')}
                disabled={isSubmitting}
                aria-invalid={errors.reisbereidheid ? 'true' : 'false'}
              >
                <legend className="fl-form__legend">
                  Reisbereidheid <ReqMarker />
                </legend>
                <div className="fl-form__checks">
                  {FL_REG_REIS_OPTS.map((o) => (
                    <label key={o.value} className="fl-form__check">
                      <input
                        type="radio"
                        value={o.value}
                        {...register('reisbereidheid', { required: 'Kies uw reisbereidheid.' })}
                      />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
                {errors.reisbereidheid ? (
                  <p className="fl-form__error">{errors.reisbereidheid.message}</p>
                ) : null}
              </fieldset>
            </div>

            {showBeveiliging ? (
              <div className="fl-form__section" aria-labelledby="fl-reg-sect-3-beveiliging-title">
                <h3 id="fl-reg-sect-3-beveiliging-title" className="fl-form__section-title">
                  Certificering — beveiliging
                </h3>

                <div className="fl-form__field">
                  <label htmlFor={flFieldElementId('beveilig_diploma')}>
                    Diploma Beveiliger 2 of hoger? <ReqMarker />{' '}
                    <span className="visually-hidden">verplicht</span>
                  </label>
                  <select
                    id={flFieldElementId('beveilig_diploma')}
                    aria-invalid={errors.beveilig_diploma ? 'true' : 'false'}
                    disabled={isSubmitting}
                    {...register('beveilig_diploma', { required: 'Maak een keuze.' })}
                  >
                    <option value="" disabled>
                      Maak een keuze…
                    </option>
                    {FL_REG_JA_NEE_OPLEIDING.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {errors.beveilig_diploma ? (
                    <p className="fl-form__error">{errors.beveilig_diploma.message}</p>
                  ) : null}
                </div>

                <fieldset
                  className="fl-form__fieldset"
                  id={flFieldElementId('beveilig_passen')}
                  disabled={isSubmitting}
                  aria-invalid={errors.beveilig_passen ? 'true' : 'false'}
                >
                  <legend className="fl-form__legend">
                    Welke pas heb je in bezit? <ReqMarker />
                  </legend>
                  <p className="fl-form__hint">Selecteer alles wat op u van toepassing is.</p>
                  <div className="fl-form__checks">
                    {FL_REG_BEVEILIGINGSPAS_OPTS.map((o) => (
                      <label key={o.value} className="fl-form__check">
                        <input
                          type="checkbox"
                          value={o.value}
                          {...register('beveilig_passen', beveiligPassenRules)}
                        />
                        <span>{o.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.beveilig_passen ? (
                    <p className="fl-form__error">{errors.beveilig_passen.message}</p>
                  ) : null}
                </fieldset>

                <div className="fl-form__field">
                  <label htmlFor={flFieldElementId('beveilig_bhv')}>BHV-certificering?</label>
                  <select
                    id={flFieldElementId('beveilig_bhv')}
                    aria-invalid={errors.beveilig_bhv ? 'true' : 'false'}
                    disabled={isSubmitting}
                    {...register('beveilig_bhv')}
                  >
                    <option value="">Maak een keuze… (optioneel)</option>
                    {FL_REG_JA_NEE.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {errors.beveilig_bhv ? (
                    <p className="fl-form__error">{errors.beveilig_bhv.message}</p>
                  ) : null}
                </div>

                <div className="fl-form__field">
                  <label htmlFor={flFieldElementId('beveilig_vog')}>Geldige VOG?</label>
                  <select
                    id={flFieldElementId('beveilig_vog')}
                    aria-invalid={errors.beveilig_vog ? 'true' : 'false'}
                    disabled={isSubmitting}
                    {...register('beveilig_vog')}
                  >
                    <option value="">Maak een keuze… (optioneel)</option>
                    {FL_REG_VOG_OPTS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {errors.beveilig_vog ? (
                    <p className="fl-form__error">{errors.beveilig_vog.message}</p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {showHospitality ? (
              <div className="fl-form__section" aria-labelledby="fl-reg-sect-3-hosp-title">
                <h3 id="fl-reg-sect-3-hosp-title" className="fl-form__section-title">
                  Certificering — servicemedewerker
                </h3>

                <div className="fl-form__field">
                  <label htmlFor={flFieldElementId('hosp_svh')}>SVH Sociale Hygiëne?</label>
                  <select
                    id={flFieldElementId('hosp_svh')}
                    aria-invalid={errors.hosp_svh ? 'true' : 'false'}
                    disabled={isSubmitting}
                    {...register('hosp_svh')}
                  >
                    <option value="">Maak een keuze… (optioneel)</option>
                    {FL_REG_SVH_OPTS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {errors.hosp_svh ? <p className="fl-form__error">{errors.hosp_svh.message}</p> : null}
                </div>

                <div className="fl-form__field">
                  <label htmlFor={flFieldElementId('hosp_bhv')}>BHV-certificering?</label>
                  <select
                    id={flFieldElementId('hosp_bhv')}
                    aria-invalid={errors.hosp_bhv ? 'true' : 'false'}
                    disabled={isSubmitting}
                    {...register('hosp_bhv')}
                  >
                    <option value="">Maak een keuze… (optioneel)</option>
                    {FL_REG_JA_NEE.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {errors.hosp_bhv ? <p className="fl-form__error">{errors.hosp_bhv.message}</p> : null}
                </div>
              </div>
            ) : null}

            <div className="fl-form__section" aria-labelledby="fl-reg-sect-4-title">
              <h3 id="fl-reg-sect-4-title" className="fl-form__section-title">
                Contract en afsluiten
              </h3>

              <fieldset
                className="fl-form__fieldset"
                id={flFieldElementId('contractvoorkeur')}
                disabled={isSubmitting}
                aria-invalid={errors.contractvoorkeur ? 'true' : 'false'}
              >
                <legend className="fl-form__legend">
                  Voorkeur contractvorm <ReqMarker />
                </legend>
                <div className="fl-form__checks">
                  {FL_REG_CONTRACT_OPTS.map((o) => (
                    <label key={o.value} className="fl-form__check">
                      <input
                        type="radio"
                        value={o.value}
                        {...register('contractvoorkeur', { required: 'Kies uw voorkeur contractvorm.' })}
                      />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
                {errors.contractvoorkeur ? (
                  <p className="fl-form__error">{errors.contractvoorkeur.message}</p>
                ) : null}
              </fieldset>

              <div className="fl-form__field">
                <label htmlFor={flFieldElementId('aanvullendeInfo')}>Aanvullende informatie</label>
                <textarea
                  id={flFieldElementId('aanvullendeInfo')}
                  rows={5}
                  maxLength={2000}
                  placeholder="Talenkennis, eerdere events, beschikbare data deze maand, of vragen aan uw coördinator."
                  aria-invalid={errors.aanvullendeInfo ? 'true' : 'false'}
                  disabled={isSubmitting}
                  {...register('aanvullendeInfo', {
                    maxLength: { value: 2000, message: 'Maximaal 2000 tekens toegestaan.' },
                  })}
                />
                {errors.aanvullendeInfo ? (
                  <p className="fl-form__error">{errors.aanvullendeInfo.message}</p>
                ) : null}
              </div>

              <div className="fl-form__field">
                <label className="fl-form__check" htmlFor={flFieldElementId('privacyConsent')}>
                  <input
                    id={flFieldElementId('privacyConsent')}
                    type="checkbox"
                    aria-invalid={errors.privacyConsent ? 'true' : 'false'}
                    disabled={isSubmitting}
                    {...register('privacyConsent', rhfRules.gdprConsent)}
                  />
                  <span>
                    Ik ga akkoord met de verwerking van mijn gegevens volgens de{' '}
                    <Link to="/juridisch/privacy">privacyverklaring</Link>.
                  </span>
                </label>
                {errors.privacyConsent ? (
                  <p className="fl-form__error">{errors.privacyConsent.message}</p>
                ) : null}
              </div>

              <div className="fl-form__actions">
                <button
                  type="submit"
                  className="hnb-btn hnb-btn--freelancer fl-form__submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Bezig met versturen…' : 'Aanmelding versturen'}
                </button>
                <Link to="/contact" className="fl-form__secondary-link">
                  Liever eerst contact opnemen
                </Link>
              </div>
            </div>
          </form>
        ) : null}
      </section>
    </main>
  )
}
