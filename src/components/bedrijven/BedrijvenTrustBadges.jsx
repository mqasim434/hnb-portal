import { FiCheckCircle, FiShield, FiUsers } from 'react-icons/fi'
import './BedrijvenTrustBadges.css'

export default function BedrijvenTrustBadges() {
  const items = [
    {
      icon: FiCheckCircle,
      label: 'Voorgecontroleerde professionals',
      sub: 'Certificaten en recht om te werken vóór bevestiging op het roster.',
    },
    {
      icon: FiUsers,
      label: 'Één vaste coördinator',
      sub: 'Van briefing tot load-out — minder overdracht, snellere besluiten.',
    },
    {
      icon: FiShield,
      label: 'Compliance-first',
      sub: 'Roosters afgestemd op venue, RI&E en vergunningen.',
    },
  ]

  return (
    <div className="b2b-trust hnb-container" aria-label="Waarom opdrachtgevers voor H&amp;B kiezen">
      <ul className="b2b-trust__list">
        {items.map(({ icon: Icon, label, sub }) => (
          <li key={label} className="b2b-trust__item">
            <span className="b2b-trust__icon" aria-hidden="true">
              <Icon />
            </span>
            <div>
              <span className="b2b-trust__label">{label}</span>
              <span className="b2b-trust__sub">{sub}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
