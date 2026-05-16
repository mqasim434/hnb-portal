import { Link } from 'react-router-dom'
import PageHero from '../../components/marketing/PageHero'
import BedrijvenTrustBadges from '../../components/bedrijven/BedrijvenTrustBadges'
import NetherlandsMap from '../../components/overhb/NetherlandsMap'
import { MARKETING_PAGES } from '../../content/marketingPages'
import { ABOUT_SEO } from '../../content/aboutSeo'
import { usePageSeo } from '../../hooks/usePageSeo'
import '../bedrijven/bedrijven-pages.css'
import './overhb-pages.css'

const copy = MARKETING_PAGES['hb-werkgebied']

export default function WerkgebiedPage() {
  const seo = ABOUT_SEO.werkgebied
  usePageSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.path,
  })

  return (
    <main className="ohb-page b2b-page">
      <PageHero variant="navy" eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} stackCtasOnMobile>
        <Link to="/bedrijven/personeel-aanvragen" className="hnb-btn hnb-btn--primary">
          Personeel aanvragen
        </Link>
        <Link to="/contact" className="hnb-btn hnb-btn--outline">
          Regio bespreken
        </Link>
      </PageHero>

      <BedrijvenTrustBadges />

      <section className="b2b-section b2b-section--surface">
        <div className="hnb-container">
          <div className="ohb-werkgebied-split">
            <div>
              {copy.sections.map((section, index) => (
                <div key={section.heading || `wg-${index}`} className="b2b-prose">
                  {section.heading ? <h2>{section.heading}</h2> : null}
                  {section.paragraphs?.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                  {section.bullets?.length ? (
                    <ul>
                      {section.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
            <NetherlandsMap />
          </div>
        </div>
      </section>
    </main>
  )
}
