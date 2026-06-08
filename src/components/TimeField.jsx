const HOURS = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'))
const MINUTES = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'))

/**
 * HH:mm time picker without native `type="time"` (avoids React DOM errors on Windows).
 *
 * @param {{
 *   id: string
 *   label: string
 *   value?: string
 *   onChange: (value: string) => void
 *   disabled?: boolean
 *   required?: boolean
 * }} props
 */
export default function TimeField({
  id,
  label,
  value = '',
  onChange,
  disabled = false,
  required = false,
}) {
  const [hour = '', minute = ''] = value.includes(':') ? value.split(':') : ['', '']

  function emit(nextHour, nextMinute) {
    if (!nextHour || !nextMinute) {
      onChange('')
      return
    }
    onChange(`${nextHour}:${nextMinute}`)
  }

  return (
    <div className="auth-field">
      <label htmlFor={`${id}-hour`}>{label}</label>
      <div className="time-field" role="group" aria-label={label}>
        <select
          id={`${id}-hour`}
          className="time-field__part"
          value={hour}
          required={required}
          disabled={disabled}
          aria-label={`${label}, uur`}
          onChange={(event) => emit(event.target.value, minute || '00')}
        >
          <option value="">{required ? 'UU' : '—'}</option>
          {HOURS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="time-field__sep" aria-hidden="true">
          :
        </span>
        <select
          id={`${id}-minute`}
          className="time-field__part"
          value={minute}
          required={required}
          disabled={disabled}
          aria-label={`${label}, minuten`}
          onChange={(event) => emit(hour || '00', event.target.value)}
        >
          <option value="">{required ? 'MM' : '—'}</option>
          {MINUTES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
