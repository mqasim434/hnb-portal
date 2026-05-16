import './ProcessTimeline.css'

/**
 * @param {{ steps: { title: string, body: string, detail?: string }[], variant?: 'surface' | 'navy', ariaLabel?: string }} props
 */
export default function ProcessTimeline({
  steps,
  variant = 'surface',
  ariaLabel = 'Proces in stappen',
}) {
  const rootClass =
    variant === 'navy'
      ? 'hnb-process-timeline hnb-process-timeline--navy'
      : 'hnb-process-timeline hnb-process-timeline--surface'

  return (
    <ol className={rootClass} aria-label={ariaLabel}>
      {steps.map((step, index) => (
        <li key={step.title} className="hnb-process-timeline__item">
          <div className="hnb-process-timeline__rail" aria-hidden="true">
            <span className="hnb-process-timeline__dot" />
            {index < steps.length - 1 ? (
              <span className="hnb-process-timeline__line" />
            ) : null}
          </div>
          <div className="hnb-process-timeline__body">
            <h3 className="hnb-process-timeline__title">{step.title}</h3>
            <p className="hnb-process-timeline__text">{step.body}</p>
            {step.detail ? (
              <p className="hnb-process-timeline__detail">{step.detail}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
