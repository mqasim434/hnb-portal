import ProcessTimeline from '../marketing/ProcessTimeline'

export default function AboutProcessTimeline({ steps }) {
  return (
    <ProcessTimeline
      variant="navy"
      steps={steps}
      ariaLabel="Werkwijze in stappen"
    />
  )
}

