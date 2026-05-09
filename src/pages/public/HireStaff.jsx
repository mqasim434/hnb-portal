import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiCheckCircle, FiCoffee, FiShield, FiUsers } from 'react-icons/fi'
import './HireStaff.css'

const STAFF_TYPES = [
  { value: '', label: 'Kies type personeel' },
  { value: 'hosts-hostesses', label: 'Hosts / hostesses' },
  { value: 'security', label: 'Beveiligingsmedewerkers' },
  { value: 'general-event', label: 'Algemeen eventpersoneel' },
  { value: 'mixed', label: 'Gemengd / meerdere categorieën' },
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
            Bezet uw event met{' '}
            <span className="hire-hero__accent">vertrouwen</span>
          </h1>
          <p className="hire-hero__sub">
            Vertel wat u nodig heeft — data, bezetting en locatie — en H&amp;B
            Service Group stelt gecontroleerde hospitality- en
            beveiligingsteams voor, afgestemd op uw programma. Geen verplichting
            tot u het roster goedkeurt.
          </p>
        </div>
      </section>

      <section
        className="hire-section hire-section--surface"
        aria-labelledby="hire-steps-title"
      >
        <div className="hnb-container">
          <header className="hire-section__head">
            <span className="hire-section__eyebrow">Proces</span>
            <h2 id="hire-steps-title" className="hire-section__title">
              Zo werkt het
            </h2>
            <p className="hire-section__lead">
              Een heldere route van eerste briefing tot mensen op de vloer — uw
              coördinator blijft aangesloten.
            </p>
          </header>
          <ol className="hire-steps">
            <li className="hire-step">
              <span className="hire-step__num" aria-hidden="true">
                1
              </span>
              <div className="hire-step__body">
                <h3 className="hire-step__label">Aanvraag indienen</h3>
                <p className="hire-step__text">
                  Deel bedrijfsgegevens, locatie, data en rollen. We bevestigen
                  ontvangst en nemen binnen één werkdag contact op bij vragen.
                </p>
              </div>
            </li>
            <li className="hire-step">
              <span className="hire-step__num" aria-hidden="true">
                2
              </span>
              <div className="hire-step__body">
                <h3 className="hire-step__label">Wij matchen personeel</h3>
                <p className="hire-step__text">
                  We selecteren mensen op merk, vergunningen en dienstrooster —
                  daarna ontvangt u een roster ter goedkeuring vóór definitieve
                  bevestiging.
                </p>
              </div>
            </li>
            <li className="hire-step">
              <span className="hire-step__num" aria-hidden="true">
                3
              </span>
              <div className="hire-step__body">
                <h3 className="hire-step__label">Event gedekt</h3>
                <p className="hire-step__text">
                  Call times, briefing en check-in stemmen we af met uw
                  productieleiding — en na load-out een nette overdracht.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="hire-section" aria-labelledby="hire-cats-title">
        <div className="hnb-container">
          <header className="hire-section__head">
            <span className="hire-section__eyebrow">Dekking</span>
            <h2 id="hire-cats-title" className="hire-section__title">
              Personeelscategorieën
            </h2>
            <p className="hire-section__lead">
              Boek één discipline of combineer onder één contract — wij houden
              verhoudingen en vergunningen consistent op het roster.
            </p>
          </header>
          <ul className="hire-cats">
            <li className="hire-cat">
              <div className="hire-cat__icon" aria-hidden="true">
                <FiCoffee />
              </div>
              <h3 className="hire-cat__title">Hosts / hostesses</h3>
              <p className="hire-cat__text">
                Ontvangst, garderobe, VIP-routes en merkpassend front-of-house voor
                recepties, lanceringen en high-touch programma&apos;s.
              </p>
            </li>
            <li className="hire-cat">
              <div className="hire-cat__icon" aria-hidden="true">
                <FiShield />
              </div>
              <h3 className="hire-cat__title">Beveiligingsmedewerkers</h3>
              <p className="hire-cat__text">
                Bevoegde portiers en eventbeveiliging voor toegang, perimeter en
                crowdbewuste communicatie met uw duty manager.
              </p>
            </li>
            <li className="hire-cat">
              <div className="hire-cat__icon" aria-hidden="true">
                <FiUsers />
              </div>
              <h3 className="hire-cat__title">Algemeen eventpersoneel</h3>
              <p className="hire-cat__text">
                Runners, barbacks, bandjes, accreditatie en logistiek — het team
                dat wissels en servicewindows op tijd houdt.
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
            <span className="hire-section__eyebrow">Sectoren</span>
            <h2 id="hire-cases-title" className="hire-section__title">
              Typische inzetgebieden
            </h2>
            <p className="hire-section__lead">
              Van enkele pieknachten tot meerdaagse opbouw — we schalen bezetting
              en diensten aan op uw productie.
            </p>
          </header>
          <ul className="hire-cases">
            {[
              'Festivals',
              'Zakelijke events',
              'Nachtleven',
              'Locaties',
            ].map((label) => (
              <li key={label} className="hire-case">
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="hire-section" aria-labelledby="hire-form-title">
        <div className="hnb-container">
          <header className="hire-section__head">
            <span className="hire-section__eyebrow">Aan de slag</span>
            <h2 id="hire-form-title" className="hire-section__title">
              Personeelsaanvraag
            </h2>
            <p className="hire-section__lead">
              Vul het formulier in. Een coördinator reageert om scope, beschikbaarheid
              en vervolgstappen te bevestigen — nog geen betalingsgegevens nodig.
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
                  <h3 className="hire-success__title">Aanvraag ontvangen</h3>
                  <p className="hire-success__text">
                    Dank u — uw briefing is vastgelegd. Ons team neemt contact op via
                    de door u opgegeven gegevens. (Demo: er is nog geen data naar een
                    server verstuurd.)
                  </p>
                  <button
                    type="button"
                    className="hnb-btn hnb-btn--outline hire-success__cta"
                    onClick={() => setSubmitSuccess(false)}
                  >
                    Nog een aanvraag indienen
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
                  Bedrijfsnaam
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
                    required: 'Bedrijfsnaam is verplicht',
                    maxLength: {
                      value: 120,
                      message: 'Maximaal 120 tekens',
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
                    Contactpersoon
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
                      required: 'Naam contactpersoon is verplicht',
                      maxLength: {
                        value: 80,
                        message: 'Maximaal 80 tekens',
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
                    Zakelijk e-mailadres
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={inputClass('email')}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    {...register('email', {
                      required: 'E-mail is verplicht',
                      pattern: {
                        value: emailPattern,
                        message: 'Voer een geldig e-mailadres in',
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
                    Telefoon
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className={inputClass('phone')}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    {...register('phone', {
                      required: 'Telefoonnummer is verplicht',
                      pattern: {
                        value: phonePattern,
                        message: 'Voer een geldig telefoonnummer in',
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
                    Type personeel
                  </label>
                  <select
                    id="staffType"
                    className={selectClass}
                    aria-invalid={errors.staffType ? 'true' : 'false'}
                    aria-describedby={
                      errors.staffType ? 'staffType-error' : undefined
                    }
                    {...register('staffType', {
                      required: 'Selecteer een type personeel',
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
                  Locatie event
                </label>
                <input
                  id="location"
                  type="text"
                  autoComplete="street-address"
                  placeholder="Locatie of stad / regio"
                  className={inputClass('location')}
                  aria-invalid={errors.location ? 'true' : 'false'}
                  aria-describedby={
                    errors.location ? 'location-error' : undefined
                  }
                  {...register('location', {
                    required: 'Locatie is verplicht',
                    maxLength: {
                      value: 200,
                      message: 'Maximaal 200 tekens',
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
                  Eventdatum(s)
                </label>
                <input
                  id="eventDates"
                  type="text"
                  placeholder="bijv. 14–16 juni 2026 of één datum"
                  className={inputClass('eventDates')}
                  aria-invalid={errors.eventDates ? 'true' : 'false'}
                  aria-describedby={
                    errors.eventDates ? 'eventDates-error' : 'eventDates-hint'
                  }
                  {...register('eventDates', {
                    required: 'Datum(s) zijn verplicht',
                    minLength: {
                      value: 3,
                      message: 'Geef minstens een korte datumbeschrijving',
                    },
                    maxLength: {
                      value: 200,
                      message: 'Maximaal 200 tekens',
                    },
                  })}
                />
                {!errors.eventDates && (
                  <p id="eventDates-hint" className="hire-form__hint">
                    Vermeld tijdzone of opbouwdag indien relevant.
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
                  Aantal medewerkers
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
                      if (raw === '') return 'Aantal medewerkers is verplicht'
                      const n = Number(raw)
                      if (!Number.isFinite(n))
                        return 'Voer een geldig getal in'
                      if (n < 1) return 'Minimaal 1'
                      if (n > 5000)
                        return 'Voor zeer grote crews: neem telefonisch contact op'
                      if (!Number.isInteger(n)) return 'Voer een geheel getal in'
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
                  Aanvullende opmerkingen{' '}
                  <span className="hire-form__optional">(optioneel)</span>
                </label>
                <textarea
                  id="additionalNotes"
                  rows={5}
                  className={textareaClass}
                  placeholder="Uniform, vergunningen, toegangstijden, talen of andere eisen"
                  aria-invalid={errors.additionalNotes ? 'true' : 'false'}
                  aria-describedby={
                    errors.additionalNotes ? 'additionalNotes-error' : undefined
                  }
                  {...register('additionalNotes', {
                    maxLength: {
                      value: 2000,
                      message: 'Maximaal 2000 tekens',
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
                Verstuur aanvraag
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
