import MarketingCtaStrip from '../marketing/MarketingCtaStrip'

/**
 * @param {{ title: string, lead: string, primaryTo: string, primaryLabel: string, secondaryTo?: string, secondaryLabel?: string }} props
 */
export default function BedrijvenCtaStrip(props) {
  return <MarketingCtaStrip headingId="b2b-cta-heading" {...props} />
}
