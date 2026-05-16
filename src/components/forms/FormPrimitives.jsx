/**
 * Enkele formulierveld-container (BEM-block per formulier).
 * @param {object} props
 * @param {string} props.block — bijv. `contact-form`, `b2b-form`, `fl-form`
 * @param {string} props.id — htmlFor / fout-id
 * @param {string} props.label
 * @param {import('react-hook-form').FieldError | undefined} props.error
 * @param {import('react').ReactNode} props.children — input metzelfde id
 */
export function FormField({ block, id, label, error, children }) {
  return (
    <div className={`${block}__field`}>
      <label className={`${block}__label`} htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className={`${block}__error`}>
          {error.message}
        </p>
      ) : null}
    </div>
  )
}

/**
 * Rij met één of twee kolommen (grid).
 * @param {string} props.block
 * @param {boolean} [props.twoCols]
 * @param {import('react').ReactNode} props.children
 */
export function FormRow({ block, twoCols, children }) {
  const cls = twoCols ? `${block}__row ${block}__row--2` : `${block}__row`
  return <div className={cls}>{children}</div>
}
