import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiCheckCircle } from 'react-icons/fi'
import './Contact.css'

const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export default function Contact() {
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = () => {
    setSubmitSuccess(true)
    reset()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const inputClass = (field) =>
    `contact-form__input${errors[field] ? ' contact-form__input--error' : ''}`

  const textareaClass = errors.message
    ? 'contact-form__textarea contact-form__textarea--error'
    : 'contact-form__textarea'

  return (
    <main className="contact">
      <section className="contact-hero" aria-labelledby="contact-hero-title">
        <div className="hnb-container">
          <h1 id="contact-hero-title" className="contact-hero__title">
            Get In <span className="contact-hero__accent">Touch</span>
          </h1>
        </div>
      </section>

      <section className="contact-body" aria-label="Contact form and details">
        <div className="hnb-container">
          <div className="contact-layout">
            <div className="contact-layout__main">
              {submitSuccess && (
                <div
                  className="contact-success"
                  role="status"
                  aria-live="polite"
                >
                  <div className="contact-success__icon" aria-hidden="true">
                    <FiCheckCircle />
                  </div>
                  <div>
                    <h2 className="contact-success__title">Message sent</h2>
                    <p className="contact-success__text">
                      Thanks for reaching out — we&apos;ll get back to you using the
                      email you provided. (Demo: nothing was saved to a server yet.)
                    </p>
                    <button
                      type="button"
                      className="hnb-btn hnb-btn--outline contact-success__btn"
                      onClick={() => setSubmitSuccess(false)}
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}

              <form
                className="contact-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className="contact-form__row contact-form__row--2">
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="contact-name">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      className={inputClass('name')}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={
                        errors.name ? 'contact-name-error' : undefined
                      }
                      {...register('name', {
                        required: 'Name is required',
                        maxLength: {
                          value: 80,
                          message: 'Maximum 80 characters',
                        },
                      })}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="contact-form__error">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="contact-email">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      className={inputClass('email')}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={
                        errors.email ? 'contact-email-error' : undefined
                      }
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: emailPattern,
                          message: 'Enter a valid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="contact-form__error">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="contact-subject">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    autoComplete="off"
                    className={inputClass('subject')}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={
                      errors.subject ? 'contact-subject-error' : undefined
                    }
                    {...register('subject', {
                      required: 'Subject is required',
                      minLength: {
                        value: 3,
                        message: 'Subject is too short',
                      },
                      maxLength: {
                        value: 160,
                        message: 'Maximum 160 characters',
                      },
                    })}
                  />
                  {errors.subject && (
                    <p id="contact-subject-error" className="contact-form__error">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    className={textareaClass}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={
                      errors.message ? 'contact-message-error' : undefined
                    }
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 20,
                        message: 'Please write at least 20 characters',
                      },
                      maxLength: {
                        value: 4000,
                        message: 'Maximum 4000 characters',
                      },
                    })}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="contact-form__error">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="hnb-btn hnb-btn--primary contact-form__submit"
                >
                  Send message
                </button>
              </form>
            </div>

            <aside className="contact-aside" aria-label="Contact details">
              <h2 className="contact-aside__title">Contact details</h2>
              <ul className="contact-aside__list">
                <li className="contact-aside__item">
                  <span className="contact-aside__label">Email</span>
                  <a
                    className="contact-aside__value"
                    href="mailto:bookings@hbservicegroup.com"
                  >
                    bookings@hbservicegroup.com
                  </a>
                </li>
                <li className="contact-aside__item">
                  <span className="contact-aside__label">Phone</span>
                  <a className="contact-aside__value" href="tel:+31200000000">
                    +31 (0) 20 000 0000
                  </a>
                </li>
                <li className="contact-aside__item">
                  <span className="contact-aside__label">Location</span>
                  <span className="contact-aside__value">
                    Amsterdam, Netherlands
                  </span>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
