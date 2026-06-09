import {
  ASSIGNMENT_STATUS_OPTIONS,
  ASSIGNMENT_TYPE_OPTIONS,
  COMPANY_ASSIGNMENT_STATUS_OPTIONS,
} from '../constants/assignments'
import TimeField from './TimeField'

/**
 * @param {{
 *   values: Record<string, string>
 *   onChange: (field: string, value: string) => void
 *   idPrefix?: string
 *   variant?: 'admin' | 'company'
 *   statusLocked?: boolean
 * }} props
 */
export default function AssignmentFields({
  values,
  onChange,
  idPrefix = '',
  variant = 'company',
  statusLocked = false,
}) {
  const id = (name) => `${idPrefix}${name}`
  const statusOptions =
    variant === 'company' ? COMPANY_ASSIGNMENT_STATUS_OPTIONS : ASSIGNMENT_STATUS_OPTIONS

  return (
    <>
      <div className="auth-field">
        <label htmlFor={id('assignment-title')}>Titel opdracht</label>
        <input
          id={id('assignment-title')}
          type="text"
          required
          value={values.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>
      <div className="auth-field">
        <label htmlFor={id('assignment-role')}>Rol / functie</label>
        <input
          id={id('assignment-role')}
          type="text"
          placeholder="Bijv. Portier nachtclub"
          value={values.roleLabel}
          onChange={(e) => onChange('roleLabel', e.target.value)}
        />
      </div>
      <div className="auth-field">
        <label htmlFor={id('assignment-type')}>Type</label>
        <select
          id={id('assignment-type')}
          value={values.assignmentType}
          onChange={(e) => onChange('assignmentType', e.target.value)}
        >
          {ASSIGNMENT_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="auth-field">
        <label htmlFor={id('assignment-location')}>Locatie</label>
        <input
          id={id('assignment-location')}
          type="text"
          required
          value={values.location}
          onChange={(e) => onChange('location', e.target.value)}
        />
      </div>
      <div className="admin-onboarding-detail__grid">
        <div className="auth-field">
          <label htmlFor={id('assignment-date-start')}>Startdatum</label>
          <input
            id={id('assignment-date-start')}
            type="date"
            required
            value={values.dateStart}
            onChange={(e) => onChange('dateStart', e.target.value)}
          />
        </div>
        <div className="auth-field">
          <label htmlFor={id('assignment-date-end')}>Einddatum</label>
          <input
            id={id('assignment-date-end')}
            type="date"
            value={values.dateEnd}
            onChange={(e) => onChange('dateEnd', e.target.value)}
          />
        </div>
        <TimeField
          id={id('assignment-shift-start')}
          label="Dienst start"
          value={values.shiftStart}
          onChange={(value) => onChange('shiftStart', value)}
        />
        <TimeField
          id={id('assignment-shift-end')}
          label="Dienst eind"
          value={values.shiftEnd}
          onChange={(value) => onChange('shiftEnd', value)}
        />
      </div>
      {variant === 'admin' ? (
        <div className="auth-field">
          <label htmlFor={id('assignment-client')}>Opdrachtgever (optioneel)</label>
          <input
            id={id('assignment-client')}
            type="text"
            value={values.clientCompany}
            onChange={(e) => onChange('clientCompany', e.target.value)}
          />
        </div>
      ) : null}
      <div className="auth-field">
        <label htmlFor={id('assignment-rate')}>Tarief / toeslagen (optioneel)</label>
        <input
          id={id('assignment-rate')}
          type="text"
          value={values.rateNote}
          onChange={(e) => onChange('rateNote', e.target.value)}
        />
      </div>
      <div className="auth-field">
        <label htmlFor={id('assignment-description')}>Omschrijving</label>
        <textarea
          id={id('assignment-description')}
          rows={3}
          value={values.description}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </div>
      <div className="auth-field">
        <label htmlFor={id('assignment-status')}>Status</label>
        <select
          id={id('assignment-status')}
          value={values.status}
          disabled={statusLocked}
          onChange={(e) => onChange('status', e.target.value)}
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {variant === 'company' && values.status === 'open' ? (
          <p className="compliance-card__hint" style={{ marginTop: 'var(--space-2)' }}>
            Open opdrachten zijn zichtbaar in de freelancerfeed (Module 3).
          </p>
        ) : null}
      </div>
      {variant === 'admin' ? (
        <div className="auth-field">
          <label htmlFor={id('assignment-notes')}>Interne notities</label>
          <textarea
            id={id('assignment-notes')}
            rows={2}
            value={values.adminNotes}
            onChange={(e) => onChange('adminNotes', e.target.value)}
          />
        </div>
      ) : null}
    </>
  )
}
