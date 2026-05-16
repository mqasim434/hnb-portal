import ProcessTimeline from '../marketing/ProcessTimeline'

export default function HowItWorksTimeline({ steps }) {
  return (
    <ProcessTimeline
      variant="surface"
      steps={steps}
      ariaLabel="Tijdlijn: hoe het werkt"
    />
  )
}

