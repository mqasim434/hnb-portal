import { Link } from 'react-router-dom'
import './MarketingCtaStrip.css'

/**
 * Donkere CTA-band (copy + primaire + optionele secundaire link).
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.lead
 * @param {string} props.primaryTo
 * @param {string} props.primaryLabel
 * @param {string} [props.secondaryTo]
 * @param {string} [props.secondaryLabel]
 * @param {string} [props.headingId] — voor aria-labelledby
 * @param {boolean} [props.prominent] — grotere titel + gouden outline op secundaire knop (homepage)
 */
export default function MarketingCtaStrip({
  title,
  lead,
  primaryTo,
  primaryLabel,
  secondaryTo,
  secondaryLabel,
  headingId = 'hnb-cta-strip-heading',
  prominent = false,
}) {
  const sectionClass = prominent
    ? 'hnb-cta-strip hnb-cta-strip--prominent'
    : 'hnb-cta-strip'

  return (
    <section className={sectionClass} aria-labelledby={headingId}>
      <div className="hnb-cta-strip__inner hnb-container">
        <div className="hnb-cta-strip__copy">
          <h2 id={headingId} className="hnb-cta-strip__title">
            {title}
          </h2>
          <p className="hnb-cta-strip__lead">{lead}</p>
        </div>
        <div className="hnb-cta-strip__actions">
          <Link to={primaryTo} className="hnb-btn hnb-btn--primary">
            {primaryLabel}
          </Link>
          {secondaryTo && secondaryLabel ? (
            <Link to={secondaryTo} className="hnb-btn hnb-btn--outline">
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}
