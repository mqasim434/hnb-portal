import MarketingCtaStrip from '../marketing/MarketingCtaStrip'

/**
 * @param {{ title: string, lead: string, primaryTo: string, primaryLabel: string, secondaryTo?: string, secondaryLabel?: string, prominent?: boolean, primaryVariant?: 'b2b' | 'freelancer' | 'outline', secondaryVariant?: 'b2b' | 'freelancer' | 'outline' }} props
 */
export default function BedrijvenCtaStrip(props) {
  return <MarketingCtaStrip headingId="b2b-cta-heading" {...props} />
}
