import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiUsers,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './AssignmentCard.css'

/**
 * @param {object} props
 * @param {string} props.eventType — event type (kopregel met badge)
 * @param {string} props.roleLabel — rolpil
 * @param {string} props.dateLabel — volledige datum met weekdag
 * @param {string} props.locationLine — stad, wijk
 * @param {string} props.hoursLabel — start–eind + pauze
 * @param {string} props.crewLine — bezettingregel
 * @param {string} props.rateLabel — tariefregel
 * @param {string} props.certification — certificeringseis
 * @param {'open' | 'bijna_vol' | 'gesloten'} props.status
 * @param {string} props.statusLabel — badge-tekst (bijv. OPEN)
 */
export default function AssignmentCard({
  eventType,
  roleLabel,
  dateLabel,
  locationLine,
  hoursLabel,
  crewLine,
  rateLabel,
  certification,
  status,
  statusLabel,
}) {
  const applyable = status !== 'gesloten'

  return (
    <article
      className={`assignment-card assignment-card--status-${status}`}
      aria-label={`Opdracht: ${eventType}`}
    >
      <div className="assignment-card__head">
        <span className="assignment-card__type">{eventType}</span>
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
          <span>{locationLine}</span>
        </li>
        <li>
          <FiClock className="assignment-card__icon" aria-hidden />
          <span>{hoursLabel}</span>
        </li>
        <li>
          <FiUsers className="assignment-card__icon" aria-hidden />
          <span>{crewLine}</span>
        </li>
        <li>
          <FiDollarSign className="assignment-card__icon" aria-hidden />
          <span>{rateLabel}</span>
        </li>
      </ul>

      <div className="assignment-card__cert">
        <span className="assignment-card__cert-label">Certificering</span>
        <p className="assignment-card__cert-text">{certification}</p>
      </div>

      {applyable ? (
        <div className="assignment-card__apply">
          <Link
            to="/freelancers/direct-aanmelden"
            className="hnb-btn hnb-btn--freelancer assignment-card__apply-btn"
          >
            Direct aanmelden
          </Link>
          <p className="assignment-card__apply-hint">
            Matching gebeurt na goedkeuring van uw profiel.
          </p>
        </div>
      ) : (
        <p className="assignment-card__closed">
          Deze shift is vol.{' '}
          <Link
            to="/freelancers/openstaande-opdrachten#fl-opdrachten-lijst"
            className="assignment-card__closed-link"
          >
            Bekijk andere openstaande opdrachten.
          </Link>
        </p>
      )}
    </article>
  )
}
