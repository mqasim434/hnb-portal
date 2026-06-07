import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { applyAnalyticsConsent, bootstrapGoogleAnalytics } from '../lib/analytics/googleAnalytics'
import {
  hasCookieConsentChoice,
  saveCookieConsent,
} from '../lib/consent/cookieConsent'
import './CookieConsentBanner.css'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (hasCookieConsentChoice()) {
      bootstrapGoogleAnalytics()
      return
    }
    setVisible(true)
  }, [])

  function accept(analytics) {
    saveCookieConsent(analytics)
    applyAnalyticsConsent(analytics)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="cookie-banner__inner hnb-container">
        <div className="cookie-banner__copy">
          <p id="cookie-banner-title" className="cookie-banner__title">
            Cookies
          </p>
          <p id="cookie-banner-desc" className="cookie-banner__text">
            We gebruiken noodzakelijke cookies voor beveiliging en het portaal. Analytische cookies
            helpen ons het gebruik te begrijpen — alleen met jouw toestemming. Lees meer in ons{' '}
            <Link to="/juridisch/cookies">cookiebeleid</Link>.
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button
            type="button"
            className="hnb-btn hnb-btn--outline cookie-banner__btn"
            onClick={() => accept(false)}
          >
            Alleen noodzakelijk
          </button>
          <button
            type="button"
            className="hnb-btn hnb-btn--primary cookie-banner__btn"
            onClick={() => accept(true)}
          >
            Alles accepteren
          </button>
        </div>
      </div>
    </div>
  )
}
