import { FiCheck } from 'react-icons/fi'
import './ComplianceBadgeGrid.css'

/**
 * @param {{ items: { id: string, title: string, text: string }[] }} props
 */
export default function ComplianceBadgeGrid({ items }) {
  return (
    <ul className="ohb-badges" aria-label="Compliance-onderdelen">
      {items.map((item) => (
        <li key={item.id} className="ohb-badge">
          <span className="ohb-badge__icon" aria-hidden="true">
            <FiCheck />
          </span>
          <div>
            <h3 className="ohb-badge__title">{item.title}</h3>
            <p className="ohb-badge__text">{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
