import { FiAward, FiCalendar, FiClock, FiMapPin, FiTag } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './AssignmentCard.css'

/**
 * @param {object} props
 * @param {string} props.typeLabel — soort opdracht
 * @param {string} props.dateLabel
 * @param {string} props.city
 * @param {string} props.hoursLabel
 * @param {string} props.roleLabel — functie-badge
 * @param {string} props.certification — certificeringseis
 * @param {'open' | 'bijna_vol' | 'gesloten'} props.status
 * @param {string} props.statusLabel
 */
export default function AssignmentCard({
  typeLabel,
  dateLabel,
  city,
  hoursLabel,
  roleLabel,
  certification,
  status,
  statusLabel,
}) {
  return (
    <article
      className={`assignment-card assignment-card--status-${status}`}
      aria-label={`Opdracht: ${typeLabel}`}
    >
      <div className="assignment-card__head">
        <span className="assignment-card__type">{typeLabel}</span>
        <span
          className={`assignment-card__badge assignment-card__badge--status assignment-card__badge--${status}`}
        >
          {statusLabel}
        </span>
      </div>
      <span className="assignment-card__role-badge">{roleLabel}</span>

      <ul className="assignment-card__meta">
        <li>
          <FiCalendar className="assignment-card__icon" aria-hidden />
          <span>{dateLabel}</span>
        </li>
        <li>
          <FiMapPin className="assignment-card__icon" aria-hidden />
          <span>{city}</span>
        </li>
        <li>
          <FiClock className="assignment-card__icon" aria-hidden />
          <span>{hoursLabel}</span>
        </li>
      </ul>

      <div className="assignment-card__cert">
        <FiAward className="assignment-card__icon assignment-card__icon--gold" aria-hidden />
        <div>
          <span className="assignment-card__cert-label">Certificering</span>
          <p className="assignment-card__cert-text">{certification}</p>
        </div>
      </div>

      <p className="assignment-card__hint">
        <FiTag className="assignment-card__icon" aria-hidden />
        Aanmelden via{' '}
        <Link to="/freelancers/direct-aanmelden" className="assignment-card__link">
          direct aanmelden
        </Link>
        ; matching gebeurt na goedkeuring van uw profiel.
      </p>
    </article>
  )
}
