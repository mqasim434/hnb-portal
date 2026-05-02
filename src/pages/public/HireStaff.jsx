import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiCheckCircle, FiCoffee, FiShield, FiUsers } from 'react-icons/fi'
import './HireStaff.css'

const STAFF_TYPES = [
  { value: '', label: 'Select staff type' },
  { value: 'hosts-hostesses', label: 'Hosts / Hostesses' },
  { value: 'security', label: 'Security personnel' },
  { value: 'general-event', label: 'General event staff' },
  { value: 'mixed', label: 'Mixed / multiple categories' },
]

const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,}$/

export default function HireStaff() {
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      staffType: '',
      location: '',
      eventDates: '',
      numberOfWorkers: '',
      additionalNotes: '',
    },
  })

  const onSubmit = () => {
    setSubmitSuccess(true)
    reset()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const inputClass = (name) =>
    `hire-form__input${errors[name] ? ' hire-form__input--error' : ''}`

  const selectClass = errors.staffType
    ? 'hire-form__select hire-form__input--error'
    : 'hire-form__select'

  const textareaClass = errors.additionalNotes
    ? 'hire-form__textarea hire-form__textarea--error'
    : 'hire-form__textarea'

  return (
    <main className="hire">
      <section className="hire-hero" aria-labelledby="hire-hero-title">
        <div className="hire-hero__inner hnb-container">
          <h1 id="hire-hero-title" className="hire-hero__title">
            Staff Your Event With{' '}
            <span className="hire-hero__accent">Confidence</span>
          </h1>
          <p className="hire-hero__sub">
            Tell us what you need — dates, headcount, and venue — and H&amp;B
            Service Group will propose vetted hospitality and security crews
            aligned to your run-of-show. No obligation until you approve the roster.
          </p>
        </div>
      </section>

      <section
        className="hire-section hire-section--surface"
        aria-labelledby="hire-steps-title"
      >
        <div className="hnb-container">
          <header className="hire-section__head">
            <span className="hire-section__eyebrow">Process</span>
            <h2 id="hire-steps-title" className="hire-section__title">
              How it works
            </h2>
            <p className="hire-section__lead">
              A straightforward path from first brief to boots on the ground — your
              coordinator stays on the thread the whole way.
            </p>
          </header>
          <ol className="hire-steps">
            <li className="hire-step">
              <span className="hire-step__num" aria-hidden="true">
                1
              </span>
              <div className="hire-step__body">
                <h3 className="hire-step__label">Submit request</h3>
                <p className="hire-step__text">
                  Share company details, site location, dates, and the roles you
                  need. We confirm receipt and follow up with any clarifying
                  questions within one business day.
                </p>
              </div>
            </li>
            <li className="hire-step">
              <span className="hire-step__num" aria-hidden="true">
                2
              </span>
              <div className="hire-step__body">
                <h3 className="hire-step__label">We match staff</h3>
                <p className="hire-step__text">
                  We shortlist people who fit your brand, licensing profile, and
                  shift pattern — then send a roster for your approval before anyone
                  is confirmed.
                </p>
              </div>
            </li>
            <li className="hire-step">
              <span className="hire-step__num" aria-hidden="true">
                3
              </span>
              <div className="hire-step__body">
                <h3 className="hire-step__label">Event covered</h3>
                <p className="hire-step__text">
                  Call times, briefing notes, and on-site check-in are coordinated
                  with your production lead so teams arrive ready — and you get a
                  clean handover after load-out.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="hire-section" aria-labelledby="hire-cats-title">
        <div className="hnb-container">
          <header className="hire-section__head">
            <span className="hire-section__eyebrow">Coverage</span>
            <h2 id="hire-cats-title" className="hire-section__title">
              Staff categories
            </h2>
            <p className="hire-section__lead">
              Book one discipline or blend teams under a single contract — we keep
              ratios and licensing consistent across the roster.
            </p>
          </header>
          <ul className="hire-cats">
            <li className="hire-cat">
              <div className="hire-cat__icon" aria-hidden="true">
                <FiCoffee />
              </div>
              <h3 className="hire-cat__title">Hosts / Hostesses</h3>
              <p className="hire-cat__text">
                Guest greeting, coat service, VIP lanes, and brand-appropriate
                front-of-house presence for receptions, launches, and high-touch
                programs.
              </p>
            </li>
            <li className="hire-cat">
              <div className="hire-cat__icon" aria-hidden="true">
                <FiShield />
              </div>
              <h3 className="hire-cat__title">Security personnel</h3>
              <p className="hire-cat__text">
                Licensed door supervisors and event security for access control,
                perimeter patrols, and crowd-aware comms with your duty manager.
              </p>
            </li>
            <li className="hire-cat">
              <div className="hire-cat__icon" aria-hidden="true">
                <FiUsers />
              </div>
              <h3 className="hire-cat__title">General event staff</h3>
              <p className="hire-cat__text">
                Runners, barbacks, wristbanding, accreditation desks, and logistics
                support — the backbone crew that keeps changeovers and service
                windows on time.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section
        className="hire-section hire-section--surface"
        aria-labelledby="hire-cases-title"
      >
        <div className="hnb-container">
          <header className="hire-section__head">
            <span className="hire-section__eyebrow">Sectors</span>
            <h2 id="hire-cases-title" className="hire-section__title">
              Use cases we support
            </h2>
            <p className="hire-section__lead">
              From single-night peaks to multi-day builds — we scale headcount and
              shift patterns to match your production schedule.
            </p>
          </header>
          <ul className="hire-cases">
            {['Festivals', 'Corporate events', 'Nightlife', 'Venues'].map(
              (label) => (
                <li key={label} className="hire-case">
                  {label}
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      <section className="hire-section" aria-labelledby="hire-form-title">
        <div className="hnb-container">
          <header className="hire-section__head">
            <span className="hire-section__eyebrow">Get started</span>
            <h2 id="hire-form-title" className="hire-section__title">
              Request staffing
            </h2>
            <p className="hire-section__lead">
              Complete the form below. A coordinator will respond to confirm scope,
              availability, and next steps — no payment details required at this
              stage.
            </p>
          </header>

          <div className="hire-form-wrap">
            {submitSuccess && (
              <div
                className="hire-success"
                role="status"
                aria-live="polite"
                id="hire-success-banner"
              >
                <div className="hire-success__icon" aria-hidden="true">
                  <FiCheckCircle />
                </div>
                <div>
                  <h3 className="hire-success__title">Request received</h3>
                  <p className="hire-success__text">
                    Thank you — your brief has been captured. Our team will review
                    it and contact you shortly using the details you provided. (Demo:
                    no data was sent to a server yet.)
                  </p>
                  <button
                    type="button"
                    className="hnb-btn hnb-btn--outline hire-success__cta"
                    onClick={() => setSubmitSuccess(false)}
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            )}

            <form
              className="hire-form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="hire-form__field">
                <label className="hire-form__label" htmlFor="companyName">
                  Company name
                </label>
                <input
                  id="companyName"
                  type="text"
                  autoComplete="organization"
                  className={inputClass('companyName')}
                  aria-invalid={errors.companyName ? 'true' : 'false'}
                  aria-describedby={
                    errors.companyName ? 'companyName-error' : undefined
                  }
                  {...register('companyName', {
                    required: 'Company name is required',
                    maxLength: {
                      value: 120,
                      message: 'Maximum 120 characters',
                    },
                  })}
                />
                {errors.companyName && (
                  <p id="companyName-error" className="hire-form__error">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="hire-form__row hire-form__row--2">
                <div className="hire-form__field">
                  <label className="hire-form__label" htmlFor="contactPerson">
                    Contact person
                  </label>
                  <input
                    id="contactPerson"
                    type="text"
                    autoComplete="name"
                    className={inputClass('contactPerson')}
                    aria-invalid={errors.contactPerson ? 'true' : 'false'}
                    aria-describedby={
                      errors.contactPerson ? 'contactPerson-error' : undefined
                    }
                    {...register('contactPerson', {
                      required: 'Contact name is required',
                      maxLength: {
                        value: 80,
                        message: 'Maximum 80 characters',
                      },
                    })}
                  />
                  {errors.contactPerson && (
                    <p id="contactPerson-error" className="hire-form__error">
                      {errors.contactPerson.message}
                    </p>
                  )}
                </div>
                <div className="hire-form__field">
                  <label className="hire-form__label" htmlFor="email">
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={inputClass('email')}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: emailPattern,
                        message: 'Enter a valid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <p id="email-error" className="hire-form__error">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="hire-form__row hire-form__row--2">
                <div className="hire-form__field">
                  <label className="hire-form__label" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className={inputClass('phone')}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: phonePattern,
                        message: 'Enter a valid phone number',
                      },
                    })}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="hire-form__error">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="hire-form__field">
                  <label className="hire-form__label" htmlFor="staffType">
                    Staff type
                  </label>
                  <select
                    id="staffType"
                    className={selectClass}
                    aria-invalid={errors.staffType ? 'true' : 'false'}
                    aria-describedby={
                      errors.staffType ? 'staffType-error' : undefined
                    }
                    {...register('staffType', {
                      required: 'Please select a staff type',
                    })}
                  >
                    {STAFF_TYPES.map(({ value, label }) => (
                      <option key={label} value={value} disabled={value === ''}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.staffType && (
                    <p id="staffType-error" className="hire-form__error">
                      {errors.staffType.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="hire-form__field">
                <label className="hire-form__label" htmlFor="location">
                  Event location
                </label>
                <input
                  id="location"
                  type="text"
                  autoComplete="street-address"
                  placeholder="Venue or city / region"
                  className={inputClass('location')}
                  aria-invalid={errors.location ? 'true' : 'false'}
                  aria-describedby={
                    errors.location ? 'location-error' : undefined
                  }
                  {...register('location', {
                    required: 'Location is required',
                    maxLength: {
                      value: 200,
                      message: 'Maximum 200 characters',
                    },
                  })}
                />
                {errors.location && (
                  <p id="location-error" className="hire-form__error">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div className="hire-form__field">
                <label className="hire-form__label" htmlFor="eventDates">
                  Event date(s)
                </label>
                <input
                  id="eventDates"
                  type="text"
                  placeholder="e.g. 14–16 June 2026 or single date"
                  className={inputClass('eventDates')}
                  aria-invalid={errors.eventDates ? 'true' : 'false'}
                  aria-describedby={
                    errors.eventDates ? 'eventDates-error' : 'eventDates-hint'
                  }
                  {...register('eventDates', {
                    required: 'Event date(s) are required',
                    minLength: {
                      value: 3,
                      message: 'Add at least a short date description',
                    },
                    maxLength: {
                      value: 200,
                      message: 'Maximum 200 characters',
                    },
                  })}
                />
                {!errors.eventDates && (
                  <p id="eventDates-hint" className="hire-form__hint">
                    Include timezone or load-in day if relevant.
                  </p>
                )}
                {errors.eventDates && (
                  <p id="eventDates-error" className="hire-form__error">
                    {errors.eventDates.message}
                  </p>
                )}
              </div>

              <div className="hire-form__field">
                <label className="hire-form__label" htmlFor="numberOfWorkers">
                  Number of workers
                </label>
                <input
                  id="numberOfWorkers"
                  type="number"
                  min={1}
                  step={1}
                  inputMode="numeric"
                  className={inputClass('numberOfWorkers')}
                  aria-invalid={errors.numberOfWorkers ? 'true' : 'false'}
                  aria-describedby={
                    errors.numberOfWorkers ? 'numberOfWorkers-error' : undefined
                  }
                  {...register('numberOfWorkers', {
                    validate: (v) => {
                      const raw =
                        v === undefined || v === null ? '' : String(v).trim()
                      if (raw === '') return 'Number of workers is required'
                      const n = Number(raw)
                      if (!Number.isFinite(n))
                        return 'Enter a valid number'
                      if (n < 1) return 'Enter at least 1'
                      if (n > 5000)
                        return 'For very large crews, call us directly'
                      if (!Number.isInteger(n)) return 'Enter a whole number'
                      return true
                    },
                  })}
                />
                {errors.numberOfWorkers && (
                  <p id="numberOfWorkers-error" className="hire-form__error">
                    {errors.numberOfWorkers.message}
                  </p>
                )}
              </div>

              <div className="hire-form__field">
                <label className="hire-form__label" htmlFor="additionalNotes">
                  Additional notes{' '}
                  <span className="hire-form__optional">(optional)</span>
                </label>
                <textarea
                  id="additionalNotes"
                  rows={5}
                  className={textareaClass}
                  placeholder="Uniforms, licensing, access hours, languages, or other requirements"
                  aria-invalid={errors.additionalNotes ? 'true' : 'false'}
                  aria-describedby={
                    errors.additionalNotes ? 'additionalNotes-error' : undefined
                  }
                  {...register('additionalNotes', {
                    maxLength: {
                      value: 2000,
                      message: 'Maximum 2000 characters',
                    },
                  })}
                />
                {errors.additionalNotes && (
                  <p id="additionalNotes-error" className="hire-form__error">
                    {errors.additionalNotes.message}
                  </p>
                )}
              </div>

              <button type="submit" className="hnb-btn hnb-btn--primary hire-form__submit">
                Send Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
