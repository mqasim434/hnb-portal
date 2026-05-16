import './TrustBlurb.css'

/**
 * Korte vertrouwensregel (bijv. contactpagina).
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.ariaLabel]
 * @param {string} [props.className]
 */
export default function TrustBlurb({ children, ariaLabel, className = '' }) {
  return (
    <section
      className={`hnb-trust-blurb hnb-container ${className}`.trim()}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
    >
      <div className="hnb-trust-blurb__inner">{children}</div>
    </section>
  )
}
