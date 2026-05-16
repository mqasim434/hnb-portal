import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { FiCheckCircle } from 'react-icons/fi'
import { FormField, FormRow } from '../../components/forms/FormPrimitives'
import PageHero from '../../components/marketing/PageHero'
import TrustBlurb from '../../components/marketing/TrustBlurb'
import { CONTACT_SEO } from '../../content/contactSeo'
import { useContactFormSubmit } from '../../hooks/useContactFormSubmit'
import { usePageSeo } from '../../hooks/usePageSeo'
import { isSubmissionInProgressError } from '../../lib/submissionErrors'
import { createSubmitErrorHandler, rhfRules } from '../../lib/validation'
import '../bedrijven/bedrijven-pages.css'
import './Contact.css'

const CONTACT_FIELD_ORDER = ['name', 'email', 'subject', 'message']

function contactFieldElementId(fieldName) {
  const map = {
    name: 'contact-name',
    email: 'contact-email',
    subject: 'contact-subject',
    message: 'contact-message',
  }
  return map[fieldName] ?? `contact-${fieldName}`
}

const OPENING_HOURS = [
  { day: 'Maandag – vrijdag', hours: '09:00 – 18:00' },
  { day: 'Weekend / events', hours: 'Bereikbaarheid volgens briefing' },
]

export default function Contact() {
  usePageSeo({
    title: CONTACT_SEO.title,
    description: CONTACT_SEO.description,
    canonicalPath: CONTACT_SEO.canonicalPath,
  })

  const { status, errorMessage, submit, reset: resetRemote } = useContactFormSubmit()
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    criteriaMode: 'firstError',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const hasContactEmailEndpoint = Boolean(import.meta.env.VITE_CONTACT_FORM_EMAIL_ENDPOINT)

  const onValidationError = useMemo(
    () => createSubmitErrorHandler(CONTACT_FIELD_ORDER, setFocus, contactFieldElementId),
    [setFocus],
  )

  const onSubmit = handleSubmit(
    async (data) => {
      try {
        await submit(data)
        reset()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (e) {
        if (isSubmissionInProgressError(e)) return
        /* overige fout: status / errorMessage */
      }
    },
    onValidationError,
  )

  const inputClass = (field) =>
    `contact-form__input${errors[field] ? ' contact-form__input--error' : ''}`

  const textareaClass = errors.message
    ? 'contact-form__textarea contact-form__textarea--error'
    : 'contact-form__textarea'

  const showSuccess = status === 'success'

  const dismissSuccess = () => {
    resetRemote()
  }

  return (
    <main className="contact-page contact">
      <PageHero
        variant="navy"
        eyebrow="H&B Service Group"
        title={
          <>
            Neem <span className="contact-page__hero-accent">contact op</span>
          </>
        }
        lead="Plan een gesprek over hospitality- en beveiligingsteams voor uw programma. We reageren schriftelijk binnen één werkdag — sneller bij lopende shifts."
      />

      <TrustBlurb ariaLabel="Waarom opdrachtgevers ons vertrouwen">
        <p>
          <strong>Compliance-first rosteren:</strong> werkrecht, diplomering en locatie-eisen vóór
          definitieve plaatsing. Geen improvisatie achteraf bij uw vergunningverlener of verzekeraar.
        </p>
      </TrustBlurb>

      <section className="contact-body" aria-label="Contactformulier en gegevens">
        <div className="hnb-container">
          <div className="contact-layout">
            <div className="contact-layout__main">
              {status === 'error' && errorMessage ? (
                <div className="b2b-error-banner" role="alert">
                  <h3>Verzenden mislukt</h3>
                  <p>{errorMessage}</p>
                </div>
              ) : null}

              {showSuccess ? (
                <div
                  className="contact-success"
                  role="status"
                  aria-live="polite"
                >
                  <div className="contact-success__icon" aria-hidden="true">
                    <FiCheckCircle />
                  </div>
                  <div>
                    <h2 className="contact-success__title">Bericht ontvangen</h2>
                    <p className="contact-success__text">
                      Bedankt voor uw bericht — we nemen contact met u op via het opgegeven
                      e-mailadres.
                      {hasContactEmailEndpoint
                        ? ' U ontvangt een bevestiging in uw inbox wanneer de verzending rond is.'
                        : null}
                    </p>
                    <button
                      type="button"
                      className="hnb-btn hnb-btn--outline contact-success__btn"
                      onClick={dismissSuccess}
                    >
                      Nog een bericht sturen
                    </button>
                  </div>
                </div>
              ) : null}

              <form className="contact-form" onSubmit={onSubmit} noValidate>
                <FormRow block="contact-form" twoCols>
                  <FormField
                    block="contact-form"
                    id="contact-name"
                    label="Naam"
                    error={errors.name}
                  >
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      className={inputClass('name')}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={
                        errors.name ? 'contact-name-error' : undefined
                      }
                      disabled={isSubmitting}
                      {...register('name', {
                        required: 'Naam is verplicht',
                        maxLength: {
                          value: 80,
                          message: 'Maximaal 80 tekens',
                        },
                      })}
                    />
                  </FormField>
                  <FormField
                    block="contact-form"
                    id="contact-email"
                    label="E-mail"
                    error={errors.email}
                  >
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      className={inputClass('email')}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={
                        errors.email ? 'contact-email-error' : undefined
                      }
                      disabled={isSubmitting}
                      {...register('email', rhfRules.emailRequired)}
                    />
                  </FormField>
                </FormRow>

                <FormField block="contact-form" id="contact-subject" label="Onderwerp" error={errors.subject}>
                  <input
                    id="contact-subject"
                    type="text"
                    autoComplete="off"
                    className={inputClass('subject')}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={
                      errors.subject ? 'contact-subject-error' : undefined
                    }
                    disabled={isSubmitting}
                    {...register('subject', {
                      required: 'Onderwerp is verplicht',
                      minLength: {
                        value: 3,
                        message: 'Onderwerp is te kort',
                      },
                      maxLength: {
                        value: 160,
                        message: 'Maximaal 160 tekens',
                      },
                    })}
                  />
                </FormField>

                <FormField block="contact-form" id="contact-message" label="Bericht" error={errors.message}>
                  <textarea
                    id="contact-message"
                    rows={6}
                    className={textareaClass}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={
                      errors.message ? 'contact-message-error' : undefined
                    }
                    disabled={isSubmitting}
                    {...register('message', {
                      required: 'Bericht is verplicht',
                      minLength: {
                        value: 20,
                        message: 'Schrijf minstens 20 tekens',
                      },
                      maxLength: {
                        value: 4000,
                        message: 'Maximaal 4000 tekens',
                      },
                    })}
                  />
                </FormField>

                <button
                  type="submit"
                  className="hnb-btn hnb-btn--primary contact-form__submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Verzenden…' : 'Bericht verzenden'}
                </button>
              </form>
            </div>

            <aside className="contact-aside contact-aside--brand" aria-label="Contactgegevens">
              <h2 className="contact-aside__title">Contactgegevens</h2>
              <ul className="contact-aside__list">
                <li className="contact-aside__item">
                  <span className="contact-aside__label">E-mail</span>
                  <a
                    className="contact-aside__value"
                    href="mailto:bookings@hbservicegroup.com"
                  >
                    bookings@hbservicegroup.com
                  </a>
                </li>
                <li className="contact-aside__item">
                  <span className="contact-aside__label">Telefoon</span>
                  <a className="contact-aside__value" href="tel:+31200000000">
                    +31 (0) 20 000 0000
                  </a>
                </li>
                <li className="contact-aside__item">
                  <span className="contact-aside__label">Locatie</span>
                  <span className="contact-aside__value">
                    Amsterdam, Nederland
                  </span>
                </li>
              </ul>

              <div className="contact-hours">
                <h3 className="contact-hours__title">Openingstijden</h3>
                <ul className="contact-hours__list">
                  {OPENING_HOURS.map((row) => (
                    <li key={row.day} className="contact-hours__row">
                      <span className="contact-hours__day">{row.day}</span>
                      <span className="contact-hours__time">{row.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="contact-aside__footnote">
                Voor urgente zaken tijdens een lopende opdracht: gebruik het directe nummer van uw
                coördinator uit de briefing.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
